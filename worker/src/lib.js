// KAISER · esecutore: funzioni pure (niente API di Cloudflare), così si provano in Node. Nessuna chiave viene mai scritta nei log.
const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function b58decode(s) {
  const bytes = [];
  for (const ch of String(s).trim()) {
    const v = B58.indexOf(ch);
    if (v < 0) throw new Error('carattere non valido');
    let carry = v;
    for (let i = 0; i < bytes.length; i++) { carry += bytes[i] * 58; bytes[i] = carry & 0xff; carry >>= 8; }
    while (carry > 0) { bytes.push(carry & 0xff); carry >>= 8; }
  }
  for (const ch of String(s).trim()) { if (ch !== '1') break; bytes.push(0); }
  return Uint8Array.from(bytes.reverse());
}

export function b58encode(buf) {
  const digits = [];
  for (const b of buf) {
    let carry = b;
    for (let i = 0; i < digits.length; i++) { carry += digits[i] << 8; digits[i] = carry % 58; carry = (carry / 58) | 0; }
    while (carry > 0) { digits.push(carry % 58); carry = (carry / 58) | 0; }
  }
  let out = '';
  for (const b of buf) { if (b !== 0) break; out += '1'; }
  for (let i = digits.length - 1; i >= 0; i--) out += B58[digits[i]];
  return out;
}

// La chiave può essere: base58 (esportazione di Phantom/Solflare), oppure JSON "[12,34,...]" (file di Solana CLI).
export function parseSecret(raw) {
  const t = String(raw || '').trim();
  if (!t) throw new Error('WALLET_SECRET_KEY mancante');
  let bytes;
  if (t.startsWith('[')) { try { bytes = Uint8Array.from(JSON.parse(t)); } catch { throw new Error('formato JSON non valido'); } }
  else { try { bytes = b58decode(t); } catch { throw new Error('formato base58 non valido'); } }
  if (bytes.length !== 64 && bytes.length !== 32) throw new Error('la chiave deve avere 32 o 64 byte');
  return bytes;
}

const ED = [{ name: 'Ed25519' }, { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' }];
async function importSeed(seed) {
  const pkcs8 = new Uint8Array([0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20, ...seed]);
  let last;
  for (const alg of ED) { try { return await crypto.subtle.importKey('pkcs8', pkcs8, alg, true, ['sign']); } catch (e) { last = e; } }
  throw last;
}
const fromB64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

// Indirizzo pubblico del wallet. Con 64 byte si controlla anche che la parte pubblica corrisponda al seme (chiave coerente).
export async function walletAddress(raw) {
  const bytes = parseSecret(raw);
  const seed = bytes.slice(0, 32);
  const jwk = await crypto.subtle.exportKey('jwk', await importSeed(seed));
  const pub = fromB64u(jwk.x);
  if (bytes.length === 64) {
    const tail = bytes.slice(32);
    if (tail.length !== pub.length || tail.some((v, i) => v !== pub[i])) throw new Error('chiave incoerente: la parte pubblica non corrisponde');
  }
  return b58encode(pub);
}

// Confronto a tempo costante (per il token)
export function safeEqual(a, b) {
  const x = new TextEncoder().encode(String(a)), y = new TextEncoder().encode(String(b));
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] || 0) ^ (y[i] || 0);
  return d === 0;
}

export const num = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };

export function limitsFrom(env) {
  return {
    maxCapitalSOL: num(env.MAX_CAPITAL_SOL), maxOrderSOL: num(env.MAX_ORDER_SOL, 0.05),
    maxDailyLossSOL: num(env.MAX_DAILY_LOSS_SOL, 0.1), maxSlippageBps: num(env.MAX_SLIPPAGE_BPS, 300),
  };
}

// Richiesta che avvia il workflow del runner (workflow_dispatch). Nessun dato dell'utente, solo repository, file e ramo.
export function dispatchRequest(env) {
  const repo = String(env.GH_REPO || ''), wf = String(env.GH_WORKFLOW || ''), ref = String(env.GH_REF || 'main');
  const seg = (x) => /^[\w.-]+$/.test(x) && !/^\.+$/.test(x);   // niente '.' o '..' (percorsi relativi)
  const parts = repo.split('/');
  if (parts.length !== 2 || !parts.every(seg) || !/^[\w.-]+\.ya?ml$/.test(wf) || /^\.+/.test(wf)) throw new Error('GH_REPO o GH_WORKFLOW non validi');
  return {
    url: `https://api.github.com/repos/${repo}/actions/workflows/${wf}/dispatches`,
    init: { method: 'POST', headers: { Authorization: 'Bearer ' + env.GH_TOKEN, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'kaiser-executor-clock', 'Content-Type': 'application/json' }, body: JSON.stringify({ ref }) },
  };
}

// Elenco dei run del workflow in un certo stato (serve all'orologio per non accodare run inutili)
export function runsRequest(env, status) {
  const { url, init } = dispatchRequest(env);
  return { url: url.replace(/\/dispatches$/, '/runs') + '?status=' + encodeURIComponent(status) + '&per_page=1', init: { method: 'GET', headers: init.headers } };
}

export function corsHeaders(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const h = { 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,x-app-token', 'Vary': 'Origin' };
  if (origin && allowed.includes(origin)) h['Access-Control-Allow-Origin'] = origin;
  return h;
}

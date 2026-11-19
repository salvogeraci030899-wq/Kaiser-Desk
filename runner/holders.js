// KAISER · distribuzione dei possessori di un token al momento in cui supera la soglia di market cap (solo lettura via RPC, 3 chiamate per token).
// Serve all'analisi dei rug: quanta parte dell'offerta e' in pochi portafogli (esclusa la curva di pump.fun) e quanta ne ha ancora il creatore.
'use strict';

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const r4 = (x) => +x.toFixed(4);
// list: [{address, amount}] dei conti piu' grandi; owners: proprietario di ciascun conto (stesso ordine); supply: offerta totale (unita' minime)
function holdersFrom(list, owners, supply, curve, creator) {
  if (!Array.isArray(list) || !(supply > 0)) return null;
  const rows = list.map((a, i) => ({ owner: owners[i] || '', amt: num(a.amount) })).filter((x) => x.amt > 0 && x.owner !== curve).sort((a, b) => b.amt - a.amt);
  const sum = (n) => rows.slice(0, n).reduce((s, x) => s + x.amt, 0) / supply;
  const cre = creator ? rows.filter((x) => x.owner === creator).reduce((s, x) => s + x.amt, 0) / supply : null;
  return { top1: r4(sum(1)), top3: r4(sum(3)), top10: r4(sum(10)), cre: cre == null ? null : r4(cre), n: rows.length };
}
async function rpc(o, method, params) {
  const r = await o.fetch(o.url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }), signal: AbortSignal.timeout(8000) });
  const j = await r.json(); if (j && j.error) throw new Error(String(j.error.message || 'errore RPC').slice(0, 80)); return j && j.result;
}
// Social dichiarati dal creatore nei metadati del token (twitter, telegram, sito): 0-3. Il file dei metadati e' su IPFS o su un sito: si legge con un tempo massimo.
// I metadati stanno quasi sempre su IPFS e un solo gateway spesso e' lento o rifiuta: si provano piu' gateway insieme e vale il primo che risponde.
const GATEWAYS = ['https://ipfs.io/ipfs/', 'https://cloudflare-ipfs.com/ipfs/', 'https://dweb.link/ipfs/', 'https://gateway.pinata.cloud/ipfs/'];
function metaUrls(u) {
  u = String(u || '').trim(); if (!u) return [];
  let cid = ''; if (/^ipfs:\/\//i.test(u)) cid = u.slice(7).replace(/^ipfs\//, ''); else { const m = u.match(/^https:\/\/[^/]+\/ipfs\/(.+)$/i); if (m) cid = m[1]; }
  if (cid) return GATEWAYS.map((g) => g + cid);
  return /^https:\/\//i.test(u) ? [u] : [];
}
function socialFrom(meta) {
  if (!meta || typeof meta !== 'object') return null; const has = (v) => (typeof v === 'string' && v.trim().length > 3 ? 1 : 0);
  const tw = has(meta.twitter), tg = has(meta.telegram), web = has(meta.website); return { tw, tg, web, soc: tw + tg + web };
}
async function readMeta(o) {
  const urls = metaUrls(o.uri); if (!urls.length) return null;
  const one = async (url) => { const r = await o.fetch(url, { signal: AbortSignal.timeout(5000) }); if (!r.ok) throw new Error('http'); const t = await r.text(); if (t.length > 60000) throw new Error('grande'); return socialFrom(JSON.parse(t)) || Promise.reject(new Error('vuoto')); };
  try { return await Promise.any(urls.map(one)); } catch { return null; }
}
// Attivita' dei primi istanti dalle firme della curva (basta il numero di blocco di ciascuna, niente altre chiamate): quante operazioni nel blocco di creazione e nel successivo
// (sono i cecchini/bundle che comprano subito), quante nel primo minuto circa (150 blocchi) e quante falliscono. Serve che le firme siano complete (fino a 3 pagine da 1000).
function earlyFrom(sigs) {
  if (!Array.isArray(sigs) || sigs.length < 2) return null; const sl = sigs.map((x) => Number(x.slot)).filter(Number.isFinite); if (sl.length < 2) return null;
  const s0 = Math.min(...sl), ord = [...sigs].sort((a, b) => a.slot - b.slot), first = ord.slice(0, 200), within = (n) => sl.filter((s) => s <= s0 + n).length - 1;
  return { s0: within(1), n60: within(150), fail: +(first.filter((x) => x.err).length / first.length).toFixed(3), total: sigs.length };
}
async function readEarly(f) {
  if (!f.curve) return null; let all = [], before;
  for (let page = 0; page < 3; page++) {
    const r = await rpc(f, 'getSignaturesForAddress', [f.curve, { limit: 1000, commitment: 'confirmed', ...(before ? { before } : {}) }]); if (!Array.isArray(r)) return null;
    all = all.concat(r); if (r.length < 1000) return earlyFrom(all); before = r[r.length - 1].signature;
  }
  return null;      // piu' di 3000 operazioni: le firme piu' vecchie non sono complete
}
async function snapshot(o) {
  const f = { ...o, fetch: o.fetch || globalThis.fetch, url: String(o.url || '').replace(/^wss:/i, 'https:').replace(/^ws:/i, 'http:') };
  if (!f.fetch || !f.url || !f.mint) return null;
  const big = await rpc(f, 'getTokenLargestAccounts', [f.mint, { commitment: 'processed' }]), list = ((big && big.value) || []).slice(0, 20);
  if (!list.length) return null;
  const sup = await rpc(f, 'getTokenSupply', [f.mint, { commitment: 'processed' }]), supply = num(sup && sup.value && sup.value.amount);
  const accs = await rpc(f, 'getMultipleAccounts', [list.map((a) => a.address), { encoding: 'jsonParsed', commitment: 'processed' }]);
  const owners = ((accs && accs.value) || []).map((v) => (v && v.data && v.data.parsed && v.data.parsed.info && v.data.parsed.info.owner) || '');
  const h = holdersFrom(list, owners, supply, f.curve, f.creator); if (!h) return null;
  const extra = {}; if (Number.isFinite(f.devBuy) && f.devBuy >= 0) extra.devBuy = +f.devBuy.toFixed(3);
  try { Object.assign(extra, (await readMeta(f)) || {}); } catch { /* facoltativo */ }
  try { const e = await readEarly(f); if (e) Object.assign(extra, e); } catch { /* facoltativo */ }
  return { m: f.mint, at: f.at || Date.now(), ...h, ...extra };
}

module.exports = { metaUrls, holdersFrom, socialFrom, earlyFrom, snapshot };

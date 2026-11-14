// KAISER · esecutore su Cloudflare Workers. FASE 2: sola lettura. Nessun ordine, nessuna firma.
//   GET  /health   indirizzo del wallet, saldo, limiti, kill switch   (richiede x-app-token)
//   POST /kill     ferma i nuovi ordini        POST /resume   li riabilita
//   POST /order    non ancora attivo (fase 3)
// Segreti (dashboard Cloudflare → Worker → Settings → Variables and Secrets): EXEC_TOKEN, WALLET_SECRET_KEY, facoltativo RPC_URL.
import { walletAddress, safeEqual, limitsFrom, corsHeaders, dispatchRequest, num } from './lib.js';

const json = (obj, status, extra) => new Response(JSON.stringify(obj), { status: status || 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra } });

async function balanceSOL(env, address) {
  const rpc = env.RPC_URL || 'https://api.mainnet-beta.solana.com';
  const r = await fetch(rpc, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBalance', params: [address, { commitment: 'confirmed' }] }) });
  if (!r.ok) throw new Error('RPC HTTP ' + r.status);
  const d = await r.json();
  if (d.error) throw new Error('RPC: ' + (d.error.message || 'errore'));
  return num(d.result && d.result.value) / 1e9;
}

// Orologio: avvia il runner paper su GitHub. Esito salvato in KV (una scrittura ogni 5 minuti, dentro i limiti gratuiti).
async function readClock(env) { try { return JSON.parse((await env.STATE.get('clock')) || 'null'); } catch { return null; } }
export async function runClock(env) {
  const rec = { at: new Date().toISOString(), ok: false, status: null, error: null };
  try {
    if (!env.GH_TOKEN) throw new Error('GH_TOKEN non impostato');
    const { url, init } = dispatchRequest(env);
    const r = await fetch(url, init);
    rec.status = r.status;
    rec.ok = r.status === 204;
    if (!rec.ok) rec.error = r.status === 401 || r.status === 403 ? 'token GitHub rifiutato o senza permesso Actions' : r.status === 404 ? 'repository o workflow non trovato (o token senza accesso)' : 'GitHub HTTP ' + r.status;
  } catch (e) { rec.error = e.message; }
  try { await env.STATE.put('clock', JSON.stringify(rec)); } catch {}
  return rec;
}

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(runClock(env)); },

  async fetch(req, env) {
    const cors = corsHeaders(req.headers.get('Origin'), env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(req.url);

    if (!env.EXEC_TOKEN) return json({ ok: false, error: 'EXEC_TOKEN non impostato nell’esecutore' }, 503, cors);
    if (!safeEqual(req.headers.get('x-app-token') || '', env.EXEC_TOKEN)) return json({ ok: false, error: 'token mancante o errato' }, 401, cors);

    if (url.pathname === '/health' && req.method === 'GET') {
      const out = { ok: true, phase: 2, ordersEnabled: false, limits: limitsFrom(env), killed: (await env.STATE.get('killed')) === '1', wallet: null, balanceSOL: null, clock: await readClock(env) };
      if (!env.WALLET_SECRET_KEY) { out.walletError = 'WALLET_SECRET_KEY non impostata'; return json(out, 200, cors); }
      try { out.wallet = await walletAddress(env.WALLET_SECRET_KEY); } catch (e) { out.walletError = e.message; return json(out, 200, cors); }
      try { out.balanceSOL = await balanceSOL(env, out.wallet); } catch (e) { out.rpcError = e.message; }
      return json(out, 200, cors);
    }
    if (url.pathname === '/kill' && req.method === 'POST') { await env.STATE.put('killed', '1'); return json({ ok: true, killed: true }, 200, cors); }
    if (url.pathname === '/resume' && req.method === 'POST') { await env.STATE.delete('killed'); return json({ ok: true, killed: false }, 200, cors); }
    if (url.pathname === '/order') return json({ ok: false, error: 'ordini non ancora attivi (fase 3)' }, 501, cors);
    return json({ ok: false, error: 'non trovato' }, 404, cors);
  },
};

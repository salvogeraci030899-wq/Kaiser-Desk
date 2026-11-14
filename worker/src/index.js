// KAISER · esecutore su Cloudflare Workers.
//   GET  /health   indirizzo wallet, saldo, modo, limiti, orologio          (token obbligatorio)
//   GET  /state    posizioni, journal, perdita del giorno, ultimo dry-run
//   POST /order    ingresso: {ref, mint, sym, sizeSol, slippageBps, params, entryLiq, dryRun}
//   POST /sell     uscita manuale: {id, frac}
//   POST /kill     ferma i nuovi ingressi (le uscite restano attive)       POST /resume   li riabilita
//   POST /tick     giro di Charon a richiesta
// Cron: ogni 5 minuti avvia il runner paper su GitHub; ogni minuto Charon controlla le posizioni reali.
// Segreti (dashboard Cloudflare → Variables and Secrets): EXEC_TOKEN, WALLET_SECRET_KEY, GH_TOKEN, facoltativi RPC_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// Variabili: ORDERS_MODE (off|dryrun|live), JUPITER_PROGRAM_ID, MAX_CAPITAL_SOL, MAX_ORDER_SOL, MAX_DAILY_LOSS_SOL, MAX_POSITIONS...
import { safeEqual, corsHeaders, dispatchRequest } from './lib.js';
import { Executor } from './exec.js';

const json = (obj, status, extra) => new Response(JSON.stringify(obj), { status: status || 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra } });
const ROUTES = { '/health': 'GET', '/state': 'GET', '/order': 'POST', '/ticket': 'POST', '/approve': 'POST', '/reject': 'POST', '/sell': 'POST', '/kill': 'POST', '/resume': 'POST', '/tick': 'POST' };

// Il Durable Object tiene tutto lo stato reale e serializza le operazioni: un ordine e un giro di Charon non si pestano mai i piedi.
export class Ledger {
  constructor(state, env) {
    this.ex = new Executor({ env, store: { get: async (k, d) => { const v = await state.storage.get(k); return v === undefined ? d : v; }, put: (k, v) => state.storage.put(k, v) } });
  }
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    try {
      if (path === '/health') return json(await this.ex.health());
      if (path === '/state') return json(await this.ex.state());
      if (path === '/order') return json(await this.ex.buy(body));
      if (path === '/ticket') return json(await this.ex.ticket(body));
      if (path === '/approve') return json(await this.ex.approve(String(body.id || '')));
      if (path === '/reject') return json(await this.ex.reject(String(body.id || '')));
      if (path === '/sell') return json(await this.ex.sell(String(body.id || ''), body.frac, 'Manuale'));
      if (path === '/kill') return json(await this.ex.kill());
      if (path === '/resume') return json(await this.ex.resume());
      if (path === '/tick') return json(await this.ex.tick());
    } catch (e) { return json({ ok: false, error: e.message }, 500); }
    return json({ ok: false, error: 'non trovato' }, 404);
  }
}

const stub = (env) => env.LEDGER.get(env.LEDGER.idFromName('main'));

// Orologio: avvia il runner paper su GitHub. Esito in KV (una scrittura ogni 5 minuti).
async function readClock(env) { try { return JSON.parse((await env.STATE.get('clock')) || 'null'); } catch { return null; } }
export async function runClock(env) {
  const rec = { at: new Date().toISOString(), ok: false, status: null, error: null };
  try {
    if (!env.GH_TOKEN) throw new Error('GH_TOKEN non impostato');
    const { url, init } = dispatchRequest(env);
    const r = await fetch(url, init);
    rec.status = r.status; rec.ok = r.status === 204;
    if (!rec.ok) rec.error = r.status === 401 || r.status === 403 ? 'token GitHub rifiutato o senza permesso Actions' : r.status === 404 ? 'repository o workflow non trovato (o token senza accesso)' : 'GitHub HTTP ' + r.status;
  } catch (e) { rec.error = e.message; }
  try { await env.STATE.put('clock', JSON.stringify(rec)); } catch { /* non critico */ }
  return rec;
}

export default {
  async scheduled(event, env, ctx) {
    if (event.cron === '* * * * *') ctx.waitUntil(stub(env).fetch('https://ledger/tick', { method: 'POST', body: '{}' }));
    else ctx.waitUntil(runClock(env));
  },
  async fetch(req, env) {
    const cors = corsHeaders(req.headers.get('Origin'), env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(req.url);
    if (!env.EXEC_TOKEN) return json({ ok: false, error: 'EXEC_TOKEN non impostato nell’esecutore' }, 503, cors);
    if (!safeEqual(req.headers.get('x-app-token') || '', env.EXEC_TOKEN)) return json({ ok: false, error: 'token mancante o errato' }, 401, cors);
    if (ROUTES[url.pathname] !== req.method) return json({ ok: false, error: 'non trovato' }, ROUTES[url.pathname] ? 405 : 404, cors);
    try {
      const body = req.method === 'POST' ? await req.text() : undefined;
      const r = await stub(env).fetch('https://ledger' + url.pathname, { method: req.method, body });
      const data = await r.json();
      if (url.pathname === '/health') data.clock = await readClock(env);
      return json(data, r.status, cors);
    } catch (e) { return json({ ok: false, error: e.message }, 500, cors); }
  },
};

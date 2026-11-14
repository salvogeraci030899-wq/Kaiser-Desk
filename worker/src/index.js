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
import { safeEqual, corsHeaders, dispatchRequest, runsRequest } from './lib.js';
import { Executor } from './exec.js';
import { handleUpdate, webhookSecret } from './tg.js';

const json = (obj, status, extra) => new Response(JSON.stringify(obj), { status: status || 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra } });
const ROUTES = { '/health': 'GET', '/state': 'GET', '/runner': 'POST', '/paper': 'POST', '/order': 'POST', '/ticket': 'POST', '/approve': 'POST', '/reject': 'POST', '/sell': 'POST', '/kill': 'POST', '/resume': 'POST', '/tick': 'POST' };

// Il Durable Object tiene tutto lo stato reale e serializza le operazioni: un ordine e un giro di Charon non si pestano mai i piedi.
const ALARM_MS = 10000;                       // con posizioni reali aperte Charon controlla ogni 10 secondi (il cron di Cloudflare scende solo a 1 minuto)
const ARM_PATHS = new Set(['/order', '/approve', '/tick', '/sell']);
export class Ledger {
  constructor(state, env) {
    this.state = state;
    this.ex = new Executor({ env, store: { get: async (k, d) => { const v = await state.storage.get(k); return v === undefined ? d : v; }, put: (k, v) => state.storage.put(k, v) } });
  }
  // Se ci sono posizioni reali (o ordini in attesa) un allarme del Durable Object fa ripartire Charon ogni 10 secondi; senza posizioni non c'è allarme.
  async arm() {
    try {
      const s = this.state && this.state.storage; if (!s || typeof s.setAlarm !== 'function') return;
      const [pos, pend, ov] = await Promise.all([s.get('positions'), s.get('pending'), s.get('params')]);
      if (!((pos && pos.length) || (pend && pend.length) || (ov && ov.shieldOn === true))) return;   // con lo Scudo acceso si controlla il wallet ogni 10 secondi
      const cur = await s.getAlarm(), fast = !!(this.ex && this.ex.fastRetry);      // dopo una vendita fallita il prossimo giro parte tra 2 secondi, non tra 10
      if (fast) this.ex.fastRetry = false;
      if (cur == null) await s.setAlarm(Date.now() + (fast ? 2000 : ALARM_MS));
      else if (fast && cur > Date.now() + 2500) await s.setAlarm(Date.now() + 2000);
    } catch { /* non critico: resta il cron di un minuto */ }
  }
  async alarm() {
    try { await this.ex.tick(); } catch { /* si riprova al prossimo allarme */ }
    await this.arm();
  }
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    try {
      if (path === '/health') return json(await this.ex.health());
      if (path === '/public') return json(await this.ex.publicView());
      if (path === '/tg') return json(await handleUpdate(this.ex, body));
      if (path === '/params') return json(await this.ex.paramsView());
      if (path === '/propose') return json(await this.ex.propose(body));
      if (path === '/runner') return json(await this.ex.reportRunner(body.config, body.resetAck, body.closeAck));
      if (path === '/paper' && req.method === 'POST') return json(await this.ex.paperPut(body.data));
      if (path === '/paper') return json(await this.ex.paperGet());
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
    finally { if (ARM_PATHS.has(path)) await this.arm(); }
    return json({ ok: false, error: 'non trovato' }, 404);
  }
}

const stub = (env) => env.LEDGER.get(env.LEDGER.idFromName('main'));

// Orologio: avvia il runner paper su GitHub. Esito in KV (una scrittura ogni 5 minuti).
async function readClock(env) { try { return JSON.parse((await env.STATE.get('clock')) || 'null'); } catch { return null; } }
const HANDOVER_MIN = 44;                       // da questa durata in poi il run in corso è "in uscita": si accoda il successivo
async function runnerBusy(env) {
  try {
    const get = async (s) => { const q = runsRequest(env, s), r = await fetch(q.url, q.init); if (!r.ok) throw new Error('HTTP ' + r.status); return (await r.json()).workflow_runs || []; };
    for (const s of ['queued', 'pending']) if ((await get(s)).length) return 'un run è già in coda';   // 'pending' = in attesa del turno nel gruppo di concorrenza
    const run = (await get('in_progress'))[0];
    if (run && Date.now() - Date.parse(run.run_started_at || run.created_at) < HANDOVER_MIN * 60000) return 'run in corso';
  } catch { /* se non si riesce a sapere, si avvia come prima */ }
  return null;
}
export async function runClock(env) {
  const rec = { at: new Date().toISOString(), ok: false, status: null, error: null };
  try {
    if (!env.GH_TOKEN) throw new Error('GH_TOKEN non impostato');
    const { url, init } = dispatchRequest(env);
    // Con i run lunghi non si accoda un altro run finché quello in corso non sta per finire (poco prima parte il successivo, senza buco)
    const wait = await runnerBusy(env);
    if (wait) { rec.ok = true; rec.status = 200; rec.note = wait; try { await env.STATE.put('clock', JSON.stringify(rec)); } catch { /* non critico */ } return rec; }
    const r = await fetch(url, init);
    rec.status = r.status; rec.ok = r.status === 204;
    if (!rec.ok) rec.error = r.status === 401 || r.status === 403 ? 'token GitHub rifiutato o senza permesso Actions' : r.status === 404 ? 'repository o workflow non trovato (o token senza accesso)' : 'GitHub HTTP ' + r.status;
  } catch (e) { rec.error = e.message; }
  try { await env.STATE.put('clock', JSON.stringify(rec)); } catch { /* non critico */ }
  return rec;
}

// Webhook di Telegram: si registra da solo, MA mai sopra il webhook di un altro servizio (per esempio un bot condiviso con Pinscher).
export async function ensureWebhook(env) {
  const t = env.TELEGRAM_BOT_TOKEN, base = String(env.PUBLIC_URL || '').replace(/\/+$/, '');
  if (!t || !base || !env.EXEC_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const mark = base + '|' + t.slice(-6), api = (m, b) => fetch(`https://api.telegram.org/bot${t}/${m}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b || {}) }).then((r) => r.json());
  try {
    if ((await env.STATE.get('tgwh')) === mark) return;
    const info = await api('getWebhookInfo'), cur = info && info.result && info.result.url;
    if (cur && cur !== base + '/tg') { await env.STATE.put('tgwh_note', 'il bot ha già un webhook altrove: usa un bot dedicato a Kaiser'); await env.STATE.put('tgwh', mark); return; }
    const r = await api('setWebhook', { url: base + '/tg', secret_token: await webhookSecret(env), allowed_updates: ['message', 'callback_query'] });
    if (r && r.ok) { await env.STATE.put('tgwh', mark); await env.STATE.delete('tgwh_note'); } else await env.STATE.put('tgwh_note', 'registrazione del webhook non riuscita: ' + ((r && r.description) || 'errore'));
  } catch { /* si riprova al prossimo giro */ }
}

export default {
  async scheduled(event, env, ctx) {
    if (event.cron === '* * * * *') { ctx.waitUntil(stub(env).fetch('https://ledger/tick', { method: 'POST', body: '{}' })); ctx.waitUntil(ensureWebhook(env)); }
    else ctx.waitUntil(runClock(env));
  },
  async fetch(req, env) {
    const cors = corsHeaders(req.headers.get('Origin'), env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(req.url);
    // Vista pubblica di sola lettura (l'app su GitHub Pages non contiene segreti). Si spegne con PUBLIC_VIEW=0.
    if (url.pathname === '/public' && req.method === 'GET') {
      if (env.PUBLIC_VIEW === '0') return json({ ok: false, error: 'vista pubblica disattivata' }, 403, cors);
      try { const d = await (await stub(env).fetch('https://ledger/public')).json(); d.clock = await readClock(env); d.telegramNote = (await env.STATE.get('tgwh_note')) || null; return json(d, 200, cors); }
      catch (e) { return json({ ok: false, error: e.message }, 500, cors); }
    }
    // Parametri: lettura pubblica; la modifica è solo una RICHIESTA (nessun segreto): la applica soltanto il tuo tocco su Telegram.
    if (url.pathname === '/params' && req.method === 'GET') {
      if (env.PUBLIC_VIEW === '0') return json({ ok: false, error: 'vista pubblica disattivata' }, 403, cors);
      try { return json(await (await stub(env).fetch('https://ledger/params')).json(), 200, cors); } catch (e) { return json({ ok: false, error: e.message }, 500, cors); }
    }
    if (url.pathname === '/paper' && req.method === 'GET') {                                    // paper in diretta (lettura pubblica)
      if (env.PUBLIC_VIEW === '0') return json({ ok: false, error: 'vista pubblica disattivata' }, 403, cors);
      try { return json(await (await stub(env).fetch('https://ledger/paper')).json(), 200, cors); } catch (e) { return json({ ok: false, error: e.message }, 500, cors); }
    }
    if (url.pathname === '/propose' && req.method === 'POST') {
      const origin = req.headers.get('Origin') || '', allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (env.PROPOSALS === '0') return json({ ok: false, error: 'le richieste dall’app sono disattivate' }, 403, cors);
      if (!allowed.includes(origin)) return json({ ok: false, error: 'origine non ammessa' }, 403, cors);
      const body = await req.text(); if (body.length > 4000) return json({ ok: false, error: 'richiesta troppo grande' }, 413, cors);
      try { return json(await (await stub(env).fetch('https://ledger/propose', { method: 'POST', body })).json(), 200, cors); } catch (e) { return json({ ok: false, error: e.message }, 500, cors); }
    }
    // Telegram: nessun token dell'app, ma segreto del webhook (derivato da EXEC_TOKEN) obbligatorio; la chat la controlla tg.js
    if (url.pathname === '/tg' && req.method === 'POST') {
      if (!env.EXEC_TOKEN) return json({ ok: false }, 503);
      if (!safeEqual(req.headers.get('X-Telegram-Bot-Api-Secret-Token') || '', await webhookSecret(env))) return json({ ok: false }, 401);
      const body = await req.text();
      try { await stub(env).fetch('https://ledger/tg', { method: 'POST', body }); } catch { /* Telegram riceve comunque 200: niente ripetizioni */ }
      return json({ ok: true });
    }
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

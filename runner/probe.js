// KAISER · sonda delle fonti per gli scambi dei token pump.fun (solo lettura). Prova per pochi secondi ogni fonte candidata e riporta che cosa arriva davvero:
// PumpPortal, tutti gli eventi del programma via RPC, le singole curve via RPC, e l'API pubblica di pump.fun. Non salva chiavi: l'indirizzo RPC non compare mai nel rapporto.
'use strict';
const crypto = require('node:crypto');
const Y = require('./young.js');

const TRADE_DISC = crypto.createHash('sha256').update('event:TradeEvent').digest().subarray(0, 8);
const toWs = (u) => String(u || '').trim().replace(/^https:/i, 'wss:').replace(/^http:/i, 'ws:');
// Evento di scambio di pump.fun: discriminatore (8) + mint (32) + SOL (u64) + token (u64) + acquisto (1) + portafoglio (32) + ora (i64) + riserve virtuali di SOL e di token (u64 ciascuna)
function parseTradeEvent(b64, nowSec) {
  let b; try { b = Buffer.from(String(b64), 'base64'); } catch { return null; }
  if (b.length < 8 + 32 + 8 + 8 + 1 + 32 + 8 + 8 + 8 || !b.subarray(0, 8).equals(TRADE_DISC)) return null;
  const sol = Number(b.readBigUInt64LE(40)) / 1e9, ts = Number(b.readBigInt64LE(89)), vSol = Number(b.readBigUInt64LE(97)) / 1e9, vTok = Number(b.readBigUInt64LE(105)), mc = vTok > 0 ? vSol * (1e15 / vTok) : 0;
  const sane = mc > 1 && mc < 5000 && sol >= 0 && sol < 2000 && (!nowSec || Math.abs(ts - nowSec) < 86400);   // se il formato non e' quello atteso questi controlli falliscono
  return { mint: Y.b58(b.subarray(8, 40)), user: Y.b58(b.subarray(57, 89)), sol, isBuy: b[56] === 1, ts, mc, sane };
}
// Apre un WebSocket, lo lascia aperto per ms millisecondi e restituisce l'esito. open(send) e msg(testo, send) costruiscono le misure.
function wsProbe(o) {
  return new Promise((resolve) => {
    const out = { opened: false, error: '' }; let ws, done = false, timer;
    const end = () => { if (done) return; done = true; clearTimeout(timer); try { ws && ws.close(); } catch { /* niente */ } resolve(out); };
    try { ws = new o.WS(o.url); } catch (e) { out.error = 'connessione impossibile'; resolve(out); return; }
    const send = (x) => { try { ws.send(JSON.stringify(x)); } catch { /* chiusa */ } };
    ws.onopen = () => { out.opened = true; try { o.open(send); } catch (e) { out.error = String(e.message).slice(0, 60); } };
    ws.onmessage = (ev) => { try { o.msg(typeof ev.data === 'string' ? ev.data : Buffer.from(ev.data).toString('utf8'), send); } catch { /* messaggio illeggibile */ } };
    ws.onerror = () => { if (!out.opened) out.error = 'collegamento rifiutato'; end(); }; ws.onclose = () => end();
    timer = setTimeout(end, o.ms);
  });
}
async function runProbe(o) {
  const WS = o.WebSocketImpl || globalThis.WebSocket, now = o.now || Date.now, ms = o.ms || 40000, mints = (o.mints || []).slice(0, 50), tracked = new Set(mints.map((x) => x.mint));
  const rep = { at: now(), ms, tokens: mints.length };
  if (!WS) { rep.error = 'WebSocket non disponibile'; return rep; }
  const A = { msgs: 0, types: {}, info: '', tradeKeys: '', tracked: 0 }, B = { notifs: 0, bytes: 0, events: 0, sane: 0, tracked: 0, err: '', sample: [] }, C = { subs: 0, notifs: 0, errs: 0, firstErr: '', events: 0, sane: 0 };
  const tasks = [];
  tasks.push(wsProbe({ WS, url: o.portalUrl || 'wss://pumpportal.fun/api/data', ms,
    open: (send) => { send({ method: 'subscribeNewToken' }); if (mints.length) send({ method: 'subscribeTokenTrade', keys: mints.map((x) => x.mint) }); },
    msg: (d) => { A.msgs++; const m = JSON.parse(d), k = m.txType || (m.message ? 'conferma' : 'altro'); A.types[k] = (A.types[k] || 0) + 1; if (m.message && !A.info) A.info = String(m.message).slice(0, 100); if ((k === 'buy' || k === 'sell') && !A.tradeKeys) A.tradeKeys = Object.keys(m).slice(0, 14).join(','); if ((k === 'buy' || k === 'sell') && tracked.has(m.mint)) A.tracked++; } }).then((r) => { rep.portal = { ...r, ...A }; }));
  if (o.rpcUrl) {
    const url = toWs(o.rpcUrl), eventsIn = (d, sink) => {
      const m = JSON.parse(d); if (m.error) { return m.error; }
      const v = m.params && m.params.result && m.params.result.value; if (!v || !Array.isArray(v.logs)) return null;
      for (const l of v.logs) if (typeof l === 'string' && l.startsWith('Program data: ')) { const e = parseTradeEvent(l.slice(14), Math.floor(now() / 1000)); if (e) sink(e); }
      return null;
    };
    tasks.push(wsProbe({ WS, url, ms, open: (send) => send({ jsonrpc: '2.0', id: 1, method: 'logsSubscribe', params: [{ mentions: [Y.PUMP_PROGRAM] }, { commitment: 'processed' }] }),
      msg: (d) => { const m = JSON.parse(d); if (m.method === 'logsNotification') { B.notifs++; B.bytes += d.length; } const er = eventsIn(d, (e) => { B.events++; if (e.sane) B.sane++; if (tracked.has(e.mint)) B.tracked++; if (B.sample.length < 2) B.sample.push({ mint: e.mint.slice(0, 6), sol: +e.sol.toFixed(3), buy: e.isBuy, mc: Math.round(e.mc) }); }); if (er && !B.err) B.err = String(er.message || er).slice(0, 100); } })
      .then((r) => { rep.program = { ...r, notifs: B.notifs, kb: Math.round(B.bytes / 1024), perSec: +(B.notifs / (ms / 1000)).toFixed(1), kbPerSec: +(B.bytes / 1024 / (ms / 1000)).toFixed(1), events: B.events, sane: B.sane, tracked: B.tracked, err: B.err, sample: B.sample }; }));
    const curves = mints.filter((x) => x.curve).slice(0, 20);
    tasks.push(wsProbe({ WS, url, ms, open: (send) => curves.forEach((x, i) => send({ jsonrpc: '2.0', id: 100 + i, method: 'logsSubscribe', params: [{ mentions: [x.curve] }, { commitment: 'processed' }] })),
      msg: (d) => { const m = JSON.parse(d); if (m.error) { C.errs++; if (!C.firstErr) C.firstErr = String(m.error.message || '').slice(0, 100); } else if (m.id >= 100 && m.result != null) C.subs++; else if (m.method === 'logsNotification') { C.notifs++; eventsIn(d, (e) => { C.events++; if (e.sane) C.sane++; }); } } })
      .then((r) => { rep.curves = { ...r, asked: curves.length, ...C }; }));
  } else rep.program = rep.curves = { skipped: 'RPC non impostato' };
  await Promise.all(tasks);
  // API pubblica del sito (non ufficiale: puo' essere bloccata o cambiata)
  const f = o.fetch || globalThis.fetch;
  if (f && mints[0]) {
    try { const r = await f(`https://frontend-api-v3.pump.fun/trades/all/${mints[0].mint}?limit=10&offset=0&minimumSize=0`, { signal: AbortSignal.timeout(8000) }); let n = null; try { const j = await r.json(); n = Array.isArray(j) ? j.length : null; } catch { /* non e' JSON */ } rep.api = { status: r.status, n }; }
    catch (e) { rep.api = { error: String(e.message || e).slice(0, 60) }; }
  }
  return rep;
}

module.exports = { TRADE_DISC, parseTradeEvent, wsProbe, runProbe };

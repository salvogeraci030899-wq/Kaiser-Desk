// KAISER · token giovani (0-60 minuti). Ascolta la creazione dei token su pump.fun e li segue per un'ora (picco, minimo, calo).
// Fonte principale: nodo RPC (logsSubscribe sull'account che compare solo nelle creazioni); riserva: PumpPortal (WebSocket gratuito).
// Il modulo non ha segreti nel codice: la chiave RPC arriva da RPC_URL e non viene mai scritta nei log.
'use strict';
const crypto = require('node:crypto');

// Indirizzi del programma pump.fun. MINT_AUTH è l'account "mint authority" che compare in ogni creazione e non negli scambi: così il flusso
// è piccolo (solo creazioni). Se un indirizzo risultasse sbagliato o cambiasse, il flusso RPC resta muto e si passa a PumpPortal.
const PUMP_PROGRAM = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P';
const MINT_AUTH = 'TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM';
const PORTAL_URL = 'wss://pumpportal.fun/api/data';
const CREATE_DISC = crypto.createHash('sha256').update('event:CreateEvent').digest().subarray(0, 8);   // discriminatore Anchor dell'evento di creazione

const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
function b58(buf) {
  let n = BigInt('0x' + (Buffer.from(buf).toString('hex') || '0')), s = '';
  while (n > 0n) { s = B58[Number(n % 58n)] + s; n /= 58n; }
  for (const x of buf) { if (x === 0) s = '1' + s; else break; }
  return s || '1';
}
function readStr(b, o) {
  if (o + 4 > b.length) return null;
  const n = b.readUInt32LE(o); if (n > 400 || o + 4 + n > b.length) return null;
  return [b.toString('utf8', o + 4, o + 4 + n), o + 4 + n];
}
// "Program data: <base64>" di pump.fun: evento di creazione = discriminatore (8) + name + symbol + uri (stringhe) + mint (32 byte) + ...
function parseCreateEvent(b64) {
  let b; try { b = Buffer.from(String(b64), 'base64'); } catch { return null; }
  if (b.length < 8 + 12 + 32 || !b.subarray(0, 8).equals(CREATE_DISC)) return null;
  let o = 8; const f = [];
  for (let i = 0; i < 3; i++) { const r = readStr(b, o); if (!r) return null; f.push(r[0]); o = r[1]; }
  if (o + 32 > b.length) return null;
  const mint = b58(b.subarray(o, o + 32)); if (!MINT_RE.test(mint)) return null;
  return { mint, name: f[0].slice(0, 40), symbol: f[1].slice(0, 20) };
}
function parseRpcLog(msg) {
  const v = msg && msg.params && msg.params.result && msg.params.result.value; if (!v || v.err || !Array.isArray(v.logs)) return null;
  for (const l of v.logs) { if (typeof l === 'string' && l.startsWith('Program data: ')) { const t = parseCreateEvent(l.slice(14)); if (t) return { ...t, signature: v.signature }; } }
  return null;
}
function parsePortal(msg) {
  if (!msg || typeof msg !== 'object' || !MINT_RE.test(String(msg.mint || ''))) return null;
  if (msg.txType && msg.txType !== 'create') return null;
  return { mint: msg.mint, name: String(msg.name || '').slice(0, 40), symbol: String(msg.symbol || '').slice(0, 20), mcapSol: Number(msg.marketCapSol) || null, signature: msg.signature };
}
const toWs = (u) => String(u || '').trim().replace(/^https:/i, 'wss:').replace(/^http:/i, 'ws:');
const host = (u) => { try { return new URL(u).host; } catch { return '?'; } };

// ---------- flusso ----------
const sock = () => ({ ws: null, state: 'off', backoff: 2000, lastMsg: 0, retry: false });
class YoungFeed {
  constructor(o) {
    this.o = o || {}; this.WS = this.o.WebSocketImpl || globalThis.WebSocket; this.now = this.o.now || Date.now;
    this.schedule = this.o.schedule || ((fn, ms) => setTimeout(fn, ms)); this.log = this.o.log || (() => {}); this.onToken = this.o.onToken || (() => {});
    this.rpcUrl = toWs(this.o.rpcUrl); this.portalUrl = this.o.portalUrl || PORTAL_URL; this.mention = this.o.mention || MINT_AUTH;
    this.s = { rpc: sock(), portal: sock() }; this.n = { rpc: 0, portal: 0 }; this.seen = new Map(); this.startedAt = 0; this.stopped = false; this.warned = {};
  }
  start() {
    if (!this.WS) { this.log('WebSocket non disponibile (serve Node 22): token giovani spenti'); return false; }
    this.startedAt = this.now(); this.stopped = false;
    if (this.rpcUrl) this.connect('rpc'); else this.connect('portal');
    const mk = this.o.setInterval || setInterval; this.timer = mk(() => this.tick(), 15000); if (this.timer && this.timer.unref) this.timer.unref();
    return true;
  }
  stop() { this.stopped = true; if (this.timer) clearInterval(this.timer); for (const k of ['rpc', 'portal']) { try { this.s[k].ws && this.s[k].ws.close(); } catch { /* niente */ } this.s[k].state = 'off'; } }
  connect(kind) {
    const s = this.s[kind]; if (this.stopped || s.state === 'on' || s.state === 'connecting') return;
    const url = kind === 'rpc' ? this.rpcUrl : this.portalUrl; let ws;
    try { ws = new this.WS(url); } catch (e) { s.state = 'off'; this.retry(kind); return; }
    s.ws = ws; s.state = 'connecting'; s.retry = false;
    ws.onopen = () => {
      s.state = 'on'; s.openedAt = this.now();
      try { ws.send(JSON.stringify(kind === 'rpc' ? { jsonrpc: '2.0', id: 1, method: 'logsSubscribe', params: [{ mentions: [this.mention] }, { commitment: 'processed' }] } : { method: 'subscribeNewToken' })); } catch { /* si riprova alla riconnessione */ }
      this.log(`token giovani: collegato a ${kind === 'rpc' ? 'RPC ' + host(url) : 'PumpPortal'}`);
    };
    ws.onmessage = (ev) => this.onMsg(kind, ev && ev.data);
    const down = () => { if (s.ws !== ws) return; s.state = 'off'; s.ws = null; this.retry(kind); };
    ws.onclose = down; ws.onerror = down;
  }
  retry(kind) {
    const s = this.s[kind]; if (this.stopped || s.retry) return; s.retry = true;
    const ms = s.backoff; s.backoff = Math.min(s.backoff * 2, 60000);
    this.schedule(() => { s.retry = false; if (kind === 'portal' && !this.wantPortal()) return; this.connect(kind); }, ms);
  }
  onMsg(kind, data) {
    let m; try { m = JSON.parse(typeof data === 'string' ? data : Buffer.from(data).toString('utf8')); } catch { return; }
    const t = kind === 'rpc' ? parseRpcLog(m) : parsePortal(m); if (!t) return;
    const s = this.s[kind]; s.lastMsg = this.now(); s.backoff = 2000;
    const prev = this.seen.get(t.mint); if (prev) return;
    this.seen.set(t.mint, s.lastMsg); if (this.seen.size > 5000) { const cut = s.lastMsg - 1800000; for (const [k, v] of this.seen) if (v < cut) this.seen.delete(k); }
    this.n[kind]++; this.onToken({ ...t, src: kind, at: s.lastMsg });
  }
  rpcOk() { const s = this.s.rpc; return s.state === 'on' && s.lastMsg > 0 && this.now() - s.lastMsg < 90000; }
  wantPortal() { return !this.rpcUrl || !this.rpcOk(); }
  // Ogni 15 s: se l'RPC non dà eventi da 90 s si attiva PumpPortal; se l'RPC è sano e PumpPortal è aperto lo si chiude; un RPC muto da 3 minuti si ricollega.
  tick() {
    if (this.stopped) return; const now = this.now(), rpc = this.s.rpc, portal = this.s.portal;
    if (this.rpcUrl) {
      if (rpc.state === 'on' && !this.rpcOk() && now - (rpc.openedAt || now) > 90000 && !this.warned.silent) { this.warned.silent = true; this.log('RPC collegato ma senza creazioni da 90 s: uso PumpPortal come riserva'); }
      if (rpc.state === 'on' && now - Math.max(rpc.lastMsg, rpc.openedAt || 0) > 180000) { try { rpc.ws && rpc.ws.close(); } catch { /* niente */ } rpc.state = 'off'; rpc.ws = null; rpc.retry = false; this.connect('rpc'); }
      if (rpc.state === 'off' && !rpc.retry) this.connect('rpc');
      if (this.rpcOk()) this.warned.silent = false;
    }
    if (this.wantPortal() && (this.rpcUrl ? now - this.startedAt > 45000 || rpc.state === 'off' : true)) { if (portal.state === 'off' && !portal.retry) this.connect('portal'); }
    else if (!this.wantPortal() && portal.state !== 'off') { try { portal.ws && portal.ws.close(); } catch { /* niente */ } portal.state = 'off'; portal.ws = null; this.log('token giovani: RPC sano, PumpPortal chiuso'); }
  }
  status() { return { rpc: this.s.rpc.state, portal: this.s.portal.state, nRpc: this.n.rpc, nPortal: this.n.portal, hasRpc: !!this.rpcUrl }; }
}

// ---------- lista dei token giovani ----------
const TTL_MS = 60 * 60000;          // si seguono per un'ora dalla creazione
const PENDING_MAX_MS = 8 * 60000;   // un token senza movimento dopo 8 minuti si scarta
const PENDING_MIN_MS = 15000;       // DexScreener lo conosce dopo qualche secondo
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
function addYoung(map, tok, now, cap) {
  if (!tok || !MINT_RE.test(tok.mint || '') || map.has(tok.mint)) return false;
  map.set(tok.mint, { mint: tok.mint, sym: tok.symbol || '', name: tok.name || '', createdAt: tok.at || now, src: tok.src || '', tracked: false, peak: 0, min: 0, last: 0, lastAt: 0 });
  if (map.size > (cap || 800)) { const old = [...map.values()].filter((y) => !y.tracked).sort((a, b) => a.createdAt - b.createdAt)[0]; if (old) map.delete(old.mint); }
  return true;
}
function pruneYoung(map, now) {
  for (const [m, y] of [...map]) { const age = now - y.createdAt; if (age > TTL_MS || (!y.tracked && age > PENDING_MAX_MS)) map.delete(m); }
}
// Token da cercare in questa scansione: tutti quelli già seguiti + i più nuovi non ancora verificati (al massimo `pending`)
function youngBatch(map, now, o) {
  pruneYoung(map, now); const pending = (o && o.pending) || 90, out = [];
  const all = [...map.values()];
  for (const y of all.filter((x) => x.tracked).sort((a, b) => b.createdAt - a.createdAt)) out.push(y.mint);
  for (const y of all.filter((x) => !x.tracked && now - x.createdAt >= PENDING_MIN_MS).sort((a, b) => b.createdAt - a.createdAt).slice(0, pending)) out.push(y.mint);
  return out;
}
// Aggiorna la lista con i pair appena letti: promuove chi ha liquidità e scambi, aggiorna picco/minimo/ultimo prezzo di chi è già seguito
function youngApply(map, pairs, now, o) {
  const minLiq = (o && o.minLiq) || 2000, minTx = (o && o.minTx5) || 4, maxTracked = (o && o.maxTracked) || 150; let promoted = 0;
  for (const [m, y] of map) {
    const p = pairs.get(m); if (!p) continue;
    const price = num(p.priceNative), liq = num(p.liquidity && p.liquidity.usd), t5 = p.txns && p.txns.m5, tx = num(t5 && t5.buys) + num(t5 && t5.sells);
    if (!y.tracked) { if (liq >= minLiq && tx >= minTx && price > 0) { y.tracked = true; promoted++; } else continue; }
    if (price > 0) { y.peak = Math.max(y.peak, price); y.min = y.min ? Math.min(y.min, price) : price; y.last = price; y.lastAt = now; }
  }
  const tracked = [...map.values()].filter((y) => y.tracked);
  if (tracked.length > maxTracked) for (const y of tracked.sort((a, b) => a.createdAt - b.createdAt).slice(0, tracked.length - maxTracked)) map.delete(y.mint);
  return promoted;
}
const youngDip = (y) => (y && y.peak > 0 && y.last > 0 ? (y.last / y.peak - 1) * 100 : 0);
const youngAge = (y, now) => (now - y.createdAt) / 60000;
function youngSummary(map, now, n) {
  return [...map.values()].filter((y) => y.tracked).sort((a, b) => b.createdAt - a.createdAt).slice(0, n || 80)
    .map((y) => ({ m: y.mint, s: y.sym, a: Math.round(youngAge(y, now) * 10) / 10, d: Math.round(youngDip(y) * 10) / 10 }));
}

module.exports = { PUMP_PROGRAM, MINT_AUTH, PORTAL_URL, CREATE_DISC, b58, parseCreateEvent, parseRpcLog, parsePortal, YoungFeed, addYoung, pruneYoung, youngBatch, youngApply, youngDip, youngAge, youngSummary, TTL_MS };

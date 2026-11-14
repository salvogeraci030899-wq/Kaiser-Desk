// KAISER · Laboratorio: registratore in SOLA OSSERVAZIONE degli scambi delle Coin appena nate su pump.fun (PumpPortal).
// Per ogni token misura quanto il volume sia concentrato in pochi portafogli (bundle al lancio, cicli di compra-vendita, dev che vende) e, dopo 20 minuti,
// verifica che cosa sarebbe successo entrando 60 secondi dopo la nascita: gara tra target e stop su più coppie. Non compra e non vende nulla.
// Il punteggio "bot" usa SOLO ciò che si sapeva al momento dell'ingresso (primi 60 secondi): niente informazioni dal futuro.
'use strict';

const PORTAL_URL = 'wss://pumpportal.fun/api/data';
const BIN_MS = 5000, ENTRY_MS = 60000, ENTRY_BIN = ENTRY_MS / BIN_MS, WATCH_MS = 21 * 60000, MAX_TR = 2500;
const RACES = [[10, 10], [15, 10], [30, 25], [50, 30]];                  // [target %, stop %]
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const median = (xs) => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

// ---------- misure ----------
// Misure su tutti gli scambi con dt <= atMs (dt = millisecondi dalla creazione)
function features(t, atMs) {
  const lim = atMs == null ? Infinity : atMs, vol = new Array(t.addr.length).fill(0), nb = new Array(t.addr.length).fill(0), ns = new Array(t.addr.length).fill(0), sb = new Array(t.addr.length).fill(0), ss = new Array(t.addr.length).fill(0);
  let n = 0, total = 0, buyTotal = 0, early = 0, earlySet = new Set(), devSell = 0;
  for (const [dt, side, sol, w] of t.tr) {
    if (dt > lim) break;
    n++; total += sol; vol[w] += sol;
    if (side === 1) { nb[w]++; sb[w] += sol; buyTotal += sol; if (dt <= 3000 && w !== t.devIdx) { early += sol; earlySet.add(w); } } else { ns[w]++; ss[w] += sol; if (w === t.devIdx) devSell += sol; }
  }
  if (earlySet.size < 3) { early = 0; earlySet = new Set(); }
  const uniq = vol.filter((v) => v > 0).length, top3 = [...vol].sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
  let cyc = 0; for (let i = 0; i < vol.length; i++) if (nb[i] >= 2 && ns[i] >= 2 && Math.min(sb[i], ss[i]) / Math.max(sb[i], ss[i], 1e-9) >= 0.5) cyc += vol[i];
  return { n, total, uniq, top3Share: total > 0 ? top3 / total : 0, bundleN: earlySet.size, bundleShare: buyTotal > 0 ? early / buyTotal : 0, cyclerShare: total > 0 ? cyc / total : 0,
    devSold: devSell > 0, uniqRatio: n > 0 ? uniq / n : 0 };
}
// Punteggio 0-100: più alto = volume più concentrato e "giocato" da pochi portafogli. È un'euristica, non una prova.
function botScore(f) {
  if (!f || f.n < 5) return null;
  return Math.round(clamp(40 * clamp((f.top3Share - 0.35) / 0.45, 0, 1) + 20 * clamp(f.bundleShare / 0.5, 0, 1) + 20 * clamp(f.cyclerShare / 0.4, 0, 1) + 10 * (f.devSold ? 1 : 0) + 10 * clamp((0.25 - f.uniqRatio) / 0.2, 0, 1), 0, 100));
}
// Gara: partendo dal prezzo all'ingresso, che cosa arriva prima, il target (+tp%) o lo stop (-sl%)? Nello stesso intervallo vince lo stop (stima prudente).
function race(path, entryIdx, tp, sl) {
  const e = path[entryIdx]; if (!(e > 0)) return null;
  for (let i = entryIdx + 1; i < path.length; i++) { const r = path[i] / e; if (r <= 1 - sl / 100) return 'sl'; if (r >= 1 + tp / 100) return 'tp'; }
  return 'none';
}
// Riassunto di un token osservato fino in fondo (o fin dove si è arrivati)
function summarize(t, now) {
  const p = t.path.slice(), bins = Math.min(252, Math.floor((now - t.createdAt) / BIN_MS)); while (p.length && p.length <= bins) p.push(p[p.length - 1]);
  const f60 = features(t, ENTRY_MS), ok = p.length > ENTRY_BIN && p[ENTRY_BIN] > 0 && f60.n >= 5;
  const out = { m: t.mint, s: t.sym, at: t.createdAt, n60: f60.n, b: botScore(f60), f: { top3: +f60.top3Share.toFixed(3), bundle: +f60.bundleShare.toFixed(3), cyc: +f60.cyclerShare.toFixed(3), uniq: f60.uniq, devSold: f60.devSold }, ok };
  if (!ok) return out;
  const e = p[ENTRY_BIN], rest = p.slice(ENTRY_BIN); out.peak = +(Math.max(...rest) / e).toFixed(3); out.min = +(Math.min(...rest) / e).toFixed(3); out.end = +(rest[rest.length - 1] / e).toFixed(3);
  out.races = {}; for (const [tp, sl] of RACES) out.races[tp + '/' + sl] = race(p, ENTRY_BIN, tp, sl);
  // arrivo di un acquirente grosso e nuovo (>= 1 SOL, dopo il primo minuto): che cosa fa il prezzo nei 60 secondi dopo
  if (t.big.length) { const b = t.big[0], i0 = Math.floor(b.dt / BIN_MS), i1 = Math.min(p.length - 1, i0 + 12); if (p[i0] > 0 && i1 > i0) out.afterBig = +(p[i1] / p[i0]).toFixed(3); out.bigSol = +b.sol.toFixed(2); }
  return out;
}
// Confronto tra gruppi di token per punteggio bot
function labSummary(done, now) {
  const ok = done.filter((d) => d.ok && d.b != null), cut = [[0, 35, 'bot basso'], [35, 65, 'bot medio'], [65, 101, 'bot alto']];
  const cohorts = cut.map(([lo, hi, label]) => {
    const g = ok.filter((d) => d.b >= lo && d.b < hi), r = {};
    for (const [tp, sl] of RACES) { const k = tp + '/' + sl, c = { tp: 0, sl: 0, none: 0 }; for (const d of g) if (d.races && d.races[k]) c[d.races[k]]++; const tot = c.tp + c.sl + c.none || 1; r[k] = { tp: Math.round(100 * c.tp / tot), sl: Math.round(100 * c.sl / tot), none: Math.round(100 * c.none / tot) }; }
    const big = g.filter((d) => d.afterBig != null).map((d) => d.afterBig);
    return { label, n: g.length, peak: g.length ? +median(g.map((d) => d.peak)).toFixed(2) : null, end: g.length ? +median(g.map((d) => d.end)).toFixed(2) : null, races: r, afterBig: big.length ? { n: big.length, med: +median(big).toFixed(2) } : null };
  });
  return { observed: done.length, valid: ok.length, cohorts };
}

// ---------- registro in memoria ----------
class TradeBook {
  constructor(o) { this.max = (o && o.max) || 300; this.toks = new Map(); this.seen = new Set(); this.nTrades = 0; this.nCreate = 0; }
  create(m, now) {
    if (!m || !MINT_RE.test(m.mint || '') || this.toks.has(m.mint)) return null;
    const t = { mint: m.mint, sym: String(m.symbol || '').slice(0, 20), name: String(m.name || '').slice(0, 40), createdAt: now, dev: m.traderPublicKey || '', addr: [], wid: new Map(), tr: [], path: [], lastMc: num(m.marketCapSol), big: [], devIdx: -1 };
    this.nCreate++; this.toks.set(m.mint, t);
    if (t.dev) { t.devIdx = this._w(t, t.dev); if (num(m.solAmount) > 0) this._tr(t, 0, 1, num(m.solAmount), t.devIdx); }   // l'acquisto iniziale del dev
    if (t.lastMc > 0) this._mc(t, 0, t.lastMc);
    return t;
  }
  _w(t, a) { let i = t.wid.get(a); if (i == null) { i = t.addr.length; t.addr.push(a); t.wid.set(a, i); } return i; }
  _tr(t, dt, side, sol, w) { if (t.tr.length < MAX_TR) t.tr.push([dt, side, sol, w]); }
  _mc(t, dt, mc) {
    const b = Math.floor(dt / BIN_MS), carry = t.path.length ? t.path[t.path.length - 1] : mc;
    while (t.path.length < b) t.path.push(carry); if (t.path.length === b) t.path.push(mc); else t.path[b] = mc;
    t.lastMc = mc;
  }
  trade(m, now) {
    if (!m || !m.mint) return null; const t = this.toks.get(m.mint); if (!t) return null;
    if (m.signature) { if (this.seen.has(m.signature)) return null; this.seen.add(m.signature); if (this.seen.size > 30000) this.seen.clear(); }
    const side = m.txType === 'buy' ? 1 : m.txType === 'sell' ? 0 : -1; if (side < 0) return null;
    const dt = Math.max(0, now - t.createdAt), sol = num(m.solAmount), w = this._w(t, m.traderPublicKey || '?'), mc = num(m.marketCapSol);
    this.nTrades++; this._tr(t, dt, side, sol, w);
    if (side === 1 && sol >= 1 && dt > ENTRY_MS && !t.tr.some((x, i) => x[3] === w && x[0] <= ENTRY_MS && i < t.tr.length - 1) && !t.big.length) t.big.push({ dt, sol, w });   // primo acquirente grosso e nuovo
    if (mc > 0) this._mc(t, dt, mc);
    return t;
  }
  scoreNow(mint) { const t = this.toks.get(mint); return t ? botScore(features(t, ENTRY_MS)) : null; }
  expired(now) { return [...this.toks.values()].filter((t) => now - t.createdAt >= WATCH_MS); }
  drop(mint) { this.toks.delete(mint); }
  oldest() { let o = null; for (const t of this.toks.values()) if (!o || t.createdAt < o.createdAt) o = t; return o; }
}

// ---------- collegamento a PumpPortal (una sola connessione: nuovi token + scambi) ----------
class TradeFeed {
  constructor(o) {
    this.o = o || {}; this.WS = this.o.WebSocketImpl || globalThis.WebSocket; this.now = this.o.now || Date.now; this.schedule = this.o.schedule || ((fn, ms) => setTimeout(fn, ms));
    this.log = this.o.log || (() => {}); this.onCreate = this.o.onCreate || (() => {}); this.onDone = this.o.onDone || (() => {}); this.url = this.o.url || PORTAL_URL;
    this.book = new TradeBook({ max: this.o.max }); this.state = 'off'; this.backoff = 2000; this.retrying = false; this.stopped = false; this.ws = null; this.unsub = [];
  }
  start() { if (!this.WS) { this.log('WebSocket non disponibile (serve Node 22): Laboratorio spento'); return false; } this.stopped = false; this.connect(); return true; }
  stop() { this.stopped = true; try { this.ws && this.ws.close(); } catch { /* niente */ } this.state = 'off'; }
  send(o) { try { if (this.ws && this.state === 'on') this.ws.send(JSON.stringify(o)); } catch { /* si risottoscrive alla riconnessione */ } }
  connect() {
    if (this.stopped || this.state !== 'off') return; let ws;
    try { ws = new this.WS(this.url); } catch { this.retry(); return; }
    this.ws = ws; this.state = 'connecting';
    ws.onopen = () => {
      this.state = 'on'; this.log('Laboratorio: collegato a PumpPortal'); this.send({ method: 'subscribeNewToken' });
      const keys = [...this.book.toks.keys()]; for (let i = 0; i < keys.length; i += 100) this.send({ method: 'subscribeTokenTrade', keys: keys.slice(i, i + 100) });   // dopo una riconnessione si riprende dai token seguiti
    };
    ws.onmessage = (ev) => this.onMsg(ev && ev.data);
    const down = () => { if (this.ws !== ws) return; this.state = 'off'; this.ws = null; this.retry(); };
    ws.onclose = down; ws.onerror = down;
  }
  retry() { if (this.stopped || this.retrying) return; this.retrying = true; const ms = this.backoff; this.backoff = Math.min(this.backoff * 2, 60000); this.schedule(() => { this.retrying = false; this.connect(); }, ms); }
  onMsg(data) {
    let m; try { m = JSON.parse(typeof data === 'string' ? data : Buffer.from(data).toString('utf8')); } catch { return; } if (!m || typeof m !== 'object') return;
    const now = this.now(); this.backoff = 2000;
    if (m.txType === 'create') {
      const t = this.book.create(m, now); if (!t) return;
      if (this.book.toks.size > this.book.max) { const o = this.book.oldest(); if (o && o.mint !== t.mint) this.finish(o, now); }
      this.send({ method: 'subscribeTokenTrade', keys: [t.mint] });                       // subito: gli scambi dei primi secondi sono i più utili
      this.onCreate({ mint: t.mint, symbol: t.sym, name: t.name, src: 'portal', at: now }); return;
    }
    this.book.trade(m, now);
  }
  finish(t, now) { this.book.drop(t.mint); this.unsub.push(t.mint); this.onDone(summarize(t, now)); }
  // da chiamare ogni pochi secondi: chiude i token osservati abbastanza a lungo e annulla le iscrizioni
  tick() {
    const now = this.now(); for (const t of this.book.expired(now)) this.finish(t, now);
    if (this.unsub.length) { const keys = this.unsub.splice(0, 100); this.send({ method: 'unsubscribeTokenTrade', keys }); }
  }
  botNow(mint) { return this.book.scoreNow(mint); }
  status() { return { state: this.state, active: this.book.toks.size, trades: this.book.nTrades, creates: this.book.nCreate }; }
}

module.exports = { PORTAL_URL, RACES, ENTRY_MS, WATCH_MS, features, botScore, race, summarize, labSummary, TradeBook, TradeFeed };

// KAISER · Laboratorio: registratore in SOLA OSSERVAZIONE degli scambi delle Coin appena nate su pump.fun (PumpPortal).
// Per ogni token misura quanto il volume sia concentrato in pochi portafogli (bundle al lancio, cicli di compra-vendita, dev che vende) e, dopo 20 minuti,
// verifica che cosa sarebbe successo entrando 60 secondi dopo la nascita: gara tra target e stop su più coppie. Non compra e non vende nulla.
// Il punteggio "bot" usa SOLO ciò che si sapeva al momento dell'ingresso (primi 60 secondi): niente informazioni dal futuro.
'use strict';

const PORTAL_URL = 'wss://pumpportal.fun/api/data';
const BIN_MS = 5000, ENTRY_MS = 60000, ENTRY_BIN = ENTRY_MS / BIN_MS, WATCH_MS = 21 * 60000, MAX_TR = 2500;
const RACES = [[12, 10], [20, 15], [30, 20], [30, 25], [50, 30]];       // [target %, stop %]
const THR = [[7500, '7.5'], [10000, '10'], [12000, '12'], [15000, '15']], THR_RACES = RACES.slice(0, 3);   // ingresso simulato alla prima volta che la market cap (USD) supera la soglia
const HOR = [12, 24, 60];                                                 // uscita a tempo: dopo 1, 2 e 5 minuti (intervalli da 5 s)
const RX_H = [2, 6, 12], RX_K = [10, 30, 60];                             // reazione del prezzo dopo un acquisto: dopo 10, 30 e 60 secondi
const sizeOf = (usd) => (usd < 10 ? 's' : usd < 50 ? 'm' : 'l');         // taglia dell'acquisto: sotto 10 $, 10-50 $, oltre 50 $
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const toHttp = (u) => String(u || '').trim().replace(/^wss:/i, 'https:').replace(/^ws:/i, 'http:');
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
const racesOf = (p, i, list) => { const r = {}; for (const [tp, sl] of list) r[tp + '/' + sl] = race(p, i, tp, sl); return r; };
const medOf = (xs, d) => (xs.length ? +median(xs).toFixed(d) : null);
// Misure sul percorso completo del token: soglie di market cap, reazione agli acquisti per taglia, vendite grosse, rotazione del volume e "calma" dopo il picco
function flowStats(t, p, usd) {
  const o = {}; if (!p.length) return o;
  const maxMc = Math.max(...p); o.hi = Math.round(maxMc * usd);
  o.th = {};
  for (const [thr, key] of THR) {
    let i = -1; for (let j = 1; j < p.length; j++) if (p[j - 1] * usd < thr && p[j] * usd >= thr) { i = j; break; }
    if (i < 0 || p.length - i <= 12) continue;                                   // mai superata, o meno di 60 secondi di storia dopo
    const e = p[i], rest = p.slice(i); let pk = 0; for (let j = 1; j < rest.length; j++) if (rest[j] > rest[pk]) pk = j;
    o.th[key] = { e: i * 5, pk: +(rest[pk] / e).toFixed(3), ts: pk * 5, dip: +(Math.min(...rest.slice(0, pk + 1)) / e).toFixed(3), r: racesOf(p, i, THR_RACES), x: HOR.map((h) => (i + h < p.length ? +(p[i + h] / e).toFixed(3) : null)) };
  }
  // dopo ogni acquisto: deriva del prezzo a +10, +30 e +60 s rispetto al prezzo subito dopo l'acquisto (somma dei logaritmi, conteggi e quante volte è sceso)
  const rx = {};
  for (const [dt, side, sol] of t.tr) {
    if (side !== 1) continue; const b = Math.floor(dt / BIN_MS); if (b >= p.length || !(p[b] > 0)) continue;
    const key = sizeOf(sol * usd) + (dt < 300000 ? 0 : 1), a = rx[key] || (rx[key] = new Array(9).fill(0));
    RX_H.forEach((k, h) => { if (b + k < p.length) { const r = p[b + k] / p[b]; if (r > 0) { a[h * 3]++; a[h * 3 + 1] += Math.log(r); a[h * 3 + 2] += r < 1 ? 1 : 0; } } });
  }
  for (const k of Object.keys(rx)) rx[k] = rx[k].map((v, i) => (i % 3 === 1 ? Math.round(v * 1000) : v));
  o.rx = rx;
  // vendite grosse (almeno 100 $): quante, da quanti portafogli, quando la prima e che cosa fa il prezzo nei 60 secondi dopo
  const big = 100 / usd, ws = new Set(); let ln = 0, first = null;
  for (const [dt, side, sol, w] of t.tr) if (side === 0 && sol >= big) { ln++; ws.add(w); if (first == null) first = dt; }
  o.ls = ln; o.lsW = ws.size;
  if (first != null) { const b = Math.floor(first / BIN_MS); o.lsT = Math.round(first / 1000); if (b >= 1 && b + 12 < p.length && p[b - 1] > 0) o.afterLS = +(p[b + 12] / p[b - 1]).toFixed(3); }
  // scambi nei 60 secondi prima e dopo il picco assoluto: se dopo il picco il flusso si spegne, la Coin e' "bloccata"
  let pi = 0; for (let j = 1; j < p.length; j++) if (p[j] > p[pi]) pi = j;
  if (pi >= 12 && p.length > pi + 12) { const t0 = pi * BIN_MS; let a = 0, c = 0; for (const x of t.tr) { if (x[0] >= t0 - 60000 && x[0] < t0) a++; else if (x[0] >= t0 && x[0] < t0 + 60000) c++; } o.q = [a, c]; }
  let tot = 0; for (const x of t.tr) tot += x[2]; if (maxMc > 0) o.turn = +(tot / maxMc).toFixed(2);   // volume scambiato diviso market cap massima (entrambi in SOL)
  return o;
}
// Riassunto di un token osservato fino in fondo (o fin dove si è arrivati). solUsd serve per le soglie in dollari
function summarize(t, now, solUsd) {
  const usd = solUsd > 0 ? solUsd : 150;
  const p = t.path.slice(), bins = Math.min(252, Math.floor((now - t.createdAt) / BIN_MS)); while (p.length && p.length <= bins) p.push(p[p.length - 1]);
  const f60 = features(t, ENTRY_MS), ok = p.length > ENTRY_BIN && p[ENTRY_BIN] > 0 && f60.n >= 5;
  const out = { m: t.mint, s: t.sym, at: t.createdAt, n60: f60.n, b: botScore(f60), f: { top3: +f60.top3Share.toFixed(3), bundle: +f60.bundleShare.toFixed(3), cyc: +f60.cyclerShare.toFixed(3), uniq: f60.uniq, devSold: f60.devSold }, ok };
  if (ok) {
    const e = p[ENTRY_BIN], rest = p.slice(ENTRY_BIN); out.peak = +(Math.max(...rest) / e).toFixed(3); out.min = +(Math.min(...rest) / e).toFixed(3); out.end = +(rest[rest.length - 1] / e).toFixed(3);
    out.races = racesOf(p, ENTRY_BIN, RACES); out.x = HOR.map((h) => (ENTRY_BIN + h < p.length ? +(p[ENTRY_BIN + h] / e).toFixed(3) : null));
    // arrivo di un acquirente grosso e nuovo (>= 1 SOL, dopo il primo minuto): che cosa fa il prezzo nei 60 secondi dopo
    if (t.big.length) { const b = t.big[0], i0 = Math.floor(b.dt / BIN_MS), i1 = Math.min(p.length - 1, i0 + 12); if (p[i0] > 0 && i1 > i0) out.afterBig = +(p[i1] / p[i0]).toFixed(3); out.bigSol = +b.sol.toFixed(2); }
  }
  return Object.assign(out, flowStats(t, p, usd));
}
const pctRaces = (g, get, list) => {
  const r = {};
  for (const [tp, sl] of list) { const k = tp + '/' + sl, c = { tp: 0, sl: 0, none: 0 }; for (const d of g) { const v = get(d) && get(d)[k]; if (v) c[v]++; } const tot = c.tp + c.sl + c.none || 1; r[k] = { tp: Math.round(100 * c.tp / tot), sl: Math.round(100 * c.sl / tot), none: Math.round(100 * c.none / tot) }; }
  return r;
};
// Confronto tra gruppi di token: per punteggio bot, per soglia di market cap, reazione agli acquisti, vendite grosse
function labSummary(done, now) {
  const ok = done.filter((d) => d.ok && d.b != null), cut = [[0, 35, 'bot basso'], [35, 65, 'bot medio'], [65, 101, 'bot alto']];
  const xs = (g, get) => [0, 1, 2].map((i) => medOf(g.map((d) => { const a = get(d); return a ? a[i] : null; }).filter((v) => v != null), 2));
  const cohorts = cut.map(([lo, hi, label]) => {
    const g = ok.filter((d) => d.b >= lo && d.b < hi), big = g.filter((d) => d.afterBig != null).map((d) => d.afterBig);
    return { label, n: g.length, peak: g.length ? +median(g.map((d) => d.peak)).toFixed(2) : null, end: g.length ? +median(g.map((d) => d.end)).toFixed(2) : null, races: pctRaces(g, (d) => d.races, RACES), x: xs(g, (d) => d.x), afterBig: big.length ? { n: big.length, med: +median(big).toFixed(2) } : null };
  });
  const th = THR.map(([, key]) => {
    const g = done.filter((d) => d.th && d.th[key]);
    return { key, n: g.length, races: pctRaces(g, (d) => d.th[key].r, THR_RACES), peak: medOf(g.map((d) => d.th[key].pk), 2), ts: medOf(g.map((d) => d.th[key].ts), 0), dip: medOf(g.map((d) => d.th[key].dip), 2), x: xs(g, (d) => d.th[key].x) };
  });
  const rx = [];
  for (const s of ['s', 'm', 'l']) for (const a of [0, 1]) {
    const key = s + a, h = {}; let any = 0;
    RX_K.forEach((k, i) => { let n = 0, l = 0, dn = 0; for (const d of done) { const v = d.rx && d.rx[key]; if (v) { n += v[i * 3]; l += v[i * 3 + 1]; dn += v[i * 3 + 2]; } } h[k] = n ? { n, drift: +((Math.exp(l / 1000 / n) - 1) * 100).toFixed(1), down: Math.round(100 * dn / n) } : null; any += n; });
    if (any) rx.push({ size: s, age: a, h });
  }
  const withLs = done.filter((d) => d.ls != null), aft = withLs.filter((d) => d.afterLS != null).map((d) => d.afterLS), qs = done.filter((d) => d.q && d.q[0] >= 5), hi = done.filter((d) => d.hi != null);
  const flow = { n: withLs.length, lsShare: withLs.length ? Math.round(100 * withLs.filter((d) => d.ls > 0).length / withLs.length) : null, afterLS: aft.length ? { n: aft.length, med: +median(aft).toFixed(2) } : null,
    lsT: medOf(withLs.filter((d) => d.lsT != null).map((d) => d.lsT), 0), turn: medOf(done.filter((d) => d.turn != null).map((d) => d.turn), 1),
    quiet: qs.length ? { n: qs.length, share: Math.round(100 * qs.filter((d) => d.q[1] <= 0.3 * d.q[0]).length / qs.length) } : null,
    hi15: hi.length ? Math.round(100 * hi.filter((d) => d.hi >= 15000).length / hi.length) : null, hi30: hi.length ? Math.round(100 * hi.filter((d) => d.hi >= 30000).length / hi.length) : null };
  return { observed: done.length, valid: ok.length, priced: done.filter((d) => d.hi != null).length, cohorts, th, rx, flow };
}


// ---------- prezzo dalla catena ----------
// Conto "bonding curve" di pump.fun: discriminatore (8) + riserve virtuali di token e di SOL, riserve reali, supply totale (u64 ciascuna) + flag "completata".
// Market cap in SOL = riserva virtuale di SOL x supply / riserva virtuale di token. Non dipende da nessun sito di terzi: e' il prezzo vero della curva.
function parseCurve(b64) {
  let b; try { b = Buffer.from(String(b64), 'base64'); } catch { return null; }
  if (b.length < 49) return null;
  const vTok = Number(b.readBigUInt64LE(8)), vSol = Number(b.readBigUInt64LE(16)), supply = Number(b.readBigUInt64LE(40));
  if (!(vTok > 0) || !(vSol > 0) || !(supply > 0)) return null;
  return { mcSol: (vSol / 1e9) * (supply / vTok), complete: b[48] === 1 };
}
// Legge ogni pochi secondi le curve dei token seguiti con una sola chiamata ogni 100 conti. Se i primi valori non sembrano una market cap sensata il formato non e' quello atteso: si spegne.
class CurvePoller {
  constructor(o) {
    this.url = toHttp(o.url); this.fetch = o.fetch || globalThis.fetch; this.book = o.book; this.now = o.now || Date.now; this.log = o.log || (() => {}); this.every = o.everyMs || 10000;
    this.last = 0; this.busy = false; this.ok = 0; this.fail = 0; this.bad = 0; this.sane = 0; this.off = !this.url || !this.fetch; this.err = '';
  }
  tick() {
    if (this.off || this.busy) return; const now = this.now(); if (now - this.last < this.every) return; this.last = now; this.busy = true;
    this.pollOnce().catch((e) => { this.fail++; this.err = String(e && e.message || e).slice(0, 80); }).finally(() => { this.busy = false; });
  }
  async pollOnce() {
    const now = this.now(), list = [...this.book.toks.values()].filter((t) => t.curve && !t.complete && now - t.createdAt < WATCH_MS);
    for (let i = 0; i < list.length; i += 100) {
      const chunk = list.slice(i, i + 100);
      const r = await this.fetch(this.url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getMultipleAccounts', params: [chunk.map((t) => t.curve), { encoding: 'base64', commitment: 'processed' }] }), signal: AbortSignal.timeout(8000) });
      const j = await r.json(), vals = j && j.result && j.result.value;
      if (!Array.isArray(vals)) { this.fail++; this.err = String((j && j.error && j.error.message) || 'risposta senza valori').slice(0, 80); continue; }
      chunk.forEach((t, k) => {
        const v = vals[k]; if (!v || !v.data) return; const c = parseCurve(Array.isArray(v.data) ? v.data[0] : v.data);
        if (!c || !(c.mcSol > 1 && c.mcSol < 5000)) { this.bad++; if (this.sane < 20 && this.bad >= 20 && this.ok === 0) { this.off = true; this.log('prezzi dalla catena: formato del conto non riconosciuto, lettura spenta'); } return; }
        this.ok++; this.sane++; this.book.curveMc(t, now, c);
      });
    }
  }
}

// ---------- registro in memoria ----------
class TradeBook {
  constructor(o) { this.max = (o && o.max) || 300; this.toks = new Map(); this.seen = new Set(); this.nTrades = 0; this.nCreate = 0; }
  create(m, now) {
    if (!m || !MINT_RE.test(m.mint || '') || this.toks.has(m.mint)) return null;
    const t = { mint: m.mint, sym: String(m.symbol || '').slice(0, 20), name: String(m.name || '').slice(0, 40), createdAt: now, dev: m.traderPublicKey || '', addr: [], wid: new Map(), tr: [], path: [], lastMc: num(m.marketCapSol), big: [], devIdx: -1, curve: MINT_RE.test(String(m.bondingCurveKey || m.curve || '')) ? String(m.bondingCurveKey || m.curve) : '', complete: false };
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
  curveMc(t, now, c) { this._mc(t, Math.max(0, now - t.createdAt), c.mcSol); if (c.complete) t.complete = true; }
  scoreNow(mint) { const t = this.toks.get(mint); return t ? botScore(features(t, ENTRY_MS)) : null; }
  expired(now) { return [...this.toks.values()].filter((t) => now - t.createdAt >= WATCH_MS); }
  drop(mint) { this.toks.delete(mint); }
  oldest() { let o = null; for (const t of this.toks.values()) if (!o || t.createdAt < o.createdAt) o = t; return o; }
}

// ---------- collegamento a PumpPortal (una sola connessione: nuovi token + scambi) ----------
class TradeFeed {
  constructor(o) {
    this.o = o || {}; this.WS = this.o.WebSocketImpl || globalThis.WebSocket; this.now = this.o.now || Date.now; this.schedule = this.o.schedule || ((fn, ms) => setTimeout(fn, ms));
    this.solUsd = this.o.solUsd || (() => 0); this.log = this.o.log || (() => {}); this.onCreate = this.o.onCreate || (() => {}); this.onDone = this.o.onDone || (() => {}); this.url = this.o.url || PORTAL_URL;
    this.book = new TradeBook({ max: this.o.max }); this.stats = { create: 0, trade: 0, other: 0 }; this.warned = false; this.openedAt = 0;
    this.poller = this.o.rpcHttp ? new CurvePoller({ url: this.o.rpcHttp, book: this.book, now: this.now, log: this.log, fetch: this.o.fetch, everyMs: this.o.pollMs }) : null; this.state = 'off'; this.backoff = 2000; this.retrying = false; this.stopped = false; this.ws = null; this.unsub = [];
  }
  start() { if (!this.WS) { this.log('WebSocket non disponibile (serve Node 22): Laboratorio spento'); return false; } this.stopped = false; this.connect(); return true; }
  stop() { this.stopped = true; try { this.ws && this.ws.close(); } catch { /* niente */ } this.state = 'off'; }
  send(o) { try { if (this.ws && this.state === 'on') this.ws.send(JSON.stringify(o)); } catch { /* si risottoscrive alla riconnessione */ } }
  connect() {
    if (this.stopped || this.state !== 'off') return; let ws;
    try { ws = new this.WS(this.url); } catch { this.retry(); return; }
    this.ws = ws; this.state = 'connecting';
    ws.onopen = () => {
      this.state = 'on'; this.openedAt = this.now(); this.log('Laboratorio: collegato a PumpPortal'); this.send({ method: 'subscribeNewToken' });
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
      this.stats.create++; const t = this.book.create(m, now); if (!t) return;
      if (this.book.toks.size > this.book.max) { const o = this.book.oldest(); if (o && o.mint !== t.mint) this.finish(o, now); }
      this.send({ method: 'subscribeTokenTrade', keys: [t.mint] });                       // subito: gli scambi dei primi secondi sono i più utili
      this.onCreate({ mint: t.mint, symbol: t.sym, name: t.name, src: 'portal', at: now }); return;
    }
    if (m.txType === 'buy' || m.txType === 'sell') this.stats.trade++; else { this.stats.other++; if (this.stats.other <= 3) this.log('messaggio PumpPortal non riconosciuto, chiavi: ' + Object.keys(m).slice(0, 12).join(',')); }
    this.book.trade(m, now);
  }
  // token noto da un'altra fonte (RPC): si segue anche qui, cosi' il Laboratorio non dipende da una sola connessione
  adopt(m, now) {
    if (!m || !MINT_RE.test(m.mint || '')) return false; const old = this.book.toks.get(m.mint);
    if (old) { if (!old.curve && m.curve && MINT_RE.test(m.curve)) old.curve = m.curve; return false; }
    const t = this.book.create({ mint: m.mint, symbol: m.symbol, name: m.name, bondingCurveKey: m.curve }, now || m.at || this.now()); if (!t) return false;
    if (this.book.toks.size > this.book.max) { const o = this.book.oldest(); if (o && o.mint !== t.mint) this.finish(o, this.now()); }
    this.send({ method: 'subscribeTokenTrade', keys: [t.mint] }); return true;
  }
  finish(t, now) { this.book.drop(t.mint); this.unsub.push(t.mint); this.onDone(summarize(t, now, this.solUsd())); }
  // da chiamare ogni pochi secondi: chiude i token osservati abbastanza a lungo e annulla le iscrizioni
  tick() {
    const now = this.now(); if (this.poller) this.poller.tick();
    if (!this.warned && this.state === 'on' && this.stats.create >= 20 && this.stats.trade === 0 && now - this.openedAt > 120000) { this.warned = true; this.log(`PumpPortal invia nuovi token (${this.stats.create}) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena`); } for (const t of this.book.expired(now)) this.finish(t, now);
    if (this.unsub.length) { const keys = this.unsub.splice(0, 100); this.send({ method: 'unsubscribeTokenTrade', keys }); }
  }
  botNow(mint) { return this.book.scoreNow(mint); }
  status() { const p = this.poller; return { state: this.state, active: this.book.toks.size, trades: this.book.nTrades, creates: this.book.nCreate, msgs: { ...this.stats }, poll: p ? { ok: p.ok, fail: p.fail, bad: p.bad, off: p.off, err: p.err } : null }; }
}

module.exports = { parseCurve, CurvePoller, PORTAL_URL, RACES, ENTRY_MS, WATCH_MS, features, botScore, race, summarize, labSummary, TradeBook, TradeFeed };

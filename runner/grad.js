// KAISER · raccolta sui token migrati (solo paper, nessun ordine, nessun segreto).
// Domanda: dopo che la curva di pump.fun si completa e il token passa su un pool con liquidita' vera, il costo reale di un giro e' basso abbastanza
// perché resti un guadagno netto? Il 7% usato finora era una stima, non una misura. Qui si misura: al completamento si chiede a Jupiter la quotazione
// di acquisto della nostra dimensione, poi ogni `sampleMs` la quotazione di vendita degli stessi token, per `spanMs`. Il valore di uscita include impatto di
// prezzo e commissioni del pool; si aggiunge solo la priority fee, una volta per lato.
//
// Regola di superamento, decisa PRIMA di vedere i risultati: orizzonte primario `primaryS` (un solo orizzonte, gli altri sono solo descrittivi),
// almeno `passN` token, netto medio almeno `passMeanPct` % e limite inferiore dell'intervallo al 95% sopra zero. Una vendita senza rotta vale -100%.
// Limiti: una quotazione non e' un'esecuzione; l'ingresso e' al completamento della curva visto dal nostro lettore, con un ritardo noto (campo lat).
'use strict';
const fs = require('node:fs');

const SOL_MINT = 'So11111111111111111111111111111111111111112';
const DEFAULTS = {
  enabled: true, sizeSol: 0.1, prioritySol: 0.0005,
  retryMs: 3000, giveUpMs: 90000,      // rotta di acquisto non ancora disponibile: si riprova ogni 3 s fino a 90 s dal completamento
  sampleMs: 30000, spanMs: 900000,     // vendita quotata ogni 30 s per 15 minuti
  primaryS: 300, passN: 300, passMeanPct: 3, maxQueue: 4, maxRecs: 1500,
};
const CFG_KEYS = ['sizeSol', 'prioritySol', 'retryMs', 'giveUpMs', 'sampleMs', 'spanMs', 'primaryS', 'passN', 'passMeanPct'];
const HORIZONS = [0, 60, 300, 900];     // secondi dopo l'ingresso (0 = vendita subito: misura il solo costo del giro)

const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

class Grad {
  // o.quote(inMint, outMint, amountStr, opt) -> { outAmount, priceImpactPct }; senza rotta lancia un errore con noRoute = true
  constructor(o) {
    this.o = o; this.cfg = { ...DEFAULTS, ...(o.cfg || {}) };
    this.now = o.now || Date.now; this.schedule = o.schedule || ((fn, ms) => setTimeout(fn, ms));
    this.log = o.log || (() => {}); this.file = o.file || ''; this.stopped = false; this.dirty = false;
    this.pending = new Map(); this.seen = new Set();
    this.d = { v: 1, since: this.now(), series: 1, cfg: this.pick(), counts: { seen: 0, skippedQueue: 0, filled: 0, noRouteBuy: 0, errBuy: 0, interrupted: 0 }, recs: [] };
    if (this.file) this.load();
  }
  pick() { const c = {}; for (const k of CFG_KEYS) c[k] = this.cfg[k]; return c; }
  load() {
    let d = null; try { d = JSON.parse(fs.readFileSync(this.file, 'utf8')); } catch { return; }
    if (!d || d.v !== 1 || !Array.isArray(d.recs)) return;
    this.d = { ...this.d, ...d, counts: { ...this.d.counts, ...(d.counts || {}) } };
    if (JSON.stringify(d.cfg) !== JSON.stringify(this.pick())) {
      this.d.series = (d.series || 1) + 1; this.d.cfg = this.pick(); this.d.counts = { seen: 0, skippedQueue: 0, filled: 0, noRouteBuy: 0, errBuy: 0, interrupted: 0 }; this.d.since = this.now(); this.dirty = true;
      this.log(`raccolta migrati: parametri cambiati, nuova serie ${this.d.series}`);
    }
  }
  flush() { if (!this.file || !this.dirty) return false; try { fs.writeFileSync(this.file, JSON.stringify(this.d)); this.dirty = false; return true; } catch { return false; } }

  // curva completata (t.at = istante in cui il nostro lettore l'ha vista)
  onComplete(t) {
    if (!this.cfg.enabled || this.stopped || !t || !t.mint || this.seen.has(t.mint)) return false;
    this.seen.add(t.mint); if (this.seen.size > 5000) this.seen.clear();
    const c = this.d.counts; c.seen++; this.dirty = true;
    if (this.pending.size >= this.cfg.maxQueue) { c.skippedQueue++; return false; }
    const e = { mint: t.mint, sym: t.sym || t.symbol || '', at: t.at || this.now(), v: [] };
    this.pending.set(t.mint, e); this.buy(e); return true;
  }
  async buy(e) {
    if (!this.pending.has(e.mint)) return;
    const k = this.cfg, c = this.d.counts;
    try {
      const q = await this.o.quote(SOL_MINT, e.mint, String(Math.floor(k.sizeSol * 1e9)));
      const out = BigInt(String(q.outAmount)); if (out <= 0n) throw Object.assign(new Error('quantita nulla'), { noRoute: true });
      e.tokens = out.toString(); e.filledAt = this.now(); e.lat = e.filledAt - e.at; e.imp = Math.max(0, Number(q.priceImpactPct) || 0) * 100; c.filled++; this.dirty = true;
      this.sample(e, 0);
    } catch (err) {
      if (this.now() - e.at + k.retryMs <= k.giveUpMs) { this.schedule(() => this.buy(e), k.retryMs); return; }
      if (err && err.noRoute) c.noRouteBuy++; else c.errBuy++;
      this.pending.delete(e.mint); this.dirty = true;
    }
  }
  // quotazione di vendita degli stessi token: normale, poi anche con rotta non limitata; -1 = nessuna rotta
  async sample(e, n) {
    if (!this.pending.has(e.mint)) return;
    const k = this.cfg; let v = -1, err2 = null;
    try { v = Number((await this.o.quote(e.mint, SOL_MINT, e.tokens)).outAmount); }
    catch (err) {
      if (err && err.noRoute) { try { v = Number((await this.o.quote(e.mint, SOL_MINT, e.tokens, { loose: true })).outAmount); } catch (x) { if (!(x && x.noRoute)) err2 = x; } } else err2 = err;
    }
    if (err2) v = -2;                                    // errore di rete: il campione non conta
    e.v.push([Math.round((this.now() - e.filledAt) / 1000), v]); this.dirty = true;
    if (this.now() - e.filledAt + k.sampleMs <= k.spanMs) { this.schedule(() => this.sample(e, n + 1), k.sampleMs); return; }
    this.finish(e);
  }
  finish(e) {
    const d = this.d; d.recs.push({ s: d.series, at: e.at, m: e.mint, sym: e.sym, lat: e.lat, imp: +e.imp.toFixed(2), v: e.v });
    if (d.recs.length > this.cfg.maxRecs) d.recs.splice(0, d.recs.length - this.cfg.maxRecs);
    this.pending.delete(e.mint); this.dirty = true;
  }
  // rendimento netto in % al primo campione con tempo >= s (null se non c'e' o se era un errore di rete)
  pnlAt(r, s) {
    const k = this.cfg, x = r.v.find((p) => p[0] >= s); if (!x || x[1] === -2) return null;
    if (x[1] < 0) return -100;
    return ((x[1] / 1e9 - k.prioritySol) / (k.sizeSol + k.prioritySol) - 1) * 100;
  }
  stop() { this.stopped = true; }
  async drain(maxMs) {
    const t0 = this.now();
    while (this.pending.size && this.now() - t0 < maxMs) await new Promise((r) => (this.o.sleep ? this.o.sleep(500).then(r) : setTimeout(r, 500)));
    if (this.pending.size) { this.d.counts.interrupted += this.pending.size; this.pending.clear(); this.dirty = true; }
    this.flush();
  }

  stats(xs) {
    const n = xs.length, out = { n };
    if (n < 2) return out;
    const mean = xs.reduce((a, b) => a + b, 0) / n, sd = Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1)), se = sd / Math.sqrt(n);
    return Object.assign(out, { mean: +mean.toFixed(2), ciLo: +(mean - 1.96 * se).toFixed(2), ciHi: +(mean + 1.96 * se).toFixed(2), median: +median(xs).toFixed(2), win: +(100 * xs.filter((v) => v > 0).length / n).toFixed(1) });
  }
  summary() {
    const k = this.cfg, d = this.d, recs = d.recs.filter((r) => r.s === d.series);
    const out = { series: d.series, since: d.since, cfg: d.cfg, counts: d.counts, n: recs.length, need: k.passN, verdict: 'in corso', h: {} };
    for (const s of HORIZONS) { const xs = recs.map((r) => this.pnlAt(r, s)).filter((v) => v != null); out.h[s] = this.stats(xs); out.h[s].noRoute = recs.filter((r) => this.pnlAt(r, s) === -100).length; }
    const p = out.h[HORIZONS.includes(k.primaryS) ? k.primaryS : 300]; out.primary = p;
    const lat = recs.map((r) => r.lat).filter((v) => v != null), imp = recs.map((r) => r.imp);
    if (lat.length) out.latMedianMs = median(lat);
    if (imp.length) out.impMedian = +median(imp).toFixed(2);
    if (p && p.n >= k.passN) out.verdict = (p.mean >= k.passMeanPct && p.ciLo > 0) ? 'passa' : 'non passa';
    return out;
  }
}

module.exports = { Grad, DEFAULTS, SOL_MINT, CFG_KEYS, HORIZONS };

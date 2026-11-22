// KAISER · test di ingresso rapido (solo paper, nessun ordine, nessun segreto).
// Ipotesi da verificare in avanti: comprare un token pochi secondi dopo la sua creazione e rivenderlo dopo 30 secondi rende, al netto dei costi,
// più di quanto si perda con le regole attuali. Nei dati storici l'idea sembra forte ma non è affidabile (l'"età zero" è il primo istante in cui il
// tracciatore vede il token, non la nascita, e il guadagno medio lo fa l'1% dei token). Qui la prova è vera: a ogni token campionato si chiede a
// Jupiter la quotazione di acquisto dopo un ritardo fisso dall'evento di creazione, si tiene la posizione per un tempo fisso e si chiede la quotazione
// di vendita. Il risultato include impatto di prezzo, commissioni e priority fee, e il tempo realmente impiegato per ottenere la quotazione.
//
// Regola di superamento, decisa PRIMA di vedere i risultati (non si cambia a prova iniziata): almeno `passN` operazioni chiuse, rendimento netto medio
// almeno `passMeanPct` % e limite inferiore dell'intervallo di confidenza al 95% sopra zero. Altrimenti il test non passa.
// Limiti dichiarati: una quotazione non è un'esecuzione (nel reale ci sono concorrenti e latenza di rete in più); il campione di token si sceglie con
// una funzione del mint, indipendente dall'esito. Se i parametri cambiano si apre una nuova serie e le statistiche ripartono.
'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');

const SOL_MINT = 'So11111111111111111111111111111111111111112';
const DEFAULTS = {
  enabled: true, every: 3,            // un token su 3, scelto con l'hash del mint
  delayMs: 5000,                      // prima richiesta di acquisto: 5 s dopo l'evento di creazione
  retryMs: 2000, giveUpMs: 30000,     // se Jupiter non ha ancora la rotta si riprova ogni 2 s, fino a 30 s dalla creazione
  holdMs: 30000,                      // tempo di permanenza dopo l'acquisto
  sellTries: 4, sellRetryMs: 1500,    // la vendita non riuscita dopo 4 tentativi per "nessuna rotta" conta come perdita totale
  sellFallback: 1,                    // l'ultimo tentativo di vendita chiede anche rotte non limitate ai token intermedi di base (diagnosi: la rotta manca davvero o solo con il filtro?)
  sizeSol: 0.05, feePct: 1, prioritySol: 0.0005,
  maxQueue: 8,                        // posizioni contemporanee massime (limita le richieste a Jupiter)
  passN: 300, passMeanPct: 3, maxTrades: 3000,
};
const CFG_KEYS = ['every', 'delayMs', 'retryMs', 'giveUpMs', 'holdMs', 'sellTries', 'sellRetryMs', 'sellFallback', 'sizeSol', 'feePct', 'prioritySol', 'passN', 'passMeanPct'];

const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const pct = (a, p) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };

class Snipe {
  // o.quote(inMint, outMint, amountStr) -> { outAmount, priceImpactPct }; se non c'è rotta lancia un errore con noRoute = true
  constructor(o) {
    this.o = o; this.cfg = { ...DEFAULTS, ...(o.cfg || {}) };
    this.now = o.now || Date.now; this.schedule = o.schedule || ((fn, ms) => setTimeout(fn, ms));
    this.log = o.log || (() => {}); this.file = o.file || ''; this.stopped = false; this.dirty = false;
    this.pending = new Map(); this.seenMints = new Set();
    this.d = { v: 1, since: this.now(), series: 1, cfg: this.pick(), counts: this.zero(), lat: [], trades: [], why: {} };
    if (this.file) this.load();
  }
  pick() { const c = {}; for (const k of CFG_KEYS) c[k] = this.cfg[k]; return c; }
  zero() { return { seen: 0, sampled: 0, skippedQueue: 0, filled: 0, noRouteBuy: 0, errBuy: 0, noRouteSell: 0, errSell: 0, interrupted: 0 }; }
  load() {
    let d = null; try { d = JSON.parse(fs.readFileSync(this.file, 'utf8')); } catch { return; }
    if (!d || d.v !== 1 || !Array.isArray(d.trades)) return;
    this.d = { ...this.d, ...d, counts: { ...this.zero(), ...(d.counts || {}) }, lat: Array.isArray(d.lat) ? d.lat : [], why: d.why && typeof d.why === 'object' ? d.why : {} };
    if (JSON.stringify(d.cfg) !== JSON.stringify(this.pick())) {      // parametri cambiati: nuova serie, le vecchie operazioni restano ma non contano
      this.d.series = (d.series || 1) + 1; this.d.cfg = this.pick(); this.d.counts = this.zero(); this.d.lat = []; this.d.why = {}; this.d.since = this.now(); this.dirty = true;
      this.log(`test ingresso rapido: parametri cambiati, nuova serie ${this.d.series}`);
    }
  }
  flush() { if (!this.file || !this.dirty) return false; try { fs.writeFileSync(this.file, JSON.stringify(this.d)); this.dirty = false; return true; } catch { return false; } }
  sampled(mint) { const h = crypto.createHash('sha1').update(String(mint)).digest(); return (h.readUInt32BE(0) % Math.max(1, this.cfg.every)) === 0; }

  // evento di creazione ricevuto dal flusso (t.at = istante di ricezione)
  onCreate(t) {
    if (!this.cfg.enabled || this.stopped || !t || !t.mint || this.seenMints.has(t.mint)) return false;
    this.seenMints.add(t.mint); if (this.seenMints.size > 20000) this.seenMints.clear();
    const c = this.d.counts; c.seen++; this.dirty = true;
    if (!this.sampled(t.mint)) return false;
    if (this.pending.size >= this.cfg.maxQueue) { c.skippedQueue++; return false; }
    c.sampled++;
    const e = { mint: t.mint, sym: t.symbol || '', at: t.at || this.now(), state: 'buy', filledAt: 0 };
    this.pending.set(t.mint, e);
    const wait = Math.max(0, e.at + this.cfg.delayMs - this.now());
    this.schedule(() => this.buy(e), wait);
    return true;
  }
  async buy(e) {
    if (!this.pending.has(e.mint)) return;
    const k = this.cfg, c = this.d.counts;
    try {
      const q = await this.o.quote(SOL_MINT, e.mint, String(Math.floor(k.sizeSol * 1e9)));
      const out = BigInt(String(q.outAmount));
      if (out <= 0n) throw Object.assign(new Error('quantità nulla'), { noRoute: true });
      e.filledAt = this.now(); e.latency = e.filledAt - e.at; e.impact = Math.max(0, Number(q.priceImpactPct) || 0) * 100;
      e.tokens = (out * BigInt(Math.round((1 - k.feePct / 100) * 10000)) / 10000n).toString();    // la commissione di acquisto si toglie dai token ricevuti
      e.state = 'hold'; c.filled++; this.dirty = true;
      this.schedule(() => this.sell(e, 1), k.holdMs);
    } catch (err) {
      const late = this.now() - e.at + k.retryMs > k.giveUpMs;
      if (!late) { this.schedule(() => this.buy(e), k.retryMs); return; }
      if (err && err.noRoute) c.noRouteBuy++; else c.errBuy++;
      this.why('buy', err);
      this.pending.delete(e.mint); this.dirty = true;
    }
  }
  async sell(e, tries) {
    if (!this.pending.has(e.mint)) return;
    const k = this.cfg, c = this.d.counts;
    try {
      const last = tries >= k.sellTries, loose = !!(last && k.sellFallback);
      const q = await this.o.quote(e.mint, SOL_MINT, e.tokens, loose ? { loose: true } : undefined);
      if (loose) e.fb = 1;
      const back = Number(q.outAmount) / 1e9 * (1 - k.feePct / 100) - k.prioritySol, cost = k.sizeSol + k.prioritySol;
      this.close(e, (Math.max(0, back) / cost - 1) * 100, false);
    } catch (err) {
      if (tries < k.sellTries) { this.schedule(() => this.sell(e, tries + 1), k.sellRetryMs); return; }
      if (err && err.noRoute) { c.noRouteSell++; this.why('sell', err); this.close(e, -100, true); }          // non si riesce a vendere: perdita totale
      else { c.errSell++; this.pending.delete(e.mint); this.dirty = true; }               // errore di rete: l'operazione non conta
    }
  }
  close(e, pnlPct, stuck) {
    const k = this.cfg, d = this.d;
    d.trades.push({ s: d.series, at: e.at, m: e.mint, sym: e.sym, lat: e.latency, imp: +e.impact.toFixed(2), pnl: +pnlPct.toFixed(2), hold: this.now() - e.filledAt, stuck: stuck ? 1 : 0, fb: e.fb ? 1 : 0 });
    if (d.trades.length > k.maxTrades) d.trades.splice(0, d.trades.length - k.maxTrades);
    d.lat.push(e.latency); if (d.lat.length > 2000) d.lat.splice(0, d.lat.length - 2000);
    this.pending.delete(e.mint); this.dirty = true;
  }
  // motivo dell'errore di rotta (codice o testo breve di Jupiter), per capire se la rotta manca davvero
  why(side, err) { const k = side + ':' + String((err && (err.code || err.message)) || 'n/d').slice(0, 60); this.d.why[k] = (this.d.why[k] || 0) + 1; }
  stop() { this.stopped = true; }
  // attende le posizioni aperte (fine run); quelle rimaste si contano come interrotte e non entrano nelle statistiche
  async drain(maxMs) {
    const t0 = this.now();
    while (this.pending.size && this.now() - t0 < maxMs) await new Promise((r) => (this.o.sleep ? this.o.sleep(500).then(r) : setTimeout(r, 500)));
    if (this.pending.size) { this.d.counts.interrupted += this.pending.size; this.pending.clear(); this.dirty = true; }
    this.flush();
  }

  summary() {
    const k = this.cfg, d = this.d, xs = d.trades.filter((t) => t.s === d.series).map((t) => t.pnl), n = xs.length;
    const out = { series: d.series, since: d.since, cfg: d.cfg, counts: d.counts, why: d.why || {}, n, need: k.passN, verdict: 'in corso' };
    const lat = d.lat; if (lat.length) { out.latMedianMs = median(lat); out.latP90Ms = pct(lat, 0.9); }
    const tried = d.counts.sampled; if (tried) out.quotable = +(100 * d.counts.filled / tried).toFixed(1);
    if (n >= 2) {
      const mean = xs.reduce((a, b) => a + b, 0) / n, sd = Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1)), se = sd / Math.sqrt(n);
      const sorted = [...xs].sort((a, b) => a - b), pos = xs.filter((v) => v > 0).reduce((a, b) => a + b, 0), top = sorted.slice(Math.floor(n * 0.99)).filter((v) => v > 0).reduce((a, b) => a + b, 0);
      Object.assign(out, { mean: +mean.toFixed(2), sd: +sd.toFixed(1), ciLo: +(mean - 1.96 * se).toFixed(2), ciHi: +(mean + 1.96 * se).toFixed(2), median: +median(xs).toFixed(2),
        win: +(100 * xs.filter((v) => v > 0).length / n).toFixed(1), stuck: d.trades.filter((t) => t.s === d.series && t.stuck).length, viaFallback: d.trades.filter((t) => t.s === d.series && t.fb).length, topShare: pos > 0 ? +(100 * top / pos).toFixed(0) : 0 });
      if (n >= k.passN) out.verdict = (out.mean >= k.passMeanPct && out.ciLo > 0) ? 'passa' : 'non passa';
    }
    return out;
  }
}

module.exports = { Snipe, DEFAULTS, SOL_MINT, CFG_KEYS };

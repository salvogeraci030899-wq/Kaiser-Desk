// KAISER · ricerca sui creatori, sempre attiva (solo lettura di dati pubblici, nessun ordine, nessun segreto).
// Due fonti. 1) Ogni nuovo token visto nascere dal flusso (mint, creatore, istante): la memoria dei lanci. 2) Ogni Coin della fascia alta (da `bandMin` in su) vista dal Radar:
// si risale al creatore e si registra la market cap iniziale e il massimo raggiunto; una Coin e' «raddoppiata» se il massimo supera il doppio della prima lettura in fascia.
// Con queste due si costruisce il profilo di ogni creatore, mostrato nell'avviso. Il profilo e' un'informazione per decidere (Prendo o Scarto), non un punteggio che apre ordini.
// Limiti dichiarati: il creatore di una Coin nata prima della nostra memoria si cerca con una richiesta esterna facoltativa; se non risponde il creatore resta sconosciuto.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Farm = require('./farm.js');

const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const HIGH = 5000;            // «arrivato in alto» sulla curva: stessa soglia usata nell'analisi dei creatori
const BAND_KEEP = 3000;       // Coin di fascia alta ricordate al massimo

class Creators {
  constructor(o) {
    this.dir = o.dir || ''; this.bandFile = o.bandFile || ''; this.now = o.now || Date.now; this.log = o.log || (() => {}); this.fetch = o.fetch || null;
    this.apiUrl = o.apiUrl === undefined ? 'https://frontend-api-v3.pump.fun/coins/' : o.apiUrl;
    this.byMint = new Map();         // mint -> creatore
    this.launches = new Map();       // creatore -> { n, high }
    this.band = {};                  // mint -> { c: creatore, s: simbolo, f: prima market cap in fascia, m: massimo, t: prima lettura }
    this.neg = new Map();            // mint -> istante dell'ultimo tentativo fallito
    this.buf = [];                   // nuovi lanci da salvare
    this.cov = { tabella: 0, esterna: 0, sconosciuto: 0 }; this.dirty = false; this.apiBusy = 0;
  }
  load() {
    for (const r of Farm.loadCreators(this.dir)) this._launch(r.m, r.cr, r.mx >= HIGH);
    if (this.bandFile) { try { const d = JSON.parse(fs.readFileSync(this.bandFile, 'utf8')); if (d && d.band && typeof d.band === 'object') this.band = d.band; } catch { /* ancora niente */ } }
    for (const [m, b] of Object.entries(this.band)) if (b && b.c && !this.byMint.has(m)) this.byMint.set(m, b.c);
    return this;
  }
  _launch(mint, cr, high) {
    if (!MINT_RE.test(mint || '') || !MINT_RE.test(cr || '')) return false;
    if (this.byMint.has(mint)) return false;
    this.byMint.set(mint, cr); const l = this.launches.get(cr) || { n: 0, high: 0 }; l.n++; if (high) l.high++; this.launches.set(cr, l); return true;
  }
  // nuovo token visto nascere dal flusso
  noteLaunch(t) {
    if (!t || !t.mint || !t.creator) return false;
    if (!this._launch(t.mint, t.creator, false)) return false;
    this.buf.push({ m: t.mint, cr: t.creator, at: t.at || this.now(), mx: 0 }); if (this.buf.length > 5000) this.buf.splice(0, this.buf.length - 5000); return true;
  }
  drain() { return this.buf.splice(0); }
  // creatore di una Coin: tabella dei lanci, poi (facoltativo) richiesta esterna con pausa dopo un fallimento
  async creatorOf(mint) {
    const c = this.byMint.get(mint); if (c) { this.cov.tabella++; return c; }
    const f = this.fetch; if (!f || !this.apiUrl || !MINT_RE.test(mint || '')) { this.cov.sconosciuto++; return ''; }
    const now = this.now(), last = this.neg.get(mint);
    if (last && now - last < 30 * 60000) { this.cov.sconosciuto++; return ''; }
    if (this.apiBusy >= 2) { this.cov.sconosciuto++; return ''; }
    this.apiBusy++;
    try {
      const r = await f(this.apiUrl + mint, { signal: AbortSignal.timeout(4000), headers: { accept: 'application/json' } });
      const j = r && r.ok ? await r.json() : null, cr = j && typeof j.creator === 'string' ? j.creator : '';
      if (MINT_RE.test(cr)) { this.byMint.set(mint, cr); this.cov.esterna++; return cr; }
    } catch { /* la richiesta e' facoltativa */ } finally { this.apiBusy--; }
    this.neg.set(mint, now); this.cov.sconosciuto++; return '';
  }
  // Coin di fascia alta vista dal Radar con la sua market cap in dollari
  noteBand(mint, sym, mc, cr) {
    if (!mint || !(mc > 0)) return null;
    let b = this.band[mint];
    if (!b) { if (!cr) return null; b = this.band[mint] = { c: cr, s: String(sym || '').slice(0, 20), f: Math.round(mc), m: Math.round(mc), t: this.now() }; this.dirty = true; this._trim(); }
    else if (mc > b.m) { b.m = Math.round(mc); this.dirty = true; }
    return b;
  }
  _trim() { const k = Object.keys(this.band); if (k.length <= BAND_KEEP) return; k.sort((a, b) => this.band[a].t - this.band[b].t); for (const m of k.slice(0, k.length - BAND_KEEP)) delete this.band[m]; }
  // profilo del creatore: lanci noti, quanti in alto sulla curva, Coin viste in fascia, quante raddoppiate, massimo raggiunto
  stats(cr) {
    if (!cr) return null;
    const l = this.launches.get(cr) || { n: 0, high: 0 };
    let bandN = 0, doubled = 0, best = 0;
    for (const b of Object.values(this.band)) if (b.c === cr) { bandN++; if (b.m >= 2 * b.f) doubled++; if (b.m > best) best = b.m; }
    return { launches: l.n, high: l.high, band: bandN, doubled, best };
  }
  tier(s) { return !s ? 0 : s.doubled >= 1 ? 3 : s.band >= 1 ? 2 : s.high >= 2 ? 1 : 0; }
  line(s) {
    if (!s) return 'creatore sconosciuto';
    const bits = [];
    if (s.band) bits.push(`${s.band} Coin in fascia alta, ${s.doubled} raddoppiate`);
    if (s.launches) bits.push(`${s.launches} token lanciati, ${s.high} arrivati in alto`);
    return bits.length ? 'creatore: ' + bits.join('; ') : 'creatore: nessuno storico';
  }
  // Vista compatta per l'app: i creatori con Coin in fascia alta (prima quelli con Coin raddoppiate) e le Coin viste di recente; indirizzi abbreviati
  view(n) {
    const lim = n || 10, short = (a) => (a ? a.slice(0, 4) + '...' + a.slice(-4) : ''), per = new Map();
    for (const b of Object.values(this.band)) { const p = per.get(b.c) || { c: b.c, band: 0, doubled: 0, best: 0 }; p.band++; if (b.m >= 2 * b.f) p.doubled++; if (b.m > p.best) p.best = b.m; per.set(b.c, p); }
    const top = [...per.values()].sort((a, b) => b.doubled - a.doubled || b.best - a.best).slice(0, lim).map((p) => { const l = this.launches.get(p.c) || { n: 0, high: 0 }; return { c: short(p.c), band: p.band, doubled: p.doubled, best: p.best, launches: l.n, high: l.high }; });
    const coins = Object.entries(this.band).sort((a, b) => b[1].t - a[1].t).slice(0, 12).map(([, b]) => ({ s: b.s, c: short(b.c), f: b.f, m: b.m, t: b.t }));
    return { ...this.summary(), top, coins };
  }
  save() {
    if (!this.bandFile || !this.dirty) return false;
    try { fs.mkdirSync(path.dirname(this.bandFile), { recursive: true }); fs.writeFileSync(this.bandFile, JSON.stringify({ v: 1, band: this.band })); this.dirty = false; return true; } catch { return false; }
  }
  summary() {
    const bandN = Object.keys(this.band).length; let doubled = 0; const crs = new Set(), good = new Set();
    for (const b of Object.values(this.band)) { crs.add(b.c); if (b.m >= 2 * b.f) { doubled++; good.add(b.c); } }
    return { launches: this.byMint.size, creators: this.launches.size, bandCoins: bandN, bandCreators: crs.size, doubled, doubledCreators: good.size, cov: { ...this.cov } };
  }
}
// fascia di market cap (dollari) per i report e gli avvisi
function bandOf(mc) { return mc >= 2e6 ? '2M+' : mc >= 1e6 ? '1M-2M' : mc >= 5e5 ? '500K-1M' : 'sotto 500K'; }

module.exports = { Creators, bandOf, HIGH, BAND_KEEP };

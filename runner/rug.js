// KAISER · analisi dei rug (solo misura, nessun ordine). Un "rug" e' un crollo del prezzo: entro 5 minuti dalla soglia di market cap il prezzo scende al 25% o meno
// del prezzo d'ingresso ("crollo" se al 50% o meno). L'analisi misura quanto spesso succede, quali segnali noti AL MOMENTO della soglia (percorso del prezzo e, quando ci sono,
// la distribuzione dei possessori) lo anticipano, se un filtro scelto sui dati vecchi regge su quelli recenti e se, tolti i rug, resta una regola positiva.
'use strict';
const Farm = require('./farm.js');
// Nota: la regola provata su un gruppo filtrato entra SOLO alla soglia con cui si e' filtrato. Con una soglia piu' bassa la regola sceglierebbe
// i token gia' noti per aver superato quella piu' alta (informazione dal futuro) e i risultati sarebbero falsamente ottimi.

const RUG_AT = 0.25, DUMP_AT = 0.5, WIN_BINS = 60, MIN_BINS = 24;      // finestra di 5 minuti (60 intervalli), almeno 2 minuti di storia
const MIN_KEEP_N = 100, MIN_KEEP_SHARE = 0.25;
const NAMES = { t: 'secondi dalla nascita', gap: 'salto alla soglia', speed: 'velocita\' di salita', dd: 'calo massimo prima', act: 'attivita\'', vol: 'volatilita\'', top1: 'primo possessore', top3: 'primi 3 possessori', top10: 'primi 10 possessori', cre: 'quota del creatore' };
const PATH_FEATS = ['t', 'gap', 'speed', 'dd', 'act', 'vol'], HOLD_FEATS = ['top1', 'top3', 'top10', 'cre'];

// Misure sul percorso fino all'intervallo i della soglia (niente informazioni dal futuro)
function feats(p, i) {
  let peak = p[0], dd = 0, ch = 0; const lr = [];
  for (let k = 1; k <= i; k++) { if (p[k] > peak) peak = p[k]; dd = Math.max(dd, peak > 0 ? 1 - p[k] / peak : 0); if (p[k] !== p[k - 1] && p[k] > 0 && p[k - 1] > 0) { ch++; lr.push(Math.log(p[k] / p[k - 1])); } }
  const mean = lr.length ? lr.reduce((a, b) => a + b, 0) / lr.length : 0, sd = lr.length > 1 ? Math.sqrt(lr.reduce((a, b) => a + (b - mean) ** 2, 0) / (lr.length - 1)) : 0;
  return { t: i * Farm.BIN, gap: p[i - 1] > 0 ? p[i] / p[i - 1] : 1, speed: p[0] > 0 ? Math.log(p[i] / p[0]) / Math.max(1, i * Farm.BIN) * 60 : 0, dd, act: i > 0 ? ch / i : 0, vol: sd };
}
function label(p, i) {
  const w = Math.min(WIN_BINS, p.length - 1 - i); if (w < MIN_BINS || !(p[i] > 0)) return null;
  let mn = Infinity; for (let k = i + 1; k <= i + w; k++) if (p[k] < mn) mn = p[k]; const r = mn / p[i];
  return { rug: r <= RUG_AT, dump: r <= DUMP_AT, r };
}
const pct = (a, n) => (n ? +(100 * a / n).toFixed(1) : 0);
const quant = (xs, q) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(q * s.length))] : 0; };
const fmt = (v) => (Math.abs(v) >= 100 ? Math.round(v) : +v.toFixed(Math.abs(v) < 1 ? 3 : 2));
function rate(rows) { let rug = 0, dump = 0; for (const r of rows) { if (r.lab.rug) rug++; if (r.lab.dump) dump++; } return { n: rows.length, rug: pct(rug, rows.length), dump: pct(dump, rows.length) }; }

// holders: mappa mint -> { top1, top3, top10, cre } (opzionale)
function analyze(recs, thr, o) {
  const holders = (o && o.holders) || new Map(), sorted = [...recs].sort((a, b) => a.at - b.at), cutAt = sorted.length ? sorted[Math.floor(sorted.length * 0.6)].at : 0, rows = [];
  for (const r of sorted) {
    const i = Farm.crossIdx ? Farm.crossIdx(r.p, thr / r.u) : -1; if (i < 1) continue; const lab = label(r.p, i); if (!lab) continue;
    const f = feats(r.p, i), h = holders.get(r.m); if (h) for (const k of HOLD_FEATS) if (Number.isFinite(h[k])) f[k] = h[k];
    rows.push({ rec: r, f, lab, train: r.at < cutAt });
  }
  const train = rows.filter((x) => x.train), test = rows.filter((x) => !x.train), out = { thr, n: rows.length, base: { all: rate(rows), train: rate(train), test: rate(test) }, feats: {}, filters: [] };
  if (rows.length < 50) return out;
  const names = [...PATH_FEATS, ...HOLD_FEATS].filter((k) => rows.filter((x) => Number.isFinite(x.f[k])).length >= 200);
  const cand = [];
  for (const k of names) {
    const vals = train.filter((x) => Number.isFinite(x.f[k])).map((x) => x.f[k]); if (vals.length < 60) continue;
    const cuts = [0.25, 0.5, 0.75].map((q) => quant(vals, q)), edges = [-Infinity, ...cuts, Infinity];
    out.feats[k] = { name: NAMES[k], buckets: [0, 1, 2, 3].map((b) => { const g = rows.filter((x) => { const v = x.f[k]; if (!Number.isFinite(v)) return false; return b === 0 ? v <= edges[1] : (v > edges[b] && v <= edges[b + 1]); }); return { lo: b === 0 ? null : fmt(edges[b]), hi: b === 3 ? null : fmt(edges[b + 1]), ...rate(g) }; }) };
    for (const cut of cuts) for (const dir of ['basso', 'alto']) {
      const keep = (x) => Number.isFinite(x.f[k]) && (dir === 'basso' ? x.f[k] <= cut : x.f[k] > cut), tk = train.filter(keep), share = train.length ? tk.length / train.length : 0;
      if (tk.length < MIN_KEEP_N || share < MIN_KEEP_SHARE) continue;
      cand.push({ k, dir, cut, keep, tr: rate(tk), share });
    }
  }
  cand.sort((a, b) => a.tr.rug - b.tr.rug);
  const used = new Set();
  for (const c of cand) {
    if (out.filters.length >= 3) break; if (used.has(c.k)) continue; used.add(c.k);
    const kt = test.filter(c.keep), kept = rows.filter(c.keep).map((x) => x.rec), fr = kept.length >= 200 ? Farm.run(kept, Object.assign({}, (o && o.farm) || {}, { grid: Object.assign({}, Farm.GRID, { thr: [thr] }) })) : null;
    out.filters.push({ feat: c.k, name: NAMES[c.k], dir: c.dir, cut: fmt(c.cut), train: { keep: pct(c.tr.n, train.length), rug: c.tr.rug, dump: c.tr.dump }, test: { keep: pct(kt.length, test.length), ...rate(kt) },
      farm: fr ? { paths: fr.paths, posTrain: fr.posTrain, passed: fr.passed, bestTrain: fr.bestTrain && { cfg: fr.bestTrain.cfg, tr: fr.bestTrain.tr, te: fr.bestTrain.te }, bestTest: fr.bestTest && { cfg: fr.bestTest.cfg, tr: fr.bestTest.tr, te: fr.bestTest.te } } : null });
  }
  return out;
}

module.exports = { RUG_AT, DUMP_AT, WIN_BINS, MIN_BINS, NAMES, PATH_FEATS, HOLD_FEATS, feats, label, analyze };

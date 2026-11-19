// KAISER · ricerca "filtro + regola" con controllo delle false scoperte (solo misura, nessun ordine).
// Si provano insieme molti filtri sui segnali noti alla soglia (percorso, possessori, creatore, social, attivita' iniziale) e 24 regole di entrata/uscita.
// Tra centinaia di combinazioni una sembra sempre buona per caso: per questo il risultato migliore si confronta con quello che si otterrebbe con segnali SCAMBIATI A CASO
// tra i token (stessa ricerca, stessi tagli, nessun legame con l'esito). La quota di volte in cui il caso fa altrettanto bene e' il "p": sotto 5% il segnale e' credibile,
// sopra e' molto probabilmente un colpo di fortuna della ricerca.
'use strict';
const Farm = require('./farm.js'), Rug = require('./rug.js');

const RULES = (() => { const out = []; for (const delay of [0, 10]) for (const tp of [10, 20, 30]) for (const sl of [10, 20]) for (const hold of [60, 300]) out.push({ delay, tp, sl, hold }); return out; })();
const MIN_TR = 60, MIN_TE = 40, MIN_VALUES = 200, SPLIT = 0.6, CUTS = [0.25, 0.5, 0.75];
const FEATS = [...Rug.PATH_FEATS, ...Rug.HOLD_FEATS, ...Rug.CRE_FEATS];
const q = (xs, p) => { const s = Float64Array.from(xs).sort(); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0; };

// Costruisce la tabella: una riga per token che supera la soglia, i segnali noti alla soglia e l'esito netto di ogni regola
function build(recs, thr, o) {
  const holders = (o && o.holders) || new Map(), cidx = Rug.creatorIndex((o && o.creators) || []), rows = [];
  for (const r of [...recs].sort((a, b) => a.at - b.at)) {
    const i = Farm.crossIdx(r.p, thr / r.u); if (i < 1) continue;
    const f = Rug.feats(r.p, i), h = holders.get(r.m); if (h) for (const k of Rug.HOLD_FEATS) if (Number.isFinite(h[k])) f[k] = h[k];
    Object.assign(f, Rug.creatorFeats(cidx, r.cr, r.m, r.at));
    const net = new Float64Array(RULES.length); let any = false;
    RULES.forEach((c, k) => { const x = Farm.simulate(r.p, r.u, { thr, ...c }); net[k] = x ? x.net : NaN; if (x) any = true; });
    if (any) rows.push({ f, net, at: r.at });
  }
  return rows;
}
// Statistiche di (filtro, regola): media su dati vecchi e recenti
function evalMask(rows, cut, mask, k) {
  let nt = 0, st = 0, ne = 0, se = 0;
  for (let i = 0; i < rows.length; i++) { if (!mask[i]) continue; const v = rows[i].net[k]; if (v !== v) continue; if (i < cut) { nt++; st += v; } else { ne++; se += v; } }
  return { nt, ne, tr: nt ? st / nt : -Infinity, te: ne ? se / ne : -Infinity };
}
function search(rows, cut, filters, getMask) {
  let best = null; const all = [];
  for (const fl of filters) {
    const mask = getMask(fl);
    for (let k = 0; k < RULES.length; k++) {
      const e = evalMask(rows, cut, mask, k); if (e.nt < MIN_TR || e.ne < MIN_TE) continue;
      const score = Math.min(e.tr, e.te); if (!best || score > best.score) best = { fl, k, e, score };
      all.push({ fl, k, e, score });
    }
  }
  return { best, all };
}
const r2 = (x) => +x.toFixed(2);
function run(recs, o) {
  const thr = (o && o.thr) || 7500, B = (o && o.perms) == null ? 100 : o.perms, t0 = Date.now(), rows = build(recs, thr, o);
  const out = { at: (o && o.now) || Date.now(), thr, n: rows.length, rules: RULES.length, filters: 0, tests: 0, perm: { B, p: null }, best: null, base: null, top: [] };
  if (rows.length < 200) return out;
  const cut = Math.floor(rows.length * SPLIT), feats = FEATS.filter((k) => rows.filter((r) => Number.isFinite(r.f[k])).length >= MIN_VALUES);
  const N = rows.length, vals = {}; for (const k of feats) { vals[k] = new Float64Array(N); for (let i = 0; i < N; i++) vals[k][i] = Number.isFinite(rows[i].f[k]) ? rows[i].f[k] : NaN; }
  const filters = [{ k: null, dir: 'tutti', cut: 0 }]; for (const k of feats) { const tr = []; for (let i = 0; i < cut; i++) if (vals[k][i] === vals[k][i]) tr.push(vals[k][i]); for (const c of [...new Set(CUTS.map((p) => q(tr, p)))]) for (const dir of ['basso', 'alto']) filters.push({ k, dir, cut: c }); }
  out.filters = filters.length - 1; out.tests = (filters.length - 1) * RULES.length;
  const maskOf = (v) => (fl) => { const m = new Uint8Array(N); if (fl.k === null) { m.fill(1); return m; } const a = v[fl.k]; for (let i = 0; i < N; i++) { const x = a[i]; m[i] = x === x && (fl.dir === 'basso' ? x <= fl.cut : x > fl.cut) ? 1 : 0; } return m; };
  const real = search(rows, cut, filters, maskOf(vals));
  const label = (b) => b && { feat: b.fl.k, name: b.fl.k ? Rug.NAMES[b.fl.k] || b.fl.k : 'nessun filtro', dir: b.fl.dir, cut: b.fl.k ? +Number(b.fl.cut).toPrecision(3) : null, rule: { thr, ...RULES[b.k] }, tr: { n: b.e.nt, ev: r2(b.e.tr) }, te: { n: b.e.ne, ev: r2(b.e.te) }, score: r2(b.score) };
  out.best = label(real.best); out.base = label(search(rows, cut, [filters[0]], maskOf(vals)).best);
  out.top = real.all.filter((x) => x.fl.k).sort((a, b) => b.score - a.score).slice(0, 5).map(label);
  // permutazioni: i segnali di ogni token vengono scambiati a caso (stessi tagli, stessa ricerca): quanto bene fa il caso?
  const rnd = (o && o.rng) || Math.random; const bests = [];
  for (let b = 0; b < B; b++) {
    const pv = {}; for (const k of feats) { const idx = Array.from({ length: N }, (_, i) => i); for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } const a = new Float64Array(N); for (let i = 0; i < N; i++) a[i] = vals[k][idx[i]]; pv[k] = a; }
    const s = search(rows, cut, filters.filter((x) => x.k), maskOf(pv)).best; bests.push(s ? s.score : -Infinity);
  }
  if (B > 0 && out.best) { const ge = bests.filter((x) => x >= out.best.score).length; out.perm = { B, p: +((ge + 1) / (B + 1)).toFixed(3), median: r2(bests.slice().sort((a, b) => a - b)[bests.length >> 1]) }; }
  out.ms = Date.now() - t0; return out;
}

module.exports = { RULES, MIN_TR, MIN_TE, build, run };

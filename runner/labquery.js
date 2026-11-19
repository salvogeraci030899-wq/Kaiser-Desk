// KAISER · Studio del Laboratorio: prove su richiesta sui percorsi registrati (solo analisi, nessun ordine, nessuna modifica alla configurazione).
// Dall'app si imposta quasi ogni aspetto del contesto: soglia di market cap, ritardo, target, stop, tempo massimo, trailing, costi, periodo, eta' del token alla soglia,
// fino a 3 filtri sui segnali (percorso e possessori) e, se serve, la variazione di un parametro su un intervallo. Tutti i valori sono numeri entro limiti fissi:
// nessun indirizzo, nessun testo libero. Il risultato separa dati vecchi e recenti e mostra i giorni uno per uno, perche' una regola vale solo se regge nel tempo.
'use strict';
const fs = require('node:fs'), path = require('node:path');
const Farm = require('./farm.js'), Rug = require('./rug.js');

const FIELDS = {
  thr: { min: 3000, max: 60000, def: 10000 }, delay: { min: 0, max: 120, def: 10 }, tp: { min: 2, max: 1000, def: 20 }, sl: { min: 2, max: 99, def: 15 }, hold: { min: 0, max: 1260, def: 120 },
  trail: { min: 0, max: 90, def: 0 }, cost: { min: 0, max: 20, def: 7 }, days: { min: 0, max: 14, def: 0 }, tMin: { min: 0, max: 1260, def: 0 }, tMax: { min: 0, max: 1260, def: 0 },
};
const FILTER_FEATS = ['t', 'gap', 'speed', 'dd', 'act', 'vol', 'top1', 'top3', 'top10', 'cre', 'crN', 'crHit', 'crMed', 'soc', 'tw', 'tg', 'web', 's0', 'n60', 'fail', 'devBuy', 'gs', 'gh', 'go', 'gk', 'gm', 'gf'], SWEEP = ['thr', 'delay', 'tp', 'sl', 'hold', 'trail', 'cost', 'tMin', 'tMax'], MAX_POINTS = 25;
const r4 = (x) => +Number(x).toFixed(4), isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function validate(spec) {
  const s = spec && typeof spec === 'object' ? spec : {}, out = { mode: s.mode === 'sweep' ? 'sweep' : 'single' }, errors = [];
  for (const [k, f] of Object.entries(FIELDS)) {
    const raw = s[k] == null || s[k] === '' ? f.def : Number(s[k]);
    if (!Number.isFinite(raw) || raw < f.min || raw > f.max) errors.push({ key: k, msg: `fuori limiti (${f.min}-${f.max})` }); else out[k] = r4(raw);
  }
  if (isNum(out.tMax) && out.tMax > 0 && out.tMax < out.tMin) errors.push({ key: 'tMax', msg: 'minore del minimo' });
  out.filters = [];
  if (s.filters != null) {
    if (!Array.isArray(s.filters) || s.filters.length > 3) errors.push({ key: 'filters', msg: 'al massimo 3 filtri' });
    else for (const f of s.filters) {
      if (!f || !FILTER_FEATS.includes(f.f) || !['<=', '>'].includes(f.op) || !Number.isFinite(Number(f.v)) || Math.abs(Number(f.v)) > 1e6) errors.push({ key: 'filters', msg: 'filtro non valido' }); else out.filters.push({ f: f.f, op: f.op, v: r4(Number(f.v)) });
    }
  }
  if (out.mode === 'sweep') {
    const w = s.sweep || {}, fld = FIELDS[w.p], from = Number(w.from), to = Number(w.to), step = Number(w.step);
    if (!SWEEP.includes(w.p) || !Number.isFinite(from) || !Number.isFinite(to) || !(step > 0) || to <= from) errors.push({ key: 'sweep', msg: 'variazione non valida' });
    else if (from < fld.min || to > fld.max) errors.push({ key: 'sweep', msg: `fuori limiti (${fld.min}-${fld.max})` });
    else if (Math.floor((to - from) / step) + 1 > MAX_POINTS) errors.push({ key: 'sweep', msg: `al massimo ${MAX_POINTS} punti` });
    else out.sweep = { p: w.p, from: r4(from), to: r4(to), step: r4(step) };
  }
  return { ok: errors.length === 0, spec: out, errors };
}

// Una operazione: ingresso alla soglia piu' il ritardo, uscita a stop, target, trailing (dal massimo, se il prezzo e' salito) o tempo massimo; prezzi letti, costi inclusi
function sim(p, i, spec) {
  const j = i + Math.round(spec.delay / Farm.BIN); if (j >= p.length - 12 || !(p[j] > 0)) return null;
  const e = p[j], maxB = spec.hold ? Math.round(spec.hold / Farm.BIN) : Infinity, fin = (r, why, b) => ({ net: (r - 1) * 100 - spec.cost, why, held: b * Farm.BIN }); let peak = e;
  for (let k = j + 1; k < p.length; k++) {
    const pr = p[k], r = pr / e; if (pr > peak) peak = pr;
    if (r <= 1 - spec.sl / 100) return fin(r, 'stop', k - j);
    if (r >= 1 + spec.tp / 100) return fin(r, 'target', k - j);
    if (spec.trail && peak > e && pr <= peak * (1 - spec.trail / 100)) return fin(r, 'trailing', k - j);
    if (k - j >= maxB) return fin(r, 'tempo', k - j);
  }
  return fin(p[p.length - 1] / e, 'fine', p.length - 1 - j);
}
function evalOne(recs, holders, spec, now, cidx) {
  const cut = spec.days ? now - spec.days * 86400000 : 0, trades = [];
  for (const r of recs) {
    if (r.at < cut) continue; const i = Farm.crossIdx(r.p, spec.thr / r.u); if (i < 1) continue;
    const t = i * Farm.BIN; if (t < spec.tMin || (spec.tMax > 0 && t > spec.tMax)) continue;
    if (spec.filters.length) {
      const f = Rug.feats(r.p, i), h = holders.get(r.m); if (h) for (const k of Rug.HOLD_FEATS) if (Number.isFinite(h[k])) f[k] = h[k];
      if (cidx) Object.assign(f, Rug.creatorFeats(cidx, r.cr, r.m, r.at));
      let ok = true; for (const x of spec.filters) { const v = f[x.f]; if (!Number.isFinite(v) || !(x.op === '<=' ? v <= x.v : v > x.v)) { ok = false; break; } }
      if (!ok) continue;
    }
    const x = sim(r.p, i, spec); if (x) trades.push({ ...x, at: r.at });
  }
  return trades;
}
const BUCKETS = [['fino a -60%', -Infinity, -60], ['-60 / -30%', -60, -30], ['-30 / 0%', -30, 0], ['0 / +30%', 0, 30], ['oltre +30%', 30, Infinity]];
function stats(tr) {
  const n = tr.length; if (!n) return { n: 0 };
  let sum = 0, win = 0, gain = 0, loss = 0; for (const x of tr) { sum += x.net; if (x.net > 0) { win++; gain += x.net; } else loss -= x.net; }
  const s = tr.map((x) => x.net).sort((a, b) => a - b), mean = sum / n, sd = Math.sqrt(tr.reduce((a, x) => a + (x.net - mean) ** 2, 0) / Math.max(1, n - 1));
  return { n, ev: +mean.toFixed(2), win: Math.round(100 * win / n), pf: loss > 0 ? +(gain / loss).toFixed(2) : (gain > 0 ? 99 : 0), median: +s[n >> 1].toFixed(1), worst: +s[0].toFixed(1), best: +s[n - 1].toFixed(1), se: +(sd / Math.sqrt(n)).toFixed(2) };
}
function detail(tr, now) {
  const sorted = [...tr].sort((a, b) => a.at - b.at), cut = Math.floor(sorted.length * 0.6), out = { all: stats(sorted), train: stats(sorted.slice(0, cut)), test: stats(sorted.slice(cut)) };
  out.buckets = BUCKETS.map(([l, lo, hi]) => ({ l, n: sorted.filter((x) => x.net > lo && x.net <= hi).length }));
  out.reasons = {}; for (const x of sorted) out.reasons[x.why] = (out.reasons[x.why] || 0) + 1;
  const days = new Map(); for (const x of sorted) { const d = new Date(x.at).toISOString().slice(0, 10), a = days.get(d) || { n: 0, sum: 0 }; a.n++; a.sum += x.net; days.set(d, a); }
  out.byDay = [...days.entries()].map(([d, a]) => ({ d, n: a.n, ev: +(a.sum / a.n).toFixed(1) }));
  let cum = 0, peak = 0, dd = 0; const eq = []; for (const x of sorted) { cum += x.net; eq.push(cum); peak = Math.max(peak, cum); dd = Math.max(dd, peak - cum); }
  const step = Math.max(1, Math.ceil(eq.length / 60)); out.equity = eq.filter((_, k) => k % step === 0 || k === eq.length - 1).map((v) => +v.toFixed(0)); out.maxDd = +dd.toFixed(0);
  return out;
}
function run(recs, holders, spec, o) {
  const now = (o && o.now) || Date.now(), t0 = Date.now(), res = { mode: spec.mode, spec, meta: { paths: recs.length, holders: holders.size, span: recs.length ? { from: Math.min(...recs.map((r) => r.at)), to: Math.max(...recs.map((r) => r.at)) } : null } };
  if (spec.mode === 'sweep') {
    const w = spec.sweep, pts = []; res.points = [];
    for (let v = w.from, k = 0; v <= w.to + 1e-9 && k < MAX_POINTS; v += w.step, k++) pts.push(r4(v));
    for (const v of pts) { const d = detail(evalOne(recs, holders, { ...spec, [w.p]: v }, now, o && o.cidx), now); res.points.push({ v, n: d.all.n, ev: d.all.ev, win: d.all.win, pf: d.all.pf, trEv: d.train.n ? d.train.ev : null, teEv: d.test.n ? d.test.ev : null, trN: d.train.n, teN: d.test.n }); }
  } else Object.assign(res, detail(evalOne(recs, holders, spec, now, o && o.cidx), now));
  res.meta.ms = Date.now() - t0; return res;
}

if (require.main === module) {
  const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
  const v = validate((() => { try { return JSON.parse(arg('spec', '{}')); } catch { return {}; } })());
  if (!v.ok) { console.log(JSON.stringify({ error: 'richiesta non valida: ' + v.errors.map((e) => e.key + ' ' + e.msg).join('; ') })); process.exit(0); }
  const recs = Farm.loadAll(arg('in', 'state/lab/paths')), holders = arg('holders', '') ? Farm.loadHolders(arg('holders', '')) : new Map();
  const cr = arg('creators', '') ? Farm.loadCreators(arg('creators', '')) : [];
  console.log(JSON.stringify(run(recs, holders, v.spec, { cidx: cr.length ? Rug.creatorIndex(cr) : null })));
}

module.exports = { FIELDS, FILTER_FEATS, SWEEP, MAX_POINTS, validate, sim, evalOne, stats, detail, run };

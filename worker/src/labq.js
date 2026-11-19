// Richieste dello Studio del Laboratorio: validazione. Identica a validate() in runner/labquery.js (un test controlla che diano lo stesso risultato).
// Solo numeri entro limiti fissi: nessun indirizzo, nessun testo libero. Sono prove di analisi: non toccano la configurazione e non aprono ordini.
export const FIELDS = {
  thr: { min: 3000, max: 60000, def: 10000 }, delay: { min: 0, max: 120, def: 10 }, tp: { min: 2, max: 1000, def: 20 }, sl: { min: 2, max: 99, def: 15 }, hold: { min: 0, max: 1260, def: 120 },
  trail: { min: 0, max: 90, def: 0 }, cost: { min: 0, max: 20, def: 7 }, days: { min: 0, max: 14, def: 0 }, tMin: { min: 0, max: 1260, def: 0 }, tMax: { min: 0, max: 1260, def: 0 },
};
export const FILTER_FEATS = ['t', 'gap', 'speed', 'dd', 'act', 'vol', 'top1', 'top3', 'top10', 'cre', 'crN', 'crHit', 'crMed'], SWEEP = ['thr', 'delay', 'tp', 'sl', 'hold', 'trail', 'cost', 'tMin', 'tMax'], MAX_POINTS = 25;
const r4 = (x) => +Number(x).toFixed(4), isNum = (v) => typeof v === 'number' && Number.isFinite(v);

export function validateQuery(spec) {
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

'use strict';
// Studio del Laboratorio: validazione, simulazione con trailing e filtri, variazione di un parametro, dettaglio per giorno; stessa validazione nel Worker e nel runner.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Q = require('../runner/labquery.js');

const T = Date.UTC(2026, 10, 15, 12, 0, 0), DAY = 86400000;
// sale linearmente alla soglia (76 SOL = 7.6K a 100 $/SOL) in "cross" intervalli, poi la coda indicata (moltiplicatori del prezzo di soglia, un intervallo ciascuno)
const mk = (at, cross, tail, m) => { const p = []; for (let k = 0; k < cross; k++) p.push(30 + 46 * k / cross); p.push(76); for (const x of tail) p.push(76 * x); return { m: m || 'M' + at, at, u: 100, p }; };
const flat = (n, x) => new Array(n).fill(x), up = [1.05, 1.1, 1.15, 1.2, 1.3, ...flat(60, 1.3)], down = [0.95, 0.9, 0.85, 0.8, ...flat(60, 0.8)];
const base = { thr: 7500, delay: 0, tp: 20, sl: 10, hold: 0, trail: 0, cost: 7, days: 0, tMin: 0, tMax: 0, filters: [] };

test('validazione: valori di base, limiti, filtri e variazione; nessun testo libero', () => {
  const d = Q.validate({}); assert.equal(d.ok, true); assert.equal(d.spec.thr, 10000); assert.equal(d.spec.cost, 7); assert.equal(d.spec.mode, 'single'); assert.deepEqual(d.spec.filters, []);
  assert.equal(Q.validate({ thr: 100 }).ok, false); assert.equal(Q.validate({ sl: 150 }).ok, false); assert.equal(Q.validate({ tp: 'abc' }).ok, false); assert.equal(Q.validate({ tMin: 300, tMax: 100 }).ok, false);
  assert.equal(Q.validate({ filters: [{ f: 'dd', op: '<=', v: 0.2 }, { f: 'top1', op: '>', v: 0.1 }] }).ok, true); assert.equal(Q.validate({ filters: [{ f: 'indirizzo', op: '<=', v: 1 }] }).ok, false);
  assert.equal(Q.validate({ filters: [{ f: 'dd', op: 'like', v: 1 }] }).ok, false); assert.equal(Q.validate({ filters: new Array(4).fill({ f: 'dd', op: '<=', v: 1 }) }).ok, false);
  const s = Q.validate({ mode: 'sweep', sweep: { p: 'tp', from: 10, to: 50, step: 10 } }); assert.equal(s.ok, true); assert.deepEqual(s.spec.sweep, { p: 'tp', from: 10, to: 50, step: 10 });
  assert.equal(Q.validate({ mode: 'sweep', sweep: { p: 'tp', from: 10, to: 1000, step: 1 } }).ok, false, 'troppi punti'); assert.equal(Q.validate({ mode: 'sweep', sweep: { p: 'days', from: 1, to: 5, step: 1 } }).ok, false, 'parametro non ammesso'); assert.equal(Q.validate({ mode: 'sweep' }).ok, false);
});
test('lo stesso risultato nel Worker e nel runner', async () => {
  const W = await import('../worker/src/labq.js'), cases = [{}, { thr: 100 }, { tp: 5, sl: 5, hold: 60, trail: 20, cost: 3, days: 3 }, { filters: [{ f: 'dd', op: '<=', v: 0.3 }] }, { filters: [{ f: 'x', op: '<=', v: 1 }] }, { mode: 'sweep', sweep: { p: 'sl', from: 5, to: 25, step: 5 } }, { mode: 'sweep' }, { tMin: 50, tMax: 10 }, null, 'x', { tp: '12.5' }];
  for (const c of cases) assert.deepEqual(W.validateQuery(c), Q.validate(c), JSON.stringify(c));
  assert.deepEqual(W.FIELDS, Q.FIELDS); assert.deepEqual(W.FILTER_FEATS, Q.FILTER_FEATS); assert.deepEqual(W.SWEEP, Q.SWEEP);
});
test('simulazione: target, stop, trailing dal massimo, tempo massimo; il ritardo cambia il prezzo di ingresso', () => {
  const U = mk(T, 10, up), D = mk(T, 10, down), i = 10;
  const a = Q.sim(U.p, i, base); assert.equal(a.why, 'target'); assert.ok(Math.abs(a.net - (20 - 7)) < 0.01 || a.net > 6, 'esito netto ' + a.net);
  assert.equal(Q.sim(D.p, i, base).why, 'stop');
  const tr = mk(T, 10, [1.1, 1.2, 1.4, 1.5, 1.3, 1.2, ...flat(60, 0.95)]), t1 = Q.sim(tr.p, i, { ...base, tp: 200, trail: 15 }); assert.equal(t1.why, 'trailing'); assert.ok(Math.abs(t1.net - 13) < 0.01, 'esce al primo prezzo sotto il massimo (1.5) meno il 15%: ' + t1.net);
  const nt = Q.sim(tr.p, i, { ...base, tp: 200, trail: 0 }); assert.equal(nt.why, 'fine'); assert.ok(nt.net < 0, 'senza trailing la salita si restituisce: ' + nt.net);
  assert.equal(Q.sim(mk(T, 10, flat(70, 1.02)).p, i, { ...base, hold: 60 }).why, 'tempo'); assert.equal(Q.sim(U.p, i, { ...base, delay: 10 }).why !== undefined, true);
  const dly = Q.sim(mk(T, 10, [1.1, 1.2, 1.2, ...flat(60, 1.2)]).p, i, { ...base, tp: 50, delay: 10 }); assert.ok(dly.net < 13, 'entrando al prezzo piu\' alto il margine cala');
  assert.equal(Q.sim([50, 50, 76, 80], 2, base), null, 'poca storia dopo l\'ingresso');
});
test('contesto: soglia, periodo, eta\' alla soglia e filtri scelgono i token', () => {
  const recs = [mk(T - 5 * DAY, 10, up, 'A'), mk(T - 1 * DAY, 30, down, 'B'), mk(T, 10, down, 'C'), mk(T, 40, up, 'D')], H = new Map();
  assert.equal(Q.evalOne(recs, H, base, T).length, 4); assert.equal(Q.evalOne(recs, H, { ...base, thr: 50000 }, T).length, 0);
  assert.equal(Q.evalOne(recs, H, { ...base, days: 2 }, T).length, 3, 'solo gli ultimi 2 giorni'); assert.equal(Q.evalOne(recs, H, { ...base, tMin: 100 }, T).length, 2, 'salita lenta: almeno 100 s dalla nascita');
  assert.equal(Q.evalOne(recs, H, { ...base, tMax: 100 }, T).length, 2);
  assert.equal(Q.evalOne(recs, H, { ...base, filters: [{ f: 't', op: '>', v: 100 }] }, T).length, 2, 'filtro sul segnale');
  const h = new Map([['A', { top1: 0.5 }], ['C', { top1: 0.05 }]]); assert.equal(Q.evalOne(recs, h, { ...base, filters: [{ f: 'top1', op: '<=', v: 0.1 }] }, T).length, 1, 'filtro sui possessori: senza misura il token e\' escluso');
});
test('risultato: dati vecchi e recenti, giorno per giorno, esiti, curva cumulata; variazione di un parametro', () => {
  const recs = []; for (let i = 0; i < 40; i++) recs.push(mk(T - (4 - Math.floor(i / 10)) * DAY + i * 1000, 10, i % 4 === 0 ? down : up, 'M' + i));
  const r = Q.run(recs, new Map(), base, { now: T }); assert.equal(r.all.n, 40); assert.equal(r.train.n, 24); assert.equal(r.test.n, 16); assert.equal(r.byDay.length, 4); assert.equal(r.byDay.reduce((a, d) => a + d.n, 0), 40);
  assert.equal(r.buckets.reduce((a, b) => a + b.n, 0), 40); assert.equal(r.reasons.stop, 10); assert.equal(r.reasons.target, 30); assert.ok(r.equity.length >= 2 && r.equity.length <= 61); assert.ok(r.maxDd > 0); assert.equal(r.meta.paths, 40);
  assert.ok(r.all.win >= 70 && r.all.ev > 0 && r.all.pf > 1, JSON.stringify(r.all)); assert.equal(Q.run([], new Map(), base, { now: T }).all.n, 0);
  const sv = Q.validate({ ...base, mode: 'sweep', sweep: { p: 'sl', from: 5, to: 25, step: 5 } }), w = Q.run(recs, new Map(), sv.spec, { now: T });
  assert.equal(w.points.length, 5); assert.deepEqual(w.points.map((p) => p.v), [5, 10, 15, 20, 25]); assert.ok(w.points.every((p) => p.n > 0 && p.trN > 0 && p.teN > 0)); assert.ok(w.points[0].ev !== undefined);
  assert.ok(JSON.stringify(r).length < 30000 && JSON.stringify(w).length < 30000, 'il risultato sta nel limite del Worker');
});
test('il runner chiede le prove al Worker ogni 10 secondi, le esegue in un processo separato e riporta il risultato', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /function pumpLabQueries\(\)/); assert.match(src, /\/lab\/next/); assert.match(src, /\/lab\/result/); assert.match(src, /labquery\.js'\), '--spec'/); assert.match(src, /pumpLabQueries\(\);/); assert.match(src, /NO_LABQ/); assert.match(src, /LabQ\.validate\(q\.spec\)/);
});

test('Studio: filtri sul creatore (token gia\' creati, quota arrivata a 7.5K, massimo mediano), senza informazioni dal futuro', () => {
  const Rug = require('../runner/rug.js'), T0 = 1_700_000_000_000, M = 60000;
  assert.ok(Q.FILTER_FEATS.includes('crN') && Q.FILTER_FEATS.includes('crHit') && Q.FILTER_FEATS.includes('crMed'));
  const p = []; for (let k = 0; k < 40; k++) p.push(k < 10 ? 40 : 80); for (let k = 0; k < 40; k++) p.push(80);
  const recs = [{ m: 'n1', s: 'A', at: T0 + 200 * M, u: 100, p, cr: 'X' }, { m: 'n2', s: 'B', at: T0 + 200 * M, u: 100, p, cr: 'NUOVO' }];
  const cidx = Rug.creatorIndex([{ m: 'o1', cr: 'X', at: T0, mx: 20000 }, { m: 'o2', cr: 'X', at: T0 + 10 * M, mx: 1000 }]);
  const spec = Q.validate({ thr: 5000, delay: 0, tp: 20, sl: 15, hold: 0, filters: [{ f: 'crN', op: '>', v: 1 }] }).spec;
  assert.equal(Q.evalOne(recs, new Map(), spec, T0 + 400 * M, cidx).length, 1, 'solo il creatore con 2 token precedenti');
  assert.equal(Q.evalOne(recs, new Map(), spec, T0 + 400 * M, null).length, 0, 'senza storico dei creatori nessuno passa');
});

'use strict';
// Raccolta sui token migrati: ciclo acquisto e vendite quotate, errori, regola di superamento decisa in anticipo, evento di completamento della curva.
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { Grad, SOL_MINT } = require('../runner/grad.js');
const Lab = require('../runner/trades.js');

const mint = (i) => crypto.createHash('sha256').update('g' + i).digest('hex').slice(0, 44);
function clock(start = 1_700_000_000_000) {
  const c = { t: start, q: [] };
  c.now = () => c.t; c.schedule = (fn, ms) => { c.q.push({ at: c.t + ms, fn }); };
  c.run = async (ms) => { const end = c.t + ms; for (let i = 0; i < 12; i++) await Promise.resolve(); for (;;) { c.q.sort((a, b) => a.at - b.at); if (!c.q.length || c.q[0].at > end) break; const x = c.q.shift(); c.t = Math.max(c.t, x.at); x.fn(); for (let i = 0; i < 12; i++) await Promise.resolve(); } c.t = end; };
  return c;
}
const noRoute = (code) => Object.assign(new Error('nessuna rotta'), { noRoute: true, code });
const make = (c, quote, cfg = {}) => new Grad({ quote, now: c.now, schedule: c.schedule, cfg, log: () => {} });

test('ciclo: acquisto al completamento, vendita quotata ogni 30 s per 15 minuti, rendimento netto della priority fee', async () => {
  const c = clock(); let sells = 0;
  const g = make(c, async (a) => { if (a === SOL_MINT) return { outAmount: '5000000000', priceImpactPct: '0.02' }; sells++; return { outAmount: '110000000' }; });
  assert.equal(g.onComplete({ mint: mint(1), sym: 'AAA', at: c.now() }), true);
  assert.equal(g.onComplete({ mint: mint(1), at: c.now() }), false, 'stesso token: una volta sola');
  await c.run(16 * 60000);
  assert.equal(g.pending.size, 0); assert.equal(g.d.recs.length, 1); assert.equal(sells, 31, 'campioni a 0, 30, ..., 900 s');
  const r = g.d.recs[0]; assert.equal(r.imp, 2);
  // (0,11 - 0,0005) / (0,1 + 0,0005) - 1 = +8,96%
  assert.ok(Math.abs(g.pnlAt(r, 0) - 8.96) < 0.02, 'pnl ' + g.pnlAt(r, 0));
  assert.ok(g.pnlAt(r, 300) != null && g.pnlAt(r, 901) === null);
});

test('rotta di acquisto che manca: si riprova ogni 3 s fino a 90 s, poi si conta; coda piena e stop()', async () => {
  const c = clock(); let n = 0;
  const g = make(c, async () => { n++; throw noRoute('X'); }, { maxQueue: 2 });
  for (let i = 0; i < 3; i++) g.onComplete({ mint: mint(10 + i), at: c.now() });
  assert.equal(g.d.counts.skippedQueue, 1);
  await c.run(100000);
  assert.equal(g.d.counts.noRouteBuy, 2); assert.equal(g.d.recs.length, 0); assert.equal(g.pending.size, 0); assert.ok(n >= 50);
  g.stop(); assert.equal(g.onComplete({ mint: mint(99), at: c.now() }), false);
});

test('vendita senza rotta: -100% (anche con rotta non limitata); errore di rete: campione escluso', async () => {
  const c = clock(), loose = [];
  const g = make(c, async (a, b, amt, opt) => { if (a === SOL_MINT) return { outAmount: '1000', priceImpactPct: 0 }; if (opt && opt.loose) loose.push(1); throw noRoute('COULD_NOT_FIND_ANY_ROUTE'); });
  g.onComplete({ mint: mint(20), at: c.now() }); await c.run(16 * 60000);
  assert.equal(g.pnlAt(g.d.recs[0], 300), -100); assert.ok(loose.length > 0, 'prova anche la rotta non limitata');
  const c2 = clock(), g2 = make(c2, async (a) => { if (a === SOL_MINT) return { outAmount: '1000', priceImpactPct: 0 }; throw new Error('HTTP 503'); });
  g2.onComplete({ mint: mint(21), at: c2.now() }); await c2.run(16 * 60000);
  assert.equal(g2.pnlAt(g2.d.recs[0], 300), null);
});

test('regola di superamento: orizzonte primario, 300 token, media >= +3% e limite inferiore sopra zero', () => {
  const c = clock(), mk = (n, f) => { const g = make(c, async () => { throw noRoute(); }, { passN: 300 }); g.d.recs = Array.from({ length: n }, (_, i) => ({ s: 1, lat: 1000, imp: 1, v: [[0, 1e8], [300, Math.round((1 + f(i) / 100) * 1e8 + 5e4)]] })); return g.summary(); };
  assert.equal(mk(100, () => 20).verdict, 'in corso');
  assert.equal(mk(300, (i) => 20 + (i % 7)).verdict, 'passa');
  assert.equal(mk(300, (i) => (i % 2 ? 1 : -1)).verdict, 'non passa');
  assert.equal(mk(300, (i) => (i % 50 === 0 ? 900 : -10)).verdict, 'non passa', 'media positiva ma intervallo largo');
});

test('TradeBook: l\'evento di completamento parte una sola volta', () => {
  let n = 0; const b = new Lab.TradeBook({ onComplete: () => n++ });
  const t = b.create({ mint: SOL_MINT, symbol: 'Z', pool: 'pump' }, 1000);
  b.curveMc(t, 2000, { mcSol: 100, complete: false }); assert.equal(n, 0);
  b.curveMc(t, 3000, { mcSol: 500, complete: true }); b.curveMc(t, 4000, { mcSol: 500, complete: true }); assert.equal(n, 1);
});

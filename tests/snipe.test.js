'use strict';
// Test di ingresso rapido: campionamento, ciclo acquisto-permanenza-vendita, errori, serie, regola di superamento decisa in anticipo.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { Snipe, SOL_MINT } = require('../runner/snipe.js');

const mint = (i) => crypto.createHash('sha256').update('m' + i).digest('hex').slice(0, 44);
// orologio e pianificatore finti: run(ms) esegue i timer in ordine, lasciando finire le funzioni asincrone
function clock(start = 1_700_000_000_000) {
  const c = { t: start, q: [] };
  c.now = () => c.t;
  c.schedule = (fn, ms) => { c.q.push({ at: c.t + ms, fn }); };
  c.run = async (ms) => {
    const end = c.t + ms;
    for (;;) {
      c.q.sort((a, b) => a.at - b.at);
      if (!c.q.length || c.q[0].at > end) break;
      const x = c.q.shift(); c.t = Math.max(c.t, x.at); x.fn();
      for (let i = 0; i < 10; i++) await Promise.resolve();
    }
    c.t = end;
  };
  return c;
}
const noRoute = () => Object.assign(new Error('nessuna rotta'), { noRoute: true });
const make = (c, quote, cfg = {}, file = '') => new Snipe({ quote, now: c.now, schedule: c.schedule, cfg: { every: 1, ...cfg }, file, log: () => {} });
// primo mint campionato con every = 1: sempre; con every = 3: cerca uno che passi
const sampledMint = (s) => { for (let i = 0; i < 500; i++) if (s.sampled(mint(i))) return mint(i); throw new Error('nessun mint campionato'); };

test('campionamento: dipende solo dal mint, circa uno su tre, e un mint non entra due volte', () => {
  const c = clock(), s = make(c, async () => { throw noRoute(); }, { every: 3 });
  const hits = Array.from({ length: 3000 }, (_, i) => s.sampled(mint(i))).filter(Boolean).length;
  assert.ok(hits > 850 && hits < 1150, 'circa un terzo, trovati ' + hits);
  assert.equal(s.sampled(mint(7)), s.sampled(mint(7)), 'stesso risultato ogni volta');
  const m = sampledMint(s);
  assert.equal(s.onCreate({ mint: m, at: c.now() }), true);
  assert.equal(s.onCreate({ mint: m, at: c.now() }), false, 'stesso mint: una volta sola');
  assert.equal(s.d.counts.seen, 1);
});

test('ciclo completo: acquisto dopo il ritardo, vendita dopo la permanenza, rendimento netto di commissioni e priority fee', async () => {
  const c = clock(), calls = [];
  const quote = async (a, b, amt) => {
    calls.push([a === SOL_MINT ? 'buy' : 'sell', amt, c.now()]);
    return a === SOL_MINT ? { outAmount: '1000000000', priceImpactPct: '0.01' } : { outAmount: '55000000', priceImpactPct: '0.02' };
  };
  const s = make(c, quote), m = mint(1), t0 = c.now();
  s.onCreate({ mint: m, symbol: 'AAA', at: t0 });
  await c.run(4999); assert.equal(calls.length, 0, 'prima del ritardo non si chiede nulla');
  await c.run(2); assert.deepEqual(calls[0].slice(0, 2), ['buy', '50000000'], '0,05 SOL in lamport, dopo 5 s');
  await c.run(29000); assert.equal(calls.length, 1, 'durante la permanenza nessuna richiesta');
  await c.run(2000);
  assert.deepEqual(calls[1].slice(0, 2), ['sell', '990000000'], 'vende i token ricevuti meno l\'1% di commissione');
  const tr = s.d.trades[0];
  assert.equal(tr.lat, 5000); assert.equal(tr.hold, 30000); assert.equal(tr.imp, 1); assert.equal(tr.stuck, 0);
  // 0,055 * 0,99 - 0,0005 = 0,05395 ; costo 0,0505 ; (0,05395 / 0,0505 - 1) = +6,83%
  assert.ok(Math.abs(tr.pnl - 6.83) < 0.02, 'pnl ' + tr.pnl);
  assert.equal(s.pending.size, 0); assert.equal(s.d.counts.filled, 1);
});

test('nessuna rotta in acquisto: si riprova ogni 2 s fino a 30 s dalla creazione, poi si conta e non c\'è operazione', async () => {
  const c = clock(); let n = 0;
  const s = make(c, async () => { n++; throw noRoute(); });
  s.onCreate({ mint: mint(2), at: c.now() });
  await c.run(40000);
  assert.ok(n >= 12 && n <= 14, 'tentativi ' + n);
  assert.equal(s.d.counts.noRouteBuy, 1); assert.equal(s.d.trades.length, 0); assert.equal(s.pending.size, 0);
});

test('rotta che compare dopo qualche secondo: acquisto con la latenza reale', async () => {
  const c = clock(), t0 = c.now();
  const s = make(c, async (a) => { if (a === SOL_MINT && c.now() - t0 < 11000) throw noRoute(); return a === SOL_MINT ? { outAmount: '5', priceImpactPct: 0 } : { outAmount: '50000000' }; });
  s.onCreate({ mint: mint(3), at: t0 });
  await c.run(60000);
  assert.equal(s.d.trades.length, 1);
  assert.ok(s.d.trades[0].lat >= 11000 && s.d.trades[0].lat <= 13000, 'latenza ' + s.d.trades[0].lat);
});

test('vendita impossibile: perdita totale; errore di rete in vendita: l\'operazione non conta', async () => {
  const c = clock();
  const s = make(c, async (a) => { if (a === SOL_MINT) return { outAmount: '1000', priceImpactPct: 0 }; throw noRoute(); });
  s.onCreate({ mint: mint(4), at: c.now() }); await c.run(60000);
  assert.equal(s.d.trades.length, 1); assert.equal(s.d.trades[0].pnl, -100); assert.equal(s.d.trades[0].stuck, 1); assert.equal(s.d.counts.noRouteSell, 1);
  const c2 = clock(), s2 = make(c2, async (a) => { if (a === SOL_MINT) return { outAmount: '1000', priceImpactPct: 0 }; throw new Error('HTTP 503'); });
  s2.onCreate({ mint: mint(5), at: c2.now() }); await c2.run(60000);
  assert.equal(s2.d.trades.length, 0); assert.equal(s2.d.counts.errSell, 1);
});

test('coda piena: i token in più si saltano e si contano; stop() chiude le nuove entrate', async () => {
  const c = clock(), s = make(c, async () => { throw noRoute(); }, { maxQueue: 2 });
  for (let i = 0; i < 4; i++) s.onCreate({ mint: mint(100 + i), at: c.now() });
  assert.equal(s.pending.size, 2); assert.equal(s.d.counts.skippedQueue, 2);
  s.stop(); assert.equal(s.onCreate({ mint: mint(200), at: c.now() }), false);
});

test('serie e file: i parametri cambiati aprono una nuova serie, le statistiche contano solo quella corrente', () => {
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'snipe-')), 'snipe.json'), c = clock();
  const s1 = make(c, async () => { throw noRoute(); }, {}, f);
  s1.d.trades.push({ s: 1, pnl: 50 }, { s: 1, pnl: 40 }); s1.dirty = true; assert.equal(s1.flush(), true);
  const s2 = make(c, async () => { throw noRoute(); }, {}, f);
  assert.equal(s2.d.series, 1); assert.equal(s2.summary().n, 2, 'stessi parametri: stessa serie');
  const s3 = make(c, async () => { throw noRoute(); }, { holdMs: 60000 }, f);
  assert.equal(s3.d.series, 2); assert.equal(s3.summary().n, 0, 'parametri diversi: nuova serie'); assert.equal(s3.d.trades.length, 2, 'le vecchie operazioni restano nel file');
});

test('regola di superamento (decisa in anticipo): servono 300 operazioni, media >= +3% e limite inferiore del 95% sopra zero', () => {
  const c = clock(), mk = (xs) => { const s = make(c, async () => { throw noRoute(); }, { passN: 300 }); s.d.trades = xs.map((pnl) => ({ s: 1, pnl, stuck: 0 })); return s.summary(); };
  const rnd = (n, mu, sd) => Array.from({ length: n }, (_, i) => mu + sd * Math.sin(i * 1.7) * 1.4);
  assert.equal(mk(rnd(100, 20, 10)).verdict, 'in corso', 'troppe poche operazioni, anche se la media è alta');
  assert.equal(mk(rnd(300, 20, 10)).verdict, 'passa');
  assert.equal(mk(rnd(300, 2, 5)).verdict, 'non passa', 'media sotto il +3%');
  const wide = Array.from({ length: 300 }, (_, i) => (i % 50 === 0 ? 900 : -10));    // media positiva ma intervallo largo: tutta la media da pochi colpi
  const w = mk(wide); assert.ok(w.mean > 3, 'media ' + w.mean); assert.ok(w.ciLo < 0, 'intervallo largo'); assert.equal(w.verdict, 'non passa'); assert.ok(w.topShare >= 50, 'metà dei guadagni dall\'1% migliore');
  const s = mk([5, 5]); assert.equal(s.n, 2);
});

test('drain a fine run: le posizioni rimaste si contano come interrotte e non entrano nelle statistiche', async () => {
  const c = clock(), s = new Snipe({ quote: async () => { throw noRoute(); }, now: c.now, schedule: c.schedule, cfg: { every: 1 }, sleep: async (ms) => { c.t += ms; }, log: () => {} });
  s.onCreate({ mint: mint(9), at: c.now() });
  await s.drain(1500);
  assert.equal(s.d.counts.interrupted, 1); assert.equal(s.pending.size, 0); assert.equal(s.d.trades.length, 0);
});

test('vendita: l\'ultimo tentativo prova anche la rotta non limitata; i motivi dell\'assenza di rotta si contano', async () => {
  const c = clock(), seen = [];
  const s = make(c, async (a, b, amt, opt) => {
    if (a === SOL_MINT) return { outAmount: '1000000000', priceImpactPct: 0 };
    seen.push(!!(opt && opt.loose));
    if (opt && opt.loose) return { outAmount: '40000000' };
    throw Object.assign(new Error('nessuna rotta'), { noRoute: true, code: 'COULD_NOT_FIND_ANY_ROUTE' });
  });
  s.onCreate({ mint: mint(11), at: c.now() }); await c.run(70000);
  assert.deepEqual(seen, [false, false, false, true], 'tre tentativi normali, poi quello non limitato');
  assert.equal(s.d.trades.length, 1); assert.equal(s.d.trades[0].stuck, 0); assert.equal(s.d.trades[0].fb, 1);
  assert.equal(s.summary().viaFallback, 1);
  const c2 = clock(), s2 = make(c2, async (a) => { if (a === SOL_MINT) return { outAmount: '1000', priceImpactPct: 0 }; throw Object.assign(new Error('x'), { noRoute: true, code: 'TOKEN_NOT_TRADABLE' }); });
  s2.onCreate({ mint: mint(12), at: c2.now() }); await c2.run(70000);
  assert.equal(s2.d.trades[0].pnl, -100); assert.equal(s2.d.why['sell:TOKEN_NOT_TRADABLE'], 1);
});

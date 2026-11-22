'use strict';
// Ricerca sui creatori: memoria dei lanci, Coin di fascia alta, profilo del creatore, avviso con fascia e creatore, uscite proprie delle Coin grandi.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { Creators, bandOf } = require('../runner/creators.js');
const Semi = require('../runner/semi.js');
const Farm = require('../runner/farm.js');
const E = require('../engine.js');

const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const id = (i) => { let s = ''; let n = i + 1; for (let k = 0; k < 44; k++) { s += B58[(n * 7 + k * 13 + i) % 58]; n = (n * 31 + 7) % 100003; } return s; };

test('fasce di market cap', () => {
  assert.equal(bandOf(400000), 'sotto 500K'); assert.equal(bandOf(500000), '500K-1M'); assert.equal(bandOf(999999), '500K-1M'); assert.equal(bandOf(1500000), '1M-2M'); assert.equal(bandOf(3e6), '2M+');
});

test('memoria dei lanci: un lancio una volta sola, salvato in lotti e riletto all\'avvio; profilo del creatore', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-')), c = new Creators({ dir: path.join(dir, 'lab', 'creators'), bandFile: path.join(dir, 'band.json') });
  const cr = id(900);
  assert.equal(c.noteLaunch({ mint: id(1), creator: cr, at: 1000 }), true); assert.equal(c.noteLaunch({ mint: id(1), creator: cr, at: 1001 }), false, 'doppione');
  assert.equal(c.noteLaunch({ mint: 'x', creator: cr }), false, 'mint non valido'); assert.equal(c.noteLaunch({ mint: id(2) }), false, 'senza creatore');
  c.noteLaunch({ mint: id(3), creator: cr, at: 1002 });
  assert.deepEqual(c.stats(cr), { launches: 2, high: 0, band: 0, doubled: 0, best: 0 });
  Farm.writeBatch(path.join(dir, 'lab', 'creators'), c.drain(), 2000);
  const c2 = new Creators({ dir: path.join(dir, 'lab', 'creators'), bandFile: path.join(dir, 'band.json') }).load();
  assert.equal(c2.summary().launches, 2); assert.equal(c2.stats(cr).launches, 2, 'riletto dal disco');
});

test('Coin di fascia alta: prima lettura, massimo, raddoppio; profilo, livello e riga dell\'avviso; salvataggio', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-')), f = path.join(dir, 'band.json'), c = new Creators({ dir, bandFile: f }), cr = id(901), m = id(10);
  c.noteLaunch({ mint: m, creator: cr, at: 1 });
  assert.equal(await c.creatorOf(m), cr, 'dalla tabella');
  c.noteBand(m, 'AAA', 600000, cr); c.noteBand(m, 'AAA', 900000, cr);
  let s = c.stats(cr); assert.equal(s.band, 1); assert.equal(s.doubled, 0); assert.equal(c.tier(s), 2);
  c.noteBand(m, 'AAA', 1300000, cr); s = c.stats(cr); assert.equal(s.doubled, 1, 'oltre il doppio della prima lettura'); assert.equal(s.best, 1300000); assert.equal(c.tier(s), 3);
  assert.match(c.line(s), /1 Coin in fascia alta, 1 raddoppiate/); assert.equal(c.line(null), 'creatore sconosciuto'); assert.equal(c.tier(null), 0);
  assert.equal(c.noteBand(id(11), 'BBB', 700000, ''), null, 'senza creatore non si registra');
  assert.equal(c.save(), true); const c2 = new Creators({ dir, bandFile: f }).load(); assert.equal(c2.stats(cr).doubled, 1, 'riletto dal disco');
  const sm = c2.summary(); assert.equal(sm.bandCoins, 1); assert.equal(sm.doubled, 1); assert.equal(sm.doubledCreators, 1);
});

test('creatore di una Coin non in tabella: richiesta esterna facoltativa, con pausa dopo un fallimento; sconosciuto se non risponde', async () => {
  const cr = id(902), m = id(20); let calls = 0, ok = true, now = 1_000_000;
  const f = async () => { calls++; if (!ok) throw new Error('rete'); return { ok: true, json: async () => ({ creator: cr }) }; };
  const c = new Creators({ dir: '', bandFile: '', fetch: f, now: () => now });
  ok = false; assert.equal(await c.creatorOf(m), ''); assert.equal(await c.creatorOf(m), ''); assert.equal(calls, 1, 'dopo un fallimento si aspetta 30 minuti');
  now += 31 * 60000; ok = true; assert.equal(await c.creatorOf(m), cr); assert.equal(c.cov.esterna, 1); assert.equal(await c.creatorOf(m), cr, 'poi dalla memoria'); assert.equal(calls, 2);
  assert.equal(await new Creators({ dir: '', bandFile: '' }).creatorOf(id(21)), '', 'senza richiesta esterna: sconosciuto');
});

test('avviso: fascia e profilo del creatore, ancora senza punteggio del bot; i Prendo in fascia hanno uscite proprie', () => {
  const T = 1_700_000_000_000, c = { mint: id(30), sym: 'BIG', score: 77, band: '500K-1M', cr: id(903), cline: 'creatore: 2 Coin in fascia alta, 1 raddoppiate', a: { m: { priceNative: 0.001, mc: 700000, liq: 90000, ageMin: 300 }, plus: ['volume'] }, pair: { pairAddress: id(31) } };
  const a = Semi.alertOf(c, T), t = Semi.text(a);
  assert.equal(a.band, '500K-1M'); assert.match(t, /fascia 500K-1M/); assert.match(t, /creatore: 2 Coin in fascia alta, 1 raddoppiate/); assert.ok(!/score|77|volume/.test(t), 'niente punteggio del bot');
  const p = { entry: 1, peak: 1, openedAt: T, tp1Done: false, entryLiq: 100000, xs: { sl: 20, tp1: 100, tp1Sell: 50, trail: 25, beAfterTp1: true, timeStopMin: 360, timeStopMinPnl: 5 } }, m = (px) => ({ priceNative: px, liq: 100000, br5: 1, tx5: 5 }), S = { ...E.DEFAULTS };
  assert.equal(E.charon(p, m(1.5), S, T + 60000), null, '+50%: resta'); assert.equal(E.charon(p, m(0.85), S, T + 60000), null, '-15%: resta (lo stop del bot sarebbe -25%, il tuo -20%)');
  assert.equal(E.charon(p, m(0.79), S, T + 60000).reason, 'Stop loss'); const x = E.charon(p, m(2.05), S, T + 3600000); assert.equal(x.reason, 'TP1'); assert.equal(x.frac, 0.5, 'a +100% vende la meta');
  assert.equal(E.charon({ ...p, tp1Done: true, peak: 3 }, m(2.2), S, T + 7200000).reason, 'Trailing stop', 'il resto esce con il trailing -25% dal picco');
  assert.equal(E.charon({ ...p }, m(1.02), S, T + 7 * 3600000).reason, 'Time stop', 'dopo 6 ore, se sotto il +5%');
  assert.equal(E.charon({ ...p, xs: undefined }, m(0.85), S, T + 60000), null, 'senza uscite proprie: regole di base (stop -25%)');
});

test('runner: ogni candidato di fascia alta passa dalla ricerca sui creatori e gli avvisi partono da quelli, prima i creatori migliori', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /await rt\.creators\.creatorOf\(c\.mint\)/); assert.match(src, /rt\.creators\.noteBand\(c\.mint, c\.sym, mc, c\.cr\)/);
  assert.match(src, /\(b\.ctier \|\| 0\) - \(a\.ctier \|\| 0\) \|\| b\.score - a\.score/); assert.match(src, /rt\.creators\.noteLaunch\(\{ mint: t\.mint, creator: t\.creator/);
  assert.equal(E.DEFAULTS.minMcap, 500000); assert.equal(E.DEFAULTS.bandMin, 500000); assert.equal(E.DEFAULTS.humanOnly, true);
});

'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

const S = { ...E.DEFAULTS };
const now = 1_700_000_000_000;
const goodPair = () => ({
  liquidity: { usd: 120000 }, marketCap: 2_000_000, pairCreatedAt: now - 3 * 3600000,
  txns: { m5: { buys: 30, sells: 10 }, h1: { buys: 300, sells: 120 } },
  volume: { h1: 200000 }, priceChange: { m5: 3, h1: 20, h6: 40 },
  info: { socials: [{}], websites: [{}] }, priceUsd: '0.01', priceNative: '0.00005',
});

test('analyze: pair solido ottiene punteggio alto e nessun veto', () => {
  const a = E.analyze(goodPair(), null, S, now);
  assert.equal(a.vetoes.length, 0);
  assert.ok(a.base >= S.minScore, `score ${a.base}`);
});
test('analyze: liquidità sotto il minimo = veto', () => {
  const p = goodPair(); p.liquidity.usd = 1000;
  assert.ok(E.analyze(p, null, S, now).vetoes.length > 0);
});
test('analyze: honeypot GMGN = veto', () => {
  const a = E.analyze(goodPair(), { honeypot: true }, S, now);
  assert.ok(a.vetoes.some((v) => /honeypot/i.test(v)));
});

test('decide: BUY solo con sicurezza verificata', () => {
  const a = E.analyze(goodPair(), null, S, now);
  assert.notEqual(E.decide(a, null, null, S).verdict, 'BUY');
  assert.equal(E.decide(a, { ok: true, vetoes: [], penalty: 0 }, null, S).verdict, 'BUY');
});
test('decide: un veto di Sentinel blocca tutto', () => {
  const a = E.analyze(goodPair(), null, S, now);
  assert.equal(E.decide(a, { ok: true, vetoes: ['Mint authority attiva'], penalty: 0 }, null, S).verdict, 'VETO');
});

test('sentinel: mint authority attiva = veto; report vuoto = non ok', () => {
  assert.ok(E.sentinel({ mintAuthority: 'abc' }).vetoes.length > 0);
  assert.equal(E.sentinel(null).ok, false);
});

const pos = (o = {}) => ({ entry: 1, peak: 1, openedAt: now, tp1Done: false, spDone: false, entryLiq: 100000, ...o });
const mk = (price, o = {}) => ({ priceNative: price, liq: 100000, br5: 1, tx5: 0, ...o });

test('charon: stop loss', () => assert.equal(E.charon(pos(), mk(0.7), S, now).reason, 'Stop loss'));
test('charon: TP1 vende la quota prevista', () => {
  const r = E.charon(pos(), mk(1.45), S, now);
  assert.equal(r.reason, 'TP1'); assert.equal(r.frac, S.tp1Sell / 100);
});
test('charon: break-even dopo TP1', () => assert.equal(E.charon(pos({ tp1Done: true, peak: 1.5 }), mk(0.99), S, now).reason, 'Break-even'));
test('charon: trailing dopo TP1', () => assert.equal(E.charon(pos({ tp1Done: true, peak: 2 }), mk(1.5), S, now).reason, 'Trailing stop'));
test('charon: rug-exit su crollo liquidità', () => {
  assert.equal(E.charon(pos(), mk(1.0, { liq: 40000 }), S, now).reason, 'RUG-EXIT liquidità');
});
test('charon: time stop se fermo troppo a lungo', () => {
  assert.equal(E.charon(pos({ openedAt: now - 60 * 60000 }), mk(1.01), S, now).reason, 'Time stop');
});
test('charon: nessuna azione in condizioni normali', () => assert.equal(E.charon(pos(), mk(1.05), S, now), null));

test('quartermaster: ingresso costa più del prezzo, uscita rende meno', () => {
  assert.ok(E.entryPrice(1, 0.02, 1) > 1);
  assert.ok(E.exitSol(10, 1, 0.02, 1, 0.0005) < 10);
});
test('DEFAULTS: un solo ingresso per scan', () => assert.equal(E.DEFAULTS.maxEntriesPerScan, 1));

test('reale: spento di default e bloccato senza capitale', () => {
  assert.equal(E.DEFAULTS.realEnabled, false);
  assert.equal(E.DEFAULTS.realCapitalSOL, 0);
  assert.match(E.realGate(E.DEFAULTS, null), /spento/);
});
test('reale: cancello fallisce chiuso, una condizione alla volta', () => {
  const ok = { ok: true, wallet: 'WaLLet1111111111111111111111111111111111111', balanceSOL: 1, ordersEnabled: true };
  const on = { ...E.DEFAULTS, realEnabled: true, realCapitalSOL: 0.5, executor: 'https://x.example' };
  assert.equal(E.realGate(on, ok), '');
  assert.match(E.realGate({ ...on, realCapitalSOL: 0 }, ok), /capitale/);
  assert.match(E.realGate({ ...on, executor: '' }, ok), /configurato/);
  assert.match(E.realGate(on, null), /raggiungibile/);
  assert.match(E.realGate(on, { ok: false }), /raggiungibile/);
  assert.match(E.realGate(on, { ...ok, killed: true }), /kill switch/);
  assert.match(E.realGate(on, { ...ok, balanceSOL: 0 }), /fondi/);
  assert.match(E.realGate(on, { ...ok, balanceSOL: null }), /saldo/);
  assert.match(E.realGate(on, { ...ok, wallet: null }), /wallet/);
  assert.match(E.realGate(on, { ...ok, wallet: null, walletError: 'chiave incoerente' }), /incoerente/);
  assert.match(E.realGate(on, { ...ok, ordersEnabled: false }), /non ancora abilitati/);
  assert.match(E.realGate({ ...on, realEnabled: false }, ok), /spento/);
});

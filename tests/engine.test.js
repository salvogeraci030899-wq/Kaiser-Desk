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
  const ok = { ok: true, wallet: 'WaLLet1111111111111111111111111111111111111', balanceSOL: 1, mode: 'live', jupiterConfigured: true };
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
  assert.match(E.realGate(on, { ...ok, mode: 'off' }), /disattivati/);
  assert.match(E.realGate(on, { ...ok, mode: undefined }), /disattivati/);               // esecutore vecchio senza modo: chiuso
  assert.match(E.realGate(on, { ...ok, jupiterConfigured: false }), /JUPITER_PROGRAM_ID/);
  assert.equal(E.realGate(on, { ...ok, mode: 'dryrun' }), '');                            // il dry-run passa: gli ordini sono solo simulati
  assert.match(E.realGate({ ...on, realEnabled: false }, ok), /spento/);
});

test('GeckoTerminal: dai pool si ricavano i mint dei token base; voci non valide ignorate', () => {
  const E = require('../engine.js'), A = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump', B = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  const j = { data: [{ relationships: { base_token: { data: { id: 'solana_' + A } } } }, { relationships: { base_token: { data: { id: 'solana_' + B } } } }, { relationships: { base_token: { data: { id: 'eth_0xabc' } } } }, { relationships: {} }, null, { relationships: { base_token: { data: { id: 5 } } } }] };
  assert.deepEqual(E.geckoMints(j), [A, B]); assert.deepEqual(E.geckoMints(null), []); assert.deepEqual(E.geckoMints({ data: 'x' }), []);
  assert.equal(E.DEFAULTS.srcGecko, true); assert.ok(E.GECKO_SOURCES.length >= 3 && E.GECKO_SOURCES.every(([u]) => u.startsWith('https://api.geckoterminal.com/api/v2/networks/solana/')));
});

test('memoria delle Coin: i token visti di recente restano, quelli vecchi escono, tetto sul numero', () => {
  const E = require('../engine.js'), seen = new Map(), T = 1_700_000_000_000, mk = (...ms) => new Map(ms.map(([m, s]) => [m, new Set([s])]));
  assert.deepEqual(E.mergeSeen(seen, mk(['A', 'x'], ['B', 'x']), T, 1800000, 10).sort(), ['A', 'B']);
  const r2 = E.mergeSeen(seen, mk(['C', 'y'], ['A', 'z']), T + 600000, 1800000, 10); assert.deepEqual(r2.sort(), ['A', 'B', 'C']); assert.deepEqual([...seen.get('A').srcs].sort(), ['x', 'z'], 'le fonti si sommano');
  const r3 = E.mergeSeen(seen, mk(['D', 'y']), T + 2000000, 1800000, 10); assert.deepEqual(r3.sort(), ['A', 'C', 'D'], 'solo B (visto oltre 30 minuti fa) esce; A e C erano stati rivisti dopo');
  const big = new Map(Array.from({ length: 300 }, (_, i) => ['M' + i, new Set(['s'])])); assert.equal(E.mergeSeen(new Map(), big, T, 1800000, 240).length, 240);
});
test('fonti con limite di richieste: una chiamata al minuto, dopo un 429 si riusa l\'ultimo elenco e si aspetta', async () => {
  const E = require('../engine.js'), cache = {}, T = 1_700_000_000_000; let calls = 0, mode = 'ok';
  const load = async () => { calls++; if (mode === 'limit') throw new Error('HTTP 429'); return ['A', 'B']; };
  assert.deepEqual(await E.cachedList(cache, 'u', 60000, load, T), ['A', 'B']); assert.equal(calls, 1);
  assert.deepEqual(await E.cachedList(cache, 'u', 60000, load, T + 20000), ['A', 'B']); assert.equal(calls, 1, 'entro un minuto non richiama');
  mode = 'limit'; assert.deepEqual(await E.cachedList(cache, 'u', 60000, load, T + 61000), ['A', 'B'], 'dopo il 429 resta l\'ultimo elenco'); assert.equal(calls, 2); assert.match(cache.u.err, /429/);
  mode = 'ok'; await E.cachedList(cache, 'u', 60000, load, T + 120000); assert.equal(calls, 2, 'dopo un 429 pausa di 3 minuti'); await E.cachedList(cache, 'u', 60000, load, T + 61000 + 181000); assert.equal(calls, 3);
});
test('Jupiter: mint da id, address o mint; voci non valide ignorate', () => {
  const E = require('../engine.js'), A = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump', B = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  assert.deepEqual(E.jupMints([{ id: A }, { address: B }, { id: 'xx' }, null, {}, { mint: 5 }]), [A, B]); assert.deepEqual(E.jupMints({ x: 1 }), []);
  assert.equal(E.DEFAULTS.srcJupiter, true); assert.ok(E.JUPITER_SOURCES.every(([u]) => u.startsWith('https://lite-api.jup.ag/tokens/v2/')));
});

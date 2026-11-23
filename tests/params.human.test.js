'use strict';
// Impostazioni rifatte per il nuovo scopo: pagina «Uomo e macchina» con Radar e avvisi, Uscite dei Prendo, Taglia e costi; i comandi del bot automatico in fondo, segnati spenti.
const test = require('node:test');
const assert = require('node:assert/strict');
let P, E;
test.before(async () => { P = await import('../worker/src/params.js'); E = require('../engine.js'); });

const keysOf = (g) => Object.keys(P.SCHEMA).filter((k) => P.SCHEMA[k].group === g);

test('pagina Uomo e macchina: prima Radar e avvisi, poi Uscite dei Prendo e Taglia e costi, poi il bot automatico spento; il reale non cambia', () => {
  assert.deepEqual(P.GROUPS.filter((g) => g.page === 'paper').map((g) => g.id), ['radar', 'human', 'acct', 'auto', 'risk', 'exit', 'filt']);
  assert.deepEqual(P.GROUPS.filter((g) => g.page === 'real').map((g) => g.id), ['real', 'rexit', 'shield', 'lim'], 'il reale resta com\'era');
  for (const g of ['radar', 'human', 'acct']) assert.ok(!P.GROUPS.find((x) => x.id === g).off, g + ' e\' attivo');
  for (const g of ['auto', 'risk', 'exit', 'filt']) assert.equal(P.GROUPS.find((x) => x.id === g).off, true, g + ' e\' segnato spento');
  assert.match(P.GROUPS.find((g) => g.id === 'auto').title, /solo uomo/); assert.match(P.GROUPS.find((g) => g.id === 'exit').title, /non valgono per i Prendo/); assert.match(P.GROUPS.find((g) => g.id === 'filt').title, /superati dalla fascia alta/);
});

test('Radar e avvisi: fascia, punteggio, intervallo di scansione, filtri che contano ancora e fonti; Uscite dei Prendo; Taglia e costi', () => {
  assert.deepEqual(keysOf('radar').slice(0, 2), ['bandMin', 'alertMinScore'], 'fascia e punteggio in cima');
  for (const k of ['scanSec', 'minTxH1', 'minAgeMin', 'srcDexProfiles', 'srcDexBoosts', 'srcJupiter', 'srcGecko', 'srcYoung']) assert.ok(keysOf('radar').includes(k), k);
  assert.deepEqual(keysOf('human'), ['humanBandSl', 'humanBandTp', 'humanBandTpSell', 'humanBandTrail', 'humanBandHoldMin']);
  assert.deepEqual(keysOf('acct').sort(), ['dailyLossPct', 'feePct', 'prioritySOL', 'refillBelowPct', 'sizePct', 'slipInBps', 'slipOutBps']);
  for (const k of ['bandMin', 'alertMinScore', 'humanBandSl', 'humanBandTp', 'humanBandTpSell', 'humanBandTrail', 'humanBandHoldMin']) { const s = P.SCHEMA[k]; assert.equal(s.t, 'num'); assert.equal(s.scope, 'runner'); assert.ok(k in E.DEFAULTS, k); assert.ok(E.DEFAULTS[k] >= s.min && E.DEFAULTS[k] <= s.max, k + ' di partenza dentro i limiti'); }
});

test('il bot automatico resta raggiungibile ma spento: comandi, limiti di ingresso, uscite e filtri superati', () => {
  for (const k of ['autopilot', 'semiAuto', 'grokTest', 'paperStop', 'minScore']) assert.equal(P.SCHEMA[k].group, 'auto', k);
  for (const k of ['maxPos', 'entryGapSec', 'cooldownMin', 'retradeH', 'maxEntriesPerScan']) assert.equal(P.SCHEMA[k].group, 'risk', k);
  for (const k of ['sl', 'tp1', 'trail', 'timeStopMin', 'sellPressure']) assert.equal(P.SCHEMA[k].group, 'exit', k);
  for (const k of ['minLiq', 'minMcap', 'maxMcap', 'maxAgeH', 'srcLab', 'minDipPct', 'srcGmgnTrending', 'gmgnInterval']) assert.equal(P.SCHEMA[k].group, 'filt', k);
  assert.ok(Object.keys(P.SCHEMA).every((k) => P.GROUPS.some((g) => g.id === P.SCHEMA[k].group)), 'ogni parametro ha un gruppo');
});

test('i valori si validano: solo numeri dentro i limiti; il resto si rifiuta', () => {
  assert.deepEqual(P.validate({ humanBandSl: 15, humanBandTp: 150, bandMin: 750000 }).errors, []); assert.equal(P.validate({ humanBandSl: 15 }).clean.humanBandSl, 15);
  assert.ok(P.validate({ minTxH1: 15, srcYoung: true }).errors.length === 0 && P.validate({ scanSec: 45 }).clean.scanSec === 45);
  for (const bad of [{ humanBandSl: 2 }, { humanBandSl: 80 }, { humanBandTp: 10 }, { bandMin: 1000 }, { alertMinScore: 'alto' }, { humanBandHoldMin: 99999 }]) assert.ok(P.validate(bad).errors.length > 0, JSON.stringify(bad));
});

test('l\'interruttore solo uomo non e\' modificabile dall\'app: riaccenderebbe gli ingressi automatici, anche reali', () => {
  assert.ok(!('humanOnly' in P.SCHEMA)); assert.ok(P.validate({ humanOnly: false }).errors.length > 0);
  assert.ok(!Object.keys(P.SCHEMA).some((k) => P.FORBIDDEN.test(k) && ['radar', 'human', 'acct'].includes(P.SCHEMA[k].group)), 'nessun token, chiave o indirizzo');
});

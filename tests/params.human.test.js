'use strict';
// Impostazioni: gruppo «Uomo e macchina», valori sempre numerici dentro limiti sensati, nessun interruttore che riaccenda gli ingressi automatici.
const test = require('node:test');
const assert = require('node:assert/strict');
let P, E;
test.before(async () => { P = await import('../worker/src/params.js'); E = require('../engine.js'); });

test('gruppo Uomo e macchina in cima alla pagina Paper, con i parametri della fascia alta e delle uscite dei Prendo', () => {
  assert.equal(P.GROUPS[0].id, 'human'); assert.equal(P.GROUPS[0].page, 'paper');
  const keys = ['bandMin', 'alertMinScore', 'humanBandSl', 'humanBandTp', 'humanBandTpSell', 'humanBandTrail', 'humanBandHoldMin'];
  for (const k of keys) { const s = P.SCHEMA[k]; assert.ok(s, k); assert.equal(s.group, 'human'); assert.equal(s.t, 'num'); assert.equal(s.scope, 'runner'); assert.ok(k in E.DEFAULTS, k + ' ha un valore di partenza'); assert.ok(E.DEFAULTS[k] >= s.min && E.DEFAULTS[k] <= s.max, k + ' di partenza dentro i limiti'); }
  assert.equal(Object.keys(P.SCHEMA).filter((k) => P.SCHEMA[k].group === 'human').length, keys.length + 7, 'i 7 filtri che contano ancora sono nello stesso gruppo');
});

test('filtri unificati: quelli che contano ancora in solo uomo stanno nel gruppo Uomo e macchina, quelli superati nel gruppo del bot; nessun parametro perso', () => {
  for (const k of ['minTxH1', 'minAgeMin', 'srcDexProfiles', 'srcDexBoosts', 'srcJupiter', 'srcGecko', 'srcYoung']) { assert.equal(P.SCHEMA[k].group, 'human', k); assert.ok(k in E.DEFAULTS, k); }
  for (const k of ['minLiq', 'minMcap', 'maxMcap', 'maxAgeH', 'minDipPct', 'srcLab', 'srcGmgnTrending', 'srcGmgnTrenches', 'gmgnInterval']) assert.equal(P.SCHEMA[k].group, 'filt', k + ' resta tra i filtri del bot');
  assert.match(P.GROUPS.find((g) => g.id === 'filt').title, /non attivi in solo uomo/);
  assert.ok(P.validate({ minTxH1: 15, srcYoung: true }).errors.length === 0 && P.validate({ minTxH1: 15 }).clean.minTxH1 === 15, 'si validano come prima');
  const order = Object.keys(P.SCHEMA).filter((k) => P.SCHEMA[k].group === 'human'); assert.deepEqual(order.slice(0, 2), ['bandMin', 'alertMinScore'], 'fascia e punteggio in cima, poi i filtri, poi le uscite'); assert.ok(order.indexOf('minTxH1') < order.indexOf('humanBandSl'));
});

test('i valori si validano: solo numeri dentro i limiti; il resto si rifiuta', () => {
  assert.deepEqual(P.validate({ humanBandSl: 15, humanBandTp: 150, bandMin: 750000 }).errors, []); assert.equal(P.validate({ humanBandSl: 15 }).clean.humanBandSl, 15);
  for (const bad of [{ humanBandSl: 2 }, { humanBandSl: 80 }, { humanBandTp: 10 }, { bandMin: 1000 }, { alertMinScore: 'alto' }, { humanBandHoldMin: 99999 }]) assert.ok(P.validate(bad).errors.length > 0, JSON.stringify(bad));
});

test('l\'interruttore solo uomo non e\' modificabile dall\'app: riaccenderebbe gli ingressi automatici, anche reali', () => {
  assert.ok(!('humanOnly' in P.SCHEMA)); assert.ok(P.validate({ humanOnly: false }).errors.length > 0);
  assert.ok(!Object.keys(P.SCHEMA).some((k) => P.FORBIDDEN.test(k) && P.SCHEMA[k].group === 'human'), 'nessun token, chiave o indirizzo');
  assert.match(P.GROUPS.find((g) => g.id === 'auto').title, /solo uomo/); assert.match(P.GROUPS.find((g) => g.id === 'exit').title, /non valgono per i Prendo/);
});

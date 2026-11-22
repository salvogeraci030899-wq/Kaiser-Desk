'use strict';
// Reset una tantum in modalità solo uomo, limiti della fascia alta sopra qualunque configurazione salvata, Radar dell'app solo con la fascia alta.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaiser-reset-'));
const pos = { id: 'P-0001', mint: 'M1', sym: 'AAA', sizeSOL: 0.2, cost: 0.2, entry: 0.01, tokens: 20, remaining: 1, realized: 0, fills: [], peak: 0.01, openedAt: 1 };
fs.writeFileSync(path.join(dir, 'state.json'), JSON.stringify({ capital: 6, runs: 40, cash: 3.5, seq: 12, positions: [pos], journal: [{ id: 'P-0002', pct: -10, pnl: -0.02 }], signals: [{ t: 1 }], alerts: [{ id: 'a0001', t: 1, vote: 'y' }], events: [], halted: 5, cooldownUntil: 9e15, bandDays: { '2026-11-22': { c: 3, nv: 1 } } }));
fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify({ autopilot: true, minMcap: 3000, minLiq: 7500, maxMcap: 100000, maxAgeH: 1, minAgeMin: 0, minTxH1: 15 }));      // configurazione vecchia con limiti bassi
process.env.STATE_DIR = dir; delete process.env.TELEGRAM_BOT_TOKEN; delete process.env.EXEC_TOKEN;
const R = require('../runner/runner.js');
const { st, S } = R;

test('i limiti della fascia alta valgono sopra una configurazione salvata con limiti bassi', () => {
  assert.equal(S.minMcap, 500000, 'salvato 3000'); assert.ok(S.minLiq >= 40000, 'salvato 7500'); assert.ok(S.maxMcap >= 50000000, 'salvato 100000: avrebbe scartato tutta la fascia alta'); assert.ok(S.maxAgeH >= 720, 'salvato 1 ora'); assert.equal(S.minTxH1, 15, 'le transazioni minime scelte dall\'utente restano');
  S.minMcap = 1000; S.minLiq = 100; S.maxMcap = 100000; S.maxAgeH = 1; R.enforceBand(); assert.equal(S.minMcap, 500000); assert.ok(S.minLiq >= 40000); assert.ok(S.maxMcap >= 50000000); assert.ok(S.maxAgeH >= 720);
  S.minMcap = 2000000; R.enforceBand(); assert.equal(S.minMcap, 2000000, 'un limite piu\' alto resta');
});

test('reset una tantum: conto, journal, segnali e avvisi tornano come nuovi; la seconda volta non fa nulla', () => {
  assert.equal(st.journal.length, 1); assert.equal(R.resetForBand(), true);
  assert.equal(st.cash, 6); assert.equal(st.capital, 6); assert.deepEqual(st.positions, []); assert.deepEqual(st.journal, []); assert.deepEqual(st.alerts, []); assert.deepEqual(st.signals, []);
  assert.equal(st.halted, null); assert.equal(st.cooldownUntil, 0); assert.deepEqual(st.bandDays, {}); assert.equal(st.bandResetV, 1); assert.ok(st.humanSince > 0); assert.equal(st.humanReviewed, 0);
  st.journal.push({ id: 'P-0100', pct: 5 }); assert.equal(R.resetForBand(), false, 'una sola volta'); assert.equal(st.journal.length, 1, 'i dati nuovi non si toccano');
  const keep = S.humanOnly; S.humanOnly = false; st.bandResetV = 0; assert.equal(R.resetForBand(), false, 'fuori dalla modalita\' solo uomo non si resetta'); S.humanOnly = keep;
});

test('app: il Radar mostra solo le Coin della fascia alta e i limiti non si abbassano con una configurazione salvata', () => {
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(html, /if \(band\) list = list\.filter\(\(c\) => \(c\.a\.m\.mc \|\| 0\) >= band\)/); assert.match(html, /s\.minMcap = Math\.max\(Number\(s\.minMcap\) \|\| 0, Number\(s\.bandMin\) \|\| 500000\)/); assert.match(html, /s\.maxMcap = Math\.max\(Number\(s\.maxMcap\) \|\| 0, DEFAULTS\.maxMcap\)/); assert.match(html, /s\.maxAgeH = Math\.max\(Number\(s\.maxAgeH\) \|\| 0, DEFAULTS\.maxAgeH\)/);
  assert.match(html, /Nessuna Coin sopra ' \+ fmtUsd\(band\)/);
});

'use strict';
// Test di Grok sui segnali: misura del legame tra il giudizio e l'esito a 15 minuti, verdetti prudenti, collegamento nel runner.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const G = require('../runner/grokstat.js'), Semi = require('../runner/semi.js');

let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const row = (s, o, f, p15) => ({ t: 1, m: 'M', s, h: 5, o, f, k: 0, p5: p15 / 2, p15, mn: Math.min(0, p15) });

test('correlazione di Spearman: legame perfetto, inverso, nessuno, parita\'', () => {
  const x = Array.from({ length: 50 }, (_, i) => i), up = x.map((v) => v * 2 + 1), dn = x.map((v) => -v);
  assert.equal(G.spearman(x, up).rho, 1); assert.equal(G.spearman(x, dn).rho, -1); assert.ok(G.spearman(x, up).p < 0.001);
  const a = Array.from({ length: 200 }, () => rnd()), b = Array.from({ length: 200 }, () => rnd()); assert.ok(Math.abs(G.spearman(a, b).rho) < 0.2);
  assert.deepEqual(G.ranks([10, 20, 20, 30]), [1, 2.5, 2.5, 4]); assert.equal(G.spearman([1, 2], [1, 2]).p, 1, 'troppo pochi punti: nessuna conclusione');
  assert.equal(G.spearman(new Array(20).fill(1), x.slice(0, 20)).rho, 0, 'valori tutti uguali');
});
test('registro: un segnale entra solo se Grok lo ha giudicato e l\'esito a 15 minuti e\' noto, una volta sola', () => {
  const log = [], a = { t: 5, mint: 'MINT12345678', gr: { s: 0.456, h: 6.04, o: 7.5, f: 2, k: 1 }, p5: -3, p15: 12, min: -8 };
  assert.equal(G.record(log, { ...a, gr: null }), false); assert.equal(G.record(log, { ...a, p15: null }), false); assert.equal(G.record(log, a), true); assert.equal(a.logged, true); assert.equal(G.record(log, a), false);
  assert.deepEqual(log[0], { t: 5, m: 'MINT1234', s: 0.46, h: 6, o: 7.5, f: 2, k: 1, p5: -3, p15: 12, mn: -8 });
  const big = []; for (let i = 0; i < 650; i++) G.record(big, { t: i, mint: 'M' + i, gr: { s: 0, h: 0, o: 5, f: 0, k: 0 }, p15: 1 }); assert.equal(big.length, 600, 'si tengono gli ultimi 600');
});
test('verdetto: pochi dati, nessun legame, legame positivo, legame inverso, utile come allarme', () => {
  const few = []; for (let i = 0; i < 40; i++) few.push(row(0.5, 7, 0, 10)); const s0 = G.summary(few); assert.equal(s0.verdict, 'pochi dati'); assert.match(s0.why, /ora 40/);
  const none = []; for (let i = 0; i < 160; i++) none.push(row(rnd() * 2 - 1, rnd() * 10, 0, (rnd() - 0.6) * 100)); const s1 = G.summary(none); assert.equal(s1.verdict, 'nessun legame misurabile', JSON.stringify(s1.corr));
  const pos = []; for (let i = 0; i < 160; i++) { const s = rnd() * 2 - 1; pos.push(row(s, 5, 0, s * 40 + (rnd() - 0.5) * 20)); } const s2 = G.summary(pos); assert.equal(s2.verdict, 'legame positivo'); assert.ok(s2.corr.sent.rho > 0.5);
  const inv = []; for (let i = 0; i < 160; i++) { const s = rnd() * 2 - 1; inv.push(row(s, 5, 0, -s * 40 + (rnd() - 0.5) * 20)); } assert.equal(G.summary(inv).verdict, 'legame inverso');
  const fl = []; for (let i = 0; i < 160; i++) { const f = i % 2; fl.push(row(rnd() * 2 - 1, rnd() * 10, f, f ? (rnd() < 0.5 ? -60 : 10) : (rnd() < 0.15 ? -60 : 10))); } const s4 = G.summary(fl); assert.equal(s4.verdict, 'utile come allarme', JSON.stringify(s4.by.flag)); assert.ok(s4.by.flag[1].rug - s4.by.flag[0].rug >= 15);
});
test('gruppi: mediane a 5 e 15 minuti, quota da rug e in positivo', () => {
  const rows = [row(0.8, 8, 0, 20), row(0.5, 8, 0, 10), row(0.4, 4, 1, -40), row(-0.5, 2, 2, -10), row(0, 6, 0, 0)], s = G.summary(rows), g = s.by.sent;
  assert.equal(g[0].n, 3); assert.equal(g[1].n, 1); assert.equal(g[2].n, 1); assert.equal(g[0].med15, 10); assert.equal(g[0].rug, 33); assert.equal(g[0].up, 67); assert.equal(s.by.flag[1].n, 2); assert.equal(s.all.n, 5);
  assert.equal(G.summary([]).n, 0); assert.equal(G.summary(null).verdict, 'pochi dati');
});
test('runner: il giudizio parte dopo l\'avviso, e\' limitato e non cambia nulla; parametro e chiave', async () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  const i1 = src.indexOf('await tg(Semi.text(a), Semi.keyboard(a));'), i2 = src.indexOf('if (S.grokTest && rt.grokQ.length < 20) rt.grokQ.push(a);'); assert.ok(i1 > 0 && i2 > i1, 'prima l\'avviso, poi la coda di Grok');
  assert.match(src, /S\.grokTest = S\.grokTest && !!process\.env\.XAI_API_KEY/); assert.match(src, /k === 'useGrok' \|\| k === 'grokTest'/); assert.match(src, /const GROK_DAY_MAX = 120/); assert.match(src, /rt\.grokBusy/); assert.match(src, /pumpGrok\(\);/); assert.match(src, /logGrok\(\);/);
  assert.match(src, /Grokstat\.summary\(st\.grokLog/); assert.ok(!/grokAdj|decide\(.*grokTest/.test(src.slice(src.indexOf('async function semiAlerts'), src.indexOf('async function buy'))), 'il test non entra nelle decisioni');
  assert.ok(html.includes('Grok: serve davvero?')); assert.match(html, /a\.gr \? ' · Grok '/);
  const P = await import('../worker/src/params.js'); assert.equal(P.SCHEMA.grokTest.t, 'bool'); assert.equal(P.SCHEMA.grokTest.scope, 'runner'); assert.equal(require('../engine.js').DEFAULTS.grokTest, false);
  const a = Semi.alertOf({ mint: 'MINT', sym: 'X', name: 'Nome', score: 1, a: { m: {} } }, 1); assert.equal(a.name, 'Nome'); a.gr = { s: 0.3, o: 6, f: 1 }; assert.deepEqual(Semi.view([a], 1)[0].gr, { s: 0.3, o: 6, f: 1 });
});

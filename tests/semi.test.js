'use strict';
// Modalità semi-automatica: avviso con il collegamento a pump.fun invece dell'ingresso automatico, limiti, misura dei segnali, parametro dell'app.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Semi = require('../runner/semi.js');

const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const mint = (i) => { let s = ''; for (let k = 0; k < 44; k++) s += B58[(i * 7 + k * 13 + (k % 5) * i) % 58]; return s; };
const cand = (i, score = 70) => ({ mint: mint(i), sym: 'T' + i, score, a: { m: { priceNative: 0.000002, mc: 12300, liq: 8100, ageMin: 4.4 }, plus: ['volume in crescita', 'buyers > sellers'] }, pair: { pairAddress: mint(i + 100) } });
const T = 1_700_000_000_000;

test('segnale: un BUY del radar diventa un avviso con il collegamento diretto a pump.fun, senza emoji e senza aprire ordini', () => {
  const a = Semi.alertOf(cand(1), T); assert.equal(a.mint, mint(1)); assert.equal(a.score, 70); assert.equal(a.mc, 12300); assert.equal(a.ageMin, 4.4); assert.equal(a.pair, mint(101));
  const kb = Semi.keyboard(a); assert.deepEqual(kb.inline_keyboard[0].map((b) => b.callback_data), ['hd:y:' + a.id, 'hd:n:' + a.id]); assert.equal(kb.inline_keyboard[1][0].text, 'Apri su pump.fun'); assert.equal(kb.inline_keyboard[1][0].url, 'https://pump.fun/coin/' + mint(1));
  assert.ok(kb.inline_keyboard[2][0].url.includes('dexscreener.com/solana/' + mint(101))); assert.ok(kb.inline_keyboard[2][1].url.includes('gmgn.ai/sol/token/' + mint(1)));
  assert.ok(kb.inline_keyboard.flat().filter((b) => b.callback_data).every((b) => /^hd:[yn]:a[0-9a-z]+$/.test(b.callback_data)), 'solo i tasti di decisione, nessun tasto che apre o conferma ordini');
  const t = Semi.text(a); assert.match(t, /SEGNALE/); assert.match(t, /\$T1\n/); assert.ok(!/score|Motivi|volume in crescita/.test(t), 'il punteggio e i motivi del bot non si vedono'); assert.match(t, /market cap \$12\.3K · età 4 min · liquidità \$8\.1K/); assert.match(t, /Con Prendo il paper apre subito la posizione/); assert.ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(t + JSON.stringify(kb)), 'niente emoji');
  assert.equal(Semi.alertOf({ mint: mint(2), sym: '<b>x', score: 1, a: { m: {} } }, T).pair, '', 'senza coppia si usa il mint'); assert.match(Semi.text(Semi.alertOf({ mint: mint(2), sym: '<b>x', score: 1, a: { m: {} } }, T)), /\$&lt;b&gt;x/, 'il testo e\' protetto');
});
test('scelta dei segnali: non si ripete la stessa Coin per 3 ore, al massimo 8 in un\'ora, rispetta il filtro del calo', () => {
  const alerts = []; const buys = []; for (let i = 1; i <= 12; i++) buys.push(cand(i));
  const first = Semi.pick(alerts, buys, T, null); assert.equal(first.length, Semi.MAX_PER_HOUR, 'limite orario'); first.forEach((c) => alerts.push(Semi.alertOf(c, T)));
  assert.equal(Semi.pick(alerts, buys, T + 60000, null).length, 0, 'tetto raggiunto');
  const later = Semi.pick(alerts, buys, T + 3700000, null); assert.equal(later.map((c) => c.mint).includes(mint(1)), false, 'segnalata meno di 3 ore fa'); assert.ok(later.some((c) => c.mint === mint(9)), 'una nuova puo\' arrivare');
  assert.equal(Semi.pick([], [cand(1), cand(1)], T, null).length, 1, 'doppioni nello stesso giro'); assert.equal(Semi.pick([], buys, T, (c) => c.mint === mint(3)).length, 1, 'filtro');
  assert.equal(Semi.pick([], [{ mint: 'no', score: 1 }], T, null).length, 0, 'mint non valido');
});
test('misura dei segnali: variazione ora, minimo, dopo 5 e dopo 15 minuti, anche se non hai comprato', () => {
  const a = Semi.alertOf(cand(5), T), px = (r) => a.priceNative * (1 + r / 100);
  assert.equal(Semi.open([a], T + 60000).length, 1); assert.equal(Semi.track(a, px(10), T + 60000), true); assert.equal(a.last, 10); assert.equal(a.p5, undefined);
  Semi.track(a, px(-30), T + 6 * 60000); assert.equal(a.p5, -30); assert.equal(a.min, -30); Semi.track(a, px(5), T + 10 * 60000); assert.equal(a.p5, -30, 'la misura a 5 minuti non cambia'); assert.equal(a.p15, undefined);
  Semi.track(a, px(20), T + 16 * 60000); assert.equal(a.p15, 20); assert.equal(Semi.open([a], T + 16 * 60000).length, 0, 'fine del seguimento'); assert.equal(Semi.track(a, 0, T), false);
  const v = Semi.view([a], 5)[0]; assert.deepEqual([v.last, v.min, v.p5, v.p15], [20, -30, -30, 20]); assert.equal(v.mint, mint(5));
});
test('il parametro dell\'app: tre valori, spento di base, modificabile solo come gli altri parametri', async () => {
  const P = await import('../worker/src/params.js'), s = P.SCHEMA.semiAuto; assert.equal(s.t, 'enum'); assert.deepEqual(s.values, ['spento', 'avvisi e paper', 'solo avvisi']); assert.equal(s.scope, 'runner'); assert.equal(s.group, 'auto');
  const ok = P.validate({ semiAuto: 'solo avvisi' }); assert.equal(ok.errors.length, 0); assert.equal(ok.clean.semiAuto, 'solo avvisi'); assert.equal(P.validate({ semiAuto: 'si' }).errors.length, 1);
  const E = require('../engine.js'); assert.equal(E.DEFAULTS.semiAuto, 'spento'); assert.deepEqual(Semi.MODES, s.values);
});
test('runner e app: l\'avviso parte prima dell\'ingresso, con la modalità «solo avvisi» il paper non apre posizioni, il radar mostra il tasto pump.fun', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  const i1 = src.indexOf("if (S.semiAuto && S.semiAuto !== 'spento') await semiAlerts(buys);"), i2 = src.indexOf("if (S.semiAuto === 'solo avvisi') return;"), i3 = src.indexOf('if (!S.autopilot) return;\n  await realEntries(buys);');
  assert.ok(i1 > 0 && i2 > i1 && i3 > i2, 'avviso, poi uscita anticipata, poi gli ingressi'); assert.match(src, /await tg\(Semi\.text\(a\), Semi\.keyboard\(a\)\)/); assert.match(src, /async function tg\(text, markup\)/); assert.match(src, /alerts: Semi\.view\(st\.alerts \|\| \[\], 20\)/);
  assert.match(html, /id="semiBox"/); assert.match(html, /function renderSemi\(\)/); assert.match(html, /https:\/\/pump\.fun\/coin\/\$\{encodeURIComponent\(a\.mint\)\}/); assert.match(html, /renderLab\(\); renderSemi\(\);/);
});

test('decisione umana: una sola per segnale; il confronto presi contro scartati usa il prezzo alla decisione, il costo e una regola decisa in anticipo', () => {
  const al = []; for (let i = 0; i < 100; i++) al.push({ id: 'a' + i.toString(36).padStart(4, '0'), t: T, p5: null, p15: 0 });
  assert.equal(Semi.vote(al, al[0].id, 'y', T + 60000), true); assert.equal(Semi.vote(al, al[0].id, 'n', T + 70000), false, 'una sola decisione'); assert.equal(Semi.vote(al, 'zzzzz', 'y', T), false); assert.equal(Semi.vote(al, al[1].id, 'x', T), false);
  assert.equal(al[0].vote, 'y'); assert.equal(al[0].vp, 0);
  const mk = (n, vote, p5) => Array.from({ length: n }, (_, i) => ({ id: 'a' + i, t: T, vote, vAt: T + 60000, vp: 10, p5, p15: p5 }));
  // prezzo alla decisione +10%, a 5 minuti +21%: (1,21 / 1,10 - 1) = +10%, meno il costo del 5% = +5%
  const h = Semi.humanStats([...mk(60, 'y', 21), ...mk(40, 'n', 0)]);
  assert.equal(h.y, 60); assert.equal(h.n, 40); assert.ok(Math.abs(h.nMean - (-14.09)) < 0.05, 'scartati ' + h.nMean);
  const ys = mk(60, 'y', 21).map((a, i) => ({ ...a, p5: 21 + (i % 3) })); const g = Semi.humanStats([...ys, ...mk(40, 'n', 0)]);
  assert.ok(g.yMean > 3 && g.yLo > 0 && g.diffLo > 0); assert.equal(g.verdict, 'passa');
  assert.equal(Semi.humanStats([...mk(60, 'y', 5), ...mk(40, 'n', 5)]).verdict, 'non passa', 'prezzi uguali: nessun vantaggio dopo i costi');
  assert.equal(Semi.humanStats([...mk(10, 'y', 40), ...mk(5, 'n', 0)]).verdict, 'in corso', 'troppo pochi');
  const tardi = Semi.humanStats([{ id: 'ax1', t: T, vote: 'y', vAt: T + 6 * 60000, vp: 0, p5: 30, p15: 30 }]); assert.equal(tardi.late, 1); assert.equal(tardi.y, 0, 'deciso dopo 5 minuti: escluso');
});

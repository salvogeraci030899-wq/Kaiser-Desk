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

test('controllo equo: lo Scarto si simula con le stesse uscite dei Prendo (stop, meta\' a +100%, trailing, tempo massimo) e costi stimati', () => {
  const T = 1_700_000_000_000, S = { ...E.DEFAULTS }, mk = () => ({ priceNative: 0.001, liq: 100000, vp: 0 }), m = (px, liq = 100000) => ({ priceNative: px, liq, br5: 1, tx5: 5 });
  const a = mk(); assert.equal(Semi.shadowOpen(a, S, T, 0.2, 100), true); assert.equal(Semi.shadowOpen(a, S, T, 0.2, 100), false, 'una sola simulazione per segnale');
  assert.ok(a.sh.e > 0.001, 'costi all\'ingresso: commissione e impatto');
  assert.equal(Semi.shadowStep(a, m(0.0011), S, T + 60000), null, '+10%: resta');
  assert.equal(Semi.shadowStep(a, m(0.00079), S, T + 120000).reason, 'Stop loss'); assert.equal(a.sh.done, true); assert.ok(a.sh.pct < -20 && a.sh.pct > -25, 'stop -20% piu\' costi: ' + a.sh.pct);
  const b = mk(); Semi.shadowOpen(b, S, T, 0.2, 100);
  assert.equal(Semi.shadowStep(b, m(0.0021), S, T + 3600000).reason, 'TP1'); assert.equal(b.sh.done, false, 'vende la meta\', il resto resta'); assert.ok(Math.abs(b.sh.rem - 0.5) < 1e-9);
  Semi.shadowStep(b, m(0.003), S, T + 4000000); assert.equal(Semi.shadowStep(b, m(0.002), S, T + 4100000).reason, 'Trailing stop'); assert.equal(b.sh.done, true); assert.ok(b.sh.pct > 30, 'meta\' a +100%, resto a +100% meno il trailing: ' + b.sh.pct);
  const c = mk(); Semi.shadowOpen(c, S, T, 0.2, 100); assert.equal(Semi.shadowStep(c, m(1.03 * 0.001), S, T + 7 * 3600000).reason, 'Time stop', 'dopo 6 ore la prima meta\' esce comunque'); assert.equal(c.sh.done, true);
  const d = mk(); Semi.shadowOpen(d, S, T, 0.2, 100); assert.equal(Semi.shadowStep(d, { priceNative: 0.001, liq: 40000, br5: 1, tx5: 5 }, S, T + 1000).reason, 'RUG-EXIT liquidità', 'il crollo della liquidita\' vale anche nel controllo');
  const j = [{ src: 'umano', band: '500K-1M', pct: 30 }, { src: 'umano', band: '500K-1M', pct: -20 }, { src: 'bot', pct: -5 }];
  const cs = Semi.controlStats(j, [a, b, c, d, { id: 'x' }]); assert.equal(cs.y, 2); assert.equal(cs.n, 4); assert.equal(cs.open, 0); assert.ok(cs.nMean != null && cs.diff != null);
  assert.deepEqual(Semi.bandExits({}), { sl: 20, tp1: 100, tp1Sell: 50, trail: 25, beAfterTp1: true, timeStopMin: 360, timeStopMinPnl: 1e9, sellPressure: false }, 'le uscite di base');
  const f = mk(); Semi.shadowOpen(f, S, T, 0.2, 100); const S2 = { ...S, humanBandSl: 5 }; assert.equal(Semi.shadowStep(f, m(0.00092), S2, T + 1000), null, 'parametri cambiati dopo l\'apertura: lo Scarto simulato tiene le uscite di partenza (stop -20%)');
  const g2 = mk(); Semi.shadowOpen(g2, S, T, 0.2, 100); assert.equal(Semi.shadowStep(g2, { priceNative: 0.0012, liq: 100000, br5: 0.1, tx5: 50 }, S, T + 1000), null, 'la pressione di vendita non fa uscire a meta\': le uscite sono quelle della prova');
});

test('runner e app: il controllo si aggiorna a ogni scansione; la vista per l\'app porta fascia, creatore e decisione', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(src, /await updateShadows\(pairs\)/); assert.match(src, /Semi\.shadowOpen\(al, S,/); assert.match(src, /st\.bandDays/);
  const v = Semi.view([{ t: 1, mint: 'M', sym: 'S', score: 70, band: '1M-2M', cline: 'creatore sconosciuto', vote: 'y' }], 5)[0]; assert.equal(v.band, '1M-2M'); assert.equal(v.cline, 'creatore sconosciuto'); assert.equal(v.vote, 'y');
  assert.match(html, /a\.band \? 'fascia ' \+ esc\(a\.band\)/); assert.match(html, /esc\(a\.cline\)/);
});

test('riepilogo uomo e macchina, revisione a 7 giorni con criteri decisi in anticipo, verdetto una volta sola', () => {
  const T = Date.UTC(2026, 10, 23, 12, 0, 0), al = (i, o) => ({ id: 'a' + String(i).padStart(4, '0'), t: T - i * 60000, band: '500K-1M', ...o });
  const alerts = [al(1, { vote: 'y' }), al(2, { vote: 'n', sh: { done: true, pct: -12 } }), al(3, {}), al(4, { band: '1M-2M', vote: 'n' })];
  const journal = [{ src: 'umano', band: '500K-1M', pct: 25, closedAt: T - 3600000 }, { src: 'umano', band: '500K-1M', pct: -20, closedAt: T - 90 * 3600000 }, { src: 'bot', pct: -5, closedAt: T }];
  const cr = { launches: 900, bandCoins: 12, doubled: 3, cov: { tabella: 6, esterna: 2, sconosciuto: 2 } };
  const t = Semi.digestText({ alerts, journal, positions: [{ src: 'umano' }, { src: 'bot' }], bandDays: { '2026-11-23': { c: 30, nv: 9 } }, cr, now: T });
  assert.match(t, /Avvisi oggi: 4 \(500K-1M 3, 1M-2M 1\) · Prendo 1 · Scarto 2 · senza risposta 1/); assert.match(t, /Tue posizioni aperte: 1 · chiuse oggi: 1, netto medio \+25\.0%/);
  assert.match(t, /Tuoi trade chiusi in tutto: 2 di 50/); assert.match(t, /Scarti simulati chiusi: 1/); assert.match(t, /viste oggi: 30, con punteggio sufficiente: 9/); assert.match(t, /creatore sconosciuto nel 20% dei casi/); assert.ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(t), 'niente emoji');
  const since = T - 8 * 86400000, many = Array.from({ length: 20 }, (_, i) => al(i + 5, { t: since + (i + 1) * 3600000 }));
  const ok = Semi.reviewOf({ alerts: many, journal, cr, since }); assert.equal(ok.enough, true); assert.match(Semi.reviewText(ok), /si va avanti fino a 50 trade chiusi/);
  const few = Semi.reviewOf({ alerts: many.slice(0, 5), journal, cr, since }); assert.equal(few.enough, false); assert.equal(few.few, true); assert.match(Semi.reviewText(few), /pochi avvisi/);
  const blind = Semi.reviewOf({ alerts: many, journal, cr: { cov: { tabella: 1, esterna: 0, sconosciuto: 9 } }, since }); assert.equal(blind.blind, true); assert.match(Semi.reviewText(blind), /troppi creatori sconosciuti/);
  assert.equal(Semi.reviewOf({ alerts: many, journal, cr: null, since }).blind, true, 'senza dati sui creatori: sconosciuto al 100%');
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /humanChecks\(\)\.catch/); assert.match(src, /!st\.humanReviewed && Date\.now\(\) - st\.humanSince/); assert.match(src, /t\.verdict !== 'in corso' && !st\.humanNotified/); assert.match(src, /Semi\.digestText\(/);
});

test('vista per l\'app: creatori migliori (prima quelli con Coin raddoppiate), Coin recenti, indirizzi abbreviati; Laboratorio e modalita\' Strategia in solo uomo', () => {
  const T = 1_700_000_000_000; let now = T; const c = new Creators({ dir: '', bandFile: '', now: () => now }), a = id(950), b = id(951);
  c.noteLaunch({ mint: id(40), creator: a, at: 1 }); c.noteLaunch({ mint: id(41), creator: b, at: 2 });
  c.noteBand(id(40), 'AAA', 600000, a); now += 1000; c.noteBand(id(41), 'BBB', 700000, b); c.noteBand(id(40), 'AAA', 1500000, a);
  const v = c.view(5); assert.equal(v.top.length, 2); assert.equal(v.top[0].doubled, 1, 'prima il creatore con la Coin raddoppiata'); assert.equal(v.top[0].c, a.slice(0, 4) + '...' + a.slice(-4)); assert.ok(!JSON.stringify(v).includes(a), 'indirizzo intero mai nella vista');
  assert.equal(v.coins[0].s, 'BBB', 'prima la piu\' recente'); assert.equal(v.bandCoins, 2); assert.equal(v.doubled, 1); assert.equal(c.view(1).top.length, 1);
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(src, /creators: rt\.creators \? rt\.creators\.view\(10\) : null/); assert.match(src, /st\.stratResetV !== 1\) \{ rt\.strat = Strat\.create\(\)/);
  assert.match(html, /function renderLab\(\) \{\n  if \(S\(\)\.humanOnly\) return renderCreators\(\);/); assert.match(html, /data-mode="strat"\]'\)\.forEach\(\(b\) => \{ b\.hidden = only; \}\)/); assert.match(html, /if \(only && st\.mode === 'strat'\)/);
});

test('riquadro Segnali ad altezza fissa: una riga di griglia di 76 px sempre presente, mai nascosto, testi che non vanno a capo', () => {
  const css = fs.readFileSync(require.resolve('../style.css'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8'), fn = html.slice(html.indexOf('function renderSemi() {'), html.indexOf('function renderRadar() {'));
  assert.match(css, /#v-radar\.active \{ grid-template-rows: 40px 76px 38px minmax\(0, 1fr\); \}/); assert.match(css, /#semiBox \{ height: 76px; min-height: 76px; max-height: 76px; overflow: hidden;/);
  assert.match(css, /\.semitxt > div \{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; \}/); assert.ok(!/semi-on|:empty/.test(css), 'niente regole che cambiano la griglia o nascondono il riquadro');
  assert.ok(!/box\.innerHTML = ''/.test(fn) && !/classList\.(add|remove)\('semi-on'\)/.test(fn) && !/return;/.test(fn.replace('if (!box) return;', '')), 'renderSemi disegna sempre il riquadro');
  assert.match(fn, /Nessun avviso ancora/);
});

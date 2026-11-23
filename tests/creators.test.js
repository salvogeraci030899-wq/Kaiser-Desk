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
  const c = new Creators({ dir: '', bandFile: '', fetch: f, now: () => now, apiUrl: 'https://x.test/coins/' });
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
  const cs = Semi.controlStats(j, [a, b, c, d, { id: 'x' }].map((x) => ({ ...x, vote: 'n' }))); assert.equal(cs.y, 2); assert.equal(cs.n, 4); assert.equal(cs.open, 0); assert.ok(cs.nMean != null && cs.diff != null);
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

test('registro delle decisioni: un\'unica lista di prese e scartate, con lo stato di ognuna; nessun bot a parte', () => {
  const T = 1_700_000_000_000, j = [{ aid: 'a00001', pct: 25.04, pnl: 0.0512, reason: 'TP1', closedAt: T + 5000 }];
  const pos = [{ aid: 'a00002', openedAt: T + 2000, entry: 1, last: { priceNative: 1.1 } }];
  const al = [{ id: 'a00001', t: T, sym: 'AAA', band: '500K-1M', vote: 'y' }, { id: 'a00002', t: T + 1000, sym: 'BBB', vote: 'y' }, { id: 'a00003', t: T + 2000, sym: 'CCC', vote: 'y', vAt: T + 3000 },
    { id: 'a00004', t: T + 3000, sym: 'DDD', vote: 'n', sh: { done: true, pct: -12.34, reason: 'Stop loss', t1: T + 9000 } }, { id: 'a00005', t: T + 4000, sym: 'EEE', vote: 'n', vAt: T + 4500, sh: { done: false } },
    { id: 'a00006', t: T + 5000, sym: 'FFF', vote: 'n', vAt: T + 5500 }, { id: 'a00007', t: T + 6000, sym: 'GGG' }];
  const d = Semi.decisions(al, j, pos, 10), by = Object.fromEntries(d.map((x) => [x.sym, x]));
  assert.equal(d.length, 6, 'senza voto non e\' una decisione'); assert.deepEqual(d.map((x) => x.sym), ['DDD', 'FFF', 'AAA', 'EEE', 'CCC', 'BBB'], 'dalla piu\' recente');
  assert.deepEqual([by.AAA.status, by.AAA.pct, by.AAA.pnl, by.AAA.reason], ['chiuso', 25, 0.0512, 'TP1']); assert.deepEqual([by.BBB.status, by.BBB.pct, by.BBB.reason], ['aperto', 10, 'in corso']);
  assert.deepEqual([by.CCC.status, by.CCC.pct], ['non aperto', null]); assert.deepEqual([by.DDD.status, by.DDD.pct, by.DDD.pnl, by.DDD.reason, by.DDD.vote], ['chiuso', -12.3, null, 'Stop loss', 'n']);
  assert.deepEqual([by.EEE.status, by.EEE.reason], ['aperto', 'in corso']); assert.deepEqual([by.FFF.status, by.FFF.reason], ['senza simulazione', 'senza simulazione']); assert.equal(Semi.decisions(al, j, pos, 2).length, 2);
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(src, /decisions: Semi\.decisions\(st\.alerts \|\| \[\], st\.journal, st\.positions, 60\), decisionTotals: Semi\.decisionTotals\(st\.alerts \|\| \[\], st\.journal, st\.positions\), responses: Semi\.responseStats\(st\.alerts \|\| \[\], Semi\.decisions\(st\.alerts \|\| \[\], st\.journal, st\.positions, 1e9\)\), decisionStats: Semi\.controlStats/); assert.match(src, /aid: a\.id \|\| ''/); assert.match(src, /aid: p\.aid \|\| ''/);
  assert.ok(!/## Le tue decisioni[\s\S]{0,2200}trade del bot/.test(src), 'il report non confronta con un bot');
  assert.match(html, /g\.page === pg && !\(g\.off && S\(\)\.humanOnly\)/, 'impostazioni: i gruppi del bot non si mostrano'); assert.match(html, /data-jt="dec">Presi e scartati/); assert.match(html, /only \? \(dRows \|\|/); assert.match(html, /'Decisioni: prese e scartate'/);
});

test('catena di ricerche del creatore: se la prima fallisce si prova la successiva; ognuna ha la sua diagnostica; dopo 5 fallimenti di fila riposa; Jupiter con il campo dev', async () => {
  let now = 1_000_000; const urls = [], cr = id(960);
  const f = async (url) => {
    urls.push(url);
    if (url.includes('frontend-api-v3')) return { ok: false, status: 403, json: async () => ({}) };
    if (url.includes('frontend-api.pump')) throw new Error('rete');
    return { ok: true, json: async () => [{ id: 'altro', dev: id(961) }, { id: url.split('query=')[1], dev: cr }] };
  };
  const c = new Creators({ dir: '', bandFile: '', fetch: f, now: () => now });
  assert.equal(await c.creatorOf(id(70)), cr, 'dalla terza richiesta'); assert.equal(urls.length, 3);
  assert.equal(c.cov.esterna, 1); const a = c.summary().api; assert.deepEqual([a['pump v3'].ok, a['pump v3'].fail, a['pump v3'].err], [0, 1, 'HTTP 403']); assert.equal(a['pump v1'].err, 'rete'); assert.deepEqual([a.jupiter.ok, a.jupiter.fail], [1, 0]);
  for (let i = 1; i <= 4; i++) await c.creatorOf(id(70 + i));       // altri 4 fallimenti di fila delle prime due
  const before = urls.length; await c.creatorOf(id(80)); assert.equal(urls.filter((u) => u.includes('frontend-api')).length, 10, 'le prime due riposano dopo 5 fallimenti: niente nuove richieste'); assert.equal(urls.length - before, 1, 'resta solo Jupiter');
  now += 11 * 60000; urls.length = 0; await c.creatorOf(id(81)); assert.ok(urls.some((u) => u.includes('frontend-api-v3')), 'dopo 10 minuti si riprova');
  const off = new Creators({ dir: '', bandFile: '', fetch: f, apiUrl: '' }); assert.equal(await off.creatorOf(id(90)), '', 'apiUrl vuoto: richieste spente');
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'); assert.match(src, /Richieste esterne per il creatore:/); assert.match(src, /function bandFix\(k, v\)/); assert.match(src, /nv = bandFix\(k, nv\);/);
});


test('conteggio giornaliero della fascia alta: le Coin gia\' contate si ricordano nello stato (non per run); niente memoria in processo', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /d\.m = d\.m \|\| \[\]; d\.q = d\.q \|\| \[\]; const seen = new Set\(d\.m\), qual = new Set\(d\.q\);/); assert.ok(!/rt\.bandSeen/.test(src), 'nessun insieme in memoria che si perde a ogni run');
  assert.match(src, /if \(d\.m\.length > 800\) d\.m\.splice\(0, d\.m\.length - 800\);/);
});

test('controllo con un solo caso: la media si mostra subito, l\'intervallo servono due casi; Profit factor senza trade mostra un trattino', () => {
  const al = [{ id: 'a1', vote: 'n', sh: { done: true, pct: 95.47 } }], one = Semi.controlStats([], al);
  assert.equal(one.n, 1); assert.equal(one.nMean, 95.47); assert.equal(one.nWin, 100); assert.equal(one.nLo, undefined, 'intervallo: servono due casi'); assert.equal(one.diff, undefined, 'nessun Prendo: niente differenza');
  const both = Semi.controlStats([{ src: 'umano', band: 'x', pct: 10 }], al); assert.equal(both.yMean, 10); assert.equal(both.diff, -85.47); assert.equal(both.diffLo, undefined);
  const two = Semi.controlStats([{ src: 'umano', band: 'x', pct: 10 }, { src: 'umano', band: 'x', pct: 20 }], [...al, { id: 'a2', vote: 'n', sh: { done: true, pct: -10 } }]); assert.ok(two.nLo != null && two.diffLo != null);
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8'); assert.match(html, /\$\('#jPF'\)\.textContent = !\(st0 \? st0\.n : J\.length\) \? '—'/);
});

test('riquadri del Journal: contano solo i Prendo chiusi; gli scartati simulati non entrano nell\'andamento', () => {
  const T = 1_700_000_000_000;
  const al = [{ id: 'a00001', t: T, sym: 'AAA', vote: 'y' }, { id: 'a00002', t: T + 1, sym: 'BBB', vote: 'n', sh: { done: true, pct: 95.47, got: 0.2365, size: 0.12, cost: 0.1205, reason: 'Trailing stop', t1: T + 5000 } }, { id: 'a00003', t: T + 2, sym: 'CCC', vote: 'n', sh: { done: true, pct: -20, got: 0.096, size: 0.12, reason: 'Stop loss', t1: T + 9000 } }, { id: 'a00004', t: T + 3, sym: 'DDD', vote: 'n', sh: { done: false } }];
  const j = [{ aid: 'a00001', pct: -10, pnl: -0.012, reason: 'Stop (tuo)', closedAt: T + 7000 }];
  const only = Semi.decisionTotals(al, [], []); assert.equal(only.n, 0, 'solo scartati: nessun trade nei riquadri'); assert.equal(only.y, 0); assert.equal(only.nn, 2); assert.equal(only.pnl, 0);
  const all = Semi.decisionTotals(al, j, []); assert.equal(all.n, 1); assert.equal(all.y, 1); assert.equal(all.nn, 2); assert.equal(all.pnl, -0.012); assert.equal(all.al, -10);
  assert.equal(Semi.decisionTotals([], [], []).n, 0); assert.equal(Semi.decisionTotals([{ id: 'a00009', t: T, vote: 'y' }], [{ aid: 'a00009', pct: 10, pnl: 0.01, reason: 'Target', closedAt: T }], []).pf, 999, 'nessuna perdita: profit factor senza limite (999 = infinito)');
  const d = Semi.decisions(al, [], [], 10).find((x) => x.sym === 'BBB'); assert.equal(d.pnl, 0.116, 'P&L simulato dello scartato: ' + d.pnl);
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8'); assert.match(html, /T = onlyD && run \? run\.decisionTotals : null/); assert.match(html, /scrolly/); assert.match(html, /\$\{T\.y\}\/50/);
});


test('id degli avvisi unici: piu\' avvisi dello stesso secondo non condividono l\'id, quindi la risposta a uno non finisce su un altro', () => {
  const T = 1_700_000_000_000, mk = (i) => ({ mint: id(500 + i), sym: 'S' + i, score: 60, a: { m: { priceNative: 0.001, mc: 600000, liq: 90000, ageMin: 5 } }, pair: {} });
  const alerts = []; for (let i = 0; i < 6; i++) { const a = Semi.alertOf(mk(i), T); a.id = Semi.uniqueId(alerts, a.id); alerts.push(a); }
  assert.equal(new Set(alerts.map((a) => a.id)).size, 6, 'tutti diversi'); assert.ok(alerts.every((a) => /^a[0-9a-z]{4,8}$/.test(a.id)), 'formato accettato dal Worker (5-9 caratteri)');
  assert.ok(alerts.every((a) => ('hd:y:' + a.id).length <= 64), 'entra nel limite di Telegram');
  assert.equal(alerts[0].id, Semi.alertOf(mk(0), T).id, 'il primo ha l\'id di base'); assert.equal(Semi.uniqueId([], 'atoxb6y'), 'atoxb6y');
  Semi.vote(alerts, alerts[2].id, 'n', T + 1000); assert.deepEqual(alerts.map((a) => a.vote || '-'), ['-', '-', 'n', '-', '-', '-'], 'la risposta va sull\'avviso giusto');
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'); assert.match(src, /a\.id = Semi\.uniqueId\(st\.alerts, a\.id\)/);
});

test('registro a schermo intero: il tocco su una riga apre la Coin su pump.fun', () => {
  const al = [{ id: 'a00001', t: 1, mint: 'MintAAA', sym: 'AAA', vote: 'n' }];
  assert.equal(Semi.decisions(al, [], [], 5)[0].mint, 'MintAAA');
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(html, /#sheetInner \.jfull \.jrow\[data-mint\]/); assert.match(html, /data-mint="\$\{esc\(d\.mint/);
});

test('Prendo non aperto: il motivo si vede nel registro e la simulazione non entra nelle statistiche degli Scarto', () => {
  const T = 1_700_000_000_000;
  const al = [{ id: 'a00001', t: T, mint: 'M1', sym: 'AAA', vote: 'y', vAt: T + 1000, nw: 'impatto 2.0% oltre lo slippage', sh: { done: true, pct: 40, got: 0.17, size: 0.12, cost: 0.1205, reason: 'Trailing stop', t1: T + 9000 } }, { id: 'a00002', t: T + 1, mint: 'M2', sym: 'BBB', vote: 'n', sh: { done: true, pct: -20, got: 0.096, size: 0.12, cost: 0.1205, reason: 'Stop loss', t1: T + 9000 } }];
  const d = Semi.decisions(al, [], [], 10).find((x) => x.sym === 'AAA'); assert.equal(d.status, 'non aperto'); assert.match(d.reason, /non aperto: impatto 2\.0% oltre lo slippage \(simulato \+40\.0%\)/);
  assert.equal(d.pct, null); assert.equal(Semi.decisionTotals(al, [], []).n, 0, 'non e\' un trade');
  assert.equal(Semi.controlStats([], al).n, 1, 'negli Scarto conta solo BBB');
});

test('esito del voto nel box dei segnali: le righe delle decisioni portano l\'id dell\'avviso', () => {
  const al = [{ id: 'a00001', t: 1, mint: 'M1', sym: 'AAA', vote: 'y', vAt: 2, nw: 'cassa insufficiente' }];
  assert.equal(Semi.decisions(al, [], [], 5)[0].id, 'a00001');
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8'); assert.match(html, /Rispondi su Telegram: Prendo o Scarto/); assert.match(html, /'Non aperto: '/);
});

test('riepilogo delle risposte: risposti, scaduti, tempo mediano, Prendo non aperti', () => {
  const T = 1_700_000_000_000, now = T + 3600000;
  const al = [{ id: 'a1', t: T, vote: 'y', vAt: T + 20000 }, { id: 'a2', t: T + 1, vote: 'n', vAt: T + 100001 }, { id: 'a3', t: T + 2 }, { id: 'a4', t: now - 1000 }];
  const r = Semi.responseStats(al, [{ vote: 'y', status: 'non aperto' }, { vote: 'n', status: 'chiuso' }], now);
  assert.deepEqual(r, { n: 4, answered: 2, expired: 1, medS: 60, notOpened: 1 }, 'a3 e\' scaduto, a4 e\' ancora valido');
  assert.deepEqual(Semi.responseStats([], [], now), { n: 0, answered: 0, expired: 0, medS: null, notOpened: 0 });
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8'); assert.match(html, /data-jt="ris"/); assert.match(html, /Tempo mediano di risposta/);
  assert.match(fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), /responses: Semi\.responseStats/);
});

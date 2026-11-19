'use strict';
// Fabbrica di strategie: archivio dei percorsi, simulazione con costi, dati di controllo separati, collegamento con il Laboratorio e il runner.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const Farm = require('../runner/farm.js');
const Lab = require('../runner/trades.js');

const T = 1_700_000_000_000;
// percorso a intervalli da 5 s (u = 100 $/SOL: 7.5K = 75 SOL): 40 intervalli a 50 SOL, poi il salto a 76 (soglia superata) e la salita indicata
const mk = (at, rise, tail = 60, base = 50) => { const p = new Array(40).fill(base); p.push(76); for (let i = 1; i <= tail; i++) p.push(76 * (1 + rise * Math.min(1, i / 5))); return { m: 'M' + at, s: 'S', at, u: 100, p }; };

test('archivio: il percorso si salva come punti di variazione e si ricostruisce uguale (a un decimo di SOL)', () => {
  const p = [30, 30, 30, 31.2, 31.2, 45, 45, 45, 45, 20], r = Farm.pack({ m: 'AAA', s: 'X', at: T, p, usd: 70.123 });
  assert.equal(r.n, 10); assert.equal(r.u, 70.12); assert.deepEqual(r.c, [0, 300, 3, 312, 5, 450, 9, 200], 'solo i punti in cui il valore cambia');
  const q = Farm.unpack(r); assert.deepEqual(q.p, p); assert.equal(q.m, 'AAA');
});
test('archivio su disco: un file per scrittura, nessun duplicato, i file vecchi vengono tolti', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'farm-')), now = Date.UTC(2026, 10, 15, 12, 0, 0), r = (m) => Farm.pack({ m, s: 'S', at: now, usd: 100, p: new Array(60).fill(50).map((v, i) => v + (i > 30 ? 30 : 0)) });
  const f1 = Farm.writeBatch(dir, [r('A1'), r('A2')], now), f2 = Farm.writeBatch(dir, [r('A2'), r('A3')], now + 1000), old = Farm.writeBatch(dir, [r('OLD')], now - 8 * 86400000);
  assert.ok(f1 !== f2 && fs.existsSync(f1) && fs.existsSync(old)); assert.equal(Farm.writeBatch(dir, [], now), null, 'niente da scrivere: nessun file');
  assert.equal(Farm.loadAll(dir).length, 4, 'A1, A2, A3 e OLD: A2 una volta sola');
  assert.equal(Farm.prune(dir, now, 7), 1); assert.equal(fs.existsSync(old), false); assert.equal(Farm.loadAll(dir).length, 3);
  assert.equal(Farm.loadAll(path.join(dir, 'non-esiste')).length, 0, 'cartella assente: nessun errore');
});
test('simulazione: soglia, ritardo, target, stop (vince lo stop), tempo massimo e costi inclusi', () => {
  const up = mk(T, 0.3), cfg = { thr: 7500, delay: 0, tp: 20, sl: 10, hold: 0 };
  const a = Farm.simulate(up.p, 100, cfg); assert.equal(a.why, 'tp'); assert.ok(Math.abs(a.net - (24 - Farm.COST)) < 0.01, 'esito netto ' + a.net);   // esce al prezzo letto quando scatta il target (+24% in questo percorso), meno i costi
  const dn = mk(T, -0.2), b = Farm.simulate(dn.p, 100, cfg); assert.equal(b.why, 'sl'); assert.ok(b.net < -Farm.COST - 9);
  assert.equal(Farm.simulate(up.p, 100, { ...cfg, thr: 15000 }), null, 'soglia mai superata');
  const slow = mk(T, 0.02), c = Farm.simulate(slow.p, 100, { ...cfg, hold: 60 }); assert.equal(c.why, 'tempo'); assert.equal(c.held, 60);
  const d = Farm.simulate(up.p, 100, { ...cfg, delay: 10 }); assert.ok(d && d.net <= a.net + 25, 'con ritardo si entra piu\' tardi');
  const gap = { ...mk(T, 0), p: [...new Array(40).fill(50), 76, 60, 90, ...new Array(30).fill(90)] }; assert.equal(Farm.simulate(gap.p, 100, cfg).why, 'sl', 'a parita\' vince lo stop (prima il calo)');
  assert.equal(Farm.simulate([50, 50, 76, 80], 100, cfg), null, 'meno di 60 secondi di storia dopo l\'ingresso: non si valuta');
});
test('esecuzione: passa solo la regola positiva nei dati vecchi e in quelli recenti; un andamento che cambia non passa', () => {
  const grid = { thr: [7500], delay: [0], tp: [20], sl: [10], hold: [0] };
  const good = []; for (let i = 0; i < 100; i++) good.push(mk(T + i * 60000, 0.3));
  const r1 = Farm.run(good, { grid }); assert.equal(r1.tried, 1); assert.equal(r1.passed, 1); assert.equal(r1.train, 60); assert.equal(r1.test, 40); assert.ok(r1.top[0].tr.ev > 10 && r1.top[0].te.ev > 10);
  const flip = good.map((x, i) => (i < 60 ? x : mk(x.at, -0.2)));      // i primi 60 salgono, gli ultimi 40 scendono: sembra buona sul passato e non regge
  const r2 = Farm.run(flip, { grid }); assert.equal(r2.passed, 0, 'non regge sui dati recenti'); assert.equal(r2.posTrain, 1, 'ma sul passato sembrava buona'); assert.ok(r2.bestTrain.tr.ev > 0 && r2.bestTrain.te.ev < 0);
  const few = good.slice(0, 30); assert.equal(Farm.run(few, { grid }).passed, 0, 'troppe poche operazioni: nessuna conclusione');
  assert.equal(Farm.run([], { grid }).passed, 0); assert.ok(Farm.run([], { grid }).span === null);
});
test('la griglia completa finisce in pochi secondi anche con migliaia di percorsi', () => {
  const recs = []; for (let i = 0; i < 1500; i++) recs.push(mk(T + i * 1000, (i % 7) / 20 - 0.1, 200)); const t0 = Date.now(), r = Farm.run(recs);
  assert.equal(r.tried, 4 * 3 * 4 * 4 * 4); assert.ok(Date.now() - t0 < 30000, 'durata ' + (Date.now() - t0) + ' ms');
});
test('il Laboratorio consegna il percorso solo dei token che superano la soglia minima di market cap', () => {
  const got = [], feed = new Lab.TradeFeed({ now: () => T, log: () => {}, solUsd: () => 100, onPath: (x) => got.push(x) }), B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const mint = (i) => { let s = ''; for (let k = 0; k < 44; k++) s += B58[(i * 7 + k * 13 + (k % 5) * i) % 58]; return s; };
  const hi = mint(61), lo = mint(62); feed.adopt({ mint: hi, symbol: 'H', curve: mint(71) }, T); feed.adopt({ mint: lo, symbol: 'L', curve: mint(72) }, T);
  for (let i = 0; i < 40; i++) { feed.book.curveMc(feed.book.toks.get(hi), T + i * 5000 + 10, { mcSol: i < 20 ? 30 : 60 }); feed.book.curveMc(feed.book.toks.get(lo), T + i * 5000 + 10, { mcSol: 30 }); }
  feed.finish(feed.book.toks.get(hi), T + 22 * 60000); feed.finish(feed.book.toks.get(lo), T + 22 * 60000);
  assert.equal(got.length, 1); assert.equal(got[0].m, hi); assert.equal(got[0].usd, 100); assert.ok(got[0].p.length > 24 && Math.max(...got[0].p) === 60);
  const rec = Farm.pack(got[0]); assert.deepEqual(Farm.unpack(rec).p.slice(0, 3), [30, 30, 30]);
});
test('ogni token concluso lascia (creatore, massimo raggiunto), anche se non supera mai la soglia', () => {
  const got = [], paths = [], B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', feed = new Lab.TradeFeed({ now: () => T, log: () => {}, solUsd: () => 100, onCreator: (x) => got.push(x), onPath: (x) => paths.push(x) });
  const mint = (i) => { let s = ''; for (let k = 0; k < 44; k++) s += B58[(i * 7 + k * 13 + (k % 5) * i) % 58]; return s; };
  const lo = mint(62), cre = mint(80); feed.adopt({ mint: lo, symbol: 'L', curve: mint(72), creator: cre }, T);
  for (let i = 0; i < 40; i++) feed.book.curveMc(feed.book.toks.get(lo), T + i * 5000 + 10, { mcSol: 30 });
  feed.finish(feed.book.toks.get(lo), T + 22 * 60000);
  assert.equal(paths.length, 0, 'sotto soglia: nessun percorso'); assert.equal(got.length, 1); assert.equal(got[0].m, lo); assert.equal(got[0].cr, cre); assert.equal(got[0].mx, 3000);
});
test('il runner salva i percorsi, avvia la fabbrica in un processo separato e ne pubblica il rapporto', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /require\('\.\/farm\.js'\)/); assert.match(src, /onPath: \(x\) => \{ rt\.pathBuf\.push\(Farm\.pack\(x\)\)/); assert.match(src, /flushPaths\(false\)/); assert.match(src, /flushPaths\(true\)/);
  assert.match(src, /execFile\(process\.execPath, \[path\.join\(__dirname, 'farm\.js'\)/); assert.match(src, /farm: rt\.farm \|\| null/); assert.match(src, /maybeFarm\(\);/); assert.match(src, /3600000/);
});

test('ricerca filtro + regola: trova un segnale vero (p basso) e non ne inventa uno dal rumore (p alto)', () => {
  const Combo = require('../runner/combo.js'); let seed = 12345; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  const mkRec = (i, good) => { const p = []; for (let k = 0; k < 10; k++) p.push(40 + k * 3.5); p.push(76); for (let k = 1; k <= 80; k++) p.push(good ? (k < 6 ? 76 + k * 3 : 76 + 18) : (k < 4 ? 76 - k * 6 : 52)); return { m: 'm' + i, s: 'S', at: T + i * 1000, u: 100, p, cr: '' }; };
  const N = 900, hol = new Map(), rec1 = [], rec2 = [];
  for (let i = 0; i < N; i++) { const good = rnd() < 0.5; rec1.push(mkRec(i, good)); hol.set('m' + i, { top1: good ? 0.05 + rnd() * 0.05 : 0.30 + rnd() * 0.1 }); rec2.push(mkRec(i, rnd() < 0.5)); }
  const real = Combo.run(rec1, { thr: 7500, holders: hol, creators: [], perms: 40, rng: rnd });
  assert.ok(real.best && real.best.score > 5, 'segnale vero: esito positivo ' + (real.best && real.best.score)); assert.equal(real.best.feat, 'top1'); assert.ok(real.perm.p <= 0.05, 'p ' + real.perm.p);
  const noise = new Map(); for (let i = 0; i < N; i++) noise.set('m' + i, { top1: rnd() });
  const none = Combo.run(rec2, { thr: 7500, holders: noise, creators: [], perms: 40, rng: rnd }); assert.ok(none.perm.p > 0.05, 'rumore: p ' + none.perm.p);
});

test('segnale credibile: positivo su vecchi e recenti, abbastanza operazioni e caso sotto il 5%; avviso una volta sola', () => {
  const Combo = require('../runner/combo.js'), mk = (o) => ({ best: { feat: 'top1', dir: 'basso', cut: 0.1, rule: { delay: 0, tp: 10, sl: 10, hold: 60 }, tr: { n: 100, ev: 3 }, te: { n: 60, ev: 2 }, score: 2, ...o }, perm: { B: 100, p: 0.02 } });
  assert.equal(Combo.credible(mk()), true);
  assert.equal(Combo.credible(mk({ te: { n: 60, ev: -1 } })), false, 'negativo sui recenti');
  assert.equal(Combo.credible(mk({ tr: { n: 10, ev: 3 } })), false, 'poche operazioni');
  const c = mk(); c.perm.p = 0.2; assert.equal(Combo.credible(c), false, 'il caso fa uguale');
  const d = mk(); d.perm = { B: 10, p: 0.01 }; assert.equal(Combo.credible(d), false, 'poche permutazioni');
  assert.equal(Combo.credible({ best: { feat: null } }), false); assert.equal(Combo.comboKey(mk()), 'top1/basso/0.1/0/10/10/60');
  const src = fs.readFileSync(path.join(__dirname, '..', 'runner', 'runner.js'), 'utf8'); assert.match(src, /st\.comboSeen\.includes\(k\)/); assert.match(src, /\$\{strategyDaily\(\)\}/);
});

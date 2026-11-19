'use strict';
// Registro delle regole e prova in avanti: ammissione, valutazione solo su token nuovi, validazione, ritiro, persistenza.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const S = require('../runner/strategies.js'), Farm = require('../runner/farm.js');

const T = 1_700_000_000_000, H = 3600000, cfg = { thr: 7500, delay: 0, tp: 20, sl: 10, hold: 0 };
// percorso (u = 100 $/SOL): sale a 76 (soglia superata) e poi +30% (esito netto +17) oppure -20% (esito netto -19)
const rec = (at, rise, m) => { const p = new Array(40).fill(50); p.push(76); for (let i = 1; i <= 60; i++) p.push(76 * (1 + rise * Math.min(1, i / 5))); return { m: m || 'M' + at, at, u: 100, p }; };
const farmRep = (cfgs, at) => ({ at, top: cfgs.map((c) => ({ cfg: c, tr: { n: 50, ev: 3 }, te: { n: 20, ev: 2 } })) });
const feed = (reg, n, rise, from, step = H) => { for (let i = 1; i <= n; i++) S.record(reg, rec(from + i * step, typeof rise === 'function' ? rise(i) : rise), from + i * step); };

test('ammissione: una candidata per configurazione, una sola volta per rapporto, massimo 10 in prova', () => {
  const reg = S.create(); assert.equal(S.ingest(reg, farmRep([cfg], T), T), 1); assert.equal(reg.items[0].status, 'prova'); assert.equal(reg.items[0].id, 'R-001'); assert.equal(reg.items[0].since, T);
  assert.equal(S.ingest(reg, farmRep([cfg], T), T + 1000), 0, 'stesso rapporto: niente di nuovo'); assert.equal(S.ingest(reg, farmRep([cfg], T + H), T + H), 0, 'configurazione gia\' in corso');
  const many = []; for (const thr of [7500, 10000, 12000, 15000]) for (const delay of [0, 10, 20]) many.push({ ...cfg, thr, delay }); const r2 = S.create(); assert.equal(S.ingest(r2, farmRep(many, T), T), S.MAX_TEST);
  const same = S.create(); assert.equal(S.ingest(same, farmRep([cfg, { ...cfg, tp: 30 }, { ...cfg, hold: 120 }, { ...cfg, delay: 10 }], T), T), 2, 'stessa soglia e stesso ritardo: una sola regola per gruppo');
  assert.equal(S.ingest(S.create(), { at: T, top: [] }, T), 0); assert.equal(S.ingest(S.create(), null, T), 0);
});
test('prova in avanti: si contano solo i token nati dopo l\'ammissione', () => {
  const reg = S.create(); S.ingest(reg, farmRep([cfg], T), T);
  assert.equal(S.record(reg, rec(T - H, 0.3, 'VECCHIO'), T), false, 'nato prima: mai conteggiato'); assert.equal(reg.items[0].fwd.n, 0);
  assert.equal(S.record(reg, rec(T + H, 0.3, 'NUOVO'), T + 2 * H), true); const f = S.stats(reg.items[0].fwd); assert.equal(f.n, 1); assert.ok(Math.abs(f.ev - 17) < 0.5, 'esito netto ' + f.ev);
  assert.equal(S.record(reg, { m: 'X', at: T + H, u: 100, p: new Array(60).fill(40) }, T), false, 'soglia mai superata: nessuna operazione');
});
test('validazione: 30 operazioni su piu\' di un giorno, esito medio positivo dopo i costi e fattore di profitto sufficiente', () => {
  const reg = S.create(); S.ingest(reg, farmRep([cfg], T), T);
  feed(reg, 29, 0.3, T); assert.equal(S.review(reg, T + 40 * H), 0, 'ancora 29 operazioni'); assert.equal(reg.items[0].status, 'prova');
  feed(reg, 1, 0.3, T + 29 * H); assert.equal(S.review(reg, T + 40 * H), 1); assert.equal(reg.items[0].status, 'validata'); assert.match(reg.log[reg.log.length - 1].why, /regge in avanti: 30 operazioni/);
  const fast = S.create(); S.ingest(fast, farmRep([cfg], T), T); feed(fast, 30, 0.3, T, 60000); assert.equal(S.review(fast, T + H), 0, 'tutte nella stessa mezz\'ora: non coprono un giorno'); assert.equal(fast.items[0].status, 'prova');
});
test('ritiro: esito negativo subito dopo 20 operazioni, a 30 se non positivo, troppo pochi segnali, non abbastanza forte', () => {
  const a = S.create(); S.ingest(a, farmRep([cfg], T), T); feed(a, 20, -0.2, T); assert.equal(S.review(a, T + 30 * H), 1); assert.equal(a.items[0].status, 'ritirata'); assert.match(a.items[0].history.at(-1).why, /non regge in avanti/);
  const b = S.create(); S.ingest(b, farmRep([cfg], T), T); feed(b, 30, (i) => (i % 2 ? 0.3 : -0.2), T); assert.equal(S.review(b, T + 40 * H), 1, 'media vicina a zero o negativa dopo i costi'); assert.equal(b.items[0].status, 'ritirata');
  const c = S.create(); S.ingest(c, farmRep([cfg], T), T); assert.equal(S.review(c, T + 2 * 86400000), 0); assert.equal(S.review(c, T + 4 * 86400000), 1); assert.match(c.items[0].history.at(-1).why, /segnali in 3 giorni/);
});
test('una regola validata che peggiora viene ritirata; la stessa configurazione rientra solo dopo 7 giorni', () => {
  const reg = S.create(); S.ingest(reg, farmRep([cfg], T), T); feed(reg, 30, 0.3, T); S.review(reg, T + 40 * H); assert.equal(reg.items[0].status, 'validata');
  feed(reg, 25, -0.2, T + 31 * H); assert.equal(S.review(reg, T + 70 * H), 1); assert.equal(reg.items[0].status, 'ritirata'); assert.match(reg.items[0].history.at(-1).why, /peggiorata|perdita cumulata/);
  const t1 = T + 70 * H; assert.equal(S.ingest(reg, farmRep([cfg], t1 + 1), t1 + 1), 0, 'in pausa per 7 giorni'); const t2 = t1 + S.COOL_MS + H; assert.equal(S.ingest(reg, farmRep([cfg], t2), t2), 1); assert.equal(reg.items.at(-1).id, 'R-002'); assert.equal(reg.items.at(-1).status, 'prova');
});
test('persistenza e riassunto: il registro si salva e si ricarica, dati rovinati non fanno danni', () => {
  const reg = S.create(); S.ingest(reg, farmRep([cfg, { ...cfg, delay: 10 }], T), T); feed(reg, 5, 0.3, T);
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'strat-')), 's.json'); assert.equal(S.save(f, reg), true); const back = S.load(f); assert.equal(back.items.length, 2); assert.equal(S.stats(back.items[0].fwd).n, 5); assert.equal(back.seq, 2);
  assert.equal(S.load(path.join(os.tmpdir(), 'non-esiste-xyz.json')).items.length, 0); assert.equal(S.normalize({ items: 'x' }).items.length, 0); assert.equal(S.normalize(null).items.length, 0);
  const sum = S.summary(back, T + 10 * H); assert.equal(sum.count.prova, 2); assert.equal(sum.items.length, 2); assert.ok(sum.items[0].fwd.n === 5 && sum.items[0].cfg.thr === 7500 && sum.log.length === 2);
});
test('il runner carica il registro, valuta i token conclusi, pubblica il riassunto e avvisa su Telegram di validazioni e ritiri', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(src, /require\('\.\/strategies\.js'\)/); assert.match(src, /Strat\.record\(rt\.strat, x, Date\.now\(\), stratCtx\(\)\)/); assert.match(src, /Strat\.ingest\(rt\.strat, rt\.farm/); assert.match(src, /Strat\.review\(rt\.strat/);
  assert.match(src, /strat: Object\.assign\(Strat\.summary\(rt\.strat/); assert.match(src, /Strat\.load\(STRAT_FILE\(\)\)/); assert.match(src, /Regola \$\{esc\(e\.id\)\}/); assert.ok(html.includes('Regole e prova in avanti'));
  assert.ok(!/\bordini?\b.*apre da sola/.test(src), 'nessuna apertura automatica di ordini');
});

test('il registro non cresce senza limite: si tengono le ultime 40 regole ritirate', () => {
  const reg = S.create(); for (let i = 1; i <= 55; i++) reg.items.push({ id: 'R-' + i, cfg: { ...cfg, tp: i }, status: 'ritirata', since: T, endedAt: T + i, fwd: { n: 0, sum: 0, win: 0, gain: 0, loss: 0, cum: 0, peak: 0, dd: 0, first: 0, last: 0, recent: [] }, history: [] });
  S.review(reg, T + 100); assert.equal(reg.items.length, 40); assert.ok(reg.items.some((x) => x.id === 'R-55') && !reg.items.some((x) => x.id === 'R-1'), 'restano le piu\' recenti');
});

test('strategia corrente: esiste sempre la migliore trovata, anche se non profittevole; cambia solo con margine e dopo 6 ore', () => {
  const T0 = 1_700_000_000_000, H = 3600000, reg = S.create();
  const best = (thr, trEv, teEv, at) => ({ at, best: { cfg: { thr, delay: 10, tp: 20, sl: 15, hold: 120 }, tr: { n: 300, ev: trEv }, te: { n: 200, ev: teEv } }, top: [], watch: [] });
  const m1 = S.adoptBest(reg, best(10000, -7, -6, T0), T0); assert.ok(m1 && reg.current); assert.equal(reg.current.cfg.thr, 10000); assert.equal(S.summary(reg, T0).current.farm.score, -7);
  // stesso rapporto: niente di nuovo; una migliore ma prima di 6 ore: resta la corrente
  assert.equal(S.adoptBest(reg, best(10000, -7, -6, T0), T0), null);
  assert.equal(S.adoptBest(reg, best(12000, -3, -2, T0 + 1000), T0 + 2 * H), null);
  // dopo 6 ore ma migliore di soli 0.5 punti: resta
  assert.equal(S.adoptBest(reg, best(12000, -6.5, -6.5, T0 + 2000), T0 + 7 * H), null);
  // dopo 6 ore e migliore di piu' di 1 punto: cambia, e la vecchia finisce nello storico
  const m2 = S.adoptBest(reg, best(12000, -3, -2, T0 + 3000), T0 + 8 * H); assert.ok(m2); assert.equal(reg.current.cfg.thr, 12000); assert.equal(reg.current.prev.length, 1); assert.equal(reg.current.prev[0].cfg.thr, 10000);
});
test('la corrente si valuta in avanti solo sui token nati dopo l\'adozione', () => {
  const T0 = 1_700_000_000_000, reg = S.create(), p = []; for (let k = 0; k < 40; k++) p.push(k < 20 ? 30 : 60); for (let k = 0; k < 40; k++) p.push(60);
  S.adoptBest(reg, { at: T0, best: { cfg: { thr: 5000, delay: 0, tp: 20, sl: 15, hold: 0 }, tr: { n: 50, ev: -1 }, te: { n: 50, ev: -1 } }, watch: [] }, T0);
  S.record(reg, { m: 'old', at: T0 - 1000, u: 100, p }, T0 + 1); assert.equal(reg.current.fwd.n, 0, 'nato prima: non conta');
  S.record(reg, { m: 'new', at: T0 + 1000, u: 100, p }, T0 + 2); assert.equal(reg.current.fwd.n, 1);
});
test('la fabbrica indica sempre la migliore disponibile e rilegge la corrente', () => {
  const recs = []; const mkp = (i) => { const p = []; for (let k = 0; k < 120; k++) p.push(k < 30 ? 50 + k : 80 - (i % 3) * 5); return { m: 'm' + i, s: 'S', at: 1_700_000_000_000 + i * 1000, u: 100, p }; };
  for (let i = 0; i < 400; i++) recs.push(mkp(i));
  const rep = Farm.run(recs, { watch: [{ thr: 7500, delay: 0, tp: 10, sl: 10, hold: 60 }] });
  assert.ok(rep.best && rep.best.cfg && Number.isFinite(rep.best.score)); assert.ok(rep.watch.length === 1 && rep.watch[0].cfg.thr === 7500);
});

test('conto paper della strategia: a parte, 1 SOL, 10% a operazione, solo token nati dopo l\'adozione', () => {
  const T0 = 1_700_000_000_000, reg = S.create(), win = [], los = []; for (let k = 0; k < 120; k++) { win.push(k < 10 ? 40 : k < 20 ? 50 : k < 30 ? 50 + (k - 20) * 4 : 100); los.push(k < 10 ? 40 : k < 20 ? 50 : k < 30 ? 50 - (k - 20) * 4 : 20); }
  S.adoptBest(reg, { at: T0, best: { cfg: { thr: 5000, delay: 0, tp: 30, sl: 20, hold: 0 }, tr: { n: 50, ev: 0 }, te: { n: 50, ev: 0 } }, watch: [] }, T0);
  assert.equal(S.summary(reg, T0).acct.eq, 1); assert.equal(S.summary(reg, T0).acct.n, 0);
  S.record(reg, { m: 'prima', at: T0 - 1, u: 100, p: win }, T0 + 5); assert.equal(S.summary(reg, T0).acct.n, 0, 'nato prima: non conta');
  S.record(reg, { m: 'w', s: 'W', at: T0 + 10, u: 100, p: win }, T0 + 20); S.record(reg, { m: 'l', s: 'L', at: T0 + 20, u: 100, p: los }, T0 + 30);
  const a = S.summary(reg, T0 + 40).acct; assert.equal(a.n, 2); assert.equal(a.win, 50); assert.equal(a.trades.length, 2); assert.equal(a.trades[0].sym, 'L', 'la piu\' recente per prima');
  assert.ok(a.eq > 0.9 && a.eq < 1.1); assert.equal(a.curve.length, 2);
  // sopravvive al salvataggio e alla rilettura
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'kz-acct-')), 's.json'); S.save(f, reg); assert.equal(S.summary(S.load(f), T0 + 50).acct.n, 2);
});

test('regola con filtro: passa solo il token col segnale dalla parte giusta; la ricerca credibile puo\' diventare la corrente', () => {
  const T0 = 1_700_000_000_000, M = 60000, p = []; for (let k = 0; k < 10; k++) p.push(40); for (let k = 0; k < 90; k++) p.push(k < 6 ? 55 + k * 3 : 80);
  const cfg = { thr: 5000, delay: 0, tp: 20, sl: 15, hold: 0, flt: { k: 'top1', name: 'primo possessore', dir: 'basso', cut: 0.2 } };
  const ctx = { holders: new Map([['a', { top1: 0.1 }], ['b', { top1: 0.5 }]]), cidx: null };
  assert.ok(S.evalRec({ m: 'a', at: T0, u: 100, p }, cfg, ctx), 'segnale basso: entra');
  assert.equal(S.evalRec({ m: 'b', at: T0, u: 100, p }, cfg, ctx), null, 'segnale alto: non entra');
  assert.equal(S.evalRec({ m: 'x', at: T0, u: 100, p }, cfg, ctx), null, 'senza misura: non entra');
  assert.ok(S.evalRec({ m: 'x', at: T0, u: 100, p }, { ...cfg, flt: undefined }, ctx), 'senza filtro entra');
  assert.notEqual(S.key(cfg), S.key({ ...cfg, flt: undefined }));
  const reg = S.create(); S.adoptBest(reg, { at: T0, best: { cfg: { thr: 10000, delay: 10, tp: 15, sl: 10, hold: 60 }, tr: { n: 300, ev: -7 }, te: { n: 200, ev: -7 } }, watch: [] }, T0);
  const co = { at: T0 + 1, thr: 7500, best: { feat: 'top1', name: 'primo possessore', dir: 'basso', cut: 0.2, rule: { delay: 0, tp: 10, sl: 10, hold: 60 }, tr: { n: 200, ev: 3 }, te: { n: 120, ev: 2 }, score: 2 }, perm: { B: 100, p: 0.01 } };
  assert.equal(S.adoptCombo(reg, co, T0 + 2 * 3600000), null, 'prima di 6 ore resta la corrente');
  const m = S.adoptCombo(reg, { ...co, at: T0 + 2 }, T0 + 7 * 3600000); assert.ok(m); assert.equal(reg.current.cfg.flt.k, 'top1'); assert.equal(reg.current.cfg.thr, 7500); assert.match(m.why, /con filtro primo possessore/);
  assert.equal(S.adoptCombo(reg, { ...co, at: T0 + 3, perm: { B: 100, p: 0.4 } }, T0 + 20 * 3600000), null, 'non credibile: non cambia');
  // la valutazione in avanti applica il filtro
  const before = reg.current.fwd.n; S.record(reg, { m: 'b', at: reg.current.since + 1, u: 100, p, cr: '' }, T0 + 8 * 3600000, { holders: new Map([['b', { top1: 0.9 }]]), cidx: null }); assert.equal(reg.current.fwd.n, before);
});

test('strategia dal vivo: posizione aperta, chiusura appena scatta l\'uscita, nessun doppio conto alla fine del token', () => {
  const T0 = 1_700_000_000_000, reg = S.create();
  S.adoptBest(reg, { at: T0, best: { cfg: { thr: 5000, delay: 0, tp: 20, sl: 15, hold: 0 }, tr: { n: 50, ev: 0 }, te: { n: 50, ev: 0 } }, watch: [] }, T0);
  const part = []; for (let k = 0; k < 10; k++) part.push(40); for (let k = 0; k < 4; k++) part.push(55 + k);       // soglia 50 (5000 a 100 $/SOL) superata, prezzo +10%
  let r = S.liveTick(reg, [{ m: 'x', s: 'X', at: T0 + 10, u: 100, p: part }], T0 + 1000, null);
  assert.equal(r.open.length, 1); assert.equal(r.closed, 0); assert.equal(r.open[0].sym, 'X'); assert.ok(r.open[0].pct > 0 && r.open[0].pct < 20); assert.equal(S.summary(reg, T0).acct.n, 0);
  const full = part.concat([70, 72, 72, 72]);      // target +20% raggiunto
  r = S.liveTick(reg, [{ m: 'x', s: 'X', at: T0 + 10, u: 100, p: full }], T0 + 2000, null);
  assert.equal(r.closed, 1); assert.equal(r.open.length, 0); const a = S.summary(reg, T0).acct; assert.equal(a.n, 1); assert.equal(a.trades[0].why, 'tp'); assert.ok(a.trades[0].mc0 > 0);
  // il token si conclude: non si conta due volte; e non si riapre
  S.record(reg, { m: 'x', s: 'X', at: T0 + 10, u: 100, p: full.concat(new Array(80).fill(72)) }, T0 + 3000, null); assert.equal(S.summary(reg, T0).acct.n, 1);
  r = S.liveTick(reg, [{ m: 'x', s: 'X', at: T0 + 10, u: 100, p: full }], T0 + 4000, null); assert.equal(r.open.length, 0);
  // nato prima dell'adozione: non entra; stop dal vivo
  assert.equal(S.liveTick(reg, [{ m: 'old', s: 'O', at: T0 - 5, u: 100, p: part }], T0 + 5000, null).open.length, 0);
  const down = part.slice(0, 11).concat([40, 40]); assert.equal(S.liveTick(reg, [{ m: 'y', s: 'Y', at: T0 + 20, u: 100, p: down }], T0 + 6000, null).closed, 1);
  const rs = S.load((() => { const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'kz-set-')), 's.json'); S.save(f, reg); return f; })()); assert.ok(rs.settled && rs.settled.x, 'la lista dei gia\' chiusi sopravvive al salvataggio');
});

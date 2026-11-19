'use strict';
// Registro delle regole e prova in avanti: ammissione, valutazione solo su token nuovi, validazione, ritiro, persistenza.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const S = require('../runner/strategies.js');

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
  assert.match(src, /require\('\.\/strategies\.js'\)/); assert.match(src, /Strat\.record\(rt\.strat, x, Date\.now\(\)\)/); assert.match(src, /Strat\.ingest\(rt\.strat, rt\.farm/); assert.match(src, /Strat\.review\(rt\.strat/);
  assert.match(src, /strat: Strat\.summary\(rt\.strat/); assert.match(src, /Strat\.load\(STRAT_FILE\(\)\)/); assert.match(src, /Regola \$\{esc\(e\.id\)\}/); assert.ok(html.includes('Regole e prova in avanti'));
  assert.ok(!/\bordini?\b.*apre da sola/.test(src), 'nessuna apertura automatica di ordini');
});

test('il registro non cresce senza limite: si tengono le ultime 40 regole ritirate', () => {
  const reg = S.create(); for (let i = 1; i <= 55; i++) reg.items.push({ id: 'R-' + i, cfg: { ...cfg, tp: i }, status: 'ritirata', since: T, endedAt: T + i, fwd: { n: 0, sum: 0, win: 0, gain: 0, loss: 0, cum: 0, peak: 0, dd: 0, first: 0, last: 0, recent: [] }, history: [] });
  S.review(reg, T + 100); assert.equal(reg.items.length, 40); assert.ok(reg.items.some((x) => x.id === 'R-55') && !reg.items.some((x) => x.id === 'R-1'), 'restano le piu\' recenti');
});

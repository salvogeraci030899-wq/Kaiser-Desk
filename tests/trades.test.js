'use strict';
// Laboratorio: registratore in sola osservazione degli scambi delle Coin nuove (misure, gare target/stop, collegamento PumpPortal).
const test = require('node:test');
const assert = require('node:assert/strict');
const Lab = require('../runner/trades.js');
const Y = require('../runner/young.js');

const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const mint = (i) => { let s = ''; for (let k = 0; k < 44; k++) s += B58[(i * 7 + k * 13 + (k % 5) * i) % 58]; return s; };
const T = 1_700_000_000_000;
const buy = (m, w, sol, mc, sig) => ({ mint: m, txType: 'buy', traderPublicKey: w, solAmount: sol, marketCapSol: mc, signature: sig });
const sell = (m, w, sol, mc, sig) => ({ mint: m, txType: 'sell', traderPublicKey: w, solAmount: sol, marketCapSol: mc, signature: sig });
const make = (book, i, dev = 'DEV' + i, firstBuy = 1) => { const m = mint(i); book.create({ mint: m, symbol: 'T' + i, name: 'Tok' + i, traderPublicKey: dev, solAmount: firstBuy, marketCapSol: 30 }, T); return m; };

test('misure: un volume sparso tra tanti portafogli ha punteggio bot basso, uno concentrato con bundle e cicli ha punteggio alto', () => {
  const b = new Lab.TradeBook({}), calm = make(b, 1), botty = make(b, 2, 'DEVB', 2);
  for (let i = 0; i < 40; i++) b.trade(buy(calm, 'W' + i, 0.3, 30 + i * 0.1), T + 2000 + i * 1200);                              // 40 portafogli diversi
  for (let i = 0; i < 6; i++) b.trade(buy(botty, 'B' + i, 1.5, 31), T + 400 + i * 100);                                          // 6 acquisti nello stesso istante del lancio (bundle)
  for (let i = 0; i < 6; i++) { b.trade(buy(botty, 'C1', 2, 32), T + 5000 + i * 4000); b.trade(sell(botty, 'C1', 1.9, 31.5), T + 7000 + i * 4000); }   // un portafoglio compra e vende a ripetizione
  b.trade(sell(botty, 'DEVB', 1, 30), T + 20000);                                                                                // il dev vende
  const fc = Lab.features(b.toks.get(calm), 60000), fb = Lab.features(b.toks.get(botty), 60000);
  assert.ok(fc.top3Share < 0.2 && fc.bundleShare === 0 && fc.cyclerShare === 0 && !fc.devSold, JSON.stringify(fc));
  assert.ok(fb.bundleN === 6 && fb.bundleShare > 0.3 && fb.cyclerShare > 0.3 && fb.devSold, JSON.stringify(fb));
  const sc = Lab.botScore(fc), sb = Lab.botScore(fb); assert.ok(sc < 25 && sb > 65 && sb > sc + 40, `calmo ${sc}, bot ${sb}`);
  assert.equal(Lab.botScore({ n: 3 }), null, 'troppo pochi scambi: nessun punteggio');
});
test('il punteggio usa solo i primi 60 secondi: scambi successivi non lo cambiano (niente informazioni dal futuro)', () => {
  const b = new Lab.TradeBook({}), m = make(b, 3);
  for (let i = 0; i < 12; i++) b.trade(buy(m, 'W' + i, 0.5, 30), T + 3000 + i * 3000);
  const before = b.scoreNow(m); for (let i = 0; i < 30; i++) { b.trade(buy(m, 'Z', 5, 40), T + 70000 + i * 1000); b.trade(sell(m, 'Z', 4.9, 39), T + 70500 + i * 1000); }
  assert.equal(b.scoreNow(m), before);
});
test('gara target/stop: vince il primo livello raggiunto, a parita\' lo stop; ingresso a 60 secondi', () => {
  const b = new Lab.TradeBook({}), m = make(b, 4);
  for (let i = 0; i < 10; i++) b.trade(buy(m, 'W' + i, 0.3, 30), T + 2000 + i * 5000);                                         // fino a 60 s: prezzo 30
  const px = [31, 33, 36, 34, 30, 24, 20];                                                                                       // poi +10%, +20%, picco +20%, ritorno e crollo a -33%
  px.forEach((p, i) => b.trade(buy(m, 'X' + i, 0.2, p), T + 65000 + i * 5000));
  const t = b.toks.get(m), s = Lab.summarize(t, T + 22 * 60000);
  assert.equal(s.ok, true); assert.ok(Math.abs(s.peak - 1.2) < 1e-9); assert.ok(Math.abs(s.min - 20 / 30) < 1e-3);
  assert.equal(s.races['12/10'], 'tp', '+12% prima di -10%'); assert.equal(s.races['30/20'], 'sl', 'il +30% non arriva, lo stop si'); assert.equal(s.races['30/25'], 'sl'); assert.equal(s.x.length, 3); assert.equal(Lab.race([100, 100, 130, 70], 0, 30, 30), 'tp'); assert.equal(Lab.race([100, 100, 100], 0, 30, 30), 'none'); assert.equal(Lab.race([100, 70, 130], 0, 30, 30), 'sl');
  const dead = make(b, 5); b.trade(buy(dead, 'W', 0.1, 30), T + 1000); assert.equal(Lab.summarize(b.toks.get(dead), T + 1200000).ok, false, 'meno di 5 scambi in 60 s: non e\' un ingresso valido');
});
test('acquirente grosso e nuovo: si registra la reazione del prezzo nei 60 secondi dopo', () => {
  const b = new Lab.TradeBook({}), m = make(b, 6);
  for (let i = 0; i < 10; i++) b.trade(buy(m, 'W' + i, 0.3, 30), T + 2000 + i * 5000);
  b.trade(buy(m, 'W3', 2, 30), T + 70000);                                                                                       // W3 c'era gia': non e' "nuovo"
  b.trade(buy(m, 'BALENA', 3, 31), T + 80000); for (let i = 1; i <= 12; i++) b.trade(buy(m, 'Y' + i, 0.2, 31 + i), T + 80000 + i * 5000);
  const s = Lab.summarize(b.toks.get(m), T + 22 * 60000); assert.equal(s.bigSol, 3); assert.ok(s.afterBig > 1.3 && s.afterBig < 1.5, 'afterBig ' + s.afterBig);
});
test('riassunto per gruppi: percentuali target/stop per punteggio bot', () => {
  const mk = (b, races, extra = {}) => ({ ok: true, b, peak: 1.2, end: 0.9, races, ...extra }), tp = { '12/10': 'tp', '20/15': 'tp', '30/20': 'none', '30/25': 'none', '50/30': 'none' }, sl = { '12/10': 'sl', '20/15': 'sl', '30/20': 'sl', '30/25': 'sl', '50/30': 'sl' };
  const done = [mk(10, tp), mk(20, tp), mk(30, sl), mk(50, sl), mk(80, sl), mk(90, sl, { afterBig: 1.4 }), { ok: false, b: null }];
  const s = Lab.labSummary(done, T); assert.equal(s.observed, 7); assert.equal(s.valid, 6); assert.deepEqual(s.cohorts.map((c) => c.n), [3, 1, 2]);
  assert.deepEqual(s.cohorts[0].races['12/10'], { tp: 67, sl: 33, none: 0 }); assert.deepEqual(s.cohorts[2].races['12/10'], { tp: 0, sl: 100, none: 0 }); assert.equal(s.cohorts[2].afterBig.med, 1.4);
});

// ---------- v2: soglie di market cap, reazione agli acquisti, vendite grosse ----------
const at = (bin) => T + bin * 5000 + 1000;                                          // un istante dentro l'intervallo numero "bin"
test('ingresso alla prima volta che la market cap supera la soglia (in dollari): gara, picco, tempo al picco, uscita a tempo', () => {
  const b = new Lab.TradeBook({}), m = make(b, 7), usd = 100;                        // a 100 $/SOL: 7.5K = 75 SOL
  for (let i = 0; i < 15; i++) b.trade(buy(m, 'W' + i, 0.3, 30 + i * 3), at(i));      // sale piano fino a 72 SOL (7.2K): soglia non ancora superata
  [[15, 76], [16, 80], [17, 85], [18, 91.2], [19, 85], [20, 70]].forEach(([bin, mc], i) => b.trade(buy(m, 'X' + i, 0.3, mc), at(bin)));
  const s = Lab.summarize(b.toks.get(m), T + 22 * 60000, usd);
  assert.ok(s.th['7.5'], 'soglia 7.5K superata'); assert.equal(s.th['10'], undefined, '10K mai superata'); assert.equal(s.th['15'], undefined);
  const h = s.th['7.5']; assert.equal(h.e, 75, 'ingresso a 75 secondi dalla nascita'); assert.ok(Math.abs(h.pk - 91.2 / 76) < 1e-3); assert.equal(h.ts, 15, 'picco 15 secondi dopo');
  assert.equal(h.r['12/10'], 'tp'); assert.ok(h.x[0] > 0.9 && h.x[0] < 0.93, 'dopo 1 minuto il prezzo e\' a 70: ' + h.x[0]); assert.ok(s.hi >= 9000);
  const late = make(b, 8); [[0, 30], [1, 80]].forEach(([bin, mc], i) => b.trade(buy(late, 'Q' + i, 0.3, mc), at(bin)));
  const sl = Lab.summarize(b.toks.get(late), T + 22 * 60000, usd); assert.ok(sl.th['7.5'], 'superata subito, ma resta storia sufficiente perche il token e\' osservato a lungo');
  const fresh = Lab.summarize(b.toks.get(late), T + 30000, usd); assert.equal(fresh.th['7.5'], undefined, 'meno di 60 secondi di storia dopo la soglia: non si valuta');
  const g = Lab.labSummary([s, sl], T); assert.equal(g.th[0].key, '7.5'); assert.equal(g.th[0].n, 2); assert.equal(g.th[1].n, 0);
});
test('reazione agli acquisti per taglia: deriva del prezzo a +10, +30 e +60 secondi', () => {
  const b = new Lab.TradeBook({}), m = make(b, 9, 'DEV9', 0), usd = 100;
  b.trade(buy(m, 'PICCOLO', 0.05, 30), at(10));                                       // acquisto da 5 $
  b.trade(sell(m, 'ALTRO', 0.01, 33), at(11));                                        // il prezzo sale del 10%
  const s = Lab.summarize(b.toks.get(m), T + 22 * 60000, usd); assert.ok(s.rx.s0, JSON.stringify(s.rx));
  const g = Lab.labSummary([s], T), r = g.rx.find((x) => x.size === 's' && x.age === 0);
  assert.ok(r.h[10].drift > 9.5 && r.h[10].drift < 10.5, JSON.stringify(r.h[10])); assert.equal(r.h[10].down, 0); assert.equal(r.h[10].n, 1);
  assert.equal(Lab.labSummary([], T).rx.length, 0, 'senza dati nessuna riga');
});
test('vendite grosse: la prima, quanti portafogli, e che cosa fa il prezzo nei 60 secondi dopo; calma dopo il picco', () => {
  const b = new Lab.TradeBook({}), m = make(b, 10, 'DEV10', 0), usd = 100;
  for (let i = 0; i < 14; i++) b.trade(buy(m, 'W' + i, 0.2, 40), at(i));              // 40 SOL (4K) fino all'intervallo 13
  b.trade(sell(m, 'BALENA', 1.5, 38), at(14)); b.trade(sell(m, 'BALENA', 1.2, 36), at(15)); b.trade(sell(m, 'PICCOLO', 0.1, 30), at(16));
  const s = Lab.summarize(b.toks.get(m), T + 22 * 60000, usd);
  assert.equal(s.ls, 2); assert.equal(s.lsW, 1); assert.equal(s.lsT, 71); assert.ok(Math.abs(s.afterLS - 30 / 40) < 1e-3, 'afterLS ' + s.afterLS);
  const g = Lab.labSummary([s], T); assert.equal(g.flow.lsShare, 100); assert.equal(g.flow.afterLS.med, 0.75); assert.equal(g.flow.lsT, 71);
  assert.ok(Array.isArray(s.q) === false || s.q.length === 2); assert.ok(s.turn > 0);
});

// ---------- collegamento ----------
class FakeWS {
  constructor(url) { this.url = url; this.sent = []; this.closed = false; FakeWS.all.push(this); }
  open() { this.onopen && this.onopen(); } msg(o) { this.onmessage && this.onmessage({ data: JSON.stringify(o) }); } send(x) { this.sent.push(JSON.parse(x)); } close() { this.closed = true; this.onclose && this.onclose(); }
}
FakeWS.all = [];
const feed = (o = {}) => { FakeWS.all = []; const logs = [], created = [], done = [], later = []; let t = T;
  const f = new Lab.TradeFeed({ WebSocketImpl: FakeWS, now: () => t, schedule: (fn, ms) => later.push([fn, ms]), log: (m) => logs.push(m), onCreate: (x) => created.push(x), onDone: (x) => done.push(x), ...o });
  return { f, logs, created, done, later, adv: (ms) => { t += ms; return t; }, ws: () => FakeWS.all }; };
const createMsg = (i, extra = {}) => ({ txType: 'create', mint: mint(i), name: 'N' + i, symbol: 'S' + i, traderPublicKey: 'DEV' + i, solAmount: 1.5, marketCapSol: 30, ...extra });

test('flusso: si iscrive ai nuovi token, per ogni creazione si iscrive subito agli scambi, passa il token e registra gli scambi', () => {
  const x = feed(); assert.equal(x.f.start(), true); x.ws()[0].open(); assert.deepEqual(x.ws()[0].sent[0], { method: 'subscribeNewToken' });
  x.ws()[0].msg(createMsg(10)); assert.deepEqual(x.ws()[0].sent.at(-1), { method: 'subscribeTokenTrade', keys: [mint(10)] }); assert.equal(x.created.length, 1); assert.equal(x.created[0].symbol, 'S10'); assert.equal(x.created[0].src, 'portal');
  x.ws()[0].msg(createMsg(10)); assert.equal(x.created.length, 1, 'stesso token: una volta sola');
  x.adv(2000); x.ws()[0].msg(buy(mint(10), 'W1', 0.4, 31, 'sigA')); x.ws()[0].msg(buy(mint(10), 'W1', 0.4, 31, 'sigA')); x.ws()[0].msg({ mint: mint(999), txType: 'buy', traderPublicKey: 'Q', solAmount: 1 });
  const st = x.f.status(); assert.equal(st.state, 'on'); assert.equal(st.active, 1); assert.equal(st.trades, 1, 'doppione per firma e token non seguito ignorati'); x.ws()[0].msg('non json'); x.ws()[0].onmessage({ data: '{' });
});
test('chiusura dopo 21 minuti: riassunto consegnato, iscrizione annullata; riconnessione che riprende i token seguiti', () => {
  const x = feed(); x.f.start(); x.ws()[0].open(); x.ws()[0].msg(createMsg(11)); x.ws()[0].msg(createMsg(12));
  for (let i = 0; i < 8; i++) { x.adv(7000); x.ws()[0].msg(buy(mint(11), 'W' + i, 0.3, 30 + i)); }
  x.adv(22 * 60000); x.f.tick(); assert.equal(x.done.length, 2); assert.equal(x.done.find((d) => d.m === mint(11)).ok, true); assert.equal(x.done.find((d) => d.m === mint(12)).ok, false, 'senza scambi: non valido');
  assert.deepEqual(x.ws()[0].sent.at(-1), { method: 'unsubscribeTokenTrade', keys: [mint(11), mint(12)] }); assert.equal(x.f.status().active, 0);
  x.ws()[0].msg(createMsg(13)); x.ws()[0].close(); assert.equal(x.later.at(-1)[1], 2000, 'riconnessione dopo 2 s'); x.later.at(-1)[0](); assert.equal(x.ws().length, 2); x.ws()[1].open();
  assert.deepEqual(x.ws()[1].sent.map((s) => s.method), ['subscribeNewToken', 'subscribeTokenTrade']); assert.deepEqual(x.ws()[1].sent[1].keys, [mint(13)], 'riprende da dove era');
});
test('tetto sui token seguiti e nessun WebSocket', () => {
  const x = feed({ max: 3 }); x.f.start(); x.ws()[0].open(); for (let i = 20; i < 25; i++) { x.adv(1000); x.ws()[0].msg(createMsg(i)); }
  assert.equal(x.f.status().active, 3, 'al massimo 3 token'); assert.equal(x.done.length, 2, 'i piu\' vecchi vengono chiusi'); assert.equal(x.created.length, 5);
  const y = feed({}); y.f.WS = undefined; assert.equal(y.f.start(), false); assert.ok(y.logs.some((l) => /Node 22/.test(l)));
});
test('con il Laboratorio la riserva PumpPortal del flusso RPC non apre una seconda connessione (portal: false)', () => {
  FakeWS.all = []; let t = T; const f = new Y.YoungFeed({ WebSocketImpl: FakeWS, now: () => t, schedule: () => {}, setInterval: () => 0, rpcUrl: 'https://rpc.test/?k=1', portal: false, onToken: () => {} });
  f.start(); FakeWS.all[0].open(); t += 120000; f.tick(); assert.equal(FakeWS.all.length, 1, 'RPC muto ma nessuna connessione a PumpPortal: la fornisce il Laboratorio');
  assert.equal(new Y.YoungFeed({ WebSocketImpl: FakeWS, rpcUrl: '', portal: false, setInterval: () => 0 }).start(), false, 'senza RPC e senza portale non c\'e\' niente da avviare');
});
test('integrazione nel runner: una sola connessione PumpPortal, riassunto con laboratorio, interruttore', () => {
  const fs = require('node:fs'), path = require('node:path'), src = fs.readFileSync(path.join(__dirname, '..', 'runner', 'runner.js'), 'utf8'), E = require('../engine.js');
  assert.match(src, /require\('\.\/trades\.js'\)/); assert.match(src, /new Lab\.TradeFeed/); assert.match(src, /portal: !rt\.trades/); assert.match(src, /rt\.trades\.tick\(\)/); assert.match(src, /rt\.trades\.stop\(\)/); assert.match(src, /Lab\.labSummary/);
  assert.equal(E.DEFAULTS.srcLab, true);
});

test('taratura del paper e Lab v2: il runner registra la differenza tra quotazione reale e stima, e la scheda Lab mostra le nuove sezioni', () => {
  const fs = require('node:fs'), src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(src, /st\.cal\.push\(/); assert.match(src, /cal: calSummary\(st\.cal\)/); assert.match(src, /solUsd: \(\) => rt\.solUsd/);
  for (const k of ['Ingresso alla prima volta che la market cap supera la soglia', 'Dopo un acquisto: come si muove il prezzo', 'Vendite grosse, rotazione e calma', 'Realismo del paper']) assert.ok(html.includes(k), k);
  assert.ok(html.includes("picco '") || html.includes("'picco '"), 'etichetta del Journal con picco e uscita separati');
});

// ---------- prezzi dalla catena ----------
const curveBuf = (vTok, vSol, supply, complete = false) => { const b = Buffer.alloc(8 + 40 + 1 + 32); b.writeBigUInt64LE(BigInt(vTok), 8); b.writeBigUInt64LE(BigInt(vSol), 16); b.writeBigUInt64LE(BigInt(Math.floor(vTok / 2)), 24); b.writeBigUInt64LE(BigInt(Math.floor(vSol / 3)), 32); b.writeBigUInt64LE(BigInt(supply), 40); b[48] = complete ? 1 : 0; return b.toString('base64'); };
const fakeFetch = (vals) => async () => ({ json: async () => ({ result: { value: vals } }) });
test('conto della curva: la market cap in SOL si ricava dalle riserve virtuali; formati incoerenti si scartano', () => {
  const c = Lab.parseCurve(curveBuf(1_073_000_000_000_000, 30_000_000_000, 1_000_000_000_000_000));
  assert.ok(c.mcSol > 27.9 && c.mcSol < 28.0, 'mc ' + c.mcSol); assert.equal(c.complete, false);
  assert.equal(Lab.parseCurve(curveBuf(1_000_000_000_000_000, 60_000_000_000, 1_000_000_000_000_000, true)).complete, true);
  assert.equal(Lab.parseCurve(Buffer.alloc(20).toString('base64')), null, 'troppo corto'); assert.equal(Lab.parseCurve(curveBuf(1, 0, 1)), null, 'riserve a zero');
});
test('lettura delle curve: il prezzo entra nel percorso del token anche senza scambi da PumpPortal; il formato sbagliato spegne la lettura', async () => {
  const b = new Lab.TradeBook({}), m1 = mint(21), m2 = mint(22), CURVE1 = mint(31);
  b.create({ mint: m1, symbol: 'A', name: 'A', bondingCurveKey: CURVE1 }, T); b.create({ mint: m2, symbol: 'B', name: 'B' }, T);   // la seconda non ha l'indirizzo della curva
  let now = T + 30000, seen = null;
  const f = async (url, o) => { seen = JSON.parse(o.body); return { json: async () => ({ result: { value: [{ data: [curveBuf(1_073_000_000_000_000, 40_000_000_000, 1_000_000_000_000_000), 'base64'] }] } }) }; };
  const p = new Lab.CurvePoller({ url: 'wss://rpc.example/key', fetch: f, book: b, now: () => now, log: () => {} });
  await p.pollOnce(); assert.deepEqual(seen.params[0], [CURVE1], 'si chiede solo la curva nota'); assert.equal(p.ok, 1);
  assert.ok(b.toks.get(m1).path[6] > 37 && b.toks.get(m1).path[6] < 38, 'percorso al bin 6: ' + b.toks.get(m1).path[6]); assert.equal(b.toks.get(m2).path.length, 0);
  assert.equal(p.url.startsWith('https://'), true, 'ws -> https');
  const bad = new Lab.TradeBook({}), mb = mint(23); bad.create({ mint: mb, symbol: 'C', name: 'C', bondingCurveKey: CURVE1 }, T);
  const fb = new Lab.CurvePoller({ url: 'https://rpc.example', fetch: async () => ({ json: async () => ({ result: { value: [{ data: [curveBuf(1, 1, 1), 'base64'] }] } }) }), book: bad, now: () => now, log: () => {} });
  for (let i = 0; i < 20; i++) await fb.pollOnce(); assert.equal(fb.off, true, 'dopo 20 valori senza senso si spegne'); assert.equal(fb.ok, 0);
});
test('un token arrivato dall\'RPC viene adottato dal Laboratorio; senza l\'indirizzo della curva si completa dopo', async () => {
  const feed = new Lab.TradeFeed({ now: () => T, log: () => {}, rpcHttp: 'https://rpc.example', fetch: fakeFetch([]) }), m = mint(24), CURVE = mint(32);
  assert.equal(feed.adopt({ mint: m, symbol: 'Z', name: 'Zed' }, T), true); assert.equal(feed.book.toks.get(m).curve, '');
  assert.equal(feed.adopt({ mint: m, symbol: 'Z', curve: CURVE }, T), false); assert.equal(feed.book.toks.get(m).curve, CURVE, 'completata');
  assert.equal(feed.adopt({ mint: 'no' }, T), false); assert.equal(feed.status().poll.ok, 0); assert.equal(feed.status().msgs.trade, 0);
});
test('con i soli prezzi della catena il riassunto calcola soglie e uscita a tempo; la scheda conta le Coin con prezzo', async () => {
  const feed = new Lab.TradeFeed({ now: () => T, log: () => {}, solUsd: () => 100 }), m = mint(25);
  feed.adopt({ mint: m, symbol: 'Q', name: 'Q', curve: mint(33) }, T); const t = feed.book.toks.get(m);
  for (let i = 0; i < 60; i++) feed.book.curveMc(t, T + i * 5000 + 100, { mcSol: i < 20 ? 30 + i * 3 : i < 30 ? 90 : 70 });   // sale oltre i 75 SOL (7.5K a 100 $/SOL), tiene, poi scende
  const s = Lab.summarize(t, T + 22 * 60000, 100); assert.equal(s.ok, false, 'senza scambi non e\' un ingresso a 60 secondi'); assert.ok(s.th["7.5"], JSON.stringify(Object.keys(s.th))); assert.equal(s.th["10"], undefined, "i 10K (100 SOL) non si superano");
  assert.ok(s.th["7.5"].pk >= 1.1 && s.th["7.5"].x[0] != null); const g = Lab.labSummary([s], T); assert.equal(g.priced, 1); assert.equal(g.valid, 0);
});
test('creazione su RPC: oltre al mint si legge l\'indirizzo della curva', () => {
  const crypto = require('node:crypto'), disc = crypto.createHash('sha256').update('event:CreateEvent').digest().subarray(0, 8), str = (s) => { const x = Buffer.from(s); const l = Buffer.alloc(4); l.writeUInt32LE(x.length); return Buffer.concat([l, x]); };
  const mintB = Buffer.alloc(32, 7), curveB = Buffer.alloc(32, 9), ev = Buffer.concat([disc, str('Nome'), str('SYM'), str('https://x'), mintB, curveB, Buffer.alloc(32, 3)]);
  const r = Y.parseCreateEvent(ev.toString('base64')); assert.equal(r.mint, Y.b58(mintB)); assert.equal(r.curve, Y.b58(curveB)); assert.equal(r.symbol, 'SYM');
  const noCurve = Y.parseCreateEvent(Buffer.concat([disc, str('N'), str('S'), str('u'), mintB]).toString('base64')); assert.equal(noCurve.curve, undefined, 'senza la curva il token si legge lo stesso');
});

test('ingresso con ritardo: il prezzo di entrata e le gare ripartono 10 e 20 secondi dopo la soglia', () => {
  const feed = new Lab.TradeFeed({ now: () => T, log: () => {}, solUsd: () => 100 }), m = mint(26);
  feed.adopt({ mint: m, symbol: 'R', name: 'R', curve: mint(34) }, T); const t = feed.book.toks.get(m), px = [];
  for (let i = 0; i < 15; i++) px.push(30 + i * 3); px.push(76, 78, 82, 86, 90); for (let i = 0; i < 40; i++) px.push(70);
  px.forEach((mc, i) => feed.book.curveMc(t, T + i * 5000 + 100, { mcSol: mc }));
  const s = Lab.summarize(t, T + 22 * 60000, 100), h = s.th['7.5'];
  assert.ok(h && h.d[10] && h.d[20], JSON.stringify(h)); assert.ok(Math.abs(h.d[10].g - 82 / 76) < 1e-3, 'g10 ' + h.d[10].g); assert.ok(Math.abs(h.d[20].g - 90 / 76) < 1e-3);
  assert.equal(h.d[20].r['12/10'], 'sl', 'entrando al picco (90) il prezzo cala a 70: stop'); const g = Lab.labSummary([s], T); assert.equal(g.th[0].delays[0].delay, 10); assert.equal(g.th[0].delays[1].n, 1);
});
test('letture scartate: il motivo viene contato e un campione resta visibile', async () => {
  assert.equal(Lab.curveWhy(Buffer.alloc(10).toString('base64')), 'corto'); assert.equal(Lab.curveWhy(curveBuf(1, 0, 1)), 'zero');
  assert.equal(Lab.curveWhy(curveBuf(1_000_000_000_000_000, 500_000_000, 1_000_000_000_000_000)), 'bassa'); assert.equal(Lab.curveWhy(curveBuf(1_000_000_000_000_000, 6_000_000_000_000, 1_000_000_000_000_000)), 'alta');
  const b = new Lab.TradeBook({}), ms = [mint(41), mint(42), mint(43)]; ms.forEach((m, i) => b.create({ mint: m, symbol: 'S' + i, name: 'S', bondingCurveKey: mint(51 + i) }, T));
  const vals = [{ data: [curveBuf(1, 0, 1), 'base64'] }, null, { data: [curveBuf(1_073_000_000_000_000, 30_000_000_000, 1_000_000_000_000_000), 'base64'] }];
  const p = new Lab.CurvePoller({ url: 'https://rpc.example', fetch: fakeFetch(vals), book: b, now: () => T + 20000, log: () => {} }); await p.pollOnce();
  assert.equal(p.ok, 1); assert.equal(p.bad, 1); assert.equal(p.why.zero, 1); assert.equal(p.gone, 1); assert.equal(p.sample.length, 1);
});

test('il Laboratorio ha una pagina dedicata con il suo tasto nella barra e non e\' piu\' una scheda del Journal', () => {
  const fs = require('node:fs'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8'), css = fs.readFileSync(require.resolve('../style.css'), 'utf8');
  assert.ok(html.includes('data-v="lab"') && html.includes('id="v-lab"') && html.includes('id="labBody"'), 'pagina e tasto');
  assert.ok(!html.includes('data-jt="lab"'), 'nessuna scheda Lab nel Journal'); assert.match(html, /function renderLab\(\)/); assert.match(html, /renderJournal\(\); renderLab\(\);/);
  assert.equal((html.match(/<nav id="nav">[\s\S]*?<\/nav>/)[0].match(/<button data-v=/g) || []).length, 5, 'cinque tasti nella barra'); assert.match(css, /grid-template-columns: repeat\(5, 1fr\)/);
});

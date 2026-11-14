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
  assert.equal(s.races['10/10'], 'tp', '+10% prima di -10%'); assert.equal(s.races['15/10'], 'tp'); assert.equal(s.races['30/25'], 'sl', 'il +30% non arriva, lo stop si'); assert.equal(Lab.race([100, 100, 130, 70], 0, 30, 30), 'tp'); assert.equal(Lab.race([100, 100, 100], 0, 30, 30), 'none'); assert.equal(Lab.race([100, 70, 130], 0, 30, 30), 'sl');
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
  const mk = (b, races, extra = {}) => ({ ok: true, b, peak: 1.2, end: 0.9, races, ...extra }), tp = { '10/10': 'tp', '15/10': 'tp', '30/25': 'none', '50/30': 'none' }, sl = { '10/10': 'sl', '15/10': 'sl', '30/25': 'sl', '50/30': 'sl' };
  const done = [mk(10, tp), mk(20, tp), mk(30, sl), mk(50, sl), mk(80, sl), mk(90, sl, { afterBig: 1.4 }), { ok: false, b: null }];
  const s = Lab.labSummary(done, T); assert.equal(s.observed, 7); assert.equal(s.valid, 6); assert.deepEqual(s.cohorts.map((c) => c.n), [3, 1, 2]);
  assert.deepEqual(s.cohorts[0].races['10/10'], { tp: 67, sl: 33, none: 0 }); assert.deepEqual(s.cohorts[2].races['10/10'], { tp: 0, sl: 100, none: 0 }); assert.equal(s.cohorts[2].afterBig.med, 1.4);
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

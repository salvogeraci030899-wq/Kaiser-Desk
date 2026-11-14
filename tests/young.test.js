'use strict';
// Token giovani: lettura degli eventi di creazione (RPC e PumpPortal), passaggio alla riserva, lista dei token seguiti per un'ora.
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const Y = require('../runner/young.js');

const str = (s) => { const b = Buffer.from(s, 'utf8'), l = Buffer.alloc(4); l.writeUInt32LE(b.length); return Buffer.concat([l, b]); };
const createEvent = (mintBytes, name = 'Pepe Nuovo', sym = 'PEPEN') => Buffer.concat([Y.CREATE_DISC, str(name), str(sym), str('https://ipfs.example/x'), mintBytes, crypto.randomBytes(64)]);
const rpcMsg = (b64, err = null) => ({ jsonrpc: '2.0', method: 'logsNotification', params: { subscription: 1, result: { context: { slot: 1 }, value: { signature: 'SIG', err, logs: ['Program 6EF8... invoke [1]', 'Program log: Instruction: Create', 'Program data: ' + b64, 'Program 6EF8... success'] } } } });

class FakeWS {
  constructor(url) { this.url = url; this.sent = []; this.closed = false; FakeWS.all.push(this); }
  open() { this.onopen && this.onopen(); } msg(o) { this.onmessage && this.onmessage({ data: typeof o === 'string' ? o : JSON.stringify(o) }); }
  send(x) { this.sent.push(x); } close() { this.closed = true; this.onclose && this.onclose(); }
}
FakeWS.all = [];
const feed = (o = {}) => {
  FakeWS.all = []; const logs = [], toks = [], later = []; let t = 1_700_000_000_000;
  const f = new Y.YoungFeed({ WebSocketImpl: FakeWS, now: () => t, schedule: (fn, ms) => later.push([fn, ms]), setInterval: () => 0, log: (m) => logs.push(m), onToken: (x) => toks.push(x), ...o });
  return { f, logs, toks, later, adv: (ms) => { t += ms; return t; }, ws: () => FakeWS.all };
};

test('base58 e lettura dell\'evento di creazione: il mint torna identico, voci non valide scartate', async () => {
  const L = await import('../worker/src/lib.js'), mint = crypto.randomBytes(32), e = Y.parseCreateEvent(createEvent(mint).toString('base64'));
  assert.equal(e.mint, L.b58encode(mint)); assert.equal(e.symbol, 'PEPEN'); assert.equal(e.name, 'Pepe Nuovo');
  assert.equal(Y.b58(Buffer.alloc(32)), '1'.repeat(32), 'byte a zero → "1"');
  assert.equal(Y.parseCreateEvent(Buffer.concat([Buffer.alloc(8), str('a'), str('b'), str('c'), mint]).toString('base64')), null, 'discriminatore diverso');
  assert.equal(Y.parseCreateEvent(createEvent(mint).subarray(0, 30).toString('base64')), null, 'troncato'); assert.equal(Y.parseCreateEvent('%%%'), null);
  const bad = Buffer.concat([Y.CREATE_DISC, Buffer.from([255, 255, 255, 255])]); assert.equal(Y.parseCreateEvent(bad.toString('base64')), null, 'lunghezza assurda');
  assert.equal(Y.parseRpcLog(rpcMsg(createEvent(mint).toString('base64'), { InstructionError: 1 })), null, 'transazione fallita ignorata');
  assert.equal(Y.parseRpcLog(rpcMsg(createEvent(mint).toString('base64'))).mint, L.b58encode(mint)); assert.equal(Y.parseRpcLog({}), null);
  assert.deepEqual(Y.parsePortal({ mint: L.b58encode(mint), name: 'N', symbol: 'S', txType: 'create', marketCapSol: 28.5 }).mcapSol, 28.5); assert.equal(Y.parsePortal({ mint: 'x' }), null); assert.equal(Y.parsePortal({ mint: L.b58encode(mint), txType: 'buy' }), null);
});
test('flusso RPC: si collega con la chiave senza scriverla nei log, si iscrive e passa i token', async () => {
  const L = await import('../worker/src/lib.js'), x = feed({ rpcUrl: 'https://rpc.test/?api-key=SEGRETO123' });
  assert.equal(x.f.start(), true); assert.equal(x.ws().length, 1); assert.equal(x.ws()[0].url, 'wss://rpc.test/?api-key=SEGRETO123');
  x.ws()[0].open(); const sub = JSON.parse(x.ws()[0].sent[0]); assert.equal(sub.method, 'logsSubscribe'); assert.deepEqual(sub.params[0].mentions, [Y.MINT_AUTH]);
  const mint = crypto.randomBytes(32); x.ws()[0].msg({ jsonrpc: '2.0', result: 7, id: 1 }); x.ws()[0].msg(rpcMsg(createEvent(mint).toString('base64')));
  assert.equal(x.toks.length, 1); assert.equal(x.toks[0].mint, L.b58encode(mint)); assert.equal(x.toks[0].src, 'rpc');
  x.ws()[0].msg(rpcMsg(createEvent(mint).toString('base64'))); assert.equal(x.toks.length, 1, 'lo stesso mint non si ripete');
  assert.ok(x.logs.length && x.logs.every((l) => !l.includes('SEGRETO123')), 'la chiave non compare nei log'); assert.equal(x.f.status().portal, 'off');
});
test('riserva PumpPortal: si attiva se l\'RPC tace, nessun doppione, si chiude quando l\'RPC torna sano', async () => {
  const L = await import('../worker/src/lib.js'), x = feed({ rpcUrl: 'https://rpc.test/?k=1' }); x.f.start(); x.ws()[0].open();
  x.adv(30000); x.f.tick(); assert.equal(x.ws().length, 1, 'dopo 30 s ancora solo RPC');
  x.adv(80000); x.f.tick(); assert.equal(x.ws().length, 2, 'dopo 110 s di silenzio si apre PumpPortal'); assert.equal(x.ws()[1].url, Y.PORTAL_URL); assert.ok(x.logs.some((l) => /PumpPortal come riserva/.test(l)));
  x.ws()[1].open(); assert.deepEqual(JSON.parse(x.ws()[1].sent[0]), { method: 'subscribeNewToken' });
  const m1 = L.b58encode(crypto.randomBytes(32)); x.ws()[1].msg({ mint: m1, name: 'A', symbol: 'A', txType: 'create' }); assert.equal(x.toks.at(-1).src, 'portal');
  x.ws()[0].msg(rpcMsg(createEvent(Buffer.from(L.b58decode(m1))).toString('base64'))); assert.equal(x.toks.length, 1, 'stesso token da due fonti: una volta sola');
  x.ws()[0].msg(rpcMsg(createEvent(crypto.randomBytes(32)).toString('base64'))); x.adv(15000); x.f.tick();
  assert.equal(x.ws()[1].closed, true, 'RPC sano: PumpPortal si chiude'); assert.equal(x.toks.length, 2);
});
test('senza RPC si usa solo PumpPortal; senza WebSocket i token giovani si spengono; riconnessione con attesa crescente', () => {
  const a = feed({}); a.f.start(); assert.equal(a.ws().length, 1); assert.equal(a.ws()[0].url, Y.PORTAL_URL); assert.equal(a.f.status().hasRpc, false);
  const b = feed({ WebSocketImpl: null }); b.f.WS = undefined; assert.equal(b.f.start(), false); assert.ok(b.logs.some((l) => /Node 22/.test(l)));
  const c = feed({ rpcUrl: 'https://rpc.test/?k=1' }); c.f.start(); c.ws()[0].open(); c.ws()[0].close();
  assert.equal(c.later.at(-1)[1], 2000, 'prima attesa 2 s'); c.later.at(-1)[0](); assert.equal(c.ws().length, 2, 'si ricollega'); c.ws()[1].close(); assert.equal(c.later.at(-1)[1], 4000, 'poi 4 s');
  c.f.stop(); assert.equal(c.ws()[1].closed, true);
});
test('lista dei giovani: promozione per scambi e liquidità, picco e calo, scarto dei muti, un\'ora di vita', () => {
  const map = new Map(), T = 1_700_000_000_000, M = (i) => 'M' + 'x'.repeat(42) + 'ABCDEFGHJK'[i];
  for (let i = 0; i < 5; i++) Y.addYoung(map, { mint: M(i), symbol: 'T' + i, at: T - i * 1000, src: 'rpc' }, T); assert.equal(map.size, 5); assert.equal(Y.addYoung(map, { mint: M(0) }, T), false, 'doppione'); assert.equal(Y.addYoung(map, { mint: 'no' }, T), false);
  assert.deepEqual(Y.youngBatch(map, T, { pending: 90 }), [], 'troppo freschi (meno di 15 s): non si cercano ancora');
  const t1 = T + 20000, batch = Y.youngBatch(map, t1, { pending: 3 }); assert.equal(batch.length, 3, 'al massimo `pending` nuovi per scansione'); assert.equal(batch[0], M(0), 'i più recenti prima');
  const pair = (price, liq, tx) => ({ priceNative: String(price), liquidity: { usd: liq }, txns: { m5: { buys: tx, sells: 0 } } });
  assert.equal(Y.youngApply(map, new Map([[M(0), pair(0.001, 9000, 12)], [M(1), pair(0.001, 500, 12)], [M(2), pair(0.001, 9000, 1)]]), t1), 1, 'solo M0 ha liquidità e scambi');
  Y.youngApply(map, new Map([[M(0), pair(0.002, 9000, 12)]]), t1 + 30000); Y.youngApply(map, new Map([[M(0), pair(0.0014, 9000, 12)]]), t1 + 60000);
  const y = map.get(M(0)); assert.equal(y.peak, 0.002); assert.equal(y.min, 0.001); assert.ok(Math.abs(Y.youngDip(y) - (-30)) < 1e-9, 'calo del 30% dal picco');
  assert.equal(Y.youngBatch(map, t1 + 60000, { pending: 10 })[0], M(0), 'chi è seguito viene sempre riletto');
  const s = Y.youngSummary(map, t1 + 60000); assert.equal(s.length, 1); assert.equal(s[0].m, M(0)); assert.equal(s[0].d, -30);
  Y.pruneYoung(map, T + 9 * 60000); assert.equal(map.has(M(0)), true, 'il seguito resta'); assert.equal(map.has(M(3)), false, 'dopo 8 minuti senza movimento si scarta');
  Y.pruneYoung(map, T + 61 * 60000); assert.equal(map.size, 0, 'dopo un\'ora esce anche il seguito');
});

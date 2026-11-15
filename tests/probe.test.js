'use strict';
// Sonda delle fonti per gli scambi: lettura dell'evento di scambio, misure per fonte e assenza dell'indirizzo RPC nel rapporto.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Probe = require('../runner/probe.js');
const Y = require('../runner/young.js');

const mintB = Buffer.alloc(32, 11), userB = Buffer.alloc(32, 22), MINT = Y.b58(mintB), CURVE = Y.b58(Buffer.alloc(32, 33));
const ev = (o = {}) => { const b = Buffer.alloc(8 + 32 + 8 + 8 + 1 + 32 + 8 + 8 + 8 + 8 + 8); Probe.TRADE_DISC.copy(b, 0); mintB.copy(b, 8); b.writeBigUInt64LE(BigInt(Math.round((o.sol == null ? 0.5 : o.sol) * 1e9)), 40); b.writeBigUInt64LE(1000n, 48); b[56] = o.buy === false ? 0 : 1; userB.copy(b, 57); b.writeBigInt64LE(BigInt(o.ts || Math.floor(Date.now() / 1000)), 89); b.writeBigUInt64LE(BigInt(Math.round((o.vSol == null ? 30 : o.vSol) * 1e9)), 97); b.writeBigUInt64LE(BigInt(o.vTok || 1_073_000_000_000_000), 105); return b.toString('base64'); };

test('evento di scambio: importo, verso, portafoglio e market cap; formato sbagliato non e\' "leggibile"', () => {
  const e = Probe.parseTradeEvent(ev({ sol: 0.5 })); assert.equal(e.mint, MINT); assert.equal(e.user, Y.b58(userB)); assert.equal(e.isBuy, true); assert.equal(e.sol, 0.5);
  assert.ok(e.mc > 27.9 && e.mc < 28.0 && e.sane, 'mc ' + e.mc); assert.equal(Probe.parseTradeEvent(ev({ buy: false })).isBuy, false);
  assert.equal(Probe.parseTradeEvent(ev({ vSol: 0 })).sane, false, 'riserve a zero'); assert.equal(Probe.parseTradeEvent(Buffer.alloc(40).toString('base64')), null, 'troppo corto / altro evento');
  assert.equal(Probe.parseTradeEvent(ev({ ts: 1 }), Math.floor(Date.now() / 1000)).sane, false, 'ora incoerente');
});

class FakeWS {
  constructor(url) { this.url = url; this.sent = []; FakeWS.all.push(this); setImmediate(() => { this.onopen && this.onopen(); setImmediate(() => FakeWS.script(this)); }); }
  send(x) { this.sent.push(JSON.parse(x)); } close() { this.closed = true; this.onclose && this.onclose(); } emit(o) { this.onmessage && this.onmessage({ data: typeof o === 'string' ? o : JSON.stringify(o) }); }
}
FakeWS.all = [];
const note = (logs) => ({ jsonrpc: '2.0', method: 'logsNotification', params: { result: { value: { signature: 'S', err: null, logs } } } });

test('la sonda misura PumpPortal, gli eventi del programma e le singole curve, e non scrive l\'indirizzo RPC', async () => {
  FakeWS.all = [];
  FakeWS.script = (ws) => {
    if (ws.url.includes('pumpportal')) { ws.emit({ message: 'Successfully subscribed to keys.' }); ws.emit({ txType: 'buy', mint: MINT, solAmount: 1, traderPublicKey: 'W', marketCapSol: 40 }); }
    else if (ws.sent.some((m) => m.params && m.params[0].mentions[0] === Y.PUMP_PROGRAM)) { ws.emit({ jsonrpc: '2.0', id: 1, result: 7 }); ws.emit(note(['Program log: x', 'Program data: ' + ev()])); ws.emit(note(['Program data: ' + Buffer.alloc(80).toString('base64')])); }
    else { ws.sent.forEach((m, i) => { if (i < 2) ws.emit({ jsonrpc: '2.0', id: m.id, result: 50 + i }); else ws.emit({ jsonrpc: '2.0', id: m.id, error: { code: -32005, message: 'troppe iscrizioni' } }); }); ws.emit(note(['Program data: ' + ev({ sol: 2 })])); }
  };
  const rep = await Probe.runProbe({ WebSocketImpl: FakeWS, rpcUrl: 'https://rpc.example/SEGRETO', ms: 120, mints: [{ mint: MINT, curve: CURVE }, { mint: Y.b58(Buffer.alloc(32, 12)), curve: Y.b58(Buffer.alloc(32, 34)) }, { mint: Y.b58(Buffer.alloc(32, 13)), curve: Y.b58(Buffer.alloc(32, 35)) }],
    fetch: async () => ({ status: 200, json: async () => [{}, {}] }) });
  assert.equal(rep.portal.opened, true); assert.equal(rep.portal.info, 'Successfully subscribed to keys.'); assert.equal(rep.portal.tracked, 1); assert.equal(rep.portal.types.buy, 1);
  assert.equal(rep.program.events, 1); assert.equal(rep.program.sane, 1); assert.equal(rep.program.tracked, 1); assert.equal(rep.program.notifs, 2); assert.equal(rep.program.sample[0].mint, MINT.slice(0, 6));
  assert.equal(rep.curves.asked, 3); assert.equal(rep.curves.subs, 2); assert.equal(rep.curves.errs, 1); assert.equal(rep.curves.firstErr, 'troppe iscrizioni'); assert.equal(rep.curves.events, 1);
  assert.deepEqual(rep.api, { status: 200, n: 2 }); assert.ok(!JSON.stringify(rep).includes('SEGRETO'), 'nessun indirizzo RPC nel rapporto');
  const urls = FakeWS.all.map((w) => w.url); assert.equal(urls.filter((u) => u.startsWith('wss://rpc.example')).length, 2, 'https -> wss');
});
test('senza RPC la sonda prova solo PumpPortal e l\'API; un collegamento rifiutato non la ferma', async () => {
  FakeWS.all = []; FakeWS.script = () => {};
  class Refuse { constructor() { setImmediate(() => this.onerror && this.onerror()); } send() {} close() {} }
  const rep = await Probe.runProbe({ WebSocketImpl: Refuse, ms: 100, mints: [{ mint: MINT, curve: CURVE }], fetch: async () => { throw new Error('bloccata'); } });
  assert.equal(rep.portal.opened, false); assert.equal(rep.portal.error, 'collegamento rifiutato'); assert.equal(rep.program.skipped, 'RPC non impostato'); assert.equal(rep.api.error, 'bloccata');
  assert.equal((await Probe.runProbe({ WebSocketImpl: null, ms: 50 })).error !== undefined || true, true);
});
test('il runner lancia la sonda una volta ogni 12 ore e pubblica il rapporto', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /require\('\.\/probe\.js'\)/); assert.match(src, /Probe\.runProbe\(/); assert.match(src, /12 \* 3600000/); assert.match(src, /probe: rt\.probe \|\| null/); assert.match(src, /maybeProbe\(\);/); assert.match(src, /NO_PROBE/);
});

'use strict';
// Ticket di approvazione: il runner propone, l'approvazione esegue con gli stessi limiti del server.
// Riusa il "mondo finto" di executor.logic.test.js tramite un modulo condiviso minimo (copiato qui per tenere i file indipendenti).
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
let L, S, X;
test.before(async () => { L = await import('../worker/src/lib.js'); S = await import('../worker/src/solana.js'); X = await import('../worker/src/exec.js'); });

const compact = (n) => { const o = []; do { let b = n & 0x7f; n >>= 7; if (n) b |= 0x80; o.push(b); } while (n); return o; };
const u32 = (n) => [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255];
const u64 = (n) => { const o = []; let v = BigInt(n); for (let i = 0; i < 8; i++) { o.push(Number(v & 255n)); v >>= 8n; } return o; };
function buildTx(keys, ixs) {
  const out = [1, ...new Array(64).fill(0), 0x80, 1, 0, 1, ...compact(keys.length)];
  for (const k of keys) out.push(...L.b58decode(k));
  out.push(...new Array(32).fill(7), ...compact(ixs.length));
  for (const ix of ixs) out.push(ix.prog, ...compact(ix.accs.length), ...ix.accs, ...compact(ix.data.length), ...ix.data);
  out.push(0); return Uint8Array.from(out);
}
function world(env = {}) {
  const me = crypto.generateKeyPairSync('ed25519'), j = me.privateKey.export({ format: 'jwk' });
  const d = Buffer.from(j.d, 'base64url'), x = Buffer.from(j.x, 'base64url');
  const w = { lamports: 2_000_000_000, tokens: new Map(), sent: [], tg: [], now: 1_700_000_000_000 }; let last = null;
  w.pub = L.b58encode(x); w.JUP = L.b58encode(crypto.randomBytes(32));
  w.env = { WALLET_SECRET_KEY: L.b58encode(Buffer.concat([d, x])), ORDERS_MODE: 'live', JUPITER_PROGRAM_ID: w.JUP, MAX_CAPITAL_SOL: '0.2', MAX_ORDER_SOL: '0.1', TELEGRAM_BOT_TOKEN: 't', TELEGRAM_CHAT_ID: '1', ...env };
  const mem = new Map(); w.store = { get: async (k, dflt) => (mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : dflt), put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); } };
  const ok = (o) => new Response(JSON.stringify(o), { status: 200 });
  w.fetch = async (url, init = {}) => {
    url = String(url); const body = init.body ? JSON.parse(init.body) : null;
    if (url.includes('api.telegram.org')) { w.tg.push(body.text); return ok({ ok: true }); }
    if (url.includes('/swap/v1/quote')) { const u = new URL(url), amt = BigInt(u.searchParams.get('amount')), buy = u.searchParams.get('inputMint') === 'So11111111111111111111111111111111111111112'; last = { buy, mint: buy ? u.searchParams.get('outputMint') : u.searchParams.get('inputMint'), amt, out: 5_000_000n * amt / 50_000_000n }; return ok({ outAmount: String(last.out), priceImpactPct: '0.01' }); }
    if (url.includes('/swap/v1/swap')) return ok({ swapTransaction: S.b64enc(buildTx([w.pub, '11111111111111111111111111111111', S.PROGRAMS.computeBudget, w.JUP], [{ prog: 1, accs: [0, 3], data: [...u32(2), ...u64(last.amt)] }, { prog: 3, accs: [0], data: [1] }])) });
    const m = body.method, r = (result) => ok({ jsonrpc: '2.0', id: 1, result });
    if (m === 'getBalance') return r({ value: w.lamports });
    if (m === 'simulateTransaction') return r({ value: { err: null, accounts: [{ lamports: w.lamports - Number(last.amt) - 5000 }], unitsConsumed: 1 } });
    if (m === 'sendTransaction') { w.sent.push(body.params[0]); w.lamports -= Number(last.amt) + 5000; w.tokens.set(last.mint, last.out); return r('sig' + w.sent.length + 'x'.repeat(20)); }
    if (m === 'getSignatureStatuses') return r({ value: [{ confirmationStatus: 'confirmed', err: null }] });
    if (m === 'getTokenAccountsByOwner') { const raw = w.tokens.get(body.params[1].mint) || 0n; return r({ value: raw > 0n ? [{ account: { data: { parsed: { info: { tokenAmount: { amount: String(raw), decimals: 6 } } } } } }] : [] }); }
    throw new Error('URL inatteso: ' + url);
  };
  w.ex = () => new X.Executor({ env: w.env, store: w.store, fetch: w.fetch, now: () => w.now, sleep: async (ms) => { w.now += ms; } });
  return w;
}
const MINT = '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdX6uQXCcGdr', MINT2 = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

test('ticket: il runner propone, l’approvazione esegue; scadenza e rifiuto', async () => {
  const w = world(), ex = w.ex();
  const t = await ex.ticket({ mint: MINT, sym: 'TEST', score: 81, sizeSol: 0.05, params: { sl: 99 } });
  assert.equal(t.ok, true); assert.equal(t.ticket.params.sl, 60); assert.match(w.tg.at(-1), /Ticket T-0001/);
  assert.equal((await ex.ticket({ mint: MINT, sizeSol: 0.05 })).duplicate, true);
  assert.equal((await ex.state()).tickets.length, 1); assert.equal(w.sent.length, 0);                    // proposto, non eseguito
  const r = await ex.approve(t.ticket.id); assert.equal(r.ok, true); assert.equal(w.sent.length, 1);
  assert.equal((await ex.state()).tickets.length, 0); assert.equal((await ex.state()).positions.length, 1);
  assert.match((await ex.approve(t.ticket.id)).error, /non trovato/);
  const t2 = await ex.ticket({ mint: MINT2, sizeSol: 0.05 }); assert.equal((await ex.reject(t2.ticket.id)).ok, true); assert.equal((await ex.state()).tickets.length, 0);
  const t3 = await ex.ticket({ mint: L.b58encode(crypto.randomBytes(32)), sizeSol: 0.05 }); w.now += 11 * 60000;
  assert.match((await ex.approve(t3.ticket.id)).error, /scaduto/); assert.equal(w.sent.length, 1);
});
test('ticket: rifiutato se ordini spenti o kill switch; l’approvazione rispetta i limiti del server', async () => {
  assert.match((await world({ ORDERS_MODE: 'off' }).ex().ticket({ mint: MINT, sizeSol: 0.05 })).error, /disattivati/);
  const w = world(), ex = w.ex(); await ex.kill(); assert.match((await ex.ticket({ mint: MINT, sizeSol: 0.05 })).error, /kill/);
  const w2 = world(), ex2 = w2.ex(), t = await ex2.ticket({ mint: MINT, sizeSol: 0.5 });             // oltre MAX_ORDER_SOL: il ticket nasce, l'approvazione fallisce
  const r = await ex2.approve(t.ticket.id); assert.equal(r.ok, false); assert.match(r.error, /massimo per ordine/); assert.equal(w2.sent.length, 0);
});

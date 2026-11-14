'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

let L;
test.before(async () => { L = await import('../worker/src/lib.js'); });

function keypair() {
  const { privateKey } = crypto.generateKeyPairSync('ed25519');
  const jwk = privateKey.export({ format: 'jwk' });
  const d = Buffer.from(jwk.d, 'base64url'), x = Buffer.from(jwk.x, 'base64url');
  return { seed: d, pub: x, full: Buffer.concat([d, x]) };
}

test('base58: andata e ritorno, zeri iniziali compresi', () => {
  for (const hex of ['00', '0000ff', 'deadbeef', '00010203040506070809']) {
    const b = Uint8Array.from(Buffer.from(hex, 'hex'));
    assert.deepEqual(L.b58decode(L.b58encode(b)), b);
  }
  assert.equal(L.b58encode(Uint8Array.from([0, 0, 1])), '112');
});
test('wallet: indirizzo da chiave di 64 byte (base58 e JSON) e da seme di 32 byte', async () => {
  const k = keypair(), want = L.b58encode(k.pub);
  assert.equal(await L.walletAddress(L.b58encode(k.full)), want);
  assert.equal(await L.walletAddress(JSON.stringify([...k.full])), want);
  assert.equal(await L.walletAddress(L.b58encode(k.seed)), want);
});
test('wallet: chiave incoerente, corta o vuota viene rifiutata', async () => {
  const k = keypair(), other = keypair();
  const bad = Buffer.concat([k.seed, other.pub]);
  await assert.rejects(() => L.walletAddress(L.b58encode(bad)), /incoerente/);
  await assert.rejects(() => L.walletAddress('abc'), /byte|base58/);
  await assert.rejects(() => L.walletAddress(''), /mancante/);
  await assert.rejects(() => L.walletAddress('[1,2,3'), /JSON/);
});
test('wallet: nessun errore contiene la chiave', async () => {
  const k = keypair(), secret = L.b58encode(Buffer.concat([k.seed, keypair().pub]));
  try { await L.walletAddress(secret); assert.fail('doveva fallire'); } catch (e) { assert.ok(!e.message.includes(secret)); }
});
test('token: confronto a tempo costante', () => {
  assert.equal(L.safeEqual('abc', 'abc'), true);
  assert.equal(L.safeEqual('abc', 'abd'), false);
  assert.equal(L.safeEqual('abc', 'abcd'), false);
  assert.equal(L.safeEqual('', 'x'), false);
});
test('limiti e CORS', () => {
  assert.deepEqual(L.limitsFrom({}), { maxCapitalSOL: 0, maxOrderSOL: 0.05, maxDailyLossSOL: 0.1, maxSlippageBps: 300 });
  const env = { ALLOWED_ORIGINS: 'https://a.example, https://b.example' };
  assert.equal(L.corsHeaders('https://a.example', env)['Access-Control-Allow-Origin'], 'https://a.example');
  assert.equal(L.corsHeaders('https://evil.example', env)['Access-Control-Allow-Origin'], undefined);
});

// Il Worker intero, con un KV finto: senza token non risponde, con token ok, il kill switch funziona
test('worker: autenticazione, health, kill/resume, ordini non attivi', async () => {
  const { default: W } = await import('../worker/src/index.js');
  const mem = new Map();
  const STATE = { get: async (k) => mem.get(k) ?? null, put: async (k, v) => { mem.set(k, v); }, delete: async (k) => { mem.delete(k); } };
  const k = keypair();
  const env = { EXEC_TOKEN: 'segreto-lungo', STATE, WALLET_SECRET_KEY: L.b58encode(k.full), RPC_URL: 'https://rpc.invalid' };
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ jsonrpc: '2.0', id: 1, result: { value: 1_500_000_000 } }), { status: 200 });
  try {
    const call = (path, opt = {}, token = 'segreto-lungo') => W.fetch(new Request('https://x.example' + path, { ...opt, headers: { ...(token ? { 'x-app-token': token } : {}), ...(opt.headers || {}) } }), env);
    assert.equal((await call('/health', {}, '')).status, 401);
    assert.equal((await call('/health', {}, 'sbagliato')).status, 401);
    assert.equal((await W.fetch(new Request('https://x.example/health'), { ...env, EXEC_TOKEN: '' })).status, 503);
    const h = await (await call('/health')).json();
    assert.equal(h.ok, true); assert.equal(h.ordersEnabled, false); assert.equal(h.killed, false);
    assert.equal(h.wallet, L.b58encode(k.pub)); assert.equal(h.balanceSOL, 1.5);
    assert.ok(!JSON.stringify(h).includes(env.WALLET_SECRET_KEY));
    assert.equal((await (await call('/kill', { method: 'POST' })).json()).killed, true);
    assert.equal((await (await call('/health')).json()).killed, true);
    assert.equal((await (await call('/resume', { method: 'POST' })).json()).killed, false);
    assert.equal((await call('/order', { method: 'POST' })).status, 501);
    assert.equal((await call('/boh')).status, 404);
  } finally { globalThis.fetch = realFetch; }
});

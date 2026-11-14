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

// Il Worker intero, con KV e Durable Object finti: senza token non risponde, con token sì, kill/resume, rotte e metodi
test('worker: autenticazione, health, kill/resume, rotte', async () => {
  const { default: W, Ledger } = await import('../worker/src/index.js');
  const kv = new Map(), dur = new Map();
  const STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const k = keypair();
  const env = { EXEC_TOKEN: 'segreto-lungo', STATE, WALLET_SECRET_KEY: L.b58encode(k.full), RPC_URL: 'https://rpc.invalid' };
  const ledger = new Ledger({ storage: { get: async (x) => dur.get(x), put: async (x, v) => { dur.set(x, v); } } }, env);
  env.LEDGER = { idFromName: () => 'main', get: () => ({ fetch: (u, init) => ledger.fetch(new Request(u, init)) }) };
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ jsonrpc: '2.0', id: 1, result: { value: 1_500_000_000 } }), { status: 200 });
  try {
    const call = (path, opt = {}, token = 'segreto-lungo') => W.fetch(new Request('https://x.example' + path, { ...opt, headers: { ...(token ? { 'x-app-token': token } : {}), ...(opt.headers || {}) } }), env);
    assert.equal((await call('/health', {}, '')).status, 401);
    assert.equal((await call('/health', {}, 'sbagliato')).status, 401);
    assert.equal((await W.fetch(new Request('https://x.example/health'), { ...env, EXEC_TOKEN: '' })).status, 503);
    const h = await (await call('/health')).json();
    assert.equal(h.ok, true); assert.equal(h.mode, 'off'); assert.equal(h.ordersEnabled, false); assert.equal(h.killed, false);
    assert.equal(h.wallet, L.b58encode(k.pub)); assert.equal(h.balanceSOL, 1.5);
    assert.ok(!JSON.stringify(h).includes(env.WALLET_SECRET_KEY));
    assert.equal((await (await call('/kill', { method: 'POST' })).json()).killed, true);
    assert.equal((await (await call('/health')).json()).killed, true);
    assert.equal((await (await call('/resume', { method: 'POST' })).json()).killed, false);
    const o = await call('/order', { method: 'POST', body: '{}' }); assert.equal((await o.json()).ok, false);   // ordini spenti di default
    assert.equal((await call('/order')).status, 405);
    assert.equal((await call('/boh')).status, 404);
    assert.equal((await (await call('/state')).json()).positions.length, 0);
    assert.equal((await (await call('/tick', { method: 'POST' })).json()).idle, true);
  } finally { globalThis.fetch = realFetch; }
});
test('orologio: richiesta di dispatch corretta e validata', async () => {
  const L2 = await import('../worker/src/lib.js');
  const { url, init } = L2.dispatchRequest({ GH_REPO: 'salvogeraci030899-wq/Kaiser-Desk', GH_WORKFLOW: 'runner.yml', GH_REF: 'main', GH_TOKEN: 't0k' });
  assert.equal(url, 'https://api.github.com/repos/salvogeraci030899-wq/Kaiser-Desk/actions/workflows/runner.yml/dispatches');
  assert.equal(init.method, 'POST'); assert.equal(init.headers.Authorization, 'Bearer t0k'); assert.deepEqual(JSON.parse(init.body), { ref: 'main' });
  assert.throws(() => L2.dispatchRequest({ GH_REPO: '../evil', GH_WORKFLOW: 'runner.yml' }), /non validi/);
  assert.throws(() => L2.dispatchRequest({ GH_REPO: 'a/b', GH_WORKFLOW: 'x; rm.yml' }), /non validi/);
  for (const bad of ['..', './x', 'a/..', 'a/b/c', 'a', '/b', 'a/']) assert.throws(() => L2.dispatchRequest({ GH_REPO: bad, GH_WORKFLOW: 'runner.yml' }), /non validi/, bad);
  assert.throws(() => L2.dispatchRequest({ GH_REPO: 'a/b', GH_WORKFLOW: '../x.yml' }), /non validi/);
});
test('orologio: esiti 204, 401, 404 e token mancante, salvati in KV senza il token', async () => {
  const { runClock } = await import('../worker/src/index.js');
  const mem = new Map(); const STATE = { put: async (k, v) => { mem.set(k, v); }, get: async (k) => mem.get(k) ?? null };
  const base = { STATE, GH_REPO: 'a/b', GH_WORKFLOW: 'runner.yml', GH_REF: 'main', GH_TOKEN: 'SEGRETO-GH' };
  const realFetch = globalThis.fetch; const seen = [];
  try {
    for (const [status, ok, re] of [[204, true, null], [401, false, /rifiutato/], [404, false, /non trovato/], [500, false, /HTTP 500/]]) {
      globalThis.fetch = async (u, i) => { seen.push([u, i.method]); return new Response(i.method === 'GET' ? '{"workflow_runs":[]}' : null, { status: i.method === 'GET' ? 200 : status }); };
      const r = await runClock(base);
      assert.equal(r.ok, ok); assert.equal(r.status, status); if (re) assert.match(r.error, re);
    }
    assert.ok(seen.filter(([, m]) => m === 'POST').length === 4 && seen.filter(([u, m]) => m === 'GET' && /\/runs\?status=(queued|in_progress)/.test(u)).length === 8, 'prima di avviare controlla se un run e\' gia in corso');
    const noTok = await runClock({ ...base, GH_TOKEN: '' }); assert.equal(noTok.ok, false); assert.match(noTok.error, /GH_TOKEN/);
    assert.ok(!mem.get('clock').includes('SEGRETO-GH'));
    globalThis.fetch = async () => { throw new Error('rete giu'); };
    assert.match((await runClock(base)).error, /rete giu/);
  } finally { globalThis.fetch = realFetch; }
});
test('orologio: non accoda un run mentre uno e\' in corso da poco o in coda; lo accoda quando il run in corso sta per finire', async () => {
  const { runClock } = await import('../worker/src/index.js');
  const mem = new Map(); const STATE = { put: async (k, v) => { mem.set(k, v); }, get: async (k) => mem.get(k) ?? null };
  const base = { STATE, GH_REPO: 'a/b', GH_WORKFLOW: 'runner.yml', GH_REF: 'main', GH_TOKEN: 'x' }, realFetch = globalThis.fetch;
  const scenario = async (queued, inprog) => { let posts = 0;
    globalThis.fetch = async (u, i) => { if (i.method === 'POST') { posts++; return new Response(null, { status: 204 }); } const run = u.includes('status=queued') ? queued : inprog; return new Response(JSON.stringify({ workflow_runs: run ? [run] : [] }), { status: 200 }); };
    const r = await runClock(base); return { r, posts }; };
  try {
    const min = (m) => new Date(Date.now() - m * 60000).toISOString();
    let s = await scenario(null, { run_started_at: min(10) }); assert.equal(s.posts, 0); assert.equal(s.r.ok, true); assert.match(s.r.note, /in corso/);
    s = await scenario({ created_at: min(1) }, { run_started_at: min(10) }); assert.equal(s.posts, 0); assert.match(s.r.note, /in coda/);
    s = await scenario(null, { run_started_at: min(46) }); assert.equal(s.posts, 1, 'run in uscita: si accoda il successivo');
    s = await scenario(null, null); assert.equal(s.posts, 1, 'nessun run: si avvia');
    globalThis.fetch = async (u, i) => { if (i.method === 'GET') throw new Error('rete'); return new Response(null, { status: 204 }); }; assert.equal((await runClock(base)).status, 204, 'se non si riesce a sapere, si avvia come prima');
  } finally { globalThis.fetch = realFetch; }
});

'use strict';
// Controllo da Telegram e vista pubblica: l'app non ha segreti, i comandi passano solo dalla chat autorizzata.
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
let L, S, X, T, W;
test.before(async () => { L = await import('../worker/src/lib.js'); S = await import('../worker/src/solana.js'); X = await import('../worker/src/exec.js'); T = await import('../worker/src/tg.js'); W = await import('../worker/src/index.js'); });

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
const CHAT = '4242', MINT = '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdX6uQXCcGdr';
function world(env = {}) {
  const me = crypto.generateKeyPairSync('ed25519'), j = me.privateKey.export({ format: 'jwk' });
  const d = Buffer.from(j.d, 'base64url'), x = Buffer.from(j.x, 'base64url');
  const w = { lamports: 2_000_000_000, tokens: new Map(), sent: [], tg: [], answers: [], now: 1_700_000_000_000, price: 0.02, webhook: '' }; let last = null;
  w.pub = L.b58encode(x); w.JUP = L.b58encode(crypto.randomBytes(32));
  w.env = { WALLET_SECRET_KEY: L.b58encode(Buffer.concat([d, x])), ORDERS_MODE: 'live', JUPITER_PROGRAM_ID: w.JUP, MAX_CAPITAL_SOL: '0.2', MAX_ORDER_SOL: '0.1', TELEGRAM_BOT_TOKEN: 'bottoken123456', TELEGRAM_CHAT_ID: CHAT, EXEC_TOKEN: 'segreto', PUBLIC_URL: 'https://exec.test', ...env };
  const mem = new Map(); w.store = { get: async (k, dflt) => (mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : dflt), put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); } };
  const ok = (o) => new Response(JSON.stringify(o), { status: 200 });
  w.fetch = async (url, init = {}) => {
    url = String(url); const body = init.body ? JSON.parse(init.body) : null;
    if (url.includes('api.telegram.org')) { const m = url.split('/').pop(); if (m === 'sendMessage') w.tg.push(body); else if (m === 'answerCallbackQuery') w.answers.push(body.text); else if (m === 'getWebhookInfo') return ok({ ok: true, result: { url: w.webhook } }); else if (m === 'setWebhook') { w.setWh = body; w.webhook = body.url; return ok({ ok: true }); } return ok({ ok: true }); }
    if (url.includes('dexscreener')) return ok(Array.from(w.tokens.keys()).map((a) => ({ baseToken: { address: a }, quoteToken: { symbol: 'SOL' }, priceNative: String(w.price), liquidity: { usd: 100000 }, txns: { m5: { buys: 10, sells: 10 } } })));
    if (url.includes('/swap/v1/quote')) { const u = new URL(url), amt = BigInt(u.searchParams.get('amount')), buy = u.searchParams.get('inputMint') === 'So11111111111111111111111111111111111111112'; last = { buy, mint: buy ? u.searchParams.get('outputMint') : u.searchParams.get('inputMint'), amt, out: buy ? 5_000_000n * amt / 50_000_000n : BigInt(Math.round(Number(amt) / 1e6 * w.price * 1e9)) }; return ok({ outAmount: String(last.out), priceImpactPct: '0.01' }); }
    if (url.includes('/swap/v1/swap')) return ok({ swapTransaction: S.b64enc(buildTx([w.pub, '11111111111111111111111111111111', S.PROGRAMS.computeBudget, w.JUP], [...(last.buy ? [{ prog: 1, accs: [0, 3], data: [...u32(2), ...u64(last.amt)] }] : []), { prog: 3, accs: [0], data: [1] }])) });
    const m = body.method, r = (result) => ok({ jsonrpc: '2.0', id: 1, result });
    if (m === 'getBalance') return r({ value: w.lamports });
    if (m === 'simulateTransaction') return r({ value: { err: null, accounts: [{ lamports: w.lamports - (last.buy ? Number(last.amt) + 5000 : 5000) }], unitsConsumed: 1 } });
    if (m === 'sendTransaction') { w.sent.push(1); if (last.buy) { w.lamports -= Number(last.amt) + 5000; w.tokens.set(last.mint, (w.tokens.get(last.mint) || 0n) + last.out); } else { w.tokens.set(last.mint, w.tokens.get(last.mint) - last.amt); w.lamports += Number(last.out) - 5000; } return r('sig' + w.sent.length + 'x'.repeat(20)); }
    if (m === 'getSignatureStatuses') return r({ value: [{ confirmationStatus: 'confirmed', err: null }] });
    if (m === 'getTokenAccountsByOwner') { const raw = w.tokens.get(body.params[1].mint) || 0n; return r({ value: raw > 0n ? [{ account: { data: { parsed: { info: { tokenAmount: { amount: String(raw), decimals: 6 } } } } } }] : [] }); }
    throw new Error('URL inatteso: ' + url);
  };
  w.ex = () => new X.Executor({ env: w.env, store: w.store, fetch: w.fetch, now: () => w.now, sleep: async (ms) => { w.now += ms; } });
  return w;
}
const msg = (text, chat = CHAT) => ({ message: { chat: { id: Number(chat) }, text } });
const cbq = (data, chat = CHAT) => ({ callback_query: { id: 'cb1', data, message: { chat: { id: Number(chat) } } } });

test('chat non autorizzata: nessuna risposta e nessun effetto', async () => {
  const w = world(), ex = w.ex();
  for (const u of [msg('/kill', '999'), msg('/wallet', '999'), cbq('ap:T-0001', '999'), { message: { chat: { id: 1 } } }, {}, null]) await T.handleUpdate(ex, u);
  assert.equal(w.tg.length, 0); assert.equal((await ex.state()).killed, false);
});
test('comandi: aiuto, stato, wallet, kill/riattiva', async () => {
  const w = world(), ex = w.ex();
  await T.handleUpdate(ex, msg('/aiuto')); assert.match(w.tg.at(-1).text, /comandi/);
  await T.handleUpdate(ex, msg('/stato')); assert.match(w.tg.at(-1).text, /Modo: LIVE/); assert.match(w.tg.at(-1).text, /2\.0000 SOL/);
  await T.handleUpdate(ex, msg('/wallet')); assert.ok(w.tg.at(-1).text.includes(w.pub));
  await T.handleUpdate(ex, msg('/kill@MioBot')); assert.equal((await ex.state()).killed, true);
  await T.handleUpdate(ex, msg('/riattiva')); assert.equal((await ex.state()).killed, false);
  await T.handleUpdate(ex, msg('/boh')); assert.match(w.tg.at(-1).text, /non riconosciuto/);
});
test('ticket con tasti: approva dal tasto esegue, rifiuta scarta; /approva e /vendi da comando', async () => {
  const w = world(), ex = w.ex();
  const t1 = await ex.ticket({ mint: MINT, sym: 'AAA', score: 80, sizeSol: 0.05 });
  const kb = w.tg.at(-1).reply_markup.inline_keyboard[0]; assert.equal(kb[0].callback_data, 'ap:' + t1.ticket.id); assert.equal(kb[1].callback_data, 'rj:' + t1.ticket.id);
  await T.handleUpdate(ex, cbq('ap:' + t1.ticket.id)); assert.equal((await ex.state()).positions.length, 1); assert.equal(w.answers.at(-1), 'Eseguito');
  const M2 = L.b58encode(crypto.randomBytes(32)), t2 = await ex.ticket({ mint: M2, sym: 'BBB', score: 70, sizeSol: 0.05 });
  await T.handleUpdate(ex, cbq('rj:' + t2.ticket.id)); assert.equal((await ex.state()).tickets.length, 0);
  const M3 = L.b58encode(crypto.randomBytes(32)), t3 = await ex.ticket({ mint: M3, sym: 'CCC', score: 70, sizeSol: 0.05 });
  await T.handleUpdate(ex, msg('/approva ' + t3.ticket.id.toLowerCase())); assert.equal((await ex.state()).positions.length, 2);
  await T.handleUpdate(ex, msg('/posizioni')); assert.match(w.tg.at(-1).text, /R-0001 \$AAA/);
  await T.handleUpdate(ex, msg('/vendi R-0001 50')); assert.equal((await ex.state()).positions.find((p) => p.id === 'R-0001').tp1Done, false);
  assert.equal(w.tokens.get(MINT), 2_500_000n);
  await T.handleUpdate(ex, msg('/vendi R-0001')); assert.equal((await ex.state()).positions.length, 1);
  await T.handleUpdate(ex, msg('/vendi X-1')); assert.match(w.tg.at(-1).text, /Uso/);
  await T.handleUpdate(ex, msg('/vendi R-0002 500')); assert.match(w.tg.at(-1).text, /tra 1 e 100/);
  await T.handleUpdate(ex, cbq('ap:T-9999')); assert.match(w.answers.at(-1), /non trovato/);
  await T.handleUpdate(ex, cbq('zz:../x')); assert.equal(w.answers.at(-1), 'Comando non valido');
});
test('vista pubblica: niente chiavi né comandi; wallet abbreviato; PUBLIC_VIEW=0 la spegne; /tg richiede il segreto del webhook', async () => {
  const w = world(), ex = w.ex(), kv = new Map(), dur = new Map();
  const STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const mk = (env) => { const e = { ...w.env, ...env, STATE }; const ledger = new W.Ledger({ storage: { get: async (x) => dur.get(x), put: async (x, v) => { dur.set(x, v); } } }, e); e.LEDGER = { idFromName: () => 'm', get: () => ({ fetch: (u, i) => ledger.fetch(new Request(u, i)) }) }; return e; };
  const realFetch = globalThis.fetch; globalThis.fetch = w.fetch;
  try {
    let env = mk({}); const get = (path, headers = {}, e = env) => W.default.fetch(new Request('https://x.example' + path, { headers }), e);
    const r = await get('/public', { Origin: 'https://salvogeraci030899-wq.github.io' }); assert.equal(r.status, 200);
    const text = await r.text(), d = JSON.parse(text);
    assert.equal(d.ok, true); assert.equal(d.mode, 'live'); assert.equal(d.wallet, w.pub.slice(0, 4) + '…' + w.pub.slice(-4)); assert.equal(d.balanceSOL, 2);
    for (const secret of [w.env.WALLET_SECRET_KEY, w.env.EXEC_TOKEN, w.env.TELEGRAM_BOT_TOKEN, w.pub]) assert.ok(!text.includes(secret), 'trapela un segreto');
    assert.equal((await get('/public', {}, mk({ PUBLIC_VIEW: '0' }))).status, 403);
    assert.equal((await get('/state')).status, 401);                                   // gli altri endpoint restano protetti dal token
    const post = (hdr, body = {}) => W.default.fetch(new Request('https://x.example/tg', { method: 'POST', headers: hdr, body: JSON.stringify(body) }), env);
    assert.equal((await post({})).status, 401); assert.equal((await post({ 'X-Telegram-Bot-Api-Secret-Token': 'sbagliato' })).status, 401);
    const secret = await T.webhookSecret(w.env); assert.match(secret, /^[A-Za-z0-9_-]{20,}$/);
    assert.equal((await post({ 'X-Telegram-Bot-Api-Secret-Token': secret }, msg('/kill'))).status, 200);
    assert.equal((await (await W.default.fetch(new Request('https://x.example/state', { headers: { 'x-app-token': 'segreto' } }), env)).json()).killed, true);
  } finally { globalThis.fetch = realFetch; }
});
test('/prova: collaudo con dati veri senza inviare nulla; rifiuti spiegati; solo dalla tua chat', async () => {
  const w = world(), ex = w.ex();
  await T.handleUpdate(ex, msg('/prova ' + MINT + ' 0.01'));
  assert.match(w.tg.at(-1).text, /prova riuscita \(dry-run\)\. NESSUN ordine inviato/); assert.match(w.tg.at(-1).text, /simulazione sposta 0\.010005 SOL/);
  assert.equal(w.sent.length, 0); assert.equal((await ex.state()).positions.length, 0); assert.equal((await ex.state()).lastDry.ok, true);
  await T.handleUpdate(ex, msg('/prova')); assert.match(w.tg.at(-1).text, /Uso: \/prova/); await T.handleUpdate(ex, msg('/prova ' + MINT + ' abc')); assert.match(w.tg.at(-1).text, /Uso: \/prova/);
  await T.handleUpdate(ex, msg('/prova ' + MINT + ' 0,5')); assert.match(w.tg.at(-1).text, /massimo per ordine/);
  await T.handleUpdate(ex, msg('/prova corto 0.01')); assert.match(w.tg.at(-1).text, /mint non valido/);
  const n = w.tg.length; await T.handleUpdate(ex, msg('/prova ' + MINT + ' 0.01', '999')); assert.equal(w.tg.length, n);
  const off = world({ ORDERS_MODE: 'off' }); await T.handleUpdate(off.ex(), msg('/prova ' + MINT)); assert.match(off.tg.at(-1).text, /disattivati/);
  const nojup = world({ JUPITER_PROGRAM_ID: '' }); await T.handleUpdate(nojup.ex(), msg('/prova ' + MINT + ' 0.01'));
  assert.match(nojup.tg.at(-1).text, /JUPITER_PROGRAM_ID/); assert.match(nojup.tg.at(-1).text, new RegExp(nojup.JUP)); assert.equal(nojup.sent.length, 0);   // elenca i programmi trovati da verificare
});
test('in dry-run un ticket approvato NON si presenta come ordine eseguito', async () => {
  const w = world({ ORDERS_MODE: 'dryrun' }), ex = w.ex(), t = await ex.ticket({ mint: MINT, sym: 'AAA', score: 80, sizeSol: 0.05 });
  await T.handleUpdate(ex, cbq('ap:' + t.ticket.id));
  assert.equal(w.answers.at(-1), 'Prova riuscita: nessun ordine inviato'); assert.match(w.tg.at(-1).text, /NESSUN ordine inviato/); assert.equal(w.sent.length, 0); assert.equal((await ex.state()).positions.length, 0);
  const t2 = await ex.ticket({ mint: L.b58encode(crypto.randomBytes(32)), sizeSol: 0.05 }); await T.handleUpdate(ex, msg('/approva ' + t2.ticket.id));
  assert.match(w.tg.at(-1).text, /NESSUN ordine inviato/); assert.ok(!/eseguito\./.test(w.tg.at(-1).text));
});
test('webhook: si registra da solo, ma non sopra quello di un altro servizio', async () => {
  const w = world(), kv = new Map(); const STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const realFetch = globalThis.fetch; globalThis.fetch = w.fetch;
  try {
    const env = { ...w.env, STATE };
    await W.ensureWebhook(env); assert.equal(w.setWh.url, 'https://exec.test/tg'); assert.equal(w.setWh.secret_token, await T.webhookSecret(env)); assert.deepEqual(w.setWh.allowed_updates, ['message', 'callback_query']);
    w.setWh = null; await W.ensureWebhook(env); assert.equal(w.setWh, null);                                  // già registrato: nessuna chiamata
    const w2 = world({ TELEGRAM_BOT_TOKEN: 'altrobot654321' }); w2.webhook = 'https://pinscher.example/hook'; globalThis.fetch = w2.fetch;
    const kv2 = new Map(); await W.ensureWebhook({ ...w2.env, STATE: { get: async (k) => kv2.get(k) ?? null, put: async (k, v) => { kv2.set(k, v); }, delete: async (k) => { kv2.delete(k); } } });
    assert.equal(w2.setWh, undefined); assert.match(kv2.get('tgwh_note'), /dedicato/);                          // webhook altrui: non si tocca
    globalThis.fetch = w.fetch; await W.ensureWebhook({ ...w.env, TELEGRAM_BOT_TOKEN: '' }); await W.ensureWebhook({ ...w.env, STATE, EXEC_TOKEN: '' });   // senza segreti: niente
  } finally { globalThis.fetch = realFetch; }
});

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
    if (url.includes('/swap/v1/quote')) { const u = new URL(url); (w.slips = w.slips || []).push(Number(u.searchParams.get('slippageBps'))); const u2 = u, amt = BigInt(u.searchParams.get('amount')), buy = u.searchParams.get('inputMint') === 'So11111111111111111111111111111111111111112'; last = { buy, mint: buy ? u.searchParams.get('outputMint') : u.searchParams.get('inputMint'), amt, out: buy ? 5_000_000n * amt / 50_000_000n : BigInt(Math.round(Number(amt) / 1e6 * w.price * 1e9)) }; return ok({ outAmount: String(last.out), priceImpactPct: '0.01' }); }
    if (url.includes('/swap/v1/swap')) return ok({ swapTransaction: S.b64enc(buildTx([w.pub, '11111111111111111111111111111111', S.PROGRAMS.computeBudget, w.JUP], [...(last.buy ? [{ prog: 1, accs: [0, 3], data: [...u32(2), ...u64(last.amt)] }] : []), { prog: 3, accs: [0], data: [1] }])) });
    const m = body.method, r = (result) => ok({ jsonrpc: '2.0', id: 1, result });
    if (m === 'getBalance') return r({ value: w.lamports });
    if (m === 'simulateTransaction') return r({ value: { err: null, accounts: [{ lamports: w.lamports - (last.buy ? Number(last.amt) + 5000 : 5000) }], unitsConsumed: 1 } });
    if (m === 'sendTransaction' && w.failAfterSend > 0) { w.failAfterSend--; w.sent.push(1); w.tokens.set(last.mint, w.tokens.get(last.mint) - last.amt); w.lamports += Number(last.out) - 5000; return ok({ jsonrpc: '2.0', id: 1, error: { message: 'timeout dopo l\'invio' } }); }   // l'invio ha effetto ma l'RPC risponde un errore
    if (m === 'sendTransaction' && w.failSends > 0) { w.failSends--; return ok({ jsonrpc: '2.0', id: 1, error: { message: 'Blockhash not found' } }); }
    if (m === 'sendTransaction') { w.sent.push(1); if (last.buy) { w.lamports -= Number(last.amt) + 5000; w.tokens.set(last.mint, (w.tokens.get(last.mint) || 0n) + last.out); } else { w.tokens.set(last.mint, w.tokens.get(last.mint) - last.amt); w.lamports += Number(last.out) - 5000; } return r('sig' + w.sent.length + 'x'.repeat(20)); }
    if (m === 'getSignatureStatuses') return r({ value: [{ confirmationStatus: 'confirmed', err: null }] });
    if (m === 'getTokenAccountsByOwner' && body.params[1].programId) return r({ value: body.params[1].programId.startsWith('Tokenkeg') ? [...w.tokens].filter(([, v]) => v > 0n).map(([mint, raw]) => ({ account: { data: { parsed: { info: { mint, tokenAmount: { amount: String(raw), decimals: 6 } } } } } })) : [] });   // elenco di tutti i token del wallet (Scudo)
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
test('EMERGENZA: /emergenza vende subito le posizioni reali, ferma ingressi, autopilota e reale; 2 per giro, il resto al giro dopo', async () => {
  const w = world(), ex = w.ex(), mints = [MINT, L.b58encode(crypto.randomBytes(32)), L.b58encode(crypto.randomBytes(32))];
  for (const m of mints) { const t = await ex.ticket({ mint: m, sym: 'P' + m.slice(0, 2), score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t.ticket.id)); }
  assert.equal((await ex.state()).positions.length, 3);
  const n = w.tg.length; await T.handleUpdate(ex, msg('/emergenza', '999')); assert.equal(w.tg.length, n); assert.equal((await ex.state()).positions.length, 3);   // chat sconosciuta: niente
  w.price = 0.0095;                                                                                      // prezzo vicino all'ingresso: Charon da solo non venderebbe nulla
  await T.handleUpdate(ex, msg('/emergenza'));
  let s = await ex.state(); assert.equal(s.killed, true); assert.equal(s.positions.length, 1, 'dopo il primo giro ne restano 1 su 3'); assert.equal(s.journal.length, 2); assert.ok(s.journal.every((j) => j.reason === 'EMERGENZA'));
  const v = await ex.paramsView(); assert.equal(v.runner.autopilot, false); assert.equal(v.runner.realEnabled, false);
  assert.match(w.tg.map((x) => x.text).join('\n'), /EMERGENZA attivata/);
  await ex.tick(); s = await ex.state(); assert.equal(s.positions.length, 0); assert.equal(s.journal.length, 3);
  assert.match(w.tg.at(-1).text, /Emergenza completata: tutte le posizioni reali sono state vendute/);
  assert.match((await ex.buy({ ref: 'dopo-emerg-1', mint: MINT, sizeSol: 0.05 })).error, /kill switch/);   // niente nuovi ingressi finché non si riattiva
  await T.handleUpdate(ex, msg('/riattiva')); await T.handleUpdate(ex, msg('/reset_parametri')); assert.equal((await ex.state()).killed, false); assert.deepEqual((await ex.paramsView()).runner, {});
});
test('EMERGENZA senza posizioni: si completa subito e non si ripete; dall\'app è una richiesta con tasto CONFERMA', async () => {
  const w = world(), ex = w.ex();
  const r = await ex.propose({ emergency: true }); assert.equal(r.ok, true);
  const m = w.tg.at(-1); assert.match(m.text, /EMERGENZA IMMEDIATA richiesta dall'app/); assert.equal(m.reply_markup.inline_keyboard[0][0].text, 'CONFERMA EMERGENZA'); assert.equal(m.reply_markup.inline_keyboard[0][0].callback_data, 'pa:' + r.proposal.id);
  assert.equal((await ex.state()).killed, false, 'una richiesta dall\'app non agisce da sola');
  assert.match((await ex.propose({ emergency: true })).error, /già inviata/);                              // niente raffiche
  const pv = await ex.paramsView(); assert.equal(pv.proposals[0].emergency, true);
  await T.handleUpdate(ex, cbq('pa:' + r.proposal.id, '999')); assert.equal((await ex.state()).killed, false);   // chat sconosciuta
  await T.handleUpdate(ex, cbq('pa:' + r.proposal.id));
  assert.equal(w.answers.at(-1), 'EMERGENZA eseguita'); assert.equal((await ex.state()).killed, true); assert.match(w.tg.at(-1).text, /Emergenza completata: nessuna posizione reale aperta/);
  assert.equal((await ex.paramsView()).runner.autopilot, false);
  const n = w.tg.length; await ex.tick(); assert.equal(w.tg.length, n, 'la bandiera di emergenza non resta attiva');
});
test('EMERGENZA: rifiutarla dal tasto Annulla non cambia nulla', async () => {
  const w = world(), ex = w.ex(), r = await ex.propose({ emergency: true });
  await T.handleUpdate(ex, cbq('pr:' + r.proposal.id)); assert.equal((await ex.state()).killed, false); assert.deepEqual((await ex.paramsView()).runner, {}); assert.equal((await ex.paramsView()).proposals.length, 0);
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
test('CHIUSURA dall\'app (reale): richiesta con tasto su Telegram, vende tutto solo dopo la conferma; funziona con o senza approvazione manuale', async () => {
  for (const approve of [true, false]) {
    const w = world(), ex = w.ex(), t = await ex.ticket({ mint: MINT, sym: 'CLO', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t.ticket.id));
    const pos = (await ex.state()).positions[0]; assert.ok(pos);
    if (!approve) await ex.paramsView();                                                                    // con o senza approvazione manuale degli ingressi le uscite sono le stesse
    assert.match((await ex.propose({ close: { mode: 'real', id: 'R-9999' } })).error, /non trovata/);
    assert.match((await ex.propose({ close: { mode: 'paper', id: pos.id } })).error, /non valida/);       // modo e id devono combaciare
    assert.match((await ex.propose({ close: { mode: 'real', id: '../x' } })).error, /non valida/);
    const r = await ex.propose({ close: { mode: 'real', id: pos.id } }); assert.equal(r.ok, true);
    const m = w.tg.at(-1); assert.match(m.text, /Chiusura posizione REALE/); assert.equal(m.reply_markup.inline_keyboard[0][0].callback_data, 'pa:' + r.proposal.id);
    assert.equal((await ex.state()).positions.length, 1, 'la richiesta dall\'app non vende da sola');
    assert.match((await ex.propose({ close: { mode: 'real', id: pos.id } })).error, /già richiesta/);
    assert.equal((await ex.paramsView()).proposals[0].close.id, pos.id);
    await T.handleUpdate(ex, cbq('pa:' + r.proposal.id, '999')); assert.equal((await ex.state()).positions.length, 1);   // chat sconosciuta
    await T.handleUpdate(ex, cbq('pa:' + r.proposal.id));
    const s = await ex.state(); assert.equal(s.positions.length, 0); assert.equal(s.journal.at(-1).reason, 'Chiusura manuale (app)'); assert.equal(w.answers.at(-1), 'Chiusura avviata');
  }
});
test('CHIUSURA dall\'app (reale): APP_CLOSE=direct vende subito, senza passare da Telegram', async () => {
  const w = world({ APP_CLOSE: 'direct' }), ex = w.ex(), t = await ex.ticket({ mint: MINT, sym: 'DIR', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t.ticket.id));
  const pos = (await ex.state()).positions[0], r = await ex.propose({ close: { mode: 'real', id: pos.id } });
  assert.equal(r.ok, true); assert.equal(r.direct, true); assert.equal((await ex.state()).positions.length, 0);
});
test('CHIUSURA dall\'app (paper): dopo la conferma il Worker passa la direttiva al runner, che la toglie quando conferma', async () => {
  const w = world(), ex = w.ex();
  await ex.paperPut({ v: 1, positions: [{ id: 'P-0003', sym: 'PAP' }], journal: [] });
  assert.match((await ex.propose({ close: { mode: 'paper', id: 'P-0099' } })).error, /non trovata/);
  assert.match((await ex.propose({ close: { mode: 'real', id: 'P-0003' } })).error, /non valida/);
  const r = await ex.propose({ close: { mode: 'paper', id: 'P-0003' } }); assert.equal(r.ok, true); assert.match(w.tg.at(-1).text, /Chiusura posizione paper/);
  assert.deepEqual((await ex.paramsView()).closePaper, [], 'finché non confermi non succede nulla');
  await T.handleUpdate(ex, cbq('pa:' + r.proposal.id));
  assert.deepEqual((await ex.paramsView()).closePaper, ['P-0003']); assert.equal((await ex.paramsView()).proposals.length, 0);
  await ex.reportRunner(null, null, ['P-0003']); assert.deepEqual((await ex.paramsView()).closePaper, []);
});
test('CHIUSURA dall\'app: con l\'approvazione manuale disattivata è diretta (reale e paper, senza Telegram); con l\'approvazione attiva serve Telegram; APP_CLOSE forza', async () => {
  const w = world(), ex = w.ex();
  let v = await ex.paramsView(); assert.equal(v.closeDirect, false, 'di base l\'approvazione è attiva: serve Telegram'); assert.equal(v.approval.on, true);
  const off = await ex.propose({ changes: { realApprove: false } }); assert.equal(off.ok, true); await T.handleUpdate(ex, cbq('pa:' + off.proposal.id));   // approvazione spenta dalle impostazioni dell'app
  v = await ex.paramsView(); assert.equal(v.closeDirect, true); assert.equal(v.approval.on, false); assert.match(v.approval.src, /impostazioni dell'app/);
  const t = await ex.ticket({ mint: MINT, sym: 'DIR2', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t.ticket.id));
  const pos = (await ex.state()).positions[0], n = w.tg.length;
  const r = await ex.propose({ close: { mode: 'real', id: pos.id } }); assert.equal(r.direct, true); assert.equal((await ex.state()).positions.length, 0, 'reale: venduta subito');
  assert.ok(!w.tg.slice(n).some((m) => m.reply_markup), 'nessun tasto di conferma su Telegram');
  await ex.store.put('lastClose', 0); await ex.paperPut({ v: 1, positions: [{ id: 'P-0007', sym: 'PAP' }], journal: [] });
  const p = await ex.propose({ close: { mode: 'paper', id: 'P-0007' } }); assert.equal(p.direct, true); assert.deepEqual((await ex.paramsView()).closePaper, ['P-0007'], 'paper: ordine subito pronto per il runner');
  const w2 = world({ APP_CLOSE: 'confirm' }), ex2 = w2.ex(), o2 = await ex2.propose({ changes: { realApprove: false } }); await T.handleUpdate(ex2, cbq('pa:' + o2.proposal.id));
  assert.equal((await ex2.paramsView()).closeDirect, false, 'APP_CLOSE=confirm forza Telegram');
  // approvazione spenta in config.json: il Worker la legge dal riepilogo che il runner spinge
  const w3 = world(), ex3 = w3.ex(); assert.equal((await ex3.paramsView()).closeDirect, false);
  await ex3.paperPut({ v: 1, positions: [], journal: [], config: { realApprove: false } }); const v3 = await ex3.paramsView(); assert.equal(v3.closeDirect, true); assert.equal(v3.approval.src, 'riepilogo del runner');
  await ex3.reportRunner({ realApprove: true }); assert.equal((await ex3.paramsView()).approval.src, 'runner', 'il valore riferito dal runner viene prima del riepilogo');
});
test('CHIUSURA dall\'app: l\'indicazione approvalOff dell\'app (impostazioni mostrate) rende la chiusura diretta; APP_CLOSE=confirm la ignora', async () => {
  const w = world(), ex = w.ex(), t = await ex.ticket({ mint: MINT, sym: 'HNT', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t.ticket.id));
  const pos = (await ex.state()).positions[0]; assert.equal((await ex.paramsView()).closeDirect, false, 'il Worker, da solo, vede l\'approvazione attiva');
  const n = w.tg.length, r = await ex.propose({ close: { mode: 'real', id: pos.id, approvalOff: true } });
  assert.equal(r.direct, true); assert.equal((await ex.state()).positions.length, 0); assert.ok(!w.tg.slice(n).some((m) => m.reply_markup), 'senza tasto su Telegram');
  const w2 = world({ APP_CLOSE: 'confirm' }), ex2 = w2.ex(), t2 = await ex2.ticket({ mint: MINT, sym: 'HN2', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex2, cbq('ap:' + t2.ticket.id));
  const p2 = (await ex2.state()).positions[0], r2 = await ex2.propose({ close: { mode: 'real', id: p2.id, approvalOff: true } }); assert.ok(!r2.direct); assert.equal((await ex2.state()).positions.length, 1);
  const w3 = world(), ex3 = w3.ex(); await ex3.paperPut({ v: 1, positions: [{ id: 'P-0005', sym: 'PP' }], journal: [] });
  const r3 = await ex3.propose({ close: { mode: 'paper', id: 'P-0005', approvalOff: true } }); assert.equal(r3.direct, true); assert.deepEqual((await ex3.paramsView()).closePaper, ['P-0005']);
  await ex3.store.put('lastClose', 0); const r4 = await ex3.propose({ close: { mode: 'paper', id: 'P-0005', approvalOff: 'si' } }); assert.ok(!r4.direct, 'solo true esatto vale');
});
test('PANNELLO: ogni azione passa da Telegram (con approvazione attiva), le chiusure reali sono a gruppi, profitto/perdita si decidono sul prezzo', async () => {
  const w = world(), ex = w.ex(), mints = [MINT, L.b58encode(crypto.randomBytes(32)), L.b58encode(crypto.randomBytes(32))];
  for (const m of mints) { const t = await ex.ticket({ mint: m, sym: 'Q' + m.slice(0, 2), score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t.ticket.id)); }
  assert.equal((await ex.state()).positions.length, 3);
  assert.match((await ex.propose({ panel: { action: 'boom' } })).error, /non valida/);
  w.price = 0.0125;                                                                                      // tutte in profitto (ingresso ~0.01)
  const rl = await ex.propose({ panel: { action: 'close_loss' } }); assert.equal(rl.ok, true);
  assert.equal(w.tg.at(-1).reply_markup.inline_keyboard[0][0].callback_data, 'pa:' + rl.proposal.id);
  assert.match((await ex.propose({ panel: { action: 'close_loss' } })).error, /già richiesta/);
  await T.handleUpdate(ex, cbq('pa:' + rl.proposal.id)); assert.equal((await ex.state()).positions.length, 3, 'in perdita non ce n\'è nessuna: non si vende nulla');
  await ex.store.put('lastPanel', 0);
  const rp = await ex.propose({ panel: { action: 'close_profit' } }); await T.handleUpdate(ex, cbq('pa:' + rp.proposal.id));
  let s = await ex.state(); assert.equal(s.positions.length, 1, '2 vendite per giro: ne resta 1'); assert.ok(s.journal.every((j) => j.reason === 'Chiusura (pannello)'));
  await ex.tick(); s = await ex.state(); assert.equal(s.positions.length, 0); assert.match(w.tg.at(-1).text, /Chiusura reale completata/);
});
test('PANNELLO: stop, disattiva, attiva: cambiano i parametri giusti; Attiva Reale chiede sempre Telegram', async () => {
  const w = world(), ex = w.ex(), run = async (action, extra = {}) => { await ex.store.put('lastPanel', 0); const r = await ex.propose({ panel: { action, ...extra } }); if (!r.direct) await T.handleUpdate(ex, cbq('pa:' + r.proposal.id)); return r; };
  await run('real_stop'); assert.equal((await ex.state()).killed, true);
  await run('paper_stop'); assert.equal((await ex.paramsView()).runner.paperStop, true);
  await run('paper_on'); let v = (await ex.paramsView()).runner; assert.equal(v.paperStop, false); assert.equal(v.paperEnabled, true); assert.equal(v.autopilot, true);
  await run('paper_off'); assert.equal((await ex.paramsView()).runner.paperEnabled, false); assert.equal((await ex.paramsView()).runner.realEnabled, undefined, 'il reale non si tocca');
  await run('real_on'); v = (await ex.paramsView()).runner; assert.equal(v.realEnabled, true); assert.equal((await ex.state()).killed, false);
  await run('real_off'); assert.equal((await ex.paramsView()).runner.realEnabled, false);
  await run('off_all'); v = (await ex.paramsView()).runner; assert.deepEqual([v.autopilot, v.realEnabled, v.paperEnabled, v.paperStop, (await ex.state()).killed], [false, false, false, true, true]);
  // con l'approvazione disattivata (indicazione dell'app) le azioni sono dirette, ma Attiva Reale chiede comunque Telegram
  await ex.store.put('lastPanel', 0); const d = await ex.propose({ panel: { action: 'real_stop', approvalOff: true } }); assert.equal(d.direct, true);
  await ex.store.put('lastPanel', 0); const c = await ex.propose({ panel: { action: 'real_on', approvalOff: true } }); assert.ok(!c.direct, 'Attiva Reale non e\' mai diretta'); assert.equal((await ex.state()).killed, true);
  await ex.store.put('lastPanel', 0); const w2 = world({ APP_CLOSE: 'confirm' }), ex2 = w2.ex(); assert.ok(!(await ex2.propose({ panel: { action: 'paper_stop', approvalOff: true } })).direct, 'APP_CLOSE=confirm ignora l\'indicazione');
});
test('PANNELLO: chiusura paper per profitto/perdita dall\'elenco del runner', async () => {
  const w = world(), ex = w.ex();
  await ex.paperPut({ v: 1, positions: [{ id: 'P-0001', sym: 'A', entry: 1, last: { priceNative: 1.2 } }, { id: 'P-0002', sym: 'B', entry: 1, last: { priceNative: 0.8 } }, { id: 'P-0003', sym: 'C', entry: 1, last: null }], journal: [] });
  for (const [action, expected] of [['close_profit', ['P-0001']], ['close_loss', ['P-0001', 'P-0002']], ['close_all', ['P-0001', 'P-0002', 'P-0003']]]) {
    await ex.store.put('lastPanel', 0); const r = await ex.propose({ panel: { action } }); await T.handleUpdate(ex, cbq('pa:' + r.proposal.id));
    assert.deepEqual((await ex.paramsView()).closePaper.sort(), expected, action);
    if (action === 'close_loss') await ex.reportRunner(null, null, ['P-0001', 'P-0002']);
  }
});
test('VELOCITA: con posizioni reali il Durable Object imposta un allarme ogni 10 s e lo rinnova; senza posizioni nessun allarme', async () => {
  const w = world(), dur = new Map(); let alarm = null;
  const storage = { get: async (k) => dur.get(k), put: async (k, v) => { dur.set(k, v); }, getAlarm: async () => alarm, setAlarm: async (t) => { alarm = t; } };
  const kv = new Map(), STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } };
  const ledger = new W.Ledger({ storage }, { ...w.env, STATE }), realFetch = globalThis.fetch; globalThis.fetch = w.fetch;
  try {
    await ledger.fetch(new Request('https://l/tick', { method: 'POST', body: '{}' })); assert.equal(alarm, null, 'senza posizioni niente allarme');
    const t = await ledger.fetch(new Request('https://l/ticket', { method: 'POST', body: JSON.stringify({ mint: MINT, sym: 'ALM', score: 80, sizeSol: 0.05 }) })).then((r) => r.json());
    await ledger.fetch(new Request('https://l/approve', { method: 'POST', body: JSON.stringify({ id: t.ticket.id }) }));
    assert.ok((dur.get('positions') || []).length === 1); assert.ok(alarm > Date.now() && alarm <= Date.now() + 10500, 'allarme entro 10 s');
    alarm = null; w.price = 0.0095; await ledger.alarm(); assert.ok(alarm > Date.now(), 'dopo l\'allarme se ne imposta un altro finche\' ci sono posizioni');
    w.price = 0.0003; await ledger.alarm(); assert.equal((dur.get('positions') || []).length, 0, 'l\'allarme esegue Charon: stop venduto'); alarm = null; await ledger.alarm(); assert.equal(alarm, null, 'senza posizioni si ferma');
  } finally { globalThis.fetch = realFetch; }
});

test('SCUDO: fotografia all\'accensione, adotta solo i token comprati dopo, applica lo stop e vende', async () => {
  const w = world(), ex = w.ex(), OLD = MINT, NEW = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump', USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  w.tokens.set(OLD, 5_000_000n); w.price = 0.02;                                           // un token che avevi gia': 0,1 SOL
  await ex.tick(); assert.equal((await ex.state()).positions.length, 0, 'spento: non fa nulla');
  await T.handleUpdate(ex, msg('/scudo on')); await ex.tick();
  assert.match(w.tg.map((x) => x.text).join('\n'), /Scudo acceso: ignoro i 1 token/); assert.equal((await ex.state()).positions.length, 0, 'il token gia\' presente non viene adottato');
  w.tokens.set(USDC, 50_000_000n); await ex.tick(); assert.equal((await ex.state()).positions.length, 0, 'gli stabili non si adottano mai');
  w.tokens.set(NEW, 5_000_000n);                                                           // compri a mano: 5 token a 0,02 = 0,1 SOL
  await ex.tick(); const s = await ex.state(); assert.equal(s.positions.length, 1); const p = s.positions[0];
  assert.equal(p.source, 'scudo'); assert.equal(p.mint, NEW); assert.equal(p.params.sl, 25); assert.equal(p.params.tp1, 40); assert.ok(Math.abs(p.costSol - 0.1) < 1e-9); assert.equal(p.entry, 0.02);
  assert.match(w.tg.at(-1).text, /SCUDO: protetto/); assert.match(w.tg.at(-1).text, /Stop −25%/);
  await ex.tick(); assert.equal((await ex.state()).positions.length, 1, 'non lo adotta due volte');
  w.price = 0.014;                                                                          // -30%: oltre lo stop del 25%
  await ex.tick(); const s2 = await ex.state(); assert.equal(s2.positions.length, 0, 'stop eseguito'); assert.equal(s2.journal.at(-1).source, 'scudo'); assert.match(s2.journal.at(-1).reason, /[Ss]top/);
  assert.ok(w.sent.length >= 1, 'ha venduto davvero (transazione inviata)'); assert.ok((w.tokens.get(NEW) || 0n) === 0n); assert.equal(w.tokens.get(OLD), 5_000_000n, 'il token di prima non si e\' toccato');
  await ex.tick(); assert.equal((await ex.state()).positions.length, 0, 'il token venduto non si riadotta subito');
});
test('SCUDO: in prova (dryrun) avvisa soltanto, senza registrare posizioni; spento dimentica la fotografia', async () => {
  const w = world({ ORDERS_MODE: 'dryrun' }), ex = w.ex(), NEW = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump';
  await ex.shieldSet(true); await ex.tick(); w.tokens.set(NEW, 5_000_000n); w.price = 0.02; await ex.tick();
  assert.equal((await ex.state()).positions.length, 0); const n = w.tg.filter((x) => /Scudo \(prova\)/.test(x.text)).length; assert.equal(n, 1); await ex.tick(); assert.equal(w.tg.filter((x) => /Scudo \(prova\)/.test(x.text)).length, 1, 'un solo avviso per token');
  assert.match(w.tg.find((x) => /ATTENZIONE: ORDERS_MODE non è live/.test(x.text)).text, /live/); assert.equal(w.sent.length, 0, 'nessuna transazione');
  await ex.shieldSet(false); await ex.tick(); assert.equal(await w.store.get('shieldBase', null), null); await ex.shieldSet(true); await ex.tick(); assert.deepEqual((await w.store.get('shieldBase', null)).mints, [NEW], 'riaccendendo, il token presente diventa "gia\' tuo"');
});
test('SCUDO: parametri dall\'app (Reale > Scudo), polvere ignorata, comando /scudo e allarme ogni 10 s', async () => {
  const w = world(), ex = w.ex(), NEW = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump';
  const v = await ex.paramsView(); assert.equal(v.limits.shieldOn, false); assert.equal(v.limits.shieldSl, 25); assert.equal(v.schema.shieldSl.scope, 'worker'); assert.equal(v.groups.find((g) => g.id === 'shield').page, 'real');
  const bad = await ex.propose({ changes: { shieldSl: 2 } }); assert.equal(bad.ok, false);                    // fuori intervallo
  const r = await ex.propose({ changes: { shieldOn: true, shieldSl: 20, shieldTp1: 60, shieldMinSol: 0.5 } }); assert.equal(r.ok, true); assert.match(w.tg.at(-1).text, /Reale · Scudo: stop loss/);
  await T.handleUpdate(ex, cbq('pa:' + r.proposal.id)); await ex.tick(); w.tokens.set(NEW, 5_000_000n); w.price = 0.02; await ex.tick();
  assert.equal((await ex.state()).positions.length, 0, 'valore 0,1 SOL sotto il minimo di 0,5: ignorato (polvere)');
  await T.handleUpdate(ex, msg('/scudo')); assert.match(w.tg.at(-1).text, /Scudo: ACCESO/); assert.match(w.tg.at(-1).text, /Stop −20% · TP1 \+60%/);
  await T.handleUpdate(ex, msg('/scudo off', '999')); assert.equal(ex.shieldCfg().shieldOn, true, 'chat sconosciuta: niente'); await T.handleUpdate(ex, msg('/scudo off')); await ex.refreshOv(); assert.equal(ex.shieldCfg().shieldOn, false);
  // allarme: con lo Scudo acceso il Durable Object controlla il wallet ogni 10 secondi anche senza posizioni
  const dur = new Map(); let alarm = null; const storage = { get: async (k) => dur.get(k), put: async (k, x) => { dur.set(k, x); }, getAlarm: async () => alarm, setAlarm: async (tm) => { alarm = tm; } };
  const kv = new Map(), STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, x) => { kv.set(k, x); } }, ledger = new W.Ledger({ storage }, { ...w.env, STATE }), realFetch = globalThis.fetch; globalThis.fetch = w.fetch;
  try { await ledger.fetch(new Request('https://l/tick', { method: 'POST', body: '{}' })); assert.equal(alarm, null, 'Scudo spento e nessuna posizione: nessun allarme');
    dur.set('params', { shieldOn: true }); await ledger.fetch(new Request('https://l/tick', { method: 'POST', body: '{}' })); assert.ok(alarm > Date.now() - 1000, 'Scudo acceso: allarme impostato'); }
  finally { globalThis.fetch = realFetch; }
});

test('VENDITA FALLITA: riprova subito da sola con slippage crescente e quotazione nuova; se riesce lo dice', async () => {
  const w = world(), ex = w.ex(), t0 = await ex.ticket({ mint: MINT, sym: 'RTY', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t0.ticket.id));
  const pos = (await ex.state()).positions[0]; w.slips = []; w.failSends = 2;                                   // i primi due invii falliscono
  const r = await ex.sell(pos.id, 1, 'Manuale'); assert.equal(r.ok, true, 'riesce al terzo tentativo'); assert.equal((await ex.state()).positions.length, 0);
  assert.deepEqual(w.slips, [200, 500, 1000], 'ogni tentativo con una quotazione nuova e piu\' slippage');
  assert.match(w.tg.map((x) => x.text).join('\n'), /Vendita riuscita al tentativo 3 \(slippage 10%\)/); assert.ok(!w.tg.some((x) => /USCITA REALE FALLITA/.test(x.text)), 'nessun allarme se alla fine riesce');
});
test('VENDITA FALLITA: se tutti i tentativi falliscono avvisa, resta la posizione e il giro dopo parte in fretta; poi riesce', async () => {
  const w = world(), ex = w.ex(), t0 = await ex.ticket({ mint: MINT, sym: 'RT2', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t0.ticket.id));
  const pos = (await ex.state()).positions[0]; w.failSends = 99; const before = w.now;
  const r = await ex.sell(pos.id, 1, 'Manuale'); assert.equal(r.ok, false); assert.equal((await ex.state()).positions.length, 1, 'la posizione resta');
  assert.equal(ex.fastRetry, true, 'segnala che serve un nuovo giro rapido'); assert.ok(w.now - before >= 2000 && w.now - before < 6000, 'pausa di un secondo tra i tentativi');
  assert.match(w.tg.at(-1).text, /USCITA REALE FALLITA \(1\)/); assert.match(w.tg.at(-1).text, /Ho già riprovato subito con slippage fino a 10%/);
  w.failSends = 0; w.price = 0.0003; await ex.tick(); assert.equal((await ex.state()).positions.length, 0, 'al giro successivo la vendita riesce');
});
test('VENDITA FALLITA: il numero di tentativi per invocazione e\' limitato (budget delle richieste esterne)', async () => {
  const w = world(), ex = w.ex(), M2 = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump';
  for (const m of [MINT, M2]) { const tk = await ex.ticket({ mint: m, sym: 'B' + m.slice(0, 2), score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + tk.ticket.id)); }
  w.failSends = 999; w.slips = []; w.price = 0.0003; await ex.tick();                                              // stop su entrambe, ma ogni invio fallisce
  assert.ok(w.slips.length <= 5 + 2, 'al massimo ' + (5 + 2) + ' quotazioni: ' + w.slips.length); assert.equal((await ex.state()).positions.length, 2);
});
test('VENDITA FALLITA: l\'allarme del Durable Object si anticipa a 2 secondi dopo un fallimento', async () => {
  const w = world(), dur = new Map(); let alarm = Date.now() + 9000; const calls = [];
  const storage = { get: async (k) => dur.get(k), put: async (k, v) => { dur.set(k, v); }, getAlarm: async () => alarm, setAlarm: async (tm) => { alarm = tm; calls.push(tm); } };
  const kv = new Map(), STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } }, ledger = new W.Ledger({ storage }, { ...w.env, STATE });
  dur.set('positions', [{ id: 'R-1', mint: MINT }]); await ledger.arm(); assert.equal(calls.length, 0, 'senza fallimenti non tocca un allarme già impostato');
  ledger.ex.fastRetry = true; await ledger.arm(); assert.ok(calls.length === 1 && calls[0] <= Date.now() + 2100, 'anticipato a ~2 s'); assert.equal(ledger.ex.fastRetry, false);
});

test('VENDITA FALLITA: se un invio e\' partito davvero (errore RPC dopo l\'invio) il tentativo successivo non vende due volte la stessa quota', async () => {
  const w = world(), ex = w.ex(), t0 = await ex.ticket({ mint: MINT, sym: 'DBL', score: 80, sizeSol: 0.05 }); await T.handleUpdate(ex, cbq('ap:' + t0.ticket.id));
  const pos = (await ex.state()).positions[0], start = w.tokens.get(MINT), sent0 = w.sent.length; assert.ok(start > 0n); w.failAfterSend = 1;
  const r = await ex.sell(pos.id, 0.5, 'Parziale'); assert.equal(r.ok, true);
  assert.equal(w.tokens.get(MINT), start - start / 2n, 'venduta una sola volta la meta\', non il 75%'); assert.equal((await ex.state()).positions.length, 1, 'la posizione resta aperta con meta\' dei token');
  assert.equal(w.sent.length - sent0, 1, 'una sola transazione di vendita');
});

test('SLIPPAGE DELLE USCITE: parte dal 2% (come a mano su pump.fun), si regola dall\'app e non supera mai i tetti del Worker', async () => {
  const w = world(), ex = w.ex(); await ex.refreshOv();
  assert.deepEqual(ex.exitSteps(), [200, 500, 1000], 'di base 2% -> 5% -> 10%');
  const v = await ex.paramsView(); assert.equal(v.limits.realExitSlip, 2); assert.equal(v.limits.realExitSlipMax, 10); assert.equal(v.schema.realExitSlip.scope, 'worker'); assert.equal(v.groups.find((g) => g.id === v.schema.realExitSlip.group).page, 'real');
  const r = await ex.propose({ changes: { realExitSlip: 3, realExitSlipMax: 6 } }); assert.equal(r.ok, true); assert.match(w.tg.at(-1).text, /Reale · Slippage delle uscite: iniziale/); await T.handleUpdate(ex, cbq('pa:' + r.proposal.id)); await ex.refreshOv();
  assert.deepEqual(ex.exitSteps(), [300, 600, 600], '3% -> min(7,5%, 6%) -> 6%');
  assert.equal((await ex.propose({ changes: { realExitSlip: 0.1 } })).ok, false, 'fuori intervallo');
  const w2 = world({ EXIT_SLIPPAGE_BPS: '150', EXIT_RETRY_SLIPPAGE_BPS: '400' }), ex2 = w2.ex(); await ex2.refreshOv(); assert.deepEqual(ex2.exitSteps(), [150, 375, 400], 'i tetti del Worker vincono sull\'app');
});

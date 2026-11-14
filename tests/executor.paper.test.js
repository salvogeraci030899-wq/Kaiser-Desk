'use strict';
// Paper in diretta e reset del conto paper: il runner spinge il riepilogo al Worker; il reset passa dall'approvazione su Telegram.
const test = require('node:test');
const assert = require('node:assert/strict');
let X, T, W;
test.before(async () => { X = await import('../worker/src/exec.js'); T = await import('../worker/src/tg.js'); W = await import('../worker/src/index.js'); });

const CHAT = '4242';
function world(env = {}) {
  const w = { tg: [], answers: [], now: 1_700_000_000_000 }, mem = new Map();
  w.env = { ORDERS_MODE: 'off', TELEGRAM_BOT_TOKEN: 'tok', TELEGRAM_CHAT_ID: CHAT, EXEC_TOKEN: 'segreto', ALLOWED_ORIGINS: 'https://salvogeraci030899-wq.github.io', ...env };
  w.store = { get: async (k, d) => (mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : d), put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); } };
  w.fetch = async (url, init = {}) => { const m = String(url).split('/').pop(), b = init.body ? JSON.parse(init.body) : {}; if (m === 'sendMessage') w.tg.push(b); if (m === 'answerCallbackQuery') w.answers.push(b.text); return new Response('{"ok":true}', { status: 200 }); };
  w.ex = () => new X.Executor({ env: w.env, store: w.store, fetch: w.fetch, now: () => w.now, sleep: async () => {} });
  return w;
}
const cbq = (data, chat = CHAT) => ({ callback_query: { id: 'cb', data, message: { chat: { id: Number(chat) } } } });
const summary = (o = {}) => ({ v: 1, updatedAt: 1, runs: 3, capital: 5, cash: 4.7, equity: 4.9, positions: [{ id: 'P-0001', sym: 'AAA' }], journal: [], events: [], config: {}, ...o });

test('paper in diretta: il Worker conserva l\'ultimo riepilogo valido e rifiuta quelli strani o enormi', async () => {
  const w = world(), ex = w.ex();
  assert.equal((await ex.paperGet()).ok, false);
  assert.equal((await ex.paperPut(summary())).ok, true);
  const g = await ex.paperGet(); assert.equal(g.ok, true); assert.equal(g.receivedAt, w.now); assert.equal(g.data.positions[0].id, 'P-0001');
  for (const bad of [null, 'x', {}, summary({ v: 2 }), summary({ positions: 'no' }), summary({ journal: null })]) assert.equal((await ex.paperPut(bad)).ok, false);
  assert.match((await ex.paperPut(summary({ events: Array.from({ length: 20000 }, (_, i) => 'riga lunga numero ' + i) }))).error, /troppo grande/);
  assert.equal((await ex.paperGet()).data.runs, 3);                                      // il valido precedente resta
});
test('Worker: POST /paper richiede il token, GET /paper è pubblico e si spegne con PUBLIC_VIEW=0', async () => {
  const w = world(), kv = new Map(), dur = new Map();
  const STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const mk = (env) => { const e = { ...w.env, ...env, STATE }; const ledger = new W.Ledger({ storage: { get: async (x) => dur.get(x), put: async (x, v) => { dur.set(x, v); } } }, e); e.LEDGER = { idFromName: () => 'm', get: () => ({ fetch: (u, i) => ledger.fetch(new Request(u, i)) }) }; return e; };
  const env = mk({}), call = (path, o = {}, e = env) => W.default.fetch(new Request('https://x.example' + path, o), e);
  assert.equal((await call('/paper', { method: 'POST', body: JSON.stringify({ data: summary() }) })).status, 401);                  // senza token
  assert.equal((await call('/paper', { method: 'POST', headers: { 'x-app-token': 'segreto' }, body: JSON.stringify({ data: summary() }) })).status, 200);
  const g = await call('/paper', { headers: { Origin: 'https://salvogeraci030899-wq.github.io' } }); assert.equal(g.status, 200);
  assert.equal(g.headers.get('Access-Control-Allow-Origin'), 'https://salvogeraci030899-wq.github.io'); assert.equal((await g.json()).data.equity, 4.9);
  assert.equal((await call('/paper', {}, mk({ PUBLIC_VIEW: '0' }))).status, 403);
});
test('reset del paper: richiesta → Telegram → direttiva per il runner → conferma; solo dalla tua chat', async () => {
  const w = world(), ex = w.ex();
  assert.match((await ex.propose({ reset: { capitalSOL: 0.01 } })).errors[0].msg, /tra 0,1 e 1000/); assert.match((await ex.propose({ reset: { capitalSOL: '5' } })).errors[0].msg, /tra 0,1/);
  assert.match((await ex.propose({ reset: { capitalSOL: 5000 } })).errors[0].msg, /tra 0,1/); assert.match((await ex.propose({ reset: {} })).errors[0].msg, /tra 0,1/);
  const r = await ex.propose({ reset: { capitalSOL: 10.126 } }); assert.equal(r.ok, true); assert.equal(r.proposal.reset.capitalSOL, 10.13);
  const m = w.tg.at(-1); assert.match(m.text, /Reset del conto PAPER C-0001/); assert.match(m.text, /10\.13 SOL/); assert.match(m.text, /reale non viene toccato/); assert.equal(m.reply_markup.inline_keyboard[0][0].callback_data, 'pa:C-0001');
  assert.equal((await ex.paramsView()).resetPaper, null); assert.equal((await ex.paramsView()).proposals[0].reset.capitalSOL, 10.13);
  w.now += 16000; assert.match((await ex.propose({ reset: { capitalSOL: 7 } })).error, /già un reset in attesa/);
  await T.handleUpdate(ex, cbq('pa:C-0001', '999')); assert.equal((await ex.paramsView()).resetPaper, null);                       // chat sconosciuta: niente
  await T.handleUpdate(ex, cbq('pa:C-0001'));
  const v = await ex.paramsView(); assert.deepEqual({ id: v.resetPaper.id, cap: v.resetPaper.capitalSOL }, { id: 'C-0001', cap: 10.13 }); assert.equal(w.answers.at(-1), 'Reset approvato'); assert.match(w.tg.at(-1).text, /Reset del paper approvato/);
  assert.deepEqual(v.runner, {});                                                                                                 // non è un parametro
  await ex.reportRunner(null, 'C-9999'); assert.ok((await ex.paramsView()).resetPaper);                                          // ack di un altro id: resta
  await ex.reportRunner(null, 'C-0001'); assert.equal((await ex.paramsView()).resetPaper, null);                                // ack del runner: la direttiva sparisce
});
test('reset: rifiuto, scadenza e direttiva vecchia non si applicano', async () => {
  const w = world(), ex = w.ex();
  await ex.propose({ reset: { capitalSOL: 8 } }); await T.handleUpdate(ex, cbq('pr:C-0001')); assert.equal((await ex.paramsView()).resetPaper, null);
  w.now += 16000; await ex.propose({ reset: { capitalSOL: 8 } }); w.now += 11 * 60000; assert.match((await ex.applyProposal('C-0002')).error, /scaduta/); assert.equal((await ex.paramsView()).resetPaper, null);
  w.now += 16000; await ex.propose({ reset: { capitalSOL: 8 } }); await ex.applyProposal('C-0003'); assert.ok((await ex.paramsView()).resetPaper);
  w.now += 61 * 60000; assert.equal((await ex.paramsView()).resetPaper, null);                                                    // oltre un'ora non si espone più
});
test('/propose con reset passa dall\'origine ammessa e non accetta chiavi extra', async () => {
  const w = world(), kv = new Map(), dur = new Map();
  const STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const e = { ...w.env, STATE }; const ledger = new W.Ledger({ storage: { get: async (x) => dur.get(x), put: async (x, v) => { dur.set(x, v); } } }, e); e.LEDGER = { idFromName: () => 'm', get: () => ({ fetch: (u, i) => ledger.fetch(new Request(u, i)) }) };
  const ORI = 'https://salvogeraci030899-wq.github.io', post = (body, o) => W.default.fetch(new Request('https://x.example/propose', { method: 'POST', headers: o ? { Origin: o } : {}, body: JSON.stringify(body) }), e);
  assert.equal((await post({ reset: { capitalSOL: 6 } })).status, 403);
  const r = await (await post({ reset: { capitalSOL: 6, evil: 'x' } }, ORI)).json(); assert.equal(r.ok, true); assert.deepEqual(Object.keys(r.proposal.reset), ['capitalSOL']);
});

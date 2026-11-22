'use strict';
// Decisioni Prendo / Scarto sugli avvisi: il Worker le conserva per il runner, una per segnale, e non tocca ordini.
const test = require('node:test');
const assert = require('node:assert/strict');
let X, T;
test.before(async () => { X = await import('../worker/src/exec.js'); T = await import('../worker/src/tg.js'); });

const CHAT = '4242';
function world() {
  const w = { tg: [], answers: [], now: 1_700_000_000_000 }, mem = new Map();
  w.env = { ORDERS_MODE: 'off', TELEGRAM_BOT_TOKEN: 'tok', TELEGRAM_CHAT_ID: CHAT, EXEC_TOKEN: 'segreto' };
  w.store = { get: async (k, d) => (mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : d), put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); } };
  w.fetch = async (url, init = {}) => { const m = String(url).split('/').pop(), b = init.body ? JSON.parse(init.body) : {}; if (m === 'sendMessage') w.tg.push(b); if (m === 'answerCallbackQuery') w.answers.push(b.text); return { ok: true, json: async () => ({ ok: true, result: {} }) }; };
  w.ex = () => new X.Executor({ env: w.env, store: w.store, fetch: w.fetch, now: () => w.now, sleep: async () => {} });
  return w;
}
const cbq = (data, chat = CHAT) => ({ callback_query: { id: 'cb', data, message: { chat: { id: Number(chat) } } } });

test('Prendo e Scarto: si registrano una volta sola, solo dalla chat autorizzata, e il runner le legge e le conferma', async () => {
  const w = world(), ex = w.ex();
  await T.handleUpdate(ex, cbq('hd:y:a1b2c3', '999')); assert.deepEqual((await ex.paramsView()).humanVotes, [], 'chat sconosciuta: niente');
  await T.handleUpdate(ex, cbq('hd:y:a1b2c3')); assert.equal(w.answers.at(-1), 'Registrato: prendo');
  await T.handleUpdate(ex, cbq('hd:n:a1b2c3')); assert.match(w.answers.at(-1), /gia registrato/, 'una sola decisione per segnale');
  await T.handleUpdate(ex, cbq('hd:n:a9z8y7')); assert.equal(w.answers.at(-1), 'Registrato: scarto');
  for (const bad of ['hd:x:a1b2c3', 'hd:y:', 'hd:y:P-0001', 'hd:y:A1B2C3', 'hd:y:a1']) { await T.handleUpdate(ex, cbq(bad)); assert.ok(!/Registrato/.test(w.answers.at(-1)), bad); }
  const v = (await ex.paramsView()).humanVotes; assert.deepEqual(v.map((x) => [x.id, x.v]), [['a1b2c3', 'y'], ['a9z8y7', 'n']]);
  await ex.reportRunner(null, null, null, ['a1b2c3']); assert.deepEqual((await ex.paramsView()).humanVotes.map((x) => x.id), ['a9z8y7'], 'confermata: sparisce');
  w.now += 3 * 3600000; assert.deepEqual((await ex.paramsView()).humanVotes, [], 'dopo due ore non si offre piu');
  assert.equal(w.tg.length, 0, 'nessun messaggio, nessun ordine');
});

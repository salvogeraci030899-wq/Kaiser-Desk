'use strict';
// Parametri modificabili dall'app: la richiesta non contiene segreti, la applica solo il tocco su Telegram, mai oltre i tetti di Cloudflare.
const test = require('node:test');
const assert = require('node:assert/strict');
let X, P, T, W;
test.before(async () => { X = await import('../worker/src/exec.js'); P = await import('../worker/src/params.js'); T = await import('../worker/src/tg.js'); W = await import('../worker/src/index.js'); });

const CHAT = '4242';
function world(env = {}) {
  const w = { tg: [], answers: [], now: 1_700_000_000_000 }, mem = new Map();
  w.env = { ORDERS_MODE: 'live', MAX_CAPITAL_SOL: '0.2', MAX_ORDER_SOL: '0.1', MAX_DAILY_LOSS_SOL: '0.1', TELEGRAM_BOT_TOKEN: 'tok', TELEGRAM_CHAT_ID: CHAT, EXEC_TOKEN: 'segreto', ...env };
  w.store = { get: async (k, d) => (mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : d), put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); } };
  w.fetch = async (url, init = {}) => { const m = String(url).split('/').pop(), b = init.body ? JSON.parse(init.body) : {}; if (m === 'sendMessage') w.tg.push(b); if (m === 'answerCallbackQuery') w.answers.push(b.text); return new Response('{"ok":true}', { status: 200 }); };
  w.ex = () => new X.Executor({ env: w.env, store: w.store, fetch: w.fetch, now: () => w.now, sleep: async () => {} });
  return w;
}
const msg = (text, chat = CHAT) => ({ message: { chat: { id: Number(chat) }, text } });
const cbq = (data, chat = CHAT) => ({ callback_query: { id: 'cb', data, message: { chat: { id: Number(chat) } } } });

test('schema: solo numeri, interruttori e scelte; nessun nome da segreto; ogni chiave ha gruppo, etichetta e intervallo', () => {
  for (const [k, s] of Object.entries(P.SCHEMA)) {
    assert.ok(!P.FORBIDDEN.test(k), 'nome sospetto: ' + k);
    assert.ok(['num', 'bool', 'enum'].includes(s.t), k); assert.ok(P.GROUPS.some((g) => g.id === s.group), 'gruppo mancante ' + k); assert.ok(s.label && ['runner', 'worker'].includes(s.scope), k);
    if (s.t === 'num') assert.ok(s.min < s.max, k); if (s.t === 'enum') assert.ok(s.values.length > 1, k);
  }
  for (const bad of ['backend', 'appToken', 'executor', 'executorToken', 'WALLET_SECRET_KEY', 'ORDERS_MODE', 'JUPITER_PROGRAM_ID', 'mint']) assert.ok(!(bad in P.SCHEMA), bad);
});
test('due pagine, Paper e Reale: ogni gruppo ha la sua pagina; il reale ha parametri propri; il runner conosce ogni chiave', async () => {
  const E = (await import('../engine.js')).default;
  const page = (k) => P.GROUPS.find((g) => g.id === P.SCHEMA[k].group).page;
  for (const g of P.GROUPS) assert.ok(['paper', 'real'].includes(g.page), g.id);
  for (const pg of ['paper', 'real']) assert.ok(Object.keys(P.SCHEMA).filter((k) => page(k) === pg).length >= 10, 'pagina vuota: ' + pg);
  for (const k of Object.keys(P.SCHEMA)) {
    if (/^real[A-Z]/.test(k) || P.SCHEMA[k].group === 'lim') assert.equal(page(k), 'real', k + ' deve stare nella pagina Reale');
    else assert.equal(page(k), 'paper', k + ' deve stare nella pagina Paper');
    if (P.SCHEMA[k].scope === 'runner') {                                                                   // il runner accetta solo chiavi note e dello stesso tipo
      assert.ok(k in E.DEFAULTS, 'manca in engine DEFAULTS: ' + k);
      assert.equal(typeof E.DEFAULTS[k], { num: 'number', bool: 'boolean', enum: 'string' }[P.SCHEMA[k].t], 'tipo di ' + k);
      if (P.SCHEMA[k].t === 'num') assert.ok(E.DEFAULTS[k] >= P.SCHEMA[k].min && E.DEFAULTS[k] <= P.SCHEMA[k].max, 'default fuori intervallo: ' + k);
    }
  }
  for (const k of ['sl', 'tp1', 'tp1Sell', 'trail', 'timeStopMin', 'rugLiqDrop', 'sizePct']) assert.equal(E.DEFAULTS['real' + k[0].toUpperCase() + k.slice(1)], E.DEFAULTS[k], 'il reale parte con le stesse regole del paper: ' + k);
});
test('validate: rifiuta chiavi ignote, tipi sbagliati, fuori intervallo, prototipi; arrotonda', () => {
  const v = (c) => P.validate(c);
  assert.deepEqual(v({ sl: 30, beAfterTp1: false, gmgnInterval: '5m' }).clean, { sl: 30, beAfterTp1: false, gmgnInterval: '5m' });
  assert.match(v({ appToken: 'x' }).errors[0].msg, /non modificabile/); assert.match(v({ executorToken: 'x' }).errors[0].msg, /non modificabile/);
  assert.match(v({ __proto__: { sl: 1 }, constructor: 1 }).errors[0].msg, /non modificabile|nessuna/);
  assert.match(v({ sl: '30' }).errors[0].msg, /numero/); assert.match(v({ sl: NaN }).errors[0].msg, /numero/); assert.match(v({ sl: Infinity }).errors[0].msg, /numero/);
  assert.match(v({ sl: 99 }).errors[0].msg, /intervallo/); assert.match(v({ sl: 1 }).errors[0].msg, /intervallo/);
  assert.match(v({ autopilot: 1 }).errors[0].msg, /sì o no/); assert.match(v({ gmgnInterval: '7m' }).errors[0].msg, /non ammesso/);
  assert.equal(v({ prioritySOL: 0.00049999 }).clean.prioritySOL, 0.0005); assert.equal(v({ sizePct: 5.04 }).clean.sizePct, 5);
  assert.match(v({}).errors[0].msg, /nessuna/); assert.match(v(null).errors[0].msg, /non valida/); assert.match(v([1]).errors[0].msg, /non valida/);
  assert.match(v(Object.fromEntries(Array.from({ length: 41 }, (_, i) => ['k' + i, 1]))).errors[0].msg, /troppe/);
});
test('su Telegram ogni voce dice se è del Paper o del Reale (stesse etichette, conti diversi)', async () => {
  const w = world(), ex = w.ex();
  await ex.propose({ changes: { sl: 30, realSl: 15, maxOrderSOL: 0.04 } });
  const t = w.tg.at(-1).text;
  assert.match(t, /• Paper · Stop loss \(%\): 25 → 30/); assert.match(t, /• Reale · Stop loss \(%\): 25 → 15/); assert.match(t, /• Reale · Size max per ordine \(SOL\): 0\.1 → 0\.04/);
  await T.handleUpdate(ex, cbq('pa:C-0001')); await T.handleUpdate(ex, msg('/parametri'));
  assert.match(w.tg.at(-1).text, /• Paper · Stop loss \(%\): 30/); assert.match(w.tg.at(-1).text, /• Reale · Stop loss \(%\): 15/);
});
test('richiesta → messaggio con differenza e tasti → applicata solo dal tocco su Telegram', async () => {
  const w = world(), ex = w.ex();
  const r = await ex.propose({ changes: { sl: 30, tp1: 60, maxOrderSOL: 0.03 } }); assert.equal(r.ok, true);
  const m = w.tg.at(-1); assert.match(m.text, /C-0001/); assert.match(m.text, /Stop loss \(%\): 25 → 30/); assert.match(m.text, /Take profit 1 \(%\): 40 → 60/); assert.match(m.text, /Size max per ordine \(SOL\): 0\.1 → 0\.03/);
  assert.equal(m.reply_markup.inline_keyboard[0][0].callback_data, 'pa:C-0001');
  assert.deepEqual((await ex.paramsView()).runner, {});                                                   // proposta: NON ancora applicata
  assert.equal(ex.limits().maxOrderSOL, 0.1);
  await T.handleUpdate(ex, cbq('pa:C-0001', '999'));                                                      // chat sconosciuta: ignorata
  assert.deepEqual((await ex.paramsView()).runner, {});
  await T.handleUpdate(ex, cbq('pa:C-0001'));                                                             // la tua chat: applicata
  const v = await ex.paramsView(); assert.deepEqual(v.runner, { sl: 30, tp1: 60 }); assert.deepEqual(v.worker, { maxOrderSOL: 0.03 }); assert.equal(v.proposals.length, 0);
  assert.equal(ex.limits().maxOrderSOL, 0.03); assert.match(w.tg.at(-1).text, /applicati/); assert.equal(w.answers.at(-1), 'Parametri applicati');
});
test('i limiti applicati hanno sempre il tetto di Cloudflare: l\'app può solo restare sotto', async () => {
  const w = world(), ex = w.ex();
  const over = await ex.propose({ changes: { maxCapitalSOL: 0.5 } }); assert.equal(over.ok, false); assert.match(over.errors[0].msg, /tetto/);
  assert.equal((await ex.propose({ changes: { maxCapitalSOL: 0.15, maxPositions: 2 } })).ok, true); await T.handleUpdate(ex, cbq('pa:C-0001'));
  assert.equal(ex.limits().maxCapitalSOL, 0.15); assert.equal(ex.limits().maxPositions, 2);
  w.env.MAX_CAPITAL_SOL = '0.1'; assert.equal(ex.limits().maxCapitalSOL, 0.1);                           // tetto abbassato dopo: vince il tetto
  w.env.MAX_CAPITAL_SOL = '0'; assert.equal(ex.limits().maxCapitalSOL, 0);                               // chiuso resta chiuso
  const w2 = world({ MAX_CAPITAL_SOL: '0' }); assert.equal((await w2.ex().propose({ changes: { maxCapitalSOL: 0.01 } })).ok, false);
});
test('il limite abbassato dall\'app vale davvero sugli ordini', async () => {
  const w = world(), ex = w.ex(); await ex.propose({ changes: { maxOrderSOL: 0.02 } }); await T.handleUpdate(ex, cbq('pa:C-0001'));
  const r = await ex.buy({ ref: 'ordine-0001', mint: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdX6uQXCcGdr', sizeSol: 0.05 }); assert.equal(r.ok, false); assert.match(r.error, /massimo per ordine \(0\.02\)/);
});
test('anti-abuso: richieste ravvicinate, massimo 3 in attesa, nessuna modifica, scadenza, rifiuto', async () => {
  const w = world(), ex = w.ex();
  assert.equal((await ex.propose({ changes: { sl: 30 } })).ok, true);
  assert.match((await ex.propose({ changes: { sl: 31 } })).error, /ravvicinate/);
  w.now += 16000; assert.equal((await ex.propose({ changes: { sl: 31 } })).ok, true); w.now += 16000; assert.equal((await ex.propose({ changes: { sl: 32 } })).ok, true);
  w.now += 16000; assert.match((await ex.propose({ changes: { sl: 33 } })).error, /già 3 richieste/);
  await T.handleUpdate(ex, cbq('pr:C-0001')); assert.match(w.tg.at(-1).text, /rifiutata/); assert.equal((await ex.paramsView()).proposals.length, 2); assert.deepEqual((await ex.paramsView()).runner, {});
  w.now += 11 * 60000; assert.match((await ex.applyProposal('C-0002')).error, /scaduta/); assert.deepEqual((await ex.paramsView()).runner, {});
  assert.match((await ex.propose({ changes: { sl: 25 } })).error, /già quelli attuali/);                // 25 è il valore di partenza
  assert.match((await ex.applyProposal('C-9999')).error, /non trovata/);
});
test('/parametri, /reset_parametri e il riepilogo del runner (prima → dopo corretto)', async () => {
  const w = world(), ex = w.ex();
  await ex.reportRunner({ sl: 18, appToken: 'NO', backend: 'NO', autopilot: true, evil: 1 });
  assert.deepEqual((await ex.paramsView()).runnerCfg, { sl: 18, autopilot: true });                       // solo parametri ammessi
  await ex.propose({ changes: { sl: 22 } }); assert.match(w.tg.at(-1).text, /Stop loss \(%\): 18 → 22/);   // usa il valore che il runner sta davvero usando
  await T.handleUpdate(ex, cbq('pa:C-0001'));
  await T.handleUpdate(ex, msg('/parametri')); assert.match(w.tg.at(-1).text, /Stop loss \(%\): 22/);
  await T.handleUpdate(ex, msg('/reset_parametri')); assert.deepEqual((await ex.paramsView()).runner, {}); assert.match(w.tg.at(-1).text, /riportati/);
  await T.handleUpdate(ex, msg('/reset_parametri', '999')); assert.equal((await ex.paramsView()).runner.sl, undefined);
});
test('Worker: /params pubblico, /propose solo da origini ammesse e senza segreti, /runner richiede il token', async () => {
  const w = world({ ALLOWED_ORIGINS: 'https://salvogeraci030899-wq.github.io' }), kv = new Map(), dur = new Map();
  const STATE = { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } };
  const mk = (env) => { const e = { ...w.env, ...env, STATE }; const ledger = new W.Ledger({ storage: { get: async (x) => dur.get(x), put: async (x, v) => { dur.set(x, v); } } }, e); e.LEDGER = { idFromName: () => 'm', get: () => ({ fetch: (u, i) => ledger.fetch(new Request(u, i)) }) }; return e; };
  const realFetch = globalThis.fetch; globalThis.fetch = w.fetch;
  try {
    const env = mk({}), call = (path, o = {}, e = env) => W.default.fetch(new Request('https://x.example' + path, o), e);
    const g = await call('/params'); assert.equal(g.status, 200); const d = await g.json(); assert.equal(d.ok, true); assert.ok(d.schema.sl && d.groups.length && d.ceilings.maxOrderSOL === 0.1);
    assert.ok(!JSON.stringify(d).includes('segreto')); assert.equal((await call('/params', {}, mk({ PUBLIC_VIEW: '0' }))).status, 403);
    const post = (body, origin, e = env) => call('/propose', { method: 'POST', headers: origin ? { Origin: origin } : {}, body: typeof body === 'string' ? body : JSON.stringify(body) }, e);
    const ORI = 'https://salvogeraci030899-wq.github.io';
    assert.equal((await post({ changes: { sl: 30 } })).status, 403);                                         // senza origine
    assert.equal((await post({ changes: { sl: 30 } }, 'https://evil.example')).status, 403);                  // origine non ammessa
    assert.equal((await post({ changes: { sl: 30 } }, ORI, mk({ PROPOSALS: '0' }))).status, 403);            // disattivate
    assert.equal((await post('x'.repeat(5000), ORI)).status, 413);
    const ok = await post({ changes: { sl: 30 } }, ORI); assert.equal(ok.status, 200); assert.equal((await ok.json()).ok, true); assert.equal(ok.headers.get('Access-Control-Allow-Origin'), ORI);
    assert.equal((await post({ changes: { appToken: 'x' } }, ORI)).status, 200);                             // risposta ok:false con errori, mai applicata
    assert.equal((await call('/runner', { method: 'POST', body: '{}' })).status, 401);                        // il riepilogo del runner richiede il token
    assert.equal((await call('/runner', { method: 'POST', headers: { 'x-app-token': 'segreto' }, body: JSON.stringify({ config: { sl: 20 } }) })).status, 200);
    assert.equal((await (await call('/params')).json()).runnerCfg.sl, 20);
    assert.equal((await call('/public')).status, 200);
  } finally { globalThis.fetch = realFetch; }
});

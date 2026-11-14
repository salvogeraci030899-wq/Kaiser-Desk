'use strict';
// Il runner legge i parametri approvati dal Worker: solo chiavi note e dello stesso tipo, torna al valore di base se la modifica viene annullata.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

process.env.STATE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'kaiser-params-'));
delete process.env.XAI_API_KEY;
const R = require('../runner/runner.js');
const { S, rt } = R;
const BASE = { sl: S.sl, tp1: S.tp1, autopilot: S.autopilot, executor: S.executor, trail: S.trail };

function mockWorld(getReply) {
  const calls = []; const real = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => { const body = init.body ? JSON.parse(init.body) : null; calls.push({ url: String(url), method: init.method || 'GET', headers: init.headers || {}, body }); return getReply(String(url), init, body); };
  return { calls, restore: () => { globalThis.fetch = real; } };
}
const ok = (o) => new Response(JSON.stringify(o), { status: 200 });

test('applica i parametri approvati, ignora chiavi e tipi non ammessi, torna al valore di base se annullati', async () => {
  let runner = { sl: BASE.sl + 5, tp1: 55, appToken: 'NO', executor: 'https://evil.example', executorToken: 'NO', inesistente: 1, trail: 'molto', autopilot: !BASE.autopilot };
  const m = mockWorld(async () => ok({ ok: true, runner }));
  try {
    delete process.env.EXEC_TOKEN; rt.cfgSent = false;
    await R.pullParams();
    assert.equal(S.sl, BASE.sl + 5); assert.equal(S.tp1, 55); assert.equal(S.autopilot, !BASE.autopilot);
    assert.equal(S.appToken, ''); assert.equal(S.executor, BASE.executor); assert.equal(S.executorToken, ''); assert.equal(S.trail, BASE.trail); assert.ok(!('inesistente' in S));
    assert.ok(m.calls.every((c) => c.method === 'GET'), 'senza token il runner non scrive nulla');
    runner = { sl: BASE.sl + 5 };                                    // l'app ha annullato tp1 e autopilot
    await R.pullParams();
    assert.equal(S.sl, BASE.sl + 5); assert.equal(S.tp1, BASE.tp1); assert.equal(S.autopilot, BASE.autopilot);
    runner = {}; await R.pullParams(); assert.equal(S.sl, BASE.sl);   // reset completo
  } finally { m.restore(); }
});
test('Worker irraggiungibile o risposta strana: si tengono i valori attuali, nessun errore', async () => {
  let reply = async () => ok({ ok: true, runner: { sl: 33 } });
  const m = mockWorld(async (...a) => reply(...a));
  try {
    await R.pullParams(); assert.equal(S.sl, 33);
    for (const r of [async () => { throw new Error('rete giù'); }, async () => new Response('x', { status: 500 }), async () => ok({ ok: false }), async () => ok({ ok: true, runner: 'boh' }), async () => ok(null), async () => ok({ ok: true })]) { reply = r; await R.pullParams(); assert.equal(S.sl, 33); }
    reply = async () => ok({ ok: true, runner: {} }); await R.pullParams(); assert.equal(S.sl, BASE.sl);
  } finally { m.restore(); }
});
test('con EXEC_TOKEN riferisce al Worker i valori in uso (una volta e a ogni cambio), senza segreti', async () => {
  let runner = {}; const m = mockWorld(async (url) => ok(url.endsWith('/params') ? { ok: true, runner } : { ok: true }));
  try {
    process.env.EXEC_TOKEN = 'tok-runner'; rt.cfgSent = false;
    await R.pullParams(); let posts = m.calls.filter((c) => c.method === 'POST'); assert.equal(posts.length, 1);
    assert.ok(posts[0].url.endsWith('/runner')); assert.equal(posts[0].headers['x-app-token'], 'tok-runner'); assert.equal(posts[0].body.config.sl, BASE.sl);
    const txt = JSON.stringify(posts[0].body); for (const bad of ['appToken', 'executorToken', 'backend', 'executor"']) assert.ok(!txt.includes(bad), 'invia ' + bad);
    await R.pullParams(); assert.equal(m.calls.filter((c) => c.method === 'POST').length, 1);       // nessun cambio: nessun nuovo invio
    runner = { sl: 29 }; await R.pullParams(); posts = m.calls.filter((c) => c.method === 'POST'); assert.equal(posts.length, 2); assert.equal(posts[1].body.config.sl, 29);
  } finally { m.restore(); delete process.env.EXEC_TOKEN; }
});
test('useGrok dall\'app non si accende senza la chiave xAI del runner', async () => {
  const m = mockWorld(async () => ok({ ok: true, runner: { useGrok: true } }));
  try { await R.pullParams(); assert.equal(S.useGrok, false); } finally { m.restore(); }
});

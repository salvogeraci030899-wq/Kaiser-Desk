'use strict';
// Il runner non ha chiavi: chiede all'esecutore. Qui si prova solo cosa chiede e quando.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

process.env.STATE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'kaiser-runner-'));
const R = require('../runner/runner.js');
const { S, st, rt } = R;

const buy = (mint, score = 80) => ({ mint, sym: mint.slice(0, 4), score, a: { m: { liq: 100000 } } });
const reset = (o = {}) => { Object.assign(S, { realEnabled: true, realCapitalSOL: 0.1, sizePct: 5, realApprove: true, maxEntriesPerScan: 1, retradeH: 2, executor: 'https://exec.test' }, o); st.realTried = {}; rt.realWarned = false; };
function mockFetch(reply) {
  const calls = []; const real = globalThis.fetch;
  globalThis.fetch = async (url, init) => { calls.push({ url: String(url), init, body: init && init.body ? JSON.parse(init.body) : null }); const r = await reply(url, init); return new Response(JSON.stringify(r), { status: 200 }); };
  return { calls, restore: () => { globalThis.fetch = real; } };
}
const M1 = '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdX6uQXCcGdr', M2 = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

test('reale spento o senza segreto: il runner non chiama nessuno', async () => {
  const m = mockFetch(async () => ({ ok: true }));
  try {
    reset({ realEnabled: false }); process.env.EXEC_TOKEN = 'tok'; await R.realEntries([buy(M1)]);
    reset(); delete process.env.EXEC_TOKEN; await R.realEntries([buy(M1)]);
    reset({ realCapitalSOL: 0 }); process.env.EXEC_TOKEN = 'tok'; await R.realEntries([buy(M1)]);
    assert.equal(m.calls.length, 0);
  } finally { m.restore(); }
});
test('con approvazione: propone un ticket (senza ref), con token e size dal capitale reale', async () => {
  const m = mockFetch(async () => ({ ok: true, ticket: {} }));
  try {
    reset(); process.env.EXEC_TOKEN = 'tok'; await R.realEntries([buy(M1)]);
    assert.equal(m.calls.length, 1); const c = m.calls[0];
    assert.equal(c.url, 'https://exec.test/ticket'); assert.equal(c.init.headers['x-app-token'], 'tok');
    assert.equal(c.body.mint, M1); assert.equal(c.body.sizeSol, 0.005); assert.equal(c.body.ref, undefined); assert.equal(c.body.params.sl, S.sl);
  } finally { m.restore(); }
});
test('senza approvazione: ordine con ref stabile; niente secondo tentativo ravvicinato sullo stesso token', async () => {
  const m = mockFetch(async () => ({ ok: true, signature: 's' }));
  try {
    reset({ realApprove: false }); process.env.EXEC_TOKEN = 'tok'; await R.realEntries([buy(M1)]);
    assert.equal(m.calls[0].url, 'https://exec.test/order'); assert.match(m.calls[0].body.ref, /^rn-7GCihgDB8fe6-\d+$/);
    await R.realEntries([buy(M1)]); assert.equal(m.calls.length, 1);
  } finally { m.restore(); }
});
test('un solo ingresso per scan; un rifiuto o un errore di rete non fermano né rompono il runner', async () => {
  let n = 0; const m = mockFetch(async () => { n++; if (n === 1) return { ok: false, error: 'kill switch attivo' }; if (n === 2) throw new Error('rete giù'); return { ok: true }; });
  try {
    reset({ maxEntriesPerScan: 2 }); process.env.EXEC_TOKEN = 'tok';
    await R.realEntries([buy(M1), buy(M2), buy('So11111111111111111111111111111111111111112')]);
    assert.equal(m.calls.length, 3);                                  // tutti provati: i primi due falliscono e non contano
    reset({ maxEntriesPerScan: 1 }); n = 100; m.calls.length = 0;
    await R.realEntries([buy(M1), buy(M2)]); assert.equal(m.calls.length, 1);
  } finally { m.restore(); }
});

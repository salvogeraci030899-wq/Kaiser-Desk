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
const reset = (o = {}) => { Object.assign(S, { realEnabled: true, realCapitalSOL: 0.1, realSizePct: 5, realMinScore: 68, realApprove: true, realMaxEntriesPerScan: 1, realSlippageBps: 300, retradeH: 2, executor: 'https://exec.test' }, o); st.realTried = {}; rt.realWarned = false; };
function mockFetch(reply) {
  const calls = []; const real = globalThis.fetch;
  globalThis.fetch = async (url, init) => { calls.push({ url: String(url), init, body: init && init.body ? JSON.parse(init.body) : null }); const r = await reply(url, init); return new Response(JSON.stringify(r), { status: 200 }); };
  return { calls, restore: () => { globalThis.fetch = real; } };
}
const M1 = '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdX6uQXCcGdr', M2 = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

test('riepilogo pubblico per l\'app: struttura leggera, mai segreti', () => {
  Object.assign(S, { backend: 'https://x', appToken: 'SEGRETO-APP', executorToken: 'SEGRETO-EXEC' });
  st.positions = [{ id: 'P-0001', mint: M1, sym: 'AAA', pairAddress: 'pa', openedAt: 1, sizeSOL: 0.25, cost: 0.2505, entry: 0.01, tokens: 25, remaining: 1, tp1Done: false, peak: 0.011, score: 80, last: { priceNative: 0.0105, liq: 5e4, t: 2 }, rawLeft: '123', fills: ['BUY'], entryInfo: { notes: ['x'] } }];
  st.journal = Array.from({ length: 150 }, (_, i) => ({ id: 'P-' + i, mint: M1, sym: 'A' + i, openedAt: 1, closedAt: 2 + i, cost: 0.25, back: 0.2, pnl: -0.05, pct: -20, reason: 'Stop loss', score: 80, entryInfo: { secret: 'no' } }));
  st.events = Array.from({ length: 100 }, (_, i) => 'evento ' + i);
  const p = R.publicSummary(), txt = JSON.stringify(p);
  assert.equal(p.v, 1); assert.equal(p.positions.length, 1); assert.equal(p.positions[0].last.priceNative, 0.0105);
  assert.equal(p.journal.length, 100); assert.equal(p.events.length, 40); assert.equal(p.stats.n, 150);
  for (const s of ['SEGRETO-APP', 'SEGRETO-EXEC', 'rawLeft', 'entryInfo']) assert.ok(!txt.includes(s), 'compare ' + s);
  assert.ok(!('backend' in p.config) && !('appToken' in p.config) && !('executorToken' in p.config)); assert.ok('sl' in p.config);
  assert.ok(txt.length < 60000, 'troppo grande: ' + txt.length);
  st.positions = []; st.journal = []; st.events = [];
});
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
    assert.equal(c.body.mint, M1); assert.equal(c.body.sizeSol, 0.005); assert.equal(c.body.ref, undefined); assert.equal(c.body.params.sl, S.realSl);
  } finally { m.restore(); }
});
test('il reale ha le sue regole, indipendenti dal paper: size, score minimo, slippage e uscite', async () => {
  const m = mockFetch(async () => ({ ok: true, ticket: {} }));
  try {
    reset({ sizePct: 50, slippageBps: 900, sl: 40, tp1: 90, minScore: 10, realSizePct: 10, realSlippageBps: 150, realSl: 15, realTp1: 25, realTp1Sell: 70, realTrail: 12, realMinScore: 85, realCapitalSOL: 0.2 });
    process.env.EXEC_TOKEN = 'tok';
    await R.realEntries([buy(M1, 80)]); assert.equal(m.calls.length, 0, 'sotto lo score minimo del reale (anche se il paper entrerebbe)');
    await R.realEntries([buy(M1, 90)]); assert.equal(m.calls.length, 1); const b = m.calls[0].body;
    assert.equal(b.sizeSol, 0.02); assert.equal(b.slippageBps, 150);                                       // 10% di 0,2 SOL, slippage del reale
    assert.deepEqual({ sl: b.params.sl, tp1: b.params.tp1, tp1Sell: b.params.tp1Sell, trail: b.params.trail }, { sl: 15, tp1: 25, tp1Sell: 70, trail: 12 });
  } finally { m.restore(); Object.assign(S, { sizePct: 5, slippageBps: 300, sl: 25, tp1: 40, minScore: 68 }); }
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
    reset({ realMaxEntriesPerScan: 2 }); process.env.EXEC_TOKEN = 'tok';
    await R.realEntries([buy(M1), buy(M2), buy('So11111111111111111111111111111111111111112')]);
    assert.equal(m.calls.length, 3);                                  // tutti provati: i primi due falliscono e non contano
    reset({ realMaxEntriesPerScan: 1 }); n = 100; m.calls.length = 0;
    await R.realEntries([buy(M1), buy(M2)]); assert.equal(m.calls.length, 1);
  } finally { m.restore(); }
});

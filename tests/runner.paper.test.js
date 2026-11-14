'use strict';
// Runner: paper in diretta verso il Worker e reset del conto paper approvato dall'app.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaiser-paper-'));
fs.writeFileSync(path.join(dir, 'state.json'), JSON.stringify({ capital: 7, runs: 4, cash: 3.2, positions: [{ id: 'P-0001', mint: 'M', sym: 'OLD', sizeSOL: 0.25, cost: 0.25, entry: 0.01, tokens: 25, remaining: 1, openedAt: 1, last: null }], journal: [{ id: 'P-0000', mint: 'M', sym: 'X', openedAt: 1, closedAt: 2, cost: 0.25, back: 0.2, pnl: -0.05, pct: -20, reason: 'Stop loss', score: 80 }], signals: [{ t: 1 }], events: [], seq: 5 }));
process.env.STATE_DIR = dir; delete process.env.EXEC_TOKEN; delete process.env.TELEGRAM_BOT_TOKEN;
const R = require('../runner/runner.js');
const { S, st, rt } = R;

function world(onParams) {
  const calls = []; const real = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => { const body = init.body ? JSON.parse(init.body) : null; calls.push({ url: String(url), method: init.method || 'GET', headers: init.headers || {}, body });
    return new Response(JSON.stringify(String(url).endsWith('/params') ? onParams() : { ok: true }), { status: 200 }); };
  return { calls, restore: () => { globalThis.fetch = real; } };
}

test('all\'avvio il capitale scelto con un reset resta valido; stato letto dal file', () => {
  assert.equal(st.capital, 7); assert.equal(S.capitalSOL, 7); assert.equal(st.runs, 5); assert.equal(st.positions.length, 1);
});
test('reset approvato: azzera conto, posizioni, journal e statistiche; capitale scelto; avvisa il Worker; non si ripete', async () => {
  let rp = { id: 'C-0007', capitalSOL: 12.5, at: Date.now() };
  const w = world(() => ({ ok: true, runner: {}, resetPaper: rp }));
  try {
    process.env.EXEC_TOKEN = 'tok-runner'; rt.cfgSent = true;
    await R.pullParams();
    assert.equal(st.cash, 12.5); assert.equal(st.positions.length, 0); assert.equal(st.journal.length, 0); assert.equal(st.signals.length, 0); assert.equal(st.capital, 12.5); assert.equal(st.resetId, 'C-0007'); assert.equal(S.capitalSOL, 12.5);
    assert.equal(st.halted, null); assert.equal(st.day, null); assert.equal(st.cooldownUntil, 0); assert.equal(st.seq, 5);                // il contatore non riparte da zero (id sempre unici)
    const sum = R.publicSummary(); assert.equal(sum.capital, 12.5); assert.equal(sum.equity, 12.5); assert.equal(sum.positions.length, 0); assert.equal(sum.stats.n, 0);
    const acks = w.calls.filter((c) => c.method === 'POST' && c.url.endsWith('/runner')); assert.equal(acks.length, 1); assert.equal(acks[0].body.resetAck, 'C-0007'); assert.equal(acks[0].headers['x-app-token'], 'tok-runner');
    assert.ok(w.calls.some((c) => c.url.endsWith('/paper')), 'spinge subito il riepilogo al Worker');
    st.cash = 11; st.journal.push({ id: 'P-1', pnl: 1 });                                                                               // il conto lavora…
    await R.pullParams();                                                                                                              // …e un secondo giro con la stessa direttiva NON lo azzera
    assert.equal(st.cash, 11); assert.equal(st.journal.length, 1);
    assert.equal(w.calls.filter((c) => c.method === 'POST' && c.url.endsWith('/runner')).length, 2);                                   // solo un nuovo tentativo di avviso
  } finally { w.restore(); delete process.env.EXEC_TOKEN; }
});
test('direttive non valide, vecchie o fuori intervallo vengono ignorate', async () => {
  const before = { cash: st.cash, cap: st.capital, id: st.resetId };
  for (const rp of [{ id: 'X-1', capitalSOL: 5, at: Date.now() }, { id: 'C-0008', capitalSOL: 0.01, at: Date.now() }, { id: 'C-0008', capitalSOL: 5000, at: Date.now() }, { id: 'C-0008', capitalSOL: '5', at: Date.now() },
    { id: 'C-0008', capitalSOL: 5, at: Date.now() - 2 * 3600000 }, { id: 'C-0008', capitalSOL: 5 }, null, 'boh']) {
    const w = world(() => ({ ok: true, runner: {}, resetPaper: rp })); try { await R.pullParams(); } finally { w.restore(); }
    assert.deepEqual({ cash: st.cash, cap: st.capital, id: st.resetId }, before, JSON.stringify(rp));
  }
});
test('paper in diretta: senza token non spinge nulla; con il token spinge il riepilogo senza segreti, ma non a raffica', async () => {
  const w = world(() => ({ ok: true }));
  try {
    delete process.env.EXEC_TOKEN; await R.pushLive(true); assert.equal(w.calls.filter((c) => c.url.endsWith('/paper')).length, 0, 'senza token non spinge');
    process.env.EXEC_TOKEN = 'tok-runner'; await new Promise((r) => setTimeout(r, 1600));              // oltre la pausa minima tra due invii forzati
    await R.pushLive(true); let posts = w.calls.filter((c) => c.url.endsWith('/paper')); assert.equal(posts.length, 1);
    assert.equal(posts[0].method, 'POST'); assert.equal(posts[0].headers['x-app-token'], 'tok-runner'); assert.equal(posts[0].body.data.v, 1);
    const txt = JSON.stringify(posts[0].body); for (const bad of ['tok-runner', 'appToken', 'executorToken']) assert.ok(!txt.includes(bad), 'invia ' + bad);
    await R.pushLive(); await R.pushLive(true); assert.equal(w.calls.filter((c) => c.url.endsWith('/paper')).length, 1, 'niente raffiche');
  } finally { w.restore(); delete process.env.EXEC_TOKEN; }
});

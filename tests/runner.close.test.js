'use strict';
// Runner: chiusura di una posizione paper chiesta dall'app e approvata su Telegram.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaiser-close-'));
const pos = (id, sym) => ({ id, mint: 'M' + id, sym, sizeSOL: 0.25, cost: 0.25, entry: 0.01, tokens: 25, remaining: 1, realized: 0, fills: [], peak: 0.012, openedAt: 1, entryLiq: 100000, last: { priceNative: 0.012, liq: 100000, t: 1 } });
fs.writeFileSync(path.join(dir, 'state.json'), JSON.stringify({ capital: 1, runs: 1, cash: 0.5, seq: 5, positions: [pos('P-0001', 'AAA'), pos('P-0002', 'BBB')], journal: [], signals: [], events: [] }));
process.env.STATE_DIR = dir; delete process.env.EXEC_TOKEN; delete process.env.TELEGRAM_BOT_TOKEN;
const R = require('../runner/runner.js');
const { st } = R;

function world(close) {
  const calls = []; const real = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => { const body = init.body ? JSON.parse(init.body) : null; calls.push({ url: String(url), method: init.method || 'GET', body });
    return new Response(JSON.stringify(String(url).endsWith('/params') ? { ok: true, runner: {}, closePaper: close } : { ok: true }), { status: 200 }); };
  return { calls, restore: () => { globalThis.fetch = real; } };
}

test('chiusura dall\'app: vende a mercato la posizione indicata, la mette nel journal e avvisa il Worker; id non validi ignorati', async () => {
  const w = world(['P-0001', '../x', 'R-0001', 'P-0404']);
  try {
    process.env.EXEC_TOKEN = 'tok-runner'; R.rt.cfgSent = true;
    await R.pullParams();
    assert.deepEqual(st.positions.map((p) => p.id), ['P-0002'], 'chiusa solo la P-0001');
    assert.equal(st.journal.length, 1); assert.equal(st.journal[0].reason, 'Chiusura manuale (app)'); assert.equal(st.journal[0].id, 'P-0001'); assert.ok(st.cash > 0.5);
    const ack = w.calls.filter((c) => c.method === 'POST' && c.url.endsWith('/runner')); assert.equal(ack.length, 1); assert.deepEqual(ack[0].body.closeAck, ['P-0001', 'P-0404'], 'avvisa anche per quella già chiusa, non per gli id non validi');
    await R.pullParams(); assert.equal(st.journal.length, 1, 'una seconda lettura con la stessa direttiva non chiude altro');
  } finally { w.restore(); delete process.env.EXEC_TOKEN; }
});
test('paper in stop o spento: il runner non apre nuove posizioni (pannello di emergenza)', async () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'runner', 'runner.js'), 'utf8');
  assert.match(src, /if \(S\.paperStop \|\| S\.paperEnabled === false\) return;/);
  assert.ok(src.indexOf('await realEntries(buys)') < src.indexOf('S.paperStop || S.paperEnabled === false'), 'il reale non dipende dal paper');
  const E = require('../engine.js'); assert.equal(E.DEFAULTS.paperEnabled, true); assert.equal(E.DEFAULTS.paperStop, false);
});
test('VELOCITA: runner con controllo delle posizioni ogni 10 s, scan ogni scanSec (30), salvataggio a meta\' run', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'runner', 'runner.js'), 'utf8'), yml = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'runner.yml'), 'utf8');
  assert.match(src, /TICK_SEC \|\| 10/); assert.match(src, /SCAN_SEC \|\| 30/); assert.match(src, /Math\.max\(15, num\(S\.scanSec, SCAN_SEC\)\)/);
  assert.match(yml, /LOOP_MIN: '50'/); assert.match(yml, /CHECKPOINT: '1'/); assert.match(yml, /timeout-minutes: 62/);
  assert.equal(R.checkpointForTest === undefined, true);                                   // il salvataggio parte solo con CHECKPOINT=1 e non e' esposto
});

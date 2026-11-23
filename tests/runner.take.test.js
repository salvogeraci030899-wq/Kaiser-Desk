'use strict';
// Runner: un voto Prendo dal Worker apre subito una posizione paper con i parametri impostati; Scarto non apre nulla; i controlli del conto restano.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Semi = require('../runner/semi.js');

const M1 = 'So11111111111111111111111111111111111111112', M2 = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', M3 = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
const alert = (id, mint, sym) => ({ id, t: Date.now(), mint, sym, name: sym, score: 70, pair: '', priceNative: 0.00001, mc: 20000, liq: 15000, ageMin: 5, why: [] });
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaiser-take-'));
fs.writeFileSync(path.join(dir, 'state.json'), JSON.stringify({ capital: 6, runs: 1, cash: 6, seq: 0, positions: [], journal: [], signals: [], events: [], alerts: [alert('a0001', M1, 'AAA'), alert('a0002', M2, 'BBB'), alert('a0003', M3, 'CCC')] }));
process.env.STATE_DIR = dir; delete process.env.TELEGRAM_BOT_TOKEN; process.env.EXEC_TOKEN = 'tok'; process.env.EXEC_URL = 'https://exec.test';
const R = require('../runner/runner.js');
const { st } = R;

function world(votes, mints) {
  const calls = [], real = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url); calls.push(u);
    const J = (o) => new Response(JSON.stringify(o), { status: 200 });
    if (u.endsWith('/params')) return J({ ok: true, runner: {}, humanVotes: votes });
    if (u.includes('api.dexscreener.com')) return J(mints.map((m) => ({ pairAddress: 'P' + m.slice(0, 8), baseToken: { address: m }, quoteToken: { symbol: 'SOL' }, priceNative: '0.00001', liquidity: { usd: 30000 } })));
    if (u.includes('/swap/v1/quote')) return J({ outAmount: '5000000000', priceImpactPct: '0.01' });
    return J({ ok: true });
  };
  return { calls, restore: () => { globalThis.fetch = real; } };
}

test('Prendo apre subito una posizione paper segnata come tua; Scarto no; lo stesso voto non si ripete; stessa Coin gia\' aperta: rifiutato', async () => {
  R.rt.cfgSent = true;
  const w = world([{ id: 'a0001', v: 'y', at: Date.now() }, { id: 'a0002', v: 'n', at: Date.now() }], [M1, M2]);
  try {
    await R.pullParams();
    assert.equal(st.positions.length, 1, 'una sola posizione: il Prendo'); const p = st.positions[0];
    assert.equal(p.mint, M1); assert.equal(p.src, 'umano'); assert.deepEqual(p.ex, { tp: 10, sl: 10, holdSec: 60 }, 'uscite proprie'); assert.equal(p.aid, 'a0001', 'la posizione e\' legata all\'avviso'); assert.ok(p.cost > 0 && st.cash < 6, 'la cassa scende');
    assert.equal(st.alerts[0].vote, 'y'); assert.equal(st.alerts[1].vote, 'n');
    await R.pullParams(); assert.equal(st.positions.length, 1, 'lo stesso voto non riapre');
    st.alerts.push({ ...alert('a0004', M1, 'AAA') }); w.restore();
    const w2 = world([{ id: 'a0004', v: 'y', at: Date.now() }], [M1]); try { await R.pullParams(); } finally { w2.restore(); }
    assert.equal(st.positions.length, 1, 'stessa Coin gia\' in posizione: nessun doppione');
  } finally { w.restore(); }
});

test('Prendo arrivato dopo oltre 5 minuti non apre; con il circuit breaker attivo non apre', async () => {
  const w = world([{ id: 'a0003', v: 'y', at: Date.now() - 6 * 60000 }], [M3]);
  try { await R.pullParams(); assert.equal(st.positions.filter((p) => p.mint === M3).length, 0, 'troppo tardi'); } finally { w.restore(); }
  st.alerts.push(alert('a0005', M3, 'CCC')); st.halted = 'prova';
  const w3 = world([{ id: 'a0005', v: 'y', at: Date.now() }], [M3]);
  try { await R.pullParams(); assert.equal(st.positions.filter((p) => p.mint === M3).length, 0, 'circuit breaker'); } finally { w3.restore(); st.halted = null; }
});

test('confronto tuoi contro bot: regola decisa in anticipo sui trade chiusi', () => {
  const mk = (n, src, f) => Array.from({ length: n }, (_, i) => ({ src, pct: f(i) }));
  assert.equal(Semi.humanTrades([...mk(20, 'umano', () => 30), ...mk(100, 'bot', () => -10)]).verdict, 'in corso', 'troppo pochi');
  const bonus = Semi.humanTrades([...mk(60, 'umano', (i) => 20 + (i % 5)), ...mk(100, 'bot', (i) => -10 + (i % 3))]);
  assert.equal(bonus.verdict, 'passa'); assert.ok(bonus.diffLo > 0);
  assert.equal(Semi.humanTrades([...mk(60, 'umano', (i) => (i % 2 ? 6 : -8)), ...mk(10, 'bot', () => -5)]).verdict, 'non passa', 'media sotto il +3%');
  assert.equal(Semi.humanTrades([{ src: 'bot', pct: -5 }, { src: 'bot', pct: -7 }]).n, 0, 'i trade del bot non contano come tuoi');
});

test('un Prendo non si rifiuta per un impatto oltre lo slippage (fino al 10%); gli altri acquisti restano con il limite normale', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /const slipMax = o && o\.src === 'umano' \? num\(S\.slipInBps, 1000\) \/ 10000 : S\.slippageBps \/ 10000;/); assert.match(src, /num\(S\.slipOutBps, 1500\)/);
  assert.match(src, /if \(impact > slipMax\)/);
});

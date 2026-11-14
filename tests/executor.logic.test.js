'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
let L, S, X;
test.before(async () => { L = await import('../worker/src/lib.js'); S = await import('../worker/src/solana.js'); X = await import('../worker/src/exec.js'); });

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

// Mondo finto: Jupiter, RPC Solana, DexScreener e Telegram
function world(opts = {}) {
  const me = crypto.generateKeyPairSync('ed25519'), j = me.privateKey.export({ format: 'jwk' });
  const d = Buffer.from(j.d, 'base64url'), x = Buffer.from(j.x, 'base64url');
  const w = { lamports: opts.lamports ?? 2_000_000_000, tokens: new Map(), price: 0.01, liq: 100000, sent: [], tg: [], calls: [], simDrop: null, confirm: true, jupFail: false, evilTransfer: 0, now: 1_700_000_000_000, statusErr: null };
  w.pub = L.b58encode(x); w.JUP = L.b58encode(crypto.randomBytes(32)); w.evil = L.b58encode(crypto.randomBytes(32));
  w.env = { WALLET_SECRET_KEY: L.b58encode(Buffer.concat([d, x])), ORDERS_MODE: 'live', JUPITER_PROGRAM_ID: w.JUP, MAX_CAPITAL_SOL: '0.2', MAX_ORDER_SOL: '0.1', MAX_DAILY_LOSS_SOL: '0.1', MAX_SLIPPAGE_BPS: '300', TELEGRAM_BOT_TOKEN: 'tok', TELEGRAM_CHAT_ID: '1', ...(opts.env || {}) };
  w.pubKeyObj = crypto.createPublicKey({ key: { kty: 'OKP', crv: 'Ed25519', x: x.toString('base64url') }, format: 'jwk' });
  const mem = new Map();
  w.store = { get: async (k, dflt) => (mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : dflt), put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); } };
  let lastSwap = null;
  const ok = (o) => new Response(JSON.stringify(o), { status: 200 });
  w.fetch = async (url, init = {}) => {
    url = String(url); const body = init.body ? JSON.parse(init.body) : null; w.calls.push(url.split('?')[0].split('/').slice(-2).join('/') + (body && body.method ? ':' + body.method : ''));
    if (url.includes('api.telegram.org')) { w.tg.push(body.text); return ok({ ok: true }); }
    if (url.includes('dexscreener')) { const m = url.split('/').pop().split(',').filter((a) => w.tokens.has(a)); return ok(w.priceNone ? [] : m.map((a) => ({ baseToken: { address: a }, quoteToken: { symbol: 'SOL' }, priceNative: String(w.price), liquidity: { usd: w.liq }, txns: { m5: { buys: 10, sells: 10 } } }))); }
    if (url.includes('/swap/v1/quote')) {
      if (w.jupFail) return ok({ error: 'COULD_NOT_FIND_ANY_ROUTE' });
      const u = new URL(url), inM = u.searchParams.get('inputMint'), outM = u.searchParams.get('outputMint'), amt = BigInt(u.searchParams.get('amount'));
      const buy = inM === 'So11111111111111111111111111111111111111112', mint = buy ? outM : inM;
      const out = buy ? 5_000_000n * amt / 50_000_000n : BigInt(Math.round(Number(amt) / 1e6 * w.price * 1e9));
      lastSwap = { buy, mint, amt, out }; return ok({ outAmount: String(out), priceImpactPct: String(w.impact ?? 0.01), inAmount: String(amt) });
    }
    if (url.includes('/swap/v1/swap')) {
      const keys = [w.pub, '11111111111111111111111111111111', S.PROGRAMS.computeBudget, w.JUP, S.PROGRAMS.token, w.evil];
      const ixs = [{ prog: 2, accs: [], data: [2, 1, 0, 0, 0] }, { prog: 3, accs: [0, 4], data: [1, 2, 3] }];
      if (lastSwap.buy) ixs.unshift({ prog: 1, accs: [0, 5], data: [...u32(2), ...u64(w.evilTransfer || Number(lastSwap.amt))] });
      return ok({ swapTransaction: S.b64enc(buildTx(keys, ixs)) });
    }
    if (url.includes('solana') || url.includes('rpc')) {
      const m = body.method, r = (result) => ok({ jsonrpc: '2.0', id: 1, result });
      if (m === 'getBalance') return r({ value: w.lamports });
      if (m === 'simulateTransaction') return r({ value: { err: w.simErr || null, accounts: [{ lamports: w.lamports - (w.simDrop ?? (lastSwap.buy ? Number(lastSwap.amt) + 5000 : 5000)) }], unitsConsumed: 1000 } });
      if (m === 'sendTransaction') { const sig = 'sig' + (w.sent.length + 1) + L.b58encode(crypto.randomBytes(20)); w.sent.push({ sig, b64: body.params[0] }); w.sigOf = sig;
        if (w.confirm) { if (lastSwap.buy) { w.lamports -= Number(lastSwap.amt) + 5000; w.tokens.set(lastSwap.mint, (w.tokens.get(lastSwap.mint) || 0n) + lastSwap.out); } else { w.tokens.set(lastSwap.mint, w.tokens.get(lastSwap.mint) - lastSwap.amt); w.lamports += Number(lastSwap.out) - 5000; } }
        return r(sig); }
      if (m === 'getSignatureStatuses') return r({ value: [w.statusErr ? { err: w.statusErr } : (w.confirm ? { confirmationStatus: 'confirmed', err: null } : null)] });
      if (m === 'getTokenAccountsByOwner') { const mint = body.params[1].mint, raw = w.tokens.get(mint) || 0n; return r({ value: raw > 0n ? [{ account: { data: { parsed: { info: { tokenAmount: { amount: String(raw), decimals: 6 } } } } } }] : [] }); }
    }
    throw new Error('URL inatteso nel mondo finto: ' + url);
  };
  w.ex = () => new X.Executor({ env: w.env, store: w.store, fetch: w.fetch, now: () => w.now, sleep: async (ms) => { w.now += ms; } });
  return w;
}
const MINT = '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdX6uQXCcGdr', MINT2 = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';
const order = (o = {}) => ({ ref: 'ordine-' + Math.random().toString(36).slice(2, 10), mint: MINT, sym: 'TEST', sizeSol: 0.05, slippageBps: 300, entryLiq: 100000, ...o });
const open = async (w, ex, o) => { const r = await ex.buy(order(o)); assert.equal(r.ok, true, JSON.stringify(r)); return r.position; };

test('limiti: spento, kill switch, size, slippage, capitale, posizioni, duplicati, saldo, impatto', async () => {
  let w = world({ env: { ORDERS_MODE: 'off' } });
  assert.match((await w.ex().buy(order())).error, /disattivati/);
  w = world(); let ex = w.ex();
  await ex.kill(); assert.match((await ex.buy(order())).error, /kill switch/); await ex.resume();
  assert.match((await ex.buy(order({ ref: 'x' }))).error, /ref/);
  assert.match((await ex.buy(order({ mint: 'abc' }))).error, /mint/);
  assert.match((await ex.buy(order({ mint: 'So11111111111111111111111111111111111111112' }))).error, /mint/);
  assert.match((await ex.buy(order({ sizeSol: 0.5 }))).error, /massimo per ordine/);
  assert.match((await ex.buy(order({ sizeSol: 0 }))).error, /size/);
  assert.match((await ex.buy(order({ slippageBps: 900 }))).error, /slippage/);
  assert.match((await world({ env: { MAX_CAPITAL_SOL: '0' } }).ex().buy(order())).error, /MAX_CAPITAL_SOL/);
  w = world({ lamports: 40_000_000 }); assert.match((await w.ex().buy(order())).error, /saldo/);
  w = world(); w.impact = 0.2; assert.match((await w.ex().buy(order())).error, /impatto/);
  assert.equal(w.sent.length, 0);
  // capitale in uso: tetto 0,12 SOL, due da 0,05 entrano (0,10), la terza no
  const MINT3 = L.b58encode(crypto.randomBytes(32));
  w = world({ env: { MAX_CAPITAL_SOL: '0.12' } }); ex = w.ex();
  await open(w, ex); await open(w, ex, { mint: MINT2 });
  assert.match((await ex.buy(order({ mint: MINT3 }))).error, /capitale in uso/);
  // numero massimo di posizioni (capitale non è il limite)
  w = world({ env: { MAX_CAPITAL_SOL: '5', MAX_POSITIONS: '2' } }); ex = w.ex();
  await open(w, ex); await open(w, ex, { mint: MINT2 });
  assert.match((await ex.buy(order({ mint: MINT3 }))).error, /numero massimo/);
  assert.match((await ex.buy(order({ mint: MINT }))).error, /numero massimo|già aperta/);
});
test('idempotenza: lo stesso ref non compra due volte', async () => {
  const w = world(), ex = w.ex(), o = order();
  assert.equal((await ex.buy(o)).ok, true); const again = await ex.buy(o);
  assert.equal(again.duplicate, true); assert.equal(w.sent.length, 1);
});
test('dry-run: costruisce, controlla e simula ma NON firma né invia; salva il rapporto', async () => {
  const w = world({ env: { ORDERS_MODE: 'dryrun' } }), ex = w.ex();
  const r = await ex.buy(order()); assert.equal(r.ok, true); assert.equal(r.dryRun, true);
  assert.equal(w.sent.length, 0); assert.ok(w.calls.some((c) => c.includes('simulateTransaction')));
  assert.ok(r.report.programs.includes(w.JUP)); assert.equal((await ex.state()).lastDry.ok, true);
  assert.equal((await ex.state()).positions.length, 0);
});
test('senza JUPITER_PROGRAM_ID niente ordini, ma il rapporto elenca i programmi trovati', async () => {
  const w = world({ env: { ORDERS_MODE: 'dryrun', JUPITER_PROGRAM_ID: '' } }), r = await w.ex().buy(order());
  assert.equal(r.ok, false); assert.match(r.reasons.join(), /JUPITER_PROGRAM_ID/); assert.ok(r.programs.includes(w.JUP)); assert.equal(w.sent.length, 0);
});
test('acquisto live: firma valida, posizione con prezzo d’ingresso, messaggio Telegram, niente doppioni', async () => {
  const w = world(), ex = w.ex(), p = await open(w, ex);
  assert.equal(w.sent.length, 1);
  const parsed = S.parseTx(S.b64dec(w.sent[0].b64)), sig = S.b64dec(w.sent[0].b64).slice(parsed.sigStart, parsed.sigStart + 64);
  assert.equal(crypto.verify(null, Buffer.from(parsed.msgBytes), w.pubKeyObj, Buffer.from(sig)), true);
  assert.equal(p.mint, MINT); assert.equal(p.tokensRaw, '5000000'); assert.equal(p.decimals, 6);
  assert.ok(Math.abs(p.entry - 0.0100010) < 1e-6, 'entry ' + p.entry); assert.ok(p.costSol >= 0.05);
  assert.match(w.tg[0], /ACQUISTO REALE/); assert.ok(!w.tg.join().includes(w.env.WALLET_SECRET_KEY));
  assert.match((await w.ex().buy(order())).error, /già aperta/);
});
test('ATTACCO: transazione che sposta troppi SOL, o simulazione che svuota il wallet, non viene mai inviata', async () => {
  let w = world(); w.evilTransfer = 5_000_000_000; let r = await w.ex().buy(order());
  assert.equal(r.ok, false); assert.match(r.reasons.join(), /troppo grande/); assert.equal(w.sent.length, 0);
  w = world(); w.simDrop = 1_500_000_000; r = await w.ex().buy(order());
  assert.equal(r.ok, false); assert.match(r.reasons.join(), /sposta/); assert.equal(w.sent.length, 0);
  w = world(); w.simErr = { InstructionError: [0, 'Custom'] }; r = await w.ex().buy(order());
  assert.match(r.reasons.join(), /simulazione fallita/); assert.equal(w.sent.length, 0);
});
test('Charon: stop loss vende tutto, registra il journal e avvisa; il kill switch non blocca le uscite', async () => {
  const w = world(), ex = w.ex(); const p = await open(w, ex);
  await ex.kill(); w.price = p.entry * 0.7;
  const r = await ex.tick(); assert.equal(r.sold, 1);
  const s = await ex.state(); assert.equal(s.positions.length, 0); assert.equal(s.journal.length, 1);
  assert.equal(s.journal[0].reason, 'Stop loss'); assert.ok(s.journal[0].pnl < 0 && s.journal[0].mode === 'real');
  assert.match(w.tg.at(-1), /CHIUSA.*Stop loss/); assert.equal((w.tokens.get(MINT) || 0n), 0n);
});
test('Charon: TP1 vende la quota, poi trailing sul resto; le uscite funzionano anche con ORDERS_MODE=off', async () => {
  const w = world(), ex = w.ex(), p = await open(w, ex);
  w.price = p.entry * 1.5; await ex.tick();
  let s = await ex.state(); assert.equal(s.positions.length, 1); assert.equal(s.positions[0].tp1Done, true);
  assert.equal(w.tokens.get(MINT), 2_500_000n);
  w.env.ORDERS_MODE = 'off'; w.price = p.entry * 2; await ex.tick(); w.price = p.entry * 1.5; await ex.tick();   // picco 2.0, poi -25%: trailing 20%
  s = await ex.state(); assert.equal(s.positions.length, 0); assert.equal(s.journal.at(-1).reason, 'Trailing stop'); assert.ok(s.journal.at(-1).pnl > 0);
});
test('Charon: crollo della liquidità = uscita d’emergenza; senza prezzo non fa nulla', async () => {
  let w = world(), ex = w.ex(); let p = await open(w, ex); w.priceNone = true; assert.equal((await ex.tick()).checked, 0); w.priceNone = false;
  w.price = p.entry; w.liq = 40000; await ex.tick(); assert.equal((await ex.state()).journal.at(-1).reason, 'RUG-EXIT liquidità');
});
test('uscita fallita: la posizione resta, si riprova e si avvisa', async () => {
  const w = world(), ex = w.ex(), p = await open(w, ex); w.price = p.entry * 0.5; w.jupFail = true;
  await ex.tick(); let s = await ex.state(); assert.equal(s.positions.length, 1); assert.equal(s.positions[0].fails, 1); assert.match(w.tg.at(-1), /USCITA REALE FALLITA/);
  w.jupFail = false; await ex.tick(); s = await ex.state(); assert.equal(s.positions.length, 0);
});
test('perdita giornaliera: dopo il limite niente nuovi ingressi', async () => {
  const w = world({ env: { MAX_DAILY_LOSS_SOL: '0.01' } }), ex = w.ex(), p = await open(w, ex);
  w.price = p.entry * 0.6; await ex.tick();
  assert.match((await ex.buy(order({ mint: MINT2 }))).error, /perdita giornaliera/);
});
test('conferma in ritardo: ordine pendente, poi la posizione si apre al giro successivo', async () => {
  const w = world(); w.confirm = false; const ex = w.ex(), r = await ex.buy(order());
  assert.equal(r.pending, true); assert.equal((await ex.state()).pending.length, 1); assert.equal((await ex.state()).positions.length, 0);
  w.confirm = true; w.tokens.set(MINT, 5_000_000n); w.lamports -= 50_005_000; await ex.tick();
  const s = await ex.state(); assert.equal(s.pending.length, 0); assert.equal(s.positions.length, 1);
});
test('parametri: clamp lato server (stop mai oltre 60%, mai sotto 5%)', () => {
  assert.equal(X.clampParams({ sl: 99 }).sl, 60); assert.equal(X.clampParams({ sl: 0 }).sl, 5); assert.equal(X.clampParams({}).sl, 25); assert.equal(X.clampParams({ trail: 'x' }).trail, 20);
});
test('stato e salute: gli ordini risultano abilitati solo in live e con il programma Jupiter configurato', async () => {
  const w = world(), h = await w.ex().health();
  assert.equal(h.ok, true); assert.equal(h.wallet, w.pub); assert.equal(h.balanceSOL, 2); assert.equal(h.ordersEnabled, true); assert.equal(h.mode, 'live');
  assert.equal((await world({ env: { JUPITER_PROGRAM_ID: '' } }).ex().health()).ordersEnabled, false);
  assert.equal((await world({ env: { ORDERS_MODE: 'dryrun' } }).ex().health()).ordersEnabled, false);
  assert.equal((await world({ env: { ORDERS_MODE: 'boh' } }).ex().health()).mode, 'off');
});

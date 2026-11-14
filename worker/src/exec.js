// KAISER · esecutore (fase 3): ordini veri tramite Jupiter, uscite di Charon, limiti e kill switch.
// Logica pura con dipendenze iniettate (store, fetch, orologio): si prova in Node e gira dentro un Durable Object.
// Modi (ORDERS_MODE): off = nessun nuovo ordine | dryrun = costruisce, controlla e SIMULA, non firma né invia | live = ordini veri.
// Le uscite delle posizioni aperte funzionano in ogni modo (mai lasciare una posizione senza stop). Il kill switch ferma solo i nuovi ingressi.
import E from '../../engine.js';
import { walletAddress, num, limitsFrom } from './lib.js';
import { parseTx, guardTx, signTx, b64enc, b64dec } from './solana.js';
import { SCHEMA, GROUPS, validate, diffText, defaults as paramDefaults } from './params.js';

export const SOL = 'So11111111111111111111111111111111111111112';
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const RESERVE = 10_000_000;            // 0,01 SOL: margine per commissioni e rent degli account
// Pannello di emergenza: azioni dell'app. 'confirm' = anche con l'approvazione disattivata passa sempre dal tasto su Telegram (accende il reale).
const PANEL = {
  close_all:    { label: 'Chiudi tutte le posizioni',        text: 'vendita a mercato di TUTTE le posizioni, paper e reale' },
  close_profit: { label: 'Chiudi le posizioni in profitto',  text: 'vendita a mercato delle posizioni in profitto, paper e reale' },
  close_loss:   { label: 'Chiudi le posizioni in perdita',   text: 'vendita a mercato delle posizioni in perdita, paper e reale' },
  real_stop:    { label: 'Reale Stop',     text: 'kill switch: nessun nuovo ingresso reale (le uscite restano attive)' },
  paper_stop:   { label: 'Paper Stop',     text: 'il paper non apre nuove posizioni (quelle aperte restano gestite)' },
  off_all:      { label: 'Disattiva tutto', text: 'ingressi fermi e spenti per reale e paper, autopilota spento (le posizioni aperte restano gestite)' },
  real_off:     { label: 'Disattiva Reale', text: 'il runner non invia più ordini reali (le posizioni aperte restano gestite)' },
  paper_off:    { label: 'Disattiva Paper', text: 'il paper non apre nuove posizioni (quelle aperte restano gestite)' },
  real_on:      { label: 'Attiva Reale',    text: 'riabilita gli ingressi reali, spegne il kill switch e riaccende l\'autopilota. SOLDI VERI', confirm: true },
  paper_on:     { label: 'Attiva Paper',    text: 'riabilita i nuovi ingressi paper e riaccende l\'autopilota' },
};
// Scudo: valori di base (si cambiano dall'app, Reale > Scudo, con approvazione su Telegram)
const SHIELD = { shieldOn: false, shieldSl: 25, shieldTp1: 40, shieldTp1Sell: 50, shieldTrail: 20, shieldBe: true, shieldTimeStop: 360, shieldTimeStopPnl: 0, shieldRugDrop: 45, shieldSellPressure: false, shieldMinSol: 0.02 };
const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', TOKEN_2022 = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
// Mai adottati dallo Scudo: stabili e token "blu chip" (uno stop sul prezzo in SOL venderebbe i tuoi USDC se SOL sale)
const SHIELD_SKIP = new Set(['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', 'So11111111111111111111111111111111111111112', 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1', 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263']);
const MAX_SELLS_PER_TICK = 2;
const MAX_ATTEMPTS_PER_RUN = 5;        // tentativi di vendita totali per invocazione (il piano gratuito concede 50 richieste esterne: ~9 per tentativo)          // limite di richieste esterne per invocazione (piano gratuito)

export function clampParams(p = {}) {
  const n = (v, lo, hi, d) => Math.min(hi, Math.max(lo, num(v, d)));
  return { sl: n(p.sl, 5, 60, 25), tp1: n(p.tp1, 5, 1000, 40), tp1Sell: n(p.tp1Sell, 10, 100, 50), trail: n(p.trail, 5, 60, 20), beAfterTp1: p.beAfterTp1 !== false,
    timeStopMin: n(p.timeStopMin, 5, 720, 45), timeStopMinPnl: n(p.timeStopMinPnl, -50, 100, 5), rugLiqDrop: n(p.rugLiqDrop, 10, 90, 45), sellPressure: p.sellPressure !== false };
}
const today = (t) => new Date(t).toISOString().slice(0, 10);

export class Executor {
  constructor({ env, store, fetch: f, now, sleep }) {
    this.env = env; this.store = store;
    this.f = f || ((u, i) => fetch(u, i));
    this.now = now || (() => Date.now());
    this.sleep = sleep || ((ms) => new Promise((r) => setTimeout(r, ms)));
    this.chain = Promise.resolve(); this._wallet = null;
  }
  run(fn) { const w = async () => { await this.refreshOv(); this._attempts = 0; return fn(); }; const p = this.chain.then(w, w); this.chain = p.catch(() => {}); return p; }   // un'operazione alla volta
  // ---- SCUDO: protegge i token comprati a mano con il wallet dell'esecutore ----
  shieldCfg() {
    const ov = this.ov || {}, out = {};
    for (const [k, d] of Object.entries(SHIELD)) out[k] = typeof ov[k] === typeof d && (typeof d !== 'number' || Number.isFinite(ov[k])) ? ov[k] : d;
    return out;
  }
  async walletTokens() {
    const w = await this.wallet(), by = new Map();
    for (const programId of [TOKEN_PROGRAM, TOKEN_2022]) {
      const r = await this.rpc('getTokenAccountsByOwner', [w, { programId }, { encoding: 'jsonParsed', commitment: 'confirmed' }]);
      for (const a of (r && r.value) || []) {
        const i = a.account && a.account.data && a.account.data.parsed && a.account.data.parsed.info; if (!i || !i.mint || !i.tokenAmount) continue;
        const cur = by.get(i.mint) || { mint: i.mint, raw: 0n, decimals: i.tokenAmount.decimals }; cur.raw += BigInt(i.tokenAmount.amount || '0'); by.set(i.mint, cur);
      }
    }
    return [...by.values()].filter((t) => t.raw > 0n);
  }
  async _shieldScan() {
    const cfg = this.shieldCfg(), base = await this.store.get('shieldBase', null), now = this.now();
    if (!cfg.shieldOn) { if (base) { await this.store.put('shieldBase', null); await this.store.put('shieldInfo', null); } return; }
    if (!this.env.WALLET_SECRET_KEY) return;
    let tokens; try { tokens = await this.walletTokens(); } catch (e) { await this.store.put('shieldInfo', { at: now, err: String(e.message).slice(0, 120) }); return; }
    if (!base) {                                         // all'accensione: fotografia dei token già presenti, che lo Scudo non tocca mai
      await this.store.put('shieldBase', { at: now, mints: tokens.map((t) => t.mint) });
      await this.store.put('shieldInfo', { at: now, ignored: tokens.length });
      await this.notify(`Scudo acceso: ignoro i ${tokens.length} token già presenti nel wallet. Proteggo solo quelli che compri da ora (stop −${cfg.shieldSl}%, TP1 +${cfg.shieldTp1}%).${this.mode() === 'live' ? '' : '\nATTENZIONE: ORDERS_MODE non è live, quindi per ora ti avviso soltanto.'}`);
      return;
    }
    const positions = await this.store.get('positions', []), pending = await this.store.get('pending', []), done = await this.store.get('shieldDone', {});
    const known = new Set([...base.mints, ...positions.map((p) => p.mint), ...pending.map((p) => p.mint), ...SHIELD_SKIP]);
    const fresh = tokens.filter((t) => !known.has(t.mint) && !(done[t.mint] && now - done[t.mint] < 180000));
    await this.store.put('shieldInfo', { at: now, ignored: base.mints.length, fresh: fresh.length });
    if (!fresh.length) return;
    const px = await this.prices(fresh.map((t) => t.mint)), noted = await this.store.get('shieldNoted', {}), wait = await this.store.get('shieldWait', {}); let changed = false;
    for (const t of fresh.slice(0, 5)) {
      const m = px.get(t.mint);
      if (!m || !(m.priceNative > 0)) { wait[t.mint] = wait[t.mint] || now; changed = true; if (now - wait[t.mint] > 120000 && !noted[t.mint + ':np']) { noted[t.mint + ':np'] = now; await this.notify(`Scudo: nel wallet è comparso ${t.mint.slice(0, 6)}… ma non riesco a leggerne il prezzo (non ancora su DexScreener): nessuna protezione per ora.`); } continue; }
      if (m.mcap > 20_000_000) continue;                   // non un memecoin giovane: non si protegge
      const value = Number(t.raw) / 10 ** t.decimals * m.priceNative; if (value < cfg.shieldMinSol) continue;
      const sym = (m.sym || t.mint.slice(0, 6)).slice(0, 20), entry = m.priceNative, lv = (pct) => (entry * (1 + pct / 100)).toPrecision(4);
      if (this.mode() !== 'live') {                        // prova: nessuna posizione registrata, solo un avviso (una volta per token)
        if (!noted[t.mint]) { noted[t.mint] = now; changed = true; await this.notify(`Scudo (prova): rilevato ${sym}, ${value.toFixed(4)} SOL a ${entry.toPrecision(4)}. Con ORDERS_MODE=live lo proteggerei: stop a ${lv(-cfg.shieldSl)} (−${cfg.shieldSl}%), TP1 a ${lv(cfg.shieldTp1)} (+${cfg.shieldTp1}%).`); }
        continue;
      }
      const seq = (await this.store.get('seq', 0)) + 1; await this.store.put('seq', seq);
      const params = clampParams({ sl: cfg.shieldSl, tp1: cfg.shieldTp1, tp1Sell: cfg.shieldTp1Sell, trail: cfg.shieldTrail, beAfterTp1: cfg.shieldBe, timeStopMin: cfg.shieldTimeStop, timeStopMinPnl: cfg.shieldTimeStopPnl, rugLiqDrop: cfg.shieldRugDrop, sellPressure: cfg.shieldSellPressure });
      const pos = { id: 'R-' + String(seq).padStart(4, '0'), source: 'scudo', mint: t.mint, sym, openedAt: now, costSol: value, tokensRaw: String(t.raw), decimals: t.decimals, entry, peak: entry,
        tp1Done: false, spDone: false, entryLiq: m.liq, params, realized: 0, sigs: [], fails: 0, persistedAt: now };
      const ps = await this.store.get('positions', []); ps.push(pos); await this.store.put('positions', ps); delete wait[t.mint]; changed = true;
      await this.notify(`SCUDO: protetto ${sym} (${pos.id}) · ${value.toFixed(4)} SOL a ${entry.toPrecision(4)}\nStop −${params.sl}% (${lv(-params.sl)}) · TP1 +${params.tp1}% (${lv(params.tp1)}) vendendo ${params.tp1Sell}%, poi trailing −${params.trail}%\nL'ingresso è il prezzo di quando l'ho visto (circa 10 secondi dopo il tuo acquisto).`);
    }
    if (changed) { await this.store.put('shieldNoted', Object.fromEntries(Object.entries(noted).slice(-60))); await this.store.put('shieldWait', wait); }
  }
  shieldSet(on) { return this.run(async () => { await this._setOv({ shieldOn: !!on }); await this.notify(`Scudo ${on ? 'acceso' : 'spento'} dalla chat. ${on ? 'Da ora proteggo i token che compri a mano.' : 'Le posizioni già adottate restano gestite fino alla chiusura.'}`); return { ok: true, on: !!on }; }); }
  mode() { return ['off', 'dryrun', 'live'].includes(this.env.ORDERS_MODE) ? this.env.ORDERS_MODE : 'off'; }
  // Tetti dalla dashboard di Cloudflare (variabili d'ambiente): l'app può solo restare sotto questi valori, mai sopra.
  ceilings() { const e = this.env; return { maxCapitalSOL: num(e.MAX_CAPITAL_SOL), maxOrderSOL: num(e.MAX_ORDER_SOL, 0.05), maxDailyLossSOL: num(e.MAX_DAILY_LOSS_SOL, 0.1), maxSlippageBps: num(e.MAX_SLIPPAGE_BPS, 300), maxPositions: num(e.MAX_POSITIONS, 3), maxImpactPct: num(e.MAX_IMPACT_PCT, 5) }; }
  limits() {
    const c = this.ceilings(), ov = this.ov || {}, out = { ...c };
    for (const k of Object.keys(c)) if (typeof ov[k] === 'number') out[k] = Math.min(c[k], ov[k]);
    return { ...out, exitSlippageBps: num(this.env.EXIT_SLIPPAGE_BPS, 1500) };
  }
  async refreshOv() { try { this.ov = (await this.store.get('params', {})) || {}; } catch { this.ov = {}; } }
  extraPrograms() { return String(this.env.ALLOWED_PROGRAMS || '').split(',').map((s) => s.trim()).filter(Boolean); }

  // ---- rete ----
  async json(url, init, what) {
    const r = await this.f(url, init);
    if (!r.ok) throw new Error(what + ' HTTP ' + r.status);
    return r.json();
  }
  async rpc(method, params) {
    const d = await this.json(this.env.RPC_URL || 'https://api.mainnet-beta.solana.com', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) }, 'RPC ' + method);
    if (d.error) throw new Error('RPC ' + method + ': ' + (d.error.message || 'errore'));
    return d.result;
  }
  async wallet() { return this._wallet || (this._wallet = await walletAddress(this.env.WALLET_SECRET_KEY)); }
  async lamports() { return num((await this.rpc('getBalance', [await this.wallet(), { commitment: 'confirmed' }])).value); }
  async tokenBalance(mint) {
    const r = await this.rpc('getTokenAccountsByOwner', [await this.wallet(), { mint }, { encoding: 'jsonParsed', commitment: 'confirmed' }]);
    let raw = 0n, decimals = null;
    for (const a of (r && r.value) || []) { const t = a.account.data.parsed.info.tokenAmount; raw += BigInt(t.amount); decimals = t.decimals; }
    return { raw, decimals };
  }
  async quote(inMint, outMint, amount, slippageBps) {
    const q = await this.json(`${this.env.JUP_URL || 'https://lite-api.jup.ag'}/swap/v1/quote?inputMint=${inMint}&outputMint=${outMint}&amount=${amount}&slippageBps=${slippageBps}&restrictIntermediateTokens=true`, {}, 'Jupiter quote');
    if (!q || !q.outAmount || q.error) throw new Error('nessuna rotta Jupiter' + (q && q.error ? ': ' + q.error : ''));
    return q;
  }
  async swapTx(quote) {
    const d = await this.json(`${this.env.JUP_URL || 'https://lite-api.jup.ag'}/swap/v1/swap`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quoteResponse: quote, userPublicKey: await this.wallet(), wrapAndUnwrapSol: true, dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: { priorityLevelWithMaxLamports: { maxLamports: num(this.env.MAX_PRIORITY_LAMPORTS, 1_000_000), priorityLevel: 'high' } } }) }, 'Jupiter swap');
    if (!d || !d.swapTransaction) throw new Error('Jupiter non ha restituito la transazione');
    return b64dec(d.swapTransaction);
  }
  async notify(text, markup) {
    const { TELEGRAM_BOT_TOKEN: t, TELEGRAM_CHAT_ID: c } = this.env; if (!t || !c) return;
    try { await this.f(`https://api.telegram.org/bot${t}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: c, text, disable_web_page_preview: true, ...(markup ? { reply_markup: markup } : {}) }) }); } catch { /* i messaggi non devono mai bloccare un ordine */ }
  }

  // ---- controllo e simulazione: una transazione di un servizio esterno non si firma alla cieca ----
  async prepare(bytes, { maxOutLamports, maxTransferLamports, preLamports }) {
    const parsed = parseTx(bytes), wallet = await this.wallet();
    const programs = [...new Set(parsed.ixs.map((ix) => parsed.keys[ix.programIdx]).filter(Boolean))];
    const reasons = guardTx(parsed, { wallet, jupiterProgram: this.env.JUPITER_PROGRAM_ID, extraPrograms: this.extraPrograms(), maxTransferLamports });
    if (reasons.length) return { ok: false, reasons, programs };
    const sim = await this.rpc('simulateTransaction', [b64enc(bytes), { encoding: 'base64', sigVerify: false, replaceRecentBlockhash: true, commitment: 'confirmed', accounts: { encoding: 'base64', addresses: [wallet] } }]);
    const v = sim && sim.value;
    if (!v) return { ok: false, reasons: ['simulazione senza risposta'], programs };
    if (v.err) return { ok: false, reasons: ['simulazione fallita: ' + JSON.stringify(v.err)], programs };
    const post = v.accounts && v.accounts[0] && v.accounts[0].lamports;
    if (post == null) return { ok: false, reasons: ['saldo simulato non disponibile'], programs };
    const drop = preLamports - num(post);
    if (drop > maxOutLamports) return { ok: false, reasons: [`la simulazione sposta ${(drop / 1e9).toFixed(4)} SOL, oltre il massimo ${(maxOutLamports / 1e9).toFixed(4)}`], programs };
    return { ok: true, bytes, parsed, programs, simDropLamports: drop, units: v.unitsConsumed };
  }
  async sendAndConfirm(tx) {
    const sig = await this.rpc('sendTransaction', [b64enc(tx), { encoding: 'base64', skipPreflight: false, preflightCommitment: 'confirmed', maxRetries: 3 }]);
    const until = this.now() + num(this.env.CONFIRM_MS, 20000);
    for (;;) {
      const st = await this.rpc('getSignatureStatuses', [[sig], { searchTransactionHistory: true }]);
      const s = st && st.value && st.value[0];
      if (s && s.err) throw new Error('transazione fallita on-chain: ' + JSON.stringify(s.err));
      if (s && (s.confirmationStatus === 'confirmed' || s.confirmationStatus === 'finalized')) return { sig, status: 'confirmed' };
      if (this.now() >= until) return { sig, status: 'pending' };
      await this.sleep(2000);
    }
  }

  // ---- ingresso ----
  buy(req) { return this.run(() => this._buy(req || {})); }
  async _buy(req) {
    const mode = this.mode(), lim = this.limits(), fail = (error, extra) => ({ ok: false, error, ...extra });
    if (mode === 'off') return fail('ordini disattivati nell’esecutore (ORDERS_MODE=off)');
    if (await this.store.get('killed', false)) return fail('kill switch attivo: nuovi ordini fermi');
    const ref = String(req.ref || ''); if (!/^[\w.-]{6,64}$/.test(ref)) return fail('ref mancante o non valido');
    const refs = await this.store.get('refs', {}); if (refs[ref]) return { ok: true, duplicate: true, ...refs[ref] };
    const mint = String(req.mint || ''); if (!MINT_RE.test(mint) || mint === SOL) return fail('mint non valido');
    const size = num(req.sizeSol), slip = num(req.slippageBps, lim.maxSlippageBps);
    if (!(size > 0)) return fail('size non valida');
    if (size > lim.maxOrderSOL) return fail(`size ${size} SOL oltre il massimo per ordine (${lim.maxOrderSOL})`);
    if (!(slip >= 1) || slip > lim.maxSlippageBps) return fail(`slippage oltre il massimo (${lim.maxSlippageBps} bps)`);
    if (!(lim.maxCapitalSOL > 0)) return fail('MAX_CAPITAL_SOL è 0: capitale reale non autorizzato nell’esecutore');
    const positions = await this.store.get('positions', []), pending = await this.store.get('pending', []), journal = await this.store.get('journal', []);
    const exposure = [...positions, ...pending].reduce((a, p) => a + num(p.costSol), 0);
    if (exposure + size > lim.maxCapitalSOL + 1e-9) return fail(`capitale in uso ${exposure.toFixed(3)} + ${size} oltre il massimo ${lim.maxCapitalSOL} SOL`);
    if (positions.length + pending.length >= lim.maxPositions) return fail('numero massimo di posizioni raggiunto');
    if ([...positions, ...pending].some((p) => p.mint === mint)) return fail('posizione già aperta su questo token');
    if (this.dayPnl(journal) <= -lim.maxDailyLossSOL) return fail(`perdita giornaliera oltre il limite (${lim.maxDailyLossSOL} SOL): nuovi ingressi fermi fino a domani`);
    const sizeLam = Math.round(size * 1e9), pre = await this.lamports();
    if (pre < sizeLam + RESERVE) return fail('saldo del wallet insufficiente');
    const q = await this.quote(SOL, mint, sizeLam, slip);
    const impactPct = num(q.priceImpactPct) * 100;
    if (impactPct > lim.maxImpactPct) return fail(`impatto ${impactPct.toFixed(1)}% oltre il massimo (${lim.maxImpactPct}%)`);
    const prep = await this.prepare(await this.swapTx(q), { maxOutLamports: sizeLam + RESERVE, maxTransferLamports: sizeLam + 5_000_000, preLamports: pre });
    if (!prep.ok) { await this.store.put('lastDry', { at: this.now(), side: 'buy', ok: false, mint, reasons: prep.reasons, programs: prep.programs }); return fail('transazione non ammessa', { reasons: prep.reasons, programs: prep.programs }); }
    const report = { mint, sizeSol: size, outAmount: String(q.outAmount), impactPct: +impactPct.toFixed(3), simDropSol: +(prep.simDropLamports / 1e9).toFixed(6), instructions: prep.parsed.ixs.length, programs: prep.programs, units: prep.units };
    if (mode === 'dryrun' || req.dryRun) { await this.store.put('lastDry', { at: this.now(), side: 'buy', ok: true, ...report }); return { ok: true, dryRun: true, report }; }
    const signed = await signTx(prep.bytes, this.env.WALLET_SECRET_KEY);
    const sent = await this.sendAndConfirm(signed.tx);
    const ctx = { ref, mint, sym: String(req.sym || '').slice(0, 20), sizeSol: size, params: clampParams(req.params), entryLiq: num(req.entryLiq), sig: sent.sig, pre, quoteOut: String(q.outAmount), at: this.now() };
    refs[ref] = { signature: sent.sig, at: ctx.at }; await this.store.put('refs', Object.fromEntries(Object.entries(refs).slice(-200)));
    if (sent.status === 'pending') {
      pending.push({ ...ctx, kind: 'buy', costSol: size }); await this.store.put('pending', pending);
      await this.notify(`Acquisto reale inviato, non ancora confermato: $${ctx.sym || mint.slice(0, 6)} ${size} SOL\nhttps://solscan.io/tx/${sent.sig}`);
      return { ok: true, pending: true, signature: sent.sig };
    }
    const pos = await this.openPosition(ctx);
    return { ok: true, signature: sent.sig, position: pos };
  }
  async openPosition(ctx) {
    let tb = { raw: 0n, decimals: null };
    for (let i = 0; i < 3 && tb.raw === 0n; i++) { try { tb = await this.tokenBalance(ctx.mint); } catch { /* si riprova */ } if (tb.raw === 0n) await this.sleep(1000); }
    let post = ctx.pre; try { post = await this.lamports(); } catch { /* costo = size */ }
    const costSol = Math.max(ctx.sizeSol, (ctx.pre - post) / 1e9);
    const raw = tb.raw > 0n ? tb.raw : BigInt(ctx.quoteOut);
    const entry = tb.decimals != null ? costSol / (Number(raw) / 10 ** tb.decimals) : 0;
    const seq = (await this.store.get('seq', 0)) + 1; await this.store.put('seq', seq);
    const pos = { id: 'R-' + String(seq).padStart(4, '0'), mint: ctx.mint, sym: ctx.sym, openedAt: ctx.at, costSol, tokensRaw: String(raw), decimals: tb.decimals, entry, peak: entry,
      tp1Done: false, spDone: false, entryLiq: ctx.entryLiq, params: ctx.params, realized: 0, sigs: [ctx.sig], fails: 0, persistedAt: this.now() };
    const positions = await this.store.get('positions', []); positions.push(pos); await this.store.put('positions', positions);
    await this.notify(`ACQUISTO REALE $${pos.sym || pos.mint.slice(0, 6)} ${costSol.toFixed(4)} SOL\n${pos.id} · stop −${pos.params.sl}% · TP1 +${pos.params.tp1}%\nhttps://solscan.io/tx/${ctx.sig}`);
    return pos;
  }

  // ---- ticket di approvazione: il runner propone, tu approvi dall'app (anche se il runner lavora con l'app chiusa) ----
  ticket(req) { return this.run(() => this._ticket(req || {})); }
  async _ticket(req) {
    if (this.mode() === 'off') return { ok: false, error: 'ordini disattivati nell’esecutore (ORDERS_MODE=off)' };
    if (await this.store.get('killed', false)) return { ok: false, error: 'kill switch attivo' };
    const mint = String(req.mint || ''); if (!MINT_RE.test(mint) || mint === SOL) return { ok: false, error: 'mint non valido' };
    const size = num(req.sizeSol); if (!(size > 0)) return { ok: false, error: 'size non valida' };
    const now = this.now(), tickets = (await this.store.get('tickets', [])).filter((t) => t.exp > now);
    if (tickets.some((t) => t.mint === mint)) return { ok: true, duplicate: true };
    const seq = (await this.store.get('tseq', 0)) + 1; await this.store.put('tseq', seq);
    const t = { id: 'T-' + String(seq).padStart(4, '0'), mint, sym: String(req.sym || '').slice(0, 20), score: num(req.score), sizeSol: size, slippageBps: num(req.slippageBps, this.limits().maxSlippageBps), params: clampParams(req.params), entryLiq: num(req.entryLiq), at: now, exp: now + 10 * 60000 };
    tickets.push(t); await this.store.put('tickets', tickets.slice(-10));
    await this.notify(`Ticket ${t.id}: $${t.sym || mint.slice(0, 6)} score ${t.score} · ${size} SOL\nStop −${t.params.sl}% · TP1 +${t.params.tp1}% · trailing −${t.params.trail}%\nApprova o rifiuta qui sotto entro 10 minuti.`,
      { inline_keyboard: [[{ text: 'Approva', callback_data: 'ap:' + t.id }, { text: 'Rifiuta', callback_data: 'rj:' + t.id }]] });
    return { ok: true, ticket: t };
  }
  approve(id) {
    return this.run(async () => {
      const now = this.now(), tickets = await this.store.get('tickets', []), t = tickets.find((x) => x.id === id);
      if (!t) return { ok: false, error: 'ticket non trovato' };
      await this.store.put('tickets', tickets.filter((x) => x.id !== id));
      if (t.exp <= now) return { ok: false, error: 'ticket scaduto' };
      return this._buy({ ref: 'tk-' + t.id + '-' + t.at, mint: t.mint, sym: t.sym, sizeSol: t.sizeSol, slippageBps: t.slippageBps, params: t.params, entryLiq: t.entryLiq });
    });
  }
  reject(id) { return this.run(async () => { const ts = await this.store.get('tickets', []); await this.store.put('tickets', ts.filter((x) => x.id !== id)); return { ok: true }; }); }

  // ---- uscita ----
  sell(id, frac, reason) { return this.run(async () => { const ps = await this.store.get('positions', []); const p = ps.find((x) => x.id === id); if (!p) return { ok: false, error: 'posizione non trovata' }; return this._sell(p, num(frac, 1), reason || 'Manuale'); }); }
  // Vendita con riprova IMMEDIATA: se un tentativo fallisce (RPC, blockhash scaduto, slippage superato...) se ne fa subito un altro con una quotazione nuova
  // e tolleranza di slippage crescente (prima EXIT_SLIPPAGE_BPS, poi x1,6, poi fino a EXIT_RETRY_SLIPPAGE_BPS), entro il budget di richieste dell'invocazione.
  // Se non basta, un nuovo giro parte dopo 2 secondi (fastRetry) senza aspettare il prossimo controllo.
  async _sell(p, frac, reason) {
    const lim = this.limits(), top = Math.max(lim.exitSlippageBps, num(this.env.EXIT_RETRY_SLIPPAGE_BPS, 4000));
    const steps = [lim.exitSlippageBps, Math.min(top, Math.round(lim.exitSlippageBps * 1.6)), top]; let last = null; const ctx = { startRaw: null };   // ctx: saldo iniziale, per non vendere due volte la stessa quota
    for (let i = 0; i < steps.length; i++) {
      if (i > 0 && (this._attempts || 0) >= MAX_ATTEMPTS_PER_RUN) break;
      this._attempts = (this._attempts || 0) + 1;
      try {
        const r = await this._sellOnce(p, frac, reason, steps[i], ctx);
        if (i > 0 && r && r.ok) await this.notify(`Vendita riuscita al tentativo ${i + 1} (slippage ${steps[i] / 100}%): ${p.id} $${p.sym}`);
        return r;
      } catch (err) { last = err; if (i < steps.length - 1) await this.sleep(1000); }
    }
    p.fails = num(p.fails) + 1; this.fastRetry = true;
    const ps = await this.store.get('positions', []); await this.store.put('positions', ps.map((x) => (x.id === p.id ? p : x)));
    if (p.fails === 1 || p.fails % 5 === 0) await this.notify(`USCITA REALE FALLITA (${p.fails}) ${p.id} $${p.sym}: ${last && last.message}\nHo già riprovato subito con slippage fino a ${top / 100}%. Riprovo di nuovo tra pochi secondi. Se persiste, vendi a mano dal wallet.`);
    return { ok: false, error: last && last.message };
  }
  async _sellOnce(p, frac, reason, slippageBps, ctx) {
    {
      let tb = await this.tokenBalance(p.mint);
      if (tb.raw === 0n) return this.closePosition(p, 'chiusa fuori dall’esecutore', null);
      if (!ctx.startRaw) ctx.startRaw = tb.raw;
      // quota da vendere: la frazione del saldo di PARTENZA meno quanto è già stato venduto in un tentativo precedente (un invio può partire anche se l'RPC risponde un errore)
      const amount = frac >= 0.999 ? tb.raw : (ctx.startRaw * BigInt(Math.round(frac * 10000))) / 10000n - (ctx.startRaw - tb.raw);
      if (amount <= 0n && ctx.startRaw !== tb.raw) {      // la vendita parziale è già avvenuta al tentativo precedente
        p.tokensRaw = tb.raw.toString(); const ps0 = await this.store.get('positions', []); await this.store.put('positions', ps0.map((x) => (x.id === p.id ? p : x)));
        return { ok: true, partial: true, already: true };
      }
      if (amount === 0n) return this.closePosition(p, reason, null);
      const pre = await this.lamports();
      const q = await this.quote(p.mint, SOL, amount.toString(), slippageBps);
      const prep = await this.prepare(await this.swapTx(q), { maxOutLamports: RESERVE, maxTransferLamports: RESERVE, preLamports: pre });
      if (!prep.ok) throw new Error('transazione di uscita non ammessa: ' + prep.reasons.join('; '));
      const signed = await signTx(prep.bytes, this.env.WALLET_SECRET_KEY);
      const sent = await this.sendAndConfirm(signed.tx);
      if (sent.status === 'pending') { await this.notify(`Vendita reale inviata, non ancora confermata: ${p.id} $${p.sym}\nhttps://solscan.io/tx/${sent.sig}`); return { ok: true, pending: true, signature: sent.sig }; }
      const post = await this.lamports();
      p.realized = num(p.realized) + (post - pre) / 1e9; p.sigs = [...(p.sigs || []), sent.sig].slice(-10); p.fails = 0;
      const left = await this.tokenBalance(p.mint).catch(() => ({ raw: 1n }));
      if (frac >= 0.999 || left.raw === 0n) return this.closePosition(p, reason, sent.sig);
      p.tokensRaw = left.raw.toString();
      const ps = await this.store.get('positions', []); await this.store.put('positions', ps.map((x) => (x.id === p.id ? p : x)));
      await this.notify(`${reason}: venduta una parte di ${p.id} $${p.sym}\nhttps://solscan.io/tx/${sent.sig}`);
      return { ok: true, partial: true, signature: sent.sig };
    }
  }
  async closePosition(p, reason, sig) {
    const ps = await this.store.get('positions', []); await this.store.put('positions', ps.filter((x) => x.id !== p.id));
    const pnl = num(p.realized) - num(p.costSol), j = await this.store.get('journal', []);
    j.push({ mode: 'real', id: p.id, mint: p.mint, sym: p.sym, openedAt: p.openedAt, closedAt: this.now(), cost: p.costSol, back: num(p.realized), pnl, pct: pnl / p.costSol * 100, reason, score: 0, sigs: p.sigs, source: p.source });
    await this.store.put('journal', j.slice(-300));
    if (p.source === 'scudo') { const dn = await this.store.get('shieldDone', {}); dn[p.mint] = this.now(); await this.store.put('shieldDone', Object.fromEntries(Object.entries(dn).slice(-60))); }
    await this.notify(`CHIUSA ${p.id} $${p.sym} ${pnl >= 0 ? '+' : ''}${pnl.toFixed(4)} SOL (${(pnl / p.costSol * 100).toFixed(1)}%) · ${reason}${sig ? '\nhttps://solscan.io/tx/' + sig : ''}`);
    return { ok: true, closed: true, pnl, signature: sig };
  }
  dayPnl(journal) { const d = today(this.now()); return journal.filter((j) => today(j.closedAt) === d).reduce((a, j) => a + num(j.pnl), 0); }

  // ---- giro di Charon (ogni minuto) ----
  tick() { return this.run(() => this._tick()); }
  async _tick() {
    await this._shieldScan().catch(() => {});          // Scudo: adotta i token nuovi comprati a mano (se acceso)
    const em = await this.store.get('emergency', null);
    const positions = await this.store.get('positions', []), pending = await this.store.get('pending', []);
    if (!positions.length && !pending.length) { if (em) { await this.store.put('emergency', null); await this.notify('Emergenza completata: nessuna posizione reale aperta. Ingressi fermi (kill switch), autopilota e reale spenti.\nPer ripartire: /riattiva e /reset_parametri (poi riaccendi quello che serve nelle impostazioni).'); } return { ok: true, idle: true }; }
    if (pending.length && this.env.WALLET_SECRET_KEY) await this.reconcile(pending);
    const open = await this.store.get('positions', []); if (!open.length) { if (await this.store.get('closeJob', null)) await this.store.put('closeJob', null); if (em) { await this.store.put('emergency', null); await this.notify('Emergenza completata: nessuna posizione reale aperta.'); } return { ok: true, positions: 0 }; }
    if (em) {                                                    // EMERGENZA: si vende tutto adesso (al massimo 2 posizioni per giro), senza aspettare Charon
      let sold = 0;
      for (const p of open) { if (sold >= MAX_SELLS_PER_TICK) break; sold++; await this._sell(p, 1, 'EMERGENZA'); }
      const left = (await this.store.get('positions', [])).length;
      if (!left) { await this.store.put('emergency', null); await this.notify('Emergenza completata: tutte le posizioni reali sono state vendute.\nIngressi fermi (kill switch), autopilota e reale spenti. Per ripartire: /riattiva e /reset_parametri.'); }
      return { ok: true, emergency: true, sold, left };
    }
    if (await this.store.get('closeJob', null)) { const j = await this._closeJobStep(); if (j && j.job) return { ok: true, closing: true, left: j.left }; }   // chiusura dal pannello in corso
    const prices = await this.prices(open.map((p) => p.mint)), out = { ok: true, sold: 0, checked: 0 }; let dirty = false;
    for (const p of open) {
      const m = prices.get(p.mint); if (!m || !(p.entry > 0)) continue;
      out.checked++;
      if (m.priceNative > p.peak) { if (m.priceNative > p.peak * 1.05 || this.now() - num(p.persistedAt) > 300000) { dirty = true; p.persistedAt = this.now(); } p.peak = m.priceNative; }
      const S = { ...E.DEFAULTS, ...p.params }, act = E.charon(p, m, S, this.now());
      if (act && out.sold < MAX_SELLS_PER_TICK) {
        out.sold++;
        const r = await this._sell(p, act.frac, act.reason);
        if (r.ok && !r.pending) { if (act.tp1) p.tp1Done = true; if (act.sp) p.spDone = true; if (r.partial) { const ps = await this.store.get('positions', []); await this.store.put('positions', ps.map((x) => (x.id === p.id ? p : x))); } }
      }
    }
    if (dirty) { const now = await this.store.get('positions', []); const byId = new Map(open.map((p) => [p.id, p])); await this.store.put('positions', now.map((x) => (byId.has(x.id) ? { ...x, peak: Math.max(x.peak, byId.get(x.id).peak), persistedAt: byId.get(x.id).persistedAt } : x))); }
    return out;
  }
  async prices(mints) {
    const map = new Map();
    try {
      const arr = await this.json('https://api.dexscreener.com/tokens/v1/solana/' + mints.join(','), {}, 'DexScreener');
      for (const pr of arr || []) {
        const a = pr.baseToken && pr.baseToken.address; if (!mints.includes(a) || !/^(SOL|WSOL)$/.test((pr.quoteToken && pr.quoteToken.symbol) || '')) continue;
        const liq = num(pr.liquidity && pr.liquidity.usd), cur = map.get(a); if (cur && cur.liq >= liq) continue;
        const t5 = (pr.txns && pr.txns.m5) || { buys: 0, sells: 0 };
        map.set(a, { sym: pr.baseToken && pr.baseToken.symbol, mcap: num(pr.marketCap || pr.fdv), priceNative: num(pr.priceNative), liq, br5: (num(t5.buys) + 1) / (num(t5.sells) + 1), tx5: num(t5.buys) + num(t5.sells) });
      }
    } catch { /* si riprova al prossimo giro */ }
    return map;
  }
  async reconcile(pending) {
    const keep = [];
    for (const p of pending) {
      try {
        const st = await this.rpc('getSignatureStatuses', [[p.sig], { searchTransactionHistory: true }]), s = st && st.value && st.value[0];
        if (s && s.err) { await this.notify(`Acquisto reale non riuscito: $${p.sym || p.mint.slice(0, 6)} (${JSON.stringify(s.err)})`); continue; }
        if (s && (s.confirmationStatus === 'confirmed' || s.confirmationStatus === 'finalized')) { await this.openPosition(p); continue; }
        if (this.now() - p.at > 180000) { await this.notify(`Acquisto reale scaduto senza conferma: $${p.sym || p.mint.slice(0, 6)}. Controlla il wallet.`); continue; }
      } catch { /* si riprova */ }
      keep.push(p);
    }
    await this.store.put('pending', keep);
  }

  // ---- stato e comandi ----
  // ---- parametri modificabili dall'app: richiesta → messaggio su Telegram → applicata solo se la approvi tu ----
  async current() { await this.refreshOv(); return { ...paramDefaults(), ...(await this.store.get('runnerCfg', {})), ...this.limits(), ...this.shieldCfg(), ...this.ov }; }   // meglio stima possibile dei valori attuali
  // Reset del conto PAPER (il reale non si tocca mai): stessa approvazione su Telegram. Il runner lo esegue e lo ricorda, così non si ripete.
  async _proposeReset(r) {
    const cap = r && r.capitalSOL;
    if (typeof cap !== 'number' || !Number.isFinite(cap) || cap < 0.1 || cap > 1000) return { ok: false, error: 'modifica non valida', errors: [{ key: 'capitalSOL', msg: 'il capitale deve essere tra 0,1 e 1000 SOL' }] };
    const now = this.now(), props = (await this.store.get('proposals', [])).filter((p) => p.exp > now);
    if (props.length >= 3) return { ok: false, error: 'ci sono già 3 richieste in attesa su Telegram: approvale o rifiutale' };
    if (now - (await this.store.get('lastProposal', 0)) < 15000) return { ok: false, error: 'richieste troppo ravvicinate: riprova tra qualche secondo' };
    if (props.some((p) => p.reset)) return { ok: false, error: 'c\'è già un reset in attesa su Telegram' };
    const seq = (await this.store.get('cseq', 0)) + 1; await this.store.put('cseq', seq); await this.store.put('lastProposal', now);
    const p = { id: 'C-' + String(seq).padStart(4, '0'), changes: {}, reset: { capitalSOL: Number(cap.toFixed(2)) }, at: now, exp: now + 10 * 60000 };
    props.push(p); await this.store.put('proposals', props);
    await this.notify(`Reset del conto PAPER ${p.id}\nCancella posizioni aperte, journal e statistiche del paper e riparte con ${p.reset.capitalSOL} SOL.\nIl conto reale non viene toccato.\n\nValido per 10 minuti. Se non l'hai chiesto tu, rifiuta.`, { inline_keyboard: [[{ text: 'Azzera il paper', callback_data: 'pa:' + p.id }, { text: 'Rifiuta', callback_data: 'pr:' + p.id }]] });
    return { ok: true, proposal: p };
  }
  // CHIUSURA di una posizione dall'app (paper o reale). L'app non ha segreti: per il REALE la richiesta passa dal tasto su Telegram
  // (a meno che nel Worker APP_CLOSE=direct: allora basta il popup dell'app). Funziona con o senza approvazione manuale degli ingressi:
  // le uscite non passano mai dai ticket. Paper: direttiva per il runner (paperCloses), che vende a mercato e avvisa.
  // Approvazione manuale: prima l'impostazione cambiata dall'app, poi quella riferita dal runner, poi la configurazione nel riepilogo paper
  // che il runner spinge al Worker; se non si sa nulla vale il valore di base (attiva). Restituisce { on, src }.
  async approval() {
    await this.refreshOv();
    if (typeof (this.ov || {}).realApprove === 'boolean') return { on: this.ov.realApprove, src: 'impostazioni dell\'app' };
    const cfg = await this.store.get('runnerCfg', {}); if (typeof cfg.realApprove === 'boolean') return { on: cfg.realApprove, src: 'runner' };
    const snap = await this.store.get('paper', null), c = snap && snap.data && snap.data.config; if (c && typeof c.realApprove === 'boolean') return { on: c.realApprove, src: 'riepilogo del runner' };
    return { on: true, src: 'valore di base' };
  }
  // Chiusura manuale dall'app: se l'approvazione manuale è disattivata dalle impostazioni è DIRETTA (paper e reale, senza Telegram);
  // se è attiva serve il tasto "Chiudi ora" su Telegram. APP_CLOSE=direct la rende sempre diretta, APP_CLOSE=confirm sempre con Telegram.
  async _closeDirect() {
    const m = String(this.env.APP_CLOSE || '').toLowerCase();
    if (m === 'direct') return true; if (m === 'confirm') return false;
    return !(await this.approval()).on;
  }
  // ---- pannello di emergenza ----
  async _setOv(patch) { const ov = { ...(await this.store.get('params', {})), ...patch }; await this.store.put('params', ov); this.ov = ov; }
  async _proposePanel(pn) {
    const a = pn && pn.action, def = PANEL[a]; if (!def) return { ok: false, error: 'azione non valida' };
    const now = this.now(), props = (await this.store.get('proposals', [])).filter((p) => p.exp > now);
    if (props.some((p) => p.panel && p.panel.action === a)) return { ok: false, error: 'azione già richiesta: controlla Telegram' };
    if (props.length >= 6) return { ok: false, error: 'ci sono già troppe richieste in attesa su Telegram' };
    if (now - (await this.store.get('lastPanel', 0)) < 3000) return { ok: false, error: 'richieste troppo ravvicinate: riprova tra qualche secondo' };
    await this.store.put('lastPanel', now);
    const m = String(this.env.APP_CLOSE || '').toLowerCase(), direct = !def.confirm && m !== 'confirm' && (pn.approvalOff === true || m === 'direct' || (await this._closeDirect()));
    if (direct) { const r = await this._applyPanel(a); return { ...r, proposal: { id: 'direct' }, direct: true }; }
    const seq = (await this.store.get('cseq', 0)) + 1; await this.store.put('cseq', seq);
    const p = { id: 'C-' + String(seq).padStart(4, '0'), changes: {}, panel: { action: a }, at: now, exp: now + 10 * 60000 };
    props.push(p); await this.store.put('proposals', props);
    await this.notify(`Pannello di emergenza ${p.id}: ${def.label}\n${def.text}.\n\nValida per 10 minuti. Se non l'hai chiesta tu, annulla.`, { inline_keyboard: [[{ text: def.label, callback_data: 'pa:' + p.id }, { text: 'Annulla', callback_data: 'pr:' + p.id }]] });
    return { ok: true, proposal: p };
  }
  async _applyPanel(a) {
    const def = PANEL[a]; if (!def) return { ok: false, error: 'azione non valida' };
    if (a === 'close_all' || a === 'close_profit' || a === 'close_loss') return this._panelClose(a.slice(6));
    if (a === 'real_stop') await this.store.put('killed', true);
    else if (a === 'paper_stop') await this._setOv({ paperStop: true });
    else if (a === 'real_off') await this._setOv({ realEnabled: false });
    else if (a === 'paper_off') await this._setOv({ paperEnabled: false });
    else if (a === 'off_all') { await this.store.put('killed', true); await this._setOv({ autopilot: false, realEnabled: false, paperEnabled: false, paperStop: true }); }
    else if (a === 'real_on') { await this.store.put('killed', false); await this._setOv({ realEnabled: true, autopilot: true }); }
    else if (a === 'paper_on') await this._setOv({ paperEnabled: true, paperStop: false, autopilot: true });
    await this.notify(`Pannello di emergenza: ${def.label} eseguito.\n${def.text}.${a === 'real_on' && this.mode() === 'off' ? '\nAttenzione: ORDERS_MODE è off nel Worker, nessun ordine reale parte.' : ''}`);
    return { ok: true, panel: true };
  }
  // Chiude le posizioni (tutte, in profitto o in perdita): reale con un lavoro che il Worker porta avanti (2 vendite per giro), paper con l'elenco per il runner
  async _panelClose(filter) {
    const gain = (entry, price) => (entry > 0 && price > 0 ? price / entry - 1 : null), pick = (g) => (filter === 'all' ? true : g == null ? false : filter === 'profit' ? g > 0 : g < 0);
    const open = await this.store.get('positions', []); let ids = [];
    if (open.length) { const px = filter === 'all' ? new Map() : await this.prices(open.map((p) => p.mint)); ids = open.filter((p) => pick(gain(p.entry, (px.get(p.mint) || {}).priceNative))).map((p) => p.id); }
    const snap = await this.store.get('paper', null), pap = (snap && snap.data && snap.data.positions) || [];
    const pids = pap.filter((p) => pick(gain(p.entry, p.last && p.last.priceNative))).map((p) => p.id);
    if (pids.length) { const have = (await this.store.get('paperCloses', [])).filter((x) => !pids.includes(x.id)), now = this.now(); await this.store.put('paperCloses', [...have, ...pids.map((id) => ({ id, at: now }))].slice(-20)); }
    const lab = { all: 'tutte le posizioni', profit: 'le posizioni in profitto', loss: 'le posizioni in perdita' }[filter];
    if (ids.length) await this.store.put('closeJob', { ids, label: lab, at: this.now() });
    await this.notify(`Pannello di emergenza: chiusura di ${lab}.\nReale: ${ids.length}${ids.length > MAX_SELLS_PER_TICK ? ' (2 per giro, il resto entro pochi minuti)' : ''} · paper: ${pids.length}${pids.length ? ' (il runner vende entro un minuto)' : ''}.`);
    if (ids.length) await this._closeJobStep();
    return { ok: true, panel: true, real: ids.length, paper: pids.length };
  }
  async _closeJobStep() {
    const job = await this.store.get('closeJob', null); if (!job) return null;
    const mine = (await this.store.get('positions', [])).filter((p) => job.ids.includes(p.id));
    if (mine.length) { let sold = 0; for (const p of mine) { if (sold >= MAX_SELLS_PER_TICK) break; sold++; await this._sell(p, 1, 'Chiusura (pannello)'); } }
    const left = (await this.store.get('positions', [])).filter((p) => job.ids.includes(p.id)).length;
    if (!left) { await this.store.put('closeJob', null); await this.notify(`Chiusura reale completata: ${job.label}.`); return { done: true }; }
    return { job: true, left };
  }
  async _proposeClose(c) {
    const mode = c && c.mode, id = String((c && c.id) || '').toUpperCase();
    if ((mode !== 'paper' && mode !== 'real') || !/^[PR]-\d{1,6}$/.test(id) || (mode === 'real') !== id.startsWith('R-')) return { ok: false, error: 'posizione non valida' };
    let sym = id;
    if (mode === 'real') { const p = (await this.store.get('positions', [])).find((x) => x.id === id); if (!p) return { ok: false, error: 'posizione reale non trovata' }; sym = p.sym; }
    else { const snap = await this.store.get('paper', null), p = snap && snap.data && snap.data.positions.find((x) => x.id === id); if (snap && !p) return { ok: false, error: 'posizione paper non trovata (forse già chiusa)' }; if (p) sym = p.sym; }
    const now = this.now(), props = (await this.store.get('proposals', [])).filter((p) => p.exp > now);
    if (props.some((p) => p.close && p.close.id === id)) return { ok: false, error: 'chiusura già richiesta: controlla Telegram' };
    if (props.length >= 6) return { ok: false, error: 'ci sono già troppe richieste in attesa su Telegram' };
    if (now - (await this.store.get('lastClose', 0)) < 3000) return { ok: false, error: 'richieste troppo ravvicinate: riprova tra qualche secondo' };
    await this.store.put('lastClose', now);
    const seq = (await this.store.get('cseq', 0)) + 1; await this.store.put('cseq', seq);
    const p = { id: 'C-' + String(seq).padStart(4, '0'), changes: {}, close: { mode, id, sym: String(sym || '').slice(0, 20) }, at: now, exp: now + 10 * 60000 };
    if ((c.approvalOff === true && String(this.env.APP_CLOSE || '').toLowerCase() !== 'confirm') || (await this._closeDirect())) { const r = await this._applyClose(p.close); return { ...r, proposal: p, direct: true }; }
    props.push(p); await this.store.put('proposals', props);
    await this.notify(`Chiusura posizione ${mode === 'real' ? 'REALE' : 'paper'} ${p.id}\n${p.close.sym} (${id}): vendita di tutta la posizione a mercato.${mode === 'real' ? '\nSono soldi veri.' : ''}\n\nValida per 10 minuti. Se non l'hai chiesta tu, rifiuta.`, { inline_keyboard: [[{ text: 'Chiudi ora', callback_data: 'pa:' + p.id }, { text: 'Annulla', callback_data: 'pr:' + p.id }]] });
    return { ok: true, proposal: p };
  }
  async _applyClose(c) {
    if (c.mode === 'real') {
      const p = (await this.store.get('positions', [])).find((x) => x.id === c.id);
      if (!p) return { ok: false, error: 'posizione reale non trovata (forse già chiusa)' };
      const r = await this._sell(p, 1, 'Chiusura manuale (app)');
      return { ...r, close: true };
    }
    const cl = (await this.store.get('paperCloses', [])).filter((x) => x.id !== c.id); cl.push({ id: c.id, at: this.now() });
    await this.store.put('paperCloses', cl.slice(-20));
    await this.notify(`Chiusura paper approvata (${c.id}): il runner vende a mercato entro un minuto.`);
    return { ok: true, close: true };
  }
  // EMERGENZA IMMEDIATA: ferma i nuovi ingressi, spegne autopilota e reale del runner, vende subito le posizioni reali (2 per giro, il resto al giro dopo).
  // Dall'app è solo una richiesta con un grosso tasto su Telegram; il comando /emergenza dalla tua chat agisce subito.
  emergency() { return this.run(() => this._emergency()); }
  async _emergency() {
    await this.store.put('killed', true);
    const ov = { ...(await this.store.get('params', {})), autopilot: false, realEnabled: false }; await this.store.put('params', ov); this.ov = ov;
    await this.store.put('emergency', { at: this.now() });
    await this.notify('EMERGENZA attivata: nuovi ingressi fermi, autopilota e reale del runner spenti. Vendo le posizioni reali aperte…');
    const r = await this._tick();
    return { ok: true, emergency: true, ...r };
  }
  async _proposeEmergency() {
    const now = this.now(), props = (await this.store.get('proposals', [])).filter((p) => p.exp > now);
    if (now - (await this.store.get('lastEmergency', 0)) < 10000) return { ok: false, error: 'richiesta di emergenza già inviata: controlla Telegram' };
    await this.store.put('lastEmergency', now);
    const seq = (await this.store.get('cseq', 0)) + 1; await this.store.put('cseq', seq);
    const p = { id: 'C-' + String(seq).padStart(4, '0'), changes: {}, emergency: true, at: now, exp: now + 10 * 60000 };
    props.push(p); await this.store.put('proposals', props.slice(-6));
    await this.notify(`EMERGENZA IMMEDIATA richiesta dall'app (${p.id})\nSe confermi: nuovi ingressi fermi, autopilota e reale spenti, vendita subito di tutte le posizioni reali.\n\nSe non l'hai chiesta tu, premi Annulla.`, { inline_keyboard: [[{ text: 'CONFERMA EMERGENZA', callback_data: 'pa:' + p.id }], [{ text: 'Annulla', callback_data: 'pr:' + p.id }]] });
    return { ok: true, proposal: p };
  }
  propose(req) { return this.run(async () => {
    if (req && req.emergency) return this._proposeEmergency();
    if (req && req.close) return this._proposeClose(req.close);
    if (req && req.panel) return this._proposePanel(req.panel);
    if (req && req.reset) return this._proposeReset(req.reset);
    const { clean, errors } = validate(req && req.changes);
    if (errors.length) return { ok: false, error: 'modifica non valida', errors };
    const c = this.ceilings(); for (const k of Object.keys(clean)) if (SCHEMA[k].ceiling && clean[k] > c[k]) errors.push({ key: k, msg: `oltre il tetto impostato in Cloudflare (${c[k]})` });
    if (errors.length) return { ok: false, error: 'modifica non valida', errors };
    const now = this.now(), props = (await this.store.get('proposals', [])).filter((p) => p.exp > now);
    if (props.length >= 3) return { ok: false, error: 'ci sono già 3 richieste in attesa su Telegram: approvale o rifiutale' };
    if (now - (await this.store.get('lastProposal', 0)) < 15000) return { ok: false, error: 'richieste troppo ravvicinate: riprova tra qualche secondo' };
    const cur = await this.current(), diff = Object.fromEntries(Object.entries(clean).filter(([k, v]) => cur[k] !== v));
    if (!Object.keys(diff).length) return { ok: false, error: 'i valori sono già quelli attuali' };
    const seq = (await this.store.get('cseq', 0)) + 1; await this.store.put('cseq', seq); await this.store.put('lastProposal', now);
    const p = { id: 'C-' + String(seq).padStart(4, '0'), changes: diff, at: now, exp: now + 10 * 60000 };
    props.push(p); await this.store.put('proposals', props);
    await this.notify(`Modifica parametri ${p.id}\n${diffText(cur, diff)}\n\nValida per 10 minuti. Se non l'hai chiesta tu, rifiuta.`, { inline_keyboard: [[{ text: 'Applica', callback_data: 'pa:' + p.id }, { text: 'Rifiuta', callback_data: 'pr:' + p.id }]] });
    return { ok: true, proposal: p };
  }); }
  applyProposal(id) { return this.run(async () => {
    const now = this.now(), props = await this.store.get('proposals', []), p = props.find((x) => x.id === id);
    if (!p) return { ok: false, error: 'richiesta non trovata' };
    await this.store.put('proposals', props.filter((x) => x.id !== id));
    if (p.exp <= now) return { ok: false, error: 'richiesta scaduta' };
    if (p.emergency) return this._emergency();
    if (p.close) return this._applyClose(p.close);
    if (p.panel) return this._applyPanel(p.panel.action);
    if (p.reset) {
      await this.store.put('paperReset', { id: p.id, capitalSOL: p.reset.capitalSOL, at: now });
      await this.notify(`Reset del paper approvato (${p.id}): il runner azzera il conto e riparte con ${p.reset.capitalSOL} SOL entro un minuto.`);
      return { ok: true, reset: true };
    }
    const cur = await this.current(), ov = { ...(await this.store.get('params', {})), ...p.changes };
    await this.store.put('params', ov); this.ov = ov;
    await this.notify(`Parametri applicati (${p.id})\n${diffText(cur, p.changes)}\nIl runner li usa entro un minuto.`);
    return { ok: true, applied: p.changes };
  }); }
  rejectProposal(id) { return this.run(async () => { const ps = await this.store.get('proposals', []); await this.store.put('proposals', ps.filter((x) => x.id !== id)); return { ok: true }; }); }
  resetParams() { return this.run(async () => { await this.store.put('params', {}); this.ov = {}; await this.store.put('proposals', []); await this.notify('Parametri riportati ai valori di config.json e ai tetti di Cloudflare.'); return { ok: true }; }); }
  // il runner riferisce i parametri che sta davvero usando (con il suo token): servono a mostrare «prima → dopo» corretti
  async reportRunner(cfg, resetAck, closeAck) {
    if (cfg) {
      const { clean } = validate(Object.fromEntries(Object.entries(cfg).filter(([k, v]) => SCHEMA[k] && SCHEMA[k].scope === 'runner' && (typeof v === 'number' || typeof v === 'boolean' || typeof v === 'string'))));
      await this.store.put('runnerCfg', clean);
    }
    const pr = await this.store.get('paperReset', null);
    if (resetAck && pr && pr.id === resetAck) await this.store.put('paperReset', null);   // il runner ha eseguito: la direttiva non serve più
    if (Array.isArray(closeAck) && closeAck.length) { const done = new Set(closeAck.map(String)); await this.store.put('paperCloses', (await this.store.get('paperCloses', [])).filter((x) => !done.has(x.id))); }
    return { ok: true };
  }
  // Riepilogo del paper in diretta: il runner lo spinge qui (con il suo token) a ogni evento e ogni pochi secondi; l'app lo legge da qui senza ritardi di GitHub.
  async paperPut(data) {
    if (!data || typeof data !== 'object' || data.v !== 1 || !Array.isArray(data.positions) || !Array.isArray(data.journal)) return { ok: false, error: 'riepilogo non valido' };
    const txt = JSON.stringify(data); if (txt.length > 120000) return { ok: false, error: 'riepilogo troppo grande' };
    await this.store.put('paper', { receivedAt: this.now(), data }); return { ok: true };
  }
  async paperGet() { const p = await this.store.get('paper', null); return p ? { ok: true, receivedAt: p.receivedAt, data: p.data } : { ok: false, error: 'nessun dato dal runner' }; }
  async paramsView() {
    await this.refreshOv();
    const now = this.now(), ov = this.ov || {}, split = (scope) => Object.fromEntries(Object.entries(ov).filter(([k]) => SCHEMA[k] && SCHEMA[k].scope === scope));
    return { ok: true, schema: SCHEMA, groups: GROUPS, runner: split('runner'), worker: split('worker'), runnerCfg: await this.store.get('runnerCfg', {}), ceilings: this.ceilings(), limits: { ...this.limits(), ...this.shieldCfg() },
      resetPaper: ((r) => (r && now - r.at < 3600000 ? r : null))(await this.store.get('paperReset', null)),
      closeDirect: await this._closeDirect(), approval: await this.approval(),
      closePaper: (await this.store.get('paperCloses', [])).filter((x) => now - x.at < 3600000).map((x) => x.id),
      proposals: (await this.store.get('proposals', [])).filter((p) => p.exp > now).map((p) => ({ id: p.id, changes: p.changes, reset: p.reset || null, emergency: !!p.emergency, close: p.close || null, panel: p.panel || null, exp: p.exp })) };
  }

  async kill() { await this.store.put('killed', true); return { ok: true, killed: true }; }
  async resume() { await this.store.put('killed', false); return { ok: true, killed: false }; }
  async state() {
    await this.refreshOv();
    const [positions, pending, journal, killed, lastDry, tickets] = await Promise.all([this.store.get('positions', []), this.store.get('pending', []), this.store.get('journal', []), this.store.get('killed', false), this.store.get('lastDry', null), this.store.get('tickets', [])]);
    return { ok: true, mode: this.mode(), killed, positions, pending, tickets: tickets.filter((t) => t.exp > this.now()), journal: journal.slice(-50), dayPnl: this.dayPnl(journal), limits: this.limits(), lastDry };
  }
  // Vista pubblica di sola lettura (nessun segreto, nessun comando): indirizzo del wallet abbreviato, mai la chiave. La legge l'app su GitHub Pages.
  async publicView() {
    const [s, h] = await Promise.all([this.state(), this.health()]);
    return { ok: true, at: this.now(), mode: s.mode, killed: s.killed, jupiterConfigured: h.jupiterConfigured, limits: s.limits, dayPnl: s.dayPnl,
      positions: s.positions, pending: s.pending, tickets: s.tickets, journal: s.journal, lastDry: s.lastDry,
      wallet: h.wallet ? h.wallet.slice(0, 4) + '…' + h.wallet.slice(-4) : null, balanceSOL: h.balanceSOL, walletError: h.walletError || null, rpcError: h.rpcError || null,
      shield: { on: this.shieldCfg().shieldOn, info: await this.store.get('shieldInfo', null) } };
  }
  async health() {
    await this.refreshOv();
    const lim = this.limits(), out = { ok: true, phase: 3, mode: this.mode(), jupiterConfigured: !!this.env.JUPITER_PROGRAM_ID, limits: lim, wallet: null, balanceSOL: null };
    out.ordersEnabled = out.mode === 'live' && out.jupiterConfigured;
    out.killed = !!(await this.store.get('killed', false));
    out.positions = (await this.store.get('positions', [])).length;
    if (!this.env.WALLET_SECRET_KEY) { out.walletError = 'WALLET_SECRET_KEY non impostata'; return out; }
    try { out.wallet = await this.wallet(); } catch (e) { out.walletError = e.message; return out; }
    try { out.balanceSOL = (await this.lamports()) / 1e9; } catch (e) { out.rpcError = e.message; }
    return out;
  }
}

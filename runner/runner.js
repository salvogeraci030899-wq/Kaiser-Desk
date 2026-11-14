// KAISER runner: lo stesso desk della PWA, senza interfaccia, per GitHub Actions.
// Ogni esecuzione dura LOOP_MIN minuti: scan completo ogni SCAN_SEC secondi, Charon ogni TICK_SEC.
// Lo stato (cassa, posizioni, journal) vive in STATE_DIR, che il workflow salva sul branch "data".
// SOLO PAPER TRADING: nessuna chiave privata, nessuna transazione firmata.
'use strict';
const fs = require('fs');
const path = require('path');
const E = require('../engine.js');

const STATE_DIR = process.env.STATE_DIR || path.join(__dirname, '..', 'state');
const LOOP_MIN = Number(process.env.LOOP_MIN || 4.5);
const TICK_SEC = Number(process.env.TICK_SEC || 30);
const SCAN_SEC = Number(process.env.SCAN_SEC || 60);
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const num = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// I moduli GMGN/Grok si caricano solo se servono (così i test possono sostituirli)
let gmgnRun = null, grokAnalyze = null;
try { gmgnRun = require('../api/gmgn.js').run; } catch {}
try { grokAnalyze = require('../api/grok.js').analyzeToken; } catch {}

// ---------------- stato ----------------
const F = { state: path.join(STATE_DIR, 'state.json'), config: path.join(STATE_DIR, 'config.json') };
function readJSON(f, d) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } }
fs.mkdirSync(STATE_DIR, { recursive: true });

const RUNNER_DEFAULTS = { autopilot: true, approve: false, useGrok: false, srcGmgnTrending: true, srcGmgnTrenches: false };
if (!fs.existsSync(F.config)) {
  fs.writeFileSync(F.config, JSON.stringify({ _nota: 'Modifica questi valori per cambiare le regole del runner. Chiavi valide: vedi DEFAULTS in engine.js', ...RUNNER_DEFAULTS }, null, 2));
}
const S = { ...E.DEFAULTS, ...RUNNER_DEFAULTS, ...readJSON(F.config, {}) };
S.useGrok = S.useGrok && !!process.env.XAI_API_KEY;
// Il runner non ha chiavi né firma nulla. Il reale è un conto separato gestito dall'esecutore (vedi realEntries).

const st = Object.assign({
  startedAt: Date.now(), runs: 0, cash: S.capitalSOL, positions: [], journal: [], signals: [],
  day: null, cooldownUntil: 0, halted: null, seq: 0, events: [],
}, readJSON(F.state, {}));
st.runs++;
if (st.capital > 0) S.capitalSOL = st.capital;   // capitale scelto con un reset dall'app: resta valido ai run successivi
const rt = { solUsd: 0, sec: new Map(), grok: new Map(), gmgn: new Map(), cands: new Map() };

function log(agent, msg) {
  const line = `${new Date().toISOString().slice(11, 19)} ${agent.padEnd(8)} ${msg}`;
  console.log(line);
  st.events.unshift(line);
  st.events.length = Math.min(st.events.length, 300);
}
function save() {
  st.journal = st.journal.slice(-2000);
  st.signals = st.signals.slice(-1000);
  fs.writeFileSync(F.state, JSON.stringify(st, null, 1));
  fs.writeFileSync(path.join(STATE_DIR, 'REPORT.md'), report());
  fs.writeFileSync(path.join(STATE_DIR, 'journal.csv'), csv());
  fs.writeFileSync(path.join(STATE_DIR, 'public.json'), JSON.stringify(publicSummary()));
  pushLive().catch(() => {});
}
// Paper in diretta: il riepilogo va subito al Worker (con il token del runner), così l'app lo vede in pochi secondi.
// Il file su GitHub resta come ripiego, ma si aggiorna solo a fine run e raw.githubusercontent.com lo tiene in cache fino a 5 minuti.
const execUrl = () => String(process.env.EXEC_URL || S.executor || '').replace(/\/+$/, '');
let lastPush = 0;
async function pushLive(force) {
  const tok = process.env.EXEC_TOKEN, url = execUrl(); if (!tok || !url) return;
  const now = Date.now(); if (now - lastPush < (force ? 1500 : 10000)) return;
  lastPush = now;
  try { await fetchJSON(url + '/paper', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-app-token': tok }, body: JSON.stringify({ data: publicSummary() }), timeout: 6000 }); } catch { /* ripiego: public.json su GitHub */ }
}
// Riepilogo leggero e senza segreti per l'app (GitHub Pages): la legge da raw.githubusercontent.com, sola lettura.
function publicSummary() {
  const s = stats(), { backend, appToken, executorToken, ...cfg } = S;   // mai segreti, anche se qualcuno li scrive in config.json
  return {
    v: 1, updatedAt: Date.now(), startedAt: st.startedAt, runs: st.runs, capital: S.capitalSOL, cash: st.cash, equity: equity(), halted: !!st.halted, solUsd: rt.solUsd || 0,
    stats: { n: s.n, wr: s.wr, pnl: s.pnl, aw: s.aw, al: s.al, pf: Number.isFinite(s.pf) ? s.pf : null },
    positions: st.positions.map((p) => ({ id: p.id, mint: p.mint, sym: p.sym, pairAddress: p.pairAddress, openedAt: p.openedAt, sizeSOL: p.sizeSOL, cost: p.cost, entry: p.entry, tokens: p.tokens,
      remaining: p.remaining, tp1Done: p.tp1Done, peak: p.peak, score: p.score, last: p.last ? { priceNative: p.last.priceNative, liq: p.last.liq, t: p.last.t } : null })),
    journal: st.journal.slice(-100).map((j) => ({ id: j.id, mint: j.mint, sym: j.sym, openedAt: j.openedAt, closedAt: j.closedAt, cost: j.cost, back: j.back, pnl: j.pnl, pct: j.pct, reason: j.reason, score: j.score, peakPct: j.peakPct, trigPct: j.trigPct })),
    events: st.events.slice(0, 40), config: cfg,
  };
}

// ---------------- rete ----------------
async function fetchJSON(url, opt = {}) {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), opt.timeout || 15000);
  try {
    const r = await fetch(url, { ...opt, signal: c.signal, headers: { accept: 'application/json', 'user-agent': 'kaiser-desk-runner', ...(opt.headers || {}) } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}
async function tg(text) {
  const tok = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!tok || !chat) return;
  try {
    await fetchJSON(`https://api.telegram.org/bot${tok}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
  } catch (e) { console.log('telegram:', e.message); }
}
const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// ---------------- dati ----------------
async function solPrice() {
  try {
    const d = await fetchJSON('https://lite-api.jup.ag/price/v3?ids=' + SOL_MINT);
    const o = d[SOL_MINT] || (d.data && d.data[SOL_MINT]);
    const p = num(o && (o.usdPrice ?? o.price));
    if (p > 0) rt.solUsd = p;
  } catch (e) { log('SCOUT', 'prezzo SOL non disponibile: ' + e.message); }
}
async function dexPairs(mints) {
  const out = new Map();
  for (let i = 0; i < mints.length; i += 30) {
    const chunk = mints.slice(i, i + 30);
    try {
      const arr = await fetchJSON('https://api.dexscreener.com/tokens/v1/solana/' + chunk.join(','));
      for (const p of arr || []) {
        const a = p.baseToken && p.baseToken.address;
        if (!chunk.includes(a) || !/^(SOL|WSOL)$/.test((p.quoteToken && p.quoteToken.symbol) || '')) continue;
        const cur = out.get(a);
        if (!cur || num(p.liquidity && p.liquidity.usd) > num(cur.liquidity && cur.liquidity.usd)) out.set(a, p);
      }
    } catch (e) { log('SCOUT', 'DexScreener errore: ' + e.message); }
  }
  return out;
}
async function discover() {
  const found = new Map();
  const add = (m, src) => { if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(m || '')) return; if (!found.has(m)) found.set(m, new Set()); found.get(m).add(src); };
  const jobs = [];
  if (S.srcDexProfiles) jobs.push(fetchJSON('https://api.dexscreener.com/token-profiles/latest/v1').then((a) => (a || []).forEach((x) => x.chainId === 'solana' && add(x.tokenAddress, 'profili'))).catch((e) => log('SCOUT', 'profili: ' + e.message)));
  if (S.srcDexBoosts) {
    jobs.push(fetchJSON('https://api.dexscreener.com/token-boosts/latest/v1').then((a) => (a || []).forEach((x) => x.chainId === 'solana' && add(x.tokenAddress, 'boost'))).catch(() => {}));
    jobs.push(fetchJSON('https://api.dexscreener.com/token-boosts/top/v1').then((a) => (a || []).forEach((x) => x.chainId === 'solana' && add(x.tokenAddress, 'top boost'))).catch(() => {}));
  }
  const gm = async (args, src) => {
    if (!gmgnRun) return;
    try {
      const { data } = await gmgnRun(args);
      for (const it of E.gmgnList(data)) { const g = E.gmgnNorm(it); if (g) { rt.gmgn.set(g.address, { ...g, botRate: num(it.bot_degen_rate, null) }); add(g.address, src); } }
    } catch (e) { log('SCOUT', `GMGN ${src}: ${e.message}`); }
  };
  if (S.srcGmgnTrending) jobs.push(gm(['market', 'trending', '--chain', 'sol', '--interval', S.gmgnInterval, '--limit', '50', '--filter', 'not_honeypot'], 'GMGN'));
  if (S.srcGmgnTrenches) jobs.push(gm(['market', 'trenches', '--chain', 'sol', '--limit', '40'], 'trenches'));
  await Promise.all(jobs);
  return found;
}
async function rugcheck(mint) {
  const c = rt.sec.get(mint);
  if (c && Date.now() - c.t < 5 * 60000) return c.v;
  try {
    const v = E.sentinel(await fetchJSON(`https://api.rugcheck.xyz/v1/tokens/${mint}/report`));
    rt.sec.set(mint, { t: Date.now(), v });
    return v;
  } catch (e) {
    if (gmgnRun) {
      try {
        const { data } = await gmgnRun(['token', 'security', '--chain', 'sol', '--address', mint]);
        const g = E.gmgnNorm({ address: mint, ...((data && (data.data || data)) || {}) });
        const v = { ok: true, vetoes: [], notes: ['fonte: GMGN security'], penalty: 0 };
        if (g.honeypot) v.vetoes.push('Honeypot (GMGN)');
        if (g.renMint === false) v.vetoes.push('Mint non rinunciato');
        if (g.renFreeze === false) v.vetoes.push('Freeze non rinunciato');
        if (g.rug != null && g.rug > 0.3) v.vetoes.push('Rug ratio alto');
        if (g.top10 != null && g.top10 > 0.5) v.penalty += 10;
        rt.sec.set(mint, { t: Date.now(), v });
        return v;
      } catch {}
    }
    return null;
  }
}
async function askGrok(c) {
  if (!S.useGrok || !grokAnalyze) return null;
  const g = rt.grok.get(c.mint); if (g) return g;
  try { const v = await grokAnalyze({ address: c.mint, symbol: c.sym, name: c.name }); rt.grok.set(c.mint, v); log('GROK', `$${c.sym} sentiment ${v.sentiment} organico ${v.organic}`); return v; }
  catch (e) { log('GROK', e.message); return null; }
}

// ---------------- desk ----------------
const posValue = (p) => p.tokens * p.remaining * (p.last ? p.last.priceNative : p.entry);
const equity = () => st.cash + st.positions.reduce((a, p) => a + posValue(p), 0);
const sizeSol = () => Math.min(st.cash, equity() * S.sizePct / 100);
function rollDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (!st.day || st.day.date !== today) { st.day = { date: today, startEq: equity() }; st.halted = null; }
}
function gates(c) {
  if (st.halted) return 'circuit breaker';
  if (st.positions.length >= S.maxPos) return 'max posizioni';
  if (st.positions.some((p) => p.mint === c.mint)) return 'già in posizione';
  if (Date.now() < st.cooldownUntil) return 'cooldown';
  const last = [...st.journal].reverse().find((j) => j.mint === c.mint);
  if (last && Date.now() - last.closedAt < S.retradeH * 3600000) return 'ritrade troppo presto';
  if (st.cash < sizeSol() * 0.5 || sizeSol() < 0.001) return 'cassa insufficiente';
  return '';
}
async function jupQuote(inMint, outMint, amount) {
  const q = await fetchJSON(`https://lite-api.jup.ag/swap/v1/quote?inputMint=${inMint}&outputMint=${outMint}&amount=${amount}&slippageBps=${S.slippageBps}&restrictIntermediateTokens=true`);
  if (!q || !q.outAmount) throw new Error((q && q.error) || 'nessuna rotta');
  return q;
}
async function buy(c) {
  const fresh = (await dexPairs([c.mint])).get(c.mint) || c.pair;
  const sizeS = sizeSol();
  const priceN = num(fresh.priceNative), liq = num(fresh.liquidity && fresh.liquidity.usd);
  let impact, rawOut = null, src = 'stima';
  try { const q = await jupQuote(SOL_MINT, c.mint, Math.floor(sizeS * 1e9)); impact = Math.max(0, num(q.priceImpactPct)); rawOut = q.outAmount; src = 'Jupiter'; }
  catch { impact = E.estImpact(sizeS * (rt.solUsd || 150), liq); }
  if (impact > S.slippageBps / 10000) { log('QUARTER', `$${c.sym} impatto ${(impact * 100).toFixed(1)}% oltre slippage: annullato`); return; }
  const entry = E.entryPrice(priceN, impact, S.feePct);
  const p = {
    id: 'P-' + String(++st.seq).padStart(4, '0'), mint: c.mint, sym: c.sym, name: c.name, pairAddress: fresh.pairAddress,
    openedAt: Date.now(), sizeSOL: sizeS, cost: sizeS + S.prioritySOL, entry, tokens: sizeS / entry, remaining: 1, rawLeft: rawOut,
    peak: entry, tp1Done: false, spDone: false, entryLiq: liq, realized: 0, score: c.score, why: 'runner',
    entryInfo: { srcs: c.srcs, notes: c.a.notes, plus: c.a.plus, m: c.a.m, grok: c.gr ? { s: c.gr.sentiment, o: c.gr.organic } : null },
    last: null, fills: [`BUY ${sizeS.toFixed(3)} impatto ${(impact * 100).toFixed(2)}% (${src})`],
  };
  st.cash -= p.cost;
  st.positions.push(p);
  pushLive(true).catch(() => {});
  log('QUARTER', `BUY $${c.sym} ${sizeS.toFixed(3)} SOL score ${c.score} impatto ${(impact * 100).toFixed(2)}% (${src})`);
  await tg(`<b>BUY paper</b> $${esc(c.sym)} ${sizeS.toFixed(3)} SOL · score ${c.score}\nhttps://dexscreener.com/solana/${fresh.pairAddress}`);
}
async function sell(p, frac, reason) {
  const m = p.last || { priceNative: p.entry, liq: p.entryLiq };
  const tokSell = p.tokens * p.remaining * frac;
  let sol = null, src = 'stima';
  if (p.rawLeft) {
    try {
      const raw = BigInt(p.rawLeft);
      const amt = frac >= 0.999 ? raw : (raw * BigInt(Math.round(frac * 10000))) / 10000n;
      if (amt > 0n) {
        const q = await jupQuote(p.mint, SOL_MINT, amt.toString());
        sol = Math.max(0, num(q.outAmount) / 1e9 * (1 - S.feePct / 100) - S.prioritySOL);
        p.rawLeft = (raw - amt).toString(); src = 'Jupiter';
      }
    } catch {}
  }
  if (sol == null) sol = E.exitSol(tokSell, m.priceNative, E.estImpact(tokSell * m.priceNative * (rt.solUsd || 150), m.liq), S.feePct, S.prioritySOL);
  p.remaining *= (1 - frac);
  p.realized += sol;
  st.cash += sol;
  p.fills.push(`SELL ${(frac * 100).toFixed(0)}% -> ${sol.toFixed(4)} (${reason}, ${src})`);
  log('CHARON', `${reason} $${p.sym} vendo ${(frac * 100).toFixed(0)}% a ${((m.priceNative / p.entry - 1) * 100).toFixed(1)}% -> ${sol.toFixed(4)} SOL`);
  if (p.remaining < 0.002) {
    st.positions = st.positions.filter((x) => x !== p);
    const pnl = p.realized - p.cost;
    const j = { id: p.id, mint: p.mint, sym: p.sym, openedAt: p.openedAt, closedAt: Date.now(), cost: p.cost, back: p.realized, pnl, pct: pnl / p.cost * 100,
      mode: 'paper', reason, score: p.score, solUsd: rt.solUsd, peakPct: (p.peak / p.entry - 1) * 100, trigPct: (m.priceNative / p.entry - 1) * 100, entryInfo: p.entryInfo };
    st.journal.push(j);
    pushLive(true).catch(() => {});
    if (pnl < 0) st.cooldownUntil = Date.now() + S.cooldownMin * 60000;
    log('SCRIBE', `chiuso ${p.id} $${p.sym} ${pnl.toFixed(4)} SOL (${j.pct.toFixed(1)}%)`);
    await tg(`<b>CLOSE</b> $${esc(p.sym)} ${pnl.toFixed(4)} SOL (${j.pct.toFixed(1)}%) · ${esc(reason)}\nEquity ${equity().toFixed(3)} SOL`);
  }
}
async function manage(pairsIn) {
  if (!st.positions.length) return;
  const pairs = new Map(pairsIn || []);
  const need = st.positions.map((p) => p.mint).filter((m) => !pairs.has(m));
  if (need.length) for (const [k, v] of await dexPairs(need)) pairs.set(k, v);
  for (const p of [...st.positions]) {
    const pr = pairs.get(p.mint);
    if (!pr) continue;
    const t5 = (pr.txns && pr.txns.m5) || { buys: 0, sells: 0 };
    p.last = { priceNative: num(pr.priceNative), liq: num(pr.liquidity && pr.liquidity.usd), br5: (num(t5.buys) + 1) / (num(t5.sells) + 1), tx5: num(t5.buys) + num(t5.sells), t: Date.now() };
    if (p.last.priceNative > p.peak) p.peak = p.last.priceNative;
    const act = E.charon(p, p.last, S);
    if (act) { if (act.tp1) p.tp1Done = true; if (act.sp) p.spDone = true; await sell(p, act.frac, act.reason); }
  }
}
function botPenalty(c) {
  const g = rt.gmgn.get(c.mint);
  if (g && g.botRate != null && g.botRate > 0.5) { c.a.notes.push(`bot ${(g.botRate * 100).toFixed(0)}%`); return 8; }
  return 0;
}
// ---------------- PARAMETRI DALL'APP ----------------
// Le modifiche chieste dall'app e approvate su Telegram stanno nel Worker. Il runner le legge a ogni scan (lettura pubblica, nessun segreto)
// e le applica sopra config.json. Se una modifica viene annullata torna al valore di base. Accetta solo chiavi note, dello stesso tipo dei valori predefiniti.
const BASE_S = { ...S };
const BLOCKED = new Set(['backend', 'appToken', 'executor', 'executorToken']);
let appliedKeys = new Set();
// Reset del conto paper approvato dall'app (su Telegram): cancella posizioni, journal e statistiche e riparte con il capitale scelto.
// Il runner ricorda l'id (st.resetId) per non ripetere il reset e avvisa il Worker, che toglie la direttiva.
async function ackReset(id) {
  const tok = process.env.EXEC_TOKEN, url = execUrl(); if (!tok || !url) return;
  try { await fetchJSON(url + '/runner', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-app-token': tok }, body: JSON.stringify({ resetAck: id }), timeout: 6000 }); } catch { /* la direttiva scade da sola dopo un'ora */ }
}
async function ackClose(ids) {
  const url = execUrl(), tok = process.env.EXEC_TOKEN; if (!url || !tok) return;
  try { await fetchJSON(url + '/runner', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-app-token': tok }, body: JSON.stringify({ closeAck: ids }), timeout: 6000 }); } catch { /* si riprova al prossimo giro */ }
}
async function resetPaper(rp) {
  const cap = Number(Number(rp.capitalSOL).toFixed(2));
  Object.assign(st, { cash: cap, positions: [], journal: [], signals: [], day: null, halted: null, cooldownUntil: 0, startedAt: Date.now(), capital: cap, resetId: rp.id, realTried: {} });
  S.capitalSOL = cap; BASE_S.capitalSOL = cap;
  log('KAISER', `reset del paper (${rp.id}): conto azzerato, capitale ${cap} SOL`);
  await tg(`<b>KAISER</b> paper azzerato (${esc(rp.id)}): riparto con ${cap} SOL`);
  save(); await pushLive(true); await ackReset(rp.id);
}
async function pullParams() {
  const url = execUrl(); if (!url) return;
  let d; try { d = await fetchJSON(url + '/params', { timeout: 6000 }); } catch { return; }   // se il Worker non risponde si tengono i valori attuali
  if (!d || d.ok !== true || !d.runner || typeof d.runner !== 'object') return;
  const next = {};
  for (const [k, v] of Object.entries(d.runner)) {
    if (BLOCKED.has(k) || !Object.prototype.hasOwnProperty.call(E.DEFAULTS, k) || typeof v !== typeof E.DEFAULTS[k] || (typeof v === 'number' && !Number.isFinite(v))) continue;
    next[k] = v;
  }
  const changed = [];
  for (const k of new Set([...appliedKeys, ...Object.keys(next)])) {
    let nv = k in next ? next[k] : BASE_S[k]; if (k === 'useGrok') nv = !!nv && !!process.env.XAI_API_KEY;
    if (S[k] !== nv) { changed.push(`${k} ${S[k]}→${nv}`); S[k] = nv; }
  }
  appliedKeys = new Set(Object.keys(next));
  if (changed.length) log('KAISER', `parametri dall'app: ${changed.join(', ')}`);
  const rp = d.resetPaper;
  if (rp && /^C-\d+$/.test(String(rp.id)) && typeof rp.capitalSOL === 'number' && rp.capitalSOL >= 0.1 && rp.capitalSOL <= 1000 && Date.now() - num(rp.at) < 3600000) {
    if (rp.id !== st.resetId) await resetPaper(rp); else await ackReset(rp.id);   // già eseguito: si riprova solo ad avvisare il Worker
  }
  // chiusure di posizioni paper chieste dall'app e approvate (su Telegram): vendita a mercato di tutto, poi si avvisa il Worker
  if (Array.isArray(d.closePaper) && d.closePaper.length) {
    const done = [];
    for (const id of d.closePaper.slice(0, 10)) {
      if (!/^P-\d{1,6}$/.test(String(id))) continue;
      const p = st.positions.find((x) => x.id === id);
      if (p) { log('KAISER', `chiusura manuale dall'app: ${id} ${p.sym}`); try { await sell(p, 1, 'Chiusura manuale (app)'); } catch (e) { log('KAISER', `chiusura ${id} fallita: ${e.message}`); continue; } }
      done.push(id);
    }
    if (done.length) { save(); await pushLive(true); await ackClose(done); }
  }
  // riferisce al Worker i valori in uso (serve a mostrare «prima → dopo» corretti nei messaggi di Telegram)
  if (process.env.EXEC_TOKEN && (changed.length || !rt.cfgSent)) {
    rt.cfgSent = true;
    const cfg = Object.fromEntries(Object.entries(S).filter(([k]) => !BLOCKED.has(k)));
    try { await fetchJSON(url + '/runner', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-app-token': process.env.EXEC_TOKEN }, body: JSON.stringify({ config: cfg }), timeout: 6000 }); } catch { rt.cfgSent = false; }
  }
}

// ---------------- REALE ----------------
// Il runner NON ha chiavi e non firma nulla: chiede all'esecutore (Cloudflare), che applica i suoi limiti.
//   realApprove = true  -> propone un ticket (arriva su Telegram e nell'app, lo approvi tu)
//   realApprove = false -> invia l'ordine da solo (autonomia), con un ref stabile per non comprare due volte
// Si accende da config.json sul branch data: realEnabled, realCapitalSOL, realApprove. Servono i segreti GitHub EXEC_TOKEN (e, se diverso, EXEC_URL).
async function realEntries(buys) {
  if (!S.realEnabled || !buys.length) return;
  const url = execUrl(), tok = process.env.EXEC_TOKEN;
  if (!url || !tok) { if (!rt.realWarned) { rt.realWarned = true; log('KAISER', 'reale acceso in config.json ma manca il segreto EXEC_TOKEN: nessun ordine reale'); } return; }
  const size = +(num(S.realCapitalSOL) * S.realSizePct / 100).toFixed(4);
  if (!(size > 0)) { if (!rt.realWarned) { rt.realWarned = true; log('KAISER', 'reale acceso ma realCapitalSOL è 0: nessun ordine reale'); } return; }
  st.realTried = st.realTried || {};
  // Il reale ha le sue regole (realSl, realTp1…), indipendenti dal paper; la selezione dei token (filtri) è in comune.
  const params = { sl: S.realSl, tp1: S.realTp1, tp1Sell: S.realTp1Sell, trail: S.realTrail, beAfterTp1: S.realBeAfterTp1, timeStopMin: S.realTimeStopMin, timeStopMinPnl: S.realTimeStopMinPnl, rugLiqDrop: S.realRugLiqDrop, sellPressure: S.realSellPressure };
  buys = buys.filter((c) => c.score >= S.realMinScore);
  if (!buys.length) return;
  const approve = S.realApprove !== false, cool = (approve ? 30 : Math.max(10, S.retradeH * 60)) * 60000, bucket = Math.floor(Date.now() / (Math.max(1, S.retradeH) * 3600000));
  let n = 0;
  for (const c of buys) {
    if (n >= S.realMaxEntriesPerScan) break;
    if (Date.now() - num(st.realTried[c.mint]) < cool) continue;       // niente tentativi ripetuti sullo stesso token
    st.realTried[c.mint] = Date.now();
    const body = { mint: c.mint, sym: c.sym, sizeSol: size, slippageBps: S.realSlippageBps, entryLiq: c.a.m.liq, score: c.score, params };
    if (!approve) body.ref = `rn-${c.mint.slice(0, 12)}-${bucket}`;
    try {
      const r = await fetchJSON(url + (approve ? '/ticket' : '/order'), { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-app-token': tok }, body: JSON.stringify(body), timeout: 60000 });
      if (r && r.ok && !r.duplicate) { n++; log('QUARTER', `REALE ${approve ? 'ticket proposto' : r.pending ? 'ordine inviato (in attesa)' : 'ordine eseguito'} $${c.sym} ${size} SOL score ${c.score}`); }
      else if (r && !r.ok) log('KAISER', `reale rifiutato $${c.sym}: ${r.error || 'errore'}`);
    } catch (e) { log('KAISER', `esecutore non raggiungibile: ${e.message}`); }
  }
  for (const k of Object.keys(st.realTried)) if (Date.now() - st.realTried[k] > 24 * 3600000) delete st.realTried[k];
}
async function scan() {
  await pullParams();
  rollDay();
  await solPrice();
  const found = await discover();
  for (const p of st.positions) if (!found.has(p.mint)) found.set(p.mint, new Set(['posizione']));
  const mints = [...found.keys()].slice(0, 90);
  const pairs = await dexPairs(mints);
  const cands = [];
  for (const m of mints) {
    const pair = pairs.get(m); if (!pair) continue;
    const a = E.analyze(pair, rt.gmgn.get(m) || null, S);
    const c = { mint: m, pair, a, sym: (pair.baseToken && pair.baseToken.symbol) || '?', name: (pair.baseToken && pair.baseToken.name) || '', srcs: [...found.get(m)] };
    a.base = Math.max(0, a.base - botPenalty(c));
    Object.assign(c, E.decide(a, null, null, S));
    cands.push(c);
  }
  const top = cands.filter((c) => !c.a.vetoes.length && c.a.base >= S.minScore - 15).sort((x, y) => y.a.base - x.a.base).slice(0, 8);
  for (const c of top) {
    const sec = await rugcheck(c.mint);
    if (sec) { c.sec = sec; Object.assign(c, E.decide(c.a, sec, null, S)); }
    await sleep(200);
  }
  for (const c of cands.filter((x) => x.verdict === 'BUY').slice(0, 2)) {
    const gr = await askGrok(c);
    if (gr) { c.gr = gr; Object.assign(c, E.decide(c.a, c.sec, gr, S)); }
  }
  const buys = cands.filter((c) => c.verdict === 'BUY').sort((a, b) => b.score - a.score);
  log('ORACLE', `${mints.length} raccolti, ${cands.length} analizzati, ${buys.length} BUY, ${cands.filter((c) => c.verdict === 'VETO').length} veto`);
  // registro dei segnali: serve a capire dopo se i BUY scartati (es. per max posizioni) erano buoni
  for (const c of buys) st.signals.push({ t: Date.now(), mint: c.mint, sym: c.sym, score: c.score, priceNative: c.a.m.priceNative });
  await manage(pairs);
  // circuit breaker
  if (st.day && !st.halted && equity() < st.day.startEq * (1 - S.dailyLossPct / 100)) {
    st.halted = Date.now();
    log('KAISER', `CIRCUIT BREAKER: perdita giornaliera oltre ${S.dailyLossPct}%`);
    await tg(`<b>KAISER</b> circuit breaker: stop ingressi fino a domani`);
  }
  if (!S.autopilot) return;
  await realEntries(buys);   // conto REALE (separato dal paper): solo se acceso in config.json e con l'esecutore collegato
  if (S.paperStop || S.paperEnabled === false) return;   // pannello di emergenza: il paper non apre nuove posizioni (quelle aperte restano gestite)
  // pochi ingressi per scan: più BUY nello stesso istante sono scommesse correlate (stesso regime di mercato)
  let entered = 0;
  for (const c of buys) {
    if (entered >= S.maxEntriesPerScan) { log('KAISER', `limite ${S.maxEntriesPerScan} ingresso/i per scan: $${c.sym} rimandato`); continue; }
    const why = gates(c);
    if (why) continue;
    const before = st.positions.length;
    await buy(c);
    if (st.positions.length > before) entered++;
    if (st.positions.length >= S.maxPos) break;
  }
}

// ---------------- report ----------------
function stats() {
  const J = st.journal, wins = J.filter((j) => j.pnl > 0), losses = J.filter((j) => j.pnl <= 0);
  const pnl = J.reduce((a, j) => a + j.pnl, 0);
  const avg = (arr) => arr.length ? arr.reduce((a, j) => a + j.pct, 0) / arr.length : 0;
  const gw = wins.reduce((a, j) => a + j.pnl, 0), gl = -losses.reduce((a, j) => a + j.pnl, 0);
  return { n: J.length, wr: J.length ? wins.length / J.length * 100 : 0, pnl, aw: avg(wins), al: avg(losses), pf: gl ? gw / gl : (gw ? Infinity : 0) };
}
function report() {
  const s = stats(), eq = equity(), start = S.capitalSOL;
  const by = {}; for (const j of st.journal) { by[j.reason] = by[j.reason] || { n: 0, pnl: 0 }; by[j.reason].n++; by[j.reason].pnl += j.pnl; }
  const days = (Date.now() - st.startedAt) / 86400000;
  const f = (n, d = 4) => (n >= 0 ? '+' : '') + n.toFixed(d);
  return `# KAISER · report paper trading

Aggiornato: ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC · in esecuzione da ${days.toFixed(1)} giorni · ${st.runs} run

| | |
|---|---|
| Equity | **${eq.toFixed(4)} SOL** (${f((eq / start - 1) * 100, 1)}% dal capitale iniziale di ${start} SOL) |
| Cassa | ${st.cash.toFixed(4)} SOL |
| Trade chiusi | ${s.n} |
| Win rate | ${s.wr.toFixed(0)}% |
| P&L realizzato | ${f(s.pnl)} SOL${rt.solUsd ? ` (~$${(s.pnl * rt.solUsd).toFixed(2)})` : ''} |
| Media vincite / perdite | ${f(s.aw, 1)}% / ${f(s.al, 1)}% |
| Profit factor | ${Number.isFinite(s.pf) ? s.pf.toFixed(2) : '∞'} |
| Circuit breaker | ${st.halted ? 'ATTIVO oggi' : 'no'} |

## Posizioni aperte
${st.positions.length ? st.positions.map((p) => `- **$${p.sym}** ${p.id} · ${p.sizeSOL.toFixed(3)} SOL · ${p.last ? f((p.last.priceNative / p.entry - 1) * 100, 1) + '%' : 'n/d'} · resta ${(p.remaining * 100).toFixed(0)}% · [grafico](https://dexscreener.com/solana/${p.pairAddress})`).join('\n') : '_nessuna_'}

## Uscite per motivo
${Object.keys(by).length ? '| Motivo | Trade | P&L SOL |\n|---|---|---|\n' + Object.entries(by).map(([k, v]) => `| ${k} | ${v.n} | ${f(v.pnl)} |`).join('\n') : '_ancora nessuna_'}

## Ultimi 25 trade
${st.journal.length ? '| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |\n|---|---|---|---|---|---|---|---|\n' + [...st.journal].reverse().slice(0, 25).map((j) => `| $${j.sym} | ${j.score} | ${f(j.pct, 1)}% | ${f(j.pnl)} | ${f(j.peakPct || 0, 0)}% | ${j.trigPct == null ? 'n/d' : f(j.trigPct, 0) + '%'} | ${j.reason} | ${Math.round((j.closedAt - j.openedAt) / 60000)}m |`).join('\n') : '_ancora nessuno_'}

## Ultimi eventi
\`\`\`
${st.events.slice(0, 40).join('\n')}
\`\`\`

Regole attive: config.json su questo branch. Solo paper trading.
`;
}
function csv() {
  const rows = [['id', 'token', 'mint', 'apertura', 'chiusura', 'costo_sol', 'rientro_sol', 'pnl_sol', 'pnl_pct', 'picco_pct', 'prezzo_scatto_pct', 'motivo', 'score', 'sol_usd']]
    .concat(st.journal.map((j) => [j.id, j.sym, j.mint, new Date(j.openedAt).toISOString(), new Date(j.closedAt).toISOString(), j.cost.toFixed(6), j.back.toFixed(6), j.pnl.toFixed(6), j.pct.toFixed(2), (j.peakPct || 0).toFixed(1), j.trigPct == null ? '' : j.trigPct.toFixed(1), j.reason, j.score, (j.solUsd || 0).toFixed(2)]));
  return rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n') + '\n';
}

// ---------------- loop ----------------
async function main() {
  const end = Date.now() + LOOP_MIN * 60000;
  log('KAISER', `run #${st.runs} · ${st.positions.length} posizioni · equity ${equity().toFixed(4)} SOL · GMGN ${gmgnRun ? (process.env.GMGN_API_KEY ? 'chiave' : 'demo') : 'off'} · Grok ${S.useGrok ? 'on' : 'off'}`);
  let lastScan = 0;
  while (Date.now() < end) {
    try {
      if (Date.now() - lastScan >= SCAN_SEC * 1000) { lastScan = Date.now(); await scan(); }
      else await manage();
    } catch (e) { log('KAISER', 'errore: ' + (e.stack || e.message).split('\n')[0]); }
    save();
    const left = end - Date.now();
    if (left <= 0) break;
    await sleep(Math.min(TICK_SEC * 1000, left));
  }
  const s = stats();
  log('SCRIBE', `fine run · trade ${s.n} · win ${s.wr.toFixed(0)}% · P&L ${s.pnl.toFixed(4)} SOL · equity ${equity().toFixed(4)} SOL`);
  // riepilogo giornaliero su Telegram, una volta al giorno dopo le 21:00 ora italiana
  const it = new Date(Date.now() + 3600000);
  const dkey = it.toISOString().slice(0, 10);
  if (it.getUTCHours() >= 21 && st.lastDaily !== dkey) {
    st.lastDaily = dkey;
    const today = st.journal.filter((j) => new Date(j.closedAt + 3600000).toISOString().slice(0, 10) === dkey);
    const pd = today.reduce((a, j) => a + j.pnl, 0);
    await tg(`<b>KAISER</b> riepilogo ${dkey}\nOggi: ${today.length} trade, ${pd >= 0 ? '+' : ''}${pd.toFixed(4)} SOL\nTotale: ${s.n} trade, win ${s.wr.toFixed(0)}%, P&L ${s.pnl.toFixed(4)} SOL\nEquity ${equity().toFixed(4)} SOL`);
  }
  save();
  await pushLive(true);
}

if (require.main === module) main().catch((e) => { console.error(e); save(); process.exit(1); });
module.exports = { main, st, S, stats, report, realEntries, rt, publicSummary, pullParams, pushLive };

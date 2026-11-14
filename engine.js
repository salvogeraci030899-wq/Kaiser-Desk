// Motore KAISER: logica pura condivisa da PWA (index.html) e runner (GitHub Actions)
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const num = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };

const DEFAULTS = {
  // Kaiser
  autopilot: false, approve: true, scanSec: 30, minScore: 68, useGrok: false, tg: false,
  // Quartermaster
  capitalSOL: 5, sizePct: 5, maxPos: 3, slippageBps: 300, feePct: 1.0, prioritySOL: 0.0005,
  dailyLossPct: 15, cooldownMin: 10, retradeH: 2, taxPct: 26, maxEntriesPerScan: 1,
  // Charon
  sl: 25, tp1: 40, tp1Sell: 50, trail: 20, beAfterTp1: true, timeStopMin: 45, timeStopMinPnl: 5,
  rugLiqDrop: 45, sellPressure: true,
  // Filtri
  minLiq: 15000, minMcap: 15000, maxMcap: 20000000, minAgeMin: 5, maxAgeH: 72, minTxH1: 40,
  srcDexProfiles: true, srcDexBoosts: true, srcGmgnTrending: true, srcGmgnTrenches: false, gmgnInterval: '1h',
  // Backend
  backend: '', appToken: '',
  // Trading reale: spento finché non lo accendi. Usa le stesse regole del paper (size, stop, TP, trailing),
  // con un tetto di capitale in SOL e un esecutore (server che firma gli swap).
  realEnabled: false, realCapitalSOL: 0, realApprove: true, executor: 'https://kaiser-executor.salvogeraci030899.workers.dev', executorToken: '',
};

// ---- GMGN: normalizza un item (trending/trenches) ----
function gmgnNorm(it) {
  if (!it || typeof it !== 'object') return null;
  const addr = it.address || it.token_address || it.mint;
  if (!MINT_RE.test(addr || '')) return null;
  const rate = (v) => { if (v == null || v === '') return null; let n = Number(v); if (!Number.isFinite(n)) return null; return n > 1 ? n / 100 : n; };
  const bool = (v) => (v === true || v === 1 || v === '1') ? true : (v === false || v === 0 || v === '0') ? false : null;
  return {
    address: addr,
    smart: num(it.smart_degen_count), kol: num(it.renowned_count),
    rug: it.rug_ratio == null ? null : num(it.rug_ratio, null),
    top10: rate(it.top_10_holder_rate),
    honeypot: bool(it.is_honeypot),
    wash: bool(it.is_wash_trading),
    renMint: bool(it.renounced_mint), renFreeze: bool(it.renounced_freeze_account),
    sniper: num(it.sniper_count), bundler: rate(it.bundler_rate ?? it.bundler_trader_amount_rate),
    rat: rate(it.rat_trader_amount_rate), insider: rate(it.suspected_insider_hold_rate),
    devHold: rate(it.dev_team_hold_rate ?? it.creator_token_balance_rate),
    holders: num(it.holder_count),
  };
}
// Trova l'array di token dentro qualunque forma di risposta GMGN
function gmgnList(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return [];
  for (const k of ['rank', 'list', 'tokens', 'items', 'data', 'new_creation', 'pump', 'completed']) {
    const v = data[k];
    if (Array.isArray(v)) return v;
    if (v && typeof v === 'object') { const r = gmgnList(v); if (r.length) return r; }
  }
  for (const v of Object.values(data)) if (Array.isArray(v) && v.length && typeof v[0] === 'object') return v;
  return [];
}

// ---- ORACLE: punteggio di momentum/qualità dal pair DexScreener (+ GMGN se c'è) ----
function analyze(pair, g, S, now = Date.now()) {
  const liq = num(pair.liquidity && pair.liquidity.usd);
  const mc = num(pair.marketCap || pair.fdv);
  const ageMin = pair.pairCreatedAt ? (now - pair.pairCreatedAt) / 60000 : null;
  const t5 = (pair.txns && pair.txns.m5) || { buys: 0, sells: 0 };
  const t1 = (pair.txns && pair.txns.h1) || { buys: 0, sells: 0 };
  const v1 = num(pair.volume && pair.volume.h1);
  const pc = pair.priceChange || {};
  const c5 = num(pc.m5), c1 = num(pc.h1), c6 = num(pc.h6);
  const vetoes = [], notes = [], plus = [];
  let s = 50;

  if (liq < S.minLiq) vetoes.push(`Liquidità $${Math.round(liq)} sotto minimo`);
  else if (liq >= 150000) { s += 8; plus.push('liquidità solida'); }
  else if (liq >= 40000) s += 5;

  if (ageMin != null) {
    if (ageMin < S.minAgeMin) vetoes.push(`Troppo nuovo (${ageMin.toFixed(0)} min)`);
    else if (ageMin > S.maxAgeH * 60) { s -= 10; notes.push('oltre età massima'); }
    else if (ageMin < 240) s += 4;
  }
  if (mc && mc < S.minMcap) { s -= 8; notes.push('mcap minuscola'); }
  if (mc > S.maxMcap) { s -= 8; notes.push('mcap alta: poco upside'); }

  const turn = liq ? v1 / liq : 0;
  if (turn > 3) { s += 8; plus.push(`turnover ${turn.toFixed(1)}x/h`); }
  else if (turn > 1) s += 5;
  else if (turn < 0.2) { s -= 8; notes.push('volume fermo'); }

  const tx1 = num(t1.buys) + num(t1.sells);
  if (tx1 < S.minTxH1) { s -= 10; notes.push(`solo ${tx1} tx/h`); }
  else if (tx1 > 400) s += 5;

  const br1 = (num(t1.buys) + 1) / (num(t1.sells) + 1);
  const br5 = (num(t5.buys) + 1) / (num(t5.sells) + 1);
  s += clamp((br1 - 1) * 10, -10, 10) + clamp((br5 - 1) * 6, -8, 8);
  if (br5 > 1.5 && num(t5.buys) >= 10) plus.push('pressione in acquisto');
  if (br5 < 0.6 && num(t5.sells) >= 10) notes.push('vendite dominanti 5m');

  if (c5 > 0 && c1 > 0) s += 5;
  if (c1 < -30) { s -= 10; notes.push(`-${Math.abs(c1).toFixed(0)}% in 1h`); }
  if (c1 > 300 || c6 > 800) { s -= 12; notes.push('troppo esteso: rischio top'); }

  const info = pair.info || {};
  const soc = (info.socials || []).length + (info.websites || []).length;
  if (soc === 0) { s -= 8; notes.push('nessun social'); } else s += 3;

  if (g) {
    if (g.honeypot === true) vetoes.push('Honeypot (GMGN)');
    if (g.rug != null && g.rug > 0.3) vetoes.push(`Rug ratio ${g.rug.toFixed(2)} (GMGN)`);
    if (g.renMint === false) vetoes.push('Mint non rinunciato (GMGN)');
    if (g.renFreeze === false) vetoes.push('Freeze non rinunciato (GMGN)');
    if (g.smart) { s += Math.min(g.smart * 2, 12); plus.push(`${g.smart} smart money`); }
    if (g.kol) { s += Math.min(g.kol * 2, 6); plus.push(`${g.kol} KOL`); }
    if (g.top10 != null && g.top10 > 0.5) { s -= 10; notes.push(`top10 ${(g.top10 * 100).toFixed(0)}%`); }
    if (g.wash === true) { s -= 10; notes.push('wash trading'); }
    if (g.bundler != null && g.bundler > 0.3) { s -= 8; notes.push('bundler alti'); }
    if (g.insider != null && g.insider > 0.2) { s -= 8; notes.push('insider alti'); }
    if (g.rat != null && g.rat > 0.3) { s -= 6; notes.push('rat trader'); }
  }
  return {
    base: clamp(Math.round(s), 0, 100), vetoes, notes, plus,
    m: { liq, mc, ageMin, v1, tx1, br1, br5, c5, c1, c6, turn, price: num(pair.priceUsd), priceNative: num(pair.priceNative) },
  };
}

// ---- SENTINEL: rapporto RugCheck -> veti e penalità ----
function sentinel(rep) {
  const out = { vetoes: [], notes: [], penalty: 0, ok: false };
  if (!rep || typeof rep !== 'object') return out;
  out.ok = true;
  if (rep.rugged === true) out.vetoes.push('Segnalato come RUGGED');
  const tk = rep.token || {};
  if (rep.mintAuthority || tk.mintAuthority) out.vetoes.push('Mint authority attiva');
  if (rep.freezeAuthority || tk.freezeAuthority) out.vetoes.push('Freeze authority attiva');
  for (const r of rep.risks || []) {
    const name = String(r.name || '');
    const lvl = String(r.level || '').toLowerCase();
    if (/freeze authority|mint authority|honeypot|rugged/i.test(name)) { if (!out.vetoes.some(v => v.toLowerCase().includes(name.toLowerCase().slice(0, 8)))) out.vetoes.push(name); continue; }
    if (lvl === 'danger') { out.penalty += 12; out.notes.push(name); }
    else if (lvl === 'warn') { out.penalty += 5; out.notes.push(name); }
  }
  const sn = num(rep.score_normalised, null);
  if (sn != null && sn >= 80) out.vetoes.push(`Rischio RugCheck ${sn}/100`);
  else if (sn != null && sn >= 50) out.penalty += 8;
  if (rep.graphInsidersDetected > 0) { out.penalty += Math.min(15, 3 * num(rep.graphInsidersDetected)); out.notes.push(`${rep.graphInsidersDetected} reti insider`); }
  out.penalty = Math.min(out.penalty, 40);
  return out;
}

// ---- GROK: sentiment X -> aggiustamento punteggio ----
function grokAdj(gr) {
  if (!gr || !gr.ok) return 0;
  return clamp(Math.round(gr.sentiment * 8 + (gr.organic - 5) * 0.8 - (gr.redFlags || []).length * 3), -12, 12);
}

// ---- KAISER: decisione finale ----
function decide(a, sec, gr, S) {
  const vetoes = [...a.vetoes, ...(sec ? sec.vetoes : [])];
  const score = clamp(a.base - (sec ? sec.penalty : 0) + grokAdj(gr), 0, 100);
  let verdict;
  if (vetoes.length) verdict = 'VETO';
  else if (score >= S.minScore && sec && sec.ok) verdict = 'BUY';
  else if (score >= S.minScore - 12) verdict = 'WATCH';
  else verdict = 'SKIP';
  const why = (!sec || !sec.ok) && score >= S.minScore ? 'sicurezza non ancora verificata' : '';
  return { score, verdict, vetoes, why };
}

// ---- QUARTERMASTER: matematica dei fill (paper) ----
function estImpact(sizeUsd, liqUsd) {
  if (!liqUsd) return 0.2;
  return clamp(sizeUsd / (liqUsd / 2), 0, 0.5); // AMM a prodotto costante, metà pool lato quote
}
function entryPrice(priceNative, impact, feePct) { return priceNative * (1 + impact) * (1 + feePct / 100); }
function exitSol(tokens, priceNative, impact, feePct, prioritySOL) {
  return Math.max(0, tokens * priceNative * (1 - impact) * (1 - feePct / 100) - prioritySOL);
}

// ---- CHARON: regole d'uscita, restituisce {frac, reason} oppure null ----
function charon(p, m, S, now = Date.now()) {
  if (!m || !m.priceNative) return null;
  const pnl = (m.priceNative / p.entry - 1) * 100;
  const fromPeak = p.peak ? (m.priceNative / p.peak - 1) * 100 : 0;
  const ageMin = (now - p.openedAt) / 60000;
  if (p.entryLiq && m.liq && m.liq < p.entryLiq * (1 - S.rugLiqDrop / 100))
    return { frac: 1, reason: 'RUG-EXIT liquidità' };
  if (pnl <= -S.sl) return { frac: 1, reason: 'Stop loss' };
  if (p.tp1Done && S.beAfterTp1 && pnl <= 0) return { frac: 1, reason: 'Break-even' };
  if (!p.tp1Done && pnl >= S.tp1) return { frac: S.tp1Sell / 100, reason: 'TP1', tp1: true };
  if (p.tp1Done && fromPeak <= -S.trail) return { frac: 1, reason: 'Trailing stop' };
  if (!p.tp1Done && ageMin >= S.timeStopMin && pnl < S.timeStopMinPnl) return { frac: 1, reason: 'Time stop' };
  if (S.sellPressure && !p.spDone && pnl > 10 && m.br5 < 0.5 && m.tx5 >= 20) return { frac: 0.5, reason: 'Pressione vendite', sp: true };
  return null;
}

// ---- REALE: cancello unico, fallisce sempre chiuso. Restituisce '' solo se TUTTE le condizioni sono vere ----
function realGate(S, ex) {
  if (!S.realEnabled) return 'trading reale spento';
  if (!(num(S.realCapitalSOL) > 0)) return 'capitale reale a 0';
  if (!S.executor) return 'esecutore non configurato';
  if (!ex || ex.ok !== true) return 'esecutore non raggiungibile';
  if (ex.killed === true) return 'esecutore fermato (kill switch)';
  if (!ex.wallet) return ex.walletError ? 'wallet: ' + ex.walletError : 'wallet non configurato nell’esecutore';
  if (ex.balanceSOL == null) return 'saldo del wallet non leggibile';
  if (num(ex.balanceSOL) <= 0) return 'wallet reale senza fondi';
  if (ex.mode !== 'dryrun' && ex.mode !== 'live') return 'ordini disattivati nell’esecutore (ORDERS_MODE=off)';
  if (ex.jupiterConfigured !== true) return 'JUPITER_PROGRAM_ID non configurato nell’esecutore';
  return '';
}

if (typeof module !== 'undefined') module.exports = { realGate, DEFAULTS, gmgnNorm, gmgnList, analyze, sentinel, grokAdj, decide, estImpact, entryPrice, exitSol, charon, clamp };

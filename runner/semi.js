// KAISER · modalita' semi-automatica: il radar sceglie la Coin, tu entri a mano. Invece di aprire la posizione, il runner manda un avviso con il collegamento diretto a pump.fun
// (Telegram e app) e segue il prezzo del segnale per 15 minuti, cosi' si vede se i segnali erano buoni. Non apre ordini.
'use strict';
const Kb = require('./kb.js');
const E = require('../engine.js');

const MAX_PER_HOUR = 30;         // tetto di sicurezza (non di selezione): con 8 all'ora il primo gruppo di avvisi teneva fuori le Coin successive per un'ora, e alcune arrivavano dopo il movimento
const REPEAT_H = 24;             // la stessa Coin non si segnala di nuovo prima di 24 ore: con 3 ore la stessa Coin tornava ogni 3 ore (8 avvisi su 23 erano ripetizioni) e i campioni non erano indipendenti
const TRACK_MS = 17 * 60000;     // si segue il prezzo del segnale fino a 15 minuti (piu' un margine)
const MODES = ['spento', 'avvisi e paper', 'solo avvisi'];
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const k = (v) => (v >= 1e6 ? (v / 1e6).toFixed(1) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : String(Math.round(v)));

// Coin da segnalare in questo giro: BUY del radar (gia' in ordine di punteggio) che non sono state segnalate da poco, entro il limite orario
function pick(alerts, buys, now, ok) {
  let sent = alerts.filter((a) => now - a.t < 3600000).length; const out = [];
  for (const c of buys) {
    if (sent >= MAX_PER_HOUR) break; if (!c || !MINT_RE.test(c.mint || '')) continue; if (ok && !ok(c)) continue;
    if (alerts.some((a) => a.mint === c.mint && now - a.t < REPEAT_H * 3600000) || out.some((x) => x.mint === c.mint)) continue;
    out.push(c); sent++;
  }
  return out;
}
function alertOf(c, now) {
  const m = (c.a && c.a.m) || {}, pair = (c.pair && c.pair.pairAddress) || '';
  return { id: 'a' + Math.floor(now / 1000).toString(36), band: c.band || '', cr: c.cr || '', cline: c.cline || '', t: now, mint: c.mint, sym: String(c.sym || '').slice(0, 20), name: String(c.name || '').slice(0, 40), score: num(c.score), pair: MINT_RE.test(pair) ? pair : '', priceNative: num(m.priceNative), mc: num(m.mc), liq: num(m.liq), ageMin: m.ageMin == null ? null : +num(m.ageMin).toFixed(1),
    why: ((c.a && c.a.plus) || []).slice(0, 3).map((x) => String(x).slice(0, 60)) };
}
const pumpUrl = (a) => `https://pump.fun/coin/${a.mint}`;
// Il messaggio non mostra il punteggio del bot ne' i suoi motivi: la decisione e' tua, cosi' si misura il tuo giudizio e non quello del bot.
function text(a) {
  const bits = [a.mc ? 'market cap $' + k(a.mc) : '', a.ageMin != null ? 'età ' + Math.round(a.ageMin) + ' min' : '', a.liq ? 'liquidità $' + k(a.liq) : ''].filter(Boolean).join(' · ');
  return `<b>SEGNALE</b> $${esc(a.sym || a.mint.slice(0, 6))}${a.band ? ' · fascia ' + esc(a.band) : ''}\n${bits}${a.cline ? '\n' + esc(a.cline) : ''}\nDecidi tu: Prendo o Scarto. Con Prendo il paper apre subito la posizione e la gestisce da solo con le uscite impostate. Per entrare davvero apri la Coin su pump.fun.`;
}
const voteRow = (a) => (/^a[0-9a-z]{4,8}$/.test(a.id || '') ? [[{ text: 'Prendo', callback_data: 'hd:y:' + a.id }, { text: 'Scarto', callback_data: 'hd:n:' + a.id }]] : []);
function keyboard(a) { return Kb.kb({ rows: voteRow(a), mint: a.mint, pair: a.pair }); }
// Segnali ancora da seguire (meno di 17 minuti, senza ancora entrambe le misure)
const open = (alerts, now) => alerts.filter((a) => now - a.t < TRACK_MS && (a.p5 == null || a.p15 == null));
// Registra il prezzo corrente rispetto a quello del segnale: variazione ora, minimo, dopo 5 e dopo 15 minuti
function track(a, px, now) {
  if (!(px > 0) || !(a.priceNative > 0)) return false;
  const r = +((px / a.priceNative - 1) * 100).toFixed(1), age = now - a.t; a.last = r; a.min = a.min == null ? r : Math.min(a.min, r);
  if (age >= 5 * 60000 && a.p5 == null) a.p5 = r; if (age >= 15 * 60000 && a.p15 == null) a.p15 = r; return true;
}
// Vista compatta per l'app
const view = (alerts, n) => alerts.slice(-(n || 20)).map((a) => ({ t: a.t, mint: a.mint, sym: a.sym, score: a.score, band: a.band || '', cline: a.cline || '', vote: a.vote || '', pair: a.pair, mc: a.mc, ageMin: a.ageMin, last: a.last == null ? null : a.last, min: a.min == null ? null : a.min, p5: a.p5 == null ? null : a.p5, p15: a.p15 == null ? null : a.p15, gr: a.gr ? { s: a.gr.s, o: a.gr.o, f: a.gr.f } : null }));

// Decisione presa da te (y = prendo, n = scarto). Una sola per segnale. vp = variazione del prezzo del segnale al momento in cui il runner la registra.
function vote(alerts, id, v, at) {
  const a = alerts.find((x) => x.id === id);
  if (!a || a.vote || (v !== 'y' && v !== 'n')) return false;
  a.vote = v; a.vAt = at; a.vp = a.last == null ? 0 : a.last; return true;
}
// Confronto tra i segnali presi e scartati: rendimento a 5 minuti dalla decisione, meno il costo di un giro. Regola decisa in anticipo: almeno minY presi e minN scartati,
// netto medio dei presi >= passMeanPct, limite inferiore del 95% sopra zero e sopra gli scartati (differenza con limite inferiore > 0).
// since: inizio pulito del test (impostato dal runner, vedi st.cleanSince): i Prendo e gli Scarto precedenti restano nel registro ma non contano nel verdetto, perche' i primi avvisi avevano difetti poi corretti (id duplicati, blocco per slippage)
const HCFG = { costPct: 5, minY: 50, minN: 30, passMeanPct: 3, since: 0 };
const fresh = (t) => (Number(t) || 0) >= HCFG.since;
function ms(xs) {
  const n = xs.length;
  if (!n) return { n: 0 };
  const m = xs.reduce((p, q) => p + q, 0) / n, v = n > 1 ? xs.reduce((p, q) => p + (q - m) ** 2, 0) / (n - 1) : 0;
  return { n, m, v };
}
function humanStats(alerts, o) {
  const c = { ...HCFG, ...(o || {}) }, y = [], nn = [];
  let noAns = 0, late = 0;
  for (const a of alerts) {
    if (!a.vote) { if (a.p15 != null) noAns++; continue; }
    if (a.p5 == null || a.vAt - a.t >= 5 * 60000) { late++; continue; }
    const r = ((1 + a.p5 / 100) / (1 + (a.vp || 0) / 100) - 1) * 100 - c.costPct;
    (a.vote === 'y' ? y : nn).push(r);
  }
  const A = ms(y), B = ms(nn), out = { cfg: c, y: A.n, n: B.n, noAns, late, verdict: 'in corso' };
  if (A.n >= 2) { const se = Math.sqrt(A.v / A.n); Object.assign(out, { yMean: +A.m.toFixed(2), yLo: +(A.m - 1.96 * se).toFixed(2), yHi: +(A.m + 1.96 * se).toFixed(2) }); }
  if (B.n >= 2) out.nMean = +B.m.toFixed(2);
  if (A.n >= 2 && B.n >= 2) { const se = Math.sqrt(A.v / A.n + B.v / B.n), d = A.m - B.m; Object.assign(out, { diff: +d.toFixed(2), diffLo: +(d - 1.96 * se).toFixed(2) }); }
  if (A.n >= c.minY && B.n >= c.minN) out.verdict = (out.yMean >= c.passMeanPct && out.yLo > 0 && out.diffLo > 0) ? 'passa' : 'non passa';
  return out;
}

// Trade paper aperti da te (Prendo) contro quelli del bot: rendimento netto vero (impatto, commissioni, priority fee, uscite con le regole impostate).
// Regola decisa in anticipo: almeno minN trade tuoi chiusi, netto medio >= passMeanPct e limite inferiore del 95% sopra zero.
function humanTrades(journal, o) {
  const c = { minN: 50, passMeanPct: 3, ...(o || {}) }, h = journal.filter((j) => j.src === 'umano' && fresh(j.openedAt || j.closedAt)).map((j) => j.pct), b = journal.filter((j) => j.src !== 'umano').map((j) => j.pct);
  const A = ms(h), B = ms(b), out = { cfg: c, n: A.n, botN: B.n, verdict: 'in corso' };
  if (A.n >= 2) { const se = Math.sqrt(A.v / A.n); Object.assign(out, { mean: +A.m.toFixed(2), lo: +(A.m - 1.96 * se).toFixed(2), hi: +(A.m + 1.96 * se).toFixed(2), win: +(100 * h.filter((v) => v > 0).length / A.n).toFixed(1) }); }
  if (B.n >= 2) out.botMean = +B.m.toFixed(2);
  if (A.n >= 2 && B.n >= 2) { const se = Math.sqrt(A.v / A.n + B.v / B.n), d = A.m - B.m; Object.assign(out, { diff: +d.toFixed(2), diffLo: +(d - 1.96 * se).toFixed(2) }); }
  if (A.n >= c.minN) out.verdict = (out.mean >= c.passMeanPct && out.lo > 0) ? 'passa' : 'non passa';
  return out;
}

// Uscite proprie dei Prendo in fascia alta (le stesse per il controllo sugli Scarto). Il tempo massimo vale sempre: dopo timeStopMin la prima meta' esce comunque.
function bandExits(S) {
  const D = E.DEFAULTS, g = (k) => (Number.isFinite(Number(S[k])) ? Number(S[k]) : D[k]);
  return { sl: g('humanBandSl'), tp1: g('humanBandTp'), tp1Sell: g('humanBandTpSell'), trail: g('humanBandTrail'), beAfterTp1: true, timeStopMin: g('humanBandHoldMin'), timeStopMinPnl: 1e9, sellPressure: false };
}
// Controllo equo: uno Scarto si simula come se fosse stato preso, con le stesse uscite e gli stessi costi (stimati dalla liquidita', non dalla quotazione).
// Prezzo di partenza: quello del segnale corretto con la variazione vista al momento della decisione.
const SHADOW_MAX_H = 72;
function shadowOpen(a, S, now, sizeSol, usd) {
  if (a.sh || !(a.priceNative > 0)) return false;
  const px = a.priceNative * (1 + (a.vp || 0) / 100), liq = Number(a.liq) || 0, imp = E.estImpact(sizeSol * usd, liq);
  const e = E.entryPrice(px, imp, S.feePct);
  a.sh = { e, peak: e, t0: now, tp1: false, rem: 1, got: 0, liq, size: sizeSol, usd, done: false, xs: bandExits(S), cost: sizeSol + (Number(S.prioritySOL) || 0) };      // le uscite restano quelle di partenza anche se i parametri cambiano
  return true;
}
// m = { priceNative, liq, br5, tx5 } letti ora; restituisce l'uscita decisa oppure null
function shadowStep(a, m, S, now) {
  const s = a.sh; if (!s || s.done || !m || !(m.priceNative > 0)) return null;
  if (m.priceNative > s.peak) s.peak = m.priceNative;
  let act = E.charon({ entry: s.e, peak: s.peak, openedAt: s.t0, tp1Done: s.tp1, entryLiq: s.liq, xs: s.xs || bandExits(S) }, m, S, now);
  if (!act && now - s.t0 > SHADOW_MAX_H * 3600000) act = { frac: 1, reason: 'Limite di tempo' };
  if (!act) return null;
  const frac = Math.min(1, act.frac), tokens = s.size / s.e * s.rem * frac, imp = E.estImpact(tokens * m.priceNative * s.usd, m.liq);
  s.got += E.exitSol(tokens, m.priceNative, imp, S.feePct, S.prioritySOL); s.rem *= 1 - frac; if (act.tp1) s.tp1 = true;
  if (frac >= 0.999 || s.rem < 0.001) { s.done = true; s.pct = (s.got / (s.size + S.prioritySOL) - 1) * 100; s.reason = act.reason; s.t1 = now; }
  return act;
}
// Prendo reali in paper contro Scarto simulati con le stesse uscite
function controlStats(journal, alerts) {
  const h = journal.filter((j) => j.src === 'umano' && j.band && fresh(j.openedAt || j.closedAt)).map((j) => j.pct), c = alerts.filter((a) => a.vote === 'n' && a.sh && a.sh.done && fresh(a.t)).map((a) => a.sh.pct);      // solo gli Scarto: la simulazione di un Prendo non aperto e' un'altra cosa
  const A = ms(h), B = ms(c), out = { y: A.n, n: B.n, open: alerts.filter((a) => a.vote === 'n' && a.sh && !a.sh.done && fresh(a.t)).length };
  // la media si mostra gia' con un solo caso; l'intervallo di confidenza servono almeno due
  if (A.n >= 1) out.yMean = +A.m.toFixed(2);
  if (B.n >= 1) { out.nMean = +B.m.toFixed(2); out.nWin = +(100 * c.filter((v) => v > 0).length / B.n).toFixed(1); }
  if (B.n >= 2) { const se = Math.sqrt(B.v / B.n); Object.assign(out, { nLo: +(B.m - 1.96 * se).toFixed(2), nHi: +(B.m + 1.96 * se).toFixed(2) }); }
  if (A.n >= 1 && B.n >= 1) out.diff = +(A.m - B.m).toFixed(2);
  if (A.n >= 2 && B.n >= 2) { const se = Math.sqrt(A.v / A.n + B.v / B.n); out.diffLo = +(A.m - B.m - 1.96 * se).toFixed(2); }
  return out;
}

// Riepilogo del flusso uomo e macchina per Telegram (senza emoji). Il giorno e' quello italiano, come il riepilogo di sempre.
const dayIt = (t) => new Date(t + 3600000).toISOString().slice(0, 10);
const sgn = (n, d = 1) => (n == null ? 'n/d' : (n >= 0 ? '+' : '') + Number(n).toFixed(d));
function digestText(o) {
  const now = o.now || Date.now(), day = dayIt(now), al = (o.alerts || []).filter((a) => dayIt(a.t) === day), bands = {};
  for (const a of al) bands[a.band || 'altro'] = (bands[a.band || 'altro'] || 0) + 1;
  const mine = (o.journal || []).filter((j) => j.src === 'umano'), today = mine.filter((j) => dayIt(j.closedAt) === day), t = humanTrades(o.journal || []), k = controlStats(o.journal || [], o.alerts || []);
  const open = (o.positions || []).filter((p) => p.src === 'umano').length, bd = (o.bandDays || {})[new Date(now).toISOString().slice(0, 10)] || { c: 0, nv: 0 }, c = o.cr || {}, cov = c.cov || {}, calls = (cov.tabella || 0) + (cov.esterna || 0) + (cov.sconosciuto || 0);
  const mean = today.length ? today.reduce((s, j) => s + j.pct, 0) / today.length : null;
  const rs = responseStats(al, decisions(o.alerts || [], o.journal || [], o.positions || [], 1e9), now), miss = al.filter((a) => !a.vote).length;
  const resp = `Risposte: ${rs.answered} di ${rs.n} avvisi di oggi${rs.medS == null ? '' : ', tempo mediano ' + (rs.medS < 90 ? rs.medS + ' s' : Math.round(rs.medS / 60) + ' min')}${rs.notOpened ? ' · Prendo non aperti in tutto: ' + rs.notOpened : ''}${miss ? '\nSenza risposta: ' + miss + ' (scaduti, non recuperabili). Ogni Prendo o Scarto in più fa avanzare il test' : ''}`;
  return `<b>KAISER</b> uomo e macchina ${day}\n` + resp + '\n' +
    `Avvisi oggi: ${al.length}${al.length ? ' (' + Object.entries(bands).map(([b, n]) => b + ' ' + n).join(', ') + ')' : ''} · Prendo ${al.filter((a) => a.vote === 'y').length} · Scarto ${al.filter((a) => a.vote === 'n').length} · senza risposta ${al.filter((a) => !a.vote).length}\n` +
    `Tue posizioni aperte: ${open} · chiuse oggi: ${today.length}${mean == null ? '' : ', netto medio ' + sgn(mean) + '%'}\n` +
    `Tuoi trade chiusi in tutto: ${t.n} di ${t.cfg.minN}${t.mean == null ? '' : ', netto medio ' + sgn(t.mean) + '% (intervallo ' + sgn(t.lo) + '% / ' + sgn(t.hi) + '%)'}\n` +
    `Scarti simulati chiusi: ${k.n}${k.nMean == null ? '' : ', netto medio ' + sgn(k.nMean) + '%'}\n` +
    `Coin di fascia alta viste oggi: ${bd.c}, con punteggio sufficiente: ${bd.nv}\n` +
    `Creatori: ${c.launches || 0} lanci noti, ${c.bandCoins || 0} Coin in fascia alta, ${c.doubled || 0} raddoppiate${calls ? ', creatore sconosciuto nel ' + Math.round(100 * (cov.sconosciuto || 0) / calls) + '% dei casi' : ''}`;
}
// Revisione a 7 giorni, con criteri decisi in anticipo: meno di 15 avvisi in fascia alta, oppure creatore sconosciuto in oltre l'80% dei casi = dati insufficienti
const REVIEW = { days: 7, minAlerts: 15, maxUnknown: 0.8 };
function reviewOf(o) {
  const al = (o.alerts || []).filter((a) => a.band && a.t >= (o.since || 0)), c = (o.cr && o.cr.cov) || {}, calls = (c.tabella || 0) + (c.esterna || 0) + (c.sconosciuto || 0), unk = calls ? (c.sconosciuto || 0) / calls : 1;
  const t = humanTrades(o.journal || []), few = al.length < REVIEW.minAlerts, blind = unk > REVIEW.maxUnknown;
  return { alerts: al.length, unknown: +unk.toFixed(2), trades: t.n, need: t.cfg.minN, enough: !few && !blind, few, blind };
}
function reviewText(r) {
  const head = `<b>KAISER</b> revisione a ${REVIEW.days} giorni (criteri decisi in anticipo)\nAvvisi in fascia alta: ${r.alerts} (servono almeno ${REVIEW.minAlerts}) · creatore sconosciuto: ${Math.round(100 * r.unknown)}% (massimo ${Math.round(100 * REVIEW.maxUnknown)}%) · tuoi trade chiusi: ${r.trades} di ${r.need}\n`;
  return head + (r.enough ? 'I dati bastano: si va avanti fino a ' + r.need + ' trade chiusi, poi si applica la regola di superamento.' : 'I dati non bastano' + (r.few ? ': pochi avvisi' : '') + (r.blind ? ': troppi creatori sconosciuti' : '') + '. Conviene fermare o semplificare il test: decidi tu.');
}

// Il paper e' il registro delle decisioni sugli avvisi: ogni avviso con Prendo o Scarto diventa una riga. Prendo = posizione paper vera (aperta o chiusa);
// Scarto = simulazione con le stesse uscite. Un'unica lista, nessun bot a parte.
function decisions(alerts, journal, positions, n) {
  const jr = new Map((journal || []).filter((j) => j.aid).map((j) => [j.aid, j])), pos = new Map((positions || []).filter((p) => p.aid).map((p) => [p.aid, p])), out = [];
  for (const a of alerts || []) {
    if (!a.vote) continue;
    const base = { id: a.id, t: a.t, mint: a.mint, sym: a.sym, band: a.band || '', vote: a.vote };
    if (a.vote === 'y') {
      const j = jr.get(a.id), p = pos.get(a.id);
      if (j) out.push({ ...base, status: 'chiuso', pct: +Number(j.pct).toFixed(1), pnl: +Number(j.pnl).toFixed(4), reason: j.reason, at: j.closedAt });
      else if (p) out.push({ ...base, status: 'aperto', pct: p.last && p.entry > 0 ? +((p.last.priceNative / p.entry - 1) * 100).toFixed(1) : null, pnl: null, reason: 'in corso', at: p.openedAt });
      else out.push({ ...base, status: 'non aperto', pct: null, pnl: null, reason: 'non aperto' + (a.nw ? ': ' + a.nw : '') + (a.sh && a.sh.done ? ` (simulato ${Number(a.sh.pct) > 0 ? '+' : ''}${Number(a.sh.pct).toFixed(1)}%)` : ''), at: a.vAt || a.t });
    } else {
      const s = a.sh;
      if (s && s.done) { const got = Number(s.got), cost = s.cost != null ? s.cost : (1 + s.pct / 100) > 0.001 ? got / (1 + s.pct / 100) : s.size; out.push({ ...base, status: 'chiuso', pct: +Number(s.pct).toFixed(1), pnl: Number.isFinite(got) && Number.isFinite(cost) ? +(got - cost).toFixed(4) : null, reason: s.reason, at: s.t1 }); }
      else out.push({ ...base, status: s ? 'aperto' : 'senza simulazione', pct: null, pnl: null, reason: s ? 'in corso' : 'senza simulazione', at: a.vAt || a.t });
    }
  }
  return out.sort((x, y) => (y.at || y.t) - (x.at || x.t)).slice(0, n || 60);
}

// Totali per i riquadri del Journal: contano SOLO i trade presi (Prendo) e chiusi, perche' sono l'andamento della strategia. Gli scartati (simulati) non entrano nei calcoli: `nn` li conta soltanto.
function decisionTotals(alerts, journal, positions) {
  const all = decisions(alerts, journal, positions, 1e9).filter((x) => x.status === 'chiuso' && x.pct != null && x.pnl != null), d = all.filter((x) => x.vote === 'y' && fresh(x.t)).sort((a, b) => (a.at || a.t) - (b.at || b.t));
  const wins = d.filter((x) => x.pnl > 0), losses = d.filter((x) => x.pnl <= 0), gw = wins.reduce((s, x) => s + x.pnl, 0), gl = -losses.reduce((s, x) => s + x.pnl, 0), avg = (a) => (a.length ? a.reduce((s, x) => s + x.pct, 0) / a.length : 0);
  let cum = 0, peak = 0, dd = 0; for (const x of d) { cum += x.pnl; peak = Math.max(peak, cum); dd = Math.max(dd, peak - cum); }
  return { n: d.length, y: d.length, nn: all.filter((x) => x.vote === 'n').length, wr: d.length ? +(100 * wins.length / d.length).toFixed(1) : 0, pnl: +(gw - gl).toFixed(4), aw: +avg(wins).toFixed(1), al: +avg(losses).toFixed(1), pf: gl ? +(gw / gl).toFixed(2) : (gw ? 999 : 0), dd: +dd.toFixed(4) };
}

// Identificativo unico per ogni avviso. L'id si basa sul secondo di creazione: piu' avvisi dello stesso giro avevano lo stesso id (3-4 insieme), quindi la risposta a uno
// finiva sul primo con quell'id e il Worker accettava una sola risposta per id. Si aggiunge un suffisso finche' l'id non e' libero (resta di 5-9 caratteri dopo la «a»).
function uniqueId(alerts, id) {
  let out = id, n = 0; const used = new Set((alerts || []).map((x) => x.id));
  while (used.has(out)) out = id + (n++).toString(36);
  return out;
}

// Come rispondi agli avvisi: quanti hanno una risposta, quanti sono scaduti senza (dopo 5 minuti un Prendo non apre piu' nulla), il tempo mediano di risposta e i Prendo che il paper non ha aperto.
// Serve a capire se il test misura il tuo giudizio o i tuoi ritardi; e' descrittivo e non entra in nessun conteggio del test.
function responseStats(alerts, decs, now) {
  const t = now || Date.now(), al = alerts || [], secs = al.filter((a) => a.vote && a.vAt && a.vAt >= a.t).map((a) => (a.vAt - a.t) / 1000).sort((x, y) => x - y), m = secs.length >> 1;
  return {
    n: al.length, answered: al.filter((a) => a.vote).length, expired: al.filter((a) => !a.vote && t - a.t >= 5 * 60000).length,
    medS: secs.length ? Math.round(secs.length % 2 ? secs[m] : (secs[m - 1] + secs[m]) / 2) : null, notOpened: (decs || []).filter((d) => d.vote === 'y' && d.status === 'non aperto').length,
  };
}

module.exports = { uniqueId, responseStats, decisions, decisionTotals, digestText, reviewOf, reviewText, REVIEW, vote, humanStats, humanTrades, bandExits, shadowOpen, shadowStep, controlStats, HCFG, MAX_PER_HOUR, REPEAT_H, TRACK_MS, MODES, pick, alertOf, text, keyboard, pumpUrl, open, track, view };

// KAISER · registro delle regole e prova in avanti (solo prova, nessun ordine).
// Una regola nasce quando la fabbrica la trova positiva sui dati vecchi e su quelli recenti. Da quel momento gira "in ombra" sui token NATI DOPO l'ammissione
// (dati mai visti da chi l'ha scelta): e' il test piu' onesto. Stati: prova -> validata, oppure ritirata. Una regola validata puo' solo essere PROPOSTA per l'uso;
// nessuna regola apre ordini da sola.
'use strict';
const fs = require('node:fs');
const Farm = require('./farm.js'), Rug = require('./rug.js');

const MAX_TEST = 10;                         // regole in prova contemporaneamente
const MIN_FWD = 30;                          // operazioni minime in avanti per validare
const MIN_SPAN_MS = 24 * 3600000;            // le operazioni devono coprire almeno un giorno intero
const MIN_PF = 1.1;
const EARLY_N = 20, EARLY_EV = -2;           // dopo 20 operazioni un esito medio sotto -2% la ritira subito
const GIVE_UP_N = 60;                        // dopo 60 operazioni non validata: non e' abbastanza forte
const STALE_MS = 3 * 86400000;               // in 3 giorni meno di 10 segnali: ritirata
const COOL_MS = 7 * 86400000;                // una configurazione ritirata non rientra per 7 giorni
const DD_MAX = 60;                           // perdita cumulata (punti %) oltre il massimo di una validata: ritirata
const RECENT = 30;
const ACCT_START = 1, ACCT_SIZE = 0.1, ACCT_KEEP = 100, ACCT_CURVE = 150;   // conto paper della strategia corrente: 1 SOL, 10% dell'equity per operazione
const RETIRE_MIN_N = 100, RETIRE_Z = 1.65, RETIRE_COOL_MS = 3 * 86400000;   // la corrente si ritira dopo 100 operazioni in avanti se l'esito medio e' negativo con certezza (95%); non rientra per 3 giorni
const SWITCH_MARGIN = 1;                      // una nuova migliore sostituisce la corrente solo se la batte di almeno 1 punto percentuale (peggiore dei due esiti)
const MIN_HOLD_MS = 6 * 3600000;              // e non prima di 6 ore dall'adozione: niente cambi a raffica                           // finestra mobile per controllare che una validata non peggiori

const key = (c) => [c.thr, c.delay, c.tp, c.sl, c.hold].concat(c.flt ? [c.flt.k, c.flt.dir, c.flt.cut] : []).join('/');
const blank = () => ({ sq: 0, n: 0, sum: 0, win: 0, gain: 0, loss: 0, cum: 0, peak: 0, dd: 0, first: 0, last: 0, recent: [] });
const stats = (f) => { const n = f.n; return { n, ev: n ? +(f.sum / n).toFixed(2) : 0, win: n ? Math.round(100 * f.win / n) : 0, pf: f.loss > 0 ? +(f.gain / f.loss).toFixed(2) : (f.gain > 0 ? 99 : 0), dd: +f.dd.toFixed(1), span: f.n ? f.last - f.first : 0 }; };

function acctBlank(now) { return { start: ACCT_START, since: now || 0, eq: ACCT_START, n: 0, win: 0, gain: 0, loss: 0, peak: ACCT_START, dd: 0, trades: [], curve: [] }; }
function create() { return { v: 1, seq: 0, lastFarm: 0, items: [], log: [] }; }
function normalize(o) {
  const r = create(); if (!o || typeof o !== 'object' || !Array.isArray(o.items)) return r;
  r.seq = Number(o.seq) || 0; if (o.settled && typeof o.settled === 'object') r.settled = o.settled; if (o.retired && typeof o.retired === 'object') r.retired = o.retired; if (Array.isArray(o.notes)) r.notes = o.notes.slice(-5);
  if (o.acct && Number.isFinite(o.acct.eq)) r.acct = { ...acctBlank(), ...o.acct, trades: Array.isArray(o.acct.trades) ? o.acct.trades.slice(-ACCT_KEEP) : [], curve: Array.isArray(o.acct.curve) ? o.acct.curve.slice(-ACCT_CURVE) : [] };
  if (o.current && o.current.cfg) r.current = { ...o.current, fwd: { ...blank(), ...(o.current.fwd || {}) }, prev: Array.isArray(o.current.prev) ? o.current.prev.slice(-10) : [] }; r.lastFarm = Number(o.lastFarm) || 0; r.log = Array.isArray(o.log) ? o.log.slice(-40) : [];
  for (const s of o.items) if (s && s.cfg && s.status) r.items.push({ ...s, fwd: { ...blank(), ...(s.fwd || {}) }, history: Array.isArray(s.history) ? s.history : [] });
  return r;
}
function load(file) { try { return normalize(JSON.parse(fs.readFileSync(file, 'utf8'))); } catch { return create(); } }
function save(file, reg) { try { fs.writeFileSync(file, JSON.stringify(reg)); return true; } catch { return false; } }

function note(reg, s, to, why, now) {
  s.status = to; s.history.push({ at: now, to, why }); if (to === 'ritirata') s.endedAt = now; if (to === 'validata') s.validatedAt = now;
  reg.log.push({ at: now, id: s.id, to, why }); reg.log = reg.log.slice(-40);
}
// Nuove candidate dal rapporto della fabbrica (una sola volta per rapporto)
function ingest(reg, farm, now) {
  if (!farm || !Array.isArray(farm.top) || !farm.at || farm.at <= reg.lastFarm) return 0;
  reg.lastFarm = farm.at; let added = 0; const have = new Map(reg.items.map((x) => [key(x.cfg), x]));
  for (const t of farm.top) {
    if (reg.items.filter((x) => x.status === 'prova').length >= MAX_TEST) break;
    const old = have.get(key(t.cfg)); if (old && (old.status !== 'ritirata' || now - (old.endedAt || 0) < COOL_MS)) continue;
    if (reg.items.some((x) => x.status !== 'ritirata' && x.cfg.thr === t.cfg.thr && x.cfg.delay === t.cfg.delay)) continue;      // stessa soglia e stesso ritardo: sono la stessa regola con parametri quasi equivalenti
    const s = { id: 'R-' + String(++reg.seq).padStart(3, '0'), cfg: t.cfg, status: 'prova', since: now, farm: { at: farm.at, tr: { n: t.tr.n, ev: t.tr.ev }, te: { n: t.te.n, ev: t.te.ev } }, fwd: blank(), history: [] };
    reg.items.push(s); note(reg, s, 'prova', 'positiva sui dati vecchi e recenti', now); added++;
  }
  return added;
}
// La strategia corrente: e' SEMPRE la migliore trovata finora (anche se non profittevole) e gira in ombra sui token nati dopo l'adozione.
// Passa a una nuova migliore solo se la batte con margine; la vecchia resta nello storico con il suo risultato in avanti.
function retired(reg, c, now) { const t = reg.retired && reg.retired[key(c)]; return t != null && now - t < RETIRE_COOL_MS; }
function adoptBest(reg, farm, now) {
  if (!farm || !farm.best || !farm.at || !farm.best.cfg || farm.at <= (reg.lastBest || 0)) return null;
  reg.lastBest = farm.at; const cur = reg.current, w = cur && !cur.cfg.flt && (farm.watch || []).find((x) => key(x.cfg) === key(cur.cfg));
  if (w) cur.farm = { at: farm.at, tr: { n: w.tr.n, ev: w.tr.ev }, te: { n: w.te.n, ev: w.te.ev }, score: Math.min(w.tr.ev, w.te.ev) };
  // la migliore che non sia stata ritirata da poco (se sono tutte ritirate, la migliore in assoluto)
  const cand = [farm.best, ...(farm.ranked || [])].find((c) => c && c.cfg && !retired(reg, c.cfg, now)) || farm.best;
  return promote(reg, cand, farm.at, now);
}
// Una strategia corrente con abbastanza operazioni in avanti e un esito medio chiaramente negativo (media + 1.65 errori standard < 0) non e' la migliore da tenere:
// si ritira, resta nello storico con il suo risultato e non rientra per 3 giorni; al suo posto va la migliore tra le altre.
function retireCurrent(reg, farm, now) {
  const c = reg.current; if (!c) return null; const f = c.fwd, n = f.n; if (n < RETIRE_MIN_N) return null;
  const mean = f.sum / n; let v;
  if (f.sq > 0) v = Math.max(0, f.sq / n - mean * mean) * n / Math.max(1, n - 1);
  else if (f.recent && f.recent.length >= 20) { const r = f.recent, m = r.reduce((x, y) => x + y, 0) / r.length; v = r.reduce((x, y) => x + (y - m) ** 2, 0) / (r.length - 1); }      // conti nati prima che si salvasse la somma dei quadrati: si stima dalle ultime 30
  else return null;
  const se = Math.sqrt(v / n); if (!(mean + RETIRE_Z * se < 0)) return null;
  reg.retired = reg.retired || {}; reg.retired[key(c.cfg)] = now;
  const why = `${n} operazioni in avanti, esito medio ${mean.toFixed(1)}% (±${se.toFixed(1)}): non regge`;
  const old = { id: c.id, cfg: c.cfg, since: c.since, until: now, fwd: stats(f), farm: c.farm, retired: why };
  const msgs = [{ at: now, id: c.id, to: 'ritirata', why }]; reg.log.push(msgs[0]);
  reg.current = null; reg.lastBest = 0; reg.pendingPrev = [...(c.prev || []), old].slice(-10);
  const m = farm ? adoptBest(reg, farm, now) : null; if (m) msgs.push(m);
  if (reg.current) { reg.current.prev = reg.pendingPrev; }
  reg.pendingPrev = null; return msgs;
}
// Una ricerca con filtri credibile (esito positivo su vecchi e recenti, caso sotto il 5%) puo' diventare la strategia corrente, con le stesse regole di cambio
function adoptCombo(reg, co, now) {
  const Combo = require('./combo.js'); if (!Combo.credible(co) || !co.at || co.at <= (reg.lastCombo || 0)) return null; reg.lastCombo = co.at;
  const b = co.best, cfg = { thr: co.thr, ...b.rule, flt: { k: b.feat, name: b.name, dir: b.dir, cut: b.cut } }; delete cfg.rule;
  const cur = reg.current; if (cur && key(cur.cfg) === key(cfg)) { cur.farm = { at: co.at, tr: { n: b.tr.n, ev: b.tr.ev }, te: { n: b.te.n, ev: b.te.ev }, score: Math.min(b.tr.ev, b.te.ev) }; return null; }
  return promote(reg, { cfg, tr: b.tr, te: b.te }, co.at, now);
}
function promote(reg, b, at, now) {
  const cur = reg.current, sc = (x) => Math.min(x.tr.ev, x.te.ev);
  const fresh = () => ({ id: 'C-' + String(++reg.seq).padStart(3, '0'), cfg: b.cfg, since: now, farm: { at, tr: { n: b.tr.n, ev: b.tr.ev }, te: { n: b.te.n, ev: b.te.ev }, score: sc(b) }, fwd: blank(), prev: cur ? [...(cur.prev || []), { id: cur.id, cfg: cur.cfg, since: cur.since, until: now, fwd: stats(cur.fwd), farm: cur.farm }].slice(-10) : (reg.pendingPrev || []) });
  if (!cur) { reg.current = fresh(); if (!reg.acct) reg.acct = acctBlank(now); const m = { at: now, id: reg.current.id, to: 'corrente', why: (reg.pendingPrev && reg.pendingPrev.length ? 'nuova strategia: ' : 'prima strategia: ') + describe(b) }; reg.log.push(m); reg.log = reg.log.slice(-40); return m; }
  if (key(b.cfg) === key(cur.cfg)) return null;
  if (now - cur.since < MIN_HOLD_MS) return null;
  if (!(sc(b) > ((cur.farm && cur.farm.score) == null ? -Infinity : cur.farm.score) + SWITCH_MARGIN)) return null;
  const m = { at: now, id: 'C-' + String(reg.seq + 1).padStart(3, '0'), to: 'corrente', why: `${describe(b)} batte la precedente (${cur.farm.score} -> ${sc(b)})` };
  reg.current = fresh(); reg.log.push(m); reg.log = reg.log.slice(-40); return m;
}
const describe = (b) => `${b.cfg.thr / 1000}K rit. ${b.cfg.delay}s +${b.cfg.tp}/-${b.cfg.sl}${b.cfg.hold ? ' ' + b.cfg.hold + 's' : ''}${b.cfg.flt ? ' con filtro ' + b.cfg.flt.name + (b.cfg.flt.dir === 'basso' ? ' <= ' : ' > ') + b.cfg.flt.cut : ''}: vecchi ${b.tr.ev}%, recenti ${b.te.ev}%`;
// Il conto paper della strategia corrente: un conto a parte (1 SOL, 10% dell'equity a operazione, con gli stessi costi della simulazione), indipendente dal paper del radar.
// Ogni operazione chiusa della strategia corrente (token nati dopo la sua adozione) entra qui; se la strategia cambia, il conto continua con la nuova.
function acctApply(reg, rec, s, x, now, ctx) {
  const a = reg.acct || (reg.acct = acctBlank(now)), size = a.eq * ACCT_SIZE, pnl = size * x.net / 100; a.eq += pnl; if (x.net > 0) a.sumW = (a.sumW || 0) + x.net; else a.sumL = (a.sumL || 0) + x.net; a.n++; if (pnl > 0) { a.win++; a.gain += pnl; } else a.loss -= pnl;
  a.peak = Math.max(a.peak, a.eq); a.dd = Math.max(a.dd, a.peak - a.eq);
  a.trades.push({ id: s.id, m: rec.m, sym: String(rec.s || '').slice(0, 20), at: now, pct: +x.net.toFixed(1), pnl: +pnl.toFixed(5), why: x.why, held: x.held, eq: +a.eq.toFixed(5), mc0: x.mc0 || null, mc1: x.mc1 || null }); if (a.trades.length > ACCT_KEEP) a.trades.shift();
  // Ricarica automatica, dichiarata: se l'equity scende sotto la quota del capitale iniziale, il saldo torna al capitale. Storico e statistiche restano; il P&L esclude le ricariche.
  const rp = ctx && ctx.refillPct; if (rp > 0 && a.eq < a.start * rp / 100) {
    const before = a.eq, add = +(a.start - a.eq).toFixed(6); a.eq = a.start; a.peak = a.eq; a.topups = a.topups || { n: 0, total: 0, log: [] };
    a.topups.n++; a.topups.total = +(a.topups.total + add).toFixed(6); a.topups.log.push({ at: now, before: +before.toFixed(4), add }); a.topups.log = a.topups.log.slice(-10);
    reg.notes = reg.notes || []; reg.notes.push({ at: now, text: `Conto della strategia ricaricato: l'equity era scesa a ${before.toFixed(3)} (sotto il ${rp}% del capitale di ${a.start}). Saldo riportato a ${a.start} \u25ce, ricarica n. ${a.topups.n} (totale ricaricato ${a.topups.total} \u25ce). Storico e statistiche invariati.` });
  }
  a.curve.push(+(a.eq - (a.topups ? a.topups.total : 0)).toFixed(4)); if (a.curve.length > ACCT_CURVE) a.curve.shift();
}
// Una regola puo' avere un filtro sui segnali noti alla soglia (percorso, possessori, creatore, social...): cfg.flt = { k, name, dir, cut }.
// Il token passa solo se il segnale c'e' ed e' dalla parte giusta del taglio (come nella ricerca che l'ha trovato).
function passes(rec, cfg, i, ctx) {
  if (!cfg.flt) return true;
  const f = Rug.feats(rec.p, i), h = ctx && ctx.holders && ctx.holders.get(rec.m); if (h) for (const k of Rug.HOLD_FEATS) if (Number.isFinite(h[k])) f[k] = h[k];
  if (ctx && ctx.cidx) Object.assign(f, Rug.creatorFeats(ctx.cidx, rec.cr, rec.m, rec.at));
  const v = f[cfg.flt.k]; return Number.isFinite(v) && (cfg.flt.dir === 'basso' ? v <= cfg.flt.cut : v > cfg.flt.cut);
}
function evalRec(rec, cfg, ctx) {
  const u = rec.u || rec.usd; if (!cfg.flt) return Farm.simulate(rec.p, u, cfg);
  const i = Farm.crossIdx(rec.p, cfg.thr / u); if (i < 1 || !passes(rec, cfg, i, ctx)) return null;
  return Farm.simulate(rec.p, u, cfg);
}
// Posizione "dal vivo" della strategia su un token ancora in corso (percorso parziale): ingresso alla soglia piu' il ritardo, uscita a stop, target o tempo massimo,
// con le stesse regole della simulazione. Restituisce { state: 'none' | 'open' | 'closed', ... }; 'closed' porta l'esito netto e il motivo.
function live(rec, cfg, ctx) {
  const p = rec.p, u = rec.u || rec.usd, BIN = Farm.BIN, i = Farm.crossIdx(p, cfg.thr / u); if (i < 1 || !passes(rec, cfg, i, ctx)) return { state: 'none' };
  const j = i + Math.round((cfg.delay || 0) / BIN); if (j >= p.length || !(p[j] > 0)) return { state: 'none' };
  const e = p[j], maxB = cfg.hold ? Math.round(cfg.hold / BIN) : Infinity, base = { j, entry: e, mc0: Math.round(e * u) };
  for (let k = j + 1; k < p.length; k++) {
    const r = p[k] / e, fin = (why) => ({ state: 'closed', ...base, net: (r - 1) * 100 - Farm.COST, why, held: (k - j) * BIN, mc1: Math.round(p[k] * u) });
    if (r <= 1 - cfg.sl / 100) return fin('sl'); if (r >= 1 + cfg.tp / 100) return fin('tp'); if (k - j >= maxB) return fin('tempo');
  }
  const last = p[p.length - 1], held = (p.length - 1 - j) * BIN;
  return { state: 'open', ...base, last, mc1: Math.round(last * u), pct: (last / e - 1) * 100, net: (last / e - 1) * 100 - Farm.COST, held, left: cfg.hold ? Math.max(0, cfg.hold - held) : null };
}
// Un token concluso: ogni regola non ritirata lo valuta solo se e' nato dopo la sua ammissione
function settle(reg, s, rec, x, now, ctx) {
  const f = s.fwd; f.n++; f.sum += x.net; f.sq = (f.sq || 0) + x.net * x.net; if (x.net > 0) { f.win++; f.gain += x.net; } else f.loss -= x.net;
  f.cum += x.net; f.peak = Math.max(f.peak, f.cum); f.dd = Math.max(f.dd, f.peak - f.cum); if (!f.first) f.first = rec.at; f.last = rec.at;
  f.recent.push(+x.net.toFixed(2)); if (f.recent.length > RECENT) f.recent.shift();
  if (s === reg.current) acctApply(reg, rec, s, x, now, ctx);
}
// La strategia corrente si chiude dal vivo appena scatta l'uscita (liveTick): il token non si conta una seconda volta quando si conclude
function markSettled(reg, m, now) { reg.settled = reg.settled || {}; reg.settled[m] = now; const ks = Object.keys(reg.settled); if (ks.length > 600) for (const k of ks.sort((a, b) => reg.settled[a] - reg.settled[b]).slice(0, ks.length - 400)) delete reg.settled[k]; }
function record(reg, rec, now, ctx) {
  let changed = false;
  for (const s of [...reg.items, ...(reg.current ? [reg.current] : [])]) {
    if (s.status === 'ritirata' || !(rec.at >= s.since)) continue;
    if (s === reg.current && reg.settled && reg.settled[rec.m]) continue;
    const x = evalRec(rec, s.cfg, ctx); if (!x) continue;
    settle(reg, s, rec, x, now, ctx); changed = true;
  }
  return changed;
}
// Controllo dal vivo della strategia corrente sui token ancora in corso: chiude subito le posizioni a cui e' scattata l'uscita e restituisce quelle aperte
function liveTick(reg, recs, now, ctx) {
  const c = reg.current, open = []; if (!c) return { open, closed: 0 }; let closed = 0;
  for (const rec of recs) {
    if (!(rec.at >= c.since) || (reg.settled && reg.settled[rec.m])) continue;
    const L = live(rec, c.cfg, ctx); if (L.state === 'closed') { settle(reg, c, rec, { net: L.net, why: L.why, held: L.held, mc0: L.mc0, mc1: L.mc1 }, now, ctx); markSettled(reg, rec.m, now); closed++; }
    else if (L.state === 'open') open.push({ id: c.id, m: rec.m, sym: String(rec.s || '').slice(0, 20), at: rec.at + L.j * Farm.BIN * 1000, mc0: L.mc0, mc1: L.mc1, pct: +L.pct.toFixed(1), net: +L.net.toFixed(1), held: L.held, left: L.left, tp: c.cfg.tp, sl: c.cfg.sl });
  }
  return { open: open.sort((a, b) => b.at - a.at).slice(0, 12), closed };
}
// Promozioni e ritiri; restituisce il numero di cambi di stato
function review(reg, now, farm) {
  let n = 0; const rc = retireCurrent(reg, farm, now); if (rc) { n += rc.length; reg.retireMsgs = (reg.retireMsgs || []).concat(rc).slice(-6); } const dead = reg.items.filter((x) => x.status === 'ritirata'); if (dead.length > 40) { const keep = new Set(dead.sort((a, b) => (b.endedAt || 0) - (a.endedAt || 0)).slice(0, 40).map((x) => x.id)); reg.items = reg.items.filter((x) => x.status !== 'ritirata' || keep.has(x.id)); }      // il registro non cresce senza limite
  for (const s of reg.items) {
    const f = s.fwd, st = stats(f);
    if (s.status === 'prova') {
      if (st.n >= EARLY_N && st.ev < EARLY_EV) { note(reg, s, 'ritirata', `non regge in avanti: ${st.n} operazioni, esito medio ${st.ev}%`, now); n++; }
      else if (st.n >= MIN_FWD && st.ev <= 0) { note(reg, s, 'ritirata', `non regge in avanti: ${st.n} operazioni, esito medio ${st.ev}%`, now); n++; }
      else if (st.n >= MIN_FWD && st.ev > 0 && st.pf >= MIN_PF && st.span >= MIN_SPAN_MS) { note(reg, s, 'validata', `regge in avanti: ${st.n} operazioni, esito medio +${st.ev}%, fattore ${st.pf}`, now); n++; }
      else if (st.n >= GIVE_UP_N) { note(reg, s, 'ritirata', `dopo ${st.n} operazioni non e' abbastanza forte (esito medio ${st.ev}%, fattore ${st.pf})`, now); n++; }
      else if (now - s.since > STALE_MS && st.n < 10) { note(reg, s, 'ritirata', `solo ${st.n} segnali in 3 giorni`, now); n++; }
    } else if (s.status === 'validata') {
      const r = f.recent, m = r.length >= 20 ? r.reduce((a, b) => a + b, 0) / r.length : null;
      if (m != null && m < 0) { note(reg, s, 'ritirata', `peggiorata: ultime ${r.length} operazioni ${m.toFixed(1)}%`, now); n++; }
      else if (st.dd > DD_MAX) { note(reg, s, 'ritirata', `perdita cumulata di ${st.dd} punti`, now); n++; }
    }
  }
  return n;
}
function summary(reg, now) {
  const count = { prova: 0, validata: 0, ritirata: 0 }; for (const s of reg.items) count[s.status] = (count[s.status] || 0) + 1;
  const live = reg.items.filter((s) => s.status !== 'ritirata'), dead = reg.items.filter((s) => s.status === 'ritirata').sort((a, b) => (b.endedAt || 0) - (a.endedAt || 0)).slice(0, 5);
  const pick = (s) => ({ id: s.id, cfg: s.cfg, status: s.status, since: s.since, farm: s.farm, fwd: stats(s.fwd), why: (s.history[s.history.length - 1] || {}).why || '' });
  const A = reg.acct, acct = A && { start: A.start, eq: +A.eq.toFixed(4), topups: A.topups ? { n: A.topups.n, total: A.topups.total, log: A.topups.log.slice(-3) } : null, pnl: +(A.eq - A.start - (A.topups ? A.topups.total : 0)).toFixed(4), pct: +(((A.eq - (A.topups ? A.topups.total : 0)) / A.start - 1) * 100).toFixed(1), n: A.n, win: A.n ? Math.round(100 * A.win / A.n) : 0, pf: A.loss > 0 ? +(A.gain / A.loss).toFixed(2) : (A.gain > 0 ? 99 : 0), dd: +A.dd.toFixed(4), since: A.since, curve: A.curve, aw: (() => { if (A.sumW != null && A.win) return +(A.sumW / A.win).toFixed(1); const w = A.trades.filter((t) => t.pct > 0); return w.length ? +(w.reduce((s, t) => s + t.pct, 0) / w.length).toFixed(1) : 0; })(), al: (() => { const nl = A.n - A.win; if (A.sumL != null && nl > 0) return +(A.sumL / nl).toFixed(1); const l = A.trades.filter((t) => t.pct <= 0); return l.length ? +(l.reduce((s, t) => s + t.pct, 0) / l.length).toFixed(1) : 0; })(), trades: A.trades.slice(-100).reverse() };
  const c = reg.current, cur = c && { id: c.id, cfg: c.cfg, since: c.since, farm: c.farm, fwd: stats(c.fwd), cum: +c.fwd.cum.toFixed(1), profitable: c.fwd.n >= 20 ? stats(c.fwd).ev > 0 : null, prev: (c.prev || []).slice(-3).map((p) => ({ id: p.id, cfg: p.cfg, fwd: p.fwd })) };
  return { at: now, count, acct: acct || null, current: cur || null, items: [...live, ...dead].slice(0, 20).map(pick), log: reg.log.slice(-6) };
}

module.exports = { retireCurrent, RETIRE_MIN_N, retired, live, liveTick, evalRec, adoptCombo, ACCT_START, ACCT_SIZE, SWITCH_MARGIN, MIN_HOLD_MS, adoptBest, describe, MAX_TEST, MIN_FWD, MIN_SPAN_MS, MIN_PF, EARLY_N, GIVE_UP_N, STALE_MS, COOL_MS, DD_MAX, key, create, normalize, load, save, ingest, record, review, summary, stats };

// KAISER · registro delle regole e prova in avanti (solo prova, nessun ordine).
// Una regola nasce quando la fabbrica la trova positiva sui dati vecchi e su quelli recenti. Da quel momento gira "in ombra" sui token NATI DOPO l'ammissione
// (dati mai visti da chi l'ha scelta): e' il test piu' onesto. Stati: prova -> validata, oppure ritirata. Una regola validata puo' solo essere PROPOSTA per l'uso;
// nessuna regola apre ordini da sola.
'use strict';
const fs = require('node:fs');
const Farm = require('./farm.js');

const MAX_TEST = 10;                         // regole in prova contemporaneamente
const MIN_FWD = 30;                          // operazioni minime in avanti per validare
const MIN_SPAN_MS = 24 * 3600000;            // le operazioni devono coprire almeno un giorno intero
const MIN_PF = 1.1;
const EARLY_N = 20, EARLY_EV = -2;           // dopo 20 operazioni un esito medio sotto -2% la ritira subito
const GIVE_UP_N = 60;                        // dopo 60 operazioni non validata: non e' abbastanza forte
const STALE_MS = 3 * 86400000;               // in 3 giorni meno di 10 segnali: ritirata
const COOL_MS = 7 * 86400000;                // una configurazione ritirata non rientra per 7 giorni
const DD_MAX = 60;                           // perdita cumulata (punti %) oltre il massimo di una validata: ritirata
const RECENT = 30;                           // finestra mobile per controllare che una validata non peggiori

const key = (c) => [c.thr, c.delay, c.tp, c.sl, c.hold].join('/');
const blank = () => ({ n: 0, sum: 0, win: 0, gain: 0, loss: 0, cum: 0, peak: 0, dd: 0, first: 0, last: 0, recent: [] });
const stats = (f) => { const n = f.n; return { n, ev: n ? +(f.sum / n).toFixed(2) : 0, win: n ? Math.round(100 * f.win / n) : 0, pf: f.loss > 0 ? +(f.gain / f.loss).toFixed(2) : (f.gain > 0 ? 99 : 0), dd: +f.dd.toFixed(1), span: f.n ? f.last - f.first : 0 }; };

function create() { return { v: 1, seq: 0, lastFarm: 0, items: [], log: [] }; }
function normalize(o) {
  const r = create(); if (!o || typeof o !== 'object' || !Array.isArray(o.items)) return r;
  r.seq = Number(o.seq) || 0; r.lastFarm = Number(o.lastFarm) || 0; r.log = Array.isArray(o.log) ? o.log.slice(-40) : [];
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
    const s = { id: 'R-' + String(++reg.seq).padStart(3, '0'), cfg: t.cfg, status: 'prova', since: now, farm: { at: farm.at, tr: { n: t.tr.n, ev: t.tr.ev }, te: { n: t.te.n, ev: t.te.ev } }, fwd: blank(), history: [] };
    reg.items.push(s); note(reg, s, 'prova', 'positiva sui dati vecchi e recenti', now); added++;
  }
  return added;
}
// Un token concluso: ogni regola non ritirata lo valuta solo se e' nato dopo la sua ammissione
function record(reg, rec, now) {
  let changed = false; const u = rec.u || rec.usd;
  for (const s of reg.items) {
    if (s.status === 'ritirata' || !(rec.at >= s.since)) continue;
    const x = Farm.simulate(rec.p, u, s.cfg); if (!x) continue;
    const f = s.fwd; f.n++; f.sum += x.net; if (x.net > 0) { f.win++; f.gain += x.net; } else f.loss -= x.net;
    f.cum += x.net; f.peak = Math.max(f.peak, f.cum); f.dd = Math.max(f.dd, f.peak - f.cum); if (!f.first) f.first = rec.at; f.last = rec.at;
    f.recent.push(+x.net.toFixed(2)); if (f.recent.length > RECENT) f.recent.shift(); changed = true;
  }
  return changed;
}
// Promozioni e ritiri; restituisce il numero di cambi di stato
function review(reg, now) {
  let n = 0;
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
  return { at: now, count, items: [...live, ...dead].slice(0, 20).map(pick), log: reg.log.slice(-6) };
}

module.exports = { MAX_TEST, MIN_FWD, MIN_SPAN_MS, MIN_PF, EARLY_N, GIVE_UP_N, STALE_MS, COOL_MS, DD_MAX, key, create, normalize, load, save, ingest, record, review, summary, stats };

// KAISER · test di Grok sui segnali (solo misura). Per ogni segnale semi-automatico Grok da' un giudizio (sentimento, organicita', allarmi); dopo 15 minuti si registra
// come e' andato il prezzo. Il giudizio NON influenza nulla: ne' l'avviso ne' le operazioni. Dopo abbastanza segnali si vede se i giudizi di Grok sono legati all'esito.
'use strict';

const NEED = 100;            // segnali giudicati e conclusi prima di dare un verdetto
const ALPHA = 0.02;          // soglia di significativita' (prudente: si guardano piu' misure)
const MIN_RHO = 0.12;        // legame minimo per parlare di segnale utile
const RUG = -30;             // un segnale e' "da rug" se a 15 minuti e' a -30% o peggio

const median = (xs) => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b), m = s.length >> 1; return +(s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2).toFixed(1); };
const mean = (xs) => (xs.length ? +(xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(1) : null);
const pct = (a, n) => (n ? Math.round(100 * a / n) : 0);
function ranks(xs) {
  const idx = xs.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]), r = new Array(xs.length); let i = 0;
  while (i < idx.length) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k][1]] = avg; i = j + 1; }
  return r;
}
const cdf = (z) => { const t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp(-z * z / 2), p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
// Correlazione di Spearman e valore p approssimato (normale: valido con almeno una trentina di punti)
function spearman(x, y) {
  const n = x.length; if (n < 8) return { rho: 0, p: 1, n };
  const rx = ranks(x), ry = ranks(y), mx = rx.reduce((a, b) => a + b, 0) / n, my = ry.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (rx[i] - mx) * (ry[i] - my); sxx += (rx[i] - mx) ** 2; syy += (ry[i] - my) ** 2; }
  const rho = sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : 0, t = Math.abs(rho) >= 1 ? 99 : rho * Math.sqrt((n - 2) / (1 - rho * rho));
  return { rho: +rho.toFixed(3), p: +Math.min(1, 2 * (1 - cdf(Math.abs(t)))).toFixed(4), n };
}
// Un segnale concluso con il giudizio di Grok, in forma compatta
function record(log, a) {
  if (!a || !a.gr || a.p15 == null || a.logged) return false;
  log.push({ t: a.t, m: String(a.mint || '').slice(0, 8), s: +a.gr.s.toFixed(2), h: +a.gr.h.toFixed(1), o: +a.gr.o.toFixed(1), f: a.gr.f | 0, k: a.gr.k | 0, p5: a.p5 == null ? null : a.p5, p15: a.p15, mn: a.min == null ? null : a.min });
  a.logged = true; if (log.length > 600) log.splice(0, log.length - 600); return true;
}
const group = (rows, label, pred) => { const g = rows.filter(pred), p = g.map((r) => r.p15); return { l: label, n: g.length, med5: median(g.filter((r) => r.p5 != null).map((r) => r.p5)), med15: median(p), mean15: mean(p), rug: pct(p.filter((v) => v <= RUG).length, g.length), up: pct(p.filter((v) => v > 0).length, g.length) }; };
function summary(log) {
  const rows = (log || []).filter((r) => r.p15 != null), n = rows.length, out = { n, need: NEED, all: group(rows, 'tutti', () => true), by: {} };
  out.by.sent = [group(rows, 'positivo', (r) => r.s > 0.3), group(rows, 'neutro', (r) => r.s >= -0.3 && r.s <= 0.3), group(rows, 'negativo', (r) => r.s < -0.3)];
  out.by.org = [group(rows, 'alto', (r) => r.o >= 7), group(rows, 'medio', (r) => r.o >= 4 && r.o < 7), group(rows, 'basso', (r) => r.o < 4)];
  out.by.flag = [group(rows, 'nessuno', (r) => r.f === 0), group(rows, 'con allarmi', (r) => r.f > 0)];
  out.corr = { sent: spearman(rows.map((r) => r.s), rows.map((r) => r.p15)), org: spearman(rows.map((r) => r.o), rows.map((r) => r.p15)), hype: spearman(rows.map((r) => r.h), rows.map((r) => r.p15)) };
  const fl = out.by.flag, flagGap = fl[1].n >= 20 && fl[0].n >= 20 ? fl[1].rug - fl[0].rug : 0, c = out.corr;
  if (n < NEED) { out.verdict = 'pochi dati'; out.why = `servono almeno ${NEED} segnali giudicati e conclusi (ora ${n})`; return out; }
  const good = [c.sent, c.org].some((x) => x.rho >= MIN_RHO && x.p < ALPHA), inv = [c.sent, c.org].some((x) => x.rho <= -MIN_RHO && x.p < ALPHA);
  if (good) { out.verdict = 'legame positivo'; out.why = 'sentimento o organicità sono legati a un esito migliore a 15 minuti'; }
  else if (flagGap >= 15) { out.verdict = 'utile come allarme'; out.why = `i segnali con allarmi finiscono a -30% o peggio il ${flagGap} per cento più spesso`; }
  else if (inv) { out.verdict = 'legame inverso'; out.why = 'un giudizio più alto di Grok è legato a un esito peggiore: segnale da ignorare'; }
  else { out.verdict = 'nessun legame misurabile'; out.why = 'i giudizi di Grok non spiegano l\'esito: non vale il costo'; }
  return out;
}

module.exports = { NEED, ALPHA, MIN_RHO, RUG, median, ranks, spearman, record, summary };

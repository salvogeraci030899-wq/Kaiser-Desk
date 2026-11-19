// KAISER · modalita' semi-automatica: il radar sceglie la Coin, tu entri a mano. Invece di aprire la posizione, il runner manda un avviso con il collegamento diretto a pump.fun
// (Telegram e app) e segue il prezzo del segnale per 15 minuti, cosi' si vede se i segnali erano buoni. Non apre ordini.
'use strict';

const MAX_PER_HOUR = 8;          // avvisi al massimo in un'ora: sono scelte da fare a mano, non una raffica
const REPEAT_H = 3;              // la stessa Coin non si segnala di nuovo prima di 3 ore
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
  return { t: now, mint: c.mint, sym: String(c.sym || '').slice(0, 20), score: num(c.score), pair: MINT_RE.test(pair) ? pair : '', priceNative: num(m.priceNative), mc: num(m.mc), liq: num(m.liq), ageMin: m.ageMin == null ? null : +num(m.ageMin).toFixed(1),
    why: ((c.a && c.a.plus) || []).slice(0, 3).map((x) => String(x).slice(0, 60)) };
}
const pumpUrl = (a) => `https://pump.fun/coin/${a.mint}`;
function text(a) {
  const bits = [a.mc ? 'market cap $' + k(a.mc) : '', a.ageMin != null ? 'età ' + Math.round(a.ageMin) + ' min' : '', a.liq ? 'liquidità $' + k(a.liq) : ''].filter(Boolean).join(' · ');
  return `<b>SEGNALE</b> $${esc(a.sym || a.mint.slice(0, 6))} · score ${a.score}\n${bits}${a.why.length ? '\nMotivi: ' + a.why.map(esc).join('; ') : ''}\nEntra a mano da pump.fun: decidi tu taglia e uscita. Se non ti convince, ignora.`;
}
function keyboard(a) {
  return { inline_keyboard: [[{ text: 'Apri su pump.fun', url: pumpUrl(a) }], [{ text: 'DexScreener', url: `https://dexscreener.com/solana/${a.pair || a.mint}` }, { text: 'GMGN', url: `https://gmgn.ai/sol/token/${a.mint}` }]] };
}
// Segnali ancora da seguire (meno di 17 minuti, senza ancora entrambe le misure)
const open = (alerts, now) => alerts.filter((a) => now - a.t < TRACK_MS && (a.p5 == null || a.p15 == null));
// Registra il prezzo corrente rispetto a quello del segnale: variazione ora, minimo, dopo 5 e dopo 15 minuti
function track(a, px, now) {
  if (!(px > 0) || !(a.priceNative > 0)) return false;
  const r = +((px / a.priceNative - 1) * 100).toFixed(1), age = now - a.t; a.last = r; a.min = a.min == null ? r : Math.min(a.min, r);
  if (age >= 5 * 60000 && a.p5 == null) a.p5 = r; if (age >= 15 * 60000 && a.p15 == null) a.p15 = r; return true;
}
// Vista compatta per l'app
const view = (alerts, n) => alerts.slice(-(n || 20)).map((a) => ({ t: a.t, mint: a.mint, sym: a.sym, score: a.score, pair: a.pair, mc: a.mc, ageMin: a.ageMin, last: a.last == null ? null : a.last, min: a.min == null ? null : a.min, p5: a.p5 == null ? null : a.p5, p15: a.p15 == null ? null : a.p15 }));

module.exports = { MAX_PER_HOUR, REPEAT_H, TRACK_MS, MODES, pick, alertOf, text, keyboard, pumpUrl, open, track, view };

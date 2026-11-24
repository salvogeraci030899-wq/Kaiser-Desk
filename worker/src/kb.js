// Tastiere dei messaggi Telegram. Identica a runner/kb.js (un test controlla che diano lo stesso risultato).
// Regola: ogni messaggio che riguarda una Coin ha in evidenza "Apri su pump.fun" (collegamento diretto alla Coin), poi DexScreener e GMGN;
// i messaggi su una posizione hanno anche "Chiudi posizione" (che passa dalla stessa conferma delle altre chiusure); gli altri hanno "Apri Kaiser".
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
export const APP_URL = 'https://salvogeraci030899-wq.github.io/Kaiser-Desk/';

export function coinRows(mint, pair) {
  if (!MINT_RE.test(mint || '')) return [];
  const p = MINT_RE.test(pair || '') ? pair : mint;
  return [[{ text: 'Apri su pump.fun', url: `https://pump.fun/coin/${mint}` }], [{ text: 'DexScreener', url: `https://dexscreener.com/solana/${p}` }, { text: 'GMGN', url: `https://gmgn.ai/sol/token/${mint}` }]];
}
export const closeRow = (id) => (/^[PR]-\d{1,6}$/.test(id || '') ? [{ text: 'Chiudi posizione', callback_data: 'cl:' + id }] : null);
export const appRow = (url) => [{ text: 'Apri Kaiser', url: /^https:\/\//.test(url || '') ? url : APP_URL }, { text: 'Menu', callback_data: 'mn:menu' }];
// rows: righe in testa (es. Approva/Rifiuta); mint/pair: la Coin; close: id della posizione; app: true o l'indirizzo dell'app per i messaggi senza Coin
export function kb(o) {
  const rows = [...((o && o.rows) || [])];
  if (o && o.mint) rows.push(...coinRows(o.mint, o.pair));
  const c = o && o.close ? closeRow(o.close) : null; if (c) rows.push(c);
  if (o && o.app && !(o.mint && MINT_RE.test(o.mint))) rows.push(appRow(typeof o.app === 'string' ? o.app : ''));
  if (o && o.open) rows.push([{ text: 'Apri Kaiser', url: APP_URL }]);      // anche nei messaggi con una Coin (avvisi Prendo/Scarto e loro esito): un solo tasto in fondo
  return rows.length ? { inline_keyboard: rows } : null;
}
// Elenco delle posizioni: per ognuna il collegamento alla Coin e la chiusura
export function positionRows(list) {
  return (list || []).slice(0, 8).filter((p) => MINT_RE.test(p.mint || '')).map((p) => [{ text: `pump.fun $${String(p.sym || p.mint.slice(0, 5)).slice(0, 10)}`, url: `https://pump.fun/coin/${p.mint}` }, ...(closeRow(p.id) || [])]);
}

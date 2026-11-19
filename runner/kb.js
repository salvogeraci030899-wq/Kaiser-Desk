// Tastiere dei messaggi Telegram del runner. Identica a worker/src/kb.js (un test controlla che diano lo stesso risultato).
// Ogni messaggio che riguarda una Coin ha in evidenza "Apri su pump.fun" (collegamento diretto alla Coin), poi DexScreener e GMGN;
// i messaggi su una posizione hanno anche "Chiudi posizione" (la chiusura passa dal Worker, con la stessa conferma delle altre); gli altri hanno "Apri Kaiser".
'use strict';
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const APP_URL = process.env.APP_URL && /^https:\/\//.test(process.env.APP_URL) ? process.env.APP_URL : 'https://salvogeraci030899-wq.github.io/Kaiser-Desk/';

function coinRows(mint, pair) {
  if (!MINT_RE.test(mint || '')) return [];
  const p = MINT_RE.test(pair || '') ? pair : mint;
  return [[{ text: 'Apri su pump.fun', url: `https://pump.fun/coin/${mint}` }], [{ text: 'DexScreener', url: `https://dexscreener.com/solana/${p}` }, { text: 'GMGN', url: `https://gmgn.ai/sol/token/${mint}` }]];
}
const closeRow = (id) => (/^[PR]-\d{1,6}$/.test(id || '') ? [{ text: 'Chiudi posizione', callback_data: 'cl:' + id }] : null);
const appRow = (url) => [{ text: 'Apri Kaiser', url: /^https:\/\//.test(url || '') ? url : APP_URL }];
function kb(o) {
  const rows = [...((o && o.rows) || [])];
  if (o && o.mint) rows.push(...coinRows(o.mint, o.pair));
  const c = o && o.close ? closeRow(o.close) : null; if (c) rows.push(c);
  if (o && o.app && !(o.mint && MINT_RE.test(o.mint))) rows.push(appRow(typeof o.app === 'string' ? o.app : ''));
  return rows.length ? { inline_keyboard: rows } : null;
}

module.exports = { APP_URL, coinRows, closeRow, appRow, kb };

// KAISER · distribuzione dei possessori di un token al momento in cui supera la soglia di market cap (solo lettura via RPC, 3 chiamate per token).
// Serve all'analisi dei rug: quanta parte dell'offerta e' in pochi portafogli (esclusa la curva di pump.fun) e quanta ne ha ancora il creatore.
'use strict';

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const r4 = (x) => +x.toFixed(4);
// list: [{address, amount}] dei conti piu' grandi; owners: proprietario di ciascun conto (stesso ordine); supply: offerta totale (unita' minime)
function holdersFrom(list, owners, supply, curve, creator) {
  if (!Array.isArray(list) || !(supply > 0)) return null;
  const rows = list.map((a, i) => ({ owner: owners[i] || '', amt: num(a.amount) })).filter((x) => x.amt > 0 && x.owner !== curve).sort((a, b) => b.amt - a.amt);
  const sum = (n) => rows.slice(0, n).reduce((s, x) => s + x.amt, 0) / supply;
  const cre = creator ? rows.filter((x) => x.owner === creator).reduce((s, x) => s + x.amt, 0) / supply : null;
  return { top1: r4(sum(1)), top3: r4(sum(3)), top10: r4(sum(10)), cre: cre == null ? null : r4(cre), n: rows.length };
}
async function rpc(o, method, params) {
  const r = await o.fetch(o.url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }), signal: AbortSignal.timeout(8000) });
  const j = await r.json(); if (j && j.error) throw new Error(String(j.error.message || 'errore RPC').slice(0, 80)); return j && j.result;
}
async function snapshot(o) {
  const f = { ...o, fetch: o.fetch || globalThis.fetch, url: String(o.url || '').replace(/^wss:/i, 'https:').replace(/^ws:/i, 'http:') };
  if (!f.fetch || !f.url || !f.mint) return null;
  const big = await rpc(f, 'getTokenLargestAccounts', [f.mint, { commitment: 'processed' }]), list = ((big && big.value) || []).slice(0, 20);
  if (!list.length) return null;
  const sup = await rpc(f, 'getTokenSupply', [f.mint, { commitment: 'processed' }]), supply = num(sup && sup.value && sup.value.amount);
  const accs = await rpc(f, 'getMultipleAccounts', [list.map((a) => a.address), { encoding: 'jsonParsed', commitment: 'processed' }]);
  const owners = ((accs && accs.value) || []).map((v) => (v && v.data && v.data.parsed && v.data.parsed.info && v.data.parsed.info.owner) || '');
  const h = holdersFrom(list, owners, supply, f.curve, f.creator); if (!h) return null;
  return { m: f.mint, at: f.at || Date.now(), ...h };
}

module.exports = { holdersFrom, snapshot };

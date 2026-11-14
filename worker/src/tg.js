// KAISER · comandi da Telegram. È il canale di controllo del conto reale: l'app non contiene token né chiavi e non può dare comandi.
// Sicurezza: la richiesta deve portare il segreto del webhook (derivato da EXEC_TOKEN) E arrivare dalla chat autorizzata (TELEGRAM_CHAT_ID).
import { num } from './lib.js';

export async function webhookSecret(env) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(env.EXEC_TOKEN || '')), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('kaiser-tg-webhook-v1')));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const HELP = `KAISER · comandi
/stato — modo, kill switch, posizioni, P&L di oggi
/posizioni — posizioni reali aperte
/wallet — indirizzo completo e saldo del wallet
/prova MINT [SOL] — collaudo con Jupiter e RPC veri, senza inviare nulla
/approva T-0001 — esegue un ticket
/rifiuta T-0001 — scarta un ticket
/vendi R-0001 [percentuale] — vende (100 se omessa)
/parametri — parametri cambiati dall'app e richieste in attesa
/reset_parametri — annulla tutte le modifiche fatte dall'app
/kill — ferma i nuovi ingressi (le uscite restano attive)
/riattiva — riabilita gli ingressi`;

const fmt = (n, d = 4) => (Number.isFinite(Number(n)) ? Number(n).toFixed(d) : '—');
const dryText = (label, q) => `🧪 ${label}: prova riuscita (dry-run). NESSUN ordine inviato.\nImpatto di prezzo ${q.impactPct}% · la simulazione sposta ${q.simDropSol} SOL · ${q.instructions} istruzioni\nProgrammi: ${q.programs.join(', ')}\nSe i numeri sono quelli attesi puoi passare a ORDERS_MODE=live con importi minimi.`;

async function reply(ex, chat, text, markup) {
  const t = ex.env.TELEGRAM_BOT_TOKEN; if (!t) return;
  try { await ex.f(`https://api.telegram.org/bot${t}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true, ...(markup ? { reply_markup: markup } : {}) }) }); } catch { /* niente */ }
}
async function answer(ex, id, text) {
  const t = ex.env.TELEGRAM_BOT_TOKEN; if (!t || !id) return;
  try { await ex.f(`https://api.telegram.org/bot${t}/answerCallbackQuery`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ callback_query_id: id, text: text || '' }) }); } catch { /* niente */ }
}

// Esegue un update di Telegram. Restituisce sempre in silenzio per chat non autorizzate.
export async function handleUpdate(ex, update) {
  const cb = update && update.callback_query, msg = update && (update.message || (cb && cb.message));
  const chat = msg && msg.chat && String(msg.chat.id);
  if (!chat || chat !== String(ex.env.TELEGRAM_CHAT_ID || '')) return { ok: true, ignored: true };

  if (cb) {                                                         // tasti sotto i ticket
    const [kind, id] = String(cb.data || '').split(':');
    if (kind === 'ap' && /^T-\d+$/.test(id)) {
      const r = await ex.approve(id);
      await answer(ex, cb.id, r.ok ? (r.dryRun ? 'Prova riuscita: nessun ordine inviato' : r.pending ? 'Inviato, in attesa di conferma' : 'Eseguito') : (r.error || 'Errore').slice(0, 150));
      if (!r.ok) await reply(ex, chat, `❌ ${id}: ${r.error}${r.reasons ? '\n' + r.reasons.join('\n') : ''}`); else if (r.dryRun) await reply(ex, chat, dryText(id, r.report));
    }
    else if (kind === 'rj' && /^T-\d+$/.test(id)) { await ex.reject(id); await answer(ex, cb.id, 'Scartato'); }
    else if (kind === 'pa' && /^C-\d+$/.test(id)) { const r = await ex.applyProposal(id); await answer(ex, cb.id, r.ok ? 'Parametri applicati' : (r.error || 'Errore').slice(0, 150)); }
    else if (kind === 'pr' && /^C-\d+$/.test(id)) { await ex.rejectProposal(id); await answer(ex, cb.id, 'Richiesta rifiutata'); await reply(ex, chat, `${id} rifiutata.`); }
    else await answer(ex, cb.id, 'Comando non valido');
    return { ok: true };
  }

  const text = String(msg.text || '').trim(); if (!text.startsWith('/')) return { ok: true, ignored: true };
  const [cmdRaw, ...args] = text.split(/\s+/), cmd = cmdRaw.split('@')[0].toLowerCase();
  switch (cmd) {
    case '/start': case '/aiuto': case '/help': await reply(ex, chat, HELP); break;
    case '/stato': {
      const s = await ex.state(), h = await ex.health();
      await reply(ex, chat, `KAISER · stato\nModo: ${s.mode.toUpperCase()}${s.killed ? ' · KILL SWITCH ATTIVO' : ''}\nPosizioni reali: ${s.positions.length} · in attesa: ${s.pending.length} · ticket: ${s.tickets.length}\nP&L di oggi: ${fmt(s.dayPnl)} SOL\nSaldo wallet: ${h.balanceSOL != null ? fmt(h.balanceSOL) + ' SOL' : (h.rpcError || h.walletError || '—')}\nLimiti: capitale ${s.limits.maxCapitalSOL} · ordine ${s.limits.maxOrderSOL} · perdita giorno ${s.limits.maxDailyLossSOL} SOL`);
      break; }
    case '/posizioni': {
      const s = await ex.state();
      if (!s.positions.length) { await reply(ex, chat, 'Nessuna posizione reale aperta.'); break; }
      const px = await ex.prices(s.positions.map((p) => p.mint));
      await reply(ex, chat, s.positions.map((p) => { const m = px.get(p.mint), pnl = m && p.entry > 0 ? (m.priceNative / p.entry - 1) * 100 : null; return `${p.id} $${p.sym} · costo ${fmt(p.costSol)} SOL · ${pnl == null ? 'prezzo n/d' : (pnl >= 0 ? '+' : '') + pnl.toFixed(1) + '%'}${p.tp1Done ? ' · TP1 fatto' : ''}`; }).join('\n'));
      break; }
    case '/wallet': {
      const h = await ex.health();
      await reply(ex, chat, h.wallet ? `Wallet: ${h.wallet}\nSaldo: ${h.balanceSOL != null ? fmt(h.balanceSOL) + ' SOL' : (h.rpcError || '—')}\nConfronta le prime e le ultime lettere con il tuo wallet.` : `Wallet non disponibile: ${h.walletError || 'errore'}`);
      break; }
    case '/approva': case '/rifiuta': {
      const id = (args[0] || '').toUpperCase(); if (!/^T-\d+$/.test(id)) { await reply(ex, chat, `Uso: ${cmd} T-0001`); break; }
      if (cmd === '/rifiuta') { await ex.reject(id); await reply(ex, chat, `${id} scartato.`); break; }
      const r = await ex.approve(id); await reply(ex, chat, !r.ok ? `❌ ${id}: ${r.error}${r.reasons ? '\n' + r.reasons.join('\n') : ''}` : r.dryRun ? dryText(id, r.report) : `✅ ${id} ${r.pending ? 'inviato, in attesa di conferma' : 'eseguito'}.`);
      break; }
    case '/prova': {                                              // collaudo con dati veri, senza inviare nulla
      const mint = args[0] || '', size = args[1] ? num(args[1].replace(',', '.'), NaN) : 0.01;
      if (!mint || !(size > 0)) { await reply(ex, chat, 'Uso: /prova MINT [SOL]\nEsempio: /prova EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v 0.01 (USDC)\nCostruisce, controlla e simula un acquisto con Jupiter e l\'RPC veri. NON invia nessun ordine.'); break; }
      const r = await ex.buy({ ref: 'prova-' + ex.now().toString(36), mint, sym: 'PROVA', sizeSol: size, dryRun: true });
      await reply(ex, chat, r.ok && r.dryRun ? dryText('Prova', r.report) : `❌ Prova rifiutata: ${r.error}${r.reasons ? '\n• ' + r.reasons.join('\n• ') : ''}${r.programs ? '\n\nProgrammi trovati nella transazione:\n' + r.programs.join('\n') + '\nVerifica che quello di Jupiter coincida con JUPITER_PROGRAM_ID.' : ''}`);
      break; }
    case '/vendi': {
      const id = (args[0] || '').toUpperCase(); if (!/^R-\d+$/.test(id)) { await reply(ex, chat, 'Uso: /vendi R-0001 [percentuale]'); break; }
      const pct = args[1] ? num(args[1].replace('%', ''), NaN) : 100; if (!(pct > 0 && pct <= 100)) { await reply(ex, chat, 'La percentuale deve essere tra 1 e 100.'); break; }
      const r = await ex.sell(id, pct / 100, 'Manuale (Telegram)'); if (!r.ok) await reply(ex, chat, `❌ ${id}: ${r.error}`);
      break; }
    case '/parametri': {
      const v = await ex.paramsView(), ov = { ...v.runner, ...v.worker }, keys = Object.keys(ov);
      const lines = keys.map((k) => `• ${v.schema[k].label}: ${typeof ov[k] === 'boolean' ? (ov[k] ? 'sì' : 'no') : ov[k]}`);
      await reply(ex, chat, `Parametri cambiati dall'app (sopra config.json e sotto i tetti di Cloudflare):\n${lines.length ? lines.join('\n') : '— nessuno —'}\n\nRichieste in attesa: ${v.proposals.length ? v.proposals.map((p) => p.id).join(', ') : 'nessuna'}\n/reset_parametri per tornare ai valori di base.`);
      break; }
    case '/reset_parametri': await ex.resetParams(); break;
    case '/kill': { await ex.kill(); await reply(ex, chat, '🛑 Kill switch attivo: nuovi ingressi fermi. Le uscite restano attive. /riattiva per ripartire.'); break; }
    case '/riattiva': { await ex.resume(); await reply(ex, chat, '▶️ Ingressi riattivati.'); break; }
    default: await reply(ex, chat, 'Comando non riconosciuto.\n\n' + HELP);
  }
  return { ok: true };
}

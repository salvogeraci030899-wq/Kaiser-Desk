const { guard, readBody } = require('./_lib');

// Stessa tastiera del runner: pump.fun in evidenza, poi DexScreener (con pairAddress se c'è,
// così apre proprio quella pool), GMGN. URL statici, nessun callback: niente handler update().
const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
function mintKeyboard(mint, pairAddress) {
  if (!MINT_RE.test(mint || '')) return null;
  const pair = MINT_RE.test(pairAddress || '') ? pairAddress : mint;
  return { inline_keyboard: [[
    { text: '🟢 pump.fun', url: `https://pump.fun/coin/${mint}` },
    { text: '📈 DexScreener', url: `https://dexscreener.com/solana/${pair}` },
    { text: '🦅 GMGN', url: `https://gmgn.ai/sol/token/${mint}` },
  ]] };
}

module.exports = async (req, res) => {
  if (!guard(req, res)) return;
  const tok = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!tok || !chat) return res.status(200).json({ ok: false, error: 'Telegram non configurato' });
  try {
    const b = await readBody(req);
    const text = String(b.text || '').slice(0, 3500);
    if (!text) throw new Error('Testo vuoto');
    const payload = { chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true };
    // Bottoni: b.keyboard (custom, se vuoi una riga di pulsanti tua) ha precedenza; altrimenti b.mint
    // (+ b.pairAddress opzionale) genera la tastiera standard. Senza né l'uno né l'altro → nessun bottone.
    let kb = null;
    if (b.keyboard && typeof b.keyboard === 'object' && Array.isArray(b.keyboard.inline_keyboard)) kb = b.keyboard;
    else if (b.mint) kb = mintKeyboard(String(b.mint), b.pairAddress ? String(b.pairAddress) : undefined);
    if (kb) payload.reply_markup = kb;
    const r = await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const d = await r.json();
    res.status(200).json({ ok: !!d.ok, error: d.ok ? undefined : d.description });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e.message || e) });
  }
};

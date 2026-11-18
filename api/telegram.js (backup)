const { guard, readBody } = require('./_lib');

module.exports = async (req, res) => {
  if (!guard(req, res)) return;
  const tok = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!tok || !chat) return res.status(200).json({ ok: false, error: 'Telegram non configurato' });
  try {
    const b = await readBody(req);
    const text = String(b.text || '').slice(0, 3500);
    if (!text) throw new Error('Testo vuoto');
    const r = await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    const d = await r.json();
    res.status(200).json({ ok: !!d.ok, error: d.ok ? undefined : d.description });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e.message || e) });
  }
};

const { guard } = require('./_lib');

module.exports = async (req, res) => {
  if (!guard(req, res)) return;
  res.status(200).json({
    ok: true,
    app: 'kaiser-desk',
    gmgn: !!process.env.GMGN_API_KEY,          // false = usa la chiave demo pubblica (solo lettura, limiti bassi)
    grok: !!process.env.XAI_API_KEY,
    telegram: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    auth: !!process.env.APP_TOKEN,
    time: Date.now(),
  });
};

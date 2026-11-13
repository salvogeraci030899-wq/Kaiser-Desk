// Proxy di riserva per le API pubbliche, usato solo se il browser blocca la chiamata diretta (CORS).
const { guard } = require('./_lib');

const ALLOWED = ['api.dexscreener.com', 'api.rugcheck.xyz', 'lite-api.jup.ag'];

module.exports = async (req, res) => {
  if (!guard(req, res)) return;
  try {
    const u = new URL(String(req.query.u || ''));
    if (u.protocol !== 'https:' || !ALLOWED.includes(u.hostname)) throw new Error('Host non consentito');
    const r = await fetch(u.toString(), { headers: { accept: 'application/json' } });
    const text = await r.text();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=5');
    res.status(r.status).send(text);
  } catch (e) {
    res.status(400).json({ ok: false, error: String(e.message || e) });
  }
};

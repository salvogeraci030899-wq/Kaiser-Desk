// Helper condiviso (i file che iniziano con "_" non diventano endpoint su Vercel)
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-app-token');
}

// Se APP_TOKEN è impostato su Vercel, ogni chiamata deve avere lo stesso token
// (così nessun estraneo può consumare i tuoi crediti GMGN/xAI o scriverti su Telegram).
function guard(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return false; }
  const need = process.env.APP_TOKEN;
  if (need && req.headers['x-app-token'] !== need) {
    res.status(401).json({ ok: false, error: 'Token app mancante o errato' });
    return false;
  }
  return true;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  return await new Promise((resolve) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > 1e5) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

const MINT_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

module.exports = { cors, guard, readBody, MINT_RE };

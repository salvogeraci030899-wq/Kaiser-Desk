// Ponte verso GMGN Agent Skills: esegue gmgn-cli (solo comandi di LETTURA in whitelist).
// Nessun comando di swap/ordine è raggiungibile da qui, per scelta.
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { guard, readBody, MINT_RE } = require('./_lib');

const DEMO_KEY = 'gmgn_solbscbaseethmonadtron'; // chiave demo pubblica documentata da GMGN
const cache = new Map(); // cache breve per rispettare il rate limit GMGN (10 req / bucket)

function cliPath() {
  const candidates = [];
  try { candidates.push(path.dirname(require.resolve('gmgn-cli/package.json'))); } catch {}
  candidates.push(path.join(process.cwd(), 'node_modules', 'gmgn-cli'));
  candidates.push(path.join(__dirname, '..', 'node_modules', 'gmgn-cli'));
  for (const dir of candidates) {
    const pj = path.join(dir, 'package.json');
    if (!fs.existsSync(pj)) continue;
    const pkg = JSON.parse(fs.readFileSync(pj, 'utf8'));
    let bin = pkg.bin;
    if (bin && typeof bin === 'object') bin = bin['gmgn-cli'] || Object.values(bin)[0];
    if (bin) return path.join(dir, bin);
  }
  throw new Error('gmgn-cli non trovato: controlla package.json e vercel.json');
}

const clampInt = (v, lo, hi, d) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d; };
const pick = (v, list, d) => (list.includes(v) ? v : d);

const FILTERS = ['has_social', 'not_risk', 'not_honeypot', 'verified', 'locked', 'renounced', 'distributed',
  'not_wash_trading', 'not_social_dup', 'not_image_dup', 'is_internal_market', 'is_out_market'];
const ORDER = ['default', 'swaps', 'marketcap', 'liquidity', 'volume', 'holder_count', 'smart_degen_count',
  'renowned_count', 'change1m', 'change5m', 'change1h', 'creation_timestamp'];

function buildArgs(b) {
  const chain = ['--chain', 'sol'];
  switch (b.cmd) {
    case 'trending': {
      const a = ['market', 'trending', ...chain,
        '--interval', pick(b.interval, ['1m', '5m', '1h', '6h', '24h'], '1h'),
        '--limit', String(clampInt(b.limit, 1, 100, 40))];
      if (b.orderBy) a.push('--order-by', pick(b.orderBy, ORDER, 'default'));
      for (const f of (Array.isArray(b.filters) ? b.filters : [])) if (FILTERS.includes(f)) a.push('--filter', f);
      if (b.minLiquidity) a.push('--min-liquidity', String(clampInt(b.minLiquidity, 0, 1e9, 0)));
      return a;
    }
    case 'trenches': {
      const a = ['market', 'trenches', ...chain, '--limit', String(clampInt(b.limit, 1, 100, 40))];
      if (b.type) a.push('--type', String(b.type).replace(/[^a-z_]/g, ''));
      return a;
    }
    case 'security':
    case 'info':
    case 'pool': {
      if (!MINT_RE.test(b.address || '')) throw new Error('Indirizzo token non valido');
      return ['token', b.cmd, ...chain, '--address', b.address];
    }
    case 'holders': {
      if (!MINT_RE.test(b.address || '')) throw new Error('Indirizzo token non valido');
      return ['token', 'holders', ...chain, '--address', b.address, '--limit', String(clampInt(b.limit, 1, 100, 20))];
    }
    case 'smartmoney':
    case 'kol':
      return ['track', b.cmd, ...chain, '--limit', String(clampInt(b.limit, 1, 100, 30))];
    default:
      throw new Error('Comando non consentito');
  }
}

function parseOut(stdout) {
  const s = stdout.trim();
  try { return JSON.parse(s); } catch {}
  const lines = s.split('\n').reverse();
  for (const l of lines) { try { return JSON.parse(l); } catch {} }
  throw new Error('Output GMGN non in JSON');
}

function run(args) {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, [cliPath(), ...args, '--raw'], {
      timeout: 25000,
      maxBuffer: 8 * 1024 * 1024,
      env: { ...process.env, HOME: '/tmp', GMGN_API_KEY: process.env.GMGN_API_KEY || DEMO_KEY },
    }, (err, stdout, stderr) => {
      if (err && !stdout) return reject(new Error((stderr || err.message).slice(0, 400)));
      try { resolve({ data: parseOut(stdout), notice: /neutralized/i.test(stderr || '') }); }
      catch (e) { reject(new Error(((stderr || '') + ' ' + e.message).slice(0, 400))); }
    });
  });
}

module.exports = async (req, res) => {
  if (!guard(req, res)) return;
  try {
    const b = req.method === 'GET' ? req.query : await readBody(req);
    const args = buildArgs(b || {});
    const key = args.join(' ');
    const hit = cache.get(key);
    const ttl = b.cmd === 'trending' || b.cmd === 'trenches' ? 20000 : 60000;
    if (hit && Date.now() - hit.t < ttl) return res.status(200).json({ ok: true, cached: true, ...hit.v });
    const v = await run(args);
    cache.set(key, { t: Date.now(), v });
    res.status(200).json({ ok: true, ...v });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e.message || e) });
  }
};

module.exports.buildArgs = buildArgs; // per i test
module.exports.run = run; // usato dal runner GitHub Actions

// KAISER · parametri modificabili dall'app (con approvazione su Telegram). Solo numeri, interruttori e scelte da elenco:
// nessun token, chiave, indirizzo o testo libero. Questo elenco è l'unica fonte: il Worker valida con questo, l'app disegna il modulo da qui.
// scope "runner" = lo usa il runner (paper e ordini reali dal runner); scope "worker" = limiti dell'esecutore (sempre sotto il tetto impostato in Cloudflare).
import E from '../../engine.js';

const n = (label, group, min, max, o = {}) => ({ t: 'num', label, group, min, max, ...o });
const b = (label, group, o = {}) => ({ t: 'bool', label, group, ...o });

export const GROUPS = [
  { id: 'auto', title: 'Autopilota del runner' },
  { id: 'risk', title: 'Capitale e rischio' },
  { id: 'exit', title: 'Uscite (Charon)' },
  { id: 'filt', title: 'Filtri (Scout · Oracle · Sentinel)' },
  { id: 'real', title: 'Reale: ordini dal runner' },
  { id: 'lim', title: 'Reale: limiti dell\'esecutore' },
];

export const SCHEMA = {
  autopilot: b('Autopilota', 'auto', { scope: 'runner', hint: 'il runner entra in posizione da solo' }),
  approve: b('Approvazione manuale (paper)', 'auto', { scope: 'runner', hint: 'nel paper crea ticket invece di comprare' }),
  scanSec: n('Intervallo scan (s)', 'auto', 15, 600, { scope: 'runner', step: 1 }),
  minScore: n('Score minimo BUY', 'auto', 40, 100, { scope: 'runner', step: 1 }),
  useGrok: b('Grok sui BUY', 'auto', { scope: 'runner', hint: 'costa crediti xAI' }),

  sizePct: n('Size per trade (%)', 'risk', 0.5, 50, { scope: 'runner', step: 0.5, hint: 'paper: % dell\'equity · reale: % del capitale reale' }),
  maxPos: n('Posizioni max (paper)', 'risk', 1, 10, { scope: 'runner', step: 1 }),
  maxEntriesPerScan: n('Ingressi per scan', 'risk', 1, 5, { scope: 'runner', step: 1, hint: 'più BUY insieme sono scommesse correlate' }),
  slippageBps: n('Slippage max (bps)', 'risk', 50, 1500, { scope: 'runner', step: 10, hint: '300 = 3%' }),
  feePct: n('Commissioni per lato (%)', 'risk', 0, 5, { scope: 'runner', step: 0.1 }),
  prioritySOL: n('Priority fee (SOL)', 'risk', 0, 0.01, { scope: 'runner', step: 0.0001 }),
  dailyLossPct: n('Stop giornaliero (%)', 'risk', 1, 50, { scope: 'runner', step: 1, hint: 'circuit breaker del paper' }),
  cooldownMin: n('Cooldown dopo perdita (min)', 'risk', 0, 240, { scope: 'runner', step: 1 }),
  retradeH: n('Ritrade sullo stesso token dopo (ore)', 'risk', 0, 48, { scope: 'runner', step: 0.5 }),
  taxPct: n('Tasse sulle vincite (%)', 'risk', 0, 60, { scope: 'runner', step: 1 }),

  sl: n('Stop loss (%)', 'exit', 5, 60, { scope: 'runner', step: 1 }),
  tp1: n('Take profit 1 (%)', 'exit', 5, 1000, { scope: 'runner', step: 1 }),
  tp1Sell: n('Quota venduta al TP1 (%)', 'exit', 10, 100, { scope: 'runner', step: 5 }),
  trail: n('Trailing dal picco dopo TP1 (%)', 'exit', 5, 60, { scope: 'runner', step: 1 }),
  beAfterTp1: b('Break-even dopo TP1', 'exit', { scope: 'runner' }),
  timeStopMin: n('Time stop (min)', 'exit', 5, 720, { scope: 'runner', step: 1 }),
  timeStopMinPnl: n('Time stop: guadagno minimo (%)', 'exit', -50, 100, { scope: 'runner', step: 1 }),
  rugLiqDrop: n('Uscita se la liquidità cala (%)', 'exit', 10, 90, { scope: 'runner', step: 1 }),
  sellPressure: b('Esci sulla pressione di vendita', 'exit', { scope: 'runner' }),

  minLiq: n('Liquidità minima ($)', 'filt', 1000, 10_000_000, { scope: 'runner', step: 1000 }),
  minMcap: n('Market cap minimo ($)', 'filt', 1000, 1_000_000_000, { scope: 'runner', step: 1000 }),
  maxMcap: n('Market cap massimo ($)', 'filt', 10_000, 10_000_000_000, { scope: 'runner', step: 10000 }),
  minAgeMin: n('Età minima (min)', 'filt', 0, 1440, { scope: 'runner', step: 1 }),
  maxAgeH: n('Età massima (ore)', 'filt', 1, 720, { scope: 'runner', step: 1 }),
  minTxH1: n('Transazioni minime in 1h', 'filt', 0, 5000, { scope: 'runner', step: 5 }),
  srcDexProfiles: b('Fonte: profili DexScreener', 'filt', { scope: 'runner' }),
  srcDexBoosts: b('Fonte: boost DexScreener', 'filt', { scope: 'runner' }),
  srcGmgnTrending: b('Fonte: GMGN trending', 'filt', { scope: 'runner' }),
  srcGmgnTrenches: b('Fonte: GMGN trenches', 'filt', { scope: 'runner', hint: 'token nuovissimi' }),
  gmgnInterval: { t: 'enum', label: 'Finestra GMGN', group: 'filt', scope: 'runner', values: ['1m', '5m', '1h', '6h', '24h'] },

  realEnabled: b('Reale acceso (ordini dal runner)', 'real', { scope: 'runner', hint: 'serve anche ORDERS_MODE nel Worker' }),
  realCapitalSOL: n('Capitale reale (SOL)', 'real', 0, 5, { scope: 'runner', step: 0.01, dec: 4, hint: 'base per la size degli ordini' }),
  realApprove: b('Approvazione manuale in reale', 'real', { scope: 'runner', hint: 'ogni ingresso è un ticket su Telegram' }),

  maxCapitalSOL: n('Capitale in uso max (SOL)', 'lim', 0, 5, { scope: 'worker', step: 0.01, dec: 4, ceiling: true }),
  maxOrderSOL: n('Size max per ordine (SOL)', 'lim', 0, 1, { scope: 'worker', step: 0.005, dec: 4, ceiling: true }),
  maxDailyLossSOL: n('Perdita giornaliera max (SOL)', 'lim', 0, 2, { scope: 'worker', step: 0.01, dec: 4, ceiling: true }),
  maxPositions: n('Posizioni reali max', 'lim', 1, 10, { scope: 'worker', step: 1, ceiling: true }),
  maxSlippageBps: n('Slippage max in ingresso (bps)', 'lim', 50, 1500, { scope: 'worker', step: 10, ceiling: true }),
  maxImpactPct: n('Impatto di prezzo max (%)', 'lim', 0.5, 20, { scope: 'worker', step: 0.5, dec: 2, ceiling: true }),
};

// Nomi che non devono mai comparire tra i parametri (il test lo verifica): niente segreti, indirizzi, URL.
export const FORBIDDEN = /token|key|secret|password|backend|executor|url|wallet|address|^mint$|mode$/i;
export const MAX_KEYS = 40;

// Valida una richiesta di modifica. Restituisce { clean, errors }: clean contiene solo chiavi note, con tipo e intervallo corretti.
export function validate(changes) {
  const clean = {}, errors = [];
  if (!changes || typeof changes !== 'object' || Array.isArray(changes)) return { clean, errors: [{ key: '', msg: 'richiesta non valida' }] };
  const keys = Object.keys(changes);
  if (!keys.length) return { clean, errors: [{ key: '', msg: 'nessuna modifica' }] };
  if (keys.length > MAX_KEYS) return { clean, errors: [{ key: '', msg: 'troppe modifiche in una volta' }] };
  for (const k of keys) {
    const s = Object.prototype.hasOwnProperty.call(SCHEMA, k) ? SCHEMA[k] : null, v = changes[k];
    if (!s) { errors.push({ key: k, msg: 'parametro non modificabile' }); continue; }
    if (s.t === 'bool') { if (typeof v !== 'boolean') errors.push({ key: k, msg: 'deve essere sì o no' }); else clean[k] = v; }
    else if (s.t === 'enum') { if (!s.values.includes(v)) errors.push({ key: k, msg: 'valore non ammesso' }); else clean[k] = v; }
    else {
      if (typeof v !== 'number' || !Number.isFinite(v)) { errors.push({ key: k, msg: 'deve essere un numero' }); continue; }
      if (v < s.min || v > s.max) { errors.push({ key: k, msg: `fuori intervallo (${s.min}–${s.max})` }); continue; }
      const d = s.dec ?? (s.step && s.step < 1 ? Math.max(1, Math.ceil(-Math.log10(s.step))) : 0);
      clean[k] = Number(v.toFixed(d));
    }
  }
  return { clean, errors };
}

const show = (s, v) => (s.t === 'bool' ? (v ? 'sì' : 'no') : v);
// Testo leggibile della differenza, per il messaggio di Telegram
export function diffText(current, changes) {
  return Object.entries(changes).map(([k, v]) => { const s = SCHEMA[k]; return `• ${s.label}: ${show(s, current[k])} → ${show(s, v)}`; }).join('\n');
}
export const defaults = () => Object.fromEntries(Object.keys(SCHEMA).filter((k) => SCHEMA[k].scope === 'runner' && k in E.DEFAULTS).map((k) => [k, E.DEFAULTS[k]]));

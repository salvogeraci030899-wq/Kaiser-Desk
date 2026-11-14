// KAISER · parametri modificabili dall'app (con approvazione su Telegram). Solo numeri, interruttori e scelte da elenco:
// nessun token, chiave, indirizzo o testo libero. Questo elenco è l'unica fonte: il Worker valida con questo, l'app disegna il modulo da qui.
// scope "runner" = lo usa il runner (paper e ordini reali dal runner); scope "worker" = limiti dell'esecutore (sempre sotto il tetto impostato in Cloudflare).
import E from '../../engine.js';

const n = (label, group, min, max, o = {}) => ({ t: 'num', label, group, min, max, ...o });
const b = (label, group, o = {}) => ({ t: 'bool', label, group, ...o });

// Due pagine nelle impostazioni dell'app: Paper e Reale. I filtri di selezione dei token sono in comune (stessi candidati), ma stanno nella pagina Paper.
export const GROUPS = [
  { id: 'auto', page: 'paper', title: 'Autopilota del runner' },
  { id: 'risk', page: 'paper', title: 'Capitale e rischio (paper)' },
  { id: 'exit', page: 'paper', title: 'Uscite (Charon, paper)' },
  { id: 'filt', page: 'paper', title: 'Filtri di selezione (valgono anche per il reale)' },
  { id: 'real', page: 'real', title: 'Ordini reali dal runner' },
  { id: 'rexit', page: 'real', title: 'Uscite (Charon, reale)' },
  { id: 'lim', page: 'real', title: 'Limiti dell\'esecutore (tetti in Cloudflare)' },
];

export const SCHEMA = {
  autopilot: b('Autopilota', 'auto', { scope: 'runner', hint: 'il runner entra in posizione da solo' }),
  paperEnabled: b('Paper acceso (nuovi ingressi)', 'auto', { scope: 'runner', hint: 'spento = il paper non apre nuove posizioni' }),
  paperStop: b('Paper in stop', 'auto', { scope: 'runner', hint: 'ferma subito i nuovi ingressi paper; le posizioni restano gestite' }),
  scanSec: n('Intervallo scan (s)', 'auto', 15, 600, { scope: 'runner', step: 1 }),
  minScore: n('Score minimo BUY', 'auto', 40, 100, { scope: 'runner', step: 1 }),
  useGrok: b('Grok sui BUY', 'auto', { scope: 'runner', hint: 'costa crediti xAI' }),

  sizePct: n('Size per trade (% dell\'equity)', 'risk', 0.5, 50, { scope: 'runner', step: 0.5 }),
  maxPos: n('Posizioni max (paper)', 'risk', 1, 10, { scope: 'runner', step: 1 }),
  maxEntriesPerScan: n('Ingressi per scan', 'risk', 1, 5, { scope: 'runner', step: 1, hint: 'più BUY insieme sono scommesse correlate' }),
  slippageBps: n('Slippage max (bps)', 'risk', 50, 1500, { scope: 'runner', step: 10, hint: '300 = 3%' }),
  feePct: n('Commissioni per lato (%)', 'risk', 0, 5, { scope: 'runner', step: 0.1 }),
  prioritySOL: n('Priority fee (SOL)', 'risk', 0, 0.01, { scope: 'runner', step: 0.0001 }),
  dailyLossPct: n('Stop giornaliero (%)', 'risk', 1, 50, { scope: 'runner', step: 1, hint: 'circuit breaker del paper' }),
  entryGapSec: n('Pausa tra due ingressi (s)', 'risk', 0, 900, { scope: 'runner', step: 5, hint: 'evita di entrare in tanti token insieme: sono scommesse correlate' }),
  cooldownMin: n('Cooldown dopo perdita (min)', 'risk', 0, 240, { scope: 'runner', step: 1 }),
  retradeH: n('Ritrade sullo stesso token dopo (ore)', 'risk', 0, 48, { scope: 'runner', step: 0.5 }),

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
  srcYoung: b('Fonte: token appena creati (0-60 min)', 'filt', { scope: 'runner', hint: 'ascolta le creazioni su pump.fun (RPC o PumpPortal) e segue ogni token un\'ora' }),
  minDipPct: n('Token giovani: entra solo dopo un calo (%)', 'filt', 0, 80, { scope: 'runner', step: 1, hint: '0 = spento; es. 20 = compra solo se il prezzo è già sceso del 20% dal picco' }),
  srcJupiter: b('Fonte: Jupiter', 'filt', { scope: 'runner', hint: 'token in tendenza e appena comparsi' }),
  srcGecko: b('Fonte: GeckoTerminal', 'filt', { scope: 'runner', hint: 'pool in tendenza e appena nati: molte più Coin nel radar' }),
  srcGmgnTrending: b('Fonte: GMGN trending', 'filt', { scope: 'runner', hint: 'serve la chiave GMGN (a pagamento): senza, è ignorata' }),
  srcGmgnTrenches: b('Fonte: GMGN trenches', 'filt', { scope: 'runner', hint: 'token nuovissimi; serve la chiave GMGN (a pagamento)' }),
  gmgnInterval: { t: 'enum', label: 'Finestra GMGN', group: 'filt', scope: 'runner', values: ['1m', '5m', '1h', '6h', '24h'] },

  realEnabled: b('Reale acceso (ordini dal runner)', 'real', { scope: 'runner', hint: 'serve anche ORDERS_MODE nel Worker' }),
  realCapitalSOL: n('Capitale reale (SOL)', 'real', 0, 5, { scope: 'runner', step: 0.01, dec: 4, hint: 'base per la size degli ordini' }),
  realApprove: b('Approvazione manuale in reale', 'real', { scope: 'runner', hint: 'ogni ingresso è un ticket su Telegram' }),
  realSizePct: n('Size per trade (% del capitale reale)', 'real', 0.5, 100, { scope: 'runner', step: 0.5 }),
  realMinScore: n('Score minimo per entrare in reale', 'real', 40, 100, { scope: 'runner', step: 1, hint: 'puoi essere più selettivo che nel paper' }),
  realMaxEntriesPerScan: n('Ingressi per scan (reale)', 'real', 1, 5, { scope: 'runner', step: 1 }),
  realSlippageBps: n('Slippage max degli ordini (bps)', 'real', 50, 1500, { scope: 'runner', step: 10, hint: '300 = 3%' }),

  realSl: n('Stop loss (%)', 'rexit', 5, 60, { scope: 'runner', step: 1 }),
  realTp1: n('Take profit 1 (%)', 'rexit', 5, 1000, { scope: 'runner', step: 1 }),
  realTp1Sell: n('Quota venduta al TP1 (%)', 'rexit', 10, 100, { scope: 'runner', step: 5 }),
  realTrail: n('Trailing dal picco dopo TP1 (%)', 'rexit', 5, 60, { scope: 'runner', step: 1 }),
  realBeAfterTp1: b('Break-even dopo TP1', 'rexit', { scope: 'runner' }),
  realTimeStopMin: n('Time stop (min)', 'rexit', 5, 720, { scope: 'runner', step: 1 }),
  realTimeStopMinPnl: n('Time stop: guadagno minimo (%)', 'rexit', -50, 100, { scope: 'runner', step: 1 }),
  realRugLiqDrop: n('Uscita se la liquidità cala (%)', 'rexit', 10, 90, { scope: 'runner', step: 1 }),
  realSellPressure: b('Esci sulla pressione di vendita', 'rexit', { scope: 'runner' }),

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
// A quale pagina (Paper o Reale) appartiene un parametro. Nei messaggi di Telegram ogni voce porta il prefisso, così non si approva il conto sbagliato.
export const pageOfKey = (k) => (GROUPS.find((g) => g.id === SCHEMA[k].group) || {}).page;
export const tagged = (k) => `${pageOfKey(k) === 'real' ? 'Reale' : 'Paper'} · ${SCHEMA[k].label}`;
// Testo leggibile della differenza, per il messaggio di Telegram
export function diffText(current, changes) {
  return Object.entries(changes).map(([k, v]) => { const s = SCHEMA[k]; return `• ${tagged(k)}: ${show(s, current[k])} → ${show(s, v)}`; }).join('\n');
}
export const defaults = () => Object.fromEntries(Object.keys(SCHEMA).filter((k) => SCHEMA[k].scope === 'runner' && k in E.DEFAULTS).map((k) => [k, E.DEFAULTS[k]]));

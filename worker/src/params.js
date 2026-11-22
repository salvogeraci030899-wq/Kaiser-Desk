// KAISER · parametri modificabili dall'app (con approvazione su Telegram). Solo numeri, interruttori e scelte da elenco:
// nessun token, chiave, indirizzo o testo libero. Questo elenco è l'unica fonte: il Worker valida con questo, l'app disegna il modulo da qui.
// scope "runner" = lo usa il runner (paper e ordini reali dal runner); scope "worker" = limiti dell'esecutore (sempre sotto il tetto impostato in Cloudflare).
import E from '../../engine.js';

const n = (label, group, min, max, o = {}) => ({ t: 'num', label, group, min, max, ...o });
const b = (label, group, o = {}) => ({ t: 'bool', label, group, ...o });

// Due pagine nelle impostazioni dell'app: Paper e Reale. I filtri di selezione dei token sono in comune (stessi candidati), ma stanno nella pagina Paper.
export const GROUPS = [
  { id: 'human', page: 'paper', title: 'Uomo e macchina (fascia alta)' },
  { id: 'auto', page: 'paper', title: 'Autopilota del runner (spento in modalità solo uomo)' },
  { id: 'risk', page: 'paper', title: 'Capitale e rischio (paper)' },
  { id: 'exit', page: 'paper', title: 'Uscite del bot (Charon): non valgono per i Prendo' },
  { id: 'filt', page: 'paper', title: 'Filtri del bot (non attivi in solo uomo: la fascia alta impone i suoi limiti e i valori salvati più stretti non contano)' },
  { id: 'real', page: 'real', title: 'Ordini reali dal runner' },
  { id: 'rexit', page: 'real', title: 'Uscite (Charon, reale)' },
  { id: 'shield', page: 'real', title: 'Scudo: protezione del trading manuale da pump.fun' },
  { id: 'lim', page: 'real', title: 'Limiti dell\'esecutore (tetti in Cloudflare)' },
];

export const SCHEMA = {
  // Uomo e macchina: le Coin da bandMin in su generano gli avvisi; le uscite dei Prendo sono quelle della prova. Cambiarle a meta' prova falsa il confronto:
  // le posizioni gia' aperte e gli Scarti simulati tengono le uscite con cui sono partiti.
  bandMin: n('Fascia alta: market cap minima ($)', 'human', 100_000, 20_000_000, { scope: 'runner', step: 50_000, hint: 'il Radar e gli avvisi guardano solo le Coin da questo valore in su' }),
  alertMinScore: n('Punteggio minimo per l\'avviso', 'human', 30, 100, { scope: 'runner', step: 1, hint: 'il punteggio del bot non compare nell\'avviso: serve solo a non mandarti Coin scadenti' }),
  // Filtri che contano ancora in solo uomo: si sommano alla fascia alta (che fissa da sola i minimi di market cap e liquidità e i massimi di market cap ed età)
  minTxH1: n('Transazioni minime in 1h', 'human', 0, 5000, { scope: 'runner', step: 5, hint: 'più basso = più avvisi' }),
  minAgeMin: n('Età minima (min)', 'human', 0, 1440, { scope: 'runner', step: 1 }),
  srcDexProfiles: b('Fonte: profili DexScreener', 'human', { scope: 'runner' }),
  srcDexBoosts: b('Fonte: boost DexScreener', 'human', { scope: 'runner' }),
  srcJupiter: b('Fonte: Jupiter', 'human', { scope: 'runner', hint: 'token in tendenza e appena comparsi' }),
  srcGecko: b('Fonte: GeckoTerminal', 'human', { scope: 'runner', hint: 'pool in tendenza e appena nati: molte più Coin nel radar' }),
  srcYoung: b('Fonte: token appena creati (0-60 min)', 'human', { scope: 'runner', hint: 'alimenta la memoria dei creatori: lasciare acceso' }),
  humanBandSl: n('Prendo: stop loss (%)', 'human', 5, 50, { scope: 'runner', step: 1, hint: 'valido per le nuove posizioni; non cambiare a meta\' prova' }),
  humanBandTp: n('Prendo: target (%)', 'human', 20, 500, { scope: 'runner', step: 5, hint: 'a questo guadagno si vende la quota indicata sotto (100 = raddoppio)' }),
  humanBandTpSell: n('Prendo: quota venduta al target (%)', 'human', 10, 100, { scope: 'runner', step: 5 }),
  humanBandTrail: n('Prendo: trailing dal picco dopo il target (%)', 'human', 5, 50, { scope: 'runner', step: 1 }),
  humanBandHoldMin: n('Prendo: tempo massimo (min)', 'human', 60, 2880, { scope: 'runner', step: 30, hint: 'dopo questo tempo la prima parte esce comunque' }),

  autopilot: b('Autopilota', 'auto', { scope: 'runner', hint: 'il runner entra in posizione da solo' }),
  paperEnabled: b('Paper acceso (nuovi ingressi)', 'auto', { scope: 'runner', hint: 'spento = il paper non apre nuove posizioni' }),
  grokTest: b('Test di Grok sui segnali', 'auto', { scope: 'runner', hint: 'solo misura: Grok giudica ogni segnale semi-automatico (serve la chiave XAI_API_KEY e la modalità semi-automatica) e dopo 15 minuti si confronta il giudizio con l\'esito; non cambia gli avvisi né le operazioni. Una chiamata per segnale, al massimo 120 al giorno' }),
  semiAuto: { t: 'enum', label: 'Modalità semi-automatica', group: 'auto', scope: 'runner', values: ['spento', 'avvisi e paper', 'solo avvisi'], hint: 'il radar non apre la posizione: ti manda un avviso con il collegamento a pump.fun e entri tu a mano. «avvisi e paper» lascia girare anche il paper per misurare i segnali; «solo avvisi» non apre posizioni paper' },
  socialTest: b('Test dei callout social (Grok)', 'auto', { scope: 'runner', hint: 'solo misura: a ogni token che supera la soglia Grok cerca su X menzioni, callout di account grandi e allarmi (serve la chiave XAI_API_KEY; al massimo 150 richieste al giorno) e si misura se anticipano l\'esito; non cambia nessuna operazione' }),
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
  refillBelowPct: n('Ricarica automatica sotto (% del capitale)', 'risk', 0, 90, { scope: 'runner', step: 5, hint: 'quando l\'equity scende sotto questa quota del capitale iniziale il saldo torna al capitale (con avviso su Telegram); storico e statistiche restano e il P&L esclude le ricariche; 0 = mai. Vale per il paper e per il conto della strategia' }),
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
  maxAgeH: n('Età massima (ore)', 'filt', 1, 720, { scope: 'runner', step: 1 }),
  srcLab: b('Laboratorio: osserva gli scambi delle Coin nuove', 'filt', { scope: 'runner', hint: 'solo osservazione (nessun acquisto): misura i portafogli concentrati e cosa succede dopo' }),
  minDipPct: n('Token giovani: entra solo dopo un calo (%)', 'filt', 0, 80, { scope: 'runner', step: 1, hint: '0 = spento; es. 20 = compra solo se il prezzo è già sceso del 20% dal picco' }),
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

  realExitSlip: n('Slippage delle uscite: iniziale (%)', 'rexit', 0.5, 50, { scope: 'worker', step: 0.5, hint: 'tolleranza del primo tentativo di vendita (come su pump.fun); non supera EXIT_SLIPPAGE_BPS del Worker' }),
  realExitSlipMax: n('Slippage delle uscite: massimo dopo i tentativi (%)', 'rexit', 1, 50, { scope: 'worker', step: 0.5, hint: 'se la vendita fallisce, i tentativi successivi salgono fino a questo valore (2,5 volte il precedente); non supera EXIT_RETRY_SLIPPAGE_BPS' }),
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
  // Scudo (valori letti dal Worker): stop, TP e uscite per i token che compri a mano con il wallet dell'esecutore
  shieldOn: b('Scudo acceso', 'shield', { scope: 'worker', hint: 'adotta i token che compri a mano (wallet dell\'esecutore) e applica stop e TP; serve ORDERS_MODE=live' }),
  shieldSl: n('Scudo: stop loss (%)', 'shield', 5, 60, { scope: 'worker', step: 1 }),
  shieldTp1: n('Scudo: take profit 1 (%)', 'shield', 5, 1000, { scope: 'worker', step: 1 }),
  shieldTp1Sell: n('Scudo: quota venduta al TP1 (%)', 'shield', 10, 100, { scope: 'worker', step: 5 }),
  shieldTrail: n('Scudo: trailing dal picco dopo TP1 (%)', 'shield', 5, 60, { scope: 'worker', step: 1 }),
  shieldBe: b('Scudo: break-even dopo TP1', 'shield', { scope: 'worker' }),
  shieldTimeStop: n('Scudo: time stop (min)', 'shield', 5, 720, { scope: 'worker', step: 5 }),
  shieldTimeStopPnl: n('Scudo: time stop, guadagno minimo (%)', 'shield', -50, 100, { scope: 'worker', step: 1 }),
  shieldRugDrop: n('Scudo: esci se la liquidità cala del (%)', 'shield', 10, 90, { scope: 'worker', step: 1 }),
  shieldSellPressure: b('Scudo: esci se dominano le vendite', 'shield', { scope: 'worker' }),
  shieldMinSol: n('Scudo: valore minimo da proteggere (SOL)', 'shield', 0.005, 10, { scope: 'worker', step: 0.005, hint: 'sotto questo valore il token viene ignorato (polvere)' }),
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

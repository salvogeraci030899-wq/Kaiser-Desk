// KAISER · menu e schermate del bot Telegram: menu principale a tasti, elenco dei comandi del bot, tastiera fissa, e le schermate paper, segnali, Laboratorio e regole.
// Le schermate leggono il riepilogo che il runner spinge al Worker (paper in diretta); nessuna scrive niente: le modifiche passano dalle richieste con conferma.
import { kb as buildKb, positionRows, APP_URL } from './kb.js';

export const UI_VERSION = '2';          // cambia quando cambiano menu e comandi: il Worker li registra di nuovo e rimanda il menu una volta
export const COMMANDS = [
  ['menu', 'Menu principale'], ['stato', 'Stato generale'], ['paper', 'Paper: risultati e posizioni'], ['segnali', 'Ultimi segnali semi-automatici'], ['lab', 'Riepilogo del Laboratorio'],
  ['regole', 'Regole in prova e validate'], ['posizioni', 'Posizioni reali'], ['scudo', 'Scudo'], ['parametri', 'Modifiche in attesa'], ['emergenza', 'EMERGENZA'], ['aiuto', 'Tutti i comandi'],
];
// Testi della tastiera fissa -> comando
export const LABELS = { menu: '/menu', stato: '/stato', paper: '/paper', segnali: '/segnali', lab: '/lab', posizioni: '/posizioni', regole: '/regole' };

const num = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };
const fmt = (n, d = 3) => (Number.isFinite(Number(n)) ? Number(n).toFixed(d) : '—');
const sg = (n, d = 1) => (Number.isFinite(Number(n)) ? (Number(n) > 0 ? '+' : '') + Number(n).toFixed(d) : '—');
const ago = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return s < 60 ? s + 's' : s < 3600 ? Math.round(s / 60) + 'm' : Math.round(s / 3600) + 'h'; };
const cfgLabel = (c) => `${num(c.thr) / 1000}K · rit. ${c.delay} s · +${c.tp}/-${c.sl}${c.hold ? ' · ' + c.hold + ' s' : ''}`;

export const menuKeyboard = () => ({ inline_keyboard: [
  [{ text: 'Stato', callback_data: 'mn:stato' }, { text: 'Paper', callback_data: 'mn:paper' }, { text: 'Segnali', callback_data: 'mn:segnali' }],
  [{ text: 'Laboratorio', callback_data: 'mn:lab' }, { text: 'Regole', callback_data: 'mn:regole' }, { text: 'Posizioni', callback_data: 'mn:pos' }],
  [{ text: 'Scudo', callback_data: 'mn:scudo' }, { text: 'Modifiche', callback_data: 'mn:par' }, { text: 'Aiuto', callback_data: 'mn:aiuto' }],
  [{ text: 'Semi-automatico', callback_data: 'mn:semi' }, { text: 'Test Grok', callback_data: 'mn:grok' }],
  [{ text: 'Apri Kaiser', url: APP_URL }, { text: 'EMERGENZA', callback_data: 'mn:emerg' }],
] });
export const replyKeyboard = () => ({ keyboard: [[{ text: 'Menu' }, { text: 'Stato' }, { text: 'Paper' }], [{ text: 'Segnali' }, { text: 'Laboratorio' }, { text: 'Posizioni' }]], resize_keyboard: true, is_persistent: true });
// «Laboratorio» e' il testo del tasto: si accetta anche come parola
LABELS.laboratorio = '/lab';

async function snap(ex) { try { const r = await ex.paperGet(); return r && r.ok ? r.data : null; } catch { return null; } }

// ---- menu principale con lo stato in testa ----
export async function menuText(ex) {
  let note = null; try { note = ex.env.STATE ? await ex.env.STATE.get('tgwh_note') : null; } catch { /* niente */ }
  const s = await ex.state().catch(() => null), d = await snap(ex), c = (d && d.config) || {}; let sh = {}; try { await ex.refreshOv(); sh = ex.shieldCfg() || {}; } catch { /* senza lo stato dello Scudo */ }
  return ['KAISER · menu',
    `Ordini: ${s ? String(s.mode).toUpperCase() : '—'}${s && s.killed ? ' · KILL SWITCH ATTIVO' : ''} · Scudo: ${sh && sh.shieldOn ? 'acceso' : 'spento'}`,
    `Semi-automatico: ${c.semiAuto || 'spento'} · Test Grok: ${c.grokTest ? 'acceso' : 'spento'}`,
    d ? `Paper: equity ${fmt(d.equity)} SOL · ${d.halted ? 'FERMO (limite di perdita)' : 'attivo'} · ${num(d.positions && d.positions.length)} posizioni` : 'Paper: nessun dato dal runner',
    ...(note ? ['ATTENZIONE: ' + note + ' (i tasti con azione e i comandi non arrivano al Worker finche\' non lo risolvi; i collegamenti a pump.fun funzionano comunque)'] : []),
    'Tocca un tasto, oppure usa il menu dei comandi accanto al campo di testo.'].join('\n');
}

// ---- schermate ----
export async function paperScreen(ex) {
  const d = await snap(ex); if (!d) return { text: 'Paper: nessun dato dal runner (forse sta ripartendo). Riprova tra poco.', markup: buildKb({ app: true }) };
  const st = d.stats || {}, pos = d.positions || [], last = (d.journal || []).slice(-3).reverse();
  const lines = ['KAISER · paper', `Equity ${fmt(d.equity)} su ${fmt(d.capital, 2)} SOL · P&L ${sg(st.pnl, 3)} SOL`, `Operazioni ${num(st.n)} · vinte ${Math.round(num(st.wr))}% · fattore di profitto ${st.pf == null ? '—' : fmt(st.pf, 2)}`,
    `Stato: ${d.halted ? 'FERMO per il limite di perdita giornaliera' : 'attivo'}`];
  if (pos.length) { lines.push('', 'Posizioni aperte:'); for (const p of pos.slice(0, 6)) { const px = p.last && p.last.priceNative, pnl = px && p.entry > 0 ? (px / p.entry - 1) * 100 : null; lines.push(`${p.id} $${p.sym} · ${pnl == null ? 'prezzo n/d' : sg(pnl) + '%'}${p.tp1Done ? ' · TP1 fatto' : ''}`); } } else lines.push('', 'Nessuna posizione paper aperta.');
  if (last.length) { lines.push('', 'Ultime chiuse:'); for (const j of last) lines.push(`$${j.sym} ${sg(j.pct)}% · ${j.reason}`); }
  return { text: lines.join('\n'), markup: buildKb({ rows: positionRows(pos), app: true }) };
}
export async function signalsScreen(ex) {
  const d = await snap(ex), al = ((d && d.alerts) || []).slice(-5).reverse(), mode = (d && d.semi) || 'spento';
  if (!al.length) return { text: `Segnali: nessuno ancora. Semi-automatico: ${mode}.\n${mode === 'spento' ? 'Accendilo dal menu: ti manda un avviso con il tasto per entrare su pump.fun.' : 'Arriva un avviso quando il radar trova un BUY.'}`, markup: buildKb({ rows: mode === 'spento' ? [[{ text: 'Accendi (avvisi e paper)', callback_data: 'sm:avvisi' }]] : [], app: true }) };
  const lines = [`KAISER · segnali (semi-automatico: ${mode})`]; const rows = [];
  for (const a of al) {
    lines.push(`$${a.sym} score ${a.score} · ${ago(Date.now() - a.t)} fa · ora ${a.last == null ? '—' : sg(a.last) + '%'} · 5 min ${a.p5 == null ? '—' : sg(a.p5) + '%'} · 15 min ${a.p15 == null ? '—' : sg(a.p15) + '%'}${a.gr ? ` · Grok ${sg(a.gr.s, 1)} org ${a.gr.o}` : ''}`);
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(a.mint || '')) rows.push([{ text: `Apri su pump.fun $${String(a.sym || a.mint.slice(0, 5)).slice(0, 10)}`, url: `https://pump.fun/coin/${a.mint}` }]);
  }
  return { text: lines.join('\n'), markup: buildKb({ rows, app: true }) };
}
export async function labScreen(ex) {
  const d = await snap(ex); if (!d) return { text: 'Laboratorio: nessun dato dal runner.', markup: buildKb({ app: true }) };
  const L = d.lab || {}, F = d.farm, R = d.rug && d.rug.results && d.rug.results[0], S = d.strat && d.strat.count, G = d.grok && d.grok.stat, i = L.info || {};
  const lines = ['KAISER · Laboratorio', `Coin osservate ${num(L.observed)} · con prezzo ${num(L.priced)} · seguite ora ${num(i.active)}`];
  lines.push(F ? `Fabbrica: ${F.paths} percorsi · ${F.tried} regole · positive sui vecchi ${F.posTrain} · anche sui recenti ${F.passed}` : 'Fabbrica: nessun rapporto ancora');
  if (F && F.bestTrain) lines.push(`Migliore sui vecchi: ${cfgLabel(F.bestTrain.cfg)} → ${sg(F.bestTrain.tr.ev)}% (recenti ${sg(F.bestTrain.te.ev)}%)`);
  if (R) lines.push(`Rug oltre ${num(R.thr) / 1000}K: ${R.base.all.rug}% (crolli ${R.base.all.dump}%) su ${R.n} token`);
  if (S) lines.push(`Regole: in prova ${num(S.prova)} · validate ${num(S.validata)} · ritirate ${num(S.ritirata)}`);
  if (G) lines.push(`Grok: ${G.verdict || '—'} (${num(G.n)} su ${num(G.need, 100)} segnali)`);
  lines.push('Prove su richiesta e dettagli: apri il Laboratorio nell\'app.');
  return { text: lines.join('\n'), markup: buildKb({ app: true }) };
}
export async function rulesScreen(ex) {
  const d = await snap(ex), S = d && d.strat; if (!S || !S.items) return { text: 'Regole: nessun registro ancora. La fabbrica propone le candidate quando una regola regge sui dati vecchi e su quelli recenti.', markup: buildKb({ app: true }) };
  const lines = [`KAISER · regole (in prova ${num(S.count.prova)} · validate ${num(S.count.validata)} · ritirate ${num(S.count.ritirata)})`];
  for (const x of S.items.slice(0, 8)) lines.push(`${x.id} ${cfgLabel(x.cfg)} · ${x.status} · ${x.fwd.n} op. · ${x.fwd.n ? sg(x.fwd.ev) + '%' : '—'}`);
  if (!S.items.length) lines.push('Nessuna regola in corso.');
  lines.push('Una regola validata puo\' solo essere proposta: non apre ordini.');
  return { text: lines.join('\n'), markup: buildKb({ app: true }) };
}
// Interruttori che passano dalla richiesta con conferma (come dall'app)
export async function semiScreen(ex) {
  const d = await snap(ex), c = (d && d.config) || {}, cur = c.semiAuto || 'spento', mark = (v) => (cur === v ? ' (attuale)' : '');
  return { text: `Modalità semi-automatica: ${cur}\nIl radar non apre la posizione: ti manda un avviso con il tasto per entrare su pump.fun.\n«avvisi e paper» lascia girare anche il paper per misurare i segnali; «solo avvisi» non apre posizioni paper.\nLa modifica arriva come richiesta da confermare qui.`,
    markup: { inline_keyboard: [[{ text: 'Spento' + mark('spento'), callback_data: 'sm:spento' }], [{ text: 'Avvisi e paper' + mark('avvisi e paper'), callback_data: 'sm:avvisi' }], [{ text: 'Solo avvisi' + mark('solo avvisi'), callback_data: 'sm:solo' }]] } };
}
export async function grokScreen(ex) {
  const d = await snap(ex), c = (d && d.config) || {}, G = d && d.grok, on = !!c.grokTest;
  return { text: `Test di Grok sui segnali: ${on ? 'acceso' : 'spento'}\n${G ? `Segnali giudicati e conclusi: ${num(G.stat && G.stat.n)} su ${num(G.stat && G.stat.need, 100)} · verdetto: ${(G.stat && G.stat.verdict) || '—'}\nChiamate oggi: ${num(G.used)}${G.key ? '' : ' · manca la chiave XAI_API_KEY'}` : 'Nessun dato ancora.'}\nServe la modalità semi-automatica. Solo misura: non cambia gli avvisi.\nLa modifica arriva come richiesta da confermare qui.`,
    markup: { inline_keyboard: [[{ text: on ? 'Spegni il test' : 'Accendi il test', callback_data: 'gk:' + (on ? 'off' : 'on') }]] } };
}
export const SEMI_VALUES = { spento: 'spento', avvisi: 'avvisi e paper', solo: 'solo avvisi' };

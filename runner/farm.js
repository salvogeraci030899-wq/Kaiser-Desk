// KAISER · Fabbrica di strategie (solo prova su dati registrati, nessun ordine).
// Legge i percorsi di prezzo salvati dal Laboratorio e valuta una griglia di configurazioni (soglia di market cap, ritardo di ingresso, target, stop, uscita a tempo)
// con i costi inclusi. Per limitare il troppo-adattamento la scelta si fa sui token piu' vecchi (60%) e il controllo sui piu' recenti (40%):
// una configurazione passa solo se e' positiva dopo i costi in entrambi i gruppi e con un numero minimo di operazioni.
'use strict';
const fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib');

const BIN = 5;                       // secondi per intervallo
const COST = 7;                      // costo di un giro intero in % (commissioni, priority, slippage): prudente
const MIN_TRAIN = 30, MIN_TEST = 15, SPLIT = 0.6, KEEP_DAYS = 7;
const GRID = { thr: [7500, 10000, 12000, 15000], delay: [0, 10, 20], tp: [10, 15, 20, 30], sl: [10, 15, 20, 25], hold: [60, 120, 300, 0] };   // hold 0 = nessun limite di tempo

// ---------- archivio dei percorsi ----------
// Un percorso e' salvato come punti di variazione: [intervallo, market cap in SOL x 10, ...]; gli intervalli senza variazione si ricostruiscono ripetendo l'ultimo valore.
function pack(r) {
  const p = r.p || [], c = []; let last = null;
  for (let i = 0; i < p.length; i++) { const v = Math.round(p[i] * 10); if (v !== last) { c.push(i, v); last = v; } }
  const o = { m: r.m, s: r.s, at: r.at, u: +(+r.usd || 0).toFixed(2), n: p.length, c }; if (r.cr) o.cr = r.cr; return o;
}
function unpack(rec) {
  const n = rec.n | 0, p = new Array(n); let v = 0, k = 0; const c = rec.c || [];
  for (let i = 0; i < n; i++) { while (k < c.length && c[k] === i) { v = c[k + 1] / 10; k += 2; } p[i] = v; }
  return { m: rec.m, s: rec.s, at: rec.at, u: rec.u, p, cr: rec.cr || '' };
}
const stamp = (t) => new Date(t).toISOString().replace(/[-:T]/g, '').slice(0, 14);   // AAAAMMGGhhmmss
function writeBatch(dir, recs, now) {
  if (!recs.length) return null; fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, `${stamp(now)}-${Math.random().toString(36).slice(2, 6)}.jsonl.gz`);
  fs.writeFileSync(f, zlib.gzipSync(recs.map((r) => JSON.stringify(r)).join('\n') + '\n')); return f;
}
function prune(dir, now, days) {
  let n = 0; let names = []; try { names = fs.readdirSync(dir); } catch { return 0; }
  const cut = stamp(now - (days || KEEP_DAYS) * 86400000);
  for (const f of names) if (/^\d{14}-/.test(f) && f.slice(0, 14) < cut) { try { fs.unlinkSync(path.join(dir, f)); n++; } catch { /* niente */ } }
  return n;
}
function loadAll(dir) {
  let names = []; try { names = fs.readdirSync(dir).filter((f) => f.endsWith('.jsonl.gz')).sort(); } catch { return []; }
  const out = [], seen = new Set();
  for (const f of names) {
    let txt; try { txt = zlib.gunzipSync(fs.readFileSync(path.join(dir, f))).toString('utf8'); } catch { continue; }
    for (const l of txt.split('\n')) { if (!l) continue; try { const r = unpack(JSON.parse(l)); if (r.p.length > 24 && r.u > 0 && !seen.has(r.m)) { seen.add(r.m); out.push(r); } } catch { /* riga rovinata */ } }
  }
  return out;
}

// ---------- simulazione ----------
const crossIdx = (p, thr) => { for (let j = 1; j < p.length; j++) if (p[j - 1] < thr && p[j] >= thr) return j; return -1; };
// Una operazione: ingresso alla prima volta che la market cap (in dollari) supera la soglia, piu' il ritardo; uscita a target, stop (vince lo stop a parita'), tempo massimo o fine dei dati.
// Il prezzo di uscita e' quello letto nell'intervallo in cui scatta la condizione (non quello ideale del livello). Esito netto dei costi, in %.
function simulate(p, u, cfg) {
  const i = crossIdx(p, cfg.thr / u); if (i < 0) return null;
  const j = i + Math.round((cfg.delay || 0) / BIN); if (j >= p.length - 12 || !(p[j] > 0)) return null;     // servono almeno 60 secondi dopo l'ingresso
  const e = p[j], maxB = cfg.hold ? Math.round(cfg.hold / BIN) : Infinity, fin = (r, why, b) => ({ net: (r - 1) * 100 - COST, why, held: b * BIN });
  for (let k = j + 1; k < p.length; k++) {
    const r = p[k] / e;
    if (r <= 1 - cfg.sl / 100) return fin(r, 'sl', k - j);
    if (r >= 1 + cfg.tp / 100) return fin(r, 'tp', k - j);
    if (k - j >= maxB) return fin(r, 'tempo', k - j);
  }
  return fin(p[p.length - 1] / e, 'fine', p.length - 1 - j);
}
function stats(xs) {
  const n = xs.length; if (!n) return { n: 0, ev: 0, win: 0, pf: 0 };
  let sum = 0, w = 0, gain = 0, loss = 0; for (const x of xs) { sum += x; if (x > 0) { w++; gain += x; } else loss -= x; }
  return { n, ev: +(sum / n).toFixed(2), win: Math.round(100 * w / n), pf: loss > 0 ? +(gain / loss).toFixed(2) : (gain > 0 ? 99 : 0) };
}
function* configs(grid) { const g = grid || GRID; for (const thr of g.thr) for (const delay of g.delay) for (const tp of g.tp) for (const sl of g.sl) for (const hold of g.hold) yield { thr, delay, tp, sl, hold }; }

// Misure dei possessori salvate dal runner (stesso formato a file piccoli compressi dei percorsi): mint -> { top1, top3, top10, cre }
function loadHolders(dir) {
  const m = new Map(); let names = []; try { names = fs.readdirSync(dir).filter((x) => x.endsWith('.jsonl.gz')).sort(); } catch { return m; }
  for (const n of names) { let t; try { t = zlib.gunzipSync(fs.readFileSync(path.join(dir, n))).toString('utf8'); } catch { continue; } for (const l of t.split('\n')) { if (!l) continue; try { const r = JSON.parse(l); if (r && r.m) m.set(r.m, Object.assign({}, r, m.get(r.m) || {}));   /* la prima lettura vale; le righe successive aggiungono solo campi nuovi */ } catch { /* riga rovinata */ } } }
  return m;
}
// Storico dei creatori (un record per ogni token concluso, anche quelli che non hanno mai superato 5K): { m, cr, at, mx } con mx = massimo raggiunto in dollari
function loadCreators(dir) {
  const out = []; let names = []; try { names = fs.readdirSync(dir).filter((x) => x.endsWith('.jsonl.gz')).sort(); } catch { return out; }
  for (const n of names) { let t; try { t = zlib.gunzipSync(fs.readFileSync(path.join(dir, n))).toString('utf8'); } catch { continue; } for (const l of t.split('\n')) { if (!l) continue; try { const r = JSON.parse(l); if (r && r.cr && r.m && Number.isFinite(r.at)) out.push(r); } catch { /* riga rovinata */ } } }
  return out;
}
// ---------- esecuzione ----------
function run(recs, o) {
  const grid = (o && o.grid) || GRID, sorted = [...recs].sort((a, b) => a.at - b.at), cut = Math.floor(sorted.length * SPLIT), train = sorted.slice(0, cut), test = sorted.slice(cut);
  const res = []; let tried = 0, posTrain = 0;
  for (const cfg of configs(grid)) {
    tried++;
    const a = []; for (const r of train) { const x = simulate(r.p, r.u, cfg); if (x) a.push(x.net); }
    const tr = stats(a); if (tr.n >= MIN_TRAIN && tr.ev > 0) posTrain++;
    const b = []; for (const r of test) { const x = simulate(r.p, r.u, cfg); if (x) b.push(x.net); }
    res.push({ cfg, tr, te: stats(b) });
  }
  const ok = (x) => x.tr.n >= MIN_TRAIN && x.te.n >= MIN_TEST && x.tr.ev > 0 && x.te.ev > 0, passed = res.filter(ok).sort((x, y) => Math.min(y.tr.ev, y.te.ev) - Math.min(x.tr.ev, x.te.ev));
  const eligible = res.filter((x) => x.tr.n >= MIN_TRAIN), bestTrain = [...eligible].sort((x, y) => y.tr.ev - x.tr.ev)[0] || null;
  const bestTest = [...res.filter((x) => x.te.n >= MIN_TEST)].sort((x, y) => y.te.ev - x.te.ev)[0] || null;
  // La migliore disponibile: tra le configurazioni con abbastanza operazioni su dati vecchi E recenti, quella col peggiore dei due esiti piu' alto
  // (prudente: non premia chi va bene solo su un lato). Esiste sempre, anche se negativa: serve a sapere dove guardare.
  const score = (x) => Math.min(x.tr.ev, x.te.ev), elig = res.filter((x) => x.tr.n >= MIN_TRAIN && x.te.n >= MIN_TEST).sort((x, y) => score(y) - score(x)), top1 = elig[0] || null;
  const want = ((o && o.watch) || []).map((c) => [c.thr, c.delay, c.tp, c.sl, c.hold].join('/')), watch = res.filter((x) => want.includes([x.cfg.thr, x.cfg.delay, x.cfg.tp, x.cfg.sl, x.cfg.hold].join('/'))).map((x) => ({ cfg: x.cfg, tr: x.tr, te: x.te, score: score(x) }));
  // Al lordo dei costi: quanto renderebbe la migliore se i costi fossero zero. Se e' vicino a zero non c'e' un vantaggio da cui partire, qualunque siano i costi.
  const gross = top1 && { cfg: top1.cfg, score: +(score(top1) + COST).toFixed(2), cost: COST };
  return { at: (o && o.now) || Date.now(), gross, best: top1 && { cfg: top1.cfg, tr: top1.tr, te: top1.te, score: score(top1) }, watch, paths: recs.length, train: train.length, test: test.length, tried, posTrain, passed: passed.length, top: passed.slice(0, 8), bestTrain, bestTest, cost: COST,
    span: sorted.length ? { from: sorted[0].at, to: sorted[sorted.length - 1].at } : null };
}

// Le esportazioni stanno prima della riga di comando: rug.js richiama questo file e lo trova gia' completo (prima l'analisi dei rug usciva sempre vuota)
module.exports = { loadCreators, loadHolders, BIN, COST, GRID, MIN_TRAIN, MIN_TEST, KEEP_DAYS, crossIdx, pack, unpack, writeBatch, prune, loadAll, simulate, stats, configs, run };

if (require.main === module) {
  const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
  const dir = arg('in', 'state/lab/paths'), out = arg('out', 'state/farm.json'), t0 = Date.now(), recs = loadAll(dir);
  let watch = []; try { const sf = arg('strat', ''), rg = sf ? JSON.parse(fs.readFileSync(sf, 'utf8')) : null; if (rg && rg.current && rg.current.cfg) watch = [rg.current.cfg]; } catch { /* nessuna strategia corrente ancora */ }
  const rep = run(recs, { watch });
  rep.ms = Date.now() - t0; fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, JSON.stringify(rep));
  // analisi dei rug sugli stessi percorsi (e sulle misure dei possessori, se ci sono)
  try {
    const Rug = require('./rug.js'), hd = arg('holders', ''), holders = hd ? loadHolders(hd) : new Map(), creators = arg('creators', '') ? loadCreators(arg('creators', '')) : [], ru = { at: Date.now(), holders: holders.size, results: [Rug.analyze(recs, 7500, { holders, creators }), Rug.analyze(recs, 10000, { holders, creators })] };
    fs.writeFileSync(arg('rug', path.join(path.dirname(out), 'rug.json')), JSON.stringify(ru)); console.log(`rug: ${ru.results[0].n} token oltre 7.5K, ${ru.results[0].base.all.rug}% rug, ${holders.size} con possessori`);
  } catch (e) { console.log('analisi rug non riuscita: ' + String(e.message).split('\n')[0]); }
  // ricerca filtro + regola con controllo delle false scoperte (permutazioni)
  try {
    const Combo = require('./combo.js'), hd2 = arg('holders', ''), cr2 = arg('creators', ''), co = Combo.runMany(recs, [7500, 10000, 15000], { holders: hd2 ? loadHolders(hd2) : new Map(), creators: cr2 ? loadCreators(cr2) : [] });
    fs.writeFileSync(arg('combo', path.join(path.dirname(out), 'combo.json')), JSON.stringify(co)); console.log(`combinazioni: ${co.tests} prove, migliore ${co.best ? co.best.score + '%' : '—'}, p ${co.perm.p == null ? '—' : co.perm.p}`);
  } catch (e) { console.log('ricerca combinata non riuscita: ' + String(e.message).split('\n')[0]); }
  console.log(`fabbrica: ${rep.paths} percorsi, ${rep.tried} configurazioni, ${rep.passed} passano, ${rep.ms} ms`);
}


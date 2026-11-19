'use strict';
// Analisi dei rug: etichetta, segnali, filtri scelti sui dati vecchi e controllati sui recenti; misure dei possessori; soglia superata nel Laboratorio.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const Rug = require('../runner/rug.js'), Farm = require('../runner/farm.js'), Holders = require('../runner/holders.js'), Lab = require('../runner/trades.js'), Y = require('../runner/young.js');

const T = 1_700_000_000_000;
// sale linearmente fino alla soglia (76 SOL = 7.6K a 100 $/SOL) in "cross" intervalli, poi o crolla al 10% (rug) o resta fermo
const mk = (idx, cross, rug) => { const p = []; for (let k = 0; k < cross; k++) p.push(30 + 46 * k / cross); p.push(76); for (let k = 1; k <= 70; k++) p.push(rug ? (k < 4 ? 76 - k * 15 : 7.6) : 76); return { m: 'M' + idx, at: T + idx * 1000, u: 100, p }; };

test('etichetta: rug se entro 5 minuti il prezzo scende al 25% o meno, crollo al 50%; poca storia non si valuta', () => {
  const a = mk(1, 10, true), i = Farm.crossIdx(a.p, 75); assert.equal(i, 10); const l = Rug.label(a.p, i); assert.equal(l.rug, true); assert.equal(l.dump, true); assert.ok(l.r <= 0.11);
  const b = mk(2, 10, false), lb = Rug.label(b.p, 10); assert.equal(lb.rug, false); assert.equal(lb.dump, false);
  const half = { p: [...b.p.slice(0, 11), ...new Array(40).fill(36)] }; const lh = Rug.label(half.p, 10); assert.equal(lh.rug, false); assert.equal(lh.dump, true);
  assert.equal(Rug.label(b.p.slice(0, 20), 10), null, 'meno di 2 minuti dopo la soglia');
  const f = Rug.feats(a.p, 10); assert.equal(f.t, 50); assert.ok(f.gap > 1 && f.act > 0.9 && f.speed > 0 && f.dd === 0);
});
test('analisi: il segnale che distingue i rug viene trovato sui dati vecchi e confermato sui recenti', () => {
  const recs = []; for (let i = 0; i < 600; i++) recs.push(i % 2 === 0 ? mk(i, 10, true) : mk(i, 40, false));     // veloci = rug, lenti = no
  const r = Rug.analyze(recs, 7500); assert.equal(r.n, 600); assert.equal(r.base.all.rug, 50);
  assert.equal(r.feats.t.buckets[0].rug, 100, 'i piu\' veloci: tutti rug'); assert.ok(r.filters.length >= 1);
  const f = r.filters[0]; assert.ok(f.train.rug <= 1 && f.test.rug <= 1, JSON.stringify(f)); assert.ok(f.train.keep >= 25 && f.test.keep >= 25, 'tiene una parte sensata dei token');
  assert.ok(f.farm && f.farm.paths >= 200, 'dopo il filtro si riprova la fabbrica'); assert.equal(f.farm.passed, 0, 'senza rug non si e\' creato un margine: i costi restano');
  assert.equal(Rug.analyze(recs.slice(0, 20), 7500).filters.length, 0, 'pochi dati: nessuna conclusione');
});
test('possessori: la curva non conta, creatore e primi possessori sono quote dell\'offerta; le misure entrano nell\'analisi', () => {
  const list = [{ address: 'A', amount: '600000000' }, { address: 'B', amount: '90000000' }, { address: 'C', amount: '50000000' }, { address: 'D', amount: '10000000' }], owners = ['CURVA', 'CREATORE', 'X', 'Y'];
  const h = Holders.holdersFrom(list, owners, 1_000_000_000, 'CURVA', 'CREATORE'); assert.deepEqual(h, { top1: 0.09, top3: 0.15, top10: 0.15, cre: 0.09, n: 3 });
  assert.equal(Holders.holdersFrom([], [], 0, 'C', 'D'), null); assert.equal(Holders.holdersFrom(list, owners, 1e9, 'CURVA', '').cre, null);
  const recs = []; for (let i = 0; i < 600; i++) recs.push(mk(i, 10 + (i % 2) * 30, i % 2 === 0)); const hm = new Map(recs.map((r, i) => [r.m, { top1: i % 2 === 0 ? 0.4 : 0.05, top3: 0.5, top10: 0.6, cre: i % 2 === 0 ? 0.2 : 0 }]));
  const r = Rug.analyze(recs, 7500, { holders: hm }); assert.ok(r.feats.top1 && r.feats.cre, 'le misure dei possessori compaiono tra i segnali'); assert.equal(r.feats.top1.buckets[0].rug, 0, 'poca concentrazione: nessun rug'); assert.equal(r.feats.top1.buckets[1].rug, 100, 'molta concentrazione: tutti rug');
});
test('lettura dei possessori via RPC: 3 chiamate, esclude la curva', async () => {
  const calls = []; const f = async (url, o) => { const b = JSON.parse(o.body); calls.push(b.method);
    const res = b.method === 'getTokenLargestAccounts' ? { value: [{ address: 'A', amount: '700000000' }, { address: 'B', amount: '100000000' }] } : b.method === 'getTokenSupply' ? { value: { amount: '1000000000' } } : { value: [{ data: { parsed: { info: { owner: 'CURVA' } } } }, { data: { parsed: { info: { owner: 'CRE' } } } }] };
    return { json: async () => ({ result: res }) }; };
  const x = await Holders.snapshot({ url: 'wss://rpc.example/KEY', fetch: f, mint: 'MINT', curve: 'CURVA', creator: 'CRE', at: T }); assert.deepEqual(calls, ['getTokenLargestAccounts', 'getTokenSupply', 'getMultipleAccounts']);
  assert.equal(x.m, 'MINT'); assert.equal(x.top1, 0.1); assert.equal(x.cre, 0.1); assert.equal(x.at, T);
  assert.equal(await Holders.snapshot({ url: '', fetch: f, mint: 'M' }), null);
});
test('archivio dei possessori: i file piccoli compressi si leggono come una mappa per mint', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hold-')); Farm.writeBatch(dir, [{ m: 'M1', top1: 0.1 }, { m: 'M2', top1: 0.2 }], T); Farm.writeBatch(dir, [{ m: 'M2', top1: 0.9 }, { m: 'M3', top1: 0.3 }], T + 1000);
  const m = Farm.loadHolders(dir); assert.equal(m.size, 3); assert.equal(m.get('M2').top1, 0.2, 'vale la prima lettura'); assert.equal(Farm.loadHolders(path.join(dir, 'no')).size, 0);
});
test('Laboratorio: la soglia superata scatta una volta sola; token di altre piattaforme esclusi; il creatore arriva dall\'evento', async () => {
  const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', mint = (i) => { let s = ''; for (let k = 0; k < 44; k++) s += B58[(i * 7 + k * 13 + (k % 5) * i) % 58]; return s; };
  const crossed = [], feed = new Lab.TradeFeed({ now: () => T, log: () => {}, solUsd: () => 100, rpcHttp: 'https://rpc.example', onCross: (t) => crossed.push(t.mint) }), m = mint(81);
  feed.adopt({ mint: m, symbol: 'X', curve: mint(82), creator: 'CRE1' }, T); const t = feed.book.toks.get(m); assert.equal(t.dev, 'CRE1');
  const buf = (mc) => { const b = Buffer.alloc(8 + 40 + 1 + 32); b.writeBigUInt64LE(BigInt(1_073_000_000_000_000), 8); b.writeBigUInt64LE(BigInt(Math.round(mc / 0.932 * 1e9 / 1)), 16); b.writeBigUInt64LE(1_000_000_000_000_000n, 40); return b.toString('base64'); };
  let mc = 40; const p = feed.poller; p.fetch = async () => ({ json: async () => ({ result: { value: [{ data: [buf(mc), 'base64'] }] } }) }); p.now = () => T + 10000;
  await p.pollOnce(); assert.equal(crossed.length, 0, '4K: sotto la soglia'); mc = 90; await p.pollOnce(); assert.equal(crossed.length, 1, '9K: soglia superata'); mc = 95; await p.pollOnce(); assert.equal(crossed.length, 1, 'una volta sola');
  assert.equal(feed.book.create({ mint: mint(83), symbol: 'B', name: 'B', pool: 'bonk' }, T), null, 'altra piattaforma'); assert.ok(feed.book.create({ mint: mint(84), symbol: 'P', name: 'P', pool: 'pump' }, T), 'pump.fun');
  const crypto = require('node:crypto'), disc = crypto.createHash('sha256').update('event:CreateEvent').digest().subarray(0, 8), str = (s) => { const x = Buffer.from(s), l = Buffer.alloc(4); l.writeUInt32LE(x.length); return Buffer.concat([l, x]); };
  const ev = Buffer.concat([disc, str('N'), str('S'), str('u'), Buffer.alloc(32, 7), Buffer.alloc(32, 9), Buffer.alloc(32, 5)]); const e = Y.parseCreateEvent(ev.toString('base64')); assert.equal(e.creator, Y.b58(Buffer.alloc(32, 5)));
});
test('il runner legge i possessori alla soglia, li salva, li passa all\'analisi dei rug e pubblica il rapporto', () => {
  const src = fs.readFileSync(require.resolve('../runner/runner.js'), 'utf8');
  assert.match(src, /require\('\.\/holders\.js'\)/); assert.match(src, /onCross: \(t\) =>/); assert.match(src, /function pumpHolders\(\)/); assert.match(src, /pumpHolders\(\);/); assert.match(src, /'--holders', path\.join\(STATE_DIR, 'lab', 'holders'\)/);
  assert.match(src, /'--rug', path\.join\(STATE_DIR, 'rug\.json'\)/); assert.match(src, /rug: rt\.rug \|\| null/); assert.match(src, /NO_HOLDERS/); assert.match(src, /rt\.holdBuf\.splice\(0\)/);
});

'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
let L, S;
test.before(async () => { L = await import('../worker/src/lib.js'); S = await import('../worker/src/solana.js'); });

const kp = () => { const { privateKey } = crypto.generateKeyPairSync('ed25519'); const j = privateKey.export({ format: 'jwk' }); const d = Buffer.from(j.d, 'base64url'), x = Buffer.from(j.x, 'base64url'); return { seed: d, pub: x, full: Buffer.concat([d, x]) }; };
const compact = (n) => { const o = []; do { let b = n & 0x7f; n >>= 7; if (n) b |= 0x80; o.push(b); } while (n); return o; };
const u32 = (n) => [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255];
const u64 = (n) => { const o = []; let v = BigInt(n); for (let i = 0; i < 8; i++) { o.push(Number(v & 255n)); v >>= 8n; } return o; };
// costruisce una transazione v0 sintetica: keys = array di indirizzi base58, ixs = [{prog: indice, accs: [indici], data: [byte]}]
function buildTx(keys, ixs, { sigs = 1, numReq = 1, version = 0 } = {}) {
  const out = [...compact(sigs), ...new Array(64 * sigs).fill(0)];
  if (version === 0) out.push(0x80);
  out.push(numReq, 0, 1, ...compact(keys.length));
  for (const k of keys) out.push(...L.b58decode(k));
  out.push(...new Array(32).fill(7));
  out.push(...compact(ixs.length));
  for (const ix of ixs) out.push(ix.prog, ...compact(ix.accs.length), ...ix.accs, ...compact(ix.data.length), ...ix.data);
  if (version === 0) out.push(0);
  return Uint8Array.from(out);
}
const W = L => null;
test('parseTx: legge chiavi e istruzioni, rifiuta transazioni troncate o con byte in eccesso', () => {
  const w = L.b58encode(kp().pub), tx = buildTx([w, S.PROGRAMS.system], [{ prog: 1, accs: [0, 0], data: [...u32(2), ...u64(5)] }]);
  const p = S.parseTx(tx);
  assert.equal(p.keys[0], w); assert.equal(p.ixs.length, 1); assert.equal(p.nSig, 1); assert.equal(p.version, 0);
  assert.throws(() => S.parseTx(tx.slice(0, tx.length - 5)), /tronc|eccesso|lunghezza/);
  assert.throws(() => S.parseTx(Uint8Array.from([...tx, 1])), /eccesso/);
});
test('guardTx: transazione normale ammessa', () => {
  const w = L.b58encode(kp().pub), JUP = 'JupProgramTest1111111111111111111111111111';
  const jup = L.b58encode(crypto.randomBytes(32));
  const tx = buildTx([w, S.PROGRAMS.system, S.PROGRAMS.computeBudget, jup, S.PROGRAMS.token, S.PROGRAMS.ata], [
    { prog: 2, accs: [], data: [2, 1, 0, 0, 0] }, { prog: 1, accs: [0, 0], data: [...u32(2), ...u64(50_000_000)] },
    { prog: 4, accs: [0], data: [17] }, { prog: 3, accs: [0], data: [1, 2, 3] }, { prog: 5, accs: [0, 0, 0], data: [1] }]);
  assert.deepEqual(S.guardTx(S.parseTx(tx), { wallet: w, jupiterProgram: jup, maxTransferLamports: 60_000_000 }), []);
});
test('guardTx: rifiuta ogni tentativo di svuotare il wallet', () => {
  const me = kp(), w = L.b58encode(me.pub), jup = L.b58encode(crypto.randomBytes(32)), evil = L.b58encode(crypto.randomBytes(32));
  const g = (keys, ixs, o) => S.guardTx(S.parseTx(buildTx(keys, ixs, o)), { wallet: w, jupiterProgram: jup, maxTransferLamports: 60_000_000, ...o });
  const base = [w, S.PROGRAMS.system, S.PROGRAMS.token, jup, evil, S.PROGRAMS.ata];
  assert.match(g(base, [{ prog: 1, accs: [0, 4], data: [...u32(2), ...u64(5_000_000_000)] }]).join(), /troppo grande/);                // trasferimento SOL enorme
  assert.match(g(base, [{ prog: 1, accs: [4, 0], data: [...u32(2), ...u64(1)] }]).join(), /non dal nostro wallet/);                      // trasferimento da altro conto
  assert.match(g(base, [{ prog: 1, accs: [0, 4], data: [...u32(1), ...u64(1)] }]).join(), /System non ammessa/);                          // Assign
  assert.match(g(base, [{ prog: 2, accs: [0, 4, 0], data: [3, ...u64(100)] }]).join(), /Token non ammessa \(3\)/);                       // Token Transfer
  assert.match(g(base, [{ prog: 2, accs: [0, 4, 0], data: [4, ...u64(100)] }]).join(), /Token non ammessa \(4\)/);                       // Approve
  assert.match(g(base, [{ prog: 2, accs: [0, 4, 0], data: [6, 0, 0] }]).join(), /Token non ammessa \(6\)/);                              // SetAuthority
  assert.match(g(base, [{ prog: 2, accs: [0, 4, 0], data: [9] }]).join(), /destinazione diversa/);                                       // CloseAccount verso altri
  assert.match(g(base, [{ prog: 5, accs: [0, 4, 4], data: [1] }]).join(), /altro proprietario/);                                         // ATA per altri
  assert.match(g([...base, L.b58encode(crypto.randomBytes(32))], [{ prog: 6, accs: [0], data: [1] }]).join(), /non ammesso/); // programma sconosciuto
  assert.match(g(base, [{ prog: 9, accs: [0], data: [1] }]).join(), /non nelle chiavi statiche/);                                         // programma da lookup table
  assert.match(g([evil, ...base.slice(1)], [{ prog: 1, accs: [0, 0], data: [...u32(2), ...u64(1)] }]).join(), /non è il nostro wallet/);  // altro fee payer
  assert.match(g(base, [], { sigs: 2, numReq: 2 }).join(), /firme/);                                                                       // firme multiple
  assert.match(S.guardTx(S.parseTx(buildTx(base, [])), { wallet: w, jupiterProgram: '', maxTransferLamports: 1 }).join(), /JUPITER_PROGRAM_ID/);  // senza configurazione: tutto chiuso
});
test('signTx: la firma è valida e verificabile con la chiave pubblica; il messaggio non cambia', async () => {
  const me = kp(), w = L.b58encode(me.pub);
  const tx = buildTx([w, S.PROGRAMS.system], [{ prog: 1, accs: [0, 0], data: [...u32(2), ...u64(1)] }]);
  const { tx: signed, signature } = await S.signTx(tx, L.b58encode(me.full));
  const p = S.parseTx(signed);
  assert.deepEqual(Buffer.from(p.msgBytes), Buffer.from(S.parseTx(tx).msgBytes));
  const sig = signed.slice(p.sigStart, p.sigStart + 64);
  assert.equal(L.b58encode(sig), signature);
  const pubKey = crypto.createPublicKey({ key: { kty: 'OKP', crv: 'Ed25519', x: Buffer.from(me.pub).toString('base64url') }, format: 'jwk' });
  assert.equal(crypto.verify(null, Buffer.from(p.msgBytes), pubKey, Buffer.from(sig)), true);
  await assert.rejects(() => S.signTx(tx, 'xx'), /byte|base58/);
});
test('base64: andata e ritorno', () => { const b = crypto.randomBytes(70000); assert.deepEqual(Buffer.from(S.b64dec(S.b64enc(Uint8Array.from(b)))), b); });

// KAISER · esecutore: lettura e controllo delle transazioni Solana, firma Ed25519. Funzioni pure, provate in Node.
// Principio: una transazione costruita da un servizio esterno (Jupiter) NON si firma alla cieca.
import { b58encode, parseSecret } from './lib.js';

export const b64enc = (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
export const b64dec = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

function readCompact(buf, off) {
  let n = 0, shift = 0, i = off;
  for (;;) {
    if (i >= buf.length) throw new Error('transazione troncata');
    const b = buf[i++]; n |= (b & 0x7f) << shift;
    if (!(b & 0x80)) break;
    shift += 7; if (shift > 14) throw new Error('lunghezza non valida');
  }
  return [n, i];
}
const need = (buf, o, n) => { if (o + n > buf.length) throw new Error('transazione troncata'); };

// Legge una transazione serializzata (legacy o v0). Non esegue nulla.
export function parseTx(bytes) {
  let o = 0, n;
  [n, o] = readCompact(bytes, o);
  const nSig = n, sigStart = o; need(bytes, o, 64 * nSig); o += 64 * nSig;
  const msgStart = o; need(bytes, o, 1);
  let version = 'legacy';
  if (bytes[o] & 0x80) { version = bytes[o] & 0x7f; o++; if (version !== 0) throw new Error('versione transazione non supportata: ' + version); }
  need(bytes, o, 3); const numReq = bytes[o++]; o += 2;
  [n, o] = readCompact(bytes, o);
  const keys = []; for (let i = 0; i < n; i++) { need(bytes, o, 32); keys.push(b58encode(bytes.slice(o, o + 32))); o += 32; }
  need(bytes, o, 32); o += 32;   // blockhash
  [n, o] = readCompact(bytes, o);
  const ixs = [];
  for (let i = 0; i < n; i++) {
    need(bytes, o, 1); const programIdx = bytes[o++]; let na, nd;
    [na, o] = readCompact(bytes, o); need(bytes, o, na); const accounts = Array.from(bytes.slice(o, o + na)); o += na;
    [nd, o] = readCompact(bytes, o); need(bytes, o, nd); const data = bytes.slice(o, o + nd); o += nd;
    ixs.push({ programIdx, accounts, data });
  }
  if (version === 0) {
    [n, o] = readCompact(bytes, o);
    for (let i = 0; i < n; i++) { need(bytes, o, 32); o += 32; let a; [a, o] = readCompact(bytes, o); need(bytes, o, a); o += a; [a, o] = readCompact(bytes, o); need(bytes, o, a); o += a; }
  }
  if (o !== bytes.length) throw new Error('byte in eccesso dopo la transazione');
  return { version, nSig, sigStart, msgStart, numReq, keys, ixs, msgBytes: bytes.slice(msgStart) };
}

export const PROGRAMS = {
  system: '11111111111111111111111111111111',
  token: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  token2022: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
  ata: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  computeBudget: 'ComputeBudget111111111111111111111111111111',
  memo: 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
};
const TOKEN_OK = new Set([1, 9, 17, 18, 22]);   // InitializeAccount, CloseAccount, SyncNative, InitializeAccount3, InitializeImmutableOwner. Mai Transfer/Approve/SetAuthority.
const u64le = (d, o) => { let v = 0n; for (let i = 7; i >= 0; i--) v = (v << 8n) | BigInt(d[o + i]); return v; };

// Elenco di motivi per cui la transazione NON va firmata (vuoto = ammessa).
// jupiterProgram e extraPrograms vengono dalla configurazione dell'utente: nessun indirizzo "a memoria".
export function guardTx(p, { wallet, jupiterProgram, extraPrograms = [], maxTransferLamports }) {
  const why = [];
  if (!jupiterProgram) why.push('JUPITER_PROGRAM_ID non configurato');
  if (p.nSig !== 1 || p.numReq !== 1) why.push('la transazione richiede ' + p.numReq + ' firme (ne deve servire una sola, la nostra)');
  if (p.keys[0] !== wallet) why.push('chi paga la transazione non è il nostro wallet');
  const allowed = new Set([PROGRAMS.system, PROGRAMS.token, PROGRAMS.token2022, PROGRAMS.ata, PROGRAMS.computeBudget, PROGRAMS.memo, jupiterProgram, ...extraPrograms].filter(Boolean));
  const key = (i) => (i < p.keys.length ? p.keys[i] : null);
  p.ixs.forEach((ix, n) => {
    const prog = key(ix.programIdx), at = 'istruzione ' + (n + 1);
    if (!prog) { why.push(at + ': programma non nelle chiavi statiche'); return; }
    if (!allowed.has(prog)) { why.push(at + ': programma non ammesso ' + prog); return; }
    const acc = (k) => key(ix.accounts[k]);
    if (prog === PROGRAMS.system) {
      const tag = ix.data.length >= 4 ? ix.data[0] | (ix.data[1] << 8) | (ix.data[2] << 16) | (ix.data[3] << 24) : -1;
      if (tag !== 0 && tag !== 2) why.push(at + ': istruzione System non ammessa (' + tag + ')');
      else if (tag === 2) {
        if (acc(0) !== wallet) why.push(at + ': trasferimento SOL non dal nostro wallet');
        if (ix.data.length < 12 || u64le(ix.data, 4) > BigInt(maxTransferLamports)) why.push(at + ': trasferimento SOL troppo grande');
      } else if (acc(0) !== wallet) why.push(at + ': creazione account non pagata dal nostro wallet');
    } else if (prog === PROGRAMS.token || prog === PROGRAMS.token2022) {
      if (!TOKEN_OK.has(ix.data[0])) why.push(at + ': istruzione Token non ammessa (' + ix.data[0] + ')');
      else if (ix.data[0] === 9 && acc(1) !== wallet) why.push(at + ': chiusura account con destinazione diversa dal nostro wallet');
    } else if (prog === PROGRAMS.ata) {
      if (acc(2) !== wallet) why.push(at + ': account token creato per un altro proprietario');
    }
  });
  return why;
}

// Firma: inserisce la firma Ed25519 del wallet nel primo slot. Chiave letta da parseSecret (base58/JSON).
export async function signTx(bytes, rawSecret) {
  const seed = parseSecret(rawSecret).slice(0, 32);
  const pkcs8 = new Uint8Array([0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20, ...seed]);
  let key, last;
  for (const alg of [{ name: 'Ed25519' }, { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' }]) { try { key = await crypto.subtle.importKey('pkcs8', pkcs8, alg, false, ['sign']); last = alg; break; } catch { /* prossimo */ } }
  if (!key) throw new Error('firma Ed25519 non disponibile in questo ambiente');
  const p = parseTx(bytes);
  const sig = new Uint8Array(await crypto.subtle.sign(last, key, p.msgBytes));
  const out = bytes.slice(); out.set(sig, p.sigStart);
  return { tx: out, signature: b58encode(sig) };
}

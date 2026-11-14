# Trading reale in Kaiser

**Stato: fase 2.** L'app distingue paper e reale, ha il cancello di sicurezza e c'è l'esecutore (`worker/`) in **sola lettura**:
`/health` (indirizzo del wallet, saldo, limiti), kill switch (`/kill`, `/resume`). Gli ordini veri **non partono ancora**
(fase 3). Il reale è spento di default e fallisce sempre chiuso.

Esecutore: `https://kaiser-executor.salvogeraci030899.workers.dev` (pubblicato dal workflow «Pubblica esecutore»).
Segreti, solo nella dashboard Cloudflare → Worker → Settings → Variables and Secrets: `EXEC_TOKEN` (stessa password di
Setup → Token esecutore), `WALLET_SECRET_KEY` (chiave del wallet dedicato: base58 o JSON), facoltativo `RPC_URL`
(un RPC gratuito dedicato, p.es. Helius, evita i limiti dell'RPC pubblico).

## Regole che non cambiano
- Paper e reale sono due conti separati, mai mescolati (posizioni, journal, equity). Ogni voce ha `mode: paper|real`.
- Il reale usa le **stesse regole** del paper (size %, stop, TP1, trailing, filtri, circuit breaker) più un tetto di capitale in SOL (`realCapitalSOL`).
- Un ordine reale parte solo se `realGate()` (in `engine.js`, testato) restituisce vuoto: reale acceso, capitale > 0, esecutore configurato, raggiungibile, non fermato e con fondi.
- La chiave del wallet **non sta mai** nel repository, nel browser né nei workflow di GitHub (il repository è pubblico).

## Architettura prevista (gratuita, 24/7, senza Vercel)
| Pezzo | Dove | Compito |
|---|---|---|
| Decisione | runner su GitHub Actions (già c'è) | scan, punteggio, verdetto BUY: chiede l'ingresso all'esecutore |
| **Esecutore** | **Cloudflare Worker** | tiene la chiave come *secret* del Worker, firma gli swap Jupiter, applica i limiti **lato server** |
| Charon reale | Cron Trigger del Worker, ogni minuto | controlla le posizioni reali aperte e vende (stop, TP1, trailing, rug-exit) anche con app chiusa |
| Stato reale | KV o D1 di Cloudflare | posizioni e journal reali |
| App | PWA | mostra, approva i ticket, accende/spegne, kill switch |

Perché il Cron di Cloudflare per le uscite: il cron di GitHub Actions può ritardare anche di ore, e per soldi veri uno stop in ritardo non è accettabile.

## Limiti imposti dall'esecutore (non aggirabili dall'app)
- tetto di capitale reale e size massima per ordine, perdita massima giornaliera in SOL;
- slippage massimo; solo swap SOL ↔ token tramite Jupiter; nessun trasferimento verso altri indirizzi;
- un solo wallet dedicato con pochi fondi; richieste firmate con un segreto condiviso (`executorToken`);
- **kill switch**: ferma subito nuovi ordini (`/kill`), le uscite restano permesse.

## Fasi
1. **Fatto:** separazione paper/reale, cancello, impostazioni, test.
2. **Fatto:** esecutore in sola lettura: `/health` con indirizzo wallet e saldo (nessun ordine).
3. Ordini reali con approvazione manuale di ogni ingresso (ticket) e uscite di Charon dall'esecutore.
4. Autonomia: ingressi automatici dal runner, solo se lo accendi tu (`realApprove` spento).

## Cosa serve da te (fase 2)
- Account Cloudflare gratuito e un token API per pubblicare il Worker (come in Pinscher);
- un wallet Solana **nuovo e dedicato**, con una somma che puoi permetterti di perdere;
- i segreti vanno nelle impostazioni del Worker, mai nel repository né in chat.

Limiti del piano gratuito di Cloudflare (richieste al giorno, tempo CPU per invocazione, scritture KV): da verificare al
momento del deploy, perché incidono su quanto lavoro può fare il Worker a ogni minuto.

Le memecoin sono estremamente rischiose e il reale può perdere tutto il capitale: parti con importi minimi.

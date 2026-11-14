# Trading reale in Kaiser

**Stato: fase 3 (esecutore).** Il Worker `kaiser-executor` sa fare ordini veri tramite Jupiter, gestire le uscite di Charon ogni
minuto (anche con app e telefono spenti), applicare i limiti lato server e fermarsi con il kill switch. È **inerte finché non lo
accendi dalla dashboard di Cloudflare**: `ORDERS_MODE=off` e capitale massimo 0 sono i valori di partenza.

Esecutore: `https://kaiser-executor.salvogeraci030899.workers.dev`.
Segreti (dashboard Cloudflare → Worker → Settings → Variables and Secrets): `EXEC_TOKEN`, `WALLET_SECRET_KEY`, `GH_TOKEN`,
facoltativi `RPC_URL` (RPC gratuito dedicato, p.es. Helius), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

## Come si accende (in quest'ordine, senza fretta)
Variabili da impostare **dalla dashboard** (mai nel repository: un deploy non deve riportarle a un valore del repo; `keep_vars` le conserva):

| Variabile | Valore consigliato all'inizio | Significato |
|---|---|---|
| `ORDERS_MODE` | `dryrun` poi `live` | `off` nessun nuovo ordine · `dryrun` costruisce, controlla e **simula**, non firma né invia · `live` ordini veri |
| `JUPITER_PROGRAM_ID` | l'indirizzo del programma «Jupiter Aggregator v6» | **Verificalo tu** (Solscan o documentazione ufficiale di Jupiter): è l'unico programma di swap che l'esecutore accetta di firmare. Vuoto = nessun ordine |
| `MAX_CAPITAL_SOL` | `0.1` | capitale massimo in uso (0 = nessun ordine) |
| `MAX_ORDER_SOL` | `0.03` | size massima per ordine |
| `MAX_DAILY_LOSS_SOL` | `0.05` | perdita giornaliera massima: oltre, niente nuovi ingressi fino a domani |
| `MAX_POSITIONS` | `2` | posizioni aperte contemporaneamente (default 3) |
| `ALLOWED_PROGRAMS` | vuoto | altri programmi ammessi, separati da virgola, solo se il dry-run li segnala e li hai verificati |

1. **dryrun**: `ORDERS_MODE=dryrun` (con `JUPITER_PROGRAM_ID` e `MAX_CAPITAL_SOL` > 0), poi su Telegram: `/prova EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v 0.01` (compra USDC per 0,01 SOL in prova). Non viene inviato niente: la risposta mostra impatto, SOL spostati dalla simulazione, istruzioni e programmi (l'esito resta anche in Sistema → Stato → «Ultima prova»).
   Se un programma non è ammesso il rifiuto lo elenca: verificalo prima di autorizzarlo.
2. **live** con importi minimi: `ORDERS_MODE=live`, capitale e size piccoli. Controlla su Solscan il primo ordine.
3. Alza i limiti solo dopo diversi ordini corretti.

## Pannello, Telegram e runner (24/7)
- **App su GitHub Pages** (conto REALE): **sola lettura**. Mostra posizioni, ticket, journal, saldo, modo, limiti e l'ultima prova in dry-run leggendo la vista pubblica del Worker (`GET /public`, senza segreti: indirizzo abbreviato, mai la chiave). Non contiene né accetta token, chiavi o indirizzi e non può dare comandi.
  La vista pubblica si spegne con la variabile `PUBLIC_VIEW=0` nel Worker (l'app mostrerà «vista pubblica disattivata»).
- **Comandi: solo da Telegram**, dalla tua chat (il webhook richiede anche un segreto derivato da `EXEC_TOKEN`): `/stato`, `/posizioni`, `/wallet` (indirizzo completo e saldo, per verificare la chiave), `/approva T-0001`, `/rifiuta T-0001`, `/vendi R-0001 [%]`, `/kill`, `/riattiva`; i ticket hanno i tasti Approva e Rifiuta. Il Worker registra il webhook da solo, ma non sopra quello di un altro servizio: usa un bot dedicato a Kaiser.
- Il reale ha parametri **propri**, indipendenti dal paper (scheda Reale dell'app): size = `realSizePct` del **capitale reale** (`realCapitalSOL`), score minimo `realMinScore`, ingressi per scan `realMaxEntriesPerScan`, slippage `realSlippageBps` e uscite `realSl`, `realTp1`, `realTp1Sell`, `realTrail`, `realBeAfterTp1`, `realTimeStopMin`, `realTimeStopMinPnl`, `realRugLiqDrop`, `realSellPressure` (iniziano uguali a quelle del paper). Solo la selezione dei token (filtri) è in comune. Valori in `config.json` o, se cambiati dall'app, quelli approvati.
- **Parametri dall'app** (Sistema → Parametri): la richiesta passa dal Worker (`POST /propose`, senza segreti, solo da origini ammesse, massimo 3 in attesa e una ogni 15 secondi), arriva su Telegram con la differenza *prima → dopo* e viene applicata solo dal tuo tocco su **Applica** (o scade dopo 10 minuti). Elenco ammesso e intervalli: `worker/src/params.js` (solo numeri, interruttori e scelte; mai token, chiavi, URL, indirizzi o `ORDERS_MODE`).
  I limiti del Worker (`maxCapitalSOL`, `maxOrderSOL`, `maxDailyLossSOL`, `maxPositions`, `maxSlippageBps`, `maxImpactPct`) hanno come **tetto** le variabili `MAX_*` della dashboard: l'app può solo abbassarli. Il runner legge i parametri approvati a ogni scan da `GET /params` (pubblico) e riferisce i valori in uso con `EXEC_TOKEN`, così i messaggi mostrano il «prima» corretto. `PROPOSALS=0` disattiva le richieste.
- **Runner** (anche con app chiusa e telefono spento): il runner non ha chiavi e non firma nulla, chiede all'esecutore. Si accende da `config.json` sul branch `data`:
  ```json
  { "realEnabled": true, "realCapitalSOL": 0.05, "realApprove": true }
  ```
  - `realApprove: true` → propone un **ticket** (Telegram + app, scade in 10 minuti): lo approvi tu.
  - `realApprove: false` → **autonomia**: invia l'ordine da solo, con un `ref` stabile (nessun doppione) e gli stessi limiti del server.
  Servono i segreti GitHub `EXEC_TOKEN` (la stessa password di `EXEC_TOKEN` del Worker) e, se l'URL non è quello predefinito, `EXEC_URL`.
  Le impostazioni dell'app sono per dispositivo: il runner usa solo `config.json`.
- Le uscite (Charon) le gestisce sempre il Worker, ogni minuto, con i parametri dell'ordine.

## Cosa controlla l'esecutore prima di firmare
- La transazione la costruisce Jupiter, **non la firmiamo alla cieca**: ogni istruzione deve essere di un programma ammesso (System, Token, Associated Token, ComputeBudget, Memo, Jupiter); niente `Transfer`/`Approve`/`SetAuthority` di token; i trasferimenti di SOL solo dal nostro wallet e sotto la size dell'ordine; chiusura account solo verso il nostro wallet; una sola firma, la nostra.
- Poi la **simulazione** su RPC: il saldo SOL del wallet non può calare più della size dell'ordine più 0,01 SOL di margine. Per le uscite, al massimo 0,01 SOL.
- Limiti lato server (non aggirabili dall'app): size per ordine, capitale in uso, numero di posizioni, perdita giornaliera, slippage massimo, impatto massimo (5%), saldo sufficiente, un solo ordine per `ref` (nessun doppione se la richiesta si ripete), un solo ingresso per token.
- Il **kill switch** ferma i nuovi ingressi; le **uscite continuano** sempre, anche con `ORDERS_MODE=off`: una posizione aperta non resta mai senza stop.
- Le uscite sono quelle di Charon (le stesse del paper, stesso codice `engine.js`) con i parametri dell'ordine, limitati lato server (stop tra 5% e 60%).

## Limiti del piano gratuito (da tenere d'occhio)
- Charon controlla ogni minuto: su una memecoin il prezzo può muoversi molto tra un controllo e l'altro, e l'uscita può avvenire peggio dello stop. Lo slippage di uscita è alto (15%) per garantire la vendita.
- Un giro di Charon vende al massimo 2 posizioni (limite di richieste esterne per invocazione), le altre al giro dopo.
- Il tempo di calcolo per invocazione sul piano gratuito è limitato: se compaiono errori di limite, l'alternativa è il piano a pagamento di Cloudflare (circa 5 $ al mese).

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
2. **Fatto:** esecutore in sola lettura (`/health`, kill switch).
3. **Fatto (inerte):** ordini veri, controllo delle transazioni, simulazione, limiti, Charon ogni minuto, Telegram dal Worker.
4. **Fatto:** pannello di sola lettura + comandi da Telegram (`/prova`, `/approva`, `/vendi`, `/kill`…), parametri dall'app con approvazione su Telegram, e autonomia dal runner (`realApprove` spento), sempre dentro i limiti del Worker.
5. Da fare dopo i primi ordini veri: confronto paper/reale, filtri sul regime di mercato, alert di saldo basso.

## Cosa serve da te (fase 2)
- Account Cloudflare gratuito e un token API per pubblicare il Worker (come in Pinscher);
- un wallet Solana **nuovo e dedicato**, con una somma che puoi permetterti di perdere;
- i segreti vanno nelle impostazioni del Worker, mai nel repository né in chat.

Limiti del piano gratuito di Cloudflare (richieste al giorno, tempo CPU per invocazione, scritture KV): da verificare al
momento del deploy, perché incidono su quanto lavoro può fare il Worker a ogni minuto.

Le memecoin sono estremamente rischiose e il reale può perdere tutto il capitale: parti con importi minimi.

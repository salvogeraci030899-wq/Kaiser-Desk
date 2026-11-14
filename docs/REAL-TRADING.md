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
- **App su GitHub Pages** (conto REALE): **sola lettura**. Mostra posizioni, ticket in attesa (nel riquadro di Posizioni → Reale), journal, saldo, modo, limiti e l'ultima prova in dry-run leggendo la vista pubblica del Worker (`GET /public`, senza segreti: indirizzo abbreviato, mai la chiave). Non contiene né accetta token, chiavi o indirizzi e non può dare comandi.
  La vista pubblica si spegne con la variabile `PUBLIC_VIEW=0` nel Worker (l'app mostrerà «vista pubblica disattivata»).
- **Comandi: solo da Telegram**, dalla tua chat (il webhook richiede anche un segreto derivato da `EXEC_TOKEN`): `/stato`, `/posizioni`, `/wallet` (indirizzo completo e saldo, per verificare la chiave), `/approva T-0001`, `/rifiuta T-0001`, `/vendi R-0001 [%]`, `/emergenza`, `/kill`, `/riattiva`; i ticket hanno i tasti Approva e Rifiuta. Il Worker registra il webhook da solo, ma non sopra quello di un altro servizio: usa un bot dedicato a Kaiser.
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
- Le uscite (Charon) le gestisce sempre il Worker con i parametri dell'ordine: **ogni 10 secondi** finché ci sono posizioni reali aperte (allarme del Durable Object), con il cron di un minuto come rete di sicurezza.

## Cosa controlla l'esecutore prima di firmare
- La transazione la costruisce Jupiter, **non la firmiamo alla cieca**: ogni istruzione deve essere di un programma ammesso (System, Token, Associated Token, ComputeBudget, Memo, Jupiter); niente `Transfer`/`Approve`/`SetAuthority` di token; i trasferimenti di SOL solo dal nostro wallet e sotto la size dell'ordine; chiusura account solo verso il nostro wallet; una sola firma, la nostra.
- Poi la **simulazione** su RPC: il saldo SOL del wallet non può calare più della size dell'ordine più 0,01 SOL di margine. Per le uscite, al massimo 0,01 SOL.
- Limiti lato server (non aggirabili dall'app): size per ordine, capitale in uso, numero di posizioni, perdita giornaliera, slippage massimo, impatto massimo (5%), saldo sufficiente, un solo ordine per `ref` (nessun doppione se la richiesta si ripete), un solo ingresso per token.
- Il **kill switch** ferma i nuovi ingressi; le **uscite continuano** sempre, anche con `ORDERS_MODE=off`: una posizione aperta non resta mai senza stop.
- Le uscite sono quelle di Charon (le stesse del paper, stesso codice `engine.js`) con i parametri dell'ordine, limitati lato server (stop tra 5% e 60%).

## Limiti del piano gratuito (da tenere d'occhio)
- Charon controlla ogni 10 secondi: su una memecoin il prezzo può muoversi molto tra un controllo e l'altro, e l'uscita può avvenire peggio dello stop. Lo slippage di uscita è alto (15%) per garantire la vendita.
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
| Charon reale | Allarme del Durable Object ogni 10 s (cron ogni minuto come rete di sicurezza) | controlla le posizioni reali aperte e vende (stop, TP1, trailing, rug-exit) anche con app chiusa |
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

## Emergenza immediata

- **Telegram** `/emergenza`: agisce subito. Attiva il kill switch, spegne autopilota e reale e vende al mercato tutte le posizioni reali (2 per minuto per i limiti del piano gratuito; il resto al giro successivo, con avviso a fine operazione).
- **Tasto rosso nell'app**: l'app non ha segreti, quindi non può vendere da sola. Invia a Telegram una richiesta con il tasto **CONFERMA EMERGENZA**; il tocco su quel tasto la esegue.
- Per ripartire: `/riattiva` e riaccendere il reale dai parametri.

## Chiudere una posizione dall'app

- Ogni posizione aperta (paper e reale) ha il tasto **Chiudi**, con popup di conferma. Il popup dice se l'approvazione manuale risulta attiva o disattivata e da dove il Worker lo legge.
- **Approvazione manuale disattivata** («Approvazione manuale in reale» spenta in Sistema → Reale, oppure `realApprove: false` in config.json): la chiusura parte subito, senza Telegram, in paper e in reale.
- **Approvazione manuale attiva** (predefinito): arriva su Telegram il tasto **Chiudi ora**.
- Il Worker legge l'approvazione in quest'ordine: impostazione cambiata dall'app, valore riferito dal runner, configurazione nel riepilogo che il runner spinge (servono entrambi i segreti: `EXEC_TOKEN` su GitHub). Senza informazioni vale il predefinito (attiva).
- Variabile facoltativa del Worker `APP_CLOSE`: `direct` = sempre diretta, `confirm` = sempre con Telegram.
- Nota: la chiusura diretta non ha una seconda conferma fuori dall'app; il popup e' l'unica. Chi conosce l'indirizzo del Worker potrebbe chiedere una chiusura.

## Velocita

- **Runner paper:** run lunghi di ~50 minuti, senza fermarsi ogni 5 minuti; controllo delle posizioni ogni 10 secondi, scan completo ogni `scanSec` (30, modificabile dall'app), stato sul ramo `data` ogni 5 minuti. L'orologio del Worker non accoda un altro run mentre uno è in corso; lo accoda quando sta per finire, così non c'è buco.
- **Reale:** Charon ogni 10 secondi con posizioni aperte (nessun allarme senza posizioni, così non si consuma nulla).
- **App:** paper, reale e prezzi delle posizioni ogni 5 secondi; radar ogni 30 secondi (120 se non lo stai guardando); parametri ogni 30 secondi.
- Limiti: il piano gratuito ha un tetto di richieste giornaliere; ogni app aperta ne usa poche decine al minuto. Il prezzo di DexScreener ha comunque qualche secondo di ritardo.

## Quante Coin vede il radar

- **Fonti:** profili e boost di DexScreener, GeckoTerminal (in tendenza, nuovi, più scambiati), Jupiter (in tendenza, organic score, nuovi) e, nel runner, GMGN. Ognuna si spegne da Sistema → Paper → Filtri.
- **Memoria di 30 minuti:** le fonti ruotano; una Coin vista negli ultimi 30 minuti resta nell'elenco e viene riletta con dati freschi a ogni scansione (fino a 240).
- **Limiti di richieste:** GeckoTerminal e Jupiter si interrogano al massimo una volta al minuto ciascuno; dopo un 429 si aspettano 3 minuti usando l'ultimo elenco. GMGN al massimo ogni 75 secondi. Gli IP condivisi di GitHub vengono limitati spesso: per questo la cache.

## Token appena creati (0-60 minuti)

- **Cosa fa:** il runner ascolta le creazioni di token su pump.fun, li verifica su DexScreener dopo qualche secondo e segue per un'ora quelli con liquidità e scambi, registrando prezzo, picco e calo dal picco. Compaiono nel radar dell'app con la nota «giovane 7m · −23% dal picco» e in Sistema → Stato («Token giovani»).
- **Fonte principale: nodo RPC.** Serve un indirizzo RPC con WebSocket (per esempio il piano gratuito di Helius). Aggiungilo come segreto GitHub **`RPC_URL`** (Settings → Secrets and variables → Actions). Contiene la chiave: non incollarlo in chat e non finisce mai nei log. Il runner usa lo stesso indirizzo del Worker se vuoi (`RPC_URL` del Worker è separato: va impostato in entrambi i posti).
- **Riserva: PumpPortal** (WebSocket gratuito, senza chiave). Si attiva da solo se `RPC_URL` manca, se l'RPC non si collega, o se non dà creazioni da 90 secondi; si chiude quando l'RPC torna sano. Senza `RPC_URL` funziona solo PumpPortal.
- **Da verificare sul sistema vivo:** gli indirizzi del programma pump.fun e il formato degli eventi sono scritti nel codice (`runner/young.js`) e non ho potuto provarli con la rete vera. Se l'RPC resta muto, nel registro compare «RPC collegato ma senza creazioni da 90 s: uso PumpPortal come riserva»: l'indirizzo andrebbe corretto.
- **Parametri** (Sistema → Paper → Filtri): «Fonte: token appena creati» (acceso/spento) e «Token giovani: entra solo dopo un calo (%)» (0 = spento; con 20 compra un token giovane solo se il prezzo è già sceso del 20% dal picco visto).
- **Limiti:** il runner controlla ogni 10-30 secondi, quindi non può comprare nei primissimi secondi dopo il lancio. I token giovani sono i più rischiosi (la maggior parte muore o viene svuotata) e il paper sovrastima il reale proprio qui.

## Scudo: protezione del trading manuale da pump.fun

Compri a mano (pump.fun, Phantom) con **lo stesso wallet dell'esecutore**; lo Scudo mette stop e take profit al posto tuo.

- **Come si accende:** Sistema → Reale → «Scudo acceso» (richiesta su Telegram come ogni parametro) oppure da Telegram con `/scudo on` (immediato, dalla tua chat). `/scudo off` lo spegne, `/scudo` mostra lo stato.
- **Cosa fa:** ogni 10 secondi legge i token del wallet. All'accensione ne fa una **fotografia e li ignora per sempre**. Un token che compare dopo (acquisto manuale), con valore sopra il minimo (0,02 SOL di base) e non stabile, viene **adottato** come posizione «SCUDO»: ingresso = prezzo di quando lo vede, poi stop loss, TP1 con quota venduta, trailing, break-even, time stop e uscita per ritiro di liquidità, con gli stessi controlli e la stessa vendita via Jupiter delle posizioni dell'esecutore. Ti avvisa su Telegram a ogni passo.
- **Non adotta mai:** i token già presenti all'accensione, USDC/USDT/SOL avvolto e altri token principali, i token con market cap sopra 20 milioni, quelli sotto il valore minimo (polvere), quelli che non riesce a prezzare.
- **Parametri** (Reale → Scudo): stop 25%, TP1 +40% vendendo 50%, trailing 20%, break-even sì, time stop 360 minuti, uscita se la liquidità cala del 45%, vendite dominanti no, valore minimo 0,02 SOL. Tutti modificabili.
- **Prova prima di rischiare:** con `ORDERS_MODE=dryrun` (o off) lo Scudo **non vende e non registra posizioni**: ti avvisa soltanto («Scudo (prova): rilevato $XYZ… lo proteggerei: stop a…, TP1 a…»). Con `live` le uscite sono vere.
- **Limiti:** l'ingresso registrato è il prezzo al momento in cui lo Scudo si accorge dell'acquisto (circa 10 secondi dopo il tuo), non il tuo prezzo esatto. Su Coin sottili il prezzo si muove in pochi secondi: lo stop può scattare peggio del previsto. Le Coin ancora sulla curva di pump.fun si vendono solo se Jupiter le instrada. Se il nodo RPC risponde errori (per esempio 403), l'app mostra «Scudo: errore RPC»: serve `RPC_URL` nel Worker.
- **Sicurezza:** funziona con kill switch, pannello di emergenza e limiti come le altre posizioni reali. Se spegni lo Scudo, le posizioni già adottate restano gestite fino alla chiusura.

## Vendite che falliscono: riprova immediata

- Se una vendita reale fallisce (RPC, blockhash scaduto, slippage superato, ...), il Worker **riprova subito, nella stessa invocazione**, fino a 3 volte, con una quotazione Jupiter nuova e tolleranza di slippage crescente. Un secondo di pausa tra i tentativi.
- **Slippage delle uscite** (Sistema → Reale → Uscite): iniziale **2%** (come a mano su pump.fun), poi 2,5 volte il precedente, fino a un massimo di **10%**: 2% → 5% → 10%. Si cambiano dall'app («Slippage delle uscite: iniziale» e «massimo dopo i tentativi», con approvazione su Telegram). I tetti del Worker `EXIT_SLIPPAGE_BPS` (1500) e `EXIT_RETRY_SLIPPAGE_BPS` (4000) restano comunque un limite massimo.
- Con uno slippage iniziale basso il primo tentativo fallisce più spesso su Coin che si muovono in fretta: i tentativi successivi (a pochi secondi) servono a questo. Se non vuoi mai uscire con una perdita di prezzo oltre il 2%, metti anche il massimo a 2%: ma in un crollo la posizione potrebbe restare bloccata.
- Se anche l'ultimo tentativo fallisce, ti avvisa su Telegram («USCITA REALE FALLITA…») e il giro successivo parte dopo **2 secondi** (non 10), con lo stesso schema.
- Se un tentativo parte davvero ma l'RPC risponde un errore, quello dopo non vende di nuovo la stessa quota (si calcola dal saldo di partenza).
- Vale per stop, TP, trailing, emergenza, `/vendi` e Scudo. Limite: massimo 5 tentativi per invocazione (budget delle richieste esterne del piano gratuito).
- Gli **acquisti** del tool usano `realSlippageBps` (Paper → Reale, 300 = 3%): mettilo a 200 per avere il 2% anche in ingresso.

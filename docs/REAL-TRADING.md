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

## Laboratorio: osservare i token pump.fun (solo osservazione)

Il Laboratorio non apre ordini, ne reali ne paper. Registra cosa succede ai token appena creati, per verificare l'ipotesi del bot unico.

- Una sola connessione PumpPortal segue fino a 300 token per volta, ciascuno per 21 minuti.
- Per ogni token misura concentrazione dei portafogli (primi 3), acquisti in blocco nei primi secondi, portafogli che comprano e vendono in ciclo, vendite del dev, rapporto portafogli unici/scambi.
- Da queste misure nasce un punteggio bot (0-100), usando solo il primo minuto di vita. I token sono divisi in tre gruppi: basso (<35), medio, alto (>=65).
- Ingresso simulato 60 secondi dopo la nascita. Per ogni gruppo mostra, in %, quante volte il prezzo tocca prima il target o prima lo stop (10/10, 15/10, 30/25, 50/30), il picco mediano e cosa succede dopo l'arrivo di un acquirente grosso (>=1 SOL).
- Dove vederlo: Journal, scheda Lab. I primi risultati arrivano circa 20 minuti dopo il riavvio del runner con il codice nuovo. Si disattiva con il parametro srcLab.

Limiti: gli scambi dei primissimi secondi possono mancare se la sottoscrizione parte dopo la creazione; il punteggio bot e una euristica, non una prova; PumpPortal puo limitare o cadere; non e verificato dal vivo.

### Laboratorio, versione 2

Il Laboratorio ora misura anche (sempre solo osservazione):

- **Ingresso alla soglia di market cap.** Per le soglie 7.5K, 10K, 12K e 15K (in dollari, al cambio SOL/USD del momento) simula l'ingresso alla prima volta che la market cap la supera, e mostra: gare target/stop 12/10, 20/15 e 30/20, picco mediano, secondi fino al picco, calo mediano prima del picco e rendimento dopo 1, 2 e 5 minuti.
- **Reazione agli acquisti.** Dopo ogni acquisto, deriva del prezzo a +10, +30 e +60 secondi e quante volte scende, per taglia (sotto 10 $, 10-50 $, oltre 50 $) e per eta' del token (primi 5 minuti, dopo).
- **Vendite grosse.** Quante Coin hanno vendite sopra 100 $, quando arriva la prima, che cosa fa il prezzo nei 60 secondi dopo, rotazione del volume (volume diviso market cap), quota di Coin che si spengono dopo il picco (meno di un terzo degli scambi nei 60 secondi dopo il picco rispetto ai 60 prima) e quante arrivano a 15K e 30K.
- **Realismo del paper.** A ogni vendita con quotazione Jupiter disponibile confronta quanto si incasserebbe davvero con la stima del paper al prezzo di DexScreener. Una differenza mediana negativa significa che il paper e' troppo ottimista.

Nel Journal la colonna dell'esito mostra ora "picco X · uscita Y": il picco e' il massimo raggiunto, l'uscita e' il prezzo dell'ultima vendita. L'esito comprende anche le vendite parziali, le fee, l'impatto e la priority.

Limiti: le misure sono significative solo con alcune centinaia di Coin; la market cap in dollari dipende dal cambio SOL/USD noto al runner; il Laboratorio non e' mai stato provato dal vivo.

### Laboratorio: prezzi dalla catena

Dai dati del runner risultava che PumpPortal inviava i nuovi token ma nessuno scambio (0 scambi su centinaia di Coin), quindi nessuna Coin diventava "valida" per il punteggio bot. Il Laboratorio ora non dipende solo da quello:

- Con `RPC_URL` impostato, ogni 10 secondi legge in blocco (100 conti per chiamata) il conto "bonding curve" di ogni Coin seguita e ne ricava la market cap vera dalle riserve della curva. Costa circa 2-3 chiamate ogni 10 secondi.
- I token creati sono presi sia da PumpPortal sia dalla fonte RPC dei token giovani, quindi basta una delle due.
- Le misure basate sul solo prezzo (soglie di market cap, gare target/stop, uscita a tempo, picco, calo prima del picco) funzionano senza gli scambi. Punteggio bot, reazione agli acquisti per taglia, vendite grosse e calma dopo il picco restano disponibili solo se PumpPortal invia gli scambi.
- La scheda Lab mostra quanti messaggi arrivano (nuovi, scambi, altri) e quante letture della catena riescono. Se i primi valori letti non sembrano una market cap sensata, la lettura si spegne da sola (formato del conto diverso da quello atteso).

Limiti: il formato del conto e l'indirizzo della curva (letto dall'evento di creazione) sono noti a memoria e non verificati dal vivo; con un piano RPC a consumo contano circa 25.000 chiamate al giorno.

### Laboratorio: entrata con ritardo e letture scartate (v2.28.0)

- Per ogni soglia di market cap il Laboratorio simula anche l'entrata 10 e 20 secondi dopo la soglia (la tua reazione), con gare +12/-10 e +20/-15 e valore dopo 1 minuto, e mostra il prezzo di entrata mediano rispetto a quello della soglia. L'entrata istantanea alla soglia e' ottimistica: nella realta' si compra qualche secondo dopo, spesso piu' in alto.
- Le letture della curva scartate (conto troppo corto, riserve a zero, market cap troppo bassa o troppo alta) sono contate per motivo, con un campione, nella riga "Prezzi dalla catena" della scheda Lab.

### Fabbrica di strategie (v2.29.0)

Solo prova su dati registrati, nessun ordine.

- **Percorsi salvati.** Il Laboratorio consegna il percorso della market cap (SOL, un valore ogni 5 secondi, fino a 21 minuti) di ogni token che supera circa 5K in dollari. Il runner li salva compressi in `lab/paths/` sul ramo `data`, come punti di variazione, con un file nuovo a ogni scrittura (mai riscritto, per non gonfiare Git) e li tiene 7 giorni.
- **Motore di prova.** `runner/farm.js` valuta una griglia di 768 configurazioni (soglia 7.5K-15K, ritardo 0-20 s, target 10-30%, stop 10-25%, tempo massimo 1-5 minuti o nessuno) con un costo di 7% a giro. Gira in un processo separato, al massimo una volta all'ora, e scrive `farm.json`; la scheda Lab lo mostra.
- **Contro il troppo-adattamento.** I token vengono ordinati per data: il 60% piu' vecchio serve a scegliere, il 40% piu' recente a controllare. Una regola passa solo se e' positiva dopo i costi in entrambi i gruppi, con almeno 30 operazioni sui dati vecchi e 15 sui recenti. La scheda mostra anche la migliore sui dati vecchi con il suo risultato sui recenti, per vedere quando una regola era solo un caso.
- **Limiti.** Prezzi letti ogni 10 secondi; i prezzi di uscita sono quelli letti, non i livelli ideali; il costo di 7% e' una stima prudente; non ci sono dati sugli scambi (portafogli), solo sui prezzi. Con 768 configurazioni qualcuna sembra buona per caso: contano solo le regole che restano positive per piu' giorni.
- Dalla riga di comando: `node runner/farm.js --in state/lab/paths --out state/farm.json`. Variabile `NO_FARM=1` per spegnerla nel runner.

### Sonda delle fonti per gli scambi (v2.30.0)

PumpPortal conferma le iscrizioni ma non invia scambi, quindi senza una fonte alternativa non si misurano i portafogli (punteggio bot, vendite grosse). La sonda prova le candidate sul runner, per 40 secondi, una volta ogni 12 ore (si spegne con `NO_PROBE=1`) e mostra l'esito nella scheda Lab:

- **PumpPortal:** quanti messaggi arrivano, il testo della risposta e quanti sono scambi dei token seguiti. Usa una seconda connessione per pochi secondi: se il servizio dovesse lamentarsene, spegnere la sonda.
- **Eventi del programma via RPC:** ascolta tutti gli scambi di pump.fun (`logsSubscribe` sul programma) e misura messaggi al secondo, KB al secondo (il costo di banda sul piano RPC), quanti eventi di scambio si leggono con importo, verso e portafoglio, e quanti riguardano i token seguiti.
- **Una curva alla volta via RPC:** iscrizioni separate sul conto di ciascuna curva (fino a 20), con gli eventuali errori di limite del piano.
- **API pubblica di pump.fun:** una richiesta per un token seguito (non ufficiale: puo' essere bloccata).

Il formato dell'evento di scambio e' noto a memoria e non verificato dal vivo: la sonda conta separatamente gli eventi "leggibili" (importi e market cap sensati). Il rapporto non contiene l'indirizzo RPC.

### Pagina Lab (v2.31.0)

Il Laboratorio ha una pagina dedicata, con il tasto "Lab" nella barra in basso (tra Journal e Sistema). Non e' piu' una scheda del Journal. La pagina scorre per intero e raggruppa ogni sezione in un riquadro: stato delle fonti, ingresso a 60 secondi per punteggio bot, soglie di market cap, ingresso con ritardo, reazione agli acquisti, fabbrica di strategie, fonti per gli scambi, realismo del paper, vendite grosse.

### Registro delle regole e prova in avanti (v2.32.0)

Solo prova, nessun ordine. La fabbrica propone, il registro mette alla prova, il Lab mostra.

- **Ammissione.** Quando la fabbrica trova una regola positiva dopo i costi sia sui dati vecchi sia su quelli recenti, entra in "prova" (massimo 10 insieme). Una configurazione ritirata non rientra per 7 giorni.
- **Prova in avanti.** La regola e' valutata solo sui token nati dopo l'ammissione, che nessuno ha usato per sceglierla: e' il test piu' onesto contro il troppo-adattamento. Ogni token concluso dal Laboratorio viene simulato con la regola, costi inclusi.
- **Validata** con almeno 30 operazioni che coprano almeno un giorno intero, esito medio positivo e fattore di profitto sopra 1.1.
- **Ritirata** se: dopo 20 operazioni l'esito medio e' sotto -2%; a 30 operazioni l'esito medio non e' positivo; dopo 60 non e' validata; in 3 giorni meno di 10 segnali. Una regola validata viene ritirata se le ultime 30 operazioni hanno esito medio negativo o se la perdita cumulata dal massimo supera 60 punti.
- **Telegram.** Ogni validazione e ogni ritiro arriva come messaggio.
- **Nessun ordine.** Una regola validata puo' solo essere proposta per l'uso; il passaggio al paper o al reale richiede la tua approvazione su Telegram, come per ogni altro parametro. L'uso delle regole nel radar e' la tappa successiva.
- Il registro e' in `strategies.json` sul ramo `data`; la pagina Lab mostra stato, operazioni in avanti, esito medio e le ultime variazioni.

### Rug: analisi e misure dei possessori (v2.33.0)

Dai dati del paper (46 operazioni) 8 uscite per rug valgono circa il 68% della perdita. La fabbrica ora misura i rug e cerca come anticiparli (solo misura, nessun ordine).

- **Definizione.** Rug = entro 5 minuti dalla soglia di market cap (7.5K e 10K) il prezzo scende al 25% o meno del prezzo d'ingresso; crollo = al 50% o meno. Servono almeno 2 minuti di storia dopo la soglia.
- **Segnali dal percorso** (noti al momento della soglia): secondi dalla nascita, salto alla soglia, velocita' di salita, calo massimo prima, attivita' (quota di intervalli con una variazione), volatilita'.
- **Segnali dai possessori.** Quando un token supera 7.5K il runner legge, con 3 chiamate RPC (`getTokenLargestAccounts`, `getTokenSupply`, `getMultipleAccounts`), quanta offerta hanno il primo, i primi 3 e i primi 10 possessori (la curva di pump.fun e' esclusa) e quanta ne ha ancora il creatore. Le misure sono salvate in `lab/holders/` (7 giorni) e entrano nell'analisi quando ci sono almeno 200 token misurati. Si spegne con `NO_HOLDERS=1`.
- **Filtri.** Per ogni segnale si divide in quartili sui dati vecchi, si scelgono i filtri che abbassano di piu' il tasso di rug tenendo almeno il 25% dei token, e si controllano sui dati recenti. Dopo ogni filtro la fabbrica prova di nuovo le 768 configurazioni: serve almeno una regola positiva anche sui recenti, altrimenti togliere i rug non basta a coprire i costi.
- Il rapporto e' in `rug.json` sul ramo `data` ed e' mostrato nella pagina Lab, sezione "Rug: si possono evitare?".
- **Altre correzioni.** Il Laboratorio ignora i token di altre piattaforme (campo `pool` diverso da `pump`), che davano letture scartate; il registro delle regole tiene una sola regola per gruppo (soglia + ritardo) e le ultime 40 ritirate.
- **Notifiche Telegram.** I messaggi del Worker hanno ora i collegamenti a pump.fun, DexScreener e GMGN (modifica fatta direttamente su `main`); i test controllano che non ci siano tasti di conferma, non che non ci sia nessuna tastiera, e le etichette dei collegamenti sono senza emoji.

### Modalita' semi-automatica (v2.34.0)

Il radar sceglie la Coin, tu entri a mano. Invece di aprire la posizione, il runner manda un avviso e ti porta direttamente alla Coin su pump.fun. Non apre ordini, ne' paper ne' reali.

- **Come si accende.** Parametro "Modalita' semi-automatica" (Sistema, Paper, Automazione), come ogni altro parametro con approvazione su Telegram. Valori: `spento` (di base), `avvisi e paper` (avviso per ogni BUY del radar e il paper continua a girare, cosi' si misura se i segnali sono buoni), `solo avvisi` (nessuna posizione paper). Funziona anche con l'autopilota spento.
- **Avviso su Telegram.** Messaggio "SEGNALE" con score, market cap, eta', liquidita' e i motivi, e tre tasti: "Apri su pump.fun" (il collegamento diretto alla Coin), DexScreener e GMGN. Nessun tasto apre o conferma ordini.
- **Nell'app.** Sul Radar compare il riquadro "Segnali" con gli ultimi due avvisi e il tasto pump.fun di ciascuno. Il tasto apre il sito (o l'app di pump.fun, se il telefono la associa al collegamento): non posso verificare da qui come si comporta sul tuo iPhone.
- **Limiti.** Al massimo 8 avvisi all'ora; la stessa Coin non viene segnalata di nuovo prima di 3 ore; rispetta l'attesa del calo impostata (`minDipPct`). I filtri e il punteggio sono quelli del radar.
- **Misura dei segnali.** Per ogni avviso il runner segue il prezzo per 15 minuti e salva la variazione ora, il minimo e quella dopo 5 e dopo 15 minuti. Nel riquadro vedi subito se i segnali recenti erano buoni, anche se non hai comprato. Nota onesta: i segnali sono quelli del radar, e il radar nel paper ha un fattore di profitto sotto 1; il semi-automatico non cambia la qualita' del segnale, evita solo l'esecuzione automatica.

### Tasti nei messaggi Telegram (v2.35.0)

Ogni messaggio che riguarda una Coin ha in evidenza **«Apri su pump.fun»** (collegamento diretto alla Coin), poi DexScreener e GMGN. La tastiera e' la stessa nel runner (`runner/kb.js`) e nel Worker (`worker/src/kb.js`); un test controlla che diano lo stesso risultato.

| Messaggio | Tasti |
|---|---|
| Segnale (semi-automatico) | Apri su pump.fun · DexScreener, GMGN |
| Ticket di acquisto reale | Approva, Rifiuta · Apri su pump.fun · DexScreener, GMGN |
| Acquisto reale, Scudo, vendita parziale, uscita fallita | Apri su pump.fun · DexScreener, GMGN · Chiudi posizione |
| Chiusura reale (CHIUSA) e altre notifiche con una Coin | Apri su pump.fun · DexScreener, GMGN |
| Richiesta di chiusura (conferma) | Chiudi ora, Annulla · Apri su pump.fun · DexScreener, GMGN |
| BUY paper | Apri su pump.fun · DexScreener, GMGN · Chiudi posizione |
| CLOSE paper | Apri su pump.fun · DexScreener, GMGN |
| `/posizioni` | per ogni posizione: pump.fun $SIMBOLO, Chiudi posizione |
| Circuit breaker, riepilogo, paper azzerato, regole validate o ritirate, ... | Apri Kaiser |

**«Chiudi posizione»** non vende da solo: apre la stessa richiesta di conferma della chiusura dall'app (con «Chiudi ora» e «Annulla»), oppure chiude subito se l'approvazione manuale e' spenta. Vale per le posizioni reali (`R-...`) e per quelle paper (`P-...`). L'indirizzo dell'app per «Apri Kaiser» e' quello di GitHub Pages; si puo' cambiare con la variabile `APP_URL` del runner.

Il Worker si ripubblica da solo quando cambia `worker/` su `main` (workflow «Pubblica esecutore»): i tasti nuovi dei suoi messaggi arrivano dopo quella pubblicazione.

### Studio del Laboratorio: prove su richiesta (v2.36.0)

Dalla pagina Lab si puo' impostare quasi ogni aspetto del contesto e rifare la prova sui percorsi registrati, senza aspettare l'analisi automatica. Solo analisi: non apre ordini e non cambia la configurazione.

- **Cosa si imposta.** Soglia di market cap (3K-60K USD), ritardo di ingresso (0-120 s), target (2-1000%), stop (2-99%), tempo massimo (0-1260 s, 0 = nessuno), trailing dal massimo (0-90%), costi di un giro (0-20%, di base 7), ultimi giorni (0-14, 0 = tutti), eta' minima e massima alla soglia (secondi dalla nascita) e fino a 3 filtri sui segnali noti alla soglia: salto, velocita' di salita, calo massimo prima, attivita', volatilita' e, quando ci sono le misure, primo possessore, primi 3 e 10, quota del creatore.
- **Variazione di un parametro.** Si sceglie un parametro (target, stop, soglia, ritardo, tempo, trailing, costi, eta') e un intervallo con passo, fino a 25 punti: il risultato e' la tabella esito per valore, separata tra dati vecchi e recenti.
- **Risultato.** Operazioni, esito medio con l'errore, vinte, fattore di profitto, mediana, peggiore e migliore, perdita cumulata massima, dati vecchi (60%) contro recenti (40%) per data, curva cumulata, distribuzione degli esiti, motivi di uscita e giorno per giorno. Sotto 30 operazioni l'app avverte che non e' affidabile.
- **Come gira.** L'app manda la richiesta al Worker (`POST /lab/query`, solo origini ammesse, al massimo 80 al giorno, una ogni 15 secondi, massimo 4 in coda); il runner la prende ogni 10 secondi (`/lab/next`), la esegue in un processo separato (`runner/labquery.js`) sui file di `lab/paths` e `lab/holders`, e riporta il risultato (`/lab/result`, massimo 30 KB). L'app lo legge da `GET /lab/queries`. Di solito pochi secondi. Una prova senza risposta del runner scade dopo 5 minuti.
- **Limiti di sicurezza.** Tutti i valori sono numeri entro limiti fissi o scelte da un elenco: nessun indirizzo, nessun testo libero; il Worker ripete la validazione (identica a quella del runner, un test lo verifica). Si spegne con `LAB_QUERIES=0` nel Worker e `NO_LABQ=1` nel runner.
- **Attenzione.** Provare tante combinazioni su pochi dati produce regole buone per caso: contano solo i risultati positivi sia sui dati vecchi sia sui recenti, e giorno per giorno.

### Test di Grok sui segnali (v2.37.0)

Serve a sapere, con i dati, se Grok vale il suo costo. Solo misura: il giudizio non cambia gli avvisi ne' le operazioni.

- **Cosa fa.** Con il parametro «Test di Grok sui segnali» acceso e la modalita' semi-automatica attiva, per ogni segnale il runner chiede a Grok (la stessa analisi di `api/grok.js`: ricerca su X) sentimento (da -1 a 1), hype, organicita' (da 0 a 10) e allarmi. Il giudizio arriva dopo l'avviso (una chiamata alla volta, al massimo 120 al giorno, scartato se in ritardo di piu' di 10 minuti). Serve il segreto `XAI_API_KEY`; senza, il test resta spento.
- **Cosa misura.** Per ogni segnale concluso (esito a 15 minuti noto) si salva il giudizio con la variazione del prezzo dopo 5 e 15 minuti (ultimi 600 in `state.json`). Il riepilogo divide i segnali per sentimento (positivo oltre 0.3, negativo sotto -0.3), organicita' (alta da 7, bassa sotto 4) e allarmi, e per ogni gruppo mostra la variazione mediana a 5 e 15 minuti, la quota a -30% o peggio (rug) e la quota in positivo. Calcola anche la correlazione di Spearman tra giudizio ed esito.
- **Verdetto.** Sotto 100 segnali giudicati e conclusi: «pochi dati». Poi: «legame positivo» (sentimento o organicita' con correlazione di almeno 0.12 e p sotto 0.02), «utile come allarme» (i segnali con allarmi finiscono a -30% o peggio almeno 15 punti piu' spesso), «legame inverso» (da ignorare) oppure «nessun legame misurabile» (non vale il costo).
- **Dove si vede.** Pagina Lab, sezione «Grok: serve davvero?»; nel riquadro Segnali del Radar compare il giudizio di Grok accanto a ogni segnale giudicato.
- **Costo.** Una chiamata xAI per segnale: con al massimo 8 segnali all'ora sono al piu' circa 190 al giorno, limitati a 120. Il parametro e' spento di base.

### Bot Telegram: menu e nuove schermate (v2.38.0)

- **Menu dei comandi.** Il Worker registra da solo (una volta per versione, solo per la tua chat) l'elenco dei comandi del bot: il tasto «Menu» accanto al campo di testo mostra menu, stato, paper, segnali, lab, regole, posizioni, scudo, parametri, emergenza, aiuto. Alla prima registrazione manda un messaggio «bot aggiornato» con il menu a tasti.
- **Menu a tasti (`/menu`, `/start`).** Stato in testa (ordini, kill switch, Scudo, semi-automatico, Test Grok, paper) e tasti per: Stato, Paper, Segnali, Laboratorio, Regole, Posizioni, Scudo, Modifiche, Aiuto, Semi-automatico, Test Grok, Apri Kaiser, EMERGENZA. I messaggi senza Coin (riepilogo, circuito di sicurezza, regole) hanno «Apri Kaiser» e «Menu».
- **Schermate nuove.** `/paper` (equity, risultati, posizioni con pump.fun e Chiudi, ultime chiuse), `/segnali` (ultimi 5 segnali con esito a 5 e 15 minuti e il tasto «Apri su pump.fun» di ciascuno), `/lab` (riepilogo: Coin osservate, fabbrica, rug, regole, Grok), `/regole`.
- **Interruttori con conferma.** `/semi` e `/grok` (o i tasti del menu) non cambiano nulla da soli: mandano la richiesta con Applica/Rifiuta, come dall'app. Il tasto EMERGENZA del menu chiede prima la conferma («CONFERMA EMERGENZA»).
- **Tastiera fissa (`/tastiera`, `/tastiera off`).** Menu, Stato, Paper, Segnali, Laboratorio, Posizioni sempre visibili sotto il campo di testo; anche le parole scritte a mano funzionano.
- **Diagnosi.** Se il bot e' gia' collegato a un altro servizio (webhook altrove), il menu lo dice: i collegamenti a pump.fun funzionano comunque, i tasti con azione e i comandi no finche' non si usa un bot dedicato a Kaiser.
- I tasti compaiono sui **messaggi nuovi**: quelli gia' inviati non cambiano.

## Storico dei creatori (da v2.42.0)
Il runner registra per ogni token concluso il creatore e il massimo raggiunto (`state/lab/creators`, anche per i token che non superano mai 5K) e salva il creatore nei percorsi. L'analisi dei rug aggiunge tre segnali noti PRIMA della soglia: quanti token ha già creato, quanti sono arrivati a 7.5K e il loro massimo mediano. Contano solo i token creati prima e conclusi da almeno 30 minuti. Servono alcuni giorni di dati prima che i segnali compaiano nel Laboratorio (riquadro Rug). Solo misura: non cambia nessuna operazione.

## Segnali oltre il prezzo (da v2.46.0)
Alla soglia di market cap il runner misura, oltre ai possessori: i **social dichiarati** nei metadati (twitter, telegram, sito), l'**acquisto iniziale del creatore**, e l'**attività dei primi istanti** dalle firme della curva (operazioni nei primi 2 blocchi = cecchini/bundle, operazioni nel primo minuto, quota di fallite). Con la chiave `XAI_API_KEY` e il parametro «Test dei callout social (Grok)» acceso, Grok aggiunge menzioni su X, callout di account grandi, sentimento, organicità e allarmi (al massimo 150 richieste al giorno, solo entro 3 minuti dalla soglia). Tutte le misure sono note al momento della soglia (niente informazioni dal futuro), vanno nella stessa riga dei possessori e compaiono nell'analisi dei rug e come filtri dello Studio. Solo misura: nessun ordine.

## Ricerca con controllo delle false scoperte (da v2.47.0)
Ogni ora la fabbrica prova insieme tutti i filtri sui segnali noti alla soglia (percorso, possessori, creatore, social, attività iniziale) e 24 regole, e tiene la migliore. Poi ripete la stessa ricerca 100 volte con i segnali scambiati a caso tra i token: la quota di volte in cui il caso fa altrettanto bene è il «p». Il risultato conta solo se l'esito è positivo sui dati vecchi e recenti e il p è sotto il 5%. Il rapporto è in `combo.json` e nel riquadro Fabbrica del Laboratorio. Solo misura.

## Strategia corrente con filtro (da v2.49.0)
Se la ricerca con filtri trova un segnale credibile (esito positivo su dati vecchi e recenti, caso sotto il 5%), la strategia corrente può diventare «regola + filtro» (per esempio «solo token con primo possessore ≤ 20%»), con le stesse regole di cambio di sempre: almeno 1 punto in più della corrente e almeno 6 ore. Il filtro si applica in avanti con le misure note alla soglia (possessori, social, attività iniziale, creatore, callout di Grok). Un token senza la misura non entra. Il conto paper a parte e il riepilogo la seguono. Nessun ordine.

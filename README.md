# KAISER · Solana Meme Desk

Desk di trading AI per memecoin Solana, ispirato a PumpGrok (ruoli separati con veto) e alimentato da GMGN Agent Skills, Grok (𝕏), DexScreener, RugCheck e Jupiter.
Lavora **24/7** senza telefono: paper su GitHub Actions, reale (facoltativo, con limiti) su Cloudflare, comandi e notifiche da Telegram.
L'app che installi sul telefono è un **pannello di sola lettura su GitHub Pages**: non contiene né accetta token, chiavi o indirizzi.

## Come è fatto

| Pezzo | Dove | Cosa fa |
|---|---|---|
| **App (PWA)** | GitHub Pages | Pannello: radar, posizioni, journal, stato. Sola lettura, nessun segreto |
| **Runner paper** | GitHub Actions (`runner/`) | Scansiona, decide e simula 24/7; pubblica `public.json` e `REPORT.md` sul ramo `data` |
| **Orologio** | Cloudflare Worker (Cron) | Ogni 5 minuti avvia il runner; ogni minuto controlla le posizioni reali |
| **Esecutore reale** | Cloudflare Worker (`worker/`) | Ordini veri via Jupiter con limiti lato server, kill switch, Telegram. Spento di default |
| **Telegram** | Bot dedicato | Notifiche e **comandi** (approva, rifiuta, vendi, kill switch) |

## I ruoli del desk

| Ruolo | Cosa fa | Fonti |
|---|---|---|
| **SCOUT** | Raccoglie i token candidati | DexScreener (profili, boost), GMGN trending/trenches |
| **ORACLE** | Punteggio 0–100 su liquidità, età, turnover, pressione buy/sell, momentum, social, smart money/KOL | DexScreener + GMGN |
| **SENTINEL** | Sicurezza, con potere di **veto**: mint/freeze authority, rugged, honeypot, rug ratio, insider | RugCheck (riserva: GMGN security) |
| **GROK** | Sentiment su X: organico o bot/shill, red flag, KOL che ne parlano (±12 punti) | xAI Responses API + `x_search` |
| **KAISER** | Decide BUY/WATCH/SKIP/VETO, applica la costituzione, autopilota, ticket di approvazione | — |
| **QUARTER** | Fill paper con quotazione **Jupiter reale** (impatto, slippage, commissioni, priority fee) | Jupiter |
| **CHARON** | Uscite: stop loss, TP1 parziale, trailing, break-even, time stop, rug-exit su crollo liquidità, pressione vendite | DexScreener + Jupiter |
| **SCRIBE** | Journal, win rate, P&L dopo tasse, CSV | — |

### La costituzione (regole che Kaiser non può violare)
- Nessun BUY se la sicurezza non è stata verificata. Un solo veto di Sentinel blocca il trade.
- Numero massimo di posizioni, size in % dell'equity, slippage massimo.
- Circuit breaker: oltre la perdita giornaliera impostata, niente nuovi ingressi fino a domani.
- Cooldown dopo ogni perdita e niente ritrade sullo stesso token per N ore.

## Installazione sul telefono (GitHub Pages)

1. **Attiva Pages (una volta sola):** repository → *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch `main`, cartella `/ (root)` → Save*.
2. Dopo circa un minuto l'app è su **https://salvogeraci030899-wq.github.io/Kaiser-Desk/**
3. Apri l'indirizzo in Safari → Condividi → **Aggiungi alla schermata Home**. Da lì si apre come app a schermo intero.
4. *(consigliato)* In **Sistema → Blocco app** imposta il codice (e Face ID).

Indirizzo diverso = memoria diversa: tema, blocco e preferenze si impostano di nuovo su ogni indirizzo.

## Cosa mostra l'app
- **Paper:** il conto del runner 24/7 (equity, posizioni, journal), aggiornato ogni 30 secondi dai dati pubblicati sul ramo `data`.
- **Reale:** posizioni, ticket, journal e saldo dell'esecutore (vista pubblica di sola lettura).
- **Radar:** scansione di consultazione con le stesse regole e gli stessi filtri del runner. Non apre posizioni.
- **Sistema:** stato di runner, orologio ed esecutore; configurazione in sola lettura; tema, Vetro, barra di stato, blocco.
- Come un'app nativa: niente zoom, niente selezione del testo né lente di ingrandimento, niente scroll involontario.

## Telegram
Usa un bot **dedicato a Kaiser** (non lo stesso di altri servizi: il webhook di un bot è uno solo).

1. Crea il bot con @BotFather e ricava il `chat id` della tua chat.
2. Segreti `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID`:
   - in **GitHub** (Settings → Secrets and variables → Actions) → notifiche del runner paper e riepilogo serale;
   - in **Cloudflare** (Worker `kaiser-executor` → Settings → Variables and Secrets) → notifiche del reale e **comandi**. Il Worker registra da solo il webhook entro un minuto, senza toccare quello di altri bot.
3. Scrivi `/aiuto` al bot. Comandi: `/stato`, `/posizioni`, `/wallet`, `/prova MINT [SOL]` (collaudo con Jupiter e RPC veri, senza inviare nulla), `/parametri`, `/reset_parametri`, `/approva T-0001`, `/rifiuta T-0001`, `/vendi R-0001 [%]`, `/emergenza` (immediata: ferma gli ingressi, spegne autopilota e reale, vende tutto), `/kill`, `/riattiva`. Rispondono solo alla tua chat. Sotto ogni ticket ci sono i tasti Approva e Rifiuta.

## Parametri: si cambiano dall'app, si applicano da Telegram
**Sistema** ha tre schede: **Generale** (aspetto, blocco, stato, comandi), **Paper** e **Reale**. Paper e Reale hanno parametri **indipendenti** (all'inizio con gli stessi valori), così puoi dare al reale regole più prudenti:
- **Paper:** autopilota, capitale e rischio, uscite (stop, TP, trailing…), filtri di selezione dei token (in comune con il reale) e il reset del conto.
- **Reale:** ordini dal runner (acceso, capitale, approvazione, size, score minimo, ingressi per scan, slippage), uscite del reale (`realSl`, `realTp1`, `realTrail`…) e limiti dell'esecutore (sotto i tetti di Cloudflare).

Non ci sono campi per chiavi, token o indirizzi: solo numeri, interruttori e scelte.

1. Scegli i nuovi valori nella scheda e premi **Inserisci su Paper** o **Inserisci su Reale** (ognuno invia solo le modifiche della propria scheda; le bozze restano se cambi scheda). La richiesta non contiene segreti.
2. Il Worker la controlla (solo parametri ammessi, solo valori nei limiti) e ti manda su Telegram la differenza *prima → dopo*, con ogni voce marcata **Paper ·** o **Reale ·**, e i tasti **Applica / Rifiuta**. Vale 10 minuti.
3. Applichi: il runner usa i nuovi valori entro un minuto (li legge a ogni scan), il Worker subito. Rifiuti o lasci scadere: non cambia nulla.

I **limiti del reale** (capitale, ordine, perdita giornaliera, posizioni, slippage, impatto) si possono solo **abbassare** dall'app: il tetto è il valore impostato nella dashboard di Cloudflare, che l'app non può superare. `ORDERS_MODE` (off/dryrun/live) resta solo nella dashboard. Telegram: `/parametri` mostra le modifiche fatte dall'app, `/reset_parametri` le annulla. Le richieste si possono disattivare con `PROPOSALS=0` sul Worker.

### Conto paper: capitale iniziale e reset
Il capitale iniziale non si cambia «a caldo» (cassa ed equity devono restare coerenti): in **Sistema → Conto paper** scegli il capitale di ripartenza (0,1–1000 SOL) e premi **Azzera il paper e riparti**. Stessa approvazione su Telegram: se approvi, il runner cancella posizioni aperte, journal e statistiche del paper e riparte con il capitale scelto entro un minuto (ti avvisa con un messaggio). Il capitale resta quello scelto anche ai run successivi. Il conto **reale non viene mai toccato**.

### Dati in diretta
Il runner spinge il riepilogo del paper al Worker a ogni apertura/chiusura e ogni pochi secondi; l'app lo legge da lì (pillola `RUNNER 12s`). Serve il segreto GitHub **`EXEC_TOKEN`** (la stessa password del Worker). Senza, l'app ripiega sul file `public.json` del ramo `data`, che si aggiorna solo a fine run (ogni 5 minuti) e che GitHub tiene in cache fino a 5 minuti: ritardo fino a 10 minuti, la pillola mostra `· GH`.

## Altre cose che si cambiano fuori dall'app
- **Valori di base del runner:** `config.json` sul ramo `data` (stesse chiavi di `DEFAULTS` in `engine.js`). Le modifiche approvate dall'app vanno sopra quel file.
- **Reset del paper:** cancella `state.json` sul ramo `data`.
- **Reale** (modo, tetti, wallet, Jupiter, RPC, Telegram): variabili e segreti del Worker nella dashboard di Cloudflare. Vedi `docs/REAL-TRADING.md`.
- **Runner:** segreti GitHub opzionali `GMGN_API_KEY`, `XAI_API_KEY`, `XAI_MODEL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `EXEC_TOKEN`, `EXEC_URL`.
- **Avvio manuale del runner:** Actions → KAISER runner → Run workflow.

## Paper e reale
Il reale è un conto separato, **spento di default**: parte solo con `ORDERS_MODE`, capitale massimo e programma Jupiter impostati nel Worker. Prima si prova in `dryrun` (costruisce e simula, non invia nulla). Il runner non ha chiavi e non firma. Dettagli e limiti in `docs/REAL-TRADING.md`.

## Note
- Il paper gira nel runner, non nell'app: funziona anche con il telefono spento.
- GMGN gira tramite `gmgn-cli` nel runner, solo con comandi di lettura in whitelist.
- Testo e metadati dei token sono trattati come dati: vengono sempre "escapati" e i link non http vengono scartati.
- Vercel non serve più (restano `vercel.json` e `api/`, usati solo dal runner come moduli).
- Le memecoin sono estremamente rischiose e possono azzerare il capitale. Misura il sistema in paper prima di usare soldi veri.

## Controlli
```bash
npm test      # motore, runner, esecutore, Telegram, app (statici)
```

# KAISER · Solana Meme Desk

Desk di trading AI per memecoin Solana, ispirato a PumpGrok (ruoli separati con veto) e alimentato da GMGN Agent Skills, Grok (𝕏), DexScreener, RugCheck e Jupiter.
**Solo paper trading:** non usa chiavi private e non firma transazioni.

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
- In modalità approvazione, ogni ingresso è un ticket da approvare entro 3 minuti.

## Installazione da iPhone

1. **GitHub:** crea un repository (privato va bene) e carica tutti i file di questa cartella rispettando la struttura (`api/` compresa).
2. **Vercel:** *Add New → Project*, importa il repo e premi Deploy. Non serve nessuna configurazione di build.
3. **Variabili d'ambiente** (Vercel → Settings → Environment Variables), poi fai Redeploy:

| Variabile | Obbligatoria | A cosa serve |
|---|---|---|
| `APP_TOKEN` | consigliata | una password a tua scelta: protegge il backend da estranei |
| `GMGN_API_KEY` | no | la tua chiave da gmgn.ai/ai. Senza, si usa la chiave demo pubblica (limiti bassi) |
| `XAI_API_KEY` | no | attiva l'agente Grok (lettura di X, a pagamento) |
| `XAI_MODEL` | no | modello Grok (predefinito `grok-4.7`) |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | no | notifiche di ticket, acquisti e chiusure (puoi riusare il bot di Kronos) |

4. Apri l'URL Vercel in Safari → Condividi → **Aggiungi alla schermata Home**.
5. In **Setup**, scrivi il token app (uguale ad `APP_TOKEN`) e premi *Test backend*.

Senza backend l'app funziona lo stesso in “solo browser” (DexScreener + RugCheck + Jupiter), ma senza GMGN, Grok e Telegram.

## Note
- Su iPhone la scansione gira solo con l'app aperta in primo piano: iOS sospende le pagine in background.
- GMGN gira tramite `gmgn-cli` sul backend, solo con comandi di lettura in whitelist. Swap e ordini non sono raggiungibili.
- Testo e metadati dei token sono trattati come dati: vengono sempre "escapati" e i link non http vengono scartati.
- Le memecoin sono estremamente rischiose. Usa il paper trading per misurare il sistema prima di pensare a capitale reale.

## Runner 24/7 su GitHub Actions (paper trading in avanti)

Il workflow `.github/workflows/runner.yml` esegue lo stesso desk senza interfaccia: parte ogni 5 minuti, ogni run dura circa 4,5 minuti, fa uno scan completo ogni 60 secondi e Charon controlla le posizioni ogni 30 secondi. In pratica gira di continuo, anche con l'iPhone in tasca.

- **Risultati:** branch `data` → `REPORT.md` (equity, win rate, profit factor, uscite per motivo, ultimi trade) e `journal.csv`.
- **Regole:** modifica `config.json` sul branch `data` (stesse chiavi di `DEFAULTS` in `engine.js`). Il cambio vale dal run successivo.
- **Reset:** cancella `state.json` sul branch `data`.
- **Secrets opzionali** (Settings → Secrets and variables → Actions): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GMGN_API_KEY`, `XAI_API_KEY`, `XAI_MODEL`. Con Telegram ricevi ogni acquisto e chiusura, più un riepilogo serale dopo le 21.
- **Avvio manuale:** Actions → KAISER runner → Run workflow.

Lo stato del runner è separato da quello della PWA: sono due conti paper distinti.
Il motore (`engine.js`) è condiviso, quindi una modifica alle regole vale per entrambi.

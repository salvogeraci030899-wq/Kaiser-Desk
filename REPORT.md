# KAISER · report paper trading

Aggiornato: 2026-11-23 12:39 UTC · in esecuzione da 0.6 giorni · 338 run

| | |
|---|---|
| Equity | **6.0000 SOL** (+0.0% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0000 SOL |
| Trade chiusi | 0 |
| Win rate | 0% |
| P&L realizzato | +0.0000 SOL (~$0.00) |
| Media vincite / perdite | +0.0% / +0.0% |
| Profit factor | 0.00 |
| Circuit breaker | no |

## Posizioni aperte
_nessuna_

## Test ingresso rapido (solo paper, quotazioni Jupiter)
Ipotesi: comprare 5 secondi dopo la creazione, tenere 30 secondi, vendere. Un token su 3, 0.05 SOL a operazione. Serie 2 dal 2026-11-22 11:02 UTC.
Regola decisa in anticipo: almeno 300 operazioni, netto medio >= +3% e limite inferiore dell'intervallo al 95% sopra zero.

| | |
|---|---|
| Esito | **non passa** (302 di 300 operazioni) · test concluso, non raccoglie piu |
| Netto medio per operazione | -22.1% (intervallo -31.2% / -13.0%) |
| Mediana / operazioni in utile | -14.3% / 12.6% |
| Quota dei guadagni dall'1% migliore | 50% |
| Token campionati / con rotta di acquisto | 303 / 302 (99.7%) |
| Tempo per ottenere la quotazione (mediana / 90%) | 5.0 s / 5.1 s |
| Senza rotta in acquisto / in vendita (perdita totale) | 1 / 40 |
| Motivi dell'assenza di rotta (Jupiter) | sell:NO_ROUTES_FOUND: 40; buy:NO_ROUTES_FOUND: 1 |
| Vendite riuscite solo con la rotta non limitata | 0 |
| Errori di rete (acquisto / vendita) / interrotte a fine run | 0 / 0 / 0 |

## Token migrati: costo reale e rendimento (solo paper, quotazioni Jupiter)
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 15:13 UTC.
Regola decisa in anticipo: orizzonte 300 s (gli altri sono solo descrittivi), almeno 300 token, netto medio >= +3% e limite inferiore al 95% sopra zero.

| | |
|---|---|
| Esito | **in corso** (4 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -12.9% (intervallo -30.8% / +5.1%), mediana -3.8%, in utile 0%, senza rotta 0 su 4 |
| Netto a 60 s | -16.2% (intervallo -70.9% / +38.5%), mediana +7.4%, in utile 50%, senza rotta 0 su 4 |
| Netto a 300 s (primario) | -8.8% (intervallo -76.9% / +59.2%), mediana -1.5%, in utile 50%, senza rotta 0 su 4 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 6.53% / 7.8 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 4 / 4 / 0 / 0 / 0 |

## Le tue decisioni: prese e scartate
Il paper e' il registro di cio' che decidi sugli avvisi di Telegram. Con Prendo si apre subito una posizione paper con le uscite impostate (netto di impatto, commissioni e priority fee); con Scarto si simula la stessa uscita con costi stimati dalla liquidita', per vedere cosa avresti ottenuto. Non c'e' nessun bot a parte.
Regola decisa in anticipo, sui tuoi Prendo chiusi: almeno 50, netto medio >= +3% con limite inferiore del 95% sopra zero. Il confronto con gli Scarto e' solo descrittivo.
Il conteggio parte dal 2026-11-23 09:12 UTC (primo run con id unici e senza blocco per slippage): le decisioni precedenti restano nel registro ma non contano.

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 0 di 50 |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 116621 lanci noti, 21941 creatori; 12 Coin in fascia alta viste (11 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 63, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 12 | 0 / 1 | 0 | n/d |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 52 / 50.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
12:39:07 ORACLE   314 raccolti, 244 analizzati, 2 BUY, 240 veto
12:38:44 ORACLE   302 raccolti, 227 analizzati, 2 BUY, 223 veto
12:38:23 ORACLE   300 raccolti, 227 analizzati, 2 BUY, 223 veto
12:38:01 ORACLE   282 raccolti, 215 analizzati, 2 BUY, 211 veto
12:37:39 ORACLE   277 raccolti, 211 analizzati, 2 BUY, 207 veto
12:37:18 ORACLE   273 raccolti, 207 analizzati, 2 BUY, 203 veto
12:36:56 ORACLE   255 raccolti, 192 analizzati, 2 BUY, 188 veto
12:36:34 ORACLE   249 raccolti, 186 analizzati, 3 BUY, 181 veto
12:36:13 ORACLE   247 raccolti, 175 analizzati, 3 BUY, 170 veto
12:35:50 ORACLE   228 raccolti, 169 analizzati, 3 BUY, 164 veto
12:35:28 ORACLE   222 raccolti, 161 analizzati, 2 BUY, 157 veto
12:35:07 ORACLE   219 raccolti, 160 analizzati, 2 BUY, 156 veto
12:35:05 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
12:34:45 ORACLE   203 raccolti, 146 analizzati, 2 BUY, 142 veto
12:34:23 ORACLE   197 raccolti, 139 analizzati, 3 BUY, 135 veto
12:34:02 ORACLE   195 raccolti, 138 analizzati, 3 BUY, 134 veto
12:34:00 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
12:34:00 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
12:34:00 KAISER   run #338 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
12:34:00 CREATORI memoria: 116539 lanci, 21927 creatori, 12 Coin in fascia alta
12:33:39 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
12:33:37 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 282 veto
12:33:16 ORACLE   360 raccolti, 289 analizzati, 2 BUY, 285 veto
12:32:54 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 280 veto
12:32:32 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 283 veto
12:32:10 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 283 veto
12:31:47 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 286 veto
12:31:26 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 283 veto
12:31:04 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 283 veto
12:30:42 ORACLE   360 raccolti, 289 analizzati, 4 BUY, 284 veto
12:30:19 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
12:29:57 ORACLE   360 raccolti, 286 analizzati, 4 BUY, 281 veto
12:29:35 ORACLE   360 raccolti, 286 analizzati, 4 BUY, 281 veto
12:29:13 ORACLE   360 raccolti, 285 analizzati, 5 BUY, 280 veto
12:28:51 ORACLE   360 raccolti, 287 analizzati, 5 BUY, 282 veto
12:28:29 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 282 veto
12:28:07 ORACLE   360 raccolti, 283 analizzati, 4 BUY, 278 veto
12:27:44 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 286 veto
12:27:22 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 285 veto
12:27:00 ORACLE   360 raccolti, 284 analizzati, 4 BUY, 279 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

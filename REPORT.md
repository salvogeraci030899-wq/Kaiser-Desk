# KAISER · report paper trading

Aggiornato: 2026-11-25 05:47 UTC · in esecuzione da 2.3 giorni · 387 run

| | |
|---|---|
| Equity | **6.0729 SOL** (+1.2% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0729 SOL |
| Trade chiusi | 8 |
| Win rate | 50% |
| P&L realizzato | +0.0729 SOL (~$5.00) |
| Media vincite / perdite | +29.9% / -14.8% |
| Profit factor | 2.01 |
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
| Prendo chiusi | 8 di 50, netto medio +7.6% (intervallo -12.5% / +27.6%), in utile 50% |
| Scarto simulati chiusi | 5, netto medio +20.3% (intervallo -37.8% / +78.4%), in utile 40%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | -12.7% (-74.2%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 187482 lanci noti, 34827 creatori; 36 Coin in fascia alta viste (30 creatori), 12 raddoppiate (9 creatori). Creatore trovato: tabella 62, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 29 | 7 / 5 | 7 | +11.5% |
| 1M-2M | 12 | 2 / 1 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 8 / 7.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 2 | -0.0471 |
| Chiusura manuale (app) | 5 | +0.0454 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $4CHAN | 56 | -19.6% | -0.0241 | +0% | -13% | Chiusura manuale (app) | 7m |
| $cateball | 81 | +61.4% | +0.0746 | +111% | +54% | Trailing stop | 13m |
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
05:47:40 ORACLE   360 raccolti, 280 analizzati, 3 BUY, 276 veto
05:47:18 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 271 veto
05:46:55 ORACLE   360 raccolti, 278 analizzati, 2 BUY, 274 veto
05:46:33 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 280 veto
05:46:10 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 275 veto
05:45:47 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 275 veto
05:45:24 ORACLE   360 raccolti, 267 analizzati, 2 BUY, 263 veto
05:45:02 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 267 veto
05:44:39 ORACLE   356 raccolti, 278 analizzati, 2 BUY, 274 veto
05:44:16 ORACLE   350 raccolti, 271 analizzati, 2 BUY, 267 veto
05:44:04 ORACLE   348 raccolti, 266 analizzati, 2 BUY, 262 veto
05:43:39 ORACLE   318 raccolti, 243 analizzati, 0 BUY, 242 veto
05:43:17 ORACLE   313 raccolti, 233 analizzati, 0 BUY, 232 veto
05:42:56 ORACLE   310 raccolti, 229 analizzati, 0 BUY, 228 veto
05:42:33 ORACLE   291 raccolti, 215 analizzati, 0 BUY, 214 veto
05:42:12 ORACLE   285 raccolti, 209 analizzati, 0 BUY, 208 veto
05:41:50 ORACLE   279 raccolti, 205 analizzati, 0 BUY, 204 veto
05:41:28 ORACLE   261 raccolti, 187 analizzati, 0 BUY, 186 veto
05:41:07 ORACLE   250 raccolti, 179 analizzati, 0 BUY, 178 veto
05:40:46 ORACLE   248 raccolti, 179 analizzati, 0 BUY, 178 veto
05:40:24 ORACLE   236 raccolti, 166 analizzati, 0 BUY, 165 veto
05:40:03 ORACLE   227 raccolti, 151 analizzati, 0 BUY, 150 veto
05:39:42 ORACLE   222 raccolti, 151 analizzati, 0 BUY, 150 veto
05:39:21 ORACLE   196 raccolti, 134 analizzati, 0 BUY, 133 veto
05:38:59 ORACLE   190 raccolti, 120 analizzati, 0 BUY, 119 veto
05:38:39 ORACLE   189 raccolti, 120 analizzati, 0 BUY, 119 veto
05:38:17 ORACLE   170 raccolti, 107 analizzati, 0 BUY, 106 veto
05:37:56 ORACLE   162 raccolti, 96 analizzati, 0 BUY, 95 veto
05:37:35 ORACLE   159 raccolti, 96 analizzati, 0 BUY, 95 veto
05:37:34 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
05:37:34 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
05:37:34 SCOUT    gecko trend: HTTP 429 (riuso l'ultimo elenco)
05:37:34 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
05:37:34 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
05:37:34 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
05:37:33 KAISER   run #387 · 0 posizioni · equity 6.0729 SOL · GMGN spenta (nessuna chiave) · Grok off
05:37:33 CREATORI memoria: 187267 lanci, 34795 creatori, 36 Coin in fascia alta
05:37:10 SCRIBE   fine run · trade 8 · win 50% · P&L 0.0729 SOL · equity 6.0729 SOL
05:36:59 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 280 veto
05:36:37 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 283 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

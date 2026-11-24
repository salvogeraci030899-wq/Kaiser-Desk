# KAISER · report paper trading

Aggiornato: 2026-11-24 13:52 UTC · in esecuzione da 1.7 giorni · 368 run

| | |
|---|---|
| Equity | **6.0970 SOL** (+1.6% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0970 SOL |
| Trade chiusi | 7 |
| Win rate | 57% |
| P&L realizzato | +0.0970 SOL (~$6.78) |
| Media vincite / perdite | +29.9% / -13.2% |
| Profit factor | 3.02 |
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
| Prendo chiusi | 7 di 50, netto medio +11.4% (intervallo -10.0% / +32.9%), in utile 57.1% |
| Scarto simulati chiusi | 3, netto medio +14.4% (intervallo -72.6% / +101.5%), in utile 33.3%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | -3.0% (-92.6%) |
| Avvisi senza risposta | 26 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 160421 lanci noti, 29891 creatori; 28 Coin in fascia alta viste (23 creatori), 7 raddoppiate (5 creatori). Creatore trovato: tabella 65, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 24 | 7 / 4 | 7 | +11.5% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 13 / 10.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 2 | -0.0471 |
| Chiusura manuale (app) | 4 | +0.0695 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $cateball | 81 | +61.4% | +0.0746 | +111% | +54% | Trailing stop | 13m |
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
13:52:19 ORACLE   360 raccolti, 287 analizzati, 1 BUY, 285 veto
13:51:56 ORACLE   360 raccolti, 293 analizzati, 1 BUY, 291 veto
13:51:34 ORACLE   360 raccolti, 293 analizzati, 1 BUY, 291 veto
13:51:11 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 283 veto
13:51:09 SCOUT    gecko trend: HTTP 429 (riuso l'ultimo elenco)
13:50:48 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 288 veto
13:50:25 ORACLE   360 raccolti, 289 analizzati, 2 BUY, 287 veto
13:50:02 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 288 veto
13:49:39 ORACLE   360 raccolti, 296 analizzati, 2 BUY, 293 veto
13:49:16 ORACLE   360 raccolti, 289 analizzati, 1 BUY, 287 veto
13:48:54 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 284 veto
13:48:31 ORACLE   360 raccolti, 289 analizzati, 2 BUY, 286 veto
13:48:07 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 280 veto
13:47:44 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 282 veto
13:47:21 ORACLE   346 raccolti, 269 analizzati, 2 BUY, 266 veto
13:46:58 ORACLE   337 raccolti, 261 analizzati, 2 BUY, 258 veto
13:46:35 ORACLE   332 raccolti, 255 analizzati, 2 BUY, 252 veto
13:46:11 ORACLE   307 raccolti, 235 analizzati, 2 BUY, 232 veto
13:45:48 ORACLE   297 raccolti, 227 analizzati, 2 BUY, 224 veto
13:45:26 ORACLE   293 raccolti, 224 analizzati, 2 BUY, 221 veto
13:45:04 ORACLE   270 raccolti, 206 analizzati, 2 BUY, 203 veto
13:44:41 ORACLE   264 raccolti, 202 analizzati, 2 BUY, 200 veto
13:44:19 ORACLE   261 raccolti, 199 analizzati, 2 BUY, 197 veto
13:43:56 ORACLE   244 raccolti, 182 analizzati, 2 BUY, 180 veto
13:43:34 ORACLE   229 raccolti, 169 analizzati, 2 BUY, 167 veto
13:43:12 ORACLE   228 raccolti, 166 analizzati, 1 BUY, 165 veto
13:42:49 ORACLE   206 raccolti, 160 analizzati, 1 BUY, 159 veto
13:42:28 ORACLE   195 raccolti, 148 analizzati, 1 BUY, 147 veto
13:42:07 ORACLE   195 raccolti, 148 analizzati, 1 BUY, 147 veto
13:42:05 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
13:42:04 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
13:42:04 KAISER   run #368 · 0 posizioni · equity 6.0970 SOL · GMGN spenta (nessuna chiave) · Grok off
13:42:04 CREATORI memoria: 160169 lanci, 29821 creatori, 28 Coin in fascia alta
13:41:48 SCRIBE   fine run · trade 7 · win 57% · P&L 0.0970 SOL · equity 6.0970 SOL
13:41:40 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 292 veto
13:41:18 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 285 veto
13:40:55 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 291 veto
13:40:32 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 282 veto
13:40:09 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 284 veto
13:40:07 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
```

Regole attive: config.json su questo branch. Solo paper trading.

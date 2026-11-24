# KAISER · report paper trading

Aggiornato: 2026-11-24 18:54 UTC · in esecuzione da 1.9 giorni · 374 run

| | |
|---|---|
| Equity | **6.0970 SOL** (+1.6% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0970 SOL |
| Trade chiusi | 7 |
| Win rate | 57% |
| P&L realizzato | +0.0970 SOL (~$6.74) |
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
Memoria: 169632 lanci noti, 31605 creatori; 28 Coin in fascia alta viste (23 creatori), 7 raddoppiate (5 creatori). Creatore trovato: tabella 116, richiesta esterna 0, sconosciuto 0.
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
18:54:11 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 278 veto
18:53:47 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 274 veto
18:53:35 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
18:53:09 ORACLE   360 raccolti, 277 analizzati, 3 BUY, 273 veto
18:52:47 ORACLE   360 raccolti, 270 analizzati, 3 BUY, 266 veto
18:52:24 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 270 veto
18:52:12 ORACLE   360 raccolti, 265 analizzati, 3 BUY, 261 veto
18:51:47 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 274 veto
18:51:22 ORACLE   360 raccolti, 269 analizzati, 3 BUY, 265 veto
18:51:10 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
18:50:43 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 263 veto
18:50:20 ORACLE   360 raccolti, 277 analizzati, 3 BUY, 273 veto
18:49:56 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 270 veto
18:49:32 ORACLE   360 raccolti, 279 analizzati, 3 BUY, 275 veto
18:49:10 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
18:48:46 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
18:48:23 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 274 veto
18:47:59 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 268 veto
18:47:37 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 258 veto
18:47:14 ORACLE   331 raccolti, 256 analizzati, 3 BUY, 252 veto
18:46:51 ORACLE   320 raccolti, 240 analizzati, 3 BUY, 236 veto
18:46:29 ORACLE   309 raccolti, 224 analizzati, 3 BUY, 220 veto
18:46:16 ORACLE   302 raccolti, 219 analizzati, 3 BUY, 215 veto
18:45:51 ORACLE   266 raccolti, 201 analizzati, 3 BUY, 197 veto
18:45:27 ORACLE   259 raccolti, 181 analizzati, 3 BUY, 177 veto
18:45:06 ORACLE   257 raccolti, 180 analizzati, 3 BUY, 176 veto
18:44:43 ORACLE   219 raccolti, 157 analizzati, 3 BUY, 153 veto
18:44:19 ORACLE   204 raccolti, 144 analizzati, 3 BUY, 140 veto
18:44:08 ORACLE   204 raccolti, 144 analizzati, 3 BUY, 140 veto
18:44:03 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
18:44:03 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
18:44:03 KAISER   run #374 · 0 posizioni · equity 6.0970 SOL · GMGN spenta (nessuna chiave) · Grok off
18:44:03 CREATORI memoria: 169310 lanci, 31530 creatori, 28 Coin in fascia alta
18:43:49 SCRIBE   fine run · trade 7 · win 57% · P&L 0.0970 SOL · equity 6.0970 SOL
18:43:44 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 268 veto
18:43:21 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 278 veto
18:42:59 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 274 veto
18:42:37 ORACLE   360 raccolti, 279 analizzati, 3 BUY, 275 veto
18:42:25 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
18:41:59 ORACLE   360 raccolti, 277 analizzati, 3 BUY, 273 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

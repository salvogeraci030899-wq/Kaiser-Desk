# KAISER · report paper trading

Aggiornato: 2026-11-24 02:58 UTC · in esecuzione da 1.2 giorni · 355 run

| | |
|---|---|
| Equity | **6.0224 SOL** (+0.4% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0224 SOL |
| Trade chiusi | 6 |
| Win rate | 50% |
| P&L realizzato | +0.0224 SOL (~$1.59) |
| Media vincite / perdite | +19.4% / -13.2% |
| Profit factor | 1.47 |
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
| Prendo chiusi | 6 di 50, netto medio +3.1% (intervallo -13.3% / +19.5%), in utile 50% |
| Scarto simulati chiusi | 2, netto medio -29.9% (intervallo -41.4% / -18.3%), in utile 0%; ancora aperti 1 |
| Prendo meno Scarto (limite inferiore) | +33.0% (+12.9%) |
| Avvisi senza risposta | 26 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 147183 lanci noti, 27691 creatori; 26 Coin in fascia alta viste (21 creatori), 6 raddoppiate (5 creatori). Creatore trovato: tabella 103, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 23 | 6 / 4 | 6 | +3.1% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 8 / 7.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 2 | -0.0471 |
| Chiusura manuale (app) | 4 | +0.0695 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
02:58:47 ORACLE   360 raccolti, 238 analizzati, 4 BUY, 234 veto
02:58:24 ORACLE   360 raccolti, 251 analizzati, 4 BUY, 247 veto
02:58:02 ORACLE   360 raccolti, 249 analizzati, 4 BUY, 245 veto
02:57:40 ORACLE   360 raccolti, 249 analizzati, 4 BUY, 245 veto
02:57:16 ORACLE   360 raccolti, 258 analizzati, 4 BUY, 254 veto
02:56:54 ORACLE   360 raccolti, 250 analizzati, 4 BUY, 246 veto
02:56:31 ORACLE   360 raccolti, 255 analizzati, 4 BUY, 251 veto
02:56:09 ORACLE   360 raccolti, 268 analizzati, 4 BUY, 264 veto
02:55:45 ORACLE   360 raccolti, 267 analizzati, 4 BUY, 263 veto
02:55:23 ORACLE   360 raccolti, 264 analizzati, 4 BUY, 260 veto
02:54:59 ORACLE   360 raccolti, 264 analizzati, 4 BUY, 260 veto
02:54:37 ORACLE   355 raccolti, 260 analizzati, 4 BUY, 256 veto
02:54:14 ORACLE   349 raccolti, 250 analizzati, 4 BUY, 246 veto
02:53:51 ORACLE   330 raccolti, 237 analizzati, 4 BUY, 233 veto
02:53:28 ORACLE   320 raccolti, 226 analizzati, 4 BUY, 222 veto
02:53:05 ORACLE   316 raccolti, 222 analizzati, 4 BUY, 218 veto
02:52:43 ORACLE   294 raccolti, 209 analizzati, 4 BUY, 205 veto
02:52:21 ORACLE   280 raccolti, 202 analizzati, 3 BUY, 199 veto
02:52:00 ORACLE   280 raccolti, 202 analizzati, 3 BUY, 199 veto
02:51:38 ORACLE   263 raccolti, 186 analizzati, 3 BUY, 183 veto
02:51:15 ORACLE   257 raccolti, 182 analizzati, 3 BUY, 179 veto
02:50:54 ORACLE   251 raccolti, 178 analizzati, 3 BUY, 175 veto
02:50:31 ORACLE   238 raccolti, 165 analizzati, 3 BUY, 162 veto
02:50:09 ORACLE   227 raccolti, 153 analizzati, 3 BUY, 150 veto
02:49:48 ORACLE   225 raccolti, 151 analizzati, 3 BUY, 148 veto
02:49:26 ORACLE   206 raccolti, 144 analizzati, 3 BUY, 141 veto
02:49:04 ORACLE   196 raccolti, 130 analizzati, 4 BUY, 126 veto
02:48:43 ORACLE   193 raccolti, 130 analizzati, 4 BUY, 126 veto
02:48:39 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
02:48:38 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
02:48:38 KAISER   run #355 · 0 posizioni · equity 6.0224 SOL · GMGN spenta (nessuna chiave) · Grok off
02:48:38 CREATORI memoria: 146960 lanci, 27666 creatori, 26 Coin in fascia alta
02:48:13 SCRIBE   fine run · trade 6 · win 50% · P&L 0.0224 SOL · equity 6.0224 SOL
02:48:12 ORACLE   360 raccolti, 263 analizzati, 4 BUY, 259 veto
02:48:10 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
02:47:50 ORACLE   360 raccolti, 273 analizzati, 4 BUY, 269 veto
02:47:28 ORACLE   360 raccolti, 271 analizzati, 3 BUY, 268 veto
02:47:06 ORACLE   360 raccolti, 265 analizzati, 3 BUY, 262 veto
02:46:44 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 270 veto
02:46:22 ORACLE   360 raccolti, 279 analizzati, 4 BUY, 275 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

# KAISER · report paper trading

Aggiornato: 2026-11-23 17:40 UTC · in esecuzione da 0.8 giorni · 344 run

| | |
|---|---|
| Equity | **6.0068 SOL** (+0.1% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0068 SOL |
| Trade chiusi | 2 |
| Win rate | 50% |
| P&L realizzato | +0.0068 SOL (~$0.50) |
| Media vincite / perdite | +29.1% / -23.3% |
| Profit factor | 1.24 |
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
| Prendo chiusi | 2 di 50, netto medio +2.9% (intervallo -48.4% / +54.2%), in utile 50% |
| Scarto simulati chiusi | 1, netto medio -35.8%, in utile 0%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +38.7% |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 128377 lanci noti, 23786 creatori; 15 Coin in fascia alta viste (14 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 56, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 15 | 2 / 2 | 2 | +2.9% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 55 / 53.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 1 | -0.0282 |
| Chiusura manuale (app) | 1 | +0.0350 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
17:40:45 ORACLE   360 raccolti, 246 analizzati, 4 BUY, 242 veto
17:40:22 ORACLE   360 raccolti, 239 analizzati, 4 BUY, 235 veto
17:39:58 ORACLE   360 raccolti, 251 analizzati, 4 BUY, 247 veto
17:39:35 ORACLE   360 raccolti, 247 analizzati, 4 BUY, 243 veto
17:39:13 ORACLE   360 raccolti, 245 analizzati, 4 BUY, 241 veto
17:38:50 ORACLE   360 raccolti, 243 analizzati, 4 BUY, 239 veto
17:38:28 ORACLE   360 raccolti, 245 analizzati, 4 BUY, 241 veto
17:38:06 ORACLE   358 raccolti, 247 analizzati, 4 BUY, 243 veto
17:37:43 ORACLE   324 raccolti, 229 analizzati, 4 BUY, 225 veto
17:37:20 ORACLE   306 raccolti, 207 analizzati, 4 BUY, 203 veto
17:36:58 ORACLE   301 raccolti, 193 analizzati, 4 BUY, 189 veto
17:36:36 ORACLE   232 raccolti, 153 analizzati, 4 BUY, 149 veto
17:36:14 ORACLE   215 raccolti, 140 analizzati, 4 BUY, 136 veto
17:35:51 ORACLE   210 raccolti, 117 analizzati, 4 BUY, 113 veto
17:35:47 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
17:35:47 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
17:35:46 KAISER   run #344 · 0 posizioni · equity 6.0068 SOL · GMGN spenta (nessuna chiave) · Grok off
17:35:46 CREATORI memoria: 128146 lanci, 23750 creatori, 15 Coin in fascia alta
17:35:29 SCRIBE   fine run · trade 2 · win 50% · P&L 0.0068 SOL · equity 6.0068 SOL
17:35:12 ORACLE   360 raccolti, 267 analizzati, 4 BUY, 263 veto
17:34:48 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 265 veto
17:34:25 ORACLE   360 raccolti, 270 analizzati, 4 BUY, 266 veto
17:34:02 ORACLE   360 raccolti, 263 analizzati, 4 BUY, 259 veto
17:33:39 ORACLE   360 raccolti, 270 analizzati, 4 BUY, 266 veto
17:33:17 ORACLE   360 raccolti, 275 analizzati, 4 BUY, 271 veto
17:32:54 ORACLE   360 raccolti, 261 analizzati, 4 BUY, 257 veto
17:32:30 ORACLE   360 raccolti, 267 analizzati, 4 BUY, 263 veto
17:32:07 ORACLE   360 raccolti, 266 analizzati, 4 BUY, 262 veto
17:31:43 ORACLE   360 raccolti, 253 analizzati, 4 BUY, 249 veto
17:31:20 ORACLE   360 raccolti, 256 analizzati, 4 BUY, 252 veto
17:30:56 ORACLE   360 raccolti, 250 analizzati, 5 BUY, 245 veto
17:30:33 ORACLE   360 raccolti, 230 analizzati, 5 BUY, 225 veto
17:30:09 ORACLE   360 raccolti, 245 analizzati, 5 BUY, 240 veto
17:29:46 ORACLE   360 raccolti, 241 analizzati, 5 BUY, 236 veto
17:29:23 ORACLE   360 raccolti, 235 analizzati, 4 BUY, 231 veto
17:28:59 ORACLE   360 raccolti, 249 analizzati, 4 BUY, 245 veto
17:28:37 ORACLE   360 raccolti, 247 analizzati, 4 BUY, 243 veto
17:28:14 ORACLE   360 raccolti, 248 analizzati, 4 BUY, 244 veto
17:27:51 ORACLE   360 raccolti, 246 analizzati, 3 BUY, 242 veto
17:27:28 ORACLE   360 raccolti, 232 analizzati, 3 BUY, 228 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

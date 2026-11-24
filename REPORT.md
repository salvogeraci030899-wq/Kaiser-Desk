# KAISER · report paper trading

Aggiornato: 2026-11-24 05:24 UTC · in esecuzione da 1.3 giorni · 358 run

| | |
|---|---|
| Equity | **6.0224 SOL** (+0.4% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0224 SOL |
| Trade chiusi | 6 |
| Win rate | 50% |
| P&L realizzato | +0.0224 SOL (~$1.61) |
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
| Scarto simulati chiusi | 3, netto medio +14.4% (intervallo -72.6% / +101.5%), in utile 33.3%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | -11.3% (-99.9%) |
| Avvisi senza risposta | 26 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 150239 lanci noti, 28164 creatori; 26 Coin in fascia alta viste (21 creatori), 7 raddoppiate (5 creatori). Creatore trovato: tabella 30, richiesta esterna 0, sconosciuto 0.
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
05:24:38 ORACLE   316 raccolti, 233 analizzati, 1 BUY, 231 veto
05:24:14 ORACLE   305 raccolti, 233 analizzati, 1 BUY, 231 veto
05:23:52 ORACLE   299 raccolti, 228 analizzati, 1 BUY, 226 veto
05:23:29 ORACLE   278 raccolti, 214 analizzati, 1 BUY, 212 veto
05:23:06 ORACLE   276 raccolti, 209 analizzati, 1 BUY, 207 veto
05:22:45 ORACLE   273 raccolti, 209 analizzati, 1 BUY, 207 veto
05:22:23 ORACLE   263 raccolti, 195 analizzati, 1 BUY, 193 veto
05:22:01 ORACLE   257 raccolti, 186 analizzati, 1 BUY, 184 veto
05:21:40 ORACLE   255 raccolti, 186 analizzati, 1 BUY, 184 veto
05:21:17 ORACLE   241 raccolti, 180 analizzati, 1 BUY, 178 veto
05:20:55 ORACLE   231 raccolti, 165 analizzati, 1 BUY, 163 veto
05:20:34 ORACLE   227 raccolti, 155 analizzati, 1 BUY, 153 veto
05:20:12 ORACLE   204 raccolti, 145 analizzati, 1 BUY, 143 veto
05:19:50 ORACLE   196 raccolti, 138 analizzati, 1 BUY, 136 veto
05:19:28 ORACLE   195 raccolti, 136 analizzati, 1 BUY, 134 veto
05:19:25 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
05:19:25 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
05:19:25 KAISER   run #358 · 0 posizioni · equity 6.0224 SOL · GMGN spenta (nessuna chiave) · Grok off
05:19:25 CREATORI memoria: 150147 lanci, 28149 creatori, 26 Coin in fascia alta
05:19:09 SCRIBE   fine run · trade 6 · win 50% · P&L 0.0224 SOL · equity 6.0224 SOL
05:18:59 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 262 veto
05:18:36 ORACLE   360 raccolti, 260 analizzati, 1 BUY, 258 veto
05:18:13 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 261 veto
05:17:51 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 262 veto
05:17:28 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 260 veto
05:17:05 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 259 veto
05:16:43 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 252 veto
05:16:19 ORACLE   360 raccolti, 265 analizzati, 1 BUY, 263 veto
05:15:56 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 264 veto
05:15:34 ORACLE   360 raccolti, 260 analizzati, 1 BUY, 258 veto
05:15:10 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 271 veto
05:14:47 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 259 veto
05:14:25 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 257 veto
05:14:02 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 272 veto
05:13:39 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 257 veto
05:13:17 ORACLE   360 raccolti, 265 analizzati, 1 BUY, 263 veto
05:12:54 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 271 veto
05:12:31 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 275 veto
05:12:08 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 275 veto
05:11:45 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 273 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

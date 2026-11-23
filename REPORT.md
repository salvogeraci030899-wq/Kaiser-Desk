# KAISER · report paper trading

Aggiornato: 2026-11-23 21:52 UTC · in esecuzione da 1.0 giorni · 349 run

| | |
|---|---|
| Equity | **6.0322 SOL** (+0.5% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0322 SOL |
| Trade chiusi | 4 |
| Win rate | 50% |
| P&L realizzato | +0.0322 SOL (~$2.32) |
| Media vincite / perdite | +25.4% / -12.0% |
| Profit factor | 2.11 |
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
| Prendo chiusi | 4 di 50, netto medio +6.7% (intervallo -16.5% / +29.9%), in utile 50% |
| Scarto simulati chiusi | 1, netto medio -35.8%, in utile 0%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +42.5% |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 138637 lanci noti, 26025 creatori; 18 Coin in fascia alta viste (15 creatori), 3 raddoppiate (3 creatori). Creatore trovato: tabella 42, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 17 | 4 / 2 | 4 | +6.7% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 58 / 56.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 1 | -0.0282 |
| Chiusura manuale (app) | 3 | +0.0604 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
21:51:59 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 251 veto
21:51:36 ORACLE   360 raccolti, 246 analizzati, 1 BUY, 243 veto
21:51:13 ORACLE   360 raccolti, 253 analizzati, 1 BUY, 250 veto
21:50:50 ORACLE   360 raccolti, 253 analizzati, 1 BUY, 250 veto
21:50:28 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 237 veto
21:50:04 ORACLE   344 raccolti, 241 analizzati, 1 BUY, 238 veto
21:49:41 ORACLE   335 raccolti, 220 analizzati, 1 BUY, 217 veto
21:49:19 ORACLE   328 raccolti, 218 analizzati, 1 BUY, 215 veto
21:48:56 ORACLE   298 raccolti, 187 analizzati, 2 BUY, 184 veto
21:48:34 ORACLE   286 raccolti, 187 analizzati, 2 BUY, 184 veto
21:48:11 ORACLE   273 raccolti, 168 analizzati, 2 BUY, 165 veto
21:47:48 ORACLE   238 raccolti, 150 analizzati, 2 BUY, 147 veto
21:47:27 ORACLE   223 raccolti, 148 analizzati, 2 BUY, 145 veto
21:47:05 ORACLE   220 raccolti, 136 analizzati, 2 BUY, 133 veto
21:47:02 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
21:47:02 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
21:47:01 KAISER   run #349 · 0 posizioni · equity 6.0322 SOL · GMGN spenta (nessuna chiave) · Grok off
21:47:01 CREATORI memoria: 138464 lanci, 25985 creatori, 18 Coin in fascia alta
21:46:47 SCRIBE   fine run · trade 4 · win 50% · P&L 0.0322 SOL · equity 6.0322 SOL
21:46:38 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 239 veto
21:46:15 ORACLE   360 raccolti, 236 analizzati, 2 BUY, 233 veto
21:45:53 ORACLE   360 raccolti, 234 analizzati, 2 BUY, 231 veto
21:45:31 ORACLE   360 raccolti, 227 analizzati, 2 BUY, 224 veto
21:45:28 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
21:45:07 ORACLE   360 raccolti, 240 analizzati, 2 BUY, 237 veto
21:44:43 ORACLE   360 raccolti, 237 analizzati, 2 BUY, 234 veto
21:44:21 ORACLE   360 raccolti, 239 analizzati, 2 BUY, 236 veto
21:43:58 ORACLE   360 raccolti, 241 analizzati, 1 BUY, 238 veto
21:43:36 ORACLE   360 raccolti, 243 analizzati, 1 BUY, 240 veto
21:43:14 ORACLE   360 raccolti, 227 analizzati, 1 BUY, 224 veto
21:42:52 ORACLE   360 raccolti, 237 analizzati, 1 BUY, 234 veto
21:42:30 ORACLE   360 raccolti, 250 analizzati, 1 BUY, 247 veto
21:42:07 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 237 veto
21:41:45 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 251 veto
21:41:22 ORACLE   360 raccolti, 260 analizzati, 1 BUY, 257 veto
21:41:00 ORACLE   360 raccolti, 251 analizzati, 1 BUY, 248 veto
21:40:37 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 259 veto
21:40:15 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 268 veto
21:39:53 ORACLE   360 raccolti, 256 analizzati, 1 BUY, 253 veto
21:39:30 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 277 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

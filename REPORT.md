# KAISER · report paper trading

Aggiornato: 2026-11-23 11:03 UTC · in esecuzione da 0.6 giorni · 336 run

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
Memoria: 114741 lanci noti, 21627 creatori; 12 Coin in fascia alta viste (11 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 135, richiesta esterna 0, sconosciuto 0.
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
11:03:25 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 287 veto
11:03:02 ORACLE   360 raccolti, 292 analizzati, 4 BUY, 288 veto
11:02:40 ORACLE   360 raccolti, 292 analizzati, 4 BUY, 288 veto
11:02:18 ORACLE   360 raccolti, 282 analizzati, 4 BUY, 278 veto
11:01:56 ORACLE   360 raccolti, 294 analizzati, 4 BUY, 290 veto
11:01:33 ORACLE   360 raccolti, 293 analizzati, 4 BUY, 288 veto
11:01:11 ORACLE   360 raccolti, 286 analizzati, 4 BUY, 281 veto
11:00:48 ORACLE   360 raccolti, 295 analizzati, 4 BUY, 290 veto
11:00:26 ORACLE   360 raccolti, 295 analizzati, 4 BUY, 290 veto
11:00:03 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 285 veto
10:59:41 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 285 veto
10:59:18 ORACLE   360 raccolti, 293 analizzati, 4 BUY, 288 veto
10:58:55 ORACLE   360 raccolti, 284 analizzati, 4 BUY, 279 veto
10:58:32 ORACLE   349 raccolti, 282 analizzati, 4 BUY, 277 veto
10:58:08 ORACLE   336 raccolti, 267 analizzati, 4 BUY, 262 veto
10:57:46 ORACLE   330 raccolti, 257 analizzati, 4 BUY, 252 veto
10:57:23 ORACLE   314 raccolti, 249 analizzati, 4 BUY, 244 veto
10:57:01 ORACLE   305 raccolti, 237 analizzati, 4 BUY, 232 veto
10:56:39 ORACLE   301 raccolti, 233 analizzati, 4 BUY, 228 veto
10:56:16 ORACLE   283 raccolti, 219 analizzati, 4 BUY, 214 veto
10:55:55 ORACLE   272 raccolti, 205 analizzati, 4 BUY, 200 veto
10:55:32 ORACLE   263 raccolti, 197 analizzati, 4 BUY, 192 veto
10:55:10 ORACLE   244 raccolti, 190 analizzati, 4 BUY, 185 veto
10:54:47 ORACLE   234 raccolti, 178 analizzati, 4 BUY, 173 veto
10:54:26 ORACLE   232 raccolti, 172 analizzati, 4 BUY, 167 veto
10:54:04 ORACLE   214 raccolti, 162 analizzati, 4 BUY, 157 veto
10:53:42 ORACLE   207 raccolti, 146 analizzati, 4 BUY, 141 veto
10:53:20 ORACLE   204 raccolti, 146 analizzati, 4 BUY, 141 veto
10:53:17 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
10:53:17 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
10:53:17 KAISER   run #336 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
10:53:17 CREATORI memoria: 114514 lanci, 21589 creatori, 12 Coin in fascia alta
10:53:03 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
10:52:46 ORACLE   360 raccolti, 302 analizzati, 4 BUY, 297 veto
10:52:23 ORACLE   360 raccolti, 298 analizzati, 4 BUY, 293 veto
10:51:59 ORACLE   360 raccolti, 296 analizzati, 4 BUY, 291 veto
10:51:37 ORACLE   360 raccolti, 294 analizzati, 4 BUY, 289 veto
10:51:15 ORACLE   360 raccolti, 292 analizzati, 4 BUY, 287 veto
10:50:53 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 286 veto
10:50:31 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 286 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

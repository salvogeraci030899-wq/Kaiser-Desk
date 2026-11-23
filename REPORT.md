# KAISER · report paper trading

Aggiornato: 2026-11-23 05:22 UTC · in esecuzione da 0.3 giorni · 328 run

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

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 0 di 50 |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 108099 lanci noti, 20738 creatori; 10 Coin in fascia alta viste (10 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 58, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 11 | 0 / 0 | 0 | n/d |
| 1M-2M | 8 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 43 / 41.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
05:22:24 ORACLE   360 raccolti, 288 analizzati, 1 BUY, 286 veto
05:22:02 ORACLE   360 raccolti, 284 analizzati, 1 BUY, 282 veto
05:21:41 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 283 veto
05:21:19 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 281 veto
05:20:58 ORACLE   360 raccolti, 278 analizzati, 1 BUY, 276 veto
05:20:36 ORACLE   360 raccolti, 290 analizzati, 1 BUY, 288 veto
05:20:14 ORACLE   360 raccolti, 289 analizzati, 1 BUY, 287 veto
05:19:53 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 279 veto
05:19:31 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 284 veto
05:19:10 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 283 veto
05:18:48 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 274 veto
05:18:27 ORACLE   360 raccolti, 288 analizzati, 1 BUY, 286 veto
05:18:05 ORACLE   360 raccolti, 287 analizzati, 1 BUY, 285 veto
05:17:43 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 279 veto
05:17:22 ORACLE   345 raccolti, 274 analizzati, 1 BUY, 272 veto
05:17:00 ORACLE   332 raccolti, 259 analizzati, 1 BUY, 257 veto
05:16:39 ORACLE   325 raccolti, 253 analizzati, 1 BUY, 251 veto
05:16:17 ORACLE   305 raccolti, 242 analizzati, 1 BUY, 240 veto
05:15:56 ORACLE   294 raccolti, 225 analizzati, 1 BUY, 223 veto
05:15:35 ORACLE   287 raccolti, 222 analizzati, 1 BUY, 220 veto
05:15:13 ORACLE   266 raccolti, 201 analizzati, 1 BUY, 199 veto
05:14:52 ORACLE   255 raccolti, 201 analizzati, 1 BUY, 199 veto
05:14:31 ORACLE   251 raccolti, 194 analizzati, 1 BUY, 192 veto
05:14:09 ORACLE   234 raccolti, 179 analizzati, 1 BUY, 177 veto
05:13:47 ORACLE   226 raccolti, 171 analizzati, 1 BUY, 169 veto
05:13:26 ORACLE   222 raccolti, 165 analizzati, 1 BUY, 163 veto
05:13:25 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
05:13:05 ORACLE   201 raccolti, 150 analizzati, 1 BUY, 148 veto
05:12:44 ORACLE   194 raccolti, 129 analizzati, 1 BUY, 127 veto
05:12:23 ORACLE   190 raccolti, 129 analizzati, 1 BUY, 127 veto
05:12:21 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
05:12:21 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
05:12:21 KAISER   run #328 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
05:12:21 CREATORI memoria: 107859 lanci, 20709 creatori, 10 Coin in fascia alta
05:12:02 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
05:11:47 ORACLE   360 raccolti, 297 analizzati, 1 BUY, 295 veto
05:11:25 ORACLE   360 raccolti, 302 analizzati, 1 BUY, 300 veto
05:11:02 ORACLE   360 raccolti, 304 analizzati, 1 BUY, 302 veto
05:10:40 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 290 veto
05:10:18 ORACLE   360 raccolti, 301 analizzati, 1 BUY, 299 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

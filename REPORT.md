# KAISER · report paper trading

Aggiornato: 2026-11-23 05:45 UTC · in esecuzione da 0.3 giorni · 329 run

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
| Scarto simulati chiusi | 1; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 108642 lanci noti, 20782 creatori; 11 Coin in fascia alta viste (10 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 45, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 12 | 0 / 1 | 0 | n/d |
| 1M-2M | 8 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 48 / 46.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
05:45:22 ORACLE   347 raccolti, 261 analizzati, 2 BUY, 258 veto
05:45:00 ORACLE   340 raccolti, 254 analizzati, 2 BUY, 251 veto
05:44:38 ORACLE   338 raccolti, 249 analizzati, 2 BUY, 246 veto
05:44:16 ORACLE   320 raccolti, 243 analizzati, 2 BUY, 240 veto
05:43:54 ORACLE   316 raccolti, 240 analizzati, 2 BUY, 237 veto
05:43:33 ORACLE   314 raccolti, 227 analizzati, 2 BUY, 224 veto
05:43:11 ORACLE   291 raccolti, 218 analizzati, 2 BUY, 215 veto
05:42:50 ORACLE   283 raccolti, 203 analizzati, 2 BUY, 200 veto
05:42:28 ORACLE   279 raccolti, 200 analizzati, 2 BUY, 197 veto
05:42:07 ORACLE   252 raccolti, 178 analizzati, 2 BUY, 175 veto
05:41:45 ORACLE   240 raccolti, 176 analizzati, 2 BUY, 173 veto
05:41:24 ORACLE   233 raccolti, 159 analizzati, 2 BUY, 156 veto
05:41:03 ORACLE   209 raccolti, 151 analizzati, 2 BUY, 148 veto
05:40:40 ORACLE   198 raccolti, 139 analizzati, 2 BUY, 136 veto
05:40:19 ORACLE   197 raccolti, 130 analizzati, 2 BUY, 127 veto
05:40:17 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
05:40:17 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
05:40:17 KAISER   run #329 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
05:40:17 CREATORI memoria: 108514 lanci, 20772 creatori, 11 Coin in fascia alta
05:39:53 ORACLE   360 raccolti, 295 analizzati, 2 BUY, 292 veto
05:39:32 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 288 veto
05:39:10 ORACLE   360 raccolti, 295 analizzati, 2 BUY, 292 veto
05:38:48 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 291 veto
05:38:26 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 290 veto
05:38:05 ORACLE   360 raccolti, 298 analizzati, 2 BUY, 295 veto
05:37:42 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 291 veto
05:37:21 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 284 veto
05:36:57 ORACLE   360 raccolti, 296 analizzati, 2 BUY, 293 veto
05:36:36 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 290 veto
05:36:14 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 290 veto
05:35:52 ORACLE   360 raccolti, 295 analizzati, 2 BUY, 292 veto
05:35:30 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 290 veto
05:35:09 ORACLE   360 raccolti, 298 analizzati, 2 BUY, 295 veto
05:34:46 ORACLE   360 raccolti, 292 analizzati, 2 BUY, 289 veto
05:34:24 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 291 veto
05:34:02 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 284 veto
05:33:40 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 284 veto
05:33:19 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 279 veto
05:32:57 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 276 veto
05:32:35 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 288 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

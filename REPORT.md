# KAISER · report paper trading

Aggiornato: 2026-11-23 09:06 UTC · in esecuzione da 0.5 giorni · 333 run

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
| Scarto simulati chiusi | 1, netto medio +95.5%, in utile 100%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 112463 lanci noti, 21269 creatori; 12 Coin in fascia alta viste (11 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 74, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 12 | 0 / 1 | 0 | n/d |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 51 / 49.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
09:06:11 ORACLE   312 raccolti, 228 analizzati, 4 BUY, 222 veto
09:05:49 ORACLE   310 raccolti, 222 analizzati, 4 BUY, 216 veto
09:05:27 ORACLE   291 raccolti, 213 analizzati, 4 BUY, 208 veto
09:05:04 ORACLE   283 raccolti, 199 analizzati, 4 BUY, 194 veto
09:04:42 ORACLE   282 raccolti, 199 analizzati, 3 BUY, 194 veto
09:04:20 ORACLE   259 raccolti, 185 analizzati, 4 BUY, 180 veto
09:03:57 ORACLE   252 raccolti, 176 analizzati, 4 BUY, 171 veto
09:03:36 ORACLE   248 raccolti, 173 analizzati, 4 BUY, 168 veto
09:03:13 ORACLE   233 raccolti, 162 analizzati, 4 BUY, 157 veto
09:02:51 ORACLE   222 raccolti, 152 analizzati, 4 BUY, 147 veto
09:02:29 ORACLE   219 raccolti, 150 analizzati, 4 BUY, 145 veto
09:02:07 ORACLE   203 raccolti, 137 analizzati, 4 BUY, 132 veto
09:01:45 ORACLE   190 raccolti, 130 analizzati, 4 BUY, 124 veto
09:01:23 ORACLE   189 raccolti, 129 analizzati, 4 BUY, 123 veto
09:01:20 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
09:01:19 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
09:01:19 KAISER   run #333 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
09:01:19 CREATORI memoria: 112369 lanci, 21256 creatori, 12 Coin in fascia alta
09:01:05 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
09:00:47 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 285 veto
09:00:25 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 281 veto
09:00:02 ORACLE   360 raccolti, 286 analizzati, 4 BUY, 280 veto
08:59:40 ORACLE   360 raccolti, 292 analizzati, 4 BUY, 286 veto
08:59:17 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 279 veto
08:58:55 ORACLE   360 raccolti, 292 analizzati, 4 BUY, 286 veto
08:58:32 ORACLE   360 raccolti, 294 analizzati, 4 BUY, 288 veto
08:58:10 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 284 veto
08:57:47 ORACLE   360 raccolti, 295 analizzati, 4 BUY, 289 veto
08:57:24 ORACLE   360 raccolti, 295 analizzati, 4 BUY, 289 veto
08:57:02 ORACLE   360 raccolti, 288 analizzati, 4 BUY, 282 veto
08:56:39 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 285 veto
08:56:16 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 284 veto
08:55:54 ORACLE   360 raccolti, 288 analizzati, 4 BUY, 282 veto
08:55:31 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 285 veto
08:55:09 ORACLE   360 raccolti, 294 analizzati, 4 BUY, 288 veto
08:54:47 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 281 veto
08:54:24 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 284 veto
08:54:02 ORACLE   360 raccolti, 289 analizzati, 4 BUY, 283 veto
08:53:40 ORACLE   360 raccolti, 277 analizzati, 4 BUY, 271 veto
08:53:17 ORACLE   360 raccolti, 289 analizzati, 4 BUY, 283 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

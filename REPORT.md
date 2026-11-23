# KAISER · report paper trading

Aggiornato: 2026-11-23 04:47 UTC · in esecuzione da 0.3 giorni · 327 run

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
| Avvisi senza risposta | 23 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 107290 lanci noti, 20628 creatori; 10 Coin in fascia alta viste (10 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 149, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 11 | 0 / 0 | 0 | n/d |
| 1M-2M | 7 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 40 / 38.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
04:47:49 ORACLE   360 raccolti, 281 analizzati, 2 BUY, 279 veto
04:47:27 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 273 veto
04:47:05 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 281 veto
04:46:43 ORACLE   360 raccolti, 281 analizzati, 2 BUY, 279 veto
04:46:21 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 273 veto
04:45:59 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 280 veto
04:45:37 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 280 veto
04:45:15 ORACLE   360 raccolti, 281 analizzati, 2 BUY, 279 veto
04:45:13 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
04:44:53 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 283 veto
04:44:31 ORACLE   360 raccolti, 278 analizzati, 2 BUY, 276 veto
04:44:09 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 273 veto
04:43:47 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 282 veto
04:43:25 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 281 veto
04:43:02 ORACLE   360 raccolti, 277 analizzati, 2 BUY, 275 veto
04:42:40 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 285 veto
04:42:18 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 282 veto
04:41:56 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 286 veto
04:41:34 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 286 veto
04:41:12 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 284 veto
04:40:50 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 282 veto
04:40:28 ORACLE   360 raccolti, 289 analizzati, 2 BUY, 287 veto
04:40:06 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 288 veto
04:39:44 ORACLE   360 raccolti, 277 analizzati, 2 BUY, 275 veto
04:39:22 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 286 veto
04:39:00 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 281 veto
04:38:38 ORACLE   360 raccolti, 280 analizzati, 2 BUY, 278 veto
04:38:16 ORACLE   360 raccolti, 289 analizzati, 2 BUY, 287 veto
04:37:54 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 277 veto
04:37:32 ORACLE   360 raccolti, 274 analizzati, 2 BUY, 272 veto
04:37:10 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 277 veto
04:36:47 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 283 veto
04:36:25 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 274 veto
04:36:03 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 274 veto
04:35:41 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 280 veto
04:35:19 ORACLE   360 raccolti, 262 analizzati, 2 BUY, 260 veto
04:34:57 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 264 veto
04:34:34 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 268 veto
04:34:12 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 264 veto
04:33:50 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 269 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

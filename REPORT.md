# KAISER · report paper trading

Aggiornato: 2026-11-28 01:14 UTC · in esecuzione da 5.1 giorni · 467 run

| | |
|---|---|
| Equity | **5.9369 SOL** (-1.1% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9369 SOL |
| Trade chiusi | 18 |
| Win rate | 33% |
| P&L realizzato | -0.0631 SOL (~$-4.53) |
| Media vincite / perdite | +24.6% / -16.6% |
| Profit factor | 0.74 |
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
Diagnosi dei prezzi: 2 trade chiusi con le letture registrate, 0 con almeno un cambio di pool, scarto massimo tra pool 0%.

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 18 di 50, netto medio -2.9% (intervallo -14.6% / +8.9%), in utile 33.3% |
| Scarto simulati chiusi | 6, netto medio -14.8% (intervallo -54.3% / +24.8%), in utile 16.7%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +11.9% (-29.4%) |
| Avvisi senza risposta | 43 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 302718 lanci noti, 53390 creatori; 94 Coin in fascia alta viste (79 creatori), 33 raddoppiate (26 creatori). Creatore trovato: tabella 315, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 55 | 10 / 3 | 17 | -1.9% |
| 1M-2M | 5 | 1 / 3 | 1 | -19.6% |
| 2M+ | 0 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-25: 32 / 24; 11-26: 20 / 20; 11-27: 21 / 18; 11-28: 8 / 8.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 9 | -0.2073 |
| Chiusura manuale (app) | 8 | +0.0696 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $Elfball | 86 | -7.9% | -0.0095 | +0% | -32% | Stop loss | 1m |
| $Hoppy | 86 | -8.1% | -0.0097 | +4% | +4% | Chiusura manuale (app) | 0m |
| $MemeStonks | 86 | -39.8% | -0.0482 | +22% | -31% | Stop loss | 3m |
| $Pompompurin | 86 | -45.1% | -0.0551 | +85% | -32% | Stop loss | 15m |
| $PPK | 86 | -14.2% | -0.0173 | +0% | -31% | Stop loss | 1m |
| $Pompom | 58 | -21.3% | -0.0262 | +8% | -20% | Stop loss | 36m |
| $LENDR | 58 | +13.3% | +0.0163 | +26% | +14% | Chiusura manuale (app) | 6m |
| $MIM | 86 | -2.0% | -0.0024 | +0% | -36% | Stop loss | 1m |
| $PORTAL | 68 | -1.1% | -0.0014 | +0% | -30% | Stop loss | 0m |
| $BASKET | 72 | +14.3% | +0.0176 | +18% | +18% | Chiusura manuale (app) | 4m |
| $4CHAN | 56 | -19.6% | -0.0241 | +0% | -13% | Chiusura manuale (app) | 7m |
| $cateball | 81 | +61.4% | +0.0746 | +111% | +54% | Trailing stop | 13m |
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
01:14:49 ORACLE   360 raccolti, 303 analizzati, 4 BUY, 299 veto
01:14:26 ORACLE   360 raccolti, 301 analizzati, 4 BUY, 297 veto
01:14:02 ORACLE   360 raccolti, 295 analizzati, 4 BUY, 291 veto
01:13:39 ORACLE   360 raccolti, 294 analizzati, 4 BUY, 290 veto
01:13:16 ORACLE   360 raccolti, 297 analizzati, 4 BUY, 293 veto
01:12:53 ORACLE   360 raccolti, 291 analizzati, 5 BUY, 286 veto
01:12:30 ORACLE   360 raccolti, 292 analizzati, 5 BUY, 287 veto
01:12:07 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 287 veto
01:11:44 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 283 veto
01:11:21 ORACLE   360 raccolti, 297 analizzati, 4 BUY, 293 veto
01:10:59 ORACLE   360 raccolti, 294 analizzati, 4 BUY, 290 veto
01:10:46 ORACLE   360 raccolti, 286 analizzati, 5 BUY, 281 veto
01:10:18 ORACLE   360 raccolti, 295 analizzati, 5 BUY, 290 veto
01:09:54 ORACLE   360 raccolti, 295 analizzati, 5 BUY, 290 veto
01:09:32 ORACLE   360 raccolti, 281 analizzati, 5 BUY, 276 veto
01:09:08 ORACLE   360 raccolti, 294 analizzati, 5 BUY, 289 veto
01:08:44 ORACLE   360 raccolti, 293 analizzati, 5 BUY, 288 veto
01:08:20 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 281 veto
01:07:58 ORACLE   360 raccolti, 296 analizzati, 4 BUY, 292 veto
01:07:35 ORACLE   360 raccolti, 286 analizzati, 4 BUY, 282 veto
01:07:12 ORACLE   360 raccolti, 289 analizzati, 4 BUY, 285 veto
01:06:49 ORACLE   360 raccolti, 296 analizzati, 4 BUY, 292 veto
01:06:26 ORACLE   360 raccolti, 298 analizzati, 4 BUY, 294 veto
01:06:03 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 287 veto
01:05:40 ORACLE   360 raccolti, 302 analizzati, 4 BUY, 298 veto
01:05:16 ORACLE   360 raccolti, 288 analizzati, 3 BUY, 285 veto
01:04:53 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 284 veto
01:04:28 ORACLE   360 raccolti, 296 analizzati, 3 BUY, 293 veto
01:04:05 ORACLE   360 raccolti, 301 analizzati, 3 BUY, 298 veto
01:03:43 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 275 veto
01:03:20 ORACLE   360 raccolti, 298 analizzati, 3 BUY, 295 veto
01:02:57 ORACLE   360 raccolti, 279 analizzati, 3 BUY, 276 veto
01:02:46 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 279 veto
01:02:19 ORACLE   360 raccolti, 286 analizzati, 3 BUY, 283 veto
01:01:56 ORACLE   360 raccolti, 292 analizzati, 4 BUY, 288 veto
01:01:34 ORACLE   360 raccolti, 283 analizzati, 4 BUY, 279 veto
01:01:10 ORACLE   360 raccolti, 292 analizzati, 3 BUY, 289 veto
01:00:47 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 267 veto
01:00:25 ORACLE   360 raccolti, 278 analizzati, 2 BUY, 275 veto
01:00:00 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 291 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

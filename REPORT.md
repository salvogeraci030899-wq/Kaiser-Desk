# KAISER · report paper trading

Aggiornato: 2026-11-25 13:25 UTC · in esecuzione da 2.7 giorni · 396 run

| | |
|---|---|
| Equity | **6.0891 SOL** (+1.5% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0891 SOL |
| Trade chiusi | 10 |
| Win rate | 50% |
| P&L realizzato | +0.0891 SOL (~$6.05) |
| Media vincite / perdite | +26.8% / -12.1% |
| Profit factor | 2.21 |
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
| Prendo chiusi | 10 di 50, netto medio +7.4% (intervallo -8.6% / +23.4%), in utile 50% |
| Scarto simulati chiusi | 6, netto medio +12.0% (intervallo -38.1% / +62.1%), in utile 33.3%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | -4.7% (-57.2%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 197714 lanci noti, 36331 creatori; 40 Coin in fascia alta viste (34 creatori), 13 raddoppiate (10 creatori). Creatore trovato: tabella 129, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 31 | 9 / 5 | 9 | +10.4% |
| 1M-2M | 13 | 2 / 2 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 12 / 10.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 3 | -0.0485 |
| Chiusura manuale (app) | 6 | +0.0630 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
13:25:06 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 270 veto
13:24:43 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 282 veto
13:24:21 ORACLE   360 raccolti, 288 analizzati, 1 BUY, 285 veto
13:23:59 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 280 veto
13:23:37 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 289 veto
13:23:16 ORACLE   360 raccolti, 290 analizzati, 1 BUY, 287 veto
13:22:54 ORACLE   360 raccolti, 284 analizzati, 1 BUY, 281 veto
13:22:32 ORACLE   360 raccolti, 288 analizzati, 0 BUY, 285 veto
13:22:11 ORACLE   360 raccolti, 296 analizzati, 0 BUY, 293 veto
13:21:48 ORACLE   360 raccolti, 286 analizzati, 0 BUY, 283 veto
13:21:26 ORACLE   360 raccolti, 290 analizzati, 0 BUY, 287 veto
13:21:04 ORACLE   360 raccolti, 289 analizzati, 0 BUY, 286 veto
13:20:42 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 280 veto
13:20:19 ORACLE   360 raccolti, 286 analizzati, 0 BUY, 283 veto
13:19:57 ORACLE   360 raccolti, 281 analizzati, 0 BUY, 278 veto
13:19:35 ORACLE   360 raccolti, 270 analizzati, 0 BUY, 267 veto
13:19:14 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 275 veto
13:18:52 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 276 veto
13:18:31 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 270 veto
13:18:09 ORACLE   360 raccolti, 285 analizzati, 0 BUY, 282 veto
13:17:48 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 275 veto
13:17:26 ORACLE   360 raccolti, 268 analizzati, 0 BUY, 265 veto
13:17:04 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 273 veto
13:16:41 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 277 veto
13:16:20 ORACLE   360 raccolti, 268 analizzati, 0 BUY, 265 veto
13:15:58 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 277 veto
13:15:36 ORACLE   360 raccolti, 281 analizzati, 0 BUY, 278 veto
13:15:14 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 269 veto
13:14:52 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 277 veto
13:14:30 ORACLE   360 raccolti, 284 analizzati, 0 BUY, 281 veto
13:14:08 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 275 veto
13:13:46 ORACLE   360 raccolti, 288 analizzati, 0 BUY, 285 veto
13:13:25 ORACLE   359 raccolti, 285 analizzati, 0 BUY, 282 veto
13:13:03 ORACLE   350 raccolti, 275 analizzati, 0 BUY, 272 veto
13:12:41 ORACLE   328 raccolti, 267 analizzati, 0 BUY, 264 veto
13:12:19 ORACLE   319 raccolti, 245 analizzati, 0 BUY, 242 veto
13:11:57 ORACLE   314 raccolti, 243 analizzati, 0 BUY, 240 veto
13:11:35 ORACLE   280 raccolti, 207 analizzati, 0 BUY, 204 veto
13:11:13 ORACLE   273 raccolti, 194 analizzati, 0 BUY, 191 veto
13:10:52 ORACLE   263 raccolti, 191 analizzati, 0 BUY, 188 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

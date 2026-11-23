# KAISER · report paper trading

Aggiornato: 2026-11-23 13:39 UTC · in esecuzione da 0.7 giorni · 339 run

| | |
|---|---|
| Equity | **5.9718 SOL** (-0.5% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9718 SOL |
| Trade chiusi | 1 |
| Win rate | 0% |
| P&L realizzato | -0.0282 SOL (~$-2.04) |
| Media vincite / perdite | +0.0% / -23.3% |
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
| Prendo chiusi | 1 di 50 |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 118041 lanci noti, 22153 creatori; 13 Coin in fascia alta viste (12 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 196, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 13 | 1 / 1 | 1 | -23.3% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 53 / 51.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 1 | -0.0282 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
13:39:31 ORACLE   360 raccolti, 290 analizzati, 3 BUY, 286 veto
13:39:09 ORACLE   360 raccolti, 283 analizzati, 4 BUY, 279 veto
13:38:46 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 281 veto
13:38:23 ORACLE   360 raccolti, 290 analizzati, 4 BUY, 286 veto
13:38:01 ORACLE   360 raccolti, 278 analizzati, 4 BUY, 274 veto
13:37:38 ORACLE   360 raccolti, 282 analizzati, 4 BUY, 278 veto
13:37:16 ORACLE   360 raccolti, 287 analizzati, 4 BUY, 283 veto
13:36:53 ORACLE   360 raccolti, 284 analizzati, 5 BUY, 279 veto
13:36:30 ORACLE   360 raccolti, 292 analizzati, 5 BUY, 287 veto
13:36:07 ORACLE   360 raccolti, 291 analizzati, 5 BUY, 286 veto
13:35:45 ORACLE   360 raccolti, 278 analizzati, 5 BUY, 273 veto
13:35:21 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 280 veto
13:34:59 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 280 veto
13:34:36 ORACLE   360 raccolti, 273 analizzati, 4 BUY, 268 veto
13:34:13 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
13:33:51 ORACLE   360 raccolti, 284 analizzati, 4 BUY, 279 veto
13:33:28 ORACLE   360 raccolti, 282 analizzati, 4 BUY, 277 veto
13:33:05 ORACLE   360 raccolti, 283 analizzati, 3 BUY, 278 veto
13:32:42 ORACLE   360 raccolti, 280 analizzati, 3 BUY, 275 veto
13:32:19 ORACLE   360 raccolti, 275 analizzati, 3 BUY, 270 veto
13:31:55 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 280 veto
13:31:33 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 280 veto
13:31:10 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 276 veto
13:30:47 ORACLE   360 raccolti, 292 analizzati, 3 BUY, 287 veto
13:30:25 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 280 veto
13:30:02 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 276 veto
13:29:39 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 284 veto
13:29:14 ORACLE   353 raccolti, 286 analizzati, 5 BUY, 281 veto
13:28:51 ORACLE   348 raccolti, 279 analizzati, 4 BUY, 274 veto
13:28:29 ORACLE   333 raccolti, 268 analizzati, 4 BUY, 263 veto
13:28:06 ORACLE   323 raccolti, 261 analizzati, 4 BUY, 256 veto
13:27:43 ORACLE   321 raccolti, 251 analizzati, 4 BUY, 246 veto
13:27:21 ORACLE   298 raccolti, 234 analizzati, 4 BUY, 229 veto
13:26:58 ORACLE   293 raccolti, 231 analizzati, 5 BUY, 226 veto
13:26:37 ORACLE   288 raccolti, 213 analizzati, 5 BUY, 208 veto
13:26:14 ORACLE   259 raccolti, 200 analizzati, 4 BUY, 195 veto
13:25:51 ORACLE   249 raccolti, 192 analizzati, 5 BUY, 187 veto
13:25:29 ORACLE   244 raccolti, 186 analizzati, 5 BUY, 181 veto
13:25:07 ORACLE   216 raccolti, 161 analizzati, 5 BUY, 156 veto
13:24:45 ORACLE   208 raccolti, 143 analizzati, 5 BUY, 138 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

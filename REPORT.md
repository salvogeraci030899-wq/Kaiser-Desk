# KAISER · report paper trading

Aggiornato: 2026-11-23 13:09 UTC · in esecuzione da 0.6 giorni · 338 run

| | |
|---|---|
| Equity | **5.9718 SOL** (-0.5% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9718 SOL |
| Trade chiusi | 1 |
| Win rate | 0% |
| P&L realizzato | -0.0282 SOL (~$-2.03) |
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
Memoria: 117312 lanci noti, 22030 creatori; 13 Coin in fascia alta viste (12 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 443, richiesta esterna 1, sconosciuto 0.
Richieste esterne per il creatore: pump v3: 0 riuscite, 1 fallite (ultimo errore: HTTP 404); pump v1: 0 riuscite, 1 fallite (ultimo errore: HTTP 530); jupiter: 1 riuscite, 0 fallite.

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
13:09:51 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
13:09:28 ORACLE   360 raccolti, 280 analizzati, 3 BUY, 276 veto
13:09:25 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
13:09:05 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 274 veto
13:08:43 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
13:08:21 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 278 veto
13:07:59 ORACLE   360 raccolti, 283 analizzati, 3 BUY, 279 veto
13:07:37 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 278 veto
13:07:15 ORACLE   360 raccolti, 275 analizzati, 3 BUY, 271 veto
13:06:53 ORACLE   360 raccolti, 280 analizzati, 3 BUY, 276 veto
13:06:31 ORACLE   360 raccolti, 277 analizzati, 4 BUY, 272 veto
13:06:09 ORACLE   360 raccolti, 273 analizzati, 4 BUY, 268 veto
13:05:47 ORACLE   360 raccolti, 278 analizzati, 4 BUY, 273 veto
13:05:25 ORACLE   360 raccolti, 278 analizzati, 4 BUY, 273 veto
13:05:02 ORACLE   360 raccolti, 274 analizzati, 4 BUY, 269 veto
13:04:39 ORACLE   360 raccolti, 278 analizzati, 5 BUY, 273 veto
13:04:17 ORACLE   360 raccolti, 271 analizzati, 5 BUY, 266 veto
13:03:55 ORACLE   360 raccolti, 262 analizzati, 4 BUY, 257 veto
13:03:33 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 264 veto
13:03:11 ORACLE   360 raccolti, 266 analizzati, 5 BUY, 261 veto
13:02:49 ORACLE   360 raccolti, 262 analizzati, 5 BUY, 257 veto
13:02:26 ORACLE   360 raccolti, 269 analizzati, 5 BUY, 264 veto
13:02:04 ORACLE   360 raccolti, 271 analizzati, 4 BUY, 266 veto
13:01:42 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 264 veto
13:01:20 ORACLE   360 raccolti, 268 analizzati, 4 BUY, 263 veto
13:00:57 ORACLE   360 raccolti, 264 analizzati, 4 BUY, 259 veto
13:00:35 ORACLE   360 raccolti, 261 analizzati, 4 BUY, 256 veto
13:00:13 ORACLE   360 raccolti, 272 analizzati, 4 BUY, 267 veto
12:59:50 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 264 veto
12:59:37 SCRIBE   chiuso P-0671 $SIDOOR -0.0282 SOL (-23.3%)
12:59:37 CHARON   Stop loss $SIDOOR vendo 100% a -20.5% -> 0.0928 SOL
12:59:27 ORACLE   360 raccolti, 267 analizzati, 4 BUY, 262 veto
12:59:05 ORACLE   360 raccolti, 268 analizzati, 4 BUY, 263 veto
12:58:43 ORACLE   360 raccolti, 270 analizzati, 5 BUY, 265 veto
12:58:21 ORACLE   360 raccolti, 264 analizzati, 5 BUY, 259 veto
12:57:58 ORACLE   360 raccolti, 268 analizzati, 3 BUY, 264 veto
12:57:36 ORACLE   360 raccolti, 264 analizzati, 3 BUY, 260 veto
12:57:14 ORACLE   360 raccolti, 260 analizzati, 3 BUY, 256 veto
12:56:52 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 263 veto
12:56:30 ORACLE   360 raccolti, 272 analizzati, 2 BUY, 268 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

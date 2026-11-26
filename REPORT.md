# KAISER · report paper trading

Aggiornato: 2026-11-26 05:20 UTC · in esecuzione da 3.3 giorni · 415 run

| | |
|---|---|
| Equity | **5.9561 SOL** (-0.7% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9561 SOL |
| Trade chiusi | 16 |
| Win rate | 38% |
| P&L realizzato | -0.0439 SOL (~$-3.13) |
| Media vincite / perdite | +24.6% / -18.3% |
| Profit factor | 0.80 |
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
| Prendo chiusi | 16 di 50, netto medio -2.2% (intervallo -15.4% / +11.0%), in utile 37.5% |
| Scarto simulati chiusi | 8, netto medio -2.5% (intervallo -44.2% / +39.1%), in utile 25%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +0.3% (-43.4%) |
| Avvisi senza risposta | 34 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 227709 lanci noti, 41281 creatori; 66 Coin in fascia alta viste (54 creatori), 22 raddoppiate (18 creatori). Creatore trovato: tabella 252, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 48 | 15 / 6 | 15 | -1.0% |
| 1M-2M | 12 | 2 / 3 | 1 | -19.6% |
| 2M+ | 0 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 32 / 24; 11-26: 11 / 11.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 8 | -0.1978 |
| Chiusura manuale (app) | 7 | +0.0793 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
05:20:23 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 263 veto
05:20:00 ORACLE   360 raccolti, 271 analizzati, 4 BUY, 265 veto
05:19:38 ORACLE   360 raccolti, 265 analizzati, 4 BUY, 259 veto
05:19:15 ORACLE   360 raccolti, 267 analizzati, 4 BUY, 261 veto
05:18:53 ORACLE   360 raccolti, 270 analizzati, 4 BUY, 264 veto
05:18:31 ORACLE   360 raccolti, 256 analizzati, 4 BUY, 250 veto
05:18:08 ORACLE   360 raccolti, 252 analizzati, 4 BUY, 246 veto
05:17:46 ORACLE   360 raccolti, 255 analizzati, 4 BUY, 249 veto
05:17:23 ORACLE   360 raccolti, 267 analizzati, 4 BUY, 261 veto
05:17:00 ORACLE   360 raccolti, 271 analizzati, 4 BUY, 265 veto
05:16:37 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 263 veto
05:16:15 ORACLE   360 raccolti, 260 analizzati, 4 BUY, 254 veto
05:15:52 ORACLE   360 raccolti, 273 analizzati, 4 BUY, 267 veto
05:15:29 ORACLE   360 raccolti, 258 analizzati, 4 BUY, 252 veto
05:15:06 ORACLE   360 raccolti, 256 analizzati, 4 BUY, 250 veto
05:14:42 ORACLE   360 raccolti, 256 analizzati, 3 BUY, 250 veto
05:14:20 ORACLE   360 raccolti, 264 analizzati, 3 BUY, 258 veto
05:13:57 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 251 veto
05:13:34 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 266 veto
05:13:12 ORACLE   360 raccolti, 270 analizzati, 4 BUY, 264 veto
05:12:49 ORACLE   360 raccolti, 261 analizzati, 4 BUY, 255 veto
05:12:27 ORACLE   360 raccolti, 271 analizzati, 4 BUY, 265 veto
05:12:05 ORACLE   360 raccolti, 271 analizzati, 4 BUY, 265 veto
05:11:42 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 266 veto
05:11:20 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 267 veto
05:10:57 ORACLE   360 raccolti, 275 analizzati, 4 BUY, 269 veto
05:10:35 ORACLE   360 raccolti, 261 analizzati, 4 BUY, 255 veto
05:10:22 ORACLE   360 raccolti, 260 analizzati, 4 BUY, 254 veto
05:09:57 ORACLE   347 raccolti, 256 analizzati, 4 BUY, 250 veto
05:09:35 ORACLE   339 raccolti, 250 analizzati, 4 BUY, 244 veto
05:09:12 ORACLE   328 raccolti, 244 analizzati, 4 BUY, 238 veto
05:08:50 ORACLE   324 raccolti, 236 analizzati, 4 BUY, 230 veto
05:08:28 ORACLE   323 raccolti, 232 analizzati, 4 BUY, 226 veto
05:08:05 ORACLE   297 raccolti, 216 analizzati, 4 BUY, 210 veto
05:07:42 ORACLE   290 raccolti, 206 analizzati, 4 BUY, 200 veto
05:07:21 ORACLE   289 raccolti, 198 analizzati, 4 BUY, 192 veto
05:06:57 ORACLE   264 raccolti, 174 analizzati, 4 BUY, 168 veto
05:06:35 ORACLE   254 raccolti, 157 analizzati, 4 BUY, 151 veto
05:06:13 ORACLE   246 raccolti, 157 analizzati, 4 BUY, 151 veto
05:05:51 ORACLE   220 raccolti, 140 analizzati, 4 BUY, 134 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

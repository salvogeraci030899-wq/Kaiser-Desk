# KAISER · report paper trading

Aggiornato: 2026-11-26 01:39 UTC · in esecuzione da 3.2 giorni · 410 run

| | |
|---|---|
| Equity | **6.0043 SOL** (+0.1% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0043 SOL |
| Trade chiusi | 15 |
| Win rate | 40% |
| P&L realizzato | +0.0043 SOL (~$0.31) |
| Media vincite / perdite | +24.6% / -15.9% |
| Profit factor | 1.02 |
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
| Prendo chiusi | 15 di 50, netto medio +0.3% (intervallo -12.8% / +13.4%), in utile 40% |
| Scarto simulati chiusi | 8, netto medio -2.5% (intervallo -44.2% / +39.1%), in utile 25%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +2.8% (-40.9%) |
| Avvisi senza risposta | 35 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 222477 lanci noti, 40540 creatori; 64 Coin in fascia alta viste (52 creatori), 21 raddoppiate (17 creatori). Creatore trovato: tabella 738, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 47 | 14 / 6 | 14 | +1.7% |
| 1M-2M | 13 | 2 / 3 | 1 | -19.6% |
| 2M+ | 0 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 32 / 24; 11-26: 9 / 9.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 7 | -0.1496 |
| Chiusura manuale (app) | 7 | +0.0793 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
01:39:44 ORACLE   360 raccolti, 241 analizzati, 4 BUY, 234 veto
01:39:20 ORACLE   360 raccolti, 243 analizzati, 4 BUY, 236 veto
01:38:56 ORACLE   360 raccolti, 256 analizzati, 4 BUY, 249 veto
01:38:44 ORACLE   360 raccolti, 243 analizzati, 4 BUY, 236 veto
01:38:42 SCOUT    gecko top: This operation was aborted (riuso l'ultimo elenco)
01:38:16 ORACLE   360 raccolti, 242 analizzati, 4 BUY, 235 veto
01:37:46 ORACLE   360 raccolti, 256 analizzati, 3 BUY, 250 veto
01:37:34 ORACLE   360 raccolti, 247 analizzati, 3 BUY, 241 veto
01:37:32 SCOUT    gecko trend: This operation was aborted (riuso l'ultimo elenco)
01:36:56 ORACLE   360 raccolti, 246 analizzati, 4 BUY, 239 veto
01:36:33 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 251 veto
01:36:10 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 242 veto
01:35:46 ORACLE   360 raccolti, 263 analizzati, 4 BUY, 256 veto
01:35:23 ORACLE   360 raccolti, 263 analizzati, 4 BUY, 256 veto
01:35:00 ORACLE   360 raccolti, 219 analizzati, 4 BUY, 212 veto
01:34:37 ORACLE   360 raccolti, 241 analizzati, 4 BUY, 234 veto
01:34:24 ORACLE   360 raccolti, 249 analizzati, 4 BUY, 242 veto
01:33:58 ORACLE   360 raccolti, 245 analizzati, 3 BUY, 239 veto
01:33:34 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 257 veto
01:33:11 ORACLE   360 raccolti, 266 analizzati, 3 BUY, 260 veto
01:32:48 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 247 veto
01:32:25 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 252 veto
01:32:03 ORACLE   360 raccolti, 270 analizzati, 3 BUY, 264 veto
01:31:40 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 245 veto
01:31:17 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 253 veto
01:30:53 ORACLE   360 raccolti, 242 analizzati, 3 BUY, 236 veto
01:30:29 ORACLE   360 raccolti, 230 analizzati, 3 BUY, 224 veto
01:30:06 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 251 veto
01:29:43 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 242 veto
01:29:21 ORACLE   360 raccolti, 237 analizzati, 3 BUY, 231 veto
01:28:58 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 251 veto
01:28:35 ORACLE   360 raccolti, 254 analizzati, 3 BUY, 248 veto
01:28:12 ORACLE   360 raccolti, 255 analizzati, 2 BUY, 250 veto
01:27:50 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 261 veto
01:27:28 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 243 veto
01:27:05 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 248 veto
01:26:42 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 259 veto
01:26:20 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 265 veto
01:25:57 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 255 veto
01:25:34 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 251 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

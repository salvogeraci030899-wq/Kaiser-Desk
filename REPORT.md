# KAISER · report paper trading

Aggiornato: 2026-11-25 05:07 UTC · in esecuzione da 2.3 giorni · 386 run

| | |
|---|---|
| Equity | **6.0970 SOL** (+1.6% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0970 SOL |
| Trade chiusi | 7 |
| Win rate | 57% |
| P&L realizzato | +0.0970 SOL (~$6.67) |
| Media vincite / perdite | +29.9% / -13.2% |
| Profit factor | 3.02 |
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
| Prendo chiusi | 7 di 50, netto medio +11.4% (intervallo -10.0% / +32.9%), in utile 57.1% |
| Scarto simulati chiusi | 5, netto medio +20.3% (intervallo -37.8% / +78.4%), in utile 40%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | -8.8% (-70.7%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 186530 lanci noti, 34690 creatori; 36 Coin in fascia alta viste (30 creatori), 12 raddoppiate (9 creatori). Creatore trovato: tabella 215, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 29 | 7 / 5 | 7 | +11.5% |
| 1M-2M | 11 | 1 / 1 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 8 / 6.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 2 | -0.0471 |
| Chiusura manuale (app) | 4 | +0.0695 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $cateball | 81 | +61.4% | +0.0746 | +111% | +54% | Trailing stop | 13m |
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
05:07:28 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
05:07:06 ORACLE   360 raccolti, 265 analizzati, 2 BUY, 261 veto
05:06:53 ORACLE   360 raccolti, 267 analizzati, 1 BUY, 263 veto
05:06:23 ORACLE   360 raccolti, 258 analizzati, 1 BUY, 254 veto
05:06:09 ORACLE   360 raccolti, 251 analizzati, 1 BUY, 247 veto
05:05:32 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 253 veto
05:05:10 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 260 veto
05:04:48 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 248 veto
05:04:26 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 253 veto
05:04:04 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 256 veto
05:03:42 ORACLE   360 raccolti, 251 analizzati, 2 BUY, 247 veto
05:03:20 ORACLE   360 raccolti, 251 analizzati, 2 BUY, 247 veto
05:02:58 ORACLE   360 raccolti, 250 analizzati, 2 BUY, 246 veto
05:02:36 ORACLE   360 raccolti, 245 analizzati, 2 BUY, 241 veto
05:02:14 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 250 veto
05:01:51 ORACLE   360 raccolti, 250 analizzati, 2 BUY, 246 veto
05:01:30 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 243 veto
05:01:07 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 252 veto
05:00:45 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 245 veto
05:00:23 ORACLE   360 raccolti, 246 analizzati, 2 BUY, 242 veto
05:00:00 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 252 veto
04:59:38 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 256 veto
04:59:16 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 249 veto
04:58:54 ORACLE   360 raccolti, 263 analizzati, 2 BUY, 259 veto
04:58:32 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 253 veto
04:58:10 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 252 veto
04:57:48 ORACLE   360 raccolti, 262 analizzati, 2 BUY, 258 veto
04:57:26 ORACLE   360 raccolti, 255 analizzati, 2 BUY, 251 veto
04:57:04 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 250 veto
04:56:41 ORACLE   360 raccolti, 263 analizzati, 2 BUY, 259 veto
04:56:19 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 260 veto
04:55:57 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 250 veto
04:55:35 ORACLE   360 raccolti, 273 analizzati, 2 BUY, 269 veto
04:55:13 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 267 veto
04:54:51 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 262 veto
04:54:29 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 260 veto
04:54:07 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 266 veto
04:53:45 ORACLE   360 raccolti, 272 analizzati, 2 BUY, 268 veto
04:53:22 ORACLE   360 raccolti, 267 analizzati, 2 BUY, 263 veto
04:53:00 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 265 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

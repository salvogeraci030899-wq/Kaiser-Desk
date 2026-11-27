# KAISER · report paper trading

Aggiornato: 2026-11-27 10:09 UTC · in esecuzione da 4.5 giorni · 449 run

| | |
|---|---|
| Equity | **5.9465 SOL** (-0.9% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9465 SOL |
| Trade chiusi | 17 |
| Win rate | 35% |
| P&L realizzato | -0.0535 SOL (~$-3.93) |
| Media vincite / perdite | +24.6% / -17.3% |
| Profit factor | 0.77 |
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
Diagnosi dei prezzi: 1 trade chiusi con le letture registrate, 0 con almeno un cambio di pool, scarto massimo tra pool 0%.

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 17 di 50, netto medio -2.5% (intervallo -15.0% / +9.9%), in utile 35.3% |
| Scarto simulati chiusi | 9, netto medio -5.0% (intervallo -42.1% / +32.0%), in utile 22.2%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +2.5% (-36.6%) |
| Avvisi senza risposta | 35 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 274733 lanci noti, 48611 creatori; 83 Coin in fascia alta viste (69 creatori), 28 raddoppiate (22 creatori). Creatore trovato: tabella 117, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 55 | 15 / 6 | 16 | -1.5% |
| 1M-2M | 5 | 1 / 3 | 1 | -19.6% |
| 2M+ | 0 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-24: 18 / 13; 11-25: 32 / 24; 11-26: 20 / 20; 11-27: 11 / 7.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 8 | -0.1978 |
| Chiusura manuale (app) | 8 | +0.0696 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
10:09:39 ORACLE   360 raccolti, 248 analizzati, 0 BUY, 247 veto
10:09:18 ORACLE   360 raccolti, 245 analizzati, 0 BUY, 244 veto
10:08:56 ORACLE   360 raccolti, 245 analizzati, 0 BUY, 244 veto
10:08:35 ORACLE   360 raccolti, 258 analizzati, 0 BUY, 257 veto
10:08:13 ORACLE   360 raccolti, 260 analizzati, 0 BUY, 259 veto
10:07:52 ORACLE   360 raccolti, 262 analizzati, 0 BUY, 261 veto
10:07:31 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
10:07:09 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
10:06:48 ORACLE   360 raccolti, 254 analizzati, 0 BUY, 253 veto
10:06:26 ORACLE   360 raccolti, 263 analizzati, 0 BUY, 262 veto
10:06:04 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 264 veto
10:05:43 ORACLE   360 raccolti, 259 analizzati, 0 BUY, 258 veto
10:05:21 ORACLE   360 raccolti, 267 analizzati, 0 BUY, 266 veto
10:04:59 ORACLE   360 raccolti, 263 analizzati, 0 BUY, 262 veto
10:04:38 ORACLE   360 raccolti, 261 analizzati, 0 BUY, 260 veto
10:04:16 ORACLE   360 raccolti, 262 analizzati, 0 BUY, 261 veto
10:03:54 ORACLE   360 raccolti, 260 analizzati, 0 BUY, 259 veto
10:03:32 ORACLE   360 raccolti, 249 analizzati, 0 BUY, 248 veto
10:03:10 ORACLE   360 raccolti, 254 analizzati, 0 BUY, 253 veto
10:02:48 ORACLE   360 raccolti, 255 analizzati, 0 BUY, 254 veto
10:02:27 ORACLE   360 raccolti, 254 analizzati, 0 BUY, 253 veto
10:02:05 ORACLE   360 raccolti, 253 analizzati, 0 BUY, 252 veto
10:01:43 ORACLE   360 raccolti, 253 analizzati, 0 BUY, 252 veto
10:01:21 ORACLE   360 raccolti, 245 analizzati, 0 BUY, 244 veto
10:01:00 ORACLE   360 raccolti, 261 analizzati, 0 BUY, 260 veto
10:00:38 ORACLE   360 raccolti, 255 analizzati, 0 BUY, 254 veto
10:00:16 ORACLE   360 raccolti, 255 analizzati, 0 BUY, 254 veto
09:59:53 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
09:59:32 ORACLE   360 raccolti, 263 analizzati, 0 BUY, 262 veto
09:59:10 ORACLE   360 raccolti, 260 analizzati, 0 BUY, 259 veto
09:59:08 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
09:58:48 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
09:58:26 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 264 veto
09:58:05 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
09:57:43 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
09:57:21 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 264 veto
09:56:59 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 263 veto
09:56:37 ORACLE   360 raccolti, 260 analizzati, 0 BUY, 259 veto
09:56:15 ORACLE   360 raccolti, 262 analizzati, 0 BUY, 261 veto
09:55:54 ORACLE   360 raccolti, 257 analizzati, 0 BUY, 256 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

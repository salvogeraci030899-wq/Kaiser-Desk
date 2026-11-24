# KAISER · report paper trading

Aggiornato: 2026-11-24 23:36 UTC · in esecuzione da 2.1 giorni · 379 run

| | |
|---|---|
| Equity | **6.0970 SOL** (+1.6% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0970 SOL |
| Trade chiusi | 7 |
| Win rate | 57% |
| P&L realizzato | +0.0970 SOL (~$6.76) |
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
| Scarto simulati chiusi | 3, netto medio +14.4% (intervallo -72.6% / +101.5%), in utile 33.3%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | -3.0% (-92.6%) |
| Avvisi senza risposta | 29 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 178628 lanci noti, 33427 creatori; 33 Coin in fascia alta viste (27 creatori), 9 raddoppiate (7 creatori). Creatore trovato: tabella 380, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 27 | 7 / 4 | 7 | +11.5% |
| 1M-2M | 10 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13.

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
23:36:14 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
23:36:01 ORACLE   360 raccolti, 245 analizzati, 3 BUY, 241 veto
23:35:34 ORACLE   360 raccolti, 249 analizzati, 3 BUY, 245 veto
23:35:22 ORACLE   360 raccolti, 244 analizzati, 3 BUY, 240 veto
23:35:06 ORACLE   360 raccolti, 249 analizzati, 3 BUY, 245 veto
23:34:41 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
23:34:18 ORACLE   360 raccolti, 239 analizzati, 3 BUY, 235 veto
23:33:54 ORACLE   360 raccolti, 245 analizzati, 3 BUY, 241 veto
23:33:29 ORACLE   360 raccolti, 244 analizzati, 3 BUY, 240 veto
23:33:17 ORACLE   360 raccolti, 243 analizzati, 3 BUY, 239 veto
23:32:51 ORACLE   360 raccolti, 242 analizzati, 3 BUY, 238 veto
23:32:28 ORACLE   360 raccolti, 237 analizzati, 3 BUY, 233 veto
23:32:04 ORACLE   360 raccolti, 228 analizzati, 3 BUY, 224 veto
23:31:41 ORACLE   360 raccolti, 227 analizzati, 3 BUY, 223 veto
23:31:16 ORACLE   360 raccolti, 229 analizzati, 3 BUY, 225 veto
23:30:53 ORACLE   360 raccolti, 222 analizzati, 3 BUY, 218 veto
23:30:28 ORACLE   360 raccolti, 222 analizzati, 4 BUY, 218 veto
23:30:15 ORACLE   360 raccolti, 222 analizzati, 4 BUY, 218 veto
23:29:47 ORACLE   360 raccolti, 217 analizzati, 4 BUY, 213 veto
23:29:25 ORACLE   360 raccolti, 220 analizzati, 4 BUY, 216 veto
23:29:02 ORACLE   360 raccolti, 214 analizzati, 4 BUY, 210 veto
23:28:38 ORACLE   360 raccolti, 209 analizzati, 4 BUY, 205 veto
23:28:15 ORACLE   360 raccolti, 211 analizzati, 4 BUY, 207 veto
23:27:51 ORACLE   360 raccolti, 204 analizzati, 4 BUY, 200 veto
23:27:27 ORACLE   360 raccolti, 201 analizzati, 4 BUY, 197 veto
23:27:13 QUARTER  SEGNALE $JIMMY score 63 (semi-automatico)
23:27:13 ORACLE   360 raccolti, 213 analizzati, 4 BUY, 209 veto
23:26:46 ORACLE   360 raccolti, 217 analizzati, 4 BUY, 213 veto
23:26:24 ORACLE   360 raccolti, 219 analizzati, 4 BUY, 215 veto
23:26:01 ORACLE   360 raccolti, 227 analizzati, 4 BUY, 223 veto
23:25:38 ORACLE   360 raccolti, 225 analizzati, 4 BUY, 221 veto
23:25:13 ORACLE   360 raccolti, 220 analizzati, 4 BUY, 216 veto
23:24:49 ORACLE   360 raccolti, 225 analizzati, 4 BUY, 221 veto
23:24:26 ORACLE   360 raccolti, 228 analizzati, 4 BUY, 224 veto
23:24:03 ORACLE   360 raccolti, 223 analizzati, 4 BUY, 219 veto
23:23:40 ORACLE   360 raccolti, 236 analizzati, 4 BUY, 232 veto
23:23:18 ORACLE   360 raccolti, 233 analizzati, 4 BUY, 229 veto
23:23:05 ORACLE   360 raccolti, 229 analizzati, 4 BUY, 225 veto
23:22:39 ORACLE   360 raccolti, 251 analizzati, 4 BUY, 247 veto
23:22:16 ORACLE   360 raccolti, 253 analizzati, 4 BUY, 249 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

# KAISER · report paper trading

Aggiornato: 2026-11-22 19:25 UTC · in esecuzione da 3.2 giorni · 315 run

| | |
|---|---|
| Equity | **4.0026 SOL** (-33.3% dal capitale iniziale di 6 SOL) |
| Cassa | 4.0026 SOL |
| Trade chiusi | 222 |
| Win rate | 32% |
| P&L realizzato | -1.9974 SOL (~$-140.18) |
| Media vincite / perdite | +40.1% / -31.4% |
| Profit factor | 0.58 |
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
| Esito | **in corso** (2 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -21.9% (intervallo -58.0% / +14.1%), mediana -21.9%, in utile 0%, senza rotta 0 su 2 |
| Netto a 60 s | -40.7% (intervallo -154.3% / +72.8%), mediana -40.7%, in utile 50%, senza rotta 0 su 2 |
| Netto a 300 s (primario) | -38.8% (intervallo -154.4% / +76.7%), mediana -38.8%, in utile 50%, senza rotta 0 su 2 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 14.88% / 6.3 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 2 / 2 / 0 / 0 / 0 |

## Uomo e macchina: i segnali che prendi contro quelli che scarti
Il radar sceglie, tu decidi (Prendo o Scarto) senza vedere il punteggio del bot. Rendimento a 5 minuti dalla tua decisione, meno 5% di costo a giro (stima mediana, non una misura per ogni token).
Regola decisa in anticipo: almeno 50 presi e 30 scartati, netto medio dei presi >= +3% con limite inferiore sopra zero e sopra gli scartati.

| | |
|---|---|
| Esito | **in corso** |
| Presi / scartati (con misura a 5 minuti) | 2 / 1 |
| Netto medio dei presi | +69.5% (intervallo -86.7% / +225.6%) |
| Netto medio degli scartati | n/d% |
| Differenza presi meno scartati (limite inferiore) | n/d |
| Senza risposta / decisi dopo 5 minuti | 27 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 59 | -1.7213 |
| Time stop | 84 | -0.9970 |
| TP1 | 52 | +2.2479 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $Nаe | 70 | -17.8% | -0.0145 | +0% | -33% | Stop loss | 2m |
| $XMAS | 69 | -8.8% | -0.0072 | +0% | -16% | Time stop | 5m |
| $SINGULARTY | 84 | +91.2% | +0.0730 | +83% | +83% | TP1 | 7m |
| $Leap | 67 | +71.7% | +0.0565 | +72% | +72% | TP1 | 3m |
| $UNISON | 65 | -25.9% | -0.0205 | +11% | +1% | Time stop | 5m |
| $IF | 64 | -40.2% | -0.0321 | +7% | -5% | Time stop | 5m |
| $BTC | 77 | +40.5% | +0.0321 | +62% | +62% | TP1 | 3m |
| $OpenIndex | 64 | -6.3% | -0.0050 | +54% | +4% | Time stop | 7m |
| $SANTIA | 69 | -5.4% | -0.0043 | +7% | -14% | Time stop | 5m |
| $BTC | 64 | -41.7% | -0.0334 | +0% | -34% | Stop loss | 3m |
| $FOAM | 71 | -6.9% | -0.0056 | +62% | +62% | TP1 | 1m |
| $OMGAI | 75 | +11.9% | +0.0095 | +4% | +4% | Time stop | 5m |
| $poorcat | 63 | +12.4% | +0.0099 | +42% | -8% | Time stop | 8m |
| $GIF | 64 | -11.2% | -0.0090 | +18% | -1% | Time stop | 6m |
| $FRANK | 70 | +8.7% | +0.0069 | +10% | -12% | Time stop | 5m |
| $MengLan | 65 | +80.7% | +0.0635 | +108% | +108% | TP1 | 3m |
| $Plurality | 64 | -38.8% | -0.0308 | +0% | -33% | Stop loss | 5m |
| $KYC | 65 | +60.3% | +0.0472 | +61% | +61% | TP1 | 3m |
| $XMASS | 74 | -21.8% | -0.0172 | +0% | -8% | Time stop | 5m |
| $MOG | 66 | -15.7% | -0.0124 | +15% | +2% | Time stop | 5m |
| $SI | 70 | -11.4% | -0.0090 | +24% | +3% | Time stop | 5m |
| $MCAT | 68 | +25.4% | +0.0200 | +96% | +96% | TP1 | 1m |
| $airball | 64 | -46.1% | -0.0366 | +0% | -36% | Stop loss | 2m |
| $testicles | 63 | +32.4% | +0.0255 | +68% | +68% | TP1 | 1m |
| $HIPPO | 76 | -27.9% | -0.0221 | +11% | -31% | Stop loss | 4m |

## Ultimi eventi
```
19:25:03 SCRIBE   fine run · trade 222 · win 32% · P&L -1.9974 SOL · equity 4.0026 SOL
19:24:45 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 266 veto
19:24:22 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 264 veto
19:23:57 ORACLE   360 raccolti, 280 analizzati, 2 BUY, 271 veto
19:23:33 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 274 veto
19:23:09 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 264 veto
19:22:45 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 262 veto
19:22:21 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 262 veto
19:21:57 SCRIBE   chiuso P-0658 $Nаe -0.0145 SOL (-17.8%)
19:21:57 CHARON   Stop loss $Nаe vendo 100% a -32.9% -> 0.0669 SOL
19:21:57 ORACLE   360 raccolti, 276 analizzati, 3 BUY, 263 veto
19:21:33 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 268 veto
19:21:19 ORACLE   360 raccolti, 278 analizzati, 2 BUY, 267 veto
19:20:54 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 265 veto
19:20:40 ORACLE   360 raccolti, 268 analizzati, 3 BUY, 259 veto
19:20:15 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 270 veto
19:19:50 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 263 veto
19:19:36 QUARTER  BUY $Nаe 0.080 SOL score 70 impatto 0.53% (Jupiter)
19:19:36 QUARTER  SEGNALE $Nаe score 70 (semi-automatico)
19:19:36 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 257 veto
19:19:11 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 269 veto
19:18:47 ORACLE   360 raccolti, 277 analizzati, 2 BUY, 267 veto
19:18:23 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 259 veto
19:17:59 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 266 veto
19:17:36 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 268 veto
19:17:12 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 261 veto
19:16:47 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 269 veto
19:16:23 ORACLE   360 raccolti, 281 analizzati, 2 BUY, 268 veto
19:15:59 ORACLE   360 raccolti, 273 analizzati, 2 BUY, 259 veto
19:15:33 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 257 veto
19:15:10 ORACLE   360 raccolti, 274 analizzati, 2 BUY, 258 veto
19:14:45 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 253 veto
19:14:21 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 263 veto
19:13:56 ORACLE   360 raccolti, 280 analizzati, 2 BUY, 266 veto
19:13:33 ORACLE   360 raccolti, 274 analizzati, 2 BUY, 264 veto
19:13:08 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 265 veto
19:12:43 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 256 veto
19:12:18 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 258 veto
19:11:54 ORACLE   360 raccolti, 277 analizzati, 2 BUY, 264 veto
19:11:30 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 259 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

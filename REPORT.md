# KAISER · report paper trading

Aggiornato: 2026-11-22 20:01 UTC · in esecuzione da 3.2 giorni · 316 run

| | |
|---|---|
| Equity | **3.9827 SOL** (-33.6% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9827 SOL |
| Trade chiusi | 224 |
| Win rate | 31% |
| P&L realizzato | -2.0173 SOL (~$-141.57) |
| Media vincite / perdite | +40.1% / -31.1% |
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
| Esito | **in corso** (3 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -16.0% (intervallo -39.9% / +7.9%), mediana -4.0%, in utile 0%, senza rotta 0 su 3 |
| Netto a 60 s | -28.0% (intervallo -98.1% / +42.2%), mediana -2.5%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 300 s (primario) | -33.6% (intervallo -101.1% / +33.9%), mediana -23.1%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 0.89% / 6.3 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 3 / 3 / 0 / 0 / 0 |

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
| Senza risposta / decisi dopo 5 minuti | 32 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 59 | -1.7213 |
| Time stop | 86 | -1.0169 |
| TP1 | 52 | +2.2479 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $Monkey | 67 | -11.1% | -0.0090 | +9% | -29% | Time stop | 5m |
| $CHRISTMASS | 64 | -13.5% | -0.0110 | +17% | +3% | Time stop | 13m |
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

## Ultimi eventi
```
20:01:11 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 265 veto
20:00:46 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 284 veto
20:00:32 ORACLE   360 raccolti, 293 analizzati, 1 BUY, 285 veto
20:00:06 ORACLE   360 raccolti, 288 analizzati, 1 BUY, 281 veto
19:59:41 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 286 veto
19:59:17 ORACLE   360 raccolti, 296 analizzati, 2 BUY, 290 veto
19:58:54 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 285 veto
19:58:30 ORACLE   360 raccolti, 297 analizzati, 3 BUY, 288 veto
19:58:06 ORACLE   360 raccolti, 296 analizzati, 2 BUY, 288 veto
19:57:42 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 276 veto
19:57:18 ORACLE   360 raccolti, 292 analizzati, 3 BUY, 288 veto
19:56:55 ORACLE   360 raccolti, 292 analizzati, 3 BUY, 287 veto
19:56:32 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 282 veto
19:56:07 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 287 veto
19:55:44 ORACLE   360 raccolti, 291 analizzati, 1 BUY, 288 veto
19:55:21 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 282 veto
19:54:58 QUARTER  SEGNALE $FSDV15 score 77 (semi-automatico)
19:54:57 SCRIBE   chiuso P-0660 $Monkey -0.0090 SOL (-11.1%)
19:54:57 CHARON   Time stop $Monkey vendo 100% a -28.7% -> 0.0718 SOL
19:54:57 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 285 veto
19:54:34 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 287 veto
19:54:11 ORACLE   360 raccolti, 287 analizzati, 1 BUY, 279 veto
19:53:46 ORACLE   360 raccolti, 288 analizzati, 1 BUY, 280 veto
19:53:23 ORACLE   360 raccolti, 291 analizzati, 1 BUY, 281 veto
19:52:59 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 276 veto
19:52:34 ORACLE   360 raccolti, 290 analizzati, 1 BUY, 278 veto
19:52:10 ORACLE   360 raccolti, 295 analizzati, 2 BUY, 283 veto
19:51:46 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 274 veto
19:51:21 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 277 veto
19:50:57 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 279 veto
19:50:33 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 271 veto
19:50:08 ORACLE   360 raccolti, 274 analizzati, 2 BUY, 269 veto
19:49:44 QUARTER  BUY $Monkey 0.080 SOL score 67 impatto 0.22% (Jupiter)
19:49:44 ORACLE   360 raccolti, 272 analizzati, 2 BUY, 266 veto
19:49:21 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 247 veto
19:48:57 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 255 veto
19:48:33 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 240 veto
19:48:09 ORACLE   360 raccolti, 240 analizzati, 3 BUY, 232 veto
19:47:45 ORACLE   360 raccolti, 243 analizzati, 3 BUY, 235 veto
19:47:21 ORACLE   360 raccolti, 234 analizzati, 3 BUY, 225 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

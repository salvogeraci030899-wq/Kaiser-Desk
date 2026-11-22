# KAISER · report paper trading

Aggiornato: 2026-11-22 20:36 UTC · in esecuzione da 3.3 giorni · 317 run

| | |
|---|---|
| Equity | **3.8929 SOL** (-35.1% dal capitale iniziale di 6 SOL) |
| Cassa | 3.7970 SOL |
| Trade chiusi | 226 |
| Win rate | 31% |
| P&L realizzato | -2.1245 SOL (~$-148.49) |
| Media vincite / perdite | +40.1% / -31.6% |
| Profit factor | 0.57 |
| Circuit breaker | no |

## Posizioni aperte
- **$AMAZON** P-0663 · 0.078 SOL · +23.7% · resta 100% · [grafico](https://dexscreener.com/solana/9ne7cVeP6BvcyiTcav2CyQpJb8xEWwiDtcBJcVumg7CW)

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
| Senza risposta / decisi dopo 5 minuti | 33 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 59 | -1.7213 |
| Time stop | 86 | -1.0169 |
| TP1 | 52 | +2.2479 |
| RUG-EXIT liquidità | 29 | -1.6342 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $retire | 67 | -35.7% | -0.0282 | +1% | -53% | RUG-EXIT liquidità | 1m |
| $FSDV15 | 88 | -97.8% | -0.0789 | +0% | -97% | RUG-EXIT liquidità | 1m |
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

## Ultimi eventi
```
20:35:54 ORACLE   360 raccolti, 269 analizzati, 1 BUY, 264 veto
20:35:32 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 259 veto
20:35:09 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 269 veto
20:34:47 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 258 veto
20:34:24 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 247 veto
20:34:00 QUARTER  BUY $AMAZON 0.078 SOL score 69 impatto 1.89% (Jupiter)
20:34:00 ORACLE   360 raccolti, 237 analizzati, 1 BUY, 229 veto
20:33:36 QUARTER  SEGNALE $AMAZON score 69 (semi-automatico)
20:33:36 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 232 veto
20:33:13 ORACLE   360 raccolti, 239 analizzati, 0 BUY, 233 veto
20:32:48 ORACLE   360 raccolti, 256 analizzati, 0 BUY, 250 veto
20:32:26 ORACLE   360 raccolti, 250 analizzati, 0 BUY, 243 veto
20:32:02 ORACLE   360 raccolti, 251 analizzati, 0 BUY, 243 veto
20:31:38 ORACLE   360 raccolti, 262 analizzati, 0 BUY, 254 veto
20:31:14 ORACLE   360 raccolti, 262 analizzati, 0 BUY, 255 veto
20:30:51 ORACLE   360 raccolti, 255 analizzati, 0 BUY, 246 veto
20:30:27 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 259 veto
20:30:02 ORACLE   360 raccolti, 269 analizzati, 0 BUY, 261 veto
20:29:38 ORACLE   360 raccolti, 260 analizzati, 1 BUY, 252 veto
20:29:14 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 263 veto
20:28:51 SCRIBE   chiuso P-0662 $retire -0.0282 SOL (-35.7%)
20:28:51 CHARON   RUG-EXIT liquidità $retire vendo 100% a -52.5% -> 0.0508 SOL
20:28:51 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 266 veto
20:28:37 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 259 veto
20:28:12 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 275 veto
20:27:48 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 278 veto
20:27:35 QUARTER  BUY $retire 0.078 SOL score 67 impatto 0.27% (Jupiter)
20:27:35 QUARTER  SEGNALE $retire score 67 (semi-automatico)
20:27:35 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 268 veto
20:27:20 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 266 veto
20:26:55 ORACLE   360 raccolti, 285 analizzati, 0 BUY, 279 veto
20:26:32 ORACLE   360 raccolti, 286 analizzati, 0 BUY, 279 veto
20:26:08 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 271 veto
20:25:44 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 273 veto
20:25:20 ORACLE   360 raccolti, 282 analizzati, 0 BUY, 271 veto
20:24:56 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 268 veto
20:24:32 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 270 veto
20:24:08 ORACLE   360 raccolti, 277 analizzati, 0 BUY, 267 veto
20:23:45 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 266 veto
20:23:22 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 269 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

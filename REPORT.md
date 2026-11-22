# KAISER · report paper trading

Aggiornato: 2026-11-22 18:20 UTC · in esecuzione da 3.2 giorni · 314 run

| | |
|---|---|
| Equity | **3.9153 SOL** (-34.7% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9153 SOL |
| Trade chiusi | 217 |
| Win rate | 31% |
| P&L realizzato | -2.0847 SOL (~$-146.34) |
| Media vincite / perdite | +38.9% / -31.6% |
| Profit factor | 0.56 |
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
| Senza risposta / decisi dopo 5 minuti | 22 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 58 | -1.7068 |
| Time stop | 82 | -0.9693 |
| TP1 | 50 | +2.1184 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $MooSom | 76 | -28.5% | -0.0228 | +24% | -19% | Time stop | 6m |
| $RDIFF | 66 | -11.0% | -0.0088 | +0% | -5% | Time stop | 5m |
| $cateball | 63 | +0.5% | +0.0004 | +1% | -1% | Time stop | 5m |
| $SINGU | 73 | +2.2% | +0.0017 | +10% | -6% | Time stop | 5m |
| $GIFTER | 70 | -50.7% | -0.0410 | +0% | -61% | RUG-EXIT liquidità | 2m |

## Ultimi eventi
```
18:20:17 ORACLE   360 raccolti, 274 analizzati, 2 BUY, 267 veto
18:19:52 ORACLE   360 raccolti, 270 analizzati, 2 BUY, 262 veto
18:19:28 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 266 veto
18:19:04 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 270 veto
18:18:41 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 262 veto
18:18:16 ORACLE   360 raccolti, 279 analizzati, 1 BUY, 273 veto
18:17:53 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 278 veto
18:17:30 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 277 veto
18:17:06 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 278 veto
18:16:44 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 277 veto
18:16:30 SCRIBE   chiuso P-0653 $IF -0.0321 SOL (-40.2%)
18:16:30 CHARON   Time stop $IF vendo 100% a -5.3% -> 0.0478 SOL
18:16:20 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 255 veto
18:15:57 ORACLE   360 raccolti, 279 analizzati, 1 BUY, 276 veto
18:15:34 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 269 veto
18:15:11 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 265 veto
18:14:48 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 265 veto
18:14:25 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 265 veto
18:14:02 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 234 veto
18:13:38 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 255 veto
18:13:14 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 257 veto
18:12:51 ORACLE   360 raccolti, 244 analizzati, 1 BUY, 236 veto
18:12:27 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 254 veto
18:12:04 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 264 veto
18:11:41 ORACLE   360 raccolti, 269 analizzati, 1 BUY, 261 veto
18:11:27 QUARTER  BUY $IF 0.079 SOL score 64 impatto 0.15% (Jupiter)
18:11:26 QUARTER  SEGNALE $IF score 64 (semi-automatico)
18:11:26 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 265 veto
18:11:11 SCRIBE   chiuso P-0652 $BTC 0.0321 SOL (40.5%)
18:11:11 CHARON   TP1 $BTC vendo 100% a 62.2% -> 0.1114 SOL
18:11:01 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 260 veto
18:10:37 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 251 veto
18:10:12 ORACLE   360 raccolti, 269 analizzati, 1 BUY, 259 veto
18:09:48 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 273 veto
18:09:25 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 264 veto
18:09:00 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 259 veto
18:08:36 QUARTER  BUY $BTC 0.078 SOL score 77 impatto 0.77% (Jupiter)
18:08:36 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 269 veto
18:08:13 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 256 veto
18:07:50 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 265 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

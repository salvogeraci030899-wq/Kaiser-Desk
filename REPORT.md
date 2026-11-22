# KAISER · report paper trading

Aggiornato: 2026-11-22 16:54 UTC · in esecuzione da 3.1 giorni · 312 run

| | |
|---|---|
| Equity | **3.9636 SOL** (-33.9% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9636 SOL |
| Trade chiusi | 211 |
| Win rate | 32% |
| P&L realizzato | -2.0364 SOL (~$-143.57) |
| Media vincite / perdite | +38.9% / -32.0% |
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
| Esito | **in corso** (1 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | n/d (1) |
| Netto a 60 s | n/d (1) |
| Netto a 300 s (primario) | n/d (1) |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 0.89% / 6.3 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 1 / 1 / 0 / 0 / 0 |

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
| Senza risposta / decisi dopo 5 minuti | 14 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 57 | -1.6734 |
| Time stop | 79 | -0.9278 |
| TP1 | 48 | +2.0919 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $eˣ | 74 | +14.2% | +0.0114 | +68% | +68% | TP1 | 6m |
| $casual | 63 | +52.2% | +0.0416 | +61% | +61% | TP1 | 8m |
| $TC | 65 | -8.5% | -0.0068 | +15% | +5% | Time stop | 6m |
| $FIREBALL | 68 | -54.2% | -0.0438 | +0% | -34% | Stop loss | 4m |
| $AMAZON | 69 | -58.8% | -0.0481 | +53% | -34% | Stop loss | 10m |
| $CI | 72 | -36.2% | -0.0298 | +8% | -31% | Stop loss | 3m |

## Ultimi eventi
```
16:54:11 SCRIBE   fine run · trade 211 · win 32% · P&L -2.0364 SOL · equity 3.9636 SOL
16:54:05 QUARTER  $FOAM impatto 2.2% oltre slippage: annullato
16:54:05 QUARTER  SEGNALE $FOAM score 70 (semi-automatico)
16:54:05 SCRIBE   chiuso P-0647 $OMGAI 0.0095 SOL (11.9%)
16:54:05 CHARON   Time stop $OMGAI vendo 100% a 4.3% -> 0.0896 SOL
16:54:05 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 273 veto
16:53:40 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 284 veto
16:53:17 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 281 veto
16:52:54 ORACLE   360 raccolti, 292 analizzati, 2 BUY, 282 veto
16:52:31 ORACLE   360 raccolti, 297 analizzati, 1 BUY, 286 veto
16:52:08 ORACLE   360 raccolti, 294 analizzati, 1 BUY, 285 veto
16:51:45 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 269 veto
16:51:21 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 276 veto
16:50:58 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 270 veto
16:50:35 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 265 veto
16:50:12 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 271 veto
16:49:48 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 268 veto
16:49:25 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 260 veto
16:49:01 QUARTER  BUY $OMGAI 0.079 SOL score 75 impatto 1.39% (Jupiter)
16:49:01 QUARTER  SEGNALE $OMGAI score 75 (semi-automatico)
16:49:01 ORACLE   360 raccolti, 269 analizzati, 1 BUY, 260 veto
16:48:38 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 257 veto
16:48:14 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 255 veto
16:48:08 SCOUT    Laboratorio: collegato a PumpPortal
16:47:51 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 260 veto
16:47:28 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 254 veto
16:47:05 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 248 veto
16:46:42 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 257 veto
16:46:18 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 261 veto
16:45:55 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 252 veto
16:45:31 ORACLE   360 raccolti, 278 analizzati, 1 BUY, 268 veto
16:45:08 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 265 veto
16:44:45 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 261 veto
16:44:21 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 274 veto
16:43:59 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 272 veto
16:43:35 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 263 veto
16:43:12 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 265 veto
16:42:49 ORACLE   360 raccolti, 279 analizzati, 1 BUY, 270 veto
16:42:26 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 265 veto
16:42:03 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 274 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

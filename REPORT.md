# KAISER · report paper trading

Aggiornato: 2026-11-22 15:39 UTC · in esecuzione da 3.1 giorni · 311 run

| | |
|---|---|
| Equity | **3.9462 SOL** (-34.2% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9462 SOL |
| Trade chiusi | 207 |
| Win rate | 31% |
| P&L realizzato | -2.0538 SOL (~$-144.32) |
| Media vincite / perdite | +40.2% / -32.2% |
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
| Esito | **in corso** (0 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | n/d (0) |
| Netto a 60 s | n/d (0) |
| Netto a 300 s (primario) | n/d (0) |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | n/d / n/d |
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
| Senza risposta / decisi dopo 5 minuti | 9 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 57 | -1.6734 |
| Time stop | 75 | -0.9452 |
| TP1 | 48 | +2.0919 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $SANTA | 74 | +92.2% | +0.0745 | +61% | +61% | TP1 | 5m |
| $CORONA | 72 | +24.8% | +0.0199 | +72% | +72% | TP1 | 3m |
| $Biao | 63 | -31.7% | -0.0257 | +3% | -24% | Time stop | 5m |
| $snowball | 64 | -11.7% | -0.0095 | +64% | +64% | TP1 | 1m |

## Ultimi eventi
```
15:39:39 ORACLE   360 raccolti, 261 analizzati, 0 BUY, 247 veto
15:39:15 ORACLE   360 raccolti, 260 analizzati, 0 BUY, 244 veto
15:38:51 ORACLE   360 raccolti, 249 analizzati, 0 BUY, 235 veto
15:38:27 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 250 veto
15:38:04 ORACLE   360 raccolti, 257 analizzati, 0 BUY, 244 veto
15:37:40 ORACLE   360 raccolti, 247 analizzati, 1 BUY, 235 veto
15:37:16 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 248 veto
15:36:52 ORACLE   360 raccolti, 253 analizzati, 1 BUY, 240 veto
15:36:28 ORACLE   360 raccolti, 254 analizzati, 0 BUY, 239 veto
15:36:05 ORACLE   360 raccolti, 257 analizzati, 0 BUY, 244 veto
15:35:41 ORACLE   360 raccolti, 256 analizzati, 1 BUY, 243 veto
15:35:18 ORACLE   360 raccolti, 253 analizzati, 1 BUY, 241 veto
15:34:54 ORACLE   360 raccolti, 261 analizzati, 0 BUY, 247 veto
15:34:30 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 251 veto
15:34:07 ORACLE   360 raccolti, 257 analizzati, 1 BUY, 247 veto
15:33:43 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 258 veto
15:33:18 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 258 veto
15:32:55 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 246 veto
15:32:32 ORACLE   360 raccolti, 267 analizzati, 1 BUY, 258 veto
15:32:08 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 259 veto
15:31:44 ORACLE   360 raccolti, 258 analizzati, 1 BUY, 247 veto
15:31:20 ORACLE   360 raccolti, 267 analizzati, 1 BUY, 254 veto
15:30:56 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 255 veto
15:30:33 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 252 veto
15:30:08 SCRIBE   chiuso P-0643 $MengLan 0.0635 SOL (80.7%)
15:30:08 CHARON   TP1 $MengLan vendo 100% a 108.5% -> 0.1421 SOL
15:30:08 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 259 veto
15:29:44 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 257 veto
15:29:20 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 249 veto
15:28:57 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 265 veto
15:28:33 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 263 veto
15:28:08 ORACLE   360 raccolti, 265 analizzati, 1 BUY, 255 veto
15:27:44 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 268 veto
15:27:31 QUARTER  BUY $MengLan 0.078 SOL score 65 impatto 1.39% (Jupiter)
15:27:31 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 268 veto
15:27:06 QUARTER  $MengLan impatto 3.8% oltre slippage: annullato
15:27:06 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 267 veto
15:26:53 QUARTER  $MengLan impatto 2.3% oltre slippage: annullato
15:26:52 QUARTER  SEGNALE $MengLan score 64 (semi-automatico)
15:26:52 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 264 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

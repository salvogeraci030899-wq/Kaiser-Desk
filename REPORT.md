# KAISER · report paper trading

Aggiornato: 2026-11-22 14:43 UTC · in esecuzione da 3.0 giorni · 310 run

| | |
|---|---|
| Equity | **3.9135 SOL** (-34.8% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9135 SOL |
| Trade chiusi | 205 |
| Win rate | 31% |
| P&L realizzato | -2.0865 SOL (~$-146.43) |
| Media vincite / perdite | +39.5% / -32.1% |
| Profit factor | 0.55 |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 14:23 UTC.
Regola decisa in anticipo: orizzonte 300 s (gli altri sono solo descrittivi), almeno 300 token, netto medio >= +3% e limite inferiore al 95% sopra zero.

| | |
|---|---|
| Esito | **in corso** (0 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | n/d (0) |
| Netto a 60 s | n/d (0) |
| Netto a 300 s (primario) | n/d (0) |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | n/d / n/d |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 0 / 0 / 0 / 0 / 0 |

## Uomo e macchina: i segnali che prendi contro quelli che scarti
Il radar sceglie, tu decidi (Prendo o Scarto) senza vedere il punteggio del bot. Rendimento a 5 minuti dalla tua decisione, meno 5% di costo a giro (stima mediana, non una misura per ogni token).
Regola decisa in anticipo: almeno 50 presi e 30 scartati, netto medio dei presi >= +3% con limite inferiore sopra zero e sopra gli scartati.

| | |
|---|---|
| Esito | **in corso** |
| Presi / scartati (con misura a 5 minuti) | 2 / 0 |
| Netto medio dei presi | +69.5% (intervallo -86.7% / +225.6%) |
| Netto medio degli scartati | n/d% |
| Differenza presi meno scartati (limite inferiore) | n/d |
| Senza risposta / decisi dopo 5 minuti | 7 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 56 | -1.6426 |
| Time stop | 75 | -0.9452 |
| TP1 | 47 | +2.0284 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $RARE | 63 | -50.7% | -0.0415 | +0% | -56% | RUG-EXIT liquidità | 1m |
| $Snowball | 64 | +22.1% | +0.0180 | +70% | +70% | TP1 | 5m |

## Ultimi eventi
```
14:43:56 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 261 veto
14:43:34 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 269 veto
14:43:11 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 270 veto
14:42:49 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 262 veto
14:42:26 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 271 veto
14:42:03 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 268 veto
14:41:40 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 265 veto
14:41:27 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 269 veto
14:41:00 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 268 veto
14:40:38 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 264 veto
14:40:16 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 265 veto
14:39:53 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 275 veto
14:39:30 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 273 veto
14:39:07 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 276 veto
14:38:44 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 274 veto
14:38:22 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 271 veto
14:37:59 ORACLE   360 raccolti, 288 analizzati, 3 BUY, 275 veto
14:37:36 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 270 veto
14:37:14 ORACLE   360 raccolti, 280 analizzati, 2 BUY, 267 veto
14:37:12 SCOUT    gecko trend: HTTP 429 (riuso l'ultimo elenco)
14:37:12 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
14:36:51 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 275 veto
14:36:28 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 273 veto
14:36:06 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 261 veto
14:35:43 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 272 veto
14:35:20 ORACLE   360 raccolti, 278 analizzati, 2 BUY, 264 veto
14:34:57 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 259 veto
14:34:34 ORACLE   360 raccolti, 277 analizzati, 3 BUY, 261 veto
14:34:21 SCRIBE   chiuso P-0641 $KYC 0.0472 SOL (60.3%)
14:34:21 CHARON   TP1 $KYC vendo 100% a 61.3% -> 0.1255 SOL
14:34:11 ORACLE   360 raccolti, 273 analizzati, 2 BUY, 256 veto
14:33:48 ORACLE   360 raccolti, 273 analizzati, 2 BUY, 257 veto
14:33:25 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 268 veto
14:33:02 ORACLE   360 raccolti, 275 analizzati, 3 BUY, 264 veto
14:32:39 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 261 veto
14:32:16 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 263 veto
14:31:54 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 261 veto
14:31:31 QUARTER  BUY $KYC 0.077 SOL score 65 impatto 1.62% (Jupiter)
14:31:30 QUARTER  SEGNALE $KYC score 65 (semi-automatico)
14:31:30 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 250 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

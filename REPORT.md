# KAISER · report paper trading

Aggiornato: 2026-11-22 12:43 UTC · in esecuzione da 2.9 giorni · 307 run

| | |
|---|---|
| Equity | **3.8850 SOL** (-35.3% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8850 SOL |
| Trade chiusi | 200 |
| Win rate | 31% |
| P&L realizzato | -2.1150 SOL (~$-148.17) |
| Media vincite / perdite | +39.4% / -32.5% |
| Profit factor | 0.54 |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 11:53 UTC.
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
| Presi / scartati (con misura a 5 minuti) | 0 / 0 |
| Netto medio dei presi | n/d |
| Netto medio degli scartati | n/d% |
| Differenza presi meno scartati (limite inferiore) | n/d |
| Senza risposta / decisi dopo 5 minuti | 4 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 56 | -1.6426 |
| Time stop | 72 | -0.9066 |
| TP1 | 45 | +1.9612 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $LEONIDA | 72 | -25.1% | -0.0206 | +5% | -31% | Stop loss | 3m |
| $Tiger | 74 | -20.0% | -0.0164 | +60% | +60% | TP1 | 1m |
| $FRIEND | 69 | -8.4% | -0.0069 | +15% | +5% | Time stop | 5m |
| $MASCOIN | 65 | +6.3% | +0.0052 | +0% | -41% | Stop loss | 3m |
| $SANTA | 70 | -82.2% | -0.0689 | +17% | -74% | RUG-EXIT liquidità | 4m |

## Ultimi eventi
```
12:43:01 SCRIBE   fine run · trade 200 · win 31% · P&L -2.1150 SOL · equity 3.8850 SOL
12:42:42 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 263 veto
12:42:18 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 268 veto
12:41:56 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 266 veto
12:41:33 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 266 veto
12:41:30 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
12:41:09 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 269 veto
12:40:57 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 272 veto
12:40:32 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 264 veto
12:40:08 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 274 veto
12:39:45 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 274 veto
12:39:22 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 273 veto
12:38:59 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 276 veto
12:38:37 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 272 veto
12:38:14 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 271 veto
12:37:51 ORACLE   360 raccolti, 291 analizzati, 0 BUY, 281 veto
12:37:28 ORACLE   360 raccolti, 290 analizzati, 0 BUY, 279 veto
12:37:05 ORACLE   360 raccolti, 285 analizzati, 0 BUY, 273 veto
12:36:41 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 267 veto
12:36:18 ORACLE   360 raccolti, 291 analizzati, 0 BUY, 278 veto
12:35:54 ORACLE   360 raccolti, 284 analizzati, 0 BUY, 270 veto
12:35:31 ORACLE   360 raccolti, 289 analizzati, 1 BUY, 275 veto
12:35:08 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 270 veto
12:34:44 ORACLE   360 raccolti, 278 analizzati, 1 BUY, 267 veto
12:34:21 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 273 veto
12:33:58 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 272 veto
12:33:35 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 262 veto
12:33:11 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 268 veto
12:32:48 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 262 veto
12:32:25 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 258 veto
12:32:02 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 258 veto
12:31:39 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 263 veto
12:31:15 ORACLE   360 raccolti, 267 analizzati, 1 BUY, 255 veto
12:30:52 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 264 veto
12:30:29 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 262 veto
12:30:05 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 252 veto
12:29:41 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 259 veto
12:29:18 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 261 veto
12:28:55 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 257 veto
12:28:32 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 261 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

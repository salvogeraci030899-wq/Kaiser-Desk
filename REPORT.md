# KAISER · report paper trading

Aggiornato: 2026-11-22 13:13 UTC · in esecuzione da 3.0 giorni · 308 run

| | |
|---|---|
| Equity | **3.9049 SOL** (-34.9% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9049 SOL |
| Trade chiusi | 201 |
| Win rate | 31% |
| P&L realizzato | -2.0951 SOL (~$-146.83) |
| Media vincite / perdite | +39.2% / -32.5% |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 12:43 UTC.
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
| TP1 | 46 | +1.9812 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $LEONIDA | 72 | -25.1% | -0.0206 | +5% | -31% | Stop loss | 3m |
| $Tiger | 74 | -20.0% | -0.0164 | +60% | +60% | TP1 | 1m |
| $FRIEND | 69 | -8.4% | -0.0069 | +15% | +5% | Time stop | 5m |
| $MASCOIN | 65 | +6.3% | +0.0052 | +0% | -41% | Stop loss | 3m |

## Ultimi eventi
```
13:13:49 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 266 veto
13:13:26 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 266 veto
13:13:03 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 267 veto
13:12:40 ORACLE   360 raccolti, 271 analizzati, 0 BUY, 263 veto
13:12:15 ORACLE   360 raccolti, 270 analizzati, 0 BUY, 265 veto
13:11:52 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 269 veto
13:11:29 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 266 veto
13:11:06 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 266 veto
13:10:42 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 266 veto
13:10:18 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 264 veto
13:09:54 ORACLE   360 raccolti, 282 analizzati, 0 BUY, 271 veto
13:09:31 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 272 veto
13:09:07 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 267 veto
13:08:43 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 272 veto
13:08:18 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 267 veto
13:07:54 ORACLE   360 raccolti, 271 analizzati, 0 BUY, 260 veto
13:07:31 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 268 veto
13:07:07 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 269 veto
13:06:43 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 260 veto
13:06:19 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 270 veto
13:05:55 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 267 veto
13:05:31 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 263 veto
13:05:07 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 264 veto
13:04:44 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 264 veto
13:04:21 ORACLE   360 raccolti, 277 analizzati, 0 BUY, 265 veto
13:03:57 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 270 veto
13:03:33 SCOUT    regola C-067: corrente (nuova strategia: 10K rit. 10s +15/-10 300s: vecchi -8.27%, recenti -8%)
13:03:33 SCOUT    regola C-066: ritirata (105 operazioni in avanti, esito medio -18.3% (±5.4): non regge)
13:03:33 SCOUT    strategia C-067: corrente: nuova strategia: 10K rit. 10s +15/-10 300s: vecchi -8.27%, recenti -8%
13:03:33 SCOUT    strategia C-066: ritirata: 105 operazioni in avanti, esito medio -18.3% (±5.4): non regge
13:03:33 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 268 veto
13:03:10 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 264 veto
13:02:45 ORACLE   360 raccolti, 268 analizzati, 0 BUY, 256 veto
13:02:22 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 259 veto
13:01:58 ORACLE   360 raccolti, 268 analizzati, 0 BUY, 256 veto
13:01:34 ORACLE   360 raccolti, 270 analizzati, 0 BUY, 260 veto
13:01:10 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 262 veto
13:00:46 ORACLE   360 raccolti, 269 analizzati, 1 BUY, 258 veto
13:00:22 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 264 veto
13:00:08 SCRIBE   chiuso P-0637 $MCAT 0.0200 SOL (25.4%)
```

Regole attive: config.json su questo branch. Solo paper trading.

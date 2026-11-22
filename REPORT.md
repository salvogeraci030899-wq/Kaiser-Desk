# KAISER · report paper trading

Aggiornato: 2026-11-22 13:54 UTC · in esecuzione da 3.0 giorni · 309 run

| | |
|---|---|
| Equity | **3.8959 SOL** (-35.1% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8959 SOL |
| Trade chiusi | 202 |
| Win rate | 31% |
| P&L realizzato | -2.1041 SOL (~$-147.11) |
| Media vincite / perdite | +39.2% / -32.3% |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 13:33 UTC.
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
| Senza risposta / decisi dopo 5 minuti | 5 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 56 | -1.6426 |
| Time stop | 73 | -0.9156 |
| TP1 | 46 | +1.9812 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $LEONIDA | 72 | -25.1% | -0.0206 | +5% | -31% | Stop loss | 3m |
| $Tiger | 74 | -20.0% | -0.0164 | +60% | +60% | TP1 | 1m |
| $FRIEND | 69 | -8.4% | -0.0069 | +15% | +5% | Time stop | 5m |

## Ultimi eventi
```
13:53:51 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 268 veto
13:53:28 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 271 veto
13:53:04 ORACLE   360 raccolti, 292 analizzati, 1 BUY, 280 veto
13:52:41 ORACLE   360 raccolti, 288 analizzati, 1 BUY, 277 veto
13:52:17 ORACLE   360 raccolti, 278 analizzati, 1 BUY, 266 veto
13:51:53 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 269 veto
13:51:39 SCRIBE   chiuso P-0638 $SI -0.0090 SOL (-11.4%)
13:51:39 CHARON   Time stop $SI vendo 100% a 2.6% -> 0.0701 SOL
13:51:28 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 268 veto
13:51:05 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 262 veto
13:50:40 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 272 veto
13:50:17 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 271 veto
13:49:52 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 263 veto
13:49:28 ORACLE   360 raccolti, 272 analizzati, 1 BUY, 264 veto
13:49:05 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 264 veto
13:48:42 ORACLE   360 raccolti, 267 analizzati, 1 BUY, 258 veto
13:48:18 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 262 veto
13:47:54 ORACLE   360 raccolti, 266 analizzati, 1 BUY, 258 veto
13:47:31 ORACLE   360 raccolti, 265 analizzati, 1 BUY, 256 veto
13:47:07 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 260 veto
13:46:43 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 254 veto
13:46:29 QUARTER  BUY $SI 0.078 SOL score 70 impatto 1.20% (Jupiter)
13:46:29 QUARTER  SEGNALE $SI score 70 (semi-automatico)
13:46:29 ORACLE   360 raccolti, 257 analizzati, 1 BUY, 248 veto
13:46:04 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 261 veto
13:45:40 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 260 veto
13:45:17 ORACLE   360 raccolti, 257 analizzati, 0 BUY, 245 veto
13:45:14 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
13:44:54 ORACLE   360 raccolti, 268 analizzati, 0 BUY, 257 veto
13:44:30 ORACLE   360 raccolti, 268 analizzati, 0 BUY, 256 veto
13:44:06 ORACLE   360 raccolti, 271 analizzati, 0 BUY, 260 veto
13:43:43 ORACLE   360 raccolti, 271 analizzati, 0 BUY, 260 veto
13:43:20 ORACLE   360 raccolti, 265 analizzati, 0 BUY, 254 veto
13:42:56 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 253 veto
13:42:33 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 264 veto
13:42:09 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 263 veto
13:41:46 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 251 veto
13:41:22 ORACLE   360 raccolti, 261 analizzati, 0 BUY, 252 veto
13:40:58 ORACLE   360 raccolti, 267 analizzati, 0 BUY, 254 veto
13:40:33 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 249 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

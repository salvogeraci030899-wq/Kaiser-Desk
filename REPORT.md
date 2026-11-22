# KAISER · report paper trading

Aggiornato: 2026-11-22 15:55 UTC · in esecuzione da 3.1 giorni · 311 run

| | |
|---|---|
| Equity | **3.9569 SOL** (-34.1% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8731 SOL |
| Trade chiusi | 208 |
| Win rate | 31% |
| P&L realizzato | -2.0468 SOL (~$-143.91) |
| Media vincite / perdite | +39.7% / -32.2% |
| Profit factor | 0.56 |
| Circuit breaker | no |

## Posizioni aperte
- **$GIF** P-0645 · 0.079 SOL · +6.0% · resta 100% · [grafico](https://dexscreener.com/solana/FNH2ezsLR4sQecWizaYTR7W1pjM3LRoJ85QXYE5gL9CE)

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
| Senza risposta / decisi dopo 5 minuti | 10 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 57 | -1.6734 |
| Time stop | 76 | -0.9383 |
| TP1 | 48 | +2.0919 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $SANTA | 74 | +92.2% | +0.0745 | +61% | +61% | TP1 | 5m |
| $CORONA | 72 | +24.8% | +0.0199 | +72% | +72% | TP1 | 3m |
| $Biao | 63 | -31.7% | -0.0257 | +3% | -24% | Time stop | 5m |

## Ultimi eventi
```
15:55:03 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 258 veto
15:54:39 ORACLE   360 raccolti, 268 analizzati, 2 BUY, 256 veto
15:54:15 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 241 veto
15:53:51 ORACLE   360 raccolti, 263 analizzati, 2 BUY, 249 veto
15:53:27 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 249 veto
15:53:04 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 250 veto
15:52:40 ORACLE   360 raccolti, 267 analizzati, 2 BUY, 252 veto
15:52:17 ORACLE   360 raccolti, 267 analizzati, 2 BUY, 251 veto
15:51:53 ORACLE   360 raccolti, 265 analizzati, 2 BUY, 248 veto
15:51:29 QUARTER  BUY $GIF 0.079 SOL score 64 impatto 1.61% (Jupiter)
15:51:28 QUARTER  SEGNALE $GIF score 64 (semi-automatico)
15:51:28 ORACLE   360 raccolti, 268 analizzati, 2 BUY, 250 veto
15:51:04 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 250 veto
15:50:41 ORACLE   360 raccolti, 260 analizzati, 1 BUY, 243 veto
15:50:16 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 245 veto
15:49:52 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 252 veto
15:49:28 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 244 veto
15:49:04 SCRIBE   chiuso P-0644 $FRANK 0.0069 SOL (8.7%)
15:49:04 CHARON   Time stop $FRANK vendo 100% a -12.1% -> 0.0868 SOL
15:49:04 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 249 veto
15:48:40 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 248 veto
15:48:17 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 248 veto
15:47:53 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 253 veto
15:47:29 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 248 veto
15:47:05 ORACLE   360 raccolti, 267 analizzati, 1 BUY, 251 veto
15:46:41 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 259 veto
15:46:18 ORACLE   360 raccolti, 270 analizzati, 1 BUY, 253 veto
15:45:54 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 248 veto
15:45:30 ORACLE   360 raccolti, 277 analizzati, 0 BUY, 263 veto
15:45:06 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 257 veto
15:44:41 SCOUT    regola C-068: corrente (nuova strategia: 12K rit. 10s +10/-15 60s: vecchi -8.14%, recenti -8.18%)
15:44:41 SCOUT    regola C-067: ritirata (103 operazioni in avanti, esito medio -12.4% (±6.6): non regge)
15:44:41 SCOUT    strategia C-068: corrente: nuova strategia: 12K rit. 10s +10/-15 60s: vecchi -8.14%, recenti -8.18%
15:44:41 SCOUT    strategia C-067: ritirata: 103 operazioni in avanti, esito medio -12.4% (±6.6): non regge
15:44:41 ORACLE   360 raccolti, 273 analizzati, 0 BUY, 255 veto
15:44:17 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 260 veto
15:43:53 QUARTER  BUY $FRANK 0.079 SOL score 70 impatto 0.00% (Jupiter)
15:43:53 QUARTER  SEGNALE $FRANK score 70 (semi-automatico)
15:43:53 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 261 veto
15:43:29 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 254 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

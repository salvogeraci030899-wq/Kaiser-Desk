# KAISER · report paper trading

Aggiornato: 2026-11-22 17:44 UTC · in esecuzione da 3.1 giorni · 313 run

| | |
|---|---|
| Equity | **3.9203 SOL** (-34.7% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9203 SOL |
| Trade chiusi | 214 |
| Win rate | 31% |
| P&L realizzato | -2.0797 SOL (~$-146.37) |
| Media vincite / perdite | +38.9% / -31.8% |
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
| Senza risposta / decisi dopo 5 minuti | 19 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 58 | -1.7068 |
| Time stop | 80 | -0.9321 |
| TP1 | 49 | +2.0863 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $eˣ | 74 | +14.2% | +0.0114 | +68% | +68% | TP1 | 6m |
| $casual | 63 | +52.2% | +0.0416 | +61% | +61% | TP1 | 8m |
| $TC | 65 | -8.5% | -0.0068 | +15% | +5% | Time stop | 6m |

## Ultimi eventi
```
17:44:24 SCRIBE   fine run · trade 214 · win 31% · P&L -2.0797 SOL · equity 3.9203 SOL
17:44:10 ORACLE   360 raccolti, 270 analizzati, 3 BUY, 257 veto
17:43:47 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 246 veto
17:43:24 ORACLE   360 raccolti, 265 analizzati, 2 BUY, 251 veto
17:43:01 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 261 veto
17:42:39 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 251 veto
17:42:16 ORACLE   360 raccolti, 261 analizzati, 2 BUY, 249 veto
17:41:53 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 252 veto
17:41:30 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 251 veto
17:41:07 ORACLE   360 raccolti, 280 analizzati, 3 BUY, 269 veto
17:40:44 ORACLE   360 raccolti, 267 analizzati, 2 BUY, 257 veto
17:40:22 ORACLE   360 raccolti, 265 analizzati, 2 BUY, 256 veto
17:39:58 ORACLE   360 raccolti, 269 analizzati, 3 BUY, 259 veto
17:39:35 ORACLE   360 raccolti, 271 analizzati, 3 BUY, 260 veto
17:39:12 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 253 veto
17:38:49 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 247 veto
17:38:26 ORACLE   360 raccolti, 261 analizzati, 2 BUY, 248 veto
17:38:03 ORACLE   360 raccolti, 261 analizzati, 2 BUY, 249 veto
17:37:40 ORACLE   360 raccolti, 270 analizzati, 3 BUY, 258 veto
17:37:17 ORACLE   360 raccolti, 265 analizzati, 3 BUY, 253 veto
17:36:53 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 245 veto
17:36:30 ORACLE   360 raccolti, 267 analizzati, 2 BUY, 255 veto
17:36:07 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 259 veto
17:35:43 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 253 veto
17:35:20 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 249 veto
17:34:57 ORACLE   360 raccolti, 266 analizzati, 3 BUY, 252 veto
17:34:34 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 239 veto
17:34:11 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 243 veto
17:33:48 ORACLE   360 raccolti, 260 analizzati, 3 BUY, 244 veto
17:33:25 ORACLE   360 raccolti, 260 analizzati, 4 BUY, 244 veto
17:33:02 ORACLE   360 raccolti, 260 analizzati, 4 BUY, 248 veto
17:32:39 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 248 veto
17:32:16 ORACLE   360 raccolti, 252 analizzati, 3 BUY, 241 veto
17:31:53 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 245 veto
17:31:40 SCRIBE   chiuso P-0650 $SANTIA -0.0043 SOL (-5.4%)
17:31:40 CHARON   Time stop $SANTIA vendo 100% a -14.4% -> 0.0752 SOL
17:31:30 ORACLE   360 raccolti, 255 analizzati, 4 BUY, 245 veto
17:31:07 ORACLE   360 raccolti, 244 analizzati, 4 BUY, 234 veto
17:30:44 ORACLE   360 raccolti, 254 analizzati, 3 BUY, 240 veto
17:30:20 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 241 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

# KAISER · report paper trading

Aggiornato: 2026-11-22 21:39 UTC · in esecuzione da 0.0 giorni · 318 run

| | |
|---|---|
| Equity | **6.0112 SOL** (+0.2% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0112 SOL |
| Trade chiusi | 1 |
| Win rate | 100% |
| P&L realizzato | +0.0112 SOL (~$0.79) |
| Media vincite / perdite | +9.3% / +0.0% |
| Profit factor | ∞ |
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
| Esito | **in corso** (4 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -12.9% (intervallo -30.8% / +5.1%), mediana -3.8%, in utile 0%, senza rotta 0 su 4 |
| Netto a 60 s | -16.2% (intervallo -70.9% / +38.5%), mediana +7.4%, in utile 50%, senza rotta 0 su 4 |
| Netto a 300 s (primario) | -8.8% (intervallo -76.9% / +59.2%), mediana -1.5%, in utile 50%, senza rotta 0 su 4 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 6.53% / 7.8 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 4 / 4 / 0 / 0 / 0 |

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
| Senza risposta / decisi dopo 5 minuti | 0 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| TP1 | 1 | +0.0112 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $GOKU | 65 | +9.3% | +0.0112 | +67% | +67% | TP1 | 0m |

## Ultimi eventi
```
21:39:32 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 276 veto
21:39:09 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 269 veto
21:38:44 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 282 veto
21:38:21 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 275 veto
21:37:57 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 276 veto
21:37:33 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 273 veto
21:37:09 ORACLE   360 raccolti, 273 analizzati, 2 BUY, 264 veto
21:36:46 ORACLE   360 raccolti, 272 analizzati, 2 BUY, 261 veto
21:36:32 SCRIBE   chiuso P-0669 $GOKU 0.0112 SOL (9.3%)
21:36:32 CHARON   TP1 $GOKU vendo 100% a 67.3% -> 0.1322 SOL
21:36:32 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 267 veto
21:36:07 QUARTER  BUY $GOKU 0.120 SOL score 65 impatto 0.46% (Jupiter)
21:36:06 QUARTER  SEGNALE $GOKU score 65 (semi-automatico)
21:36:06 ORACLE   360 raccolti, 272 analizzati, 2 BUY, 262 veto
21:35:42 QUARTER  $Incidents impatto 2.6% oltre slippage: annullato
21:35:42 QUARTER  SEGNALE $Incidents score 63 (semi-automatico)
21:35:42 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 261 veto
21:35:18 ORACLE   360 raccolti, 269 analizzati, 1 BUY, 256 veto
21:34:54 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 251 veto
21:34:41 ORACLE   360 raccolti, 253 analizzati, 1 BUY, 241 veto
21:34:15 ORACLE   360 raccolti, 270 analizzati, 0 BUY, 257 veto
21:33:51 ORACLE   360 raccolti, 271 analizzati, 0 BUY, 259 veto
21:33:38 ORACLE   360 raccolti, 266 analizzati, 0 BUY, 254 veto
21:33:32 KAISER   reset del paper (C-0118): conto azzerato, capitale 6 SOL
21:33:12 ORACLE   360 raccolti, 260 analizzati, 0 BUY, 250 veto
21:32:49 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 254 veto
21:32:25 ORACLE   360 raccolti, 249 analizzati, 1 BUY, 241 veto
21:32:01 ORACLE   360 raccolti, 260 analizzati, 1 BUY, 253 veto
21:31:37 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 251 veto
21:31:14 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 254 veto
21:30:50 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 254 veto
21:30:27 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 261 veto
21:30:03 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 252 veto
21:29:39 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 259 veto
21:29:25 SCRIBE   chiuso P-0668 $Incidents -0.0001 SOL (-0.1%)
21:29:25 CHARON   Time stop $Incidents vendo 100% a -3.7% -> 0.1206 SOL
21:29:14 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 259 veto
21:28:51 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 251 veto
21:28:26 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 263 veto
21:28:03 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 255 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

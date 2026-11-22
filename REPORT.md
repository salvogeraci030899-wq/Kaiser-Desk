# KAISER · report paper trading

Aggiornato: 2026-11-22 21:26 UTC · in esecuzione da 0.0 giorni · 318 run

| | |
|---|---|
| Equity | **5.9736 SOL** (-0.4% dal capitale iniziale di 6 SOL) |
| Cassa | 5.8661 SOL |
| Trade chiusi | 1 |
| Win rate | 0% |
| P&L realizzato | -0.0132 SOL (~$-0.93) |
| Media vincite / perdite | +0.0% / -10.9% |
| Profit factor | 0.00 |
| Circuit breaker | no |

## Posizioni aperte
- **$Incidents** P-0668 · 0.120 SOL · -10.2% · resta 100% · [grafico](https://dexscreener.com/solana/GRjv6EruC7TMZQMvHMd9YR4TGokXE5aj8tdma7qvgKat)

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
| Esito | **in corso** (3 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -16.0% (intervallo -39.9% / +7.9%), mediana -4.0%, in utile 0%, senza rotta 0 su 3 |
| Netto a 60 s | -28.0% (intervallo -98.1% / +42.2%), mediana -2.5%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 300 s (primario) | -33.6% (intervallo -101.1% / +33.9%), mediana -23.1%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 0.89% / 6.3 s |
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
| Chiusura manuale (app) | 1 | -0.0132 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $obema | 81 | -10.9% | -0.0132 | +0% | -2% | Chiusura manuale (app) | 0m |

## Ultimi eventi
```
21:26:04 ORACLE   360 raccolti, 283 analizzati, 1 BUY, 274 veto
21:25:41 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 272 veto
21:25:17 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 265 veto
21:24:53 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 273 veto
21:24:30 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 274 veto
21:24:16 QUARTER  BUY $Incidents 0.120 SOL score 65 impatto 0.00% (Jupiter)
21:24:15 ORACLE   360 raccolti, 283 analizzati, 2 BUY, 275 veto
21:24:11 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
21:23:50 ORACLE   360 raccolti, 284 analizzati, 2 BUY, 276 veto
21:23:27 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 263 veto
21:23:13 ORACLE   360 raccolti, 273 analizzati, 2 BUY, 267 veto
21:22:47 ORACLE   360 raccolti, 274 analizzati, 2 BUY, 269 veto
21:22:24 ORACLE   360 raccolti, 278 analizzati, 2 BUY, 273 veto
21:22:01 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 264 veto
21:21:38 ORACLE   360 raccolti, 277 analizzati, 2 BUY, 271 veto
21:21:15 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 263 veto
21:20:52 ORACLE   360 raccolti, 265 analizzati, 2 BUY, 258 veto
21:20:27 ORACLE   360 raccolti, 279 analizzati, 2 BUY, 272 veto
21:20:04 ORACLE   360 raccolti, 281 analizzati, 2 BUY, 274 veto
21:19:40 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 262 veto
21:19:17 ORACLE   360 raccolti, 275 analizzati, 2 BUY, 267 veto
21:19:12 SCRIBE   chiuso P-0667 $obema -0.0132 SOL (-10.9%)
21:19:12 CHARON   Chiusura manuale (app) $obema vendo 100% a -1.8% -> 0.1078 SOL
21:19:12 KAISER   chiusura manuale dall'app: P-0667 obema
21:18:52 QUARTER  BUY $obema 0.120 SOL score 81 impatto 0.80% (Jupiter)
21:18:52 ORACLE   360 raccolti, 276 analizzati, 2 BUY, 268 veto
21:18:27 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 265 veto
21:18:04 ORACLE   360 raccolti, 286 analizzati, 2 BUY, 280 veto
21:17:40 ORACLE   360 raccolti, 288 analizzati, 2 BUY, 281 veto
21:17:27 QUARTER  SEGNALE $Incidents score 74 (semi-automatico)
21:17:26 QUARTER  SEGNALE $obema score 80 (semi-automatico)
21:17:26 ORACLE   360 raccolti, 280 analizzati, 2 BUY, 272 veto
21:17:20 KAISER   reset del paper (C-0116): conto azzerato, capitale 6 SOL
21:17:00 ORACLE   360 raccolti, 277 analizzati, 2 BUY, 271 veto
21:16:56 SCRIBE   chiuso P-0666 $obema -0.0024 SOL (-1.9%)
21:16:56 CHARON   Chiusura manuale (app) $obema vendo 100% a 12.1% -> 0.1186 SOL
21:16:56 KAISER   chiusura manuale dall'app: P-0666 obema
21:16:36 QUARTER  BUY $obema 0.120 SOL score 81 impatto 0.00% (Jupiter)
21:16:35 QUARTER  SEGNALE $Incidents score 74 (semi-automatico)
21:16:35 ORACLE   360 raccolti, 289 analizzati, 2 BUY, 282 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

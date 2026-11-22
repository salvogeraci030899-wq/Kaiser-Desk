# KAISER · report paper trading

Aggiornato: 2026-11-22 19:00 UTC · in esecuzione da 3.2 giorni · 315 run

| | |
|---|---|
| Equity | **4.0031 SOL** (-33.3% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9428 SOL |
| Trade chiusi | 220 |
| Win rate | 32% |
| P&L realizzato | -1.9757 SOL (~$-138.84) |
| Media vincite / perdite | +40.1% / -31.6% |
| Profit factor | 0.58 |
| Circuit breaker | no |

## Posizioni aperte
- **$XMAS** P-0657 · 0.080 SOL · -25.1% · resta 100% · [grafico](https://dexscreener.com/solana/2Qa4Ayvce4mygZjou1z4YMprhaX7snPLwSZYk6UYougQ)

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
| Senza risposta / decisi dopo 5 minuti | 25 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 58 | -1.7068 |
| Time stop | 83 | -0.9898 |
| TP1 | 52 | +2.2479 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $SINGULARTY | 84 | +91.2% | +0.0730 | +83% | +83% | TP1 | 7m |
| $Leap | 67 | +71.7% | +0.0565 | +72% | +72% | TP1 | 3m |
| $UNISON | 65 | -25.9% | -0.0205 | +11% | +1% | Time stop | 5m |
| $IF | 64 | -40.2% | -0.0321 | +7% | -5% | Time stop | 5m |
| $BTC | 77 | +40.5% | +0.0321 | +62% | +62% | TP1 | 3m |
| $OpenIndex | 64 | -6.3% | -0.0050 | +54% | +4% | Time stop | 7m |
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

## Ultimi eventi
```
19:00:37 ORACLE   360 raccolti, 252 analizzati, 3 BUY, 240 veto
19:00:12 ORACLE   360 raccolti, 258 analizzati, 4 BUY, 247 veto
18:59:47 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 248 veto
18:59:24 ORACLE   360 raccolti, 250 analizzati, 3 BUY, 239 veto
18:58:59 ORACLE   360 raccolti, 251 analizzati, 4 BUY, 239 veto
18:58:35 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 240 veto
18:58:11 ORACLE   360 raccolti, 244 analizzati, 5 BUY, 234 veto
18:57:46 ORACLE   360 raccolti, 250 analizzati, 4 BUY, 240 veto
18:57:22 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 239 veto
18:57:08 ORACLE   360 raccolti, 250 analizzati, 3 BUY, 237 veto
18:56:43 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 241 veto
18:56:19 QUARTER  BUY $XMAS 0.080 SOL score 69 impatto 0.99% (Jupiter)
18:56:18 SCRIBE   chiuso P-0656 $SINGULARTY 0.0730 SOL (91.2%)
18:56:18 CHARON   TP1 $SINGULARTY vendo 100% a 82.5% -> 0.1530 SOL
18:56:18 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 241 veto
18:55:54 ORACLE   360 raccolti, 252 analizzati, 4 BUY, 240 veto
18:55:29 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 241 veto
18:55:05 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 242 veto
18:54:40 ORACLE   360 raccolti, 246 analizzati, 4 BUY, 235 veto
18:54:17 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 242 veto
18:54:03 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 242 veto
18:53:38 ORACLE   360 raccolti, 245 analizzati, 4 BUY, 236 veto
18:53:13 QUARTER  SEGNALE $XMAS score 64 (semi-automatico)
18:53:13 ORACLE   360 raccolti, 254 analizzati, 4 BUY, 246 veto
18:52:48 ORACLE   360 raccolti, 261 analizzati, 3 BUY, 254 veto
18:52:45 SCOUT    prezzo SOL non disponibile: HTTP 429
18:52:25 ORACLE   360 raccolti, 254 analizzati, 3 BUY, 247 veto
18:52:00 ORACLE   360 raccolti, 271 analizzati, 3 BUY, 264 veto
18:51:37 ORACLE   360 raccolti, 266 analizzati, 3 BUY, 259 veto
18:51:13 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 254 veto
18:50:50 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 263 veto
18:50:25 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 264 veto
18:50:11 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 268 veto
18:49:46 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 263 veto
18:49:22 QUARTER  BUY $SINGULARTY 0.079 SOL score 84 impatto 0.54% (Jupiter)
18:49:21 ORACLE   360 raccolti, 264 analizzati, 3 BUY, 254 veto
18:49:18 SCOUT    jup trend: HTTP 429 (riuso l'ultimo elenco)
18:49:18 SCOUT    jup organic: HTTP 429 (riuso l'ultimo elenco)
18:49:18 SCOUT    jup nuovi: HTTP 429 (riuso l'ultimo elenco)
18:49:18 SCOUT    prezzo SOL non disponibile: HTTP 429
```

Regole attive: config.json su questo branch. Solo paper trading.

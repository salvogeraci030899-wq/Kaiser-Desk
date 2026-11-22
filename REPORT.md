# KAISER · report paper trading

Aggiornato: 2026-11-22 20:20 UTC · in esecuzione da 3.3 giorni · 317 run

| | |
|---|---|
| Equity | **3.9038 SOL** (-34.9% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9038 SOL |
| Trade chiusi | 225 |
| Win rate | 31% |
| P&L realizzato | -2.0962 SOL (~$-146.56) |
| Media vincite / perdite | +40.1% / -31.5% |
| Profit factor | 0.57 |
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
| Esito | **in corso** (3 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -16.0% (intervallo -39.9% / +7.9%), mediana -4.0%, in utile 0%, senza rotta 0 su 3 |
| Netto a 60 s | -28.0% (intervallo -98.1% / +42.2%), mediana -2.5%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 300 s (primario) | -33.6% (intervallo -101.1% / +33.9%), mediana -23.1%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 0.89% / 6.3 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 3 / 3 / 0 / 0 / 0 |

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
| Senza risposta / decisi dopo 5 minuti | 32 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 59 | -1.7213 |
| Time stop | 86 | -1.0169 |
| TP1 | 52 | +2.2479 |
| RUG-EXIT liquidità | 28 | -1.6059 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $FSDV15 | 88 | -97.8% | -0.0789 | +0% | -97% | RUG-EXIT liquidità | 1m |
| $Monkey | 67 | -11.1% | -0.0090 | +9% | -29% | Time stop | 5m |
| $CHRISTMASS | 64 | -13.5% | -0.0110 | +17% | +3% | Time stop | 13m |
| $Nаe | 70 | -17.8% | -0.0145 | +0% | -33% | Stop loss | 2m |
| $XMAS | 69 | -8.8% | -0.0072 | +0% | -16% | Time stop | 5m |
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

## Ultimi eventi
```
20:20:35 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 263 veto
20:20:11 ORACLE   360 raccolti, 264 analizzati, 0 BUY, 254 veto
20:19:47 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 271 veto
20:19:23 SCRIBE   chiuso P-0661 $FSDV15 -0.0789 SOL (-97.8%)
20:19:23 CHARON   RUG-EXIT liquidità $FSDV15 vendo 100% a -97.1% -> 0.0018 SOL
20:19:23 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 266 veto
20:18:59 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 251 veto
20:18:46 QUARTER  BUY $FSDV15 0.080 SOL score 88 impatto 0.95% (Jupiter)
20:18:45 QUARTER  SEGNALE $FSDV15 score 88 (semi-automatico)
20:18:45 ORACLE   337 raccolti, 247 analizzati, 1 BUY, 238 veto
20:18:21 ORACLE   315 raccolti, 233 analizzati, 0 BUY, 223 veto
20:18:07 SCOUT    PumpPortal invia nuovi token (21) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
20:17:57 ORACLE   304 raccolti, 230 analizzati, 0 BUY, 223 veto
20:17:34 ORACLE   277 raccolti, 209 analizzati, 0 BUY, 202 veto
20:17:10 ORACLE   261 raccolti, 191 analizzati, 0 BUY, 184 veto
20:16:48 ORACLE   258 raccolti, 188 analizzati, 0 BUY, 181 veto
20:16:24 ORACLE   226 raccolti, 167 analizzati, 0 BUY, 163 veto
20:16:08 SCOUT    rug: 11622 token oltre 7.5K, 35.5% rug, 11235 con possessori
combinazioni: 7248 prove, migliore -4.45%, p 1
fabbrica: 32556 percorsi, 768 configurazioni, 0 passano, 5000 ms
20:16:01 ORACLE   212 raccolti, 140 analizzati, 0 BUY, 136 veto
20:15:41 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
20:15:39 ORACLE   207 raccolti, 140 analizzati, 0 BUY, 136 veto
20:15:38 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
20:15:37 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
20:15:37 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
20:15:37 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
20:15:37 SCOUT    Laboratorio: collegato a PumpPortal
20:15:36 KAISER   run #317 · 0 posizioni · equity 3.9827 SOL · GMGN spenta (nessuna chiave) · Grok off
20:06:14 ORACLE   360 raccolti, 291 analizzati, 1 BUY, 286 veto
20:05:51 ORACLE   360 raccolti, 280 analizzati, 1 BUY, 275 veto
20:05:28 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 286 veto
20:05:04 ORACLE   360 raccolti, 292 analizzati, 2 BUY, 284 veto
20:04:40 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 274 veto
20:04:16 ORACLE   360 raccolti, 297 analizzati, 2 BUY, 287 veto
20:04:02 ORACLE   360 raccolti, 295 analizzati, 2 BUY, 285 veto
20:03:36 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 277 veto
20:03:12 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 281 veto
20:02:48 ORACLE   360 raccolti, 293 analizzati, 2 BUY, 282 veto
20:02:24 ORACLE   360 raccolti, 287 analizzati, 2 BUY, 277 veto
20:02:00 ORACLE   360 raccolti, 287 analizzati, 1 BUY, 276 veto
20:01:35 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 276 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

# KAISER · report paper trading

Aggiornato: 2026-11-22 21:11 UTC · in esecuzione da 3.3 giorni · 318 run

| | |
|---|---|
| Equity | **3.8605 SOL** (-35.7% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8605 SOL |
| Trade chiusi | 228 |
| Win rate | 31% |
| P&L realizzato | -2.1395 SOL (~$-149.91) |
| Media vincite / perdite | +40.1% / -31.3% |
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
| Senza risposta / decisi dopo 5 minuti | 35 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 59 | -1.7213 |
| Time stop | 88 | -1.0320 |
| TP1 | 52 | +2.2479 |
| RUG-EXIT liquidità | 29 | -1.6342 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $Incidents | 63 | -9.8% | -0.0077 | +21% | +4% | Time stop | 10m |
| $AMAZON | 69 | -9.3% | -0.0073 | +35% | -2% | Time stop | 5m |
| $retire | 67 | -35.7% | -0.0282 | +1% | -53% | RUG-EXIT liquidità | 1m |
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

## Ultimi eventi
```
21:10:55 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 279 veto
21:10:32 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 272 veto
21:10:09 ORACLE   360 raccolti, 278 analizzati, 1 BUY, 272 veto
21:09:46 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 277 veto
21:09:33 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 255 veto
21:09:08 ORACLE   337 raccolti, 251 analizzati, 1 BUY, 243 veto
21:08:44 ORACLE   319 raccolti, 238 analizzati, 1 BUY, 229 veto
21:08:20 ORACLE   311 raccolti, 228 analizzati, 1 BUY, 219 veto
21:08:07 SCOUT    PumpPortal invia nuovi token (30) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
21:07:57 SCRIBE   chiuso P-0664 $Incidents -0.0077 SOL (-9.8%)
21:07:57 CHARON   Time stop $Incidents vendo 100% a 4.5% -> 0.0707 SOL
21:07:57 ORACLE   285 raccolti, 216 analizzati, 1 BUY, 207 veto
21:07:32 ORACLE   273 raccolti, 184 analizzati, 1 BUY, 176 veto
21:07:10 ORACLE   266 raccolti, 184 analizzati, 1 BUY, 176 veto
21:06:46 ORACLE   222 raccolti, 160 analizzati, 1 BUY, 154 veto
21:06:26 SCOUT    rug: 11635 token oltre 7.5K, 35.5% rug, 11337 con possessori
combinazioni: 7200 prove, migliore -5.08%, p 1
fabbrica: 32549 percorsi, 768 configurazioni, 0 passano, 4050 ms
21:06:23 ORACLE   199 raccolti, 118 analizzati, 1 BUY, 113 veto
21:06:00 ORACLE   196 raccolti, 118 analizzati, 1 BUY, 113 veto
21:05:59 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
21:05:58 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
21:05:57 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
21:05:57 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
21:05:57 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
21:05:57 SCOUT    Laboratorio: collegato a PumpPortal
21:05:57 KAISER   run #318 · 1 posizioni · equity 3.8725 SOL · GMGN spenta (nessuna chiave) · Grok off
21:05:39 SCRIBE   fine run · trade 227 · win 31% · P&L -2.1318 SOL · equity 3.8725 SOL
21:05:39 ORACLE   360 raccolti, 251 analizzati, 1 BUY, 245 veto
21:05:25 ORACLE   360 raccolti, 264 analizzati, 1 BUY, 258 veto
21:05:00 ORACLE   360 raccolti, 255 analizzati, 1 BUY, 249 veto
21:04:36 ORACLE   360 raccolti, 255 analizzati, 1 BUY, 250 veto
21:04:12 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 253 veto
21:03:49 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 255 veto
21:03:26 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 247 veto
21:03:22 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
21:03:02 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 252 veto
21:02:37 ORACLE   360 raccolti, 242 analizzati, 1 BUY, 235 veto
21:02:15 ORACLE   360 raccolti, 242 analizzati, 1 BUY, 235 veto
21:01:50 ORACLE   360 raccolti, 231 analizzati, 1 BUY, 225 veto
21:01:27 ORACLE   360 raccolti, 241 analizzati, 1 BUY, 235 veto
21:01:03 ORACLE   360 raccolti, 234 analizzati, 1 BUY, 227 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

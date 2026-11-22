# KAISER · report paper trading

Aggiornato: 2026-11-22 16:59 UTC · in esecuzione da 3.1 giorni · 313 run

| | |
|---|---|
| Equity | **3.9581 SOL** (-34.0% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9581 SOL |
| Trade chiusi | 212 |
| Win rate | 32% |
| P&L realizzato | -2.0419 SOL (~$-144.15) |
| Media vincite / perdite | +38.9% / -31.9% |
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
| Senza risposta / decisi dopo 5 minuti | 14 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 57 | -1.6734 |
| Time stop | 79 | -0.9278 |
| TP1 | 49 | +2.0863 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $FIREBALL | 68 | -54.2% | -0.0438 | +0% | -34% | Stop loss | 4m |
| $AMAZON | 69 | -58.8% | -0.0481 | +53% | -34% | Stop loss | 10m |

## Ultimi eventi
```
16:59:37 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 268 veto
16:59:14 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 263 veto
16:58:51 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 261 veto
16:58:28 ORACLE   344 raccolti, 264 analizzati, 1 BUY, 252 veto
16:58:15 SCOUT    PumpPortal invia nuovi token (20) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
16:58:05 ORACLE   333 raccolti, 257 analizzati, 2 BUY, 243 veto
16:57:53 ORACLE   332 raccolti, 248 analizzati, 2 BUY, 236 veto
16:57:28 ORACLE   309 raccolti, 225 analizzati, 2 BUY, 213 veto
16:57:05 ORACLE   297 raccolti, 222 analizzati, 3 BUY, 211 veto
16:56:43 ORACLE   286 raccolti, 221 analizzati, 3 BUY, 211 veto
16:56:20 ORACLE   260 raccolti, 190 analizzati, 3 BUY, 183 veto
16:55:58 ORACLE   250 raccolti, 181 analizzati, 3 BUY, 174 veto
16:55:35 ORACLE   244 raccolti, 175 analizzati, 3 BUY, 169 veto
16:55:29 SCOUT    rug: 11682 token oltre 7.5K, 35.7% rug, 10817 con possessori
combinazioni: 6672 prove, migliore -4.12%, p 1
fabbrica: 32603 percorsi, 768 configurazioni, 0 passano, 6287 ms
16:55:22 SCRIBE   chiuso P-0648 $FOAM -0.0056 SOL (-6.9%)
16:55:22 CHARON   TP1 $FOAM vendo 100% a 62.2% -> 0.0747 SOL
16:55:12 ORACLE   216 raccolti, 155 analizzati, 3 BUY, 151 veto
16:54:50 QUARTER  BUY $FOAM 0.079 SOL score 71 impatto 1.04% (Jupiter)
16:54:50 ORACLE   206 raccolti, 143 analizzati, 3 BUY, 137 veto
16:54:34 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
16:54:28 QUARTER  $FOAM impatto 2.6% oltre slippage: annullato
16:54:28 ORACLE   205 raccolti, 134 analizzati, 3 BUY, 129 veto
16:54:27 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
16:54:25 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
16:54:25 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
16:54:25 SCOUT    Laboratorio: collegato a PumpPortal
16:54:25 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
16:54:24 KAISER   run #313 · 0 posizioni · equity 3.9636 SOL · GMGN spenta (nessuna chiave) · Grok off
16:54:11 SCRIBE   fine run · trade 211 · win 32% · P&L -2.0364 SOL · equity 3.9636 SOL
16:54:05 QUARTER  $FOAM impatto 2.2% oltre slippage: annullato
16:54:05 QUARTER  SEGNALE $FOAM score 70 (semi-automatico)
16:54:05 SCRIBE   chiuso P-0647 $OMGAI 0.0095 SOL (11.9%)
16:54:05 CHARON   Time stop $OMGAI vendo 100% a 4.3% -> 0.0896 SOL
16:54:05 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 273 veto
16:53:40 ORACLE   360 raccolti, 294 analizzati, 2 BUY, 284 veto
16:53:17 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 281 veto
16:52:54 ORACLE   360 raccolti, 292 analizzati, 2 BUY, 282 veto
16:52:31 ORACLE   360 raccolti, 297 analizzati, 1 BUY, 286 veto
16:52:08 ORACLE   360 raccolti, 294 analizzati, 1 BUY, 285 veto
16:51:45 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 269 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

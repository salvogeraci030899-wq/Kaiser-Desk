# KAISER · report paper trading

Aggiornato: 2026-11-22 14:28 UTC · in esecuzione da 3.0 giorni · 310 run

| | |
|---|---|
| Equity | **3.8663 SOL** (-35.6% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8663 SOL |
| Trade chiusi | 204 |
| Win rate | 30% |
| P&L realizzato | -2.1337 SOL (~$-149.49) |
| Media vincite / perdite | +39.2% / -32.1% |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 14:23 UTC.
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
| Presi / scartati (con misura a 5 minuti) | 2 / 0 |
| Netto medio dei presi | +69.5% (intervallo -86.7% / +225.6%) |
| Netto medio degli scartati | n/d% |
| Differenza presi meno scartati (limite inferiore) | n/d |
| Senza risposta / decisi dopo 5 minuti | 7 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 56 | -1.6426 |
| Time stop | 75 | -0.9452 |
| TP1 | 46 | +1.9812 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $snowball | 64 | -11.7% | -0.0095 | +64% | +64% | TP1 | 1m |
| $RARE | 63 | -50.7% | -0.0415 | +0% | -56% | RUG-EXIT liquidità | 1m |
| $Snowball | 64 | +22.1% | +0.0180 | +70% | +70% | TP1 | 5m |
| $LEONIDA | 72 | -25.1% | -0.0206 | +5% | -31% | Stop loss | 3m |

## Ultimi eventi
```
14:28:34 ORACLE   337 raccolti, 242 analizzati, 1 BUY, 229 veto
14:28:12 ORACLE   334 raccolti, 242 analizzati, 1 BUY, 228 veto
14:27:49 ORACLE   312 raccolti, 227 analizzati, 1 BUY, 215 veto
14:27:27 ORACLE   307 raccolti, 220 analizzati, 1 BUY, 209 veto
14:27:05 ORACLE   303 raccolti, 216 analizzati, 1 BUY, 205 veto
14:26:42 ORACLE   287 raccolti, 205 analizzati, 1 BUY, 194 veto
14:26:30 SCOUT    PumpPortal invia nuovi token (23) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
14:26:20 ORACLE   280 raccolti, 203 analizzati, 2 BUY, 192 veto
14:25:57 ORACLE   279 raccolti, 199 analizzati, 2 BUY, 189 veto
14:25:35 ORACLE   261 raccolti, 189 analizzati, 2 BUY, 179 veto
14:25:12 ORACLE   249 raccolti, 178 analizzati, 1 BUY, 169 veto
14:24:49 ORACLE   246 raccolti, 172 analizzati, 1 BUY, 164 veto
14:24:26 ORACLE   222 raccolti, 155 analizzati, 1 BUY, 150 veto
14:24:18 SCOUT    rug: 11735 token oltre 7.5K, 35.6% rug, 10529 con possessori
combinazioni: 5664 prove, migliore -4.14%, p 0.861
fabbrica: 32630 percorsi, 768 configurazioni, 0 passano, 5216 ms
14:24:04 ORACLE   210 raccolti, 146 analizzati, 2 BUY, 143 veto
14:23:52 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
14:23:45 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
14:23:43 ORACLE   209 raccolti, 146 analizzati, 2 BUY, 143 veto
14:23:41 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
14:23:41 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
14:23:41 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
14:23:40 SCOUT    Laboratorio: collegato a PumpPortal
14:23:40 KAISER   run #310 · 0 posizioni · equity 3.8663 SOL · GMGN spenta (nessuna chiave) · Grok off
14:23:29 SCRIBE   fine run · trade 204 · win 30% · P&L -2.1337 SOL · equity 3.8663 SOL
14:23:14 ORACLE   360 raccolti, 293 analizzati, 3 BUY, 282 veto
14:22:50 ORACLE   360 raccolti, 290 analizzati, 3 BUY, 279 veto
14:22:26 ORACLE   360 raccolti, 294 analizzati, 3 BUY, 282 veto
14:22:02 ORACLE   360 raccolti, 288 analizzati, 3 BUY, 275 veto
14:21:39 ORACLE   360 raccolti, 293 analizzati, 3 BUY, 278 veto
14:21:15 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 276 veto
14:20:51 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 275 veto
14:20:28 ORACLE   360 raccolti, 286 analizzati, 3 BUY, 274 veto
14:20:03 ORACLE   360 raccolti, 292 analizzati, 3 BUY, 279 veto
14:19:40 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 277 veto
14:19:16 ORACLE   360 raccolti, 282 analizzati, 2 BUY, 269 veto
14:18:53 ORACLE   360 raccolti, 291 analizzati, 1 BUY, 276 veto
14:18:29 ORACLE   360 raccolti, 296 analizzati, 1 BUY, 282 veto
14:18:06 ORACLE   360 raccolti, 290 analizzati, 2 BUY, 276 veto
14:17:42 ORACLE   360 raccolti, 291 analizzati, 2 BUY, 278 veto
14:17:18 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 276 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

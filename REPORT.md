# KAISER · report paper trading

Aggiornato: 2026-11-22 13:38 UTC · in esecuzione da 3.0 giorni · 309 run

| | |
|---|---|
| Equity | **3.9049 SOL** (-34.9% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9049 SOL |
| Trade chiusi | 201 |
| Win rate | 31% |
| P&L realizzato | -2.0951 SOL (~$-146.80) |
| Media vincite / perdite | +39.2% / -32.5% |
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
| Time stop | 72 | -0.9066 |
| TP1 | 46 | +1.9812 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $MASCOIN | 65 | +6.3% | +0.0052 | +0% | -41% | Stop loss | 3m |

## Ultimi eventi
```
13:38:33 ORACLE   351 raccolti, 259 analizzati, 0 BUY, 244 veto
13:38:09 ORACLE   347 raccolti, 247 analizzati, 0 BUY, 234 veto
13:37:45 SCOUT    PumpPortal invia nuovi token (20) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
13:37:45 ORACLE   316 raccolti, 226 analizzati, 0 BUY, 212 veto
13:37:22 ORACLE   307 raccolti, 222 analizzati, 0 BUY, 208 veto
13:36:59 ORACLE   301 raccolti, 212 analizzati, 0 BUY, 200 veto
13:36:36 ORACLE   281 raccolti, 206 analizzati, 0 BUY, 196 veto
13:36:13 ORACLE   274 raccolti, 196 analizzati, 0 BUY, 186 veto
13:35:50 ORACLE   271 raccolti, 188 analizzati, 0 BUY, 177 veto
13:35:26 ORACLE   249 raccolti, 173 analizzati, 0 BUY, 165 veto
13:35:03 ORACLE   236 raccolti, 161 analizzati, 0 BUY, 153 veto
13:34:41 ORACLE   229 raccolti, 158 analizzati, 0 BUY, 151 veto
13:34:17 ORACLE   210 raccolti, 140 analizzati, 0 BUY, 134 veto
13:34:12 SCOUT    rug: 11744 token oltre 7.5K, 35.6% rug, 10458 con possessori
combinazioni: 5664 prove, migliore -3.99%, p 0.654
fabbrica: 32630 percorsi, 768 configurazioni, 0 passano, 6099 ms
13:33:54 ORACLE   202 raccolti, 132 analizzati, 0 BUY, 126 veto
13:33:37 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
13:33:35 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
13:33:32 ORACLE   200 raccolti, 132 analizzati, 0 BUY, 126 veto
13:33:29 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
13:33:29 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
13:33:29 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
13:33:29 SCOUT    Laboratorio: collegato a PumpPortal
13:33:29 KAISER   run #309 · 0 posizioni · equity 3.9049 SOL · GMGN spenta (nessuna chiave) · Grok off
13:33:15 SCRIBE   fine run · trade 201 · win 31% · P&L -2.0951 SOL · equity 3.9049 SOL
13:33:05 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 267 veto
13:32:42 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 266 veto
13:32:17 ORACLE   360 raccolti, 281 analizzati, 0 BUY, 270 veto
13:31:53 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 269 veto
13:31:29 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 267 veto
13:31:06 ORACLE   360 raccolti, 282 analizzati, 0 BUY, 272 veto
13:30:41 ORACLE   360 raccolti, 282 analizzati, 0 BUY, 270 veto
13:30:17 ORACLE   360 raccolti, 270 analizzati, 0 BUY, 258 veto
13:29:53 ORACLE   360 raccolti, 285 analizzati, 0 BUY, 275 veto
13:29:29 ORACLE   360 raccolti, 274 analizzati, 0 BUY, 264 veto
13:29:05 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 265 veto
13:28:41 ORACLE   360 raccolti, 284 analizzati, 0 BUY, 274 veto
13:28:18 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 272 veto
13:27:55 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 267 veto
13:27:31 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 266 veto
13:27:17 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 267 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

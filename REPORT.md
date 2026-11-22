# KAISER · report paper trading

Aggiornato: 2026-11-22 12:53 UTC · in esecuzione da 2.9 giorni · 308 run

| | |
|---|---|
| Equity | **3.8850 SOL** (-35.3% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8850 SOL |
| Trade chiusi | 200 |
| Win rate | 31% |
| P&L realizzato | -2.1150 SOL (~$-148.53) |
| Media vincite / perdite | +39.4% / -32.5% |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 12:43 UTC.
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
| Senza risposta / decisi dopo 5 minuti | 4 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 56 | -1.6426 |
| Time stop | 72 | -0.9066 |
| TP1 | 45 | +1.9612 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $SANTA | 70 | -82.2% | -0.0689 | +17% | -74% | RUG-EXIT liquidità | 4m |

## Ultimi eventi
```
12:53:24 ORACLE   360 raccolti, 292 analizzati, 0 BUY, 280 veto
12:53:01 ORACLE   360 raccolti, 287 analizzati, 0 BUY, 275 veto
12:52:37 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 260 veto
12:52:13 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 268 veto
12:51:50 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 267 veto
12:51:27 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 265 veto
12:51:03 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 268 veto
12:50:40 ORACLE   360 raccolti, 282 analizzati, 0 BUY, 272 veto
12:50:16 ORACLE   360 raccolti, 276 analizzati, 0 BUY, 267 veto
12:49:53 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 269 veto
12:49:30 ORACLE   360 raccolti, 280 analizzati, 0 BUY, 269 veto
12:49:06 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 266 veto
12:48:52 SCOUT    PumpPortal invia nuovi token (21) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
12:48:41 ORACLE   356 raccolti, 271 analizzati, 0 BUY, 264 veto
12:48:18 ORACLE   345 raccolti, 259 analizzati, 0 BUY, 253 veto
12:47:54 ORACLE   339 raccolti, 256 analizzati, 0 BUY, 250 veto
12:47:31 ORACLE   325 raccolti, 242 analizzati, 0 BUY, 236 veto
12:47:08 ORACLE   319 raccolti, 229 analizzati, 0 BUY, 222 veto
12:46:46 ORACLE   313 raccolti, 226 analizzati, 0 BUY, 219 veto
12:46:22 ORACLE   290 raccolti, 215 analizzati, 0 BUY, 208 veto
12:46:00 ORACLE   278 raccolti, 197 analizzati, 0 BUY, 189 veto
12:45:37 ORACLE   277 raccolti, 197 analizzati, 0 BUY, 189 veto
12:45:14 ORACLE   256 raccolti, 189 analizzati, 1 BUY, 180 veto
12:44:50 ORACLE   248 raccolti, 168 analizzati, 1 BUY, 161 veto
12:44:28 ORACLE   240 raccolti, 166 analizzati, 1 BUY, 159 veto
12:44:05 ORACLE   216 raccolti, 149 analizzati, 1 BUY, 142 veto
12:43:57 SCOUT    rug: 11749 token oltre 7.5K, 35.6% rug, 10348 con possessori
combinazioni: 5664 prove, migliore -3.96%, p 0.771
fabbrica: 32612 percorsi, 768 configurazioni, 0 passano, 5829 ms
12:43:42 ORACLE   208 raccolti, 143 analizzati, 0 BUY, 136 veto
12:43:19 ORACLE   206 raccolti, 129 analizzati, 1 BUY, 123 veto
12:43:18 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
12:43:16 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
12:43:15 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
12:43:15 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
12:43:15 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
12:43:15 SCOUT    Laboratorio: collegato a PumpPortal
12:43:15 KAISER   run #308 · 0 posizioni · equity 3.8850 SOL · GMGN spenta (nessuna chiave) · Grok off
12:43:01 SCRIBE   fine run · trade 200 · win 31% · P&L -2.1150 SOL · equity 3.8850 SOL
12:42:42 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 263 veto
12:42:18 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 268 veto
12:41:56 ORACLE   360 raccolti, 273 analizzati, 1 BUY, 266 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

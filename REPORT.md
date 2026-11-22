# KAISER · report paper trading

Aggiornato: 2026-11-22 16:14 UTC · in esecuzione da 3.1 giorni · 312 run

| | |
|---|---|
| Equity | **3.9442 SOL** (-34.3% dal capitale iniziale di 6 SOL) |
| Cassa | 3.9442 SOL |
| Trade chiusi | 209 |
| Win rate | 31% |
| P&L realizzato | -2.0558 SOL (~$-144.52) |
| Media vincite / perdite | +39.7% / -32.0% |
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
| Senza risposta / decisi dopo 5 minuti | 12 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 57 | -1.6734 |
| Time stop | 77 | -0.9473 |
| TP1 | 48 | +2.0919 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
| $CI | 72 | -36.2% | -0.0298 | +8% | -31% | Stop loss | 3m |
| $SANTA | 74 | +92.2% | +0.0745 | +61% | +61% | TP1 | 5m |
| $CORONA | 72 | +24.8% | +0.0199 | +72% | +72% | TP1 | 3m |

## Ultimi eventi
```
16:14:13 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 269 veto
16:13:50 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 269 veto
16:13:27 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 265 veto
16:13:04 ORACLE   360 raccolti, 283 analizzati, 0 BUY, 271 veto
16:12:41 ORACLE   360 raccolti, 279 analizzati, 0 BUY, 266 veto
16:12:18 ORACLE   360 raccolti, 275 analizzati, 0 BUY, 262 veto
16:12:15 SCOUT    gecko trend: HTTP 429 (riuso l'ultimo elenco)
16:11:55 ORACLE   360 raccolti, 285 analizzati, 0 BUY, 271 veto
16:11:32 ORACLE   360 raccolti, 289 analizzati, 0 BUY, 274 veto
16:11:09 ORACLE   360 raccolti, 286 analizzati, 0 BUY, 272 veto
16:10:45 ORACLE   360 raccolti, 288 analizzati, 0 BUY, 274 veto
16:10:22 ORACLE   355 raccolti, 284 analizzati, 0 BUY, 268 veto
16:09:59 ORACLE   353 raccolti, 282 analizzati, 0 BUY, 266 veto
16:09:35 ORACLE   332 raccolti, 261 analizzati, 0 BUY, 251 veto
16:09:12 ORACLE   324 raccolti, 256 analizzati, 0 BUY, 245 veto
16:08:49 ORACLE   322 raccolti, 252 analizzati, 0 BUY, 240 veto
16:08:26 ORACLE   301 raccolti, 238 analizzati, 0 BUY, 229 veto
16:08:03 ORACLE   298 raccolti, 230 analizzati, 0 BUY, 221 veto
16:07:41 ORACLE   296 raccolti, 227 analizzati, 0 BUY, 218 veto
16:07:17 ORACLE   278 raccolti, 214 analizzati, 0 BUY, 205 veto
16:06:55 SCOUT    PumpPortal invia nuovi token (20) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
16:06:55 ORACLE   269 raccolti, 210 analizzati, 0 BUY, 200 veto
16:06:32 ORACLE   267 raccolti, 203 analizzati, 0 BUY, 194 veto
16:06:08 ORACLE   254 raccolti, 193 analizzati, 0 BUY, 183 veto
16:05:46 ORACLE   247 raccolti, 188 analizzati, 0 BUY, 178 veto
16:05:23 ORACLE   242 raccolti, 180 analizzati, 0 BUY, 170 veto
16:05:11 SCOUT    rug: 11699 token oltre 7.5K, 35.6% rug, 10706 con possessori
combinazioni: 6192 prove, migliore -4.07%, p 1
fabbrica: 32606 percorsi, 768 configurazioni, 0 passano, 5955 ms
16:05:00 ORACLE   213 raccolti, 158 analizzati, 0 BUY, 150 veto
16:04:38 ORACLE   206 raccolti, 148 analizzati, 0 BUY, 140 veto
16:04:16 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
16:04:15 ORACLE   203 raccolti, 141 analizzati, 0 BUY, 135 veto
16:04:13 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
16:04:12 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
16:04:12 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
16:04:12 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
16:04:11 SCOUT    Laboratorio: collegato a PumpPortal
16:04:11 KAISER   run #312 · 0 posizioni · equity 3.9442 SOL · GMGN spenta (nessuna chiave) · Grok off
16:03:59 SCRIBE   fine run · trade 209 · win 31% · P&L -2.0558 SOL · equity 3.9442 SOL
16:03:46 ORACLE   360 raccolti, 272 analizzati, 0 BUY, 258 veto
16:03:22 ORACLE   360 raccolti, 278 analizzati, 0 BUY, 268 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

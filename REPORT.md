# KAISER · report paper trading

Aggiornato: 2026-11-25 06:37 UTC · in esecuzione da 2.4 giorni · 388 run

| | |
|---|---|
| Equity | **6.0905 SOL** (+1.5% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0905 SOL |
| Trade chiusi | 9 |
| Win rate | 56% |
| P&L realizzato | +0.0905 SOL (~$6.22) |
| Media vincite / perdite | +26.8% / -14.8% |
| Profit factor | 2.25 |
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

## Le tue decisioni: prese e scartate
Il paper e' il registro di cio' che decidi sugli avvisi di Telegram. Con Prendo si apre subito una posizione paper con le uscite impostate (netto di impatto, commissioni e priority fee); con Scarto si simula la stessa uscita con costi stimati dalla liquidita', per vedere cosa avresti ottenuto. Non c'e' nessun bot a parte.
Regola decisa in anticipo, sui tuoi Prendo chiusi: almeno 50, netto medio >= +3% con limite inferiore del 95% sopra zero. Il confronto con gli Scarto e' solo descrittivo.
Il conteggio parte dal 2026-11-23 09:12 UTC (primo run con id unici e senza blocco per slippage): le decisioni precedenti restano nel registro ma non contano.

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 9 di 50, netto medio +8.3% (intervallo -9.4% / +26.1%), in utile 55.6% |
| Scarto simulati chiusi | 5, netto medio +20.3% (intervallo -37.8% / +78.4%), in utile 40%; ancora aperti 1 |
| Prendo meno Scarto (limite inferiore) | -12.0% (-72.7%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 188424 lanci noti, 34923 creatori; 38 Coin in fascia alta viste (32 creatori), 12 raddoppiate (9 creatori). Creatore trovato: tabella 155, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 30 | 8 / 5 | 8 | +11.8% |
| 1M-2M | 13 | 2 / 2 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 10 / 9.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 2 | -0.0471 |
| Chiusura manuale (app) | 6 | +0.0630 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $BASKET | 72 | +14.3% | +0.0176 | +18% | +18% | Chiusura manuale (app) | 4m |
| $4CHAN | 56 | -19.6% | -0.0241 | +0% | -13% | Chiusura manuale (app) | 7m |
| $cateball | 81 | +61.4% | +0.0746 | +111% | +54% | Trailing stop | 13m |
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
06:37:51 ORACLE   360 raccolti, 284 analizzati, 4 BUY, 278 veto
06:37:38 ORACLE   360 raccolti, 277 analizzati, 4 BUY, 271 veto
06:37:13 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 276 veto
06:36:50 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 275 veto
06:36:27 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 281 veto
06:36:05 ORACLE   360 raccolti, 285 analizzati, 2 BUY, 279 veto
06:35:42 ORACLE   360 raccolti, 271 analizzati, 2 BUY, 265 veto
06:35:19 ORACLE   350 raccolti, 278 analizzati, 2 BUY, 272 veto
06:34:57 ORACLE   349 raccolti, 273 analizzati, 2 BUY, 267 veto
06:34:34 ORACLE   345 raccolti, 262 analizzati, 2 BUY, 256 veto
06:34:12 ORACLE   324 raccolti, 244 analizzati, 3 BUY, 238 veto
06:33:49 ORACLE   314 raccolti, 245 analizzati, 3 BUY, 239 veto
06:33:27 ORACLE   313 raccolti, 238 analizzati, 3 BUY, 232 veto
06:33:04 ORACLE   293 raccolti, 224 analizzati, 3 BUY, 218 veto
06:32:41 ORACLE   287 raccolti, 213 analizzati, 3 BUY, 207 veto
06:32:18 QUARTER  SEGNALE $Jimmies score 65 (semi-automatico)
06:32:18 ORACLE   283 raccolti, 211 analizzati, 4 BUY, 205 veto
06:31:55 ORACLE   269 raccolti, 202 analizzati, 3 BUY, 197 veto
06:31:33 ORACLE   261 raccolti, 191 analizzati, 4 BUY, 186 veto
06:31:12 ORACLE   259 raccolti, 184 analizzati, 4 BUY, 179 veto
06:30:49 ORACLE   236 raccolti, 171 analizzati, 4 BUY, 166 veto
06:30:28 ORACLE   228 raccolti, 164 analizzati, 4 BUY, 159 veto
06:30:06 ORACLE   225 raccolti, 160 analizzati, 3 BUY, 156 veto
06:29:44 ORACLE   208 raccolti, 148 analizzati, 4 BUY, 143 veto
06:29:22 ORACLE   203 raccolti, 137 analizzati, 4 BUY, 132 veto
06:29:00 ORACLE   200 raccolti, 137 analizzati, 4 BUY, 132 veto
06:28:38 ORACLE   185 raccolti, 130 analizzati, 3 BUY, 125 veto
06:28:16 ORACLE   180 raccolti, 127 analizzati, 3 BUY, 122 veto
06:27:55 ORACLE   179 raccolti, 120 analizzati, 3 BUY, 115 veto
06:27:51 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
06:27:51 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
06:27:50 KAISER   run #388 · 0 posizioni · equity 6.0905 SOL · GMGN spenta (nessuna chiave) · Grok off
06:27:50 CREATORI memoria: 188239 lanci, 34901 creatori, 37 Coin in fascia alta
06:27:33 SCRIBE   fine run · trade 9 · win 56% · P&L 0.0905 SOL · equity 6.0905 SOL
06:27:22 ORACLE   360 raccolti, 297 analizzati, 3 BUY, 292 veto
06:26:58 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 284 veto
06:26:36 ORACLE   360 raccolti, 297 analizzati, 3 BUY, 292 veto
06:26:13 ORACLE   360 raccolti, 293 analizzati, 3 BUY, 288 veto
06:26:09 SCRIBE   chiuso P-0679 $BASKET 0.0176 SOL (14.3%)
06:26:09 CHARON   Chiusura manuale (app) $BASKET vendo 100% a 18.5% -> 0.1400 SOL
```

Regole attive: config.json su questo branch. Solo paper trading.

# KAISER · report paper trading

Aggiornato: 2026-11-28 10:47 UTC · in esecuzione da 5.5 giorni · 479 run

| | |
|---|---|
| Equity | **5.9317 SOL** (-1.1% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9317 SOL |
| Trade chiusi | 19 |
| Win rate | 32% |
| P&L realizzato | -0.0683 SOL (~$-4.83) |
| Media vincite / perdite | +24.6% / -15.6% |
| Profit factor | 0.72 |
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
Diagnosi dei prezzi: 3 trade chiusi con le letture registrate, 0 con almeno un cambio di pool, scarto massimo tra pool 0%.

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 19 di 50, netto medio -2.9% (intervallo -14.0% / +8.2%), in utile 31.6% |
| Scarto simulati chiusi | 6, netto medio -39.3% (intervallo -69.7% / -8.8%), in utile 16.7%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +36.4% (+4.0%) |
| Avvisi senza risposta | 43 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 313837 lanci noti, 55066 creatori; 101 Coin in fascia alta viste (86 creatori), 37 raddoppiate (30 creatori). Creatore trovato: tabella 28, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 57 | 11 / 3 | 18 | -2.0% |
| 1M-2M | 3 | 0 / 3 | 1 | -19.6% |
| 2M+ | 0 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-25: 32 / 24; 11-26: 20 / 20; 11-27: 21 / 18; 11-28: 15 / 14.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 10 | -0.2125 |
| Chiusura manuale (app) | 8 | +0.0696 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $Claude | 57 | -4.4% | -0.0053 | +321% | -99% | Stop loss | 42m |
| $Elfball | 86 | -7.9% | -0.0095 | +0% | -32% | Stop loss | 1m |
| $Hoppy | 86 | -8.1% | -0.0097 | +4% | +4% | Chiusura manuale (app) | 0m |
| $MemeStonks | 86 | -39.8% | -0.0482 | +22% | -31% | Stop loss | 3m |
| $Pompompurin | 86 | -45.1% | -0.0551 | +85% | -32% | Stop loss | 15m |
| $PPK | 86 | -14.2% | -0.0173 | +0% | -31% | Stop loss | 1m |
| $Pompom | 58 | -21.3% | -0.0262 | +8% | -20% | Stop loss | 36m |
| $LENDR | 58 | +13.3% | +0.0163 | +26% | +14% | Chiusura manuale (app) | 6m |
| $MIM | 86 | -2.0% | -0.0024 | +0% | -36% | Stop loss | 1m |
| $PORTAL | 68 | -1.1% | -0.0014 | +0% | -30% | Stop loss | 0m |
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
10:47:13 ORACLE   316 raccolti, 260 analizzati, 2 BUY, 258 veto
10:46:50 ORACLE   309 raccolti, 252 analizzati, 2 BUY, 250 veto
10:46:29 ORACLE   301 raccolti, 246 analizzati, 2 BUY, 244 veto
10:46:08 ORACLE   289 raccolti, 233 analizzati, 2 BUY, 231 veto
10:45:46 ORACLE   282 raccolti, 228 analizzati, 2 BUY, 226 veto
10:45:25 ORACLE   276 raccolti, 226 analizzati, 2 BUY, 224 veto
10:45:03 ORACLE   261 raccolti, 214 analizzati, 2 BUY, 212 veto
10:44:41 ORACLE   255 raccolti, 206 analizzati, 2 BUY, 204 veto
10:44:20 ORACLE   254 raccolti, 202 analizzati, 2 BUY, 200 veto
10:43:58 ORACLE   236 raccolti, 189 analizzati, 2 BUY, 187 veto
10:43:37 ORACLE   231 raccolti, 186 analizzati, 2 BUY, 184 veto
10:43:15 ORACLE   227 raccolti, 176 analizzati, 1 BUY, 175 veto
10:42:54 ORACLE   206 raccolti, 164 analizzati, 1 BUY, 163 veto
10:42:33 ORACLE   200 raccolti, 156 analizzati, 2 BUY, 154 veto
10:42:12 ORACLE   197 raccolti, 156 analizzati, 2 BUY, 154 veto
10:42:10 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
10:42:10 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
10:42:10 KAISER   run #479 · 0 posizioni · equity 5.9317 SOL · GMGN spenta (nessuna chiave) · Grok off
10:42:10 CREATORI memoria: 313749 lanci, 55058 creatori, 101 Coin in fascia alta
10:41:58 SCRIBE   fine run · trade 19 · win 32% · P&L -0.0683 SOL · equity 5.9317 SOL
10:41:38 ORACLE   360 raccolti, 295 analizzati, 1 BUY, 294 veto
10:41:16 ORACLE   360 raccolti, 300 analizzati, 1 BUY, 299 veto
10:40:54 ORACLE   360 raccolti, 296 analizzati, 0 BUY, 295 veto
10:40:33 ORACLE   360 raccolti, 293 analizzati, 0 BUY, 292 veto
10:40:11 ORACLE   360 raccolti, 299 analizzati, 1 BUY, 298 veto
10:39:49 ORACLE   360 raccolti, 301 analizzati, 1 BUY, 300 veto
10:39:27 ORACLE   360 raccolti, 300 analizzati, 1 BUY, 299 veto
10:39:04 ORACLE   360 raccolti, 306 analizzati, 1 BUY, 305 veto
10:38:42 ORACLE   360 raccolti, 303 analizzati, 1 BUY, 302 veto
10:38:20 ORACLE   360 raccolti, 298 analizzati, 1 BUY, 297 veto
10:37:58 ORACLE   360 raccolti, 301 analizzati, 0 BUY, 300 veto
10:37:37 ORACLE   360 raccolti, 302 analizzati, 0 BUY, 301 veto
10:37:15 ORACLE   360 raccolti, 301 analizzati, 0 BUY, 300 veto
10:36:53 ORACLE   360 raccolti, 305 analizzati, 0 BUY, 304 veto
10:36:31 ORACLE   360 raccolti, 307 analizzati, 1 BUY, 306 veto
10:36:09 ORACLE   360 raccolti, 302 analizzati, 1 BUY, 301 veto
10:35:47 ORACLE   360 raccolti, 306 analizzati, 1 BUY, 304 veto
10:35:24 ORACLE   360 raccolti, 304 analizzati, 1 BUY, 302 veto
10:35:02 ORACLE   360 raccolti, 302 analizzati, 1 BUY, 301 veto
10:34:40 ORACLE   360 raccolti, 303 analizzati, 1 BUY, 302 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

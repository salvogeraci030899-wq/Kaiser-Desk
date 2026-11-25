# KAISER · report paper trading

Aggiornato: 2026-11-25 20:47 UTC · in esecuzione da 3.0 giorni · 405 run

| | |
|---|---|
| Equity | **6.0043 SOL** (+0.1% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0043 SOL |
| Trade chiusi | 15 |
| Win rate | 40% |
| P&L realizzato | +0.0043 SOL (~$0.30) |
| Media vincite / perdite | +24.6% / -15.9% |
| Profit factor | 1.02 |
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
| Prendo chiusi | 15 di 50, netto medio +0.3% (intervallo -12.8% / +13.4%), in utile 40% |
| Scarto simulati chiusi | 8, netto medio -2.5% (intervallo -44.2% / +39.1%), in utile 25%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +2.8% (-40.9%) |
| Avvisi senza risposta | 33 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 212928 lanci noti, 38890 creatori; 54 Coin in fascia alta viste (45 creatori), 17 raddoppiate (14 creatori). Creatore trovato: tabella 61, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 39 | 14 / 6 | 14 | +1.7% |
| 1M-2M | 14 | 2 / 3 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 26 / 19.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 7 | -0.1496 |
| Chiusura manuale (app) | 7 | +0.0793 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
20:47:22 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 236 veto
20:46:59 ORACLE   360 raccolti, 220 analizzati, 1 BUY, 216 veto
20:46:36 ORACLE   360 raccolti, 233 analizzati, 1 BUY, 229 veto
20:46:12 ORACLE   353 raccolti, 227 analizzati, 1 BUY, 223 veto
20:45:49 ORACLE   343 raccolti, 227 analizzati, 1 BUY, 223 veto
20:45:26 ORACLE   320 raccolti, 190 analizzati, 1 BUY, 186 veto
20:45:03 ORACLE   307 raccolti, 185 analizzati, 1 BUY, 181 veto
20:44:41 ORACLE   300 raccolti, 185 analizzati, 1 BUY, 181 veto
20:44:18 SCRIBE   chiuso P-0685 $Pompompurin -0.0551 SOL (-45.1%)
20:44:18 CHARON   Stop loss $Pompompurin vendo 100% a -31.7% -> 0.0670 SOL
20:44:18 ORACLE   281 raccolti, 162 analizzati, 1 BUY, 158 veto
20:43:55 ORACLE   266 raccolti, 150 analizzati, 2 BUY, 145 veto
20:43:32 ORACLE   264 raccolti, 150 analizzati, 2 BUY, 145 veto
20:43:09 ORACLE   238 raccolti, 147 analizzati, 2 BUY, 142 veto
20:42:47 ORACLE   228 raccolti, 128 analizzati, 3 BUY, 123 veto
20:42:25 ORACLE   221 raccolti, 128 analizzati, 3 BUY, 123 veto
20:42:21 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
20:42:20 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
20:42:20 KAISER   run #405 · 1 posizioni · equity 6.0730 SOL · GMGN spenta (nessuna chiave) · Grok off
20:42:20 CREATORI memoria: 212780 lanci, 38872 creatori, 54 Coin in fascia alta
20:42:04 SCRIBE   fine run · trade 14 · win 43% · P&L 0.0595 SOL · equity 6.0730 SOL
20:42:04 ORACLE   360 raccolti, 226 analizzati, 3 BUY, 221 veto
20:41:49 ORACLE   360 raccolti, 246 analizzati, 3 BUY, 241 veto
20:41:25 ORACLE   360 raccolti, 237 analizzati, 3 BUY, 232 veto
20:41:01 ORACLE   360 raccolti, 205 analizzati, 3 BUY, 199 veto
20:40:39 ORACLE   360 raccolti, 234 analizzati, 3 BUY, 228 veto
20:40:15 ORACLE   360 raccolti, 226 analizzati, 3 BUY, 220 veto
20:39:50 ORACLE   360 raccolti, 230 analizzati, 3 BUY, 224 veto
20:39:26 ORACLE   360 raccolti, 218 analizzati, 2 BUY, 213 veto
20:39:03 ORACLE   360 raccolti, 233 analizzati, 2 BUY, 228 veto
20:38:41 ORACLE   360 raccolti, 220 analizzati, 2 BUY, 215 veto
20:38:18 ORACLE   360 raccolti, 237 analizzati, 2 BUY, 232 veto
20:37:55 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 243 veto
20:37:31 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 236 veto
20:37:09 ORACLE   360 raccolti, 241 analizzati, 2 BUY, 234 veto
20:36:46 ORACLE   360 raccolti, 249 analizzati, 1 BUY, 243 veto
20:36:22 ORACLE   360 raccolti, 247 analizzati, 1 BUY, 241 veto
20:35:59 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 235 veto
20:35:36 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 250 veto
20:35:11 ORACLE   360 raccolti, 243 analizzati, 2 BUY, 236 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

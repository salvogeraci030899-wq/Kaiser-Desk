# KAISER · report paper trading

Aggiornato: 2026-11-24 01:13 UTC · in esecuzione da 1.1 giorni · 353 run

| | |
|---|---|
| Equity | **6.0224 SOL** (+0.4% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0224 SOL |
| Trade chiusi | 6 |
| Win rate | 50% |
| P&L realizzato | +0.0224 SOL (~$1.62) |
| Media vincite / perdite | +19.4% / -13.2% |
| Profit factor | 1.47 |
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
| Prendo chiusi | 6 di 50, netto medio +3.1% (intervallo -13.3% / +19.5%), in utile 50% |
| Scarto simulati chiusi | 1, netto medio -35.8%, in utile 0%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +38.9% |
| Avvisi senza risposta | 26 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 144706 lanci noti, 27336 creatori; 24 Coin in fascia alta viste (21 creatori), 5 raddoppiate (5 creatori). Creatore trovato: tabella 42, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 21 | 6 / 2 | 6 | +3.1% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 6 / 5.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 2 | -0.0471 |
| Chiusura manuale (app) | 4 | +0.0695 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
01:12:54 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 257 veto
01:12:31 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 249 veto
01:12:08 ORACLE   360 raccolti, 250 analizzati, 2 BUY, 247 veto
01:11:44 ORACLE   360 raccolti, 266 analizzati, 2 BUY, 263 veto
01:11:22 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 245 veto
01:10:59 ORACLE   346 raccolti, 246 analizzati, 2 BUY, 243 veto
01:10:36 ORACLE   333 raccolti, 220 analizzati, 2 BUY, 217 veto
01:10:14 ORACLE   321 raccolti, 220 analizzati, 2 BUY, 217 veto
01:09:51 ORACLE   277 raccolti, 192 analizzati, 2 BUY, 189 veto
01:09:29 ORACLE   265 raccolti, 164 analizzati, 2 BUY, 161 veto
01:09:07 ORACLE   261 raccolti, 162 analizzati, 2 BUY, 159 veto
01:08:44 ORACLE   211 raccolti, 138 analizzati, 2 BUY, 135 veto
01:08:22 ORACLE   200 raccolti, 123 analizzati, 2 BUY, 120 veto
01:08:01 ORACLE   198 raccolti, 117 analizzati, 2 BUY, 114 veto
01:07:58 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
01:07:58 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
01:07:57 KAISER   run #353 · 0 posizioni · equity 6.0224 SOL · GMGN spenta (nessuna chiave) · Grok off
01:07:57 CREATORI memoria: 144528 lanci, 27296 creatori, 24 Coin in fascia alta
01:07:43 SCRIBE   fine run · trade 6 · win 50% · P&L 0.0224 SOL · equity 6.0224 SOL
01:07:24 ORACLE   360 raccolti, 245 analizzati, 2 BUY, 242 veto
01:07:03 ORACLE   360 raccolti, 236 analizzati, 2 BUY, 233 veto
01:06:40 ORACLE   360 raccolti, 240 analizzati, 2 BUY, 237 veto
01:06:18 ORACLE   360 raccolti, 243 analizzati, 2 BUY, 240 veto
01:05:56 ORACLE   360 raccolti, 235 analizzati, 2 BUY, 232 veto
01:05:34 ORACLE   360 raccolti, 237 analizzati, 2 BUY, 234 veto
01:05:11 ORACLE   360 raccolti, 232 analizzati, 2 BUY, 229 veto
01:04:49 ORACLE   360 raccolti, 234 analizzati, 2 BUY, 231 veto
01:04:27 ORACLE   360 raccolti, 236 analizzati, 2 BUY, 233 veto
01:04:05 ORACLE   360 raccolti, 239 analizzati, 2 BUY, 236 veto
01:03:43 ORACLE   360 raccolti, 228 analizzati, 2 BUY, 225 veto
01:03:21 ORACLE   360 raccolti, 238 analizzati, 2 BUY, 235 veto
01:02:59 ORACLE   360 raccolti, 244 analizzati, 2 BUY, 241 veto
01:02:37 ORACLE   360 raccolti, 235 analizzati, 2 BUY, 232 veto
01:02:14 ORACLE   360 raccolti, 235 analizzati, 2 BUY, 232 veto
01:01:52 ORACLE   360 raccolti, 234 analizzati, 2 BUY, 231 veto
01:01:30 ORACLE   360 raccolti, 232 analizzati, 2 BUY, 229 veto
01:01:07 ORACLE   360 raccolti, 233 analizzati, 2 BUY, 230 veto
01:00:45 ORACLE   360 raccolti, 225 analizzati, 2 BUY, 222 veto
01:00:23 ORACLE   360 raccolti, 220 analizzati, 2 BUY, 217 veto
01:00:00 ORACLE   360 raccolti, 221 analizzati, 2 BUY, 218 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

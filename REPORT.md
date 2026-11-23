# KAISER · report paper trading

Aggiornato: 2026-11-23 02:01 UTC · in esecuzione da 0.2 giorni · 324 run

| | |
|---|---|
| Equity | **6.0000 SOL** (+0.0% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0000 SOL |
| Trade chiusi | 0 |
| Win rate | 0% |
| P&L realizzato | +0.0000 SOL (~$0.00) |
| Media vincite / perdite | +0.0% / +0.0% |
| Profit factor | 0.00 |
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

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 0 di 50 |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 15 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 103070 lanci noti, 20117 creatori; 9 Coin in fascia alta viste (9 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 87, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 8 | 0 / 0 | 0 | n/d |
| 1M-2M | 5 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 21 / 19.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
02:01:27 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 254 veto
02:01:04 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 253 veto
02:00:42 ORACLE   360 raccolti, 262 analizzati, 2 BUY, 259 veto
02:00:20 ORACLE   360 raccolti, 255 analizzati, 2 BUY, 252 veto
01:59:58 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 249 veto
01:59:36 ORACLE   360 raccolti, 261 analizzati, 2 BUY, 258 veto
01:59:15 ORACLE   360 raccolti, 261 analizzati, 2 BUY, 258 veto
01:58:53 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 251 veto
01:58:31 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 255 veto
01:58:10 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 250 veto
01:57:48 ORACLE   360 raccolti, 255 analizzati, 2 BUY, 252 veto
01:57:26 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 257 veto
01:57:04 ORACLE   360 raccolti, 262 analizzati, 2 BUY, 259 veto
01:56:43 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 255 veto
01:56:21 ORACLE   360 raccolti, 261 analizzati, 2 BUY, 258 veto
01:55:59 ORACLE   354 raccolti, 254 analizzati, 2 BUY, 251 veto
01:55:37 ORACLE   350 raccolti, 238 analizzati, 2 BUY, 235 veto
01:55:15 ORACLE   329 raccolti, 223 analizzati, 2 BUY, 220 veto
01:54:53 ORACLE   315 raccolti, 218 analizzati, 2 BUY, 215 veto
01:54:32 ORACLE   312 raccolti, 215 analizzati, 2 BUY, 212 veto
01:54:11 ORACLE   293 raccolti, 201 analizzati, 2 BUY, 198 veto
01:53:49 ORACLE   287 raccolti, 186 analizzati, 2 BUY, 183 veto
01:53:28 ORACLE   284 raccolti, 186 analizzati, 2 BUY, 183 veto
01:53:06 ORACLE   262 raccolti, 175 analizzati, 2 BUY, 172 veto
01:52:45 ORACLE   255 raccolti, 160 analizzati, 2 BUY, 157 veto
01:52:24 ORACLE   254 raccolti, 159 analizzati, 2 BUY, 156 veto
01:52:02 ORACLE   226 raccolti, 141 analizzati, 2 BUY, 138 veto
01:51:40 ORACLE   217 raccolti, 128 analizzati, 2 BUY, 125 veto
01:51:19 ORACLE   212 raccolti, 128 analizzati, 2 BUY, 125 veto
01:51:17 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
01:51:17 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
01:51:17 KAISER   run #324 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
01:51:17 CREATORI memoria: 102870 lanci, 20090 creatori, 9 Coin in fascia alta
01:51:04 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
01:50:49 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 249 veto
01:50:27 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 249 veto
01:50:05 ORACLE   360 raccolti, 240 analizzati, 3 BUY, 236 veto
01:49:43 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 247 veto
01:49:20 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 251 veto
01:48:58 ORACLE   360 raccolti, 244 analizzati, 3 BUY, 240 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

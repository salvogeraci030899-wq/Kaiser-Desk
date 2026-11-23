# KAISER · report paper trading

Aggiornato: 2026-11-23 06:40 UTC · in esecuzione da 0.4 giorni · 330 run

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
| Scarto simulati chiusi | 1, netto medio +95.5%, in utile 100%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 109868 lanci noti, 20933 creatori; 11 Coin in fascia alta viste (10 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 108, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 12 | 0 / 1 | 0 | n/d |
| 1M-2M | 8 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 49 / 47.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
06:40:36 ORACLE   360 raccolti, 276 analizzati, 3 BUY, 272 veto
06:40:14 ORACLE   360 raccolti, 286 analizzati, 3 BUY, 282 veto
06:39:52 ORACLE   360 raccolti, 288 analizzati, 3 BUY, 284 veto
06:39:29 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 280 veto
06:39:06 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 283 veto
06:38:44 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 283 veto
06:38:22 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 277 veto
06:38:00 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 283 veto
06:37:37 ORACLE   360 raccolti, 283 analizzati, 3 BUY, 279 veto
06:37:15 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 274 veto
06:37:13 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
06:36:53 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 280 veto
06:36:30 ORACLE   354 raccolti, 277 analizzati, 3 BUY, 273 veto
06:36:08 ORACLE   350 raccolti, 276 analizzati, 3 BUY, 272 veto
06:35:45 ORACLE   341 raccolti, 268 analizzati, 3 BUY, 264 veto
06:35:22 ORACLE   336 raccolti, 258 analizzati, 3 BUY, 254 veto
06:34:59 ORACLE   331 raccolti, 253 analizzati, 3 BUY, 249 veto
06:34:36 ORACLE   305 raccolti, 238 analizzati, 3 BUY, 234 veto
06:34:14 ORACLE   300 raccolti, 231 analizzati, 3 BUY, 227 veto
06:33:53 ORACLE   294 raccolti, 223 analizzati, 3 BUY, 219 veto
06:33:30 ORACLE   273 raccolti, 208 analizzati, 3 BUY, 204 veto
06:33:08 ORACLE   263 raccolti, 194 analizzati, 3 BUY, 190 veto
06:32:47 ORACLE   257 raccolti, 190 analizzati, 3 BUY, 186 veto
06:32:25 ORACLE   243 raccolti, 177 analizzati, 2 BUY, 174 veto
06:32:03 ORACLE   231 raccolti, 173 analizzati, 2 BUY, 170 veto
06:31:41 ORACLE   228 raccolti, 162 analizzati, 2 BUY, 159 veto
06:31:19 ORACLE   199 raccolti, 145 analizzati, 2 BUY, 142 veto
06:30:58 ORACLE   197 raccolti, 139 analizzati, 3 BUY, 135 veto
06:30:37 ORACLE   195 raccolti, 132 analizzati, 3 BUY, 128 veto
06:30:34 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
06:30:34 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
06:30:33 KAISER   run #330 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
06:30:33 CREATORI memoria: 109655 lanci, 20894 creatori, 11 Coin in fascia alta
06:30:17 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
06:30:13 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 277 veto
06:29:51 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
06:29:29 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
06:29:07 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
06:28:45 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 283 veto
06:28:23 ORACLE   360 raccolti, 287 analizzati, 3 BUY, 283 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

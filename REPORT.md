# KAISER · report paper trading

Aggiornato: 2026-11-23 01:06 UTC · in esecuzione da 0.1 giorni · 323 run

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
Memoria: 101617 lanci noti, 19928 creatori; 9 Coin in fascia alta viste (9 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 74, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 6 | 0 / 0 | 0 | n/d |
| 1M-2M | 4 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 17 / 15.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
01:06:15 ORACLE   357 raccolti, 256 analizzati, 4 BUY, 251 veto
01:05:52 ORACLE   351 raccolti, 247 analizzati, 3 BUY, 242 veto
01:05:30 ORACLE   343 raccolti, 237 analizzati, 3 BUY, 232 veto
01:05:08 ORACLE   315 raccolti, 225 analizzati, 4 BUY, 220 veto
01:04:46 ORACLE   302 raccolti, 212 analizzati, 4 BUY, 207 veto
01:04:24 ORACLE   295 raccolti, 204 analizzati, 4 BUY, 199 veto
01:04:02 ORACLE   271 raccolti, 189 analizzati, 4 BUY, 184 veto
01:03:40 ORACLE   256 raccolti, 179 analizzati, 4 BUY, 174 veto
01:03:19 ORACLE   255 raccolti, 179 analizzati, 4 BUY, 174 veto
01:02:56 ORACLE   242 raccolti, 170 analizzati, 3 BUY, 165 veto
01:02:34 ORACLE   229 raccolti, 162 analizzati, 3 BUY, 157 veto
01:02:13 ORACLE   225 raccolti, 156 analizzati, 3 BUY, 151 veto
01:01:51 ORACLE   202 raccolti, 142 analizzati, 3 BUY, 137 veto
01:01:29 ORACLE   192 raccolti, 133 analizzati, 3 BUY, 128 veto
01:01:07 ORACLE   192 raccolti, 133 analizzati, 2 BUY, 129 veto
01:01:04 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
01:01:04 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
01:01:04 KAISER   run #323 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
01:01:04 CREATORI memoria: 101484 lanci, 19909 creatori, 9 Coin in fascia alta
01:00:50 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
01:00:43 ORACLE   360 raccolti, 259 analizzati, 2 BUY, 255 veto
01:00:20 ORACLE   360 raccolti, 265 analizzati, 2 BUY, 261 veto
00:59:57 ORACLE   360 raccolti, 265 analizzati, 3 BUY, 260 veto
00:59:34 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 253 veto
00:59:11 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 258 veto
00:58:49 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 257 veto
00:58:26 ORACLE   360 raccolti, 252 analizzati, 3 BUY, 247 veto
00:58:03 ORACLE   360 raccolti, 261 analizzati, 3 BUY, 256 veto
00:57:40 ORACLE   360 raccolti, 259 analizzati, 2 BUY, 254 veto
00:57:18 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 247 veto
00:56:55 ORACLE   360 raccolti, 250 analizzati, 2 BUY, 245 veto
00:56:33 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 247 veto
00:56:10 ORACLE   360 raccolti, 245 analizzati, 4 BUY, 240 veto
00:55:47 ORACLE   360 raccolti, 249 analizzati, 4 BUY, 244 veto
00:55:24 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 255 veto
00:55:01 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 253 veto
00:54:38 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 253 veto
00:54:16 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 255 veto
00:53:53 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 251 veto
00:53:31 ORACLE   360 raccolti, 263 analizzati, 2 BUY, 258 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

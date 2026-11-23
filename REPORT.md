# KAISER · report paper trading

Aggiornato: 2026-11-23 03:42 UTC · in esecuzione da 0.2 giorni · 326 run

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
| Avvisi senza risposta | 21 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 105630 lanci noti, 20417 creatori; 10 Coin in fascia alta viste (10 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 101, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 11 | 0 / 0 | 0 | n/d |
| 1M-2M | 6 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 36 / 34.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
03:42:00 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 244 veto
03:41:37 ORACLE   360 raccolti, 264 analizzati, 3 BUY, 260 veto
03:41:14 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 270 veto
03:40:52 ORACLE   360 raccolti, 254 analizzati, 3 BUY, 250 veto
03:40:28 ORACLE   360 raccolti, 264 analizzati, 3 BUY, 260 veto
03:40:06 ORACLE   360 raccolti, 268 analizzati, 3 BUY, 264 veto
03:39:43 ORACLE   360 raccolti, 261 analizzati, 3 BUY, 258 veto
03:39:20 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 264 veto
03:38:58 ORACLE   360 raccolti, 268 analizzati, 3 BUY, 264 veto
03:38:34 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 255 veto
03:38:12 ORACLE   360 raccolti, 269 analizzati, 3 BUY, 266 veto
03:37:49 ORACLE   360 raccolti, 254 analizzati, 3 BUY, 251 veto
03:37:27 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 252 veto
03:37:04 ORACLE   339 raccolti, 237 analizzati, 3 BUY, 234 veto
03:36:40 ORACLE   332 raccolti, 229 analizzati, 3 BUY, 226 veto
03:36:18 ORACLE   323 raccolti, 226 analizzati, 3 BUY, 223 veto
03:35:55 ORACLE   303 raccolti, 206 analizzati, 3 BUY, 203 veto
03:35:33 ORACLE   289 raccolti, 194 analizzati, 3 BUY, 191 veto
03:35:11 ORACLE   280 raccolti, 186 analizzati, 3 BUY, 182 veto
03:35:09 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
03:35:09 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
03:34:48 ORACLE   254 raccolti, 174 analizzati, 3 BUY, 170 veto
03:34:26 ORACLE   243 raccolti, 165 analizzati, 3 BUY, 161 veto
03:34:04 ORACLE   240 raccolti, 163 analizzati, 3 BUY, 159 veto
03:33:41 ORACLE   222 raccolti, 149 analizzati, 3 BUY, 146 veto
03:33:19 ORACLE   214 raccolti, 138 analizzati, 3 BUY, 135 veto
03:32:58 ORACLE   208 raccolti, 129 analizzati, 3 BUY, 126 veto
03:32:36 ORACLE   195 raccolti, 120 analizzati, 3 BUY, 115 veto
03:32:14 ORACLE   190 raccolti, 120 analizzati, 3 BUY, 115 veto
03:31:51 ORACLE   190 raccolti, 116 analizzati, 3 BUY, 111 veto
03:31:48 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
03:31:48 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 40000→50000, minAgeMin 5→1, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 50000000→2000000, gmgnInterval 1h→1m, maxAgeH 720→72, minTxH1 40→50, entryGapSec 60→120, semiAuto spento→avvisi e paper
03:31:48 KAISER   run #326 · 0 posizioni · equity 6.0000 SOL · GMGN spenta (nessuna chiave) · Grok off
03:31:48 CREATORI memoria: 105378 lanci, 20393 creatori, 10 Coin in fascia alta
03:31:34 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
03:31:23 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 263 veto
03:31:00 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 263 veto
03:30:36 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 258 veto
03:30:13 QUARTER  SEGNALE $MCAT score 59 (semi-automatico)
03:30:13 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 254 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

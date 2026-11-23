# KAISER · report paper trading

Aggiornato: 2026-11-23 11:59 UTC · in esecuzione da 0.6 giorni · 337 run

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
Il conteggio parte dal 2026-11-23 09:12 UTC (primo run con id unici e senza blocco per slippage): le decisioni precedenti restano nel registro ma non contano.

| | |
|---|---|
| Esito | **in corso** |
| Prendo chiusi | 0 di 50 |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 115847 lanci noti, 21812 creatori; 12 Coin in fascia alta viste (11 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 215, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 12 | 0 / 1 | 0 | n/d |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 52 / 50.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
11:59:12 ORACLE   360 raccolti, 296 analizzati, 5 BUY, 291 veto
11:58:49 ORACLE   360 raccolti, 296 analizzati, 5 BUY, 291 veto
11:58:27 ORACLE   360 raccolti, 292 analizzati, 5 BUY, 287 veto
11:58:05 ORACLE   360 raccolti, 287 analizzati, 5 BUY, 282 veto
11:57:43 ORACLE   360 raccolti, 295 analizzati, 5 BUY, 290 veto
11:57:21 ORACLE   360 raccolti, 295 analizzati, 5 BUY, 290 veto
11:56:59 ORACLE   360 raccolti, 288 analizzati, 5 BUY, 283 veto
11:56:37 ORACLE   360 raccolti, 291 analizzati, 5 BUY, 286 veto
11:56:15 ORACLE   360 raccolti, 289 analizzati, 5 BUY, 284 veto
11:55:53 ORACLE   360 raccolti, 281 analizzati, 4 BUY, 276 veto
11:55:30 ORACLE   360 raccolti, 291 analizzati, 4 BUY, 286 veto
11:55:08 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
11:54:46 ORACLE   360 raccolti, 276 analizzati, 4 BUY, 271 veto
11:54:23 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
11:54:01 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
11:53:38 ORACLE   360 raccolti, 277 analizzati, 4 BUY, 272 veto
11:53:16 ORACLE   360 raccolti, 282 analizzati, 4 BUY, 277 veto
11:52:54 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
11:52:32 ORACLE   360 raccolti, 279 analizzati, 5 BUY, 274 veto
11:52:10 ORACLE   360 raccolti, 284 analizzati, 5 BUY, 279 veto
11:51:48 ORACLE   360 raccolti, 285 analizzati, 5 BUY, 280 veto
11:51:26 ORACLE   360 raccolti, 272 analizzati, 5 BUY, 267 veto
11:51:04 ORACLE   360 raccolti, 276 analizzati, 5 BUY, 271 veto
11:50:41 ORACLE   360 raccolti, 285 analizzati, 5 BUY, 280 veto
11:50:19 ORACLE   360 raccolti, 272 analizzati, 5 BUY, 267 veto
11:49:57 ORACLE   350 raccolti, 270 analizzati, 5 BUY, 265 veto
11:49:35 ORACLE   343 raccolti, 263 analizzati, 5 BUY, 258 veto
11:49:12 ORACLE   339 raccolti, 259 analizzati, 5 BUY, 254 veto
11:48:50 ORACLE   319 raccolti, 246 analizzati, 5 BUY, 241 veto
11:48:27 ORACLE   312 raccolti, 236 analizzati, 5 BUY, 231 veto
11:48:05 ORACLE   307 raccolti, 235 analizzati, 5 BUY, 230 veto
11:47:43 ORACLE   287 raccolti, 222 analizzati, 5 BUY, 217 veto
11:47:21 ORACLE   276 raccolti, 216 analizzati, 5 BUY, 211 veto
11:46:59 ORACLE   274 raccolti, 212 analizzati, 5 BUY, 207 veto
11:46:37 ORACLE   267 raccolti, 204 analizzati, 5 BUY, 199 veto
11:46:15 ORACLE   260 raccolti, 193 analizzati, 5 BUY, 188 veto
11:45:53 ORACLE   254 raccolti, 192 analizzati, 5 BUY, 187 veto
11:45:31 ORACLE   232 raccolti, 176 analizzati, 5 BUY, 171 veto
11:45:09 ORACLE   226 raccolti, 172 analizzati, 5 BUY, 167 veto
11:44:48 ORACLE   224 raccolti, 168 analizzati, 5 BUY, 163 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

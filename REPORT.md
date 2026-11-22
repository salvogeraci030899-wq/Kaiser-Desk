# KAISER · report paper trading

Aggiornato: 2026-11-22 23:20 UTC · in esecuzione da 0.1 giorni · 320 run

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
| Avvisi senza risposta | 12 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 98902 lanci noti, 19517 creatori; 6 Coin in fascia alta viste (6 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 461, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 4 | 0 / 0 | 0 | n/d |
| 1M-2M | 3 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 21 / 19.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
23:20:21 SCRIBE   fine run · trade 0 · win 0% · P&L 0.0000 SOL · equity 6.0000 SOL
23:20:11 ORACLE   360 raccolti, 239 analizzati, 2 BUY, 236 veto
23:19:49 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 249 veto
23:19:27 ORACLE   360 raccolti, 246 analizzati, 3 BUY, 242 veto
23:19:05 ORACLE   360 raccolti, 239 analizzati, 3 BUY, 235 veto
23:18:43 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 244 veto
23:18:20 ORACLE   360 raccolti, 243 analizzati, 3 BUY, 239 veto
23:17:58 ORACLE   360 raccolti, 245 analizzati, 3 BUY, 241 veto
23:17:36 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 253 veto
23:17:13 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 251 veto
23:16:51 ORACLE   360 raccolti, 249 analizzati, 3 BUY, 245 veto
23:16:29 ORACLE   360 raccolti, 256 analizzati, 3 BUY, 252 veto
23:16:07 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 254 veto
23:15:44 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 254 veto
23:15:22 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 254 veto
23:15:00 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 255 veto
23:14:38 ORACLE   360 raccolti, 252 analizzati, 2 BUY, 249 veto
23:14:16 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 246 veto
23:13:53 ORACLE   360 raccolti, 249 analizzati, 3 BUY, 245 veto
23:13:32 ORACLE   360 raccolti, 242 analizzati, 3 BUY, 238 veto
23:13:10 ORACLE   360 raccolti, 252 analizzati, 3 BUY, 248 veto
23:12:47 ORACLE   360 raccolti, 256 analizzati, 3 BUY, 252 veto
23:12:25 ORACLE   360 raccolti, 236 analizzati, 3 BUY, 232 veto
23:12:03 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 247 veto
23:11:40 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 244 veto
23:11:17 ORACLE   360 raccolti, 239 analizzati, 2 BUY, 236 veto
23:10:55 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
23:10:33 ORACLE   360 raccolti, 240 analizzati, 3 BUY, 236 veto
23:10:11 ORACLE   360 raccolti, 230 analizzati, 2 BUY, 227 veto
23:09:49 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 244 veto
23:09:27 ORACLE   360 raccolti, 245 analizzati, 2 BUY, 242 veto
23:09:05 ORACLE   360 raccolti, 244 analizzati, 2 BUY, 241 veto
23:08:43 ORACLE   360 raccolti, 239 analizzati, 2 BUY, 236 veto
23:08:21 ORACLE   360 raccolti, 236 analizzati, 2 BUY, 233 veto
23:07:59 ORACLE   360 raccolti, 223 analizzati, 2 BUY, 220 veto
23:07:37 ORACLE   360 raccolti, 226 analizzati, 2 BUY, 223 veto
23:07:15 ORACLE   360 raccolti, 241 analizzati, 2 BUY, 238 veto
23:06:53 ORACLE   360 raccolti, 231 analizzati, 1 BUY, 228 veto
23:06:31 ORACLE   360 raccolti, 242 analizzati, 1 BUY, 239 veto
23:06:08 ORACLE   360 raccolti, 238 analizzati, 2 BUY, 235 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

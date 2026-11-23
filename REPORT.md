# KAISER · report paper trading

Aggiornato: 2026-11-23 03:22 UTC · in esecuzione da 0.2 giorni · 325 run

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
Memoria: 105212 lanci noti, 20356 creatori; 10 Coin in fascia alta viste (10 creatori), 1 raddoppiate (1 creatori). Creatore trovato: tabella 420, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 10 | 0 / 0 | 0 | n/d |
| 1M-2M | 6 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 30 / 28.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
03:22:36 ORACLE   360 raccolti, 238 analizzati, 4 BUY, 234 veto
03:22:13 ORACLE   360 raccolti, 242 analizzati, 3 BUY, 239 veto
03:21:50 ORACLE   360 raccolti, 244 analizzati, 3 BUY, 241 veto
03:21:28 ORACLE   360 raccolti, 240 analizzati, 3 BUY, 236 veto
03:21:05 ORACLE   360 raccolti, 240 analizzati, 3 BUY, 236 veto
03:20:42 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
03:20:19 ORACLE   360 raccolti, 239 analizzati, 3 BUY, 235 veto
03:19:56 ORACLE   360 raccolti, 246 analizzati, 2 BUY, 243 veto
03:19:33 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 239 veto
03:19:11 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
03:18:48 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
03:18:25 ORACLE   360 raccolti, 239 analizzati, 3 BUY, 235 veto
03:18:02 ORACLE   360 raccolti, 237 analizzati, 3 BUY, 233 veto
03:17:39 ORACLE   360 raccolti, 241 analizzati, 2 BUY, 238 veto
03:17:17 ORACLE   360 raccolti, 240 analizzati, 2 BUY, 237 veto
03:16:54 ORACLE   360 raccolti, 228 analizzati, 3 BUY, 224 veto
03:16:32 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 237 veto
03:16:09 ORACLE   360 raccolti, 234 analizzati, 3 BUY, 230 veto
03:15:46 ORACLE   360 raccolti, 224 analizzati, 3 BUY, 220 veto
03:15:23 ORACLE   360 raccolti, 239 analizzati, 3 BUY, 235 veto
03:15:00 ORACLE   360 raccolti, 246 analizzati, 3 BUY, 242 veto
03:14:38 ORACLE   360 raccolti, 233 analizzati, 3 BUY, 229 veto
03:14:14 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 247 veto
03:13:51 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 247 veto
03:13:29 ORACLE   360 raccolti, 248 analizzati, 4 BUY, 243 veto
03:13:05 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 251 veto
03:12:42 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 254 veto
03:12:19 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 253 veto
03:11:56 ORACLE   360 raccolti, 260 analizzati, 3 BUY, 256 veto
03:11:34 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 244 veto
03:11:11 ORACLE   360 raccolti, 249 analizzati, 3 BUY, 245 veto
03:10:48 ORACLE   360 raccolti, 258 analizzati, 3 BUY, 254 veto
03:10:25 ORACLE   360 raccolti, 250 analizzati, 3 BUY, 246 veto
03:10:02 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 250 veto
03:09:40 ORACLE   360 raccolti, 244 analizzati, 2 BUY, 241 veto
03:09:17 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 253 veto
03:08:54 ORACLE   360 raccolti, 255 analizzati, 2 BUY, 252 veto
03:08:31 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 253 veto
03:08:08 ORACLE   360 raccolti, 259 analizzati, 2 BUY, 256 veto
03:07:46 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 257 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

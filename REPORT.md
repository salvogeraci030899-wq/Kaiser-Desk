# KAISER · report paper trading

Aggiornato: 2026-11-23 12:54 UTC · in esecuzione da 0.6 giorni · 338 run

| | |
|---|---|
| Equity | **5.9774 SOL** (-0.4% dal capitale iniziale di 6 SOL) |
| Cassa | 5.8790 SOL |
| Trade chiusi | 0 |
| Win rate | 0% |
| P&L realizzato | +0.0000 SOL (~$0.00) |
| Media vincite / perdite | +0.0% / +0.0% |
| Profit factor | 0.00 |
| Circuit breaker | no |

## Posizioni aperte
- **$SIDOOR** P-0671 · 0.120 SOL · -18.0% · resta 100% · [grafico](https://dexscreener.com/solana/3peugE6Fm4fpaVvrV2KBFN3nvLbCGEhGoUXDDxAHuscR)

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
Memoria: 116947 lanci noti, 21986 creatori; 13 Coin in fascia alta viste (12 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 250, richiesta esterna 1, sconosciuto 0.
Richieste esterne per il creatore: pump v3: 0 riuscite, 1 fallite (ultimo errore: HTTP 404); pump v1: 0 riuscite, 1 fallite (ultimo errore: HTTP 530); jupiter: 1 riuscite, 0 fallite.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 13 | 1 / 1 | 0 | n/d |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 53 / 51.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
12:54:17 ORACLE   360 raccolti, 266 analizzati, 4 BUY, 261 veto
12:53:55 ORACLE   360 raccolti, 261 analizzati, 4 BUY, 256 veto
12:53:32 ORACLE   360 raccolti, 268 analizzati, 5 BUY, 263 veto
12:53:11 ORACLE   360 raccolti, 268 analizzati, 5 BUY, 263 veto
12:52:48 ORACLE   360 raccolti, 264 analizzati, 3 BUY, 260 veto
12:52:26 ORACLE   360 raccolti, 271 analizzati, 3 BUY, 267 veto
12:52:04 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 259 veto
12:51:42 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 259 veto
12:51:20 ORACLE   360 raccolti, 270 analizzati, 4 BUY, 265 veto
12:50:58 ORACLE   360 raccolti, 268 analizzati, 4 BUY, 263 veto
12:50:36 ORACLE   360 raccolti, 264 analizzati, 4 BUY, 259 veto
12:50:14 ORACLE   360 raccolti, 264 analizzati, 4 BUY, 258 veto
12:49:51 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 267 veto
12:49:29 ORACLE   360 raccolti, 267 analizzati, 3 BUY, 262 veto
12:49:06 ORACLE   360 raccolti, 275 analizzati, 4 BUY, 270 veto
12:48:44 ORACLE   360 raccolti, 272 analizzati, 5 BUY, 266 veto
12:48:41 QUARTER  BUY $SIDOOR 0.120 SOL score 64 impatto 2.04% (Jupiter)
12:48:21 QUARTER  SEGNALE $SIDOOR score 64 (semi-automatico)
12:48:21 ORACLE   360 raccolti, 264 analizzati, 5 BUY, 258 veto
12:47:58 ORACLE   360 raccolti, 269 analizzati, 4 BUY, 264 veto
12:47:36 ORACLE   360 raccolti, 273 analizzati, 4 BUY, 268 veto
12:47:14 ORACLE   360 raccolti, 268 analizzati, 4 BUY, 263 veto
12:46:52 ORACLE   360 raccolti, 280 analizzati, 4 BUY, 275 veto
12:46:30 ORACLE   360 raccolti, 278 analizzati, 4 BUY, 273 veto
12:46:08 ORACLE   360 raccolti, 279 analizzati, 4 BUY, 274 veto
12:45:45 ORACLE   360 raccolti, 278 analizzati, 4 BUY, 273 veto
12:45:23 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 280 veto
12:45:01 ORACLE   360 raccolti, 280 analizzati, 4 BUY, 275 veto
12:44:38 ORACLE   360 raccolti, 278 analizzati, 4 BUY, 273 veto
12:44:16 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
12:43:53 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 269 veto
12:43:31 ORACLE   360 raccolti, 284 analizzati, 3 BUY, 280 veto
12:43:09 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
12:42:47 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 278 veto
12:42:26 ORACLE   360 raccolti, 285 analizzati, 3 BUY, 281 veto
12:42:03 ORACLE   360 raccolti, 285 analizzati, 4 BUY, 281 veto
12:41:41 ORACLE   360 raccolti, 279 analizzati, 4 BUY, 275 veto
12:41:19 ORACLE   360 raccolti, 281 analizzati, 4 BUY, 277 veto
12:40:57 ORACLE   360 raccolti, 283 analizzati, 4 BUY, 279 veto
12:40:35 ORACLE   360 raccolti, 279 analizzati, 4 BUY, 275 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

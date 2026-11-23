# KAISER · report paper trading

Aggiornato: 2026-11-23 14:55 UTC · in esecuzione da 0.7 giorni · 340 run

| | |
|---|---|
| Equity | **5.9718 SOL** (-0.5% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9718 SOL |
| Trade chiusi | 1 |
| Win rate | 0% |
| P&L realizzato | -0.0282 SOL (~$-2.15) |
| Media vincite / perdite | +0.0% / -23.3% |
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
| Prendo chiusi | 1 di 50 |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 121035 lanci noti, 22553 creatori; 13 Coin in fascia alta viste (12 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 513, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 13 | 1 / 1 | 1 | -23.3% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 53 / 51.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 1 | -0.0282 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
14:54:54 ORACLE   360 raccolti, 227 analizzati, 5 BUY, 222 veto
14:54:31 ORACLE   360 raccolti, 228 analizzati, 5 BUY, 223 veto
14:54:07 ORACLE   360 raccolti, 227 analizzati, 5 BUY, 222 veto
14:53:44 ORACLE   360 raccolti, 209 analizzati, 5 BUY, 204 veto
14:53:21 ORACLE   360 raccolti, 229 analizzati, 5 BUY, 224 veto
14:52:58 ORACLE   360 raccolti, 217 analizzati, 5 BUY, 212 veto
14:52:34 ORACLE   360 raccolti, 228 analizzati, 5 BUY, 223 veto
14:52:11 ORACLE   360 raccolti, 232 analizzati, 5 BUY, 227 veto
14:51:47 ORACLE   360 raccolti, 222 analizzati, 5 BUY, 217 veto
14:51:24 ORACLE   360 raccolti, 229 analizzati, 5 BUY, 224 veto
14:51:01 ORACLE   360 raccolti, 230 analizzati, 5 BUY, 225 veto
14:50:37 ORACLE   360 raccolti, 223 analizzati, 5 BUY, 218 veto
14:50:13 ORACLE   360 raccolti, 231 analizzati, 5 BUY, 226 veto
14:49:49 ORACLE   360 raccolti, 229 analizzati, 5 BUY, 224 veto
14:49:26 ORACLE   360 raccolti, 227 analizzati, 5 BUY, 222 veto
14:49:02 ORACLE   360 raccolti, 244 analizzati, 5 BUY, 239 veto
14:48:39 ORACLE   360 raccolti, 244 analizzati, 5 BUY, 239 veto
14:48:16 ORACLE   360 raccolti, 230 analizzati, 5 BUY, 225 veto
14:47:52 ORACLE   360 raccolti, 233 analizzati, 5 BUY, 228 veto
14:47:28 ORACLE   360 raccolti, 224 analizzati, 5 BUY, 219 veto
14:47:04 ORACLE   360 raccolti, 213 analizzati, 5 BUY, 208 veto
14:46:41 ORACLE   360 raccolti, 218 analizzati, 5 BUY, 213 veto
14:46:18 ORACLE   360 raccolti, 219 analizzati, 5 BUY, 214 veto
14:45:54 ORACLE   360 raccolti, 211 analizzati, 5 BUY, 206 veto
14:45:30 ORACLE   360 raccolti, 226 analizzati, 5 BUY, 221 veto
14:45:07 ORACLE   360 raccolti, 214 analizzati, 5 BUY, 209 veto
14:44:43 ORACLE   360 raccolti, 204 analizzati, 5 BUY, 199 veto
14:44:20 ORACLE   360 raccolti, 211 analizzati, 5 BUY, 206 veto
14:43:57 ORACLE   360 raccolti, 221 analizzati, 5 BUY, 216 veto
14:43:34 ORACLE   360 raccolti, 214 analizzati, 5 BUY, 209 veto
14:43:10 ORACLE   360 raccolti, 217 analizzati, 5 BUY, 212 veto
14:42:48 ORACLE   360 raccolti, 213 analizzati, 5 BUY, 208 veto
14:42:24 ORACLE   360 raccolti, 213 analizzati, 5 BUY, 208 veto
14:42:00 ORACLE   360 raccolti, 210 analizzati, 5 BUY, 205 veto
14:41:37 ORACLE   360 raccolti, 212 analizzati, 5 BUY, 207 veto
14:41:14 ORACLE   360 raccolti, 216 analizzati, 5 BUY, 211 veto
14:40:50 ORACLE   360 raccolti, 226 analizzati, 5 BUY, 221 veto
14:40:36 ORACLE   360 raccolti, 218 analizzati, 5 BUY, 213 veto
14:40:11 ORACLE   360 raccolti, 216 analizzati, 4 BUY, 211 veto
14:39:47 ORACLE   360 raccolti, 227 analizzati, 4 BUY, 222 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

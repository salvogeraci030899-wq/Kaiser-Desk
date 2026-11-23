# KAISER · report paper trading

Aggiornato: 2026-11-23 16:41 UTC · in esecuzione da 0.8 giorni · 342 run

| | |
|---|---|
| Equity | **6.0068 SOL** (+0.1% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0068 SOL |
| Trade chiusi | 2 |
| Win rate | 50% |
| P&L realizzato | +0.0068 SOL (~$0.51) |
| Media vincite / perdite | +29.1% / -23.3% |
| Profit factor | 1.24 |
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
| Prendo chiusi | 2 di 50, netto medio +2.9% (intervallo -48.4% / +54.2%), in utile 50% |
| Scarto simulati chiusi | 0; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | n/d |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 125714 lanci noti, 23359 creatori; 14 Coin in fascia alta viste (13 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 492, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 14 | 2 / 1 | 2 | +2.9% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 54 / 52.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 1 | -0.0282 |
| Chiusura manuale (app) | 1 | +0.0350 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
16:41:11 ORACLE   360 raccolti, 226 analizzati, 3 BUY, 222 veto
16:40:48 ORACLE   360 raccolti, 230 analizzati, 4 BUY, 226 veto
16:40:26 ORACLE   360 raccolti, 222 analizzati, 4 BUY, 218 veto
16:40:03 ORACLE   360 raccolti, 217 analizzati, 4 BUY, 213 veto
16:39:41 ORACLE   360 raccolti, 223 analizzati, 4 BUY, 219 veto
16:39:19 ORACLE   360 raccolti, 213 analizzati, 4 BUY, 209 veto
16:38:56 ORACLE   360 raccolti, 205 analizzati, 4 BUY, 201 veto
16:38:34 ORACLE   360 raccolti, 204 analizzati, 3 BUY, 200 veto
16:38:12 ORACLE   360 raccolti, 199 analizzati, 3 BUY, 195 veto
16:37:50 ORACLE   360 raccolti, 206 analizzati, 3 BUY, 202 veto
16:37:27 ORACLE   360 raccolti, 202 analizzati, 3 BUY, 198 veto
16:37:04 ORACLE   360 raccolti, 189 analizzati, 3 BUY, 185 veto
16:36:42 ORACLE   360 raccolti, 193 analizzati, 3 BUY, 189 veto
16:36:19 ORACLE   360 raccolti, 184 analizzati, 4 BUY, 180 veto
16:35:57 ORACLE   360 raccolti, 182 analizzati, 4 BUY, 178 veto
16:35:34 ORACLE   360 raccolti, 186 analizzati, 3 BUY, 182 veto
16:35:12 ORACLE   360 raccolti, 189 analizzati, 3 BUY, 185 veto
16:34:50 ORACLE   360 raccolti, 185 analizzati, 3 BUY, 181 veto
16:34:28 ORACLE   360 raccolti, 199 analizzati, 3 BUY, 195 veto
16:34:05 ORACLE   360 raccolti, 200 analizzati, 3 BUY, 196 veto
16:33:42 ORACLE   360 raccolti, 199 analizzati, 3 BUY, 195 veto
16:33:20 ORACLE   360 raccolti, 230 analizzati, 3 BUY, 226 veto
16:32:57 ORACLE   360 raccolti, 248 analizzati, 3 BUY, 244 veto
16:32:34 ORACLE   360 raccolti, 243 analizzati, 4 BUY, 239 veto
16:32:12 ORACLE   360 raccolti, 258 analizzati, 4 BUY, 254 veto
16:31:48 ORACLE   360 raccolti, 253 analizzati, 4 BUY, 249 veto
16:31:26 ORACLE   360 raccolti, 237 analizzati, 4 BUY, 233 veto
16:31:03 ORACLE   360 raccolti, 252 analizzati, 4 BUY, 248 veto
16:30:40 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 251 veto
16:30:18 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 251 veto
16:29:54 ORACLE   360 raccolti, 262 analizzati, 4 BUY, 258 veto
16:29:31 ORACLE   360 raccolti, 240 analizzati, 4 BUY, 236 veto
16:29:09 ORACLE   360 raccolti, 244 analizzati, 4 BUY, 240 veto
16:28:46 ORACLE   360 raccolti, 246 analizzati, 4 BUY, 242 veto
16:28:23 ORACLE   360 raccolti, 240 analizzati, 4 BUY, 236 veto
16:28:01 ORACLE   360 raccolti, 242 analizzati, 4 BUY, 238 veto
16:27:38 ORACLE   360 raccolti, 253 analizzati, 4 BUY, 249 veto
16:27:15 ORACLE   360 raccolti, 258 analizzati, 4 BUY, 254 veto
16:26:52 ORACLE   360 raccolti, 253 analizzati, 4 BUY, 249 veto
16:26:29 ORACLE   360 raccolti, 251 analizzati, 4 BUY, 247 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

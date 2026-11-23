# KAISER · report paper trading

Aggiornato: 2026-11-23 14:29 UTC · in esecuzione da 0.7 giorni · 340 run

| | |
|---|---|
| Equity | **5.9718 SOL** (-0.5% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9718 SOL |
| Trade chiusi | 1 |
| Win rate | 0% |
| P&L realizzato | -0.0282 SOL (~$-2.20) |
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
Memoria: 119729 lanci noti, 22376 creatori; 13 Coin in fascia alta viste (12 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 188, richiesta esterna 0, sconosciuto 0.
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
14:29:41 ORACLE   360 raccolti, 216 analizzati, 5 BUY, 211 veto
14:29:17 ORACLE   360 raccolti, 234 analizzati, 5 BUY, 229 veto
14:28:54 ORACLE   360 raccolti, 224 analizzati, 5 BUY, 219 veto
14:28:31 ORACLE   360 raccolti, 226 analizzati, 5 BUY, 221 veto
14:28:08 ORACLE   360 raccolti, 232 analizzati, 5 BUY, 227 veto
14:27:45 ORACLE   360 raccolti, 231 analizzati, 5 BUY, 226 veto
14:27:22 ORACLE   360 raccolti, 226 analizzati, 5 BUY, 221 veto
14:26:59 ORACLE   360 raccolti, 229 analizzati, 4 BUY, 225 veto
14:26:36 ORACLE   360 raccolti, 226 analizzati, 4 BUY, 222 veto
14:26:13 ORACLE   360 raccolti, 217 analizzati, 4 BUY, 213 veto
14:25:49 ORACLE   360 raccolti, 205 analizzati, 4 BUY, 201 veto
14:25:26 ORACLE   360 raccolti, 210 analizzati, 4 BUY, 206 veto
14:25:02 ORACLE   360 raccolti, 195 analizzati, 4 BUY, 191 veto
14:24:39 ORACLE   360 raccolti, 203 analizzati, 4 BUY, 199 veto
14:24:16 ORACLE   360 raccolti, 200 analizzati, 4 BUY, 196 veto
14:23:53 ORACLE   360 raccolti, 200 analizzati, 4 BUY, 196 veto
14:23:30 ORACLE   360 raccolti, 204 analizzati, 4 BUY, 200 veto
14:23:07 ORACLE   360 raccolti, 205 analizzati, 4 BUY, 201 veto
14:22:44 ORACLE   360 raccolti, 198 analizzati, 4 BUY, 194 veto
14:22:22 ORACLE   360 raccolti, 199 analizzati, 5 BUY, 194 veto
14:21:58 ORACLE   360 raccolti, 193 analizzati, 5 BUY, 188 veto
14:21:35 ORACLE   360 raccolti, 195 analizzati, 5 BUY, 190 veto
14:21:12 ORACLE   360 raccolti, 186 analizzati, 5 BUY, 181 veto
14:20:48 ORACLE   360 raccolti, 187 analizzati, 5 BUY, 182 veto
14:20:26 ORACLE   360 raccolti, 180 analizzati, 5 BUY, 175 veto
14:20:02 ORACLE   360 raccolti, 179 analizzati, 5 BUY, 174 veto
14:19:38 ORACLE   360 raccolti, 178 analizzati, 5 BUY, 173 veto
14:19:15 ORACLE   360 raccolti, 172 analizzati, 5 BUY, 167 veto
14:18:52 ORACLE   360 raccolti, 183 analizzati, 5 BUY, 178 veto
14:18:28 ORACLE   360 raccolti, 179 analizzati, 4 BUY, 174 veto
14:18:05 ORACLE   360 raccolti, 173 analizzati, 4 BUY, 168 veto
14:17:42 ORACLE   346 raccolti, 179 analizzati, 4 BUY, 174 veto
14:17:19 ORACLE   326 raccolti, 170 analizzati, 4 BUY, 165 veto
14:16:56 ORACLE   320 raccolti, 170 analizzati, 4 BUY, 165 veto
14:16:33 ORACLE   296 raccolti, 162 analizzati, 4 BUY, 157 veto
14:16:11 ORACLE   281 raccolti, 147 analizzati, 4 BUY, 142 veto
14:15:48 ORACLE   272 raccolti, 146 analizzati, 4 BUY, 141 veto
14:15:24 ORACLE   216 raccolti, 119 analizzati, 5 BUY, 114 veto
14:15:02 ORACLE   202 raccolti, 110 analizzati, 5 BUY, 105 veto
14:14:40 ORACLE   199 raccolti, 109 analizzati, 5 BUY, 104 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

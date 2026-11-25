# KAISER · report paper trading

Aggiornato: 2026-11-25 19:16 UTC · in esecuzione da 2.9 giorni · 403 run

| | |
|---|---|
| Equity | **6.0768 SOL** (+1.3% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0768 SOL |
| Trade chiusi | 13 |
| Win rate | 46% |
| P&L realizzato | +0.0768 SOL (~$5.40) |
| Media vincite / perdite | +24.6% / -11.9% |
| Profit factor | 1.75 |
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
| Prendo chiusi | 13 di 50, netto medio +4.9% (intervallo -8.1% / +17.9%), in utile 46.2% |
| Scarto simulati chiusi | 8, netto medio -2.5% (intervallo -44.2% / +39.1%), in utile 25%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +7.4% (-36.2%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 209599 lanci noti, 38380 creatori; 49 Coin in fascia alta viste (40 creatori), 14 raddoppiate (11 creatori). Creatore trovato: tabella 181, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 35 | 12 / 6 | 12 | +6.9% |
| 1M-2M | 14 | 2 / 3 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 21 / 15.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 5 | -0.0771 |
| Chiusura manuale (app) | 7 | +0.0793 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $Pompom | 58 | -21.3% | -0.0262 | +8% | -20% | Stop loss | 36m |
| $LENDR | 58 | +13.3% | +0.0163 | +26% | +14% | Chiusura manuale (app) | 6m |
| $MIM | 86 | -2.0% | -0.0024 | +0% | -36% | Stop loss | 1m |
| $PORTAL | 68 | -1.1% | -0.0014 | +0% | -30% | Stop loss | 0m |
| $BASKET | 72 | +14.3% | +0.0176 | +18% | +18% | Chiusura manuale (app) | 4m |
| $4CHAN | 56 | -19.6% | -0.0241 | +0% | -13% | Chiusura manuale (app) | 7m |
| $cateball | 81 | +61.4% | +0.0746 | +111% | +54% | Trailing stop | 13m |
| $JENSEN | 84 | -15.5% | -0.0189 | +14% | -27% | Stop loss | 2m |
| $Tribe | 86 | +7.5% | +0.0092 | +11% | -7% | Chiusura manuale (app) | 1m |
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
19:16:47 ORACLE   360 raccolti, 214 analizzati, 1 BUY, 210 veto
19:16:24 ORACLE   360 raccolti, 220 analizzati, 1 BUY, 215 veto
19:16:11 ORACLE   360 raccolti, 215 analizzati, 1 BUY, 210 veto
19:15:46 ORACLE   360 raccolti, 216 analizzati, 1 BUY, 210 veto
19:15:32 ORACLE   360 raccolti, 217 analizzati, 1 BUY, 211 veto
19:15:07 ORACLE   360 raccolti, 219 analizzati, 1 BUY, 214 veto
19:14:43 ORACLE   360 raccolti, 219 analizzati, 1 BUY, 214 veto
19:14:20 ORACLE   360 raccolti, 228 analizzati, 1 BUY, 223 veto
19:13:57 ORACLE   360 raccolti, 235 analizzati, 1 BUY, 230 veto
19:13:33 ORACLE   360 raccolti, 233 analizzati, 1 BUY, 228 veto
19:13:10 ORACLE   360 raccolti, 234 analizzati, 1 BUY, 229 veto
19:12:46 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 249 veto
19:12:24 ORACLE   360 raccolti, 265 analizzati, 1 BUY, 260 veto
19:12:09 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 244 veto
19:11:40 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 244 veto
19:11:17 ORACLE   360 raccolti, 258 analizzati, 2 BUY, 253 veto
19:11:04 ORACLE   360 raccolti, 244 analizzati, 2 BUY, 239 veto
19:10:38 ORACLE   360 raccolti, 255 analizzati, 2 BUY, 251 veto
19:10:15 ORACLE   360 raccolti, 245 analizzati, 2 BUY, 241 veto
19:09:51 ORACLE   360 raccolti, 227 analizzati, 2 BUY, 223 veto
19:09:29 ORACLE   360 raccolti, 219 analizzati, 2 BUY, 215 veto
19:09:06 ORACLE   360 raccolti, 229 analizzati, 2 BUY, 225 veto
19:08:43 ORACLE   360 raccolti, 217 analizzati, 2 BUY, 213 veto
19:08:20 ORACLE   360 raccolti, 228 analizzati, 2 BUY, 224 veto
19:07:56 ORACLE   360 raccolti, 220 analizzati, 1 BUY, 216 veto
19:07:34 ORACLE   360 raccolti, 192 analizzati, 1 BUY, 188 veto
19:07:11 ORACLE   360 raccolti, 222 analizzati, 1 BUY, 218 veto
19:06:47 ORACLE   360 raccolti, 215 analizzati, 1 BUY, 211 veto
19:06:24 ORACLE   360 raccolti, 226 analizzati, 1 BUY, 222 veto
19:06:00 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 236 veto
19:05:37 ORACLE   360 raccolti, 236 analizzati, 1 BUY, 232 veto
19:05:14 ORACLE   360 raccolti, 245 analizzati, 1 BUY, 241 veto
19:05:12 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
19:04:51 ORACLE   360 raccolti, 220 analizzati, 1 BUY, 216 veto
19:04:28 ORACLE   360 raccolti, 227 analizzati, 1 BUY, 223 veto
19:04:06 ORACLE   360 raccolti, 203 analizzati, 1 BUY, 199 veto
19:03:43 ORACLE   325 raccolti, 205 analizzati, 1 BUY, 201 veto
19:03:20 ORACLE   300 raccolti, 165 analizzati, 1 BUY, 161 veto
19:02:58 ORACLE   287 raccolti, 165 analizzati, 1 BUY, 161 veto
19:02:33 ORACLE   239 raccolti, 146 analizzati, 1 BUY, 142 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

# KAISER · report paper trading

Aggiornato: 2026-11-25 20:42 UTC · in esecuzione da 3.0 giorni · 404 run

| | |
|---|---|
| Equity | **6.0730 SOL** (+1.2% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9373 SOL |
| Trade chiusi | 14 |
| Win rate | 43% |
| P&L realizzato | +0.0595 SOL (~$4.16) |
| Media vincite / perdite | +24.6% / -12.2% |
| Profit factor | 1.50 |
| Circuit breaker | no |

## Posizioni aperte
- **$Pompompurin** P-0685 · 0.121 SOL · +12.0% · resta 100% · [grafico](https://dexscreener.com/solana/F1oTWvNF5HVy3BrLo2q9djpAATid8KXSpoKSr9MuLWkM)

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
| Prendo chiusi | 14 di 50, netto medio +3.5% (intervallo -8.8% / +15.9%), in utile 42.9% |
| Scarto simulati chiusi | 8, netto medio -2.5% (intervallo -44.2% / +39.1%), in utile 25%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +6.1% (-37.4%) |
| Avvisi senza risposta | 33 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 212780 lanci noti, 38872 creatori; 54 Coin in fascia alta viste (45 creatori), 16 raddoppiate (13 creatori). Creatore trovato: tabella 764, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 39 | 14 / 6 | 13 | +5.3% |
| 1M-2M | 14 | 2 / 3 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 26 / 19.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 6 | -0.0944 |
| Chiusura manuale (app) | 7 | +0.0793 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $PPK | 86 | -14.2% | -0.0173 | +0% | -31% | Stop loss | 1m |
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
20:42:04 SCRIBE   fine run · trade 14 · win 43% · P&L 0.0595 SOL · equity 6.0730 SOL
20:42:04 ORACLE   360 raccolti, 226 analizzati, 3 BUY, 221 veto
20:41:49 ORACLE   360 raccolti, 246 analizzati, 3 BUY, 241 veto
20:41:25 ORACLE   360 raccolti, 237 analizzati, 3 BUY, 232 veto
20:41:01 ORACLE   360 raccolti, 205 analizzati, 3 BUY, 199 veto
20:40:39 ORACLE   360 raccolti, 234 analizzati, 3 BUY, 228 veto
20:40:15 ORACLE   360 raccolti, 226 analizzati, 3 BUY, 220 veto
20:39:50 ORACLE   360 raccolti, 230 analizzati, 3 BUY, 224 veto
20:39:26 ORACLE   360 raccolti, 218 analizzati, 2 BUY, 213 veto
20:39:03 ORACLE   360 raccolti, 233 analizzati, 2 BUY, 228 veto
20:38:41 ORACLE   360 raccolti, 220 analizzati, 2 BUY, 215 veto
20:38:18 ORACLE   360 raccolti, 237 analizzati, 2 BUY, 232 veto
20:37:55 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 243 veto
20:37:31 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 236 veto
20:37:09 ORACLE   360 raccolti, 241 analizzati, 2 BUY, 234 veto
20:36:46 ORACLE   360 raccolti, 249 analizzati, 1 BUY, 243 veto
20:36:22 ORACLE   360 raccolti, 247 analizzati, 1 BUY, 241 veto
20:35:59 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 235 veto
20:35:36 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 250 veto
20:35:11 ORACLE   360 raccolti, 243 analizzati, 2 BUY, 236 veto
20:34:48 ORACLE   360 raccolti, 253 analizzati, 3 BUY, 246 veto
20:34:34 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 252 veto
20:34:09 ORACLE   360 raccolti, 239 analizzati, 3 BUY, 232 veto
20:33:45 ORACLE   360 raccolti, 256 analizzati, 3 BUY, 249 veto
20:33:22 ORACLE   360 raccolti, 251 analizzati, 2 BUY, 245 veto
20:32:59 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 254 veto
20:32:35 ORACLE   360 raccolti, 235 analizzati, 2 BUY, 229 veto
20:32:12 ORACLE   360 raccolti, 246 analizzati, 2 BUY, 240 veto
20:31:49 ORACLE   360 raccolti, 218 analizzati, 3 BUY, 211 veto
20:31:35 ORACLE   360 raccolti, 241 analizzati, 3 BUY, 234 veto
20:31:10 ORACLE   360 raccolti, 238 analizzati, 2 BUY, 232 veto
20:30:46 ORACLE   360 raccolti, 218 analizzati, 2 BUY, 212 veto
20:30:33 ORACLE   360 raccolti, 231 analizzati, 2 BUY, 225 veto
20:30:09 ORACLE   360 raccolti, 233 analizzati, 2 BUY, 226 veto
20:29:42 ORACLE   360 raccolti, 245 analizzati, 2 BUY, 238 veto
20:29:18 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 240 veto
20:28:54 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 249 veto
20:28:50 QUARTER  BUY $Pompompurin 0.121 SOL score 86 impatto 0.61% (Jupiter)
20:28:29 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 236 veto
20:28:16 QUARTER  SEGNALE $Pompompurin score 86 (semi-automatico)
```

Regole attive: config.json su questo branch. Solo paper trading.

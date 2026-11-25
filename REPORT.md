# KAISER · report paper trading

Aggiornato: 2026-11-25 18:26 UTC · in esecuzione da 2.9 giorni · 402 run

| | |
|---|---|
| Equity | **6.0949 SOL** (+1.6% dal capitale iniziale di 6 SOL) |
| Cassa | 5.9799 SOL |
| Trade chiusi | 12 |
| Win rate | 50% |
| P&L realizzato | +0.1030 SOL (~$7.16) |
| Media vincite / perdite | +24.6% / -10.4% |
| Profit factor | 2.36 |
| Circuit breaker | no |

## Posizioni aperte
- **$Pompom** P-0683 · 0.122 SOL · -5.8% · resta 100% · [grafico](https://dexscreener.com/solana/7kNYdYbHbGMdQczmKSxqNzg4p4pGc6VpERzMfPBptGso)

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
| Prendo chiusi | 12 di 50, netto medio +7.1% (intervallo -6.2% / +20.4%), in utile 50% |
| Scarto simulati chiusi | 8, netto medio -2.5% (intervallo -44.2% / +39.1%), in utile 25%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +9.6% (-34.1%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 207536 lanci noti, 38037 creatori; 48 Coin in fascia alta viste (39 creatori), 14 raddoppiate (11 creatori). Creatore trovato: tabella 214, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 35 | 12 / 6 | 11 | +9.5% |
| 1M-2M | 14 | 2 / 3 | 1 | -19.6% |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 61 / 58; 11-24: 18 / 13; 11-25: 20 / 15.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 4 | -0.0509 |
| Chiusura manuale (app) | 7 | +0.0793 |
| Trailing stop | 1 | +0.0746 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
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
18:26:31 ORACLE   360 raccolti, 234 analizzati, 3 BUY, 229 veto
18:26:09 ORACLE   360 raccolti, 237 analizzati, 3 BUY, 232 veto
18:25:45 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 242 veto
18:25:23 ORACLE   360 raccolti, 235 analizzati, 2 BUY, 230 veto
18:24:59 ORACLE   360 raccolti, 222 analizzati, 2 BUY, 217 veto
18:24:36 ORACLE   360 raccolti, 236 analizzati, 2 BUY, 231 veto
18:24:12 ORACLE   360 raccolti, 215 analizzati, 2 BUY, 210 veto
18:23:49 ORACLE   360 raccolti, 230 analizzati, 2 BUY, 225 veto
18:23:25 ORACLE   360 raccolti, 219 analizzati, 2 BUY, 214 veto
18:23:03 ORACLE   360 raccolti, 215 analizzati, 2 BUY, 210 veto
18:22:39 ORACLE   360 raccolti, 221 analizzati, 2 BUY, 216 veto
18:22:16 ORACLE   360 raccolti, 223 analizzati, 2 BUY, 218 veto
18:21:53 ORACLE   360 raccolti, 242 analizzati, 2 BUY, 237 veto
18:21:29 ORACLE   360 raccolti, 232 analizzati, 2 BUY, 227 veto
18:21:05 ORACLE   360 raccolti, 246 analizzati, 2 BUY, 241 veto
18:20:42 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 248 veto
18:20:19 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 241 veto
18:19:55 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 242 veto
18:19:31 ORACLE   360 raccolti, 238 analizzati, 1 BUY, 233 veto
18:19:09 ORACLE   360 raccolti, 225 analizzati, 1 BUY, 220 veto
18:18:45 ORACLE   360 raccolti, 241 analizzati, 1 BUY, 236 veto
18:18:23 ORACLE   360 raccolti, 222 analizzati, 1 BUY, 217 veto
18:18:00 ORACLE   360 raccolti, 209 analizzati, 1 BUY, 205 veto
18:17:37 ORACLE   360 raccolti, 233 analizzati, 2 BUY, 227 veto
18:17:14 ORACLE   360 raccolti, 225 analizzati, 2 BUY, 219 veto
18:16:50 ORACLE   360 raccolti, 213 analizzati, 2 BUY, 207 veto
18:16:37 ORACLE   360 raccolti, 234 analizzati, 2 BUY, 228 veto
18:16:11 ORACLE   360 raccolti, 222 analizzati, 2 BUY, 216 veto
18:15:49 ORACLE   360 raccolti, 236 analizzati, 2 BUY, 230 veto
18:15:25 ORACLE   360 raccolti, 229 analizzati, 3 BUY, 223 veto
18:15:12 ORACLE   360 raccolti, 233 analizzati, 3 BUY, 227 veto
18:14:46 ORACLE   360 raccolti, 242 analizzati, 1 BUY, 237 veto
18:14:23 ORACLE   349 raccolti, 223 analizzati, 1 BUY, 218 veto
18:14:00 ORACLE   335 raccolti, 223 analizzati, 1 BUY, 218 veto
18:13:37 ORACLE   323 raccolti, 170 analizzati, 1 BUY, 165 veto
18:13:14 ORACLE   284 raccolti, 165 analizzati, 2 BUY, 160 veto
18:12:51 ORACLE   271 raccolti, 160 analizzati, 2 BUY, 155 veto
18:12:30 ORACLE   253 raccolti, 160 analizzati, 1 BUY, 155 veto
18:12:07 ORACLE   224 raccolti, 121 analizzati, 1 BUY, 116 veto
18:11:44 ORACLE   212 raccolti, 111 analizzati, 2 BUY, 106 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

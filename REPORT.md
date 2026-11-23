# KAISER · report paper trading

Aggiornato: 2026-11-23 17:56 UTC · in esecuzione da 0.8 giorni · 344 run

| | |
|---|---|
| Equity | **6.0322 SOL** (+0.5% dal capitale iniziale di 6 SOL) |
| Cassa | 6.0322 SOL |
| Trade chiusi | 4 |
| Win rate | 50% |
| P&L realizzato | +0.0322 SOL (~$2.38) |
| Media vincite / perdite | +25.4% / -12.0% |
| Profit factor | 2.11 |
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
| Prendo chiusi | 4 di 50, netto medio +6.7% (intervallo -16.5% / +29.9%), in utile 50% |
| Scarto simulati chiusi | 1, netto medio -35.8%, in utile 0%; ancora aperti 0 |
| Prendo meno Scarto (limite inferiore) | +42.5% |
| Avvisi senza risposta | 24 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 129041 lanci noti, 23902 creatori; 17 Coin in fascia alta viste (15 creatori), 2 raddoppiate (2 creatori). Creatore trovato: tabella 229, richiesta esterna 0, sconosciuto 0.
Richieste esterne per il creatore: nessuna ancora.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 17 | 4 / 2 | 4 | +6.7% |
| 1M-2M | 9 | 1 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 28 / 25; 11-23: 57 / 55.

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 1 | -0.0282 |
| Chiusura manuale (app) | 3 | +0.0604 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $JENSEN | 86 | +21.7% | +0.0263 | +0% | -0% | Chiusura manuale (app) | 1m |
| $HUANG | 86 | -0.8% | -0.0009 | +14% | +14% | Chiusura manuale (app) | 1m |
| $JENSEN | 83 | +29.1% | +0.0350 | +17% | -4% | Chiusura manuale (app) | 4m |
| $SIDOOR | 64 | -23.3% | -0.0282 | +4% | -20% | Stop loss | 11m |

## Ultimi eventi
```
17:56:08 ORACLE   360 raccolti, 230 analizzati, 6 BUY, 224 veto
17:56:04 SCRIBE   chiuso P-0674 $JENSEN 0.0263 SOL (21.7%)
17:56:04 CHARON   Chiusura manuale (app) $JENSEN vendo 100% a -0.3% -> 0.1474 SOL
17:56:04 KAISER   chiusura manuale dall'app: P-0674 JENSEN
17:55:44 ORACLE   360 raccolti, 233 analizzati, 6 BUY, 227 veto
17:55:21 ORACLE   360 raccolti, 228 analizzati, 6 BUY, 222 veto
17:55:17 QUARTER  BUY $JENSEN 0.120 SOL score 86 impatto 8.46% (Jupiter)
17:54:56 QUARTER  SEGNALE $JENSEN score 86 (semi-automatico)
17:54:56 ORACLE   360 raccolti, 228 analizzati, 6 BUY, 222 veto
17:54:32 ORACLE   360 raccolti, 234 analizzati, 5 BUY, 229 veto
17:54:09 ORACLE   360 raccolti, 221 analizzati, 5 BUY, 216 veto
17:53:45 ORACLE   360 raccolti, 248 analizzati, 4 BUY, 244 veto
17:53:23 ORACLE   360 raccolti, 247 analizzati, 4 BUY, 243 veto
17:53:20 SCRIBE   chiuso P-0673 $HUANG -0.0009 SOL (-0.8%)
17:53:20 CHARON   Chiusura manuale (app) $HUANG vendo 100% a 14.1% -> 0.1202 SOL
17:53:20 KAISER   chiusura manuale dall'app: P-0673 HUANG
17:53:00 ORACLE   360 raccolti, 239 analizzati, 4 BUY, 235 veto
17:52:37 ORACLE   360 raccolti, 243 analizzati, 5 BUY, 238 veto
17:52:14 ORACLE   360 raccolti, 239 analizzati, 5 BUY, 234 veto
17:52:10 QUARTER  BUY $HUANG 0.120 SOL score 86 impatto 1.10% (Jupiter)
17:51:49 QUARTER  SEGNALE $HUANG score 86 (semi-automatico)
17:51:49 ORACLE   360 raccolti, 239 analizzati, 5 BUY, 234 veto
17:51:24 ORACLE   360 raccolti, 242 analizzati, 4 BUY, 238 veto
17:51:01 ORACLE   360 raccolti, 242 analizzati, 4 BUY, 238 veto
17:50:38 ORACLE   360 raccolti, 234 analizzati, 4 BUY, 230 veto
17:50:15 ORACLE   360 raccolti, 247 analizzati, 4 BUY, 243 veto
17:49:52 ORACLE   360 raccolti, 252 analizzati, 4 BUY, 248 veto
17:49:29 ORACLE   360 raccolti, 241 analizzati, 4 BUY, 237 veto
17:49:07 ORACLE   360 raccolti, 248 analizzati, 4 BUY, 244 veto
17:48:44 ORACLE   360 raccolti, 241 analizzati, 4 BUY, 237 veto
17:48:22 ORACLE   360 raccolti, 233 analizzati, 4 BUY, 229 veto
17:48:20 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
17:48:00 ORACLE   360 raccolti, 236 analizzati, 4 BUY, 232 veto
17:47:37 ORACLE   360 raccolti, 237 analizzati, 4 BUY, 233 veto
17:47:14 ORACLE   360 raccolti, 218 analizzati, 4 BUY, 214 veto
17:46:52 ORACLE   360 raccolti, 229 analizzati, 4 BUY, 225 veto
17:46:29 ORACLE   360 raccolti, 226 analizzati, 4 BUY, 222 veto
17:46:06 ORACLE   360 raccolti, 221 analizzati, 4 BUY, 217 veto
17:45:42 ORACLE   360 raccolti, 231 analizzati, 4 BUY, 227 veto
17:45:20 ORACLE   360 raccolti, 233 analizzati, 4 BUY, 229 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

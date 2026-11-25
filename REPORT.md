# KAISER · report paper trading

Aggiornato: 2026-11-25 17:56 UTC · in esecuzione da 2.8 giorni · 401 run

| | |
|---|---|
| Equity | **6.1030 SOL** (+1.7% dal capitale iniziale di 6 SOL) |
| Cassa | 6.1030 SOL |
| Trade chiusi | 12 |
| Win rate | 50% |
| P&L realizzato | +0.1030 SOL (~$7.15) |
| Media vincite / perdite | +24.6% / -10.4% |
| Profit factor | 2.36 |
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
| Prendo chiusi | 12 di 50, netto medio +7.1% (intervallo -6.2% / +20.4%), in utile 50% |
| Scarto simulati chiusi | 7, netto medio +1.2% (intervallo -46.1% / +48.6%), in utile 28.6%; ancora aperti 1 |
| Prendo meno Scarto (limite inferiore) | +5.9% (-43.3%) |
| Avvisi senza risposta | 31 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 206412 lanci noti, 37845 creatori; 48 Coin in fascia alta viste (39 creatori), 13 raddoppiate (10 creatori). Creatore trovato: tabella 323, richiesta esterna 1, sconosciuto 0.
Richieste esterne per il creatore: pump v3: 0 riuscite, 1 fallite (ultimo errore: HTTP 404); pump v1: 0 riuscite, 1 fallite (ultimo errore: HTTP 530); jupiter: 1 riuscite, 0 fallite.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 35 | 11 / 6 | 11 | +9.5% |
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
17:56:37 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 248 veto
17:56:13 QUARTER  SEGNALE $Pompom score 58 (semi-automatico)
17:56:13 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 248 veto
17:55:48 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 251 veto
17:55:25 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 249 veto
17:55:01 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 248 veto
17:54:38 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 248 veto
17:54:14 ORACLE   360 raccolti, 264 analizzati, 2 BUY, 259 veto
17:53:50 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 258 veto
17:53:27 ORACLE   360 raccolti, 248 analizzati, 1 BUY, 244 veto
17:53:04 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 257 veto
17:52:40 ORACLE   360 raccolti, 257 analizzati, 1 BUY, 253 veto
17:52:37 SCRIBE   chiuso P-0681 $LENDR 0.0163 SOL (13.3%)
17:52:37 CHARON   Chiusura manuale (app) $LENDR vendo 100% a 14.0% -> 0.1391 SOL
17:52:37 KAISER   chiusura manuale dall'app: P-0681 LENDR
17:52:16 ORACLE   360 raccolti, 248 analizzati, 1 BUY, 244 veto
17:52:13 SCOUT    gecko top: HTTP 429 (riuso l'ultimo elenco)
17:51:52 ORACLE   360 raccolti, 248 analizzati, 1 BUY, 244 veto
17:51:27 ORACLE   360 raccolti, 263 analizzati, 2 BUY, 258 veto
17:51:03 ORACLE   360 raccolti, 225 analizzati, 2 BUY, 220 veto
17:50:40 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 243 veto
17:50:16 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 243 veto
17:49:53 ORACLE   360 raccolti, 239 analizzati, 2 BUY, 234 veto
17:49:28 ORACLE   360 raccolti, 268 analizzati, 2 BUY, 263 veto
17:49:05 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 248 veto
17:48:41 SCRIBE   chiuso P-0682 $MIM -0.0024 SOL (-2.0%)
17:48:41 CHARON   Stop loss $MIM vendo 100% a -36.2% -> 0.1202 SOL
17:48:41 ORACLE   360 raccolti, 226 analizzati, 1 BUY, 222 veto
17:48:18 ORACLE   360 raccolti, 246 analizzati, 1 BUY, 242 veto
17:47:54 ORACLE   360 raccolti, 263 analizzati, 2 BUY, 258 veto
17:47:50 QUARTER  BUY $MIM 0.122 SOL score 86 impatto 0.00% (Jupiter)
17:47:29 QUARTER  SEGNALE $MIM score 86 (semi-automatico)
17:47:29 ORACLE   360 raccolti, 251 analizzati, 2 BUY, 246 veto
17:47:05 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 250 veto
17:47:02 QUARTER  BUY $LENDR 0.122 SOL score 58 impatto 3.23% (Jupiter)
17:46:41 ORACLE   360 raccolti, 234 analizzati, 1 BUY, 230 veto
17:46:17 QUARTER  SEGNALE $LENDR score 58 (semi-automatico)
17:46:17 ORACLE   360 raccolti, 239 analizzati, 1 BUY, 235 veto
17:45:52 ORACLE   360 raccolti, 250 analizzati, 1 BUY, 247 veto
17:45:28 ORACLE   360 raccolti, 240 analizzati, 1 BUY, 237 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

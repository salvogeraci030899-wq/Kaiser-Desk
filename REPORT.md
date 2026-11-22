# KAISER · report paper trading

Aggiornato: 2026-11-22 22:00 UTC · in esecuzione da 0.0 giorni · 319 run

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

## Uomo e macchina: le Coin che prendi contro quelle del bot
Il radar sceglie e tu decidi (Prendo o Scarto) senza vedere il punteggio del bot. Con Prendo il paper apre subito la posizione con i parametri impostati e la chiude da solo: il rendimento e' netto di impatto, commissioni e priority fee.
Regola decisa in anticipo: almeno 50 trade tuoi chiusi, netto medio >= +3% con limite inferiore del 95% sopra zero.

| | |
|---|---|
| Esito | **in corso** |
| Trade tuoi chiusi / trade del bot chiusi | 0 / 0 |
| Netto medio dei tuoi trade | n/d |
| Netto medio dei trade del bot | n/d% |
| Differenza tuoi meno bot (limite inferiore) | n/d |
| Scartati: variazione a 5 minuti dalla decisione, meno 5% di costo (solo descrittivo) | 0 segnali, n/d% |
| Segnali senza risposta / decisi dopo 5 minuti | 0 / 0 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 96496 lanci noti, 19136 creatori; 3 Coin in fascia alta viste (3 creatori), 0 raddoppiate (0 creatori). Creatore trovato: tabella 85, richiesta esterna 0, sconosciuto 574.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 2 | 0 / 0 | 0 | n/d |
| 1M-2M | 1 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Controllo equo: gli Scarto si simulano come se fossero stati presi, con le stesse uscite e costi stimati dalla liquidita'. Scartati simulati chiusi: 0; ancora aperti: 0. Tuoi Prendo meno Scarto simulati: n/d. Solo descrittivo: non entra nella regola di superamento.
Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 15 / 12.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
22:00:46 ORACLE   360 raccolti, 252 analizzati, 3 BUY, 237 veto
22:00:42 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:00:22 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 245 veto
22:00:18 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
21:59:58 ORACLE   360 raccolti, 273 analizzati, 3 BUY, 259 veto
21:59:55 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
21:59:35 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 245 veto
21:59:31 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
21:59:11 ORACLE   360 raccolti, 262 analizzati, 3 BUY, 248 veto
21:59:07 KAISER   parametri dall'app: minLiq 40000→50000, minAgeMin 0→1, maxMcap 50000000→2000000, maxAgeH 720→72, minTxH1 15→50, minDipPct 20→0
21:58:47 ORACLE   360 raccolti, 250 analizzati, 3 BUY, 236 veto
21:58:43 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:58:23 ORACLE   360 raccolti, 242 analizzati, 3 BUY, 228 veto
21:58:19 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:58:09 ORACLE   360 raccolti, 251 analizzati, 3 BUY, 236 veto
21:58:03 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:57:43 ORACLE   360 raccolti, 254 analizzati, 2 BUY, 240 veto
21:57:39 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:57:19 ORACLE   360 raccolti, 250 analizzati, 2 BUY, 237 veto
21:57:15 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:56:55 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 244 veto
21:56:51 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:56:31 ORACLE   360 raccolti, 257 analizzati, 3 BUY, 244 veto
21:56:28 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:56:07 QUARTER  SEGNALE $Rings score 57 (semi-automatico)
21:56:07 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 235 veto
21:56:03 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:55:52 QUARTER  SEGNALE $WASTED score 56 (semi-automatico)
21:55:52 ORACLE   360 raccolti, 246 analizzati, 2 BUY, 233 veto
21:55:44 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:55:24 ORACLE   360 raccolti, 240 analizzati, 3 BUY, 226 veto
21:55:20 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:55:00 ORACLE   360 raccolti, 249 analizzati, 3 BUY, 235 veto
21:54:57 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:54:36 ORACLE   360 raccolti, 248 analizzati, 2 BUY, 233 veto
21:54:33 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:54:13 ORACLE   360 raccolti, 249 analizzati, 2 BUY, 234 veto
21:54:09 KAISER   parametri dall'app: minLiq 40000→7500, minMcap 500000→3000, maxMcap 50000000→100000, maxAgeH 720→1
21:53:48 QUARTER  SEGNALE $FLOAT score 55 (semi-automatico)
21:53:48 ORACLE   360 raccolti, 233 analizzati, 2 BUY, 219 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

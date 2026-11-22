# KAISER · report paper trading

Aggiornato: 2026-11-22 22:10 UTC · in esecuzione da 0.0 giorni · 319 run

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
| Segnali senza risposta / decisi dopo 5 minuti | 7 / 0 |

## Coin di fascia alta e ricerca sui creatori
Il Radar guarda le Coin da 500000 dollari di market cap in su. Per ognuna si risale al creatore e si registra la market cap: una Coin e' «raddoppiata» se supera il doppio della prima lettura in fascia. Il profilo del creatore compare nell'avviso.
Memoria: 96820 lanci noti, 19173 creatori; 4 Coin in fascia alta viste (4 creatori), 0 raddoppiate (0 creatori). Creatore trovato: tabella 158, richiesta esterna 0, sconosciuto 825.

| Fascia | Avvisi | Prendo / Scarto | Tuoi trade chiusi | Netto medio |
|---|---|---|---|---|
| 500K-1M | 2 | 0 / 0 | 0 | n/d |
| 1M-2M | 1 | 0 / 0 | 0 | n/d |
| 2M+ | 5 | 0 / 0 | 0 | n/d |

Controllo equo: gli Scarto si simulano come se fossero stati presi, con le stesse uscite e costi stimati dalla liquidita'. Scartati simulati chiusi: 0; ancora aperti: 0. Tuoi Prendo meno Scarto simulati: n/d. Solo descrittivo: non entra nella regola di superamento.
Coin di fascia alta viste (diverse) e con punteggio sufficiente per l'avviso, per giorno: 11-22: 17 / 15.

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
22:10:56 ORACLE   360 raccolti, 289 analizzati, 3 BUY, 272 veto
22:10:52 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:10:31 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 264 veto
22:10:28 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:10:18 ORACLE   360 raccolti, 281 analizzati, 3 BUY, 264 veto
22:10:09 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:09:48 ORACLE   360 raccolti, 288 analizzati, 3 BUY, 273 veto
22:09:45 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:09:25 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 259 veto
22:09:21 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:09:00 ORACLE   360 raccolti, 280 analizzati, 4 BUY, 264 veto
22:08:56 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:08:36 ORACLE   360 raccolti, 289 analizzati, 4 BUY, 274 veto
22:08:32 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:08:12 ORACLE   360 raccolti, 286 analizzati, 4 BUY, 270 veto
22:08:09 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:07:49 ORACLE   360 raccolti, 275 analizzati, 3 BUY, 260 veto
22:07:45 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:07:25 ORACLE   360 raccolti, 282 analizzati, 3 BUY, 267 veto
22:07:22 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:07:12 ORACLE   360 raccolti, 274 analizzati, 3 BUY, 259 veto
22:07:06 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:06:45 ORACLE   360 raccolti, 276 analizzati, 3 BUY, 261 veto
22:06:43 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:06:33 ORACLE   360 raccolti, 272 analizzati, 3 BUY, 257 veto
22:06:26 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:06:06 ORACLE   360 raccolti, 286 analizzati, 3 BUY, 271 veto
22:06:03 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:05:53 ORACLE   360 raccolti, 277 analizzati, 3 BUY, 261 veto
22:05:43 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:05:23 ORACLE   360 raccolti, 263 analizzati, 3 BUY, 247 veto
22:05:20 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:05:00 ORACLE   360 raccolti, 278 analizzati, 3 BUY, 262 veto
22:04:56 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:04:36 ORACLE   360 raccolti, 259 analizzati, 3 BUY, 243 veto
22:04:33 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:04:13 ORACLE   360 raccolti, 255 analizzati, 3 BUY, 239 veto
22:04:09 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
22:03:48 ORACLE   360 raccolti, 268 analizzati, 3 BUY, 251 veto
22:03:44 KAISER   parametri dall'app: maxMcap 50000000→2000000, maxAgeH 720→72
```

Regole attive: config.json su questo branch. Solo paper trading.

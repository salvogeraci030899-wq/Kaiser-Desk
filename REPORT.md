# KAISER · report paper trading

Aggiornato: 2026-11-22 21:16 UTC · in esecuzione da 0.0 giorni · 318 run

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
| Esito | **in corso** (3 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -16.0% (intervallo -39.9% / +7.9%), mediana -4.0%, in utile 0%, senza rotta 0 su 3 |
| Netto a 60 s | -28.0% (intervallo -98.1% / +42.2%), mediana -2.5%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 300 s (primario) | -33.6% (intervallo -101.1% / +33.9%), mediana -23.1%, in utile 33.3%, senza rotta 0 su 3 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 0.89% / 6.3 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 3 / 3 / 0 / 0 / 0 |

## Uomo e macchina: i segnali che prendi contro quelli che scarti
Il radar sceglie, tu decidi (Prendo o Scarto) senza vedere il punteggio del bot. Rendimento a 5 minuti dalla tua decisione, meno 5% di costo a giro (stima mediana, non una misura per ogni token).
Regola decisa in anticipo: almeno 50 presi e 30 scartati, netto medio dei presi >= +3% con limite inferiore sopra zero e sopra gli scartati.

| | |
|---|---|
| Esito | **in corso** |
| Presi / scartati (con misura a 5 minuti) | 0 / 0 |
| Netto medio dei presi | n/d |
| Netto medio degli scartati | n/d% |
| Differenza presi meno scartati (limite inferiore) | n/d |
| Senza risposta / decisi dopo 5 minuti | 0 / 0 |

## Uscite per motivo
_ancora nessuna_

## Ultimi 25 trade
_ancora nessuno_

## Ultimi eventi
```
21:16:11 QUARTER  $obema impatto 3.1% oltre slippage: annullato
21:16:11 QUARTER  SEGNALE $obema score 79 (semi-automatico)
21:16:11 ORACLE   360 raccolti, 268 analizzati, 1 BUY, 262 veto
21:16:07 KAISER   reset del paper (C-0113): conto azzerato, capitale 6 SOL
21:15:47 ORACLE   360 raccolti, 279 analizzati, 1 BUY, 274 veto
21:15:23 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 269 veto
21:15:01 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 257 veto
21:14:37 ORACLE   360 raccolti, 279 analizzati, 1 BUY, 275 veto
21:14:24 ORACLE   360 raccolti, 286 analizzati, 1 BUY, 282 veto
21:13:59 QUARTER  BUY $obema 0.077 SOL score 73 impatto 0.77% (Jupiter)
21:13:59 QUARTER  SEGNALE $obema score 73 (semi-automatico)
21:13:59 ORACLE   360 raccolti, 269 analizzati, 2 BUY, 264 veto
21:13:35 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 282 veto
21:13:13 ORACLE   360 raccolti, 281 analizzati, 1 BUY, 278 veto
21:12:50 ORACLE   360 raccolti, 276 analizzati, 1 BUY, 273 veto
21:12:28 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 281 veto
21:12:04 ORACLE   360 raccolti, 271 analizzati, 1 BUY, 267 veto
21:11:42 ORACLE   360 raccolti, 275 analizzati, 1 BUY, 271 veto
21:11:19 ORACLE   360 raccolti, 274 analizzati, 1 BUY, 271 veto
21:10:55 ORACLE   360 raccolti, 282 analizzati, 1 BUY, 279 veto
21:10:32 ORACLE   360 raccolti, 277 analizzati, 1 BUY, 272 veto
21:10:09 ORACLE   360 raccolti, 278 analizzati, 1 BUY, 272 veto
21:09:46 ORACLE   360 raccolti, 285 analizzati, 1 BUY, 277 veto
21:09:33 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 255 veto
21:09:08 ORACLE   337 raccolti, 251 analizzati, 1 BUY, 243 veto
21:08:44 ORACLE   319 raccolti, 238 analizzati, 1 BUY, 229 veto
21:08:20 ORACLE   311 raccolti, 228 analizzati, 1 BUY, 219 veto
21:08:07 SCOUT    PumpPortal invia nuovi token (30) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
21:07:57 SCRIBE   chiuso P-0664 $Incidents -0.0077 SOL (-9.8%)
21:07:57 CHARON   Time stop $Incidents vendo 100% a 4.5% -> 0.0707 SOL
21:07:57 ORACLE   285 raccolti, 216 analizzati, 1 BUY, 207 veto
21:07:32 ORACLE   273 raccolti, 184 analizzati, 1 BUY, 176 veto
21:07:10 ORACLE   266 raccolti, 184 analizzati, 1 BUY, 176 veto
21:06:46 ORACLE   222 raccolti, 160 analizzati, 1 BUY, 154 veto
21:06:26 SCOUT    rug: 11635 token oltre 7.5K, 35.5% rug, 11337 con possessori
combinazioni: 7200 prove, migliore -5.08%, p 1
fabbrica: 32549 percorsi, 768 configurazioni, 0 passano, 4050 ms
21:06:23 ORACLE   199 raccolti, 118 analizzati, 1 BUY, 113 veto
21:06:00 ORACLE   196 raccolti, 118 analizzati, 1 BUY, 113 veto
21:05:59 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
21:05:58 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
21:05:57 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
```

Regole attive: config.json su questo branch. Solo paper trading.

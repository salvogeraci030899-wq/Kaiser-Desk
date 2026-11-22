# KAISER · report paper trading

Aggiornato: 2026-11-22 18:40 UTC · in esecuzione da 3.2 giorni · 315 run

| | |
|---|---|
| Equity | **3.9108 SOL** (-34.8% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8159 SOL |
| Trade chiusi | 218 |
| Win rate | 31% |
| P&L realizzato | -2.1052 SOL (~$-147.89) |
| Media vincite / perdite | +38.9% / -31.6% |
| Profit factor | 0.56 |
| Circuit breaker | no |

## Posizioni aperte
- **$Leap** P-0655 · 0.078 SOL · +21.9% · resta 100% · [grafico](https://dexscreener.com/solana/8xipj7V6HFb1TYXrJvkKaehJTbAWTWjGzTZTRyZTbLBu)

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
| Esito | **in corso** (2 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | -21.9% (intervallo -58.0% / +14.1%), mediana -21.9%, in utile 0%, senza rotta 0 su 2 |
| Netto a 60 s | -40.7% (intervallo -154.3% / +72.8%), mediana -40.7%, in utile 50%, senza rotta 0 su 2 |
| Netto a 300 s (primario) | -38.8% (intervallo -154.4% / +76.7%), mediana -38.8%, in utile 50%, senza rotta 0 su 2 |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | 14.88% / 6.3 s |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 2 / 2 / 0 / 0 / 0 |

## Uomo e macchina: i segnali che prendi contro quelli che scarti
Il radar sceglie, tu decidi (Prendo o Scarto) senza vedere il punteggio del bot. Rendimento a 5 minuti dalla tua decisione, meno 5% di costo a giro (stima mediana, non una misura per ogni token).
Regola decisa in anticipo: almeno 50 presi e 30 scartati, netto medio dei presi >= +3% con limite inferiore sopra zero e sopra gli scartati.

| | |
|---|---|
| Esito | **in corso** |
| Presi / scartati (con misura a 5 minuti) | 2 / 1 |
| Netto medio dei presi | +69.5% (intervallo -86.7% / +225.6%) |
| Netto medio degli scartati | n/d% |
| Differenza presi meno scartati (limite inferiore) | n/d |
| Senza risposta / decisi dopo 5 minuti | 24 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 58 | -1.7068 |
| Time stop | 83 | -0.9898 |
| TP1 | 50 | +2.1184 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $UNISON | 65 | -25.9% | -0.0205 | +11% | +1% | Time stop | 5m |
| $IF | 64 | -40.2% | -0.0321 | +7% | -5% | Time stop | 5m |
| $BTC | 77 | +40.5% | +0.0321 | +62% | +62% | TP1 | 3m |
| $OpenIndex | 64 | -6.3% | -0.0050 | +54% | +4% | Time stop | 7m |
| $SANTIA | 69 | -5.4% | -0.0043 | +7% | -14% | Time stop | 5m |
| $BTC | 64 | -41.7% | -0.0334 | +0% | -34% | Stop loss | 3m |
| $FOAM | 71 | -6.9% | -0.0056 | +62% | +62% | TP1 | 1m |
| $OMGAI | 75 | +11.9% | +0.0095 | +4% | +4% | Time stop | 5m |
| $poorcat | 63 | +12.4% | +0.0099 | +42% | -8% | Time stop | 8m |
| $GIF | 64 | -11.2% | -0.0090 | +18% | -1% | Time stop | 6m |
| $FRANK | 70 | +8.7% | +0.0069 | +10% | -12% | Time stop | 5m |
| $MengLan | 65 | +80.7% | +0.0635 | +108% | +108% | TP1 | 3m |
| $Plurality | 64 | -38.8% | -0.0308 | +0% | -33% | Stop loss | 5m |
| $KYC | 65 | +60.3% | +0.0472 | +61% | +61% | TP1 | 3m |
| $XMASS | 74 | -21.8% | -0.0172 | +0% | -8% | Time stop | 5m |
| $MOG | 66 | -15.7% | -0.0124 | +15% | +2% | Time stop | 5m |
| $SI | 70 | -11.4% | -0.0090 | +24% | +3% | Time stop | 5m |
| $MCAT | 68 | +25.4% | +0.0200 | +96% | +96% | TP1 | 1m |
| $airball | 64 | -46.1% | -0.0366 | +0% | -36% | Stop loss | 2m |
| $testicles | 63 | +32.4% | +0.0255 | +68% | +68% | TP1 | 1m |
| $HIPPO | 76 | -27.9% | -0.0221 | +11% | -31% | Stop loss | 4m |
| $MooSom | 76 | -28.5% | -0.0228 | +24% | -19% | Time stop | 6m |
| $RDIFF | 66 | -11.0% | -0.0088 | +0% | -5% | Time stop | 5m |
| $cateball | 63 | +0.5% | +0.0004 | +1% | -1% | Time stop | 5m |
| $SINGU | 73 | +2.2% | +0.0017 | +10% | -6% | Time stop | 5m |

## Ultimi eventi
```
18:40:08 ORACLE   360 raccolti, 228 analizzati, 2 BUY, 221 veto
18:39:43 ORACLE   360 raccolti, 222 analizzati, 2 BUY, 215 veto
18:39:19 ORACLE   355 raccolti, 223 analizzati, 2 BUY, 216 veto
18:38:55 ORACLE   341 raccolti, 213 analizzati, 2 BUY, 207 veto
18:38:32 QUARTER  BUY $Leap 0.078 SOL score 67 impatto 0.10% (Jupiter)
18:38:32 QUARTER  SEGNALE $Leap score 67 (semi-automatico)
18:38:32 ORACLE   337 raccolti, 211 analizzati, 2 BUY, 205 veto
18:38:07 SCOUT    PumpPortal invia nuovi token (20) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
18:38:07 ORACLE   313 raccolti, 191 analizzati, 1 BUY, 187 veto
18:37:45 ORACLE   303 raccolti, 187 analizzati, 1 BUY, 183 veto
18:37:23 ORACLE   296 raccolti, 184 analizzati, 1 BUY, 180 veto
18:37:00 ORACLE   269 raccolti, 165 analizzati, 1 BUY, 160 veto
18:36:38 ORACLE   258 raccolti, 156 analizzati, 1 BUY, 150 veto
18:36:15 ORACLE   257 raccolti, 151 analizzati, 1 BUY, 147 veto
18:36:12 SCOUT    gecko nuovi: HTTP 429 (riuso l'ultimo elenco)
18:36:09 SCOUT    rug: 11640 token oltre 7.5K, 35.6% rug, 11048 con possessori
combinazioni: 7392 prove, migliore -3.88%, p 1
fabbrica: 32591 percorsi, 768 configurazioni, 0 passano, 5846 ms
18:35:52 ORACLE   227 raccolti, 145 analizzati, 1 BUY, 142 veto
18:35:29 ORACLE   218 raccolti, 131 analizzati, 2 BUY, 128 veto
18:35:08 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
18:35:08 ORACLE   214 raccolti, 131 analizzati, 2 BUY, 128 veto
18:35:05 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
18:35:04 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
18:35:04 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
18:35:04 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
18:35:03 SCOUT    Laboratorio: collegato a PumpPortal
18:35:03 KAISER   run #315 · 0 posizioni · equity 3.8948 SOL · GMGN spenta (nessuna chiave) · Grok off
18:34:49 SCRIBE   fine run · trade 218 · win 31% · P&L -2.1052 SOL · equity 3.8948 SOL
18:34:49 ORACLE   360 raccolti, 244 analizzati, 3 BUY, 239 veto
18:34:25 ORACLE   360 raccolti, 247 analizzati, 2 BUY, 242 veto
18:34:02 ORACLE   360 raccolti, 246 analizzati, 2 BUY, 241 veto
18:33:39 ORACLE   360 raccolti, 262 analizzati, 2 BUY, 256 veto
18:33:15 ORACLE   360 raccolti, 259 analizzati, 2 BUY, 252 veto
18:32:51 ORACLE   360 raccolti, 253 analizzati, 2 BUY, 248 veto
18:32:28 ORACLE   360 raccolti, 260 analizzati, 2 BUY, 254 veto
18:32:05 ORACLE   360 raccolti, 257 analizzati, 2 BUY, 249 veto
18:31:41 ORACLE   360 raccolti, 256 analizzati, 2 BUY, 248 veto
18:31:17 ORACLE   360 raccolti, 261 analizzati, 1 BUY, 252 veto
18:30:52 ORACLE   360 raccolti, 263 analizzati, 1 BUY, 254 veto
18:30:28 ORACLE   360 raccolti, 259 analizzati, 1 BUY, 250 veto
18:30:05 ORACLE   360 raccolti, 262 analizzati, 1 BUY, 252 veto
```

Regole attive: config.json su questo branch. Solo paper trading.

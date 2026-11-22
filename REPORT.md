# KAISER · report paper trading

Aggiornato: 2026-11-22 12:03 UTC · in esecuzione da 2.9 giorni · 307 run

| | |
|---|---|
| Equity | **3.8850 SOL** (-35.3% dal capitale iniziale di 6 SOL) |
| Cassa | 3.8850 SOL |
| Trade chiusi | 200 |
| Win rate | 31% |
| P&L realizzato | -2.1150 SOL (~$-149.25) |
| Media vincite / perdite | +39.4% / -32.5% |
| Profit factor | 0.54 |
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
Si compra 0.1 SOL quando la curva si completa e si quota la vendita ogni 30 s per 15 minuti. Serie 1 dal 2026-11-22 11:53 UTC.
Regola decisa in anticipo: orizzonte 300 s (gli altri sono solo descrittivi), almeno 300 token, netto medio >= +3% e limite inferiore al 95% sopra zero.

| | |
|---|---|
| Esito | **in corso** (0 di 300 token) |
| Costo del giro (vendita subito dopo l'acquisto) | n/d (0) |
| Netto a 60 s | n/d (0) |
| Netto a 300 s (primario) | n/d (0) |
| Netto a 900 s | n/d (0) |
| Impatto di prezzo in acquisto (mediana) / ritardo del lettore (mediana) | n/d / n/d |
| Curve completate viste / acquistate / senza rotta / coda piena / interrotte | 0 / 0 / 0 / 0 / 0 |

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
| Senza risposta / decisi dopo 5 minuti | 2 / 0 |

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Stop loss | 56 | -1.6426 |
| Time stop | 72 | -0.9066 |
| TP1 | 45 | +1.9612 |
| RUG-EXIT liquidità | 27 | -1.5271 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $airball | 64 | -46.1% | -0.0366 | +0% | -36% | Stop loss | 2m |
| $testicles | 63 | +32.4% | +0.0255 | +68% | +68% | TP1 | 1m |
| $HIPPO | 76 | -27.9% | -0.0221 | +11% | -31% | Stop loss | 4m |
| $MooSom | 76 | -28.5% | -0.0228 | +24% | -19% | Time stop | 6m |
| $RDIFF | 66 | -11.0% | -0.0088 | +0% | -5% | Time stop | 5m |
| $cateball | 63 | +0.5% | +0.0004 | +1% | -1% | Time stop | 5m |
| $SINGU | 73 | +2.2% | +0.0017 | +10% | -6% | Time stop | 5m |
| $GIFTER | 70 | -50.7% | -0.0410 | +0% | -61% | RUG-EXIT liquidità | 2m |
| $eˣ | 74 | +14.2% | +0.0114 | +68% | +68% | TP1 | 6m |
| $casual | 63 | +52.2% | +0.0416 | +61% | +61% | TP1 | 8m |
| $TC | 65 | -8.5% | -0.0068 | +15% | +5% | Time stop | 6m |
| $FIREBALL | 68 | -54.2% | -0.0438 | +0% | -34% | Stop loss | 4m |
| $AMAZON | 69 | -58.8% | -0.0481 | +53% | -34% | Stop loss | 10m |
| $CI | 72 | -36.2% | -0.0298 | +8% | -31% | Stop loss | 3m |
| $SANTA | 74 | +92.2% | +0.0745 | +61% | +61% | TP1 | 5m |
| $CORONA | 72 | +24.8% | +0.0199 | +72% | +72% | TP1 | 3m |
| $Biao | 63 | -31.7% | -0.0257 | +3% | -24% | Time stop | 5m |
| $snowball | 64 | -11.7% | -0.0095 | +64% | +64% | TP1 | 1m |
| $RARE | 63 | -50.7% | -0.0415 | +0% | -56% | RUG-EXIT liquidità | 1m |
| $Snowball | 64 | +22.1% | +0.0180 | +70% | +70% | TP1 | 5m |
| $LEONIDA | 72 | -25.1% | -0.0206 | +5% | -31% | Stop loss | 3m |
| $Tiger | 74 | -20.0% | -0.0164 | +60% | +60% | TP1 | 1m |
| $FRIEND | 69 | -8.4% | -0.0069 | +15% | +5% | Time stop | 5m |
| $MASCOIN | 65 | +6.3% | +0.0052 | +0% | -41% | Stop loss | 3m |
| $SANTA | 70 | -82.2% | -0.0689 | +17% | -74% | RUG-EXIT liquidità | 4m |

## Ultimi eventi
```
12:03:05 SCRIBE   chiuso P-0636 $airball -0.0366 SOL (-46.1%)
12:03:05 CHARON   Stop loss $airball vendo 100% a -36.3% -> 0.0428 SOL
12:03:05 ORACLE   360 raccolti, 241 analizzati, 1 BUY, 232 veto
12:02:42 ORACLE   360 raccolti, 246 analizzati, 1 BUY, 238 veto
12:02:19 ORACLE   360 raccolti, 242 analizzati, 1 BUY, 234 veto
12:01:55 ORACLE   360 raccolti, 241 analizzati, 1 BUY, 233 veto
12:01:32 ORACLE   360 raccolti, 250 analizzati, 1 BUY, 241 veto
12:01:08 ORACLE   360 raccolti, 247 analizzati, 1 BUY, 236 veto
12:00:45 QUARTER  BUY $airball 0.078 SOL score 64 impatto 1.21% (Jupiter)
12:00:44 QUARTER  SEGNALE $airball score 64 (semi-automatico)
12:00:44 ORACLE   360 raccolti, 245 analizzati, 2 BUY, 230 veto
12:00:21 ORACLE   360 raccolti, 255 analizzati, 1 BUY, 237 veto
11:59:58 ORACLE   360 raccolti, 254 analizzati, 1 BUY, 235 veto
11:59:35 ORACLE   349 raccolti, 247 analizzati, 1 BUY, 231 veto
11:59:12 ORACLE   340 raccolti, 244 analizzati, 1 BUY, 228 veto
11:58:59 SCOUT    PumpPortal invia nuovi token (21) ma nessuno scambio: i punteggi bot non sono disponibili, restano i prezzi dalla catena
11:58:49 ORACLE   324 raccolti, 238 analizzati, 1 BUY, 222 veto
11:58:26 ORACLE   307 raccolti, 230 analizzati, 0 BUY, 214 veto
11:58:02 ORACLE   301 raccolti, 218 analizzati, 0 BUY, 203 veto
11:57:40 ORACLE   298 raccolti, 217 analizzati, 0 BUY, 202 veto
11:57:16 ORACLE   286 raccolti, 211 analizzati, 0 BUY, 198 veto
11:56:53 ORACLE   276 raccolti, 199 analizzati, 0 BUY, 185 veto
11:56:29 ORACLE   273 raccolti, 196 analizzati, 0 BUY, 183 veto
11:56:06 ORACLE   254 raccolti, 184 analizzati, 0 BUY, 173 veto
11:55:44 ORACLE   248 raccolti, 178 analizzati, 0 BUY, 165 veto
11:55:21 ORACLE   245 raccolti, 176 analizzati, 0 BUY, 164 veto
11:54:58 ORACLE   237 raccolti, 172 analizzati, 0 BUY, 162 veto
11:54:35 ORACLE   230 raccolti, 160 analizzati, 0 BUY, 151 veto
11:54:13 ORACLE   227 raccolti, 158 analizzati, 0 BUY, 149 veto
11:53:50 ORACLE   201 raccolti, 144 analizzati, 0 BUY, 136 veto
11:53:45 SCOUT    rug: 11749 token oltre 7.5K, 35.6% rug, 10289 con possessori
combinazioni: 5664 prove, migliore -3.98%, p 0.744
fabbrica: 32634 percorsi, 768 configurazioni, 0 passano, 5779 ms
11:53:27 ORACLE   195 raccolti, 131 analizzati, 0 BUY, 125 veto
11:53:16 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
11:53:11 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: 'subscribeTokenTrade' and 'subscribeAccountTrade' methods are only available when connecting with an
11:53:05 ORACLE   195 raccolti, 131 analizzati, 0 BUY, 125 veto
11:53:01 SCOUT    token giovani: collegato a RPC mainnet.helius-rpc.com
11:53:01 KAISER   parametri dall'app: scanSec 30→15, minScore 68→63, sizePct 5→2, maxPos 3→1, slippageBps 300→200, prioritySOL 0.0005→0.001, cooldownMin 10→5, sl 25→30, tp1 40→60, tp1Sell 50→100, timeStopMin 45→5, minLiq 15000→7500, minMcap 15000→3000, minAgeMin 5→0, srcGmgnTrenches false→true, rugLiqDrop 45→30, realApprove true→false, maxMcap 20000000→100000, gmgnInterval 1h→1m, maxAgeH 72→1, minTxH1 40→15, minDipPct 0→20, entryGapSec 60→120, semiAuto spento→avvisi e paper
11:53:01 SCOUT    messaggio PumpPortal non riconosciuto, chiavi: message · testo: Successfully subscribed to token creation events.
11:53:01 SCOUT    Laboratorio: collegato a PumpPortal
11:53:01 KAISER   run #307 · 0 posizioni · equity 3.9216 SOL · GMGN spenta (nessuna chiave) · Grok off
```

Regole attive: config.json su questo branch. Solo paper trading.

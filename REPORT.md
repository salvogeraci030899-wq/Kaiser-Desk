# KAISER · report paper trading

Aggiornato: 2026-11-14 05:23 UTC · in esecuzione da 0.0 giorni · 31 run

| | |
|---|---|
| Equity | **1.4204 SOL** (+9.3% dal capitale iniziale di 1.3 SOL) |
| Cassa | 1.1469 SOL |
| Trade chiusi | 6 |
| Win rate | 33% |
| P&L realizzato | +0.1350 SOL (~$10.20) |
| Media vincite / perdite | +72.6% / -10.9% |
| Profit factor | 3.35 |
| Circuit breaker | no |

## Posizioni aperte
- **$setulushati** P-0022 · 0.143 SOL · -4.3% · resta 100% · [grafico](https://dexscreener.com/solana/H7RKrbrwp83fEavYf9STprYZS29wokkSerAPDpjj7QHv)
- **$HARAMBE** P-0023 · 0.143 SOL · -4.8% · resta 100% · [grafico](https://dexscreener.com/solana/EA7HbV3UsEqicPYcKZEs5YhRfrxsjiLiLz8RXUtcjwoy)

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Time stop | 4 | -0.0574 |
| Trailing stop | 1 | +0.0985 |
| Stop loss | 1 | +0.0939 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $WISHMAS | 72 | -5.8% | -0.0079 | +7% | -0% | Time stop | 16m |
| $BREASTCOIN | 77 | +69.1% | +0.0939 | +0% | -49% | Stop loss | 1m |
| $UP | 72 | +76.1% | +0.0985 | +77% | +37% | Trailing stop | 17m |
| $DEFAULT | 76 | -5.4% | -0.0070 | +1% | -3% | Time stop | 15m |
| $AMC | 77 | -10.4% | -0.0136 | +0% | -14% | Time stop | 15m |
| $JENSEN | 83 | -22.2% | -0.0290 | +10% | -17% | Time stop | 15m |

## Ultimi eventi
```
05:23:49 SCRIBE   fine run · trade 6 · win 33% · P&L 0.1350 SOL · equity 1.4204 SOL
05:23:37 ORACLE   90 raccolti, 65 analizzati, 3 BUY, 34 veto
05:23:36 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:24:05 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:22:34 QUARTER  BUY $HARAMBE 0.143 SOL score 73 impatto 0.00% (Jupiter)
05:22:34 ORACLE   90 raccolti, 65 analizzati, 4 BUY, 34 veto
05:22:32 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:23:02 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:21:31 KAISER   limite 1 ingresso/i per scan: $WISHMAS rimandato
05:21:31 QUARTER  BUY $setulushati 0.143 SOL score 77 impatto 0.76% (Jupiter)
05:21:31 ORACLE   90 raccolti, 64 analizzati, 4 BUY, 33 veto
05:21:28 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:21:58 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:20:57 SCRIBE   chiuso P-0020 $WISHMAS -0.0079 SOL (-5.8%)
05:20:57 CHARON   Time stop $WISHMAS vendo 100% a -0.4% -> 0.1291 SOL
05:20:27 ORACLE   90 raccolti, 62 analizzati, 2 BUY, 37 veto
05:20:25 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:20:54 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:19:24 ORACLE   90 raccolti, 62 analizzati, 2 BUY, 38 veto
05:19:20 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:19:50 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:19:20 KAISER   parametri dall'app: scanSec 30→15, minScore 68→72, sizePct 5→10, maxPos 3→5, slippageBps 300→200, prioritySOL 0.0005→0.0007, cooldownMin 10→0, sl 25→30, tp1 40→35, tp1Sell 50→75, timeStopMin 45→15, timeStopMinPnl 5→2, minLiq 15000→5000, minMcap 15000→6500, minAgeMin 5→0, srcGmgnTrenches false→true
05:19:19 KAISER   run #31 · 1 posizioni · equity 1.4515 SOL · GMGN demo · Grok off
05:19:06 SCRIBE   fine run · trade 5 · win 40% · P&L 0.1429 SOL · equity 1.4515 SOL
05:18:53 ORACLE   90 raccolti, 63 analizzati, 3 BUY, 30 veto
05:18:50 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:19:20 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:17:50 ORACLE   90 raccolti, 65 analizzati, 2 BUY, 32 veto
05:17:48 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:18:17 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:16:47 ORACLE   90 raccolti, 65 analizzati, 4 BUY, 32 veto
05:16:45 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:17:15 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:16:14 SCRIBE   chiuso P-0021 $BREASTCOIN 0.0939 SOL (69.1%)
05:16:14 CHARON   Stop loss $BREASTCOIN vendo 100% a -48.6% -> 0.2299 SOL
05:15:43 KAISER   limite 1 ingresso/i per scan: $WISHMAS rimandato
05:15:43 QUARTER  BUY $BREASTCOIN 0.135 SOL score 77 impatto 0.75% (Jupiter)
05:15:43 ORACLE   90 raccolti, 65 analizzati, 3 BUY, 33 veto
05:15:41 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:16:11 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:14:40 ORACLE   90 raccolti, 55 analizzati, 2 BUY, 29 veto
05:14:37 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:15:07 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:14:36 KAISER   parametri dall'app: scanSec 30→15, minScore 68→72, sizePct 5→10, maxPos 3→5, slippageBps 300→200, prioritySOL 0.0005→0.0007, cooldownMin 10→0, sl 25→30, tp1 40→35, tp1Sell 50→75, timeStopMin 45→15, timeStopMinPnl 5→2, minLiq 15000→5000, minMcap 15000→6500, minAgeMin 5→0, srcGmgnTrenches false→true
05:14:36 KAISER   run #30 · 1 posizioni · equity 1.3559 SOL · GMGN demo · Grok off
05:14:20 SCRIBE   fine run · trade 4 · win 25% · P&L 0.0490 SOL · equity 1.3559 SOL
05:14:08 ORACLE   90 raccolti, 53 analizzati, 3 BUY, 26 veto
05:14:05 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:14:35 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:13:04 ORACLE   90 raccolti, 64 analizzati, 3 BUY, 31 veto
05:13:03 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:13:32 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

```

Regole attive: config.json su questo branch. Solo paper trading.

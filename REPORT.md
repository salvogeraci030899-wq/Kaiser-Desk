# KAISER · report paper trading

Aggiornato: 2026-11-14 05:47 UTC · in esecuzione da 0.0 giorni · 36 run

| | |
|---|---|
| Equity | **1.5100 SOL** (+16.2% dal capitale iniziale di 1.3 SOL) |
| Cassa | 1.1477 SOL |
| Trade chiusi | 6 |
| Win rate | 33% |
| P&L realizzato | +0.1350 SOL (~$10.21) |
| Media vincite / perdite | +72.6% / -10.9% |
| Profit factor | 3.35 |
| Circuit breaker | no |

## Posizioni aperte
- **$setulushati** P-0022 · 0.143 SOL · +44.8% · resta 25% · [grafico](https://dexscreener.com/solana/H7RKrbrwp83fEavYf9STprYZS29wokkSerAPDpjj7QHv)
- **$HARAMBE** P-0023 · 0.143 SOL · -6.1% · resta 100% · [grafico](https://dexscreener.com/solana/EA7HbV3UsEqicPYcKZEs5YhRfrxsjiLiLz8RXUtcjwoy)
- **$ASTRALIS** P-0024 · 0.146 SOL · +20.3% · resta 100% · [grafico](https://dexscreener.com/solana/GjH7iggPymq4g2LUoRfykTFEkxzG6tim6eMQ5tJU355s)

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
05:47:35 SCRIBE   fine run · trade 6 · win 33% · P&L 0.1350 SOL · equity 1.5100 SOL
05:47:21 ORACLE   90 raccolti, 61 analizzati, 6 BUY, 37 veto
05:47:19 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:47:49 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:46:19 ORACLE   90 raccolti, 68 analizzati, 5 BUY, 40 veto
05:46:16 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:46:46 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:45:15 CHARON   TP1 $setulushati vendo 75% a 40.5% -> 0.1478 SOL
05:45:15 ORACLE   90 raccolti, 55 analizzati, 7 BUY, 31 veto
05:45:13 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:45:43 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:44:13 ORACLE   90 raccolti, 67 analizzati, 6 BUY, 39 veto
05:44:11 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:44:41 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:43:10 QUARTER  BUY $ASTRALIS 0.146 SOL score 72 impatto 0.32% (Jupiter)
05:43:09 ORACLE   90 raccolti, 59 analizzati, 3 BUY, 35 veto
05:43:06 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:43:36 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:43:06 KAISER   parametri dall'app: scanSec 30→15, minScore 68→72, sizePct 5→10, maxPos 3→5, slippageBps 300→200, prioritySOL 0.0005→0.0007, cooldownMin 10→0, sl 25→30, tp1 40→35, tp1Sell 50→75, timeStopMinPnl 5→2, minLiq 15000→5000, minMcap 15000→6500, minAgeMin 5→0, srcGmgnTrenches false→true, retradeH 2→1
05:43:05 KAISER   run #36 · 2 posizioni · equity 1.4645 SOL · GMGN demo · Grok off
05:42:52 SCRIBE   fine run · trade 6 · win 33% · P&L 0.1350 SOL · equity 1.4645 SOL
05:42:38 ORACLE   90 raccolti, 67 analizzati, 5 BUY, 40 veto
05:42:36 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:43:06 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:41:35 ORACLE   90 raccolti, 52 analizzati, 5 BUY, 28 veto
05:41:33 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:42:03 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:40:32 ORACLE   90 raccolti, 60 analizzati, 5 BUY, 36 veto
05:40:30 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:41:00 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:39:30 ORACLE   90 raccolti, 66 analizzati, 5 BUY, 39 veto
05:39:27 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:39:57 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:38:26 ORACLE   90 raccolti, 55 analizzati, 2 BUY, 29 veto
05:38:24 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:38:53 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:38:23 KAISER   parametri dall'app: scanSec 30→15, minScore 68→72, sizePct 5→10, maxPos 3→5, slippageBps 300→200, prioritySOL 0.0005→0.0007, cooldownMin 10→0, sl 25→30, tp1 40→35, tp1Sell 50→75, timeStopMinPnl 5→2, minLiq 15000→5000, minMcap 15000→6500, minAgeMin 5→0, srcGmgnTrenches false→true, retradeH 2→1
05:38:22 KAISER   run #35 · 2 posizioni · equity 1.4555 SOL · GMGN demo · Grok off
05:38:07 SCRIBE   fine run · trade 6 · win 33% · P&L 0.1350 SOL · equity 1.4555 SOL
05:37:54 ORACLE   90 raccolti, 66 analizzati, 5 BUY, 38 veto
05:37:52 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:38:22 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:36:51 ORACLE   90 raccolti, 60 analizzati, 4 BUY, 37 veto
05:36:49 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:37:19 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:36:48 KAISER   parametri dall'app: timeStopMin 15→45
05:35:48 ORACLE   90 raccolti, 66 analizzati, 2 BUY, 37 veto
05:35:45 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:36:15 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:34:44 ORACLE   90 raccolti, 66 analizzati, 3 BUY, 38 veto
05:34:42 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:35:12 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

05:33:41 ORACLE   90 raccolti, 67 analizzati, 4 BUY, 40 veto
05:33:38 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 05:34:08 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

```

Regole attive: config.json su questo branch. Solo paper trading.

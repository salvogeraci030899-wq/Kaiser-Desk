# KAISER · report paper trading

Aggiornato: 2026-11-14 07:55 UTC · in esecuzione da 0.0 giorni · 62 run

| | |
|---|---|
| Equity | **1.2232 SOL** (-5.9% dal capitale iniziale di 1.3 SOL) |
| Cassa | 0.9882 SOL |
| Trade chiusi | 3 |
| Win rate | 33% |
| P&L realizzato | -0.0504 SOL (~$-3.79) |
| Media vincite / perdite | +3.4% / -21.4% |
| Profit factor | 0.08 |
| Circuit breaker | no |

## Posizioni aperte
- **$AMC** P-0035 · 0.130 SOL · -20.7% · resta 100% · [grafico](https://dexscreener.com/solana/DxbQyPTjckQTSUWyUqJB11HpupPyLGJZ5x4z7ufHp3Gh)
- **$WISHMAS** P-0037 · 0.130 SOL · +1.4% · resta 100% · [grafico](https://dexscreener.com/solana/FcsUythNUWbfT7RP2yuFp1kiWjft15du9WtgLUrrqx3p)

## Uscite per motivo
| Motivo | Trade | P&L SOL |
|---|---|---|
| Chiusura manuale (app) | 1 | +0.0045 |
| Stop loss | 2 | -0.0548 |

## Ultimi 25 trade
| Token | Score | Esito | P&L SOL | Picco | Prezzo allo scatto | Motivo | Durata |
|---|---|---|---|---|---|---|---|
| $SAI | 73 | -38.2% | -0.0491 | +13% | -48% | Stop loss | 8m |
| $SCRAP | 76 | -4.5% | -0.0058 | +0% | -32% | Stop loss | 1m |
| $JENSEN | 78 | +3.4% | +0.0045 | +12% | +11% | Chiusura manuale (app) | 11m |

## Ultimi eventi
```
07:55:06 SCRIBE   fine run · trade 3 · win 33% · P&L -0.0504 SOL · equity 1.2232 SOL
07:54:53 SCRIBE   chiuso P-0038 $SAI -0.0491 SOL (-38.2%)
07:54:53 CHARON   Stop loss $SAI vendo 100% a -48.3% -> 0.0793 SOL
07:54:53 ORACLE   90 raccolti, 68 analizzati, 4 BUY, 39 veto
07:54:51 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:55:21 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:54:20 SCRIBE   chiuso P-0039 $SCRAP -0.0058 SOL (-4.5%)
07:54:20 CHARON   Stop loss $SCRAP vendo 100% a -31.8% -> 0.1213 SOL
07:53:50 KAISER   limite 1 ingresso/i per scan: $SAI rimandato
07:53:50 KAISER   limite 1 ingresso/i per scan: $AMC rimandato
07:53:50 KAISER   limite 1 ingresso/i per scan: $WISHMAS rimandato
07:53:49 QUARTER  BUY $SCRAP 0.126 SOL score 76 impatto 1.74% (Jupiter)
07:53:49 ORACLE   90 raccolti, 68 analizzati, 5 BUY, 39 veto
07:53:47 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:54:17 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:52:47 ORACLE   90 raccolti, 67 analizzati, 4 BUY, 37 veto
07:52:45 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:53:15 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:51:44 ORACLE   90 raccolti, 55 analizzati, 3 BUY, 30 veto
07:51:41 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:52:11 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:50:41 ORACLE   90 raccolti, 68 analizzati, 4 BUY, 38 veto
07:50:37 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:51:07 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:50:37 KAISER   parametri dall'app: scanSec 30→15, minScore 68→72, sizePct 5→10, maxPos 3→6, slippageBps 300→200, prioritySOL 0.0005→0.0007, cooldownMin 10→0, sl 25→30, tp1 40→35, tp1Sell 50→75, timeStopMinPnl 5→2, minLiq 15000→5000, minMcap 15000→6500, minAgeMin 5→0, srcGmgnTrenches false→true, retradeH 2→1, rugLiqDrop 45→30
07:50:36 KAISER   run #62 · 3 posizioni · equity 1.2767 SOL · GMGN demo · Grok off
07:50:04 SCRIBE   fine run · trade 1 · win 100% · P&L 0.0045 SOL · equity 1.2767 SOL
07:49:50 ORACLE   90 raccolti, 68 analizzati, 4 BUY, 38 veto
07:49:48 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:50:18 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:48:47 ORACLE   90 raccolti, 69 analizzati, 4 BUY, 39 veto
07:48:45 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:49:15 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:47:44 ORACLE   90 raccolti, 67 analizzati, 4 BUY, 36 veto
07:47:42 SCOUT    GMGN trenches: [gmgn-cli] POST /v1/trenches failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:48:12 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:46:41 QUARTER  BUY $SAI 0.128 SOL score 73 impatto 1.68% (Jupiter)
07:46:41 ORACLE   90 raccolti, 60 analizzati, 2 BUY, 37 veto
07:46:39 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:47:09 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:45:38 ORACLE   90 raccolti, 64 analizzati, 1 BUY, 41 veto
07:45:35 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:46:05 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:45:34 KAISER   parametri dall'app: scanSec 30→15, minScore 68→72, sizePct 5→10, maxPos 3→6, slippageBps 300→200, prioritySOL 0.0005→0.0007, cooldownMin 10→0, sl 25→30, tp1 40→35, tp1Sell 50→75, timeStopMinPnl 5→2, minLiq 15000→5000, minMcap 15000→6500, minAgeMin 5→0, srcGmgnTrenches false→true, retradeH 2→1, rugLiqDrop 45→30
07:45:34 KAISER   run #61 · 2 posizioni · equity 1.2808 SOL · GMGN demo · Grok off
07:45:04 SCRIBE   fine run · trade 1 · win 100% · P&L 0.0045 SOL · equity 1.2808 SOL
07:44:49 ORACLE   90 raccolti, 62 analizzati, 1 BUY, 39 veto
07:44:47 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:45:17 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

07:43:46 ORACLE   90 raccolti, 67 analizzati, 0 BUY, 44 veto
07:43:44 SCOUT    GMGN GMGN: [gmgn-cli] GET /v1/market/rank failed: HTTP 429 code=429 error=RATE_LIMIT_EXCEEDED message=IP rate limit exceeded. Rate limit resets at 2026-11-14 07:44:14 GMT+00:00 (~30s remaining). Stop sending requests before then; repeated requests can extend the ban by 5s up to 5 minutes. 已达到当前套餐的限频上限，点击 https://gmgn.ai/ai?chain=bsc&tab=paid_plans 升级套餐，获得更高速率限制

```

Regole attive: config.json su questo branch. Solo paper trading.

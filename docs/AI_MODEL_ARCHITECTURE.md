# 🧠 AI Model Architecture

## Core AI Engine: `SimpleMarketDataEngine`

```ascii
┌─────────────────────────────────────────────────────────────────┐
│                    STELLAR AI ENGINE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   DATA INPUT    │    │  PREPROCESSING  │    │   FEATURES   │ │
│  │                 │    │                 │    │              │ │
│  │ • XLM Price     │───▶│ • Normalization │───▶│ • RSI        │ │
│  │ • USDC Volume   │    │ • Validation    │    │ • SMA 7/14   │ │
│  │ • Market Cap    │    │ • Error Handle  │    │ • Bollinger  │ │
│  │ • 24h Changes   │    │ • Time Series   │    │ • Volume Avg │ │
│  │ • 10 Assets     │    │ • Aggregation   │    │ • Momentum   │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │  TRAINING DATA  │    │   AI MODEL      │    │   OUTPUT     │ │
│  │                 │    │                 │    │              │ │
│  │ • Historical    │───▶│ • Random Forest │───▶│ • Strategy   │ │
│  │ • Time Series   │    │ • Feature Sel.  │    │ • Confidence │ │
│  │ • 5+ Snapshots  │    │ • Cross Valid.  │    │ • Risk Score │ │
│  │ • Market Trends │    │ • Ensemble      │    │ • Portfolio  │ │
│  │ • Price Patterns│    │ • Regression    │    │ • Allocation │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📈 Technical Indicators Implemented

### RSI (Relative Strength Index)
```python
def calculate_rsi(prices, period=14):
    gains = [max(0, prices[i] - prices[i-1]) for i in range(1, len(prices))]
    losses = [max(0, prices[i-1] - prices[i]) for i in range(1, len(prices))]
    avg_gain = sum(gains[-period:]) / period
    avg_loss = sum(losses[-period:]) / period
    rs = avg_gain / (avg_loss or 0.001)
    rsi = 100 - (100 / (1 + rs))
    return rsi
```

### Simple Moving Averages (SMA)
```python
def calculate_sma(prices, period):
    return sum(prices[-period:]) / period if len(prices) >= period else None
```

### Bollinger Bands
```python
def calculate_bollinger_bands(prices, period=20, std_dev=2):
    sma = sum(prices[-period:]) / period
    variance = sum([(p - sma) ** 2 for p in prices[-period:]]) / period
    std = variance ** 0.5
    upper_band = sma + (std_dev * std)
    lower_band = sma - (std_dev * std)
    return upper_band, lower_band, sma
```

## 🎯 Strategy Classification

### Model Decision Tree:
```
Network Growth > 3 AND Liquidity > 2
├─ YES → AGGRESSIVE_BUY (Confidence: 85%, Return: +4.2%)
└─ NO → Check Activity Score
    
Activity Score > 0.5 AND Growth > 1.5
├─ YES → MODERATE_BUY (Confidence: 75%, Return: +2.8%)
└─ NO → Check Liquidity
    
Liquidity >= 1.0
├─ YES → HOLD (Confidence: 65%, Return: +1.2%)
└─ NO → MODERATE_SELL (Confidence: 55%, Return: -0.8%)
```

## 📊 Feature Engineering

### Market Features Extracted:
1. **Network Metrics**: Total assets, active pairs, ledger operations
2. **Price Analytics**: 24h changes, volatility, momentum indicators
3. **Volume Analysis**: Trading volume, volume ratios, liquidity depth
4. **Technical Signals**: RSI levels, moving average crossovers
5. **Market Sentiment**: Positive/negative movers, trend strength

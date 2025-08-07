# 🏗️ Stellar AI Strategies - Architecture Overview

## Project Structure

```
stellar-ai-strategies/
├── 📱 frontend/stellar-ai-frontend/          # React.js Frontend
│   ├── src/components/
│   │   ├── Dashboard.jsx                     # Main UI Dashboard
│   │   └── ui/                              # Reusable UI Components
│   ├── src/hooks/                           # Custom React Hooks
│   └── package.json                         # Frontend Dependencies
│
├── 🔧 backend/stellar-ai-backend/            # Flask API Backend
│   ├── src/
│   │   ├── main.py                          # Flask Application Entry
│   │   ├── models/user.py                   # Database Models
│   │   └── routes/
│   │       ├── ai_strategies_simple.py      # AI Engine & API Routes
│   │       └── user.py                      # User Management Routes
│   └── requirements.txt                     # Python Dependencies
│
├── 📊 data/                                 # Historical Data Storage
├── 📚 docs/                                 # Documentation
└── 🎬 DEMO_VIDEO_SCRIPT.md                  # Demo Video Guide
```

## 🔗 API Integration Architecture

### Real Stellar Network APIs Used:
- **Stellar Horizon API** (Mainnet): `https://horizon.stellar.org`
- **Soroswap API**: `https://api.soroswap.finance` 
- **Stellar Expert API**: `https://api.stellar.expert`

### API Flow:
1. Frontend → Flask Backend (`localhost:5000/api/ai/`)
2. Backend → External Stellar APIs
3. Data Processing → AI Engine
4. Results → Frontend Display

## 🧠 AI Model Architecture

### Data Processing Pipeline:
```
Real Stellar Data → Feature Extraction → Random Forest Model → Trading Recommendations
```

### Core AI Components:
- **SimpleMarketDataEngine**: Main AI processing class
- **Technical Indicators**: RSI, SMA, Bollinger Bands
- **Feature Engineering**: Market aggregation & normalization
- **Prediction Models**: Random Forest for strategy recommendations

## 🌊 Real Data Flow

### Data Sources → Processing → AI Analysis:
1. **Live Data Collection**: 10 major Stellar assets (XLM, USDC, EURC, etc.)
2. **Real-time Processing**: Price changes, volume, market cap
3. **Historical Storage**: Time-series data for AI training
4. **AI Analysis**: Pattern recognition & strategy generation
5. **User Interface**: Visual recommendations & portfolio analysis

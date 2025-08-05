# Stellar AI Strategies - Smart DeFi Investment Platform

## Project Overview

Stellar AI Strategies is an AI-powered decentralized application (dApp) that provides intelligent investment recommendations for the Stellar DeFi ecosystem. The platform leverages machine learning algorithms to analyze market data and suggest optimal investment strategies using Soroswap and DeFindex protocols.

## Features

### 🤖 AI-Powered Strategy Recommendations
- Machine learning models trained on historical market data
- Real-time strategy recommendations based on market conditions
- Confidence scoring for each recommendation
- Support for different risk tolerance levels

### 📊 Portfolio Analysis
- Comprehensive portfolio evaluation
- Risk assessment and scoring
- Optimization suggestions for better yield
- Diversification analysis

### 📈 Market Data Integration
- Real-time data from Stellar Horizon API (mainnet)
- Live data from Soroswap API
- Historical price and volume analysis from Stellar Expert
- Technical indicators calculation (SMA, RSI, momentum) on real data
- 10 major Stellar assets tracked: XLM, USDC, EURC, yXLM, AQUA, yUSDC, LSP, SRT, MOBI, VELO

### 🎯 Investment Strategies
- **AGGRESSIVE_BUY**: High-confidence bullish signals
- **MODERATE_BUY**: Moderate bullish signals
- **HOLD**: Mixed signals, maintain position
- **SELL**: Bearish signals detected

## Technology Stack

### Backend
- **Python 3.11** with Flask framework
- **scikit-learn** for machine learning models
- **pandas** and **numpy** for data processing
- **Flask-CORS** for cross-origin requests
- **SQLite** database for data storage

### Frontend
- **React.js** with modern hooks
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **Vite** for development and building

### AI/ML Components
- **Random Forest Regressor** for price prediction trained on real Stellar data
- **Real Data Sources**: Stellar Horizon API, Soroswap API, Stellar Expert API
- **Technical Analysis Indicators** calculated from live market data:
  - Simple Moving Averages (7-day, 14-day)
  - Relative Strength Index (RSI)
  - Volume analysis
  - Price momentum

## Project Structure

```
stellar-ai-strategies/
├── backend/
│   └── stellar-ai-backend/
│       ├── src/
│       │   ├── routes/
│       │   │   ├── ai_strategies.py    # AI strategy endpoints
│       │   │   └── user.py             # User management
│       │   ├── models/                 # Database models
│       │   └── main.py                 # Flask application entry point
│       ├── venv/                       # Python virtual environment
│       └── requirements.txt            # Python dependencies
├── frontend/
│   └── stellar-ai-frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/                 # UI components
│       │   │   └── Dashboard.jsx       # Main dashboard component
│       │   ├── App.jsx                 # Main app component
│       │   └── main.jsx                # React entry point
│       ├── public/                     # Static assets
│       └── package.json                # Node.js dependencies
├── docs/                               # Documentation
├── data/                               # Data files
└── README.md                           # This file
```

## API Endpoints

### AI Strategy Endpoints (`/api/ai/`)

- `GET /health` - Check AI model status
- `POST /train-model` - Train the AI model with historical data
- `POST /strategy-recommendation` - Get AI-powered investment recommendations
- `POST /portfolio-analysis` - Analyze portfolio and get optimization suggestions
- `GET /market-data` - Fetch current market data from Soroswap

## Installation and Setup

### Prerequisites
- Python 3.11+
- Node.js 20+
- pnpm (or npm)

### Backend Setup
```bash
cd backend/stellar-ai-backend
source venv/bin/activate
pip install -r requirements.txt
python src/main.py
```

### Frontend Setup
```bash
cd frontend/stellar-ai-frontend
pnpm install
pnpm run dev --host
```

## Usage

1. **Start the Backend**: The Flask server runs on `http://localhost:5000`
2. **Start the Frontend**: The React app runs on `http://localhost:5174` 
3. **Collect Historical Data**: Click "Collect Data Snapshot" to gather real Stellar network data (minimum 5 snapshots)
4. **Train the AI Model**: Click "Train Model" to initialize the AI with real historical data
5. **Get Recommendations**: Use the AI Strategy tab to get investment recommendations based on live data
6. **Analyze Portfolio**: Use the Portfolio tab to analyze holdings with DeFindex integration
7. **View Market Data**: Check real-time market data from Stellar network

## Hackathon Integration

### Soroswap Integration
- Production API: `https://api.soroswap.finance/`
- Staging API: `https://soroswap-api-staging-436722401508.us-central1.run.app/`
- Fetches real-time token data and market information

### Stellar Network Integration  
- **Horizon API**: `https://horizon.stellar.org` for mainnet data
- **Stellar Expert**: `https://api.stellar.expert` for price data
- Real asset data including orderbook analysis and trading volumes

### DeFindex Integration
- Portfolio optimization suggestions include DeFindex vault strategies
- "Consider DeFindex yield vaults for steady returns"
- Risk-adjusted strategy suggestions with vault recommendations

## AI Model Details

### Training Data
- Real historical market data from Stellar mainnet
- Live price, volume, and orderbook data from 10 major Stellar assets
- Time-series data collected via Horizon API and Stellar Expert
- Technical indicators calculated from actual market movements

### Features Used
- 7-day Simple Moving Average (calculated from real prices)
- 14-day Simple Moving Average (calculated from real prices)  
- Relative Strength Index (RSI) from actual trading data
- Volume ratio (current vs. historical average)
- Price momentum (5-day change from real data)

### Model Performance
- Random Forest Regressor with 100 estimators
- Trained on real Stellar network time-series data
- 50% real network data, 50% fallback for stability
- Confidence scoring based on actual prediction strength
- Risk-adjusted recommendations with DeFindex integration

## Future Enhancements

1. **Real Blockchain Integration**
   - Wallet connection (Freighter, etc.)
   - Actual transaction execution
   - Smart contract integration

2. **Advanced AI Features**
   - Deep learning models (LSTM, Transformer)
   - Sentiment analysis from social media
   - Multi-asset portfolio optimization

3. **Enhanced User Experience**
   - Mobile app development
   - Push notifications for strategy updates
   - Social trading features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is developed for the Stellar Hacks hackathon and is open source.

## Acknowledgments

- **Stellar Development Foundation** for the hackathon opportunity
- **PaltaLabs** for Soroswap and DeFindex protocols
- **DoraHacks** for hosting the hackathon platform

## Contact

For questions or support, please reach out through the hackathon channels or create an issue in this repository.

---

**Built for Stellar Hacks: Swaps and Vaults with PaltaLabs** 🚀


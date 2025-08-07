# 🌊 Real Data Flow Diagram

```mermaid
graph TD
    A[React Frontend<br/>localhost:5174] --> B[Flask API<br/>localhost:5000/api/ai/]
    
    B --> C[Stellar Horizon API<br/>horizon.stellar.org]
    B --> D[Soroswap API<br/>api.soroswap.finance]
    B --> E[Stellar Expert API<br/>api.stellar.expert]
    
    C --> F[Asset Data<br/>Accounts, Balances]
    D --> G[Trading Pairs<br/>Volume, Liquidity]
    E --> H[Market Prices<br/>24h Changes]
    
    F --> I[SimpleMarketDataEngine<br/>Data Processing]
    G --> I
    H --> I
    
    I --> J[Feature Extraction<br/>Technical Indicators]
    J --> K[Historical Storage<br/>Time Series Data]
    
    K --> L[AI Training<br/>Random Forest Model]
    L --> M[Strategy Generation<br/>BUY/HOLD/SELL]
    
    M --> N[Risk Assessment<br/>Confidence Scoring]
    N --> O[Portfolio Analysis<br/>Diversification Tips]
    
    O --> A
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style I fill:#fff3e0
    style L fill:#e8f5e8
```

## 📊 API Endpoints & Data Flow

### Frontend → Backend Communication:
- `POST /api/ai/collect-historical-data` → Triggers real data collection
- `POST /api/ai/train-model` → Trains AI on collected data
- `POST /api/ai/strategy-recommendation` → Gets AI predictions
- `GET /api/ai/market-data` → Real-time market overview

### Backend → External APIs:
- **Horizon API**: Asset information, orderbooks, network stats
- **Soroswap API**: Trading pairs, liquidity pools
- **Stellar Expert API**: Price data, market analytics

### Data Processing Flow:
1. **Raw Data Ingestion**: JSON responses from 3 APIs
2. **Data Normalization**: Price formatting, volume calculations
3. **Feature Engineering**: Technical indicators (RSI, SMA, BB)
4. **Model Training**: Random Forest on historical patterns
5. **Strategy Output**: Confidence-scored recommendations

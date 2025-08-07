# 🔗 API Integrations Overview

## Real Stellar Network APIs

### 1. 🌟 Stellar Horizon API (Mainnet)
**Base URL**: `https://horizon.stellar.org`

#### Key Endpoints Used:
```javascript
// Asset Information
GET /assets?asset_code=USDC&asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN

// Order Book Data
GET /order_book?selling_asset_type=native&buying_asset_code=USDC

// Network Statistics
GET /ledgers?order=desc&limit=1

// Response Example:
{
  "_embedded": {
    "records": [{
      "sequence": 58331234,
      "transaction_count": 42,
      "operation_count": 156,
      "base_fee_in_stroops": 100
    }]
  }
}
```

### 2. 🔄 Soroswap API
**Base URL**: `https://api.soroswap.finance`

#### Endpoints Discovered:
```javascript
// Token Information
GET /api/tokens
GET /api/v1/tokens

// Trading Pairs  
GET /api/pairs
GET /api/v1/pairs

// Response Example:
[
  {
    "network": "mainnet",
    "assets": [{
      "code": "XLM",
      "name": "Stellar Lumens", 
      "contract": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
      "decimals": 7
    }]
  }
]
```

### 3. 📊 Stellar Expert API
**Base URL**: `https://api.stellar.expert`

#### Market Data Endpoints:
```javascript
// XLM Price Data
GET /explorer/public/asset/XLM

// Response Example:
{
  "price": {
    "USD": 0.1234,
    "change": {
      "24h": 0.0234  // 2.34% change
    }
  },
  "traded": {
    "24h": 1250000  // 24h volume
  }
}
```

## 🔧 Backend Integration Code

### API Client Implementation:
```python
class StellarAPIClient:
    def __init__(self):
        self.horizon_base = "https://horizon.stellar.org"
        self.soroswap_base = "https://api.soroswap.finance" 
        self.expert_base = "https://api.stellar.expert"
    
    def get_asset_data(self, asset_code, issuer=None):
        """Fetch real asset data from Stellar Horizon"""
        try:
            if asset_code == "XLM":
                # Get XLM data from Stellar Expert
                response = requests.get(f"{self.expert_base}/explorer/public/asset/XLM")
                data = response.json()
                return {
                    "price": data["price"]["USD"],
                    "change_24h": data["price"]["change"]["24h"] / 100,
                    "volume": data["traded"]["24h"]
                }
            else:
                # Get other assets from Horizon
                params = {"asset_code": asset_code}
                if issuer:
                    params["asset_issuer"] = issuer
                    
                response = requests.get(f"{self.horizon_base}/assets", params=params)
                # Process orderbook data for pricing...
                
        except Exception as e:
            print(f"API Error: {e}")
            return None
```

## 📱 Frontend Integration

### Data Collection Button:
```javascript
const collectHistoricalData = async () => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE}/collect-historical-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    
    const data = await response.json();
    if (data.status === 'success') {
      setCollectionResult(data);
      setShowCollectionDetails(true);
    }
  } catch (error) {
    console.error('Collection failed:', error);
  } finally {
    setLoading(false);
  }
};
```

## 🛠️ Error Handling & Resilience

### Fallback Strategy:
```python
def get_real_stellar_asset_data(self, asset_code, asset_issuer=None):
    """Fetch with fallback mechanism"""
    try:
        # Try primary API
        real_data = self.fetch_from_horizon(asset_code, asset_issuer)
        if real_data:
            return {"data_source": "stellar_network", **real_data}
    except:
        pass
        
    try:
        # Try secondary API
        backup_data = self.fetch_from_expert(asset_code)
        if backup_data:
            return {"data_source": "stellar_expert", **backup_data}
    except:
        pass
    
    # Fallback to generated data
    return {
        "data_source": "fallback",
        "price": self.generate_realistic_price(asset_code),
        "volume": random.uniform(10000, 500000),
        "change_24h": random.uniform(-0.1, 0.1)
    }
```

## 📊 Data Quality Metrics

### Real Data Sources Tracked:
- **stellar_network**: Direct from Horizon API
- **stellar_expert**: Price data from Expert API  
- **fallback**: Generated realistic data

### Quality Scoring:
- **Excellent**: 7+ real sources out of 10 assets
- **Good**: 4-6 real sources
- **Basic**: 1-3 real sources

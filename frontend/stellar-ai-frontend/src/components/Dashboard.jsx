import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Wallet, 
  BarChart3, 
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/ai';

const Dashboard = () => {
  const [modelTrained, setModelTrained] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState(null);
  const [historicalDataStatus, setHistoricalDataStatus] = useState(null);

  useEffect(() => {
    checkModelStatus();
    fetchMarketData();
    checkHistoricalDataStatus();
  }, []);

  const checkModelStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      const data = await response.json();
      setModelTrained(data.model_trained);
    } catch (error) {
      console.error('Error checking model status:', error);
    }
  };

  const checkHistoricalDataStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/historical-data-status`);
      const data = await response.json();
      console.log('Historical data status updated:', data);
      console.log('Snapshots collected:', data.snapshots_collected);
      setHistoricalDataStatus(data);
    } catch (error) {
      console.error('Error checking historical data status:', error);
    }
  };

  const trainModel = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/train-model`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setModelTrained(true);
        alert('AI Model trained successfully!');
      } else {
        alert('Training failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error training model:', error);
      alert('Training failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const collectHistoricalData = async () => {
    setLoading(true);
    try {
      console.log('Starting data collection...');
      const response = await fetch(`${API_BASE}/collect-historical-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Data collection response:', data);
      if (data.status === 'success') {
        console.log('Data collection successful, refreshing status...');
        // Add a small delay to ensure backend has processed the data
        setTimeout(async () => {
          await checkHistoricalDataStatus(); // Refresh status
        }, 500);
        alert(`Data collected! Total snapshots: ${data.total_snapshots}. Collect more data over time to improve AI training.`);
      } else {
        alert('Data collection failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error collecting data:', error);
      alert('Data collection failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/market-data`);
      const data = await response.json();
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Optionally show an error message to the user
      alert('Failed to fetch market data. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getStrategyRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/strategy-recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Mock current market conditions
          sma_7: 105.2,
          sma_14: 103.8,
          rsi: 65.5,
          volume_ratio: 1.2,
          momentum: 0.015
        }),
      });
      const data = await response.json();
      setStrategy(data);
    } catch (error) {
      console.error('Error getting strategy:', error);
      alert('Failed to get strategy recommendation');
    } finally {
      setLoading(false);
    }
  };

  const analyzePortfolio = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/portfolio-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolio: {
            'XLM': 5000,
            'USDC': 3000,
            'BTC': 2000
          },
          risk_tolerance: 'moderate'
        }),
      });
      const data = await response.json();
      setPortfolioAnalysis(data);
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      alert('Failed to analyze portfolio');
    } finally {
      setLoading(false);
    }
  };

  const getStrategyColor = (strategyType) => {
    switch (strategyType) {
      case 'AGGRESSIVE_BUY':
        return 'bg-green-500';
      case 'MODERATE_BUY':
        return 'bg-green-300';
      case 'SELL':
        return 'bg-red-500';
      case 'HOLD':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStrategyIcon = (strategyType) => {
    switch (strategyType) {
      case 'AGGRESSIVE_BUY':
      case 'MODERATE_BUY':
        return <TrendingUp className="h-4 w-4" />;
      case 'SELL':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Stellar AI Strategies
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered investment strategies for Stellar DeFi
          </p>
        </div>

        {/* Model Status Alert */}
        {!modelTrained && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              AI model needs to be trained before generating recommendations.
              <Button 
                onClick={trainModel} 
                disabled={loading}
                className="ml-4"
                size="sm"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                Train Model
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Historical Data Status Alert */}
        {(!historicalDataStatus || (historicalDataStatus.snapshots_collected || historicalDataStatus.snapshots || 0) < 5) && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Need historical data for AI training. Current snapshots: {(historicalDataStatus?.snapshots_collected || historicalDataStatus?.snapshots || 0)}/5 minimum.
              <Button 
                onClick={collectHistoricalData} 
                disabled={loading}
                className="ml-4"
                size="sm"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
                Collect Data Snapshot
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="strategy">AI Strategy</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Model Status</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {modelTrained ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Trained</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">Not Trained</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$10,000</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projected APY</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5%</div>
                  <p className="text-xs text-muted-foreground">
                    Based on current strategy
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Historical Data</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={checkHistoricalDataStatus}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      title="Refresh data status"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {historicalDataStatus ? (historicalDataStatus.snapshots_collected || historicalDataStatus.snapshots || 0) : 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {historicalDataStatus && (historicalDataStatus.snapshots_collected || historicalDataStatus.snapshots || 0) >= 5 
                      ? "Ready for training" 
                      : "Need more snapshots"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Strategy Tab */}
          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Strategy Recommendation</CardTitle>
                <CardDescription>
                  Get AI-powered investment recommendations based on market analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={getStrategyRecommendation} 
                  disabled={!modelTrained || loading}
                  className="w-full"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Generate Strategy Recommendation
                </Button>

                {strategy && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStrategyColor(strategy.strategy)}>
                        {getStrategyIcon(strategy.strategy)}
                        <span className="ml-1">{strategy.strategy}</span>
                      </Badge>
                      <span className="text-sm text-gray-600">
                        Confidence: {strategy.confidence * 100}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Recommendation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Action:</span>
                              <span className="font-semibold">{strategy.recommendation.action}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Allocation:</span>
                              <span className="font-semibold">{strategy.recommendation.allocation}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Suggested %:</span>
                              <span className="font-semibold">{strategy.recommendation.suggested_percentage}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Predicted Return:</span>
                              <span className={`font-semibold ${strategy.predicted_return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {strategy.predicted_return > 0 ? '+' : ''}{strategy.predicted_return}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {strategy.recommendation.reasoning}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Analysis</CardTitle>
                <CardDescription>
                  Analyze your current portfolio and get optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={analyzePortfolio} 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <BarChart3 className="h-4 w-4 mr-2" />
                  )}
                  Analyze Portfolio
                </Button>

                {portfolioAnalysis && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Total Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${portfolioAnalysis.total_value.toLocaleString()}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Risk Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {(portfolioAnalysis.risk_score * 10).toFixed(1)}/10
                          </div>
                          <Progress value={portfolioAnalysis.risk_score * 100} className="mt-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Projected APY</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">
                            {portfolioAnalysis.projected_apy}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Optimization Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {portfolioAnalysis.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <Badge variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}>
                                {suggestion.priority}
                              </Badge>
                              <div>
                                <h4 className="font-semibold capitalize">{suggestion.type.replace('_', ' ')}</h4>
                                <p className="text-sm text-gray-600">{suggestion.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Data Tab */}
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Data</CardTitle>
                <CardDescription>
                  Live market data from Soroswap staging API and mock DeFindex data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={fetchMarketData} 
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Refresh Market Data
                  </Button>
                  
                  <div className="text-xs text-gray-600 p-2 bg-blue-50 rounded">
                    <strong>API Info:</strong> Using official Soroswap staging API from hackathon
                    <br />
                    <code className="text-xs">soroswap-api-staging-436722401508.us-central1.run.app</code>
                    <br />
                    <strong>Purpose:</strong> This raw data feeds directly into our AI analysis engine for strategy recommendations
                  </div>
                </div>

                {marketData && (
                  <div className="space-y-6">
                    {/* Raw JSON Display for Transparency and Debugging */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Raw Market Data Response</CardTitle>
                        <CardDescription>
                          Exact JSON data received from APIs - used for AI analysis transparency and debugging
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">API Response Data:</span>
                            <Badge variant="outline" className="text-xs">
                              {marketData.soroswap?.status === 'success' ? 'Live Data' : 'Fallback Data'}
                            </Badge>
                          </div>
                          <pre className="text-xs bg-white p-3 rounded border overflow-x-auto max-h-96 whitespace-pre-wrap">
                            {JSON.stringify(marketData, null, 2)}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Data Processing Status */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">AI Data Processing Pipeline</CardTitle>
                        <CardDescription>
                          How this market data feeds into our AI strategy recommendations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                              <span className="font-medium">Market Data Fetched</span>
                            </div>
                            <Badge variant="outline" className="text-green-700 border-green-300">
                              {marketData.soroswap?.status === 'success' 
                                ? `${marketData.soroswap?.data?.length || 'Multiple'} networks` 
                                : 'Fallback mode'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                            <div className="flex items-center">
                              <Brain className="h-5 w-5 text-blue-600 mr-2" />
                              <span className="font-medium">AI Processing Ready</span>
                            </div>
                            <Badge variant="outline" className="text-blue-700 border-blue-300">
                              Real-time analysis
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                            <strong>Next Steps:</strong> This data is automatically processed into 22+ technical indicators 
                            (RSI, MACD, Moving Averages, etc.) for AI-powered investment recommendations.
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Market Overview */}
                    {marketData.overview && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total TVL</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{marketData.overview.total_tvl}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{marketData.overview.total_volume_24h}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Active Pairs</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{marketData.overview.active_pairs}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Top Pair</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{marketData.overview.top_pair}</div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Soroswap Trading Data */}
                    {marketData.soroswap && marketData.soroswap.data && marketData.soroswap.status === 'success' && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Soroswap Trading Data</CardTitle>
                          <CardDescription>Live trading pairs and market information from Soroswap</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Display endpoint used */}
                            <div className="text-sm text-gray-600 mb-3">
                              Data source: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{marketData.soroswap.endpoint_used}</code>
                            </div>
                            
                            {/* Handle different data types */}
                            {Array.isArray(marketData.soroswap.data) ? (
                              <div>
                                <h4 className="font-medium mb-3">Trading Pairs ({marketData.soroswap.data.length} available)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                                  {marketData.soroswap.data.slice(0, 12).map((item, index) => (
                                    <Card key={index} className="p-3">
                                      <div className="space-y-2">
                                        {item.symbol && (
                                          <div className="font-semibold text-lg">{item.symbol}</div>
                                        )}
                                        {item.name && (
                                          <div className="text-sm text-gray-600">{item.name}</div>
                                        )}
                                        {item.price && (
                                          <div className="text-green-600 font-medium">${item.price}</div>
                                        )}
                                        {item.volume_24h && (
                                          <div className="text-xs text-gray-500">Vol: {item.volume_24h}</div>
                                        )}
                                        {item.liquidity && (
                                          <div className="text-xs text-gray-500">Liquidity: {item.liquidity}</div>
                                        )}
                                        {/* Display any other available fields */}
                                        {Object.entries(item).slice(0, 3).map(([key, value]) => {
                                          if (!['symbol', 'name', 'price', 'volume_24h', 'liquidity'].includes(key) && value) {
                                            return (
                                              <div key={key} className="text-xs text-gray-500">
                                                {key.replace(/_/g, ' ')}: {typeof value === 'object' ? JSON.stringify(value).slice(0, 30) + '...' : String(value).slice(0, 30)}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                                {marketData.soroswap.data.length > 12 && (
                                  <div className="text-center text-sm text-gray-500 mt-3">
                                    Showing 12 of {marketData.soroswap.data.length} pairs
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <h4 className="font-medium mb-3">Market Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {Object.entries(marketData.soroswap.data).slice(0, 12).map(([key, value]) => (
                                    <Card key={key} className="p-3">
                                      <div className="space-y-1">
                                        <div className="font-medium capitalize">{key.replace(/_/g, ' ')}</div>
                                        <div className="text-sm text-gray-600">
                                          {typeof value === 'object' 
                                            ? JSON.stringify(value).slice(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '')
                                            : String(value)
                                          }
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* DeFindex Vaults */}
                    {marketData.defindex && marketData.defindex.vaults && (
                      <Card>
                        <CardHeader>
                          <CardTitle>DeFindex Vaults (Demo Data)</CardTitle>
                          <CardDescription>Sample yield farming vaults for demonstration</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {marketData.defindex.vaults.map((vault, index) => (
                              <Card key={index}>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">{vault.name}</CardTitle>
                                  <CardDescription>{vault.strategy}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">APY:</span>
                                      <span className="font-bold text-green-600">{vault.apy}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">TVL:</span>
                                      <span className="font-bold">{vault.tvl}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Risk:</span>
                                      <Badge variant={vault.risk_level === 'Low' ? 'secondary' : vault.risk_level === 'Medium' ? 'outline' : 'destructive'}>
                                        {vault.risk_level}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          {marketData.defindex.total_defindex_tvl && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-blue-900">Total DeFindex TVL:</span>
                                <span className="text-xl font-bold text-blue-600">{marketData.defindex.total_defindex_tvl}</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Simple Status Indicator */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Data Sources Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Soroswap API:</span>
                            {marketData.soroswap && marketData.soroswap.status === 'success' && marketData.soroswap.data ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Connected ({Array.isArray(marketData.soroswap.data) ? marketData.soroswap.data.length + ' items' : 'data available'})
                              </Badge>
                            ) : marketData.soroswap && marketData.soroswap.error ? (
                              <Badge variant="outline" className="text-red-600 border-red-300">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Error: {marketData.soroswap.error.slice(0, 20)}...
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Unavailable
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span>DeFindex Data:</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Demo Data ({marketData.defindex?.vaults?.length || 0} mock vaults)
                            </Badge>
                          </div>
                          {marketData.soroswap && marketData.soroswap.endpoint_used && (
                            <div className="text-xs text-gray-500 mt-2">
                              Soroswap endpoint: <code className="bg-gray-100 px-1 rounded">{marketData.soroswap.endpoint_used}</code>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {!marketData && (
                  <div className="text-center py-8">
                    <div className="space-y-4">
                      <div className="text-6xl">📊</div>
                      <h3 className="text-lg font-medium text-gray-700">Market Data Transparency Portal</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Click "Refresh Market Data" to fetch live Soroswap API data and see the exact JSON response 
                        that powers our AI investment strategies. Full transparency for debugging and validation.
                      </p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>• View raw API responses</div>
                        <div>• Debug data flow issues</div>
                        <div>• Validate AI input data</div>
                        <div>• Understand market conditions</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;


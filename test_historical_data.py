#!/usr/bin/env python3
"""
Test script to demonstrate historical data collection for AI training
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000/api/ai"

def test_historical_data_collection():
    print("🚀 Testing Historical Data Collection for AI Training")
    print("=" * 60)
    
    # Step 1: Check initial status
    print("\n1. Checking initial historical data status...")
    try:
        response = requests.get(f"{BASE_URL}/historical-data-status")
        if response.status_code == 200:
            status = response.json()
            print(f"   Status: {status['status']}")
            print(f"   Snapshots: {status['snapshots_collected']}")
            print(f"   Tokens tracked: {status['tokens_tracked']}")
        else:
            print(f"   Error: {response.status_code}")
    except Exception as e:
        print(f"   Connection error: {e}")
        return
    
    # Step 2: Collect historical data (simulate multiple time points)
    print("\n2. Collecting historical market data...")
    for i in range(5):
        print(f"   Collecting snapshot {i+1}/5...")
        try:
            response = requests.post(f"{BASE_URL}/collect-historical-data")
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Snapshot {i+1}: {result['total_snapshots']} total snapshots")
            else:
                print(f"   ❌ Error: {response.status_code}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Wait a bit between collections (simulate time passing)
        if i < 4:
            time.sleep(1)
    
    # Step 3: Check data status after collection
    print("\n3. Checking data status after collection...")
    try:
        response = requests.get(f"{BASE_URL}/historical-data-status")
        if response.status_code == 200:
            status = response.json()
            print(f"   Status: {status['status']}")
            print(f"   Snapshots collected: {status['snapshots_collected']}")
            print(f"   Tokens tracked: {status['tokens_tracked']}")
            print(f"   Training ready: {status['training_ready']}")
            print(f"   Data quality: {status['data_quality']}")
        else:
            print(f"   Error: {response.status_code}")
    except Exception as e:
        print(f"   Error: {e}")
    
    # Step 4: Train model with historical data
    print("\n4. Training AI model with collected historical data...")
    try:
        response = requests.post(f"{BASE_URL}/train-model")
        if response.status_code == 200:
            result = response.json()
            print(f"   ✅ Training successful!")
            print(f"   Training samples: {result['training_samples']}")
            print(f"   Features used: {result['features_used']}")
            print(f"   Data quality: {result['data_quality']}")
            print(f"   Historical snapshots: {result['historical_snapshots_used']}")
        else:
            error = response.json()
            print(f"   ❌ Training failed: {error['message']}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Step 5: Test strategy recommendation with trained model
    print("\n5. Testing strategy recommendation with trained model...")
    try:
        response = requests.post(f"{BASE_URL}/strategy-recommendation", 
                                headers={'Content-Type': 'application/json'}, 
                                json={})
        if response.status_code == 200:
            strategy = response.json()
            print(f"   ✅ Strategy generated!")
            print(f"   Strategy: {strategy['strategy']}")
            print(f"   Confidence: {strategy['confidence']}")
            print(f"   Reasoning: {strategy['recommendation']['reasoning']}")
            print(f"   AI powered: {strategy['ai_powered']}")
        else:
            error = response.json()
            print(f"   ❌ Strategy failed: {error['message']}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 60)
    print("🎉 Historical Data Collection Test Complete!")
    print("\n💡 Key Benefits:")
    print("   • Real time-series data collection")
    print("   • Technical indicators calculation")
    print("   • Proper AI training with historical patterns")
    print("   • No more static mock data")

if __name__ == "__main__":
    test_historical_data_collection()

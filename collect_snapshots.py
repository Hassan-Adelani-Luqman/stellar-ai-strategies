#!/usr/bin/env python3
"""
Quick script to collect 5 historical data snapshots for AI training
"""

import requests
import time
import json

BASE_URL = "http://localhost:5000/api/ai"

def collect_snapshots(count=5):
    print(f"🚀 Collecting {count} historical data snapshots for AI training")
    print("=" * 60)
    
    for i in range(count):
        print(f"\n📊 Collecting snapshot {i+1}/{count}...")
        
        try:
            response = requests.post(f"{BASE_URL}/collect-historical-data")
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Success! Total snapshots: {result['total_snapshots']}")
                print(f"   📈 Tokens tracked: {result['tokens_being_tracked']}")
            else:
                error = response.json()
                print(f"   ❌ Error: {error['message']}")
                
        except Exception as e:
            print(f"   ❌ Connection error: {e}")
            
        # Wait a bit between collections (simulate time passing)
        if i < count - 1:
            print("   ⏳ Waiting 2 seconds...")
            time.sleep(2)
    
    print(f"\n🎉 Collection complete! Now you can train the AI model.")
    print("💡 Tip: Click 'Train Model' button in the dashboard to train with this data.")

if __name__ == "__main__":
    collect_snapshots()

#!/usr/bin/env python3
"""
Fetch real datasets from online sources - Run this on your system with internet
"""

import pandas as pd
import requests
import os
import sys
from io import StringIO
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# Known public dataset URLs to try
DATASET_URLS = [
    # Room Climate Dataset
    {
        'name': 'Room Climate Dataset',
        'urls': [
            'https://raw.githubusercontent.com/IoTsec/Room-Climate-Datasets/main/data/temperature_data.csv',
            'https://raw.githubusercontent.com/IoTsec/Room-Climate-Datasets/main/data/climate_data.csv',
        ],
        'temp_col': 'temperature',
        'time_col': 'timestamp'
    },
    # Add more known datasets here
]

def fetch_from_url(url, timeout=30):
    """Fetch CSV from URL"""
    try:
        print(f"  Fetching: {url}")
        response = requests.get(url, timeout=timeout)
        if response.status_code == 200:
            df = pd.read_csv(StringIO(response.text))
            print(f"  ✓ Success! {len(df)} rows")
            return df
        else:
            print(f"  ✗ HTTP {response.status_code}")
    except Exception as e:
        print(f"  ✗ Error: {e}")
    return None

def transform_to_server_format(df, temp_col=None, time_col=None):
    """Transform any temperature dataset to server format"""
    if df is None or df.empty:
        return None
    
    print(f"  Transforming {len(df)} rows...")
    print(f"  Columns: {list(df.columns)[:10]}")
    
    # Auto-detect columns
    if temp_col is None:
        temp_cols = [c for c in df.columns if 'temp' in c.lower()]
        temp_col = temp_cols[0] if temp_cols else None
    
    if time_col is None:
        time_cols = [c for c in df.columns if any(x in c.lower() for x in ['time', 'date', 'timestamp'])]
        time_col = time_cols[0] if time_cols else None
    
    if not temp_col:
        print("  ✗ No temperature column found")
        return None
    
    # Build transformed dataframe
    result = pd.DataFrame()
    
    # Timestamp
    if time_col:
        result['timestamp'] = pd.to_datetime(df[time_col], errors='coerce')
    else:
        # Generate timestamps
        start = datetime.now() - pd.Timedelta(days=len(df)/144)
        result['timestamp'] = pd.date_range(start=start, periods=len(df), freq='10min')
    
    result = result.dropna(subset=['timestamp'])
    
    # Temperature
    temps = pd.to_numeric(df[temp_col], errors='coerce')
    
    # Convert Celsius to Fahrenheit if needed
    if temps.max() > 50:
        temps = (temps * 9/5) + 32
        print("  Converted Celsius to Fahrenheit")
    
    result['temperature'] = temps
    result = result.dropna(subset=['temperature'])
    
    # Filter to server range
    result = result[(result['temperature'] >= 50) & (result['temperature'] <= 120)]
    
    # Server areas
    result['server_area'] = (result.index % 24).astype(int)
    
    # Time features
    result['time_of_day'] = result['timestamp'].dt.hour
    result['day_of_week'] = result['timestamp'].dt.weekday
    
    # Final format
    final = result[['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week']].copy()
    final = final.sort_values('timestamp').reset_index(drop=True)
    
    print(f"  ✓ Transformed to {len(final)} records")
    return final

def merge_data(new_data, output_file='data/heat_spikes.csv'):
    """Merge with existing data"""
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), output_file)
    
    if os.path.exists(output_path):
        existing = pd.read_csv(output_path)
        existing['timestamp'] = pd.to_datetime(existing['timestamp'])
        print(f"\n  Existing data: {len(existing):,} records")
        
        new_data['timestamp'] = pd.to_datetime(new_data['timestamp'])
        combined = pd.concat([existing, new_data], ignore_index=True)
        combined = combined.drop_duplicates(subset=['timestamp', 'server_area'], keep='last')
        combined = combined.sort_values('timestamp').reset_index(drop=True)
    else:
        combined = new_data
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    combined.to_csv(output_path, index=False)
    
    return combined

def main():
    print("=" * 70)
    print("Fetching Real Datasets from Online Sources")
    print("=" * 70)
    print()
    
    fetched_count = 0
    
    # Try known datasets
    for dataset in DATASET_URLS:
        print(f"\nTrying: {dataset['name']}")
        for url in dataset['urls']:
            df = fetch_from_url(url)
            if df is not None:
                transformed = transform_to_server_format(df, 
                                                      temp_col=dataset.get('temp_col'),
                                                      time_col=dataset.get('time_col'))
                if transformed is not None:
                    final = merge_data(transformed)
                    print(f"\n✓ Integrated {dataset['name']}")
                    print(f"  Total records now: {len(final):,}")
                    fetched_count += 1
                    break
    
    # Also try user-provided URLs
    print("\n" + "=" * 70)
    print("Custom Dataset Fetch")
    print("=" * 70)
    print("\nEnter CSV URLs to fetch (one per line, empty to finish):")
    
    urls = []
    while True:
        url = input("URL (or Enter to finish): ").strip()
        if not url:
            break
        urls.append(url)
    
    for url in urls:
        print(f"\nFetching: {url}")
        df = fetch_from_url(url)
        if df is not None:
            transformed = transform_to_server_format(df)
            if transformed is not None:
                final = merge_data(transformed)
                print(f"✓ Integrated! Total: {len(final):,} records")
                fetched_count += 1
    
    print("\n" + "=" * 70)
    if fetched_count > 0:
        print(f"✓ Successfully integrated {fetched_count} dataset(s)")
    else:
        print("No datasets fetched. Using existing data.")
    print("=" * 70)

if __name__ == '__main__':
    main()


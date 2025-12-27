"""
Fetch from specific real public data sources
"""

import pandas as pd
import requests
import os
import sys
from io import StringIO
from datetime import datetime, timedelta
import numpy as np

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

def fetch_room_climate_data():
    """Fetch Room Climate dataset from GitHub"""
    urls = [
        'https://raw.githubusercontent.com/IoTsec/Room-Climate-Datasets/main/data/temperature_data.csv',
        'https://raw.githubusercontent.com/IoTsec/Room-Climate-Datasets/main/data/climate_data.csv',
        'https://raw.githubusercontent.com/IoTsec/Room-Climate-Datasets/main/README.md',  # Check what files exist
    ]
    
    for url in urls:
        try:
            response = requests.get(url, timeout=15)
            if response.status_code == 200:
                if url.endswith('.csv'):
                    df = pd.read_csv(StringIO(response.text))
                    print(f"✓ Fetched Room Climate data: {len(df)} rows")
                    return df, url
                else:
                    # README - check for data file names
                    print(f"Found repository info")
        except Exception as e:
            continue
    
    return None, None

def transform_room_climate_to_server_data(df):
    """Transform room climate data to server temperature format"""
    if df is None or df.empty:
        return None
    
    print("Transforming room climate data to server format...")
    print(f"Original columns: {list(df.columns)}")
    
    # Try to find temperature column
    temp_cols = [c for c in df.columns if 'temp' in c.lower() or 'temperature' in c.lower()]
    time_cols = [c for c in df.columns if 'time' in c.lower() or 'date' in c.lower() or 'timestamp' in c.lower()]
    
    if not temp_cols:
        print("No temperature column found")
        return None
    
    temp_col = temp_cols[0]
    time_col = time_cols[0] if time_cols else None
    
    # Create transformed dataframe
    transformed = pd.DataFrame()
    
    # Parse timestamp
    if time_col:
        transformed['timestamp'] = pd.to_datetime(df[time_col], errors='coerce')
    else:
        # Generate timestamps
        start = datetime.now() - timedelta(days=len(df)/144)
        transformed['timestamp'] = pd.date_range(start=start, periods=len(df), freq='10min')
    
    transformed = transformed.dropna(subset=['timestamp'])
    
    # Get temperature
    temps = pd.to_numeric(df[temp_col], errors='coerce')
    
    # Convert to Fahrenheit if needed (assuming Celsius if > 50)
    if temps.max() > 50:
        temps = (temps * 9/5) + 32  # Celsius to Fahrenheit
        print("  Converted from Celsius to Fahrenheit")
    
    transformed['temperature'] = temps
    transformed = transformed.dropna(subset=['temperature'])
    
    # Filter to server temperature range
    transformed = transformed[(transformed['temperature'] >= 50) & (transformed['temperature'] <= 120)]
    
    # Assign server areas (distribute across 24 servers)
    transformed['server_area'] = (transformed.index % 24).astype(int)
    
    # Add time features
    transformed['time_of_day'] = transformed['timestamp'].dt.hour
    transformed['day_of_week'] = transformed['timestamp'].dt.weekday
    
    # Select and reorder columns
    result = transformed[['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week']].copy()
    result = result.sort_values('timestamp').reset_index(drop=True)
    
    print(f"✓ Transformed to {len(result)} records")
    return result

def merge_with_existing(new_data, output_file='data/heat_spikes.csv'):
    """Merge new data with existing"""
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), output_file)
    
    if os.path.exists(output_path):
        existing = pd.read_csv(output_path)
        existing['timestamp'] = pd.to_datetime(existing['timestamp'])
        print(f"Existing data: {len(existing):,} records")
        
        new_data['timestamp'] = pd.to_datetime(new_data['timestamp'])
        
        # Combine
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
    print("Fetching Real Datasets from Public Sources")
    print("=" * 70)
    print()
    
    # Try Room Climate dataset
    print("1. Fetching Room Climate Dataset from GitHub...")
    room_df, source_url = fetch_room_climate_data()
    
    if room_df is not None:
        print(f"   Source: {source_url}")
        transformed = transform_room_climate_to_server_data(room_df)
        
        if transformed is not None and not transformed.empty:
            print("\n2. Integrating into system...")
            final_df = merge_with_existing(transformed)
            
            print(f"\n✓ Integration Complete!")
            print(f"  Total records: {len(final_df):,}")
            print(f"  Date range: {final_df['timestamp'].min()} to {final_df['timestamp'].max()}")
            print(f"  Temperature: {final_df['temperature'].min():.1f}°F to {final_df['temperature'].max():.1f}°F")
            print(f"  Heat spikes: {len(final_df[final_df['temperature'] > 85]):,}")
            return
    
    print("\n2. Using comprehensive generated data (realistic patterns)...")
    from fetch_and_integrate import fetch_sample_monitoring_data, transform_and_merge
    
    monitoring_df = fetch_sample_monitoring_data()
    if monitoring_df is not None:
        final_df = transform_and_merge(monitoring_df)
        print(f"\n✓ Data ready: {len(final_df):,} records")

if __name__ == '__main__':
    main()


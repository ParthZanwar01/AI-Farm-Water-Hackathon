"""
Fetch real datasets from specific online sources
Pre-configured with known dataset URLs
"""

import pandas as pd
import requests
import os
import sys
from io import StringIO
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

def fetch_unicef_heat_data():
    """
    Fetch UNICEF heatwave data from GitHub
    Can be adapted for server temperature patterns
    """
    try:
        url = "https://raw.githubusercontent.com/unicef/heat/main/data/heatwave_indicators.csv"
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            df = pd.read_csv(StringIO(response.text))
            print(f"✓ Fetched UNICEF data: {len(df)} rows")
            return df
    except Exception as e:
        print(f"Error fetching UNICEF data: {e}")
    return None

def fetch_github_csv(repo_owner, repo_name, file_path, branch='main'):
    """
    Fetch CSV from GitHub repository
    """
    try:
        url = f"https://raw.githubusercontent.com/{repo_owner}/{repo_name}/{branch}/{file_path}"
        print(f"Fetching from: {url}")
        response = requests.get(url, timeout=30)
        
        if response.status_code == 200:
            df = pd.read_csv(StringIO(response.text))
            print(f"✓ Fetched {len(df)} rows from GitHub")
            return df
        else:
            print(f"Error: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")
    return None

def search_kaggle_datasets():
    """
    List of Kaggle datasets to search for
    Returns instructions for manual download
    """
    datasets = [
        {
            'name': 'Server Temperature Monitoring',
            'search': 'server temperature monitoring',
            'url': 'https://www.kaggle.com/datasets?search=server+temperature'
        },
        {
            'name': 'IoT Sensor Data',
            'search': 'IoT sensor temperature',
            'url': 'https://www.kaggle.com/datasets?search=IoT+sensor'
        },
        {
            'name': 'Data Center Monitoring',
            'search': 'data center monitoring',
            'url': 'https://www.kaggle.com/datasets?search=data+center'
        }
    ]
    
    print("\nKaggle Datasets to Explore:")
    for ds in datasets:
        print(f"  - {ds['name']}: {ds['url']}")
    
    return datasets

def fetch_sample_iot_data():
    """
    Fetch sample IoT/sensor data from public sources
    Many IoT platforms have public data feeds
    """
    # Example public IoT data sources:
    sources = [
        "https://thingspeak.com/channels/public",
        "https://io.adafruit.com/feeds/public",
    ]
    
    print("\nPublic IoT Data Sources:")
    for source in sources:
        print(f"  - {source}")
    print("\nNote: You'll need to find specific channel/feed IDs")
    
    return None

def transform_weather_to_server_data(df, temp_column='temperature'):
    """
    Transform weather/climate data to server-like patterns
    Useful for using climate datasets as proxy
    """
    if df is None or df.empty:
        return None
    
    print("Transforming weather data to server temperature patterns...")
    
    # Scale temperatures to server range (65-100°F)
    if temp_column in df.columns:
        temps = pd.to_numeric(df[temp_column], errors='coerce')
        # Normalize to server temperature range
        min_temp = temps.min()
        max_temp = temps.max()
        
        # Map to 65-100°F range (typical server temps)
        normalized = 65 + ((temps - min_temp) / (max_temp - min_temp)) * 35
        
        df['temperature'] = normalized
        df['server_area'] = (df.index % 24)  # Distribute across 24 servers
        
        # Add timestamp if missing
        if 'timestamp' not in df.columns:
            if 'date' in df.columns or 'time' in df.columns:
                time_col = 'date' if 'date' in df.columns else 'time'
                df['timestamp'] = pd.to_datetime(df[time_col], errors='coerce')
            else:
                # Generate timestamps
                start = datetime.now() - pd.Timedelta(days=len(df)/144)  # Assume 10-min intervals
                df['timestamp'] = pd.date_range(start=start, periods=len(df), freq='10min')
        
        df['time_of_day'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.weekday
        
        return df[['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week']]
    
    return None

def main():
    """Main function to fetch and process datasets"""
    print("=" * 70)
    print("Fetch Real Heat Spike Datasets from Online Sources")
    print("=" * 70)
    print()
    
    datasets_found = []
    
    # Option 1: Try specific GitHub repositories
    print("1. Trying known GitHub repositories...")
    print()
    
    # Example: Try common open-source monitoring data repos
    github_sources = [
        # Add specific repos here when found
        # {'owner': 'user', 'repo': 'repo-name', 'path': 'data/temps.csv'}
    ]
    
    for source in github_sources:
        df = fetch_github_csv(source['owner'], source['repo'], source['path'])
        if df is not None:
            datasets_found.append(df)
    
    # Option 2: Search instructions
    print("\n2. Search for datasets manually:")
    print()
    search_kaggle_datasets()
    fetch_sample_iot_data()
    
    # Option 3: Use automated realistic data
    print("\n" + "=" * 70)
    print("3. Generating realistic data based on real-world patterns...")
    print("   (This simulates what real server monitoring data looks like)")
    print()
    
    from fetch_data_auto import fetch_sample_public_data
    realistic_df = fetch_sample_public_data()
    
    if realistic_df is not None:
        # Save the data
        output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'heat_spikes.csv')
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Merge with existing
        if os.path.exists(output_path):
            existing = pd.read_csv(output_path)
            existing['timestamp'] = pd.to_datetime(existing['timestamp'])
            realistic_df['timestamp'] = pd.to_datetime(realistic_df['timestamp'])
            
            combined = pd.concat([existing, realistic_df], ignore_index=True)
            combined = combined.drop_duplicates(subset=['timestamp', 'server_area'], keep='last')
            combined = combined.sort_values('timestamp').reset_index(drop=True)
            realistic_df = combined
        
        realistic_df.to_csv(output_path, index=False)
        
        print(f"\n✓ Saved {len(realistic_df)} records")
        print(f"  Date range: {realistic_df['timestamp'].min()} to {realistic_df['timestamp'].max()}")
        print(f"  Temperature range: {realistic_df['temperature'].min():.1f}°F to {realistic_df['temperature'].max():.1f}°F")
        print(f"  Heat spikes (>85°F): {len(realistic_df[realistic_df['temperature'] > 85])} records")
    
    print("\n" + "=" * 70)
    print("Next Steps:")
    print("=" * 70)
    print("1. Search Kaggle: https://www.kaggle.com/datasets?search=server+temperature")
    print("2. Search GitHub: https://github.com/search?q=server+temperature+data+csv")
    print("3. Check IoT platforms: Thingspeak, Adafruit IO public feeds")
    print("4. Use the generated realistic data (already saved)")
    print()
    print("To fetch from a specific URL, use:")
    print("  python scripts/fetch_online_data.py")

if __name__ == '__main__':
    main()


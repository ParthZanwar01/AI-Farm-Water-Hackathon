"""
Fetch real heat spike data from online sources
Supports multiple data sources and formats
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import requests
import os
import sys
from io import StringIO
import json

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

def fetch_kaggle_dataset(dataset_name, file_name=None):
    """
    Fetch dataset from Kaggle (requires kaggle API)
    Install: pip install kaggle
    Setup: Place kaggle.json in ~/.kaggle/
    """
    try:
        from kaggle.api.kaggle_api_extended import KaggleApi
        api = KaggleApi()
        api.authenticate()
        
        # Download dataset
        api.dataset_download_files(dataset_name, unzip=True, path='./temp_data')
        
        # Find CSV files
        csv_files = [f for f in os.listdir('./temp_data') if f.endswith('.csv')]
        if csv_files:
            file_path = os.path.join('./temp_data', csv_files[0] if not file_name else file_name)
            df = pd.read_csv(file_path)
            return df
    except ImportError:
        print("Kaggle API not installed. Install with: pip install kaggle")
    except Exception as e:
        print(f"Error fetching Kaggle dataset: {e}")
    return None

def fetch_public_api_data():
    """
    Fetch data from public APIs that provide temperature/monitoring data
    """
    data_points = []
    
    # Example: Using a mock API endpoint (replace with real API)
    # Many IoT/monitoring platforms have public APIs
    
    try:
        # Option 1: Use a public sensor data API
        # Example: Thingspeak, Adafruit IO, or similar
        # response = requests.get('https://api.example.com/temperature', timeout=10)
        # if response.status_code == 200:
        #     data = response.json()
        #     # Process data...
        
        # For now, we'll simulate fetching from a public dataset URL
        print("Note: Replace this with actual API endpoints")
        
    except Exception as e:
        print(f"Error fetching from API: {e}")
    
    return pd.DataFrame(data_points) if data_points else None

def fetch_github_dataset(repo_url, file_path):
    """
    Fetch CSV dataset from GitHub repository
    """
    try:
        # Convert GitHub URL to raw content URL
        if 'github.com' in repo_url:
            raw_url = repo_url.replace('github.com', 'raw.githubusercontent.com')
            if '/blob/' in raw_url:
                raw_url = raw_url.replace('/blob/', '/')
            
            file_url = f"{raw_url}/{file_path}"
            response = requests.get(file_url, timeout=30)
            
            if response.status_code == 200:
                df = pd.read_csv(StringIO(response.text))
                print(f"✓ Fetched dataset from GitHub: {len(df)} rows")
                return df
            else:
                print(f"Error: Could not fetch file (Status {response.status_code})")
    except Exception as e:
        print(f"Error fetching from GitHub: {e}")
    
    return None

def fetch_public_datasets():
    """
    Fetch from publicly available datasets
    """
    datasets = []
    
    # Example public datasets (you can add more)
    public_sources = [
        {
            'name': 'UCI Machine Learning - Server Data',
            'url': 'https://archive.ics.uci.edu/ml/datasets.php',
            'note': 'Search for temperature or server monitoring datasets'
        }
    ]
    
    # Try to fetch from common public data sources
    # You can add specific dataset URLs here
    
    return datasets

def transform_to_project_format(df, server_area_column=None, temperature_column=None, timestamp_column=None):
    """
    Transform external dataset to match project format:
    - timestamp
    - server_area (0-23)
    - temperature
    - time_of_day
    - day_of_week
    """
    if df is None or df.empty:
        return None
    
    print(f"Transforming dataset: {len(df)} rows, {len(df.columns)} columns")
    print(f"Columns: {list(df.columns)}")
    
    # Try to auto-detect columns
    if timestamp_column is None:
        timestamp_cols = [c for c in df.columns if 'time' in c.lower() or 'date' in c.lower() or 'timestamp' in c.lower()]
        timestamp_column = timestamp_cols[0] if timestamp_cols else None
    
    if temperature_column is None:
        temp_cols = [c for c in df.columns if 'temp' in c.lower() or 'temperature' in c.lower() or 'thermal' in c.lower()]
        temperature_column = temp_cols[0] if temp_cols else None
    
    if server_area_column is None:
        area_cols = [c for c in df.columns if 'server' in c.lower() or 'area' in c.lower() or 'id' in c.lower() or 'node' in c.lower()]
        server_area_column = area_cols[0] if area_cols else None
    
    if not timestamp_column or not temperature_column:
        print("Error: Could not auto-detect required columns")
        print("Please specify: timestamp_column, temperature_column, server_area_column")
        return None
    
    # Transform data
    transformed = pd.DataFrame()
    
    # Parse timestamp
    transformed['timestamp'] = pd.to_datetime(df[timestamp_column], errors='coerce')
    transformed = transformed.dropna(subset=['timestamp'])
    
    # Map temperature
    transformed['temperature'] = pd.to_numeric(df[temperature_column], errors='coerce')
    transformed = transformed.dropna(subset=['temperature'])
    
    # Map server area (normalize to 0-23)
    if server_area_column:
        areas = pd.to_numeric(df[server_area_column], errors='coerce')
        # Normalize to 0-23 range
        if areas.max() > 23 or areas.min() < 0:
            areas = (areas % 24).astype(int)
        transformed['server_area'] = areas
    else:
        # Assign random server areas if not specified
        transformed['server_area'] = np.random.randint(0, 24, len(transformed))
    
    # Add time features
    transformed['time_of_day'] = transformed['timestamp'].dt.hour
    transformed['day_of_week'] = transformed['timestamp'].dt.weekday
    
    # Filter to reasonable temperature range (50-120°F for servers)
    transformed = transformed[(transformed['temperature'] >= 50) & (transformed['temperature'] <= 120)]
    
    # Sort by timestamp
    transformed = transformed.sort_values('timestamp').reset_index(drop=True)
    
    print(f"✓ Transformed to {len(transformed)} records")
    return transformed[['timestamp', 'server_area', 'temperature', 'time_of_day', 'day_of_week']]

def fetch_from_url(csv_url):
    """
    Fetch CSV directly from URL
    """
    try:
        print(f"Fetching data from: {csv_url}")
        response = requests.get(csv_url, timeout=30)
        
        if response.status_code == 200:
            df = pd.read_csv(StringIO(response.text))
            print(f"✓ Fetched {len(df)} rows from URL")
            return df
        else:
            print(f"Error: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error fetching from URL: {e}")
    
    return None

def merge_with_existing_data(new_data, existing_file='data/heat_spikes.csv'):
    """
    Merge new data with existing heat_spikes.csv
    """
    existing_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), existing_file)
    
    if os.path.exists(existing_path):
        existing_df = pd.read_csv(existing_path)
        existing_df['timestamp'] = pd.to_datetime(existing_df['timestamp'])
        print(f"Existing data: {len(existing_df)} records")
        
        # Combine
        combined = pd.concat([existing_df, new_data], ignore_index=True)
        combined = combined.drop_duplicates(subset=['timestamp', 'server_area'], keep='last')
        combined = combined.sort_values('timestamp').reset_index(drop=True)
        
        print(f"Combined data: {len(combined)} records")
        return combined
    else:
        print("No existing data file found, using new data only")
        return new_data

def save_data(df, output_file='data/heat_spikes.csv'):
    """
    Save transformed data to CSV
    """
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), output_file)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    df.to_csv(output_path, index=False)
    print(f"✓ Saved {len(df)} records to {output_path}")

def main():
    """
    Main function to fetch and process online data
    """
    print("=" * 60)
    print("Fetch Heat Spike Data from Online Sources")
    print("=" * 60)
    print()
    
    # Option 1: Fetch from URL
    print("Option 1: Fetch from CSV URL")
    print("Enter a CSV URL (or press Enter to skip):")
    csv_url = input().strip()
    
    df = None
    if csv_url:
        df = fetch_from_url(csv_url)
        if df is not None:
            df = transform_to_project_format(df)
    
    # Option 2: Fetch from GitHub
    if df is None or df.empty:
        print("\nOption 2: Fetch from GitHub")
        print("Enter GitHub repo URL (or press Enter to skip):")
        repo_url = input().strip()
        if repo_url:
            print("Enter file path in repo (e.g., data/temperature.csv):")
            file_path = input().strip()
            if file_path:
                df = fetch_github_dataset(repo_url, file_path)
                if df is not None:
                    df = transform_to_project_format(df)
    
    # Option 3: Manual column mapping
    if df is None or df.empty:
        print("\nOption 3: Manual CSV Upload")
        print("Enter path to local CSV file (or press Enter to skip):")
        file_path = input().strip()
        if file_path and os.path.exists(file_path):
            df = pd.read_csv(file_path)
            print(f"Loaded {len(df)} rows")
            print(f"Columns: {list(df.columns)}")
            print("\nEnter column names:")
            timestamp_col = input("Timestamp column: ").strip() or None
            temp_col = input("Temperature column: ").strip() or None
            area_col = input("Server area column (optional): ").strip() or None
            
            df = transform_to_project_format(df, 
                                           timestamp_column=timestamp_col,
                                           temperature_column=temp_col,
                                           server_area_column=area_col)
    
    # Save data
    if df is not None and not df.empty:
        print("\n" + "=" * 60)
        print("Merging with existing data...")
        combined_df = merge_with_existing_data(df)
        save_data(combined_df)
        print("\n✓ Data fetch complete!")
        print(f"Total records: {len(combined_df)}")
        print(f"Date range: {combined_df['timestamp'].min()} to {combined_df['timestamp'].max()}")
    else:
        print("\nNo data fetched. Using existing data or synthetic generation.")

if __name__ == '__main__':
    main()


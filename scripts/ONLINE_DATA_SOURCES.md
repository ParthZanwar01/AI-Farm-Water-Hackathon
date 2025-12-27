# Online Data Sources for Heat Spikes

## Quick Fetch (Automated)

Run the automated script to fetch realistic data:

```bash
python scripts/fetch_data_auto.py
```

This generates realistic heat spike data based on real-world server room patterns.

## Manual Fetch (Interactive)

For more control, use the interactive script:

```bash
python scripts/fetch_online_data.py
```

This allows you to:
- Enter CSV URLs
- Fetch from GitHub repositories
- Upload local CSV files
- Map columns manually

## Public Data Sources

### 1. Kaggle Datasets
Search for:
- "server temperature"
- "data center monitoring"
- "thermal data"
- "IoT sensor data"

**To use Kaggle:**
```bash
pip install kaggle
# Place kaggle.json in ~/.kaggle/
python scripts/fetch_online_data.py
# Select Kaggle option
```

### 2. GitHub Repositories
Many open-source projects share monitoring data:
- Search GitHub for "server temperature data"
- Look for CSV files in repositories
- Use the GitHub fetch option in the script

### 3. Public APIs
- **Thingspeak**: Public IoT data channels
- **Adafruit IO**: Public feeds
- **OpenWeatherMap**: Can correlate with ambient temperature
- **Custom APIs**: Many data centers publish anonymized data

### 4. UCI Machine Learning Repository
- https://archive.ics.uci.edu/ml/datasets.php
- Search for "temperature" or "monitoring"

### 5. Data.gov
- US government open data
- May have data center efficiency datasets

## Data Format Requirements

Your data should have (or be mappable to):
- **timestamp**: DateTime of measurement
- **temperature**: Temperature value (Fahrenheit)
- **server_area**: Server ID (0-23, or will be normalized)

Optional columns that help:
- server_id, node_id, area_id
- time, date, datetime
- temp, thermal, temperature

## Example URLs

You can fetch directly from URLs:
```bash
python scripts/fetch_online_data.py
# Enter CSV URL when prompted
```

Example formats:
- `https://raw.githubusercontent.com/user/repo/main/data/temps.csv`
- `https://example.com/api/export?format=csv`
- Direct CSV file URLs

## Integration

Once fetched, the data is automatically:
- Merged with existing `data/heat_spikes.csv`
- Formatted to match project structure
- Ready for ML model training

The model will automatically use the new data on next training!


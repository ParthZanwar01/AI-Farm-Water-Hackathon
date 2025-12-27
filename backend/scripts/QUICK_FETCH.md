# Quick Guide: Fetch Online Heat Spike Data

## Easiest Option: Automated Realistic Data

```bash
python scripts/fetch_data_auto.py
```

This generates **30 days of realistic heat spike data** based on real-world patterns:
- Business hours patterns (higher temps 9 AM - 5 PM)
- Afternoon peaks (2 PM - 4 PM)
- Weekend variations
- Vulnerable server patterns
- Heat diffusion effects

## Fetch from Real Sources

### Option 1: CSV URL
```bash
python scripts/fetch_online_data.py
# When prompted, enter a CSV URL
# Example: https://raw.githubusercontent.com/user/repo/data/temps.csv
```

### Option 2: GitHub Repository
```bash
python scripts/fetch_online_data.py
# Enter GitHub repo URL
# Enter file path in repo
```

### Option 3: Local CSV File
```bash
python scripts/fetch_online_data.py
# Enter path to your CSV file
# Map columns when prompted
```

## Data Sources to Try

1. **Kaggle**: Search for "server temperature" datasets
2. **GitHub**: Search for "temperature monitoring data"
3. **Public APIs**: Thingspeak, Adafruit IO public feeds
4. **UCI ML Repo**: https://archive.ics.uci.edu/ml/datasets.php

## After Fetching

The data is automatically:
- ✅ Merged with existing data
- ✅ Formatted correctly
- ✅ Ready for ML training

Just retrain the model:
```bash
# In the app, click "Retrain Model" button
# Or via API: POST /api/model/retrain
```


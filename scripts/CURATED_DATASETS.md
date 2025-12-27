# Curated Dataset Sources for Server Temperature Data

## ✅ Ready-to-Use Datasets

### 1. Kaggle (Best Source)

**Direct Search Links:**
- **Server Temperature**: https://www.kaggle.com/datasets?search=server+temperature
- **Data Center Monitoring**: https://www.kaggle.com/datasets?search=data+center+monitoring  
- **IoT Sensor Data**: https://www.kaggle.com/datasets?search=IoT+sensor+temperature
- **Server Room**: https://www.kaggle.com/datasets?search=server+room+monitoring

**How to Use:**
1. Sign up for free Kaggle account
2. Search using links above
3. Download CSV files
4. Run: `python scripts/fetch_online_data.py`
5. Enter the CSV file path when prompted

### 2. GitHub Repositories

**Search GitHub:**
- https://github.com/search?q=server+temperature+data+filetype:csv
- https://github.com/search?q=data+center+monitoring+csv
- https://github.com/search?q=IoT+sensor+temperature+monitoring

**Common Repos to Check:**
- Look for repos with "monitoring", "sensor-data", "iot-data"
- Many include sample CSV files in `/data` folders

**How to Use:**
```bash
python scripts/fetch_online_data.py
# Select "GitHub Repository" option
# Enter: owner/repo-name
# Enter: path/to/file.csv
```

### 3. Public IoT Platforms

**Thingspeak Public Channels:**
- https://thingspeak.com/channels/public
- Search for "temperature" or "server"
- Export channel data as CSV

**Adafruit IO Public Feeds:**
- https://io.adafruit.com/feeds/public
- Search for temperature feeds
- Export as CSV

### 4. UCI Machine Learning Repository

**Search:**
- https://archive.ics.uci.edu/ml/datasets.php
- Search terms: "temperature", "monitoring", "sensor"

**Known Relevant Datasets:**
- Search for "IoT", "sensor", "monitoring" datasets
- Many include temperature/time-series data

### 5. Data.gov (US Government)

**Search:**
- https://catalog.data.gov/dataset?q=temperature+monitoring
- May have data center efficiency datasets

## Quick Fetch Commands

### Fetch from CSV URL:
```bash
python scripts/fetch_online_data.py
# Enter CSV URL when prompted
```

### Fetch from GitHub:
```bash
python scripts/fetch_online_data.py
# Select GitHub option
# Enter: owner/repo-name
# Enter: data/file.csv
```

### Use Local CSV:
```bash
python scripts/fetch_online_data.py
# Enter local file path
# Map columns when prompted
```

## Recommended Search Strategy

1. **Start with Kaggle** - Most likely to have server monitoring data
2. **Check GitHub** - Many open-source projects share data
3. **Try IoT Platforms** - Real-time sensor data
4. **Use Generated Data** - Already have realistic patterns

## Data Format

The scripts automatically handle:
- ✅ Column mapping
- ✅ Timestamp parsing
- ✅ Server area normalization (0-23)
- ✅ Temperature filtering (50-120°F)
- ✅ Merging with existing data

## Example: Using Kaggle Dataset

1. Go to: https://www.kaggle.com/datasets?search=server+temperature
2. Find a dataset (e.g., "Server Room Temperature Monitoring")
3. Download the CSV
4. Run: `python scripts/fetch_online_data.py`
5. Enter the CSV file path
6. Map columns if needed
7. Done! Data is ready for ML training


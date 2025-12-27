# How to Find Real Heat Spike Datasets

## 🎯 Best Places to Find Server Temperature Data

### 1. Kaggle (Most Likely to Have Real Data)

**Direct Search URLs:**
- https://www.kaggle.com/datasets?search=server+temperature
- https://www.kaggle.com/datasets?search=data+center+monitoring
- https://www.kaggle.com/datasets?search=IoT+sensor+temperature
- https://www.kaggle.com/datasets?search=server+room+thermal

**Steps:**
1. Sign up (free)
2. Search using links above
3. Download CSV files
4. Use `fetch_online_data.py` to import

### 2. GitHub (Open Source Data)

**Search URLs:**
- https://github.com/search?q=server+temperature+data+filetype:csv
- https://github.com/search?q=data+center+monitoring+csv
- https://github.com/search?q=IoT+sensor+temperature

**What to Look For:**
- Repos with "monitoring", "sensor-data", "iot-data"
- Files in `/data` folders
- CSV files with temperature/time columns

### 3. Public IoT Platforms

**Thingspeak:**
- https://thingspeak.com/channels/public
- Search for "temperature" channels
- Export as CSV

**Adafruit IO:**
- https://io.adafruit.com/feeds/public
- Look for temperature feeds
- Export data

### 4. UCI ML Repository

- https://archive.ics.uci.edu/ml/datasets.php
- Search: "temperature", "monitoring", "sensor", "IoT"

### 5. Data.gov

- https://catalog.data.gov/dataset?q=temperature+monitoring
- US government open data

## 📥 How to Use Found Datasets

### Option A: CSV URL
```bash
python scripts/fetch_online_data.py
# Enter CSV URL when prompted
```

### Option B: GitHub Repo
```bash
python scripts/fetch_online_data.py
# Select GitHub option
# Enter: owner/repo-name
# Enter: path/to/file.csv
```

### Option C: Local File
```bash
python scripts/fetch_online_data.py
# Enter local CSV path
# Map columns when prompted
```

## 🔍 What to Look For

Your dataset should have (or be mappable to):
- **Timestamp/Date** - When measurement was taken
- **Temperature** - Temperature value
- **Server/Area ID** - Which server (optional, will be auto-assigned)

The script automatically:
- ✅ Maps columns
- ✅ Normalizes server areas to 0-23
- ✅ Filters to reasonable temps (50-120°F)
- ✅ Merges with existing data

## 💡 Quick Start

**Right Now (No Internet Needed):**
```bash
python scripts/fetch_data_auto.py
```
This generates 30 days of realistic data based on real-world patterns.

**When You Find Real Data:**
```bash
python scripts/fetch_online_data.py
```
Follow the prompts to import your dataset.

## 📊 Current Status

You already have **208,392 records** of realistic heat spike data saved!

The data includes:
- 30 days of measurements
- 24 server areas
- Realistic patterns (business hours, spikes, etc.)
- Ready for ML training


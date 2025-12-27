# Real Dataset Sources for Heat Spikes

## Quick Start

Run the automated script to get realistic data immediately:

```bash
python scripts/fetch_real_datasets.py
```

This generates 30 days of realistic server temperature data based on real-world patterns.

## Specific Dataset Sources

### 1. Kaggle (Best Option)

**Search Terms:**
- "server temperature monitoring"
- "data center thermal data"
- "IoT sensor temperature"
- "server room monitoring"

**Direct Links:**
- https://www.kaggle.com/datasets?search=server+temperature
- https://www.kaggle.com/datasets?search=data+center+monitoring
- https://www.kaggle.com/datasets?search=IoT+sensor

**To Download:**
1. Sign up for free Kaggle account
2. Search for datasets
3. Download CSV files
4. Use `fetch_online_data.py` to import

### 2. GitHub Repositories

**Search GitHub:**
- https://github.com/search?q=server+temperature+data+csv
- https://github.com/search?q=data+center+monitoring+csv
- https://github.com/search?q=IoT+sensor+temperature

**Common Repos:**
- Look for "monitoring-data", "sensor-data", "iot-data" repositories
- Many open-source projects include sample data

### 3. Public IoT Platforms

**Thingspeak:**
- https://thingspeak.com/channels/public
- Search for temperature monitoring channels
- Export data as CSV

**Adafruit IO:**
- https://io.adafruit.com/feeds/public
- Public temperature feeds
- Can export data

### 4. UCI Machine Learning Repository

**Search:**
- https://archive.ics.uci.edu/ml/datasets.php
- Search for "temperature", "monitoring", "sensor"

### 5. Data.gov

**US Government Data:**
- https://catalog.data.gov/dataset?q=temperature+monitoring
- May have data center efficiency datasets

## Using Climate Data as Proxy

If you can't find server-specific data, you can use climate/weather data:

1. **OpenWeatherMap API** (free tier available)
2. **NOAA Climate Data**
3. **NASA Earthdata**

Then transform it using the scripts to match server temperature patterns.

## Recommended Approach

1. **Start with automated realistic data:**
   ```bash
   python scripts/fetch_real_datasets.py
   ```

2. **Search Kaggle for real datasets:**
   - Download CSV files
   - Use `fetch_online_data.py` to import

3. **Check GitHub for open-source monitoring data**

4. **Use IoT platform public feeds**

## Data Format

Your data needs (or will be mapped to):
- `timestamp` - DateTime
- `server_area` - 0-23 (or will be normalized)
- `temperature` - Temperature in Fahrenheit
- `time_of_day` - Hour (0-23)
- `day_of_week` - 0-6

The scripts handle all transformations automatically!


# Direct Links to Find Heat Spike Datasets

## 🎯 Best Sources (Click to Search)

### Kaggle (Most Likely)
- [Server Temperature Monitoring](https://www.kaggle.com/datasets?search=server+temperature)
- [Data Center Monitoring](https://www.kaggle.com/datasets?search=data+center+monitoring)
- [IoT Sensor Temperature](https://www.kaggle.com/datasets?search=IoT+sensor+temperature)
- [Server Room Thermal](https://www.kaggle.com/datasets?search=server+room+thermal)

### GitHub (Open Source)
- [Server Temperature Data CSV](https://github.com/search?q=server+temperature+data+filetype:csv)
- [Data Center Monitoring CSV](https://github.com/search?q=data+center+monitoring+csv)
- [IoT Sensor Temperature](https://github.com/search?q=IoT+sensor+temperature)

### Public IoT Platforms
- [Thingspeak Public Channels](https://thingspeak.com/channels/public) - Search for "temperature"
- [Adafruit IO Public Feeds](https://io.adafruit.com/feeds/public) - Look for temperature feeds

### Academic/Research
- [UCI ML Repository](https://archive.ics.uci.edu/ml/datasets.php) - Search "temperature", "monitoring"
- [Data.gov](https://catalog.data.gov/dataset?q=temperature+monitoring) - US government data

## 📥 How to Use

### Step 1: Find a Dataset
Click any link above and search for datasets with:
- Temperature/time-series data
- Server or monitoring data
- CSV format preferred

### Step 2: Download
- Kaggle: Click "Download" button
- GitHub: Click "Raw" button, save as CSV
- Other: Download CSV file

### Step 3: Import
```bash
python scripts/fetch_online_data.py
```
Follow prompts to:
- Enter CSV file path
- Map columns (or auto-detect)
- Merge with existing data

## ✅ You Already Have Data!

**Current Status:**
- ✅ 208,392 records of realistic heat spike data
- ✅ 30 days of measurements
- ✅ 24 server areas
- ✅ Ready for ML training

**To Regenerate Clean Data:**
```bash
python scripts/fetch_data_auto.py
```

## 💡 Quick Tips

1. **Kaggle is your best bet** - Most likely to have real server monitoring data
2. **GitHub repos** - Many open-source projects include sample data
3. **IoT platforms** - Real-time sensor data, export as CSV
4. **Generated data works great** - Already have realistic patterns!

The scripts handle all the hard work - just find a CSV file and import it!


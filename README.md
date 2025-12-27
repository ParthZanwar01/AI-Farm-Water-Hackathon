# AI Farm Water Management System

An intelligent water cooling system for AI farm data servers that uses machine learning to predict heat spikes before they occur, enabling proactive cooling instead of reactive flooding.

## Features

- **Predictive AI System**: Uses machine learning to analyze historical heat spike patterns and predict future heat spikes
- **Real-time Simulation**: Visual frontend showing server temperatures and water cooling system in action
- **Proactive Cooling**: Targets specific server areas based on predictions rather than flooding entire areas reactively
- **Historical Analysis**: Tracks and learns from past heat spike patterns to improve predictions

## Project Structure

```
.
├── app.py                 # Flask backend API server
├── models/
│   ├── __init__.py
│   └── heat_predictor.py  # ML model for heat spike prediction
├── data/
│   └── heat_spikes.csv    # Historical heat spike data
├── frontend/
│   ├── index.html         # Main frontend page
│   ├── styles.css         # Styling
│   └── app.js             # Frontend logic and visualization
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

3. Open your browser and navigate to `http://localhost:5000`

## How It Works

1. **Data Collection**: The system collects historical heat spike data from different server areas
2. **ML Prediction**: The AI model analyzes patterns in the historical data to predict when and where heat spikes are likely to occur
3. **Proactive Cooling**: Water is directed to specific server areas before heat spikes occur, based on predictions
4. **Continuous Learning**: As new heat spikes are detected, the model retrains to improve accuracy

## API Endpoints

- `GET /api/status` - Get current server status and predictions
- `GET /api/predict` - Get heat spike predictions for all server areas
- `POST /api/heat-spike` - Record a new heat spike event
- `GET /api/history` - Get historical heat spike data



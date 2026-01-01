# AI Farm Water Management System 🎄

An intelligent water cooling system for AI farm data servers that uses machine learning to predict heat spikes before they occur, enabling proactive cooling instead of reactive flooding.

## Features

- **Predictive AI System**: ML model analyzes historical patterns to predict future heat spikes
- **Real-time 3D Visualization**: Interactive frontend with Three.js showing 24 servers across 4 racks
- **Proactive Cooling**: Targets specific server areas based on predictions rather than flooding entire areas
- **Dual Modes**: Switch between Standard (reactive) and AI (predictive) cooling modes
- **Holiday Theme**: Festive red, green, and gold color scheme with animated decorations

## Tech Stack

- **Backend**: Python, Flask, scikit-learn, pandas, numpy
- **Frontend**: JavaScript, HTML, CSS, Three.js
- **ML Model**: Random Forest classifier for heat spike prediction

## Quick Start

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

3. Open `http://localhost:5001` in your browser

## Project Structure

```
.
├── backend/
│   ├── app.py              # Flask API server
│   ├── models/
│   │   └── heat_predictor.py  # ML model
│   ├── data/
│   │   └── heat_spikes.csv    # Historical data
│   └── requirements.txt
├── frontend/
│   ├── index.html          # Main page
│   ├── styles.css          # Styling
│   └── app.js              # Frontend logic & 3D visualization
└── README.md
```

## How It Works

1. **Data Collection**: System tracks heat spikes across 24 server areas
2. **ML Prediction**: Model analyzes patterns (server location, time, temperature) to predict spikes
3. **Proactive Cooling**: Water cooling activates before predicted spikes occur
4. **Continuous Learning**: Model retrains as new data is collected

## API Endpoints

- `GET /api/status` - Current server status and predictions
- `GET /api/predict` - Heat spike predictions for all areas
- `POST /api/heat-spike` - Record a new heat spike
- `POST /api/simulation/start` - Start temperature simulation
- `POST /api/mode` - Switch between standard/AI modes

## Deployment

The application can be deployed to:
- **Backend**: Render, Railway, or Fly.io
- **Frontend**: Netlify or Vercel

Set the `API_BASE_URL` environment variable in your frontend deployment to point to your backend URL.

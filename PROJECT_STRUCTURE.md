# 📁 Project Structure

## New Organization

```
AI Farm Water Hackathon/
├── backend/                    # Backend (Flask API)
│   ├── app.py                 # Main Flask application
│   ├── models/                # ML models
│   │   └── heat_predictor.py
│   ├── scripts/               # Utility scripts
│   │   ├── retrain_model.py
│   │   ├── fetch_online_data.py
│   │   └── ...
│   ├── data/                  # Data files
│   │   └── heat_spikes.csv
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile              # For Render deployment
│   └── render.yaml           # Render configuration
│
├── frontend/                   # Frontend (Static HTML/CSS/JS)
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── _redirects            # Netlify SPA routing
│
├── netlify.toml               # Netlify configuration
└── DEPLOYMENT_GUIDE.md       # Deployment instructions
```

## Changes Made

✅ **Backend files moved to `backend/` folder:**
- `app.py` → `backend/app.py`
- `models/` → `backend/models/`
- `scripts/` → `backend/scripts/`
- `data/` → `backend/data/`
- `requirements.txt` → `backend/requirements.txt`
- `Procfile` → `backend/Procfile`
- `render.yaml` → `backend/render.yaml`

✅ **Frontend stays in `frontend/` folder** (already organized)

✅ **All paths updated:**
- Import paths in `app.py`
- Data file paths
- Script paths
- Frontend serving paths
- Deployment configurations

## Running Locally

### Backend
```bash
cd backend
python app.py
```

### Frontend
Open `frontend/index.html` in a browser, or serve with:
```bash
cd frontend
python -m http.server 8000
```

## Deployment

### Render (Backend)
- **Root Directory:** `backend`
- All backend files are in the `backend/` folder

### Netlify (Frontend)
- **Publish Directory:** `frontend`
- All frontend files are in the `frontend/` folder


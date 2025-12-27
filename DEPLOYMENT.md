# Deployment Guide

## Quick Deploy Options

### Option 1: Render (Recommended - Free Tier Available)
**Best for**: Quick deployment, free tier, easy setup

1. **Create account**: https://render.com
2. **Create new Web Service**
3. **Connect your GitHub repository**
4. **Settings**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Environment: Python 3
5. **Deploy!**

### Option 2: Railway (Easy & Fast)
**Best for**: Simple deployment, good free tier

1. **Install Railway CLI**: `brew install railway` or use web interface
2. **Login**: `railway login`
3. **Initialize**: `railway init`
4. **Deploy**: `railway up`
5. **Or use web**: https://railway.app - connect GitHub repo

### Option 3: Fly.io (Global Edge)
**Best for**: Global distribution, good performance

1. **Install**: `curl -L https://fly.io/install.sh | sh`
2. **Login**: `fly auth login`
3. **Launch**: `fly launch` (follow prompts)
4. **Deploy**: `fly deploy`

### Option 4: PythonAnywhere (Simple)
**Best for**: Python-focused, beginner-friendly

1. **Sign up**: https://www.pythonanywhere.com
2. **Upload files** via web interface
3. **Configure web app** to point to `app.py`
4. **Reload**

### Option 5: Heroku (Classic)
**Best for**: Well-documented, established platform

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Deploy**: `git push heroku main`

## Pre-Deployment Checklist

- [ ] Update `requirements.txt` with correct versions
- [ ] Test locally with production settings
- [ ] Update frontend API URL if needed
- [ ] Set environment variables
- [ ] Test all endpoints

## Environment Variables

Set these in your hosting platform:
- `OPENBLAS_NUM_THREADS=1`
- `OMP_NUM_THREADS=1`
- `MKL_NUM_THREADS=1`
- `VECLIB_MAXIMUM_THREADS=1`
- `NUMEXPR_NUM_THREADS=1`

## Production Configuration

The app will automatically:
- Use port from `PORT` environment variable (or 5001)
- Bind to `0.0.0.0` for external access
- Serve static files from `frontend/` directory


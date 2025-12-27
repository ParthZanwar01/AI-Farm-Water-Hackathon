# 🚀 Deployment Guide: Render (Backend) + Netlify (Frontend)

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at https://render.com (free tier available)
3. **Netlify Account** - Sign up at https://netlify.com (free tier available)
4. **Your code pushed to GitHub**

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Verify Files Are Ready

Make sure these files exist in your repo:
- ✅ `app.py` (Flask backend)
- ✅ `requirements.txt` (Python dependencies)
- ✅ `Procfile` (for Render)
- ✅ `render.yaml` (optional, for Render)
- ✅ `frontend/` directory (HTML, CSS, JS)
- ✅ `netlify.toml` (for Netlify)
- ✅ `frontend/_redirects` (for Netlify SPA routing)

### 1.2 Commit and Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🌐 Step 2: Deploy Backend to Render

### 2.1 Create Render Account & New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `AI Farm Water Hackathon`

### 2.2 Configure Render Service

**Basic Settings:**
- **Name:** `ai-farm-water-backend` (or any name you prefer)
- **Region:** Choose closest to you (e.g., `Oregon (US West)`)
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend` (important!)
- **Runtime:** `Python 3.11` (or use `runtime.txt` in backend folder)
- **Build Command:** `pip install --upgrade pip setuptools wheel && pip install -r requirements.txt`
- **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`

**Environment Variables:**
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
OPENBLAS_NUM_THREADS = 1
OMP_NUM_THREADS = 1
MKL_NUM_THREADS = 1
VECLIB_MAXIMUM_THREADS = 1
NUMEXPR_NUM_THREADS = 1
FLASK_ENV = production
PORT = (leave empty - Render sets this automatically)
```

### 2.3 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes first time)
3. **Copy your Render URL** - it will look like:
   ```
   https://ai-farm-water-backend.onrender.com
   ```
   ⚠️ **SAVE THIS URL** - You'll need it for Netlify!

### 2.4 Test Backend

Once deployed, test your API:
```bash
curl https://your-app-name.onrender.com/api/status
```

You should get a JSON response.

---

## 🎨 Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account & New Site

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** and authorize Netlify
4. Select your repository: `AI Farm Water Hackathon`

### 3.2 Configure Netlify Build Settings

**Build Settings:**
- **Base directory:** Leave empty
- **Build command:** `echo 'Frontend build - static files only'` (or leave empty)
- **Publish directory:** `frontend`

### 3.3 Set Environment Variables

Before deploying, click **"Show advanced"** → **"New variable"**:

**Variable Name:** `REACT_APP_API_URL`  
**Value:** `https://your-render-app.onrender.com/api`

⚠️ **Replace `your-render-app.onrender.com` with your actual Render URL from Step 2.3!**

### 3.4 Update netlify.toml

Edit `netlify.toml` in your repo and update the API URL:

```toml
[build.environment]
  REACT_APP_API_URL = "https://your-actual-render-url.onrender.com/api"
```

Then commit and push:
```bash
git add netlify.toml
git commit -m "Update Netlify API URL"
git push origin main
```

### 3.5 Deploy

1. Click **"Deploy site"**
2. Wait for deployment (2-3 minutes)
3. **Copy your Netlify URL** - it will look like:
   ```
   https://your-app-name.netlify.app
   ```

### 3.6 Update Backend CORS (if needed)

If you get CORS errors, update `app.py` to include your Netlify URL, or set it via environment variable in Render:

**In Render Dashboard:**
- Go to your service → **"Environment"**
- Add: `NETLIFY_URL = your-app-name.netlify.app`

---

## 🔗 Step 4: Connect Frontend to Backend

### 4.1 Update Frontend API URL

The frontend should automatically use the environment variable, but verify:

1. In Netlify dashboard, go to **"Site settings"** → **"Environment variables"**
2. Ensure `REACT_APP_API_URL` is set to your Render API URL
3. **Redeploy** if you added it after initial deployment

### 4.2 Test the Connection

1. Open your Netlify site: `https://your-app-name.netlify.app`
2. Open browser DevTools (F12) → **Console** tab
3. Check for any API errors
4. The app should load and connect to your Render backend

---

## ✅ Step 5: Verify Everything Works

### 5.1 Test Checklist

- [ ] Frontend loads at Netlify URL
- [ ] No console errors in browser
- [ ] API calls work (check Network tab)
- [ ] Server status shows correctly
- [ ] Simulation can start/stop
- [ ] Heat spikes can be triggered
- [ ] AI Predictive mode works
- [ ] Model retraining works (if applicable)

### 5.2 Common Issues & Fixes

**Issue: CORS Errors**
- **Fix:** Add Netlify URL to Render CORS settings or environment variable

**Issue: API Not Found (404)**
- **Fix:** Check `REACT_APP_API_URL` in Netlify environment variables

**Issue: Backend Timeout**
- **Fix:** Render free tier spins down after 15 min inactivity. First request may be slow.

**Issue: Model Training Fails**
- **Fix:** Ensure data file exists and is accessible. Check Render logs.

---

## 🔄 Step 6: Continuous Deployment

Both Render and Netlify automatically deploy when you push to GitHub!

**To update:**
1. Make changes locally
2. Commit: `git add . && git commit -m "Update"`
3. Push: `git push origin main`
4. Both services will auto-deploy (5-10 minutes)

---

## 📝 Quick Reference

### Render Backend URL
```
https://your-app-name.onrender.com
```

### Netlify Frontend URL
```
https://your-app-name.netlify.app
```

### Environment Variables

**Render (Backend):**
- `OPENBLAS_NUM_THREADS=1`
- `OMP_NUM_THREADS=1`
- `MKL_NUM_THREADS=1`
- `VECLIB_MAXIMUM_THREADS=1`
- `NUMEXPR_NUM_THREADS=1`
- `FLASK_ENV=production`
- `NETLIFY_URL=your-app-name.netlify.app` (optional)

**Netlify (Frontend):**
- `REACT_APP_API_URL=https://your-app-name.onrender.com/api`

---

## 🎉 You're Done!

Your app is now live:
- **Frontend:** https://your-app-name.netlify.app
- **Backend:** https://your-app-name.onrender.com

Share your Netlify URL with others - the frontend will automatically connect to your backend!

---

## 💡 Pro Tips

1. **Custom Domain:** Both Render and Netlify support custom domains (free tier)
2. **Monitoring:** Check Render logs if backend has issues
3. **Performance:** Render free tier spins down after inactivity - first request may be slow
4. **SSL:** Both services provide free SSL certificates automatically

---

## 🆘 Need Help?

- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Check Logs:** 
  - Render: Dashboard → Your Service → Logs
  - Netlify: Site → Deploys → Click deploy → View logs


# ✅ Update Netlify Environment Variable NOW

## Your Render URL
**Backend URL:** `https://ai-farm-water-hackathon.onrender.com`

## Quick Fix (2 minutes)

### Step 1: Update Netlify Environment Variable

1. Go to: https://app.netlify.com
2. Select your site: `aifarmwaterconservation`
3. Go to: **Site settings** → **Environment variables**
4. Find `REACT_APP_API_URL` (or create it if missing)
5. Set the value to: `https://ai-farm-water-hackathon.onrender.com/api`
6. Click **Save**

### Step 2: Redeploy Netlify

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete (~2 minutes)

### Step 3: Test

1. Open: https://aifarmwaterconservation.netlify.app
2. Open browser console (F12)
3. Check Network tab - API calls should go to:
   - ✅ `https://ai-farm-water-hackathon.onrender.com/api/status`
   - ✅ `https://ai-farm-water-hackathon.onrender.com/api/history`
4. Should see data loading (no more CORS errors!)

## What I've Done

✅ Updated `netlify.toml` with your Render URL  
✅ Improved CORS configuration in backend  
✅ Added health check endpoint  

## After Update

Your frontend will connect to:
- Backend: `https://ai-farm-water-hackathon.onrender.com`
- API calls: `https://ai-farm-water-hackathon.onrender.com/api/*`

The backend is already working (I can see it's serving the frontend), so once you update Netlify, everything should work! 🎉




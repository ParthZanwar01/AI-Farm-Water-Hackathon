# 🚨 URGENT: Fix Render Python 3.13 Error

## The Problem
Render is using **Python 3.13** which has compatibility issues. You MUST manually change it to **Python 3.11**.

## Step-by-Step Fix (DO THIS NOW)

### Step 1: Open Render Dashboard
1. Go to https://dashboard.render.com
2. Log in
3. Click on your service: `ai-farm-water-backend` (or whatever you named it)

### Step 2: Change Python Version
1. Click on the **"Settings"** tab (left sidebar)
2. Scroll down to **"Environment"** section
3. Look for **"Python Version"** or **"Runtime"** dropdown
4. **CHANGE IT FROM "Python 3.13" TO "Python 3.11"**
5. Click **"Save Changes"** button

### Step 3: Redeploy
1. Go to **"Manual Deploy"** tab (or "Events" tab)
2. Click **"Deploy latest commit"** or **"Clear build cache & deploy"**
3. Wait for deployment

### Step 4: Verify
Check the build logs. You should see:
```
✅ Using Python version 3.11.x
```
NOT:
```
❌ Using Python version 3.13.x
```

## If You Can't Find the Setting

1. **Delete the service** (Settings → Danger Zone → Delete)
2. **Create a new service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - **IMPORTANT:** When it asks for Python version, **SELECT "Python 3.11"** (NOT 3.13!)
   - Set Root Directory: `backend`
   - Set Build Command: `bash build.sh`
   - Set Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`
   - Add all environment variables
   - Create service

## Why This Happens

- Render defaults to Python 3.13 for new services
- The `runtime.txt` file might not be read if service was created via dashboard
- Dashboard settings override config files

## After Fixing

Once Python 3.11 is set, the build should succeed! ✅



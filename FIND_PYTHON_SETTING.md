# 🔍 How to Find Python Version Setting in Render

## Method 1: Settings Tab (Most Common)

1. **Go to your Render service**
   - Dashboard → Click on your service name (e.g., `ai-farm-water-backend`)

2. **Click "Settings" tab**
   - It's in the left sidebar, usually near the bottom
   - Look for a gear icon ⚙️ or "Settings" text

3. **Scroll down to find Python version**
   - Look for sections like:
     - **"Environment"**
     - **"Build & Deploy"**
     - **"Runtime"**
   - Python version might be in a dropdown or text field

## Method 2: Environment Variables Section

1. In **Settings** tab
2. Look for **"Environment Variables"** section
3. Python version might be set as an environment variable
4. Or it might be in a separate **"Runtime"** or **"Python"** section above/below environment variables

## Method 3: If You Can't Find It

**Option A: Delete and Recreate (Easiest)**
1. Go to **Settings** → Scroll to bottom → **"Danger Zone"**
2. Click **"Delete Service"**
3. Create new service:
   - **"New +"** → **"Web Service"**
   - When creating, you'll see **"Python Version"** dropdown
   - **Select "Python 3.11"** (NOT 3.13!)
   - Set Root Directory: `backend`
   - Set Build Command: `bash build.sh`
   - Set Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`

**Option B: Use Render Blueprint (render.yaml)**
- If you have `render.yaml`, Render might use that
- But dashboard settings can override it
- Try deleting the service and letting Render create it from `render.yaml`

## Method 4: Check Build Logs

The build logs show which Python version is being used:
- Look for: `Using Python version 3.13.x` or `Using Python version 3.11.x`
- This tells you what's currently set

## What to Look For

The setting might be labeled as:
- "Python Version"
- "Runtime"
- "Python Runtime"
- "Python"
- Or it might be in the build settings

## Still Can't Find It?

**Screenshot what you see:**
- Take a screenshot of your Settings page
- Or describe what sections you see
- I can help you locate it!

## Quick Alternative: Use render.yaml

If you can't find the setting, we can try using the `render.yaml` file exclusively, but you may need to delete and recreate the service for it to take effect.


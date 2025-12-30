# 🔧 Fix Netlify API URL Configuration

## The Problem

Your frontend is trying to connect to `https://your-render-app.onrender.com/api` (the placeholder), which doesn't exist. You need to update it with your **actual Render URL**.

## How to Fix

### Step 1: Get Your Render URL

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your service (e.g., `ai-farm-water`)
3. Find your service URL (it should look like: `https://ai-farm-water-xxxx.onrender.com`)
4. Copy the full URL

### Step 2: Update Netlify Environment Variable

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (`aifarmwaterconservation`)
3. Go to **Site settings** → **Environment variables**
4. Find `REACT_APP_API_URL` (or create it if it doesn't exist)
5. Set the value to: `https://YOUR-ACTUAL-RENDER-URL.onrender.com/api`
   - Replace `YOUR-ACTUAL-RENDER-URL` with your actual Render service name
   - **Important**: Include `/api` at the end
   - Example: `https://ai-farm-water-xxxx.onrender.com/api`

### Step 3: Redeploy Netlify

1. After updating the environment variable, go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the build to complete

### Step 4: Verify

1. Open your Netlify site: `https://aifarmwaterconservation.netlify.app`
2. Open browser console (F12)
3. Check that API calls are going to your actual Render URL (not the placeholder)
4. Check that you're no longer getting CORS errors

## Quick Check

After updating, your frontend should be calling:
- ✅ `https://ai-farm-water-xxxx.onrender.com/api/status`
- ✅ `https://ai-farm-water-xxxx.onrender.com/api/history`

NOT:
- ❌ `https://your-render-app.onrender.com/api/status`

## Troubleshooting

### Still getting CORS errors?

1. **Check Render is running:**
   - Go to Render dashboard → Your service → Logs
   - Make sure the service is "Live" (green status)
   - Check for any errors in logs

2. **Check Render URL is correct:**
   - Try accessing `https://YOUR-RENDER-URL.onrender.com/api/status` directly in browser
   - You should see JSON response (not 404)

3. **Verify CORS headers:**
   - Open browser DevTools → Network tab
   - Look at the response headers for `/api/status`
   - Should see: `Access-Control-Allow-Origin: *`

### Still getting 404 errors?

- Make sure your Render service is actually running
- Check Render logs for startup errors
- Verify the service URL is correct

## Example

If your Render service URL is: `https://ai-farm-water-abc123.onrender.com`

Then set in Netlify:
```
REACT_APP_API_URL = https://ai-farm-water-abc123.onrender.com/api
```

Note: The `/api` suffix is important!



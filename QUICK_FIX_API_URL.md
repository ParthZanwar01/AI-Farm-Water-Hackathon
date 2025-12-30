# ⚡ Quick Fix: Update API URL in Netlify

## The Error
```
Access to fetch at 'https://your-render-app.onrender.com/api/status' 
from origin 'https://aifarmwaterconservation.netlify.app' 
has been blocked by CORS policy
```

## The Fix (2 minutes)

### 1. Get Your Render URL
- Go to: https://dashboard.render.com
- Click your service
- Copy the URL (e.g., `https://ai-farm-water-abc123.onrender.com`)

### 2. Update Netlify
- Go to: https://app.netlify.com
- Your site → **Site settings** → **Environment variables**
- Find `REACT_APP_API_URL`
- Change value to: `https://YOUR-RENDER-URL.onrender.com/api`
- **Save**

### 3. Redeploy
- **Deploys** tab → **Trigger deploy** → **Deploy site**

### 4. Test
- Open: https://aifarmwaterconservation.netlify.app
- Check console (F12) - should see your actual Render URL, not placeholder

## Example

**Render URL:** `https://ai-farm-water-abc123.onrender.com`

**Set in Netlify:**
```
REACT_APP_API_URL = https://ai-farm-water-abc123.onrender.com/api
```

**Note:** Include `/api` at the end!




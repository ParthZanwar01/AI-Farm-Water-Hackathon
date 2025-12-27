# Deploy to Render - Step by Step Guide

## Render Free Tier
✅ **Free tier includes:**
- 750 hours/month (enough for 24/7 operation)
- 512MB RAM
- Automatic SSL
- Custom domain support
- Auto-deploy from GitHub

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Farm Water Management System"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Render

1. **Go to Render**: https://render.com
2. **Sign up** (free) - you can use GitHub to sign in
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository**:
   - Click "Connect account" if needed
   - Select your repository
5. **Configure the service**:
   - **Name**: `ai-farm-water` (or any name you like)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --threads 2`
6. **Environment Variables** (click "Advanced"):
   - `OPENBLAS_NUM_THREADS` = `1`
   - `OMP_NUM_THREADS` = `1`
   - `MKL_NUM_THREADS` = `1`
   - `VECLIB_MAXIMUM_THREADS` = `1`
   - `NUMEXPR_NUM_THREADS` = `1`
   - `FLASK_ENV` = `production`
7. **Click "Create Web Service"**
8. **Wait for deployment** (5-10 minutes first time)
9. **Done!** You'll get a URL like `https://ai-farm-water.onrender.com`

## Important Notes

### Free Tier Limitations:
- **Spins down after 15 minutes of inactivity** (wakes up on first request)
- **512MB RAM** - should be enough for this app
- **Build time**: First build takes 5-10 minutes

### After Deployment:
- Your app will be live at the Render URL
- The frontend will automatically use the correct API URL
- All features will work as expected

### If App Spins Down:
- First request after inactivity takes ~30 seconds (wake-up time)
- Subsequent requests are fast
- Consider upgrading to paid plan if you need 24/7 without spin-down

## Troubleshooting

**Build fails?**
- Check build logs in Render dashboard
- Make sure `requirements.txt` has all dependencies
- Verify Python version compatibility

**App crashes?**
- Check logs in Render dashboard
- Verify environment variables are set
- Check that port is using `$PORT` variable

**Frontend not loading?**
- Check that static files are being served
- Verify API calls are using relative URLs (they should auto-detect)

## That's It!

Once deployed, share your Render URL and your AI Farm Water Management System will be live! 🚀


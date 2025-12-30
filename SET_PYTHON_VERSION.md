# ✅ Easy Way to Set Python Version in Render

## Method 1: Add Environment Variable (EASIEST!)

Since you can't find the Python version setting, use an **Environment Variable**:

### Steps:

1. **Go to Render Dashboard**
   - Open your service: `ai-farm-water-backend`

2. **Click "Environment" tab** (or "Settings" → "Environment Variables")

3. **Add New Environment Variable:**
   - **Key:** `PYTHON_VERSION`
   - **Value:** `3.11.11`
   - Click **"Add"** or **"Save"**

4. **Redeploy:**
   - Go to **"Manual Deploy"** tab
   - Click **"Clear build cache & deploy"**

### That's it! Render will now use Python 3.11.11

---

## Method 2: Use .python-version File (Already Added)

I've created `backend/.python-version` file with `3.11.11`

**Just commit and push:**
```bash
git add backend/.python-version
git commit -m "Set Python 3.11.11"
git push origin main
```

Render will automatically detect this file and use Python 3.11.11!

---

## Method 3: Both Methods (Recommended)

Use **BOTH** for maximum compatibility:
1. ✅ Add `PYTHON_VERSION=3.11.11` environment variable in dashboard
2. ✅ Commit the `.python-version` file I created

This ensures Render uses Python 3.11 no matter what!

---

## Verify It Worked

After deploying, check build logs. You should see:
```
✅ Using Python version 3.11.11
```

NOT:
```
❌ Using Python version 3.13.x
```

---

## Quick Steps Summary

**Option A: Environment Variable (Fastest)**
1. Dashboard → Your Service → Environment tab
2. Add: `PYTHON_VERSION` = `3.11.11`
3. Save → Redeploy

**Option B: File (Automatic)**
1. I've already created `backend/.python-version`
2. Just commit and push
3. Render will auto-detect it

**Option C: Both (Best)**
- Do both A and B for guaranteed success!




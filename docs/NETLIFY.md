# Deploy AquaCool to Netlify

This repository is configured so **one Netlify site** serves:

- **`/`** — React marketing app (`aquacool-web`, Vite build)
- **`/simulator/`** — Static 3D demo (`frontend/` copied into the publish folder)
- **`/api/*`** — Proxied to your Flask backend (avoids browser CORS issues)

The Flask API must run somewhere that runs containers or Python (e.g. **Render**, Railway, Fly.io). Netlify only serves static files and proxies `/api`.

### Docker and “free”

- **Docker** (the `Dockerfile` / Engine) is free to use. **Docker Desktop** may require a paid subscription for large-company use; Linux and most CI hosts use the free Engine.
- **Hosting** a container is often **free on a starter tier** (e.g. Render free web services) with limits (cold starts, sleep when idle, CPU/RAM caps). You still pay with wait time on cold boot, not necessarily with money.

This repo includes a root [`Dockerfile`](../Dockerfile) that bundles `backend/` + `frontend/` so Flask’s `../frontend` paths work inside the image.

## 1. Deploy the backend (required)

We can’t log into your cloud account from here. Use **Render** + the Blueprint:

### Option A — Blueprint (Docker, recommended)

1. Push this repo to GitHub.
2. In [Render](https://dashboard.render.com): **New** → **Blueprint** → connect the repository.
3. Render reads root [`render.yaml`](../render.yaml) (`runtime: docker`, `Dockerfile` at repo root) and deploys the API.
4. Copy the service URL (e.g. `https://ai-farm-water.onrender.com`).

### Option B — Manual Docker Web Service

1. **New** → **Web Service** → connect the repo.
2. **Environment** → **Docker**.
3. **Dockerfile path:** `Dockerfile` (repository root). **Docker context:** `.` (root).
4. **Start** is defined in the Dockerfile (`gunicorn`); Render sets `PORT`.

### Option C — Native Python (no Docker)

1. **Root Directory:** `backend`
2. **Build:** `bash build.sh`
3. **Start:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`
4. **Env:** `PYTHON_VERSION=3.11.11`, `FLASK_ENV=production`

### Local Docker

From the repository root:

```bash
docker build -t aquacool-api .
docker run --rm -p 5001:5001 -e PORT=5001 aquacool-api
```

Then open `http://localhost:5001` (API + static UI). Use `/api/...` as in `backend/app.py`. Set Netlify’s `BACKEND_ORIGIN` to your deployed URL **without** a trailing slash.

## 2. Connect the repo to Netlify

1. In [Netlify](https://app.netlify.com): **Add new site** → **Import an existing project** → pick your Git provider and repository.
2. **Important:** leave **Base directory** empty (repository root). The root `netlify.toml` drives the build.
3. Netlify should auto-detect:
   - **Build command:** `bash scripts/netlify-build.sh`
   - **Publish directory:** `aquacool-web/dist`

If anything is wrong, set those values manually.

## 3. Environment variables (Netlify)

In **Site configuration → Environment variables**, you can override:

| Variable | Purpose |
|----------|---------|
| `BACKEND_ORIGIN` | Flask base URL **without** trailing slash, e.g. `https://your-api.onrender.com`. Used to build the `/api/*` proxy in `_redirects`. |
| `REACT_APP_API_URL` | Injected into the **simulator** HTML as the fetch base. Default in `netlify.toml` is `/api` (recommended with the proxy). |
| `NODE_VERSION` | Optional; `netlify.toml` sets `20`. |

After changing `BACKEND_ORIGIN`, trigger a new deploy.

## 4. Optional: Vite overrides

For the React app only:

- `VITE_SIMULATOR_URL` — Override the “Live simulator” link. If unset, production builds default to `/simulator/`.

## 5. Verify after deploy

- Open `https://<your-site>.netlify.app/` — marketing pages should load; client-side routes like `/platform` should work (SPA fallback).
- Open `https://<your-site>.netlify.app/simulator/` — 3D room should load.
- In DevTools → Network, API calls from the simulator should go to **`/api/...`** on the same Netlify host and return JSON from your Flask app.

## 6. Local “Netlify-style” build

From the **repository root**:

```bash
bash scripts/netlify-build.sh
```

Preview the output (optional):

```bash
cd aquacool-web && npx vite preview --outDir dist
```

Use a static server pointed at `aquacool-web/dist` if you need to test `/simulator/` paths locally.

## Troubleshooting

- **502 / empty API responses:** Check `BACKEND_ORIGIN`, confirm the Render (or other) service is running and healthy.
- **Simulator loads but API fails:** Confirm `_redirects` in the deployed site includes a line like `/api/*  https://.../api/:splat  200` (Netlify **Deploys** → downloaded deploy or **Site configuration → Redirects**).
- **Wrong base directory:** If Netlify’s base is set to `aquacool-web/`, the root `netlify.toml` may be ignored — clear base directory to repo root.

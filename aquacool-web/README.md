# AquaCool Web

Full-site fork of the Space Apps ORCA React app (`Space-Apps-Web1`), copied into this repo and rewritten for **AquaCool AI** (predictive data-center water cooling).

## Run locally

```bash
cd aquacool-web
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Backend note

The Flask app trains the model in a **background thread** by default so `python app.py` starts quickly. Keep the simulator on port **5001** (or set `VITE_SIMULATOR_URL`) so nav links work.

## Live simulator link

The nav **Live simulator** button points to `http://localhost:5001` by default (Flask + `frontend/` demo). Override:

```bash
VITE_SIMULATOR_URL=https://your-demo-host npm run dev
```

## Build

```bash
npm run build
```

Static output is in `dist/` — deploy like any Vite SPA (Netlify, Cloudflare Pages, etc.).

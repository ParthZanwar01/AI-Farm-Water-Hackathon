#!/usr/bin/env bash
# Netlify: build React marketing site, copy static 3D simulator, wire API proxy + client config.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/aquacool-web/dist"
FRONT="$ROOT/frontend"

# Origin of the Flask API (no trailing slash). Override in Netlify: Site settings → Environment variables.
# Example: https://your-service.onrender.com
BACKEND_ORIGIN="${BACKEND_ORIGIN:-https://ai-farm-water-hackathon.onrender.com}"

# Simulator page API base: same-origin /api when using Netlify proxy (recommended).
API_BASE_FOR_HTML="${REACT_APP_API_URL:-/api}"

cd "$ROOT/aquacool-web"
npm ci
npm run build

mkdir -p "$DIST/simulator"
cp -r "$FRONT"/* "$DIST/simulator/"

# Inject API URL into the copied simulator (placeholder from frontend/index.html)
SIM_INDEX="$DIST/simulator/index.html"
if [[ -f "$SIM_INDEX" ]]; then
  if sed --version >/dev/null 2>&1; then
    sed -i "s|%REACT_APP_API_URL%|${API_BASE_FOR_HTML}|g" "$SIM_INDEX"
  else
    sed -i '' "s|%REACT_APP_API_URL%|${API_BASE_FOR_HTML}|g" "$SIM_INDEX"
  fi
fi

# _redirects: API proxy first, then SPA fallback for the React app (static files still win)
REDIRECTS="$DIST/_redirects"
{
  echo "/api/*  ${BACKEND_ORIGIN}/api/:splat  200"
  echo "/*  /index.html  200"
} > "$REDIRECTS"

echo "Netlify build complete → ${DIST}"
echo "  BACKEND_ORIGIN=${BACKEND_ORIGIN}"
echo "  Simulator API base in HTML=${API_BASE_FOR_HTML}"

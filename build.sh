#!/bin/bash
# Legacy: injects API URL into frontend/index.html only (old “publish = frontend” flow).
# Full site (React + simulator + API proxy): use scripts/netlify-build.sh — see docs/NETLIFY.md.

API_URL="${REACT_APP_API_URL:-/api}"

# Replace placeholder in HTML file
if [ -f "frontend/index.html" ]; then
    # Use sed with backup (works on both Linux and macOS)
    if sed --version >/dev/null 2>&1; then
        # GNU sed (Linux)
        sed -i "s|%REACT_APP_API_URL%|${API_URL}|g" frontend/index.html
    else
        # BSD sed (macOS)
        sed -i.bak "s|%REACT_APP_API_URL%|${API_URL}|g" frontend/index.html
        rm -f frontend/index.html.bak
    fi
    echo "✅ API URL injected: ${API_URL}"
else
    echo "⚠️  frontend/index.html not found"
    exit 1
fi

echo "✅ Build complete"


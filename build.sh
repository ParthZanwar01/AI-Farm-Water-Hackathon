#!/bin/bash
# Simple build script for Netlify - replaces API URL placeholder in HTML

API_URL="${REACT_APP_API_URL:-/api}"

# Replace placeholder in HTML file
if [ -f "frontend/index.html" ]; then
    sed -i.bak "s|%REACT_APP_API_URL%|${API_URL}|g" frontend/index.html
    rm -f frontend/index.html.bak
    echo "✅ API URL injected: ${API_URL}"
else
    echo "⚠️  frontend/index.html not found"
fi

echo "✅ Build complete"


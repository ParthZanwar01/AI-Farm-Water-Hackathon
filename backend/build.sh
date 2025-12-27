#!/bin/bash
# Build script for Render - ensures Python 3.11 is used

set -e

echo "🔍 Checking Python version..."
python --version 2>&1 || python3 --version 2>&1

# Check if we're on Python 3.13 (which has compatibility issues)
PYTHON_VERSION=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1 || echo "unknown")
if [[ "$PYTHON_VERSION" == "3.13" ]]; then
    echo "⚠️  WARNING: Python 3.13 detected!"
    echo "   Python 3.13 is very new and has compatibility issues with:"
    echo "   - setuptools.build_meta (build backend)"
    echo "   - Some packages may not have wheels yet"
    echo "   - Scientific libraries (numpy, pandas) may fail to build"
    echo ""
    echo "📝 RECOMMENDED: Use Python 3.11 for stability"
    echo "   Go to Render Dashboard → Settings → Environment"
    echo "   Change Python Version from 3.13 to 3.11"
    echo ""
    echo "🔄 Attempting to continue with Python 3.13 (may fail)..."
    # Don't exit - try to continue, but it will likely fail
fi

# Try to use Python 3.11 if available
if command -v python3.11 &> /dev/null; then
    PYTHON_CMD=python3.11
    echo "✅ Using Python 3.11"
elif python3 --version 2>&1 | grep -q "3.11"; then
    PYTHON_CMD=python3
    echo "✅ Using Python 3.11 (via python3)"
else
    PYTHON_CMD=python3
    echo "⚠️  Python 3.11 not found, using default Python"
    python3 --version 2>&1
fi

echo "📦 Upgrading pip, setuptools, and wheel..."
$PYTHON_CMD -m pip install --upgrade pip setuptools wheel

echo "📥 Installing dependencies..."
$PYTHON_CMD -m pip install -r requirements.txt

echo "✅ Build complete!"


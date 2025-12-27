#!/bin/bash
# Build script for Render - ensures Python 3.11 is used

set -e

echo "🔍 Checking Python version..."
python --version || python3 --version

# Try to use Python 3.11 if available
if command -v python3.11 &> /dev/null; then
    PYTHON_CMD=python3.11
    echo "✅ Using Python 3.11"
elif python3 --version | grep -q "3.11"; then
    PYTHON_CMD=python3
    echo "✅ Using Python 3.11 (via python3)"
else
    PYTHON_CMD=python3
    echo "⚠️  Python 3.11 not found, using default Python"
    python3 --version
fi

echo "📦 Upgrading pip, setuptools, and wheel..."
$PYTHON_CMD -m pip install --upgrade pip setuptools wheel

echo "📥 Installing dependencies..."
$PYTHON_CMD -m pip install -r requirements.txt

echo "✅ Build complete!"


#!/bin/bash
# Safe startup script using Homebrew Python

PYTHON_BIN="/opt/homebrew/bin/python3.9"

if [ ! -f "$PYTHON_BIN" ]; then
    echo "Error: Homebrew Python not found at $PYTHON_BIN"
    echo "Please install it with: brew install python@3.9"
    exit 1
fi

# Set OpenBLAS threading (just in case)
export OPENBLAS_NUM_THREADS=1
export OMP_NUM_THREADS=1
export MKL_NUM_THREADS=1
export VECLIB_MAXIMUM_THREADS=1
export NUMEXPR_NUM_THREADS=1

echo "Starting AI Farm Water Management System..."
echo "Using Homebrew Python: $PYTHON_BIN"
echo "Python version:"
$PYTHON_BIN --version
echo ""

cd "$(dirname "$0")"
$PYTHON_BIN app.py


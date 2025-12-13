#!/bin/bash

set -e

echo ""
echo "==================================================================="
echo "  Transio Saxon-HE Server - One-Click Installer (Mac/Linux)"
echo "==================================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js:"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "  macOS: brew install node"
        echo "  Or download from: https://nodejs.org/"
    else
        echo "  Ubuntu/Debian: sudo apt-get install nodejs npm"
        echo "  Fedora/RHEL: sudo dnf install nodejs npm"
        echo "  Arch: sudo pacman -S nodejs npm"
        echo "  Or download from: https://nodejs.org/"
    fi
    echo ""
    exit 1
fi

echo "Node.js found:"
node --version
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed!"
    echo ""
    echo "Please reinstall Node.js from: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "npm found:"
npm --version
echo ""

echo "Running installation script..."
echo ""

node install.js

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo ""
    echo "==================================================================="
    echo "  Installation encountered errors"
    echo "==================================================================="
    echo ""
    exit $EXIT_CODE
fi

echo ""
echo "==================================================================="
echo "  Installation script completed"
echo "==================================================================="
echo ""

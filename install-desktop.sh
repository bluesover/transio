#!/bin/bash

# Transio Desktop App Installer for macOS/Linux
# This script installs all dependencies and builds the desktop app

set -e

echo "╔══════════════════════════════════════════════════════════╗"
echo "║        Transio Desktop App - One-Click Installer        ║"
echo "║                    transio.org                           ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo ""
    echo "Please install Node.js 18+ from:"
    echo "https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}✗ Node.js version must be 18 or higher${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm -v) detected${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}✗ git is not installed${NC}"
    echo "Please install git from your package manager"
    exit 1
fi

echo -e "${GREEN}✓ git $(git --version | cut -d' ' -f3) detected${NC}"
echo ""

# Install dependencies
echo "Installing application dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Install server dependencies
echo "Installing server dependencies..."
npm run server:install

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to install server dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Server dependencies installed${NC}"
echo ""

# Detect platform
PLATFORM=$(uname)

echo "Building desktop application for $PLATFORM..."
echo ""

if [ "$PLATFORM" = "Darwin" ]; then
    echo "Building macOS application..."
    npm run electron:build:mac
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║              Build completed successfully!              ║${NC}"
        echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo "Installation files created in: dist-desktop/"
        echo ""
        echo "To install:"
        echo "  1. Open dist-desktop/Transio-*.dmg"
        echo "  2. Drag Transio to Applications"
        echo "  3. Launch from Applications folder"
        echo ""
    else
        echo -e "${RED}✗ Build failed${NC}"
        exit 1
    fi
    
elif [ "$PLATFORM" = "Linux" ]; then
    echo "Building Linux application..."
    npm run electron:build:linux
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║              Build completed successfully!              ║${NC}"
        echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo "Installation files created in: dist-desktop/"
        echo ""
        echo "To install:"
        echo ""
        echo "AppImage (Universal):"
        echo "  chmod +x dist-desktop/Transio-*.AppImage"
        echo "  ./dist-desktop/Transio-*.AppImage"
        echo ""
        echo "Debian/Ubuntu (.deb):"
        echo "  sudo dpkg -i dist-desktop/transio_*.deb"
        echo ""
        echo "Fedora/RedHat (.rpm):"
        echo "  sudo rpm -i dist-desktop/transio-*.rpm"
        echo ""
    else
        echo -e "${RED}✗ Build failed${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Unsupported platform: $PLATFORM${NC}"
    echo "This installer supports macOS and Linux only."
    echo "For Windows, please run: npm run electron:build:win"
    exit 1
fi

echo "Thank you for using Transio!"
echo "Visit https://transio.org for documentation and support"
echo ""

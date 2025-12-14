#!/bin/bash

# Transio Release Validation Script
# Quick validation to ensure everything is ready for release

set -e

echo "🔍 Validating Transio Release Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
    else
        echo -e "${RED}✗${NC} Missing: $1"
        ((ERRORS++))
    fi
}

check_optional() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
    else
        echo -e "${YELLOW}⚠${NC} Optional: $1"
        ((WARNINGS++))
    fi
}

# Critical files
echo "📄 Checking critical files..."
check_file "package.json"
check_file "package-lock.json"
check_file "README.md"
check_file "LICENSE"
check_file "CHANGELOG.md"
check_file "RELEASE.md"
echo ""

# Release files
echo "📋 Checking release documentation..."
check_file "RELEASE_GUIDE.md"
check_file "prepare-release.sh"
check_file "prepare-release.bat"
echo ""

# Electron files
echo "🖥️  Checking Electron setup..."
check_file "electron/main.ts"
check_file "electron/preload.ts"
check_file "electron/ipc-handlers.ts"
check_file "electron/menu.ts"
check_file "electron/saxon-installer.ts"
check_file "tsconfig.electron.json"
echo ""

# Desktop resources
echo "🎨 Checking desktop resources..."
check_file "desktop-resources/entitlements.mac.plist"
check_optional "desktop-resources/icon.icns"
check_optional "desktop-resources/icon.ico"
check_optional "desktop-resources/icons/16x16.png"
check_optional "desktop-resources/icons/32x32.png"
check_optional "desktop-resources/icons/512x512.png"
echo ""

# GitHub Actions
echo "⚙️  Checking GitHub Actions..."
check_file ".github/workflows/release-desktop.yml"
check_file ".github/workflows/deploy-cloudflare.yml"
echo ""

# Build configuration
echo "🔧 Checking build configuration..."
check_file "vite.config.ts"
check_file "tsconfig.json"
check_file "tailwind.config.js"
echo ""

# Source files
echo "📦 Checking source structure..."
check_file "src/App.tsx"
check_file "src/index.css"
check_file "src/main.tsx"
check_file "index.html"
echo ""

# Version check
echo "🏷️  Checking version..."
VERSION=$(node -p "require('./package.json').version")
echo "   Current version: $VERSION"
echo ""

# Dependencies check
echo "📚 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules present"
    
    # Check critical dependencies
    CRITICAL_DEPS=("react" "electron" "electron-builder" "saxon-js")
    for dep in "${CRITICAL_DEPS[@]}"; do
        if [ -d "node_modules/$dep" ]; then
            echo -e "${GREEN}✓${NC} Dependency: $dep"
        else
            echo -e "${RED}✗${NC} Missing dependency: $dep"
            ((ERRORS++))
        fi
    done
else
    echo -e "${YELLOW}⚠${NC} node_modules not found. Run: npm ci"
    ((WARNINGS++))
fi
echo ""

# Git status
echo "📊 Checking Git status..."
if [ -d ".git" ]; then
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo "   Current branch: $BRANCH"
    
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠${NC} Working directory has uncommitted changes"
        ((WARNINGS++))
    else
        echo -e "${GREEN}✓${NC} Working directory is clean"
    fi
    
    # Check remote
    if git remote -v | grep -q "bluesover/transio"; then
        echo -e "${GREEN}✓${NC} Correct remote repository"
    else
        echo -e "${RED}✗${NC} Remote repository mismatch"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗${NC} Not a git repository"
    ((ERRORS++))
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Validation Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Perfect! Everything is ready for release.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review CHANGELOG.md and RELEASE.md"
    echo "  2. Run: ./prepare-release.sh"
    echo "  3. Or manually: git tag -a v$VERSION -m \"Release v$VERSION\" && git push origin v$VERSION"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Ready with $WARNINGS warning(s).${NC}"
    echo ""
    echo "You can proceed, but consider addressing the warnings above."
else
    echo -e "${RED}❌ Found $ERRORS error(s) and $WARNINGS warning(s).${NC}"
    echo ""
    echo "Please fix the errors above before creating a release."
    exit 1
fi

echo ""

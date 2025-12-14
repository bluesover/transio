#!/bin/bash

echo "🔧 Transio Dependency Fix Script"
echo "=================================="
echo ""
echo "This script will fix common dependency issues:"
echo "  ✓ Remove corrupted node_modules"
echo "  ✓ Remove package-lock.json"
echo "  ✓ Clean npm cache"
echo "  ✓ Reinstall all dependencies"
echo "  ✓ Fix server dependencies"
echo "  ✓ Verify installation"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Step 1/6: Removing node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "✅ Removed node_modules"
else
    echo "⊘ node_modules not found"
fi

echo ""
echo "Step 2/6: Removing package-lock.json..."
if [ -f "package-lock.json" ]; then
    rm package-lock.json
    echo "✅ Removed package-lock.json"
else
    echo "⊘ package-lock.json not found"
fi

echo ""
echo "Step 3/6: Cleaning npm cache..."
npm cache clean --force
echo "✅ npm cache cleaned"

echo ""
echo "Step 4/6: Installing dependencies (this may take a few minutes)..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to install dependencies"
    echo "Please check the error messages above and try again"
    exit 1
fi

echo "✅ Dependencies installed"

echo ""
echo "Step 5/6: Fixing server dependencies..."
if [ -d "server" ]; then
    cd server
    
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        echo "✅ Removed server/node_modules"
    fi
    
    if [ -f "package-lock.json" ]; then
        rm package-lock.json
        echo "✅ Removed server/package-lock.json"
    fi
    
    echo "Installing server dependencies..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Failed to install server dependencies"
        cd ..
        exit 1
    fi
    
    echo "✅ Server dependencies installed"
    cd ..
else
    echo "⊘ Server directory not found"
fi

echo ""
echo "Step 6/6: Verifying installation..."
echo ""

# Check if key dependencies are installed
MISSING=0

if [ ! -d "node_modules/vite" ]; then
    echo "❌ vite not found"
    ((MISSING++))
else
    echo "✅ vite installed"
fi

if [ ! -d "node_modules/react" ]; then
    echo "❌ react not found"
    ((MISSING++))
else
    echo "✅ react installed"
fi

if [ ! -d "node_modules/saxon-js" ]; then
    echo "❌ saxon-js not found"
    ((MISSING++))
else
    echo "✅ saxon-js installed"
fi

if [ ! -d "node_modules/@github/spark" ]; then
    echo "❌ @github/spark not found"
    ((MISSING++))
else
    echo "✅ @github/spark installed"
fi

echo ""

if [ $MISSING -eq 0 ]; then
    echo "🎉 All dependencies installed successfully!"
    echo ""
    echo "🔄 Next steps:"
    echo ""
    echo "1. Start development server:"
    echo "   npm run dev"
    echo ""
    echo "2. Or build for production:"
    echo "   npm run build"
    echo ""
    echo "3. If issues persist, check:"
    echo "   - Node.js version (should be 20 or higher)"
    echo "   - npm version (should be 10 or higher)"
    echo "   - Disk space (build requires ~500MB)"
    echo ""
else
    echo "❌ $MISSING critical dependencies are missing"
    echo ""
    echo "Please try:"
    echo "1. Check your internet connection"
    echo "2. Verify npm registry access: npm ping"
    echo "3. Run this script again"
    echo "4. If still failing, check npm logs in: ~/.npm/_logs/"
    echo ""
    exit 1
fi

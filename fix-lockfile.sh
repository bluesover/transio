#!/bin/bash

echo "🔧 Fixing package-lock.json synchronization issue..."
echo ""

# Remove the lock file and node_modules
echo "📦 Removing package-lock.json and node_modules..."
rm -f package-lock.json
rm -rf node_modules

echo "✅ Cleaned up"
echo ""

# Reinstall dependencies
echo "📥 Reinstalling dependencies with npm install..."
npm install

echo ""
echo "✅ Dependencies reinstalled successfully!"
echo ""
echo "Now you can run: npm run build"

#!/bin/bash

# Transio Server Setup & Test Script
# Run this from the project root directory

echo "🚀 Transio Server Setup & Test Script"
echo "======================================"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Install from: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "✅ Node.js: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo "✅ npm: $NPM_VERSION"

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed"
    echo "   Install Java 11+ from: https://adoptium.net/"
    echo ""
    echo "   macOS: brew install openjdk@17"
    echo "   Ubuntu: sudo apt-get install openjdk-17-jre"
    echo "   Windows: Download from https://adoptium.net/"
    exit 1
fi
JAVA_VERSION=$(java -version 2>&1 | head -n 1)
echo "✅ Java: $JAVA_VERSION"

echo ""
echo "======================================"
echo "✅ All prerequisites met!"
echo "======================================"
echo ""

# Navigate to server directory
if [ ! -d "server" ]; then
    echo "❌ Server directory not found"
    echo "   Make sure you're running this from the project root"
    exit 1
fi

cd server

# Run setup
echo "📦 Running server setup..."
echo "   This will install dependencies and download Saxon-HE (~8MB)"
echo ""

if npm run setup; then
    echo ""
    echo "======================================"
    echo "✅ Server setup completed successfully!"
    echo "======================================"
    echo ""
else
    echo ""
    echo "❌ Server setup failed"
    echo "   Check the error messages above"
    exit 1
fi

# Verify Saxon JAR
if [ -f "saxon/saxon-he-12.5.jar" ]; then
    echo "✅ Saxon JAR verified: saxon/saxon-he-12.5.jar"
else
    echo "❌ Saxon JAR not found"
    echo "   Try running manually:"
    echo "   cd server"
    echo "   npm run download-saxon"
    echo "   npm run extract-saxon"
    exit 1
fi

echo ""
echo "======================================"
echo "🎉 Server is ready to start!"
echo "======================================"
echo ""
echo "To start the server:"
echo "   cd server"
echo "   npm start"
echo ""
echo "To test the server:"
echo "   1. Start the server (in this terminal or new terminal):"
echo "      cd server && npm start"
echo ""
echo "   2. In another terminal, test the health endpoint:"
echo "      curl http://localhost:3001/api/health"
echo ""
echo "   3. Test a transformation:"
echo "      ./server/test-server.sh"
echo ""
echo "   4. Connect the frontend:"
echo "      - Run: npm run dev (from project root)"
echo "      - Open: http://localhost:5173"
echo "      - Click the Cloud icon (☁️) to configure server"
echo "      - Enable server and set URL: http://localhost:3001/api"
echo "      - Click Test Connection, then Save"
echo ""
echo "📖 For more details, see: SERVER_LOCAL_TEST_GUIDE.md"
echo ""

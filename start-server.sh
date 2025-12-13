#!/bin/bash

echo "🚀 Starting Transio Saxon-HE Server..."
echo ""

if [ ! -d "server" ]; then
    echo "❌ Error: server directory not found"
    echo "   Make sure you're running this from the project root"
    exit 1
fi

cd server

if [ ! -f "package.json" ]; then
    echo "❌ Error: server/package.json not found"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing server dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

if [ ! -f "saxon/saxon-he-12.5.jar" ]; then
    echo "⚠️  Saxon-HE JAR not found. Running setup..."
    npm run setup
    if [ $? -ne 0 ]; then
        echo "❌ Failed to setup Saxon-HE"
        exit 1
    fi
fi

echo ""
echo "✅ Starting server on http://localhost:3001"
echo "   Press Ctrl+C to stop"
echo ""

npm start

#!/bin/bash

echo "🚀 Starting Transio Saxon-HE Server..."
echo ""

PORT=${PORT:-3001}

if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "⚠️  Port $PORT is already in use"
    echo ""
    read -p "   Would you like to stop the existing server and restart? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "   Stopping existing server..."
        bash stop-server.sh
        sleep 2
    else
        echo ""
        echo "❌ Cannot start: Port $PORT is in use"
        echo "   Options:"
        echo "   1. Stop the existing server: ./stop-server.sh"
        echo "   2. Use a different port: PORT=3002 ./start-server.sh"
        echo ""
        exit 1
    fi
fi

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
echo "✅ Starting server on http://localhost:$PORT"
echo "   Press Ctrl+C to stop"
echo ""

PORT=$PORT npm start

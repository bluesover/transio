#!/bin/bash

echo "🚀 Starting Transio Saxon-HE Server..."
echo ""

PORT=${PORT:-3001}

# Check if port is in use
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "⚠️  Port $PORT is already in use"
    echo ""
    echo "   Attempting to automatically stop the existing server..."
    
    # Try to stop the server
    PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ -n "$PID" ]; then
        echo "   Found process $PID on port $PORT"
        kill -TERM $PID 2>/dev/null
        sleep 2
        
        # Check if process is still running
        if lsof -ti:$PORT > /dev/null 2>&1; then
            echo "   Process still running, forcing stop..."
            kill -9 $PID 2>/dev/null
            sleep 1
        fi
        
        # Final check
        if lsof -ti:$PORT > /dev/null 2>&1; then
            echo ""
            echo "❌ Failed to stop existing server"
            echo "   Please manually stop the process:"
            echo "   1. Run: ./stop-server.sh"
            echo "   2. Or use a different port: PORT=3002 ./start-server.sh"
            echo ""
            exit 1
        else
            echo "   ✅ Existing server stopped successfully"
        fi
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

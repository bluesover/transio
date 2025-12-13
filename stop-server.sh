#!/bin/bash

echo "🛑 Stopping Transio Saxon-HE Server..."

PORT=${PORT:-3001}

PID=$(lsof -ti:$PORT 2>/dev/null)

if [ -z "$PID" ]; then
    echo "✅ No server running on port $PORT"
    exit 0
fi

echo "   Found process $PID on port $PORT"
kill -TERM $PID 2>/dev/null

sleep 2

if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "   Process still running, forcing stop..."
    kill -9 $PID 2>/dev/null
    sleep 1
fi

if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "❌ Failed to stop server"
    exit 1
else
    echo "✅ Server stopped successfully"
fi

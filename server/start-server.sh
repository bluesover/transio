#!/bin/bash

echo "Starting Transio Saxon-HE Server..."
cd "$(dirname "$0")"

if [ ! -f "saxon/saxon-he-12.5.jar" ]; then
    echo "ERROR: Saxon-HE not found!"
    echo "Please run: ./install.sh"
    exit 1
fi

echo "Server starting on http://localhost:3001"
echo "Press Ctrl+C to stop the server"
echo ""

node index.js

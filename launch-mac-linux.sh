#!/bin/bash

# Make this file executable: chmod +x launch-mac-linux.sh

clear

echo "================================================"
echo "   XML/XSLT Transformer"
echo "   Free Local Transformation Tool"
echo "================================================"
echo ""
echo "Starting application..."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Project Folder: $SCRIPT_DIR"
echo ""

# Open the deployed app
# REPLACE THE URL BELOW WITH YOUR DEPLOYED APP URL
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "https://YOUR_APP_NAME.netlify.app/"
else
    # Linux
    xdg-open "https://YOUR_APP_NAME.netlify.app/" 2>/dev/null || 
    firefox "https://YOUR_APP_NAME.netlify.app/" 2>/dev/null ||
    google-chrome "https://YOUR_APP_NAME.netlify.app/" 2>/dev/null
fi

echo ""
echo "==============================================="
echo "Application opened in your default browser"
echo "==============================================="
echo ""
echo "Your project folder is ready:"
echo "$SCRIPT_DIR"
echo ""
echo "The app will ask permission to access this"
echo "folder when you click the Folder button."
echo ""
echo "All your data is stored locally on your computer."
echo "No internet connection needed after loading."
echo ""
echo "==============================================="
echo ""
echo "Press any key to close this window..."
read -n 1 -s

@echo off
echo Starting Transio Saxon-HE Server...
cd /d "%~dp0"

if not exist "saxon\saxon-he-12.5.jar" (
    echo ERROR: Saxon-HE not found!
    echo Please run: install.bat
    pause
    exit /b 1
)

echo Server starting on http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

node index.js

if errorlevel 1 (
    echo.
    echo ERROR: Server failed to start
    echo Check if Node.js is installed and port 3001 is available
    pause
)

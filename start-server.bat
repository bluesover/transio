@echo off
setlocal

if "%PORT%"=="" set PORT=3001

echo.
echo 🚀 Starting Transio Saxon-HE Server...
echo.

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING" 2^>nul') do (
    echo ⚠️  Port %PORT% is already in use
    echo.
    set /p RESTART="   Would you like to stop the existing server and restart? (y/n): "
    
    if /i "!RESTART!"=="y" (
        echo    Stopping existing server...
        call stop-server.bat %PORT%
        timeout /t 2 /nobreak >nul
    ) else (
        echo.
        echo ❌ Cannot start: Port %PORT% is in use
        echo    Options:
        echo    1. Stop the existing server: stop-server.bat
        echo    2. Use a different port: set PORT=3002 ^&^& start-server.bat
        echo.
        exit /b 1
    )
    goto :continue
)

:continue

if not exist "server\" (
    echo ❌ Error: server directory not found
    echo    Make sure you're running this from the project root
    exit /b 1
)

cd server

if not exist "package.json" (
    echo ❌ Error: server/package.json not found
    exit /b 1
)

if not exist "node_modules\" (
    echo 📦 Installing server dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        exit /b 1
    )
)

if not exist "saxon\saxon-he-12.5.jar" (
    echo ⚠️  Saxon-HE JAR not found. Running setup...
    call npm run setup
    if errorlevel 1 (
        echo ❌ Failed to setup Saxon-HE
        exit /b 1
    )
)

echo.
echo ✅ Starting server on http://localhost:%PORT%
echo    Press Ctrl+C to stop
echo.

set PORT=%PORT%
call npm start

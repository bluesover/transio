@echo off
setlocal enabledelayedexpansion

if "%PORT%"=="" set PORT=3001

echo.
echo 🚀 Starting Transio Saxon-HE Server...
echo.

REM Check if port is in use
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING" 2^>nul') do (
    echo ⚠️  Port %PORT% is already in use
    echo.
    echo    Attempting to automatically stop the existing server...
    
    REM Get PID and kill it
    for /f "tokens=5" %%p in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
        echo    Found process %%p on port %PORT%
        taskkill /F /PID %%p >nul 2>&1
        timeout /t 2 /nobreak >nul
    )
    
    REM Check again if port is free
    for /f "tokens=5" %%b in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING" 2^>nul') do (
        echo.
        echo ❌ Failed to stop existing server
        echo    Please manually stop the process:
        echo    1. Run: stop-server.bat
        echo    2. Or use a different port: set PORT=3002 ^&^& start-server.bat
        echo.
        exit /b 1
    )
    
    echo    ✅ Existing server stopped successfully
)

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

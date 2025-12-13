@echo off
echo.
echo Starting Transio Saxon-HE Server...
echo.

if not exist "server\" (
    echo Error: server directory not found
    echo Make sure you're running this from the project root
    exit /b 1
)

cd server

if not exist "package.json" (
    echo Error: server/package.json not found
    exit /b 1
)

if not exist "node_modules\" (
    echo Installing server dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies
        exit /b 1
    )
)

if not exist "saxon\saxon-he-12.5.jar" (
    echo Saxon-HE JAR not found. Running setup...
    call npm run setup
    if errorlevel 1 (
        echo Failed to setup Saxon-HE
        exit /b 1
    )
)

echo.
echo Starting server on http://localhost:3001
echo Press Ctrl+C to stop
echo.

call npm start

@echo off
REM Transio Server Setup & Test Script for Windows
REM Run this from the project root directory

echo.
echo ========================================
echo 🚀 Transio Server Setup ^& Test Script
echo ========================================
echo.

REM Check Node.js
echo 📋 Checking prerequisites...
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo    Install from: https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js: %NODE_VERSION%

REM Check npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm: %NPM_VERSION%

REM Check Java
where java >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java is not installed
    echo    Install Java 11+ from: https://adoptium.net/
    echo    Download the .msi installer and restart your terminal
    exit /b 1
)

for /f "tokens=*" %%i in ('java -version 2^>^&1 ^| findstr /i "version"') do set JAVA_VERSION=%%i
echo ✅ Java: %JAVA_VERSION%

echo.
echo ========================================
echo ✅ All prerequisites met!
echo ========================================
echo.

REM Check server directory
if not exist "server" (
    echo ❌ Server directory not found
    echo    Make sure you're running this from the project root
    exit /b 1
)

cd server

REM Run setup
echo 📦 Running server setup...
echo    This will install dependencies and download Saxon-HE (~8MB)
echo.

call npm run setup
if %errorlevel% neq 0 (
    echo.
    echo ❌ Server setup failed
    echo    Check the error messages above
    exit /b 1
)

echo.
echo ========================================
echo ✅ Server setup completed successfully!
echo ========================================
echo.

REM Verify Saxon JAR
if exist "saxon\saxon-he-12.5.jar" (
    echo ✅ Saxon JAR verified: saxon\saxon-he-12.5.jar
) else (
    echo ❌ Saxon JAR not found
    echo    Try running manually:
    echo    cd server
    echo    npm run download-saxon
    echo    node scripts\extract-saxon.js
    exit /b 1
)

echo.
echo ========================================
echo 🎉 Server is ready to start!
echo ========================================
echo.
echo To start the server:
echo    cd server
echo    npm start
echo.
echo To test the server:
echo    1. Start the server (in this window or new Command Prompt):
echo       cd server ^&^& npm start
echo.
echo    2. In another Command Prompt, test the health endpoint:
echo       curl http://localhost:3001/api/health
echo.
echo    3. Test a transformation:
echo       cd server
echo       test-server.bat
echo.
echo    4. Connect the frontend:
echo       - Run: npm run dev (from project root)
echo       - Open: http://localhost:5173
echo       - Click the Cloud icon to configure server
echo       - Enable server and set URL: http://localhost:3001/api
echo       - Click Test Connection, then Save
echo.
echo 📖 For more details, see: SERVER_LOCAL_TEST_GUIDE.md
echo.

cd ..

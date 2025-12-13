@echo off
echo 🛑 Stopping Transio Saxon-HE Server...

set PORT=3001
if not "%1"=="" set PORT=%1

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
    echo    Found process %%a on port %PORT%
    taskkill /PID %%a /F
    if errorlevel 1 (
        echo ❌ Failed to stop server
        exit /b 1
    ) else (
        echo ✅ Server stopped successfully
    )
    goto :done
)

echo ✅ No server running on port %PORT%

:done

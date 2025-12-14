@echo off
setlocal enabledelayedexpansion

echo =============================================
echo    Transio Dependency Fix Script
echo =============================================
echo.
echo This script will fix common dependency issues:
echo   * Remove corrupted node_modules
echo   * Remove package-lock.json
echo   * Clean npm cache
echo   * Reinstall all dependencies
echo   * Fix server dependencies
echo   * Verify installation
echo.
set /p CONTINUE="Continue? (Y/N): "
if /i not "%CONTINUE%"=="Y" (
    echo Cancelled.
    exit /b 1
)

echo.
echo Step 1/6: Removing node_modules...
if exist "node_modules\" (
    rmdir /s /q "node_modules"
    echo [OK] Removed node_modules
) else (
    echo [SKIP] node_modules not found
)

echo.
echo Step 2/6: Removing package-lock.json...
if exist "package-lock.json" (
    del /q "package-lock.json"
    echo [OK] Removed package-lock.json
) else (
    echo [SKIP] package-lock.json not found
)

echo.
echo Step 3/6: Cleaning npm cache...
call npm cache clean --force
echo [OK] npm cache cleaned

echo.
echo Step 4/6: Installing dependencies (this may take a few minutes)...
call npm install

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to install dependencies
    echo Please check the error messages above and try again
    exit /b 1
)

echo [OK] Dependencies installed

echo.
echo Step 5/6: Fixing server dependencies...
if exist "server\" (
    cd server
    
    if exist "node_modules\" (
        rmdir /s /q "node_modules"
        echo [OK] Removed server/node_modules
    )
    
    if exist "package-lock.json" (
        del /q "package-lock.json"
        echo [OK] Removed server/package-lock.json
    )
    
    echo Installing server dependencies...
    call npm install
    
    if errorlevel 1 (
        echo.
        echo [ERROR] Failed to install server dependencies
        cd ..
        exit /b 1
    )
    
    echo [OK] Server dependencies installed
    cd ..
) else (
    echo [SKIP] Server directory not found
)

echo.
echo Step 6/6: Verifying installation...
echo.

set MISSING=0

if not exist "node_modules\vite\" (
    echo [ERROR] vite not found
    set /a MISSING+=1
) else (
    echo [OK] vite installed
)

if not exist "node_modules\react\" (
    echo [ERROR] react not found
    set /a MISSING+=1
) else (
    echo [OK] react installed
)

if not exist "node_modules\saxon-js\" (
    echo [ERROR] saxon-js not found
    set /a MISSING+=1
) else (
    echo [OK] saxon-js installed
)

if not exist "node_modules\@github\spark\" (
    echo [ERROR] @github/spark not found
    set /a MISSING+=1
) else (
    echo [OK] @github/spark installed
)

echo.

if %MISSING%==0 (
    echo =============================================
    echo    All dependencies installed successfully!
    echo =============================================
    echo.
    echo Next steps:
    echo.
    echo 1. Start development server:
    echo    npm run dev
    echo.
    echo 2. Or build for production:
    echo    npm run build
    echo.
    echo 3. If issues persist, check:
    echo    - Node.js version ^(should be 20 or higher^)
    echo    - npm version ^(should be 10 or higher^)
    echo    - Disk space ^(build requires ~500MB^)
    echo.
) else (
    echo =============================================
    echo    %MISSING% critical dependencies are missing
    echo =============================================
    echo.
    echo Please try:
    echo 1. Check your internet connection
    echo 2. Verify npm registry access: npm ping
    echo 3. Run this script again
    echo 4. If still failing, check npm logs
    echo.
    exit /b 1
)

pause

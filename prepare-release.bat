@echo off
REM Transio v1.0.0 Release Preparation Script (Windows)
REM This script prepares everything needed for the v1.0.0 release

echo.
echo ========================================
echo Preparing Transio v1.0.0 Release
echo ========================================
echo.

SET VERSION=1.0.0
SET TAG=v%VERSION%

REM Check if we're in the right directory
if not exist package.json (
    echo [ERROR] package.json not found. Please run this script from the project root.
    exit /b 1
)

echo [INFO] Checking current version in package.json...
node -p "require('./package.json').version" > temp_version.txt
set /p CURRENT_VERSION=<temp_version.txt
del temp_version.txt

if not "%CURRENT_VERSION%"=="%VERSION%" (
    echo [WARNING] Version in package.json is %CURRENT_VERSION%, expected %VERSION%
    echo [INFO] Updating version to %VERSION%...
    call npm version %VERSION% --no-git-tag-version
    if errorlevel 1 (
        echo [ERROR] Failed to update version
        exit /b 1
    )
    echo [SUCCESS] Version updated to %VERSION%
) else (
    echo [SUCCESS] Version is already %VERSION%
)

REM Check critical files
echo [INFO] Verifying release files...

if exist README.md (echo [OK] README.md) else (echo [ERROR] Missing README.md & exit /b 1)
if exist LICENSE (echo [OK] LICENSE) else (echo [ERROR] Missing LICENSE & exit /b 1)
if exist CHANGELOG.md (echo [OK] CHANGELOG.md) else (echo [ERROR] Missing CHANGELOG.md & exit /b 1)
if exist RELEASE.md (echo [OK] RELEASE.md) else (echo [ERROR] Missing RELEASE.md & exit /b 1)
if exist package.json (echo [OK] package.json) else (echo [ERROR] Missing package.json & exit /b 1)
if exist package-lock.json (echo [OK] package-lock.json) else (echo [ERROR] Missing package-lock.json & exit /b 1)
if exist .github\workflows\release-desktop.yml (echo [OK] release-desktop.yml) else (echo [ERROR] Missing release-desktop.yml & exit /b 1)

REM Verify dependencies
echo [INFO] Verifying dependencies...
if not exist node_modules (
    echo [WARNING] node_modules not found. Installing dependencies...
    call npm ci
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed
) else (
    echo [SUCCESS] Dependencies already installed
)

REM Test build
echo [INFO] Testing web build...
call npm run build
if errorlevel 1 (
    echo [ERROR] Web build failed. Please fix errors before releasing.
    exit /b 1
)
echo [SUCCESS] Web build successful

REM Test TypeScript compilation
echo [INFO] Testing Electron TypeScript compilation...
call npx tsc -p tsconfig.electron.json --noEmit
if errorlevel 1 (
    echo [ERROR] Electron TypeScript compilation failed. Please fix errors before releasing.
    exit /b 1
)
echo [SUCCESS] Electron TypeScript compilation successful

echo.
echo ========================================
echo Release Checklist for v%VERSION%
echo ========================================
echo.
echo [OK] Version updated to %VERSION%
echo [OK] All required files present
echo [OK] Web build successful
echo [OK] Electron TypeScript compilation successful
echo.
echo ========================================
echo.
echo [INFO] To create the release tag, run:
echo.
echo   git tag -a %TAG% -m "Release version %VERSION%"
echo   git push origin %TAG%
echo.
echo [INFO] This will trigger GitHub Actions to build desktop apps.
echo.
echo [INFO] Monitor the build at:
echo   https://github.com/bluesover/transio/actions
echo.
echo [SUCCESS] Release preparation complete!
echo.
pause

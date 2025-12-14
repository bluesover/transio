@echo off
REM Transio Desktop App Installer for Windows
REM This script installs all dependencies and builds the desktop app

setlocal enabledelayedexpansion

echo ╔══════════════════════════════════════════════════════════╗
echo ║        Transio Desktop App - One-Click Installer        ║
echo ║                    transio.org                           ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
echo Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo.
    echo Please install Node.js 18+ from:
    echo https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)

echo [OK] npm detected
npm -v

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] git is not installed
    echo Please install git from: https://git-scm.com/
    pause
    exit /b 1
)

echo [OK] git detected
echo.

REM Install dependencies
echo Installing application dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed
echo.

REM Install server dependencies
echo Installing server dependencies...
call npm run server:install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)

echo [OK] Server dependencies installed
echo.

REM Build desktop application
echo Building Windows desktop application...
echo.

call npm run electron:build:win

if %errorlevel% equ 0 (
    echo.
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║              Build completed successfully!              ║
    echo ╚══════════════════════════════════════════════════════════╝
    echo.
    echo Installation files created in: dist-desktop\
    echo.
    echo To install:
    echo   1. Run dist-desktop\Transio-Setup-*.exe for full installation
    echo   OR
    echo   2. Run dist-desktop\Transio-Portable-*.exe for portable version
    echo.
    echo The installer will guide you through the setup process.
    echo.
) else (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo Thank you for using Transio!
echo Visit https://transio.org for documentation and support
echo.

pause

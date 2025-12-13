@echo off
setlocal enabledelayedexpansion

title Transio Saxon-HE Server Installer

echo.
echo ===================================================================
echo   Transio Saxon-HE Server - One-Click Installer (Windows)
echo ===================================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    echo.
    echo Please reinstall Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo npm found:
npm --version
echo.

echo Running installation script...
echo.

node install.js

if %errorlevel% neq 0 (
    echo.
    echo ===================================================================
    echo   Installation encountered errors
    echo ===================================================================
    echo.
    pause
    exit /b 1
)

echo.
echo ===================================================================
echo   Installation script completed
echo ===================================================================
echo.
echo Press any key to exit...
pause >nul

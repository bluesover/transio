@echo off
REM Icon Generation Script for Transio Desktop App (Windows)
REM This script generates all required icon formats from a source PNG image
REM Requirements: ImageMagick (https://imagemagick.org/script/download.php#windows)

setlocal enabledelayedexpansion

echo ========================================
echo     Transio Icon Generator (Windows)
echo ========================================
echo.

set "SOURCE_IMAGE=src\assets\images\E8CE4860-D5D3-4364-83BB-B0F6E7699240.png"
set "ICONS_DIR=desktop-resources\icons"

if not exist "%SOURCE_IMAGE%" (
    echo ERROR: Source image not found at %SOURCE_IMAGE%
    echo.
    echo Please ensure the logo image exists at the specified location.
    pause
    exit /b 1
)

if not exist "%ICONS_DIR%" mkdir "%ICONS_DIR%"

echo Checking for ImageMagick...
where magick >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: ImageMagick is not installed or not in PATH
    echo.
    echo Please install ImageMagick from:
    echo https://imagemagick.org/script/download.php#windows
    echo.
    echo Make sure to check "Add application directory to system path" during installation.
    echo.
    pause
    exit /b 1
)

echo ImageMagick found!
echo.

echo Generating PNG icons for Linux...

set SIZES=16 24 32 48 64 96 128 256 512 1024

for %%s in (%SIZES%) do (
    echo    Creating %%sx%%s.png...
    magick "%SOURCE_IMAGE%" -resize %%sx%%s -background none -gravity center -extent %%sx%%s "%ICONS_DIR%\%%sx%%s.png"
)

echo.
echo Generating .ico for Windows...

set ICO_TEMP=%ICONS_DIR%\temp_ico
if not exist "%ICO_TEMP%" mkdir "%ICO_TEMP%"

set ICO_SIZES=16 24 32 48 64 128 256

for %%s in (%ICO_SIZES%) do (
    magick "%SOURCE_IMAGE%" -resize %%sx%%s -background none -gravity center -extent %%sx%%s "%ICO_TEMP%\%%s.png"
)

magick "%ICO_TEMP%\16.png" "%ICO_TEMP%\24.png" "%ICO_TEMP%\32.png" "%ICO_TEMP%\48.png" "%ICO_TEMP%\64.png" "%ICO_TEMP%\128.png" "%ICO_TEMP%\256.png" "%ICONS_DIR%\icon.ico"

rmdir /s /q "%ICO_TEMP%"

echo.
echo ========================================
echo Icon generation complete!
echo ========================================
echo.
echo Generated files in %ICONS_DIR%:
dir /b "%ICONS_DIR%"
echo.
echo Icon files created:
echo   * icon.ico (Windows) - Multi-resolution icon
echo   * Multiple PNG sizes for Linux (16x16 to 1024x1024)
echo.
echo NOTE: For macOS .icns file, run the generate-icons.sh script on a Mac or Linux system.
echo.
pause

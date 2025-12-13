@echo off
title XML/XSLT Transformer - Local Project
color 0A

echo ================================================
echo    XML/XSLT Transformer
echo    Free Local Transformation Tool
echo ================================================
echo.
echo Starting application...
echo.
echo Project Folder: %~dp0
echo.

REM Get the directory where this batch file is located
set "PROJECT_DIR=%~dp0"

REM Open the deployed app with project folder reference
REM REPLACE THE URL BELOW WITH YOUR DEPLOYED APP URL
start "" "https://YOUR_APP_NAME.netlify.app/"

echo.
echo ===============================================
echo Application opened in your default browser
echo ===============================================
echo.
echo Your project folder is ready:
echo %PROJECT_DIR%
echo.
echo The app will ask permission to access this
echo folder when you click the Folder button.
echo.
echo All your data is stored locally on your PC.
echo No internet connection needed after loading.
echo.
echo ===============================================
echo.
pause

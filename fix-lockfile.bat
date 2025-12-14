@echo off
echo 🔧 Fixing package-lock.json synchronization issue...
echo.

REM Remove the lock file and node_modules
echo 📦 Removing package-lock.json and node_modules...
if exist package-lock.json del /f /q package-lock.json
if exist node_modules rmdir /s /q node_modules

echo ✅ Cleaned up
echo.

REM Reinstall dependencies
echo 📥 Reinstalling dependencies with npm install...
call npm install

echo.
echo ✅ Dependencies reinstalled successfully!
echo.
echo Now you can run: npm run build
pause

# 🔧 Server Troubleshooting Guide

## Common Issue: Port Already in Use

### Quick Fix (Automatic)

The latest version of `start-server.sh` and `start-server.bat` **automatically stops** any existing server on port 3001 and restarts it.

**Just run:**

```bash
# Mac/Linux
./start-server.sh

# Windows
start-server.bat
```

The script will automatically:
1. Detect if port 3001 is in use
2. Stop the existing process
3. Start a fresh server

---

## Manual Solutions

### Mac/Linux

#### Option 1: Use the stop script
```bash
./stop-server.sh
./start-server.sh
```

#### Option 2: Find and kill the process manually
```bash
# Find the process using port 3001
lsof -ti:3001

# Kill the process (replace PID with the number from above)
kill -9 <PID>

# Or in one command:
kill -9 $(lsof -ti:3001)

# Then start the server
./start-server.sh
```

#### Option 3: Use a different port
```bash
PORT=3002 ./start-server.sh
```

Then update your app configuration to use port 3002.

---

### Windows

#### Option 1: Use the stop script
```cmd
stop-server.bat
start-server.bat
```

#### Option 2: Find and kill the process manually
```cmd
# Find the process using port 3001
netstat -aon | findstr :3001

# Kill the process (replace PID with the number from the last column)
taskkill /F /PID <PID>

# Then start the server
start-server.bat
```

#### Option 3: Use a different port
```cmd
set PORT=3002
start-server.bat
```

---

## If You're Switching Between Git Branches

When switching Git branches (especially when using `git stash`), you may need to restart the server because:

1. **Node modules changed** - Different branches may have different dependencies
2. **Server code changed** - The server implementation may be different
3. **Process is still running** - The old server process is still holding port 3001

### Recommended Workflow:

```bash
# 1. Stop the server before switching branches
./stop-server.sh

# 2. Switch your branch or apply stash
git stash
git pull
# or
git checkout other-branch

# 3. Reinstall dependencies (if needed)
cd server
npm install
cd ..

# 4. Start the server
./start-server.sh
```

---

## Checking If Server Is Running

### Mac/Linux:
```bash
# Check if anything is using port 3001
lsof -i:3001

# Check server health
curl http://localhost:3001/api/health
```

### Windows:
```cmd
# Check if anything is using port 3001
netstat -aon | findstr :3001

# Check server health (if you have curl)
curl http://localhost:3001/api/health
```

---

## Common Error Messages

### "EADDRINUSE: address already in use"
**Solution:** Port 3001 is in use. Use `./stop-server.sh` or the automatic restart in the updated scripts.

### "Saxon-HE not found"
**Solution:** Run the setup:
```bash
cd server
npm run setup
cd ..
./start-server.sh
```

### "Java command not found"
**Solution:** Install Java:
- **Mac:** `brew install openjdk@17`
- **Linux:** `sudo apt install openjdk-17-jdk`
- **Windows:** Download from [adoptium.net](https://adoptium.net/)

### "Failed to fetch" in app
**Solution:** 
1. Make sure server is running: `curl http://localhost:3001/api/health`
2. Check CORS settings in `server/index.js`
3. Check that your app is using `http://localhost:3001` as the API URL

---

## Advanced: Kill All Node Processes

⚠️ **Warning:** This will stop ALL Node.js processes on your system.

### Mac/Linux:
```bash
killall node
```

### Windows:
```cmd
taskkill /F /IM node.exe
```

---

## Server Configuration

### Change Port
Edit `.env` in the server directory:
```env
PORT=3002
```

Or set it as an environment variable:
```bash
# Mac/Linux
export PORT=3002
./start-server.sh

# Windows
set PORT=3002
start-server.bat
```

### Change Allowed Origins (for CORS)
Edit `server/index.js` line 17-24, or set environment variable:
```bash
export ALLOWED_ORIGINS="https://transio.org,http://localhost:5173"
```

---

## Quick Health Check Commands

```bash
# Is Java installed?
java -version

# Is Node installed?
node -v

# Is the server running?
curl http://localhost:3001/api/health

# What's using port 3001?
# Mac/Linux:
lsof -i:3001

# Windows:
netstat -aon | findstr :3001

# Is Saxon JAR present?
ls -la server/saxon/saxon-he-12.5.jar
```

---

## Still Having Issues?

1. **Check logs:** The terminal where you ran `start-server.sh` shows all logs
2. **Check temp files:** Sometimes temp files can pile up in `server/temp/`
   ```bash
   rm -rf server/temp/*
   ```
3. **Reinstall server:**
   ```bash
   cd server
   rm -rf node_modules saxon
   npm install
   npm run setup
   cd ..
   ./start-server.sh
   ```
4. **Check firewall:** Make sure port 3001 is not blocked by your firewall

---

## One-Command Full Reset

If everything is broken, here's a nuclear option:

### Mac/Linux:
```bash
#!/bin/bash
# Stop server
./stop-server.sh 2>/dev/null

# Kill any node processes
killall node 2>/dev/null

# Clean server
cd server
rm -rf node_modules saxon temp
npm install
npm run setup
cd ..

# Start fresh
./start-server.sh
```

### Windows:
```cmd
REM Stop server
call stop-server.bat

REM Kill node processes
taskkill /F /IM node.exe

REM Clean server
cd server
rmdir /s /q node_modules saxon temp
call npm install
call npm run setup
cd ..

REM Start fresh
call start-server.bat
```

---

## Prevention Tips

1. **Always stop the server before switching branches**
   ```bash
   ./stop-server.sh
   ```

2. **Use PM2 for production** (auto-restart, logging, monitoring)
   ```bash
   npm install -g pm2
   cd server
   pm2 start index.js --name transio-server
   pm2 logs transio-server
   pm2 stop transio-server
   ```

3. **Add to your workflow:**
   - Before `git pull`: `./stop-server.sh`
   - After `git pull`: `./start-server.sh`
   - Before `git stash`: `./stop-server.sh`

---

## Contact & Support

- **GitHub Issues:** Report bugs at your repository
- **Documentation:** See `server/README.md` for more details
- **Website:** https://transio.org

---

**Last Updated:** 2025-12-13

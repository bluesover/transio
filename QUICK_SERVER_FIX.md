# ⚡ Quick Server Fix

## Problem: Port 3001 Already in Use

### ✅ Solution (Automatic - Recommended)

The scripts now **automatically** kill the old process and restart:

```bash
# Mac/Linux
./start-server.sh

# Windows
start-server.bat
```

That's it! No prompts, no manual work. The script handles everything.

---

## Alternative: Interactive Server Manager

```bash
# Mac/Linux only
chmod +x server-manager.sh
./server-manager.sh
```

Choose from menu:
1. Start Server
2. Stop Server  
3. Restart Server
4. Server Status
5. View Logs
6. Setup Saxon-HE
7. Full Reset
8. Help

---

## Manual One-Liners

### Mac/Linux

```bash
# Stop and start in one command
./stop-server.sh && sleep 2 && ./start-server.sh

# Or kill the port and start
kill -9 $(lsof -ti:3001) 2>/dev/null; ./start-server.sh

# Use different port
PORT=3002 ./start-server.sh
```

### Windows

```cmd
REM Stop and start
call stop-server.bat && timeout /t 2 && call start-server.bat

REM Or find and kill manually
netstat -aon | findstr :3001
taskkill /F /PID <PID_FROM_ABOVE>
call start-server.bat

REM Use different port
set PORT=3002 && call start-server.bat
```

---

## When Git Stash/Pull Breaks Server

**Always stop before switching branches:**

```bash
# 1. Stop server
./stop-server.sh

# 2. Git operations
git stash
git pull
git checkout other-branch

# 3. Reinstall if needed
cd server && npm install && cd ..

# 4. Restart
./start-server.sh
```

---

## Full Reset (Nuclear Option)

If everything is broken:

```bash
# Stop all
./stop-server.sh
killall node  # Mac/Linux
# OR
taskkill /F /IM node.exe  # Windows

# Clean everything
cd server
rm -rf node_modules saxon temp  # Mac/Linux
# OR  
rmdir /s /q node_modules saxon temp  # Windows

# Reinstall
npm install
npm run setup

# Start fresh
cd ..
./start-server.sh
```

---

## Quick Health Check

```bash
# Is it running?
curl http://localhost:3001/api/health

# What's on port 3001?
lsof -i:3001  # Mac/Linux
netstat -aon | findstr :3001  # Windows

# Is Java installed?
java -version

# Is Saxon present?
ls -la server/saxon/saxon-he-12.5.jar
```

---

## 📚 More Help

- **Full Guide:** [SERVER_TROUBLESHOOTING_GUIDE.md](./SERVER_TROUBLESHOOTING_GUIDE.md)
- **Installation:** [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)
- **Architecture:** [SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md)

---

**TL;DR: Just run `./start-server.sh` - it handles everything automatically now! 🚀**

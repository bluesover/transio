# Server Installation Instructions

## Quick Start

Choose your platform and follow the instructions:

### 🪟 Windows Users
**Two simple steps:**
1. Double-click **`install.bat`** in this folder
2. After installation, double-click **`start-server.bat`**

That's it! The installer handles everything automatically.

---

### 🍎 Mac Users
**Open Terminal and run:**
```bash
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

Or drag this folder to Terminal and type:
```bash
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

---

### 🐧 Linux Users
**Open Terminal and run:**
```bash
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

---

### 📦 Using npm (All Platforms)
```bash
npm install
npm run install-server
npm start
```

---

## What the Installer Does

1. ✅ Checks for Node.js and Java
2. ✅ Installs npm dependencies
3. ✅ Downloads Saxon-HE (3.5 MB)
4. ✅ Extracts and configures everything
5. ✅ Creates launcher scripts
6. ✅ Tests the server

**Time:** ~2-3 minutes  
**Internet:** Required only during installation

---

## After Installation

Server will be running on: **http://localhost:3001**

### Connect the Web App:
1. Open Transio in your browser
2. Click the **☁️ cloud icon** in the toolbar
3. Enable "Enable Server"
4. Enter URL: `http://localhost:3001/api`
5. Click "Test Connection"
6. Click "Save"

---

## Requirements

### Node.js (Required)
Download from: https://nodejs.org/

### Java (Required)
The installer will check for Java. If not found:

**Windows:**
```powershell
winget install Microsoft.OpenJDK.17
```

**Mac:**
```bash
brew install openjdk@17
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install openjdk-17-jdk
```

---

## Troubleshooting

### "Java not found"
Install Java (see above), restart your terminal/command prompt, run installer again

### "Port 3001 already in use"
Change port:
- Windows: `set PORT=3002 && npm start`
- Mac/Linux: `PORT=3002 npm start`

### "Connection failed" in web app
- Make sure server is running (check terminal/command window)
- Verify URL is correct: `http://localhost:3001/api`
- Check firewall settings

---

## Documentation

- **Complete Guide:** `../SERVER_INSTALL_GUIDE.md`
- **API Reference:** `README.md` (in this folder)
- **Visual Guide:** `../INSTALL_SERVER_VISUAL.md`
- **Quick Reference:** `../SERVER_QUICK_START.md`

---

## Support

Having issues? Check:
1. `../SERVER_TROUBLESHOOTING.md`
2. Server logs in your terminal/command window
3. Health endpoint: http://localhost:3001/api/health

---

**The installer makes it easy - just run it and follow the prompts!**

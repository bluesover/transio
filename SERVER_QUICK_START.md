# ⚡ Server Quick Start - One Page Reference

## 🎯 One-Click Installation

### Windows
```
1. Open: server folder
2. Double-click: install.bat
3. Wait for completion
4. Double-click: start-server.bat
```

### Mac/Linux
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

### npm (All Platforms)
```bash
cd server
npm install
npm run install-server
npm start
```

---

## ✅ Verify Installation

**Open browser:**
```
http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5"
}
```

---

## 🔗 Connect to Web App

1. Open Transio web app
2. Click **☁️** (cloud icon) in toolbar
3. Enable: **"Enable Server"**
4. API URL: `http://localhost:3001/api`
5. Click: **"Test Connection"** → ✅ Success
6. Click: **"Save"**

---

## 🛠️ Quick Troubleshooting

### Java not installed?
```bash
# Windows
winget install Microsoft.OpenJDK.17

# Mac
brew install openjdk@17

# Linux (Ubuntu/Debian)
sudo apt-get install openjdk-17-jdk
```

### Port 3001 busy?
```bash
# Windows
set PORT=3002 && npm start

# Mac/Linux
PORT=3002 npm start
```

### Saxon not downloaded?
```bash
cd server
npm run download-saxon
npm run extract-saxon
```

---

## 📁 File Structure

```
server/
├── install.bat          ← Windows installer
├── install.sh           ← Mac/Linux installer
├── start-server.bat     ← Windows launcher
├── start-server.sh      ← Mac/Linux launcher
├── install.js           ← Main installer script
├── index.js             ← Server code
└── saxon/
    └── saxon-he-12.5.jar ← Downloaded by installer
```

---

## 🚀 Server Commands

```bash
npm start              # Start server
npm run install-server # Run installer
npm run dev            # Development mode
npm test               # Test connection
```

---

## 📊 What Gets Installed

- ✅ Node.js dependencies (express, cors, etc.)
- ✅ Saxon-HE 12.5 JAR (~3.5 MB)
- ✅ Launcher scripts
- ✅ Temp folder structure

---

## 🌐 API Endpoints

**Health Check:**
```
GET http://localhost:3001/api/health
```

**Transform:**
```
POST http://localhost:3001/api/transform
Content-Type: application/json

{
  "xml": "<?xml version=\"1.0\"?><root>data</root>",
  "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet ...>",
  "version": "2.0"
}
```

---

## 💡 Why Use Server?

| Feature | Browser (Saxon-JS) | Server (Saxon-HE) |
|---------|-------------------|-------------------|
| XSLT 1.0 | ✅ Full | ✅ Full |
| XSLT 2.0 | ⚠️ Limited | ✅ Full |
| XSLT 3.0 | ⚠️ Limited | ✅ Full |
| File Size | < 1 MB | Up to 10 MB |
| Performance | Good | Excellent |
| for-each-group | ❌ | ✅ |
| regex | ⚠️ Limited | ✅ Full |

---

## 📚 Full Documentation

- 📘 [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md) - Complete guide
- 🔧 [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md) - Troubleshooting
- 📖 [server/README.md](./server/README.md) - API reference
- 🏗️ [SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md) - Architecture

---

**Installation takes ~2-3 minutes • Server runs on localhost • 100% open source • MIT + MPL-2.0 licensed**

# 📚 Server Documentation Index

Complete guide to all server-related documentation.

---

## 🚀 Getting Started

| Document | Purpose | Audience |
|----------|---------|----------|
| **[BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)** | Should I use the server? | Decision making |
| **[SERVER_INSTALL_1_PAGE.md](./SERVER_INSTALL_1_PAGE.md)** | Ultra-quick one-page reference | Everyone (start here!) |
| **[SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)** | Complete installation guide | First-time users |
| **[INSTALL_SERVER_VISUAL.md](./INSTALL_SERVER_VISUAL.md)** | Visual guide with step-by-step screenshots | Visual learners |
| **[SERVER_QUICK_START.md](./SERVER_QUICK_START.md)** | Quick reference card | Quick lookup |
| **[server/INSTALLATION_README.md](./server/INSTALLATION_README.md)** | README in server folder | Users browsing server folder |

---

## 🛠️ Installation Files

| File | Platform | Description |
|------|----------|-------------|
| **server/install.bat** | Windows | Windows one-click installer |
| **server/install.sh** | Mac/Linux | Unix one-click installer |
| **server/install.js** | All | Main installer script |
| **server/start-server.bat** | Windows | Windows launcher (created by installer) |
| **server/start-server.sh** | Mac/Linux | Unix launcher (created by installer) |

### How to Use

**Windows:**
```
1. Double-click: server/install.bat
2. Double-click: server/start-server.bat
```

**Mac/Linux:**
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

**npm:**
```bash
cd server
npm install
npm run install-server
npm start
```

---

## 📖 Reference Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| **[server/README.md](./server/README.md)** | API reference and configuration | Developers |
| **[SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md)** | Technical architecture | Developers/DevOps |
| **[SAXON_SERVER_SETUP.md](./SAXON_SERVER_SETUP.md)** | Manual setup guide | Advanced users |
| **[SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)** | Troubleshooting guide | Support/debugging |

---

## 🐳 Deployment Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| **[server/QUICK_START.md](./server/QUICK_START.md)** | Docker quickstart | DevOps |
| **[server/Dockerfile](./server/Dockerfile)** | Docker container definition | DevOps |
| **[server/docker-compose.yml](./server/docker-compose.yml)** | Docker Compose config | DevOps |

---

## 🎯 Use Case Guide

### Should I install the server at all?
→ **[BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)**

### I want to install the server for the first time
→ **[SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)**

### I want the fastest possible reference
→ **[SERVER_INSTALL_1_PAGE.md](./SERVER_INSTALL_1_PAGE.md)**

### I'm a visual learner and want screenshots
→ **[INSTALL_SERVER_VISUAL.md](./INSTALL_SERVER_VISUAL.md)**

### I need to troubleshoot connection issues
→ **[SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)**

### I need API reference and configuration
→ **[server/README.md](./server/README.md)**

### I want to deploy with Docker
→ **[server/QUICK_START.md](./server/QUICK_START.md)**

### I want to understand the architecture
→ **[SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md)**

### I want to manually set up everything
→ **[SAXON_SERVER_SETUP.md](./SAXON_SERVER_SETUP.md)**

---

## 🔧 Common Tasks

### Install Server
```bash
# Windows: Double-click server/install.bat
# Mac/Linux:
cd server && chmod +x install.sh && ./install.sh
```

### Start Server
```bash
# Windows: Double-click server/start-server.bat
# Mac/Linux:
./server/start-server.sh
# Or:
cd server && npm start
```

### Test Server
```bash
curl http://localhost:3001/api/health
# Or visit in browser
```

### Connect Web App
1. Click ☁️ in toolbar
2. Enable "Enable Server"
3. URL: `http://localhost:3001/api`
4. Test → Save

### Change Port
```bash
# Windows
set PORT=3002 && npm start

# Mac/Linux
PORT=3002 npm start
```

---

## 📊 Quick Reference

### Installer Features
- ✅ Checks for Node.js and Java
- ✅ Installs npm dependencies
- ✅ Downloads Saxon-HE automatically (3.5 MB)
- ✅ Extracts and configures
- ✅ Creates launcher scripts
- ✅ Tests the server

### Requirements
- Node.js 18+
- Java 11+

### What Gets Installed
- Node.js dependencies (~5 MB)
- Saxon-HE 12.5 JAR (~3.5 MB)
- Launcher scripts
- Temp folder structure

### Installation Time
- ~2-3 minutes

### Server Details
- Port: 3001 (configurable)
- Protocol: HTTP + CORS
- Processor: Saxon-HE 12.5
- Max file size: 10 MB
- Timeout: 30 seconds
- Rate limit: 100 req/15min

---

## 🌐 API Endpoints

### Health Check
```
GET http://localhost:3001/api/health
```

### Transform
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

## 💡 Why Use the Server?

| Feature | Browser (Saxon-JS) | Server (Saxon-HE) |
|---------|-------------------|-------------------|
| XSLT 1.0 | ✅ Full | ✅ Full |
| XSLT 2.0 | ⚠️ Limited | ✅ Full |
| XSLT 3.0 | ⚠️ Limited | ✅ Full |
| Max file size | ~1 MB | 10 MB |
| Performance | Good | Excellent |
| for-each-group | ❌ | ✅ |
| Advanced regex | ⚠️ Basic | ✅ Full |
| Multiple outputs | ❌ | ✅ |
| License | MPL-2.0 | MPL-2.0 |
| Cost | Free | Free |

---

## 📞 Support Resources

### Documentation
- [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md) - Installation
- [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md) - Troubleshooting
- [server/README.md](./server/README.md) - API Reference

### Health Check
```
http://localhost:3001/api/health
```

### Server Logs
Check your terminal/command prompt where the server is running

### Common Issues
See [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)

---

## 📝 License

- Server code: MIT License
- Saxon-HE: Mozilla Public License 2.0 (MPL-2.0)
- Both are 100% open source and free to use

---

**Quick Start: [SERVER_INSTALL_1_PAGE.md](./SERVER_INSTALL_1_PAGE.md)**

# 🚀 START HERE - Server Installation

**Welcome!** This is your starting point for installing the optional Transio Saxon-HE server.

---

## ⚡ Quick Install (3 minutes)

### Windows
1. Open the `server` folder
2. **Double-click** `install.bat`
3. Wait ~3 minutes
4. **Double-click** `start-server.bat`
5. Done! Server at http://localhost:3001

### Mac / Linux
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```
Done! Server at http://localhost:3001

---

## 📚 Documentation

| I want to... | Go to... |
|-------------|----------|
| **See detailed install guide** | [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md) |
| **Decide if I need server** | [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md) |
| **Troubleshoot issues** | [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md) |
| **Understand architecture** | [SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md) |

---

## 🤔 Do I Need the Server?

**Use the server if you need:**
- ✅ `for-each-group` (XSLT 2.0 grouping)
- ✅ Advanced regex patterns
- ✅ Large files (>1 MB)
- ✅ Maximum performance
- ✅ Full XSLT 2.0/3.0 features

**Don't need server for:**
- ✅ All XSLT 1.0 transformations
- ✅ Simple XSLT 2.0 (no grouping)
- ✅ Files under 1 MB
- ✅ Quick prototyping

**Full comparison:** [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)

---

## 📋 Requirements

### Must Have
- **Node.js 18+** → [Download](https://nodejs.org/)
- **Java 11+** → [Download](https://adoptium.net/)

### Installation Commands (if needed)

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

## ✅ After Installation

1. Server runs on: **http://localhost:3001**
2. Open Transio web app
3. Click **☁️** (cloud icon)
4. Enable server
5. URL: `http://localhost:3001/api`
6. Click **Test Connection** → ✅
7. Click **Save**

---

## 🔗 Quick Links

- [Complete Installation Guide](./SERVER_INSTALL_GUIDE.md)
- [Browser vs Server Comparison](./BROWSER_VS_SERVER.md)
- [Troubleshooting Guide](./SERVER_TROUBLESHOOTING.md)
- [Architecture Details](./SAXON_SERVER_ARCHITECTURE.md)

---

## 🎯 Installation Summary

- ⏱️ **Time:** ~3 minutes
- 💾 **Disk Space:** ~15 MB
- 🌐 **Internet:** Required during install only
- 💰 **Cost:** Free (100% open source)
- 🔒 **Privacy:** 100% local (no data sent anywhere)
- 📜 **License:** MIT + MPL-2.0

---

## 🆘 Need Help?

- **Can't install Java?** See [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)
- **Connection fails?** See [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)
- **Want to understand architecture?** See [SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md)

---

**Ready? Choose your platform above and get started! 🚀**

**Not sure?** Read [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md) first.

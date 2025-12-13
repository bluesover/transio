# 🚀 Getting Started with Transio

Welcome! This guide will get you up and running in minutes.

---

## Choose Your Path

### 🌐 Just Use the Web App
👉 Visit **[transio.org](https://transio.org)** - no installation needed!

The web app runs entirely in your browser. Your data never leaves your computer.

---

### 💻 Run Locally (Development)

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

### 🚀 Deploy Your Own Instance

See deployment guides:
- **Quick:** [DEPLOY_NOW.md](./DEPLOY_NOW.md)
- **Simple:** [SIMPLE_DEPLOY_GUIDE.md](./SIMPLE_DEPLOY_GUIDE.md)
- **Complete:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

### 🖥️ Install Optional Server (Advanced XSLT 2.0/3.0)

**Do you need it?** Check [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)

**If yes:**

#### Windows
1. Open `server` folder
2. Double-click `install.bat`
3. Double-click `start-server.bat`

#### Mac/Linux
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

**Full guide:** [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)

---

## Quick Reference

### Web App Features
- ✅ XSLT 1.0 fully supported (no server needed)
- ⚠️ XSLT 2.0/3.0 limited support (install server for full support)
- ✅ Version management and history
- ✅ Code editor with syntax highlighting
- ✅ Import/export files
- ✅ Project folders with File System API
- ✅ Keyboard shortcuts
- ✅ 100% privacy - all processing local

### When to Install the Server
Install the server if you need:
- `for-each-group` (XSLT 2.0 grouping)
- Advanced regex patterns
- Large files (>1 MB)
- Maximum performance
- Full XSLT 2.0/3.0 feature set

### Don't Need the Server?
The web app works perfectly without it for:
- All XSLT 1.0 transformations
- Simple XSLT 2.0 transformations
- Files under 1 MB
- Quick prototyping

---

## Documentation

### 📖 Main Guides
- [README.md](./README.md) - Project overview
- [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md) - Browser vs Server comparison

### 🚀 Deployment
- [DEPLOY_NOW.md](./DEPLOY_NOW.md) - 5-minute deployment
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete guide

### 🖥️ Server Installation
- [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md) - Complete installation guide
- [SERVER_INSTALL_1_PAGE.md](./SERVER_INSTALL_1_PAGE.md) - One-page quick reference
- [SERVER_DOCUMENTATION_INDEX.md](./SERVER_DOCUMENTATION_INDEX.md) - All server docs

### 🏗️ Architecture
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Application architecture
- [SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md) - Server architecture

---

## Quick Commands

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Deployment
```bash
npm run deploy     # Deploy to GitHub Pages
```

### Server (optional)
```bash
cd server
npm run install-server   # One-click install
npm start                # Start server
npm test                 # Test connection
```

---

## Need Help?

1. **General questions:** Check [README.md](./README.md)
2. **Server issues:** See [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)
3. **Deployment help:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## Quick Links

- 🌐 **Live App:** [transio.org](https://transio.org)
- 📖 **Full README:** [README.md](./README.md)
- 🚀 **Deploy Guide:** [DEPLOY_NOW.md](./DEPLOY_NOW.md)
- 🖥️ **Server Install:** [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)
- 🤔 **Browser vs Server:** [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)

---

**Welcome to Transio! Start transforming XML with XSLT in seconds. 🎉**

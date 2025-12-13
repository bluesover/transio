# 🚀 Server Installation - One Page

## Prerequisites
- Node.js 18+ → [nodejs.org](https://nodejs.org)
- Java 11+ → [adoptium.net](https://adoptium.net) or commands below

---

## Install Java (if needed)

```bash
# Windows
winget install Microsoft.OpenJDK.17

# Mac
brew install openjdk@17

# Linux (Ubuntu/Debian)
sudo apt-get install openjdk-17-jdk
```

---

## Install & Start Server

### Windows
1. Open `server` folder
2. Double-click **`install.bat`**
3. Double-click **`start-server.bat`**

### Mac/Linux
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

### npm (all platforms)
```bash
cd server
npm install
npm run install-server
npm start
```

---

## Connect Web App

1. Open Transio web app
2. Click **☁️** (cloud icon)
3. Enable: **"Enable Server"**
4. URL: `http://localhost:3001/api`
5. Click **"Test Connection"** → ✅
6. Click **"Save"**

---

## Verify

Open browser: `http://localhost:3001/api/health`

Expected:
```json
{"status":"ok","processor":"Saxon-HE","version":"12.5"}
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Java not found | Install Java (see above), restart terminal |
| Port busy | `PORT=3002 npm start` |
| Connection fails | Check server is running |
| Saxon missing | `npm run download-saxon` |

---

**Done! Server is running on http://localhost:3001**

Full guide: [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)

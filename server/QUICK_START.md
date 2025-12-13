# Saxon Server - Quick Start

Get your Saxon-HE server running in 3 minutes.

## Prerequisites Check

```bash
# Check Java (need 11+)
java -version

# Check Node (need 18+)
node --version

# If missing, install from:
# Java: https://adoptium.net/
# Node: https://nodejs.org/
```

## 1. Install & Setup (One Command)

```bash
cd server
npm run setup
```

This will:
- ✅ Install Node dependencies
- ✅ Download Saxon-HE JAR
- ✅ Extract Saxon to correct location

## 2. Start Server

```bash
npm start
```

Expected output:
```
🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
🏥 Health check: http://localhost:3001/api/health
⚡ Transform endpoint: POST http://localhost:3001/api/transform
📦 Saxon JAR: ✅ Found
```

## 3. Test It

```bash
curl http://localhost:3001/api/health
```

Should see:
```json
{"status":"ok","processor":"Saxon-HE","version":"12.5"}
```

## 4. Configure Transio App

1. Open Transio in browser
2. Click **cloud icon** (☁️) in header
3. Enable "Server-Side Processing"
4. API URL: `http://localhost:3001/api`
5. Click "Test Connection" → Should show "Available"
6. Enable "Prefer Server for XSLT 2.0/3.0"
7. Save

## 5. Test XSLT 2.0

1. In Transio, click **Flask icon** (🧪)
2. Loads XSLT 2.0 grouping example
3. Click **Transform**
4. Check processor badge → Should say "Saxon-HE Server"

## ✅ Done!

You now have full XSLT 2.0/3.0 support.

## Troubleshooting

### "Saxon-HE not found"
```bash
cd server
npm run download-saxon
# Wait for download, then manually extract saxon.zip to server/saxon/
```

### "Java not found"
```bash
# Ubuntu/Debian
sudo apt-get install openjdk-11-jre

# macOS
brew install openjdk@11

# Windows - download from: https://adoptium.net/
```

### "Port already in use"
```bash
PORT=3002 npm start
```

## Production Deployment

**Railway (Easiest):**
1. Push to GitHub
2. Go to railway.app
3. New Project → Import from GitHub
4. Select repo, set root dir to `server`
5. Deploy
6. Copy URL → Use in Transio config

**DigitalOcean:**
1. Create App → Docker
2. Point to your GitHub repo
3. Set Dockerfile path: `server/Dockerfile`
4. Deploy
5. Copy URL → Use in Transio config

**Cost:** $0-12/month depending on platform

## Next Steps

- See [README.md](./README.md) for full API documentation
- See [../SAXON_SERVER_SETUP.md](../SAXON_SERVER_SETUP.md) for complete setup guide
- Add API key authentication (see README.md)
- Set up monitoring
- Configure custom domain

---

**Need Help?** Check the full setup guide: [../SAXON_SERVER_SETUP.md](../SAXON_SERVER_SETUP.md)

# ⚡ Transio Quick Start Guide

Get up and running in 5 minutes.

---

## 🎯 Two Options

### Option 1: Use Online (No Installation) ⭐ RECOMMENDED

**Just visit:** https://transio.org

✅ Works immediately  
✅ No setup required  
✅ Client-side transformation (Saxon-JS)  
✅ Perfect for most users  

---

### Option 2: Run Locally with Optional Server

Perfect for development or if you need enterprise features.

#### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/transio.git
cd transio

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Open http://localhost:5173

#### Step 2: Install Server (Optional)

**Only needed if:**
- Processing large XML files (>5MB)
- Running complex XSLT 2.0/3.0 transformations
- Need enterprise-grade performance

**Prerequisites:**
- Java 11+ installed ([Download here](https://adoptium.net/))

**Install & Start:**

**Mac/Linux:**
```bash
# Run automated setup
chmod +x test-server-setup.sh
./test-server-setup.sh

# Start the server
chmod +x start-server.sh
./start-server.sh
```

**Windows:**
```bash
# Run automated setup
test-server-setup.bat

# Start the server
start-server.bat
```

**Configure in App:**
1. Click the Cloud icon (☁️) in the header
2. Enter server URL: `http://localhost:3001/api`
3. Click "Test Connection"
4. Enable "Prefer server-side processing"
5. Save configuration

---

## 🚀 Deploy to Production

### Fastest: Cloudflare Pages (Free)

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Deploy:**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Click "Save and Deploy"

✅ **Done!** Your app is live in ~2 minutes.

### Alternatives

All use the same build settings:
- **Netlify** - netlify.com
- **Vercel** - vercel.com
- **GitHub Pages** - pages.github.com

Build command: `npm run build`  
Publish directory: `dist`

---

## 📊 Server Status Check

### Stop Server (if port conflict)

**Mac/Linux:**
```bash
chmod +x stop-server.sh
./stop-server.sh
```

**Windows:**
```bash
stop-server.bat
```

### Check if Server is Running

**All platforms:**
```bash
curl http://localhost:3001/api/health
```

**Or open in browser:**
http://localhost:3001/api/health

**Expected response:**
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5",
  "javaVersion": "11.0.12"
}
```

---

## 🎓 Usage Examples

### Transform XML with XSLT 1.0

1. Paste XML in the XML Input editor
2. Paste XSLT in the XSLT Stylesheet editor
3. Click "Transform" or press `Ctrl+Enter`
4. View output in the Output panel

### Use XSLT 2.0/3.0 Features

1. Enable manual version selection (click the lock icon)
2. Select "XSLT 2.0" or "XSLT 3.0" from dropdown
3. Use XSLT 2.0/3.0 features like:
   - `xsl:for-each-group`
   - `xsl:analyze-string`
   - XPath 2.0/3.0 functions
4. Transform with server for best compatibility

### Save Versions

1. Make changes to XML/XSLT
2. Click the save icon or press `Ctrl+S`
3. Enter version number and description
4. Click "Save Version"
5. View saved versions in the sidebar

### Import Files

- **Import XML:** Click XML input header → Download icon
- **Import XSLT:** Click XSLT input header → Download icon
- **Import Output:** Click Output header → Download icon

### Format Code

- **Format XML:** Click the indent icon or press `Ctrl+Shift+F`
- **Format XSLT:** Click the indent icon or press `Ctrl+Shift+G`

### Use Snippets

1. Press `Ctrl+K` or click the Code icon
2. Browse available XSLT templates
3. Click a snippet to insert it

---

## 🔧 Troubleshooting

### Port 3001 Already in Use

```bash
# Stop the existing server
./stop-server.sh  # Mac/Linux
stop-server.bat   # Windows

# Or use a different port
PORT=3002 ./start-server.sh        # Mac/Linux
set PORT=3002 && start-server.bat  # Windows
```

### Connection Failed

1. Verify server is running:
   ```bash
   curl http://localhost:3001/api/health
   ```

2. Check firewall isn't blocking port 3001

3. Ensure correct URL in app: `http://localhost:3001/api`

### Transformation Errors

**"Cannot access uninitialized variable"**
- Usually a XSLT version mismatch
- Enable manual mode and select XSLT 2.0 or 3.0
- Try server-side processing (click Cloud icon)

**"Transformation failed"**
- Check XML is well-formed
- Verify XSLT syntax
- Check browser console for details
- Try enabling server-side processing

### Java Not Found

**Mac:**
```bash
brew install openjdk@17
```

**Ubuntu/Debian:**
```bash
sudo apt-get install openjdk-17-jre
```

**Windows:**
Download from https://adoptium.net/

---

## 📖 More Documentation

- **SERVER_MANAGEMENT.md** - Complete server operations guide
- **DEPLOYMENT_STATUS_FINAL.md** - Deployment checklist
- **DEPLOYMENT_GUIDE.md** - Comprehensive deployment guide
- **SERVER_TROUBLESHOOTING.md** - Server-specific troubleshooting
- **XSLT_SUPPORT_GUIDE.md** - XSLT version details

---

## 🆘 Need Help?

1. Check the error message in the app
2. Review SERVER_MANAGEMENT.md
3. Test server health: `curl http://localhost:3001/api/health`
4. Check server logs in terminal
5. Open GitHub issue with error details

---

## ⚡ Keyboard Shortcuts

- `Ctrl+Enter` - Transform XML
- `Ctrl+S` - Save version
- `Ctrl+K` - Open snippets
- `Ctrl+Shift+F` - Format XML
- `Ctrl+Shift+G` - Format XSLT
- `Ctrl+Shift+I` - Import XML
- `Ctrl+Shift+O` - Import XSLT
- `?` - Show all shortcuts

---

**That's it! You're ready to transform XML with Transio.** 🎉

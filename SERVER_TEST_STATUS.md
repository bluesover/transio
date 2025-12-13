# 🧪 Server Local Testing Status

## ✅ What's Ready

Your Transio server is fully configured and ready to test! Here's what's already set up:

### Server Components
- ✅ Express API server (`server/index.js`)
- ✅ Saxon-HE integration for XSLT 2.0/3.0 support
- ✅ Download scripts for automatic Saxon-HE setup
- ✅ Security features (CORS, rate limiting, helmet)
- ✅ Docker support for containerized deployment
- ✅ Health check endpoint
- ✅ Transform API endpoint
- ✅ Comprehensive error handling
- ✅ Automatic temp file cleanup

### Frontend Integration
- ✅ Server configuration dialog with cloud icon
- ✅ Connection testing
- ✅ Fallback to client-side processing
- ✅ Server/client preference toggle
- ✅ Visual indicators for server usage
- ✅ Activity logging for server operations

### Documentation
- ✅ Complete setup guide (`server/README.md`)
- ✅ Quick start guide (`server/QUICK_START.md`)
- ✅ Local test guide (`SERVER_LOCAL_TEST_GUIDE.md`)
- ✅ Architecture documentation
- ✅ Deployment guides for multiple platforms

## 🎯 What You Need to Do

### Step 1: Run the Setup Script

Choose your platform and run the appropriate script from the **project root directory**:

**Mac/Linux:**
```bash
chmod +x test-server-setup.sh
./test-server-setup.sh
```

**Windows:**
```cmd
test-server-setup.bat
```

### Step 2: Start the Server

After setup completes:

```bash
cd server
npm start
```

### Step 3: Verify It's Working

In a new terminal:

```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5"
}
```

### Step 4: Test a Transformation

Run the test script:

**Mac/Linux:**
```bash
cd server
chmod +x test-server.sh
./test-server.sh
```

**Windows:**
```cmd
cd server
test-server.bat
```

### Step 5: Connect the Frontend

1. **Start the web app** (in a different terminal):
   ```bash
   npm run dev
   ```

2. **Open in browser**: http://localhost:5173

3. **Configure server**:
   - Click the ☁️ (Cloud) icon in the header
   - Enable "Use server-side processing"
   - Set API URL: `http://localhost:3001/api`
   - Click "Test Connection"
   - Click "Save"

4. **Test the integration**:
   - Click the 🧪 (Flask) icon to load XSLT 2.0 grouping example
   - Click "Transform"
   - Look for "Saxon-HE 12.5" badge on the output panel
   - Check Activity Log for "Server" mode confirmation

## 📋 Prerequisites Checklist

Before running the setup, make sure you have:

- [ ] **Node.js 18+** (`node --version`)
- [ ] **npm 8+** (`npm --version`)
- [ ] **Java 11+** (`java -version`)

### Installing Java (if needed)

**macOS:**
```bash
brew install openjdk@17
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jre
```

**Windows:**
- Download from: https://adoptium.net/
- Install the .msi installer
- **Important:** Restart your terminal/Command Prompt after installation

## 🐛 Common Issues & Solutions

### Issue: Java Not Found

**Symptom:** `java: command not found` or `'java' is not recognized`

**Solution:**
1. Install Java from https://adoptium.net/
2. **Windows users:** Restart terminal/Command Prompt
3. Verify: `java -version`

### Issue: Saxon JAR Not Downloading

**Symptom:** Download fails or times out

**Solution:**
```bash
cd server
npm run download-saxon
```

If that fails, manually download:
1. Go to: https://github.com/Saxonica/Saxon-HE/releases/download/SaxonHE12-5/SaxonHE12-5J.zip
2. Extract the zip file
3. Copy `saxon-he-12.5.jar` to `server/saxon/` directory

### Issue: Port 3001 Already in Use

**Solution:**
```bash
PORT=3002 npm start
```

Then update frontend config to use `http://localhost:3002/api`

### Issue: CORS Error in Browser

**Symptom:** Browser console shows CORS error

**Solution:**
1. Make sure server is running
2. Check server logs for errors
3. Verify API URL in frontend matches server address exactly
4. Try restarting both server and frontend

### Issue: Cannot Access Uninitialized Variable

**This is not a server issue!** This is an XSLT variable scoping error.

**Solution:**
1. Check your XSLT stylesheet
2. Ensure variables are declared before use
3. Test with the sample XSLT 2.0 grouping example first (Flask icon)

## 📊 What Success Looks Like

### Server Console
```
🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
🏥 Health check: http://localhost:3001/api/health
⚡ Transform endpoint: POST http://localhost:3001/api/transform

📦 Saxon JAR: ✅ Found
```

### Health Check Response
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5",
  "javaVersion": "17.0.x"
}
```

### Transformation Response
```json
{
  "success": true,
  "output": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><results>...</results>",
  "duration": 156,
  "processor": "Saxon-HE 12.5 (XSLT 2.0)"
}
```

### Frontend Indicators
- ☁️ Cloud icon shows green dot when server is enabled
- Output panel shows "Saxon-HE 12.5" badge
- Activity Log shows "Server" or "server-side" in transformation entries
- XSLT 2.0 features (like for-each-group) work correctly

## 🎯 Testing Checklist

- [ ] Prerequisites installed (Node.js, npm, Java)
- [ ] Setup script runs without errors
- [ ] Saxon JAR file exists in `server/saxon/`
- [ ] Server starts successfully
- [ ] Health check returns `"status": "ok"`
- [ ] Simple transformation test works
- [ ] XSLT 2.0 grouping test works
- [ ] Frontend connects to server
- [ ] Transform button uses server
- [ ] Activity log shows server usage
- [ ] Error handling works (test with invalid XSLT)

## 🚀 Next Steps After Testing

Once local testing is complete:

1. **Deploy to Production**
   - See deployment guides for Railway, Fly.io, or DigitalOcean
   - Update frontend config with production server URL
   - Test with production data

2. **Configure for Your Use Case**
   - Adjust rate limits in `server/index.js`
   - Configure allowed origins for production domain
   - Set up monitoring and logging

3. **Optimize Performance**
   - Test with large files
   - Monitor memory usage
   - Tune Java heap size if needed (`-Xmx512m`)

4. **Update Documentation**
   - Document your specific XSLT transformations
   - Add troubleshooting for your use cases
   - Share with your team

## 📚 Additional Resources

- **Detailed Guide:** `SERVER_LOCAL_TEST_GUIDE.md`
- **Server README:** `server/README.md`
- **Quick Start:** `server/QUICK_START.md`
- **Architecture:** `SAXON_SERVER_ARCHITECTURE.md`
- **Deployment:** `DEPLOYMENT_GUIDE.md`

## 💡 Pro Tips

1. **Keep server running in background:**
   ```bash
   cd server
   npm start &
   ```

2. **Monitor server logs:**
   ```bash
   cd server
   npm start | tee server.log
   ```

3. **Quick restart:**
   ```bash
   pkill -f "node index.js" && cd server && npm start
   ```

4. **Test with curl:**
   ```bash
   # Save test cases in files
   echo '{"xml":"...","xslt":"...","version":"2.0"}' > test-request.json
   curl -X POST http://localhost:3001/api/transform -H "Content-Type: application/json" -d @test-request.json
   ```

## ✅ Ready to Test!

You have everything you need. Just run:

```bash
# From project root
./test-server-setup.sh    # Mac/Linux
# or
test-server-setup.bat      # Windows
```

The script will:
1. ✅ Check all prerequisites
2. ✅ Install dependencies
3. ✅ Download Saxon-HE
4. ✅ Verify installation
5. ✅ Show you next steps

**Good luck with your testing! 🚀**

---

*Last updated: Now*
*Status: Ready for local testing*

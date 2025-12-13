# 🚀 Server Local Testing Guide

This guide will help you test the Transio Saxon-HE server locally on your machine.

## ✅ Prerequisites Check

Before starting, verify you have:

1. **Node.js 18+** installed
   ```bash
   node --version
   # Should show v18.x.x or higher
   ```

2. **Java 11+** installed (required for Saxon-HE)
   ```bash
   java -version
   # Should show version 11 or higher
   ```

3. **npm** installed
   ```bash
   npm --version
   # Should show 8.x.x or higher
   ```

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
- Restart terminal after installation

## 🔧 Server Setup (One-Time)

Open your terminal and navigate to the server directory:

```bash
cd server
```

Run the automated setup (this will install dependencies and download Saxon-HE):

```bash
npm run setup
```

### What the Setup Does:

1. ✅ Installs npm dependencies (express, cors, helmet, etc.)
2. ✅ Downloads Saxon-HE 12.5 JAR file (~8MB)
3. ✅ Extracts the JAR to `server/saxon/` directory
4. ✅ Verifies installation

**Expected Output:**
```
📦 Downloading Saxon-HE 12.5...
📥 Downloading: 100.0%
✅ Saxon-HE downloaded successfully
📦 Extracting Saxon-HE...
✅ Saxon-HE extracted successfully
📁 JAR file: /path/to/server/saxon/saxon-he-12.5.jar
🚀 Server is ready! Run: npm start
```

## 🚀 Starting the Server

After setup completes successfully:

```bash
npm start
```

**Expected Output:**
```
🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
🏥 Health check: http://localhost:3001/api/health
⚡ Transform endpoint: POST http://localhost:3001/api/transform
📦 Saxon JAR: ✅ Found
```

## ✅ Testing the Server

### Test 1: Health Check

Open a new terminal window and run:

```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5",
  "javaVersion": "17.0.x"
}
```

### Test 2: Simple XSLT 1.0 Transformation

```bash
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"?><catalog><book><title>XML Developer Guide</title><author>Smith, John</author></book></catalog>",
    "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><html><body><h1>Books</h1><xsl:apply-templates select=\"catalog/book\"/></body></html></xsl:template><xsl:template match=\"book\"><p><b><xsl:value-of select=\"title\"/></b> by <xsl:value-of select=\"author\"/></p></xsl:template></xsl:stylesheet>",
    "version": "1.0"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "output": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><html><body><h1>Books</h1><p><b>XML Developer Guide</b> by Smith, John</p></body></html>",
  "duration": 150,
  "processor": "Saxon-HE 12.5 (XSLT 1.0)"
}
```

### Test 3: XSLT 2.0 Transformation with for-each-group

```bash
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"?><sales><sale dept=\"Books\" amount=\"100\"/><sale dept=\"Electronics\" amount=\"200\"/><sale dept=\"Books\" amount=\"150\"/></sales>",
    "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"2.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><results><xsl:for-each-group select=\"sales/sale\" group-by=\"@dept\"><department name=\"{current-grouping-key()}\"><total><xsl:value-of select=\"sum(current-group()/@amount)\"/></total></department></xsl:for-each-group></results></xsl:template></xsl:stylesheet>",
    "version": "2.0"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "output": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><results><department name=\"Books\"><total>250</total></department><department name=\"Electronics\"><total>200</total></department></results>",
  "duration": 180,
  "processor": "Saxon-HE 12.5 (XSLT 2.0)"
}
```

## 🔗 Connecting the Frontend to the Server

1. **Start the Transio web app** (in a separate terminal):
   ```bash
   # From project root
   npm run dev
   ```

2. **Open the web app** in your browser:
   ```
   http://localhost:5173
   ```

3. **Configure the server connection:**
   - Click the **Cloud icon** (☁️) button in the header (Server Configuration)
   - Enable "Use server-side processing"
   - Set API URL: `http://localhost:3001/api`
   - Click "Test Connection"
   - If successful, click "Save"

4. **Test the integration:**
   - Load the XSLT 2.0 grouping example (Flask icon button)
   - Click "Transform" button
   - The transformation should now use the server (look for "Saxon-HE 12.5" badge on output)

## 🐛 Troubleshooting

### Issue: "Saxon-HE not found"

**Solution:**
```bash
cd server
npm run download-saxon
node scripts/extract-saxon.js
```

Verify the JAR exists:
```bash
ls -la server/saxon/saxon-he-12.5.jar
```

### Issue: "Java not found"

**Solution:**
Install Java (see Prerequisites section above), then verify:
```bash
java -version
```

### Issue: "Port 3001 already in use"

**Solution:**
Change the port:
```bash
PORT=3002 npm start
```

Then update the frontend config to use `http://localhost:3002/api`

### Issue: "Cannot access uninitialized variable" in transformation

**Cause:** This is typically an XSLT variable scoping issue, not a server issue.

**Solution:** 
- Check your XSLT stylesheet for variable declarations
- Ensure variables are declared before use
- Try the transformation with the sample XSLT 2.0 grouping example first

### Issue: CORS errors in browser

**Solution:**
The server already allows `localhost:5173` and `localhost:5000`. If you need additional origins:

1. Create `.env` file in `server/` directory:
   ```
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://your-domain.com
   ```

2. Restart the server

## 📊 Server Performance Testing

Test with a larger file:

```bash
# Generate a large XML file (1000 records)
node -e "console.log('<?xml version=\"1.0\"?><catalog>' + Array(1000).fill('<book><title>Test</title><author>Author</author></book>').join('') + '</catalog>')" > large-test.xml

# Test transformation
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d "{\"xml\": $(cat large-test.xml | jq -Rs .), \"xslt\": \"<?xml version=\\\"1.0\\\"?><xsl:stylesheet version=\\\"1.0\\\" xmlns:xsl=\\\"http://www.w3.org/1999/XSL/Transform\\\"><xsl:template match=\\\"/\\\"><result><count><xsl:value-of select=\\\"count(//book)\\\"/></count></result></xsl:template></xsl:stylesheet>\", \"version\": \"1.0\"}"
```

## 🚀 Next Steps

After successful local testing:

1. ✅ **Deploy to Production:**
   - See `server/README.md` for deployment options (Railway, Fly.io, DigitalOcean)
   - See `DEPLOYMENT_GUIDE.md` for Cloudflare Pages + server setup

2. ✅ **Enable Server Processing by Default:**
   - In the web app, configure the server URL
   - Check "Prefer server-side processing"
   - Save configuration

3. ✅ **Monitor Performance:**
   - Check server logs: `tail -f server/logs/*.log` (if logging enabled)
   - Monitor response times in the Activity Log
   - Test with your production XSLT transformations

## 📝 Testing Checklist

- [ ] Java 11+ installed and verified
- [ ] Node.js 18+ installed and verified
- [ ] Server dependencies installed (`npm install`)
- [ ] Saxon-HE downloaded and extracted
- [ ] Server starts without errors
- [ ] Health check returns "ok"
- [ ] Simple XSLT 1.0 transformation works
- [ ] XSLT 2.0 for-each-group transformation works
- [ ] Frontend connects to server successfully
- [ ] Transformation uses server (Saxon-HE badge visible)
- [ ] Error handling works (try invalid XSLT)
- [ ] Rate limiting works (make 101 requests in 15 minutes)

## 💡 Tips

1. **Keep server running in background:**
   ```bash
   cd server
   npm start &
   ```

2. **View server logs in real-time:**
   ```bash
   cd server
   npm start | tee server.log
   ```

3. **Use the test scripts:**
   ```bash
   cd server
   chmod +x test-server.sh
   ./test-server.sh
   ```

4. **Quick restart:**
   ```bash
   pkill -f "node index.js" && cd server && npm start
   ```

## 🆘 Getting Help

If you encounter issues:

1. Check server logs for error messages
2. Verify Java and Node.js versions
3. Ensure Saxon JAR file exists and is readable
4. Test with the simple examples first
5. Check the Activity Log in the web app for detailed error messages

## ✅ Success Indicators

You'll know everything is working when:

- ✅ Server starts without errors
- ✅ Health check returns `"status": "ok"`
- ✅ Test transformations return `"success": true`
- ✅ Frontend shows "Saxon-HE 12.5" badge on output
- ✅ XSLT 2.0 features (like for-each-group) work correctly
- ✅ Activity log shows "Server" mode in transformation entries

---

**Need more help?** Check `server/README.md` and `server/QUICK_START.md` for additional details.

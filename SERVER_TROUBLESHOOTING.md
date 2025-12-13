# Server Connection Troubleshooting Guide

## Quick Diagnosis

### Step 1: Is the server running?

```bash
cd server
npm start
```

You should see:
```
🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
🏥 Health check: http://localhost:3001/api/health
⚡ Transform endpoint: POST http://localhost:3001/api/transform
🌐 CORS enabled for: http://localhost:5173, ...
📦 Saxon JAR: ✅ Found
✅ Server ready for transformations!
```

### Step 2: Test the connection

**In a new terminal:**

```bash
cd server
npm test
```

Or manually:

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

### Step 3: Configure the client

1. Open Transio app in your browser
2. Click the **Cloud icon** (Server Configuration)
3. Enable server-side processing
4. Set API URL to: `http://localhost:3001/api`
5. Click **Test Connection**
6. You should see "✅ Available"

## Common Issues

### Issue 1: "Connection Failed - Failed to fetch"

**Cause:** Server is not running

**Solution:**
```bash
cd server
npm start
```

Keep this terminal open. The server must be running for connections to work.

---

### Issue 2: "Saxon-HE not found"

**Cause:** Saxon JAR file hasn't been downloaded

**Solution:**
```bash
cd server
npm run setup
```

This will:
1. Install Node dependencies
2. Download Saxon-HE JAR (12.5)
3. Extract it to the correct location

---

### Issue 3: "Port already in use"

**Cause:** Another process is using port 3001

**Solution A - Use different port:**
```bash
PORT=3002 npm start
```

Then update client config to: `http://localhost:3002/api`

**Solution B - Find and kill existing process:**

On macOS/Linux:
```bash
lsof -ti:3001 | xargs kill
```

On Windows:
```cmd
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

---

### Issue 4: "CORS error" in browser console

**Cause:** Browser blocking request due to CORS policy

**Solution:** Server now allows all localhost origins automatically. If still having issues:

1. Check browser console for exact error
2. Ensure you're using `http://` not `https://` for localhost
3. Try different port (5173, 5174, 5175, etc.)

---

### Issue 5: "Java not found" when transforming

**Cause:** Java is not installed or not in PATH

**Check Java:**
```bash
java -version
```

**Install Java:**

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install openjdk-11-jre
```

**macOS (Homebrew):**
```bash
brew install openjdk@11
```

**Windows:**
Download from [Adoptium](https://adoptium.net/)

---

### Issue 6: Server starts but immediately exits

**Cause:** Usually a code error or missing dependency

**Solution:**
```bash
cd server
npm install
npm start
```

Check the error message carefully.

---

## Testing Workflow

### Full Test Sequence

1. **Start the server:**
   ```bash
   cd server
   npm start
   ```

2. **In new terminal, test health:**
   ```bash
   curl http://localhost:3001/api/health
   ```

3. **Test transformation:**
   ```bash
   curl -X POST http://localhost:3001/api/transform \
     -H "Content-Type: application/json" \
     -d '{
       "xml": "<?xml version=\"1.0\"?><root>Test</root>",
       "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><output><xsl:value-of select=\"root\"/></output></xsl:template></xsl:stylesheet>",
       "version": "1.0"
     }'
   ```

4. **Open Transio app:**
   - Navigate to http://localhost:5173 (or your dev server port)
   - Click cloud icon (top right)
   - Enable server
   - Enter URL: `http://localhost:3001/api`
   - Click "Test Connection"
   - Should show "✅ Available"

5. **Test transformation in UI:**
   - Set XSLT version to 2.0
   - Enable "Prefer Server for XSLT 2.0/3.0"
   - Click Transform
   - Check activity log - should say "server-side"

---

## Configuration Checklist

- [ ] Server is running (`npm start` in server directory)
- [ ] Saxon JAR is installed (`npm run setup`)
- [ ] Java is installed (`java -version`)
- [ ] Port 3001 is available (or using alternate port)
- [ ] API URL in client matches server (`http://localhost:3001/api`)
- [ ] No trailing slash in API URL
- [ ] Browser can access localhost
- [ ] No firewall/antivirus blocking localhost connections

---

## Verify Server Logs

When the app tries to connect, you should see in server logs:

```
[2024-01-15T10:30:45.123Z] GET /api/health - Origin: http://localhost:5173
```

If you don't see this, the request isn't reaching the server.

---

## Still Having Issues?

### Get Detailed Diagnostics

1. **Check server logs** - Look for errors or warnings
2. **Check browser console** (F12) - Look for network errors
3. **Check browser Network tab** - See the actual request/response
4. **Try different browser** - Rule out browser-specific issues

### Collect Information

When reporting issues, include:

1. Server startup logs
2. Browser console errors
3. Network tab screenshot
4. OS and Node.js version (`node -v`)
5. Java version (`java -version`)
6. Exact steps to reproduce

---

## Advanced: Deploy to Production

Once working locally, you can deploy to:

- **Railway.app** - Automatic deployment from GitHub
- **DigitalOcean** - Docker container deployment  
- **Fly.io** - Global edge deployment
- **Your own VPS** - Full control

See `server/README.md` for deployment guides.

---

## Quick Commands Reference

```bash
# Install and setup
cd server
npm install
npm run setup

# Start server
npm start

# Test connection
npm test

# Alternative port
PORT=3002 npm start

# Check if running
curl http://localhost:3001/api/health

# Stop server (Ctrl+C)
```

---

## Development Mode

For development, run both simultaneously:

**Terminal 1 - Server:**
```bash
cd server
npm start
```

**Terminal 2 - Client:**
```bash
npm run dev
```

Both must be running for server-side transformations to work.

---

## Production Deployment

For production, you typically deploy:
1. **Static frontend** to Cloudflare Pages / Vercel / Netlify
2. **Server** separately to Railway / Fly.io / Docker

Then configure the production API URL in the client.

---

## Need Help?

- Check GitHub Issues: https://github.com/YOUR_USERNAME/transio/issues
- Read full docs: `server/README.md`
- Review architecture: `SAXON_SERVER_ARCHITECTURE.md`

# Testing the One-Click Installer (Mac/Linux)

This guide will help you test the `install.sh` script on Mac or Linux systems.

## Prerequisites

Before testing, ensure you have:
- **Node.js 18+** installed (`node --version`)
- **npm** installed (`npm --version`)
- **Java 11+** installed (`java -version`)
- Terminal access

## Test Scenarios

### Scenario 1: Fresh Install (No Java)

**Purpose:** Test the error handling when Java is missing

**Steps:**
1. Temporarily rename or move your Java installation
2. Navigate to server directory:
   ```bash
   cd server
   ```
3. Run installer:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

**Expected Results:**
- ❌ Script should detect missing Java
- Should display platform-specific installation instructions
- Script should exit with error code 1

**To Fix:**
- Install Java as instructed
- Re-run the test with Scenario 2

---

### Scenario 2: Fresh Install (Clean State)

**Purpose:** Test complete installation from scratch

**Steps:**
1. Clean up any previous installation:
   ```bash
   cd server
   rm -rf node_modules
   rm -rf saxon
   rm -f package-lock.json
   rm -f start-server.sh
   rm -f start-server.bat
   ```

2. Make install.sh executable and run:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

**Expected Results:**
- ✅ Script detects Node.js and Java
- ✅ Runs `npm install` to install dependencies
- ✅ Downloads Saxon-HE from GitHub (progress shown)
- ✅ Extracts Saxon-HE JAR file
- ✅ Creates launcher scripts (`start-server.sh`, `start-server.bat`)
- ✅ Tests server startup (should show "✅ Server test passed")
- ✅ Displays success message with next steps

**Files Created:**
- `node_modules/` directory
- `saxon/` directory
- `saxon/saxon-he-12.5.jar` file
- `start-server.sh` (executable)
- `start-server.bat`

---

### Scenario 3: Re-run Installer (Already Installed)

**Purpose:** Test that installer handles existing installation gracefully

**Steps:**
1. After completing Scenario 2, run installer again:
   ```bash
   ./install.sh
   ```

**Expected Results:**
- ✅ Script detects existing Java
- ✅ Script detects existing node_modules
- ✅ Script detects existing Saxon-HE (skips download)
- ✅ Re-creates launcher scripts
- ✅ Tests server startup
- ✅ Shows success message

---

### Scenario 4: Start Server After Installation

**Purpose:** Test that the server starts correctly

**Steps:**
1. After installation, start the server:
   ```bash
   chmod +x start-server.sh
   ./start-server.sh
   ```

**Expected Results:**
- ✅ Server starts without errors
- ✅ Shows message: "Server running on http://localhost:3001"
- ✅ Shows message: "Transform endpoint: POST /api/transform"
- ✅ Shows message: "Health check endpoint: GET /api/health"

2. In another terminal, test the health endpoint:
   ```bash
   curl http://localhost:3001/api/health
   ```

**Expected Response:**
```json
{
  "status": "ok",
  "server": "Transio Saxon-HE Server",
  "version": "1.0.0",
  "saxonVersion": "12.5",
  "timestamp": "2024-..."
}
```

3. Stop the server with `Ctrl+C`

---

### Scenario 5: Test Integration with Transio App

**Purpose:** Verify server works with the web application

**Steps:**
1. Start the server (from scenario 4)
2. In another terminal, start the Transio web app:
   ```bash
   cd ..  # Back to root directory
   npm run dev
   ```
3. Open browser to `http://localhost:5173`
4. Click the **☁️ Cloud icon** in the header
5. Configure server:
   - Toggle "Enable Server" → ON
   - API URL: `http://localhost:3001/api`
   - API Key: (leave empty)
   - Timeout: 30000
   - Toggle "Prefer Server" → ON
6. Click "Test Connection"

**Expected Results:**
- ✅ Shows "✅ Connection Successful"
- ✅ Shows server info (Saxon-HE 12.5)

7. Load XSLT 2.0 test:
   - Click the **Flask icon** (Test XSLT 2.0 Grouping)
   - Click **Transform** button
   - Check output panel

**Expected Results:**
- ✅ Transformation succeeds
- ✅ Badge shows "Saxon-HE Server" (not Saxon-JS)
- ✅ Output shows grouped books by category

---

## Troubleshooting

### Issue: "Permission denied" when running install.sh

**Solution:**
```bash
chmod +x install.sh
./install.sh
```

### Issue: "unzip: command not found"

**Solution (Ubuntu/Debian):**
```bash
sudo apt-get install unzip
```

**Solution (macOS):**
```bash
brew install unzip
```

### Issue: "Java not found" but Java is installed

**Solution:**
Check that Java is in your PATH:
```bash
which java
echo $JAVA_HOME
```

If not in PATH, add to your shell profile (`~/.bashrc`, `~/.zshrc`):
```bash
export JAVA_HOME=/path/to/java
export PATH=$JAVA_HOME/bin:$PATH
```

### Issue: Port 3001 already in use

**Solution:**
Find and kill the process using port 3001:
```bash
lsof -ti:3001 | xargs kill -9
```

Or use a different port in `server/.env`:
```
PORT=3002
```

### Issue: Saxon-HE download fails

**Solution:**
Download manually:
1. Visit: https://github.com/Saxonica/Saxon-HE/releases/tag/SaxonHE12-5
2. Download `SaxonHE12-5J.zip`
3. Extract to `server/saxon/`
4. Ensure `saxon-he-12.5.jar` is present
5. Re-run installer

---

## Manual Testing Checklist

Use this checklist to verify all features:

### Installation Phase
- [ ] Node.js detection works
- [ ] npm detection works
- [ ] Java detection works
- [ ] Missing Java shows helpful error
- [ ] npm install runs successfully
- [ ] Saxon-HE downloads with progress indicator
- [ ] Saxon-HE extracts correctly
- [ ] JAR file is present: `saxon/saxon-he-12.5.jar`
- [ ] Launcher scripts are created
- [ ] `start-server.sh` is executable
- [ ] Server test passes

### Server Startup Phase
- [ ] Server starts without errors
- [ ] Server listens on port 3001
- [ ] Health endpoint responds correctly
- [ ] Transform endpoint accepts POST requests
- [ ] CORS headers are set correctly

### Web App Integration Phase
- [ ] Server config dialog opens
- [ ] Connection test succeeds
- [ ] Settings save correctly
- [ ] Transformation uses server (badge shows "Saxon-HE Server")
- [ ] XSLT 2.0 `for-each-group` works
- [ ] Fallback to client works when server is stopped
- [ ] Error handling works (bad XML/XSLT)

---

## Performance Testing

Test transformation performance:

**Small File (< 10 KB):**
- Expected: < 100ms

**Medium File (100 KB):**
- Expected: < 500ms

**Large File (1 MB):**
- Expected: < 2 seconds

**Very Large File (5 MB):**
- Expected: < 10 seconds (or reject with 413 if over limit)

---

## Security Testing

Verify security measures:

- [ ] Server rejects files > 10 MB (413 status)
- [ ] Rate limiting works (429 after too many requests)
- [ ] API key validation works (if enabled)
- [ ] Invalid XML returns proper error (400 status)
- [ ] Invalid XSLT returns proper error (400 status)
- [ ] CORS allows only configured origins
- [ ] Temp files are cleaned up after transformation
- [ ] Server logs don't expose sensitive data

---

## Platform-Specific Tests

### macOS-Specific
- [ ] Works on Intel Macs
- [ ] Works on Apple Silicon (M1/M2/M3)
- [ ] Homebrew Java installation detected
- [ ] System Java installation detected
- [ ] `start-server.sh` runs from Finder (double-click)

### Linux-Specific
- [ ] Works on Ubuntu 20.04+
- [ ] Works on Debian 11+
- [ ] Works on Fedora 36+
- [ ] Works on Arch Linux
- [ ] OpenJDK installation detected
- [ ] Works in various shells (bash, zsh, fish)

---

## Cleanup After Testing

To reset for another test:

```bash
cd server
rm -rf node_modules
rm -rf saxon
rm -f package-lock.json
rm -f start-server.sh
rm -f start-server.bat
rm -f .env
```

---

## Reporting Issues

If you encounter issues during testing, please report with:

1. **Platform:** macOS 14.2 / Ubuntu 22.04 / etc.
2. **Node Version:** `node --version`
3. **Java Version:** `java -version`
4. **Error Output:** Full terminal output
5. **Steps to Reproduce:** What you did before the error

---

## Success Criteria

Installation is successful if:

✅ All scenarios pass without errors  
✅ Server starts and responds to health checks  
✅ Web app can connect and transform XSLT 2.0  
✅ Performance is within expected ranges  
✅ Security measures are working  
✅ Clean error messages for all failure cases  

---

**Happy Testing! 🚀**

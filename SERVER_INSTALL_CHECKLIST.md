# ✅ Server Installation Checklist

Quick checklist to ensure successful installation.

---

## Pre-Installation

### Check Prerequisites

- [ ] **Node.js 18+** installed
  - Test: Open terminal/command prompt, run `node --version`
  - Expected: `v18.0.0` or higher
  - Install: [nodejs.org](https://nodejs.org/)

- [ ] **npm** installed
  - Test: Run `npm --version`
  - Expected: `8.0.0` or higher
  - Install: Comes with Node.js

- [ ] **Java 11+** installed
  - Test: Run `java -version`
  - Expected: `java version "11"` or higher
  - Install: See [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)

---

## Installation Steps

### Windows

- [ ] Navigate to `server` folder
- [ ] Locate `install.bat` file
- [ ] Double-click `install.bat`
- [ ] Wait for installation (2-3 minutes)
- [ ] Look for "✅ Installation Complete!" message
- [ ] Verify `start-server.bat` was created
- [ ] Double-click `start-server.bat`
- [ ] Look for "🚀 Transio Saxon-HE API Server" message
- [ ] Verify "Server running on http://localhost:3001"

### Mac / Linux

- [ ] Open Terminal
- [ ] Navigate to `server` folder: `cd /path/to/transio/server`
- [ ] Make scripts executable: `chmod +x install.sh start-server.sh`
- [ ] Run installer: `./install.sh`
- [ ] Wait for installation (2-3 minutes)
- [ ] Look for "✅ Installation Complete!" message
- [ ] Verify `start-server.sh` was created
- [ ] Run server: `./start-server.sh`
- [ ] Look for "🚀 Transio Saxon-HE API Server" message
- [ ] Verify "Server running on http://localhost:3001"

---

## Verification

### Check Server Files

- [ ] `server/saxon/saxon-he-12.5.jar` exists
- [ ] `server/node_modules/` folder exists
- [ ] `server/temp/` folder exists (created automatically)
- [ ] `server/start-server.bat` exists (Windows)
- [ ] `server/start-server.sh` exists (Mac/Linux)

### Test Server Health

- [ ] Server terminal/window is open and running
- [ ] Open browser
- [ ] Visit: `http://localhost:3001/api/health`
- [ ] Expected response:
  ```json
  {
    "status": "ok",
    "processor": "Saxon-HE",
    "version": "12.5"
  }
  ```
- [ ] No error messages in browser
- [ ] No error messages in server terminal

---

## Web App Integration

### Configure Server

- [ ] Open Transio web app in browser
- [ ] Locate cloud icon (☁️) in top toolbar
- [ ] Click cloud icon
- [ ] Server Configuration dialog opens

### Settings

- [ ] Check **"Enable Server"**
- [ ] API URL field shows: `http://localhost:3001/api`
- [ ] API Key field left empty (for local use)
- [ ] Timeout shows: `30000`

### Test Connection

- [ ] Click **"Test Connection"** button
- [ ] Wait for response (~1 second)
- [ ] Success message appears:
  - ✅ "Connection Successful"
  - Shows: "Server: Saxon-HE 12.5"
  - Shows: "Status: Available"
- [ ] No error messages
- [ ] Click **"Save"** button
- [ ] Toast notification: "✅ Server configuration enabled"
- [ ] Dialog closes

---

## Test Transformation

### Prepare Test Data

- [ ] In Transio web app, go to XML tab
- [ ] Paste test XML:
  ```xml
  <?xml version="1.0"?>
  <books>
    <book category="fiction">Book 1</book>
    <book category="non-fiction">Book 2</book>
  </books>
  ```

- [ ] Go to XSLT tab
- [ ] Paste test XSLT (with grouping):
  ```xml
  <?xml version="1.0"?>
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
      <categories>
        <xsl:for-each-group select="books/book" group-by="@category">
          <category name="{current-grouping-key()}">
            <xsl:copy-of select="current-group()"/>
          </category>
        </xsl:for-each-group>
      </categories>
    </xsl:template>
  </xsl:stylesheet>
  ```

### Run Transformation

- [ ] XSLT version shows: **"XSLT 2.0"**
- [ ] Click **"Transform"** button
- [ ] Transformation completes (~1 second)
- [ ] Output tab shows result
- [ ] Badge shows: **"Saxon-HE 12.5 (XSLT 2.0)"** ← Important!
- [ ] No error messages
- [ ] Output is valid XML with grouped categories

---

## Troubleshooting

### If Installation Fails

- [ ] Check Java is installed: `java -version`
- [ ] Check Node.js is installed: `node --version`
- [ ] Check npm is installed: `npm --version`
- [ ] Try manual download: [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)
- [ ] See: [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)

### If Server Won't Start

- [ ] Check Saxon JAR exists: `server/saxon/saxon-he-12.5.jar`
- [ ] Check port 3001 is not in use
- [ ] Try different port: `PORT=3002 npm start`
- [ ] Check server logs for errors
- [ ] See: [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)

### If Connection Fails

- [ ] Server is running (check terminal/window)
- [ ] URL is correct: `http://localhost:3001/api`
- [ ] Try health endpoint in browser: `http://localhost:3001/api/health`
- [ ] Check firewall settings
- [ ] Disable browser extensions
- [ ] See: [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)

### If Transformation Doesn't Use Server

- [ ] Badge shows "Saxon-HE" (not "Saxon-JS")
- [ ] Server config is saved (click cloud icon to verify)
- [ ] Server is enabled (checkbox checked)
- [ ] Server is running
- [ ] Test connection shows success

---

## Success Criteria

Installation is successful when:

- ✅ All prerequisites installed
- ✅ Installer completed without errors
- ✅ Server starts without errors
- ✅ Health endpoint returns OK
- ✅ Web app connects successfully
- ✅ Test transformation uses server (badge shows "Saxon-HE")
- ✅ Grouping (`for-each-group`) works correctly

---

## Quick Recovery

### Reset Everything

If something goes wrong, reset and try again:

```bash
# Windows
cd server
rmdir /s /q node_modules saxon
del start-server.bat
install.bat

# Mac/Linux
cd server
rm -rf node_modules saxon start-server.sh
./install.sh
```

---

## Additional Resources

- 📖 [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md) - Complete guide
- 🖼️ [INSTALL_SERVER_VISUAL.md](./INSTALL_SERVER_VISUAL.md) - Visual guide
- 🔧 [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md) - Fix issues
- 📊 [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md) - Feature comparison

---

## Support

Still having issues?

1. Review server logs in terminal/command prompt
2. Check [SERVER_TROUBLESHOOTING.md](./SERVER_TROUBLESHOOTING.md)
3. Verify all checkboxes above are checked
4. See [SERVER_DOCUMENTATION_INDEX.md](./SERVER_DOCUMENTATION_INDEX.md)

---

**Print this checklist and check off each item as you go! ✅**

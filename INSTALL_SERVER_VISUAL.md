# 🖼️ Visual Server Installation Guide

Step-by-step visual guide with screenshots for installing the Transio Saxon-HE server.

---

## 🪟 Windows Installation (Visual Guide)

### Step 1: Locate the Server Folder

```
📁 Your Transio Project
  ├── 📁 src
  ├── 📁 server          ← This folder!
  │   ├── 📄 install.bat     ← Double-click this
  │   ├── 📄 start-server.bat
  │   └── ...
  ├── 📄 index.html
  └── 📄 README.md
```

**What to do:**
1. Open your Transio project folder
2. Look for the `server` subfolder
3. Open it

---

### Step 2: Run the Installer

**Find this file:**
```
📄 install.bat
```

**Action:**
- **Double-click** `install.bat`

**What you'll see:**
```
===================================================================
  Transio Saxon-HE Server - One-Click Installer (Windows)
===================================================================

Node.js found:
v18.17.0

npm found:
8.19.2

Running installation script...

🔍 Checking Java installation...
✅ Java found: 17.0.8

📦 Installing Node.js dependencies...
✅ Dependencies installed

📥 Downloading Saxon-HE 12.5...
   Progress: 100% (3.45MB / 3.45MB)
✅ Saxon-HE downloaded

📦 Extracting Saxon-HE...
✅ Saxon-HE extracted successfully

📝 Creating launcher scripts...
✅ Launcher scripts created

🧪 Testing server...
✅ Server test passed

===================================================================
  ✅ Installation Complete!
===================================================================
```

**Installation time:** ~2-3 minutes

---

### Step 3: Start the Server

**Find this file:**
```
📄 start-server.bat
```

**Action:**
- **Double-click** `start-server.bat`

**What you'll see:**
```
Starting Transio Saxon-HE Server...
Server starting on http://localhost:3001
Press Ctrl+C to stop the server

🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
🏥 Health check: http://localhost:3001/api/health
⚡ Transform endpoint: POST http://localhost:3001/api/transform
✅ Server ready for transformations!
```

**Keep this window open!** The server is running.

---

## 🍎 Mac Installation (Visual Guide)

### Step 1: Open Terminal

**How to open Terminal:**
1. Press `⌘ + Space` (Spotlight Search)
2. Type: `Terminal`
3. Press `Enter`

Or:
1. Open `Finder`
2. Go to `Applications` → `Utilities`
3. Double-click `Terminal`

---

### Step 2: Navigate to Server Folder

**In Terminal, type:**
```bash
cd /path/to/your/transio/server
```

**Example:**
```bash
cd ~/Downloads/transio/server
```

**Tip:** You can drag the `server` folder into Terminal instead of typing the path!

**Press Enter**

---

### Step 3: Make Scripts Executable

**Type:**
```bash
chmod +x install.sh start-server.sh
```

**Press Enter**

---

### Step 4: Run the Installer

**Type:**
```bash
./install.sh
```

**Press Enter**

**What you'll see:**
```
===================================================================
  Transio Saxon-HE Server - One-Click Installer (Mac/Linux)
===================================================================

Node.js found:
v18.17.0

npm found:
8.19.2

Running installation script...

═══════════════════════════════════════════════════════════
  🚀 Transio Saxon-HE Server - One-Click Installer
═══════════════════════════════════════════════════════════

Starting installation process...

🔍 Checking Java installation...
✅ Java found: 17.0.8

📦 Installing Node.js dependencies...
✅ Dependencies installed

📥 Downloading Saxon-HE 12.5...
   Progress: 100% (3.45MB / 3.45MB)
✅ Saxon-HE downloaded

📦 Extracting Saxon-HE...
✅ Saxon-HE extracted successfully

📝 Creating launcher scripts...
✅ Launcher scripts created

🧪 Testing server...
✅ Server test passed

===================================================================
  ✅ Installation Complete!
===================================================================

🚀 To start the server:

   Option 1: Run: ./start-server.sh
   Option 2: Run: npm start
```

---

### Step 5: Start the Server

**Type:**
```bash
./start-server.sh
```

**Press Enter**

**What you'll see:**
```
Starting Transio Saxon-HE Server...
Server starting on http://localhost:3001
Press Ctrl+C to stop the server

🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
🏥 Health check: http://localhost:3001/api/health
⚡ Transform endpoint: POST http://localhost:3001/api/transform
✅ Server ready for transformations!
```

**Keep Terminal open!** The server is running.

---

## 🐧 Linux Installation (Visual Guide)

Same as Mac, but here are distribution-specific Java installation commands:

### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jdk nodejs npm
```

### Fedora/RHEL
```bash
sudo dnf install java-17-openjdk nodejs npm
```

### Arch Linux
```bash
sudo pacman -S jdk-openjdk nodejs npm
```

Then follow the Mac guide above.

---

## 🔗 Connecting Web App to Server (Visual Guide)

### Step 1: Open Transio Web App

Open your browser and go to:
- **Local:** `http://localhost:5173`
- **Deployed:** `https://transio.org` (or your domain)

---

### Step 2: Find the Server Config Button

**Look for this icon in the top toolbar:**
```
☁️ (Cloud icon)
```

It's located here:
```
[⚡ Transio]  [XSLT 2.0]  [Theme]  [☁️]  [?]  [💾]  [Transform]
                                      ↑
                                   Click here!
```

**Click the cloud icon ☁️**

---

### Step 3: Server Configuration Dialog

You'll see a dialog like this:

```
┌────────────────────────────────────────────┐
│  Server Configuration                      │
├────────────────────────────────────────────┤
│                                            │
│  ☐ Enable Server                           │
│                                            │
│  API URL:                                  │
│  ┌──────────────────────────────────────┐ │
│  │ http://localhost:3001/api            │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  API Key (Optional):                       │
│  ┌──────────────────────────────────────┐ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Request Timeout (ms): 30000               │
│                                            │
│  ☐ Prefer Server Over Client               │
│                                            │
│  [Test Connection]  [Save]  [Cancel]       │
└────────────────────────────────────────────┘
```

---

### Step 4: Configure Settings

**Fill in:**

1. ✅ Check **"Enable Server"**
2. Enter API URL: `http://localhost:3001/api`
3. Leave API Key empty (not needed for local)
4. Keep timeout at 30000

---

### Step 5: Test Connection

**Click:** `[Test Connection]`

**Success looks like:**
```
┌────────────────────────────────────┐
│  ✅ Connection Successful          │
│                                    │
│  Server: Saxon-HE 12.5             │
│  Status: Available                 │
│  Response time: 45ms               │
└────────────────────────────────────┘
```

**Failure looks like:**
```
┌────────────────────────────────────┐
│  ❌ Connection Failed              │
│                                    │
│  Error: Failed to fetch            │
│                                    │
│  Make sure:                        │
│  • Server is running               │
│  • URL is correct                  │
│  • Port 3001 is accessible         │
└────────────────────────────────────┘
```

**If failed:**
- Check that the server terminal/window is still open and running
- Verify the URL is exactly: `http://localhost:3001/api`
- Try visiting: http://localhost:3001/api/health in your browser

---

### Step 6: Save Configuration

**Click:** `[Save]`

You'll see a success toast:
```
✅ Server configuration enabled
```

**Done!** Your transformations now use the server.

---

## 🧪 Testing the Server

### Test 1: Browser Health Check

**Open in browser:**
```
http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5",
  "javaVersion": "17.0.8"
}
```

---

### Test 2: Transform in Web App

1. In Transio, paste this XML:
   ```xml
   <?xml version="1.0"?>
   <books>
     <book category="fiction">Book 1</book>
     <book category="non-fiction">Book 2</book>
   </books>
   ```

2. Paste this XSLT 2.0 with grouping:
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

3. Click **[Transform]**

4. Check the output panel - you should see:
   ```
   Badge: Saxon-HE 12.5 (XSLT 2.0)
   ```

**Success!** The server is working.

---

## 🛠️ Common Issues (Visual)

### Issue: Java Not Found

**Installer shows:**
```
❌ Java not found!

Java is required to run Saxon-HE. Please install:

Windows:
  1. Download from: https://www.oracle.com/java/technologies/downloads/
  2. Or install with chocolatey: choco install openjdk
  3. Or install with winget: winget install Microsoft.OpenJDK.17
```

**Solution:**
1. Install Java (see commands above)
2. Close and reopen Terminal/Command Prompt
3. Run installer again

---

### Issue: Port Already in Use

**Server shows:**
```
❌ Error: Port 3001 is already in use
   Try: PORT=3002 npm start
```

**Solution (Windows):**
```bash
set PORT=3002
npm start
```

**Solution (Mac/Linux):**
```bash
PORT=3002 npm start
```

Then update API URL in web app to: `http://localhost:3002/api`

---

### Issue: Connection Failed in Web App

**Dialog shows:**
```
❌ Connection Failed
Failed to fetch
```

**Checklist:**
1. ✅ Is server window/terminal still open and running?
2. ✅ Does http://localhost:3001/api/health work in browser?
3. ✅ Is API URL exactly: `http://localhost:3001/api`?
4. ✅ Is firewall blocking the connection?
5. ✅ Try disabling browser extensions

---

## 📊 Server Status Reference

### Server Running (Good)
```
🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
✅ Server ready for transformations!
```
**Status:** ✅ Working

---

### Server Error (Bad)
```
❌ Error: Port 3001 is already in use
```
**Status:** ❌ Not working
**Fix:** Change port

---

### Saxon Not Found (Bad)
```
⚠️  WARNING: Saxon-HE JAR not found!
   Run: cd server && npm run setup
   Server will return 503 errors until Saxon is installed.
```
**Status:** ⚠️ Partially working
**Fix:** Run installer again

---

## 🎓 What Did the Installer Do?

```
server/
├── node_modules/          ← Installed dependencies
├── saxon/
│   ├── saxon.zip         ← Downloaded
│   └── saxon-he-12.5.jar ← Extracted (3.5 MB)
├── temp/                 ← Created (for transformations)
├── install.bat           ← You ran this
├── start-server.bat      ← Created by installer
├── install.sh
└── start-server.sh       ← Created by installer
```

---

**Installation Time:** ~2-3 minutes  
**Disk Space:** ~15 MB total  
**Internet Required:** Only during installation (for downloading Saxon-HE)  
**Runs Offline:** Yes, after installation

---

**Need more help?** See [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md) for detailed troubleshooting.

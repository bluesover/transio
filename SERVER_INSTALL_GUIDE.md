# 🚀 Transio Server - One-Click Installation Guide

This guide will help you install and run the optional Transio Saxon-HE server for enhanced XSLT 2.0/3.0 support.

## 📋 What You Need

Before starting, ensure you have:

1. ✅ **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
2. ✅ **Java 11+** - Required for Saxon-HE (see [installation](#-installing-java) below)

## 🪟 Windows Installation

### Step 1: Navigate to the server folder
Open the `server` folder in your Transio project.

### Step 2: Run the installer
**Double-click** the file named **`install.bat`**

The installer will:
- ✅ Check for Node.js and Java
- ✅ Install npm dependencies
- ✅ Download Saxon-HE automatically
- ✅ Extract and configure everything
- ✅ Create launcher scripts
- ✅ Test the server

### Step 3: Start the server
After installation completes, **double-click** **`start-server.bat`**

The server will be available at: **http://localhost:3001**

---

## 🍎 Mac Installation

### Step 1: Open Terminal
Open the Terminal app (Applications → Utilities → Terminal)

### Step 2: Navigate to the server folder
```bash
cd /path/to/transio/server
```
*(Replace `/path/to/transio` with your actual project path)*

### Step 3: Make the installer executable
```bash
chmod +x install.sh start-server.sh
```

### Step 4: Run the installer
```bash
./install.sh
```

The installer will:
- ✅ Check for Node.js and Java
- ✅ Install npm dependencies
- ✅ Download Saxon-HE automatically
- ✅ Extract and configure everything
- ✅ Create launcher scripts
- ✅ Test the server

### Step 5: Start the server
```bash
./start-server.sh
```

The server will be available at: **http://localhost:3001**

---

## 🐧 Linux Installation

### Step 1: Open Terminal
Open your preferred terminal application

### Step 2: Navigate to the server folder
```bash
cd /path/to/transio/server
```
*(Replace `/path/to/transio` with your actual project path)*

### Step 3: Make the installer executable
```bash
chmod +x install.sh start-server.sh
```

### Step 4: Run the installer
```bash
./install.sh
```

The installer will:
- ✅ Check for Node.js and Java
- ✅ Install npm dependencies
- ✅ Download Saxon-HE automatically
- ✅ Extract and configure everything
- ✅ Create launcher scripts
- ✅ Test the server

### Step 5: Start the server
```bash
./start-server.sh
```

The server will be available at: **http://localhost:3001**

---

## ☕ Installing Java

If you don't have Java installed, the installer will notify you. Here's how to install it:

### Windows

**Option 1: Using winget (Windows 10/11)**
```powershell
winget install Microsoft.OpenJDK.17
```

**Option 2: Using Chocolatey**
```powershell
choco install openjdk17
```

**Option 3: Manual download**
Download from [Adoptium](https://adoptium.net/temurin/releases/) or [Oracle](https://www.oracle.com/java/technologies/downloads/)

### macOS

**Option 1: Using Homebrew**
```bash
brew install openjdk@17
```

**Option 2: Manual download**
Download from [Adoptium](https://adoptium.net/temurin/releases/) or [Oracle](https://www.oracle.com/java/technologies/downloads/)

### Linux

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jdk
```

**Fedora/RHEL:**
```bash
sudo dnf install java-17-openjdk
```

**Arch Linux:**
```bash
sudo pacman -S jdk-openjdk
```

After installing Java, run the installer again.

---

## 🔗 Connecting the Web App to the Server

Once the server is running:

1. Open the Transio web app in your browser
2. Click the **cloud icon** (☁️) in the top toolbar
3. Enable **"Enable Server"**
4. Set API URL to: `http://localhost:3001/api`
5. Click **"Test Connection"** - you should see ✅ Success
6. Click **"Save"**

Now your transformations will use the powerful Saxon-HE engine on the server!

---

## 🧪 Testing the Installation

### Test 1: Check if server is running
Open your browser and visit:
```
http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5"
}
```

### Test 2: Test transformation (using curl)
```bash
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"?><root>Hello Server</root>",
    "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><output><xsl:value-of select=\"root\"/></output></xsl:template></xsl:stylesheet>",
    "version": "1.0"
  }'
```

You should see:
```json
{
  "success": true,
  "output": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><output>Hello Server</output>",
  "duration": 123,
  "processor": "Saxon-HE 12.5 (XSLT 1.0)"
}
```

---

## 🛠️ Troubleshooting

### Error: "Node.js not found"
- **Install Node.js** from [nodejs.org](https://nodejs.org/)
- Restart your terminal/command prompt after installation
- Run the installer again

### Error: "Java not found"
- **Install Java** following the [instructions above](#-installing-java)
- Verify installation: `java -version`
- Restart your terminal/command prompt after installation
- Run the installer again

### Error: "Port 3001 already in use"
Another application is using port 3001. You can:
- Stop the other application
- Or run the server on a different port:
  - Windows: `set PORT=3002 && npm start`
  - Mac/Linux: `PORT=3002 npm start`

### Error: "Failed to download Saxon-HE"
If the automatic download fails:
1. Manually download from: https://github.com/Saxonica/Saxon-HE/releases/download/SaxonHE12-5/SaxonHE12-5J.zip
2. Extract the ZIP file
3. Copy `saxon-he-12.5.jar` to the `server/saxon/` folder
4. Run: `npm start`

### Server starts but connection fails in web app
1. Make sure the server is running (check terminal/command prompt)
2. Check the API URL in web app settings: `http://localhost:3001/api`
3. Try the health check: http://localhost:3001/api/health
4. Check your firewall settings
5. Try disabling browser extensions that might block requests

---

## 📚 Additional Resources

- **Full Server Documentation**: See `server/README.md`
- **Docker Deployment**: See `server/QUICK_START.md`
- **API Reference**: See `server/README.md#api-endpoints`
- **Security Configuration**: See `server/README.md#security-features`

---

## 💡 Why Use the Server?

The Saxon-HE server provides:

- ✅ **Full XSLT 2.0/3.0 Support** - Advanced features like grouping, regex, multiple outputs
- ✅ **Better Performance** - Faster for large files and complex transformations
- ✅ **Enterprise Grade** - Saxon-HE is the industry standard XSLT processor
- ✅ **No Browser Limits** - Process files larger than browser memory allows
- ✅ **100% Open Source** - Saxon-HE is licensed under MPL 2.0

The web app will work fine without the server (using Saxon-JS in the browser), but the server unlocks full XSLT 2.0/3.0 capabilities!

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the server logs in your terminal/command prompt
3. Open an issue on GitHub
4. Check the documentation in `server/README.md`

---

**Enjoy your enhanced XSLT transformations! 🚀**

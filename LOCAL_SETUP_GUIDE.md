# 🏠 Local Setup & Usage Guide

## Quick Start: Run Locally Without Deployment

This guide shows you how to run the XML/XSLT Transformer on your own computer for **100% free** with all data stored locally.

---

## 📋 Prerequisites

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
   - Includes npm (Node Package Manager)
   - Verify installation: `node --version` and `npm --version`

2. **Modern Browser** (One of these)
   - ✅ Google Chrome 86+ (Recommended)
   - ✅ Microsoft Edge 86+
   - ✅ Brave Browser
   - ⚠️ Firefox (works, but no folder saving)
   - ⚠️ Safari (works, but no folder saving)

3. **Text Editor** (Optional, for viewing/editing files)
   - VS Code (Recommended)
   - Notepad++
   - Any text editor

---

## 🚀 Installation & Running

### Step 1: Download the App

```bash
# Option A: Clone with Git
git clone https://github.com/YOUR_USERNAME/xslt-transformer.git
cd xslt-transformer

# Option B: Download ZIP
# Download from GitHub → Code → Download ZIP
# Extract the ZIP file
# Open terminal/command prompt in that folder
```

### Step 2: Install Dependencies

```bash
npm install
```

This downloads all required libraries (~300MB). Takes 2-5 minutes depending on internet speed.

### Step 3: Start the App

```bash
npm run dev
```

You should see:
```
  VITE v7.2.6  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### Step 4: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

**That's it!** The app is now running locally on your computer.

---

## 💾 How Local Data Storage Works

### Two Storage Systems

#### 1. Browser Storage (IndexedDB)
- **Stores:** All your work automatically
  - XML input
  - XSLT stylesheets
  - Version history
  - Activity logs
  - Settings (theme, preferences)
- **Location:** Browser's internal database
- **Persistence:** Survives browser restart, but can be cleared
- **No Setup Required:** Works automatically

#### 2. File System (Optional - Recommended)
- **Stores:** Files in a folder you choose
  - `current.xml` - Your current XML
  - `current.xslt` - Your current XSLT
  - `versions.json` - Version metadata
  - `version_*.xml` - Version snapshots
  - `version_*.xslt` - Version stylesheets
  - `project-export.csv` - Export data
  - `launch-project.bat` - Windows launcher
  - `launch-project.sh` - Mac/Linux launcher
- **Location:** Any folder on your computer
- **Persistence:** Permanent (real files on disk)
- **Setup:** Click Folder icon and select/create a folder

---

## 📁 Creating a Local Project

### Step 1: Create Project Folder

Create a folder anywhere on your computer:
```
C:\Users\YourName\Documents\MyXSLTProjects\
```

Or on Mac/Linux:
```
/Users/YourName/Documents/MyXSLTProjects/
```

### Step 2: Connect to App

1. Open the app (http://localhost:5173)
2. Click the **Folder icon** 📁 in the header
3. Navigate to your project folder
4. Click "Select Folder" or "Open"
5. Grant permission when browser asks

### Step 3: Your Files Auto-Save

Now every change you make is automatically saved to that folder:
- **Auto-save delay:** 1 second after you stop typing
- **What's saved:** Current XML and XSLT
- **Manual versions:** Click Save button to create snapshots

### Step 4: Check Your Folder

Open your project folder in File Explorer/Finder:
```
MyXSLTProjects/
├── current.xml          ← Your active XML
├── current.xslt         ← Your active XSLT
├── versions.json        ← Version metadata
└── (version files created when you save versions)
```

---

## 📊 Exporting Your Data

### CSV Export

1. Open your project folder in the app
2. Click the **CSV icon** in the header
3. Find `project-export.csv` in your folder
4. Open with Excel, Google Sheets, or any spreadsheet app

**CSV Contains:**
- Version numbers
- Descriptions
- Creation dates
- XSLT version used
- Release status
- Line counts
- Release notes

**Use Cases:**
- Share project history with team
- Import into project management tools
- Create reports
- Archive project data

### Launcher Files

Create launcher scripts to quickly open your project:

1. Click the **Rocket icon** 🚀 in the header
2. Two files are created:
   - `launch-project.bat` (Windows)
   - `launch-project.sh` (Mac/Linux)

**Usage:**
- **Windows:** Double-click `launch-project.bat`
- **Mac/Linux:** 
  ```bash
  chmod +x launch-project.sh
  ./launch-project.sh
  ```

The launcher opens the app in your browser automatically.

---

## 🔄 Version Control System

### Saving Versions

1. Click **Save Version** button (or Ctrl+S)
2. Enter version number (e.g., 1.0.0, 1.1.0, 2.0.0)
3. Add description (supports markdown)
4. Click Save

**Version includes:**
- Complete XML snapshot
- Complete XSLT snapshot
- Timestamp
- XSLT version (1.0/2.0/3.0)
- Description

### Loading Versions

1. Open **Version Panel** on the right sidebar
2. Click version card
3. Click "Load" button
4. Your editors update to that version

### Releasing Versions

1. Find version in Version Panel
2. Click "Release" button
3. Add release notes
4. Version is marked as "Released"

**Released versions are:**
- Highlighted in the panel
- Exported with release notes
- Marked in CSV export

---

## 🎨 Customization

### Changing Theme

Click the **Moon/Sun icon** to cycle through:
1. Light Theme
2. Dark Theme
3. Black Theme

Theme preference is saved automatically.

### Changing Editor Theme

Use the dropdown in the header to select from 10 editor themes:
- VS Code Dark (Default)
- GitHub Dark
- Tokyo Night
- Dracula
- Monokai
- Solarized Dark
- Nord
- Gruvbox Dark
- Material Dark
- Atom One Dark

### Changing XSLT Version

Select XSLT version from dropdown:
- **1.0** - Browser-native (fastest)
- **2.0** - Saxon-JS (advanced features)
- **3.0** - Saxon-JS (latest features)

The app auto-detects version from your XSLT's `version` attribute.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Enter | Transform XML |
| Ctrl+S | Save Version |
| Ctrl+K | Open Snippets |
| Ctrl+Shift+F | Format XML |
| Ctrl+Shift+G | Format XSLT |
| Ctrl+Shift+I | Import XML |
| Ctrl+Shift+O | Import XSLT |
| Ctrl+Shift+E | Import Output |
| ? | Show Keyboard Shortcuts |

**Mac Users:** Use Cmd instead of Ctrl

---

## 🔧 Troubleshooting

### Problem: "Cannot connect to localhost"

**Solution:** Make sure dev server is running:
```bash
npm run dev
```

### Problem: "Permission denied" when selecting folder

**Cause:** Browser security

**Solution:** 
1. Use Chrome, Edge, or Brave
2. Grant permission when prompted
3. Check browser settings → Site Permissions

### Problem: Changes not saving to folder

**Check:**
1. Folder is connected (see folder name in header)
2. Using supported browser (Chrome/Edge/Brave)
3. Folder permissions are granted
4. Wait 1 second after typing (auto-save delay)

### Problem: Transformation fails

**Check:**
1. XML is well-formed (valid syntax)
2. XSLT is well-formed (valid syntax)
3. XSLT version matches stylesheet version
4. Check Activity Log for error details

### Problem: Version Panel not showing

**Solution:** Click the **◀** button on the right edge to show panel

### Problem: Port 5173 already in use

**Solution:** 
```bash
# Kill existing process or use different port
npm run dev -- --port 3000
```

---

## 📦 Building for Distribution

### Create Standalone Version

```bash
# Build optimized version
npm run build

# Files are created in 'dist' folder
```

### Share with Others (No Internet Needed)

1. Build the app (see above)
2. Copy the `dist` folder to a USB drive or network folder
3. Share with others
4. They can open `dist/index.html` in their browser

**Limitations:**
- Must use a local web server (can't open file:// directly)
- Use Python or Node.js server (see below)

### Run Built Version Locally

```bash
# Option 1: Using npm
npm run preview

# Option 2: Using Python
cd dist
python -m http.server 8000
# Open http://localhost:8000

# Option 3: Using Node.js
npx http-server dist -p 8000
# Open http://localhost:8000
```

---

## 🌐 Accessing from Other Devices (Same Network)

### Make It Accessible to Other Computers

```bash
# Start dev server
npm run dev

# Note the Network address shown:
# ➜  Network: http://192.168.1.100:5173/
```

Other computers on your network can access:
```
http://YOUR_IP_ADDRESS:5173
```

**Use Cases:**
- Access from laptop while running on desktop
- Test on mobile device
- Share with colleague on same network

---

## 📂 Project Folder Best Practices

### Recommended Structure

```
MyProjects/
├── Project1/
│   ├── current.xml
│   ├── current.xslt
│   ├── versions.json
│   ├── project-export.csv
│   ├── launch-project.bat
│   └── versions/
│       ├── v1.0.0.xml
│       ├── v1.0.0.xslt
│       ├── v1.1.0.xml
│       └── v1.1.0.xslt
├── Project2/
│   └── (same structure)
└── Project3/
    └── (same structure)
```

### Backup Strategy

1. **Cloud Backup:** Sync project folders to cloud
   - OneDrive
   - Google Drive
   - Dropbox
   - iCloud

2. **Git Backup:** Use Git for version control
   ```bash
   cd MyProject
   git init
   git add .
   git commit -m "Project snapshot"
   ```

3. **Export Backup:** Export CSV regularly
   - Keep in separate folder
   - Archive monthly
   - Share with team

---

## 🔐 Privacy & Security

### What Data is Collected?

**None.** This app:
- ✅ Runs 100% in your browser
- ✅ Stores data locally only
- ✅ Makes no network requests (except Saxon-JS library)
- ✅ No analytics
- ✅ No tracking
- ✅ No accounts
- ✅ No server communication

### Where is Data Stored?

1. **Browser IndexedDB**
   - Location: Browser's internal database
   - Access: Only this app on this browser
   - Cleared: When you clear browser data

2. **File System (Your Folder)**
   - Location: Folder you choose
   - Access: You control
   - Cleared: Never (unless you delete files)

### Can Others Access My Data?

**No.** All data is:
- Stored on your computer only
- Not uploaded anywhere
- Not shared with any service
- Not accessible to other users

---

## 💡 Tips & Tricks

### Tip 1: Quick Project Switching

Create launcher files in each project folder:
```bash
# In each project folder
# Click rocket icon to create launchers
# Double-click launcher to open that project
```

### Tip 2: Use XSLT Snippets

Press Ctrl+K to open 40+ ready-to-use XSLT templates:
- Basic stylesheets
- For-each loops
- Conditionals
- Templates
- Advanced patterns

### Tip 3: Format on Save

Before saving a version:
1. Press Ctrl+Shift+F (format XML)
2. Press Ctrl+Shift+G (format XSLT)
3. Press Ctrl+S (save version)

### Tip 4: Activity Log

Expand the Activity Log at the bottom to see:
- All transformations
- Save operations
- Import/export actions
- Errors and warnings
- Timestamps for everything

### Tip 5: Multiple Projects

Keep separate folders for different projects:
- Click folder icon
- Select different folder
- All changes auto-save to that project
- Switch between projects anytime

---

## 🆘 Getting Help

### Check Activity Log

The Activity Log shows:
- ✅ Success messages (green)
- ⚠️ Warnings (yellow)
- ❌ Errors (red)
- ℹ️ Info messages (blue)

Look here first when something doesn't work.

### Browser Console

Open Developer Tools:
- **Chrome/Edge:** F12 or Ctrl+Shift+I
- **Firefox:** F12 or Ctrl+Shift+K
- **Mac:** Cmd+Option+I

Check Console tab for detailed errors.

### Common Error Messages

| Error | Solution |
|-------|----------|
| "File System API not supported" | Use Chrome, Edge, or Brave |
| "XML parsing error" | Fix XML syntax errors |
| "XSLT compilation error" | Fix XSLT syntax errors |
| "Permission denied" | Grant folder access in browser |
| "Port already in use" | Close other instances or use different port |

---

## 🎓 Learning Resources

### XML/XSLT References

- [W3C XSLT 1.0 Spec](https://www.w3.org/TR/xslt-10/)
- [W3C XSLT 2.0 Spec](https://www.w3.org/TR/xslt20/)
- [W3C XSLT 3.0 Spec](https://www.w3.org/TR/xslt-30/)
- [Saxon-JS Documentation](https://www.saxonica.com/saxon-js/documentation/)

### This App's Documentation

- `README.md` - User guide
- `DEPLOYMENT_GUIDE.md` - Hosting guide
- `COMPLETE_REQUIREMENTS.md` - Full specification
- `PRD.md` - Product requirements

---

## 🚀 Next Steps

Now that you have the app running locally:

1. ✅ Create your first project folder
2. ✅ Try transforming the sample XML
3. ✅ Save your first version
4. ✅ Export to CSV
5. ✅ Create launcher files
6. ✅ Explore XSLT snippets
7. ✅ Customize theme and settings

**Enjoy your free, local, private XML/XSLT transformation tool!**

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Check Activity Log
3. Check browser console
4. Create GitHub issue

---

**Remember:** All your data stays on your computer. No internet required after initial setup. 100% free forever. 🎉

# Transio - XML/XSLT Transformer

**Official Website: [https://transio.org](https://transio.org)**

A professional-grade XML to XSLT transformation tool supporting XSLT 1.0, 2.0, and 3.0 with comprehensive developer features.

## 🌐 About Transio

Transio is a free, open-source, privacy-first XML transformation tool that runs entirely in your browser. No data is ever sent to any server - all processing happens locally on your computer.

### 🆕 NEW: One-Click Server Installer!

**👉 [START_HERE_SERVER.md](./START_HERE_SERVER.md) ← Click here for server installation!**

Install the optional Saxon-HE server in under 3 minutes:
- ✅ **Windows:** Double-click `server/install.bat`
- ✅ **Mac/Linux:** Run `./server/install.sh`
- ✅ **Automatic:** Downloads Saxon-HE, configures everything, tests server

**Why?** Unlocks full XSLT 2.0/3.0 support (grouping, advanced regex, large files)

**Not sure?** See [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md) comparison

## 🚀 **Deploy Your Own Instance in 5 Minutes!**

✅ **100% Free Hosting** - Deploy to GitHub Pages, Netlify, Vercel, or Cloudflare Pages  
✅ **No Backend Required** - Pure frontend application  
✅ **Local Data Only** - All your data stays on your computer  
✅ **No Account Needed** - Start using immediately  
✅ **Offline Capable** - Works without internet after loading  
✅ **Privacy First** - Zero tracking, zero data collection  
✅ **Open Source** - MIT License - modify and redistribute freely

Visit **[transio.org](https://transio.org)** to use the hosted version or deploy your own!  

### 🎯 Quick Deploy (Choose One)

**GitHub Pages (Most Popular):**
```bash
npm install
npm run deploy
# ✅ Live at: https://YOUR_USERNAME.github.io/xslt-transformer/
```

**Netlify (Drag & Drop - No Git Needed):**
```bash
npm install
npm run build
# ✅ Drag 'dist' folder to netlify.com/drop
```

**Vercel (Fastest CLI):**
```bash
npm install -g vercel
npm install
vercel --prod
# ✅ Follow prompts - live in 60 seconds
```

**Run Locally (Development):**
```bash
npm install
npm run dev
# ✅ Open http://localhost:5173
```

### 📚 Documentation

**📖 [DOCUMENTATION_SUMMARY.md](./DOCUMENTATION_SUMMARY.md) - Complete documentation index**

**Quick Links:**
- **Deployment:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | [SIMPLE_DEPLOY_GUIDE.md](./SIMPLE_DEPLOY_GUIDE.md)
- **Server Setup:** [START_HERE_SERVER.md](./START_HERE_SERVER.md) | [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)
- **Testing:** [TESTING_INSTALLER.md](./TESTING_INSTALLER.md)
- **Status:** [STATUS.md](./STATUS.md)

---

## 🖥️ Optional Server Setup (for XSLT 2.0/3.0 Production Use)

The app works great without a server, but you can optionally run a local Saxon-HE server for enhanced XSLT 2.0/3.0 support.

**🤔 Do you need the server?** See [BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md) for a comparison.

### ⚡ One-Click Installation

**📖 Complete Installation Guide: [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)**

#### Windows
1. Navigate to the `server` folder
2. **Double-click** `install.bat`
3. After installation, **double-click** `start-server.bat`

#### Mac / Linux
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

#### Using npm (All Platforms)
```bash
cd server
npm install
npm run install-server
npm start
```

The installer will automatically:
- ✅ Check for Node.js and Java
- ✅ Install dependencies
- ✅ Download Saxon-HE
- ✅ Configure everything
- ✅ Test the server

**Configure in the app:**

1. Click the **☁️ Cloud icon** in the header
2. Toggle "Enable Server"
3. Enter URL: `http://localhost:3001/api`
4. Click "Test Connection" → Should show "✅ Connection Successful"
5. Click "Save"

**Documentation:**
- 📘 **[SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)** - Complete installation guide for all platforms
- 🔧 **[SERVER_TROUBLESHOOTING_GUIDE.md](./SERVER_TROUBLESHOOTING_GUIDE.md)** - Fix port conflicts and common issues
- 🏗️ **[SAXON_SERVER_ARCHITECTURE.md](./SAXON_SERVER_ARCHITECTURE.md)** - How it works
- 🤔 **[BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)** - Do you need the server?
- 📖 **[server/README.md](./server/README.md)** - Server API reference

### 🔧 Server Troubleshooting

**Common Issue: Port Already in Use?**

The updated scripts **automatically** stop existing servers and restart. Just run:

```bash
# Mac/Linux
./start-server.sh

# Windows  
start-server.bat
```

**Need More Control?** Use the Server Manager:

```bash
chmod +x server-manager.sh
./server-manager.sh
```

This interactive menu lets you:
- Start/Stop/Restart server
- Check server status
- View logs
- Full reset (reinstall everything)
- Access troubleshooting guide

**Manual Solutions:** See [SERVER_TROUBLESHOOTING_GUIDE.md](./SERVER_TROUBLESHOOTING_GUIDE.md)

---

## Features

### Core Transformation
- **Multi-version XSLT Support**: XSLT 1.0 (browser XSLTProcessor), 2.0/3.0 (Saxon-JS)
- **Auto-detection**: Automatically detects XSLT version from stylesheet
- **Manual Override**: Version selector dropdown to override detected version
- **Real-time Validation**: Syntax error detection with line numbers
- **Performance Metrics**: Shows transformation time and processor used

### ⚠️ Important: XSLT 2.0/3.0 Support & Saxon-JS

**XSLT 1.0**: ✅ **Fully Supported**
- Uses the browser's built-in XSLTProcessor
- 100% open-source and free
- Works offline completely
- No limitations

**XSLT 2.0/3.0**: ⚠️ **Limited Browser Support** | ✅ **Full Server Support (Optional)**

This application uses **Saxon-JS** (by Saxonica) for client-side XSLT 2.0/3.0 transformations. Saxon-JS is **open-source** and licensed under the Mozilla Public License 2.0 (MPL-2.0).

**Client-Side (Saxon-JS):**
- ✅ **Open Source**: MPL-2.0 license - free to use, modify, and distribute
- ✅ **Commercial Use Allowed**: Can be used in commercial applications
- ⚠️ **Browser Limitations**: Saxon-JS has architectural constraints when running in browsers
- Works for basic XSLT 2.0 features like `<xsl:for-each-group>` (simple grouping)
- May fail on complex XSLT 2.0/3.0 features

**Server-Side (Saxon-HE) - OPTIONAL:**
- ✅ **Full XSLT 2.0/3.0 Support**: All features work without limitations
- ✅ **Open Source**: Saxon-HE uses Mozilla Public License 2.0 (MPL-2.0)
- ✅ **Better Performance**: Faster for large files (>5MB)
- ✅ **Enterprise-Grade**: Production-ready Java implementation
- ✅ **Automatic Fallback**: Falls back to client-side if server unavailable
- 📦 **Easy Setup**: Docker container or local Node.js server
- 💰 **Cost**: $0-12/month for hosting (or run locally for free)

**Setting Up the Server (Optional):**

```bash
cd server
npm install
npm run setup
npm start
# Server runs on http://localhost:3001
```

Then in the Transio app:
1. Click the **Server Config** button (cloud icon)
2. Enable server-side processing
3. Set API URL: `http://localhost:3001/api`
4. Test connection
5. Save configuration

**Complete server setup guide:** [SAXON_SERVER_SETUP.md](./SAXON_SERVER_SETUP.md)

**Architecture Options:**

**Architecture Options:**

1. **Client-Only (Default)** - Perfect for most users
   - Works everywhere, no setup
   - Free forever (static hosting)
   - XSLT 1.0 fully supported
   - Basic XSLT 2.0 features work

2. **Hybrid (Client + Optional Server)** - Best for advanced users
   - Client-side by default
   - Server for heavy workloads
   - Automatic fallback
   - See [SAXON_SERVER_SETUP.md](./SAXON_SERVER_SETUP.md)

3. **Server-First (Enterprise)** - For production environments
   - All transformations via server
   - Full XSLT 2.0/3.0 guaranteed
   - Large file support
   - Requires infrastructure

**Key Facts about Saxon-JS:**
- ✅ **Open Source**: MPL-2.0 license - free to use, modify, and distribute
- ✅ **Commercial Use Allowed**: Can be used in commercial applications
- ⚠️ **Browser Limitations**: Saxon-JS has architectural constraints when running in browsers

**How Saxon-JS Works:**

Saxon-JS has two modes:

1. **SEF Files (Recommended for Production)**
   - XSLT stylesheets must be pre-compiled into SEF (Saxon Executable Format) files
   - Pre-compilation is done using Saxon-EE (Enterprise Edition) on the server/build step
   - SEF files load and execute very fast in the browser
   - ❌ Requires Saxon-EE license for compilation step
   - ✅ Perfect for production apps with fixed stylesheets

2. **Direct XSLT (What This App Uses)**
   - Attempts to parse and execute XSLT directly in browser using `stylesheetNode`
   - ⚠️ **Limited Functionality**: Saxon-JS's browser runtime has reduced XSLT 2.0/3.0 support when not using SEF files
   - May fail on complex XSLT 2.0/3.0 features
   - Works for basic XSLT 2.0 features like:
     - `<xsl:for-each-group>` (simple grouping)
     - Basic XPath 2.0 functions
     - Some built-in functions like `current-date()`, `format-number()`
   - May not work for:
     - Complex schema-aware transformations
     - Advanced XPath 3.0/3.1 functions
     - Some XSLT 3.0-specific features

**For Production XSLT 2.0/3.0:**

If you need full XSLT 2.0/3.0 support, consider these alternatives:

1. **Server-side Saxon**
   - Run Saxon-HE (open-source) on a Node.js server
   - Full XSLT 2.0 support, no limitations
   - Repository: [Saxonica/Saxon-HE](https://github.com/Saxonica/Saxon-HE)
   
2. **Pre-compile with Saxon-EE**
   - Compile your XSLT to SEF format using Saxon-EE
   - Load SEF files in this app (requires code modification)
   - Contact Saxonica for Saxon-EE licensing

3. **XSLT 1.0 Only**
   - Stick to XSLT 1.0 features
   - 100% reliable browser support
   - No dependencies on external processors

**This App's Approach:**
- Includes Saxon-JS to provide *best-effort* XSLT 2.0/3.0 support
- Works well for educational purposes and simple XSLT 2.0 features
- For production use with complex XSLT 2.0/3.0, test thoroughly or use server-side processing
- XSLT 1.0 remains the most reliable option for browser-based transformation

**For complete details on XSLT version support, see [XSLT_SUPPORT_GUIDE.md](./XSLT_SUPPORT_GUIDE.md)**

**License Compliance:**
- ✅ Saxon-JS (MPL-2.0) is properly included in package.json
- ✅ This app is MIT licensed and compatible with MPL-2.0
- ✅ Saxon-JS source code and license available at: [Saxonica/Saxon-JS](https://github.com/Saxonica/Saxon-JS)
- ✅ No proprietary code or closed-source dependencies
- ✅ See [OPEN_SOURCE_INFO.md](./OPEN_SOURCE_INFO.md) for complete licensing details

### Themes
- **3 App Themes**: Light, Dark, and Black themes with optimized colors
- **10 Editor Themes**: VS Code Dark, GitHub Dark, Tokyo Night, Dracula, Monokai, Solarized Dark, Nord, Gruvbox Dark, Material Dark, Atom One
- **Theme Persistence**: Your theme choice is saved between sessions
- **Quick Toggle**: Click the sun/moon icon to cycle between themes

### Code Editing
- **CodeMirror 6**: Professional code editor with syntax highlighting
- **Auto-formatting**: Format XML and XSLT with Ctrl+Shift+F/G
- **Line Numbers**: Easy navigation and error location
- **Import/Export**: Load and save files with proper MIME types

### Version Control
- **Semantic Versioning**: Save versions with version numbers (e.g., 1.0.0)
- **Descriptions**: Add markdown descriptions to document changes
- **Version History**: Browse and load previous versions
- **Release Management**: Mark versions as released with release notes
- **Metadata Tracking**: Tracks XSLT version, timestamps, and status

### Project Management
- **File System Integration**: Uses File System Access API (Chromium browsers)
- **Auto-save**: Automatically saves current files every second
- **Version Files**: Saves each version as separate XML/XSLT files
- **Metadata Persistence**: Stores version metadata in versions.json
- **Project Loading**: Load entire projects from local folders
- **CSV Export**: Export all version data to spreadsheet-compatible CSV
- **Launcher Scripts**: Generate .bat (Windows) and .sh (Mac/Linux) files to quick-launch projects
- **Project Structure**: Organized folder with current files, versions, logs, and metadata

### XSLT Snippets
- **40+ Templates**: Ready-to-use XSLT patterns and boilerplate
- **Categories**: Organized by boilerplate, templates, loops, conditionals, instructions, variables, patterns
- **Search & Filter**: Find snippets quickly and filter by XSLT version
- **Version Compatibility**: Shows which XSLT versions support each snippet
- **Copy or Insert**: Copy to clipboard or insert directly into editor

### Developer Tools
- **Activity Log**: Tracks all operations with timestamps
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Mobile Responsive**: Tabs on mobile, split-pane on desktop
- **Toast Notifications**: Visual feedback for all actions
- **Help Dialog**: Complete keyboard shortcut reference

## Keyboard Shortcuts

- **Ctrl+Enter**: Transform XML with XSLT
- **Ctrl+S**: Save current version
- **Ctrl+K**: Open snippets panel
- **Ctrl+Shift+F**: Format XML
- **Ctrl+Shift+G**: Format XSLT
- **Ctrl+Shift+I**: Import XML file
- **Ctrl+Shift+O**: Import XSLT file
- **Ctrl+Shift+E**: Export output
- **?**: Show keyboard shortcuts help

## Getting Started

1. **Edit XML**: Enter or paste your XML data in the left editor
2. **Write XSLT**: Create your XSLT stylesheet in the right editor
3. **Transform**: Click the Transform button or press Ctrl+Enter
4. **View Output**: See the transformed result in the output panel
5. **Save Version**: Press Ctrl+S to save your work as a version

## Example Use Cases

### Basic HTML Table Generation
Transform a book catalog XML into a styled HTML table (sample provided on first load).

### Advanced Grouping (XSLT 2.0+)
Use the for-each-group snippet to group items by category or other attributes.

### Pattern Matching
Apply different templates based on element types or attributes.

### Multiple Output Files (XSLT 2.0+)
Use result-document to generate separate files for each item.

## 💾 Data Storage & Privacy

### 100% Local Storage

This app stores **ALL data locally on your computer**. Nothing is uploaded to any server.

**Two Storage Mechanisms:**

1. **Browser Storage (IndexedDB)**
   - Automatic storage via Spark's useKV hooks
   - Stores: XML, XSLT, versions, logs, settings
   - Persists between sessions (survives browser restart)
   - Can be cleared if you clear browser data
   - No setup required

2. **File System (Your Folder)**
   - Optional but recommended
   - Click folder icon to select a project folder
   - Files created:
     - `current.xml` - Your active XML document
     - `current.xslt` - Your active XSLT stylesheet
     - `versions.json` - Version control metadata
     - `version_*.xml` - Version snapshots
     - `version_*.xslt` - Version stylesheets
     - `project-export.csv` - Spreadsheet export
     - `launch-project.bat` - Windows launcher
     - `launch-project.sh` - Mac/Linux launcher
   - Auto-saves every 1 second after changes
   - Real files on your disk (permanent)
   - Only works in Chrome, Edge, Brave

### CSV Export

Export all your version data to CSV format:

1. Open a project folder (click folder icon)
2. Click the CSV icon (📄) in header
3. Find `project-export.csv` in your folder
4. Open with Excel, Google Sheets, or any spreadsheet app

**CSV includes:**
- Version numbers and descriptions
- Creation timestamps
- XSLT versions used
- Release status and notes
- Line counts for each version

### Launcher Files

Generate quick-launch scripts for your projects:

1. Open a project folder
2. Click the Rocket icon (🚀) in header
3. Two files are created:
   - `launch-project.bat` (Windows)
   - `launch-project.sh` (Mac/Linux)
4. Double-click to open the app with your project

**Perfect for:**
- Sharing projects with teammates
- Quick project switching
- Desktop shortcuts
- Portable project folders

## Browser Compatibility & File System Access

### Full Support (Chromium browsers)
- **Chrome, Edge, Opera, Brave**: All features including File System API
- File imports/exports work without issues
- Project folder management with auto-save
- CSV export and launcher generation

### Limited Support (Non-Chromium browsers)
- **Firefox, Safari**: All transformation features work, but no File System API
- File imports still work via standard file picker
- No project folder management or auto-save to disk
- All data persists in browser storage via Spark KV
- No CSV export or launcher generation

### File Import/Export CORS Issues

**The Problem:**
When using the file import feature (Ctrl+Shift+I/O), browsers enforce CORS policies that can cause issues when files are accessed via `file://` protocol.

**Solutions for Production:**

1. **Recommended: Deploy via HTTPS**
   - Host the app on any static hosting service (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
   - HTTPS deployments don't have CORS issues with File System API
   - Users can still access local files through the browser's file picker
   - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for 6 free hosting options

2. **Local Development: Use the Dev Server**
   - Always run `npm run dev` instead of opening `index.html` directly
   - The Vite dev server runs on `http://localhost:5173` (no CORS issues)
   - File imports work correctly through the file picker API

3. **File System Access API (Chromium only)**
   - Click the folder icon to select a project folder
   - This grants persistent access to that folder
   - Auto-save and project management work seamlessly
   - No CORS issues since you explicitly grant access

**What DOESN'T Work:**
- Opening `index.html` directly in the browser (`file://` protocol)
- This triggers CORS errors when trying to import files
- Solution: Always use `npm run dev` or deploy to production

**Production Deployment Steps:**
```bash
# Build for production
npm run build

# Option 1: Deploy to GitHub Pages
npm run deploy

# Option 2: Deploy to Netlify (drag & drop)
# Go to netlify.com/drop and drag the 'dist' folder

# Option 3: Deploy to Vercel
npx vercel --prod

# Option 4: Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

Once deployed, all file operations work correctly through the browser's security model.

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete deployment instructions.

## Technical Stack

- **React 19** with TypeScript
- **Vite 7** for development and building
- **Tailwind CSS 4** for styling
- **shadcn/ui v4** component library
- **CodeMirror 6** for code editing
- **Saxon-JS 2.7** for XSLT 2.0/3.0 support
- **Phosphor Icons** (bold weight)
- **Sonner** for toast notifications

## Data Persistence

All data is stored locally using the Spark KV store:
- XML and XSLT input persist across sessions
- Version history is saved automatically
- Editor theme, app theme, and XSLT version preferences are remembered
- Activity log maintains operation history

## License

Built with Spark - a GitHub project template system.

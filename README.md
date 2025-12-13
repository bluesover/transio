# Transio - XML/XSLT Transformer

**🌐 Official Website: [https://transio.org](https://transio.org)**

A professional, free, open-source XML to XSLT transformation tool supporting XSLT 1.0, 2.0, and 3.0. Privacy-first design - all processing happens locally in your browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-100%25-green.svg)](./LICENSE_SUMMARY.md)

---

## ✨ Features

### Core Transformation
- **Multi-version XSLT Support**: 1.0 (browser), 2.0/3.0 (Saxon-JS + optional server)
- **Auto-detection**: Automatically detects XSLT version from stylesheet
- **Manual Override**: Toggle between auto and manual version selection
- **Real-time Validation**: Syntax error detection with line numbers
- **Output Detection**: Automatically detects output format (HTML, XML, JSON, CSV, SVG)
- **Performance Metrics**: Transformation time and processor information

### Professional Code Editing
- **CodeMirror 6**: Advanced code editor with syntax highlighting
- **13 Editor Themes**: VS Code (Dark/Light), GitHub (Dark/Light), Tokyo Night, Dracula, Monokai, Solarized (Dark/Light), Nord, Gruvbox, Material, Atom One
- **3 App Themes**: Light, Dark, and Black with synchronized editor themes
- **Auto-formatting**: Format XML, XSLT, and output (Ctrl+Shift+F/G/H)
- **Line Numbers & Folding**: Easy navigation and code organization

### Version Control
- **Semantic Versioning**: Save with version numbers (e.g., 1.0.0)
- **Rich Descriptions**: Markdown support for detailed change notes
- **Version History Panel**: Collapsible sidebar with all saved versions
- **Release Management**: Mark versions as released with release notes
- **Quick Load**: Restore any previous version instantly

### Project Management
- **File System Integration**: Native folder access (Chrome/Edge/Brave)
- **Auto-save**: Saves current work every second to selected folder
- **Organized Structure**: `/versions` subfolder keeps versions organized
- **CSV Export**: Export all version data to spreadsheet format
- **Launcher Scripts**: Generate platform-specific quick-launch files
- **Project Loading**: Load entire projects from local folders

### Developer Tools
- **40+ XSLT Snippets**: Ready-to-use templates with search & filter
- **Activity Log**: Collapsible log panel tracking all operations
- **Keyboard Shortcuts**: Full keyboard navigation (Ctrl+Enter, Ctrl+S, Ctrl+K, etc.)
- **Mobile Responsive**: Optimized layouts for phone, tablet, and desktop
- **Toast Notifications**: Visual feedback for all actions

---

## 🚀 Quick Start

### Use Online (No Installation)
Visit **[transio.org](https://transio.org)** - works immediately, no account needed!

### Run Locally
```bash
git clone <your-repo>
cd transio
npm install
npm run dev
# Open http://localhost:5173
```

### Deploy Your Own (5 Minutes)

**Cloudflare Pages (Recommended):**
```bash
npm run build
npx wrangler pages deploy dist --project-name=transio
```

**GitHub Pages:**
```bash
npm run build
npm run deploy
```

**Netlify:**
```bash
npm run build
# Drag 'dist' folder to netlify.com/drop
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## ⚙️ Optional Server Setup (XSLT 2.0/3.0 Enhancement)

The app works great without a server (client-side Saxon-JS), but you can optionally run a local Saxon-HE server for enhanced XSLT 2.0/3.0 support.

**Why use the server?**
- ✅ Full XSLT 2.0/3.0 support without browser limitations
- ✅ Better performance for large files (>5MB)
- ✅ Enterprise-grade Java Saxon-HE processor
- ✅ Automatic fallback to client-side if unavailable

### One-Click Installation

**Windows:**
```bash
cd server
install.bat
start-server.bat
```

**Mac/Linux:**
```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

**Configure in App:**
1. Click the ☁️ Cloud icon in header
2. Toggle "Enable Server"
3. URL: `http://localhost:3001/api`
4. Click "Test Connection"
5. Save

📖 **Complete Server Guide:** [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl+Enter** | Transform XML with XSLT |
| **Ctrl+S** | Save current version |
| **Ctrl+K** | Open snippets panel |
| **Ctrl+Shift+F** | Format XML |
| **Ctrl+Shift+G** | Format XSLT |
| **Ctrl+Shift+H** | Format Output |
| **Ctrl+Shift+I** | Import XML file |
| **Ctrl+Shift+O** | Import XSLT file |
| **Ctrl+Shift+E** | Import output file |
| **?** | Show keyboard shortcuts help |

---

## 💾 Data Storage & Privacy

### 100% Local Storage
**All data stays on your computer. Nothing is ever uploaded to any server.**

**Two Storage Mechanisms:**

1. **Browser Storage (IndexedDB via Spark KV)**
   - Automatic, no setup required
   - Stores XML, XSLT, versions, settings, logs
   - Persists between browser sessions
   - Cleared only if you clear browser data

2. **File System (Optional)**
   - Click folder icon to select project folder
   - Real files on your disk:
     - `current.xml` - Active XML document
     - `current.xslt` - Active XSLT stylesheet
     - `versions.json` - Version metadata
     - `/versions/` - Version snapshots
     - `project-export.csv` - CSV export
     - `launch-project.bat/.sh` - Quick launchers
   - Auto-saves every 1 second
   - Works in Chrome, Edge, Brave (File System Access API)

---

## 🛠️ Tech Stack

All dependencies are **100% open source**:

- **React 19** + TypeScript
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **shadcn/ui v4** - Component library
- **CodeMirror 6** - Code editor
- **Saxon-JS 2.7** - XSLT 2.0/3.0 (MPL-2.0)
- **Phosphor Icons** - Icon library
- **Sonner** - Toast notifications

📄 **License Compliance:** [LICENSE_SUMMARY.md](./LICENSE_SUMMARY.md)

---

## 📚 Documentation

- **[PRD.md](./PRD.md)** - Product Requirements & Design Decisions
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)** - Optional server setup
- **[SERVER_TROUBLESHOOTING_GUIDE.md](./SERVER_TROUBLESHOOTING_GUIDE.md)** - Fix common issues
- **[XSLT_SUPPORT_GUIDE.md](./XSLT_SUPPORT_GUIDE.md)** - XSLT version support details
- **[BROWSER_VS_SERVER.md](./BROWSER_VS_SERVER.md)** - Should you use the server?
- **[LICENSE_SUMMARY.md](./LICENSE_SUMMARY.md)** - Open source compliance

---

## 🌟 Use Cases

### Basic HTML Table Generation
Transform XML data into styled HTML tables.

### Advanced Grouping (XSLT 2.0+)
Use `<xsl:for-each-group>` to group items by category.

### Pattern Matching
Apply different templates based on element types.

### Multiple Output Files (XSLT 2.0+)
Use `<xsl:result-document>` to generate multiple files.

### Data Transformation
Convert XML to JSON, CSV, or other formats.

---

## 🤝 Contributing

This is an open-source project under the MIT License. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

**MIT License** - See [LICENSE](./LICENSE) file

**Third-Party Licenses:**
- Saxon-JS: Mozilla Public License 2.0 (MPL-2.0)
- All other dependencies: MIT or compatible open-source licenses

See [LICENSE_SUMMARY.md](./LICENSE_SUMMARY.md) for complete details.

---

## 🙏 Acknowledgments

- **Saxonica** for Saxon-JS (XSLT 2.0/3.0 support)
- **GitHub** for Spark template system
- Open-source community for all the amazing libraries

---

**Built with ❤️ using open-source technologies**

Visit [transio.org](https://transio.org) to start transforming!

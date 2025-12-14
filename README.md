# Transio - XML/XSLT Transformer

**🌐 Official Website: [https://transio.org](https://transio.org)**

**📂 GitHub Repository: [https://github.com/bluesover/transio](https://github.com/bluesover/transio)**

A professional, free, open-source XML to XSLT transformation tool supporting XSLT 1.0, 2.0, and 3.0. Privacy-first design - all processing happens locally in your browser.

[![License: MPL-2.0](https://img.shields.io/badge/License-MPL%202.0-blue.svg)](./LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-100%25-green.svg)](https://github.com/bluesover/transio)
[![Contribute](https://img.shields.io/badge/Contribute-Welcome-brightgreen.svg)](https://github.com/bluesover/transio/issues)

---

## 🤝 Contribute & Collaborate

We welcome contributions, ideas, and issues from the community!

- **💡 Share Ideas**: [Open a discussion](https://github.com/bluesover/transio/discussions)
- **🐛 Report Issues**: [Submit a bug report](https://github.com/bluesover/transio/issues)
- **🔧 Contribute Code**: [Fork and create a PR](https://github.com/bluesover/transio/pulls)
- **⭐ Star the Repo**: Show your support on [GitHub](https://github.com/bluesover/transio)

---

## 💻 Desktop Applications

Download standalone desktop apps for **Windows, macOS, and Linux**!

### 📥 Download

**Latest Release**: [View all releases](https://github.com/bluesover/transio/releases/latest)

**Quick Downloads**:
- **macOS**: [Download .dmg](https://github.com/bluesover/transio/releases/latest/download/Transio-1.0.0.dmg) (Intel & Apple Silicon)
- **Windows**: [Download .exe](https://github.com/bluesover/transio/releases/latest/download/Transio-Setup-1.0.0.exe) (64-bit)
- **Linux**: [Download .AppImage](https://github.com/bluesover/transio/releases/latest/download/Transio-1.0.0.AppImage) | [.deb](https://github.com/bluesover/transio/releases/latest/download/Transio-1.0.0.deb) | [.rpm](https://github.com/bluesover/transio/releases/latest/download/Transio-1.0.0.rpm)

### ✨ Desktop Features

- ✅ **One-click installation** - No manual setup required
- ✅ **Built-in Saxon-HE server** - Auto-installs for full XSLT 2.0/3.0 support
- ✅ **Full offline operation** - Works without internet
- ✅ **Large file support** - Process XML files 100MB+
- ✅ **Auto-updates** - Get new features automatically
- ✅ **Native performance** - Faster than web version
- ✅ **Same familiar UI** - Identical to web app

### 🔧 Installation

**macOS**:
1. Download `.dmg` file
2. Open and drag to Applications
3. Right-click → Open (first launch only)

**Windows**:
1. Download `.exe` installer
2. Run and follow setup wizard
3. Click "More info" → "Run anyway" if SmartScreen appears

**Linux (AppImage)**:
```bash
chmod +x Transio-*.AppImage
./Transio-*.AppImage
```

**Linux (DEB)**:
```bash
sudo dpkg -i Transio-*.deb
```

**Linux (RPM)**:
```bash
sudo rpm -i Transio-*.rpm
```

### 📚 More Info

For building desktop apps from source, see the `electron/` directory in the repository.

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

**Cloudflare Pages (Free, Recommended):**
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=transio
```

Or use the npm script:
```bash
npm run deploy
```

**GitHub Actions Auto-Deploy:**
The repository includes automated deployment via GitHub Actions. Every push to `main` automatically deploys to Cloudflare Pages and syncs to the public repository.

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

📖 **Complete Server Guide:** See [server/README.md](./server/README.md)

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

All dependencies are **100% open source** with permissive licenses:

- **React 19** + TypeScript - MIT
- **Vite 7** - MIT
- **Tailwind CSS 4** - MIT
- **shadcn/ui v4** - MIT
- **CodeMirror 6** - MIT
- **Saxon-JS 2.7** - MPL-2.0
- **Phosphor Icons** - MIT
- **Sonner** - MIT

---

## 📚 Documentation

- **[PRD.md](./PRD.md)** - Product Requirements Document
- **[CLEANUP_GUIDE.md](./CLEANUP_GUIDE.md)** - Project cleanup and maintenance
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[SECURITY.md](./SECURITY.md)** - Security policy
- **[SEO_GUIDE.md](./SEO_GUIDE.md)** - Complete SEO optimization guide
- **[SEARCH_ENGINE_SUBMISSION.md](./SEARCH_ENGINE_SUBMISSION.md)** - Submit to Google & Bing
- **[LICENSE](./LICENSE)** - MPL-2.0 License

---

## 🔍 SEO & Search Engine Submission

Transio is optimized for search engines with:
- ✅ Comprehensive meta tags (Open Graph, Twitter Cards, Schema.org)
- ✅ XML sitemap at [transio.org/sitemap.xml](https://transio.org/sitemap.xml)
- ✅ Robots.txt configured
- ✅ Fast loading (Cloudflare CDN)
- ✅ Mobile-responsive design

### Submit to Search Engines

**Quick submission (5 minutes):**
1. **Google Search Console**: https://search.google.com/search-console
2. **Bing Webmaster Tools**: https://www.bing.com/webmasters

**Step-by-step guide:** See [SEARCH_ENGINE_SUBMISSION.md](./SEARCH_ENGINE_SUBMISSION.md)

**Verify SEO setup:**
```bash
chmod +x scripts/verify-seo.sh
./scripts/verify-seo.sh
```

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

## 🌐 Custom Domain Setup

**Domain:** transio.org  
**Registrar:** GoDaddy  
**Hosting:** Cloudflare Pages

**Quick Steps:**
1. Add domain to Cloudflare
2. Update GoDaddy nameservers to Cloudflare
3. Add CNAME records in Cloudflare DNS
4. Connect custom domain in Cloudflare Pages
5. Configure SSL/TLS (Full strict mode)

SSL certificates are automatically provisioned by Cloudflare.

---

## 🧹 Project Maintenance

### Cleaning Up Unnecessary Files

If you're forking or maintaining this project, use the cleanup script to remove temporary documentation files:

```bash
chmod +x cleanup-project.sh
./cleanup-project.sh
```

This will:
- Remove all temporary documentation and build guides
- Fix package-lock.json synchronization issues
- Update dependencies to latest versions
- Keep only essential documentation (README, PRD, CONTRIBUTING, LICENSE, SECURITY)

For detailed cleanup instructions, see **[CLEANUP_GUIDE.md](./CLEANUP_GUIDE.md)**

### Fixing Build Errors

**If you encounter any build errors (Vite, Rollup, dependency issues):**

Use the automated fix script:

**Mac/Linux:**
```bash
chmod +x fix-dependencies.sh
./fix-dependencies.sh
```

**Windows:**
```bash
fix-dependencies.bat
```

This script will:
- Remove corrupted node_modules
- Clean npm cache
- Reinstall all dependencies
- Fix server dependencies
- Verify installation

**For detailed troubleshooting, see [BUILD_TROUBLESHOOTING.md](./BUILD_TROUBLESHOOTING.md)**

**For Cloudflare deployment errors:**
After fixing locally, commit and push:
```bash
git add package-lock.json
git commit -m "fix: synchronize package-lock.json"
git push origin main
```

---

## 🤝 Contributing

This is an open-source project under MPL-2.0. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

**Mozilla Public License 2.0 (MPL-2.0)** - See [LICENSE](./LICENSE) file

This ensures the project remains open source while allowing commercial use.

**Third-Party Licenses:**
- Saxon-JS: Mozilla Public License 2.0 (MPL-2.0)
- All other dependencies: MIT or compatible open-source licenses

---

## 🙏 Acknowledgments

- **Saxonica** for Saxon-JS (XSLT 2.0/3.0 support)
- **GitHub** for Spark template system
- Open-source community for all the amazing libraries

---

**Built with ❤️ using open-source technologies**

Visit [transio.org](https://transio.org) to start transforming!

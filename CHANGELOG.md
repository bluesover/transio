# Changelog

All notable changes to Transio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-14

### 🎉 Initial Release

The first official release of Transio - Professional XML/XSLT Transformer!

### ✨ Features

#### Core Transformation
- **Multi-version XSLT Support**: Full support for XSLT 1.0, 2.0, and 3.0
- **Auto-detection**: Automatically detects XSLT version from stylesheet
- **Manual Override**: Toggle between auto and manual version selection with lock icon
- **Real-time Validation**: Syntax error detection with detailed error messages
- **Output Detection**: Automatically detects output format (HTML, XML, JSON, CSV, SVG, Text)
- **Performance Metrics**: Displays transformation time and processor information
- **Server Support**: Optional Saxon-HE server for advanced XSLT 2.0/3.0 features

#### Professional Code Editor
- **CodeMirror 6**: Modern code editor with advanced features
- **13 Editor Themes**: 
  - VS Code Dark/Light
  - GitHub Dark/Light
  - Tokyo Night
  - Dracula
  - Monokai
  - Solarized Dark/Light
  - Nord
  - Gruvbox Dark/Light
  - Material Dark
  - Atom One Dark
- **3 App Themes**: Light, Dark, and Black with auto-synchronized editor themes
- **Auto-formatting**: Format XML, XSLT, and output with keyboard shortcuts
- **Syntax Highlighting**: Full XML/XSLT syntax support
- **Line Numbers**: Easy code navigation

#### Version Control & Project Management
- **Save Versions**: Create named versions with descriptions
- **Version History**: Track all saved versions with timestamps
- **Release Management**: Mark versions as released with release notes
- **Load Versions**: Restore any previous version instantly
- **Project Folders**: Link to local folder for automatic file syncing
- **CSV Export**: Export all versions and metadata to CSV
- **Launcher Generation**: Create .bat/.sh files to launch project directly

#### XSLT Snippets Library
- **40+ Snippets**: Pre-built templates for common XSLT patterns
- **Categorized**: Organized by XSLT version (1.0, 2.0, 3.0, Common)
- **Search**: Quick search through snippet library
- **One-click Insert**: Insert snippets directly into editor

#### File Operations
- **Import/Export**: Support for XML, XSLT, and output files
- **Multiple Formats**: Export output in detected format (HTML, XML, JSON, etc.)
- **Drag & Drop Ready**: File system integration via File System Access API
- **Auto-save**: Automatic saving to linked project folder

#### Activity Logging
- **Full Activity Log**: Tracks all transformations, imports, exports, and errors
- **Timestamps**: Precise timing for all operations
- **Details View**: Expandable entries with full error messages
- **Persistent**: Log survives page refreshes

#### Keyboard Shortcuts
- `Ctrl+Enter`: Transform
- `Ctrl+S`: Save version
- `Ctrl+K`: Open snippets
- `Ctrl+Shift+F`: Format XML
- `Ctrl+Shift+G`: Format XSLT
- `Ctrl+Shift+H`: Format output
- `Ctrl+Shift+I`: Import XML
- `Ctrl+Shift+O`: Import XSLT
- `Ctrl+Shift+P`: Import output
- `Ctrl+Shift+X`: Export XML
- `Ctrl+Shift+Y`: Export XSLT
- `Ctrl+Shift+D`: Export output
- `?`: Show keyboard shortcuts

#### Desktop Application Features
- **One-click Installation**: No manual configuration required
- **Built-in Saxon-HE Server**: Automatically installs Java and Saxon-HE
- **Auto-updates**: Automatic update notifications and installation
- **Native Performance**: Faster than web version
- **Offline Operation**: Full functionality without internet
- **Large File Support**: Handle XML files 100MB+
- **Window State Persistence**: Remembers size and position
- **System Integration**: Native menus and keyboard shortcuts

### 🌐 Platform Support

#### Web Application
- **Browser-based**: Works in Chrome, Firefox, Safari, Edge
- **No Installation**: Use directly at https://transio.org
- **Privacy-first**: All processing happens locally in browser
- **XSLT 1.0**: Built-in support via browser XSLT processor
- **XSLT 2.0/3.0**: Via Saxon-JS (in-browser) or optional server

#### Desktop Applications
- **macOS**: Universal binary (Intel + Apple Silicon)
  - `.dmg` installer
  - `.zip` portable
- **Windows**: 64-bit
  - `.exe` installer with NSIS
- **Linux**: Multiple formats
  - `.AppImage` (all distributions)
  - `.deb` (Debian/Ubuntu)
  - `.rpm` (Fedora/RHEL/CentOS)

### 📚 Documentation
- Comprehensive README with installation instructions
- Deployment guides for Cloudflare Pages
- Desktop app build instructions
- Contributing guidelines
- Security policy
- Maintainer guide
- Production readiness report

### 🔐 Security
- **Open Source**: Fully auditable code (MIT License)
- **Privacy-first**: No data collection, no analytics
- **Local Processing**: All transformations happen client-side
- **Secure Dependencies**: All packages from trusted sources
- **Mozilla Public License 2.0**: Saxon-JS compliance

### 🎨 Design
- **Modern UI**: Clean, professional interface
- **Responsive**: Mobile and desktop optimized
- **Dark/Light/Black Themes**: Choose your preferred appearance
- **Custom Fonts**: Inter (UI) + JetBrains Mono (code)
- **Accessible**: WCAG AA compliant color contrasts

### 🛠️ Technical Stack
- **React 19**: Latest React with modern patterns
- **TypeScript**: Full type safety
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **CodeMirror 6**: Professional code editor
- **Saxon-JS 2.7**: XSLT 2.0/3.0 in-browser support
- **Electron 28**: Desktop application framework
- **Express**: Server framework for Saxon-HE

### 🚀 Deployment
- **Cloudflare Pages**: Production deployment
- **Custom Domain**: https://transio.org
- **GitHub Releases**: Automated desktop app releases
- **Auto-deployment**: Push to main triggers deployment

### 📦 Release Assets

This release includes:
- **Source Code**: Full repository snapshot
- **macOS**: `.dmg` and `.zip` installers
- **Windows**: `.exe` installer
- **Linux**: `.AppImage`, `.deb`, and `.rpm` packages
- **Documentation**: Complete guides and references

### 🙏 Acknowledgments

Built with love using open-source technologies:
- React, TypeScript, Vite, Tailwind CSS
- Saxon-JS by Saxonica
- CodeMirror, Electron, and many other great projects

---

**Full Changelog**: https://github.com/bluesover/transio/commits/v1.0.0

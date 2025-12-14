# Transio Desktop Application Roadmap

## 🎯 Overview

On-premise desktop applications for **Windows, Mac, and Linux** are planned to provide enterprise-grade XSLT transformation with full Saxon-HE integration and automatic dependency management.

---

## 📦 Planned Features

### Core Features
- ✅ **One-Click Installation** - Single installer handles all dependencies
- ✅ **Auto-Install Saxon-HE** - Java-based Saxon-HE processor installed automatically
- ✅ **Auto-Install Java Runtime** - Bundles JRE 11+ if not present on system
- ✅ **Full XSLT 2.0/3.0 Support** - Complete specification support via Saxon-HE
- ✅ **Local File Processing** - Handle large XML files (100MB+) efficiently
- ✅ **Offline Operation** - No internet required after installation
- ✅ **Local Server** - Built-in Saxon-HE server for transformations
- ✅ **Same UI/UX** - Identical interface to web version
- ✅ **Project Management** - All web features available offline

### Technical Architecture

```
Desktop App
├── Electron/Tauri Shell
│   ├── Web UI (React app)
│   └── Local File System Access
├── Built-in Node.js Server
│   ├── Express API
│   └── Saxon-HE Integration
├── Java Runtime (Bundled)
│   └── OpenJDK 11+ LTS
└── Saxon-HE JAR (Bundled)
    └── saxon-he-12.x.jar
```

---

## 🚀 Implementation Plan

### Phase 1: Server Foundation (✅ Complete)
- [x] Saxon-HE server implementation
- [x] REST API for transformations
- [x] Connection testing
- [x] Error handling
- [x] XSLT version detection

### Phase 2: Desktop Packaging (In Progress)
- [x] Electron configuration setup
- [x] Build scripts for Windows/Mac/Linux
- [x] **App icon generation (Windows, macOS, Linux)** ✨ NEW
- [ ] Bundle Java runtime (JRE 11+)
- [ ] Bundle Saxon-HE JAR
- [ ] Auto-start local server on launch
- [ ] Installer creation (NSIS/DMG/AppImage)

#### 🎨 Icon Generation (✅ Complete)

All desktop app icons can be generated with one command:

```bash
npm run icons
```

This creates:
- **Windows**: `icon.ico` (multi-resolution)
- **macOS**: `icon.icns` (Retina-ready)
- **Linux**: PNG set (16×16 to 1024×1024)

**Requirements**: ImageMagick
**Source**: `src/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png`
**Location**: `desktop-resources/icons/`

📖 **Guides**:
- Quick Start: [ICON_QUICK_START.md](./ICON_QUICK_START.md)
- Full Guide: [ICON_GENERATION_GUIDE.md](./ICON_GENERATION_GUIDE.md)
- Icon Specs: [desktop-resources/ICONS_README.md](./desktop-resources/ICONS_README.md)

### Phase 3: Installation Experience (Planned Q1 2025)
- [ ] One-click installers
- [ ] Java runtime detection
- [ ] Auto-download JRE if missing
- [ ] Saxon-HE automatic setup
- [ ] Desktop shortcuts
- [ ] System integration (file associations)

### Phase 4: Features & Polish (Planned Q2 2025)
- [ ] File drag-and-drop support
- [ ] System file picker integration
- [ ] Background processing for large files
- [ ] Update mechanism
- [ ] Crash reporting
- [ ] Performance optimizations

---

## 💻 Platform Support

### Windows (Planned)
- **Installer**: `.exe` (NSIS/WiX)
- **Minimum**: Windows 10 (64-bit)
- **Size**: ~150-200 MB (includes JRE + Saxon-HE)

### macOS (Planned)
- **Installer**: `.dmg` or `.pkg`
- **Minimum**: macOS 10.15 Catalina
- **Size**: ~150-200 MB (includes JRE + Saxon-HE)
- **Architecture**: Universal (Intel + Apple Silicon)

### Linux (Planned)
- **Installer**: `.AppImage`, `.deb`, `.rpm`
- **Minimum**: Ubuntu 20.04+ / equivalent
- **Size**: ~150-200 MB (includes JRE + Saxon-HE)

---

## 🔧 Technical Stack

### Desktop Framework Options

#### Option 1: Electron (Recommended)
**Pros:**
- ✅ Mature ecosystem
- ✅ Cross-platform consistency
- ✅ Easy Node.js integration
- ✅ Large community

**Cons:**
- ❌ Larger bundle size (~150-200 MB)
- ❌ More memory usage

#### Option 2: Tauri
**Pros:**
- ✅ Smaller bundle size (~30-50 MB)
- ✅ Better performance
- ✅ Uses system webview
- ✅ Rust-based (secure)

**Cons:**
- ❌ Newer ecosystem
- ❌ May require webview installation on some systems

### Bundled Dependencies

1. **Java Runtime Environment (JRE)**
   - OpenJDK 11+ LTS
   - Size: ~40-80 MB compressed
   - Bundled or auto-downloaded

2. **Saxon-HE JAR**
   - saxon-he-12.x.jar
   - Size: ~4 MB
   - License: MPL 2.0 (open source)

3. **Node.js Server**
   - Express API
   - Size: ~10 MB
   - Starts automatically with app

---

## 📋 Installation Flow

### Windows Example
```
1. User downloads: transio-setup-windows-x64.exe
2. Runs installer
3. Installer checks for Java
   - If missing: Downloads OpenJDK 11
   - If present: Uses existing
4. Extracts application files
5. Installs Saxon-HE JAR
6. Creates desktop shortcut
7. Launches application
8. Server starts automatically on localhost:3001
9. UI opens in app window
10. Ready to use!
```

### Mac Example
```
1. User downloads: transio-setup-macos-universal.dmg
2. Opens DMG and drags to Applications
3. Runs app first time
4. macOS checks code signature
5. App checks for Java
   - If missing: Downloads OpenJDK 11
   - If present: Uses existing
6. Server starts automatically
7. UI opens in app window
8. Ready to use!
```

### Linux Example
```
1. User downloads: transio-setup-linux-x64.AppImage
2. Makes executable: chmod +x transio-setup-linux-x64.AppImage
3. Runs: ./transio-setup-linux-x64.AppImage
4. App checks for Java
   - If missing: Downloads OpenJDK 11
   - If present: Uses existing
5. Server starts automatically
6. UI opens in app window
7. Ready to use!
```

---

## 🔒 Security & Privacy

- ✅ **100% Offline** - No data sent to external servers
- ✅ **Local Processing** - All transformations on your machine
- ✅ **No Telemetry** - Zero tracking or analytics
- ✅ **Open Source** - Full code transparency
- ✅ **Code Signing** - Signed binaries for trust

---

## 📊 Current Status

### ✅ Ready
- Saxon-HE server implementation
- API endpoints
- Connection testing
- Error handling

### 🚧 In Progress
- Desktop packaging research
- Build script development

### 📅 Planned
- Electron/Tauri implementation
- Installer creation
- Auto-updater
- Distribution

---

## 🎯 Timeline

| Phase | Timeline | Status |
|-------|----------|--------|
| Server Implementation | Q4 2024 | ✅ Complete |
| Desktop Packaging | Q1 2025 | 📅 Planned |
| Beta Testing | Q1 2025 | 📅 Planned |
| Public Release | Q2 2025 | 📅 Planned |

---

## 💡 Current Workaround

While desktop apps are in development, you can run Transio locally:

### Option 1: Web Version with Local Server
```bash
# Clone repository
git clone https://github.com/bluesover/transio.org.git
cd transio.org

# Install dependencies
npm install

# Start local server (Saxon-HE)
cd server
chmod +x start-server.sh
./start-server.sh

# In another terminal, start web app
npm run dev
```

### Option 2: Web Version Only (XSLT 1.0)
Simply visit https://transio.org and use XSLT 1.0 transformations (no server needed).

---

## 🤝 Contributing

Want to help with desktop app development?

1. **Star the repo**: https://github.com/bluesover/transio.org
2. **Open issues**: Share ideas and feature requests
3. **Submit PRs**: Contribute code for desktop packaging
4. **Test builds**: Help test pre-release versions

---

## 📞 Stay Updated

- **Website**: https://transio.org
- **GitHub**: https://github.com/bluesover/transio.org
- **Issues**: https://github.com/bluesover/transio.org/issues

---

## ❓ FAQ

### When will desktop apps be available?
Target: Q2 2025 for public release. Beta versions may be available in Q1 2025.

### Will it be free?
Yes! 100% free and open source (MIT License).

### Which XSLT versions will be supported?
Full XSLT 1.0, 2.0, and 3.0 support via Saxon-HE.

### Will I need to install Java manually?
No! The installer will handle Java installation automatically.

### Can I use it offline?
Yes! Once installed, no internet connection is required.

### How large will the installer be?
Approximately 150-200 MB (includes Java runtime and Saxon-HE).

### Will it replace the web version?
No! Both will coexist. Web version for quick access, desktop for heavy processing.

---

Made with ❤️ for the developer community

# Transio Desktop App

**Professional XML to XSLT Transformer - Native Desktop Application**

🌐 **Website**: [https://transio.org](https://transio.org)  
📦 **Repository**: [https://github.com/bluesover/transio.org](https://github.com/bluesover/transio.org)  
📖 **Documentation**: [https://transio.org/docs](https://transio.org/docs)

---

## ✨ Features

### Core Capabilities
- ✅ **XSLT 1.0, 2.0, and 3.0 Support** - Full specification coverage
- ✅ **Offline Operation** - No internet required after installation
- ✅ **Auto Saxon-HE Installation** - Java runtime and Saxon-HE installed automatically
- ✅ **Native File System** - Direct file access without browser limitations
- ✅ **Version Control** - Built-in version management for transformations
- ✅ **Project Management** - Organize transformations in projects
- ✅ **40+ XSLT Snippets** - Ready-to-use templates and patterns
- ✅ **Code Editor** - Syntax highlighting, line numbers, auto-formatting
- ✅ **Activity Log** - Complete audit trail of operations
- ✅ **Auto-Updates** - Seamless updates via GitHub Releases

### Desktop-Specific Features
- 🖥️ **Native Menus** - Platform-specific application menus
- ⌨️ **Keyboard Shortcuts** - Full keyboard navigation
- 📁 **File Associations** - Open .xml and .xslt files directly
- 🔔 **Native Notifications** - System-level alerts
- 💾 **Auto-Save** - Automatic project persistence
- 🔄 **File Watching** - Detect external file changes
- 📤 **Export Projects** - Zip export/import functionality
- 🌙 **Multiple Themes** - Light, Dark, and Black themes

---

## 📥 Installation

### Quick Install (Recommended)

#### Windows

1. Download `Transio-Setup-{version}.exe` from [Releases](https://github.com/bluesover/transio.org/releases)
2. Run the installer
3. Follow the setup wizard
4. Launch Transio from Start Menu or Desktop

**Portable Version:**
- Download `Transio-Portable-{version}.exe`
- Run directly, no installation needed
- Great for USB drives

#### macOS

1. Download `Transio-{version}.dmg` from [Releases](https://github.com/bluesover/transio.org/releases)
2. Open the DMG file
3. Drag Transio to Applications folder
4. Launch from Applications

**Apple Silicon (M1/M2/M3):**
- Download `Transio-{version}-arm64.dmg` for native ARM support
- Download `Transio-{version}.dmg` for Intel (runs via Rosetta 2)

#### Linux

**AppImage (Universal):**
```bash
# Download AppImage
wget https://github.com/bluesover/transio.org/releases/download/v1.0.0/Transio-1.0.0.AppImage

# Make executable
chmod +x Transio-1.0.0.AppImage

# Run
./Transio-1.0.0.AppImage
```

**Debian/Ubuntu (.deb):**
```bash
sudo dpkg -i transio_1.0.0_amd64.deb
sudo apt-get install -f  # Fix dependencies
```

**Fedora/RedHat (.rpm):**
```bash
sudo rpm -i transio-1.0.0.x86_64.rpm
```

---

## 🔨 Build from Source

### Prerequisites

- Node.js 18+ and npm
- Git
- **macOS**: Xcode Command Line Tools
- **Windows**: (Optional) Visual Studio Build Tools
- **Linux**: gcc, make, build-essential

### Build Steps

#### 1. Clone Repository

```bash
git clone https://github.com/bluesover/transio.org.git
cd transio.org
```

#### 2. One-Click Build

**macOS/Linux:**
```bash
chmod +x install-desktop.sh
./install-desktop.sh
```

**Windows:**
```cmd
install-desktop.bat
```

This script will:
1. Check prerequisites
2. Install all dependencies
3. Build the web app
4. Build the desktop app
5. Create installers in `dist-desktop/`

#### 3. Manual Build (Advanced)

```bash
# Install dependencies
npm install
npm run server:install

# Build web app
npm run build

# Build desktop app
npm run electron:build          # Current platform only
npm run electron:build:mac      # macOS
npm run electron:build:win      # Windows
npm run electron:build:linux    # Linux
npm run electron:build:all      # All platforms
```

---

## 🚀 Usage

### First Launch

1. **Launch the app** - Saxon-HE installation will start automatically
2. **Wait for installation** - Java runtime and Saxon-HE will be downloaded (1-2 minutes)
3. **Server starts automatically** - Local Saxon-HE server launches in background
4. **Start transforming!** - All features are now available

### Basic Workflow

1. **Create/Open Project**
   - File → New Project or Open Project
   - Select a folder for your project files

2. **Edit XML and XSLT**
   - Type or paste XML input
   - Create XSLT transformation
   - Use snippets (Ctrl/Cmd+K) for templates

3. **Transform**
   - Click Transform button or press Ctrl/Cmd+Enter
   - View results in Output panel
   - Auto-detected output format (HTML, XML, Text)

4. **Save Versions**
   - File → Save Project (Ctrl/Cmd+S)
   - Enter version number (e.g., 1.0.0)
   - Add description
   - Load previous versions anytime

### Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Transform | Ctrl+Enter | Cmd+Enter |
| Save Version | Ctrl+S | Cmd+S |
| Open Snippets | Ctrl+K | Cmd+K |
| Format XML | Ctrl+Shift+F | Cmd+Shift+F |
| Format XSLT | Ctrl+Shift+G | Cmd+Shift+G |
| Format Output | Ctrl+Shift+H | Cmd+Shift+H |
| Import XML | Ctrl+Shift+I | Cmd+Shift+I |
| Import XSLT | Ctrl+Shift+O | Cmd+Shift+O |
| Export Output | Ctrl+Shift+E | Cmd+Shift+E |
| Toggle Version Panel | Ctrl+B | Cmd+B |
| Toggle Activity Log | Ctrl+L | Cmd+L |
| Keyboard Shortcuts | Ctrl+? | Cmd+? |

---

## 🔧 Configuration

### Saxon-HE Server

**Auto-Configuration:**
- Server starts automatically on app launch
- Runs on port 3001 (localhost only)
- Health checks every 30 seconds
- Auto-restart on crash

**Manual Control:**
- Settings → Server Configuration
- Start/Stop server manually
- Change port (edit `electron/saxon-installer.ts`)
- View server logs

### File Locations

**User Data:**
- **Windows**: `%APPDATA%\Transio`
- **macOS**: `~/Library/Application Support/Transio`
- **Linux**: `~/.config/transio`

**Logs:**
- **Windows**: `%APPDATA%\Transio\logs`
- **macOS**: `~/Library/Logs/Transio`
- **Linux**: `~/.config/transio/logs`

**Saxon-HE Installation:**
- Stored in user data directory
- `saxon/` - Saxon-HE JAR files
- `jre/` - Java Runtime Environment

---

## 🆘 Troubleshooting

### Common Issues

**App won't start:**
- Check system requirements (Node.js not required for installed app)
- View logs in user data directory
- Try reinstalling

**Saxon-HE installation fails:**
- Check internet connection
- Verify firewall isn't blocking downloads
- Try manual installation via Settings

**Server won't start:**
- Check if port 3001 is available
- View server logs
- Restart app
- Reinstall Saxon-HE from Settings

**Transformations fail:**
- Verify XSLT syntax
- Check XSLT version (1.0/2.0/3.0)
- View error details in output panel
- Check activity log for details

**File operations don't work:**
- Verify folder permissions
- Try selecting a different folder
- Check if files are in use by another app

### Platform-Specific Issues

**macOS: "App can't be opened"**
- Right-click app → Open → Click Open again
- Or: System Preferences → Security → Allow

**Windows: SmartScreen warning**
- Click "More info" → "Run anyway"
- App is not code-signed yet (coming soon)

**Linux: Permission denied**
```bash
chmod +x Transio-*.AppImage
```

---

## 🔄 Updates

### Automatic Updates

- App checks for updates on launch
- Notification shown when update available
- Download happens in background
- Prompted to restart and install
- All settings and projects preserved

### Manual Update Check

- Help → Check for Updates
- Or download latest from [Releases](https://github.com/bluesover/transio.org/releases)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Areas for Contribution:**
- Bug fixes
- Feature enhancements
- Documentation improvements
- Platform-specific optimizations
- Translations (coming soon)
- Testing on different platforms

---

## 📄 License

**MPL-2.0 License** - Mozilla Public License 2.0

This means:
- ✅ Free to use for any purpose
- ✅ Can modify and distribute
- ✅ Can use in commercial products
- ✅ Patent grant included
- ⚠️ Modified source code must be disclosed
- ⚠️ Same license for modifications

Compatible with Saxon-HE (also MPL-2.0).

See [LICENSE](./LICENSE) for full text.

---

## 🌟 Credits

**Built with:**
- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [React](https://react.dev/) - UI framework
- [Saxon-HE](https://www.saxonica.com/) - XSLT 2.0/3.0 processor
- [CodeMirror](https://codemirror.net/) - Code editor
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety

**Special Thanks:**
- Saxonica for Saxon-HE
- Adoptium for Java runtime
- The open-source community

---

## 📞 Support

- **Documentation**: [https://transio.org/docs](https://transio.org/docs)
- **Issues**: [GitHub Issues](https://github.com/bluesover/transio.org/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bluesover/transio.org/discussions)
- **Website**: [https://transio.org](https://transio.org)

---

## 🎯 Roadmap

### v1.1 (Q1 2025)
- [ ] Code signing for all platforms
- [ ] Store distribution (Microsoft Store, Mac App Store)
- [ ] Git integration
- [ ] Cloud backup (optional)
- [ ] Custom themes

### v1.2 (Q2 2025)
- [ ] Diff view for versions
- [ ] Collaborative features
- [ ] Plugin system
- [ ] Enhanced XSLT debugging
- [ ] Translations (i18n)

### Future
- [ ] XSLT 4.0 support (when released)
- [ ] XQuery support
- [ ] Schema generation
- [ ] Performance profiling
- [ ] REST API server

---

**Made with ❤️ by the Transio team**

Visit [transio.org](https://transio.org) for more information.

# Desktop App Implementation - All Phases

## 🎯 Overview

Transform Transio into a fully-featured desktop application for Windows, Mac, and Linux with:
- **Electron-based native app** packaging
- **Automatic dependency installation** (Saxon-HE, Java Runtime)
- **Complete offline operation** with local file system access
- **Native OS integration** (file associations, menu bar, notifications)
- **Auto-update system** for seamless updates
- **One-click installers** for all platforms

---

## 📋 Phase 1: Project Structure Setup

### 1.1 Create Electron App Structure

```
transio/
├── electron/                    # Electron main process
│   ├── main.ts                 # Main electron entry point
│   ├── preload.ts              # Preload scripts for security
│   ├── ipc-handlers.ts         # IPC communication handlers
│   ├── menu.ts                 # Native menu setup
│   ├── auto-updater.ts         # Auto-update logic
│   └── saxon-installer.ts      # Saxon-HE + Java installer
├── desktop-resources/          # Desktop app resources
│   ├── icons/                  # App icons (icns, ico, png)
│   ├── installers/             # Installer assets
│   └── splash/                 # Splash screen
├── src/                        # React app (existing)
├── server/                     # Saxon-HE server (existing)
└── dist-electron/              # Electron build output
```

### 1.2 Dependencies to Add

```json
{
  "devDependencies": {
    "electron": "^28.1.0",
    "electron-builder": "^24.9.1",
    "electron-updater": "^6.1.7",
    "concurrently": "^8.2.2",
    "wait-on": "^7.2.0"
  },
  "dependencies": {
    "electron-store": "^8.1.0",
    "electron-log": "^5.0.1"
  }
}
```

---

## 📋 Phase 2: Electron Main Process

### 2.1 Main Entry Point (`electron/main.ts`)

**Features:**
- Window management with saved state
- IPC communication setup
- Auto-updater initialization
- Native menu integration
- Deep linking support (transio:// protocol)
- File association (.xml, .xslt files)

### 2.2 Preload Script (`electron/preload.ts`)

**Expose Safe APIs:**
- File system operations
- Saxon-HE server management
- Native dialogs
- System information
- Auto-update controls

### 2.3 IPC Handlers (`electron/ipc-handlers.ts`)

**Channels:**
- `file:read` - Read XML/XSLT files
- `file:write` - Write files
- `file:choose-directory` - Native folder picker
- `file:watch` - Watch file changes
- `saxon:check` - Check Saxon-HE installation
- `saxon:install` - Install Saxon-HE + Java
- `saxon:start-server` - Start local Saxon server
- `saxon:stop-server` - Stop Saxon server
- `project:export` - Export project as zip
- `update:check` - Check for app updates

---

## 📋 Phase 3: Saxon-HE Auto-Installer

### 3.1 Installer Logic (`electron/saxon-installer.ts`)

**Installation Steps:**
1. **Check Java Runtime**
   - Detect existing Java installation
   - If missing, download bundled JRE (Adoptium)
   - Install to app data directory

2. **Download Saxon-HE**
   - Download from Maven Central or bundle with app
   - Extract Saxon-HE JAR to app directory
   - Verify installation with test transform

3. **Configure Server**
   - Copy server files from `/server` directory
   - Set up environment variables
   - Create startup scripts

4. **Start Server**
   - Launch Saxon-HE server on port 3001
   - Monitor server health
   - Auto-restart on crash

### 3.2 Platform-Specific Installation

**Windows:**
- Download Adoptium JRE (Windows x64)
- Extract to `%APPDATA%/Transio/jre`
- Create `.bat` startup script
- Add firewall exception for server

**macOS:**
- Bundle JRE with app (macOS universal)
- Install to `~/Library/Application Support/Transio/jre`
- Create `.sh` startup script with proper permissions
- Sign server binary for Gatekeeper

**Linux:**
- Detect package manager (apt/yum/dnf)
- Install Java via package manager or download JRE
- Install to `~/.local/share/transio/jre`
- Create systemd service (optional)

---

## 📋 Phase 4: Enhanced File System Integration

### 4.1 Native File Operations

**Replace Browser File System API with:**
- Native file dialogs (open/save)
- Direct file read/write (no permissions needed)
- File watching for external changes
- Recent files list
- File associations (.xml, .xslt)

### 4.2 Project Management

**Features:**
- Open project from folder
- Auto-save without user permission
- Watch for external file changes
- Project templates
- Export project as ZIP
- Import project from ZIP

### 4.3 Version Control Enhancement

**Features:**
- Git integration (optional)
- Diff view between versions
- Export version history as markdown
- Backup to cloud services (optional)

---

## 📋 Phase 5: Native Menu & Shortcuts

### 5.1 Application Menu

**File Menu:**
- New Project
- Open Project...
- Open Recent >
- Save Project
- Export Project...
- Import Project...
- Exit

**Edit Menu:**
- Undo
- Redo
- Cut
- Copy
- Paste
- Find...
- Format XML
- Format XSLT

**Transform Menu:**
- Transform (Ctrl/Cmd+Enter)
- Set XSLT Version >
- Clear Output
- Export Output...

**View Menu:**
- Toggle Version Panel
- Toggle Activity Log
- Zoom In/Out/Reset
- Toggle Developer Tools

**Window Menu:**
- Minimize
- Zoom
- Bring All to Front (macOS)

**Help Menu:**
- Documentation
- Keyboard Shortcuts
- Check for Updates
- Report Issue
- About Transio

### 5.2 Context Menus

**Editor Context Menu:**
- Cut/Copy/Paste
- Format Code
- Insert Snippet...
- Find...

**Version Card Context Menu:**
- Load Version
- Delete Version
- Export Version...
- Duplicate Version

---

## 📋 Phase 6: Auto-Update System

### 6.1 Update Configuration

**Using electron-updater:**
- Check for updates on launch
- Background download
- Prompt user to install
- Silent updates (optional setting)

### 6.2 Update Servers

**Options:**
- GitHub Releases (free, public)
- Custom S3/CDN (full control)
- Cloudflare R2 (free tier available)

### 6.3 Update Channels

- **Stable** - Production releases
- **Beta** - Testing releases
- **Dev** - Development builds

---

## 📋 Phase 7: Installer Creation

### 7.1 Electron Builder Configuration

**electron-builder.json:**
```json
{
  "appId": "org.transio.app",
  "productName": "Transio",
  "copyright": "Copyright © 2024 Transio",
  "directories": {
    "output": "dist-desktop"
  },
  "files": [
    "dist/**/*",
    "electron/**/*",
    "server/**/*",
    "node_modules/**/*"
  ],
  "mac": {
    "target": ["dmg", "zip"],
    "category": "public.app-category.developer-tools",
    "icon": "desktop-resources/icons/icon.icns",
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "desktop-resources/entitlements.mac.plist"
  },
  "win": {
    "target": ["nsis", "portable"],
    "icon": "desktop-resources/icons/icon.ico"
  },
  "linux": {
    "target": ["AppImage", "deb", "rpm"],
    "category": "Development",
    "icon": "desktop-resources/icons"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

### 7.2 Installer Features

**Windows (NSIS):**
- Custom install location
- Desktop shortcut
- Start menu entry
- File associations
- Add to PATH (optional)

**macOS (DMG):**
- Drag-to-Applications interface
- Custom background
- Code signing + notarization
- Gatekeeper compliance

**Linux (AppImage/deb/rpm):**
- AppImage: Portable, no installation
- Deb: For Debian/Ubuntu
- RPM: For Fedora/RedHat/CentOS

---

## 📋 Phase 8: Platform-Specific Features

### 8.1 Windows

**Features:**
- Windows taskbar integration
- Jump list (recent projects)
- Native notifications
- Windows Store distribution (optional)

### 8.2 macOS

**Features:**
- Touch Bar support
- Dock menu (recent projects)
- macOS notifications
- Mac App Store distribution (optional)

### 8.3 Linux

**Features:**
- System tray icon
- Desktop notifications
- Flatpak packaging (optional)
- Snap packaging (optional)

---

## 📋 Phase 9: Offline Operation

### 9.1 Bundle All Dependencies

**Include in App:**
- Saxon-HE JAR file
- Java Runtime (JRE)
- Server files
- Documentation (offline access)
- Example projects

### 9.2 Local Server Management

**Features:**
- Auto-start server on app launch
- Health check every 30 seconds
- Auto-restart on crash
- Graceful shutdown on app quit
- Port conflict detection

### 9.3 Offline Documentation

**Bundle HTML docs:**
- XSLT reference
- User guide
- Keyboard shortcuts
- Troubleshooting guide

---

## 📋 Phase 10: Testing & Quality

### 10.1 Automated Testing

**Test Suites:**
- Unit tests (Jest/Vitest)
- Integration tests (Electron + React)
- E2E tests (Playwright)
- Cross-platform tests (Windows/Mac/Linux)

### 10.2 Manual Testing Checklist

**Installation:**
- [ ] Clean install works on all platforms
- [ ] Saxon-HE auto-installs correctly
- [ ] Server starts automatically
- [ ] File associations work
- [ ] Uninstall removes all files

**Functionality:**
- [ ] All web features work in desktop app
- [ ] File operations work without permissions
- [ ] Project save/load works
- [ ] Version control persists
- [ ] Server transformations work
- [ ] Offline mode works

**Updates:**
- [ ] Update check works
- [ ] Update download works
- [ ] Update installation works
- [ ] App restarts after update

---

## 📋 Phase 11: Distribution

### 11.1 Release Channels

**Download from transio.org:**
- Direct downloads (GitHub Releases)
- Auto-update enabled
- Checksums provided

**Optional Stores:**
- Microsoft Store (Windows)
- Mac App Store (macOS)
- Snap Store (Linux)
- Flathub (Linux)

### 11.2 Code Signing

**Windows:**
- Purchase code signing certificate
- Sign .exe with SignTool
- Timestamp signature

**macOS:**
- Apple Developer account required
- Sign app with codesign
- Notarize with Apple
- Staple notarization

**Linux:**
- GPG sign packages
- Add to trusted repositories

### 11.3 Release Process

**Automated with GitHub Actions:**
1. Tag release (e.g., v1.0.0)
2. Build on all platforms (Windows/Mac/Linux)
3. Sign binaries
4. Upload to GitHub Releases
5. Update website download links
6. Announce release

---

## 📋 Phase 12: Documentation

### 12.1 User Documentation

**Create:**
- Installation guide (all platforms)
- First-time setup wizard
- User manual (offline + online)
- Video tutorials
- Troubleshooting guide

### 12.2 Developer Documentation

**Create:**
- Build instructions
- Contributing guide
- Architecture overview
- IPC API documentation
- Release process

---

## 🚀 Implementation Timeline

### Week 1-2: Foundation
- Set up Electron project structure
- Configure build system
- Create basic window with React app

### Week 3-4: Saxon-HE Integration
- Implement auto-installer
- Bundle Java runtime
- Set up local server management

### Week 5-6: Native Features
- File system integration
- Native menus and shortcuts
- Platform-specific features

### Week 7-8: Installer & Distribution
- Create installers for all platforms
- Set up auto-update system
- Code signing setup

### Week 9-10: Testing & Polish
- Cross-platform testing
- Bug fixes
- Documentation
- Beta testing

### Week 11-12: Release
- Public beta release
- Community feedback
- Final polish
- Official v1.0 release

---

## 📊 Technical Requirements

### Minimum System Requirements

**Windows:**
- Windows 10 or later
- 4 GB RAM
- 500 MB disk space

**macOS:**
- macOS 10.15 (Catalina) or later
- 4 GB RAM
- 500 MB disk space

**Linux:**
- Ubuntu 20.04+ / Fedora 35+ / Debian 11+
- 4 GB RAM
- 500 MB disk space

---

## 🎯 Success Criteria

**Must Have:**
- [x] One-click installation on all platforms
- [x] Automatic Saxon-HE + Java installation
- [x] Full offline operation
- [x] File associations work
- [x] Auto-updates work
- [x] All web features work in desktop

**Nice to Have:**
- [ ] Store distribution (Microsoft/Mac App/Snap)
- [ ] Touch Bar support (macOS)
- [ ] System tray integration
- [ ] Cloud backup integration
- [ ] Git integration

---

## 📝 Notes

- **License**: MPL-2.0 (compatible with Saxon-HE)
- **Security**: Sandboxed server, no arbitrary code execution
- **Privacy**: Zero telemetry, all data stays local
- **Open Source**: Full source code on GitHub

---

## 🔗 Resources

- Electron Docs: https://www.electronjs.org/docs
- Electron Builder: https://www.electron.build
- Saxon-HE: https://www.saxonica.com/download/java.xml
- Adoptium JRE: https://adoptium.net/

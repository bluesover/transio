# Desktop App Build Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- For macOS: Xcode Command Line Tools
- For Windows: Visual Studio Build Tools (optional, for native modules)
- For Linux: Standard build tools (gcc, make)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/bluesover/transio.org.git
cd transio.org

# Install dependencies
npm install

# Install server dependencies
npm run server:install
```

---

## 🛠️ Development

### Run in Development Mode

```bash
# Start Electron app with hot reload
npm run electron:dev
```

This will:
1. Start Vite dev server on port 5173
2. Wait for the server to be ready
3. Launch Electron app
4. Enable hot reload for React code
5. Open DevTools automatically

### Development Features

- **Hot Reload**: React changes reload automatically
- **DevTools**: Automatically opened for debugging
- **Source Maps**: Full TypeScript debugging support
- **Live Server**: Changes to main process require restart

---

## 📦 Building for Production

### Build for Current Platform

```bash
# Build for your current platform only
npm run electron:build
```

Output in `dist-desktop/` directory.

### Build for Specific Platforms

```bash
# Build for macOS only (x64 + ARM64)
npm run electron:build:mac

# Build for Windows only (x64 + ia32)
npm run electron:build:win

# Build for Linux only (AppImage, deb, rpm)
npm run electron:build:linux
```

### Build for All Platforms

```bash
# Build for macOS, Windows, and Linux
npm run electron:build:all
```

**Note**: Cross-platform building has limitations:
- macOS builds require macOS
- Windows builds work on Windows/Linux (with Wine)
- Linux builds work on all platforms

---

## 📋 Build Output

### macOS

**Files generated:**
- `Transio-{version}.dmg` - Disk image installer
- `Transio-{version}-mac.zip` - Zip archive
- `Transio-{version}-arm64.dmg` - Apple Silicon installer

**Installation:**
1. Open DMG file
2. Drag Transio to Applications
3. Launch from Applications folder
4. Allow security permissions if prompted

### Windows

**Files generated:**
- `Transio-Setup-{version}.exe` - NSIS installer
- `Transio-Portable-{version}.exe` - Portable version

**Installation:**
- **Installer**: Run setup, choose install location
- **Portable**: Run directly, no installation needed

**Note**: First run may show Windows Defender warning (not code-signed yet)

### Linux

**Files generated:**
- `Transio-{version}.AppImage` - Universal Linux package
- `transio_{version}_amd64.deb` - Debian/Ubuntu package
- `transio-{version}.x86_64.rpm` - RedHat/Fedora package

**Installation:**

**AppImage:**
```bash
chmod +x Transio-*.AppImage
./Transio-*.AppImage
```

**Debian/Ubuntu:**
```bash
sudo dpkg -i transio_*.deb
sudo apt-get install -f  # Fix dependencies if needed
```

**Fedora/RedHat:**
```bash
sudo rpm -i transio-*.rpm
```

---

## 🔧 Configuration

### Electron Builder Configuration

Edit `electron-builder.json` to customize:
- App ID and name
- Icon paths
- Target platforms
- Code signing
- Auto-update settings
- File associations

### TypeScript Configuration

Edit `tsconfig.electron.json` for Electron process TypeScript settings.

---

## 🎨 Icons

### Required Icon Files

Place icons in `desktop-resources/icons/`:

**macOS:**
- `icon.icns` (512x512, 256x256, 128x128, 64x64, 32x32, 16x16)

**Windows:**
- `icon.ico` (256x256, 128x128, 64x64, 48x48, 32x32, 16x16)

**Linux:**
- `icon.png` (512x512 recommended)
- Multiple sizes: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256, 512x512

### Generate Icons

Use these tools to generate from a single source:
- **electron-icon-builder**: `npm install -g electron-icon-builder`
- **Online tools**: https://www.electronjs.org/fiddle/docs/icon-guide

```bash
# Generate all icons from source.png
electron-icon-builder --input=source.png --output=desktop-resources/icons
```

---

## 📝 Code Signing

### Why Code Sign?

- **macOS**: Required for Gatekeeper, prevents warnings
- **Windows**: Prevents SmartScreen warnings
- **User Trust**: Professional appearance, verified developer

### macOS Code Signing

**Requirements:**
- Apple Developer account ($99/year)
- Developer ID Application certificate

**Steps:**
1. Get Developer ID certificate from Apple
2. Export as `.p12` file
3. Set environment variables:

```bash
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_certificate_password
export APPLE_ID=your@apple-id.com
export APPLE_ID_PASSWORD=app-specific-password
```

4. Build will automatically sign and notarize

**Notarization:**
Required for macOS 10.15+. Happens automatically if credentials are set.

### Windows Code Signing

**Requirements:**
- Code signing certificate from CA (Sectigo, DigiCert, etc.)
- Cost: $70-400/year

**Steps:**
1. Purchase code signing certificate
2. Receive certificate file (.pfx or .p12)
3. Set environment variables:

```bash
set CSC_LINK=C:\path\to\certificate.pfx
set CSC_KEY_PASSWORD=your_certificate_password
```

4. Build will automatically sign

### Skip Code Signing (Development)

```bash
# Skip code signing for testing
export CSC_IDENTITY_AUTO_DISCOVERY=false
```

---

## 🔄 Auto-Updates

### GitHub Releases (Free)

Auto-updates configured to use GitHub Releases by default.

**Setup:**
1. Create GitHub release with version tag (e.g., `v1.0.0`)
2. Upload build artifacts to release
3. App checks for updates on launch
4. Users prompted to download/install updates

**Manual release:**
```bash
# Build and create GitHub release
npm run electron:build
# Upload files from dist-desktop/ to GitHub release
```

**Automated with GitHub Actions:**
See `.github/workflows/release.yml` (created below)

### Custom Update Server

Edit `electron-builder.json`:
```json
{
  "publish": {
    "provider": "generic",
    "url": "https://your-cdn.com/updates/"
  }
}
```

---

## 🎯 Platform-Specific Features

### macOS

**Features Implemented:**
- Native menu bar
- Touch Bar support (if available)
- Dock icon with badge
- macOS notifications
- Drag & drop to dock

**File Associations:**
- `.xml` files
- `.xslt` files
- `.xsl` files

### Windows

**Features Implemented:**
- Native taskbar integration
- Jump list (recent projects)
- Windows notifications
- System tray icon (optional)

**File Associations:**
- `.xml` files
- `.xslt` files
- `.xsl` files

**Start Menu:**
- Shortcut created automatically
- Uninstaller available

### Linux

**Features Implemented:**
- Desktop entry (.desktop file)
- Application menu integration
- System notifications
- System tray icon

**File Associations:**
- `.xml` files
- `.xslt` files
- `.xsl` files

---

## 🧪 Testing

### Manual Testing Checklist

**Before Release:**
- [ ] Clean install works
- [ ] Saxon-HE auto-installs correctly
- [ ] Server starts automatically
- [ ] All transformations work (1.0, 2.0, 3.0)
- [ ] File operations work (open, save, export)
- [ ] Version control persists
- [ ] Project folders work
- [ ] Keyboard shortcuts work
- [ ] Menu items work
- [ ] Updates check/download/install
- [ ] Uninstall removes all files

### Automated Testing

```bash
# Run unit tests
npm test

# Run E2E tests (if configured)
npm run test:e2e
```

---

## 📚 Troubleshooting

### Build Fails

**Error: "Cannot find module 'electron'"**
```bash
npm install --save-dev electron
```

**Error: "node-gyp rebuild failed"**
```bash
# macOS
xcode-select --install

# Windows
npm install --global windows-build-tools

# Linux
sudo apt-get install build-essential
```

### Saxon-HE Installation Issues

**Server won't start:**
1. Check logs: `~/Library/Application Support/Transio/logs` (macOS)
2. Verify Java installation
3. Check firewall settings
4. Try manual installation in app settings

**Port 3001 already in use:**
- Change port in `electron/saxon-installer.ts`
- Kill existing process: `lsof -ti:3001 | xargs kill`

### macOS Notarization Fails

**Error: "Notarization failed"**
1. Verify Apple ID credentials
2. Check app-specific password
3. Review notarization logs
4. Ensure all entitlements are correct

---

## 📦 Distribution

### GitHub Releases

**Automated Release Process:**
1. Tag version: `git tag v1.0.0`
2. Push tag: `git push origin v1.0.0`
3. GitHub Actions builds and uploads artifacts
4. Create release notes
5. Publish release

### Alternative Distribution

**Microsoft Store (Windows):**
- Requires developer account ($19 one-time)
- Submit .appx build
- Review process takes 1-3 days

**Mac App Store (macOS):**
- Requires Apple Developer account ($99/year)
- Stricter sandboxing requirements
- Review process takes 1-3 days

**Snap Store (Linux):**
- Free, no account required
- Build snap package
- Upload to store

---

## 🔐 Security

### Best Practices

1. **Context Isolation**: Enabled by default
2. **Node Integration**: Disabled in renderer
3. **Sandbox**: Enabled for renderer process
4. **Content Security Policy**: Configured in index.html
5. **Secure IPC**: All IPC handlers validated
6. **No eval()**: Avoided in all code
7. **Dependencies**: Regularly updated

### Security Checklist

- [ ] All dependencies up to date
- [ ] No known vulnerabilities (`npm audit`)
- [ ] Content Security Policy configured
- [ ] Context isolation enabled
- [ ] Sandbox enabled
- [ ] HTTPS only for external resources
- [ ] Input validation on all IPC handlers

---

## 📊 Build Sizes

**Approximate sizes:**
- **macOS DMG**: ~150 MB
- **Windows Installer**: ~120 MB
- **Linux AppImage**: ~130 MB

**Size breakdown:**
- Electron runtime: ~80 MB
- App code: ~5 MB
- Saxon-HE: ~4 MB
- Java Runtime: ~40 MB (downloaded on first run)
- Dependencies: ~20 MB

---

## 🆘 Support

**Issues:**
- GitHub Issues: https://github.com/bluesover/transio.org/issues
- Documentation: https://transio.org/docs
- Community: GitHub Discussions

**Contributing:**
See CONTRIBUTING.md for guidelines.

---

## 📝 License

MPL-2.0 License - See LICENSE file for details.

Compatible with Saxon-HE (MPL-2.0).

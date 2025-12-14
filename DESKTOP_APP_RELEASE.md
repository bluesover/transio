# Desktop App Release Guide

## Prerequisites

1. **Install Electron dependencies**:
   ```bash
   npm install --save-dev electron electron-builder
   ```

2. **Ensure you have signing certificates** (optional but recommended):
   - **macOS**: Apple Developer ID certificate
   - **Windows**: Code signing certificate
   - **Linux**: No signing required

## Building Desktop Apps

### Option 1: Build All Platforms (Requires macOS for DMG)

```bash
# From project root
cd desktop
npm install
npm run build:all
```

### Option 2: Build Individual Platforms

**Windows**:
```bash
cd desktop
npm install
npm run build:win
```

**macOS**:
```bash
cd desktop
npm install
npm run build:mac
```

**Linux**:
```bash
cd desktop
npm install
npm run build:linux
```

## Build Outputs

Built files will be in `desktop/dist/`:
- Windows: `Transio-Setup-1.0.0.exe`
- macOS: `Transio-1.0.0.dmg`
- Linux: `Transio-1.0.0.AppImage`

## Creating a GitHub Release

### Step 1: Create a Git Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

### Step 2: Create Release on GitHub

1. Go to: https://github.com/bluesover/transio.org/releases
2. Click "Draft a new release"
3. Choose tag: `v1.0.0`
4. Release title: `Transio v1.0.0`
5. Description:
   ```markdown
   ## Transio v1.0.0 - Desktop Release
   
   ### Features
   - Full offline XSLT transformation
   - Native file system integration
   - Automatic Saxon-HE server installation
   - Support for XSLT 1.0, 2.0, and 3.0
   - Version control and project management
   
   ### Downloads
   - **Windows**: Transio-Setup-1.0.0.exe
   - **macOS**: Transio-1.0.0.dmg (Intel & Apple Silicon)
   - **Linux**: Transio-1.0.0.AppImage
   
   ### Installation
   - **Windows**: Run the installer
   - **macOS**: Open DMG and drag to Applications
   - **Linux**: Make executable (`chmod +x`) and run
   ```

### Step 3: Upload Built Files

Drag and drop these files from `desktop/dist/`:
- `Transio-Setup-1.0.0.exe`
- `Transio-1.0.0.dmg`
- `Transio-1.0.0.AppImage`

### Step 4: Publish Release

Click "Publish release"

## Automated GitHub Actions Release (Recommended)

Create `.github/workflows/release.yml`:

```yaml
name: Build and Release Desktop Apps

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - name: Install root dependencies
        run: npm ci
      
      - name: Build web app
        run: npm run build
      
      - name: Install desktop dependencies
        working-directory: ./desktop
        run: npm ci
      
      - name: Build desktop app
        working-directory: ./desktop
        run: npm run build
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.os }}-build
          path: desktop/dist/*

  create-release:
    needs: release
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/download-artifact@v4
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            **/Transio-Setup-*.exe
            **/Transio-*.dmg
            **/Transio-*.AppImage
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Testing the Download Links

After publishing the release, test the URLs:

- Windows: `https://github.com/bluesover/transio.org/releases/latest/download/Transio-Setup-1.0.0.exe`
- macOS: `https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg`
- Linux: `https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.AppImage`

## Troubleshooting

### DMG Build Fails on Non-Mac
- DMG files can only be built on macOS
- Use GitHub Actions with macOS runner
- Or build on a Mac computer

### Code Signing Issues
- Unsigned apps may show security warnings
- Get proper certificates for production
- For testing, users can bypass warnings (not recommended for production)

### File Not Found (404)
- Ensure release is published (not draft)
- Verify exact filename matches in download URLs
- Check that files were uploaded successfully

## Quick Manual Release Process

If you just want to make downloads available quickly:

1. **Build locally** (on your Mac):
   ```bash
   cd desktop
   npm install
   npm run build:mac  # or build:all if you can
   ```

2. **Create GitHub Release**:
   - Go to https://github.com/bluesover/transio.org/releases/new
   - Tag: `v1.0.0`
   - Title: `Transio v1.0.0`
   - Upload your built `.dmg` file
   - Publish

3. **Test download**:
   ```bash
   curl -I https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg
   ```

The download button on your website will now work!

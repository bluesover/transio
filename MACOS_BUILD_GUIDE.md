# Building Desktop App on macOS

## Quick Steps to Create Desktop Releases

### 1. Open Terminal on your MacBook

```bash
cd ~/path/to/transio
```

### 2. Navigate to electron directory

```bash
cd electron
```

### 3. Install dependencies (if not done already)

```bash
npm install
```

### 4. Build macOS app (DMG file)

```bash
npm run build:mac
```

This creates `electron/dist/Transio-1.0.0.dmg` (takes ~5-10 minutes)

### 5. Build Linux app (optional, works on macOS)

```bash
npm run build:linux
```

This creates `electron/dist/Transio-1.0.0.AppImage`

### 6. For Windows build (requires additional setup)

Windows builds require either:
- A Windows machine/VM, OR
- Wine installed on macOS (not recommended, often fails)

**Easiest option:** Use GitHub Actions to build Windows version automatically (see below)

---

## Option A: Manual Upload to GitHub Releases

### 1. Go to GitHub Releases
https://github.com/bluesover/transio.org/releases

### 2. Click "Draft a new release"

### 3. Fill in details:
- **Tag:** `v1.0.0`
- **Release title:** `Transio v1.0.0`
- **Description:**
  ```markdown
  ## Transio Desktop App - First Release
  
  Full XSLT transformation tool with Saxon-HE integration.
  
  ### Downloads
  - macOS: Transio-1.0.0.dmg
  - Linux: Transio-1.0.0.AppImage
  - Windows: Coming soon (build in progress)
  ```

### 4. Upload files:
Drag and drop:
- `electron/dist/Transio-1.0.0.dmg`
- `electron/dist/Transio-1.0.0.AppImage`

### 5. Click "Publish release"

### 6. Test downloads:
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.AppImage

---

## Option B: Automated Builds with GitHub Actions (Recommended)

This builds for **all platforms** automatically (Windows, macOS, Linux).

### 1. Create workflow file

On your Mac:
```bash
cd ~/path/to/transio
mkdir -p .github/workflows
```

Create `.github/workflows/release-desktop.yml`:

```yaml
name: Build and Release Desktop Apps

on:
  workflow_dispatch:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        include:
          - os: macos-latest
            platform: mac
          - os: ubuntu-latest
            platform: linux
          - os: windows-latest
            platform: win

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install web dependencies
        run: npm ci

      - name: Build web app
        run: npm run build

      - name: Install Electron dependencies
        working-directory: electron
        run: npm ci

      - name: Build Electron (macOS)
        if: matrix.platform == 'mac'
        working-directory: electron
        run: npm run build:mac
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Build Electron (Linux)
        if: matrix.platform == 'linux'
        working-directory: electron
        run: npm run build:linux
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Build Electron (Windows)
        if: matrix.platform == 'win'
        working-directory: electron
        run: npm run build:win
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.platform }}-build
          path: electron/dist/*.{dmg,exe,AppImage,zip,tar.gz}
          if-no-files-found: ignore

  publish:
    needs: release
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/')
    
    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v4
        with:
          path: dist-artifacts

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist-artifacts/**/*
          draft: false
          prerelease: false
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. Commit and push workflow

```bash
git add .github/workflows/release-desktop.yml
git commit -m "Add automated desktop build workflow"
git push origin main
```

### 3. Create and push tag to trigger build

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 4. Watch the build

Go to https://github.com/bluesover/transio.org/actions

The workflow will:
1. Build macOS DMG
2. Build Linux AppImage  
3. Build Windows EXE
4. Create GitHub release automatically with all files

This takes ~15-20 minutes total.

---

## Which Option Should You Use?

| Scenario | Recommendation |
|----------|---------------|
| **Need Mac build only, NOW** | Option A: Build locally |
| **Need all platforms (Win/Mac/Linux)** | Option B: GitHub Actions |
| **Don't have Windows machine** | Option B: GitHub Actions |
| **Want automated updates** | Option B: GitHub Actions |

---

## Troubleshooting

### Build fails on macOS

```bash
# Make sure Xcode Command Line Tools are installed
xcode-select --install

# Reinstall electron-builder
cd electron
rm -rf node_modules package-lock.json
npm install
```

### "Command not found: electron-builder"

```bash
cd electron
npm install electron-builder --save-dev
```

### DMG build works but signing fails

Edit `electron/package.json`, add:
```json
"build": {
  "mac": {
    "identity": null
  }
}
```

---

## After Release is Published

1. Download links will work automatically:
   - https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg
   - https://github.com/bluesover/transio.org/releases/latest/download/Transio-Setup-1.0.0.exe
   - https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.AppImage

2. The "Download App" button on transio.org will work

3. Users can download and install the desktop app

---

## Status Check

Run this to verify your build setup:

```bash
cd electron
npm list electron-builder
npm list electron
node --version  # Should be 18+
npm --version   # Should be 9+
```

Expected output:
```
electron-builder@24.9.1
electron@28.1.0
v20.x.x
10.x.x
```

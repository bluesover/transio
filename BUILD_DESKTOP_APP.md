# How to Build and Release Desktop App

## Current Issue
The download links point to GitHub Releases, but no releases have been created yet. You need to build and publish the desktop app first.

## Quick Fix - Two Options:

### Option 1: Hide Download Button Until Releases Are Ready (Immediate)
Temporarily hide the download button until you've built and published releases:

```tsx
// In src/App.tsx, comment out or remove this line:
<DownloadAppDialog />
```

### Option 2: Create GitHub Releases (Recommended)

#### Step 1: Build Desktop Apps Locally on macOS

```bash
cd /path/to/transio

# Install dependencies for Electron
cd electron
npm install

# Build for all platforms (requires macOS for DMG, Windows VM/CI for EXE)
npm run build:all

# Or build for specific platform:
npm run build:mac     # Creates .dmg file
npm run build:win     # Creates .exe file (requires Windows or Wine)
npm run build:linux   # Creates .AppImage file
```

The built files will be in `electron/dist/`:
- `Transio-1.0.0.dmg` (macOS)
- `Transio-Setup-1.0.0.exe` (Windows)
- `Transio-1.0.0.AppImage` (Linux)

#### Step 2: Create GitHub Release

1. Go to https://github.com/bluesover/transio.org/releases
2. Click "Draft a new release"
3. Create a new tag: `v1.0.0`
4. Release title: `Transio v1.0.0 - Initial Release`
5. Description:
   ```markdown
   ## 🎉 First Release of Transio Desktop App
   
   ### Features
   - Full XSLT 1.0, 2.0, and 3.0 transformation support
   - Saxon-HE server bundled for advanced processing
   - Offline-first architecture
   - Native file system integration
   - Auto-updates enabled
   
   ### Downloads
   - **Windows**: Transio-Setup-1.0.0.exe
   - **macOS**: Transio-1.0.0.dmg (Intel & Apple Silicon)
   - **Linux**: Transio-1.0.0.AppImage
   
   ### Installation
   - **Windows**: Run the installer
   - **macOS**: Open DMG and drag to Applications folder
   - **Linux**: Make executable (`chmod +x Transio-1.0.0.AppImage`) and run
   ```

6. Drag and drop the built files:
   - `Transio-1.0.0.dmg`
   - `Transio-Setup-1.0.0.exe`
   - `Transio-1.0.0.AppImage`

7. Check "Set as the latest release"
8. Click "Publish release"

#### Step 3: Verify Downloads Work

After publishing, test each download link:
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-Setup-1.0.0.exe
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.AppImage

---

## Alternative: Use GitHub Actions for Automated Builds

If you want automatic builds for all platforms, you can use GitHub Actions:

### Create `.github/workflows/build-desktop.yml`

```yaml
name: Build Desktop Apps

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd electron
          npm install
      
      - name: Build Electron app
        run: |
          cd electron
          npm run build
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.os }}-build
          path: electron/dist/*
  
  release:
    needs: build
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/')
    
    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v4
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            macos-latest-build/*.dmg
            windows-latest-build/*.exe
            ubuntu-latest-build/*.AppImage
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Then trigger by pushing a tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## Current Status

❌ No releases exist yet → Downloads will 404  
✅ Web app is live at transio.org  
⏳ Need to build and publish desktop releases

## Recommended Action

**For now, hide the Download App button until releases are ready:**

1. Remove `<DownloadAppDialog />` from App.tsx header
2. Build desktop apps locally on your Mac
3. Create GitHub release v1.0.0 with the built files
4. Re-enable the Download App button
5. Test all download links work

OR

**Show "Coming Soon" message instead:**

Replace `<DownloadAppDialog />` with:
```tsx
<Button variant="outline" disabled>
  <Download weight="bold" className="mr-2" />
  Desktop App Coming Soon
</Button>
```

# 📦 Publishing Code & Releasing Desktop App - Complete Guide

**Last Updated**: December 2024  
**Repository**: https://github.com/bluesover/transio.org  
**Website**: https://transio.org

---

## 🎯 Overview

This guide covers:
1. ✅ Publishing updated code to GitHub
2. ✅ Creating desktop app releases (Windows, Mac, Linux)
3. ✅ Setting up automated releases with GitHub Actions
4. ✅ Making downloads available on transio.org

---

## 📋 Prerequisites

### Required Tools
- ✅ Node.js 22+ and npm installed
- ✅ Git installed and configured
- ✅ GitHub account with access to repository
- ✅ Code editor (VS Code recommended)

### Optional for Manual Builds
- macOS: For building `.dmg` files (or use GitHub Actions)
- Windows: For building `.exe` files (or use GitHub Actions)
- Linux: For building `.AppImage`, `.deb`, `.rpm` (or use GitHub Actions)

---

## 🚀 Part 1: Publishing Updated Code to GitHub

### Step 1: Verify Current State

```bash
# Navigate to your project
cd /path/to/transio

# Check current status
git status

# Check remote repository
git remote -v
# Should show: origin  https://github.com/bluesover/transio.org.git
```

### Step 2: Commit All Changes

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Update: Feature improvements and bug fixes"

# Or be more specific:
git commit -m "feat: Add output language auto-detection and formatting
- Auto-detect output format (HTML, XML, JSON, CSV, SVG)
- Add format button for output
- Fix XSLT 2.0/3.0 transformation issues
- Update documentation"
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push origin main

# If you get authentication errors, use:
git push https://github.com/bluesover/transio.org.git main
```

### Step 4: Verify on GitHub

1. Go to https://github.com/bluesover/transio.org
2. Check that your latest commit appears
3. Verify files are updated
4. Check GitHub Actions tab for any automated workflows

---

## 🖥️ Part 2: Building Desktop Apps

### Option A: Using GitHub Actions (Recommended - No Local Build Needed)

This is the **easiest method** - GitHub builds everything for you!

#### Step 1: Create a Git Tag

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

#### Step 2: GitHub Actions Will Automatically:
- ✅ Build apps for Windows, Mac, and Linux
- ✅ Create a GitHub Release
- ✅ Upload all installers (.dmg, .exe, .AppImage, .deb, .rpm)
- ✅ Takes 30-45 minutes

#### Step 3: Monitor the Build

1. Go to https://github.com/bluesover/transio.org/actions
2. Click on "Release Desktop Apps" workflow
3. Watch the build progress (3 parallel jobs: macOS, Windows, Linux)
4. Wait for all 3 builds to complete

#### Step 4: Check the Release

1. Go to https://github.com/bluesover/transio.org/releases
2. Your new release `v1.0.0` should appear with:
   - `Transio-1.0.0.dmg` (macOS installer)
   - `Transio-1.0.0.zip` (macOS portable)
   - `Transio-Setup-1.0.0.exe` (Windows installer)
   - `Transio-1.0.0.AppImage` (Linux portable)
   - `Transio-1.0.0.deb` (Debian/Ubuntu)
   - `Transio-1.0.0.rpm` (Fedora/RHEL)

---

### Option B: Building Locally on Your Mac

If you want to build locally (for testing or manual control):

#### Step 1: Install Dependencies

```bash
cd /path/to/transio

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

#### Step 2: Build Web App

```bash
# Build the web app first
npm run build
```

#### Step 3: Build Electron App

```bash
# Build TypeScript for Electron
npx tsc -p tsconfig.electron.json

# Build for Mac (you're on macOS)
npm run electron:build:mac

# Build for all platforms (Mac only, others need CI)
npm run electron:build:all
```

**Note**: Building for Windows `.exe` from macOS requires Wine or CI. Building for Linux from macOS is possible but not recommended. Use GitHub Actions for cross-platform builds!

#### Step 4: Find Built Apps

```bash
ls -la dist-desktop/

# You should see:
# Transio-1.0.0.dmg
# Transio-1.0.0-mac.zip
```

---

## 📤 Part 3: Publishing Desktop App Releases

### Method 1: GitHub Actions (Automated)

This happens automatically when you push a tag (see Option A above).

### Method 2: Manual Release Creation

If you built locally and want to upload manually:

#### Step 1: Go to GitHub Releases

1. Navigate to https://github.com/bluesover/transio.org/releases
2. Click **"Draft a new release"**

#### Step 2: Configure Release

- **Tag**: Create new tag `v1.0.0`
- **Target**: `main` branch
- **Title**: `Transio v1.0.0 - Initial Release`
- **Description**:

```markdown
## 🎉 Transio Desktop App v1.0.0

Professional XML to XSLT transformation tool for Windows, Mac, and Linux.

### ✨ Features
- Full offline XSLT transformation (1.0, 2.0, 3.0)
- Built-in Saxon-HE server for advanced XSLT support
- Auto-detects and formats output (HTML, XML, JSON, CSV, SVG)
- Version control and project management
- 40+ XSLT snippets
- Dark/Light themes with 13 editor themes

### 📥 Downloads

**macOS**:
- `Transio-1.0.0.dmg` - Installer (Recommended)
- `Transio-1.0.0-mac.zip` - Portable version

**Windows**:
- `Transio-Setup-1.0.0.exe` - Installer

**Linux**:
- `Transio-1.0.0.AppImage` - Portable (All distributions)
- `Transio-1.0.0.deb` - Debian/Ubuntu
- `Transio-1.0.0.rpm` - Fedora/RHEL/CentOS

### 📚 Documentation
- [README](https://github.com/bluesover/transio.org/blob/main/README.md)
- [User Guide](https://transio.org)
- [Report Issues](https://github.com/bluesover/transio.org/issues)

### 🔐 Security
All downloads are open-source and can be verified against the source code.
```

#### Step 3: Upload Files

Drag and drop the following files:
- `Transio-1.0.0.dmg`
- `Transio-1.0.0-mac.zip`
- `Transio-Setup-1.0.0.exe`
- `Transio-1.0.0.AppImage`
- `Transio-1.0.0.deb`
- `Transio-1.0.0.rpm`

#### Step 4: Publish Release

1. Uncheck "Set as a pre-release" (unless it's a beta)
2. Check "Set as the latest release"
3. Click **"Publish release"**

---

## 🌐 Part 4: Update Website Download Links

Your website already has download functionality! Just make sure the release exists.

### Verify Download Button

The `DownloadAppDialog` component automatically fetches the latest release from:
```
https://api.github.com/repos/bluesover/transio.org/releases/latest
```

Once you create a release (via tag push or manual), the download button will work!

### Test Downloads

1. Go to https://transio.org
2. Click the download icon in the header
3. Select your platform (Mac/Windows/Linux)
4. Click download
5. Install and test the app

---

## 🔄 Part 5: Future Updates

### For Code Updates

```bash
# Make your changes
git add .
git commit -m "feat: Add new feature"
git push origin main

# Web app auto-deploys to Cloudflare Pages
```

### For Desktop App Updates

```bash
# Update version in package.json
nano package.json
# Change: "version": "1.0.1"

# Commit version bump
git add package.json
git commit -m "chore: Bump version to 1.0.1"
git push origin main

# Create new release tag
git tag v1.0.1
git push origin v1.0.1

# GitHub Actions will build and release automatically
```

---

## 🐛 Troubleshooting

### Issue: Download Button Shows 404

**Cause**: No releases exist yet.

**Solution**: Create a release (see Part 3).

### Issue: GitHub Actions Fails

**Cause**: Missing dependencies or build errors.

**Solution**:
1. Check the Actions tab: https://github.com/bluesover/transio.org/actions
2. Click on the failed workflow
3. Read the error logs
4. Fix the issue in code
5. Commit and push again

### Issue: Can't Push to GitHub

**Cause**: Authentication issues.

**Solution**:
```bash
# Use personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/bluesover/transio.org.git

# Or use SSH
git remote set-url origin git@github.com:bluesover/transio.org.git
```

### Issue: Mac App Says "Damaged" or "Unidentified Developer"

**Cause**: App not signed with Apple Developer certificate.

**Solution**:
```bash
# Users can run this command to bypass:
xattr -cr /Applications/Transio.app
```

Or sign the app properly (requires $99/year Apple Developer account).

### Issue: Windows SmartScreen Warning

**Cause**: App not signed with Windows code signing certificate.

**Solution**: Users can click "More info" → "Run anyway". To remove warning permanently, you need to purchase a code signing certificate ($200-400/year).

---

## 📊 Monitoring Releases

### Download Statistics

GitHub provides download stats:
1. Go to https://github.com/bluesover/transio.org/releases
2. Click on any release
3. See download counts for each file

### Release Activity

- **Releases**: https://github.com/bluesover/transio.org/releases
- **Actions**: https://github.com/bluesover/transio.org/actions
- **Issues**: https://github.com/bluesover/transio.org/issues

---

## ✅ Checklist for Your First Release

- [ ] All code committed and pushed to GitHub
- [ ] package.json version is correct (e.g., 1.0.0)
- [ ] README.md is up to date
- [ ] LICENSE file is present (MPL-2.0)
- [ ] Created and pushed git tag (v1.0.0)
- [ ] GitHub Actions workflow completed successfully
- [ ] GitHub Release is published
- [ ] Downloaded and tested macOS app
- [ ] Downloaded and tested Windows app (if available)
- [ ] Downloaded and tested Linux app (if available)
- [ ] Website download button works
- [ ] Announced release (optional: social media, forums, etc.)

---

## 🎉 Quick Start for Your First Release

**Easiest path (30 minutes using GitHub Actions):**

```bash
# 1. Make sure all changes are committed
cd /path/to/transio
git add .
git commit -m "feat: Ready for v1.0.0 release"
git push origin main

# 2. Create and push a release tag
git tag v1.0.0
git push origin v1.0.0

# 3. Wait 30-45 minutes for GitHub Actions to build everything
# Monitor at: https://github.com/bluesover/transio.org/actions

# 4. Check releases page
# https://github.com/bluesover/transio.org/releases

# 5. Test download from your website
# https://transio.org (click download icon)

# Done! 🎉
```

---

## 📞 Support

- **Issues**: https://github.com/bluesover/transio.org/issues
- **Discussions**: https://github.com/bluesover/transio.org/discussions
- **Email**: (Add if you want)

---

## 📝 License

Transio is open-source software licensed under the Mozilla Public License 2.0 (MPL-2.0).

See [LICENSE](./LICENSE) for details.

---

**Happy Publishing! 🚀**

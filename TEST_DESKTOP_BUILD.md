# Test Desktop App Build Guide

This guide walks you through testing the desktop app build process by creating a git tag and pushing it to trigger the GitHub Actions release workflow.

## 📋 Prerequisites

Before creating the tag, ensure:

1. ✅ All your changes are committed and pushed to the `main` branch
2. ✅ Your GitHub repository is public (required for releases)
3. ✅ You're on the latest commit you want to release
4. ✅ The repository URL in `package.json` matches: `https://github.com/bluesover/transio.org.git`

## 🚀 Step-by-Step Build Test

### 1. Check Current Status

```bash
# Make sure you're in the project directory
cd /workspaces/spark-template

# Check git status
git status

# Check current branch
git branch

# View existing tags (if any)
git tag -l
```

### 2. Commit Any Pending Changes

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Prepare for v1.0.0 release"

# Push to main branch
git push origin main
```

### 3. Create and Push the Tag

```bash
# Create an annotated tag (recommended for releases)
git tag -a v1.0.0 -m "Release v1.0.0 - Initial desktop app release"

# Push the tag to trigger the workflow
git push origin v1.0.0
```

**Alternative: Create lightweight tag**
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 📊 Monitor the Build Process

### On GitHub

1. Go to your repository: https://github.com/bluesover/transio.org
2. Click on **Actions** tab
3. You should see a new workflow run: "Release Desktop Apps"
4. Click on it to see the build progress

The workflow will:
- ✅ Build for **macOS** (Intel + Apple Silicon)
- ✅ Build for **Windows** (x64)
- ✅ Build for **Linux** (AppImage, .deb, .rpm)

### Expected Build Time

- **macOS**: ~15-20 minutes
- **Windows**: ~10-15 minutes  
- **Linux**: ~10-15 minutes
- **Total**: ~20-30 minutes (runs in parallel)

## 📦 What Gets Built

### macOS
- `Transio-1.0.0-arm64.dmg` (Apple Silicon)
- `Transio-1.0.0-x64.dmg` (Intel)
- `Transio-1.0.0-arm64-mac.zip`
- `Transio-1.0.0-x64-mac.zip`

### Windows
- `Transio Setup 1.0.0.exe` (64-bit installer)

### Linux
- `Transio-1.0.0.AppImage` (Universal)
- `transio-xslt-transformer_1.0.0_amd64.deb` (Debian/Ubuntu)
- `transio-xslt-transformer-1.0.0.x86_64.rpm` (Fedora/RHEL)

## 🎯 After Build Completes

### 1. Check the Release

Go to: https://github.com/bluesover/transio.org/releases

You should see:
- A new release tagged `v1.0.0`
- All the built files attached as assets
- Auto-generated release notes

### 2. Download and Test

Download the appropriate file for your platform:

**On macOS:**
```bash
# Download the DMG for your architecture
# For Apple Silicon (M1/M2/M3):
curl -LO https://github.com/bluesover/transio.org/releases/download/v1.0.0/Transio-1.0.0-arm64.dmg

# For Intel:
curl -LO https://github.com/bluesover/transio.org/releases/download/v1.0.0/Transio-1.0.0-x64.dmg

# Open the DMG
open Transio-*.dmg

# If macOS blocks it (unidentified developer warning):
xattr -cr /Applications/Transio.app
```

**On Windows:**
```powershell
# Download and run the installer
# Or if SmartScreen blocks: Right-click → Properties → Unblock → Apply
```

**On Linux:**
```bash
# Download AppImage
wget https://github.com/bluesover/transio.org/releases/download/v1.0.0/Transio-1.0.0.AppImage

# Make executable
chmod +x Transio-1.0.0.AppImage

# Run
./Transio-1.0.0.AppImage
```

### 3. Verify the App

When you launch the app, verify:
- ✅ App opens without errors
- ✅ UI loads correctly
- ✅ Can perform XSLT transformations
- ✅ Saxon-HE server starts (check console)
- ✅ All themes work
- ✅ File operations work
- ✅ Version control works

## 🔄 If You Need to Rebuild

### Delete Tag Locally and Remotely

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin :refs/tags/v1.0.0
```

### Delete GitHub Release

1. Go to: https://github.com/bluesover/transio.org/releases
2. Click on the release
3. Click **Delete this release**
4. Confirm deletion

### Create New Tag

```bash
# Make your changes
git add .
git commit -m "Fix: Your changes"
git push origin main

# Create new tag
git tag -a v1.0.0 -m "Release v1.0.0 - Fixed version"
git push origin v1.0.0
```

## 📝 Version Bumping for Future Releases

For subsequent releases:

```bash
# Update version in package.json
# Change "version": "1.0.0" to "1.0.1" or "1.1.0" etc.

# Commit the version change
git add package.json
git commit -m "Bump version to 1.0.1"
git push origin main

# Create new tag
git tag -a v1.0.1 -m "Release v1.0.1 - Bug fixes and improvements"
git push origin v1.0.1
```

## 🐛 Troubleshooting

### Build Fails

**Check the logs:**
1. Go to Actions tab
2. Click on the failed workflow
3. Click on the failed job (macOS/Windows/Linux)
4. Expand the failed step to see error details

**Common issues:**
- **"npm ci failed"**: Dependencies issue → Check `package-lock.json` is committed
- **"electron-builder failed"**: Missing icons → Check `desktop-resources/` directory
- **"Permission denied"**: GitHub token issue → Check repository settings

### Release Not Created

**Verify:**
- The tag was pushed: `git ls-remote --tags origin`
- The workflow ran: Check Actions tab
- The workflow has write permissions: Settings → Actions → General → Workflow permissions → "Read and write permissions"

### Downloads Show 404

**After release is created:**
- Wait 1-2 minutes for GitHub to propagate the files
- Check the release page manually to confirm files are attached
- The download URLs follow this pattern:
  ```
  https://github.com/bluesover/transio.org/releases/download/v1.0.0/[filename]
  ```

## ⚙️ GitHub Repository Settings

Ensure these settings are correct:

1. **Repository → Settings → General**
   - Repository is **Public** ✅

2. **Repository → Settings → Actions → General**
   - Actions permissions: **Allow all actions and reusable workflows**
   - Workflow permissions: **Read and write permissions** ✅
   - Allow GitHub Actions to create and approve pull requests: **Enabled**

3. **Repository → Settings → Code and automation → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **(root)**

## 🎉 Success Indicators

Your build test is successful when:

1. ✅ Workflow shows green checkmark in Actions tab
2. ✅ Release appears at `/releases` with all files
3. ✅ Download links work from the web app
4. ✅ Downloaded app installs and runs correctly
5. ✅ App shows version `1.0.0` in About dialog

## 📞 Next Steps

After successful test build:

1. **Update the website** to show the download buttons
2. **Test on all platforms** (macOS, Windows, Linux)
3. **Share the release** with users
4. **Monitor issues** on GitHub
5. **Plan next release** based on feedback

## 🔒 Security Note

The builds are **not code-signed** by default. To add code signing:

**macOS:**
- Add `MAC_CERTIFICATE` and `MAC_CERTIFICATE_PASSWORD` to GitHub Secrets
- Add `APPLE_ID` and `APPLE_ID_PASSWORD` for notarization

**Windows:**
- Add `WIN_CERTIFICATE` and `WIN_CERTIFICATE_PASSWORD` to GitHub Secrets

This prevents security warnings on first launch, but requires paid developer accounts.

---

## Quick Command Reference

```bash
# Full release flow
git add .
git commit -m "Prepare release"
git push origin main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Check build status
# Visit: https://github.com/bluesover/transio.org/actions

# Download release files
# Visit: https://github.com/bluesover/transio.org/releases/latest
```

Good luck with your desktop app release! 🚀

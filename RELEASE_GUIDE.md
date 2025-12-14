# Release Guide for Transio Desktop Apps

This guide explains how to create and publish desktop application releases for Transio.

## 📋 Prerequisites

Before creating a release, ensure you have:

1. ✅ **Clean Git State**: All changes committed and pushed
2. ✅ **Updated Version**: Version in `package.json` matches release version
3. ✅ **Updated Changelog**: `CHANGELOG.md` includes all changes for this release
4. ✅ **Release Notes**: `RELEASE.md` prepared with highlights
5. ✅ **Build Success**: Local web build and TypeScript compilation work
6. ✅ **Icons Ready**: Desktop icons in `desktop-resources/icons/` (if updating)
7. ✅ **Tests Pass**: All functionality tested locally

## 🚀 Quick Release (Automated)

The easiest way to create a release is using the automated scripts:

### macOS/Linux

```bash
chmod +x prepare-release.sh
./prepare-release.sh
```

### Windows

```bash
prepare-release.bat
```

These scripts will:
- ✅ Verify all required files exist
- ✅ Check version in package.json
- ✅ Test web build
- ✅ Test Electron TypeScript compilation
- ✅ Create and push git tag
- ✅ Trigger automated GitHub Actions workflow

## 📝 Manual Release Process

If you prefer to do it manually, follow these steps:

### Step 1: Prepare the Release

1. **Update Version**
   ```bash
   npm version 1.0.0 --no-git-tag-version
   ```

2. **Update CHANGELOG.md**
   - Add a new section for the version
   - Document all changes, features, and fixes
   - Include release date

3. **Update RELEASE.md**
   - Write user-friendly release notes
   - Highlight key features
   - Include download links

4. **Commit Changes**
   ```bash
   git add -A
   git commit -m "chore: prepare for v1.0.0 release"
   git push origin main
   ```

### Step 2: Test Builds Locally

1. **Test Web Build**
   ```bash
   npm run build
   ```

2. **Test Electron Build (Optional)**
   ```bash
   # TypeScript compilation only
   npx tsc -p tsconfig.electron.json --noEmit

   # Full build (takes longer)
   npm run electron:build:mac    # macOS only
   npm run electron:build:win    # Windows only
   npm run electron:build:linux  # Linux only
   ```

### Step 3: Create Git Tag

1. **Create Annotated Tag**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   ```

2. **Push Tag to GitHub**
   ```bash
   git push origin v1.0.0
   ```

   This will automatically trigger the GitHub Actions workflow.

### Step 4: Monitor Build

1. Go to [GitHub Actions](https://github.com/bluesover/transio/actions)
2. Watch the "Release Desktop Apps" workflow
3. The workflow will:
   - Build for macOS (Intel + Apple Silicon)
   - Build for Windows (64-bit)
   - Build for Linux (AppImage, deb, rpm)
   - Create GitHub Release with all binaries

### Step 5: Verify Release

1. Go to [Releases](https://github.com/bluesover/transio/releases)
2. Verify the new release is published
3. Check all download links work
4. Test downloaded binaries on each platform (if possible)

## 🔄 GitHub Actions Workflow

The automated workflow (`.github/workflows/release-desktop.yml`) does the following:

### Build Matrix
- **macOS** (macos-latest): Builds DMG and ZIP for x64 and arm64
- **Windows** (windows-latest): Builds EXE installer for x64
- **Linux** (ubuntu-latest): Builds AppImage, deb, and rpm

### Build Steps
1. Checkout code
2. Setup Node.js 22
3. Install dependencies
4. Build web app (`npm run build`)
5. Compile Electron TypeScript
6. Build desktop app with electron-builder
7. Upload artifacts
8. Create GitHub Release with all binaries

### Triggers
- **Push tag**: Automatically when `v*` tag is pushed
- **Manual**: Via GitHub Actions UI with custom version input

## 📦 Release Assets

Each release includes:

### macOS
- `Transio-1.0.0.dmg` - Installer (Universal: Intel + Apple Silicon)
- `Transio-1.0.0-mac.zip` - Portable version

### Windows
- `Transio-Setup-1.0.0.exe` - NSIS Installer (64-bit)

### Linux
- `Transio-1.0.0.AppImage` - Universal portable (all distributions)
- `Transio-1.0.0.deb` - Debian/Ubuntu package
- `Transio-1.0.0.rpm` - Fedora/RHEL/CentOS package

## 🐛 Troubleshooting

### Build Fails on GitHub Actions

1. **Check logs**: Click on the failed workflow to see detailed logs
2. **Test locally**: Run the same commands locally to reproduce
3. **Common issues**:
   - Missing dependencies in package.json
   - TypeScript compilation errors
   - Missing desktop resources

### "Tag already exists" Error

If you need to recreate a tag:

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push --delete origin v1.0.0

# Create new tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Release Assets Missing

The workflow uploads artifacts in three separate jobs. If some are missing:

1. Check if all three platform builds succeeded
2. Verify the `create-release` job ran after all builds completed
3. Check artifact retention (30 days)

### Code Signing Issues

Desktop apps are currently **not code-signed**. Users may see warnings:

**macOS**: "Unidentified developer"
- Solution: Right-click → Open, or run `xattr -cr /Applications/Transio.app`

**Windows**: SmartScreen warning
- Solution: Click "More info" → "Run anyway"

To add code signing, set these GitHub Secrets:
- `MAC_CERTIFICATE` and `MAC_CERTIFICATE_PASSWORD` (macOS)
- `WIN_CERTIFICATE` and `WIN_CERTIFICATE_PASSWORD` (Windows)
- `APPLE_ID` and `APPLE_ID_PASSWORD` (macOS notarization)

## 🔐 Security Best Practices

1. **Never commit secrets**: Use GitHub Secrets for certificates
2. **Verify checksums**: Generate and publish SHA256 checksums
3. **Sign commits**: Use GPG signing for release commits
4. **Review dependencies**: Check for vulnerabilities before release
5. **Test thoroughly**: Test on real devices, not just CI

## 📋 Release Checklist Template

Copy this checklist for each release:

```markdown
## Release vX.Y.Z Checklist

### Pre-Release
- [ ] Version updated in package.json
- [ ] CHANGELOG.md updated with all changes
- [ ] RELEASE.md prepared with highlights
- [ ] All tests pass locally
- [ ] Web build successful
- [ ] Electron TypeScript compiles
- [ ] Desktop resources up to date
- [ ] Documentation updated
- [ ] Dependencies reviewed and updated

### Release
- [ ] All changes committed and pushed
- [ ] Git tag created (vX.Y.Z)
- [ ] Tag pushed to GitHub
- [ ] GitHub Actions workflow triggered
- [ ] All platform builds succeeded
- [ ] GitHub Release created

### Post-Release
- [ ] Release page looks correct
- [ ] All download links work
- [ ] Tested on macOS
- [ ] Tested on Windows
- [ ] Tested on Linux
- [ ] Website updated (if needed)
- [ ] Social media announcement (if applicable)
- [ ] Community notified

### Cleanup
- [ ] Close milestone (if using)
- [ ] Archive old releases (if needed)
- [ ] Update project board (if using)
```

## 📚 Additional Resources

- **Electron Builder**: https://www.electron.build/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Semantic Versioning**: https://semver.org/
- **Keep a Changelog**: https://keepachangelog.com/

## 🆘 Getting Help

If you encounter issues:

1. Check the [GitHub Actions logs](https://github.com/bluesover/transio/actions)
2. Review the [Electron Builder docs](https://www.electron.build/)
3. Search [existing issues](https://github.com/bluesover/transio/issues)
4. Open a new issue with detailed logs

---

**Happy Releasing! 🚀**

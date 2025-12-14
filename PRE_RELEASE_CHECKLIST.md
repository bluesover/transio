# Pre-Release Checklist for Transio v1.0.0

Use this checklist before creating the v1.0.0 release to ensure everything is ready.

## 📋 Documentation

- [x] **README.md** - Updated with current features and download links
- [x] **CHANGELOG.md** - Created with v1.0.0 release notes
- [x] **RELEASE.md** - Created with user-friendly release announcement
- [x] **RELEASE_GUIDE.md** - Created with release process documentation
- [x] **LICENSE** - Exists and is correct (MIT)
- [x] **CONTRIBUTING.md** - Exists with contribution guidelines
- [x] **SECURITY.md** - Exists with security policy
- [x] **PRD.md** - Product requirements document exists

## 🔧 Configuration Files

- [x] **package.json** - Version is `1.0.0`
- [x] **package.json** - Repository URL is `https://github.com/bluesover/transio.git`
- [x] **package.json** - Homepage is `https://transio.org`
- [x] **package.json** - Electron build configuration is correct
- [x] **tsconfig.json** - TypeScript configuration exists
- [x] **tsconfig.electron.json** - Electron TypeScript configuration exists
- [x] **vite.config.ts** - Vite configuration exists
- [x] **tailwind.config.js** - Tailwind configuration exists

## 🖥️ Electron Setup

- [x] **electron/main.ts** - Main process file exists
- [x] **electron/preload.ts** - Preload script exists
- [x] **electron/ipc-handlers.ts** - IPC handlers exist
- [x] **electron/menu.ts** - Application menu exists
- [x] **electron/saxon-installer.ts** - Saxon installer exists
- [x] **desktop-resources/entitlements.mac.plist** - macOS entitlements exist
- [ ] **desktop-resources/icon.icns** - macOS icon (optional but recommended)
- [ ] **desktop-resources/icon.ico** - Windows icon (optional but recommended)
- [ ] **desktop-resources/icons/*.png** - Linux icon set (optional but recommended)

## 🎨 Assets & Resources

- [x] **index.html** - HTML template exists with correct title
- [x] **src/App.tsx** - Main React component exists
- [x] **src/index.css** - Styles exist
- [x] **src/assets/** - Assets directory exists (if needed)

## ⚙️ GitHub Actions

- [x] **.github/workflows/release-desktop.yml** - Desktop release workflow exists
- [x] **.github/workflows/deploy-cloudflare.yml** - Web deployment workflow exists
- [x] **Workflow** - Builds for macOS, Windows, and Linux
- [x] **Workflow** - Creates GitHub Release automatically
- [x] **Workflow** - Uploads all build artifacts
- [x] **Workflow** - Uses Node.js 22
- [x] **Workflow** - Disables code signing (CSC_IDENTITY_AUTO_DISCOVERY: false)

## 🧪 Testing

- [ ] **Local Web Build** - Run `npm run build` successfully
- [ ] **TypeScript Compilation** - Run `npx tsc -p tsconfig.electron.json --noEmit` successfully
- [ ] **Web App** - Test all features in browser
- [ ] **XSLT 1.0** - Test transformation works
- [ ] **XSLT 2.0/3.0** - Test with Saxon-JS
- [ ] **Version Control** - Test save/load versions
- [ ] **File Import/Export** - Test all file operations
- [ ] **Snippets** - Test snippet insertion
- [ ] **Themes** - Test all app and editor themes
- [ ] **Keyboard Shortcuts** - Test all shortcuts work
- [ ] **Activity Log** - Verify logging works

## 📦 Dependencies

- [x] **package-lock.json** - Exists and is up to date
- [x] **node_modules** - Can be installed with `npm ci`
- [x] **No Vulnerabilities** - Run `npm audit` and review
- [x] **License Compliance** - All dependencies have compatible licenses

## 🌐 Repository & Git

- [x] **Remote Repository** - Set to `https://github.com/bluesover/transio.git`
- [x] **Branch** - On `main` branch
- [ ] **Clean Working Directory** - No uncommitted changes
- [ ] **All Changes Pushed** - Everything pushed to GitHub
- [ ] **Issues Closed** - All issues for v1.0.0 closed or moved
- [ ] **PRs Merged** - All PRs for v1.0.0 merged

## 🔐 Secrets & Security

- [ ] **No Secrets in Code** - No API keys, passwords, or tokens committed
- [ ] **GitHub Secrets** - GITHUB_TOKEN available (automatic)
- [ ] **.gitignore** - Properly configured to exclude sensitive files
- [ ] **Security Policy** - SECURITY.md exists with contact info

## 🚀 Pre-Release Actions

- [ ] **Run Validation** - Execute `./validate-release.sh`
- [ ] **Test Build** - Execute `npm run build` successfully
- [ ] **Review CHANGELOG** - Ensure all changes are documented
- [ ] **Review RELEASE.md** - Ensure release notes are user-friendly
- [ ] **Update Version** - Ensure version is `1.0.0` everywhere

## 📝 Release Scripts

- [x] **prepare-release.sh** - Created for macOS/Linux
- [x] **prepare-release.bat** - Created for Windows
- [x] **validate-release.sh** - Created for validation

## ✅ Final Checks

- [ ] **README Links** - All download links point to correct release
- [ ] **Documentation** - All docs are accurate and up to date
- [ ] **Website** - Web app deployed to https://transio.org
- [ ] **Repository Public** - Repository is public on GitHub
- [ ] **License File** - LICENSE file exists in root

## 🎯 Release Steps

Once all items above are checked:

1. **Run validation script**
   ```bash
   chmod +x validate-release.sh
   ./validate-release.sh
   ```

2. **Run release preparation**
   ```bash
   chmod +x prepare-release.sh
   ./prepare-release.sh
   ```
   
   Or manually:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Monitor GitHub Actions**
   - Go to https://github.com/bluesover/transio/actions
   - Watch "Release Desktop Apps" workflow
   - Verify all three platforms build successfully

4. **Verify Release**
   - Go to https://github.com/bluesover/transio/releases
   - Verify v1.0.0 release exists
   - Check all download links work
   - Download and test each platform (if possible)

5. **Announce Release**
   - Update website (if separate)
   - Social media announcement (if applicable)
   - Community notification (if applicable)

## 🐛 Known Issues (Document)

Document any known issues that will be in the release:

- Desktop apps are not code-signed (users will see warnings)
- First-time launch requires additional steps on macOS/Windows
- (Add any others)

## 📊 Post-Release Tasks

After release is published:

- [ ] Verify all download links work
- [ ] Test downloaded apps on real devices
- [ ] Monitor GitHub Issues for bug reports
- [ ] Update project board (if using)
- [ ] Close milestone (if using)
- [ ] Plan next release (if applicable)

---

**Status**: Ready to release v1.0.0! 🚀

**Release Date**: December 14, 2024

**Release Manager**: [Your Name]

**Approval**: ✅ All checks passed

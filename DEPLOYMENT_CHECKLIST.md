# ✅ Deployment & Release Checklist

Use this checklist before each release to ensure everything is ready.

---

## 📋 Pre-Release Checklist

### Code Quality
- [ ] All tests passing locally
- [ ] No console errors in browser
- [ ] All TypeScript errors resolved
- [ ] ESLint shows no warnings/errors
- [ ] All features working as expected
- [ ] Mobile responsive layout tested
- [ ] Dark/Light themes working correctly
- [ ] XSLT 1.0 transformations working
- [ ] XSLT 2.0 transformations working
- [ ] XSLT 3.0 transformations working (if applicable)

### Documentation
- [ ] README.md updated with latest features
- [ ] Version number updated in package.json
- [ ] CHANGELOG.md updated (optional but recommended)
- [ ] All markdown files reviewed for accuracy
- [ ] Screenshots updated if UI changed
- [ ] Installation instructions verified

### Repository
- [ ] All changes committed
- [ ] Commit messages follow convention (feat/fix/docs/chore)
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] .gitignore excludes build artifacts
- [ ] No sensitive data in commits (keys, tokens, passwords)

### Build
- [ ] `npm run build` succeeds
- [ ] Build output tested in production mode (`npm run preview`)
- [ ] All assets loading correctly
- [ ] No broken links in production build
- [ ] File sizes reasonable (<2MB per chunk ideally)

---

## 🌐 Web Deployment Checklist

### Cloudflare Pages
- [ ] GitHub repository connected to Cloudflare
- [ ] Build command: `npm run build`
- [ ] Build output directory: `dist`
- [ ] Environment variables configured (if any)
- [ ] Custom domain (transio.org) connected
- [ ] SSL certificate active (Full strict mode)
- [ ] DNS records correct (CNAME to Cloudflare)
- [ ] Preview deployments working for branches

### Post-Deployment Verification
- [ ] Website loads at https://transio.org
- [ ] SSL certificate valid (green lock icon)
- [ ] All pages accessible
- [ ] No 404 errors in console
- [ ] Assets loading from CDN
- [ ] Transformation features working
- [ ] File upload/download working
- [ ] Local storage/IndexedDB working
- [ ] Mobile layout correct on phone
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge

---

## 🖥️ Desktop App Release Checklist

### Pre-Build
- [ ] Version number updated in package.json
- [ ] electron/main.ts has correct version
- [ ] App icons exist in desktop-resources/
- [ ] entitlements.mac.plist exists (for macOS)
- [ ] Server dependencies installable (`cd server && npm install`)
- [ ] TypeScript compiles (`npx tsc -p tsconfig.electron.json`)

### GitHub Release Method
- [ ] All code committed and pushed
- [ ] Created git tag: `git tag v1.0.0`
- [ ] Pushed tag: `git push origin v1.0.0`
- [ ] GitHub Actions workflow started
- [ ] All 3 platform builds succeeded (check Actions tab)
- [ ] Artifacts uploaded to release
- [ ] Release notes generated
- [ ] Release is published (not draft)

### Manual Build Method (if not using GitHub Actions)
- [ ] Built for macOS: `npm run electron:build:mac`
- [ ] Built for Windows: `npm run electron:build:win`
- [ ] Built for Linux: `npm run electron:build:linux`
- [ ] All installers in dist-desktop/
- [ ] File sizes reasonable:
  - macOS .dmg: <150MB
  - Windows .exe: <150MB
  - Linux .AppImage: <150MB

### Release Verification
- [ ] Release appears at: https://github.com/bluesover/transio.org/releases
- [ ] All installers downloadable:
  - [ ] Transio-X.X.X.dmg (macOS)
  - [ ] Transio-X.X.X-mac.zip (macOS portable)
  - [ ] Transio-Setup-X.X.X.exe (Windows)
  - [ ] Transio-X.X.X.AppImage (Linux)
  - [ ] Transio-X.X.X.deb (Debian/Ubuntu)
  - [ ] Transio-X.X.X.rpm (Fedora/RHEL)
- [ ] Release notes clear and accurate
- [ ] Download links working from website

### Installation Testing
- [ ] **macOS**: Downloaded and installed .dmg
- [ ] **macOS**: App opens without "damaged" warning
- [ ] **macOS**: All features work offline
- [ ] **macOS**: Saxon-HE server starts successfully
- [ ] **Windows**: Downloaded and installed .exe
- [ ] **Windows**: App opens (bypass SmartScreen if needed)
- [ ] **Windows**: All features work offline
- [ ] **Windows**: Saxon-HE server starts successfully
- [ ] **Linux**: Downloaded and ran .AppImage
- [ ] **Linux**: App has execute permissions
- [ ] **Linux**: All features work offline
- [ ] **Linux**: Saxon-HE server starts successfully

---

## 🔐 Security Checklist

### Code Security
- [ ] No API keys or secrets in source code
- [ ] No authentication tokens committed
- [ ] Environment variables used for sensitive data
- [ ] Dependencies scanned for vulnerabilities: `npm audit`
- [ ] All critical/high vulnerabilities fixed
- [ ] HTTPS enforced on production site
- [ ] CSP headers configured (if applicable)

### Desktop App Security
- [ ] Code signing certificate applied (macOS)
- [ ] Code signing certificate applied (Windows)
- [ ] App notarized (macOS)
- [ ] Auto-updater uses HTTPS
- [ ] No file system access outside app data directory

---

## 📢 Post-Release Checklist

### Announcements
- [ ] GitHub release published
- [ ] Release notes shared in Discussions
- [ ] Social media announcement (if applicable)
- [ ] Blog post written (if applicable)
- [ ] Email notification sent (if applicable)

### Monitoring
- [ ] Check GitHub Issues for new bug reports
- [ ] Monitor download statistics
- [ ] Check website analytics (if configured)
- [ ] Monitor Cloudflare Pages analytics
- [ ] Watch GitHub Actions for any failures

### Documentation
- [ ] QUICK_REFERENCE.md updated if workflow changed
- [ ] PUBLISH_AND_RELEASE_GUIDE.md updated if process changed
- [ ] README.md download links point to latest release
- [ ] Wiki updated (if exists)

---

## 🔄 Hotfix Checklist

If you need to release an emergency fix:

- [ ] Create hotfix branch: `git checkout -b hotfix/critical-bug`
- [ ] Fix the bug with minimal changes
- [ ] Test fix thoroughly
- [ ] Update version (patch bump): 1.0.0 → 1.0.1
- [ ] Commit: `git commit -m "fix: Critical bug description"`
- [ ] Merge to main: `git checkout main && git merge hotfix/critical-bug`
- [ ] Push: `git push origin main`
- [ ] Tag: `git tag v1.0.1 && git push origin v1.0.1`
- [ ] Wait for GitHub Actions to build
- [ ] Verify release published
- [ ] Test downloads
- [ ] Announce hotfix

---

## 🎯 Version Number Guidelines

Follow Semantic Versioning (semver):

### Major (X.0.0)
Breaking changes that require user action:
- Complete UI redesign
- Removed features
- Changed data formats
- Incompatible API changes

Example: 1.5.2 → 2.0.0

### Minor (0.X.0)
New features, backwards compatible:
- New transformation options
- Additional themes
- New snippets
- Enhanced functionality

Example: 1.5.2 → 1.6.0

### Patch (0.0.X)
Bug fixes only:
- Fix transformation errors
- Fix UI glitches
- Performance improvements
- Security patches

Example: 1.5.2 → 1.5.3

---

## 📊 Release Metrics to Track

After each release, note:

- [ ] Release date
- [ ] Version number
- [ ] Build time (GitHub Actions)
- [ ] Downloads in first 24 hours
- [ ] Downloads in first week
- [ ] Number of issues reported
- [ ] Critical bugs found
- [ ] User feedback sentiment

---

## ⚠️ Common Issues & Solutions

### Build Fails on GitHub Actions
1. Check Actions tab for error logs
2. Look for missing dependencies
3. Verify Node.js version compatibility
4. Check if TypeScript compilation succeeded
5. Ensure all required files committed

### macOS "App is Damaged"
- Cause: Not signed/notarized
- Solution: Document in release notes how users can bypass with `xattr -cr`

### Windows SmartScreen Warning
- Cause: Not signed with EV certificate
- Solution: Document in release notes that users can click "More info" → "Run anyway"

### Desktop App Won't Start
- Check Electron version compatibility
- Verify all dependencies bundled
- Check main process logs (Electron DevTools)
- Ensure server files included in build

### Downloads Show 404
- Verify release is published (not draft)
- Check file names match in download links
- Confirm GitHub Release created successfully
- Wait a few minutes for CDN propagation

---

## 🚀 Quick Release Command

For experienced users, the full release in one command:

```bash
# Update version in package.json first, then:
git add . && \
git commit -m "chore: Bump version to 1.0.1" && \
git push origin main && \
git tag v1.0.1 && \
git push origin v1.0.1 && \
echo "✅ Release initiated! Check: https://github.com/bluesover/transio.org/actions"
```

---

## 📞 Emergency Contacts

- **GitHub Issues**: https://github.com/bluesover/transio.org/issues
- **GitHub Actions**: https://github.com/bluesover/transio.org/actions
- **Cloudflare Dashboard**: https://dash.cloudflare.com/

---

**Last Updated**: December 2024  
**Next Review**: Before each major release

---

## ✅ First Release Special Checklist

If this is your first release (v1.0.0):

- [ ] All documentation complete
- [ ] LICENSE file present
- [ ] SECURITY.md created
- [ ] CONTRIBUTING.md created
- [ ] GitHub repository description set
- [ ] Repository topics added (xml, xslt, transformation, etc.)
- [ ] README badges working
- [ ] GitHub social preview image set
- [ ] All links in documentation tested
- [ ] Desktop app icons final versions
- [ ] Announcement draft prepared

---

**Remember**: Better to delay a release to fix a critical bug than to rush and need an immediate hotfix! 🎯

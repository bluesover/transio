# 🚀 Quick Reference - Transio Release Commands

## 📦 Publishing Code Updates

### Standard Update (Code Only)
```bash
git add .
git commit -m "feat: Your feature description"
git push origin main
```

### Update with New Desktop Release
```bash
# 1. Update version in package.json
nano package.json  # Change "version": "1.0.1"

# 2. Commit changes
git add .
git commit -m "chore: Bump version to 1.0.1"
git push origin main

# 3. Create and push tag (triggers desktop builds)
git tag v1.0.1
git push origin v1.0.1
```

## 🖥️ Building Desktop Apps

### Automated (Recommended)
```bash
git tag v1.0.0
git push origin v1.0.0
# Wait 30-45 min, check: github.com/bluesover/transio.org/actions
```

### Local Build (macOS)
```bash
npm install
cd server && npm install && cd ..
npm run build
npx tsc -p tsconfig.electron.json
npm run electron:build:mac
# Output: dist-desktop/Transio-1.0.0.dmg
```

## 🌐 Deployment Status

### Check Web Deployment
- Cloudflare: https://dash.cloudflare.com/
- Live site: https://transio.org
- Auto-deploys on push to `main`

### Check Desktop Builds
- Actions: https://github.com/bluesover/transio.org/actions
- Releases: https://github.com/bluesover/transio.org/releases

## 🔍 Monitoring

### GitHub Actions Status
```bash
# Open in browser:
https://github.com/bluesover/transio.org/actions
```

### Latest Release
```bash
# Open in browser:
https://github.com/bluesover/transio.org/releases/latest
```

### Download Stats
```bash
# Open any release:
https://github.com/bluesover/transio.org/releases
# Scroll down to see download counts
```

## 🛠️ Common Tasks

### Update Documentation Only
```bash
git add README.md PUBLISH_AND_RELEASE_GUIDE.md
git commit -m "docs: Update documentation"
git push origin main
```

### Fix Bug
```bash
git add .
git commit -m "fix: Fix XSLT transformation error"
git push origin main
```

### Add New Feature
```bash
git add .
git commit -m "feat: Add CSV export functionality"
git push origin main
```

### Hotfix Release
```bash
# Fix the bug first
git add .
git commit -m "fix: Critical XSLT 2.0 bug"
git push origin main

# Update version (1.0.0 -> 1.0.1)
nano package.json
git add package.json
git commit -m "chore: Bump version to 1.0.1"
git push origin main

# Create hotfix release
git tag v1.0.1
git push origin v1.0.1
```

## 📋 Version Numbering

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes

## ⚡ Emergency Commands

### Cancel Ongoing GitHub Action
1. Go to: https://github.com/bluesover/transio.org/actions
2. Click on running workflow
3. Click "Cancel workflow"

### Delete Tag (Before Release)
```bash
git tag -d v1.0.0                    # Delete locally
git push origin :refs/tags/v1.0.0   # Delete remotely
```

### Force Push (Use with caution!)
```bash
git push origin main --force
```

## 📞 Help

- **Full Guide**: [PUBLISH_AND_RELEASE_GUIDE.md](./PUBLISH_AND_RELEASE_GUIDE.md)
- **Issues**: https://github.com/bluesover/transio.org/issues
- **Actions Log**: https://github.com/bluesover/transio.org/actions

## ✅ Pre-Release Checklist

Before creating a new release:

- [ ] Version number updated in package.json
- [ ] All changes committed and pushed
- [ ] Tests passing locally
- [ ] README.md updated
- [ ] CHANGELOG added (optional)
- [ ] Tag created and pushed
- [ ] GitHub Actions succeeded
- [ ] Release appears on GitHub
- [ ] Downloads tested for each platform

## 🎯 Daily Workflow

**Morning**: Check for issues
```bash
open https://github.com/bluesover/transio.org/issues
```

**During Work**: Commit often
```bash
git add .
git commit -m "feat: Work in progress"
git push origin main
```

**End of Day**: Clean commit
```bash
git add .
git commit -m "feat: Complete feature X implementation"
git push origin main
```

**Release Day**: Tag and release
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

**🚀 Most Common Command:**
```bash
git add . && git commit -m "feat: Your change" && git push origin main
```

That's it! 99% of the time, this is all you need. 🎉

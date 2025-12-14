# Transio Project Cleanup Guide

This guide helps you clean up unnecessary files from your project and fix dependency issues.

## Quick Start

### Option 1: Automatic Cleanup (Recommended)

```bash
chmod +x cleanup-project.sh
./cleanup-project.sh
```

This script will:
- Remove all unnecessary documentation files
- Remove redundant GitHub workflows
- Fix package-lock.json synchronization
- Update all dependencies

### Option 2: Manual Cleanup

If you prefer to do it manually:

```bash
# 1. Fix package-lock.json
npm install

# 2. Remove unnecessary documentation
rm BUILD_DESKTOP_APP.md CLOUDFLARE_DEPLOYMENT_FIX.md CLOUDFLARE_PAGES_SETUP.md
rm DEPLOY.md DEPLOYMENT_CHECKLIST.md DESKTOP_APP_RELEASE.md
rm FIX_DOWNLOAD_404.md GITHUB_ACTIONS_OPTIMIZATION.md MACOS_BUILD_GUIDE.md
rm MIGRATION_GUIDE.md PUBLIC_REPO_READY.md PUBLISH_AND_RELEASE_GUIDE.md
rm QUICK_REFERENCE.md REPOSITORY_UPDATE_SUMMARY.md SECURITY_AUDIT_REPORT.md
rm SETUP_PUBLIC_SYNC.md TEST_DESKTOP_BUILD.md
rm prepare-public-sync.sh final-cleanup.sh build-release.sh wrangler.toml

# 3. Remove unnecessary GitHub workflows
rm .github/workflows/sync-repos.yml
rm .github/workflows/sync-to-public.yml
rm .github/dependabot.yml

# 4. Commit and push
git add .
git commit -m "Clean up project and fix dependencies"
git push origin main
```

## Files Removed

### Documentation Files (Not Needed)
- `BUILD_DESKTOP_APP.md` - Redundant build instructions
- `CLOUDFLARE_DEPLOYMENT_FIX.md` - One-time fix documentation
- `CLOUDFLARE_PAGES_SETUP.md` - Already covered in README
- `DEPLOY.md` - Outdated deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Not needed
- `DESKTOP_APP_RELEASE.md` - Redundant
- `FIX_DOWNLOAD_404.md` - One-time issue fix
- `GITHUB_ACTIONS_OPTIMIZATION.md` - Not needed
- `MACOS_BUILD_GUIDE.md` - Already in README
- `MIGRATION_GUIDE.md` - Not applicable
- `PUBLIC_REPO_READY.md` - One-time setup doc
- `PUBLISH_AND_RELEASE_GUIDE.md` - Redundant
- `QUICK_REFERENCE.md` - Not maintained
- `REPOSITORY_UPDATE_SUMMARY.md` - Outdated
- `SECURITY_AUDIT_REPORT.md` - Not needed
- `SETUP_PUBLIC_SYNC.md` - Not using repo sync
- `TEST_DESKTOP_BUILD.md` - Testing only

### Scripts (Not Needed)
- `prepare-public-sync.sh` - Not syncing repos
- `final-cleanup.sh` - Old cleanup script
- `build-release.sh` - Use npm scripts instead
- `wrangler.toml` - Not using Wrangler CLI

### GitHub Actions (Disabled)
- `.github/workflows/sync-repos.yml` - Consuming resources
- `.github/workflows/sync-to-public.yml` - Not needed
- `.github/dependabot.yml` - Consuming too much budget

## Files Kept (Essential)

### Core Documentation
- ✅ `README.md` - Main project documentation
- ✅ `CONTRIBUTING.md` - Contribution guidelines
- ✅ `LICENSE` - MIT License
- ✅ `SECURITY.md` - Security policy
- ✅ `PRD.md` - Product requirements document

### GitHub Actions (Essential)
- ✅ `.github/workflows/deploy-cloudflare.yml` - Automatic deployment
- ✅ `.github/workflows/release-desktop.yml` - Desktop app releases

## Fixing Package-Lock.json Issues

The error you're seeing in Cloudflare Pages happens because `package-lock.json` is out of sync with `package.json`.

### The Error:
```
npm error Invalid: lock file's @github/spark@0.0.1 does not satisfy @github/spark@0.44.5
npm error Missing: octokit@5.0.5 from lock file
```

### The Fix:
```bash
# Delete old package-lock.json
rm package-lock.json

# Regenerate with correct dependencies
npm install

# Commit the updated file
git add package-lock.json
git commit -m "Fix: Update package-lock.json to match package.json"
git push origin main
```

## After Cleanup

1. **Verify GitHub Actions** - Only 2 workflows should remain:
   - `deploy-cloudflare.yml`
   - `release-desktop.yml`

2. **Check Repository Size** - Should be significantly smaller

3. **Test Cloudflare Deployment** - Should now work without errors

4. **Verify Desktop Builds** - Still work with `release-desktop.yml`

## Troubleshooting

### Cloudflare Still Failing?
```bash
# Make sure package-lock.json is committed
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
```

### Want to Check What's Using Space?
```bash
# Check file sizes
du -sh * | sort -h

# Check git history size
git count-objects -vH
```

### Need to Clean Git History?
```bash
# This is optional and destructive
git gc --aggressive --prune=now
```

## Notes

- The cleanup script is **idempotent** - safe to run multiple times
- All changes are **reversible** via git history
- **No production code** is removed, only documentation
- GitHub Actions budget will be **significantly reduced**

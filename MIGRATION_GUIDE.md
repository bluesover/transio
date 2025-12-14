# Migration Guide: transio.org → transio

This guide helps you migrate from the `transio.org` repository to the new `transio` repository.

## 🎯 Overview

All code, documentation, and assets are being moved from:
- **Old (Private)**: `https://github.com/bluesover/transio.org`
- **New (Public)**: `https://github.com/bluesover/transio`

The domain `transio.org` will continue to point to the same website.

## ✅ What Has Been Updated

All references in the codebase have been updated to point to the new repository:

### Files Updated
- ✅ `package.json` - Repository URL, bugs URL, and publish settings
- ✅ `README.md` - All GitHub links and badges
- ✅ `CONTRIBUTING.md` - Clone URLs and issue links
- ✅ `src/components/DownloadAppDialog.tsx` - Download links
- ✅ `src/components/AboutDialog.tsx` - GitHub repository link
- ✅ `src/components/FooterInfo.tsx` - Footer GitHub link
- ✅ `.github/workflows/sync-to-public.yml` - Push destination
- ✅ `.github/workflows/release-desktop.yml` - Release notes links

### What Stays the Same
- ✅ Website domain: `transio.org`
- ✅ All functionality and features
- ✅ License (MPL-2.0)
- ✅ Open source status

## 🚀 Step-by-Step Migration

### 1. Create the New Public Repository

1. Go to GitHub: https://github.com/new
2. Create repository named: `transio`
3. Set visibility to: **Public**
4. Do NOT initialize with README (we'll push existing code)
5. Click "Create repository"

### 2. Update Your Local Git Remote

In your local project directory:

```bash
# Check current remote
git remote -v

# Remove old remote if exists
git remote remove origin

# Add new public repository as origin
git remote add origin https://github.com/bluesover/transio.git

# Verify
git remote -v
```

### 3. Push All Changes to New Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "chore: migrate repository from transio.org to transio"

# Push to new repository (force push for first time)
git push -u origin main --force

# Push all tags (for releases)
git push origin --tags
```

### 4. Update GitHub Secrets

Go to your new repository settings and add these secrets:

**Repository Settings → Secrets and variables → Actions**

Required secrets:
- `PUBLIC_REPO_TOKEN` - GitHub Personal Access Token for automation
- `CLOUDFLARE_API_TOKEN` - For Cloudflare Pages deployment
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

Optional (for desktop app code signing):
- `MAC_CERTIFICATE` - macOS code signing certificate
- `MAC_CERTIFICATE_PASSWORD` - Certificate password
- `APPLE_ID` - Apple developer email
- `APPLE_ID_PASSWORD` - App-specific password
- `WIN_CERTIFICATE` - Windows code signing certificate
- `WIN_CERTIFICATE_PASSWORD` - Certificate password

### 5. Update Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages
2. Select your `transio` project
3. Go to Settings → Builds & deployments
4. Update the GitHub connection:
   - Click "Edit" on Git connection
   - Select the new `transio` repository
   - Branch: `main`
5. Verify build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

### 6. Test Deployment

Trigger a test deployment:

```bash
# Make a small change
git commit --allow-empty -m "test: trigger deployment"
git push origin main
```

Check:
- ✅ GitHub Actions run successfully
- ✅ Cloudflare Pages builds successfully
- ✅ Website is accessible at transio.org
- ✅ All links work correctly

### 7. Archive Old Repository

Once everything is working:

1. Go to old repository: https://github.com/bluesover/transio.org
2. Settings → General → scroll to bottom
3. Under "Danger Zone":
   - Add migration notice to README
   - Archive the repository
4. This preserves history but prevents new activity

Add this notice to the old repo's README:

```markdown
# ⚠️ Repository Moved

This repository has been moved to: https://github.com/bluesover/transio

Please update your bookmarks and clone URLs. All issues and pull requests should be submitted to the new repository.
```

## 🔄 Update External References

### GitHub Issues
If you have open issues in the old repository:
1. Manually recreate important issues in the new repo
2. Close old issues with a note pointing to the new repo

### External Links
Update links in:
- Social media profiles
- Documentation sites
- Blog posts
- Other repositories that reference this project

## 🎉 Desktop App Releases

To create the first release in the new repository:

```bash
# Create and push a release tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

This will trigger the GitHub Actions workflow to build desktop apps for all platforms.

## ⚠️ Common Issues

### Issue: Remote already exists
```bash
# Solution: Remove and re-add
git remote remove origin
git remote add origin https://github.com/bluesover/transio.git
```

### Issue: Push rejected
```bash
# Solution: Force push (first time only)
git push -u origin main --force
```

### Issue: GitHub Actions failing
- Check that all secrets are configured in the new repository
- Verify secret names match what's in the workflow files

### Issue: Cloudflare deployment failing
- Verify repository connection in Cloudflare dashboard
- Check that branch name is `main`
- Ensure build command and output directory are correct

## 📞 Need Help?

If you encounter issues during migration:
1. Check GitHub Actions logs for detailed error messages
2. Review Cloudflare Pages deployment logs
3. Open an issue in the new repository: https://github.com/bluesover/transio/issues

## ✅ Post-Migration Checklist

After migration is complete:

- [ ] New repository is public
- [ ] All code pushed to new repository
- [ ] GitHub secrets configured
- [ ] Cloudflare Pages connected to new repo
- [ ] Website accessible at transio.org
- [ ] Download links working
- [ ] GitHub Actions workflows passing
- [ ] Desktop app releases can be created
- [ ] Old repository archived with migration notice
- [ ] External links updated

---

**Congratulations!** 🎉 Your migration is complete. The `transio` repository is now your primary public repository.

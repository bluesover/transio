# Setup Guide: Auto-Sync to Public Repository

This guide explains how to set up automated synchronization from your private development repository to the public repository at `https://github.com/bluesover/transio.org`

## 🎯 Overview

When you push changes to your private repository, GitHub Actions will automatically:
1. Run the cleanup script to remove unnecessary files
2. Push the cleaned code to the public repository
3. Create version tags for releases

## 📋 Prerequisites

- Access to both private and public GitHub repositories
- GitHub Personal Access Token with `repo` permissions

## 🔐 Step 1: Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: `Transio Public Repo Sync`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

## 🔑 Step 2: Add Secret to Private Repository

1. Go to your **private** repository on GitHub
2. Navigate to: Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `PUBLIC_REPO_TOKEN`
5. Value: Paste the token from Step 1
6. Click "Add secret"

## ✅ Step 3: Verify Workflow Setup

The workflow file is already created at `.github/workflows/sync-to-public.yml`

Verify it exists and has the correct configuration:
- Triggers on: `push` to `main` branch
- Uses secret: `PUBLIC_REPO_TOKEN`
- Pushes to: `https://github.com/bluesover/transio.org.git`

## 🚀 Step 4: Test the Sync

### Manual Test

1. Make a small change to any file in your private repository
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Test public sync"
   git push origin main
   ```
3. Check the Actions tab in your private repository
4. Verify the "Sync to Public Repository" workflow runs successfully
5. Check the public repository to confirm changes appeared

### Manual Trigger (Optional)

You can also trigger the sync manually:

1. Go to: Actions → Sync to Public Repository
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"

## 📁 What Gets Synced

### ✅ Included Files
- All source code in `src/`
- Server code in `server/`
- Desktop app code in `electron/`
- Desktop resources in `desktop-resources/`
- Essential docs: `README.md`, `PRD.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`
- Package files: `package.json`, `package-lock.json`
- Config files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`

### ❌ Excluded Files (Cleaned)
- All `.spark-*` files
- All temporary deployment docs (20+ MD files)
- `wrangler.toml`
- Old cleanup scripts
- Sync scripts
- Unused build configs
- Runtime config files

## 🔧 Troubleshooting

### Issue: Workflow Fails with "Authentication Failed"

**Solution:**
1. Check that `PUBLIC_REPO_TOKEN` secret is set correctly
2. Verify the token has `repo` permissions
3. Regenerate token if expired

### Issue: Public Repo Not Updating

**Solution:**
1. Check Actions tab for error messages
2. Verify public repository URL is correct in workflow
3. Ensure public repository exists and you have write access

### Issue: "No Changes to Commit"

**Solution:**
This is normal if the cleanup script found nothing to clean. The sync still pushes your code changes.

## 🎨 Customization

### Change Target Branch

Edit `.github/workflows/sync-to-public.yml`:
```yaml
git push public main --force
# Change 'main' to your target branch
```

### Add More Cleanup Rules

Edit `final-cleanup.sh` to remove additional files:
```bash
rm -f YOUR_FILE_NAME.md
```

### Disable Auto-Tagging

Remove or comment out the "Create release tag" step in the workflow.

## 📊 Monitoring

### View Sync History

1. Go to: Actions → Sync to Public Repository
2. See all past runs with success/failure status
3. Click any run to see detailed logs

### Check What Was Synced

1. Click a workflow run
2. Expand "Run cleanup script" to see what was removed
3. Expand "Push to public repository" to see git output

## 🔒 Security Notes

- The `PUBLIC_REPO_TOKEN` secret is encrypted by GitHub
- Never commit the token to your repository
- Use a token with minimal required permissions
- Rotate tokens periodically for security

## ✨ Benefits

✅ **Always in Sync**: Public repo automatically updates with every push  
✅ **Clean Codebase**: Unnecessary files removed automatically  
✅ **Version Tagged**: Releases are timestamped  
✅ **No Manual Work**: Fully automated process  
✅ **Audit Trail**: Complete history in Actions tab  

## 🤝 Contributing Workflow

For external contributors to the public repository:

1. Fork `https://github.com/bluesover/transio.org`
2. Make changes in their fork
3. Submit Pull Request to public repo
4. You review and merge into public repo
5. Pull changes back to private repo if needed:
   ```bash
   git remote add public https://github.com/bluesover/transio.org.git
   git fetch public
   git merge public/main
   ```

---

**Status**: Automated sync ready to use! 🚀  
**Public Repository**: https://github.com/bluesover/transio.org  
**Last Updated**: December 2024

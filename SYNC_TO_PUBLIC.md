# Quick Start: Sync to Public Repository

This guide will help you sync your Spark template workspace to the public `transio.org` repository.

## 🚀 Quick Sync (5 Minutes)

### Step 1: Clean Up Unnecessary Files

```bash
# Make the cleanup script executable
chmod +x cleanup-docs.sh

# Run the cleanup
./cleanup-docs.sh
```

This removes ~30 unnecessary documentation files and Spark-specific files.

### Step 2: Add Public Repository Remote

```bash
# Add the public repository (only needed once)
git remote add public https://github.com/bluesover/transio.org.git

# Verify remotes
git remote -v
```

You should see:
```
origin    <your-spark-template-remote> (fetch/push)
public    https://github.com/bluesover/transio.org.git (fetch/push)
```

### Step 3: Review and Commit Changes

```bash
# See what changed
git status

# Review specific changes
git diff

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Clean up and prepare for public release"
```

### Step 4: Push to Public Repository

```bash
# Push to the public repository
git push public main

# Or force push if you want to overwrite completely
git push public main --force
```

## ✅ Verification

After pushing, verify the sync:

1. Visit: https://github.com/bluesover/transio.org
2. Check that your changes are there
3. Verify the file structure looks correct
4. Test a sample workflow (clone → npm install → npm run build)

## 🔄 Future Syncs

For subsequent syncs, you only need:

```bash
# Make your changes in Spark template
# ... edit files ...

# Commit changes
git add .
git commit -m "Your change description"

# Push to public repository
git push public main
```

## 🤖 Automated Sync (Optional)

If you want automatic syncing on every commit:

1. The repository already has a workflow: `.github/workflows/sync-repos.yml`
2. Add a GitHub secret `PUBLIC_REPO_TOKEN` with your Personal Access Token
3. Every push to your Spark template will automatically sync to `transio.org`

See [REPOSITORY_SYNC_GUIDE.md](./REPOSITORY_SYNC_GUIDE.md) for detailed setup instructions.

## 📦 What Gets Synced

✅ **Included**:
- All source code (`/src`, `/server`, `/electron`, `/desktop-resources`)
- Configuration files (`package.json`, `vite.config.ts`, `tsconfig.json`, `wrangler.toml`)
- Essential documentation (`README.md`, `PRD.md`, `DEPLOYMENT.md`, `CONTRIBUTING.md`)
- GitHub workflows (`.github/workflows`)
- License and security files

❌ **Excluded** (via .gitignore):
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.env` - Environment variables
- `.spark-*` - Spark-specific files
- `.devcontainer/` - Dev container config
- `packages/` - Spark packages
- `pids/` - Process IDs

## 🆘 Troubleshooting

### "Remote already exists"

```bash
# Update the existing remote
git remote set-url public https://github.com/bluesover/transio.org.git
```

### "Permission denied"

- Verify you're logged into GitHub with correct credentials
- Check you have write access to `transio.org` repository
- Consider using SSH instead of HTTPS:
  ```bash
  git remote set-url public git@github.com:bluesover/transio.org.git
  ```

### "Failed to push refs (non-fast-forward)"

```bash
# Pull changes first
git pull public main --rebase

# Then push
git push public main
```

### "Files not syncing"

Make sure files aren't in `.gitignore`:
```bash
# Check if a file is ignored
git check-ignore -v path/to/file
```

## 🎯 Best Practices

1. **Always test locally first**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

2. **Write clear commit messages**
   - `Add: New feature`
   - `Fix: Bug description`
   - `Update: Documentation changes`
   - `Remove: Unused code`

3. **Review before pushing**
   ```bash
   git diff --staged
   ```

4. **Keep documentation updated**
   - Update README.md with new features
   - Update DEPLOYMENT.md with deployment changes
   - Keep PRD.md current with requirements

## 📚 More Information

- **Detailed sync guide**: [REPOSITORY_SYNC_GUIDE.md](./REPOSITORY_SYNC_GUIDE.md)
- **Deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Questions?** Open an issue on [GitHub](https://github.com/bluesover/transio.org/issues)

# Repository Sync Guide

This guide explains how to manage your private Spark template repository and public `transio.org` repository.

## Current Setup

You have two repositories:
1. **Private**: Your Spark template workspace (this repository)
2. **Public**: `https://github.com/bluesover/transio.org` (public-facing repository)

## Manual Sync Process

### Option 1: Push to Public Repository (Recommended)

When you're ready to sync changes to the public repository:

```bash
# Ensure you're in your project directory
cd /path/to/spark-template

# Add the public repository as a remote (only needed once)
git remote add public https://github.com/bluesover/transio.org.git

# View your remotes to confirm
git remote -v

# Push your current branch to the public repository
git push public main

# Or force push if you want to overwrite
git push public main --force
```

### Option 2: Automated Sync with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/sync-repos.yml`) that automatically syncs to your public repository on every push.

**To enable automatic sync:**

1. Go to your **private** repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add a secret named `PUBLIC_REPO_TOKEN`
5. Create a Personal Access Token (PAT):
   - Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token (classic)**
   - Give it a descriptive name: "Transio Sync Token"
   - Select scopes:
     - ✅ `repo` (full control of private repositories)
     - ✅ `workflow` (update GitHub Actions workflows)
   - Click **Generate token**
   - Copy the token
6. Paste the token as the value for `PUBLIC_REPO_TOKEN`
7. Save the secret

Now, every time you push to your private repository, it will automatically sync to `transio.org`.

### Option 3: Clone Public, Work Locally, Push

```bash
# Clone the public repository
git clone https://github.com/bluesover/transio.org.git
cd transio.org

# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Your commit message"
git push origin main
```

## What to Sync

### Always Sync

- ✅ `/src/**` - All source code
- ✅ `/server/**` - Saxon-HE server code
- ✅ `/electron/**` - Desktop app code
- ✅ `/desktop-resources/**` - Desktop app resources
- ✅ `package.json` - Dependencies
- ✅ `package-lock.json` - Lock file
- ✅ `vite.config.ts` - Build configuration
- ✅ `tailwind.config.js` - Tailwind configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `wrangler.toml` - Cloudflare configuration
- ✅ `index.html` - Entry HTML file
- ✅ `README.md` - Main documentation
- ✅ `PRD.md` - Product requirements
- ✅ `DEPLOYMENT.md` - Deployment guide
- ✅ `CONTRIBUTING.md` - Contributing guide
- ✅ `LICENSE` - License file
- ✅ `.github/workflows/**` - CI/CD workflows

### Never Sync (Already in .gitignore)

- ❌ `node_modules/` - Dependencies (installed via npm)
- ❌ `dist/` - Build output
- ❌ `.env` - Environment variables
- ❌ `.spark-*` - Spark-specific files
- ❌ `.devcontainer/` - Dev container configuration
- ❌ `packages/` - Spark packages
- ❌ `pids/` - Process IDs

## Cleanup Before Sync

Run the cleanup script to remove unnecessary documentation:

```bash
# Make the script executable
chmod +x cleanup-docs.sh

# Run the cleanup
./cleanup-docs.sh
```

This removes:
- All extra deployment guides (keeping only `DEPLOYMENT.md`)
- Duplicate documentation files
- Old cleanup scripts
- Sync scripts (if you're not using automated sync)

## Repository Structure

After cleanup, your repository should have:

```
transio.org/
├── .github/
│   └── workflows/
│       ├── deploy-cloudflare.yml
│       └── release-desktop.yml
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── ...
├── server/
│   ├── index.js
│   ├── package.json
│   └── ...
├── electron/
│   └── main.ts
├── desktop-resources/
│   └── icons/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── wrangler.toml
├── index.html
├── README.md
├── PRD.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
├── LICENSE
└── SECURITY.md
```

## Best Practices

1. **Test locally before syncing**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

2. **Write descriptive commit messages**
   ```bash
   git commit -m "Add: Feature description"
   git commit -m "Fix: Bug description"
   git commit -m "Update: Documentation changes"
   ```

3. **Keep branches in sync**
   - Always work on the same branch name in both repositories
   - Use `main` as the primary branch

4. **Review changes before pushing**
   ```bash
   git status
   git diff
   ```

## Troubleshooting

### Remote Already Exists

```bash
error: remote public already exists.
```

**Solution**: Update the existing remote
```bash
git remote set-url public https://github.com/bluesover/transio.org.git
```

### Permission Denied

```bash
error: failed to push some refs
```

**Solution**: Verify you have write access to the public repository

### Conflicts

```bash
error: failed to push refs (non-fast-forward)
```

**Solution**: Pull changes first, resolve conflicts, then push
```bash
git pull public main
# Resolve conflicts
git push public main
```

## Manual File Copy (Last Resort)

If git causes issues, you can manually copy files:

1. Clone the public repository to a different folder
2. Copy files from your Spark template (excluding `node_modules`, `dist`, `.git`)
3. Commit and push in the public repository

```bash
# Clone public repo
git clone https://github.com/bluesover/transio.org.git /tmp/transio-public
cd /tmp/transio-public

# Copy files (excluding git-ignored files)
rsync -av --exclude='node_modules' --exclude='dist' --exclude='.git' \
  /path/to/spark-template/ /tmp/transio-public/

# Commit and push
git add .
git commit -m "Sync from Spark template"
git push origin main
```

## Questions?

If you encounter any issues:
- Check GitHub's [authentication documentation](https://docs.github.com/en/authentication)
- Verify your PAT has the correct permissions
- Test SSH keys if using SSH remotes

---

**Need Help?** Open an issue on [GitHub](https://github.com/bluesover/transio.org/issues)

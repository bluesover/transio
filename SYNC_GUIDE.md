# 🔄 Dual Repository Sync Guide

## Overview

This guide helps you manage and sync two GitHub repositories simultaneously:
- **transio** (private) - Your private development repository
- **transio.org** (public) - Your public production repository

---

## 🚀 Quick Setup (One-Time)

### Step 1: Run the Setup Script

```bash
chmod +x setup-remotes.sh
./setup-remotes.sh
```

This will configure both remotes:
- `private` → https://github.com/bluesover/transio.git
- `public` → https://github.com/bluesover/transio.org.git

### Step 2: Verify Configuration

```bash
git remote -v
```

You should see:
```
private https://github.com/bluesover/transio.git (fetch)
private https://github.com/bluesover/transio.git (push)
public  https://github.com/bluesover/transio.org.git (fetch)
public  https://github.com/bluesover/transio.org.git (push)
```

---

## 📤 Daily Workflow - Push Changes

### Method 1: Automated Sync Script (Recommended)

Push to both repositories with one command:

```bash
chmod +x sync-repos.sh
./sync-repos.sh "Your commit message here"
```

### Method 2: NPM Scripts

```bash
# Setup remotes (one-time)
npm run git:setup

# Sync to both repos with automatic commit
npm run git:sync

# Push to private only
npm run git:push-private

# Push to public only
npm run git:push-public

# Push to both (manual)
npm run git:push-both
```

### Method 3: Manual Git Commands

```bash
# Stage and commit
git add .
git commit -m "Your commit message"

# Push to both
git push private main
git push public main
```

---

## 🤖 Automatic Sync with GitHub Actions

The repository includes a GitHub Actions workflow that automatically syncs from private to public when you push to the private repo.

### Setup GitHub Actions

1. **Generate a Personal Access Token (PAT)**
   - Go to: https://github.com/settings/tokens/new
   - Select scopes: `repo` (full control)
   - Generate token and copy it

2. **Add Token to Private Repository**
   - Go to: https://github.com/bluesover/transio/settings/secrets/actions
   - Click "New repository secret"
   - Name: `PUBLIC_REPO_TOKEN`
   - Value: Paste your PAT
   - Click "Add secret"

3. **How It Works**
   - Push to `private` repo → triggers GitHub Action
   - Action automatically syncs to `public` repo
   - Both repos stay in sync

---

## 📋 Common Scenarios

### Scenario 1: Regular Development Work

```bash
# Make your changes
# ...edit files...

# Sync to both repos
./sync-repos.sh "Add new feature X"
```

### Scenario 2: Private Development Only

```bash
git add .
git commit -m "Work in progress - testing"
git push private main
```

### Scenario 3: Public Release Only

```bash
git add .
git commit -m "Release version 2.0"
git push public main
```

### Scenario 4: Fix Error "remote origin already exists"

```bash
# Option A: Update origin URL
git remote set-url origin https://github.com/bluesover/transio.org.git

# Option B: Rename and start fresh
git remote rename origin old
./setup-remotes.sh
```

---

## 🔧 Advanced Configuration

### Create Git Alias for Quick Push

```bash
# Add to ~/.gitconfig or run:
git config --global alias.pushall '!f() { git push private "$@" && git push public "$@"; }; f'

# Usage:
git pushall main
```

### Set Default Push Remote

If you mostly push to public:

```bash
# Set public as default
git remote rename origin backup
git remote rename public origin

# Now 'git push' goes to public by default
git push
```

---

## 📊 Repository Status Check

### Check Current Remote Configuration

```bash
git remote -v
```

### Check Current Branch

```bash
git branch --show-current
```

### Check Sync Status

```bash
# Check if private is ahead
git fetch private
git status

# Check if public is ahead
git fetch public
git status
```

---

## 🔐 Security Best Practices

### ⚠️ Important Security Rules

1. **Never commit secrets to public repo**
   - API keys
   - Private tokens
   - Environment variables with sensitive data

2. **Use `.gitignore` properly**
   ```
   .env
   .env.local
   secrets/
   *.key
   *.pem
   ```

3. **Review before pushing to public**
   ```bash
   # Check what will be pushed
   git diff public/main
   
   # Review files
   git log public/main..HEAD
   ```

4. **Keep sensitive development in private**
   - WIP features
   - Internal notes
   - Test credentials
   - Debug code

---

## 🐛 Troubleshooting

### Problem: "Permission denied"

**Solution:**
```bash
# Check if SSH key is set up
ssh -T git@github.com

# Or use HTTPS with token
git remote set-url private https://YOUR_TOKEN@github.com/bluesover/transio.git
git remote set-url public https://YOUR_TOKEN@github.com/bluesover/transio.org.git
```

### Problem: "fatal: refusing to merge unrelated histories"

**Solution:**
```bash
git pull private main --allow-unrelated-histories
git pull public main --allow-unrelated-histories
```

### Problem: Repositories out of sync

**Solution:**
```bash
# Force sync from private to public
git push public main --force

# Or sync from public to private
git push private main --force
```

### Problem: Script not executable

**Solution:**
```bash
chmod +x setup-remotes.sh
chmod +x sync-repos.sh
```

---

## 📚 Quick Command Reference

```bash
# Setup (one-time)
./setup-remotes.sh                 # Configure remotes
chmod +x *.sh                      # Make scripts executable

# Daily workflow
./sync-repos.sh "message"          # Sync to both repos
npm run git:sync                   # Alternative sync method

# Manual control
git push private main              # Push to private only
git push public main               # Push to public only
npm run git:push-both              # Push to both

# Status checks
git remote -v                      # List remotes
git status                         # Check local status
git log --oneline -5               # Recent commits

# Advanced
git fetch --all                    # Fetch from all remotes
git branch -vv                     # Show tracking branches
```

---

## ✅ Setup Checklist

- [ ] Run `./setup-remotes.sh` to configure remotes
- [ ] Verify remotes with `git remote -v`
- [ ] Test push to private: `git push private main`
- [ ] Test push to public: `git push public main`
- [ ] Set up GitHub Actions secret `PUBLIC_REPO_TOKEN`
- [ ] Test automated sync script: `./sync-repos.sh "test"`
- [ ] Add `.env` and secrets to `.gitignore`
- [ ] Review public repo to ensure no secrets committed

---

## 🎯 Recommended Workflow

**For most developers, this is the simplest approach:**

```bash
# 1. Make changes to your code
code .

# 2. When ready to sync, use the script
./sync-repos.sh "Describe your changes here"

# Done! Both repos are updated.
```

**That's it!** The script handles:
- ✅ Staging files
- ✅ Committing changes
- ✅ Pushing to private
- ✅ Pushing to public
- ✅ Error handling
- ✅ Status reporting

---

## 💡 Tips

1. **Use descriptive commit messages**
   ```bash
   ./sync-repos.sh "Fix: XML validation error handling"
   ./sync-repos.sh "Feature: Add XSLT 3.0 support"
   ```

2. **Check status before syncing**
   ```bash
   git status
   ./sync-repos.sh "Your message"
   ```

3. **Keep a clean history**
   ```bash
   # Squash multiple commits before pushing
   git rebase -i HEAD~3
   ```

4. **Test locally before pushing**
   ```bash
   npm run build
   npm run lint
   ./sync-repos.sh "Ready for production"
   ```

---

## 📞 Need Help?

- **GitHub Docs**: https://docs.github.com/en/get-started/getting-started-with-git
- **Git Cheatsheet**: https://training.github.com/downloads/github-git-cheat-sheet/
- **Transio Issues**: https://github.com/bluesover/transio.org/issues

---

## 🎉 You're All Set!

Start syncing with:
```bash
./sync-repos.sh "Your first sync!"
```

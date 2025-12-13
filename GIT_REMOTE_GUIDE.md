# Git Remote Management Guide

## Current Situation
You have two repositories:
- **transio** (private) - Your private development repo
- **transio.org** (public) - Your public production repo

## Solution: Multiple Remotes

Instead of having just one `origin`, you can have multiple remotes with different names.

## Step-by-Step Setup

### 1. Check Current Remotes
```bash
git remote -v
```

### 2. Rename Existing Remote (if needed)
If you already have `origin` pointing to the private repo:
```bash
git remote rename origin private
```

### 3. Add Both Remotes
```bash
# Add private repository
git remote add private https://github.com/bluesover/transio.git

# Add public repository
git remote add public https://github.com/bluesover/transio.org.git
```

### 4. Verify Remotes
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

## Daily Workflow

### Push to Private Repository (Development)
```bash
git add .
git commit -m "Your commit message"
git push private main
```

### Push to Public Repository (Production)
```bash
# When ready to publish to production
git push public main
```

### Push to Both at Once
```bash
git push private main && git push public main
```

## Alternative: Set Default Remote

If you want `origin` to point to your public repo:

```bash
# Remove existing origin
git remote remove origin

# Add public as origin
git remote add origin https://github.com/bluesover/transio.org.git

# Add private as separate remote
git remote add private https://github.com/bluesover/transio.git
```

Then:
- `git push` = pushes to public (origin)
- `git push private` = pushes to private

## Best Practice Recommendation

**Recommended Setup for Your Use Case:**

```bash
# Main working remote (public production)
git remote add origin https://github.com/bluesover/transio.org.git

# Backup/private remote
git remote add backup https://github.com/bluesover/transio.git
```

**Workflow:**
1. Develop and commit locally
2. Push to public: `git push origin main`
3. Backup to private: `git push backup main`

## Quick Reference Commands

```bash
# View all remotes
git remote -v

# Add new remote
git remote add <name> <url>

# Remove remote
git remote remove <name>

# Rename remote
git remote rename <old-name> <new-name>

# Change remote URL
git remote set-url <name> <new-url>

# Push to specific remote
git push <remote-name> <branch-name>

# Pull from specific remote
git pull <remote-name> <branch-name>
```

## Fix Your Current Error

If you're getting "remote origin already exists":

```bash
# Option 1: Remove and re-add
git remote remove origin
git remote add origin https://github.com/bluesover/transio.org.git

# Option 2: Update URL
git remote set-url origin https://github.com/bluesover/transio.org.git

# Option 3: Rename and add both
git remote rename origin private
git remote add public https://github.com/bluesover/transio.org.git
```

## CloudFlare Pages Integration

CloudFlare Pages should connect to your **public** repository:
- Repository: `bluesover/transio.org`
- Branch: `main`
- Build command: `npm run build`
- Output directory: `dist`

## Security Notes

⚠️ **Important:**
- Keep sensitive data (API keys, secrets) in **private** repo only
- Never commit `.env` files with real credentials
- Use CloudFlare environment variables for secrets
- Your public repo should be production-ready and clean

## Automation Option

Create a git alias to push to both:

```bash
git config alias.pushall '!git push private main && git push public main'
```

Then use:
```bash
git pushall
```

---

**Quick Fix for Right Now:**

```bash
# See what origin currently points to
git remote -v

# Change origin to point to public repo
git remote set-url origin https://github.com/bluesover/transio.org.git

# Add private as backup
git remote add backup https://github.com/bluesover/transio.git

# Push to public
git push origin main

# Push to private backup
git push backup main
```

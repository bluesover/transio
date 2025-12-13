# ⚡ Quick Sync Commands

## 🎯 Most Common Usage

```bash
# ONE COMMAND TO SYNC EVERYTHING
./sync-repos.sh "Your commit message"
```

---

## 🚀 First Time Setup

```bash
# Step 1: Make scripts executable
chmod +x setup-remotes.sh sync-repos.sh

# Step 2: Configure remotes
./setup-remotes.sh

# Step 3: Done! Start syncing
./sync-repos.sh "Initial setup complete"
```

---

## 📝 VS Code Users

**Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)**

Then type: `Tasks: Run Task`

Select: **🔄 Sync Both Repositories**

Enter your commit message → Done!

---

## 🔄 Daily Workflow

```bash
# Make your changes in VS Code
# ...edit files...

# Sync to both repos
./sync-repos.sh "Add new feature"

# Or use npm
npm run git:sync
```

---

## 📤 Push Options

```bash
# Push to private repo only
git push private main

# Push to public repo only  
git push public main

# Push to both
git push private main && git push public main

# Or use the sync script (recommended)
./sync-repos.sh "Your message"
```

---

## 🔍 Quick Status Check

```bash
# See configured remotes
git remote -v

# See current branch and changes
git status

# See recent commits
git log --oneline -5
```

---

## 🆘 Fix Common Issues

```bash
# Remote already exists error
git remote remove origin
./setup-remotes.sh

# Scripts won't run
chmod +x *.sh

# Out of sync
git push public main --force
```

---

## 💡 Pro Tips

**Tip 1: Create an alias** (in ~/.bashrc or ~/.zshrc)
```bash
alias sync="./sync-repos.sh"
```
Then just use: `sync "Your message"`

**Tip 2: Use npm scripts**
```bash
npm run git:sync         # Sync both
npm run git:push-private # Private only
npm run git:push-public  # Public only
```

**Tip 3: VS Code keyboard shortcut**
Add to `.vscode/keybindings.json`:
```json
{
  "key": "ctrl+shift+s",
  "command": "workbench.action.tasks.runTask",
  "args": "🔄 Sync Both Repositories"
}
```

---

## ✅ That's It!

Main command to remember:
```bash
./sync-repos.sh "Your commit message"
```

See **SYNC_GUIDE.md** for complete documentation.

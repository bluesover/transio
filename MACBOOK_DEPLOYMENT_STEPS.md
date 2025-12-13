# 🚀 Complete MacBook Deployment Guide for Transio

**Project:** Transio - XML/XSLT Transformer  
**Domain:** transio.org  
**Repository Name:** transio  
**Cloudflare Pages Name:** transio  
**Your Computer:** MacBook Pro with Visual Studio Code

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [x] MacBook Pro with macOS
- [x] Visual Studio Code installed
- [x] GitHub account created
- [x] Cloudflare account created
- [x] GoDaddy domain (transio.org) purchased
- [x] Internet connection

---

## 🛠️ Step 1: Install Required Tools (One-Time Setup)

### 1.1 Install Homebrew (if not installed)

Open **Terminal.app** (or use VS Code's integrated terminal):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 1.2 Install Node.js and npm

```bash
brew install node
```

Verify installation:

```bash
node --version
# Should show: v22.x.x or similar

npm --version
# Should show: 10.x.x or similar
```

### 1.3 Install Git (if not installed)

```bash
brew install git
```

Verify:

```bash
git --version
# Should show: git version 2.x.x
```

### 1.4 Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

---

## 📁 Step 2: Prepare Your Project Folder

### 2.1 Navigate to Your Project

Open VS Code's **integrated terminal** (Terminal → New Terminal):

```bash
cd ~/Desktop/transio
# OR wherever your project folder is located
```

### 2.2 Verify You're in the Right Folder

```bash
pwd
# Should show: /Users/YourUsername/Desktop/transio (or similar)

ls
# Should show: package.json, src, index.html, etc.
```

---

## 🔧 Step 3: Fix the Build Error

The error you encountered (`sh: tsc: command not found`) happens because TypeScript isn't installed properly.

### 3.1 Clean Install Dependencies

```bash
# Remove old node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install all dependencies fresh
npm install
```

This will:
- Install TypeScript locally in your project
- Fix the `tsc: command not found` error
- Install all required packages

### 3.2 Verify TypeScript is Installed

```bash
npx tsc --version
# Should show: Version 5.7.x
```

### 3.3 Test Build

```bash
npm run build
```

If successful, you'll see:
```
✓ built in XXXms
```

And a `dist` folder will be created.

---

## 🌐 Step 4: Create GitHub Repository

### 4.1 Create Repository on GitHub Website

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name:** `transio`
3. **Description:** `Professional XML/XSLT Transformer - Free, open source, and privacy-first`
4. **Visibility:** **Public** (required for free hosting)
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click **Create repository**

### 4.2 Link Your Local Project to GitHub

In VS Code terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Transio XML/XSLT Transformer"

# Add your GitHub repository as remote
# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/transio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username!

### 4.3 Verify on GitHub

Go to `https://github.com/YOUR_GITHUB_USERNAME/transio` and verify all files are uploaded.

---

## ☁️ Step 5: Deploy to Cloudflare Pages

### 5.1 Install Wrangler (Cloudflare CLI)

```bash
npm install -g wrangler
```

Verify:

```bash
wrangler --version
```

### 5.2 Login to Cloudflare

```bash
wrangler login
```

This will:
- Open a browser window
- Ask you to authorize Wrangler
- Click "Allow" to grant access

### 5.3 Deploy to Cloudflare Pages

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages with the name "transio"
npx wrangler pages deploy dist --project-name=transio
```

**First time?** Wrangler will ask:
- "Create a new project?" → **Yes**
- "Project name?" → `transio`
- "Production branch?" → `main`

### 5.4 Get Your Cloudflare URL

After deployment completes, you'll see:

```
✨ Success! Uploaded X files (X.XX sec)

✨ Deployment complete! Take a peek over at
   https://transio.pages.dev
```

**Your app is now live!** 🎉

Test it at: `https://transio.pages.dev`

---

## 🌍 Step 6: Connect Custom Domain (transio.org)

### 6.1 Add Custom Domain in Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click on **transio** project
4. Go to **Custom domains** tab
5. Click **Set up a custom domain**
6. Enter: `transio.org`
7. Click **Continue**
8. Cloudflare will show you DNS records to add

### 6.2 Configure DNS in GoDaddy

1. Log in to [GoDaddy](https://www.godaddy.com/)
2. Go to **My Products** → **Domains** → **transio.org** → **DNS**
3. **Delete existing A and CNAME records** for @ and www (if any)
4. **Add these records:**

**For Root Domain (transio.org):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | transio.pages.dev | 1 Hour |

**For WWW Subdomain (www.transio.org):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | transio.pages.dev | 1 Hour |

5. Click **Save**

### 6.3 Wait for DNS Propagation

- DNS changes take **5-30 minutes** to propagate
- Cloudflare will show "Active" status when ready
- Check status at: `https://dash.cloudflare.com/`

### 6.4 Verify Domain

After 10-30 minutes:

```bash
# Check if DNS is working
nslookup transio.org
# Should show Cloudflare IPs

# Test in browser
open https://transio.org
```

**Both URLs should work:**
- `https://transio.org`
- `https://www.transio.org`

---

## 🔄 Step 7: Set Up Automated Deployments (Optional)

### Option A: Deploy from VS Code Terminal (Manual)

Every time you make changes:

```bash
# 1. Save all files in VS Code
# 2. Build and deploy
npm run build && npx wrangler pages deploy dist --project-name=transio
```

### Option B: GitHub Actions (Automatic on Push)

Create `.github/workflows/deploy.yml`:

```bash
mkdir -p .github/workflows
```

Then create the file with this content:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=transio
```

**Set up secrets:**

1. Get Cloudflare API Token:
   - Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click **Create Token**
   - Use **Edit Cloudflare Workers** template
   - Copy the token

2. Get Account ID:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click on any website
   - Scroll down on Overview page
   - Copy **Account ID** from right sidebar

3. Add to GitHub:
   - Go to your repo: `https://github.com/YOUR_USERNAME/transio`
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add:
     - `CLOUDFLARE_API_TOKEN` = (paste your API token)
     - `CLOUDFLARE_ACCOUNT_ID` = (paste your account ID)

4. Commit and push:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add automated deployment workflow"
git push
```

**Now every time you push to GitHub, it auto-deploys!** 🚀

---

## 📝 Common Workflow: Making Changes

### Daily Development Workflow:

1. **Open VS Code**
2. **Open your project folder** (File → Open Folder → select `transio`)
3. **Make changes** to files in `src/`
4. **Test locally:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

5. **When ready to deploy:**
   ```bash
   # Save all files in VS Code (Cmd+S)
   
   # Commit changes
   git add .
   git commit -m "Description of changes"
   git push
   
   # Build and deploy
   npm run build
   npx wrangler pages deploy dist --project-name=transio
   ```

6. **Check live site:**
   ```bash
   open https://transio.org
   ```

---

## 🆘 Troubleshooting

### Problem: `npm: command not found`

**Solution:**
```bash
# Install Node.js
brew install node

# Verify
npm --version
```

### Problem: `git: command not found`

**Solution:**
```bash
# Install Git
brew install git

# Verify
git --version
```

### Problem: `tsc: command not found`

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify TypeScript
npx tsc --version
```

### Problem: Build fails with dependency errors

**Solution:**
```bash
# Clean everything
rm -rf node_modules package-lock.json dist

# Fresh install
npm install

# Build again
npm run build
```

### Problem: Cloudflare deployment fails

**Solution:**
```bash
# Re-login to Cloudflare
wrangler login

# Try deploying again
npx wrangler pages deploy dist --project-name=transio
```

### Problem: DNS not working after 30 minutes

**Solution:**
1. Check GoDaddy DNS settings match exactly
2. Ensure CNAME for @ points to `transio.pages.dev`
3. Wait another 30 minutes (can take up to 48 hours in rare cases)
4. Use DNS checker: `https://dnschecker.org/#CNAME/transio.org`

### Problem: "Permission denied" when running scripts

**Solution:**
```bash
# Make script executable
chmod +x script-name.sh

# Run again
./script-name.sh
```

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] `npm --version` works (shows 10.x.x)
- [ ] `node --version` works (shows v22.x.x)
- [ ] `git --version` works (shows git version 2.x.x)
- [ ] `npm run build` creates `dist/` folder
- [ ] GitHub repo exists at `https://github.com/YOUR_USERNAME/transio`
- [ ] Cloudflare Pages shows project "transio"
- [ ] `https://transio.pages.dev` loads the app
- [ ] `https://transio.org` loads the app (after DNS propagation)
- [ ] `https://www.transio.org` redirects to `https://transio.org`
- [ ] All features work (transform, save, load, etc.)

---

## 🎉 Success!

Your Transio app is now:

✅ **Live at:** https://transio.org  
✅ **Deployed on:** Cloudflare Pages  
✅ **Source code:** https://github.com/YOUR_USERNAME/transio  
✅ **100% Free:** No hosting costs  
✅ **Fast globally:** Cloudflare CDN  
✅ **Auto HTTPS:** Free SSL certificate  
✅ **Open Source:** MIT License  

---

## 📚 Quick Command Reference

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build locally

# Git
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to GitHub

# Deployment
npx wrangler pages deploy dist --project-name=transio  # Deploy to Cloudflare

# Troubleshooting
rm -rf node_modules package-lock.json  # Clean dependencies
npm install                             # Reinstall
npx tsc --version                       # Check TypeScript
wrangler login                          # Re-login to Cloudflare
```

---

## 🔗 Useful Links

- **Live App:** https://transio.org
- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **GitHub Repo:** https://github.com/YOUR_USERNAME/transio
- **GoDaddy DNS:** https://dcc.godaddy.com/domains
- **DNS Checker:** https://dnschecker.org/
- **Cloudflare Docs:** https://developers.cloudflare.com/pages/

---

## 💡 Next Steps

1. **Share Your App:** Send `https://transio.org` to users
2. **Add to README:** Update repository description
3. **Monitor Usage:** Check Cloudflare analytics
4. **Keep Updated:** Pull requests welcome!
5. **Join Community:** Star the repo, share feedback

---

**Questions?** Check the other guides in this repository or open an issue on GitHub.

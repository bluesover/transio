# 🚀 MacBook Deployment Guide - Transio.org

## ✅ Quick Fix Applied

**Build Error Fixed**: Removed `tsc -b --noCheck` from build script since Vite handles TypeScript compilation automatically.

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ MacBook with macOS
- ✅ Visual Studio Code installed
- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ GitHub account
- ✅ CloudFlare account (free)
- ✅ Domain: transio.org (pointed to CloudFlare)

---

## 🔧 Step 1: Prepare Your Local Repository

### 1.1 Open Terminal in VS Code
```bash
# Press Cmd+` or Terminal > New Terminal in VS Code
```

### 1.2 Navigate to Your Project
```bash
cd /path/to/your/project
# Example: cd ~/Documents/transio-xslt-transformer
```

### 1.3 Install Dependencies
```bash
npm install
```

### 1.4 Test Build Locally
```bash
npm run build
```

**Expected Output:**
```
✓ built in XXXms
dist/index.html                  X.XX kB
dist/assets/index-XXXXX.js       XXX.XX kB
✓ Build complete!
```

If you see this, your build works! 🎉

---

## 🐙 Step 2: Push to GitHub

### 2.1 Create GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Repository Name**: `transio-xslt-transformer`
3. **Description**: `Professional XML to XSLT transformation tool - Free, open source, and privacy-first`
4. **Visibility**: ✅ **Public** (required for free hosting)
5. **DON'T** initialize with README (you already have one)
6. Click **Create repository**

### 2.2 Connect Your Local Repo to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Transio XML/XSLT Transformer"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/transio-xslt-transformer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

---

## ☁️ Step 3: Deploy to CloudFlare Pages

### 3.1 Login to CloudFlare

1. Go to: https://dash.cloudflare.com/
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application**
4. Click **Pages** tab
5. Click **Connect to Git**

### 3.2 Connect GitHub Repository

1. Click **Connect GitHub**
2. Authorize CloudFlare to access your GitHub
3. Select your repository: `transio-xslt-transformer`
4. Click **Begin setup**

### 3.3 Configure Build Settings

**Project name**: `transio` (or any name you want)

**Production branch**: `main`

**Build settings**:
```
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

**Environment variables**: (Leave empty for now)

Click **Save and Deploy**

### 3.4 Wait for Deployment

CloudFlare will:
1. Clone your repository
2. Run `npm install`
3. Run `npm run build`
4. Deploy to CloudFlare's edge network

**First build takes 2-3 minutes**

---

## 🌐 Step 4: Connect Custom Domain (transio.org)

### 4.1 Add Custom Domain in CloudFlare Pages

1. After deployment, go to your CloudFlare Pages project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `transio.org`
5. Click **Continue**

### 4.2 Configure DNS (if transio.org is on CloudFlare)

CloudFlare will automatically configure DNS for you. Just click **Activate domain**.

### 4.3 Configure DNS (if transio.org is on GoDaddy)

**You need to move DNS to CloudFlare:**

1. In GoDaddy, go to your domain settings
2. Find **Nameservers** section
3. Change to **Custom nameservers**
4. Add CloudFlare nameservers (found in CloudFlare dashboard):
   ```
   alina.ns.cloudflare.com
   brad.ns.cloudflare.com
   ```
5. Save changes
6. Wait 24-48 hours for DNS propagation

**OR use CNAME (faster but only for subdomain):**

1. In GoDaddy DNS settings
2. Add CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: transio-xslt-transformer.pages.dev
   TTL: 600
   ```
3. Add A record for root domain:
   ```
   Type: A
   Name: @
   Value: (Get IP from CloudFlare Pages settings)
   TTL: 600
   ```

---

## 🔄 Step 5: Automate Deployments (Optional but Recommended)

### 5.1 Create GitHub Actions Workflow

**This will auto-deploy whenever you push to GitHub.**

Create file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to CloudFlare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install --legacy-peer-deps
      
      - name: Build
        run: npm run build
      
      - name: Deploy to CloudFlare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: transio
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### 5.2 Get CloudFlare API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Use template: **Edit Cloudflare Workers**
4. Copy the token

### 5.3 Get CloudFlare Account ID

1. Go to: https://dash.cloudflare.com/
2. Click any site or go to Workers & Pages
3. Look at the URL: `dash.cloudflare.com/{ACCOUNT_ID}/...`
4. Copy the account ID

### 5.4 Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add:
   - Name: `CLOUDFLARE_API_TOKEN`, Value: (paste your API token)
   - Name: `CLOUDFLARE_ACCOUNT_ID`, Value: (paste your account ID)

**Now every push to `main` will auto-deploy!** 🎉

---

## 🧪 Step 6: Test Your Deployment

### 6.1 Visit Your Site

- **CloudFlare URL**: `https://transio.pages.dev`
- **Custom Domain**: `https://transio.org` (after DNS propagation)

### 6.2 Test Features

- ✅ XML input works
- ✅ XSLT input works
- ✅ Transform works
- ✅ Save version works
- ✅ Theme switcher works
- ✅ All data persists in browser (useKV)

---

## 📝 Making Changes

### From Your MacBook:

```bash
# 1. Make changes in VS Code

# 2. Test locally
npm run dev
# Visit http://localhost:5173

# 3. Build and test
npm run build
npm run preview

# 4. Commit and push
git add .
git commit -m "Your change description"
git push

# 5. CloudFlare auto-deploys (if GitHub Actions set up)
# Or deploy manually in CloudFlare dashboard
```

---

## 🆘 Common Issues & Fixes

### Issue 1: Build fails with "tsc: command not found"
**Fixed!** We removed `tsc` from the build script.

### Issue 2: "Invalid lock file" error on CloudFlare
```bash
# On your MacBook:
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Issue 3: Site shows blank page
- Check browser console (F12) for errors
- Make sure `dist` folder was created during build
- Check CloudFlare Pages build logs

### Issue 4: Changes don't appear after push
- Clear browser cache (Cmd+Shift+R)
- Wait 1-2 minutes for deployment
- Check CloudFlare Pages deployment status

### Issue 5: DNS not working
- Wait 24-48 hours for DNS propagation
- Use `dig transio.org` in terminal to check DNS
- Use CloudFlare's DNS checker: https://1.1.1.1/dns/

---

## 🎯 Quick Command Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Building
npm run build            # Build for production (creates dist/)
npm run preview          # Preview production build locally

# Git Commands
git status               # Check what changed
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push                 # Push to GitHub (triggers deploy)

# Useful
git log --oneline        # View commit history
git diff                 # See what changed
```

---

## 🌟 Success Checklist

- ✅ Local build works (`npm run build`)
- ✅ Repository on GitHub (public)
- ✅ Deployed to CloudFlare Pages
- ✅ Custom domain configured (transio.org)
- ✅ HTTPS enabled automatically
- ✅ GitHub Actions auto-deploy (optional)
- ✅ All features working online

---

## 🆓 Cost Breakdown

| Service | Cost |
|---------|------|
| GitHub | FREE (public repo) |
| CloudFlare Pages | FREE (500 builds/month, unlimited bandwidth) |
| CloudFlare DNS | FREE |
| SSL Certificate | FREE (auto-provided) |
| Domain (transio.org) | ~$12/year (already purchased) |

**Total Ongoing Cost: $0/month** 🎉

---

## 📞 Need Help?

1. **Check build logs** in CloudFlare Pages dashboard
2. **Check browser console** (F12) for errors
3. **Review CloudFlare documentation**: https://developers.cloudflare.com/pages/

---

## 🚀 You're Done!

Your app is now:
- ✅ Live at transio.org
- ✅ Fast (CloudFlare's global CDN)
- ✅ Secure (HTTPS auto-enabled)
- ✅ Free to run
- ✅ Open source
- ✅ Auto-deploys on every push

**Congratulations!** 🎊

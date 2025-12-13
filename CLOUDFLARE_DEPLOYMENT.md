# 🚀 Cloudflare Pages Deployment Guide - Transio.org

Complete guide to deploy Transio to Cloudflare Pages with automatic GitHub Actions deployment. for Transio

Complete guide to deploy Transio (transio.org) to Cloudflare Pages with custom domain configuration and automated deployments.

---

## 📋 Prerequisites

- ✅ GitHub repository (public: `transio.org` or private: `transio`)
- ✅ Cloudflare account (free tier works perfectly)
- ✅ Domain registered (transio.org via GoDaddy)
- ✅ Local development environment with Node.js 18+

---

## 🚀 Quick Deployment (3 Steps)

### Step 1: Build Locally to Test

```bash
# Clean install
npm install

# Build the project
npm run build

# Verify dist folder exists
ls dist/
# Should see: index.html, assets/ directory
```

### Step 2: Login to Cloudflare

```bash
# Install wrangler CLI globally (first time only)
npm install -g wrangler

# Authenticate with Cloudflare
npx wrangler login
```

This opens a browser to authenticate.

### Step 3: Deploy

```bash
# Deploy using the npm script
npm run deploy
```

Or manually:

```bash
npx wrangler pages deploy dist --project-name=transio
```

**✅ Done!** Your site is live at `https://transio.pages.dev`

---

## 🌐 Method A: Cloudflare Dashboard Deployment (Recommended First Time)

This method sets up automated deployments from GitHub.

### 1. Create Cloudflare Pages Project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **"Workers & Pages"** in sidebar
3. Click **"Create application"** → **"Pages"** tab
4. Click **"Connect to Git"**

### 2. Connect GitHub Repository

1. Click **"Connect GitHub"**
2. Authorize Cloudflare to access your GitHub account
3. Select your repository:
   - **Public repo**: `bluesover/transio.org`
   - **Private repo**: `bluesover/transio`
4. Click **"Begin setup"**

### 3. Configure Build Settings

```
Project name: transio
Production branch: main
Framework preset: None (or Vite)

Build settings:
  Build command: npm run build
  Build output directory: dist
  Root directory: (leave empty)

Environment variables: (none needed for basic deployment)
```

**Advanced build settings** (click to expand):
```
Node version: 18
Install command: npm install --legacy-peer-deps
```

### 4. Deploy

1. Click **"Save and Deploy"**
2. Wait 2-5 minutes for first build
3. You'll get a URL: `https://transio.pages.dev`

**🎉 Automatic Deployments Enabled!** Every push to `main` will auto-deploy.

---

## 🎨 Method B: Command Line Deployment

Use this for manual deployments or local testing.

### Prerequisites

```bash
# Ensure wrangler is installed
npm install -g wrangler

# Login (first time only)
npx wrangler login
```

### Deploy Commands

```bash
# Build first
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=transio

# Or use the npm script
npm run deploy
```

### Deploy to Specific Branch

```bash
# Deploy to production (main branch)
npx wrangler pages deploy dist --project-name=transio --branch=main

# Deploy to preview (feature branch)
npx wrangler pages deploy dist --project-name=transio --branch=feature-xyz
```

---

## 🌍 Custom Domain Setup (transio.org)

### Step 1: Add Domain to Cloudflare

1. Go to Cloudflare Dashboard → **"Websites"**
2. Click **"Add a site"**
3. Enter: `transio.org`
4. Select: **Free plan**
5. Cloudflare scans existing DNS records
6. Click **"Continue"**

Cloudflare will provide 2 nameservers, example:
```
anabelle.ns.cloudflare.com
jeyson.ns.cloudflare.com
```

**Copy these nameservers** - you'll need them next.

### Step 2: Update Nameservers at GoDaddy

1. Go to [godaddy.com](https://godaddy.com) → **"My Products"** → **"Domains"**
2. Click on **`transio.org`**
3. Scroll to **"Nameservers"** section
4. Click **"Change"** or **"Manage"**
5. Select **"Custom"** or **"I'll use my own nameservers"**
6. Replace existing nameservers with Cloudflare's 2 nameservers
7. Click **"Save"**

⏱️ **Propagation Time**: 2-24 hours (usually <1 hour)

You can check propagation status:
```bash
# Check current nameservers
dig NS transio.org

# Or use online tool
open https://whatsmydns.net/#NS/transio.org
```

### Step 3: Connect Domain to Pages Project

**After nameservers are active** (Cloudflare shows "Active" status):

1. Go to Cloudflare Dashboard → **"Workers & Pages"**
2. Click your **"transio"** project
3. Go to **"Custom domains"** tab
4. Click **"Set up a custom domain"**
5. Enter: `transio.org`
6. Click **"Continue"**
7. Cloudflare automatically configures DNS (adds CNAME record)

**Add www subdomain** (optional):
1. Click **"Set up a custom domain"** again
2. Enter: `www.transio.org`
3. Click **"Continue"**

**✅ Done!** Your site is live at `https://transio.org` within a few minutes.

Cloudflare automatically provides:
- ✅ Free SSL certificate (auto-renewing)
- ✅ Global CDN (fast worldwide)
- ✅ DDoS protection
- ✅ Analytics

---

## 🤖 GitHub Actions Auto-Deploy

Automate deployments on every git push using GitHub Actions.

### 1. Get Cloudflare Credentials

#### Get Account ID

1. Go to Cloudflare Dashboard
2. Select any site from the sidebar
3. Scroll down to **"Account ID"** in right sidebar
4. Click **"Copy"**

Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

#### Create API Token

1. Go to Cloudflare Dashboard → **"My Profile"** (top right) → **"API Tokens"**
2. Click **"Create Token"**
3. Use template: **"Cloudflare Pages - Deploy"**
4. Or configure manually:
   - **Permissions**: Account → Cloudflare Pages → Edit
   - **Account Resources**: Include → Your account name
   - **Zone Resources**: (leave empty)
5. Click **"Continue to summary"**
6. Click **"Create Token"**
7. **Copy the token immediately** (it's shown only once!)

Example: `1234567890abcdef1234567890abcdef12345678`

### 2. Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **"Settings"** → **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"**

Add these two secrets:

**Secret 1:**
```
Name: CLOUDFLARE_API_TOKEN
Value: [paste your API token from step 1]
```

**Secret 2:**
```
Name: CLOUDFLARE_ACCOUNT_ID
Value: [paste your Account ID from step 1]
```

### 3. Verify Workflow File Exists

Check that `.github/workflows/deploy-cloudflare.yml` exists in your repo.

The file should look like this:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
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

      - name: Build project
        run: npm run build
        env:
          NODE_ENV: production

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=transio
```

### 4. Test Auto-Deploy

```bash
# Make a small change
echo "# Test deploy" >> README.md

# Commit and push
git add README.md
git commit -m "Test auto-deploy"
git push origin main
```

Go to your GitHub repo → **"Actions"** tab to watch the deployment live.

**✅ Success!** Every push to `main` now automatically deploys to Cloudflare Pages.

---

## 🔧 Configuration Files Reference

### wrangler.toml

```toml
name = "transio"
compatibility_date = "2024-12-13"

pages_build_output_dir = "dist"

[assets]
directory = "./dist"
```

### package.json (relevant scripts)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npx wrangler pages deploy dist --project-name=transio"
  }
}
```

---

## 🐛 Troubleshooting

### Build Error: "npm ci can only install packages when package.json and package-lock.json are in sync"

**Problem**: Lock file is out of sync with package.json

**Solution**:
```bash
# Delete lock file and node_modules
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Commit updated lock file
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Build Error: "dist directory not found"

**Problem**: Build command failed or didn't run

**Solution**:
1. Test build locally:
   ```bash
   npm run build
   ls dist/
   ```
2. Check build logs in Cloudflare dashboard for specific errors
3. Verify `vite.config.ts` has correct output directory

### Deploy Error: "No assets directory" or "Upload directory required"

**Problem**: Wrong wrangler command or missing configuration

**Solution**: 
- Use `wrangler pages deploy` (not `wrangler deploy`)
- Ensure `wrangler.toml` has `[assets]` section
- Full command:
  ```bash
  npx wrangler pages deploy dist --project-name=transio
  ```

### Custom Domain Error: "522 Error" or "Site can't be reached"

**Problem**: Nameservers not yet propagated or incorrect

**Solution**:
1. Wait 1-24 hours after changing nameservers
2. Check nameserver status:
   ```bash
   dig NS transio.org
   # Should show Cloudflare nameservers
   ```
3. Verify in Cloudflare: Dashboard → Websites → transio.org should show "Active"

### GitHub Actions Fail: "Authentication error"

**Problem**: Missing or incorrect secrets

**Solution**:
1. Verify secrets exist: Repo → Settings → Secrets and variables → Actions
2. Check secret names match workflow file exactly:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Regenerate API token if needed (Cloudflare Dashboard → My Profile → API Tokens)

### File System Access API Not Working

**This is expected!** File System Access API requires:
- ✅ HTTPS (Cloudflare provides automatically)
- ✅ Chromium browser (Chrome, Edge, Brave)
- ✅ User permission

**Not supported:**
- ❌ Firefox (no File System API support)
- ❌ Safari (limited support)

Users on unsupported browsers will see a message. The app still works - just without local file features.

---

## 📊 Deployment Checklist

Use this checklist to track your deployment progress:

- [ ] Code pushed to GitHub repository
- [ ] Local build works: `npm run build` succeeds
- [ ] `dist` folder contains `index.html` and `assets/`
- [ ] Cloudflare account created
- [ ] Cloudflare Pages project created and connected to GitHub
- [ ] Build settings configured correctly
- [ ] First deployment successful at `transio.pages.dev`
- [ ] Domain added to Cloudflare (if using custom domain)
- [ ] GoDaddy nameservers changed to Cloudflare nameservers
- [ ] Nameservers propagated (check status)
- [ ] Custom domain connected in Cloudflare Pages settings
- [ ] SSL certificate active (automatic)
- [ ] GitHub Actions workflow file exists
- [ ] Cloudflare API token created
- [ ] GitHub secrets added (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
- [ ] Auto-deploy tested with a commit
- [ ] Production site live at `https://transio.org` ✅

---

## 🚀 Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server (localhost:5173)

# Build
npm run build                  # Build for production

# Preview
npm preview                    # Preview production build locally

# Deploy
npm run deploy                 # Build and deploy in one command
npx wrangler pages deploy dist --project-name=transio  # Manual deploy

# Wrangler
npx wrangler login            # Authenticate with Cloudflare
npx wrangler pages deployment list --project-name=transio  # View deployments
npx wrangler pages deployment tail --project-name=transio  # View logs

# Git
git push origin main          # Push to GitHub (triggers auto-deploy if configured)
```

---

## 📚 Additional Resources

- **Cloudflare Pages Documentation**: https://developers.cloudflare.com/pages
- **Wrangler CLI Documentation**: https://developers.cloudflare.com/workers/wrangler
- **GitHub Actions with Cloudflare**: https://github.com/cloudflare/pages-action
- **File System Access API**: https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
- **Vite Build Configuration**: https://vitejs.dev/guide/build.html

---

## 🆘 Need More Help?

1. Check [CLOUDFLARE_FIX.md](./CLOUDFLARE_FIX.md) for specific error solutions
2. Review [README.md](./README.md) for application features
3. See [PRD.md](./PRD.md) for technical architecture details
4. Visit Cloudflare Community: https://community.cloudflare.com
5. Check Cloudflare Status: https://www.cloudflarestatus.com

---

**🎉 Congratulations! Your Transio application is now live at [transio.org](https://transio.org)**

---

*Last updated: December 2024*

# Cloudflare Pages Deployment Guide

Complete guide to deploy Transio to Cloudflare Pages with custom domain (transio.org).

---

## Prerequisites

- [x] GitHub repository with your code
- [x] Cloudflare account (free tier works)
- [x] Domain registered with GoDaddy (transio.org)
- [x] Node.js 18+ installed locally

---

## Part 1: Build Configuration

### 1. Verify Build Settings

Your `wrangler.toml` should contain:
```toml
name = "transio"
compatibility_date = "2024-12-13"
pages_build_output_dir = "dist"

[site]
bucket = "./dist"
```

### 2. Test Build Locally

```bash
# Clean install dependencies
npm install

# Build the project
npm run build

# Verify dist folder exists and contains:
# - index.html
# - assets/ folder with JS/CSS files
ls -la dist/
```

**Expected output structure:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...other assets
└── src/ (if assets directory exists)
```

---

## Part 2: Cloudflare Pages Setup

### Method A: Via Cloudflare Dashboard (Recommended for First-Time)

1. **Create Cloudflare Pages Project**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click "Workers & Pages" in sidebar
   - Click "Create application" → "Pages" tab
   - Click "Connect to Git"

2. **Connect GitHub Repository**
   - Authorize Cloudflare to access your GitHub
   - Select your repository (e.g., `bluesover/transio.org`)
   - Click "Begin setup"

3. **Configure Build Settings**
   ```
   Project name: transio
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   
   Environment variables: (none needed)
   
   Node version: 18 (or 20)
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-5 minutes for first build
   - You'll get URL: `transio.pages.dev`

### Method B: Via Command Line (After Initial Setup)

```bash
# Install Wrangler CLI globally (one-time)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
npx wrangler pages deploy dist --project-name=transio
```

---

## Part 3: Custom Domain Setup (transio.org)

### Step 1: Add Domain to Cloudflare

1. Go to Cloudflare Dashboard → "Websites"
2. Click "Add a site"
3. Enter: `transio.org`
4. Choose Free plan
5. Cloudflare will scan DNS records
6. Click "Continue"

### Step 2: Update GoDaddy Nameservers

Cloudflare will show you 2 nameservers like:
```
anabelle.ns.cloudflare.com
jeyson.ns.cloudflare.com
```

**In GoDaddy:**
1. Go to [godaddy.com](https://godaddy.com) → My Products → Domains
2. Click on `transio.org` → DNS → Nameservers
3. Click "Change Nameservers"
4. Select "Custom"
5. Replace with Cloudflare nameservers (paste both)
6. Save

⏱️ **Wait 2-24 hours** for nameserver propagation (usually <1 hour)

### Step 3: Connect Domain to Pages

**After nameservers are active:**

1. Go to Cloudflare Dashboard → "Workers & Pages"
2. Click your "transio" project
3. Go to "Custom domains" tab
4. Click "Set up a custom domain"
5. Enter: `transio.org`
6. Click "Continue"
7. Cloudflare will auto-configure DNS

**Add www subdomain (optional):**
1. Click "Set up a custom domain" again
2. Enter: `www.transio.org`
3. Click "Continue"

✅ Done! Your site will be live at `https://transio.org` in a few minutes.

---

## Part 4: Automated Deployments with GitHub Actions

### Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: transio
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Get Cloudflare Credentials

**1. Get Account ID:**
- Go to Cloudflare Dashboard
- Select any site
- Right sidebar → Copy "Account ID"

**2. Create API Token:**
- Dashboard → My Profile → API Tokens
- Click "Create Token"
- Use template: "Cloudflare Pages - Deploy"
- Permissions needed:
  - Account → Cloudflare Pages → Edit
- Account Resources: Include → Your account
- Click "Continue to summary" → "Create Token"
- **Copy token immediately** (won't show again)

### Add Secrets to GitHub

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add two secrets:

```
Name: CLOUDFLARE_API_TOKEN
Value: [paste your API token]

Name: CLOUDFLARE_ACCOUNT_ID
Value: [paste your account ID]
```

✅ **Now every push to `main` branch auto-deploys!**

---

## Part 5: Optional Server Setup

If you want enhanced XSLT 2.0/3.0 support, deploy the Saxon-HE server separately.

### Option A: Local Server (Development)

```bash
cd server
chmod +x install.sh start-server.sh
./install.sh
./start-server.sh
```

Server runs at `http://localhost:3001/api`

### Option B: Deploy Server to Cloud

**Not required for most users** - client-side Saxon-JS works great!

If needed, deploy server to:
- **Heroku** (Free tier deprecated, but Eco $5/month)
- **Railway** (Free $5 credit/month)
- **Fly.io** (Free tier: 3 shared VMs)
- **DigitalOcean App Platform** ($5/month)

Then configure server URL in app via Cloud icon ☁️.

---

## Troubleshooting

### Build Fails: "npm ci" sync error

**Problem:** `package-lock.json` is out of sync

**Solution:**
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

### Build Fails: "dist directory not found"

**Problem:** Build command didn't run or failed

**Solution:**
1. Check build logs in Cloudflare dashboard
2. Verify `vite.config.ts` has correct output dir:
   ```ts
   build: {
     outDir: 'dist'
   }
   ```
3. Test locally: `npm run build && ls dist/`

### Wrangler Deploy Error: "No assets directory"

**Problem:** Old wrangler.toml format

**Solution:** Your wrangler.toml should have:
```toml
pages_build_output_dir = "dist"

[site]
bucket = "./dist"
```

### Custom Domain Shows "522 Error"

**Problem:** Nameservers not yet propagated

**Solution:**
- Wait 1-24 hours after changing nameservers
- Check status: `dig NS transio.org` (should show Cloudflare nameservers)
- Or use: [whatsmydns.net](https://whatsmydns.net)

### "File System Access API" Not Working in Production

**This is normal!** File System Access API requires:
- HTTPS (Cloudflare provides this automatically)
- Chromium browser (Chrome, Edge, Brave)
- User permission grant

Users on Firefox/Safari will see a message that file features aren't available (browser IndexedDB still works).

---

## Deployment Checklist

- [ ] Code pushed to GitHub repository
- [ ] `npm run build` works locally
- [ ] Cloudflare Pages project created
- [ ] Build settings configured (build command: `npm run build`, output: `dist`)
- [ ] First deployment successful at `transio.pages.dev`
- [ ] Domain added to Cloudflare (if using custom domain)
- [ ] GoDaddy nameservers changed to Cloudflare (if using custom domain)
- [ ] Custom domain connected in Pages settings (if using custom domain)
- [ ] GitHub Actions workflow added (optional, for auto-deploy)
- [ ] Cloudflare API token and Account ID added to GitHub secrets (optional)
- [ ] Test deployment at `https://transio.org` ✅

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy via Wrangler
npx wrangler pages deploy dist --project-name=transio

# Start local server (optional)
cd server && ./start-server.sh

# Check deployment status
npx wrangler pages deployment list --project-name=transio
```

---

## Support

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages
- **Wrangler CLI Docs:** https://developers.cloudflare.com/workers/wrangler
- **File System API:** https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API

---

**🎉 Congratulations! Your app is now live at [transio.org](https://transio.org)**

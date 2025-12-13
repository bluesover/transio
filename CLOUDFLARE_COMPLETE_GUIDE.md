# ☁️ Complete Cloudflare Pages Deployment Guide

## 🎯 Goal: Deploy Transio to https://transio.org

This guide covers everything from cleanup to live deployment with custom domain.

---

## 📝 Table of Contents

1. [Pre-Deployment Cleanup](#1-pre-deployment-cleanup)
2. [Local Build Test](#2-local-build-test)
3. [GitHub Repository Setup](#3-github-repository-setup)
4. [Cloudflare Pages Configuration](#4-cloudflare-pages-configuration)
5. [Custom Domain Setup](#5-custom-domain-setup)
6. [GitHub Actions Auto-Deploy](#6-github-actions-auto-deploy)
7. [Verification & Testing](#7-verification--testing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Pre-Deployment Cleanup

Remove unnecessary files to keep repository clean:

```bash
# Make cleanup script executable
chmod +x cleanup-docs.sh

# Run cleanup
./cleanup-docs.sh

# Verify cleaned files
git status

# Commit cleanup
git add .
git commit -m "Clean up unnecessary documentation files"
```

**What gets removed:**
- Duplicate sync guides (keeping only `sync-repos.sh`)
- Netlify/Vercel deployment workflows (Cloudflare only)
- Redundant deployment documentation

**What stays:**
- `README.md` - User documentation
- `DEPLOYMENT.md` - Detailed Cloudflare guide
- `PRD.md` - Product requirements
- `LICENSE` - MPL-2.0 open source license
- `.github/workflows/deploy-cloudflare.yml` - Auto-deployment
- `.github/workflows/sync-repos.yml` - Repository syncing

---

## 2. Local Build Test

Test the build process on your macOS machine:

```bash
# Navigate to project directory
cd ~/path/to/transio

# Clean install (fixes dependency issues)
rm -rf node_modules package-lock.json
npm install

# Run build
npm run build

# Verify output
ls -la dist/
# Should see: index.html, assets/ folder, and other files

# Test locally (optional)
npm run preview
# Visit: http://localhost:4173
# Test features: transform, save versions, themes, etc.
# Press Ctrl+C to stop
```

**Expected `dist/` contents:**
- ✓ `index.html`
- ✓ `assets/` folder with `.js` and `.css` files
- ✓ Asset files (if any images/fonts)

---

## 3. GitHub Repository Setup

You have two repositories:
- **transio** (private) - your backup
- **transio.org** (public) - for deployment and open source

### Recommended Approach: Use Public Repo for Cloudflare

```bash
# Check current remote
git remote -v

# Should show one of:
# origin  https://github.com/bluesover/transio.git (private)
# origin  https://github.com/bluesover/transio.org.git (public)

# If using private, switch to public for deployment:
git remote set-url origin https://github.com/bluesover/transio.org.git

# Verify
git remote -v
# Should now show: https://github.com/bluesover/transio.org.git

# Push to public repo
git push origin main
```

### Optional: Sync to Both Repos

```bash
# Use the sync script to push to both
chmod +x sync-repos.sh
./sync-repos.sh "Prepare for Cloudflare deployment"

# This pushes to:
# - transio (private backup)
# - transio.org (public deployment)
```

**Why public repo?**
- ✓ Cloudflare Pages works better with public repos
- ✓ Open source visibility
- ✓ Community can fork and contribute
- ✓ GitHub Actions run without limits

---

## 4. Cloudflare Pages Configuration

### Step-by-Step Setup:

1. **Login to Cloudflare**
   - Visit: https://dash.cloudflare.com/
   - Sign in with your account

2. **Navigate to Pages**
   - Left sidebar → **Workers & Pages**
   - Click **Create application**
   - Select **Pages** tab
   - Click **Connect to Git**

3. **Connect GitHub**
   - Click **GitHub** button
   - Authorize Cloudflare (if first time)
   - You'll see list of repositories

4. **Select Repository**
   - Find and select: `bluesover/transio.org`
   - Click **Begin setup**

5. **Configure Build Settings**
   
   Fill in these **exact values**:
   
   ```
   Project name: transio
   
   Production branch: main
   
   Framework preset: None
   
   Build command: npm run build
   
   Build output directory: dist
   
   Root directory: /
   (leave empty)
   
   Environment variables: (optional)
   NODE_VERSION = 18
   ```

6. **Deploy**
   - Click **Save and Deploy**
   - Watch build progress (2-5 minutes)
   - Build logs show in real-time

7. **First Deployment Success**
   - You'll see: ✅ Deployment successful
   - Get temporary URL: `https://transio.pages.dev`
   - Click to test the app

---

## 5. Custom Domain Setup

### If Domain is in Cloudflare (Recommended):

1. **Add Domain to Project**
   - In Cloudflare Pages → **transio** → **Custom domains**
   - Click **Set up a custom domain**
   - Enter: `transio.org`
   - Click **Continue**

2. **Auto-Configuration**
   - Cloudflare automatically creates CNAME record
   - Status shows: "Active" (green checkmark)
   - SSL certificate auto-issued

3. **Add WWW Subdomain**
   - Click **Set up a custom domain** again
   - Enter: `www.transio.org`
   - Click **Continue**
   - Auto-configured

**✅ Done! Domain ready in 5-15 minutes.**

---

### If Domain is in GoDaddy:

1. **Get Cloudflare Pages URL**
   - Your pages URL: `transio.pages.dev`

2. **Update GoDaddy DNS**
   - Login to GoDaddy
   - Go to: My Products → Domains → transio.org → DNS
   - **Add/Edit DNS Records:**

   ```
   Type: CNAME
   Name: @
   Value: transio.pages.dev
   TTL: 600 seconds (10 minutes)
   ```

   ```
   Type: CNAME
   Name: www
   Value: transio.pages.dev
   TTL: 600 seconds
   ```

3. **Verify in Cloudflare**
   - Back in Cloudflare Pages → Custom domains
   - Click **Set up a custom domain**
   - Enter: `transio.org`
   - May need to verify via TXT record (Cloudflare shows instructions)
   - Repeat for `www.transio.org`

**⏱️ DNS Propagation: 15 minutes to 48 hours**

---

## 6. GitHub Actions Auto-Deploy

Set up automatic deployments on every push to `main`.

### Step 1: Get Cloudflare Credentials

#### A. API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Select template: **Edit Cloudflare Workers**
4. Or click **Create Custom Token**:
   - Permissions: `Cloudflare Pages: Edit`
   - Account Resources: `Include → Your Account`
5. Click **Continue to summary** → **Create Token**
6. **Copy the token** (save it securely, shown only once!)

#### B. Account ID

1. Go to: https://dash.cloudflare.com/
2. Click **Workers & Pages** in sidebar
3. Look at right sidebar under "Account details"
4. **Copy Account ID**

### Step 2: Add Secrets to GitHub

1. Go to: `https://github.com/bluesover/transio.org/settings/secrets/actions`
2. Click **New repository secret**
3. Add first secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (paste your API token)
   - Click **Add secret**
4. Click **New repository secret** again
5. Add second secret:
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (paste your account ID)
   - Click **Add secret**

### Step 3: Verify GitHub Actions Workflow

The workflow file already exists at `.github/workflows/deploy-cloudflare.yml`

```yaml
# This runs automatically on every push to main
on:
  push:
    branches: [ main ]
```

### Step 4: Test Auto-Deploy

```bash
# Make a small change
echo "# Test auto-deploy" >> README.md

# Commit and push
git add .
git commit -m "Test GitHub Actions auto-deploy"
git push origin main

# Watch deployment:
# https://github.com/bluesover/transio.org/actions
```

**Check deployment progress:**
1. GitHub → Actions tab
2. See workflow running
3. Click to view logs
4. After ~3-5 minutes: ✅ Success
5. Visit https://transio.org (updates automatically)

---

## 7. Verification & Testing

### A. Check Build Output

```bash
# In Cloudflare Dashboard:
# Workers & Pages → transio → View details
# Click latest deployment → View build log

# Should see:
✓ npm install completed
✓ npm run build completed
✓ dist/ directory found
✓ Files uploaded
✓ Deployment success
```

### B. Test Deployed App

Visit both URLs:
- https://transio.pages.dev
- https://transio.org (after DNS setup)
- https://www.transio.org

**Test these features:**
- [ ] Page loads correctly
- [ ] XML/XSLT editors display with syntax highlighting
- [ ] Transform button works (try XSLT 1.0 sample)
- [ ] Version save/load works
- [ ] Theme switching works (Light/Dark/Black)
- [ ] Editor theme changes
- [ ] File import works
- [ ] Project folder selection (Chrome/Edge only)
- [ ] Snippets panel opens
- [ ] Keyboard shortcuts work (Ctrl+Enter, Ctrl+S, etc.)
- [ ] Activity log tracks operations
- [ ] Mobile layout works (resize browser)

### C. Check DNS Propagation

```bash
# Visit: https://dnschecker.org/
# Enter: transio.org
# Should show CNAME → transio.pages.dev globally

# Or use terminal:
dig transio.org
nslookup transio.org
```

### D. Verify HTTPS

- Visit https://transio.org
- Click padlock icon in browser
- Should show: "Connection is secure"
- Certificate issued by: Cloudflare

---

## 8. Troubleshooting

### Build Error: npm ci dependency mismatch

**Error:**
```
Invalid: lock file's @github/spark@0.0.1 does not satisfy @github/spark@0.44.5
Missing: octokit@5.0.5 from lock file
```

**Fix:**
```bash
# On your macOS terminal:
rm -rf node_modules package-lock.json
npm install
npm run build  # Test locally
git add package-lock.json
git commit -m "Update package-lock.json for Cloudflare"
git push origin main
```

---

### Build Error: No build output directory

**Error:**
```
Could not find build output directory "dist"
```

**Fix:**
1. Check Cloudflare Pages settings
2. Verify: Build output directory = `dist` (no `/` or `./`)
3. Retry deployment

---

### Custom Domain Not Working

**Issue:** Domain shows "This site can't be reached"

**Checks:**
1. DNS propagation (may take 15-30 minutes)
   - Visit: https://dnschecker.org/
   - Enter your domain
   - Check if CNAME shows `transio.pages.dev`

2. Cloudflare custom domain status
   - Should be: **Active** (green)
   - Not: Pending or Failed

3. Clear browser cache
   - Try incognito/private window
   - Clear DNS cache (macOS):
     ```bash
     sudo dscacheutil -flushcache
     sudo killall -HUP mDNSResponder
     ```

---

### GitHub Actions Deployment Fails

**Error:** `Authentication failed`

**Fix:**
1. Verify secrets in GitHub:
   - `CLOUDFLARE_API_TOKEN` exists
   - `CLOUDFLARE_ACCOUNT_ID` exists
2. Check token permissions:
   - Should have: `Cloudflare Pages: Edit`
3. Regenerate token if expired
4. Update secret in GitHub

---

### Build Succeeds but App Doesn't Load

**Issue:** White screen or errors in browser console

**Check:**
1. Browser console (F12 → Console tab)
2. Look for errors like:
   - `Failed to load module`
   - `404 Not Found`

**Fix:**
- Verify `base: './'` in `vite.config.ts`
- Check all asset imports use `@/assets/...` format
- Rebuild: `npm run build`

---

### Server Configuration Issues

**Issue:** Saxon-HE server not connecting

**Note:** Server is **optional** - app works without it
- XSLT 1.0: Always works (browser built-in)
- XSLT 2.0/3.0: Falls back to Saxon-JS (client-side)

**Fix (if you want server):**
1. Deploy server separately (see `server/README.md`)
2. Configure CORS to allow transio.org
3. Update server URL in app settings

---

## 📊 Monitoring

### Cloudflare Analytics
- Dashboard → Workers & Pages → transio → **Analytics**
- See: Requests, bandwidth, visitors

### GitHub Actions
- Repository → **Actions** tab
- See: All deployment history
- Click any run to see logs

### Uptime Monitoring (Optional)
- Use: UptimeRobot (free)
- Monitor: https://transio.org
- Get alerts if site goes down

---

## 🎉 Success!

Your Transio app should now be live at:
- ✅ https://transio.org
- ✅ https://www.transio.org
- ✅ Auto-deploys on every push to main
- ✅ HTTPS with free SSL certificate
- ✅ Fast global CDN via Cloudflare
- ✅ 100% open source (MPL-2.0)

### Share Your Project

```bash
# Tweet template:
"Just deployed Transio - a free, open-source XML/XSLT transformer 
supporting XSLT 1.0/2.0/3.0 with version control and project management.

Try it: https://transio.org
Source: https://github.com/bluesover/transio.org

#opensource #webdev #xslt"
```

### Next Steps

- [ ] Star your repo on GitHub
- [ ] Create releases for version tracking
- [ ] Add contributing guidelines
- [ ] Set up issue templates
- [ ] Share on social media
- [ ] Submit to Product Hunt
- [ ] Post on Reddit (r/opensource, r/webdev)
- [ ] Add to awesome lists

---

## 📞 Need Help?

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Cloudflare Community:** https://community.cloudflare.com/
- **GitHub Issues:** https://github.com/bluesover/transio.org/issues

---

**🚀 Happy Deploying!**

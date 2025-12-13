# 🚀 Cloudflare Pages Deployment Guide

## Complete deployment guide for Transio on Cloudflare Pages with custom domain

---

## ✅ Prerequisites

- ✓ GitHub account (repository already created)
- ✓ Cloudflare account (free tier)
- ✓ Domain: **transio.org** (managed in GoDaddy or Cloudflare)
- ✓ Local: macOS with Node.js 18+, npm, git

---

## 📦 Step 1: Prepare Your Local Project

```bash
# Navigate to project
cd ~/path/to/transio

# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build

# Verify dist/ folder exists and contains index.html
ls -la dist/
```

**Expected output in `dist/`:**
- `index.html`
- `assets/` folder with JS/CSS bundles
- Other static assets

---

## 🔗 Step 2: GitHub Repository Setup

You mentioned you have both `transio` (private) and `transio.org` (public).

### Option A: Use Public Repository (Recommended for Open Source)

```bash
# Check current remote
git remote -v

# If you need to switch to public repo
git remote set-url origin https://github.com/bluesover/transio.org.git

# Push latest changes
git add .
git commit -m "Prepare for Cloudflare Pages deployment"
git push origin main
```

### Option B: Keep Private & Make Deployment Branch Public

```bash
# Stay on private repo but create public deployment branch
git checkout -b deploy
git push origin deploy

# Then in GitHub, change repository visibility to Public
# Or use GitHub Actions to sync to public repo
```

**🎯 Recommendation:** Use the **public repo** (`transio.org`) for Cloudflare Pages since it's open source.

---

## ☁️ Step 3: Deploy to Cloudflare Pages

### 3.1 Create New Pages Project

1. Login to Cloudflare: https://dash.cloudflare.com/
2. Click **Workers & Pages** in left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select **GitHub** and authorize Cloudflare
5. Select repository: **bluesover/transio.org**
6. Click **Begin setup**

### 3.2 Configure Build Settings

**Project name:** `transio`

**Production branch:** `main`

**Build settings:**
- Framework preset: **None** (or Vite)
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (leave empty)

**Environment variables:** *(Optional)*
- `NODE_VERSION`: `18`

Click **Save and Deploy**

---

## 🌐 Step 4: Custom Domain Setup (transio.org)

### Option A: Domain in Cloudflare (Recommended)

If you transferred transio.org to Cloudflare nameservers:

1. Go to **Workers & Pages** → **transio** → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Cloudflare auto-configures DNS (CNAME record)
5. Click **Activate domain**
6. Repeat for `www.transio.org`

### Option B: Domain in GoDaddy

If keeping DNS at GoDaddy:

1. Get your Cloudflare Pages URL (e.g., `transio.pages.dev`)
2. Login to GoDaddy DNS settings
3. Add/Edit DNS records:

```
Type: CNAME
Name: @
Value: transio.pages.dev
TTL: 600
```

```
Type: CNAME  
Name: www
Value: transio.pages.dev
TTL: 600
```

4. In Cloudflare Pages, add custom domains:
   - `transio.org`
   - `www.transio.org`
5. Verify domain ownership (TXT record if needed)

⏱️ **DNS propagation:** 5 minutes to 48 hours

---

## 🔐 Step 5: GitHub Actions Secrets (Optional Auto-Deploy)

If using GitHub Actions for automated deployments:

1. Get Cloudflare API Token:
   - Cloudflare Dashboard → **My Profile** → **API Tokens**
   - Click **Create Token** → **Edit Cloudflare Workers** template
   - Or **Create Custom Token** with:
     - Permissions: `Cloudflare Pages: Edit`
     - Account Resources: `Include → Your Account`
   - Copy the token

2. Add to GitHub Secrets:
   - Go to: `https://github.com/bluesover/transio.org/settings/secrets/actions`
   - Click **New repository secret**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (paste your token)
   - Click **Add secret**

3. Get Cloudflare Account ID:
   - Cloudflare Dashboard → **Workers & Pages** → **Overview**
   - Copy **Account ID** from right sidebar
   - Add as secret:
     - Name: `CLOUDFLARE_ACCOUNT_ID`
     - Value: (paste account ID)

4. Project Name:
   - Name: `CLOUDFLARE_PROJECT_NAME`
   - Value: `transio`

**GitHub Actions will now auto-deploy on every push to `main`**

---

## 🔄 Step 6: Sync Both Repositories (Private + Public)

Edit `sync-repos.sh`:

```bash
#!/bin/bash
COMMIT_MSG="${1:-Update repository}"

echo "🔄 Syncing transio (private) and transio.org (public)..."

# Push to private repo
git push https://github.com/bluesover/transio.git main

# Push to public repo
git push https://github.com/bluesover/transio.org.git main

echo "✅ Both repositories synced!"
```

Usage:
```bash
chmod +x sync-repos.sh
./sync-repos.sh "Deploy to Cloudflare"
```

---

## 🧪 Step 7: Test Deployment

### Local Build Test
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

### Production Test
1. Wait for Cloudflare build to complete (2-5 minutes)
2. Visit: `https://transio.pages.dev`
3. Test all features:
   - XML/XSLT transformation
   - Version saving
   - Theme switching
   - File import/export
   - Server connection (if enabled)

### Custom Domain Test
Once DNS propagates:
- Visit: `https://transio.org`
- Visit: `https://www.transio.org`
- Check HTTPS certificate (auto-issued by Cloudflare)

---

## 🐛 Troubleshooting

### Build Fails: "npm ci" dependency mismatch

**Error:** `Invalid: lock file's @github/spark@0.0.1 does not satisfy @github/spark@0.44.5`

**Fix:**
```bash
# Local terminal
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Build Fails: Output directory not found

**Error:** `Could not find build output directory`

**Fix:** In Cloudflare Pages settings:
- Build output directory: `dist` (not `/dist` or `./dist`)

### Custom Domain Not Working

**Issue:** Domain shows "Unable to reach server"

**Fix:**
1. Check DNS propagation: https://dnschecker.org/
2. Verify CNAME points to `transio.pages.dev`
3. In Cloudflare Pages, verify custom domain status is "Active"
4. Clear browser cache and try incognito mode

### GitHub Actions Fails

**Error:** `Authentication failed`

**Fix:**
1. Verify `CLOUDFLARE_API_TOKEN` is correct
2. Check token permissions include Pages: Edit
3. Verify `CLOUDFLARE_ACCOUNT_ID` matches your account
4. Regenerate token if needed

---

## 📊 Deployment Status Check

### Cloudflare Pages Dashboard
- Build history: https://dash.cloudflare.com/ → Workers & Pages → transio
- Custom domains: Check DNS records
- Analytics: Page views, bandwidth usage

### GitHub Actions
- Workflow runs: https://github.com/bluesover/transio.org/actions
- Build logs: Click on latest workflow run

---

## 🎉 Post-Deployment

### Share Your Project
- Open source repo: `https://github.com/bluesover/transio.org`
- Live app: `https://transio.org`
- Submit to:
  - Product Hunt
  - Hacker News
  - Reddit r/opensource

### Monitor Usage
- Cloudflare Analytics: Free tier includes basic analytics
- GitHub Stars: Track community interest
- Issues: Monitor for bug reports

---

## 📞 Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Issues:** https://github.com/bluesover/transio.org/issues
- **Cloudflare Community:** https://community.cloudflare.com/

---

## ✅ Checklist

- [ ] Local build works (`npm run build`)
- [ ] Code pushed to GitHub public repo
- [ ] Cloudflare Pages project created
- [ ] Build settings configured correctly
- [ ] First deployment successful
- [ ] Custom domain added (transio.org)
- [ ] DNS configured (CNAME records)
- [ ] HTTPS working (Cloudflare auto-cert)
- [ ] GitHub Actions secrets configured
- [ ] Auto-deploy tested (push to main)
- [ ] All features tested on production
- [ ] Repository syncing works

---

**🚀 You're all set! Your Transio app is now live at https://transio.org**
2. **Go to Pages**: Workers & Pages → Create Application → Pages → Connect to Git
3. **Select Repository**: Choose your GitHub repo `transio`
4. **Configure Build**:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
   - **Root directory**: `/`
   - **Node version**: `18` or higher
5. **Save and Deploy**

Wait 2-3 minutes for first deployment.

### 4. Custom Domain Setup

#### Add Domain to Cloudflare

1. Go to **Custom domains** in your Pages project
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Cloudflare will provide nameservers

#### Update DNS at GoDaddy

1. Login to GoDaddy
2. Go to your domain `transio.org`
3. Navigate to **DNS Management**
4. Update nameservers to Cloudflare's:
   ```
   austin.ns.cloudflare.com
   dina.ns.cloudflare.com
   ```
5. Wait 24-48 hours for propagation (usually faster)

#### Verify Domain

```bash
# Check DNS propagation
dig transio.org

# Check HTTPS certificate (after 15 minutes)
curl -I https://transio.org
```

## Environment Variables (Optional)

For Saxon-HE server integration:

1. Go to **Settings** → **Environment Variables**
2. Add variable:
   - **Name**: `SAXON_SERVER_URL`
   - **Value**: Your Saxon server URL (if hosted separately)

## Automatic Deployments

Every git push to `main` branch will:
1. Trigger automatic build on Cloudflare Pages
2. Deploy to production if build succeeds
3. Update https://transio.org

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Check deployment status
# Cloudflare will email you when complete
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
# http://localhost:5173

# Start Saxon server (optional, for XSLT 2.0/3.0)
./start-server.sh
```

## Build Commands

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

## Server Deployment (Optional)

Saxon-HE server is optional. The app works fully in browser with XSLT 1.0.

For XSLT 2.0/3.0 large file processing, host the server separately:

### Deploy to Cloud Provider

**Option 1: Railway.app (Free)**
1. Push `server/` to separate GitHub repo
2. Connect to Railway.app
3. Railway auto-detects Node.js
4. Set environment variable: `PORT=3001`

**Option 2: VPS (DigitalOcean, Linode)**
```bash
ssh user@your-server
git clone https://github.com/YOUR_USERNAME/transio.git
cd transio/server
npm install
npm start
```

**Option 3: Local Development Only**
```bash
# Run server on your machine
cd server
./install.sh  # One-time setup
./start-server.sh
```

## Monitoring

### Cloudflare Analytics

1. Go to your Pages project
2. Click **Analytics** tab
3. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Geography

### Error Tracking

Check browser console in production:
```javascript
// Errors are logged to console
// Use Sentry or similar for production error tracking
```

## Performance

### Cloudflare Optimizations (Automatic)

- ✅ Global CDN distribution
- ✅ HTTP/3 and QUIC
- ✅ Automatic asset compression
- ✅ Brotli compression
- ✅ Image optimization
- ✅ Minification
- ✅ Free SSL/TLS

### Build Optimizations

Already configured in `vite.config.ts`:
- Tree shaking
- Code splitting
- Lazy loading
- Asset optimization
- Source maps (dev only)

## Security

### Content Security Policy

Add to `wrangler.toml`:
```toml
[[headers]]
for = "/*"
[headers.values]
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

### HTTPS

- ✅ Automatic SSL/TLS certificate from Cloudflare
- ✅ Auto-renewal
- ✅ HSTS enabled
- ✅ TLS 1.3 supported

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Custom Domain Not Working

1. Verify nameservers at GoDaddy point to Cloudflare
2. Wait 24-48 hours for DNS propagation
3. Check Cloudflare DNS settings
4. Verify SSL/TLS mode is "Full" or "Full (strict)"

### Saxon Server Connection Fails

1. Check server is running: `curl http://localhost:3001/health`
2. Verify CORS headers in server
3. Check firewall rules
4. Update `SAXON_SERVER_URL` in Cloudflare Pages environment variables

### Assets Not Loading

1. Verify assets are in `src/assets/`
2. Check imports use `@/assets/` prefix
3. Build and check `dist/assets/` directory
4. Clear Cloudflare cache

## Rollback Deployment

```bash
# Cloudflare Pages keeps deployment history
# Go to Pages → Deployments → Click on previous successful deployment → Rollback
```

Or via git:
```bash
git revert HEAD
git push
```

## Cost

**Cloudflare Pages**: FREE
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month
- Free SSL certificate
- Free custom domain

**Domain (GoDaddy)**: $10-15/year

**Saxon Server** (optional):
- Railway.app: FREE (500 hours/month)
- VPS: $5-10/month

**Total**: $0-10/month

## Support

- **GitHub Issues**: https://github.com/YOUR_USERNAME/transio/issues
- **Website**: https://transio.org
- **Open Source**: MIT License - Free forever! 🎉

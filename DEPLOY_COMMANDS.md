# 🚀 Cloudflare Deployment Commands

## Quick Command Reference for deploying Transio to Cloudflare Pages

---

## 📋 Pre-Deployment Checklist

```bash
# 1. Clean up unnecessary files
chmod +x cleanup-docs.sh
./cleanup-docs.sh

# 2. Verify project structure
npm run build
# Should create dist/ folder with index.html

# 3. Check git status
git status
git remote -v
# Should show: https://github.com/bluesover/transio.org.git
```

---

## 🔧 Fix Build Issues (If Needed)

```bash
# If you get "npm ci" errors or dependency issues:
rm -rf node_modules package-lock.json
npm install
npm run build

# Commit the updated lock file
git add package-lock.json
git commit -m "Fix dependencies for Cloudflare deployment"
```

---

## 📤 Deploy to Cloudflare Pages

### Method 1: Via Cloudflare Dashboard (Recommended First Time)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main

# 2. Go to Cloudflare Dashboard:
# https://dash.cloudflare.com/
# → Workers & Pages → Create → Pages → Connect to Git
# → Select: bluesover/transio.org
# → Configure:
#    Project name: transio
#    Build command: npm run build
#    Build output: dist
# → Deploy
```

### Method 2: Via Wrangler CLI (For Updates)

```bash
# Install Wrangler globally (one time)
npm install -g wrangler

# Login to Cloudflare (one time)
wrangler login

# Build project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=transio

# Or create an npm script and use:
npm run deploy:cloudflare
```

---

## 🌐 Custom Domain Setup

After first successful deployment:

```bash
# In Cloudflare Dashboard:
# 1. Go to: Workers & Pages → transio → Custom domains
# 2. Click: Set up a custom domain
# 3. Enter: transio.org
# 4. Click: Activate domain
# 5. Repeat for: www.transio.org

# Cloudflare will automatically configure DNS
```

If domain is at GoDaddy:
```
Add CNAME records in GoDaddy DNS:
  @ → transio.pages.dev
  www → transio.pages.dev
```

---

## 🔐 GitHub Actions Auto-Deploy Setup

### Get Cloudflare Credentials:

```bash
# 1. Get API Token:
# https://dash.cloudflare.com/profile/api-tokens
# → Create Token → Edit Cloudflare Workers
# → Copy token

# 2. Get Account ID:
# https://dash.cloudflare.com/
# → Workers & Pages → Overview (right sidebar)
# → Copy Account ID
```

### Add GitHub Secrets:

```bash
# Go to: https://github.com/bluesover/transio.org/settings/secrets/actions
# Add these secrets:
# - CLOUDFLARE_API_TOKEN = (your API token)
# - CLOUDFLARE_ACCOUNT_ID = (your account ID)
```

### Test Auto-Deploy:

```bash
# Make any change
echo "# Test" >> README.md
git add .
git commit -m "Test auto-deploy"
git push origin main

# Check build status:
# https://github.com/bluesover/transio.org/actions
```

---

## 🔄 Sync Both Repositories (Private + Public)

```bash
# Make sync script executable
chmod +x sync-repos.sh

# Use it to push to both repos
./sync-repos.sh "Deploy to Cloudflare Pages"

# This pushes to:
# - https://github.com/bluesover/transio.git (private)
# - https://github.com/bluesover/transio.org.git (public)
```

---

## ✅ Verify Deployment

```bash
# 1. Check Cloudflare build logs:
# https://dash.cloudflare.com/ → Workers & Pages → transio → View build

# 2. Test deployment URL:
# https://transio.pages.dev

# 3. Test custom domain (after DNS propagates):
# https://transio.org
# https://www.transio.org

# 4. Check DNS propagation:
# https://dnschecker.org/ → enter "transio.org"
```

---

## 🐛 Troubleshooting Commands

### Build fails with dependency errors:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Clear Cloudflare Pages cache:
```bash
# In Cloudflare Dashboard:
# Workers & Pages → transio → Deployments → 
# Click ⋯ menu → Retry deployment
```

### Test build locally before deploying:
```bash
npm run build
npm run preview
# Visit: http://localhost:4173
```

### Check Wrangler version:
```bash
npx wrangler --version
# Should be 3.x or higher
```

### Re-authenticate Wrangler:
```bash
wrangler logout
wrangler login
```

---

## 📊 Monitor Deployment

```bash
# Check GitHub Actions:
# https://github.com/bluesover/transio.org/actions

# Check Cloudflare Analytics:
# https://dash.cloudflare.com/ → Workers & Pages → transio → Analytics

# View recent deployments:
# https://dash.cloudflare.com/ → Workers & Pages → transio → Deployments
```

---

## 🎉 Post-Deployment

```bash
# Test all features on production:
# ✓ XML/XSLT transformation (1.0, 2.0, 3.0)
# ✓ Version saving and loading
# ✓ Theme switching
# ✓ File import/export
# ✓ Project folder management
# ✓ Snippets library
# ✓ Keyboard shortcuts

# Share your project:
# - Tweet: "Check out Transio - open source XML/XSLT transformer at https://transio.org"
# - Post on Reddit: r/opensource, r/webdev
# - Submit to Product Hunt
```

---

## 📞 Need Help?

- **Build errors:** Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Issues:** https://github.com/bluesover/transio.org/issues

---

**Ready to deploy? Start with the checklist above! 🚀**

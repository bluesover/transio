# 🚀 Deploy Transio to Cloudflare Pages - Quick Start

This is your **quick reference guide** for deploying to Cloudflare Pages.

For **complete detailed instructions**, see [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

---

## ✅ What's Ready

Your application is **fully configured and ready to deploy**:

- ✅ `wrangler.toml` configured for Cloudflare Pages
- ✅ GitHub Actions workflow set up
- ✅ Build scripts tested and working
- ✅ All documentation completed
- ✅ Repository structure optimized
- ✅ Open source stack (100% MPL-2.0 compatible)

---

## 🎯 3-Step Deployment

### Step 1: Build Locally

```bash
npm run build
```

Verify `dist` folder exists with `index.html` and `assets/` directory.

### Step 2: Deploy via Cloudflare Dashboard (First Time)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git**
4. Select your repository: `bluesover/transio.org` (or `bluesover/transio`)
5. Configure:
   ```
   Project name: transio
   Build command: npm run build
   Build output directory: dist
   ```
6. Click **Save and Deploy**
7. Wait 2-5 minutes
8. You're live at `https://transio.pages.dev` ✅

### Step 3: Custom Domain (transio.org)

1. Cloudflare Dashboard → **Add a site** → Enter `transio.org`
2. Copy the 2 Cloudflare nameservers shown
3. Go to GoDaddy → Your domain → **DNS** → **Nameservers**
4. Change to "Custom" and paste Cloudflare nameservers
5. Wait 1-24 hours for propagation
6. Cloudflare Pages → Your project → **Custom domains** → Add `transio.org`
7. Done! Live at `https://transio.org` ✅

---

## 🤖 Enable Auto-Deploy (Optional)

To auto-deploy on every git push:

### 1. Get Cloudflare Credentials

**Account ID:**
- Cloudflare Dashboard → Any site → Right sidebar → Copy "Account ID"

**API Token:**
- Dashboard → My Profile → API Tokens → Create Token
- Template: "Cloudflare Pages - Deploy"
- Copy the token (shown once!)

### 2. Add to GitHub Secrets

Repository → Settings → Secrets and variables → Actions:

```
Name: CLOUDFLARE_API_TOKEN
Value: [paste token]

Name: CLOUDFLARE_ACCOUNT_ID  
Value: [paste account ID]
```

### 3. Test

```bash
git add .
git commit -m "Test auto-deploy"
git push origin main
```

Watch it deploy automatically in the **Actions** tab! 🎉

---

## 📋 Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy

# Start optional server (XSLT 2.0/3.0 enhancement)
cd server && ./start-server.sh
```

---

## 🔧 Configuration Files

All configuration is already set up:

### `wrangler.toml`
```toml
name = "transio"
compatibility_date = "2024-12-13"

[assets]
directory = "./dist"
```

### `.github/workflows/deploy-cloudflare.yml`
Already configured for automatic deployments with GitHub Actions.

### `.github/workflows/sync-repos.yml`
Automatically syncs from private `transio` repo to public `transio.org` repo.

---

## 🆘 Troubleshooting

### Build fails with "npm ci sync error"
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update lock file"
git push
```

### Wrangler error: "No assets directory"
Use `wrangler pages deploy` (not `wrangler deploy`):
```bash
npx wrangler pages deploy dist --project-name=transio
```

### Custom domain shows 522 error
Wait for nameserver propagation (1-24 hours). Check with:
```bash
dig NS transio.org
```

---

## 📚 Full Documentation

- **[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)** - Complete step-by-step guide
- **[DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md)** - Deployment checklist and status
- **[README.md](./README.md)** - Application features and usage
- **[PRD.md](./PRD.md)** - Technical specifications

---

## ✨ What Makes This Deployment Special

### 100% Open Source
- All code: MIT/MPL-2.0 licensed
- Saxon-JS: MPL-2.0 (fully open source)
- All dependencies: Open source compatible
- **No proprietary software whatsoever** ✅

### Privacy-First
- All processing happens in the browser
- Zero data collection
- Zero external API calls (except optional Saxon server you control)
- File System API keeps files on user's computer

### Free to Deploy & Run
- Cloudflare Pages: Free tier (unlimited sites)
- No build minutes limit on free tier
- Global CDN included
- Free SSL certificate
- Can be deployed by anyone, anywhere, for free

### Self-Hostable
- Static files - host anywhere
- Optional server is also open source
- Full control over your data
- Fork and customize freely

---

## 🎉 Ready to Deploy!

**You have everything you need. Choose your path:**

**Path A: Quick Deploy (Recommended)**
1. Cloudflare Dashboard → Connect GitHub → Deploy
2. Takes 5 minutes
3. Live at `transio.pages.dev`

**Path B: Command Line**
1. `npm run deploy`
2. Takes 2 minutes
3. Live at `transio.pages.dev`

**Both paths work perfectly. Dashboard is easier for first time.**

---

## 📞 Need Help?

1. Check [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for detailed instructions
2. Review [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) for common issues
3. Visit Cloudflare Community: https://community.cloudflare.com

---

**Good luck! Your app is ready to go live. 🚀**

*Everything is configured. Just follow the 3 steps above.*

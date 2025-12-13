# 🚀 Deploy Transio to Cloudflare Pages - Quick Guide

## ✅ What's Been Fixed

1. **Wrangler Configuration** - Updated `wrangler.toml` with correct Pages configuration
2. **Build Script** - Added `npm run deploy` command for one-step deployment
3. **Documentation** - Created comprehensive deployment guide in DEPLOYMENT.md
4. **Cleanup** - Removed unnecessary documentation files

## 🎯 Deploy Right Now (3 Steps)

### Step 1: Build the Project

```bash
npm run build
```

**Expected output:** `dist` folder created with `index.html` and `assets/` directory

### Step 2: Login to Cloudflare (First Time Only)

```bash
npx wrangler login
```

This opens a browser window to authenticate with Cloudflare.

### Step 3: Deploy

```bash
npx wrangler pages deploy dist --project-name=transio
```

Or use the shortcut:

```bash
npm run deploy
```

**That's it!** Your site will be live at `https://transio.pages.dev`

---

## 🌐 Custom Domain Setup (transio.org)

After the initial deployment works, follow these steps to use your custom domain:

### 1. Add Domain to Cloudflare

- Go to [dash.cloudflare.com](https://dash.cloudflare.com)
- Add site: `transio.org`
- Choose Free plan

### 2. Update Nameservers at GoDaddy

Cloudflare will give you 2 nameservers. Update them in GoDaddy:

1. Go to GoDaddy → My Products → Domains
2. Click `transio.org` → DNS → Nameservers
3. Change to "Custom" and paste Cloudflare nameservers
4. Wait 1-24 hours for propagation

### 3. Connect Domain in Cloudflare

- Go to Workers & Pages → transio project
- Custom domains tab → "Set up a custom domain"
- Enter: `transio.org`
- Click Continue

Done! Site will be live at `https://transio.org`

---

## 🤖 GitHub Actions Auto-Deploy (Optional)

To automatically deploy on every git push:

### 1. Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: transio
          directory: dist
```

### 2. Get Cloudflare Credentials

**Account ID:**
- Cloudflare Dashboard → Any site → Right sidebar → Copy "Account ID"

**API Token:**
- Dashboard → My Profile → API Tokens → Create Token
- Use template: "Cloudflare Pages - Deploy"
- Copy the token (shown once!)

### 3. Add to GitHub Secrets

Repository → Settings → Secrets and variables → Actions → New secret:

```
Name: CLOUDFLARE_API_TOKEN
Value: [paste token]

Name: CLOUDFLARE_ACCOUNT_ID
Value: [paste account ID]
```

**Now every push to `main` automatically deploys!** 🎉

---

## 📁 Project Structure

After running cleanup, you have:

```
transio/
├── src/                      # Application source code
├── server/                   # Optional Saxon-HE server
├── dist/                     # Build output (generated)
├── .github/workflows/        # GitHub Actions (if using)
├── index.html               # Entry point
├── package.json             # Dependencies
├── wrangler.toml            # Cloudflare configuration
├── README.md                # User documentation
├── DEPLOYMENT.md            # Full deployment guide
├── CLOUDFLARE_FIX.md       # Error troubleshooting
├── PRD.md                   # Product requirements
├── LICENSE                  # MIT License
└── sync-repos.sh            # Repo sync utility
```

---

## 🧹 Clean Up Unnecessary Files

Before deploying, clean up old documentation:

```bash
chmod +x cleanup-final.sh
./cleanup-final.sh
```

This removes:
- ❌ CLOUDFLARE_COMPLETE_GUIDE.md
- ❌ CLOUDFLARE_SETUP.md
- ❌ DEPLOYMENT_STATUS.md
- ❌ DEPLOY_COMMANDS.md
- ❌ START_HERE.md
- ❌ Old cleanup scripts

---

## ⚠️ Common Errors & Fixes

### Error: "If uploading directory of assets..."

**Problem:** Using wrong wrangler command

**Fix:** Use `wrangler pages deploy` not `wrangler deploy`
```bash
npx wrangler pages deploy dist --project-name=transio
```

### Error: "npm ci can only install when package.json and package-lock.json are in sync"

**Problem:** Lock file out of sync

**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Error: "Project 'transio' not found"

**Problem:** Project doesn't exist yet

**Fix:** Create it via Cloudflare Dashboard first:
1. Dashboard → Workers & Pages → Create application → Pages
2. Connect to Git → Select repo
3. Deploy once via dashboard
4. Then use wrangler CLI for future deploys

### Build Fails: "dist directory is empty"

**Problem:** Build command failed

**Fix:**
```bash
# Check build works locally
npm run build
ls dist/   # Should show files

# Check vite.config.ts has correct outDir
```

---

## 📖 Documentation Reference

- **[README.md](./README.md)** - Quick start and features overview
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide with all options
- **[CLOUDFLARE_FIX.md](./CLOUDFLARE_FIX.md)** - Troubleshooting wrangler errors
- **[PRD.md](./PRD.md)** - Product requirements and design decisions

---

## ✅ Pre-Deployment Checklist

- [ ] `npm install` completed successfully
- [ ] `npm run build` creates dist folder with files
- [ ] `npx wrangler login` authenticated
- [ ] Cloudflare account created
- [ ] Repository pushed to GitHub (if using GitHub Actions)
- [ ] Unnecessary files cleaned up with `./cleanup-final.sh`

---

## 🎉 Deploy Command

```bash
npm run deploy
```

**That's the only command you need!** It builds and deploys in one step.

---

## 🆘 Need Help?

1. Check [CLOUDFLARE_FIX.md](./CLOUDFLARE_FIX.md) for error solutions
2. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
3. Review Cloudflare Pages docs: https://developers.cloudflare.com/pages

---

**Good luck with your deployment! 🚀**

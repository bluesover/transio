# ☁️ Quick Cloudflare Pages Setup

## 🎯 Goal
Deploy Transio to **https://transio.org** using Cloudflare Pages

---

## 🚀 3-Step Setup

### Step 1️⃣: Local Build Test (macOS Terminal)

```bash
# Navigate to project
cd ~/path/to/transio

# Clean install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Should see: dist/ folder created ✅
```

---

### Step 2️⃣: Push to GitHub

```bash
# Check which remote you're using
git remote -v

# Should show: https://github.com/bluesover/transio.org.git
# If not, change to public repo:
git remote set-url origin https://github.com/bluesover/transio.org.git

# Push changes
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```

---

### Step 3️⃣: Cloudflare Pages Setup

1. **Login:** https://dash.cloudflare.com/
2. **Navigate:** Workers & Pages → Create application → Pages → Connect to Git
3. **Select repo:** `bluesover/transio.org`
4. **Configure:**
   - Project name: `transio`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave empty)
5. **Deploy:** Click "Save and Deploy"

---

## 🌐 Custom Domain (transio.org)

### After first deploy succeeds:

1. In Cloudflare Pages → transio → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `transio.org` → Click Continue
4. Cloudflare will auto-configure DNS (CNAME)
5. Repeat for `www.transio.org`

**⏱️ Wait 5-15 minutes for DNS propagation**

---

## 🔐 GitHub Actions Auto-Deploy (Optional)

### Get Cloudflare Credentials:

1. **API Token:**
   - Cloudflare → My Profile → API Tokens → Create Token
   - Template: "Edit Cloudflare Workers"
   - Copy token

2. **Account ID:**
   - Cloudflare → Workers & Pages → Overview
   - Right sidebar: Copy Account ID

### Add to GitHub Secrets:

Go to: https://github.com/bluesover/transio.org/settings/secrets/actions

Add these secrets:
- `CLOUDFLARE_API_TOKEN` = (your token)
- `CLOUDFLARE_ACCOUNT_ID` = (your account ID)

**✅ Now every push to `main` auto-deploys!**

---

## ✅ Verify Deployment

- [ ] Build completes without errors
- [ ] Visit: https://transio.pages.dev (works)
- [ ] Visit: https://transio.org (after DNS setup)
- [ ] HTTPS works (green padlock)
- [ ] All features work (transform, save versions, etc.)

---

## 🐛 Common Issues

### Build Error: "npm ci" fails
```bash
# Fix locally:
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix dependencies"
git push
```

### "No build output directory"
- Check Cloudflare build settings
- Build output: `dist` (not `/dist`)

### Domain not working
- Wait 15-30 minutes for DNS propagation
- Check: https://dnschecker.org/ → enter `transio.org`
- Verify CNAME points to `transio.pages.dev`

---

## 📞 Need Help?

- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Check build logs in Cloudflare dashboard
- GitHub Actions logs: https://github.com/bluesover/transio.org/actions

---

**That's it! 🎉**

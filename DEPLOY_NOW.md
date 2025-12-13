# 🚀 Deploy in 5 Minutes - Quick Start

Choose your preferred free hosting platform and follow the steps:

---

## 🟢 Option 1: GitHub Pages (Easiest - Recommended)

### Prerequisites
- GitHub account (free at github.com)
- Git installed
- Node.js installed

### Deploy Steps

```bash
# 1. Build the app
npm run build

# 2. Install deployment tool
npm install -g gh-pages

# 3. Initialize git (if not already done)
git init
git add .
git commit -m "Initial deployment"

# 4. Create GitHub repository at github.com/new
# Name it: xslt-transformer (or any name you want)
# Make it PUBLIC for free hosting

# 5. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/xslt-transformer.git
git branch -M main
git push -u origin main

# 6. Deploy to GitHub Pages
gh-pages -d dist
```

### ✅ Your app is live!
- URL: `https://YOUR_USERNAME.github.io/xslt-transformer/`
- Updates: Run `npm run build && gh-pages -d dist` to redeploy

### Enable GitHub Pages (if needed)
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: Select branch **gh-pages**
4. Click **Save**
5. Wait 2-3 minutes

---

## 🔵 Option 2: Netlify (Drag & Drop - No Git Required)

### Steps

```bash
# 1. Build the app
npm run build
```

### 2. Deploy via Drag & Drop
1. Go to: **https://app.netlify.com/drop**
2. Drag your `dist` folder onto the page
3. Done! Your site is instantly live

### ✅ Your app is live!
- URL: `https://random-name-12345.netlify.app/`
- Custom name: Click "Site settings" → "Change site name"

### Alternative: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## 🟣 Option 3: Vercel (CLI - Fastest)

### Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build and deploy
npm run build
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project name? **xslt-transformer**
- In which directory is your code? **.**
- Want to override settings? **N**

### ✅ Your app is live!
- URL: `https://xslt-transformer.vercel.app/`
- Dashboard: https://vercel.com/dashboard

---

## 🟠 Option 4: Cloudflare Pages (Unlimited Bandwidth)

### Steps

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Build the app
npm run build

# 3. Login to Cloudflare
wrangler login

# 4. Deploy
wrangler pages deploy dist --project-name=xslt-transformer
```

### ✅ Your app is live!
- URL: `https://xslt-transformer.pages.dev/`

---

## 🟤 Option 5: Surge (Simplest CLI)

### Steps

```bash
# 1. Install Surge
npm install -g surge

# 2. Build and deploy
npm run build
cd dist
surge
```

Follow prompts:
- Email: Your email
- Password: Create password
- Domain: `xslt-transformer.surge.sh` (or custom)

### ✅ Your app is live!
- URL: `https://xslt-transformer.surge.sh/`

---

## 📦 What Gets Deployed?

The `dist/` folder contains:
- ✅ Optimized JavaScript bundles (~500KB)
- ✅ Minified CSS
- ✅ HTML entry point
- ✅ All required assets

**Total size:** ~2MB (includes Saxon-JS for XSLT 2.0/3.0)

---

## 🔧 Troubleshooting

### Build fails?
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Blank page after deployment?
Check `vite.config.ts` - set the correct base path:

**For GitHub Pages:**
```typescript
base: '/xslt-transformer/', // Replace with your repo name
```

**For Netlify/Vercel/Others:**
```typescript
base: './', // Use relative paths
```

Then rebuild and redeploy:
```bash
npm run build
# Redeploy using your chosen method
```

### "Module not found" errors?
Make sure you built before deploying:
```bash
npm run build
```

---

## 🌐 Share Your App

Once deployed, share the URL with anyone!

**Features users get:**
- ✅ Free to use
- ✅ No account needed
- ✅ All data stored locally (privacy)
- ✅ Works offline after first load
- ✅ XSLT 1.0, 2.0, 3.0 support
- ✅ Version control
- ✅ Project folder management (Chrome/Edge)

---

## 📊 Custom Domain (Optional)

All platforms support custom domains for free!

### Buy a domain
- Namecheap: ~$10/year
- GoDaddy: ~$12/year
- Cloudflare: ~$10/year (includes DNS)

### Configure DNS

**For GitHub Pages:**
1. Add CNAME record: `www` → `YOUR_USERNAME.github.io`
2. Add A records:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. GitHub Settings → Pages → Custom domain

**For Netlify:**
1. Netlify Dashboard → Domain settings → Add custom domain
2. Add DNS records shown by Netlify

**For Vercel:**
1. Vercel Dashboard → Project Settings → Domains
2. Add domain and update DNS

---

## 🔒 Security & Privacy

### Your deployed app:
- ✅ **No backend** - Pure frontend
- ✅ **No database** - All data in user's browser
- ✅ **No tracking** - Zero analytics by default
- ✅ **HTTPS** - All hosts provide free SSL
- ✅ **No cookies** - Uses IndexedDB for storage

### User data:
- Stored in browser's IndexedDB (local)
- File System API for folder access (Chrome/Edge only)
- Nothing uploaded to any server
- Users can clear data anytime

---

## 📈 Monitor Usage (Optional)

Want to see how many people use your app?

### Add Privacy-Friendly Analytics

**Plausible Analytics** (Recommended - GDPR compliant):
1. Sign up at plausible.io (€9/month or self-host for free)
2. Add to `index.html` before `</body>`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

**GoatCounter** (Free & Open Source):
1. Sign up at goatcounter.com (100% free)
2. Add to `index.html` before `</body>`:
```html
<script data-goatcounter="https://yourcode.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

Both options:
- ✅ No cookies
- ✅ GDPR compliant
- ✅ Privacy-focused
- ✅ Lightweight

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** - Try all features in production
2. **Share the URL** - Send to friends, colleagues
3. **Create launcher files** - Generate `.bat` and `.sh` launchers
4. **Add to README** - Update deployment URL in documentation
5. **Set up custom domain** (optional)
6. **Add analytics** (optional)

---

## 💡 Tips

### Faster Deployments
- Use CI/CD (GitHub Actions)
- Auto-deploy on git push
- See `DEPLOYMENT_GUIDE.md` for GitHub Actions setup

### Better Performance
- All hosts provide:
  - Global CDN
  - Automatic compression
  - HTTP/2 support
  - Caching headers

### Cost Analysis
| Platform | Bandwidth | Build Minutes | Storage | Cost |
|----------|-----------|---------------|---------|------|
| GitHub Pages | Unlimited* | N/A | 1GB | FREE |
| Netlify | 100GB/mo | 300/mo | Unlimited | FREE |
| Vercel | Unlimited | Unlimited | Unlimited | FREE |
| Cloudflare | Unlimited | 500/mo | Unlimited | FREE |
| Surge | Unlimited | N/A | Unlimited | FREE |

*Public repos only for GitHub Pages

---

## 🆘 Need Help?

**Common Issues:**
1. Build fails → Clear node_modules, reinstall
2. Blank page → Check base path in vite.config.ts
3. CORS errors → Don't use file:// protocol
4. Folder save not working → Use Chrome or Edge

**Full Documentation:**
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete hosting guide
- [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md) - Run locally
- [README.md](./README.md) - Full app documentation

---

## ✅ Success!

You've deployed a free XML/XSLT transformer that:
- ✅ Costs $0 to run
- ✅ Stores all data locally on user's PC
- ✅ Requires no backend or database
- ✅ Works offline after first load
- ✅ Provides professional features
- ✅ Respects user privacy

**Enjoy your deployed app! 🎉**

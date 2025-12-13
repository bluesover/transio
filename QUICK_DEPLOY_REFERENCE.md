# ⚡ Quick Deploy Reference Card

One-page cheat sheet for deploying your XML/XSLT Transformer.

---

## 🏗️ Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview

# Development server
npm run dev
```

---

## 🌐 Deploy Commands by Platform

### GitHub Pages
```bash
# One-time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main

# Deploy (every time)
npm run deploy
```
**URL:** `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

### Netlify (Drag & Drop)
```bash
npm run build
# Then drag 'dist' folder to netlify.com/drop
```
**URL:** `https://random-name.netlify.app/`

---

### Netlify (CLI)
```bash
# Install CLI (once)
npm install -g netlify-cli

# Deploy
netlify login
netlify deploy --prod --dir=dist
```
**URL:** `https://YOUR_SITE.netlify.app/`

---

### Vercel
```bash
# Install CLI (once)
npm install -g vercel

# Deploy
vercel --prod
```
**URL:** `https://YOUR_PROJECT.vercel.app/`

---

### Cloudflare Pages
```bash
# Install CLI (once)
npm install -g wrangler

# Deploy
npm run build
wrangler login
wrangler pages deploy dist --project-name=xslt-transformer
```
**URL:** `https://xslt-transformer.pages.dev/`

---

### Surge
```bash
# Install CLI (once)
npm install -g surge

# Deploy
npm run build
cd dist
surge
```
**URL:** `https://your-subdomain.surge.sh/`

---

## 🔧 Troubleshooting Commands

### Clear and Rebuild
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Check Build Output
```bash
ls -lh dist/
# Should see index.html and assets/
```

### Test Locally Before Deploy
```bash
npm run preview
# Open http://localhost:4173
```

### View Bundle Size
```bash
du -sh dist/
# Should be ~2-3 MB total
```

---

## 📝 Configuration Files

### vite.config.ts
```typescript
export default defineConfig({
  base: './',  // For most hosts
  // OR
  base: '/repo-name/',  // For GitHub Pages only
})
```

### package.json (deploy script)
```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

---

## ✅ Quick Checklist

Before deploying:
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works
- [ ] No console errors
- [ ] Transform works

After deploying:
- [ ] URL loads
- [ ] Transform works
- [ ] Data persists
- [ ] Mobile works

---

## 🆘 Common Errors

| Error | Fix |
|-------|-----|
| `npm not found` | Install Node.js from nodejs.org |
| `Build failed` | Run `rm -rf node_modules && npm install` |
| `Blank page` | Check `base:` in vite.config.ts |
| `404 errors` | Make sure you built before deploy |
| `CORS errors` | Don't use `file://` - use HTTPS hosting |

---

## 📊 Platform Comparison

| Platform | Free Bandwidth | Build Time | CLI | Auto-Deploy |
|----------|----------------|------------|-----|-------------|
| **GitHub Pages** | Unlimited* | N/A | ✅ | ✅ Actions |
| **Netlify** | 100GB/mo | 300min/mo | ✅ | ✅ Git |
| **Vercel** | Unlimited | Unlimited | ✅ | ✅ Git |
| **Cloudflare** | Unlimited | 500/mo | ✅ | ✅ Git |
| **Surge** | Unlimited | N/A | ✅ | ❌ |

*Public repos only

---

## 🔐 Security Headers (Automatic)

All platforms include:
- ✅ HTTPS/SSL (automatic)
- ✅ Compression (gzip/brotli)
- ✅ Global CDN
- ✅ HTTP/2
- ✅ DDoS protection

---

## 📚 More Info

| Guide | Purpose |
|-------|---------|
| [SIMPLE_DEPLOY_GUIDE.md](./SIMPLE_DEPLOY_GUIDE.md) | For non-technical users |
| [DEPLOY_NOW.md](./DEPLOY_NOW.md) | Quick 5-min guide |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Complete reference |
| [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) | Testing checklist |

---

## 💾 Backup Your Work

```bash
# Create backup
cp -r . ../xslt-transformer-backup

# Or commit to Git
git add .
git commit -m "Backup before deploy"
git push
```

---

**Print this page and keep it handy!** 📄

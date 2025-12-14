# 🚀 START HERE - Transio Deployment Guide

Welcome! This guide will help you deploy Transio to Cloudflare Pages in under 30 minutes.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Test Locally (2 minutes)

```bash
# Make sure you're in the project directory
cd /path/to/transio

# Install dependencies
npm install

# Build the project
npm run build

# Preview the build (optional)
npm run preview
```

**✅ Success:** `dist` folder created, app works at http://localhost:4173

---

### Step 2: Deploy to Cloudflare Pages (10 minutes)

**Option A: Dashboard (Recommended for First Deploy)**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** → **Create** → **Pages**
3. Connect Git → Select GitHub → Choose `bluesover/transio.org`
4. Configure:
   - Project name: `transio`
   - Build command: `npm run build`
   - Build output: `dist`
5. Click **Save and Deploy**

**Option B: Via GitHub Actions (After Initial Setup)**

1. Get Cloudflare API Token: [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Get Account ID: In your Cloudflare project settings
3. Add to GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push to main branch - auto-deploys!

**✅ Success:** Site live at https://transio.pages.dev

---

### Step 3: Add Custom Domain (10 minutes)

**In Cloudflare:**
1. Project → **Custom domains** → **Set up a custom domain**
2. Enter: `transio.org`

**In GoDaddy:**
1. Go to [DNS Management](https://dcc.godaddy.com/control/dns)
2. Add CNAME records:
   ```
   @ → transio.pages.dev
   www → transio.pages.dev
   ```
3. Wait 5-30 minutes for DNS propagation

**✅ Success:** Site live at https://transio.org

---

## 📖 Detailed Guides

Choose your path:

| Guide | Best For | Time |
|-------|----------|------|
| [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) | First-time setup | 15 min |
| [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) | Step-by-step checklist | 20 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Comprehensive guide | 30 min |
| [CURRENT_STATUS.md](./CURRENT_STATUS.md) | Project overview | 5 min |

---

## 🎯 What You're Deploying

**Transio** - Professional XML/XSLT Transformer

**Features:**
- XSLT 1.0, 2.0, 3.0 support
- Code editors with 13 themes
- Version control system
- File import/export
- 40+ XSLT snippets
- Mobile responsive
- 100% open source (MPL-2.0)
- Privacy-first (all local processing)

**Tech Stack:**
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Saxon-JS for XSLT 2.0/3.0
- shadcn/ui components

---

## 📁 Important Files

```
Project Root/
├── START_HERE.md              ← You are here
├── CLOUDFLARE_SETUP.md        ← Dashboard setup guide
├── DEPLOY_CHECKLIST.md        ← Complete checklist
├── DEPLOYMENT.md              ← Full documentation
├── CURRENT_STATUS.md          ← Project status
├── README.md                  ← User documentation
├── PRD.md                     ← Requirements doc
├── wrangler.toml              ← Cloudflare config
├── package.json               ← Dependencies
└── .github/workflows/
    └── deploy-cloudflare.yml  ← Auto-deploy workflow
```

---

## ✅ Pre-Flight Checklist

Before deploying, verify:

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Git configured
- [ ] GitHub repository exists
- [ ] Cloudflare account created
- [ ] Domain registered (optional)

---

## 🆘 Common Issues

### Build Fails
**Problem:** `npm run build` fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Missing entry-point" Error in Cloudflare
**Problem:** Deployment fails with missing entry-point

**Solution:** Don't use `wrangler deploy` - use Cloudflare Pages dashboard or GitHub Actions

### DNS Not Working
**Problem:** transio.org doesn't load

**Solution:** Wait 30 minutes for DNS propagation, verify CNAME records

---

## 💻 Local Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Saxon-HE Server (Optional, for XSLT 2.0/3.0)
cd server
npm install
./start-server.sh    # Mac/Linux
npm start            # Windows
```

---

## 🌐 After Deployment

Your app will be available at:
- **Primary:** https://transio.org (after DNS)
- **Cloudflare:** https://transio.pages.dev (immediate)

**Test these features:**
- [ ] XML and XSLT editors load
- [ ] Transform works
- [ ] Version save/load works
- [ ] Theme switching works
- [ ] Import/export works
- [ ] Mobile layout works

---

## 🎉 Success!

Once deployed:
1. Every push to `main` auto-deploys (if GitHub Actions configured)
2. Check deployments at: Cloudflare Dashboard → Workers & Pages → transio
3. Monitor performance: Cloudflare Analytics

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [GoDaddy DNS Help](https://www.godaddy.com/help/manage-dns-680)

---

## 🚀 Ready to Deploy?

1. **If this is your first deploy:**
   - Read [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)
   - Follow the dashboard method

2. **If you want detailed steps:**
   - Use [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)
   - Check off each item

3. **If you want everything:**
   - Read [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Comprehensive guide with troubleshooting

---

**Need help?** Open an issue: https://github.com/bluesover/transio.org/issues

**Let's deploy! 🚀**

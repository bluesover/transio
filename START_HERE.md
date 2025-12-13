# 🚀 START HERE - Transio Deployment

## Quick deployment guide for your Transio XML/XSLT Transformer

---

## ✅ What You Have

- ✓ Complete Transio application (XML/XSLT transformer)
- ✓ XSLT 1.0/2.0/3.0 support
- ✓ Version control system
- ✓ Project management with File System API
- ✓ 40+ XSLT snippets library
- ✓ Optional Saxon-HE server for enhanced processing
- ✓ GitHub repository setup (transio.org - public)
- ✓ Cloudflare Pages ready configuration
- ✓ GitHub Actions auto-deploy workflow
- ✓ MPL-2.0 open source license

---

## 🎯 Your Goal

Deploy to: **https://transio.org** (your custom domain)

---

## 📖 Choose Your Guide

### 1. **FASTEST** - Quick Setup (5 minutes)
→ Read: [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md)
- 3 simple steps
- Perfect for first deployment
- Gets you live quickly

### 2. **COMPLETE** - Detailed Guide (15 minutes)
→ Read: [`CLOUDFLARE_COMPLETE_GUIDE.md`](./CLOUDFLARE_COMPLETE_GUIDE.md)
- Step-by-step instructions
- Troubleshooting included
- Custom domain setup
- GitHub Actions configuration

### 3. **REFERENCE** - Command Cheat Sheet
→ Read: [`DEPLOY_COMMANDS.md`](./DEPLOY_COMMANDS.md)
- Quick command reference
- Copy-paste commands
- For repeat deployments

---

## 🏃 Quick Start (TL;DR)

```bash
# 1. Clean up unnecessary files
chmod +x cleanup-docs.sh
./cleanup-docs.sh

# 2. Build locally to test
npm install
npm run build

# 3. Push to GitHub
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main

# 4. Go to Cloudflare Dashboard
# https://dash.cloudflare.com/
# → Workers & Pages → Create → Pages → Connect Git
# → Select: bluesover/transio.org
# → Build command: npm run build
# → Build output: dist
# → Deploy!

# 5. Add custom domain (after first deploy)
# → Custom domains → Set up domain → transio.org
```

---

## 📂 Project Structure

```
transio/
├── src/                          # Application source code
│   ├── App.tsx                   # Main app component
│   ├── components/               # React components
│   ├── lib/                      # Utilities and processors
│   └── assets/                   # Images and static files
├── server/                       # Optional Saxon-HE server
├── .github/workflows/            # GitHub Actions
│   ├── deploy-cloudflare.yml    # Auto-deployment
│   └── sync-repos.yml           # Repo syncing
├── dist/                         # Build output (created by npm run build)
├── index.html                    # Entry HTML
├── package.json                  # Dependencies
├── vite.config.ts               # Build configuration
├── wrangler.toml                # Cloudflare config
└── Documentation:
    ├── README.md                 # User guide
    ├── DEPLOYMENT.md            # Deployment details
    ├── PRD.md                    # Product requirements
    ├── START_HERE.md            # ← You are here
    ├── CLOUDFLARE_SETUP.md      # Quick setup
    ├── CLOUDFLARE_COMPLETE_GUIDE.md  # Detailed guide
    └── DEPLOY_COMMANDS.md        # Command reference
```

---

## 🔧 Before Deploying

### Cleanup unnecessary files:
```bash
chmod +x cleanup-docs.sh
./cleanup-docs.sh
```

This removes:
- ❌ Duplicate documentation
- ❌ Netlify/Vercel workflows (we only use Cloudflare)
- ❌ Unused deployment scripts

Keeps:
- ✓ Essential documentation (README, DEPLOYMENT, PRD)
- ✓ Cloudflare deployment workflow
- ✓ License and configuration files

---

## 🐛 Common Issues

### Build fails with dependency errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
git add package-lock.json
git commit -m "Fix dependencies"
git push
```

### Domain not working
- Wait 15-30 minutes for DNS propagation
- Check: https://dnschecker.org/
- Verify CNAME: transio.org → transio.pages.dev

### Can't find build output
- Build output directory must be exactly: `dist`
- Not `/dist` or `./dist`

---

## ☁️ Cloudflare Pages Settings

**Exact values to use:**

| Setting | Value |
|---------|-------|
| Project name | `transio` |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (empty) |
| Node version | 18 |

---

## 🔐 GitHub Actions Secrets

For auto-deployment, add these secrets:
- `CLOUDFLARE_API_TOKEN` - Get from Cloudflare → Profile → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` - Get from Cloudflare → Workers & Pages → Account ID

Add at: https://github.com/bluesover/transio.org/settings/secrets/actions

---

## ✅ Deployment Checklist

Before going live:

- [ ] Local build works (`npm run build` creates `dist/`)
- [ ] Code pushed to GitHub (public repo: transio.org)
- [ ] Cloudflare Pages project created
- [ ] Build settings configured correctly
- [ ] First deployment successful
- [ ] App loads at transio.pages.dev
- [ ] Custom domain added (transio.org)
- [ ] DNS configured (CNAME records)
- [ ] HTTPS working (green padlock)
- [ ] All features tested on production
- [ ] GitHub Actions secrets added (optional)
- [ ] Auto-deploy tested (optional)

---

## 🎉 After Deployment

Your app is live! Test everything:

- [ ] XML/XSLT transformation works (all 3 versions)
- [ ] Version save/load persists
- [ ] Theme switching (Light/Dark/Black)
- [ ] File import/export
- [ ] Project folder management (Chrome/Edge)
- [ ] Snippets library accessible
- [ ] Keyboard shortcuts functional
- [ ] Mobile layout responsive
- [ ] Server config (if using server)
- [ ] Activity log tracks operations

---

## 📞 Help & Resources

### Documentation in This Repo
1. **User Guide:** [`README.md`](./README.md) - How to use Transio
2. **Product Details:** [`PRD.md`](./PRD.md) - Features and design
3. **Deployment:** [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Full deployment docs
4. **Quick Setup:** [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md) - 3-step guide
5. **Complete Guide:** [`CLOUDFLARE_COMPLETE_GUIDE.md`](./CLOUDFLARE_COMPLETE_GUIDE.md) - Detailed walkthrough
6. **Commands:** [`DEPLOY_COMMANDS.md`](./DEPLOY_COMMANDS.md) - Copy-paste commands

### External Resources
- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Actions:** https://docs.github.com/en/actions
- **Vite Docs:** https://vitejs.dev/

### Support
- **GitHub Issues:** https://github.com/bluesover/transio.org/issues
- **Cloudflare Community:** https://community.cloudflare.com/

---

## 🎯 Next Steps

1. **Read:** [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md) for quick start
2. **Or:** [`CLOUDFLARE_COMPLETE_GUIDE.md`](./CLOUDFLARE_COMPLETE_GUIDE.md) for detailed guide
3. **Deploy:** Follow the steps
4. **Test:** Verify everything works
5. **Share:** Tell the world about your app!

---

**Ready? Start with the quick setup guide! 🚀**

[→ Go to Quick Setup Guide](./CLOUDFLARE_SETUP.md)

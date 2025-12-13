# 🚀 Deployment Quick Start

Get Transio deployed to production in 5 minutes!

## ⚡ Fast Track - Cloudflare Pages

### Step 1: Get Credentials (2 min)
1. Login: https://dash.cloudflare.com/
2. Copy **Account ID** from sidebar
3. Create **API Token**: Profile → API Tokens → Create Token
   - Template: "Edit Cloudflare Workers"
   - Or custom with `Cloudflare Pages: Edit` permission
4. Copy token (you won't see it again!)

### Step 2: Add to GitHub (1 min)
1. Your repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**:
   ```
   Name: CLOUDFLARE_API_TOKEN
   Value: [your token]
   ```
3. **New repository secret**:
   ```
   Name: CLOUDFLARE_ACCOUNT_ID
   Value: [your account ID]
   ```

### Step 3: Create Cloudflare Project (2 min)
1. Cloudflare → **Pages** → **Create a project**
2. **Connect to Git** → GitHub → Authorize
3. Select your repository
4. Settings:
   - **Project name**: `transio`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output**: `dist`
5. **Save and Deploy**

### Step 4: Deploy! (30 seconds)
```bash
git push origin main
```

Watch deployment: GitHub → **Actions** tab

**Done!** 🎉 Your site is live at `transio.pages.dev`

---

## 🌐 Add Custom Domain (transio.org)

### In Cloudflare Pages:
1. Your project → **Custom domains**
2. **Set up a custom domain** → Enter `transio.org`
3. Note the CNAME target shown

### In GoDaddy DNS:
1. Domain → **DNS Management**
2. Add records:
   ```
   Type: CNAME
   Name: @
   Value: transio.pages.dev
   TTL: 1 Hour
   ```
   ```
   Type: CNAME
   Name: www
   Value: transio.pages.dev
   TTL: 1 Hour
   ```
3. Save

**Wait 5-30 minutes** for DNS to propagate.

**Verify**: https://dnschecker.org/

**Live at**: https://transio.org ✅

---

## 📋 What Got Created

6 GitHub Actions workflows:

| Workflow | When | What |
|----------|------|------|
| **CI** | Every push/PR | Lint, build, test |
| **Deploy Cloudflare** | Push to main | Deploy to production |
| **Preview** | Pull requests | Test deployments |
| **Release** | Git tags (v*) | Create releases |
| **Deploy Netlify** | Push to main | Alternative platform |
| **Deploy Vercel** | Push to main | Alternative platform |

**Choose ONE deployment platform** - disable others if not needed.

---

## 🔄 Daily Workflow

### Deploy Changes:
```bash
git add .
git commit -m "Add new feature"
git push origin main
```
→ Auto-deploys in 2-3 minutes

### Create Preview:
```bash
git checkout -b feature/new-thing
# make changes
git push origin feature/new-thing
# Create PR on GitHub
```
→ Preview URL in PR comments

### Create Release:
```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```
→ GitHub release with downloads

---

## ✅ Verification

### Check Deployment Worked:
1. **GitHub Actions**: Green checkmark ✅
2. **Cloudflare Pages**: Shows "Success"
3. **Site**: https://transio.org loads correctly

### Check DNS Works:
```bash
# macOS/Linux
nslookup transio.org

# Should show Cloudflare IPs
```

### Check SSL:
- https://transio.org should show 🔒 in browser
- Cloudflare provides free SSL automatically

---

## 🐛 Quick Fixes

### Build Fails:
```bash
# Fix locally first
npm install
npm run build

# If works, commit and push
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Missing Secrets:
- Go to Settings → Secrets → Actions
- Verify exact names (case-sensitive!)
- Re-add if needed

### Wrong Branch:
- Check workflow trigger in `.github/workflows/deploy-cloudflare.yml`
- Should match your default branch (`main` or `master`)

### Site 404:
- Check build output is `dist` folder
- Check `index.html` exists in `dist`
- Check `base` in `vite.config.ts` is `/`

---

## 💰 Cost

Everything is **FREE**:
- ✅ Cloudflare Pages: Free (unlimited bandwidth!)
- ✅ GitHub Actions: Free (public repos)
- ✅ Custom domain: You already own transio.org
- ✅ SSL: Free (auto by Cloudflare)

**Total: $0/month** 🎉

---

## 📚 Full Documentation

- **Complete setup**: `GITHUB_ACTIONS_SETUP.md`
- **Automation guide**: `DEPLOYMENT_AUTOMATION.md`
- **Troubleshooting**: `GITHUB_ACTIONS_SETUP.md#troubleshooting`

---

## 🎯 Next Steps

1. ✅ Deploy to Cloudflare (done!)
2. ✅ Add custom domain (done!)
3. Enable branch protection (recommended)
4. Set up status checks (recommended)
5. Test preview deployments
6. Create first release

---

## 🆘 Need Help?

**Check**:
1. GitHub Actions logs
2. Cloudflare Pages deployment logs
3. Browser console (F12)

**Common Issues**:
- Secrets not added → Add in Settings
- Build fails → Test locally first
- DNS not working → Wait 30 min
- Wrong branch → Check workflow file

**Still stuck?**: Open issue in repository

---

## ✨ You're Done!

Your automated deployment pipeline is live! 🎉

Every push to `main` → Automatic deployment → Live at transio.org

**Deploy time**: ~2-3 minutes
**Uptime**: 99.99%+
**Cost**: $0

Happy deploying! 🚀

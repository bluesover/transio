# 🚀 Deploy Transio to GoDaddy Domain (transio.org)

## Overview
Deploy your Transio XML/XSLT Transformer to **transio.org** using Cloudflare Pages with automatic GitHub integration.

---

## ✅ Prerequisites

- ✅ GoDaddy domain: **transio.org**
- ✅ GitHub repository (public or private)
- ✅ Cloudflare account (free)
- ✅ Local development environment working

---

## 📋 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Navigate to your project
cd /path/to/transio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/transio.git

# Push to GitHub
git push -u origin main
```

---

### Step 2: Connect Cloudflare to GitHub

1. **Login to Cloudflare**: https://dash.cloudflare.com/
2. Go to **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git**
4. Select **GitHub** and authorize Cloudflare
5. Select your **transio** repository
6. Click **Begin setup**

---

### Step 3: Configure Build Settings

**Framework preset**: None (or Vite)

**Build settings:**
```
Build command:        npm run build
Build output path:    dist
Root directory:       /
Node version:         20 (or higher)
```

**Environment variables**: None needed (all client-side)

Click **Save and Deploy**

⏳ Wait 2-5 minutes for first deployment to complete.

---

### Step 4: Configure Custom Domain (transio.org)

#### A. Add Domain in Cloudflare Pages

1. After deployment, go to your **Transio** project in Cloudflare Pages
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `transio.org`
5. Click **Continue**
6. Cloudflare will provide DNS records (CNAME or A records)

**Example DNS records you'll see:**
```
Type:  CNAME
Name:  transio.org (or @)
Value: transio.pages.dev
```

---

#### B. Update DNS in GoDaddy

1. **Login to GoDaddy**: https://dcc.godaddy.com/
2. Go to **My Products** → **Domains**
3. Click on **transio.org** → **DNS**
4. Click **Add New Record**

**Add these records:**

| Type  | Name | Value                    | TTL  |
|-------|------|--------------------------|------|
| CNAME | @    | transio.pages.dev        | 600  |
| CNAME | www  | transio.pages.dev        | 600  |

5. **Delete** any conflicting A or CNAME records for `@` and `www`
6. Click **Save**

⏳ DNS propagation takes 5 minutes to 24 hours (usually ~10 minutes)

---

### Step 5: Verify Deployment

After DNS propagation:

1. Visit **https://transio.org**
2. Test XML/XSLT transformation
3. Check if all features work:
   - ✅ Transform XML with XSLT 1.0
   - ✅ Transform with XSLT 2.0/3.0 (Saxon-JS)
   - ✅ Save versions (persisted with useKV)
   - ✅ Import/Export files
   - ✅ Activity log
   - ✅ Dark/Light/Black themes

---

## 🔄 Automatic Deployments

Every time you push to GitHub `main` branch, Cloudflare Pages will **automatically rebuild and redeploy** your site.

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Cloudflare auto-deploys in ~2 minutes
```

---

## 🛠️ Troubleshooting

### ❌ Build fails with npm error

**Error**: `npm ci` fails with lock file mismatch

**Solution**: Delete `wrangler.toml` (not needed for Pages)
```bash
rm wrangler.toml
git add .
git commit -m "Remove wrangler.toml"
git push
```

### ❌ DNS not resolving

**Error**: `transio.org` shows GoDaddy parking page

**Solution**: 
1. Wait 10-30 minutes for DNS propagation
2. Clear browser cache: Ctrl+Shift+Delete
3. Test with: `nslookup transio.org` - should show Cloudflare IPs
4. Check GoDaddy DNS settings - ensure CNAME points to `transio.pages.dev`

### ❌ Custom domain shows "Not configured"

**Solution**:
1. In Cloudflare Pages → Custom domains
2. Click **Check now** to verify DNS
3. If still failing, use Cloudflare's nameservers instead:
   - In GoDaddy, change nameservers to Cloudflare's
   - Follow Cloudflare's nameserver setup wizard

### ❌ Build succeeds but app shows blank page

**Solution**:
1. Check browser console for errors (F12)
2. Ensure `index.html` has correct paths:
   ```html
   <link href="/src/main.css" rel="stylesheet" />
   <script type="module" src="/src/main.tsx"></script>
   ```
3. Verify `dist` folder is generated after `npm run build`

---

## 🔒 SSL Certificate

Cloudflare automatically provides **free SSL certificate** for transio.org.

- ✅ HTTPS enabled by default
- ✅ Auto-renewal
- ✅ No configuration needed

---

## 📊 Monitoring

**View deployment logs:**
1. Cloudflare Dashboard → Workers & Pages → transio
2. Click on latest deployment
3. View build logs and errors

**Analytics:**
- Cloudflare provides free analytics
- View traffic, performance, and errors

---

## 🌍 Multiple Environments

**Production**: `transio.org` (main branch)

**Staging**: Cloudflare auto-creates preview URLs for pull requests

Example: `https://abc123.transio.pages.dev`

---

## 💾 Data Persistence

All user data (XML, XSLT, versions, settings) is stored **locally in browser** using `useKV` (IndexedDB).

- ✅ No server database needed
- ✅ Privacy-first (data never leaves user's browser)
- ✅ Works offline after first load
- ✅ Free hosting forever

---

## 🎯 Post-Deployment Checklist

- [ ] Site loads at `https://transio.org`
- [ ] SSL certificate is active (padlock icon)
- [ ] XML/XSLT transformation works
- [ ] Version saving/loading works
- [ ] File import/export works
- [ ] Theme switching works
- [ ] Mobile responsive
- [ ] Activity log shows events
- [ ] Donation dialog appears
- [ ] About dialog shows info

---

## 📞 Support

**If stuck:**
1. Check Cloudflare build logs for errors
2. Verify GoDaddy DNS settings
3. Test locally: `npm run dev` - should work perfectly
4. Check browser console (F12) for JavaScript errors

---

## 🎉 Success!

Your Transio app is now live at:
- **Primary**: https://transio.org
- **WWW**: https://www.transio.org
- **Preview**: https://transio.pages.dev

**Next steps:**
- Share with users
- Monitor analytics
- Iterate based on feedback
- Deploy updates by pushing to GitHub

---

## 🚀 Quick Deploy Commands

```bash
# From your Mac terminal in project folder:

# 1. Commit changes
git add .
git commit -m "Deploy to production"

# 2. Push to GitHub (triggers auto-deploy)
git push origin main

# 3. Wait 2-3 minutes, then visit:
open https://transio.org
```

---

**Deployment time**: ~5 minutes
**Cost**: $0 (completely free)
**Maintenance**: Zero (auto-deploys on git push)

🎊 **Congratulations! Your app is live!** 🎊

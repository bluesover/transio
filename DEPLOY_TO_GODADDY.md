# 🚀 Deploy Transio to transio.org (GoDaddy Domain)

## What You Need
- ✅ GoDaddy domain: **transio.org** 
- ✅ GitHub account
- ✅ Cloudflare account (free)
- ✅ 10 minutes

---

## Step 1: Prepare Your Code (2 minutes)

### On Your MacBook in VS Code:

```bash
# Navigate to your project folder
cd /path/to/transio

# Test build locally first
npm run build

# Should see: dist folder created ✅
```

If build succeeds, you're ready! If it fails, fix errors first.

---

## Step 2: Push to GitHub (2 minutes)

```bash
# Check your current remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/transio.git

# Stage all changes
git add .

# Commit
git commit -m "Ready for transio.org deployment"

# Push to GitHub
git push origin main
```

✅ Your code is now on GitHub!

---

## Step 3: Connect Cloudflare Pages (3 minutes)

### A. Create Pages Project

1. **Login**: https://dash.cloudflare.com/
2. Click **Workers & Pages** in left sidebar
3. Click **Create application**
4. Click **Pages** tab
5. Click **Connect to Git**
6. Click **GitHub** → Authorize Cloudflare (if first time)
7. Select your **transio** repository
8. Click **Begin setup**

### B. Configure Build

**Project name**: `transio` (or any name)

**Build configuration**:
- **Framework preset**: None (or select "Vite")
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Environment variables**: None needed

Click **Save and Deploy**

⏳ Wait 2-5 minutes for first build. You'll see build logs.

✅ Success! You'll get a URL like: `https://transio-xyz.pages.dev`

Test this URL first before adding custom domain.

---

## Step 4: Configure Custom Domain (3 minutes)

### A. Add Domain in Cloudflare

1. In your Cloudflare Pages project, click **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Click **Continue**
5. **Important**: Cloudflare will show DNS records you need to add

**You'll see something like:**
```
Add this CNAME record to your DNS:

Name:  @  (or transio.org)
Value: transio.pages.dev
```

**Keep this page open!** You'll need these values for GoDaddy.

---

### B. Update DNS in GoDaddy

1. **Login to GoDaddy**: https://dcc.godaddy.com/
2. Go to **My Products**
3. Find **Domains** → Click **DNS** next to transio.org
4. You'll see a list of DNS records

**Delete old records** (if any):
- Delete any `A` records for `@`
- Delete any `CNAME` records for `@` or `www`

**Add new CNAME records**:

Click **Add New Record**:

**Record 1** (Root domain):
```
Type:   CNAME
Name:   @
Value:  transio.pages.dev
TTL:    600 seconds (or 1 hour)
```

**Record 2** (WWW subdomain):
```
Type:   CNAME  
Name:   www
Value:  transio.pages.dev
TTL:    600 seconds (or 1 hour)
```

Click **Save** for both records.

✅ DNS changes saved!

---

## Step 5: Wait for DNS Propagation (5-30 minutes)

DNS changes take time to spread worldwide. Usually:
- **5 minutes**: Works for most people
- **30 minutes**: Works for everyone
- **24 hours**: Maximum (rare)

**Check if ready:**
```bash
# On your Mac terminal:
nslookup transio.org

# Should show Cloudflare IPs (not GoDaddy parking)
```

Or use online tool: https://dnschecker.org/#CNAME/transio.org

---

## Step 6: Verify SSL Certificate (Automatic)

1. In Cloudflare Pages → Custom domains
2. Wait for **Active** badge next to transio.org
3. SSL certificate is automatic (free, auto-renews)

✅ When shows "Active", you're done!

---

## Step 7: Test Your Site

Visit these URLs:
- https://transio.org
- https://www.transio.org

**Test features:**
- [ ] Transform XML with XSLT 1.0 ✅
- [ ] Transform with XSLT 2.0/3.0 ✅
- [ ] Save version (useKV) ✅
- [ ] Load version ✅
- [ ] Import files ✅
- [ ] Export files ✅
- [ ] Activity log shows events ✅
- [ ] Theme switching works ✅
- [ ] Mobile responsive ✅
- [ ] Donation dialog appears ✅

---

## 🎉 Success! Your App is Live!

**Your app**: https://transio.org
**Status**: https://dash.cloudflare.com/
**Cost**: $0 forever
**Updates**: Auto-deploy on `git push`

---

## 🔄 Deploy Future Updates

```bash
# Make changes in VS Code
# Save files

# Commit and push
git add .
git commit -m "Added new feature"
git push origin main

# Cloudflare auto-deploys in ~2 minutes
# Visit transio.org to see changes
```

No manual deployment needed! Every push to `main` triggers auto-deploy.

---

## ❌ Troubleshooting

### Build Fails

**Error**: `npm ci` fails with lock file issues

**Solution**:
```bash
# Delete wrangler.toml (not needed for Pages)
rm wrangler.toml

# Commit and push
git add .
git commit -m "Remove wrangler.toml"
git push
```

### DNS Not Working

**Error**: transio.org shows GoDaddy parking page

**Solution**:
1. Wait 30 minutes (DNS propagation)
2. Clear browser cache: `Cmd+Shift+Delete`
3. Try incognito window
4. Check GoDaddy DNS - CNAME must point to `transio.pages.dev`

### Blank Page

**Error**: Site loads but shows nothing

**Solution**:
1. Open browser console: `Cmd+Option+J`
2. Check for JavaScript errors
3. Verify local build works: `npm run build && npm run preview`
4. Check Cloudflare build logs for errors

### Port 3001 Already in Use

**Error**: Can't start local server

**Solution**:
```bash
# Kill all Node processes
killall node

# Or find and kill specific process
lsof -ti:3001 | xargs kill -9

# Restart server
./start-server.sh
```

---

## 📊 Monitoring

**View deployments:**
- Cloudflare Dashboard → Workers & Pages → transio
- See build logs, deployment history, errors

**Analytics:**
- Cloudflare provides free analytics
- Traffic, performance, and visitor insights

---

## 🔒 Security

- ✅ SSL certificate (HTTPS) - automatic
- ✅ DDoS protection - Cloudflare included
- ✅ No server to hack - static site
- ✅ Data stored locally - privacy-first

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Cloudflare Pages | FREE |
| SSL Certificate | FREE |
| Bandwidth | FREE (unlimited) |
| Builds | FREE (500/month) |
| CDN | FREE (global) |
| **Total** | **$0.00** |

Only cost: GoDaddy domain renewal (~$15/year)

---

## 📁 What Gets Deployed

**Deployed** (in `dist` folder):
- ✅ `index.html`
- ✅ `assets/*.js` (bundled JavaScript)
- ✅ `assets/*.css` (bundled styles)
- ✅ `assets/*.png` (images/assets)

**NOT deployed** (stays on GitHub):
- ❌ `src/` (source code)
- ❌ `node_modules/` (dependencies)
- ❌ `server/` (optional server)
- ❌ `.md` files (documentation)

---

## 🌍 How It Works

1. **User visits** transio.org
2. **GoDaddy DNS** points to Cloudflare
3. **Cloudflare CDN** serves your static files (fast, global)
4. **Browser runs** React app (all processing client-side)
5. **Data saved** locally in browser (IndexedDB via useKV)

No server needed! Everything runs in the browser.

---

## 🎯 Next Steps

1. **Share** your app with users
2. **Monitor** analytics in Cloudflare
3. **Iterate** based on user feedback
4. **Update** by pushing to GitHub (auto-deploys)

---

## 📞 Need Help?

**Check these files:**
- `README.md` - User documentation
- `PRD.md` - Product requirements
- Build logs in Cloudflare Dashboard

**Online tools:**
- DNS checker: https://dnschecker.org/
- SSL checker: https://www.ssllabs.com/ssltest/

---

## ✅ Deployment Checklist

Before deploying:
- [ ] `npm run build` works locally
- [ ] `npm run preview` shows working app
- [ ] Code pushed to GitHub
- [ ] No sensitive data in code (API keys, etc.)

After deploying:
- [ ] Build succeeds in Cloudflare
- [ ] DNS resolves to Cloudflare
- [ ] SSL certificate active
- [ ] All features work on transio.org
- [ ] Mobile responsive
- [ ] Data persistence works

---

## 🚀 You're Ready!

Follow the 7 steps above, and your app will be live at **transio.org** in ~15 minutes!

**Questions?** Check troubleshooting section above.

**Good luck! 🎊**

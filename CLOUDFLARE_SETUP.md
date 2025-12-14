# ☁️ Cloudflare Pages Setup - Quick Guide

## 🎯 Dashboard Configuration (Recommended)

### Step 1: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** in the sidebar
3. Click **Create** button
4. Select **Pages** tab
5. Click **Connect to Git**

### Step 2: Connect Your Repository

1. Click **GitHub** (authorize if first time)
2. Select repository: `bluesover/transio.org`
3. Click **Begin setup**

### Step 3: Configure Build Settings

**Project name:**
```
transio
```

**Production branch:**
```
main
```
(or `master` if that's your default branch)

**Framework preset:**
```
None
```

**Build command:**
```
npm run build
```

**Build output directory:**
```
dist
```

**Root directory (advanced):**
```
/
```
(leave empty or use `/`)

**Environment variables:**
```
None required - leave empty
```

### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL: `https://transio.pages.dev`

---

## 🌐 Add Custom Domain (transio.org)

### In Cloudflare Pages Dashboard

1. Go to your **transio** project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `transio.org`
5. Click **Continue**
6. Cloudflare will show you DNS records to configure

### In GoDaddy Dashboard

1. Go to [GoDaddy DNS Management](https://dcc.godaddy.com/control/dns)
2. Select your domain: **transio.org**
3. Add/Update these records:

**Root domain:**
```
Type: CNAME
Name: @
Value: transio.pages.dev
TTL: 600 seconds (10 minutes)
```

**WWW subdomain:**
```
Type: CNAME  
Name: www
Value: transio.pages.dev
TTL: 600 seconds
```

4. Click **Save**
5. Wait 5-30 minutes for DNS propagation

---

## 🔐 Configure GitHub Actions (Optional but Recommended)

### Get Your Cloudflare Credentials

**1. Get API Token:**
- Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
- Click **Create Token**
- Use **Edit Cloudflare Workers** template
- Or create custom with: `Account.Cloudflare Pages - Edit`
- Click **Continue to summary** → **Create Token**
- **Copy the token** (you won't see it again!)

**2. Get Account ID:**
- Go to **Workers & Pages**
- Click on your **transio** project
- Look at the right sidebar under **Project details**
- Copy the **Account ID**

### Add to GitHub Secrets

1. Go to your repository: `https://github.com/bluesover/transio.org`
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

**Add these two secrets:**

**Secret 1:**
```
Name: CLOUDFLARE_API_TOKEN
Value: [paste your API token]
```

**Secret 2:**
```
Name: CLOUDFLARE_ACCOUNT_ID
Value: [paste your account ID]
```

5. Click **Add secret** for each

---

## ✅ Verify Deployment

### Test Your Site

1. Wait for deployment to complete
2. Visit: `https://transio.pages.dev` (should work immediately)
3. Visit: `https://transio.org` (wait for DNS propagation)
4. Visit: `https://www.transio.org` (should redirect)

### Check These Features

- [ ] App loads without errors
- [ ] XML and XSLT editors display
- [ ] Transform button works (test XSLT 1.0)
- [ ] Version save/load works
- [ ] Theme switching works
- [ ] Import/export files work
- [ ] All UI elements responsive on mobile

---

## 🔄 Automatic Deployments

Once GitHub Actions is configured:

1. Make changes to your code
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. GitHub Actions automatically builds and deploys
4. Check progress in **Actions** tab of your repository
5. Site updates in ~3 minutes

---

## 🐛 Troubleshooting

### Build Fails with "Missing entry-point"

**Problem:** Cloudflare can't find what to deploy

**Solution:** Use Cloudflare Pages dashboard (not wrangler deploy)
- Deploy through GitHub integration
- Or use correct command: `npx wrangler pages deploy dist --project-name=transio`

### DNS Not Updating

**Problem:** transio.org doesn't point to your site

**Solution:**
- Wait 30 minutes for DNS to propagate worldwide
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Test with: `nslookup transio.org` or `dig transio.org`
- Verify CNAME at GoDaddy points to `transio.pages.dev`

### GitHub Actions Failing

**Problem:** Deployment fails in Actions tab

**Solution:**
1. Check secrets are configured correctly
2. Verify API token has correct permissions
3. Ensure `dist` folder is created during build
4. Check build logs for specific errors

---

## 📝 Important Notes

### About wrangler.toml

The `wrangler.toml` file should be minimal:

```toml
name = "transio"
compatibility_date = "2024-12-13"
```

**Do not add:**
- ❌ `pages_build_output_dir`
- ❌ `[build]` section
- ❌ `main` entry point

These are configured in Cloudflare dashboard or GitHub Actions.

### About Deployment Methods

**Method 1: Cloudflare Dashboard (Easiest)**
- Connect Git repository
- Configure once
- Auto-deploys on push
- ✅ Recommended for most users

**Method 2: GitHub Actions (Automated)**
- More control over deployment
- Can add custom steps
- Requires API token setup
- ✅ Best for teams

**Method 3: Wrangler CLI (Manual)**
- Deploy from local machine
- Useful for testing
- Run: `npm run deploy`
- ⚠️ Not automatic

---

## 🎉 You're Done!

Your Transio app should now be live at:
- **Production:** https://transio.org
- **Cloudflare:** https://transio.pages.dev

Every push to `main` branch will automatically deploy updates.

---

**Need Help?**
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Issues](https://github.com/bluesover/transio.org/issues)

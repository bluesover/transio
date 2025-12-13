# ⚡ Quick Start: Deploy Transio to Cloudflare in 10 Minutes

This is the **fastest path** to get Transio deployed to Cloudflare Pages with your custom domain.

---

## 🎯 What You'll Accomplish

- ✅ Build and deploy Transio
- ✅ Configure custom domain (transio.org)
- ✅ Set up automatic deployments from GitHub
- ✅ Get free SSL, CDN, and global distribution

**Time Required:** 10-15 minutes

---

## 📦 Step 1: Get Cloudflare Credentials (3 minutes)

### A. Get Your Account ID

1. Go to: https://dash.cloudflare.com
2. Click any website in your dashboard
3. Scroll to right sidebar → Copy **Account ID**
4. Save it somewhere (looks like: `a1b2c3d4...`)

### B. Create API Token

1. Click your profile (top right) → **My Profile**
2. Click **API Tokens** → **Create Token**
3. Click **Create Custom Token**
4. Configure:
   - **Token name:** `GitHub Transio Deploy`
   - **Permissions:** Add these:
     - `Account` → `Cloudflare Pages` → `Edit`
   - **Account Resources:** `Include` → `Your Account`
5. Click **Continue to summary** → **Create Token**
6. **COPY THE TOKEN NOW** (shown only once!)
7. Save it somewhere safe

---

## 🔐 Step 2: Add GitHub Secrets (2 minutes)

1. Go to: https://github.com/bluesover/transio.org/settings/secrets/actions
2. Click **New repository secret**

### Add Secret 1:
- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** [paste your API token]
- Click **Add secret**

### Add Secret 2:
- **Name:** `CLOUDFLARE_ACCOUNT_ID`  
- **Value:** [paste your Account ID]
- Click **Add secret**

✅ **Done!** You should now see both secrets listed.

---

## 🚀 Step 3: Deploy to Cloudflare (5 minutes)

### Option A: Automatic Deployment (Recommended)

```bash
# 1. Make sure your code is ready
git status

# 2. Push to GitHub (this triggers auto-deploy)
git add .
git commit -m "Deploy to Cloudflare"
git push origin main
```

**Monitor deployment:**
1. Go to: https://github.com/bluesover/transio.org/actions
2. Watch the workflow run (takes 2-3 minutes)
3. Once complete, your site is live!

### Option B: Manual Deployment

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Deploy using Wrangler
npx wrangler login
npx wrangler pages deploy dist --project-name=transio
```

---

## 🌐 Step 4: Configure Custom Domain (5 minutes)

### A. Add Domain to Cloudflare

1. Go to: https://dash.cloudflare.com
2. Click **Add a site**
3. Enter: `transio.org`
4. Choose: **Free plan**
5. Click **Continue**
6. **Copy the 2 nameservers** (you'll need them next)

Example nameservers:
```
anabelle.ns.cloudflare.com
jeyson.ns.cloudflare.com
```

### B. Update GoDaddy Nameservers

1. Go to: https://godaddy.com → **My Products** → **Domains**
2. Click on **transio.org**
3. Find **Nameservers** section → Click **Change**
4. Select **Custom nameservers**
5. Replace with Cloudflare's 2 nameservers
6. Click **Save**

⏱️ **Wait:** 10 minutes to 24 hours for DNS propagation (usually <1 hour)

### C. Connect Domain to Pages Project

**After DNS is active:**

1. Go to: https://dash.cloudflare.com/pages
2. Click your **transio** project
3. Go to **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `transio.org`
6. Click **Continue** (Cloudflare auto-configures DNS)

**Add www redirect (optional):**
- Repeat above steps with `www.transio.org`

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] GitHub Secrets added (check: Settings → Secrets → Actions)
- [ ] GitHub Actions workflow completed successfully
- [ ] Site accessible at: https://transio.pages.dev
- [ ] Cloudflare nameservers active (check: `dig NS transio.org`)
- [ ] Custom domain connected in Cloudflare Pages
- [ ] Site live at: https://transio.org
- [ ] SSL certificate active (look for 🔒 in browser)

---

## 🎉 Success!

Your Transio application is now:

- ✅ **Deployed** to Cloudflare Pages
- ✅ **Live** at https://transio.org
- ✅ **Auto-deploying** on every git push
- ✅ **Secured** with free SSL
- ✅ **Fast** with global CDN
- ✅ **Protected** with DDoS protection

---

## 🔄 Making Updates

Now that deployment is set up, updating is easy:

```bash
# 1. Make your changes to the code
# 2. Commit and push
git add .
git commit -m "Your update description"
git push origin main

# 3. Wait 2-3 minutes
# 4. Changes are live! 🎉
```

Every push to the `main` branch automatically triggers a new deployment.

---

## 🐛 Quick Troubleshooting

### Problem: GitHub Actions fails with "Authentication error"

**Solution:** Check that secrets are added correctly:
1. Go to: https://github.com/bluesover/transio.org/settings/secrets/actions
2. Verify both secrets exist: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
3. If missing, add them again

### Problem: Site shows "522 Error"

**Solution:** Nameservers not propagated yet
1. Wait longer (up to 24 hours)
2. Check status: `dig NS transio.org` (should show Cloudflare nameservers)
3. Verify in Cloudflare: Dashboard → Websites → transio.org (should show "Active")

### Problem: Build fails

**Solution:** Test locally first
```bash
npm run build
ls dist/  # Should show index.html and assets/
```

If local build works, check GitHub Actions logs for the specific error.

---

## 📚 Need More Details?

- **Full deployment guide:** See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- **Secrets setup guide:** See [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md)
- **Application documentation:** See [README.md](./README.md)

---

## 🆘 Still Stuck?

1. Check GitHub Actions logs: https://github.com/bluesover/transio.org/actions
2. Check Cloudflare Pages deployment logs: https://dash.cloudflare.com/pages
3. Review the detailed guides above
4. Check Cloudflare status: https://www.cloudflarestatus.com

---

**⚡ Ready to deploy? Start with Step 1!**

*Total time: ~10-15 minutes + DNS propagation time*

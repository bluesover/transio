# ✅ Deployment Checklist - Transio to Cloudflare Pages

Follow this step-by-step checklist to deploy Transio to transio.org via Cloudflare Pages.

---

## 📋 Pre-Deployment (Local Testing)

### Step 1: Test Local Build

```bash
# Navigate to project directory
cd /path/to/transio

# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Verify dist folder was created
ls dist/

# Expected files in dist/:
# - index.html
# - assets/ (CSS and JS files)
# - package.json
# - proxy.js (if present)
```

✅ **Success if:** `dist` folder exists with index.html and assets

### Step 2: Test Build Locally

```bash
# Preview the production build
npm run preview

# Open browser to: http://localhost:4173
# Test the app works correctly
```

✅ **Success if:** App loads and transforms work

---

## ☁️ Cloudflare Pages Setup

### Step 3: Connect Repository to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages**
3. Click **Create** → **Pages** → **Connect to Git**
4. Select **GitHub** and authorize
5. Choose repository: `bluesover/transio.org`
6. Click **Begin setup**

✅ **Success if:** Repository connected

### Step 4: Configure Build

**Project name:** `transio`

**Production branch:** `main` (or `master`)

**Framework preset:** `None`

**Build command:**
```
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:** `/` (or leave empty)

**Environment variables:** None

Click **Save and Deploy**

✅ **Success if:** Build completes without errors

---

## 🌐 Custom Domain Configuration

### Step 5: Add Domain in Cloudflare

1. In your **transio** project, click **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Click **Continue**

✅ **Success if:** Domain added, waiting for DNS

### Step 6: Configure DNS at GoDaddy

1. Go to [GoDaddy DNS](https://dcc.godaddy.com/control/dns)
2. Select **transio.org**
3. Add/Edit these records:

**Record 1 (Root):**
```
Type: CNAME
Name: @
Value: transio.pages.dev
TTL: 600 seconds
```

**Record 2 (WWW):**
```
Type: CNAME
Name: www
Value: transio.pages.dev
TTL: 600 seconds
```

4. Click **Save**

✅ **Success if:** DNS records saved

### Step 7: Wait for DNS Propagation

- Wait 5-30 minutes
- Check status: `nslookup transio.org`
- Or visit: https://dnschecker.org/#CNAME/transio.org

✅ **Success if:** CNAME points to transio.pages.dev

---

## 🤖 GitHub Actions (Automated Deployments)

### Step 8: Get Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Edit Cloudflare Workers** template
4. Click **Continue to summary** → **Create Token**
5. **Copy the token** immediately

✅ **Success if:** Token copied and saved

### Step 9: Get Cloudflare Account ID

1. Go to **Workers & Pages** → **transio** project
2. Find **Account ID** in right sidebar
3. Copy the Account ID

✅ **Success if:** Account ID copied

### Step 10: Add GitHub Secrets

1. Go to: https://github.com/bluesover/transio.org/settings/secrets/actions
2. Click **New repository secret**

**Add Secret 1:**
```
Name: CLOUDFLARE_API_TOKEN
Value: [paste token from step 8]
```

**Add Secret 2:**
```
Name: CLOUDFLARE_ACCOUNT_ID
Value: [paste ID from step 9]
```

✅ **Success if:** Both secrets added

---

## 🧪 Testing Deployment

### Step 11: Test Manual Deployment

1. Go to GitHub repository Actions tab
2. Click **Deploy to Cloudflare Pages** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait for completion (~3 minutes)

✅ **Success if:** Workflow completes with green checkmark

### Step 12: Test Automatic Deployment

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "Test auto-deploy"
git push origin main
```

1. Check Actions tab for new workflow run
2. Wait for completion

✅ **Success if:** Automatic deployment works

---

## ✅ Final Verification

### Step 13: Verify Production Site

Visit these URLs and test:

**1. Cloudflare Pages URL:**
- https://transio.pages.dev

**2. Custom Domain:**
- https://transio.org
- https://www.transio.org

**Test these features:**
- [ ] App loads without errors
- [ ] XML editor works
- [ ] XSLT editor works
- [ ] Transform button works (test with sample data)
- [ ] Version save/load works (uses localStorage)
- [ ] Theme switching works
- [ ] Import file works
- [ ] Export file works
- [ ] Mobile responsive layout works
- [ ] Activity log shows actions
- [ ] Snippets panel opens

✅ **Success if:** All features work

---

## 📊 Deployment Status Summary

| Item | Status | Notes |
|------|--------|-------|
| Local build works | ⬜ | `npm run build` succeeds |
| Cloudflare connected | ⬜ | Repository linked |
| First deploy success | ⬜ | Build completes |
| Custom domain added | ⬜ | transio.org configured |
| DNS configured | ⬜ | GoDaddy CNAME set |
| DNS propagated | ⬜ | Domain resolves |
| API token added | ⬜ | GitHub secret set |
| Account ID added | ⬜ | GitHub secret set |
| Auto-deploy works | ⬜ | Push triggers build |
| Site fully functional | ⬜ | All features work |

---

## 🐛 Common Issues & Fixes

### Issue: "Missing entry-point to Worker script"

**Fix:** This error means you're using the wrong deployment method
- ✅ Use Cloudflare Pages dashboard (not wrangler deploy)
- ✅ Deploy through GitHub integration
- ✅ Or use GitHub Actions

### Issue: DNS not resolving

**Fix:** Wait longer or check configuration
```bash
# Check DNS status
nslookup transio.org

# Should show CNAME pointing to transio.pages.dev
```

### Issue: Build fails with package errors

**Fix:** Update package-lock.json
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Issue: GitHub Actions failing

**Fix:** Verify secrets
1. Check API token has correct permissions
2. Verify Account ID is correct
3. Try regenerating API token

---

## 📝 Quick Commands Reference

```bash
# Local development
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Git operations
git status           # Check status
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub (triggers deploy)

# Saxon-HE Server (optional)
cd server
npm install          # Install server dependencies
npm start            # Start server on port 3001
```

---

## 🎉 Success!

When all checkboxes are complete, your Transio app is live at:
- **Production:** https://transio.org
- **Cloudflare:** https://transio.pages.dev

Every push to `main` automatically deploys updates!

---

**Next Steps:**
- Monitor deployments in Cloudflare dashboard
- Check analytics and performance
- Share transio.org with users!

**Need Help?**
- See [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) for detailed steps
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
- Open issue: https://github.com/bluesover/transio.org/issues

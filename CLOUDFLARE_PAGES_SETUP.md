# Cloudflare Pages Setup Guide

## ✅ Repository Connection

**GitHub Repository:** `github.com/bluesover/transio`

This is the **public** repository that Cloudflare Pages should connect to for automatic deployments.

---

## 🔧 Cloudflare Pages Configuration

### Project Settings

| Setting | Value |
|---------|-------|
| **Project Name** | `transio` |
| **Production Branch** | `main` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` (leave empty) |
| **Node Version** | `22` |

### Build Configuration

```yaml
# Cloudflare will automatically detect and use these settings:
Build command: npm run build
Build output directory: dist
Node version: 22.x (latest LTS)
```

### Environment Variables

No environment variables are required for the basic build. The application is fully client-side.

---

## 🚀 Deployment Methods

### Method 1: GitHub Integration (Recommended)

**Automatic deployments on every push to `main` branch**

1. **Connect Repository to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
   - Select **GitHub** and authorize Cloudflare
   - Choose repository: `bluesover/transio`
   - Configure build settings (see above)
   - Click **Save and Deploy**

2. **GitHub Actions Automation:**
   - The repository includes `.github/workflows/deploy-cloudflare.yml`
   - This workflow automatically deploys on push to `main`
   - **Required GitHub Secrets:**
     - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### Method 2: Manual Wrangler Deploy

**For one-time or manual deployments**

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

Or directly with Wrangler:

```bash
npx wrangler pages deploy dist --project-name=transio
```

---

## 🌐 Custom Domain Setup (transio.org)

### Step 1: Add Domain to Cloudflare

1. Go to Cloudflare Dashboard → **Websites** → **Add a site**
2. Enter your domain: `transio.org`
3. Select Free plan (or your preferred plan)
4. Cloudflare will scan your DNS records

### Step 2: Update Nameservers at GoDaddy

1. Log in to GoDaddy
2. Go to **My Products** → **DNS**
3. Click **Manage** next to your domain
4. Scroll to **Nameservers** → **Change**
5. Select **Custom**
6. Add Cloudflare nameservers (provided by Cloudflare):
   - `xxx.ns.cloudflare.com`
   - `yyy.ns.cloudflare.com`
7. Save changes (DNS propagation takes 2-24 hours)

### Step 3: Configure Custom Domain in Pages

1. Go to Cloudflare Pages → Your project (`transio`)
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `transio.org`
5. Click **Continue**
6. Cloudflare will automatically create DNS records
7. Also add `www.transio.org` (recommended)

### Step 4: SSL/TLS Configuration

1. Go to Cloudflare Dashboard → **SSL/TLS**
2. Set encryption mode to: **Full (strict)**
3. Enable **Always Use HTTPS**
4. Enable **Automatic HTTPS Rewrites**

**SSL certificate is automatically provisioned by Cloudflare (usually within 5-15 minutes)**

---

## 🔐 Required GitHub Secrets

For GitHub Actions automation, add these secrets to your repository:

### How to Add Secrets

1. Go to your GitHub repository: `github.com/bluesover/transio`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages permissions | Cloudflare Dashboard → My Profile → API Tokens → Create Token → Edit Cloudflare Workers template |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Cloudflare Dashboard → Workers & Pages → Overview (right sidebar) |

### Optional Secret (for desktop releases)

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `GITHUB_TOKEN` | Automatically provided by GitHub Actions | No setup needed (auto-generated) |

---

## 📋 Cloudflare API Token Setup

### Creating the API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click your profile icon → **My Profile**
3. Select **API Tokens** tab
4. Click **Create Token**
5. Use template: **Edit Cloudflare Workers**
6. Or create custom token with these permissions:
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Zone** → **DNS** → **Edit** (if managing custom domain)
7. Under **Account Resources**:
   - Include → Specific account → Select your account
8. Click **Continue to summary** → **Create Token**
9. Copy the token (you won't see it again!)
10. Add to GitHub Secrets as `CLOUDFLARE_API_TOKEN`

### Finding Your Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Your Account ID is shown in the right sidebar
4. Copy and add to GitHub Secrets as `CLOUDFLARE_ACCOUNT_ID`

---

## ✅ Verification Steps

After setup, verify everything works:

### 1. Check Build Status

- GitHub Actions: `github.com/bluesover/transio/actions`
- Cloudflare Pages: Dashboard → transio → Deployments

### 2. Test Deployment

- Visit: `transio.pages.dev` (Cloudflare default subdomain)
- Visit: `transio.org` (your custom domain)

### 3. Verify SSL

- Check that HTTPS is working: `https://transio.org`
- Verify certificate in browser (should show Cloudflare SSL)

### 4. Test Automatic Deployment

1. Make a small change to your repository
2. Push to `main` branch
3. Watch GitHub Actions run the deployment
4. Verify changes appear on live site

---

## 🐛 Troubleshooting

### Build Fails: "Missing entry-point"

**Error:** `Missing entry-point to Worker script or to assets directory`

**Solution:** This is a Wrangler configuration issue. The project is configured correctly - ensure you're using:

```bash
npm run deploy
```

NOT:

```bash
npx wrangler deploy  # Wrong - this is for Workers, not Pages
```

### Build Fails: Lock File Mismatch

**Error:** `lock file's @github/spark does not satisfy...`

**Solution:** The repository is properly configured. Cloudflare should run:

```bash
npm ci  # Uses the committed package-lock.json
```

If you see this error locally:

```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update lock file"
git push
```

### Custom Domain Not Working

**Possible causes:**

1. **DNS not propagated** - Wait 2-24 hours after changing nameservers
2. **Nameservers not updated** - Verify GoDaddy shows Cloudflare nameservers
3. **SSL certificate pending** - Wait 5-15 minutes after adding custom domain

**Check status:**

```bash
# Check nameservers
dig NS transio.org

# Check if site is reachable
curl -I https://transio.org
```

### GitHub Actions Failing

**Check:**

1. Secrets are added correctly (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
2. API token has correct permissions (Cloudflare Pages Edit)
3. Account ID matches your Cloudflare account
4. Repository is public or token has private repo access

---

## 📚 Additional Resources

- **Cloudflare Pages Documentation:** https://developers.cloudflare.com/pages/
- **Wrangler CLI Documentation:** https://developers.cloudflare.com/workers/wrangler/
- **Custom Domain Setup:** https://developers.cloudflare.com/pages/platform/custom-domains/
- **GitHub Actions for Pages:** https://github.com/cloudflare/pages-action

---

## 🎯 Quick Reference Commands

```bash
# Local development
npm install
npm run dev

# Build locally
npm run build

# Preview build
npm run preview

# Deploy to Cloudflare Pages
npm run deploy

# Deploy specific directory
npx wrangler pages deploy dist --project-name=transio

# Check Wrangler version
npx wrangler --version

# Login to Cloudflare (if not using API token)
npx wrangler login
```

---

## ✨ Current Status

- ✅ Repository: `github.com/bluesover/transio` (public)
- ✅ Build configuration: Optimized for Cloudflare Pages
- ✅ GitHub Actions: Automated deployment workflow
- ✅ Domain: `transio.org` ready for configuration
- ✅ SSL: Auto-provisioned by Cloudflare
- ✅ Desktop releases: Available via GitHub Releases

---

**🚀 You're all set! Push to `main` and watch your site deploy automatically.**

For questions or issues, visit: https://github.com/bluesover/transio/issues

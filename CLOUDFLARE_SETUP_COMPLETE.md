# 🚀 Complete Cloudflare Pages Deployment Guide for Transio.org

## 📋 Overview

This guide will help you deploy your Transio XSLT Transformer to Cloudflare Pages with automatic deployments from GitHub and custom domain (transio.org) configuration.

---

## ✅ Prerequisites

- ✅ GitHub repository (can be **public** or **private**)
- ✅ Cloudflare account (free tier works perfectly)
- ✅ Domain registered at GoDaddy (transio.org)
- ✅ All code checked into your GitHub repository

---

## 🎯 Part 1: Get Cloudflare API Credentials

### Step 1: Create Cloudflare API Token

1. **Log into Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com/

2. **Navigate to API Tokens**
   - Click on your profile icon (top right)
   - Select **"My Profile"**
   - Go to **"API Tokens"** tab
   - Click **"Create Token"**

3. **Create Custom Token**
   - Click **"Create Custom Token"**
   - **Token name:** `Transio GitHub Actions Deploy`
   - **Permissions:**
     ```
     Account → Cloudflare Pages → Edit
     Zone → DNS → Edit (optional, for custom domain)
     ```
   - **Account Resources:**
     - Include → Specific account → Select your account
   - **Zone Resources:** (optional)
     - Include → All zones (or specific zone if you have transio.org added)
   - Click **"Continue to summary"**
   - Click **"Create Token"**
   - **⚠️ IMPORTANT:** Copy the token NOW (you can't see it again)
   - Save it securely - you'll add it to GitHub in the next section

### Step 2: Get Cloudflare Account ID

1. In Cloudflare Dashboard, click on **"Pages"** (left sidebar)
2. Look at the URL - it will be: `https://dash.cloudflare.com/{ACCOUNT_ID}/pages`
3. The **Account ID** is the long string of letters and numbers in the URL
4. Copy and save this ID

**Example:**
- URL: `https://dash.cloudflare.com/abc123def456ghi789/pages`
- Account ID: `abc123def456ghi789`

---

## 🔐 Part 2: Configure GitHub Repository Secrets

### Step 1: Add Secrets to GitHub

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

2. **Access Settings**
   - Click **"Settings"** tab (top navigation)
   - In left sidebar, expand **"Secrets and variables"**
   - Click **"Actions"**

3. **Add CLOUDFLARE_API_TOKEN**
   - Click **"New repository secret"**
   - **Name:** `CLOUDFLARE_API_TOKEN`
   - **Value:** Paste the API token you created earlier
   - Click **"Add secret"**

4. **Add CLOUDFLARE_ACCOUNT_ID**
   - Click **"New repository secret"** again
   - **Name:** `CLOUDFLARE_ACCOUNT_ID`
   - **Value:** Paste your Cloudflare Account ID
   - Click **"Add secret"**

### ✅ Verify Secrets Are Set

You should now see two secrets listed:
- ✅ `CLOUDFLARE_API_TOKEN`
- ✅ `CLOUDFLARE_ACCOUNT_ID`

---

## 🌐 Part 3: Create Cloudflare Pages Project

### Option A: Using GitHub Actions (Recommended - Automated)

The GitHub Actions workflow will automatically create the Pages project on first deployment.

1. **Push to your repository** (on `main` or `master` branch)
2. **GitHub Actions will:**
   - ✅ Install dependencies
   - ✅ Build your project
   - ✅ Create Cloudflare Pages project named "transio"
   - ✅ Deploy to Cloudflare Pages
   - ✅ Provide deployment URL

3. **Check deployment status:**
   - Go to your GitHub repository
   - Click **"Actions"** tab
   - Watch the **"Deploy to Cloudflare Pages"** workflow run

### Option B: Manual Setup via Cloudflare Dashboard

1. **Log into Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com/

2. **Create Pages Project**
   - Click **"Pages"** in left sidebar
   - Click **"Create a project"**
   - Select **"Connect to Git"**

3. **Connect GitHub Account**
   - Click **"Connect GitHub"**
   - Authorize Cloudflare to access your repositories
   - Select your repository: `YOUR_USERNAME/transio-xslt-transformer`

4. **Configure Build Settings**
   ```
   Project name: transio
   Production branch: main (or master)
   Build command: npm run build
   Build output directory: dist
   Environment variables: (leave empty)
   ```

5. **Deploy**
   - Click **"Save and Deploy"**
   - Wait for build to complete (~2-3 minutes)

---

## 🌍 Part 4: Configure Custom Domain (transio.org)

### Step 1: Add Domain to Cloudflare

First, you need to add your domain to Cloudflare:

1. **Add Site to Cloudflare**
   - In Cloudflare Dashboard, click **"Add a Site"** (top right)
   - Enter: `transio.org`
   - Click **"Continue"**
   - Select **"Free"** plan
   - Click **"Continue"**

2. **Get Cloudflare Nameservers**
   - Cloudflare will show you 2 nameservers, like:
     ```
     kai.ns.cloudflare.com
     mia.ns.cloudflare.com
     ```
   - **Keep this page open** - you'll need these in the next step

### Step 2: Update Nameservers at GoDaddy

1. **Log into GoDaddy**
   - Go to: https://www.godaddy.com/
   - Sign in to your account

2. **Navigate to DNS Management**
   - Click **"My Products"**
   - Find **transio.org** in your domain list
   - Click **"DNS"** or **"Manage DNS"**

3. **Change Nameservers**
   - Scroll to **"Nameservers"** section
   - Click **"Change"**
   - Select **"I'll use my own nameservers"**
   - **Delete** GoDaddy's default nameservers
   - **Add** the 2 Cloudflare nameservers you got earlier:
     ```
     kai.ns.cloudflare.com
     mia.ns.cloudflare.com
     ```
   - Click **"Save"**

4. **Wait for Propagation**
   - This can take **2-24 hours** (usually ~15 minutes)
   - You'll get an email from Cloudflare when it's active

### Step 3: Connect Domain to Cloudflare Pages

1. **Go to Cloudflare Pages**
   - Navigate to: https://dash.cloudflare.com/
   - Click **"Pages"** in left sidebar
   - Click on your **"transio"** project

2. **Add Custom Domain**
   - Click **"Custom domains"** tab
   - Click **"Set up a custom domain"**
   - Enter: `transio.org`
   - Click **"Continue"**

3. **Add www Subdomain (Optional)**
   - Click **"Set up a custom domain"** again
   - Enter: `www.transio.org`
   - Click **"Continue"**
   - Cloudflare will automatically redirect www to non-www

4. **DNS Records (Automatic)**
   - Cloudflare automatically creates the needed DNS records:
     ```
     Type: CNAME
     Name: transio.org
     Value: transio.pages.dev
     Proxy: Enabled (orange cloud)
     ```

5. **Wait for SSL Certificate**
   - Cloudflare automatically provisions a free SSL certificate
   - This takes **1-5 minutes**
   - Your site will be available at `https://transio.org`

---

## 🔄 Part 5: Test Automated Deployment

### Verify GitHub Actions Workflow

1. **Make a small change** to your code (e.g., edit README.md)
2. **Commit and push** to the `main` or `master` branch:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```

3. **Watch the deployment:**
   - Go to GitHub: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
   - See **"Deploy to Cloudflare Pages"** workflow running
   - Wait for green checkmark ✅

4. **Check your live site:**
   - Production: `https://transio.org`
   - Cloudflare URL: `https://transio.pages.dev`

### Workflow Triggers

Your app will automatically deploy when:
- ✅ You push to `main` or `master` branch
- ✅ You merge a pull request
- ✅ You manually trigger from GitHub Actions tab

---

## 🎛️ Environment Variables (If Needed)

If your app needs environment variables in production:

### In Cloudflare Dashboard:

1. Go to **Pages** → **transio** project
2. Click **"Settings"** tab
3. Scroll to **"Environment variables"**
4. Click **"Add variable"**
5. Add variables for **Production** environment:
   ```
   NODE_ENV=production
   VITE_APP_URL=https://transio.org
   ```

### In GitHub Actions:

Already configured in `.github/workflows/deploy-cloudflare.yml`:
```yaml
env:
  NODE_ENV: production
```

---

## 📊 Monitoring & Analytics

### View Deployment Logs

**Cloudflare Dashboard:**
1. Go to **Pages** → **transio**
2. Click **"View build log"** for any deployment
3. See detailed build output

**GitHub Actions:**
1. Go to **Actions** tab in your repo
2. Click on any workflow run
3. Expand steps to see logs

### Analytics (Free on Cloudflare)

1. Go to **Pages** → **transio**
2. Click **"Analytics"** tab
3. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Geographic distribution

---

## 🚨 Troubleshooting

### Build Fails with "npm ci" Error

**Problem:** Package lock file is out of sync

**Solution:**
```bash
# In your local project directory
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Custom Domain Shows "522 Error"

**Problem:** DNS not fully propagated or SSL not ready

**Solution:**
- Wait 5-15 minutes for DNS propagation
- Check nameservers are correctly set at GoDaddy
- Verify Cloudflare nameservers are active

### GitHub Actions Workflow Not Running

**Problem:** Secrets not set or workflow file missing

**Solution:**
1. Verify secrets exist: Settings → Secrets and variables → Actions
2. Check workflow file: `.github/workflows/deploy-cloudflare.yml`
3. Manually trigger: Actions tab → Deploy to Cloudflare Pages → Run workflow

### Build Succeeds but Site Shows Old Version

**Problem:** Browser cache

**Solution:**
- Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Try incognito/private window
- Check deployment time in Cloudflare dashboard

---

## ✅ Final Checklist

- [ ] Cloudflare account created
- [ ] API Token created and copied
- [ ] Account ID copied
- [ ] GitHub secrets added:
  - [ ] `CLOUDFLARE_API_TOKEN`
  - [ ] `CLOUDFLARE_ACCOUNT_ID`
- [ ] GitHub Actions workflow file exists (`.github/workflows/deploy-cloudflare.yml`)
- [ ] Domain added to Cloudflare
- [ ] Nameservers updated at GoDaddy
- [ ] Custom domain added to Cloudflare Pages project
- [ ] SSL certificate active
- [ ] Test deployment successful
- [ ] Site accessible at `https://transio.org`

---

## 🎉 You're Done!

Your Transio XSLT Transformer is now:
- ✅ **Live** at https://transio.org
- ✅ **Auto-deploying** on every push to main/master
- ✅ **HTTPS enabled** with free SSL certificate
- ✅ **Globally distributed** via Cloudflare CDN
- ✅ **100% Free** on Cloudflare's generous free tier

### Next Steps:

1. Share your app: https://transio.org
2. Monitor analytics in Cloudflare Dashboard
3. Make updates - they'll auto-deploy!
4. Consider adding a custom 404 page
5. Set up Web Analytics (free in Cloudflare)

---

## 📚 Additional Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Custom Domain Setup:** https://developers.cloudflare.com/pages/configuration/custom-domains/
- **DNS Management:** https://developers.cloudflare.com/dns/

---

## 🆘 Need Help?

- **Cloudflare Community:** https://community.cloudflare.com/
- **Cloudflare Support:** https://dash.cloudflare.com/?to=/:account/support
- **GitHub Actions Status:** https://www.githubstatus.com/

---

**Happy Deploying! 🚀**

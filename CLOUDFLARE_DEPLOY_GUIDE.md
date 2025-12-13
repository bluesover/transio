# 🚀 Complete Deployment Guide: Transio on Cloudflare Pages with Custom Domain

**Project**: Transio - XML/XSLT Transformer  
**Domain**: transio.org  
**Platform**: Cloudflare Pages  
**DNS Provider**: GoDaddy

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Fix Repository Issues](#fix-repository-issues)
3. [Deploy to Cloudflare Pages](#deploy-to-cloudflare-pages)
4. [Configure Custom Domain (GoDaddy DNS)](#configure-custom-domain-godaddy-dns)
5. [SSL/HTTPS Setup](#sslhttps-setup)
6. [Verification & Testing](#verification--testing)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

Before starting, ensure you have:

- ✅ GitHub account with repository access
- ✅ Cloudflare account (free tier works)
- ✅ GoDaddy account with transio.org domain
- ✅ Git installed locally
- ✅ Node.js 18+ and npm installed

---

## 🔧 Fix Repository Issues

### Problem
The current build fails because of package lock file mismatches. You need to regenerate the lock file.

### Solution

**Step 1: Clone Your Repository**
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/transio-xslt-transformer.git
cd transio-xslt-transformer
```

**Step 2: Delete Old Lock File**
```bash
# Remove the outdated lock file
rm package-lock.json
rm -rf node_modules
```

**Step 3: Regenerate Lock File**
```bash
# Clean install to generate new lock file
npm install
```

**Step 4: Commit and Push**
```bash
git add package-lock.json
git commit -m "fix: regenerate package-lock.json for Cloudflare deployment"
git push origin main
```

---

## ☁️ Deploy to Cloudflare Pages

### Step 1: Connect to Cloudflare

1. **Login to Cloudflare**
   - Go to https://dash.cloudflare.com
   - Sign in or create account

2. **Navigate to Pages**
   - Click **"Workers & Pages"** in sidebar
   - Click **"Create application"**
   - Select **"Pages"** tab
   - Click **"Connect to Git"**

### Step 2: Connect GitHub Repository

1. **Authorize GitHub**
   - Click **"Connect GitHub"**
   - Authorize Cloudflare Pages

2. **Select Repository**
   - Choose your repository: `transio-xslt-transformer`
   - Click **"Begin setup"**

### Step 3: Configure Build Settings

Enter these exact settings:

```
Project name:           transio-xslt-transformer
Production branch:      main
Framework preset:       Vite
Build command:          npm run build
Build output directory: dist
Root directory:         /
Node version:           18
```

**Environment Variables** (if needed):
```
NODE_VERSION=18
```

### Step 4: Deploy

1. Click **"Save and Deploy"**
2. Wait 2-5 minutes for build to complete
3. You'll get a URL like: `transio-xslt-transformer.pages.dev`

---

## 🌐 Configure Custom Domain (GoDaddy DNS)

### Overview
You need to point transio.org to Cloudflare Pages using DNS records in GoDaddy.

### Step 1: Add Custom Domain in Cloudflare

1. **In Cloudflare Pages Dashboard**
   - Go to your deployed project
   - Click **"Custom domains"** tab
   - Click **"Set up a custom domain"**

2. **Add Your Domain**
   - Enter: `transio.org`
   - Click **"Continue"**

3. **Add WWW Subdomain (Optional)**
   - Enter: `www.transio.org`
   - Click **"Continue"**

4. **Note DNS Records**
   Cloudflare will show you DNS records like:
   ```
   Type: CNAME
   Name: transio.org
   Target: transio-xslt-transformer.pages.dev
   
   Type: CNAME
   Name: www
   Target: transio-xslt-transformer.pages.dev
   ```

### Step 2: Configure GoDaddy DNS

1. **Login to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

2. **Navigate to DNS Management**
   - Click **"My Products"**
   - Find **"Domains"** section
   - Click **"DNS"** next to `transio.org`

3. **Remove Conflicting Records**
   - Delete any existing `A` records for `@` (root domain)
   - Delete any existing `CNAME` records for `www`

4. **Add New DNS Records**

   **For Root Domain (transio.org):**
   ```
   Type:    CNAME
   Name:    @
   Value:   transio-xslt-transformer.pages.dev
   TTL:     600 seconds (10 minutes)
   ```
   
   **For WWW Subdomain (www.transio.org):**
   ```
   Type:    CNAME
   Name:    www
   Value:   transio-xslt-transformer.pages.dev
   TTL:     600 seconds (10 minutes)
   ```

5. **Important Notes:**
   - ⚠️ Some registrars don't allow CNAME on root domain (`@`)
   - If GoDaddy blocks this, use **CNAME Flattening** or **ALIAS** record
   - Alternative: Use Cloudflare as your DNS provider (see Advanced Setup below)

6. **Save Changes**
   - Click **"Save"** on each record
   - DNS propagation takes 10 minutes - 48 hours (usually < 1 hour)

---

## 🔒 SSL/HTTPS Setup

### Automatic SSL (Cloudflare handles this)

1. **In Cloudflare Pages**
   - Go to your project settings
   - Navigate to **"Custom domains"**
   - Verify SSL status shows **"Active"**

2. **Force HTTPS (Recommended)**
   - In project settings
   - Enable **"Always Use HTTPS"**
   - This redirects all HTTP traffic to HTTPS

3. **SSL Certificate**
   - Cloudflare automatically provisions SSL certificates
   - Usually takes 5-15 minutes after DNS is configured
   - Certificate auto-renews

---

## ✅ Verification & Testing

### Check DNS Propagation

```bash
# Check if DNS is updated (Mac/Linux)
dig transio.org
dig www.transio.org

# Check if DNS is updated (Windows)
nslookup transio.org
nslookup www.transio.org
```

### Online Tools
- https://www.whatsmydns.net/#CNAME/transio.org
- https://dnschecker.org/#CNAME/transio.org

### Test Your Site

1. **Direct Page Access**
   - Visit: https://transio-xslt-transformer.pages.dev
   - Should load successfully

2. **Custom Domain**
   - Visit: https://transio.org
   - Visit: https://www.transio.org
   - Both should load your app

3. **HTTPS**
   - Check for padlock icon in browser
   - Certificate should be valid

4. **Functionality Test**
   - Test XML transformation
   - Verify all features work
   - Check browser console for errors

---

## 🐛 Troubleshooting

### Build Fails on Cloudflare

**Error**: `npm ci` package lock mismatch

**Solution**:
```bash
# Locally:
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: regenerate lock file"
git push
```

**Error**: Build command failed

**Solution**:
- Check build settings: command should be `npm run build`
- Output directory should be `dist`
- Try changing Node version to 18 in environment variables

### DNS Not Resolving

**Problem**: transio.org doesn't load after 24 hours

**Solution**:
1. Verify DNS records in GoDaddy are correct
2. Check CNAME target matches your Cloudflare Pages URL
3. Clear your DNS cache:
   ```bash
   # Mac/Linux
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```

### GoDaddy Blocks CNAME on Root Domain

**Problem**: Can't create CNAME for `@` record

**Solution 1 - Use Cloudflare DNS** (Recommended):
1. In Cloudflare, click **"Add a Site"**
2. Enter `transio.org`
3. Choose free plan
4. Cloudflare will provide nameservers
5. Update nameservers in GoDaddy to Cloudflare's nameservers
6. Then add CNAME records in Cloudflare (they support CNAME flattening)

**Solution 2 - Use A Records**:
1. Contact Cloudflare support for static IP addresses
2. Or use Cloudflare's proxy IPs:
   ```
   Type: A
   Name: @
   Value: 104.21.0.0 (IPv4)
   ```

### SSL Certificate Issues

**Problem**: SSL not working / Certificate errors

**Solution**:
1. Wait 15-30 minutes for certificate provisioning
2. In Cloudflare Pages, check **"Custom domains"** tab
3. SSL status should show **"Active"**
4. If stuck, remove and re-add the custom domain

### Site Shows 404

**Problem**: Site deployed but shows 404

**Solution**:
1. Check build output directory is `dist`
2. Verify `index.html` exists in build output
3. Check Cloudflare Pages deployment logs
4. Rebuild project in Cloudflare dashboard

---

## 🎯 Advanced: Using Cloudflare as DNS Provider (Recommended)

For best performance and easier management, transfer DNS to Cloudflare:

### Step 1: Add Site to Cloudflare

1. In Cloudflare dashboard, click **"Add a Site"**
2. Enter `transio.org`
3. Select **"Free"** plan
4. Click **"Continue"**

### Step 2: Get Cloudflare Nameservers

Cloudflare will provide nameservers like:
```
chloe.ns.cloudflare.com
kurt.ns.cloudflare.com
```

### Step 3: Update Nameservers in GoDaddy

1. Login to GoDaddy
2. Go to **"My Products"** > **"Domains"**
3. Click **"Manage DNS"** for transio.org
4. Scroll to **"Nameservers"** section
5. Click **"Change"**
6. Select **"Custom"**
7. Enter Cloudflare nameservers
8. Save changes

### Step 4: Configure DNS in Cloudflare

Once nameservers are updated (24-48 hours):

1. In Cloudflare, go to **"DNS"** > **"Records"**
2. Add CNAME records:
   ```
   Type: CNAME
   Name: @
   Target: transio-xslt-transformer.pages.dev
   Proxy: Enabled (orange cloud)
   
   Type: CNAME
   Name: www
   Target: transio-xslt-transformer.pages.dev
   Proxy: Enabled (orange cloud)
   ```

3. Benefits:
   - ✅ CNAME flattening works automatically
   - ✅ Better performance with CDN
   - ✅ DDoS protection
   - ✅ Analytics included
   - ✅ Easier SSL management

---

## 📊 Post-Deployment Checklist

After successful deployment, verify:

- [ ] Site loads at https://transio.org
- [ ] WWW redirect works (www.transio.org → transio.org)
- [ ] SSL certificate is valid and trusted
- [ ] All features work correctly:
  - [ ] XML input editor
  - [ ] XSLT stylesheet editor
  - [ ] Transform function
  - [ ] Version management
  - [ ] File system operations
  - [ ] Activity log
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] Analytics working (if configured)
- [ ] SEO metadata present (check page source)

---

## 🔄 Continuous Deployment

Every time you push to GitHub:

1. Cloudflare automatically detects changes
2. Triggers new build
3. Deploys to production if build succeeds
4. Updates live site at transio.org

**View Deployments**:
- Go to Cloudflare Pages dashboard
- Click your project
- View **"Deployments"** tab for history

---

## 📝 Quick Reference Commands

```bash
# Local development
npm run dev

# Build locally to test
npm run build
npm run preview

# Update dependencies
npm update

# Force rebuild on Cloudflare
# Go to dashboard > Deployments > Retry deployment

# Check DNS
dig transio.org
nslookup transio.org

# Test site loading
curl -I https://transio.org
```

---

## 🆘 Need Help?

**Cloudflare Support**:
- Community: https://community.cloudflare.com
- Docs: https://developers.cloudflare.com/pages

**GoDaddy Support**:
- Help: https://www.godaddy.com/help
- DNS Guide: https://www.godaddy.com/help/manage-dns-records-680

**Project Issues**:
- GitHub Issues: Your repository issues page
- Create detailed bug reports with error logs

---

## 🎉 Success!

Once everything is configured:

✅ Your site is live at **https://transio.org**  
✅ Automatic SSL/HTTPS enabled  
✅ Global CDN for fast loading  
✅ Auto-deployment on git push  
✅ Free hosting with Cloudflare Pages  

**Share your success**: Tweet about your deployment @CloudflareDev

---

## 📄 Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages)
- [Custom Domain Setup](https://developers.cloudflare.com/pages/platform/custom-domains)
- [DNS Configuration](https://developers.cloudflare.com/dns)
- [Vite Build Configuration](https://vitejs.dev/guide/build.html)
- [Transio Project README](./README.md)

---

**Last Updated**: December 2024  
**Transio Version**: 1.0.0  
**Author**: Transio Team  
**Website**: https://transio.org

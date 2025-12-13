# 🌐 Custom Domain Setup Guide for transio.org

**Complete DNS Configuration Guide for Transio - Open Source XML/XSLT Transformer**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Hosting Platform Options](#hosting-platform-options)
4. [DNS Configuration by Platform](#dns-configuration-by-platform)
5. [SSL/TLS Certificate Setup](#ssltls-certificate-setup)
6. [Verification & Testing](#verification--testing)
7. [Advanced Configuration](#advanced-configuration)
8. [Troubleshooting](#troubleshooting)
9. [Performance Optimization](#performance-optimization)
10. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🎯 Overview

Transio is a **100% open-source**, client-side XML/XSLT transformation tool that runs entirely in the browser. This guide will help you deploy it to your custom domain **transio.org** with proper DNS configuration.

### Key Features of Transio:
- ✅ **Privacy-First**: All transformations happen in the browser
- ✅ **Free & Open Source**: No backend servers required
- ✅ **Fast**: Static site hosting for optimal performance
- ✅ **Zero Dependencies**: No databases or server-side processing
- ✅ **XSLT Support**: Versions 1.0, 2.0, and 3.0

---

## 📦 Prerequisites

Before configuring DNS, ensure you have:

- [ ] Domain registered: **transio.org** (purchased from registrar like Namecheap, GoDaddy, Google Domains, etc.)
- [ ] Access to domain registrar's DNS management panel
- [ ] Chosen hosting platform (see options below)
- [ ] Built production files ready for deployment
- [ ] GitHub repository set up (for CI/CD deployment)

---

## 🚀 Hosting Platform Options

Transio works best on **static site hosting platforms** (no server required):

### **Recommended: Netlify** (Easiest)
- ✅ Free SSL certificates
- ✅ Automatic deployment from GitHub
- ✅ Global CDN included
- ✅ Instant cache invalidation
- ✅ Free tier: Generous limits

### **Alternative: Vercel**
- ✅ Next.js optimized (works great for React)
- ✅ Free SSL certificates
- ✅ Edge network deployment
- ✅ GitHub integration

### **Alternative: GitHub Pages**
- ✅ Free hosting for public repos
- ✅ Custom domain support
- ✅ Simple setup
- ⚠️ Requires manual SSL setup

### **Alternative: Cloudflare Pages**
- ✅ Free unlimited bandwidth
- ✅ Global CDN
- ✅ Built-in DDoS protection
- ✅ Fast build times

### **Self-Hosted Option**
- ✅ Full control
- ⚠️ Requires server management
- ⚠️ SSL certificate management
- Platforms: DigitalOcean, AWS S3, Google Cloud Storage

---

## 🔧 DNS Configuration by Platform

### Option 1: Netlify (Recommended)

#### Step 1: Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy your site
netlify deploy --prod
```

#### Step 2: Configure DNS Records

**If using Netlify DNS (Recommended):**
1. Go to Netlify Dashboard → Domain Settings
2. Click "Add custom domain"
3. Enter: `transio.org`
4. Netlify will provide nameservers (e.g., `dns1.p03.nsone.net`)

**Update at your domain registrar:**
- Change nameservers to Netlify's nameservers
- Wait 24-48 hours for propagation

**If using external DNS:**
Add these records at your registrar:

```dns
# A Records (Root domain)
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

# CNAME Record (www subdomain)
Type: CNAME
Name: www
Value: [your-site].netlify.app
TTL: 3600

# Optional: Redirect www to root
# (Configure in Netlify dashboard under Domain Management)
```

---

### Option 2: Vercel

#### Step 1: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Step 2: DNS Configuration

Add these records at your domain registrar:

```dns
# A Record (Root domain)
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

# CNAME Record (www subdomain)
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

Verify domain in Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add `transio.org` and `www.transio.org`
3. Vercel will automatically verify and issue SSL

---

### Option 3: Cloudflare Pages

#### Step 1: Deploy to Cloudflare Pages
1. Login to Cloudflare Dashboard
2. Go to Pages → Create a project
3. Connect GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`

#### Step 2: DNS Configuration

**If domain is already on Cloudflare:**
```dns
# CNAME Record (Root domain - Cloudflare allows this)
Type: CNAME
Name: @
Value: [your-project].pages.dev
Proxy: Enabled (orange cloud)
TTL: Auto

# CNAME Record (www subdomain)
Type: CNAME
Name: www
Value: [your-project].pages.dev
Proxy: Enabled (orange cloud)
TTL: Auto
```

**If transferring domain to Cloudflare:**
1. Add domain to Cloudflare
2. Update nameservers at registrar to Cloudflare's
3. Wait for activation (usually 1-24 hours)
4. Add CNAME records as above

---

### Option 4: GitHub Pages

#### Step 1: Configure GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch `main` or `gh-pages`
4. Build and deploy using GitHub Actions (recommended)

#### Step 2: DNS Configuration

Add these records at your domain registrar:

```dns
# A Records (GitHub Pages IPs)
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600

# CNAME Record
Type: CNAME
Name: www
Value: [your-username].github.io
TTL: 3600
```

#### Step 3: Configure Custom Domain in GitHub
1. Repository Settings → Pages
2. Custom domain: `transio.org`
3. Save (this creates a CNAME file in your repo)
4. Wait for DNS check
5. Enable "Enforce HTTPS" (after DNS propagates)

---

## 🔒 SSL/TLS Certificate Setup

### Automatic SSL (Recommended)

**Netlify, Vercel, Cloudflare Pages:**
- SSL certificates are **automatically provisioned** and renewed
- Using Let's Encrypt (free)
- No manual configuration needed
- HTTPS enforced by default

**GitHub Pages:**
- Automatic SSL after DNS verification
- May take up to 24 hours to provision
- Check "Enforce HTTPS" in repository settings

### Manual SSL Setup (Self-Hosted)

If self-hosting, use **Certbot** for free SSL:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d transio.org -d www.transio.org

# Auto-renewal (add to crontab)
0 0 1 * * certbot renew --quiet
```

---

## ✅ Verification & Testing

### Step 1: Check DNS Propagation

Use these tools to verify DNS changes:

```bash
# Command line check
nslookup transio.org
dig transio.org

# Online tools (recommended)
# https://www.whatsmydns.net/
# https://dnschecker.org/
```

Expected results:
```
transio.org → Points to hosting platform IP
www.transio.org → CNAME to hosting platform
```

### Step 2: Test SSL Certificate

```bash
# Check SSL certificate
openssl s_client -connect transio.org:443 -servername transio.org

# Online SSL test
# https://www.ssllabs.com/ssltest/
```

### Step 3: Verify HTTP → HTTPS Redirect

Test these URLs:
- ✅ http://transio.org → https://transio.org
- ✅ http://www.transio.org → https://transio.org
- ✅ https://www.transio.org → https://transio.org

### Step 4: Test Application Functionality

1. Open https://transio.org
2. Test XML transformation
3. Check all features work
4. Test on mobile and desktop
5. Verify local storage persistence

---

## ⚙️ Advanced Configuration

### Custom Headers for Security

Add these headers via hosting platform config:

**netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
```

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Performance Headers

```toml
# Caching for static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Redirect Rules

**Netlify _redirects file:**
```
# Redirect www to non-www
https://www.transio.org/* https://transio.org/:splat 301!

# Redirect HTTP to HTTPS
http://transio.org/* https://transio.org/:splat 301!
```

---

## 🐛 Troubleshooting

### DNS Not Propagating
**Issue:** Domain doesn't resolve after 24 hours

**Solutions:**
1. Verify DNS records are correct (no typos)
2. Check TTL values (lower = faster propagation)
3. Clear DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```
4. Try different DNS servers (Google: 8.8.8.8, Cloudflare: 1.1.1.1)

### SSL Certificate Not Provisioning
**Issue:** HTTPS not working after DNS setup

**Solutions:**
1. Wait 24-48 hours for DNS propagation
2. Verify DNS is fully propagated globally
3. Check hosting platform SSL status
4. Remove and re-add domain in hosting dashboard
5. Contact hosting support if issue persists

### Mixed Content Warnings
**Issue:** Browser shows "Not Secure" despite HTTPS

**Solutions:**
1. Ensure all resources use HTTPS URLs
2. Check for HTTP links in HTML/CSS/JS
3. Update Content Security Policy headers
4. Use relative URLs where possible

### Application Not Loading
**Issue:** 404 or blank page after deployment

**Solutions:**
1. Verify build succeeded (check build logs)
2. Confirm output directory is correct (`dist`)
3. Check `index.html` is in root of output
4. Verify routing configuration for SPA
5. Check browser console for errors

---

## ⚡ Performance Optimization

### CDN Configuration

All recommended platforms include CDN by default, but you can optimize further:

**Cloudflare CDN (Additional Layer):**
1. Add domain to Cloudflare (as proxy)
2. Enable Auto Minify (JS, CSS, HTML)
3. Enable Brotli compression
4. Configure caching rules
5. Enable HTTP/3

### Asset Optimization

```bash
# Already configured in Vite, but you can verify:
# - Code splitting enabled
# - Tree shaking for unused code
# - CSS purging for unused styles
# - Image optimization (use WebP where possible)
# - Font subsetting for Google Fonts
```

### Monitoring Setup

**Free monitoring tools:**

1. **Google Analytics** (optional)
   - Track usage patterns
   - Monitor performance metrics
   - Analyze user behavior

2. **Sentry** (error tracking)
   - Real-time error monitoring
   - Performance monitoring
   - Free tier available

3. **Uptime monitoring**
   - UptimeRobot (free)
   - Pingdom
   - StatusCake

---

## 📊 Monitoring & Maintenance

### Regular Checks

- [ ] **Weekly:** Check uptime status
- [ ] **Monthly:** Review error logs
- [ ] **Monthly:** Check SSL expiration (auto-renewed, but verify)
- [ ] **Quarterly:** Review DNS configuration
- [ ] **Quarterly:** Update dependencies

### Analytics to Track

1. **Performance Metrics:**
   - Page load time
   - Time to first byte (TTFB)
   - Largest contentful paint (LCP)
   - First input delay (FID)
   - Cumulative layout shift (CLS)

2. **Usage Metrics:**
   - Daily/monthly active users
   - Transformation success rate
   - Most used features
   - Browser/device distribution

3. **Technical Metrics:**
   - Error rate
   - API failures (if any)
   - Build success rate
   - Deployment frequency

---

## 🎉 Deployment Checklist

Use this final checklist before going live:

- [ ] DNS records configured correctly
- [ ] DNS propagated globally (check whatsmydns.net)
- [ ] SSL certificate active and valid
- [ ] HTTP → HTTPS redirect working
- [ ] www → non-www redirect working (or vice versa)
- [ ] All pages load correctly
- [ ] XML transformation works
- [ ] File upload/download works
- [ ] Local storage persistence works
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing complete
- [ ] Security headers configured
- [ ] Performance headers configured
- [ ] Analytics configured (optional)
- [ ] Error monitoring configured (optional)
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] README.md includes deployment info

---

## 📞 Support & Resources

### Official Resources
- **Repository:** https://github.com/[your-username]/transio
- **Issues:** Submit bugs and feature requests on GitHub
- **Discussions:** Community Q&A on GitHub Discussions

### Helpful Links
- [Netlify DNS Documentation](https://docs.netlify.com/domains-https/custom-domains/)
- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

### Community Support
- Open an issue on GitHub for technical problems
- Check existing issues for solutions
- Contribute improvements via pull requests

---

## 🔐 Security Best Practices

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

2. **Enable HTTPS Only**
   - Force HTTPS redirects
   - Use HSTS headers

3. **Implement CSP**
   - Content Security Policy headers
   - Prevent XSS attacks

4. **Regular Backups**
   - Git version control (automatic)
   - Export project data regularly
   - Document configuration

5. **Access Control**
   - Limit deployment access
   - Use environment variables for secrets
   - Never commit sensitive data

---

## 🚀 Quick Start Commands

### Netlify Deployment
```bash
# One-time setup
npm install -g netlify-cli
netlify login

# Deploy
npm run build
netlify deploy --prod

# Configure domain in dashboard
```

### Vercel Deployment
```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy
vercel --prod

# Add domain in dashboard
```

### GitHub Pages Deployment
```bash
# Build
npm run build

# Deploy (manual)
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages

# Or use GitHub Actions (recommended - already configured)
git push origin main
```

---

## 📝 Final Notes

**Transio is open source!** This means:
- ✅ Free to use forever
- ✅ Free to modify and customize
- ✅ Free to self-host
- ✅ No vendor lock-in
- ✅ Community-driven development

**Share your deployment!**
- Star the repository on GitHub
- Share transio.org with others
- Contribute improvements back to the project
- Report bugs and suggest features

---

**Ready to deploy? Choose your hosting platform above and follow the steps!**

For questions or issues, open a GitHub issue or consult the community documentation.

*Last updated: January 2025*

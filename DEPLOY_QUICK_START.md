# ⚡ Quick Start: Deploy Transio to Cloudflare Pages

**5-Minute Deployment Guide** | **Domain**: transio.org

---

## 🚨 FIRST: Fix Build Error

Your current build fails. Run these commands **locally**:

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/transio-xslt-transformer.git
cd transio-xslt-transformer

# 2. Regenerate lock file
rm package-lock.json
npm install

# 3. Commit and push
git add package-lock.json
git commit -m "fix: regenerate package-lock for deployment"
git push origin main
```

---

## ☁️ Deploy to Cloudflare

### 1. Setup Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** → **Create application** → **Pages**
3. Connect GitHub → Select repository
4. Build settings:
   ```
   Build command:    npm run build
   Build directory:  dist
   Framework:        Vite
   ```
5. Click **Save and Deploy**

### 2. Add Custom Domain

1. In Cloudflare Pages → **Custom domains**
2. Add `transio.org` and `www.transio.org`
3. Note the CNAME target (e.g., `transio-xslt-transformer.pages.dev`)

---

## 🌐 Configure GoDaddy DNS

### 1. Login to GoDaddy

Go to https://www.godaddy.com → **My Products** → **DNS**

### 2. Add DNS Records

**Delete old A/CNAME records first, then add:**

| Type  | Name | Value                                     | TTL |
|-------|------|-------------------------------------------|-----|
| CNAME | @    | transio-xslt-transformer.pages.dev       | 600 |
| CNAME | www  | transio-xslt-transformer.pages.dev       | 600 |

### 3. Wait for Propagation

- Usually takes 10-60 minutes
- Check: https://www.whatsmydns.net/#CNAME/transio.org

---

## ✅ Verify Deployment

```bash
# Check DNS
nslookup transio.org

# Test site
curl -I https://transio.org
```

Visit: **https://transio.org** ✨

---

## ⚠️ If GoDaddy Blocks CNAME on Root

**Option A**: Switch to Cloudflare DNS (Recommended)
1. Cloudflare → **Add a Site** → `transio.org`
2. Get nameservers (e.g., `chloe.ns.cloudflare.com`)
3. Update in GoDaddy: **Domains** → **Nameservers** → **Custom**
4. Add DNS records in Cloudflare instead

**Option B**: Use A records
Contact Cloudflare support for IP addresses

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Build fails | Regenerate package-lock.json (see above) |
| 404 error | Check build output is `dist` |
| DNS not resolving | Wait longer, clear DNS cache |
| SSL error | Wait 15 mins for certificate |

---

## 📖 Full Guide

For detailed instructions, see: **[CLOUDFLARE_DEPLOY_GUIDE.md](./CLOUDFLARE_DEPLOY_GUIDE.md)**

---

**Questions?** Open an issue on GitHub or check Cloudflare docs.

# 📄 Deployment Cheat Sheet - Transio.org

**Quick reference for deploying to Cloudflare Pages with GoDaddy DNS**

---

## 🔧 1. Fix Build (Run Locally)

```bash
git clone https://github.com/YOUR_USERNAME/transio-xslt-transformer.git
cd transio-xslt-transformer
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: regenerate package-lock.json"
git push
```

---

## ☁️ 2. Cloudflare Pages Setup

| Setting | Value |
|---------|-------|
| **URL** | https://dash.cloudflare.com |
| **Location** | Workers & Pages → Create → Pages → Connect to Git |
| **Repository** | transio-xslt-transformer |
| **Build command** | `npm run build` |
| **Build output** | `dist` |
| **Framework** | Vite |
| **Node version** | 18 |

---

## 🌐 3. GoDaddy DNS Records

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | transio-xslt-transformer.pages.dev | 600 |
| CNAME | www | transio-xslt-transformer.pages.dev | 600 |

**Where**: GoDaddy.com → My Products → Domains → DNS

---

## ✅ 4. Verification Commands

```bash
# Check DNS
dig transio.org
nslookup transio.org

# Test site
curl -I https://transio.org

# Check DNS propagation
# Visit: https://www.whatsmydns.net
```

---

## 🐛 5. Common Issues

| Problem | Solution |
|---------|----------|
| Build fails | Regenerate package-lock.json (step 1) |
| DNS not working | Wait 1-24 hours, check records |
| SSL error | Wait 15 minutes, remove/re-add domain |
| 404 error | Check build output is `dist` |
| CNAME blocked | Switch to Cloudflare DNS |

---

## 🔄 6. Update Site

```bash
# Make changes
git add .
git commit -m "your message"
git push

# Cloudflare auto-deploys!
```

---

## 📊 7. Important URLs

- **Dashboard**: https://dash.cloudflare.com
- **Your site**: https://transio.org
- **Cloudflare URL**: https://transio-xslt-transformer.pages.dev
- **DNS check**: https://www.whatsmydns.net
- **SSL check**: https://www.ssllabs.com/ssltest

---

## 🆘 8. Get Help

- Full guide: [DEPLOYMENT_COMPLETE_GUIDE.md](./DEPLOYMENT_COMPLETE_GUIDE.md)
- Visual guide: [DNS_SETUP_VISUAL.md](./DNS_SETUP_VISUAL.md)
- Cloudflare docs: https://developers.cloudflare.com/pages

---

**Transio v1.0.0** | Open Source | https://transio.org

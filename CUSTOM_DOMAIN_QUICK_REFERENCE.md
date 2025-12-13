# 🚀 Quick DNS Setup Reference for transio.org

**Ultra-fast reference guide for deploying Transio to your custom domain**

---

## ⚡ 5-Minute Setup (Netlify - Easiest)

### Step 1: Deploy to Netlify (2 minutes)
```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod
```

### Step 2: Add Domain (1 minute)
1. Go to Netlify Dashboard → Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter: `transio.org`
4. Click "Verify"

### Step 3: Update DNS at Your Registrar (2 minutes)

**Option A: Use Netlify DNS (Recommended)**
- Change your nameservers to Netlify's (provided in dashboard)
- Wait 24-48 hours

**Option B: Use External DNS**
Add these records:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: [your-site-name].netlify.app
```

**Done!** SSL auto-provisions in ~1 hour after DNS propagates.

---

## 📋 DNS Record Cheat Sheet

### For Netlify
```dns
# Root domain
A     @     75.2.60.5

# WWW subdomain  
CNAME www   [site-name].netlify.app
```

### For Vercel
```dns
# Root domain
A     @     76.76.21.21

# WWW subdomain
CNAME www   cname.vercel-dns.com
```

### For GitHub Pages
```dns
# Root domain (add all 4)
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153

# WWW subdomain
CNAME www   [username].github.io
```

### For Cloudflare Pages
```dns
# Root domain (CNAME flattening)
CNAME @     [project].pages.dev   (Proxied)

# WWW subdomain
CNAME www   [project].pages.dev   (Proxied)
```

---

## 🔧 Common Registrar Instructions

### Namecheap
1. Login → Domain List → Manage
2. Advanced DNS tab
3. Add new records (see cheat sheet above)
4. TTL: Automatic

### GoDaddy
1. Login → My Products → DNS
2. Click "Add" for each record
3. Enter values from cheat sheet
4. TTL: 1 Hour (3600)

### Google Domains
1. Login → DNS
2. Custom resource records
3. Add records from cheat sheet
4. TTL: 3600

### Cloudflare
1. Login → Domain → DNS
2. Add record button
3. Follow cheat sheet
4. Proxy status: DNS only (gray cloud) for non-Cloudflare hosting

---

## ✅ Verification Commands

```bash
# Check DNS propagation
nslookup transio.org

# Check worldwide propagation
# Visit: https://www.whatsmydns.net/

# Check SSL certificate
curl -I https://transio.org

# Test redirects
curl -I http://transio.org
curl -I http://www.transio.org
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| DNS not resolving | Wait 24-48 hours, clear DNS cache |
| SSL not working | Wait for DNS propagation, then SSL auto-provisions |
| www not redirecting | Configure redirect in hosting platform settings |
| 404 error | Check build output directory is `dist` |
| Site not loading | Verify index.html in build output |

---

## 📞 Get Help Fast

1. **Check build logs** in hosting platform dashboard
2. **Test DNS propagation**: https://www.whatsmydns.net/
3. **Test SSL**: https://www.ssllabs.com/ssltest/
4. **Clear browser cache**: Ctrl+Shift+R (Cmd+Shift+R on Mac)
5. **Check hosting status page** for outages

---

## 🎯 Platform-Specific Quick Links

- **Netlify**: https://app.netlify.com/ → Sites → [Your Site] → Domain Settings
- **Vercel**: https://vercel.com/dashboard → Project → Settings → Domains
- **GitHub Pages**: Repository → Settings → Pages → Custom Domain
- **Cloudflare Pages**: Dashboard → Pages → [Project] → Custom Domains

---

## 💡 Pro Tips

1. **Use Netlify or Vercel** for easiest setup (SSL auto-configured)
2. **Lower TTL** before DNS changes (faster propagation)
3. **Test in incognito** to avoid cache issues
4. **Use HTTPS** everywhere (hosting platforms force this)
5. **Monitor with UptimeRobot** (free) after deployment

---

**Need detailed instructions?** See `DNS_SETUP_GUIDE.md` for comprehensive documentation.

# transio.org Custom Domain - Quick Setup

## 🎯 5-Minute Setup Guide

### Step 1: Cloudflare - Add Domain (2 min)
1. Go to https://dash.cloudflare.com/
2. Click **"Add a Site"**
3. Enter: **transio.org**
4. Choose **Free Plan**
5. **Copy the 2 nameservers shown** (e.g., `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)

---

### Step 2: GoDaddy - Update Nameservers (2 min)
1. Go to https://www.godaddy.com/
2. **My Products** → **transio.org** → **DNS**
3. **Nameservers** section → **Change Nameservers**
4. Select **"I'll use my own nameservers"**
5. Paste the 2 Cloudflare nameservers
6. Click **Save**

⏰ **Wait 2-4 hours for DNS propagation**

---

### Step 3: Cloudflare - Add DNS Records (1 min)
1. Cloudflare Dashboard → **transio.org** → **DNS** → **Records**
2. Add these 2 records:

**Record 1:**
```
Type: CNAME
Name: @
Target: transio.pages.dev  (your actual Cloudflare Pages URL)
Proxy: ON (orange cloud)
```

**Record 2:**
```
Type: CNAME
Name: www
Target: transio.pages.dev  (your actual Cloudflare Pages URL)
Proxy: ON (orange cloud)
```

---

### Step 4: Cloudflare Pages - Add Custom Domain (1 min)
1. Cloudflare Dashboard → **Workers & Pages**
2. Select **transio** project
3. **Custom domains** tab
4. Click **"Set up a custom domain"**
5. Enter: **transio.org** → Continue
6. Repeat for: **www.transio.org** → Continue

---

### Step 5: SSL Settings (30 sec)
1. Cloudflare Dashboard → **transio.org** → **SSL/TLS**
2. Set mode to: **Full (strict)**
3. **Edge Certificates** → Enable **"Always Use HTTPS"**

---

## ✅ Verification (After DNS Propagates)

**Check if ready:**
```bash
dig transio.org
```

**Test URLs:**
- https://transio.org ✅
- https://www.transio.org ✅ (should redirect to above)
- http://transio.org ✅ (should redirect to HTTPS)

---

## 🚨 Troubleshooting

**DNS not propagating?**
- Wait 2-4 hours (max 48 hours)
- Check: https://dnschecker.org/
- Verify GoDaddy nameservers match Cloudflare exactly

**SSL error?**
- Wait 15 minutes for certificate provisioning
- Ensure SSL/TLS mode is "Full (strict)"

**Site not found?**
- Verify CNAME target matches your actual `*.pages.dev` URL
- Ensure DNS records are **Proxied** (orange cloud)

---

## 📋 Quick Command Reference

```bash
# Check nameservers
dig NS transio.org

# Check DNS record
dig transio.org

# Check WWW
dig www.transio.org

# Full DNS info
nslookup transio.org

# Check SSL
curl -I https://transio.org
```

---

## 📞 Get Your Cloudflare Pages URL

If you don't know your Cloudflare Pages URL:

1. Cloudflare Dashboard → **Workers & Pages**
2. Click **transio** project
3. Look for **"Domains"** or **"Deployments"** section
4. Your URL is something like: `transio.pages.dev`

---

## Timeline

- **Now:** Update nameservers in GoDaddy
- **+2-4 hours:** DNS propagates
- **+5-15 min after DNS:** SSL certificate provisions
- **Done:** Site live at https://transio.org

---

**Need detailed guide?** See `CUSTOM_DOMAIN_SETUP.md`

# Custom Domain Setup Guide: transio.org

## Overview
This guide walks you through configuring your custom domain **transio.org** (registered with GoDaddy) to work with your Cloudflare Pages deployment.

---

## Prerequisites
- ✅ Domain registered at GoDaddy: **transio.org**
- ✅ Cloudflare account created
- ✅ Application deployed to Cloudflare Pages
- 📝 Cloudflare Pages URL (e.g., `transio.pages.dev`)

---

## Step 1: Add Domain to Cloudflare

### 1.1 Add Site to Cloudflare
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **"Add a Site"** button
3. Enter your domain: **transio.org**
4. Click **"Add Site"**
5. Select **Free Plan** (or your preferred plan)
6. Click **"Continue"**

### 1.2 Note Your Cloudflare Nameservers
Cloudflare will provide you with 2 nameservers. They look like:
```
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```
**Write these down** - you'll need them for GoDaddy configuration.

---

## Step 2: Update GoDaddy DNS to Use Cloudflare

### 2.1 Log into GoDaddy
1. Go to [GoDaddy.com](https://www.godaddy.com/)
2. Sign in to your account
3. Navigate to **My Products**
4. Find **transio.org** and click **DNS**

### 2.2 Change Nameservers
1. Scroll down to **Nameservers** section
2. Click **"Change Nameservers"**
3. Select **"I'll use my own nameservers"**
4. Enter the 2 Cloudflare nameservers you noted earlier:
   ```
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```
5. Click **"Save"**

**⏰ DNS Propagation Time:** Changes can take 24-48 hours, but usually complete in 2-4 hours.

---

## Step 3: Configure DNS in Cloudflare

Once nameservers are updated and propagated:

### 3.1 Add DNS Records
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select **transio.org** from your sites
3. Click **DNS** → **Records**

### 3.2 Add CNAME Record for Root Domain
Add the following DNS records:

**Record 1: Root Domain (@)**
| Type  | Name | Target                          | Proxy Status | TTL  |
|-------|------|---------------------------------|--------------|------|
| CNAME | @    | transio.pages.dev               | Proxied      | Auto |

**Record 2: WWW Subdomain**
| Type  | Name | Target                          | Proxy Status | TTL  |
|-------|------|---------------------------------|--------------|------|
| CNAME | www  | transio.pages.dev               | Proxied      | Auto |

**Note:** Replace `transio.pages.dev` with your actual Cloudflare Pages URL.

---

## Step 4: Connect Custom Domain in Cloudflare Pages

### 4.1 Add Custom Domain
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Select your **transio** project
4. Click **Custom domains** tab
5. Click **"Set up a custom domain"**
6. Enter: **transio.org**
7. Click **"Continue"**

### 4.2 Add WWW Subdomain
1. Click **"Set up a custom domain"** again
2. Enter: **www.transio.org**
3. Click **"Continue"**

Cloudflare will automatically:
- ✅ Provision SSL certificate (free)
- ✅ Configure routing
- ✅ Enable HTTPS redirect

---

## Step 5: Configure SSL/TLS Settings

### 5.1 Set SSL/TLS Mode
1. In Cloudflare Dashboard → **transio.org**
2. Go to **SSL/TLS** → **Overview**
3. Set encryption mode to: **Full (strict)**
4. This ensures end-to-end encryption

### 5.2 Enable Always Use HTTPS
1. Go to **SSL/TLS** → **Edge Certificates**
2. Turn on **"Always Use HTTPS"**
3. This redirects all HTTP traffic to HTTPS automatically

### 5.3 Enable Automatic HTTPS Rewrites
1. In same section, enable **"Automatic HTTPS Rewrites"**
2. This fixes mixed content issues

---

## Step 6: Configure Page Rules (Optional but Recommended)

### 6.1 Add WWW Redirect Rule
1. Go to **Rules** → **Page Rules**
2. Click **"Create Page Rule"**
3. Enter URL pattern: `www.transio.org/*`
4. Add Setting: **Forwarding URL** → **301 Permanent Redirect**
5. Destination URL: `https://transio.org/$1`
6. Click **"Save and Deploy"**

This ensures www.transio.org redirects to transio.org.

---

## Step 7: Verify Deployment

### 7.1 Check DNS Propagation
Use online tools to check if DNS changes have propagated:
- [DNS Checker](https://dnschecker.org/) - Enter **transio.org**
- Look for your Cloudflare nameservers worldwide

### 7.2 Test Your Domain
1. Visit: **https://transio.org**
2. Visit: **https://www.transio.org** (should redirect to above)
3. Verify SSL certificate is valid (🔒 icon in browser)
4. Test functionality: XML/XSLT transformation, version control, etc.

---

## Troubleshooting

### Issue: "ERR_NAME_NOT_RESOLVED" or Site Not Loading

**Solution:**
- DNS may still be propagating. Wait 2-4 hours.
- Check nameservers in GoDaddy match Cloudflare exactly
- Verify CNAME records point to correct `*.pages.dev` URL

### Issue: "Your connection is not private" SSL Error

**Solution:**
- Wait for SSL certificate provisioning (can take up to 15 minutes)
- Ensure SSL/TLS mode is set to **Full (strict)**
- Check **SSL/TLS** → **Edge Certificates** shows "Active Certificate"

### Issue: Custom Domain Shows "Not Found" in Cloudflare Pages

**Solution:**
- Re-add custom domain in Pages settings
- Ensure DNS records are **Proxied** (orange cloud icon)
- Wait 10-15 minutes for changes to propagate

### Issue: Page Loads but Assets (CSS/JS) Don't Load

**Solution:**
- Enable **Automatic HTTPS Rewrites** in SSL/TLS settings
- Check browser console for mixed content errors
- Ensure all asset URLs use relative paths or HTTPS

---

## DNS Configuration Summary

**GoDaddy:**
- Nameservers: Point to Cloudflare nameservers

**Cloudflare DNS Records:**
```
Type    Name    Target                  Proxy    TTL
CNAME   @       transio.pages.dev       Proxied  Auto
CNAME   www     transio.pages.dev       Proxied  Auto
```

**Cloudflare Pages Custom Domains:**
- transio.org
- www.transio.org

---

## Performance Optimization (Optional)

### Enable Cloudflare Performance Features
1. **Caching** → Set to Standard
2. **Auto Minify** → Enable HTML, CSS, JS
3. **Brotli Compression** → Enable
4. **HTTP/3 (with QUIC)** → Enable
5. **0-RTT Connection Resumption** → Enable

---

## Security Recommendations

### Enable Security Features
1. **Security** → **Settings**:
   - Security Level: Medium or High
   - Challenge Passage: 30 minutes
   - Browser Integrity Check: On
   
2. **Firewall**:
   - Consider enabling Bot Fight Mode (free plan)
   - Set up rate limiting if needed

---

## Maintenance

### Regular Checks
- ✅ Monitor SSL certificate expiration (auto-renews on Cloudflare)
- ✅ Check Cloudflare Analytics for traffic patterns
- ✅ Review security events in Firewall dashboard
- ✅ Keep Cloudflare Pages deployment up to date via GitHub Actions

---

## Support Resources

**Cloudflare Documentation:**
- [Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [DNS Records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [SSL/TLS](https://developers.cloudflare.com/ssl/)

**GoDaddy Documentation:**
- [Change Nameservers](https://www.godaddy.com/help/change-nameservers-for-my-domains-664)
- [DNS Management](https://www.godaddy.com/help/manage-dns-680)

---

## Quick Reference Commands

### Check DNS from Terminal
```bash
# Check nameservers
dig NS transio.org

# Check CNAME record
dig transio.org

# Check WWW subdomain
dig www.transio.org

# Check SSL certificate
openssl s_client -connect transio.org:443 -servername transio.org
```

---

## Success Checklist

- [ ] Domain added to Cloudflare
- [ ] Cloudflare nameservers added to GoDaddy
- [ ] DNS records created in Cloudflare (@ and www)
- [ ] Custom domains added in Cloudflare Pages
- [ ] SSL/TLS set to "Full (strict)"
- [ ] "Always Use HTTPS" enabled
- [ ] DNS propagation complete (2-4 hours)
- [ ] Site loads at https://transio.org
- [ ] WWW redirect works (www.transio.org → transio.org)
- [ ] SSL certificate valid (🔒 icon shows in browser)
- [ ] All app features functional on custom domain

---

## Timeline

**Immediate (5 minutes):**
- Add domain to Cloudflare
- Note nameservers
- Update GoDaddy nameservers

**Short-term (15-30 minutes):**
- Add DNS records in Cloudflare
- Add custom domains in Pages
- Configure SSL/TLS settings

**Waiting Period (2-48 hours):**
- DNS propagation (usually 2-4 hours)
- SSL certificate provisioning (5-15 minutes)

**Verification (5 minutes):**
- Test domain loading
- Verify SSL
- Test app functionality

---

## Contact

For issues specific to:
- **Cloudflare:** [Cloudflare Support](https://support.cloudflare.com/)
- **GoDaddy:** [GoDaddy Support](https://www.godaddy.com/help)
- **Transio App:** [GitHub Issues](https://github.com/bluesover/transio.org/issues)

---

**Last Updated:** December 2025  
**Status:** ✅ Ready for deployment

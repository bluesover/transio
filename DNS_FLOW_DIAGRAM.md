# DNS & Cloudflare Configuration Flow

## Visual Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                          │
│                  Types: https://transio.org                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 1. DNS Lookup
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         GODADDY (Registrar)                     │
│   ┌───────────────────────────────────────────────────────┐   │
│   │  Nameservers Configuration:                           │   │
│   │  • alice.ns.cloudflare.com                           │   │
│   │  • bob.ns.cloudflare.com                             │   │
│   │                                                        │   │
│   │  Status: Points to Cloudflare DNS ✓                   │   │
│   └───────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 2. Redirect to Cloudflare DNS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE DNS                             │
│   ┌───────────────────────────────────────────────────────┐   │
│   │  DNS Records:                                         │   │
│   │                                                        │   │
│   │  @ (root)     CNAME  →  transio.pages.dev  [Proxied] │   │
│   │  www          CNAME  →  transio.pages.dev  [Proxied] │   │
│   │                                                        │   │
│   │  SSL/TLS: Full (strict) ✓                            │   │
│   │  Always HTTPS: Enabled ✓                             │   │
│   └───────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 3. Resolve to Cloudflare Pages
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CLOUDFLARE PAGES                            │
│   ┌───────────────────────────────────────────────────────┐   │
│   │  Project: transio                                     │   │
│   │                                                        │   │
│   │  Custom Domains:                                      │   │
│   │  • transio.org          [SSL: Active ✓]             │   │
│   │  • www.transio.org      [SSL: Active ✓]             │   │
│   │                                                        │   │
│   │  Built from: GitHub repo (bluesover/transio.org)     │   │
│   │  Branch: main                                         │   │
│   │  Build Command: npm run build                        │   │
│   │  Output Directory: dist/                             │   │
│   └───────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 4. Serve Application
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      TRANSIO APPLICATION                        │
│   ┌───────────────────────────────────────────────────────┐   │
│   │  React App (Built & Optimized)                       │   │
│   │  • index.html                                         │   │
│   │  • /assets/*.js (bundled)                            │   │
│   │  • /assets/*.css (styled)                            │   │
│   │  • Saxon-JS for XSLT 2.0/3.0                         │   │
│   │                                                        │   │
│   │  Features: XML/XSLT transformation, version control  │   │
│   └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Configuration Steps Mapped

### Step 1: GoDaddy Nameserver Update
```
┌──────────────┐        ┌───────────────────┐
│   GoDaddy    │ ─────> │ Change Nameservers│
│  Dashboard   │        │ to Cloudflare NS  │
└──────────────┘        └───────────────────┘
      Domain Registration        DNS Authority Transfer
```

**What happens:**
- GoDaddy stops handling DNS queries
- All DNS requests forwarded to Cloudflare
- Takes 2-4 hours to propagate worldwide

---

### Step 2: Cloudflare DNS Configuration
```
┌──────────────┐        ┌──────────────┐        ┌─────────────────┐
│  Cloudflare  │ ─────> │  Add CNAME   │ ─────> │ Enable Proxy    │
│     DNS      │        │   Records    │        │ (Orange Cloud)  │
└──────────────┘        └──────────────┘        └─────────────────┘
  DNS Management          Point to Pages          CDN + Security
```

**What happens:**
- CNAME @ → transio.pages.dev (root domain)
- CNAME www → transio.pages.dev (www subdomain)
- Proxy enabled = Traffic goes through Cloudflare CDN
- Benefits: DDoS protection, caching, SSL

---

### Step 3: Cloudflare Pages Custom Domain
```
┌──────────────┐        ┌──────────────┐        ┌─────────────────┐
│  Cloudflare  │ ─────> │  Add Custom  │ ─────> │ SSL Certificate │
│    Pages     │        │   Domains    │        │  Provisioning   │
└──────────────┘        └──────────────┘        └─────────────────┘
  Hosting Platform        Link Domain              HTTPS Enabled
```

**What happens:**
- transio.pages.dev now responds to transio.org
- Free SSL certificate auto-provisioned
- HTTPS enforced automatically

---

### Step 4: SSL/TLS Configuration
```
┌──────────────┐        ┌──────────────┐        ┌─────────────────┐
│  SSL/TLS     │ ─────> │  Full Strict │ ─────> │ Always HTTPS    │
│  Settings    │        │     Mode     │        │    Redirect     │
└──────────────┘        └──────────────┘        └─────────────────┘
  Security Layer       End-to-End Encrypt       Force Secure
```

**What happens:**
- Browser → Cloudflare: Encrypted ✓
- Cloudflare → Pages: Encrypted ✓
- All HTTP requests redirect to HTTPS
- Mixed content auto-fixed

---

## Traffic Flow

### User Request Journey
```
User types URL
     ↓
DNS lookup at GoDaddy
     ↓
GoDaddy forwards to Cloudflare DNS
     ↓
Cloudflare DNS returns Cloudflare IP (proxied)
     ↓
Request hits Cloudflare Edge (CDN)
     ↓
Cloudflare checks cache
     ↓
If cached: Return immediately (fast!)
If not cached: Fetch from Pages
     ↓
Cloudflare Pages serves app
     ↓
Response cached by Cloudflare
     ↓
Delivered to user's browser
```

**Benefits:**
- ⚡ Fast: Cached at edge locations worldwide
- 🔒 Secure: SSL/TLS + DDoS protection
- 🌍 Reliable: 99.99% uptime SLA
- 💰 Free: Cloudflare Pages free tier

---

## Propagation Timeline

```
T+0 min     │ Update GoDaddy nameservers
            │ Status: Changes saved locally ✓
            │
T+5 min     │ Propagation starts
            │ Status: Some DNS servers updated
            │
T+1 hour    │ Partial propagation
            │ Status: ~50% of global DNS updated
            │
T+2-4 hours │ Full propagation (typical)
            │ Status: ~95-99% coverage ✓
            │
T+24 hours  │ Maximum propagation
            │ Status: 100% global coverage ✓
```

**Check propagation:**
```bash
# Your location
dig transio.org

# Global check
https://dnschecker.org/
```

---

## Security Features

### Cloudflare Protection Layers
```
┌─────────────────────────────────────────┐
│  User Request                           │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Layer 1: DDoS Protection               │
│  • Blocks malicious traffic             │
│  • Rate limiting                        │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Layer 2: WAF (Web Application Firewall)│
│  • SQL injection protection             │
│  • XSS prevention                       │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Layer 3: Bot Detection                 │
│  • Identifies bots vs humans            │
│  • Challenges suspicious traffic        │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Layer 4: SSL/TLS Encryption            │
│  • End-to-end encryption                │
│  • Certificate management               │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Cloudflare Pages (Your App)            │
│  • Serves application securely          │
└─────────────────────────────────────────┘
```

---

## Monitoring & Analytics

### Available Metrics
```
Cloudflare Dashboard → Analytics
├── Traffic
│   ├── Total requests
│   ├── Unique visitors
│   ├── Page views
│   └── Bandwidth usage
│
├── Performance
│   ├── Cache hit ratio
│   ├── Response time
│   └── Error rate
│
├── Security
│   ├── Threats blocked
│   ├── Bot traffic
│   └── SSL/TLS versions
│
└── Geography
    ├── Visitor locations
    └── CDN edge hits
```

---

## Troubleshooting Flowchart

```
Site not loading?
       │
       ├─ Check DNS propagation
       │  └─ Use dnschecker.org
       │     ├─ Not propagated → Wait 2-4 hours
       │     └─ Propagated → Next step
       │
       ├─ Verify nameservers
       │  └─ dig NS transio.org
       │     ├─ Wrong NS → Update in GoDaddy
       │     └─ Correct NS → Next step
       │
       ├─ Check DNS records
       │  └─ Cloudflare DNS panel
       │     ├─ Missing CNAME → Add records
       │     ├─ Wrong target → Update target
       │     └─ Correct → Next step
       │
       ├─ Verify custom domain
       │  └─ Cloudflare Pages settings
       │     ├─ Not added → Add domain
       │     ├─ SSL pending → Wait 15 min
       │     └─ Active → Next step
       │
       └─ Clear browser cache
          └─ Hard refresh (Ctrl+Shift+R)
             └─ Should work now ✓
```

---

## Cost Breakdown

```
┌───────────────────────┬──────────┬─────────────┐
│ Service               │ Cost     │ Notes       │
├───────────────────────┼──────────┼─────────────┤
│ Domain (GoDaddy)      │ ~$15/yr  │ One-time    │
│ Cloudflare (Free)     │ $0/mo    │ Forever     │
│ Cloudflare Pages      │ $0/mo    │ Unlimited   │
│ SSL Certificate       │ $0/mo    │ Auto-renew  │
│ CDN Bandwidth         │ $0/mo    │ Unmetered   │
│ GitHub Repo (Public)  │ $0/mo    │ Unlimited   │
├───────────────────────┼──────────┼─────────────┤
│ TOTAL                 │ ~$15/yr  │ Domain only │
└───────────────────────┴──────────┴─────────────┘
```

**100% free hosting forever** ✓

---

## Quick Reference

### Essential URLs
- **GoDaddy DNS:** https://dcc.godaddy.com/domains
- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Cloudflare Pages:** https://dash.cloudflare.com/ → Workers & Pages
- **DNS Checker:** https://dnschecker.org/
- **SSL Checker:** https://www.ssllabs.com/ssltest/

### Key Settings
```yaml
GoDaddy:
  Nameservers: [ alice.ns.cloudflare.com, bob.ns.cloudflare.com ]

Cloudflare DNS:
  - Type: CNAME, Name: @, Target: transio.pages.dev, Proxy: ON
  - Type: CNAME, Name: www, Target: transio.pages.dev, Proxy: ON

Cloudflare SSL/TLS:
  Mode: Full (strict)
  Always Use HTTPS: Enabled
  Automatic HTTPS Rewrites: Enabled

Cloudflare Pages:
  Custom Domains: [ transio.org, www.transio.org ]
```

---

**Need help?** See full guides:
- Quick: `DOMAIN_SETUP_QUICK.md`
- Detailed: `CUSTOM_DOMAIN_SETUP.md`

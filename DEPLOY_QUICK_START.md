# ⚡ Quick Deploy to transio.org

## 5-Minute Setup

### 1️⃣ Push to GitHub (1 min)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2️⃣ Connect Cloudflare Pages (2 min)
1. Go to https://dash.cloudflare.com/
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select your `transio` repo
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
5. Click **Save and Deploy**

### 3️⃣ Add Custom Domain (2 min)
**In Cloudflare:**
1. Go to your Pages project → **Custom domains**
2. Add `transio.org`
3. Copy the CNAME record shown

**In GoDaddy:**
1. Go to https://dcc.godaddy.com/ → Domains → transio.org → DNS
2. Add/Update:
   ```
   Type: CNAME
   Name: @
   Value: transio.pages.dev
   TTL: 600
   ```
3. Add www subdomain:
   ```
   Type: CNAME
   Name: www
   Value: transio.pages.dev
   TTL: 600
   ```

### 4️⃣ Wait & Test (5-10 min)
- DNS propagation: 5-30 minutes
- Visit: https://transio.org
- Done! ✅

---

## Auto-Deploy

Every `git push` to `main` triggers automatic deployment. No manual steps needed!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Remove `wrangler.toml` if present |
| DNS not working | Wait 30 min, clear browser cache |
| Blank page | Check browser console (F12) |
| Port 3001 error | Kill server: `killall node` |

---

## Files to Delete Before Deploy

These are NOT needed for Cloudflare Pages:
- `wrangler.toml` ❌
- `_worker.js` ❌
- `.env` files ❌

---

## Build Locally First

Test before deploying:
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

If local works ✅, deployment will work ✅

---

## Cost: $0

- Cloudflare Pages: FREE
- SSL Certificate: FREE
- Bandwidth: FREE (unlimited)
- Builds: FREE (500/month)

---

## Support

Full guide: `GODADDY_DEPLOYMENT.md`

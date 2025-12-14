# Deployment Guide - Transio

This guide covers deploying Transio to Cloudflare Pages with your custom domain (transio.org).

## Quick Deploy to Cloudflare Pages

### Prerequisites
- Cloudflare account (free)
- GitHub account
- Custom domain (transio.org) registered with GoDaddy

### Step 1: Build the Project Locally

```bash
# Clone the repository
git clone https://github.com/bluesover/transio.org.git
cd transio.org

# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder with your production build.

### Step 2: Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI (Recommended)

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=transio

# Or use the npm script
npm run deploy
```

#### Option B: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **Create application** → **Pages** → **Upload assets**
4. Name your project: `transio`
5. Upload the `dist` folder
6. Click **Deploy site**

### Step 3: Connect GitHub for Auto-Deploy (Optional)

1. In Cloudflare Dashboard → **Workers & Pages** → **transio**
2. Click **Settings** → **Builds & deployments**
3. Click **Connect to Git**
4. Select your repository: `bluesover/transio.org`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave blank)
6. Click **Save and Deploy**

Now every push to your repository will automatically deploy!

### Step 4: Add Custom Domain (transio.org)

#### A. Add Domain to Cloudflare

1. Go to Cloudflare Dashboard → **Websites**
2. Click **Add a site**
3. Enter: `transio.org`
4. Select **Free** plan
5. Cloudflare will scan your DNS records
6. Click **Continue**

#### B. Update Nameservers in GoDaddy

1. Cloudflare will show you 2 nameservers (e.g., `alice.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
2. Go to [GoDaddy Domain Settings](https://account.godaddy.com/products)
3. Find `transio.org` → Click **DNS**
4. Scroll to **Nameservers** → Click **Change**
5. Select **Enter my own nameservers**
6. Enter the 2 Cloudflare nameservers
7. Click **Save**

**⏰ Wait 24-48 hours** for nameserver propagation (usually completes in 1-4 hours).

#### C. Connect Domain to Cloudflare Pages

1. Go to **Workers & Pages** → **transio**
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `transio.org`
5. Click **Continue**
6. Cloudflare will automatically add DNS records
7. Enable **Automatic HTTPS Rewrites**

#### D. Configure SSL/TLS

1. Go to **SSL/TLS** in Cloudflare Dashboard
2. Set encryption mode to **Full (strict)**
3. Go to **Edge Certificates**
4. Enable:
   - ✅ Always Use HTTPS
   - ✅ Automatic HTTPS Rewrites
   - ✅ Certificate Transparency Monitoring

### Step 5: Verify Deployment

1. Visit `https://transio.org`
2. Verify SSL certificate (🔒 icon in browser)
3. Test XML transformation functionality
4. Check all features work

## Environment Variables (If Needed)

If you need environment variables:

1. Go to **Workers & Pages** → **transio** → **Settings**
2. Click **Environment variables**
3. Add variables for **Production** environment
4. Redeploy to apply changes

## Troubleshooting

### Build Fails in Cloudflare

**Error**: `npm ci` fails with package mismatches

**Solution**: Make sure your `package-lock.json` is up to date:
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Custom Domain Not Working

**Check DNS Propagation**:
```bash
nslookup transio.org
# Should show Cloudflare nameservers
```

**Check DNS Records**:
- Ensure CNAME record points to your Cloudflare Pages URL
- Ensure no A records conflict with CNAME

### SSL Certificate Issues

- Wait 15-30 minutes for SSL provisioning
- Verify SSL mode is **Full (strict)**
- Clear browser cache and try incognito mode

## Monitoring & Analytics

### Cloudflare Web Analytics (Free)

1. Go to **Analytics & Logs** → **Web Analytics**
2. Enable for `transio.org`
3. View real-time traffic and performance metrics

### Cloudflare Logs (Enterprise only)

For free users, basic analytics are available in the dashboard.

## Performance Optimization

### Enable Caching

Cloudflare automatically caches static assets. Verify:

1. Go to **Caching** → **Configuration**
2. Ensure **Caching Level** is set to **Standard**
3. Enable **Auto Minify** for JS, CSS, HTML

### Enable Speed Features

1. Go to **Speed** → **Optimization**
2. Enable:
   - ✅ Auto Minify (JavaScript, CSS, HTML)
   - ✅ Brotli compression
   - ✅ Early Hints
   - ✅ Rocket Loader™ (test first)

## Rollback

If deployment fails or has issues:

1. Go to **Workers & Pages** → **transio** → **Deployments**
2. Find previous working deployment
3. Click **⋯** → **Rollback to this deployment**

## GitHub Actions (Advanced)

For automated deployments with GitHub Actions, add this workflow file:

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=transio
```

**Setup Secrets**:
1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `CLOUDFLARE_API_TOKEN`: Get from Cloudflare → **My Profile** → **API Tokens**
   - `CLOUDFLARE_ACCOUNT_ID`: Get from Cloudflare → **Workers & Pages** → **Account ID**

## Support

For issues or questions:
- **GitHub Issues**: [https://github.com/bluesover/transio.org/issues](https://github.com/bluesover/transio.org/issues)
- **Cloudflare Docs**: [https://developers.cloudflare.com/pages/](https://developers.cloudflare.com/pages/)

---

**🎉 Congratulations!** Your Transio instance is now deployed and accessible at [https://transio.org](https://transio.org)

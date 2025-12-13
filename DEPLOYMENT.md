# 🚀 Deployment Guide - Transio

Complete guide to deploy Transio to production with custom domain.

## Prerequisites

- GitHub account
- Cloudflare account (free)
- Domain: transio.org (already owned)
- Local: Node.js 18+, npm

## Quick Deploy to Cloudflare Pages

### 1. Prepare Repository

```bash
# Make sure you're in the project root
cd /path/to/transio

# Install dependencies
npm install

# Test build locally
npm run build

# Verify build output in dist/
ls -la dist/
```

### 2. Push to GitHub

```bash
# If not already a git repo
git init
git add .
git commit -m "Initial commit: Transio XML/XSLT Transformer"

# Create GitHub repo at: https://github.com/new
# Name: transio
# Make it PUBLIC for open source

# Connect and push
git remote add origin https://github.com/YOUR_USERNAME/transio.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Cloudflare Pages

1. **Login to Cloudflare**: https://dash.cloudflare.com/
2. **Go to Pages**: Workers & Pages → Create Application → Pages → Connect to Git
3. **Select Repository**: Choose your GitHub repo `transio`
4. **Configure Build**:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
   - **Root directory**: `/`
   - **Node version**: `18` or higher
5. **Save and Deploy**

Wait 2-3 minutes for first deployment.

### 4. Custom Domain Setup

#### Add Domain to Cloudflare

1. Go to **Custom domains** in your Pages project
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Cloudflare will provide nameservers

#### Update DNS at GoDaddy

1. Login to GoDaddy
2. Go to your domain `transio.org`
3. Navigate to **DNS Management**
4. Update nameservers to Cloudflare's:
   ```
   austin.ns.cloudflare.com
   dina.ns.cloudflare.com
   ```
5. Wait 24-48 hours for propagation (usually faster)

#### Verify Domain

```bash
# Check DNS propagation
dig transio.org

# Check HTTPS certificate (after 15 minutes)
curl -I https://transio.org
```

## Environment Variables (Optional)

For Saxon-HE server integration:

1. Go to **Settings** → **Environment Variables**
2. Add variable:
   - **Name**: `SAXON_SERVER_URL`
   - **Value**: Your Saxon server URL (if hosted separately)

## Automatic Deployments

Every git push to `main` branch will:
1. Trigger automatic build on Cloudflare Pages
2. Deploy to production if build succeeds
3. Update https://transio.org

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Check deployment status
# Cloudflare will email you when complete
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
# http://localhost:5173

# Start Saxon server (optional, for XSLT 2.0/3.0)
./start-server.sh
```

## Build Commands

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

## Server Deployment (Optional)

If you want to host Saxon-HE server separately:

### Deploy to Cloud Provider

**Option 1: Cloudflare Workers**
```bash
cd server
npm install
npx wrangler deploy
```

**Option 2: Railway.app (Free)**
1. Push `server/` to separate GitHub repo
2. Connect to Railway.app
3. Railway auto-detects Node.js
4. Set environment port

**Option 3: Heroku**
```bash
cd server
heroku create transio-saxon-server
git push heroku main
```

**Option 4: VPS (DigitalOcean, Linode)**
```bash
ssh user@your-server
git clone https://github.com/YOUR_USERNAME/transio.git
cd transio/server
npm install
npm start
```

### Use PM2 for Production

```bash
# Install PM2
npm install -g pm2

# Start server
cd server
pm2 start npm --name "transio-saxon" -- start

# Enable auto-restart
pm2 startup
pm2 save

# Monitor
pm2 status
pm2 logs transio-saxon
```

## Monitoring

### Cloudflare Analytics

1. Go to your Pages project
2. Click **Analytics** tab
3. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Geography

### Error Tracking

Check browser console in production:
```javascript
// Errors are logged to console
// Use Sentry or similar for production error tracking
```

## Performance

### Cloudflare Optimizations (Automatic)

- ✅ Global CDN distribution
- ✅ HTTP/3 and QUIC
- ✅ Automatic asset compression
- ✅ Brotli compression
- ✅ Image optimization
- ✅ Minification
- ✅ Free SSL/TLS

### Build Optimizations

Already configured in `vite.config.ts`:
- Tree shaking
- Code splitting
- Lazy loading
- Asset optimization
- Source maps (dev only)

## Security

### Content Security Policy

Add to `wrangler.toml`:
```toml
[[headers]]
for = "/*"
[headers.values]
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

### HTTPS

- ✅ Automatic SSL/TLS certificate from Cloudflare
- ✅ Auto-renewal
- ✅ HSTS enabled
- ✅ TLS 1.3 supported

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Custom Domain Not Working

1. Verify nameservers at GoDaddy point to Cloudflare
2. Wait 24-48 hours for DNS propagation
3. Check Cloudflare DNS settings
4. Verify SSL/TLS mode is "Full" or "Full (strict)"

### Saxon Server Connection Fails

1. Check server is running: `curl http://localhost:3001/health`
2. Verify CORS headers in server
3. Check firewall rules
4. Update `SAXON_SERVER_URL` in Cloudflare Pages environment variables

### Assets Not Loading

1. Verify assets are in `src/assets/`
2. Check imports use `@/assets/` prefix
3. Build and check `dist/assets/` directory
4. Clear Cloudflare cache

## Rollback Deployment

```bash
# Cloudflare Pages keeps deployment history
# Go to Pages → Deployments → Click on previous successful deployment → Rollback
```

Or via git:
```bash
git revert HEAD
git push
```

## Cost

**Cloudflare Pages**: FREE
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month
- Free SSL certificate
- Free custom domain

**Domain (GoDaddy)**: $10-15/year

**Saxon Server** (optional):
- Railway.app: FREE (500 hours/month)
- VPS: $5-10/month

**Total**: $0-10/month

## Support

- **Issues**: https://github.com/YOUR_USERNAME/transio/issues
- **Email**: support@transio.org
- **Documentation**: https://transio.org

## License

Mozilla Public License 2.0 (MPL-2.0)

Open source and free forever! 🎉

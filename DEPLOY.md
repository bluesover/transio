# 🚀 Quick Deployment Guide

## Deploy to Cloudflare Pages

### Prerequisites
- GitHub account with your repository
- Cloudflare account (free tier works)
- GoDaddy domain: `transio.org`

### Step 1: Connect Cloudflare to GitHub

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Click "Create a project"
3. Click "Connect to Git"
4. Select your repository: `bluesover/transio`
5. Click "Begin setup"

### Step 2: Configure Build Settings

**Framework preset**: None

**Build command**:
```
npm run build
```

**Build output directory**:
```
dist
```

**Root directory**: (leave empty)

**Environment variables**: (none required)

### Step 3: Save and Deploy

Click "Save and Deploy" - Cloudflare will:
1. Clone your repository
2. Install dependencies
3. Build the project
4. Deploy to Cloudflare's global network

Your site will be live at: `https://transio.pages.dev`

### Step 4: Connect Custom Domain

1. In Cloudflare Pages dashboard, go to your project
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter: `transio.org`
5. Follow the DNS configuration instructions

#### GoDaddy DNS Setup

If your domain is with GoDaddy:

1. Log into GoDaddy
2. Go to "My Products" → "DNS"
3. Select `transio.org`
4. Update DNS records as instructed by Cloudflare:
   - Usually you'll add CNAME record pointing to your Pages URL
   - Or update nameservers to Cloudflare's nameservers

**Cloudflare Nameservers (Recommended)**:
- Remove all existing DNS records from GoDaddy
- Change nameservers to Cloudflare's (provided in dashboard)
- Wait 24-48 hours for propagation

### Step 5: Verify Deployment

Visit `https://transio.org` - you should see your application!

## Automatic Deployments

Every push to `main` branch will automatically:
1. Trigger Cloudflare Pages rebuild
2. Deploy new version to production
3. Make it live on transio.org

## GitHub Actions (Optional)

For more control, the repository includes a GitHub Actions workflow.

### Setup GitHub Secrets

1. Go to repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add these secrets:
   - `CLOUDFLARE_API_TOKEN`: Get from [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - `CLOUDFLARE_ACCOUNT_ID`: Found in Cloudflare dashboard URL

### Trigger Deployment

Push to main branch or manually trigger:
```bash
git commit -m "Deploy to production"
git push origin main
```

## Local Testing Before Deploy

Test the production build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Open `http://localhost:4173` to test.

## Troubleshooting

### Build Fails with Package Errors

If you see errors about `@github/spark`:
1. The `.npmrc` file should prevent this
2. Try clearing build cache in Cloudflare dashboard
3. Ensure `.npmrc` and `wrangler.toml` are in your repository

### Domain Not Working

1. Check DNS propagation: [DNS Checker](https://dnschecker.org/)
2. Verify CNAME or nameserver settings
3. Wait 24-48 hours for full propagation
4. Check Cloudflare dashboard for SSL status

### Site Shows Old Version

1. Clear Cloudflare cache
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check deployment status in dashboard

## Support

- **Issues**: [GitHub Issues](https://github.com/bluesover/transio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bluesover/transio/discussions)

---

**Need help?** Open an issue on GitHub and we'll assist you!

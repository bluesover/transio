# 🚀 Transio Deployment Guide

Complete guide to deploy Transio (transio.org) to Cloudflare Pages with custom domain and automated deployments.

---

## 📋 Prerequisites

- ✅ GitHub account with repository access
- ✅ Cloudflare account (free tier works)
- ✅ Domain name (transio.org via GoDaddy)
- ✅ Node.js 18+ installed locally

---

## 🎯 Cloudflare Pages Deployment

### Step 1: Connect GitHub Repository to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select **Workers & Pages** from the sidebar
3. Click **Create** → **Pages** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select your repository: `bluesover/transio.org`

### Step 2: Configure Build Settings

**Framework preset:** None (or Framework-agnostic)

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:**
```
/
```

**Environment variables:** None required (all client-side)

### Step 3: Deploy

- Click **Save and Deploy**
- Wait for the build to complete (~2-3 minutes)
- Your app will be available at `https://transio.pages.dev`

---

## 🌐 Custom Domain Configuration

### Add transio.org to Cloudflare Pages

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Click **Continue**
5. Follow the DNS configuration prompts

### Configure DNS at GoDaddy

1. Log in to [GoDaddy](https://www.godaddy.com/)
2. Go to **My Products** → **DNS**
3. Add the following records:

**For Root Domain (transio.org):**
```
Type: CNAME
Name: @
Value: transio.pages.dev
TTL: 600 seconds
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: transio.pages.dev
TTL: 600 seconds
```

4. Save changes and wait for DNS propagation (5-30 minutes)

---

## 🤖 Automated Deployments with GitHub Actions

### Configure GitHub Secrets

1. Go to your repository: `https://github.com/bluesover/transio.org`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

**CLOUDFLARE_API_TOKEN:**
- Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
- Click **Create Token** → Use template **Edit Cloudflare Workers**
- Or create custom token with permissions:
  - `Account.Cloudflare Pages` - Edit
- Copy the token and paste as secret value

**CLOUDFLARE_ACCOUNT_ID:**
- Go to Cloudflare Dashboard
- Select **Workers & Pages**
- Click on your **transio** project
- Copy the **Account ID** from the right sidebar
- Paste as secret value

### How It Works

The GitHub Actions workflow (`.github/workflows/deploy-cloudflare.yml`) automatically:
1. Runs on every push to `main` or `master` branch
2. Installs dependencies
3. Builds the project
4. Deploys to Cloudflare Pages

**Manual Trigger:**
- Go to **Actions** tab in your repository
- Select **Deploy to Cloudflare Pages**
- Click **Run workflow**

---

## 💻 Local Development

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/bluesover/transio.org.git
cd transio.org

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

### Optional: Saxon-HE Server (XSLT 2.0/3.0 Processing)

For advanced XSLT 2.0/3.0 features with server-side processing:

```bash
# Install server dependencies
cd server
npm install

# Start the server (Mac/Linux)
chmod +x start-server.sh
./start-server.sh

# Or use npm directly
npm start
```

The server runs on `http://localhost:3001` and provides enhanced XSLT transformation capabilities.

---

## 🔧 Configuration Files

### wrangler.toml
```toml
name = "transio"
compatibility_date = "2024-12-13"
```

### package.json Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && npx wrangler pages deploy dist --project-name=transio"
}
```

---

## 📊 Deployment Status

After deployment, verify:
- ✅ App loads at `https://transio.org`
- ✅ XSLT 1.0 transformations work
- ✅ Code editors display correctly
- ✅ Version control saves/loads properly
- ✅ File imports/exports function
- ✅ Theme switching works
- ✅ All UI components render

---

## 🐛 Troubleshooting

### Build Fails with "lock file out of sync"

**Solution:**
```bash
# Delete lock file and reinstall
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### DNS Not Resolving

**Solution:**
- Wait 30 minutes for DNS propagation
- Clear browser cache
- Test with: `nslookup transio.org`
- Verify CNAME points to `transio.pages.dev`

### GitHub Actions Deployment Fails

**Solution:**
- Verify `CLOUDFLARE_API_TOKEN` has correct permissions
- Verify `CLOUDFLARE_ACCOUNT_ID` is correct
- Check build logs in Actions tab
- Ensure `dist` folder is created during build

### Port 3001 Already in Use (Saxon Server)

**Solution:**
```bash
# Find and kill the process
lsof -i :3001
kill -9 <PID>

# Or use a different port
PORT=3002 npm start
```

---

## 📝 Environment Variables

No environment variables are required for client-side deployment. All processing happens in the browser.

**Optional (for Saxon-HE Server):**
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (default: development)

---

## 🔄 Update Deployment

### Method 1: Git Push (Automatic)
```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# GitHub Actions automatically deploys
```

### Method 2: Manual Deploy
```bash
# Build locally
npm run build

# Deploy manually
npm run deploy
```

---

## 📚 Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GoDaddy DNS Management](https://www.godaddy.com/help/manage-dns-680)

---

## 🆘 Support

For issues or questions:
- GitHub Issues: https://github.com/bluesover/transio.org/issues
- Repository: https://github.com/bluesover/transio.org

---

## ✅ Deployment Checklist

- [ ] Repository connected to Cloudflare Pages
- [ ] Build settings configured correctly
- [ ] Initial deployment successful
- [ ] Custom domain added in Cloudflare
- [ ] DNS records configured at GoDaddy
- [ ] GitHub secrets configured (API Token + Account ID)
- [ ] Automatic deployments tested
- [ ] App accessible at transio.org
- [ ] All features working in production

---

**Last Updated:** December 2024
**Deployment Platform:** Cloudflare Pages
**Custom Domain:** transio.org
**Repository:** https://github.com/bluesover/transio.org

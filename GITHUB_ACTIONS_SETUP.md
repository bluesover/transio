# GitHub Actions Setup Guide

Complete guide to setting up automated deployments for Transio using GitHub Actions.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Available Workflows](#available-workflows)
3. [Cloudflare Pages Setup](#cloudflare-pages-setup)
4. [Netlify Setup](#netlify-setup)
5. [Vercel Setup](#vercel-setup)
6. [GitHub Pages Setup](#github-pages-setup)
7. [Repository Settings](#repository-settings)
8. [Troubleshooting](#troubleshooting)

---

## Overview

Your repository includes 6 automated GitHub Actions workflows:

| Workflow | Purpose | Trigger |
|----------|---------|---------|
| **CI** | Lint, build, test, security audit | Push/PR to main/develop |
| **Deploy Cloudflare** | Deploy to Cloudflare Pages | Push to main |
| **Deploy Netlify** | Deploy to Netlify | Push to main |
| **Deploy Vercel** | Deploy to Vercel | Push to main |
| **Deploy GitHub Pages** | Deploy to GitHub Pages | Push to main |
| **Preview Deploy** | Preview deployments for PRs | Pull requests |
| **Release** | Create releases with artifacts | Git tags (v*) |

---

## Available Workflows

### 1. Continuous Integration (ci.yml)

**Runs on**: Every push and pull request

**Jobs**:
- ✅ Lint code with ESLint
- 🏗️ Build application
- 🧪 Run tests
- 🔒 Security audit

**No setup required** - runs automatically!

---

### 2. Cloudflare Pages (deploy-cloudflare.yml) ⭐ RECOMMENDED

**Best for**: Production deployment with custom domain (transio.org)

**Features**:
- Fast global CDN
- Automatic HTTPS
- Unlimited bandwidth
- Preview deployments
- Custom domains

---

### 3. Netlify (deploy-netlify.yml)

**Best for**: Alternative hosting with form handling

**Features**:
- Easy setup
- Built-in forms
- Serverless functions
- Split testing

---

### 4. Vercel (deploy-vercel.yml)

**Best for**: Vercel platform users

**Features**:
- Edge network
- Serverless functions
- Analytics

---

### 5. GitHub Pages (deploy-github-pages.yml)

**Best for**: Simple, free GitHub hosting

**Features**:
- Free hosting
- GitHub integration
- Custom domains

---

### 6. Preview Deployments (preview-deploy.yml)

**Best for**: Testing changes before merging

**Features**:
- Automatic preview URLs for PRs
- Comment with preview link
- Isolated environments

---

### 7. Release Creation (release.yml)

**Best for**: Creating versioned releases

**Features**:
- Automatic changelog generation
- ZIP file creation
- Asset uploads
- Triggered by git tags

---

## Cloudflare Pages Setup

### Step 1: Get Cloudflare Credentials

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Log in or create account (free)

2. **Get Account ID**
   - In dashboard, go to any domain
   - Scroll to right sidebar → Copy "Account ID"
   - Save this ID

3. **Create API Token**
   - Click profile icon → "My Profile"
   - Go to "API Tokens" tab
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template
   - Or create custom token with:
     - **Permissions**: `Cloudflare Pages: Edit`
     - **Account Resources**: Your account
   - Click "Continue to summary" → "Create Token"
   - **Copy the token** (you won't see it again!)

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

```
Name: CLOUDFLARE_API_TOKEN
Value: [paste your API token]
```

```
Name: CLOUDFLARE_ACCOUNT_ID
Value: [paste your account ID]
```

### Step 3: Create Cloudflare Pages Project

1. In Cloudflare Dashboard, go to **Pages**
2. Click **Create a project**
3. Click **Connect to Git** → Choose **GitHub**
4. Authorize Cloudflare
5. Select your repository: `transio` or whatever you named it
6. Configure build settings:
   - **Project name**: `transio`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: None needed
7. Click **Save and Deploy**

### Step 4: Add Custom Domain (transio.org)

1. In Cloudflare Pages, click your project
2. Go to **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `transio.org`
5. Click **Continue**
6. Cloudflare will show DNS records to add
7. Go to your GoDaddy account:
   - Domain settings → DNS Management
   - Add CNAME record:
     ```
     Type: CNAME
     Name: @
     Value: transio.pages.dev
     TTL: 1 hour (or default)
     ```
   - Add CNAME for www subdomain:
     ```
     Type: CNAME
     Name: www
     Value: transio.pages.dev
     TTL: 1 hour
     ```
8. Wait 5-30 minutes for DNS propagation
9. Verify in Cloudflare (will show "Active")

### Step 5: Test Deployment

1. Make a change to your repository
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Check deployment at https://transio.org

---

## Netlify Setup

### Step 1: Get Netlify Credentials

1. Go to https://app.netlify.com/
2. Sign up/login (can use GitHub)
3. Go to **User settings** → **Applications**
4. Click **New access token**
5. Name it "GitHub Actions"
6. Copy the token

### Step 2: Create Netlify Site

1. In Netlify dashboard, click **Add new site**
2. Choose **Import an existing project**
3. Connect to GitHub
4. Choose your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **Deploy site**
7. Copy the **Site ID** from Site settings → General

### Step 3: Add Secrets to GitHub

```
Name: NETLIFY_AUTH_TOKEN
Value: [paste your access token]
```

```
Name: NETLIFY_SITE_ID
Value: [paste your site ID]
```

### Step 4: Custom Domain

1. In Netlify site settings → **Domain management**
2. Click **Add custom domain**
3. Enter `transio.org`
4. Add DNS records in GoDaddy as shown

---

## Vercel Setup

### Step 1: Get Vercel Token

1. Go to https://vercel.com/
2. Sign up/login
3. Go to **Settings** → **Tokens**
4. Click **Create**
5. Name it "GitHub Actions"
6. Copy the token

### Step 2: Link Project

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel login`
3. Run: `vercel link`
4. Follow prompts to link your project

### Step 3: Add Secret to GitHub

```
Name: VERCEL_TOKEN
Value: [paste your token]
```

---

## GitHub Pages Setup

### Step 1: Enable GitHub Pages

1. Go to repository **Settings**
2. Click **Pages** in left sidebar
3. Under **Source**, select **GitHub Actions**

### Step 2: Deploy

1. Push to `main` branch
2. Workflow runs automatically
3. Site will be at: `https://[username].github.io/[repo-name]`

### Step 3: Custom Domain (Optional)

1. In Pages settings, add custom domain: `transio.org`
2. Add DNS records in GoDaddy:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```
3. Add CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: [username].github.io
   ```

---

## Repository Settings

### Make Repository Public

**Your repository MUST be public** for:
- ✅ GitHub Pages free hosting
- ✅ Open source license compliance
- ✅ Community contributions
- ✅ Cloudflare/Netlify/Vercel free tiers

**To make public**:
1. Go to **Settings** → **General**
2. Scroll to **Danger Zone**
3. Click **Change visibility** → **Make public**
4. Confirm

### Branch Protection (Optional but Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require CI workflow to pass
   - ✅ Require branches to be up to date

---

## Workflow Triggers

### Manual Deployment

You can manually trigger workflows:

1. Go to **Actions** tab
2. Select workflow (e.g., "Deploy to Cloudflare Pages")
3. Click **Run workflow**
4. Choose branch
5. Click **Run workflow**

### Automatic Deployment

Workflows trigger automatically on:

- **Push to main**: Production deployments
- **Pull request**: Preview deployments
- **Git tags**: Release creation

### Creating a Release

```bash
# Create and push a tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This triggers the Release workflow to:
- Build the project
- Create ZIP file
- Generate changelog
- Create GitHub release
- Upload assets

---

## Troubleshooting

### Build Fails: "npm ci" error

**Problem**: `package-lock.json` out of sync

**Solution**:
```bash
# Delete package-lock.json and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Commit the new lock file
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Build Fails: Missing secrets

**Problem**: `CLOUDFLARE_API_TOKEN` not found

**Solution**: Double-check secrets are added correctly in GitHub Settings → Secrets

### Deployment succeeds but site not working

**Problem**: Base path or routing issues

**Solution**: Check `vite.config.ts` base path:
```typescript
export default defineConfig({
  base: '/', // For custom domain
  // base: '/repo-name/' // For GitHub Pages without custom domain
})
```

### DNS not propagating

**Problem**: Custom domain doesn't work

**Solution**:
- Wait 5-60 minutes for DNS propagation
- Check DNS records: https://dnschecker.org/
- Verify CNAME points to correct target
- Clear browser cache

### Workflow not running

**Problem**: Push to main but no workflow

**Solution**:
- Check workflow file syntax (YAML)
- Verify workflow is enabled in Actions tab
- Check branch name (might be `master` not `main`)

### Multiple deploys running

**Problem**: Don't want all platforms deploying

**Solution**: 
- Disable unwanted workflows in `.github/workflows/`
- Delete or rename files you don't need
- Or disable in GitHub Actions UI

---

## Best Practices

### 1. Choose ONE Primary Platform

Don't run all deployment workflows at once. Choose one:

- ⭐ **Cloudflare Pages** (recommended for transio.org)
- Netlify (if you need forms/functions)
- Vercel (if you prefer Vercel ecosystem)
- GitHub Pages (simplest, free)

Disable others by:
- Deleting workflow files, OR
- Removing secrets (workflows fail gracefully), OR
- Adding `if: false` to workflow

### 2. Use Preview Deployments

Keep `preview-deploy.yml` active for testing:
- Create PR for new features
- Automatic preview URL generated
- Test before merging to main
- Safe production deployments

### 3. Monitor Actions

- Check **Actions** tab regularly
- Set up notifications for failures
- Review build logs for warnings

### 4. Semantic Versioning

When creating releases:
- `v1.0.0` - Major version (breaking changes)
- `v1.1.0` - Minor version (new features)
- `v1.1.1` - Patch version (bug fixes)

### 5. Keep Dependencies Updated

Run periodically:
```bash
npm update
npm audit fix
```

Commit updated `package-lock.json`

---

## Example Workflow

### Typical Development Flow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-transformation
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add new transformation feature"
   git push origin feature/new-transformation
   ```

3. **Create Pull Request**
   - Go to GitHub
   - Click "Compare & pull request"
   - CI workflow runs automatically
   - Preview deployment created

4. **Review and merge**
   - Check preview URL
   - Review CI results
   - Merge PR

5. **Automatic production deploy**
   - Merge triggers deploy workflow
   - Site updates at transio.org

6. **Create release (when ready)**
   ```bash
   git checkout main
   git pull
   git tag -a v1.2.0 -m "Release 1.2.0"
   git push origin v1.2.0
   ```
   - Release workflow creates GitHub release
   - Downloads available for users

---

## Quick Reference

### Essential Commands

```bash
# Check workflow status
git push origin main && open https://github.com/[username]/[repo]/actions

# Create release
git tag -a v1.0.0 -m "Release 1.0.0" && git push origin v1.0.0

# View logs locally
npm run build

# Test build locally
npm run preview
```

### Important URLs

- **GitHub Actions**: `https://github.com/[username]/[repo]/actions`
- **Cloudflare Dashboard**: `https://dash.cloudflare.com/`
- **Netlify Dashboard**: `https://app.netlify.com/`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **Production Site**: `https://transio.org`

---

## Support

- **GitHub Discussions**: Open an issue in your repository
- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Netlify Docs**: https://docs.netlify.com/
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Actions Docs**: https://docs.github.com/en/actions

---

## Summary

✅ **6 workflows created** for comprehensive CI/CD
✅ **Cloudflare Pages recommended** for transio.org
✅ **Preview deployments** for safe testing
✅ **Automatic releases** with changelog
✅ **Repository must be public** for free hosting
✅ **All tools are free and open source**

**Next Steps**:
1. Choose your deployment platform (Cloudflare recommended)
2. Add required secrets to GitHub
3. Push to main branch
4. Watch your site deploy automatically!

🚀 **Happy Deploying!**

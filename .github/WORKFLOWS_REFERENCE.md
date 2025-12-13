# GitHub Actions Workflows Reference

Complete reference for all automated workflows in Transio.

## 📊 Workflow Status Dashboard

Add these badges to your README.md:

```markdown
![CI](https://github.com/[username]/transio/actions/workflows/ci.yml/badge.svg)
![Deploy Cloudflare](https://github.com/[username]/transio/actions/workflows/deploy-cloudflare.yml/badge.svg)
![Release](https://github.com/[username]/transio/actions/workflows/release.yml/badge.svg)
```

---

## 🔄 Workflow Files

### 1. ci.yml - Continuous Integration

**Location**: `.github/workflows/ci.yml`

**Triggers**:
- Push to: `main`, `master`, `develop`
- Pull requests to: `main`, `master`, `develop`
- Manual: Workflow dispatch

**Jobs**:

#### Job 1: Lint
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies
  - Run ESLint
```
**Purpose**: Check code style and quality
**Duration**: ~1 minute

#### Job 2: Build
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies
  - Build project
  - Upload artifacts (7 days)
```
**Purpose**: Verify project builds successfully
**Duration**: ~2 minutes

#### Job 3: Test
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies
  - Run tests
```
**Purpose**: Run test suite
**Duration**: ~1 minute

#### Job 4: Security
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Run npm audit
```
**Purpose**: Check for security vulnerabilities
**Duration**: ~30 seconds

**Total Duration**: ~4-5 minutes

**Notes**: 
- All steps continue on error (won't block)
- Artifacts saved for 7 days
- Runs in parallel where possible

---

### 2. deploy-cloudflare.yml - Cloudflare Pages

**Location**: `.github/workflows/deploy-cloudflare.yml`

**Triggers**:
- Push to: `main`, `master`
- Pull requests to: `main`, `master`
- Manual: Workflow dispatch

**Required Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

**Jobs**:

#### Deploy
```yaml
runs-on: ubuntu-latest
permissions:
  contents: read
  deployments: write
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies (npm install)
  - Build project (production)
  - Publish to Cloudflare Pages
    - accountId: from secret
    - projectName: transio
    - directory: dist
    - branch: current branch
```

**Environment Variables**:
- `NODE_ENV=production`

**Output**:
- Production URL: https://transio.org
- Branch URL: https://[branch].transio.pages.dev

**Duration**: ~2-3 minutes

**Notes**:
- PRs deploy to preview URLs
- Main branch deploys to production
- Wrangler version 3

---

### 3. preview-deploy.yml - Preview Deployments

**Location**: `.github/workflows/preview-deploy.yml`

**Triggers**:
- Pull request: `opened`, `synchronize`, `reopened`

**Required Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

**Jobs**:

#### Preview
```yaml
runs-on: ubuntu-latest
permissions:
  contents: read
  pull-requests: write
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies
  - Build project (production)
  - Deploy to Cloudflare Pages (branch)
  - Comment preview URL on PR
```

**Output Example**:
```
🚀 Preview deployment ready!

📍 Preview URL: https://abc123.transio.pages.dev

✅ Build completed successfully.
```

**Duration**: ~2-3 minutes

**Notes**:
- Each PR gets unique URL
- Updates automatically on new commits
- Preview deleted when PR closed
- Comments on PR with URL

---

### 4. release.yml - Create Releases

**Location**: `.github/workflows/release.yml`

**Triggers**:
- Git tag: `v*` (e.g., v1.0.0, v1.2.3)
- Manual: With version input

**Required Permissions**:
- `contents: write`

**Jobs**:

#### Create Release
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies
  - Build project (production)
  - Create ZIP archive
    - From: dist folder
    - Name: transio-{version}.zip
  - Generate changelog
    - From: git commits since last tag
  - Create GitHub Release
    - Files: ZIP, launcher scripts
    - Body: Changelog + info
    - Draft: false
    - Prerelease: false
```

**Created Files**:
- `transio-v1.0.0.zip` (built app)
- `launch-windows.bat` (launcher)
- `launch-mac-linux.sh` (launcher)

**Release Body Includes**:
- What's New section
- Changelog (auto-generated)
- Download options
- Feature list
- System requirements
- License info

**Duration**: ~3 minutes

**Usage**:
```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

**Notes**:
- Semantic versioning recommended
- Changelog from commits
- Assets automatically uploaded

---

### 5. deploy-netlify.yml - Netlify Deployment

**Location**: `.github/workflows/deploy-netlify.yml`

**Triggers**:
- Push to: `main`, `master`
- Manual: Workflow dispatch

**Required Secrets**:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

**Jobs**:

#### Deploy
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Install dependencies
  - Build project (production)
  - Deploy to Netlify
    - publish-dir: ./dist
    - production-branch: main
    - deploy-message: from commit
```

**Features**:
- PR comments enabled
- Commit comments enabled
- Production deploys from main
- Preview deploys from PRs

**Duration**: ~2-3 minutes

**Notes**:
- Alternative to Cloudflare
- Built-in form handling
- Serverless functions support
- Timeout: 5 minutes

---

### 6. deploy-vercel.yml - Vercel Deployment

**Location**: `.github/workflows/deploy-vercel.yml`

**Triggers**:
- Push to: `main`, `master`
- Manual: Workflow dispatch

**Required Secrets**:
- `VERCEL_TOKEN`

**Jobs**:

#### Deploy
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 22
  - Install Vercel CLI
  - Pull environment info (production)
  - Build project artifacts
  - Deploy to Vercel (production)
```

**Duration**: ~2-3 minutes

**Notes**:
- Alternative to Cloudflare
- Edge network
- Analytics included
- Requires Vercel project setup

---

### 7. deploy-github-pages.yml - GitHub Pages

**Location**: `.github/workflows/deploy-github-pages.yml`

**Triggers**:
- Push to: `main`
- Manual: Workflow dispatch

**Required Permissions**:
- `contents: read`
- `pages: write`
- `id-token: write`

**Jobs**:

#### Build
```yaml
runs-on: ubuntu-latest
steps:
  - Checkout code
  - Setup Node.js 20
  - Install dependencies (npm ci)
  - Build project
  - Upload Pages artifact
    - path: ./dist
```

#### Deploy
```yaml
runs-on: ubuntu-latest
needs: build
environment:
  name: github-pages
  url: [deployment URL]
steps:
  - Deploy to GitHub Pages
```

**Output URL**:
- `https://[username].github.io/[repo]`
- Or custom domain if configured

**Duration**: ~3-4 minutes

**Notes**:
- Simplest option
- Free for public repos
- Custom domains supported
- Requires Pages enabled in Settings

---

## 🎯 Choosing Workflows

### For Production (Choose ONE):

**Cloudflare Pages** ⭐ RECOMMENDED
- ✅ Unlimited bandwidth
- ✅ Best performance
- ✅ Custom domain (transio.org)
- ✅ Preview deployments
- File: `deploy-cloudflare.yml`

**Netlify**
- ✅ Form handling
- ✅ Serverless functions
- ⚠️ 100GB/month bandwidth
- File: `deploy-netlify.yml`

**Vercel**
- ✅ Edge network
- ✅ Analytics
- ⚠️ 100GB/month bandwidth
- File: `deploy-vercel.yml`

**GitHub Pages**
- ✅ Simplest setup
- ✅ Free hosting
- ⚠️ No preview deploys
- File: `deploy-github-pages.yml`

### Keep Active:

**CI** - Always
- Code quality checks
- Build verification
- Security audits

**Preview** - Recommended
- Test before merging
- Safe deployments

**Release** - Optional
- Version releases
- Download packages

### Disable Unused:

Delete or rename files you don't need:
```bash
# Example: Only use Cloudflare
git rm .github/workflows/deploy-netlify.yml
git rm .github/workflows/deploy-vercel.yml
git rm .github/workflows/deploy-github-pages.yml
git commit -m "Remove unused workflows"
```

---

## 🔐 Secrets Required

### Cloudflare Pages:
```bash
CLOUDFLARE_API_TOKEN       # API token with Pages:Edit
CLOUDFLARE_ACCOUNT_ID      # Account ID from dashboard
```

### Netlify:
```bash
NETLIFY_AUTH_TOKEN         # Personal access token
NETLIFY_SITE_ID            # Site ID from settings
```

### Vercel:
```bash
VERCEL_TOKEN               # Access token
```

### GitHub Pages:
```bash
# No secrets needed - uses GITHUB_TOKEN automatically
```

---

## 📊 Workflow Comparison

| Feature | Cloudflare | Netlify | Vercel | GH Pages |
|---------|-----------|---------|---------|----------|
| **Bandwidth** | Unlimited | 100GB | 100GB | 100GB |
| **Build Time** | 500/mo | 300 min/mo | 6000 min/mo | Unlimited |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free | ✅ Free |
| **SSL** | ✅ Auto | ✅ Auto | ✅ Auto | ✅ Auto |
| **Preview URLs** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Functions** | ✅ Workers | ✅ Yes | ✅ Yes | ❌ No |
| **Analytics** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Deploy Time** | ~2 min | ~2 min | ~2 min | ~3 min |
| **Setup** | Medium | Easy | Easy | Easiest |
| **Best For** | Production | Forms | Vercel stack | Simple sites |

---

## 🚀 Quick Commands

### Trigger Deployment:
```bash
git push origin main
```

### Create Preview:
```bash
git push origin feature-branch
# Then create PR
```

### Create Release:
```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

### Manual Trigger:
1. GitHub → Actions tab
2. Select workflow
3. Run workflow → Choose branch
4. Run workflow button

### Check Status:
```bash
# View in browser
open https://github.com/[username]/[repo]/actions

# Or check commit status
git log --oneline -1
# Look for ✅ or ❌ on GitHub
```

---

## 📈 Monitoring

### GitHub Actions Tab:
- All workflow runs
- Status (✅ success, ❌ failed, 🟡 in progress)
- Duration
- Logs (click on run)

### Platform Dashboards:
- **Cloudflare**: dash.cloudflare.com → Pages
- **Netlify**: app.netlify.com
- **Vercel**: vercel.com/dashboard
- **GH Pages**: Repo Settings → Pages

### Email Notifications:
- Settings → Notifications → Actions
- Email on workflow failure
- Daily digests

---

## 🔧 Customization

### Change Node Version:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change to 18, 20, 22
```

### Add Environment Variables:
```yaml
- name: Build
  run: npm run build
  env:
    NODE_ENV: production
    VITE_API_URL: https://api.example.com
    VITE_VERSION: ${{ github.ref_name }}
```

### Change Build Command:
```yaml
- name: Build
  run: npm run build:prod  # Your custom command
```

### Add Deployment Checks:
```yaml
- name: Health Check
  run: |
    curl -f https://transio.org || exit 1
```

---

## 🐛 Common Issues

### "npm ci" fails:
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update lock file"
git push
```

### Secret not found:
- Check spelling (exact match)
- Verify in Settings → Secrets
- Re-create if needed

### Build succeeds, site broken:
- Check `dist` folder contents locally
- Verify `index.html` in root of `dist`
- Check browser console for errors

### Workflow doesn't run:
- Check YAML syntax
- Verify trigger branch
- Check workflow is enabled
- Verify file in `.github/workflows/`

---

## 📚 Learn More

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Action Marketplace](https://github.com/marketplace?type=actions)

---

## ✅ Checklist

### Initial Setup:
- [ ] Repository is public
- [ ] Choose deployment platform
- [ ] Get API credentials  
- [ ] Add secrets to GitHub
- [ ] Test first deployment
- [ ] Verify site works

### For Each Deployment:
- [ ] Code changes committed
- [ ] Push to correct branch
- [ ] Check Actions tab
- [ ] Verify build succeeds
- [ ] Test deployed site
- [ ] Check DNS (if custom domain)

### Maintenance:
- [ ] Monitor failed workflows
- [ ] Update dependencies monthly
- [ ] Check security alerts
- [ ] Review deployment logs
- [ ] Update workflows if needed

---

**Updated**: Check this file when workflows change or new ones are added.

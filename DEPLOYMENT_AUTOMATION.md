# Deployment Automation Guide

Complete automation setup for Transio - from code push to production deployment.

## 🎯 Quick Start (5 Minutes)

### For Cloudflare Pages (Recommended for transio.org)

1. **Get Cloudflare credentials** (2 min)
   - Login to https://dash.cloudflare.com/
   - Copy Account ID from sidebar
   - Create API Token (Pages:Edit permission)

2. **Add to GitHub** (1 min)
   - Repository → Settings → Secrets → Actions
   - Add `CLOUDFLARE_API_TOKEN`
   - Add `CLOUDFLARE_ACCOUNT_ID`

3. **Create Cloudflare Pages project** (2 min)
   - Cloudflare → Pages → Connect to Git
   - Select repository
   - Project name: `transio`
   - Build command: `npm run build`
   - Output: `dist`

4. **Deploy** (instant)
   ```bash
   git push origin main
   ```
   Done! Check GitHub Actions tab for progress.

---

## 📊 Workflow Overview

```
┌─────────────────┐
│   Developer     │
│   Pushes Code   │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  GitHub Actions │ ← Workflows triggered
│  Workflows Run  │
└────────┬────────┘
         │
         ├──→ Continuous Integration (CI)
         │    ├─ Lint code
         │    ├─ Build project
         │    ├─ Run tests
         │    └─ Security audit
         │
         ├──→ Deploy to Cloudflare Pages
         │    ├─ Build project
         │    ├─ Upload to Cloudflare
         │    └─ Live at transio.org
         │
         ├──→ Preview Deployment (for PRs)
         │    ├─ Build project
         │    ├─ Deploy preview
         │    └─ Comment preview URL on PR
         │
         └──→ Create Release (on git tag)
              ├─ Build project
              ├─ Create ZIP file
              ├─ Generate changelog
              └─ Upload to GitHub Releases
```

---

## 🔄 Deployment Workflows

### 1. Continuous Integration (ci.yml)

**Trigger**: Every push and pull request

**Purpose**: Ensure code quality before deployment

**Jobs**:

```yaml
Lint → Build → Test → Security Audit
  ↓      ↓      ↓         ↓
 ✅     ✅     ✅        ✅
```

**What it checks**:
- ✅ ESLint passes (code style)
- ✅ TypeScript compiles (no type errors)
- ✅ Build succeeds (production-ready)
- ✅ Tests pass (functionality works)
- ✅ No security vulnerabilities (npm audit)

**Result**: Green checkmark on commit/PR if all pass

**Setup**: None needed! Runs automatically.

---

### 2. Cloudflare Pages Deployment (deploy-cloudflare.yml)

**Trigger**: Push to `main` branch or manual

**Purpose**: Deploy to production at transio.org

**Flow**:
```
1. Checkout code
2. Setup Node.js 22
3. Install dependencies (npm install)
4. Build project (npm run build)
5. Deploy to Cloudflare Pages
6. Site live at transio.org
```

**Secrets Required**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

**Deployment Time**: ~2-3 minutes

**Result**: Production site updated

---

### 3. Preview Deployment (preview-deploy.yml)

**Trigger**: Pull request opened/updated

**Purpose**: Test changes before merging

**Flow**:
```
PR Created → Build → Deploy → Comment URL
                               ↓
                     https://abc123.transio.pages.dev
```

**Features**:
- Isolated preview environment
- Unique URL for each PR
- Automatic comment on PR with link
- No impact on production

**Perfect for**:
- Testing new features
- Design reviews
- QA testing
- Client previews

---

### 4. Release Creation (release.yml)

**Trigger**: Git tag pushed (v*.*.*)

**Purpose**: Create versioned releases with downloads

**Flow**:
```
Create Tag → Build → Create ZIP → Generate Changelog → GitHub Release
v1.2.0                ↓
                  transio-v1.2.0.zip
```

**Includes**:
- Built application (ZIP)
- Changelog (auto-generated)
- Launcher scripts
- Release notes

**Example**:
```bash
git tag -a v1.2.0 -m "Version 1.2.0: New features"
git push origin v1.2.0
```

**Result**: GitHub release at `/releases`

---

### 5. Alternative Platforms

#### Netlify (deploy-netlify.yml)
- Alternative to Cloudflare
- Built-in form handling
- Serverless functions

#### Vercel (deploy-vercel.yml)
- Alternative to Cloudflare
- Edge network
- Serverless functions

#### GitHub Pages (deploy-github-pages.yml)
- Simple GitHub hosting
- Free for public repos
- Custom domains supported

---

## 🎛️ Configuration Files

### Workflow Files Location
```
.github/
  workflows/
    ci.yml                    # Continuous integration
    deploy-cloudflare.yml     # Cloudflare deployment
    deploy-netlify.yml        # Netlify deployment
    deploy-vercel.yml         # Vercel deployment
    deploy-github-pages.yml   # GitHub Pages deployment
    preview-deploy.yml        # PR previews
    release.yml               # Release creation
```

### Key Configuration

**Node.js Version**: 22 (all workflows)
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'
```

**Build Command**: `npm run build`
```yaml
- name: Build project
  run: npm run build
  env:
    NODE_ENV: production
```

**Output Directory**: `dist`
```yaml
directory: dist
```

---

## 🔐 Secrets Management

### Required Secrets (by platform)

#### Cloudflare Pages
```
CLOUDFLARE_API_TOKEN      ← API token with Pages:Edit
CLOUDFLARE_ACCOUNT_ID     ← Account ID from dashboard
```

#### Netlify
```
NETLIFY_AUTH_TOKEN        ← Personal access token
NETLIFY_SITE_ID           ← Site ID from settings
```

#### Vercel
```
VERCEL_TOKEN              ← Vercel access token
```

#### GitHub Pages
```
(No secrets needed - uses GITHUB_TOKEN automatically)
```

### How to Add Secrets

1. Go to repository on GitHub
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter name (e.g., `CLOUDFLARE_API_TOKEN`)
6. Paste value
7. Click **Add secret**

**Security Notes**:
- ✅ Secrets are encrypted
- ✅ Never visible in logs
- ✅ Only accessible to workflows
- ❌ Never commit secrets to code!

---

## 🚀 Deployment Scenarios

### Scenario 1: Regular Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-widget

# 2. Make changes
# ... edit files ...

# 3. Commit and push
git add .
git commit -m "Add new transformation widget"
git push origin feature/new-widget

# 4. Create PR on GitHub
# → CI workflow runs automatically
# → Preview deployment created
# → Review changes at preview URL

# 5. Merge PR
# → Cloudflare deployment runs
# → Site updates at transio.org
```

**Timeline**: 
- CI: 2-3 minutes
- Preview: 2-3 minutes  
- Production: 2-3 minutes

---

### Scenario 2: Hotfix

```bash
# 1. Create hotfix branch
git checkout -b hotfix/critical-bug

# 2. Fix bug
# ... fix code ...

# 3. Fast-track to production
git add .
git commit -m "Fix critical transformation bug"
git push origin hotfix/critical-bug

# 4. Create PR and merge immediately
# → Production deploys in ~3 minutes
```

---

### Scenario 3: Release Version

```bash
# 1. Ensure main branch is ready
git checkout main
git pull origin main

# 2. Update version in package.json
npm version 1.3.0  # Creates commit + tag

# 3. Push with tags
git push origin main --tags

# Result:
# → Normal production deployment
# → Release workflow creates GitHub release
# → ZIP file and assets uploaded
# → Changelog auto-generated
```

---

### Scenario 4: Testing Before Merge

```bash
# 1. Create PR as usual
git push origin feature/experimental

# 2. Open PR on GitHub

# 3. Check preview deployment
# → Wait for preview deploy workflow
# → Click preview URL in PR comment
# → Test thoroughly

# 4a. If good: Merge PR
# 4b. If issues: Push more commits
# → Preview updates automatically
```

---

## 📈 Monitoring Deployments

### GitHub Actions Tab

**Location**: `https://github.com/[username]/[repo]/actions`

**View**:
- ✅ All workflow runs
- ⏱️ Duration of each step
- 📋 Detailed logs
- ❌ Failures and errors

**Status Badges**: Add to README.md
```markdown
![CI](https://github.com/[username]/[repo]/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/[username]/[repo]/actions/workflows/deploy-cloudflare.yml/badge.svg)
```

### Platform Dashboards

**Cloudflare Pages**:
- Dashboard: https://dash.cloudflare.com/ → Pages
- See all deployments
- Rollback to previous versions
- Custom domain status
- Analytics

**GitHub Notifications**:
- Email on workflow failure
- GitHub mobile app notifications
- Settings → Notifications → Actions

---

## 🔧 Customization

### Modify Build Command

**File**: `.github/workflows/deploy-cloudflare.yml`

```yaml
- name: Build project
  run: npm run build:production  # Change this
  env:
    NODE_ENV: production
    VITE_API_URL: https://api.example.com  # Add env vars
```

### Add Environment Variables

```yaml
- name: Build project
  run: npm run build
  env:
    NODE_ENV: production
    VITE_APP_VERSION: ${{ github.ref_name }}
    VITE_BUILD_TIME: ${{ github.event.head_commit.timestamp }}
```

### Change Deployment Trigger

**Deploy on specific branches**:
```yaml
on:
  push:
    branches: [ main, staging, production ]  # Multiple branches
```

**Deploy on schedule**:
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

**Manual only**:
```yaml
on:
  workflow_dispatch:  # Only manual trigger
```

### Add Deployment Environments

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://transio.org
```

**Benefits**:
- Require approval before deploy
- Separate secrets per environment
- Protection rules

---

## 🐛 Troubleshooting

### Build Fails: Dependencies

**Error**: "npm ci" fails

**Solution**:
```bash
# Local fix
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Build Fails: TypeScript Errors

**Error**: TypeScript compilation errors

**Solution**:
```bash
# Check locally first
npm run build

# Fix all type errors
# Then commit and push
```

### Deployment Fails: Secrets

**Error**: "CLOUDFLARE_API_TOKEN not found"

**Solution**:
1. Verify secret name matches exactly
2. Check secret has correct value
3. Re-create secret if needed
4. Trigger workflow again

### Deployment Succeeds But Site Not Working

**Error**: 404 or blank page

**Check**:
1. Build output directory is `dist`
2. `index.html` is in root of `dist`
3. Base path in `vite.config.ts`:
   ```typescript
   base: '/'  // For custom domain
   ```

### Workflow Not Triggering

**Error**: Push but no workflow runs

**Check**:
1. Workflow file has no syntax errors
2. Branch name matches (main vs master)
3. Workflow is enabled in Actions tab
4. `.github/workflows/` files are committed

---

## 💡 Best Practices

### 1. Use Branch Protection

**Settings** → **Branches** → **Add rule**

Protection rules:
- ✅ Require status checks (CI must pass)
- ✅ Require PR reviews
- ✅ Require up-to-date branches
- ✅ Include administrators

**Result**: No broken code reaches production

### 2. Test in Preview First

Always create PR before merging to main:
- Get preview deployment
- Test thoroughly
- Get review from team
- Then merge

### 3. Monitor Actions

Check Actions tab regularly:
- Failed workflows?
- Slow builds?
- Security alerts?

Fix issues promptly.

### 4. Use Semantic Versioning

Release tags:
- `v1.0.0` - Major (breaking changes)
- `v1.1.0` - Minor (new features)
- `v1.1.1` - Patch (bug fixes)

### 5. Keep Workflows Updated

Update actions periodically:
```yaml
uses: actions/checkout@v4  # Check for v5
uses: actions/setup-node@v4  # Check for v5
```

---

## 📊 Cost Analysis

### Free Tier Limits

**Cloudflare Pages**:
- ✅ Unlimited bandwidth
- ✅ Unlimited deployments
- ✅ 500 builds/month
- ✅ Custom domains

**GitHub Actions**:
- ✅ Unlimited (public repos)
- ⚠️ 2,000 min/month (private repos)

**Netlify**:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month

**Vercel**:
- ✅ 100 GB bandwidth/month
- ✅ 6,000 build minutes/month

**GitHub Pages**:
- ✅ Unlimited (public repos)
- ✅ 100 GB bandwidth/month

### Recommendation

**For transio.org**:
1. **Cloudflare Pages** (primary) - Best performance, unlimited
2. **GitHub Actions** (CI) - Free for public repo
3. Repository: **Public** (required for free hosting)

**Total cost**: **$0/month** 🎉

---

## 📚 Resources

### Documentation
- [GitHub Actions](https://docs.github.com/en/actions)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Netlify](https://docs.netlify.com/)
- [Vercel](https://vercel.com/docs)

### Example Workflows
- [Awesome Actions](https://github.com/sdras/awesome-actions)
- [GitHub Actions Examples](https://github.com/actions/starter-workflows)

### Community
- [GitHub Community](https://github.community/)
- [Cloudflare Community](https://community.cloudflare.com/)

---

## ✅ Checklist

### Initial Setup
- [ ] Repository is public
- [ ] Choose deployment platform (Cloudflare recommended)
- [ ] Get API credentials
- [ ] Add secrets to GitHub
- [ ] Create project on platform
- [ ] Test first deployment

### Ongoing
- [ ] Monitor Actions tab
- [ ] Fix failed workflows promptly
- [ ] Update dependencies monthly
- [ ] Create releases for major versions
- [ ] Review deployment analytics

---

## 🎉 Success!

Your automated deployment pipeline is ready!

**What happens now**:
1. Push to main → Site deploys automatically
2. Create PR → Preview deployment ready
3. Create tag → Release published

**Benefits**:
- ⚡ Fast deployments (2-3 minutes)
- 🔄 Automatic and reliable
- 👀 Preview before production
- 📦 Easy rollbacks
- 💰 Completely free

🚀 **Start deploying with confidence!**

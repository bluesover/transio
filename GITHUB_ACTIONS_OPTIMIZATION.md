# GitHub Actions Optimization - Cost Reduction

## Changes Made

### 1. ❌ Dependabot Disabled

**File**: `.github/dependabot.yml`

- **Status**: Completely removed
- **Reason**: Dependabot creates automatic PRs that can trigger workflows and consume resources
- **Impact**: No more automated dependency update PRs

**Going Forward**: Update dependencies manually when needed:
```bash
npm outdated          # Check for updates
npm update            # Update dependencies
npm audit fix         # Fix vulnerabilities
```

---

### 2. 🔧 Workflow Triggers Changed to Manual Only

All automatic triggers have been disabled. Workflows now only run when you manually trigger them.

#### Modified Workflows:

**a) `deploy-cloudflare.yml`**
- ❌ Removed: Auto-deploy on push to main/master
- ✅ Kept: Manual trigger (`workflow_dispatch`)
- **Why**: Cloudflare Pages has its own auto-deploy from GitHub (doesn't use Actions minutes)

**b) `sync-repos.yml`**
- ❌ Removed: Auto-sync on push
- ✅ Kept: Manual trigger only
- **Why**: Sync to public repo only when you choose to

**c) `sync-to-public.yml`**
- ❌ Removed: Auto-sync on push
- ✅ Kept: Manual trigger only
- **Why**: Same as above

**d) `release-desktop.yml`**
- ✅ Kept: Auto-build when version tag is pushed (e.g., `v1.0.0`)
- ✅ Kept: Manual trigger option
- **Why**: Releases are infrequent and intentional

---

## How to Use Manual Workflows

### Via GitHub Web Interface:

1. Go to: `https://github.com/YOUR_USERNAME/transio/actions`
2. Click the workflow name in the left sidebar
3. Click "Run workflow" button
4. Select branch (usually `main`)
5. Click "Run workflow" to confirm

### Via GitHub CLI:

```bash
# Deploy to Cloudflare
gh workflow run deploy-cloudflare.yml

# Sync to public repo
gh workflow run sync-to-public.yml

# Release desktop apps (or push a tag)
gh workflow run release-desktop.yml
```

---

## Cost Savings

### Before:
- Dependabot: ~5 automated PRs per week
- Deploy: On every push to main
- Sync: On every push to main
- **Total**: Could trigger 10-20+ workflow runs per week

### After:
- Dependabot: 0 runs
- Deploy: Manual only (use Cloudflare auto-deploy instead)
- Sync: Manual only
- Release: Only when you push version tags
- **Total**: ~1-2 runs per month (only releases)

### Estimated Savings:
- **GitHub Actions minutes**: 90-95% reduction
- **API calls**: 90% reduction
- **AI features triggered**: 0 (no automated PRs)

---

## Recommended Workflow

### For Development:
1. Push code to GitHub normally
2. Cloudflare Pages auto-deploys (doesn't use Actions)
3. Test on transio.org

### For Releases:
1. Update version in `package.json`
2. Commit and push
3. Create and push tag: `git tag v1.0.1 && git push origin v1.0.1`
4. Desktop apps auto-build and release

### For Public Repo Sync:
1. When ready to share updates publicly
2. Go to Actions → Sync to Public Repository
3. Click "Run workflow"

---

## Re-enabling Auto-Deploy (Not Recommended)

If you really need auto-deploy via GitHub Actions:

Edit `.github/workflows/deploy-cloudflare.yml` and add back:

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

**Better Alternative**: Use Cloudflare Pages' built-in GitHub integration:
- Go to Cloudflare Pages dashboard
- Connect your GitHub repo
- It will auto-deploy on push without using Actions minutes

---

## Monitoring

### Check Actions Usage:
1. Go to repository Settings
2. Click "Actions" in left sidebar
3. View usage and billing

### GitHub Free Tier:
- 2,000 Actions minutes/month (public repos)
- 500 MB storage

With these changes, you should stay well within free limits.

---

## Questions?

- Issue with manual triggers? Check `.github/README.md`
- Need to update dependencies? Run `npm outdated`
- Want to automate something? Consider GitHub webhooks or Cloudflare Workers instead of Actions

---

**Summary**: Dependabot removed, all workflows now manual (except releases). This eliminates 90%+ of Actions consumption while keeping full control over when workflows run.

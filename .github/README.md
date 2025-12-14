# GitHub Actions Configuration

## Workflow Triggers

All workflows are now set to **manual trigger only** (`workflow_dispatch`) to prevent automatic resource consumption and reduce GitHub Actions costs.

### Available Workflows

1. **Deploy to Cloudflare Pages** (`deploy-cloudflare.yml`)
   - Manually deploy to Cloudflare Pages
   - Go to Actions → Deploy to Cloudflare Pages → Run workflow

2. **Release Desktop Apps** (`release-desktop.yml`)
   - Builds desktop apps for Windows, macOS, and Linux
   - Triggers automatically when you push a version tag (e.g., `v1.0.0`)
   - Can also be manually triggered

3. **Sync Repositories** (`sync-repos.yml`)
   - Syncs code to public repository
   - Manual trigger only

4. **Sync to Public Repository** (`sync-to-public.yml`)
   - Alternative sync workflow with cleanup
   - Manual trigger only

### How to Manually Trigger Workflows

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Select the workflow you want to run from the left sidebar
4. Click **Run workflow** button (top right)
5. Confirm by clicking **Run workflow**

### Dependabot

**Status**: Disabled

Dependabot has been completely removed to prevent automatic PR creation and Actions consumption.

If you need to update dependencies, do it manually:

```bash
npm outdated
npm update
```

### Cost Optimization

- ✅ Dependabot removed
- ✅ Auto-deploy on push disabled
- ✅ Auto-sync on push disabled
- ✅ All workflows now manual trigger only
- ✅ Caching enabled for faster builds
- ✅ Timeout limits set on all jobs

### Need Automatic Deployments?

If you want to re-enable automatic deployments later, edit the workflow files and add back the `push:` trigger. However, this will consume GitHub Actions minutes on every push.

**Alternative**: Use Cloudflare Pages' built-in GitHub integration which doesn't consume your GitHub Actions minutes.

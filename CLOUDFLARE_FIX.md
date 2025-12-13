# Cloudflare Deployment Fix - Quick Guide

## The Problem

You're seeing this error during Cloudflare Pages deployment:
```
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

## The Solution

The issue is that Cloudflare is running `npx wrangler deploy` (for Workers) instead of `npx wrangler pages deploy` (for Pages).

### Fix #1: Update GitHub Actions Workflow (Recommended)

Your `.github/workflows/deploy-cloudflare.yml` has been updated. Push these changes:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Fix Cloudflare Pages deployment configuration"

# Push to trigger deployment
git push origin main
```

The updated workflow now uses:
- `npm ci` instead of `npm install --legacy-peer-deps` (faster, more reliable)
- `cloudflare/wrangler-action@v3` with explicit `pages deploy` command
- Correct wrangler configuration

### Fix #2: Update wrangler.toml

Your `wrangler.toml` has been updated with:

```toml
name = "transio"
compatibility_date = "2024-12-13"

pages_build_output_dir = "dist"

[assets]
directory = "./dist"
```

This explicitly tells Cloudflare:
- This is a Pages project (not a Worker)
- The build output is in `dist/`
- Assets should be served from `dist/`

### Fix #3: Cloudflare Dashboard Settings

If deploying through Cloudflare Dashboard (not GitHub Actions):

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → **transio** project
3. **Settings** → **Build & deployments**
4. Configure:
   ```
   Framework preset: None (or Vite)
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   ```
5. **Environment variables** → Add if needed:
   ```
   NODE_VERSION=22
   ```

### Fix #4: Manual Deploy from Command Line

Test deployment locally first:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json dist
npm install

# 2. Build the project
npm run build

# 3. Verify dist exists
ls -la dist/
# Should see: index.html, assets/, and other files

# 4. Login to Cloudflare (first time only)
npx wrangler login

# 5. Deploy using the correct command
npx wrangler pages deploy dist --project-name=transio
```

If this works, then the issue is with your GitHub Actions workflow or secrets.

---

## Verification Steps

After applying the fixes:

### 1. Check Local Build
```bash
npm run build
```
✅ Should complete without errors and create `dist/` folder

### 2. Check GitHub Actions
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Find the latest workflow run
4. Check each step for errors

Common issues:
- ❌ "npm ci" fails → Your package-lock.json is out of sync
- ❌ "Build" fails → Check for TypeScript or build errors
- ❌ "Deploy" fails → Check secrets are set correctly

### 3. Check GitHub Secrets
Repository → **Settings** → **Secrets and variables** → **Actions**

Required secrets:
- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### 4. Check Cloudflare Pages Project
Dashboard → **Workers & Pages** → **transio**

- Project should exist
- Latest deployment should show in list
- Custom domain (transio.org) should be connected

---

## Common Errors & Solutions

### Error: "npm ci can only install packages when package.json and package-lock.json are in sync"

**Solution:**
```bash
# Delete lock file and node_modules
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Commit the new lock file
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Error: "Cannot find module '@github/spark'"

**Solution:** This is a workspace issue. Your package.json has:
```json
"workspaces": {
  "packages": ["packages/*"]
}
```

The `@github/spark` package is in `packages/spark-tools/`. This is correct and should work.

If it still fails, check that `packages/spark-tools/package.json` exists and has:
```json
{
  "name": "@github/spark",
  "version": "0.0.1"
}
```

### Error: "Authentication error" in GitHub Actions

**Solution:**
1. Get new API token from Cloudflare
2. Update secret in GitHub repository settings
3. Re-run the workflow

### Error: "Project 'transio' not found"

**Solution:**
Either:
- Create the project in Cloudflare Dashboard first (Workers & Pages → Create → Connect to Git)
- Or deploy manually once: `npx wrangler pages deploy dist --project-name=transio`

---

## Quick Test Command

Test everything locally before pushing:

```bash
# Full test sequence
npm install && npm run build && npx wrangler pages deploy dist --project-name=transio
```

If this succeeds, your GitHub Actions should also succeed.

---

## Next Steps After Deployment Works

1. ✅ Verify site is live at `https://transio.pages.dev`
2. ✅ Add custom domain `transio.org` in Cloudflare Pages settings
3. ✅ Update GoDaddy nameservers to Cloudflare nameservers
4. ✅ Wait for DNS propagation (1-24 hours)
5. ✅ Verify site is live at `https://transio.org`

---

## Still Having Issues?

1. Check the build logs in Cloudflare Dashboard
2. Check the GitHub Actions logs
3. Test local deployment with `npm run deploy`
4. Verify all files are committed and pushed
5. Make sure you're pushing to the correct branch (`main` or `master`)

---

**Last updated:** December 2024

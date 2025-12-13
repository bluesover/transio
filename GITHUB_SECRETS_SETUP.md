# GitHub Secrets Setup Guide for Cloudflare Deployment

This guide will help you configure GitHub Secrets to enable automatic deployment to Cloudflare Pages.

## Required Secrets

You need to configure **2 secrets** in your GitHub repository:

1. **CLOUDFLARE_API_TOKEN** - Your Cloudflare API token with Pages deployment permissions
2. **CLOUDFLARE_ACCOUNT_ID** - Your Cloudflare account ID

---

## Step 1: Get Your Cloudflare Account ID

### Method 1: From Cloudflare Dashboard
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain (transio.org)
3. Scroll down on the Overview page
4. Look for **Account ID** in the right sidebar (under API section)
5. Copy the Account ID (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Method 2: From Cloudflare Pages
1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click on your project or create one
3. The URL will look like: `https://dash.cloudflare.com/<ACCOUNT_ID>/pages/...`
4. Copy the `<ACCOUNT_ID>` part from the URL

---

## Step 2: Create Cloudflare API Token

### Creating the API Token with Correct Permissions

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click on your profile icon (top right) → **My Profile**
3. Click **API Tokens** in the left sidebar
4. Click **Create Token** button

### Option A: Use Custom Token Template
5. Click **Create Custom Token**
6. Configure the token with these settings:

   **Token Name:** `GitHub Actions - Transio Deployment`
   
   **Permissions:**
   - Account → Cloudflare Pages → Edit
   - Account → Account Settings → Read (optional but recommended)
   
   **Account Resources:**
   - Include → Your Account (select your account name)
   
   **Zone Resources:**
   - Include → Specific zone → transio.org
   
   **Client IP Address Filtering:** (leave blank for GitHub Actions)
   
   **TTL:** Leave as default or set custom expiration

### Option B: Use Pre-configured Template
5. Find **Edit Cloudflare Workers** template
6. Click **Use template**
7. Add additional permission: **Cloudflare Pages - Edit**
8. Under **Account Resources**, select **Include → Your Account**
9. Under **Zone Resources**, select **Include → Specific zone → transio.org**

### Complete Token Creation
10. Click **Continue to summary**
11. Review the permissions
12. Click **Create Token**
13. **IMPORTANT:** Copy the token immediately! It will only be shown once.
    - The token looks like: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890_AbCdEfG`

---

## Step 3: Add Secrets to GitHub Repository

### Navigate to Repository Settings
1. Go to your GitHub repository: `https://github.com/bluesover/transio.org`
2. Click **Settings** tab (top menu)
3. In the left sidebar, expand **Secrets and variables** → Click **Actions**
4. You should see **Repository secrets** section

### Add CLOUDFLARE_API_TOKEN
1. Click **New repository secret** button
2. Enter the secret details:
   - **Name:** `CLOUDFLARE_API_TOKEN`
   - **Secret:** Paste your Cloudflare API token (from Step 2)
3. Click **Add secret**

### Add CLOUDFLARE_ACCOUNT_ID
1. Click **New repository secret** button again
2. Enter the secret details:
   - **Name:** `CLOUDFLARE_ACCOUNT_ID`
   - **Secret:** Paste your Cloudflare Account ID (from Step 1)
3. Click **Add secret**

### Verify Secrets Are Added
You should now see both secrets listed:
- ✅ `CLOUDFLARE_API_TOKEN`
- ✅ `CLOUDFLARE_ACCOUNT_ID`

---

## Step 4: Configure Cloudflare Pages Project

### In Cloudflare Dashboard
1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Create a new project or select existing **transio** project
3. Skip the Git integration (we're using GitHub Actions instead)
4. Make note of your project name: **transio**

### Configure Custom Domain
1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `transio.org`
4. Click **Activate domain**
5. Add another domain: `www.transio.org`
6. DNS records will be automatically configured

---

## Step 5: Test the Deployment

### Trigger Deployment
1. Make a small change to your code
2. Commit and push to the `main` or `master` branch:
   ```bash
   git add .
   git commit -m "Test Cloudflare deployment"
   git push origin main
   ```

### Monitor Deployment
1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see a new workflow run: **Deploy to Cloudflare Pages**
4. Click on the workflow to see the progress
5. Wait for all steps to complete (usually 2-3 minutes)

### Verify Deployment
1. Once the workflow completes successfully:
   - Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Click on your **transio** project
   - You should see the latest deployment
2. Visit your live site: `https://transio.org`

---

## Troubleshooting

### Error: "Missing CLOUDFLARE_API_TOKEN"
- Make sure you added the secret with the exact name: `CLOUDFLARE_API_TOKEN`
- Secret names are case-sensitive
- Re-add the secret if needed

### Error: "Missing CLOUDFLARE_ACCOUNT_ID"
- Make sure you added the secret with the exact name: `CLOUDFLARE_ACCOUNT_ID`
- Secret names are case-sensitive
- Double-check the Account ID is correct

### Error: "Authentication error"
- Your API token may be expired or have insufficient permissions
- Create a new API token with **Cloudflare Pages - Edit** permission
- Update the `CLOUDFLARE_API_TOKEN` secret in GitHub

### Error: "Project not found"
- Make sure the project name in `.github/workflows/deploy-cloudflare.yml` matches your Cloudflare Pages project name
- Default is `transio` - change if your project has a different name

### Build Errors
- Check the GitHub Actions logs for specific error messages
- Common issues:
  - Missing dependencies: `npm ci` failed
  - Build failed: Check your code for errors
  - TypeScript errors: Run `npm run lint` locally first

---

## Security Best Practices

### API Token Security
- ✅ **DO:** Keep your API token secret and never commit it to code
- ✅ **DO:** Use GitHub Secrets to store sensitive data
- ✅ **DO:** Set token expiration dates and rotate regularly
- ✅ **DO:** Use minimal required permissions for the token
- ❌ **DON'T:** Share your API token with anyone
- ❌ **DON'T:** Store tokens in environment files committed to Git

### Secret Management
- GitHub Secrets are encrypted and not exposed in logs
- Only repository admins can view and manage secrets
- Secrets are available to GitHub Actions workflows
- Consider using environment-specific secrets for staging/production

---

## Alternative: Manual Deployment

If you prefer to deploy manually without GitHub Actions:

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=transio
```

---

## Next Steps

After successful deployment:

1. ✅ Configure custom domain (transio.org)
2. ✅ Set up SSL/TLS (automatic with Cloudflare)
3. ✅ Configure caching rules (optional)
4. ✅ Set up analytics in Cloudflare
5. ✅ Add monitoring and alerts
6. ✅ Test the deployed application thoroughly

---

## Quick Reference

### Required GitHub Secrets
```
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

### Cloudflare Dashboard Links
- **Main Dashboard:** https://dash.cloudflare.com/
- **Pages:** https://dash.cloudflare.com/pages
- **API Tokens:** https://dash.cloudflare.com/profile/api-tokens
- **Domain Management:** https://dash.cloudflare.com/domains

### GitHub Repository Links
- **Repository Settings:** https://github.com/bluesover/transio.org/settings
- **Secrets Configuration:** https://github.com/bluesover/transio.org/settings/secrets/actions
- **Actions (Deployments):** https://github.com/bluesover/transio.org/actions

---

## Support

If you encounter any issues:

1. Check the [GitHub Actions logs](https://github.com/bluesover/transio.org/actions)
2. Review [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
3. Verify your API token permissions
4. Check Cloudflare status: https://www.cloudflarestatus.com/

---

## Summary Checklist

Before deploying, ensure:

- [ ] Cloudflare Account ID obtained
- [ ] Cloudflare API Token created with correct permissions
- [ ] `CLOUDFLARE_API_TOKEN` added to GitHub Secrets
- [ ] `CLOUDFLARE_ACCOUNT_ID` added to GitHub Secrets
- [ ] Cloudflare Pages project created (name: transio)
- [ ] wrangler.toml configured correctly
- [ ] GitHub Actions workflow file exists
- [ ] Code pushed to main/master branch
- [ ] Deployment workflow runs successfully
- [ ] Site accessible at transio.org

🎉 **You're ready to deploy!**

# 🔐 GitHub Secrets Setup Guide for Cloudflare Deployment

## 📍 Quick Reference

You need **2 secrets** in your GitHub repository for automated Cloudflare Pages deployment.

---

## 🎯 The Two Secrets You Need

| Secret Name | Where to Get It | Example Format |
|-------------|----------------|----------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare Dashboard → Profile → API Tokens | `abcd1234...` (40+ characters) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard → Pages → URL | `abc123def456ghi789` (32 characters) |

---

## 🚀 Step-by-Step Setup

### Part 1: Get Your Cloudflare API Token

1. **Go to Cloudflare Dashboard**
   ```
   https://dash.cloudflare.com/profile/api-tokens
   ```

2. **Create a New Token**
   - Click **"Create Token"**
   - Click **"Create Custom Token"**

3. **Token Configuration**
   ```
   Token name: GitHub Actions - Transio Deploy
   
   Permissions:
   - Account → Cloudflare Pages → Edit
   
   Account Resources:
   - Include → Your Account Name
   
   Client IP Address Filtering: (leave empty)
   
   TTL: (leave as default - never expires)
   ```

4. **Create and Copy Token**
   - Click **"Continue to summary"**
   - Click **"Create Token"**
   - **⚠️ COPY THE TOKEN NOW** - you won't see it again!
   - It looks like: `abcdef1234567890abcdef1234567890abcdef12`

### Part 2: Get Your Cloudflare Account ID

1. **Go to Cloudflare Pages**
   ```
   https://dash.cloudflare.com/
   ```
   - Click **"Pages"** in the left sidebar

2. **Look at the URL**
   ```
   URL: https://dash.cloudflare.com/abc123def456ghi789/pages
                                    ^^^^^^^^^^^^^^^^^^^^
                                    This is your Account ID
   ```

3. **Copy the Account ID**
   - It's the string between the slashes in the URL
   - It's 32 characters long
   - Example: `abc123def456ghi789jkl012mno345`

### Part 3: Add Secrets to GitHub

1. **Go to Your Repository**
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
   ```

2. **Navigate to Settings**
   - Click **"Settings"** tab (top right)
   - Click **"Secrets and variables"** in left sidebar
   - Click **"Actions"**

3. **Add First Secret: CLOUDFLARE_API_TOKEN**
   - Click **"New repository secret"**
   - **Name:** `CLOUDFLARE_API_TOKEN` (exactly this, all caps)
   - **Value:** Paste your API token from Part 1
   - Click **"Add secret"**

4. **Add Second Secret: CLOUDFLARE_ACCOUNT_ID**
   - Click **"New repository secret"** again
   - **Name:** `CLOUDFLARE_ACCOUNT_ID` (exactly this, all caps)
   - **Value:** Paste your Account ID from Part 2
   - Click **"Add secret"**

---

## ✅ Verify Your Setup

After adding both secrets, you should see:

```
Repository secrets
- CLOUDFLARE_ACCOUNT_ID        Updated X minutes ago
- CLOUDFLARE_API_TOKEN         Updated X minutes ago
```

---

## 🔍 Visual Guide

### Where to Find Account ID

```
Cloudflare Dashboard URL Structure:
┌──────────────────────────────────────────────────────────┐
│ https://dash.cloudflare.com/ACCOUNT_ID/pages            │
│                                  ^^^^^^^^^^^             │
│                              Copy this part!             │
└──────────────────────────────────────────────────────────┘
```

### Where to Create API Token

```
Navigation Path:
Cloudflare Dashboard
  └─ Click Profile Icon (top right)
      └─ My Profile
          └─ API Tokens tab
              └─ Create Token
```

---

## 🧪 Test Your Setup

### Method 1: Make a Test Commit

```bash
# Make a small change
echo "# Test deployment" >> README.md

# Commit and push
git add .
git commit -m "Test: Verify Cloudflare deployment"
git push origin main
```

### Method 2: Manual Workflow Trigger

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Select **"Deploy to Cloudflare Pages"** workflow
4. Click **"Run workflow"** button
5. Select branch: `main`
6. Click **"Run workflow"**

### Watch It Deploy

1. The workflow should start running immediately
2. You'll see these steps:
   - ✅ Checkout
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build project
   - ✅ Publish to Cloudflare Pages

3. After ~2-3 minutes, you'll see:
   - ✅ Green checkmark = Success!
   - ❌ Red X = Something went wrong (check logs)

---

## 🚨 Common Issues & Solutions

### ❌ Error: "CLOUDFLARE_API_TOKEN is not set"

**Problem:** Secret name is wrong or not set

**Solution:**
- Secret name MUST be exactly: `CLOUDFLARE_API_TOKEN` (all caps)
- No spaces before or after
- Go to Settings → Secrets → Actions and verify

### ❌ Error: "CLOUDFLARE_ACCOUNT_ID is not set"

**Problem:** Secret name is wrong or not set

**Solution:**
- Secret name MUST be exactly: `CLOUDFLARE_ACCOUNT_ID` (all caps)
- No spaces before or after
- Verify the Account ID is correct (32 characters)

### ❌ Error: "Authentication failed"

**Problem:** API token is invalid or has wrong permissions

**Solution:**
1. Delete the old token in Cloudflare
2. Create a new token with correct permissions:
   - Account → Cloudflare Pages → Edit
3. Update the `CLOUDFLARE_API_TOKEN` secret in GitHub

### ❌ Error: "Project not found"

**Problem:** The Cloudflare Pages project doesn't exist yet

**Solution:**
- The first deployment will create the project automatically
- If it fails, manually create a Pages project named "transio" in Cloudflare
- Then re-run the workflow

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep your API token secret (never commit to code)
- Use repository secrets (encrypted by GitHub)
- Rotate tokens periodically (every 6-12 months)
- Use scoped tokens (only Pages permission)
- Delete unused tokens

### ❌ DON'T:
- Share tokens publicly
- Commit tokens to GitHub
- Use account-level tokens (too powerful)
- Store tokens in plain text files
- Use the same token across multiple projects

---

## 📝 Secret Names Reference

```yaml
# In GitHub Actions workflow (.github/workflows/deploy-cloudflare.yml)

secrets.CLOUDFLARE_API_TOKEN
         ^^^^^^^^^^^^^^^^^^^
         Must match exactly!

secrets.CLOUDFLARE_ACCOUNT_ID
         ^^^^^^^^^^^^^^^^^^^^
         Must match exactly!
```

---

## 🔄 Need to Update a Secret?

1. **Go to Repository Settings**
   - Settings → Secrets and variables → Actions

2. **Click on the Secret Name**
   - Select the secret you want to update

3. **Update Value**
   - Paste the new value
   - Click **"Update secret"**

4. **Re-run Failed Workflow**
   - Go to Actions tab
   - Find the failed workflow
   - Click **"Re-run jobs"**

---

## 📚 Related Documentation

- **GitHub Actions Secrets:** https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **Cloudflare API Tokens:** https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
- **Cloudflare Pages API:** https://developers.cloudflare.com/api/operations/pages-project-list-projects

---

## ✅ Final Checklist

Before pushing your code, verify:

- [ ] `CLOUDFLARE_API_TOKEN` secret is set in GitHub
- [ ] `CLOUDFLARE_ACCOUNT_ID` secret is set in GitHub
- [ ] Both secret names are EXACTLY as shown (all caps, no spaces)
- [ ] API token has "Cloudflare Pages → Edit" permission
- [ ] Account ID is 32 characters long
- [ ] GitHub Actions workflow file exists: `.github/workflows/deploy-cloudflare.yml`

---

## 🎉 Ready to Deploy!

Once both secrets are set, your deployments will happen automatically:

1. **Push to main/master branch** → Auto-deploy ✅
2. **Merge pull request** → Auto-deploy ✅
3. **Manual trigger** → Click and deploy ✅

Your site will be live at:
- `https://transio.pages.dev` (Cloudflare URL)
- `https://transio.org` (after custom domain setup)

---

**Happy Deploying! 🚀**

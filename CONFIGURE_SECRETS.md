# 🔐 Configure Cloudflare API Token & Account ID in GitHub Secrets

**Quick 5-minute guide to set up automated deployments**

---

## 📍 You Are Here

Your Transio app is ready to deploy! You just need to add 2 secrets to GitHub so automatic deployments work.

---

## 🎯 What You Need

Two pieces of information from Cloudflare:
1. **API Token** - Lets GitHub deploy to your Cloudflare account
2. **Account ID** - Tells Cloudflare which account to use

---

## Step 1️⃣: Get Cloudflare Account ID (1 minute)

### Option A: From Cloudflare Dashboard
1. Visit: https://dash.cloudflare.com
2. Click on **any website** in your dashboard
3. Scroll down the Overview page
4. Look in the **right sidebar** under "API"
5. Find **Account ID** 
6. Click the **Copy** button
7. **Paste it somewhere safe** (Notepad, TextEdit, etc.)

It looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### Option B: From URL
1. Visit: https://dash.cloudflare.com/pages
2. Look at the URL in your browser
3. It looks like: `https://dash.cloudflare.com/<YOUR_ACCOUNT_ID>/pages`
4. Copy the `<YOUR_ACCOUNT_ID>` part

---

## Step 2️⃣: Create Cloudflare API Token (2 minutes)

### Navigate to API Tokens
1. Visit: https://dash.cloudflare.com
2. Click your **profile icon** (top right corner)
3. Click **My Profile**
4. Click **API Tokens** in the left sidebar
5. Click the blue **Create Token** button

### Configure the Token
6. Scroll down and click **Create Custom Token** (at the bottom)
7. Fill in the form:

   **Token name:** (Enter this)
   ```
   GitHub Transio Deploy
   ```

   **Permissions:** (Click "Add more" to add each)
   ```
   Account | Cloudflare Pages | Edit
   ```

   **Account Resources:** (Select from dropdown)
   ```
   Include | [Your Account Name]
   ```

   **Zone Resources:** (Leave as "All zones" or skip)
   
   **Client IP Address Filtering:** (Leave blank)
   
   **TTL:** (Leave default or set expiration date)

8. Click **Continue to summary**
9. Review the permissions
10. Click **Create Token**

### Copy Your Token
11. You'll see a screen with your API token
12. **⚠️ IMPORTANT:** This is shown **only once**!
13. Click **Copy** button
14. **Paste it somewhere safe** (Notepad, TextEdit, etc.)

The token looks like: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890_AbCdEfG`

---

## Step 3️⃣: Add Secrets to GitHub (2 minutes)

### Navigate to GitHub Secrets
1. Visit your repository: https://github.com/bluesover/transio.org
2. Click the **Settings** tab (top menu)
3. In left sidebar: **Secrets and variables** → **Actions**
4. You'll see "Repository secrets" section

### Add First Secret: API Token
5. Click green **New repository secret** button
6. Fill in:
   - **Name:** (Type exactly, case-sensitive)
     ```
     CLOUDFLARE_API_TOKEN
     ```
   - **Secret:** (Paste your API token from Step 2)
7. Click **Add secret**

### Add Second Secret: Account ID
8. Click **New repository secret** button again
9. Fill in:
   - **Name:** (Type exactly, case-sensitive)
     ```
     CLOUDFLARE_ACCOUNT_ID
     ```
   - **Secret:** (Paste your Account ID from Step 1)
10. Click **Add secret**

### Verify
You should now see **2 secrets** listed:
- ✅ `CLOUDFLARE_API_TOKEN`
- ✅ `CLOUDFLARE_ACCOUNT_ID`

---

## ✅ Done! Test Your Setup

### Trigger a Deployment

```bash
# Option 1: Make a small change and push
echo "# Deployment test" >> README.md
git add README.md
git commit -m "Test GitHub Actions deployment"
git push origin main
```

```bash
# Option 2: Trigger workflow manually
# Go to: https://github.com/bluesover/transio.org/actions
# Click "Deploy to Cloudflare Pages"
# Click "Run workflow" → "Run workflow"
```

### Monitor the Deployment

1. Go to: https://github.com/bluesover/transio.org/actions
2. You'll see a workflow run: **Deploy to Cloudflare Pages**
3. Click on it to see progress
4. Watch the steps:
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build project
   - ✅ Deploy to Cloudflare Pages
5. Wait 2-4 minutes for completion

### Success! 🎉

Once complete:
- Your app is deployed to Cloudflare
- Visit: https://transio.pages.dev (or your custom domain)
- **Future pushes to `main` branch auto-deploy!**

---

## 🐛 Troubleshooting

### Problem: "Authentication error" in GitHub Actions

**Cause:** Secrets missing or incorrect

**Fix:**
1. Go to: https://github.com/bluesover/transio.org/settings/secrets/actions
2. Check both secrets exist
3. Verify names match **exactly** (case-sensitive):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. If wrong, delete and re-add

### Problem: "Project not found"

**Cause:** Cloudflare Pages project doesn't exist yet

**Fix:**
1. Go to: https://dash.cloudflare.com/pages
2. Create a project named **transio**
3. Or update workflow file with your project name

### Problem: API Token expired or insufficient permissions

**Fix:**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find your token: "GitHub Transio Deploy"
3. Click **Edit**
4. Verify permissions include: `Account | Cloudflare Pages | Edit`
5. Or delete old token and create new one (repeat Step 2)
6. Update GitHub secret with new token

---

## 📋 Quick Reference

### Where to Find Things

**Cloudflare Dashboard:**
- Main: https://dash.cloudflare.com
- Pages: https://dash.cloudflare.com/pages
- API Tokens: https://dash.cloudflare.com/profile/api-tokens

**GitHub:**
- Repository: https://github.com/bluesover/transio.org
- Settings: https://github.com/bluesover/transio.org/settings
- Secrets: https://github.com/bluesover/transio.org/settings/secrets/actions
- Actions (Deployments): https://github.com/bluesover/transio.org/actions

### Secret Names (Copy these exactly)

```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

### Required API Token Permission

```
Account | Cloudflare Pages | Edit
```

---

## 🔒 Security Notes

- ✅ Secrets are **encrypted** in GitHub
- ✅ Secrets are **never shown in logs**
- ✅ Only **repository admins** can view/edit secrets
- ✅ API tokens should **never be committed** to code
- ✅ Set **expiration dates** on tokens for security
- ✅ Use **minimal permissions** (only Cloudflare Pages)

---

## 🎉 What Happens Next?

After secrets are configured:

1. **Every push to `main` branch** triggers auto-deploy
2. **Build takes 2-4 minutes**
3. **Site updates automatically**
4. **Zero manual work needed!**

You can focus on coding - deployments are automatic! 🚀

---

## 📚 More Resources

Need detailed instructions?

- **Full deployment guide:** [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- **Quick start:** [QUICK_START_DEPLOYMENT.md](./QUICK_START_DEPLOYMENT.md)
- **Secrets details:** [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md)
- **App documentation:** [README.md](./README.md)

---

## ✅ Checklist

Complete these in order:

- [ ] Got Cloudflare Account ID
- [ ] Created Cloudflare API Token
- [ ] Added `CLOUDFLARE_API_TOKEN` to GitHub Secrets
- [ ] Added `CLOUDFLARE_ACCOUNT_ID` to GitHub Secrets
- [ ] Pushed code to trigger deployment
- [ ] Verified workflow runs successfully
- [ ] Confirmed site is live

**All done?** You're ready to deploy! 🎉

---

*Estimated time: 5 minutes*

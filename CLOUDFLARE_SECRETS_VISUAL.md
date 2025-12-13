# 🔐 Cloudflare Secrets - Visual Quick Reference

## 📍 Where to Get Your Credentials

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE DASHBOARD                              │
│  https://dash.cloudflare.com                                        │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
        ┌──────────────────────┐  ┌──────────────────────┐
        │   API TOKEN          │  │   ACCOUNT ID         │
        └──────────────────────┘  └──────────────────────┘
                    │                         │
                    ▼                         ▼
        Profile → API Tokens      Look at Pages URL
        Create Custom Token       Copy ID from URL path
                    │                         │
                    │                         │
                    ▼                         ▼
        ┌──────────────────────────────────────────────┐
        │     Copy and save these two values           │
        └──────────────────────────────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │           ADD TO GITHUB SECRETS              │
        │  Repository → Settings → Secrets → Actions   │
        └──────────────────────────────────────────────┘
```

---

## 🎯 The Two Secrets You Need

### 1️⃣ CLOUDFLARE_API_TOKEN

**What it is:** A key that lets GitHub Actions deploy to your Cloudflare account

**How to get it:**
```
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click: "Create Token"
3. Click: "Create Custom Token"
4. Name it: "GitHub Actions Deploy"
5. Add permission: Account → Cloudflare Pages → Edit
6. Click: "Create Token"
7. COPY THE TOKEN (you won't see it again!)
```

**What it looks like:**
```
abcdef1234567890abcdef1234567890abcdef12
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
40+ character string of letters and numbers
```

---

### 2️⃣ CLOUDFLARE_ACCOUNT_ID

**What it is:** Your unique Cloudflare account identifier

**How to get it:**
```
1. Go to: https://dash.cloudflare.com/
2. Click: "Pages" in the sidebar
3. Look at the browser URL
```

**Example URL:**
```
https://dash.cloudflare.com/abc123def456ghi789jkl012mno345/pages
                            ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
                            This is your Account ID!
                            Copy everything between the slashes
```

**What it looks like:**
```
abc123def456ghi789jkl012mno345
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
32 character string
```

---

## 🔐 Adding Secrets to GitHub

### Visual Navigation Path:

```
GitHub.com
  │
  └─► Your Repository
        │
        └─► Settings (top tab)
              │
              └─► Secrets and variables (left sidebar)
                    │
                    └─► Actions
                          │
                          └─► New repository secret (button)
                                │
                                └─► Add both secrets here!
```

### Adding Secret #1:

```
┌─────────────────────────────────────────┐
│ New secret                              │
├─────────────────────────────────────────┤
│ Name:                                   │
│ ┌─────────────────────────────────────┐ │
│ │ CLOUDFLARE_API_TOKEN                │ │  ← Type exactly this
│ └─────────────────────────────────────┘ │
│                                         │
│ Value:                                  │
│ ┌─────────────────────────────────────┐ │
│ │ abcdef1234567890abcdef1234567890... │ │  ← Paste your token
│ └─────────────────────────────────────┘ │
│                                         │
│        [Add secret]                     │
└─────────────────────────────────────────┘
```

### Adding Secret #2:

```
┌─────────────────────────────────────────┐
│ New secret                              │
├─────────────────────────────────────────┤
│ Name:                                   │
│ ┌─────────────────────────────────────┐ │
│ │ CLOUDFLARE_ACCOUNT_ID               │ │  ← Type exactly this
│ └─────────────────────────────────────┘ │
│                                         │
│ Value:                                  │
│ ┌─────────────────────────────────────┐ │
│ │ abc123def456ghi789jkl012mno345      │ │  ← Paste your Account ID
│ └─────────────────────────────────────┘ │
│                                         │
│        [Add secret]                     │
└─────────────────────────────────────────┘
```

---

## ✅ Verification

After adding both secrets, your page should show:

```
┌──────────────────────────────────────────────────┐
│ Repository secrets                               │
├──────────────────────────────────────────────────┤
│ ✅ CLOUDFLARE_ACCOUNT_ID     Updated 1 min ago   │
│ ✅ CLOUDFLARE_API_TOKEN      Updated 2 mins ago  │
└──────────────────────────────────────────────────┘
```

---

## 🔄 How GitHub Actions Uses These Secrets

```
┌─────────────────────────────────────────────────────────────┐
│  .github/workflows/deploy-cloudflare.yml                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  - name: Publish to Cloudflare Pages                        │
│    uses: cloudflare/pages-action@v1                         │
│    with:                                                     │
│      apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}    ←┐    │
│      accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}  ←┼─┐  │
│      projectName: transio                               │ │  │
│      directory: dist                                    │ │  │
│                                                         │ │  │
└─────────────────────────────────────────────────────────┼─┼──┘
                                                          │ │
                    These reference your secrets ────────┘ │
                    stored in GitHub ────────────────────────┘
```

---

## 🚨 Common Mistakes to Avoid

### ❌ WRONG Secret Names:
```
cloudflare_api_token       ← lowercase, underscore wrong
Cloudflare-API-Token       ← wrong case and separator
CLOUDFLARE API TOKEN       ← spaces not allowed
```

### ✅ CORRECT Secret Names:
```
CLOUDFLARE_API_TOKEN       ← Exactly this!
CLOUDFLARE_ACCOUNT_ID      ← Exactly this!
```

### Secret Names Are Case-Sensitive!

```
CLOUDFLARE_API_TOKEN ✅  (works)
cloudflare_api_token ❌  (won't work)
Cloudflare_Api_Token ❌  (won't work)
```

---

## 🧪 Testing Your Setup

### Step 1: Verify Secrets Are Set

```
GitHub Repository
  → Settings
    → Secrets and variables
      → Actions
        → Should see 2 secrets listed ✅
```

### Step 2: Trigger Deployment

```bash
# Make a change
echo "Test" >> README.md

# Commit and push
git add .
git commit -m "Test Cloudflare deployment"
git push origin main
```

### Step 3: Watch It Deploy

```
GitHub Repository
  → Actions tab
    → Click on workflow run
      → Watch the steps execute
        → Wait for ✅ green checkmark
```

---

## 🎯 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| ❌ "CLOUDFLARE_API_TOKEN is not set" | Check secret name is EXACT (all caps, with underscores) |
| ❌ "Authentication failed" | Regenerate API token with correct permissions |
| ❌ "Account not found" | Verify Account ID is correct (32 characters) |
| ❌ Workflow doesn't run | Check you pushed to `main` or `master` branch |

---

## 📋 Checklist

Before pushing code, verify:

- [ ] API Token created in Cloudflare
- [ ] Account ID copied from Cloudflare URL
- [ ] Secret `CLOUDFLARE_API_TOKEN` added to GitHub (exact name)
- [ ] Secret `CLOUDFLARE_ACCOUNT_ID` added to GitHub (exact name)
- [ ] Both secrets show in Settings → Secrets → Actions
- [ ] Workflow file exists: `.github/workflows/deploy-cloudflare.yml`

---

## 🎉 You're Ready!

Once both secrets are set correctly:

```
Your Code → Push to GitHub → Automatic Deployment → Live at transio.org
```

**Time from push to live: ~2-3 minutes** ⚡

---

## 📚 Related Guides

- **Full Setup:** `CLOUDFLARE_SETUP_COMPLETE.md`
- **Quick Start:** `DEPLOY_TO_CLOUDFLARE_NOW.md`
- **Detailed Secrets:** `SECRETS_SETUP_GUIDE.md`

---

**Need more help?** Check the full guides or Cloudflare documentation!

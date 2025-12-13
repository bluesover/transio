# 🔑 Cloudflare API Token Setup Guide

## Visual Step-by-Step Instructions

### 🎯 Quick Overview
This guide shows you exactly how to create a Cloudflare API token for deploying Transio.

---

## 📋 Method 1: Create API Token (Recommended)

### Step 1: Access Cloudflare Dashboard
```
1. Go to: https://dash.cloudflare.com/
2. Log in with your credentials
3. You'll see your dashboard homepage
```

### Step 2: Navigate to API Tokens
```
Dashboard → Profile Icon (top right) → My Profile → API Tokens (left sidebar)

Visual Path:
┌─────────────────────────────────────┐
│  Cloudflare Dashboard               │
│                          [Profile] ← Click here
│                              ↓
│                         My Profile
│                              ↓
│  [API Tokens] ← Click this in sidebar
└─────────────────────────────────────┘
```

### Step 3: Create Token Button
```
Click the blue "Create Token" button

┌─────────────────────────────────────┐
│  API Tokens                          │
│                                      │
│  [+ Create Token]  ← Click this     │
│                                      │
│  Existing tokens will appear below   │
└─────────────────────────────────────┘
```

### Step 4: Select Template
```
Choose "Edit Cloudflare Workers" template
OR
Click "Create Custom Token"

┌─────────────────────────────────────┐
│  Create Token                        │
│                                      │
│  📝 Edit Cloudflare Workers         │
│     Perfect for Pages & Workers      │
│     [Use Template] ← Click this     │
│                                      │
│  🎨 Custom Token                    │
│     Build your own permissions       │
│     [Create Custom Token]            │
└─────────────────────────────────────┘
```

### Step 5: Configure Permissions
```
Set these permissions:

Account Permissions:
┌─────────────────────────────────────┐
│ Cloudflare Pages     [Edit] ✓       │
│ Account Analytics    [Read] ✓       │
└─────────────────────────────────────┘

Zone Permissions (optional for custom domain):
┌─────────────────────────────────────┐
│ DNS                  [Edit]          │
└─────────────────────────────────────┘

Account Resources:
┌─────────────────────────────────────┐
│ Include → [Your Account Name]        │
└─────────────────────────────────────┘
```

### Step 6: Set Client IP Filtering (Optional)
```
For extra security, add your IP:

┌─────────────────────────────────────┐
│ Client IP Address Filtering          │
│                                      │
│ Is in: [Your IP: 123.456.789.0] ✓   │
│                                      │
│ (Leave blank to allow all IPs)       │
└─────────────────────────────────────┘
```

### Step 7: Set TTL (Time to Live)
```
Token expiration (optional):

┌─────────────────────────────────────┐
│ TTL (Time to Live)                   │
│                                      │
│ Start Date: [Today]                  │
│ End Date:   [1 year from now]        │
│                                      │
│ (Leave blank for no expiration)      │
└─────────────────────────────────────┘
```

### Step 8: Review & Create
```
1. Click "Continue to summary"
2. Review your settings
3. Click "Create Token"

┌─────────────────────────────────────┐
│  Token Summary                       │
│                                      │
│  ✓ Cloudflare Pages - Edit          │
│  ✓ Account: Your Account            │
│                                      │
│  [Create Token] ← Final click       │
└─────────────────────────────────────┘
```

### Step 9: COPY YOUR TOKEN! ⚠️
```
┌─────────────────────────────────────┐
│  🎉 Success! Token Created          │
│                                      │
│  Token:                              │
│  ┌─────────────────────────────┐    │
│  │ abcd1234efgh5678ijkl9012... │ 📋 │
│  └─────────────────────────────┘    │
│                                      │
│  ⚠️  This is the only time you can   │
│     see this token. Copy it now!    │
│                                      │
│  [Copy] ← Click to copy             │
└─────────────────────────────────────┘

IMPORTANT: Save this token somewhere safe!
You cannot view it again after leaving this page.
```

---

## 📋 Method 2: Using Global API Key (Less Secure)

### When to Use This
- ⚠️ Only if API tokens don't work for you
- ⚠️ Less secure (full account access)
- ⚠️ Cannot set specific permissions

### Steps
```
1. Dashboard → Profile Icon → My Profile
2. Scroll down to "API Keys" section
3. Find "Global API Key"
4. Click [View]
5. Enter your Cloudflare password
6. Copy the key

┌─────────────────────────────────────┐
│  API Keys                            │
│                                      │
│  Global API Key                      │
│  [View]  ← Click and enter password │
│                                      │
│  Origin CA Key                       │
│  [View]                              │
└─────────────────────────────────────┘
```

---

## 🔧 Using Your Token

### Option A: Wrangler CLI Login
```bash
# Interactive login (recommended)
wrangler login

# Or use token directly
export CLOUDFLARE_API_TOKEN=your-token-here
wrangler pages deploy dist --project-name=transio
```

### Option B: GitHub Actions Secret
```
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: CLOUDFLARE_API_TOKEN
5. Value: [paste your token]
6. Click "Add secret"

GitHub Visual:
Repository → Settings
    ↓
Secrets and variables → Actions
    ↓
[New repository secret]
    ↓
Name: CLOUDFLARE_API_TOKEN
Value: your-token-here
    ↓
[Add secret]
```

### Option C: Environment Variable
```bash
# Linux/Mac
export CLOUDFLARE_API_TOKEN="your-token-here"
echo $CLOUDFLARE_API_TOKEN

# Windows (CMD)
set CLOUDFLARE_API_TOKEN=your-token-here

# Windows (PowerShell)
$env:CLOUDFLARE_API_TOKEN="your-token-here"
```

---

## 🔍 Verify Token Works

### Test with Wrangler
```bash
# Set your token
export CLOUDFLARE_API_TOKEN="your-token-here"

# Test it
wrangler whoami

# Expected output:
# ┌──────────────────────────┬──────────────────────────┐
# │ Account Name             │ Account ID               │
# ├──────────────────────────┼──────────────────────────┤
# │ Your Account             │ abc123...                │
# └──────────────────────────┴──────────────────────────┘
```

### Test Deployment
```bash
# Build your app
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=transio

# Expected output:
# ✨ Compiled Worker successfully
# ✨ Uploading...
# ✨ Deployment complete!
# 🌎 https://transio.pages.dev
```

---

## ⚠️ Security Best Practices

### DO ✅
- ✅ Use API tokens (not Global API Key)
- ✅ Set specific permissions (least privilege)
- ✅ Set token expiration dates
- ✅ Store tokens in environment variables
- ✅ Use GitHub Secrets for CI/CD
- ✅ Rotate tokens regularly
- ✅ Delete unused tokens

### DON'T ❌
- ❌ Commit tokens to Git repositories
- ❌ Share tokens in screenshots
- ❌ Use Global API Key unless necessary
- ❌ Give more permissions than needed
- ❌ Store tokens in plain text files
- ❌ Use same token for multiple projects
- ❌ Leave tokens without expiration

---

## 🚨 Token Leaked? Act Fast!

If you accidentally exposed your token:

```
1. Go to Cloudflare Dashboard immediately
2. Profile → My Profile → API Tokens
3. Find the leaked token
4. Click [Roll] or [Delete]
5. Create a new token
6. Update your deployments with new token

Visual:
API Tokens → Find Token → [...] → Delete
                              ↓
                          [Confirm Delete]
```

---

## 🎯 Token Permissions Reference

### Minimum Permissions for Transio
```
Account Permissions:
├── Cloudflare Pages → Edit (Required)
└── Account Analytics → Read (Optional)

Zone Permissions (only if custom domain):
└── DNS → Edit (Optional)
```

### Full Permissions Template
```yaml
Token Name: Transio Deployment Token
Permissions:
  Account:
    - Cloudflare Pages: Edit
    - Account Analytics: Read
  Zone:
    - DNS: Edit (if using custom domain)
  
Account Resources: Include → Your Account
Client IP: Optional (Your IP for security)
TTL: 1 year (or no expiration)
```

---

## 📞 Troubleshooting

### Error: "Authentication error"
```
Problem: Token is invalid or expired
Solution:
1. Check token was copied correctly
2. Verify token hasn't expired
3. Create a new token if needed
```

### Error: "Insufficient permissions"
```
Problem: Token doesn't have required permissions
Solution:
1. Go to API Tokens in Cloudflare
2. Edit the token
3. Add "Cloudflare Pages - Edit" permission
4. Save and use updated token
```

### Error: "Account not found"
```
Problem: Token not associated with correct account
Solution:
1. Verify you're logged into correct Cloudflare account
2. Check token was created in the right account
3. Use wrangler whoami to verify
```

---

## ✅ Success Checklist

- [ ] Cloudflare account created
- [ ] Logged into Cloudflare Dashboard
- [ ] Navigated to API Tokens page
- [ ] Created new API token
- [ ] Set "Cloudflare Pages - Edit" permission
- [ ] Copied token and saved securely
- [ ] Token stored in environment variable or GitHub Secret
- [ ] Tested token with `wrangler whoami`
- [ ] Successfully deployed test build

---

## 🎉 You're Ready!

Your token is set up! Now you can:
1. Deploy with Wrangler CLI
2. Set up GitHub Actions
3. Use continuous deployment
4. Manage your Cloudflare Pages projects

**Next Steps**: Return to [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) and continue with Step 2!

---

**Quick Links**:
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [API Token Management](https://dash.cloudflare.com/profile/api-tokens)
- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

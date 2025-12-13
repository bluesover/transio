# ⚡ Quick Command Reference - Transio Deployment

**Project Folder:** `transio`  
**GitHub Repo:** `transio`  
**Cloudflare Pages:** `transio`  
**Domain:** `transio.org`

---

## 🚀 First Time Setup (MacBook)

```bash
# 1. Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js
brew install node

# 3. Install Git
brew install git

# 4. Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 5. Navigate to your project
cd ~/Desktop/transio

# 6. Install dependencies
rm -rf node_modules package-lock.json
npm install

# 7. Test build
npm run build
```

---

## 📦 GitHub Repository Setup

```bash
# 1. Create repo on GitHub.com:
#    - Go to: https://github.com/new
#    - Name: transio
#    - Visibility: Public
#    - Click "Create repository"

# 2. Link local project to GitHub
git init
git add .
git commit -m "Initial commit: Transio XML/XSLT Transformer"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/transio.git
git push -u origin main
```

**Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username!**

---

## ☁️ Cloudflare Pages Deployment

```bash
# 1. Install Wrangler globally
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Build project
npm run build

# 4. Deploy with project name "transio"
npx wrangler pages deploy dist --project-name=transio
```

**Your app is live at:** `https://transio.pages.dev`

---

## 🌍 Custom Domain Setup (transio.org)

### In Cloudflare Dashboard:

1. Go to: https://dash.cloudflare.com/
2. Click **Workers & Pages** → **transio**
3. Click **Custom domains** → **Set up a custom domain**
4. Enter: `transio.org` → **Continue**

### In GoDaddy DNS Settings:

1. Go to: https://dcc.godaddy.com/domains
2. Click **transio.org** → **DNS**
3. Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | transio.pages.dev | 1 Hour |
| CNAME | www | transio.pages.dev | 1 Hour |

4. **Wait 10-30 minutes** for DNS to propagate
5. **Verify:** `https://transio.org`

---

## 🔄 Daily Development Workflow

```bash
# 1. Open VS Code
cd ~/Desktop/transio
code .

# 2. Start dev server
npm run dev
# Opens at: http://localhost:5173

# 3. Make your changes in VS Code

# 4. Save and commit
git add .
git commit -m "Describe your changes"
git push

# 5. Build and deploy
npm run build
npx wrangler pages deploy dist --project-name=transio

# 6. Check live site
open https://transio.org
```

---

## 🆘 Fix Common Errors

### `tsc: command not found`
```bash
rm -rf node_modules package-lock.json
npm install
```

### `npm: command not found`
```bash
brew install node
```

### `git: command not found`
```bash
brew install git
```

### Build fails
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Cloudflare login fails
```bash
wrangler logout
wrangler login
```

---

## 📋 All Commands at a Glance

```bash
# Installation
brew install node           # Install Node.js
brew install git            # Install Git
npm install -g wrangler     # Install Cloudflare CLI

# Project Setup
cd ~/Desktop/transio        # Navigate to project
npm install                 # Install dependencies
npm run build               # Build for production

# Git
git add .                   # Stage changes
git commit -m "message"     # Commit
git push                    # Push to GitHub

# Development
npm run dev                 # Start dev server (localhost:5173)
npm run build               # Build for production
npm run preview             # Preview production build

# Deployment
wrangler login                                          # Login to Cloudflare
npx wrangler pages deploy dist --project-name=transio  # Deploy to Cloudflare

# Verification
node --version              # Check Node.js
npm --version               # Check npm
git --version               # Check Git
npx tsc --version           # Check TypeScript
wrangler --version          # Check Wrangler
```

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **Live App** | https://transio.org |
| **Dev URL** | http://localhost:5173 |
| **Cloudflare URL** | https://transio.pages.dev |
| **GitHub Repo** | https://github.com/YOUR_GITHUB_USERNAME/transio |
| **Cloudflare Dashboard** | https://dash.cloudflare.com/ |
| **GoDaddy DNS** | https://dcc.godaddy.com/domains |
| **DNS Checker** | https://dnschecker.org/ |

---

## ✅ Success Checklist

After setup, verify:

- [ ] `npm --version` works
- [ ] `npm run build` creates `dist/` folder
- [ ] GitHub repo exists
- [ ] `https://transio.pages.dev` loads
- [ ] `https://transio.org` loads (after DNS)
- [ ] App features work (transform, save, etc.)

---

**🎉 All Done!** Your Transio app is live at **https://transio.org**

For detailed troubleshooting, see: **MACBOOK_DEPLOYMENT_STEPS.md**

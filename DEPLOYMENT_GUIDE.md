# 🚀 Free Deployment & Local Hosting Guide

## Overview

This XML/XSLT Transformer runs **100% locally** in the browser. All data is stored on the user's computer, with no backend server or database required. This means:

✅ **Completely Free** - No hosting costs, ever  
✅ **Privacy First** - All data stays on user's PC  
✅ **Offline Capable** - Works without internet after initial load  
✅ **No Account Required** - Start using immediately  

---

## 📦 Table of Contents

1. [Free Hosting Options](#free-hosting-options)
2. [Local Development](#local-development)
3. [Building for Production](#building-for-production)
4. [Local Project Management](#local-project-management)
5. [Deployment Instructions](#deployment-instructions)
6. [Troubleshooting](#troubleshooting)

---

## 🆓 Free Hosting Options

### Option 1: GitHub Pages (Recommended) ⭐

**Cost:** FREE  
**Storage:** Unlimited static files  
**Bandwidth:** Unlimited for public repos  
**Custom Domain:** Yes (free)  
**SSL:** Automatic (free)  

#### Quick Deploy to GitHub Pages:

```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repository
# Go to github.com and create a new repository

# 3. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/xslt-transformer.git
git branch -M main
git push -u origin main

# 4. Build the app
npm run build

# 5. Deploy to GitHub Pages
npm install -g gh-pages
gh-pages -d dist
```

**Your app will be live at:** `https://YOUR_USERNAME.github.io/xslt-transformer/`

#### Automated Deployment with GitHub Actions:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### Option 2: Netlify

**Cost:** FREE (100GB bandwidth/month)  
**Build Minutes:** 300/month  
**Instant rollbacks:** Yes  
**Custom Domain:** Yes (free)  
**SSL:** Automatic (free)  

#### Deploy to Netlify:

```bash
# Method 1: Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod

# Method 2: Drag & Drop
npm run build
# Go to netlify.com/drop and drag the 'dist' folder
```

#### Netlify Configuration File:

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Your app will be live at:** `https://YOUR_APP_NAME.netlify.app/`

---

### Option 3: Vercel

**Cost:** FREE (unlimited bandwidth for personal projects)  
**Build Time:** Unlimited  
**Deployments:** Unlimited  
**Custom Domain:** Yes (free)  
**SSL:** Automatic (free)  

#### Deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

**Your app will be live at:** `https://YOUR_APP_NAME.vercel.app/`

---

### Option 4: Cloudflare Pages

**Cost:** FREE (unlimited bandwidth)  
**Builds:** 500/month  
**Requests:** Unlimited  
**Custom Domain:** Yes (free)  
**SSL:** Automatic (free)  

#### Deploy to Cloudflare Pages:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy dist
```

**Your app will be live at:** `https://YOUR_APP_NAME.pages.dev/`

---

### Option 5: Surge.sh

**Cost:** FREE (unlimited projects)  
**Deploy Time:** < 1 minute  
**Custom Domain:** Yes (free on paid plan)  
**SSL:** Automatic (free)  

#### Deploy to Surge:

```bash
# Install Surge CLI
npm install -g surge

# Build and deploy
npm run build
cd dist
surge
```

**Your app will be live at:** `https://YOUR_SUBDOMAIN.surge.sh/`

---

### Option 6: Firebase Hosting

**Cost:** FREE (10GB storage, 360MB/day bandwidth)  
**SSL:** Automatic (free)  
**CDN:** Global  
**Custom Domain:** Yes (free)  

#### Deploy to Firebase:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

---

## 💻 Local Development

### Prerequisites

- **Node.js 18+** (Download from nodejs.org)
- **npm** (Comes with Node.js)
- **Modern browser** (Chrome, Edge, Firefox, Safari)

### Setup

```bash
# 1. Clone or download the repository
git clone https://github.com/YOUR_USERNAME/xslt-transformer.git
cd xslt-transformer

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173
```

---

## 🏗️ Building for Production

### Standard Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Build Output

The build creates a `dist/` folder with:
- Optimized JavaScript bundles
- Minified CSS
- Static assets
- index.html

### Build Configuration

The app is configured in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for any hosting
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'editor': ['@uiw/react-codemirror'],
          'saxon': ['saxon-js']
        }
      }
    }
  }
})
```

---

## 📁 Local Project Management

### How Local Storage Works

The app uses **two storage mechanisms**:

1. **IndexedDB (via useKV)** - Stores:
   - XML input
   - XSLT stylesheets
   - Transformation output
   - Version history
   - Activity logs
   - User preferences

2. **File System Access API** - Saves to local folder:
   - `current.xml` - Current XML input
   - `current.xslt` - Current XSLT stylesheet
   - `version_{id}_{version}.xml` - Version snapshots
   - `version_{id}_{version}.xslt` - Version stylesheets
   - `versions.json` - Metadata file
   - `project.csv` - Project export
   - `launch.bat` - Windows launch script

### Creating a Project Folder

1. Click the **Folder icon** in the header
2. Select or create a folder on your computer
3. Grant permission when prompted
4. The app will auto-save files to this folder

### Project Folder Structure

```
MyXSLTProject/
├── current.xml          # Active XML document
├── current.xslt         # Active XSLT stylesheet
├── versions.json        # Version control metadata
├── project.csv          # Export data (all versions)
├── launch.bat           # Windows launcher
├── launch.sh            # Mac/Linux launcher
├── versions/            # Version history
│   ├── v1.0.0.xml
│   ├── v1.0.0.xslt
│   ├── v1.1.0.xml
│   └── v1.1.0.xslt
└── logs/                # Activity logs
    └── activity-{date}.log
```

### CSV Export Format

The app can export project data as CSV:

```csv
Version,Description,Created,XSLT_Version,Released,XML_Lines,XSLT_Lines
1.0.0,Initial version,2024-01-15T10:30:00Z,1.0,No,45,89
1.1.0,Added grouping,2024-01-20T14:22:00Z,2.0,Yes,45,112
```

### Batch File Launchers

**Windows (launch.bat):**
```batch
@echo off
echo Starting XML/XSLT Transformer...
echo.
echo Opening project: %~dp0
echo.

REM Open the hosted version with project folder path
start "" "https://YOUR_APP_URL.netlify.app/?folder=%~dp0"

echo.
echo Project folder: %~dp0
echo Browser should open automatically.
echo.
pause
```

**Mac/Linux (launch.sh):**
```bash
#!/bin/bash
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Starting XML/XSLT Transformer..."
echo "Project folder: $PROJECT_DIR"

# Open the hosted version
open "https://YOUR_APP_URL.netlify.app/?folder=$PROJECT_DIR"
```

### Using Batch Files

1. Save your project to a local folder
2. Create `launch.bat` (Windows) or `launch.sh` (Mac/Linux) in that folder
3. Double-click the file to open the app with that project loaded
4. All changes auto-save to that folder

---

## 🔧 Deployment Instructions

### Step-by-Step: GitHub Pages (Most Popular)

#### 1. Prepare Repository

```bash
# Create .gitignore if not exists
echo "node_modules
dist
.env
.DS_Store" > .gitignore

# Initialize git
git init
git add .
git commit -m "Initial commit: XML/XSLT Transformer"
```

#### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Name: `xslt-transformer` (or your choice)
3. Description: "Free XML to XSLT transformation tool"
4. Public repository (required for free GitHub Pages)
5. Don't initialize with README (you already have files)
6. Click "Create repository"

#### 3. Push Code

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/xslt-transformer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 4. Configure GitHub Pages

1. Go to repository Settings → Pages
2. Source: Select "Deploy from a branch"
3. Branch: Select "gh-pages" (will be created by deployment)
4. Click Save

#### 5. Deploy

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json
# (Already included in the template)

# Build and deploy
npm run deploy
```

#### 6. Wait 2-3 Minutes

Your app will be live at:
```
https://YOUR_USERNAME.github.io/xslt-transformer/
```

#### 7. Custom Domain (Optional)

1. Buy domain from Namecheap, GoDaddy, etc.
2. Add CNAME record pointing to `YOUR_USERNAME.github.io`
3. In GitHub repo: Settings → Pages → Custom domain
4. Enter your domain and save
5. Wait for DNS propagation (can take 24 hours)

---

### Step-by-Step: Netlify (Easiest)

#### Method 1: Drag & Drop (No Git Required)

```bash
# Build the app
npm run build

# The 'dist' folder is created
```

1. Go to https://app.netlify.com/drop
2. Drag the `dist` folder onto the page
3. Done! Your site is live instantly

#### Method 2: Git Integration (Automated)

1. Push code to GitHub (see above)
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"
7. Done! Auto-deploys on every git push

---

### Step-by-Step: Vercel (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

Your app is live at `https://YOUR_APP_NAME.vercel.app/`

---

## 🌐 Sharing Your App

### Option 1: Direct URL

Just share the hosting URL:
```
https://YOUR_USERNAME.github.io/xslt-transformer/
https://YOUR_APP_NAME.netlify.app/
https://YOUR_APP_NAME.vercel.app/
```

### Option 2: Local Project Launcher

Create a launcher file users can download:

**Windows Launcher (xslt-transformer.bat):**
```batch
@echo off
title XSLT Transformer
echo ================================================
echo   XML/XSLT Transformer - Free & Local
echo ================================================
echo.
echo Starting application...
start "" "https://YOUR_APP_URL.netlify.app/"
echo.
echo Application opened in browser.
echo All data is stored locally on your PC.
echo.
pause
```

**Mac/Linux Launcher (xslt-transformer.command):**
```bash
#!/bin/bash
echo "================================================"
echo "  XML/XSLT Transformer - Free & Local"
echo "================================================"
echo ""
echo "Starting application..."
open "https://YOUR_APP_URL.netlify.app/"
echo ""
echo "Application opened in browser."
echo "All data is stored locally on your Mac."
```

Users can download and run these files to open your app.

---

## 🔒 Privacy & Security

### Data Storage

✅ **100% Local** - All data stored in browser's IndexedDB  
✅ **No Tracking** - No analytics or third-party scripts  
✅ **No Accounts** - No user authentication required  
✅ **No Server** - No backend API calls  
✅ **Offline Ready** - Works without internet connection  

### File System Access

The app uses the **File System Access API** to save files locally:

- Only works in Chromium browsers (Chrome, Edge, Opera, Brave)
- User must explicitly grant permission for each folder
- Permissions can be revoked anytime in browser settings
- Files are saved directly to user's chosen folder
- No files are uploaded to any server

### Browser Permissions

Required permissions:
- **Storage** - For IndexedDB (automatic)
- **File System** - For local folder access (requires user approval)

---

## ⚠️ Known Limitations

### 1. File System Access API (Folder Saving)

**Only works in:**
- ✅ Google Chrome 86+
- ✅ Microsoft Edge 86+
- ✅ Opera 72+
- ✅ Brave Browser

**Does NOT work in:**
- ❌ Firefox (API not implemented)
- ❌ Safari (API not implemented)
- ❌ Mobile browsers

**Workaround:** Users in unsupported browsers can still:
- Use the app fully (transformation works)
- Data persists in IndexedDB
- Use manual export/import features
- Copy/paste code between sessions

### 2. XSLT 2.0 & 3.0 Support

- Requires Saxon-JS library (~1.5MB download)
- First transformation is slower (loading library)
- Subsequent transformations are fast

### 3. Large Files

- Browser memory limits apply (~1-2GB)
- Very large XML files (>50MB) may cause slowdowns
- Consider splitting large documents

---

## 🐛 Troubleshooting

### Issue: "Cross-Origin" Errors

**Problem:** CORS errors when loading files locally

**Solution:** Don't open `index.html` directly. Use a local server:

```bash
# Option 1: Use Vite dev server
npm run dev

# Option 2: Use Python
python -m http.server 8000

# Option 3: Use Node.js http-server
npx http-server dist -p 8000
```

### Issue: Build Fails

**Problem:** `npm run build` shows errors

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Issue: App Doesn't Work After Deployment

**Problem:** Blank page or errors in production

**Solution:**

1. Check `vite.config.ts` has correct base path:
   ```typescript
   export default defineConfig({
     base: './', // For GitHub Pages, use '/repo-name/'
   })
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Redeploy:
   ```bash
   npm run deploy
   ```

### Issue: Folder Saving Doesn't Work

**Problem:** "File System API not supported"

**Cause:** Using Firefox or Safari

**Solution:** Use Chrome, Edge, or Brave. Or use manual export/import.

### Issue: Version History Lost

**Problem:** Versions disappear after browser cache clear

**Solution:** Always use a project folder to auto-save files. IndexedDB can be cleared by browser, but files in a folder persist.

---

## 📊 Usage Statistics (Privacy-First)

If you want to know how many people use your app (optional):

### Simple Counter with Goatcounter (Free & Private)

1. Sign up at https://www.goatcounter.com (free)
2. Add to `index.html` before `</body>`:

```html
<script data-goatcounter="https://YOUR_CODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

**Features:**
- ✅ 100% privacy-focused
- ✅ No cookies
- ✅ GDPR compliant
- ✅ Free forever (100k pageviews/month)

---

## 🚀 Optimization Tips

### 1. Reduce Bundle Size

```bash
# Analyze bundle
npm install -g vite-bundle-visualizer
npx vite-bundle-visualizer
```

### 2. Enable Compression

Most free hosts (Netlify, Vercel) do this automatically.

For GitHub Pages, add to `.github/workflows/deploy.yml`:

```yaml
- name: Compress files
  run: |
    find dist -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) -exec gzip -k {} \;
```

### 3. Preload Critical Assets

In `index.html`:

```html
<link rel="preload" href="/src/main.tsx" as="script">
<link rel="preload" href="/src/index.css" as="style">
```

### 4. Enable PWA (Progressive Web App)

Install Vite PWA plugin:

```bash
npm install vite-plugin-pwa -D
```

Configure in `vite.config.ts`:

```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'XML/XSLT Transformer',
        short_name: 'XSLT Transform',
        description: 'Free XML to XSLT transformation tool',
        theme_color: '#6366f1',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

---

## 💬 Support

Having issues deploying? Common solutions:

1. **Build fails:** Clear `node_modules`, reinstall dependencies
2. **Blank page:** Check base path in `vite.config.ts`
3. **CORS errors:** Use a proper web server, not `file://` protocol
4. **Out of memory:** Reduce bundle size, enable compression

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows working app locally
- [ ] All assets load correctly (check browser console)
- [ ] Transformation works (test all XSLT versions)
- [ ] Version saving/loading works
- [ ] Activity log displays correctly
- [ ] Mobile responsive layout works
- [ ] Theme switching works
- [ ] Keyboard shortcuts work
- [ ] File imports work
- [ ] Folder selection works (Chrome/Edge only)

---

**Your app is now ready to deploy for free! Choose your favorite hosting option and share with the world! 🎉**

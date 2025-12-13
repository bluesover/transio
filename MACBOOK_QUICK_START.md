# 🍎 MacBook Quick Start - Transio Deployment

**For MacBook users with VS Code** - Complete guide from zero to deployed.

---

## ✅ What You Need

- ✅ MacBook (you have this)
- ✅ VS Code (you have this)
- ✅ Your repository folder (you have this)
- ⚠️ Node.js (check below)
- ⚠️ GitHub account
- ⚠️ CloudFlare account (free)

---

## 🔍 Step 1: Verify Node.js is Installed

Open VS Code terminal (`` Ctrl+` `` or View → Terminal):

```bash
node --version
```

**If you see a version (like v18.0.0 or higher):** ✅ You're good!

**If you see "command not found":** Install Node.js:
1. Go to https://nodejs.org
2. Download the **LTS version** (left button)
3. Install it
4. Restart VS Code
5. Try `node --version` again

---

## 🚀 Step 2: Open Your Project in VS Code

1. Open VS Code
2. File → Open Folder
3. Navigate to your `transio` folder
4. Click "Open"

Your folder should contain:
- `src/` folder
- `package.json` file
- `index.html` file
- Many `.md` documentation files

---

## 📦 Step 3: Install Dependencies

In VS Code terminal (`` Ctrl+` ``):

```bash
# Navigate to your project folder (if not already there)
cd ~/path/to/transio

# Install all dependencies
npm install
```

**This takes 2-3 minutes.** You'll see lots of text scrolling.

**Success looks like:**
```
added 1234 packages in 2m
```

**If you see errors:**
```bash
# Try this cleanup first
rm -rf node_modules package-lock.json
npm install
```

---

## 🧪 Step 4: Test Locally

Still in terminal:

```bash
npm run dev
```

**You should see:**
```
VITE v7.2.6  ready in 500 ms

➜  Local:   http://localhost:5173/
```

**Now:**
1. Hold `Cmd` and click the URL (or go to http://localhost:5173)
2. Browser opens with your app
3. Try clicking **Transform** button
4. Should work!

**To stop the server:** Press `Ctrl+C` in terminal

---

## 🔨 Step 5: Build for Production

```bash
npm run build
```

**Success looks like:**
```
✓ built in 2s
dist/index.html   1.2 kB
dist/assets/...   1500 kB
✓ build complete
```

**You should now have a `dist` folder** in your project.

**If you see "tsc: command not found" error:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🧪 Step 6: Test Production Build

```bash
npm run preview
```

**Opens at:** http://localhost:4173

Test everything works, then `Ctrl+C` to stop.

---

## 📝 Step 7: Update package.json

Open `package.json` in VS Code.

Find line 10:
```json
"url": "https://github.com/YOUR_GITHUB_USERNAME/transio.git"
```

**Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.**

Example:
```json
"url": "https://github.com/johnsmith/transio.git"
```

Also update line 13 (bugs URL) the same way.

Save the file (`Cmd+S`).

---

## 📤 Step 8: Push to GitHub

### If repository already exists on GitHub:

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

### If repository doesn't exist yet:

1. **Go to github.com**
2. **Click** the `+` icon → New repository
3. **Name:** transio
4. **Visibility:** Public (for open source)
5. **Click** "Create repository"
6. **Copy the commands** GitHub shows you

Then in terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/transio.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

**Refresh GitHub page** - you should see your files!

---

## ☁️ Step 9: Deploy to CloudFlare Pages

### Create CloudFlare Account (if needed):
1. Go to https://pages.cloudflare.com
2. Sign up (free)
3. Verify email

### Deploy:
1. **Go to** https://dash.cloudflare.com/pages
2. **Click** "Create a project"
3. **Click** "Connect to Git"
4. **Authorize** CloudFlare to access GitHub
5. **Select** your `transio` repository
6. **Click** "Begin setup"

### Build Settings:
```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

7. **Click** "Save and Deploy"

**Wait 2-3 minutes** - your site is building!

**Success:** You'll see a URL like `https://transio-abc.pages.dev`

**Click it** - your app is live! 🎉

---

## 🌐 Step 10: Add Custom Domain (transio.org)

In CloudFlare Pages:

1. **Go to** your project → Custom domains
2. **Click** "Set up a custom domain"
3. **Enter:** transio.org
4. **Click** "Continue"

**CloudFlare will show DNS instructions.**

### If GoDaddy is your registrar:

1. **Go to** godaddy.com → My Products → DNS
2. **Find** transio.org → DNS settings
3. **Add** the records CloudFlare tells you

**Typical setup:**
- Type: `CNAME`
- Name: `@`
- Value: `transio-abc.pages.dev` (your CloudFlare URL)
- TTL: 1 hour

4. **Click** Save
5. **Wait** 10-30 minutes for DNS to update

**Then:** https://transio.org will work! ✅

---

## 🔄 Step 11: Update Your App (Future Changes)

Whenever you make changes:

```bash
# 1. Test locally
npm run dev

# 2. Build
npm run build

# 3. Commit and push
git add .
git commit -m "Description of changes"
git push

# 4. CloudFlare auto-deploys in 2 minutes!
```

---

## ✅ Verification Checklist

After deployment:

- [ ] `npm install` worked
- [ ] `npm run dev` opened app at localhost:5173
- [ ] `npm run build` created `dist` folder
- [ ] `npm run preview` showed working app
- [ ] `git push` sent code to GitHub
- [ ] CloudFlare Pages connected to GitHub
- [ ] Build succeeded on CloudFlare
- [ ] Site loads at your-project.pages.dev
- [ ] (Optional) transio.org points to site

---

## 🆘 Troubleshooting

### Error: "tsc: command not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Cannot find module '@github/spark'"
```bash
npm install
```

### Error: "npm: command not found"
**You need to install Node.js** (includes npm):
1. Go to https://nodejs.org
2. Download LTS version
3. Install
4. Restart VS Code
5. Try again

### Error: "git: command not found"
**You need to install Git**:
```bash
# Install using Homebrew (recommended)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git
```

### Build succeeds but page is blank
**Check browser console** (F12 or Cmd+Option+I):
- Look for errors
- Often a path issue

**Fix:** Make sure `vite.config.ts` has correct base:
```typescript
export default defineConfig({
  base: '/',
  // ...
})
```

### CloudFlare build fails
**See the build log** for specific error.

**Common fix:**
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Fix: Update package-lock for deployment"
git push
```

CloudFlare will auto-retry and should work.

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check Git status
git status

# Commit and push changes
git add .
git commit -m "Your message"
git push

# Clean install (if errors)
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 More Help

- **Build errors:** See `FIX_BUILD_ERROR.md`
- **CloudFlare setup:** See `CLOUDFLARE_DEPLOY_GUIDE.md`
- **DNS setup:** See `DNS_SETUP_GUIDE.md`
- **General deployment:** See `DEPLOY_NOW.md`

---

## 🎉 You're Done!

Your app is now:
- ✅ Running locally
- ✅ Built for production
- ✅ Deployed to CloudFlare
- ✅ Accessible at transio.org
- ✅ Free forever
- ✅ Open source

**Total time:** 30-60 minutes  
**Total cost:** $0 (domain already purchased)

**Congrats! 🚀**

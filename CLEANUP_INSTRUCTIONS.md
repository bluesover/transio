# 🧹 Project Cleanup Instructions

## Quick Start

Run the automated cleanup script to remove all unnecessary files:

```bash
chmod +x cleanup-project.sh
./cleanup-project.sh
```

This will automatically:
- ✅ Remove all unnecessary documentation files (90+ files)
- ✅ Remove desktop app folders (`electron/`, `desktop-resources/`)
- ✅ Remove unused scripts and workflows
- ✅ Fix package-lock.json synchronization
- ✅ Clean temporary files (.DS_Store, Thumbs.db, etc.)
- ✅ Remove GitHub Actions that consume budget
- ✅ Keep only essential files for web deployment

## What Gets Removed

### Documentation Files (30+)
- BUILD_TROUBLESHOOTING.md
- DEPLOYMENT_SEO.md
- SEARCH_ENGINE_SUBMISSION.md
- SEO_CHECKLIST.md
- SEO_GUIDE.md
- SUBMIT_NOW.md
- And 25+ more...

### Desktop App Files
- `electron/` directory (desktop app code)
- `desktop-resources/` directory (app icons & installers)
- `tsconfig.electron.json`

### Unused Scripts
- fix-dependencies.sh/bat
- sync-repos.sh
- prepare-release.sh/bat
- And more...

### GitHub Actions (Budget Savers)
- sync-repos.yml
- sync-to-public.yml
- release-desktop.yml
- dependabot.yml

### Metadata & Artifacts
- .spark-initial-sha
- .spark-workbench-id
- spark.meta.json
- .file-manifest
- pids/ directory
- packages/ directory

## What Gets Kept

✅ **Essential Files:**
- README.md (Complete documentation)
- PRD.md (Product requirements)
- CONTRIBUTING.md (How to contribute)
- LICENSE (MIT License)
- SECURITY.md (Security policy)
- PRODUCTION_READY_REPORT.md (Production status)

✅ **Source Code:**
- src/ (Web app)
- server/ (Saxon-HE API server)
- public/ (Static assets)

✅ **Configuration:**
- package.json
- vite.config.ts
- tsconfig.json
- tailwind.config.js

✅ **Deployment:**
- .github/workflows/deploy-cloudflare.yml (Auto-deploy)

## After Cleanup

### 1. Review Changes
```bash
git status
```

### 2. Commit Cleanup
```bash
git add .
git commit -m "chore: remove unnecessary files for Cloudflare deployment"
```

### 3. Push to Repository
```bash
git push origin main
```

### 4. Verify Cloudflare Deployment
- Go to: https://dash.cloudflare.com/pages
- Should auto-deploy on push
- Check: https://transio.org

## Budget Savings

After cleanup:
- ❌ Dependabot disabled (was consuming GitHub Actions minutes)
- ❌ Desktop build workflows removed (save $$$)
- ❌ Repository sync workflows removed (redundant)
- ✅ Only Cloudflare auto-deploy remains (free tier)

## Project Structure After Cleanup

```
transio/
├── .github/
│   └── workflows/
│       └── deploy-cloudflare.yml    # Only essential workflow
├── public/                          # Static assets
├── server/                          # Saxon-HE API (optional)
├── src/                            # Web app source
├── README.md                        # Complete docs
├── PRD.md                          # Product requirements
├── CONTRIBUTING.md                  # Contribution guide
├── LICENSE                         # MIT License
├── SECURITY.md                     # Security policy
├── package.json                    # Dependencies
└── Other config files...
```

## Troubleshooting

### If cleanup script fails:
```bash
# Make sure you're in the project root
cd /path/to/transio

# Make script executable
chmod +x cleanup-project.sh

# Run with bash explicitly
bash cleanup-project.sh
```

### If package-lock.json errors persist:
```bash
# Manual fix
rm -rf node_modules package-lock.json
npm install
```

### If server dependencies need fixing:
```bash
cd server
rm -rf node_modules package-lock.json
npm install
cd ..
```

## Success Indicators

After running cleanup, you should see:
- ✅ ~70-90 files removed
- ✅ ~500MB+ disk space freed
- ✅ Clean `git status` (only tracked changes)
- ✅ Successful `npm run build`
- ✅ Clean Cloudflare deployment

## Next Steps After Cleanup

1. **Test Build Locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Monitor Cloudflare:**
   - Auto-deployment should trigger
   - Check logs at Cloudflare dashboard
   - Verify https://transio.org works

4. **SEO Submission** (Optional):
   - Google Search Console: Submit sitemap
   - Bing Webmaster: Submit sitemap
   - Details in README.md

---

**Ready to clean?** Run: `./cleanup-project.sh`

# 🗑️ Files to Remove - Netlify & Vercel Cleanup

## ⚡ Quick Delete Commands

Copy and paste these commands to remove all Netlify and Vercel deployment files:

```bash
# Navigate to project root
cd /workspaces/spark-template

# Remove Netlify deployment config
rm -f netlify.toml

# Remove Vercel deployment config
rm -f vercel.json

# Remove generic headers file
rm -f _headers

# Remove deployment tracking file
rm -f .deploymentrc

# Remove unnecessary documentation files
rm -f CLEANUP_COMPLETE.md
rm -f PROJECT_STRUCTURE.md
rm -f cleanup-master.sh
rm -f cleanup-deployments.sh
rm -f CLEANUP_INSTRUCTIONS.md
rm -f REMOVE_FILES.md

echo "✅ Cleanup complete! Only Cloudflare Pages deployment remains."
```

## 📋 Files Being Removed

### Netlify & Vercel Deployment Files
- ❌ `netlify.toml` - Netlify deployment configuration
- ❌ `vercel.json` - Vercel deployment configuration
- ❌ `_headers` - Generic HTTP headers file (we use wrangler.toml)

### Deployment Tracking
- ❌ `.deploymentrc` - Deployment status tracking file

### Unnecessary Documentation
- ❌ `CLEANUP_COMPLETE.md` - Old cleanup status
- ❌ `PROJECT_STRUCTURE.md` - Redundant structure doc
- ❌ `cleanup-master.sh` - Old cleanup script
- ❌ `cleanup-deployments.sh` - Deployment cleanup script
- ❌ `CLEANUP_INSTRUCTIONS.md` - Old cleanup instructions
- ❌ `REMOVE_FILES.md` - This file (delete after running commands)

## ✅ Essential Files Being Kept

### Cloudflare Deployment
- ✅ `wrangler.toml` - Cloudflare Pages deployment config

### Documentation
- ✅ `PRD.md` - Product Requirements Document
- ✅ `README.md` - User documentation & getting started
- ✅ `DEPLOYMENT.md` - Cloudflare Pages deployment guide
- ✅ `LICENSE` - MIT License

### Source Code
- ✅ `src/` - All application source code
- ✅ `server/` - Optional Saxon-HE server code

### Configuration
- ✅ `package.json` - Dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `vite.config.ts` - Build config
- ✅ `tailwind.config.js` - Tailwind config
- ✅ `index.html` - HTML entry point
- ✅ `components.json` - shadcn config

## 🎯 After Cleanup

### Your deployment options:
**Only Cloudflare Pages** ✅

### To deploy:
```bash
npm run build
npx wrangler pages deploy dist --project-name=transio
```

### To verify cleanup worked:
```bash
# These commands should return "No such file"
ls netlify.toml
ls vercel.json
ls _headers
ls .deploymentrc
```

### To commit changes:
```bash
git add .
git commit -m "Remove Netlify and Vercel deployment files - use Cloudflare Pages only"
git push
```

## 📚 Updated Documentation

I've already updated these files to remove Netlify/Vercel references:

1. **README.md** - Removed GitHub Pages and Netlify deployment instructions
2. **DEPLOYMENT.md** - Kept only Cloudflare Pages instructions
3. **DeployInfoDialog.tsx** - Updated to show only Cloudflare deployment

## 🚀 Ready to Deploy

After running the cleanup commands above, your project will be:
- ✅ Clean and organized
- ✅ Ready for Cloudflare Pages deployment
- ✅ Free from Netlify/Vercel configurations
- ✅ Optimized for transio.org custom domain

**Next step:** Follow DEPLOYMENT.md to deploy to Cloudflare Pages!

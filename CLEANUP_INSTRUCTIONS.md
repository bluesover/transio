# 🧹 Cleanup Instructions - Remove Netlify & Vercel Files

## Files to Delete

Run these commands to remove all Netlify and Vercel deployment files:

```bash
# Remove Netlify deployment config
rm netlify.toml

# Remove Vercel deployment config
rm vercel.json

# Remove generic headers file (Cloudflare uses wrangler.toml)
rm _headers

# Remove deployment tracking file
rm .deploymentrc

# Remove unnecessary documentation
rm CLEANUP_COMPLETE.md
rm PROJECT_STRUCTURE.md
rm cleanup-master.sh

# Remove this cleanup script itself after running
rm cleanup-deployments.sh
rm CLEANUP_INSTRUCTIONS.md
```

## Or Use the Automated Script

```bash
chmod +x cleanup-deployments.sh
./cleanup-deployments.sh
```

## What Will Be Kept

✅ **Essential Files:**
- `wrangler.toml` - Cloudflare Pages deployment config
- `PRD.md` - Product requirements document
- `README.md` - User documentation
- `DEPLOYMENT.md` - Cloudflare deployment guide
- `LICENSE` - Open source license
- All source code in `src/`
- All server code in `server/`
- Build configuration files

## After Cleanup

Your project will ONLY support Cloudflare Pages deployment.

**To deploy:**
```bash
npm run build
npx wrangler pages deploy dist --project-name=transio
```

## Verification

After cleanup, these files should NOT exist:
- ❌ netlify.toml
- ❌ vercel.json
- ❌ _headers
- ❌ .deploymentrc
- ❌ CLEANUP_COMPLETE.md
- ❌ PROJECT_STRUCTURE.md
- ❌ cleanup-master.sh

And these should exist:
- ✅ wrangler.toml
- ✅ PRD.md
- ✅ README.md
- ✅ DEPLOYMENT.md
- ✅ LICENSE
- ✅ src/
- ✅ server/

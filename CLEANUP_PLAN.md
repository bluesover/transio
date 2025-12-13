# Project Cleanup Plan

## Files to Remove

### Unnecessary Documentation (78 files)
All the duplicate/outdated deployment and setup guides will be removed via `cleanup-docs.sh`

### Unnecessary Config Files
- `theme.json` - Empty file, not used
- `netlify.toml` - Not deploying to Netlify (using Cloudflare)
- `vercel.json` - Not deploying to Vercel (using Cloudflare)
- `.deploymentrc` - Not needed

### Unnecessary Batch/Shell Files (Duplicates)
- `test-server-setup.bat` - Replaced by main installers
- `test-server-setup.sh` - Replaced by main installers
- `start-server-dev.bat` - Not needed (use npm commands)
- `start-server-dev.sh` - Not needed (use npm commands)
- `stop-server.bat` - Replaced by server-manager.sh
- `stop-server.sh` - Replaced by server-manager.sh

## Files to Keep

### Essential Documentation (8 files)
- ✅ README.md - Main project documentation
- ✅ PRD.md - Product requirements
- ✅ LICENSE - MIT license
- ✅ LICENSE_SUMMARY.md - Open source compliance
- ✅ DEPLOYMENT_GUIDE.md - Production deployment
- ✅ SERVER_INSTALL_GUIDE.md - Server setup
- ✅ SERVER_TROUBLESHOOTING_GUIDE.md - Server help
- ✅ XSLT_SUPPORT_GUIDE.md - XSLT documentation
- ✅ BROWSER_VS_SERVER.md - Architecture info
- ✅ SAXON_SERVER_ARCHITECTURE.md - Technical details

### Essential Config Files
- ✅ package.json - Dependencies
- ✅ tsconfig.json - TypeScript config
- ✅ vite.config.ts - Build config
- ✅ tailwind.config.js - Styling config
- ✅ components.json - shadcn config
- ✅ wrangler.toml - Cloudflare Pages config
- ✅ index.html - Entry point
- ✅ _headers - Security headers

### Essential Scripts
- ✅ launch-windows.bat - User launcher
- ✅ launch-mac-linux.sh - User launcher
- ✅ start-server.bat - Server start (Windows)
- ✅ start-server.sh - Server start (Mac/Linux)
- ✅ server-manager.sh - Server management
- ✅ cleanup-docs.sh - Documentation cleanup

### Essential Code
- ✅ src/ - All application code
- ✅ server/ - Saxon-HE server
- ✅ node_modules/ - Dependencies
- ✅ packages/ - Spark tools

## Cleanup Commands

```bash
# 1. Remove unnecessary documentation
chmod +x cleanup-docs.sh
./cleanup-docs.sh

# 2. Remove unnecessary config files
rm -f theme.json netlify.toml vercel.json .deploymentrc

# 3. Remove duplicate/outdated scripts
rm -f test-server-setup.bat test-server-setup.sh
rm -f start-server-dev.bat start-server-dev.sh
rm -f stop-server.bat stop-server.sh

# 4. Clean up PIDs directory (if exists)
rm -rf pids
```

## Result
- **Before**: 100+ files in root
- **After**: ~30 essential files
- **Savings**: ~70 unnecessary files removed

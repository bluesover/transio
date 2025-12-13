# Documentation Structure - Essential Files Only

## Keep These Files

### Core Documentation
- **README.md** - Main project documentation (UPDATED)
- **LICENSE** - MIT License
- **PRD.md** - Product Requirements Document

### Deployment & Setup
- **DEPLOYMENT_GUIDE.md** - Production deployment instructions
- **SERVER_INSTALL_GUIDE.md** - Optional Saxon-HE server setup
- **SERVER_TROUBLESHOOTING_GUIDE.md** - Server issue resolution

### Technical Guides
- **XSLT_SUPPORT_GUIDE.md** - XSLT version support details
- **BROWSER_VS_SERVER.md** - Architecture comparison
- **LICENSE_SUMMARY.md** - Open source compliance
- **SAXON_SERVER_ARCHITECTURE.md** - Server technical details

### Configuration Files
- **package.json** - Dependencies
- **tsconfig.json** - TypeScript config
- **vite.config.ts** - Vite config
- **tailwind.config.js** - Tailwind config
- **wrangler.toml** - Cloudflare config
- **netlify.toml** - Netlify config
- **vercel.json** - Vercel config
- **components.json** - shadcn config

## Remove These Files (Duplicates/Outdated)

These files contain duplicate or outdated information now consolidated in the main docs:

- ARCHITECTURE.md (info in SAXON_SERVER_ARCHITECTURE.md)
- CLOUDFLARE_*.md (all 5 files - info in DEPLOYMENT_GUIDE.md)
- CURRENT_STATUS.md
- CUSTOM_DOMAIN_QUICK_REFERENCE.md
- DEPLOYMENT_*.md (except DEPLOYMENT_GUIDE.md) - 10+ duplicate files
- DEPLOY_*.md (8 files)
- DNS_*.md (4 files)
- DOCUMENTATION_SUMMARY.md
- DOGECOIN_INTEGRATION_IDEAS.md (not implemented)
- EXAMPLE_PROJECT_STRUCTURE.md
- FIXES_APPLIED.md
- FIX_BUILD_ERROR.md
- GETTING_STARTED.md (info in README.md)
- GITHUB_ACTIONS_SETUP.md (info in DEPLOYMENT_GUIDE.md)
- INSTALLER_*.md (3 files - info in SERVER_INSTALL_GUIDE.md)
- INSTALL_SERVER_VISUAL.md
- LEGAL_SAFETY_GUIDE.md (info in LICENSE_SUMMARY.md)
- LICENSE_AUDIT.md (info in LICENSE_SUMMARY.md)
- LOCAL_SETUP_GUIDE.md (info in README.md)
- MACBOOK_*.md (3 files - info in DEPLOYMENT_GUIDE.md)
- OPEN_SOURCE_INFO.md (info in LICENSE_SUMMARY.md)
- QUICK_*.md (7 files)
- README_DEPLOYMENT.md
- SAXON_SERVER_DECISION.md (info in BROWSER_VS_SERVER.md)
- SAXON_SERVER_SETUP.md (info in SERVER_INSTALL_GUIDE.md)
- SAXON_SERVER_SUMMARY.md
- SECRETS_SETUP_GUIDE.md
- SECURITY.md (minimal content)
- SERVER_*.md (except keep list above) - 11 files
- SIMPLE_DEPLOY_GUIDE.md
- START_HERE*.md (4 files)
- STATUS.md
- TESTING_INSTALLER.md
- WHATS_NEW_SERVER_INSTALLER.md
- XSLT_STATUS.md
- YOUR_REPO_STATUS.md

## Total Cleanup
- **Keep:** 12 essential documentation files
- **Remove:** ~60 duplicate/outdated markdown files

#!/bin/bash

echo "════════════════════════════════════════════════════"
echo "  🧹 TRANSIO PROJECT CLEANUP                        "
echo "════════════════════════════════════════════════════"
echo ""
echo "This will remove ALL unnecessary documentation files"
echo "and keep only essential project files."
echo ""
echo "Files to be KEPT:"
echo "  ✓ PRD.md"
echo "  ✓ README.md"
echo "  ✓ DEPLOYMENT.md"
echo "  ✓ LICENSE"
echo "  ✓ /src (application code)"
echo "  ✓ /server (Saxon-HE server)"
echo "  ✓ Configuration files (package.json, vite.config.ts, etc.)"
echo ""
echo "Files to be REMOVED:"
echo "  ✗ 80+ duplicate/unnecessary .md files"
echo "  ✗ Old cleanup scripts"
echo "  ✗ Duplicate server launcher scripts"
echo "  ✗ Unnecessary test scripts"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled."
    exit 0
fi

echo ""
echo "🗑️  Removing unnecessary markdown files..."

# Remove all unnecessary markdown files
rm -f ARCHITECTURE.md
rm -f BROWSER_VS_SERVER.md
rm -f CLEANUP_NOW.md
rm -f CLEANUP_PLAN.md
rm -f CLOUDFLARE_API_TOKEN_GUIDE.md
rm -f CLOUDFLARE_DEPLOY_GUIDE.md
rm -f CLOUDFLARE_SECRETS_VISUAL.md
rm -f CLOUDFLARE_SETUP_COMPLETE.md
rm -f COMPLETE_DEPLOYMENT_CHECKLIST.md
rm -f CURRENT_STATUS.md
rm -f CUSTOM_DOMAIN_QUICK_REFERENCE.md
rm -f DEPLOYMENT_AUTOMATION.md
rm -f DEPLOYMENT_COMPLETE_GUIDE.md
rm -f DEPLOYMENT_GUIDE.md
rm -f DEPLOYMENT_INFO.md
rm -f DEPLOYMENT_README.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOYMENT_STATUS_FINAL.md
rm -f DEPLOYMENT_STATUS_UPDATED.md
rm -f DEPLOYMENT_VERIFICATION.md
rm -f DEPLOY_ANSWER.md
rm -f DEPLOY_CHEATSHEET.md
rm -f DEPLOY_CHECKLIST.md
rm -f DEPLOY_NOW.md
rm -f DEPLOY_QUICK_START.md
rm -f DEPLOY_TO_CLOUDFLARE_NOW.md
rm -f DNS_ARCHITECTURE.md
rm -f DNS_SETUP_GUIDE.md
rm -f DNS_SETUP_VISUAL.md
rm -f DNS_VISUAL_GUIDE.md
rm -f DOCS_TO_KEEP.md
rm -f DOCUMENTATION_SUMMARY.md
rm -f DOGECOIN_INTEGRATION_IDEAS.md
rm -f EXAMPLE_PROJECT_STRUCTURE.md
rm -f FINAL_CLEANUP_INSTRUCTIONS.md
rm -f FINAL_CLEANUP_SUMMARY.md
rm -f FIXES_APPLIED.md
rm -f FIX_BUILD_ERROR.md
rm -f GETTING_STARTED.md
rm -f GITHUB_ACTIONS_SETUP.md
rm -f INSTALLER_FLOW_DIAGRAM.md
rm -f INSTALLER_SUMMARY.md
rm -f INSTALL_SERVER_VISUAL.md
rm -f LEGAL_SAFETY_GUIDE.md
rm -f LICENSE_AUDIT.md
rm -f LICENSE_SUMMARY.md
rm -f LOCAL_SETUP_GUIDE.md
rm -f MACBOOK_DEPLOYMENT_STEPS.md
rm -f MACBOOK_DEPLOY_GUIDE.md
rm -f MACBOOK_QUICK_START.md
rm -f OPEN_SOURCE_INFO.md
rm -f QUICK_COMMANDS.md
rm -f QUICK_DEPLOY_REFERENCE.md
rm -f QUICK_SERVER_FIX.md
rm -f QUICK_SERVER_TEST.md
rm -f QUICK_START.md
rm -f README_DEPLOYMENT.md
rm -f RUN_CLEANUP.md
rm -f SAXON_SERVER_ARCHITECTURE.md
rm -f SAXON_SERVER_DECISION.md
rm -f SAXON_SERVER_SETUP.md
rm -f SAXON_SERVER_SUMMARY.md
rm -f SECRETS_SETUP_GUIDE.md
rm -f SECURITY.md
rm -f SERVER_CONNECTION_VISUAL.md
rm -f SERVER_DOCUMENTATION_INDEX.md
rm -f SERVER_INSTALL_1_PAGE.md
rm -f SERVER_INSTALL_CHECKLIST.md
rm -f SERVER_INSTALL_GUIDE.md
rm -f SERVER_LOCAL_TEST_GUIDE.md
rm -f SERVER_MANAGEMENT.md
rm -f SERVER_QUICK_START.md
rm -f SERVER_SETUP_QUICK_GUIDE.md
rm -f SERVER_TEST_STATUS.md
rm -f SERVER_TROUBLESHOOTING.md
rm -f SERVER_TROUBLESHOOTING_GUIDE.md
rm -f SIMPLE_DEPLOY_GUIDE.md
rm -f START_HERE.md
rm -f START_HERE_DEPLOYMENT.md
rm -f START_HERE_NOW.md
rm -f START_HERE_SERVER.md
rm -f STATUS.md
rm -f TESTING_INSTALLER.md
rm -f WHATS_NEW_SERVER_INSTALLER.md
rm -f XSLT_STATUS.md
rm -f XSLT_SUPPORT_GUIDE.md
rm -f YOUR_REPO_STATUS.md

echo "✓ Removed 80+ unnecessary markdown files"

echo ""
echo "🗑️  Removing old cleanup scripts..."

# Remove old cleanup scripts
rm -f cleanup-all.sh
rm -f cleanup-docs.sh
rm -f cleanup-unnecessary-files.sh
rm -f cleanup-final.sh

echo "✓ Removed old cleanup scripts"

echo ""
echo "🗑️  Removing unnecessary server test scripts..."

# Remove unnecessary server test scripts
rm -f test-server-setup.bat
rm -f test-server-setup.sh

echo "✓ Removed test scripts"

echo ""
echo "🗑️  Removing duplicate server launcher scripts..."

# Remove dev server scripts (use the ones in /server instead)
rm -f start-server-dev.bat
rm -f start-server-dev.sh
rm -f stop-server.bat
rm -f stop-server.sh
rm -f start-server.bat
rm -f start-server.sh

echo "✓ Removed duplicate server scripts"

echo ""
echo "🗑️  Removing unnecessary launcher files..."

# Remove server manager (use server scripts directly)
rm -f server-manager.sh

# Remove Mac/Linux launcher (project-specific, not needed in root)
rm -f launch-mac-linux.sh
rm -f launch-windows.bat

echo "✓ Removed launcher files"

echo ""
echo "🗑️  Removing empty directories..."

# Remove pids directory if empty
if [ -d "pids" ]; then
  rmdir pids 2>/dev/null && echo "✓ Removed empty pids directory"
fi

echo ""
echo "🗑️  Cleaning up server directory..."

# Clean server directory
if [ -f "server/cleanup-server-docs.sh" ]; then
  cd server
  chmod +x cleanup-server-docs.sh
  ./cleanup-server-docs.sh
  rm cleanup-server-docs.sh
  cd ..
else
  # Manual cleanup if script doesn't exist
  rm -f server/DEV_MODE_GUIDE.md
  rm -f server/DEV_VS_PROD.md
  rm -f server/INSTALLATION_README.md
  rm -f server/QUICK_START.md
  echo "✓ Cleaned server documentation"
fi

echo ""
echo "════════════════════════════════════════════════════"
echo "  ✅ CLEANUP COMPLETE!                              "
echo "════════════════════════════════════════════════════"
echo ""
echo "📄 Essential files kept:"
echo ""
echo "Documentation:"
echo "  ✓ PRD.md - Product Requirements Document"
echo "  ✓ README.md - User documentation & getting started"
echo "  ✓ DEPLOYMENT.md - Deployment guide for Cloudflare Pages"
echo "  ✓ LICENSE - MIT License"
echo ""
echo "Application:"
echo "  ✓ /src - Application source code"
echo "  ✓ /server - Optional Saxon-HE server"
echo ""
echo "Configuration:"
echo "  ✓ package.json, tsconfig.json"
echo "  ✓ vite.config.ts, tailwind.config.js"
echo "  ✓ index.html, components.json"
echo "  ✓ wrangler.toml (Cloudflare)"
echo "  ✓ netlify.toml (Netlify)"
echo "  ✓ vercel.json (Vercel)"
echo ""
echo "🎉 Your project is now clean and ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. git add ."
echo "  2. git commit -m 'Clean up project structure'"
echo "  3. git push"
echo "  4. Deploy to Cloudflare Pages (see DEPLOYMENT.md)"
echo ""

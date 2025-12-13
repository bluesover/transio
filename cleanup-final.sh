#!/bin/bash

echo "🧹 Cleaning up unnecessary documentation files..."

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

# Remove old cleanup scripts
rm -f cleanup-all.sh
rm -f cleanup-docs.sh
rm -f cleanup-unnecessary-files.sh

# Remove unnecessary server test scripts
rm -f test-server-setup.bat
rm -f test-server-setup.sh

# Remove dev server scripts (use the ones in /server instead)
rm -f start-server-dev.bat
rm -f start-server-dev.sh
rm -f stop-server.bat
rm -f stop-server.sh

# Remove server manager (use server scripts directly)
rm -f server-manager.sh

# Remove Windows launcher (use server scripts directly)
rm -f start-server.bat
rm -f start-server.sh

# Remove Mac/Linux launcher (project-specific, not needed in root)
rm -f launch-mac-linux.sh
rm -f launch-windows.bat

# Remove pids directory if empty
if [ -d "pids" ]; then
  rmdir pids 2>/dev/null && echo "  Removed empty pids directory"
fi

echo "✅ Cleanup complete!"
echo ""
echo "📄 Kept essential files:"
echo "  ✓ PRD.md - Product Requirements Document"
echo "  ✓ README.md - User documentation"
echo "  ✓ DEPLOYMENT.md - Deployment guide"
echo "  ✓ LICENSE - MPL-2.0 License"
echo ""
echo "📦 Project structure:"
echo "  ✓ /src - Application source code"
echo "  ✓ /server - Optional Saxon-HE server"
echo "  ✓ package.json, tsconfig.json, vite.config.ts"
echo "  ✓ index.html, tailwind.config.js, components.json"

#!/bin/bash

echo "Cleaning up unnecessary markdown files..."

# Remove duplicate/unnecessary deployment guides
rm -f CLOUDFLARE_API_TOKEN_GUIDE.md
rm -f CLOUDFLARE_DEPLOY_GUIDE.md
rm -f CLOUDFLARE_SECRETS_VISUAL.md
rm -f CLOUDFLARE_SETUP_COMPLETE.md
rm -f COMPLETE_DEPLOYMENT_CHECKLIST.md
rm -f CUSTOM_DOMAIN_QUICK_REFERENCE.md
rm -f DEPLOYMENT_AUTOMATION.md
rm -f DEPLOYMENT_COMPLETE_GUIDE.md
rm -f DEPLOYMENT_INFO.md
rm -f DEPLOYMENT_README.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOYMENT_STATUS_UPDATED.md
rm -f DEPLOYMENT_VERIFICATION.md
rm -f DEPLOY_ANSWER.md
rm -f DEPLOY_CHEATSHEET.md
rm -f DEPLOY_CHECKLIST.md
rm -f DEPLOY_NOW.md
rm -f DEPLOY_QUICK_START.md
rm -f DEPLOY_TO_CLOUDFLARE_NOW.md
rm -f README_DEPLOYMENT.md
rm -f START_HERE.md
rm -f START_HERE_DEPLOYMENT.md
rm -f QUICK_DEPLOY_REFERENCE.md
rm -f MACBOOK_DEPLOYMENT_STEPS.md
rm -f MACBOOK_DEPLOY_GUIDE.md
rm -f MACBOOK_QUICK_START.md
rm -f GITHUB_ACTIONS_SETUP.md

# Remove duplicate/unnecessary DNS guides
rm -f DNS_ARCHITECTURE.md
rm -f DNS_SETUP_GUIDE.md
rm -f DNS_SETUP_VISUAL.md
rm -f DNS_VISUAL_GUIDE.md

# Remove duplicate/unnecessary server guides
rm -f INSTALLER_FLOW_DIAGRAM.md
rm -f INSTALLER_SUMMARY.md
rm -f INSTALL_SERVER_VISUAL.md
rm -f QUICK_SERVER_TEST.md
rm -f SAXON_SERVER_DECISION.md
rm -f SAXON_SERVER_SETUP.md
rm -f SAXON_SERVER_SUMMARY.md
rm -f SERVER_CONNECTION_VISUAL.md
rm -f SERVER_DOCUMENTATION_INDEX.md
rm -f SERVER_INSTALL_1_PAGE.md
rm -f SERVER_INSTALL_CHECKLIST.md
rm -f SERVER_LOCAL_TEST_GUIDE.md
rm -f SERVER_QUICK_START.md
rm -f SERVER_SETUP_QUICK_GUIDE.md
rm -f SERVER_TEST_STATUS.md
rm -f WHATS_NEW_SERVER_INSTALLER.md
rm -f QUICK_COMMANDS.md

# Remove unnecessary status/info files
rm -f YOUR_REPO_STATUS.md
rm -f XSLT_STATUS.md
rm -f FIX_BUILD_ERROR.md
rm -f EXAMPLE_PROJECT_STRUCTURE.md
rm -f GETTING_STARTED.md
rm -f DOGECOIN_INTEGRATION_IDEAS.md
rm -f LICENSE_AUDIT.md
rm -f LICENSE_SUMMARY.md
rm -f LEGAL_SAFETY_GUIDE.md
rm -f SECRETS_SETUP_GUIDE.md
rm -f LOCAL_SETUP_GUIDE.md

echo "✅ Cleanup complete!"
echo ""
echo "Kept essential files:"
echo "  - README.md (main documentation)"
echo "  - PRD.md (product requirements)"
echo "  - DEPLOYMENT_GUIDE.md (comprehensive deployment)"
echo "  - SIMPLE_DEPLOY_GUIDE.md (beginner deployment)"
echo "  - START_HERE_SERVER.md (server entry point)"
echo "  - SERVER_INSTALL_GUIDE.md (server installation)"
echo "  - SERVER_TROUBLESHOOTING.md (server help)"
echo "  - BROWSER_VS_SERVER.md (decision guide)"
echo "  - SAXON_SERVER_ARCHITECTURE.md (technical details)"
echo "  - ARCHITECTURE.md (app architecture)"
echo "  - XSLT_SUPPORT_GUIDE.md (XSLT details)"
echo "  - OPEN_SOURCE_INFO.md (licensing)"
echo "  - SECURITY.md (security policy)"
echo "  - LICENSE (required)"

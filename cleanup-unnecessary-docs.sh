#!/bin/bash

echo "🧹 Cleaning up unnecessary documentation files..."

# Remove redundant deployment documentation
rm -f CLOUDFLARE_DEPLOYMENT.md
rm -f CLOUDFLARE_FIX.md
rm -f CONFIGURE_SECRETS.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOY_TO_CLOUDFLARE.md
rm -f GITHUB_SECRETS_SETUP.md
rm -f QUICK_START_DEPLOYMENT.md

# Remove old cleanup script
rm -f cleanup-final.sh

echo "✅ Cleanup complete!"
echo ""
echo "📄 Remaining documentation:"
echo "  - README.md (User guide)"
echo "  - PRD.md (Product requirements)"
echo "  - DEPLOYMENT.md (Deployment guide)"
echo "  - LICENSE (MPL-2.0 license)"

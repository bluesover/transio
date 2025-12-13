#!/bin/bash

echo "🧹 Cleaning up unnecessary files..."

# Remove all unnecessary documentation files
rm -f CLOUDFLARE_COMPLETE_GUIDE.md
rm -f CLOUDFLARE_SETUP.md
rm -f DEPLOYMENT.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOY_COMMANDS.md
rm -f START_HERE.md
rm -f cleanup-docs.sh
rm -f cleanup-unnecessary-files.sh
rm -f setup-remotes.sh

echo "✅ Cleanup complete!"
echo ""
echo "📁 Remaining important files:"
echo "  - README.md (User documentation)"
echo "  - PRD.md (Product requirements)"
echo "  - LICENSE (MIT License)"
echo "  - wrangler.toml (Cloudflare config)"
echo "  - sync-repos.sh (Repository sync)"
echo ""
echo "🚀 Ready for deployment!"

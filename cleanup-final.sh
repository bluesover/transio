#!/bin/bash

echo "🧹 Cleaning up unnecessary documentation files..."

# Remove duplicate/obsolete deployment documentation
rm -f CLOUDFLARE_COMPLETE_GUIDE.md
rm -f CLOUDFLARE_SETUP.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOY_COMMANDS.md
rm -f START_HERE.md
rm -f DEPLOYMENT.md
rm -f DEPLOY_NOW.md
rm -f CLOUDFLARE_FIX.md

# Remove old cleanup scripts
rm -f cleanup-docs.sh
rm -f cleanup-unnecessary-files.sh
rm -f cleanup-all.sh
rm -f setup-remotes.sh

echo "✅ Cleanup complete!"
echo ""
echo "📁 Essential files remaining:"
echo "  ✓ README.md - User documentation and quick start"
echo "  ✓ PRD.md - Product requirements and technical specs"
echo "  ✓ CLOUDFLARE_DEPLOYMENT.md - Complete Cloudflare deployment guide"
echo "  ✓ LICENSE - MIT License"
echo "  ✓ wrangler.toml - Cloudflare configuration"
echo "  ✓ sync-repos.sh - Repository sync utility (if using dual repos)"
echo ""
echo "🚀 Ready for deployment to Cloudflare Pages!"
echo ""
echo "Next steps:"
echo "1. Review: cat CLOUDFLARE_DEPLOYMENT.md"
echo "2. Build: npm run build"
echo "3. Test: ls dist/ (should see index.html and assets/)"
echo "4. Deploy: npm run deploy"

#!/bin/bash

echo "🧹 Removing unnecessary documentation files..."

# Remove duplicate/obsolete documentation files
rm -f CLOUDFLARE_COMPLETE_GUIDE.md
rm -f CLOUDFLARE_SETUP.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOY_COMMANDS.md
rm -f START_HERE.md

# Remove old cleanup scripts
rm -f cleanup-docs.sh
rm -f cleanup-unnecessary-files.sh
rm -f cleanup-all.sh
rm -f setup-remotes.sh

echo "✅ Cleanup complete!"
echo ""
echo "📁 Essential files remaining:"
echo "  ✓ README.md - User documentation"
echo "  ✓ PRD.md - Product requirements"
echo "  ✓ DEPLOYMENT.md - Cloudflare deployment guide"
echo "  ✓ LICENSE - MIT License"
echo "  ✓ wrangler.toml - Cloudflare configuration"
echo "  ✓ sync-repos.sh - Repository sync utility"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Run: npm run build"
echo "2. Test: ls dist/ (should see index.html and assets/)"
echo "3. Deploy: npx wrangler pages deploy dist --project-name=transio"

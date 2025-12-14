#!/bin/bash

echo "🧹 Cleaning up unnecessary files for public repository sync..."
echo ""

# Remove all the extra markdown documentation files
echo "📄 Removing duplicate markdown files..."
rm -f CLOUDFLARE_DEPLOYMENT.md
rm -f CLOUDFLARE_FIX.md
rm -f CLOUDFLARE_SETUP.md
rm -f CONFIGURE_SECRETS.md
rm -f CURRENT_STATUS.md
rm -f CUSTOM_DOMAIN_SETUP.md
rm -f DEPLOYMENT_STATUS.md
rm -f DEPLOY_CHECKLIST.md
rm -f DEPLOY_QUICK_START.md
rm -f DEPLOY_TO_CLOUDFLARE.md
rm -f DEPLOY_TO_GODADDY.md
rm -f DESKTOP_APP_IMPLEMENTATION.md
rm -f DESKTOP_APP_ROADMAP.md
rm -f DESKTOP_BUILD_GUIDE.md
rm -f DESKTOP_README.md
rm -f DNS_FLOW_DIAGRAM.md
rm -f DOMAIN_SETUP_QUICK.md
rm -f GITHUB_SECRETS_SETUP.md
rm -f GODADDY_DEPLOYMENT.md
rm -f ICON_GENERATION_GUIDE.md
rm -f ICON_QUICK_START.md
rm -f QUICK_START_DEPLOYMENT.md
rm -f START_HERE.md

# Remove old cleanup scripts
echo "🗑️  Removing old scripts..."
rm -f cleanup-final.sh
rm -f cleanup-unnecessary-docs.sh
rm -f sync-repos.sh

# Remove Spark-specific files (these shouldn't be in public repo)
echo "🔧 Removing Spark-specific files..."
rm -f .spark-initial-sha
rm -f .spark-workbench-id
rm -f spark.meta.json
rm -f runtime.config.json
rm -f .file-manifest

# Remove this cleanup script itself
echo "🧹 Removing this cleanup script..."
rm -f cleanup-docs.sh

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📄 Essential documentation files remaining:"
ls -1 *.md 2>/dev/null | sed 's/^/   ✓ /' || echo "   (none)"
echo ""
echo "📁 Ready to sync to public repository!"
echo ""
echo "Next steps:"
echo "   1. Review changes: git status"
echo "   2. Add files: git add ."
echo "   3. Commit: git commit -m 'Clean up for public release'"
echo "   4. Push to public: git push public main"
echo ""

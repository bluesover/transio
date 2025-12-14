#!/bin/bash

echo "🧹 Running final cleanup for transio.org repository sync..."

# Remove all unnecessary markdown documentation files
echo "📝 Removing redundant documentation files..."
rm -f CLOUDFLARE_DEPLOYMENT.md
rm -f CLOUDFLARE_FIX.md
rm -f CLOUDFLARE_SETUP.md
rm -f CONFIGURE_SECRETS.md
rm -f CURRENT_STATUS.md
rm -f CUSTOM_DOMAIN_SETUP.md
rm -f DEPLOYMENT.md
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
rm -f PROJECT_STATUS.md
rm -f QUICK_START_DEPLOYMENT.md
rm -f REPOSITORY_SYNC_GUIDE.md
rm -f START_HERE.md
rm -f SYNC_TO_PUBLIC.md

# Remove old cleanup scripts
echo "🗑️  Removing old cleanup scripts..."
rm -f cleanup-docs.sh
rm -f cleanup-final.sh
rm -f cleanup-unnecessary-docs.sh

# Remove desktop build configs (keep only essential electron files)
echo "🖥️  Cleaning desktop build artifacts..."
rm -f tsconfig.electron.json
rm -f electron-builder.json

# Remove icon generation scripts (not needed in production)
echo "🎨 Removing icon generation scripts..."
rm -f generate-icons.bat
rm -f generate-icons.js
rm -f generate-icons.sh

# Remove desktop installers (users can build from source)
echo "💾 Removing desktop installer scripts..."
rm -f install-desktop.bat
rm -f install-desktop.sh

# Remove sync script (will be replaced with GitHub Actions)
echo "🔄 Removing manual sync script..."
rm -f sync-repos.sh

# Remove Cloudflare wrangler config (Pages doesn't need it)
echo "☁️  Removing wrangler.toml..."
rm -f wrangler.toml

# Remove spark-specific files
echo "✨ Removing Spark-specific files..."
rm -f .spark-initial-sha
rm -f .spark-workbench-id
rm -f spark.meta.json
rm -f runtime.config.json

# Remove empty directories if they exist
echo "📁 Cleaning empty directories..."
if [ -d "pids" ] && [ -z "$(ls -A pids)" ]; then
  rmdir pids
fi

if [ -d "packages" ] && [ -z "$(ls -A packages)" ]; then
  rmdir packages
fi

echo "✅ Cleanup complete!"
echo ""
echo "📋 Remaining essential files:"
echo "  - README.md (user documentation)"
echo "  - PRD.md (product requirements)"
echo "  - LICENSE (open source license)"
echo "  - CONTRIBUTING.md (contributor guide)"
echo "  - SECURITY.md (security policy)"
echo "  - src/ (application source code)"
echo "  - server/ (Saxon-HE server)"
echo "  - electron/ (desktop app)"
echo "  - desktop-resources/ (app icons)"
echo ""
echo "🚀 Ready to sync with https://github.com/bluesover/transio.org"

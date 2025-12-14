#!/bin/bash

echo "🧹 Transio Project Cleanup Script"
echo "=================================="
echo ""
echo "This script will:"
echo "  ✓ Remove ALL unnecessary documentation files"
echo "  ✓ Remove redundant GitHub workflows and configs"
echo "  ✓ Remove unused scripts and shell files"
echo "  ✓ Remove empty or unnecessary directories"
echo "  ✓ Fix package-lock.json synchronization"
echo "  ✓ Keep ONLY essential project files"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Starting cleanup..."
echo ""

# Comprehensive list of files to remove
FILES_TO_REMOVE=(
    # Deployment and build guides (info in README)
    "BUILD_DESKTOP_APP.md"
    "CLOUDFLARE_DEPLOYMENT_FIX.md"
    "CLOUDFLARE_PAGES_SETUP.md"
    "DEPLOY.md"
    "DEPLOYMENT_CHECKLIST.md"
    "DESKTOP_APP_RELEASE.md"
    "DESKTOP_APP_ROADMAP.md"
    "FIX_DOWNLOAD_404.md"
    "FIXES_APPLIED.md"
    "GITHUB_ACTIONS_OPTIMIZATION.md"
    "MACOS_BUILD_GUIDE.md"
    "MIGRATION_GUIDE.md"
    "PUBLIC_REPO_READY.md"
    "PUBLISH_AND_RELEASE_GUIDE.md"
    "QUICK_REFERENCE.md"
    "REPOSITORY_UPDATE_SUMMARY.md"
    "SECURITY_AUDIT_REPORT.md"
    "SETUP_PUBLIC_SYNC.md"
    "TEST_DESKTOP_BUILD.md"
    "CLEANUP_GUIDE.md"
    
    # Unused scripts
    "prepare-public-sync.sh"
    "final-cleanup.sh"
    "build-release.sh"
    "sync-repos.sh"
    
    # Cloudflare config (not needed for Pages)
    "wrangler.toml"
    
    # GitHub workflows to remove (budget-consuming)
    ".github/workflows/sync-repos.yml"
    ".github/workflows/sync-to-public.yml"
    ".github/dependabot.yml"
    ".github/README.md"
    
    # PID files (runtime artifacts)
    "pids/server.pid"
    
    # Package directories that shouldn't be in repo
    "packages/spark-tools/.gitkeep"
)

DIRECTORIES_TO_REMOVE=(
    "pids"
    "packages/spark-tools"
    "packages"
)

REMOVED_COUNT=0
SKIPPED_COUNT=0

echo "🗑️  Removing unnecessary files..."
echo ""

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "✓ Removed: $file"
        ((REMOVED_COUNT++))
    else
        echo "⊘ Not found: $file"
        ((SKIPPED_COUNT++))
    fi
done

echo ""
echo "🗑️  Removing unnecessary directories..."
echo ""

for dir in "${DIRECTORIES_TO_REMOVE[@]}"; do
    if [ -d "$dir" ]; then
        rm -rf "$dir"
        echo "✓ Removed directory: $dir"
        ((REMOVED_COUNT++))
    else
        echo "⊘ Directory not found: $dir"
    fi
done

echo ""
echo "📊 Cleanup Summary:"
echo "   Items removed: $REMOVED_COUNT"
echo "   Items already removed: $SKIPPED_COUNT"
echo ""

if [ $REMOVED_COUNT -gt 0 ]; then
    echo "✨ File cleanup complete!"
else
    echo "✨ No files to remove - already clean!"
fi

echo ""
echo "📝 Essential files kept:"
echo "   ✓ README.md (Complete project documentation)"
echo "   ✓ PRD.md (Product requirements document)"
echo "   ✓ CONTRIBUTING.md (Contribution guidelines)"
echo "   ✓ LICENSE (MPL-2.0 License)"
echo "   ✓ SECURITY.md (Security policy)"
echo ""

echo "🔧 Fixing package-lock.json..."
echo ""

# Remove old package-lock.json if it exists
if [ -f "package-lock.json" ]; then
    echo "Removing old package-lock.json..."
    rm package-lock.json
fi

# Regenerate package-lock.json
echo "Running npm install to regenerate package-lock.json..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Package dependencies updated successfully!"
else
    echo ""
    echo "❌ npm install failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "🎉 Cleanup Complete!"
echo ""
echo "📋 Active GitHub Actions:"
echo "   ✓ deploy-cloudflare.yml (Auto-deploy to Cloudflare Pages)"
echo "   ✓ release-desktop.yml (Build desktop apps on version tag)"
echo ""
echo "💰 Budget Savings:"
echo "   ✗ Dependabot disabled (was consuming Actions minutes)"
echo "   ✗ Sync workflows removed (redundant automation)"
echo ""
echo "🔄 Next Steps:"
echo ""
echo "1. Review changes:"
echo "   git status"
echo ""
echo "2. Commit cleanup:"
echo "   git add ."
echo "   git commit -m 'chore: comprehensive project cleanup'"
echo ""
echo "3. Push to repository:"
echo "   git push origin main"
echo ""
echo "4. Verify Cloudflare deployment:"
echo "   https://dash.cloudflare.com/pages"
echo "   (Should auto-deploy on push)"
echo ""
echo "💡 Run this script anytime to clean up the project!"
echo ""

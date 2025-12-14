#!/bin/bash

echo "🧹 Transio Project Cleanup Script"
echo "=================================="
echo ""
echo "This script will:"
echo "  ✓ Remove unnecessary documentation files"
echo "  ✓ Remove redundant GitHub workflows"
echo "  ✓ Disable Dependabot (saves GitHub Actions budget)"
echo "  ✓ Fix package-lock.json synchronization"
echo "  ✓ Update all dependencies"
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

FILES_TO_REMOVE=(
    "BUILD_DESKTOP_APP.md"
    "CLOUDFLARE_DEPLOYMENT_FIX.md"
    "CLOUDFLARE_PAGES_SETUP.md"
    "DEPLOY.md"
    "DEPLOYMENT_CHECKLIST.md"
    "DESKTOP_APP_RELEASE.md"
    "FIX_DOWNLOAD_404.md"
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
    "prepare-public-sync.sh"
    "final-cleanup.sh"
    "build-release.sh"
    "wrangler.toml"
    ".github/workflows/sync-repos.yml"
    ".github/workflows/sync-to-public.yml"
    ".github/dependabot.yml"
)

REMOVED_COUNT=0
SKIPPED_COUNT=0

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "✓ Removed: $file"
        ((REMOVED_COUNT++))
    else
        echo "⊘ Not found (already removed): $file"
        ((SKIPPED_COUNT++))
    fi
done

echo ""
echo "📊 Cleanup Summary:"
echo "   Files removed: $REMOVED_COUNT"
echo "   Files already removed: $SKIPPED_COUNT"
echo ""

if [ $REMOVED_COUNT -gt 0 ]; then
    echo "✨ File cleanup complete!"
else
    echo "✨ No files to remove - already clean!"
fi

echo ""
echo "📝 Kept essential files:"
echo "   ✓ README.md (Project documentation)"
echo "   ✓ CLEANUP_GUIDE.md (This guide)"
echo "   ✓ CONTRIBUTING.md (Contribution guidelines)"
echo "   ✓ LICENSE (MIT License)"
echo "   ✓ SECURITY.md (Security policy)"
echo "   ✓ PRD.md (Product requirements)"
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
echo "📋 GitHub Actions Status:"
echo "   ✓ deploy-cloudflare.yml (Active - auto-deploys on push)"
echo "   ✓ release-desktop.yml (Active - builds desktop apps on tag)"
echo "   ✗ sync-repos.yml (Removed - was consuming budget)"
echo "   ✗ sync-to-public.yml (Removed - was consuming budget)"
echo "   ✗ dependabot.yml (Removed - was consuming budget)"
echo ""
echo "🔄 Next Steps:"
echo ""
echo "1. Review changes:"
echo "   git status"
echo ""
echo "2. Commit changes:"
echo "   git add ."
echo "   git commit -m 'Clean up project and fix dependencies'"
echo ""
echo "3. Push to repository:"
echo "   git push origin main"
echo ""
echo "4. Verify Cloudflare deployment:"
echo "   - Should succeed now with fixed package-lock.json"
echo "   - Check: https://dash.cloudflare.com/pages"
echo ""
echo "💡 Tip: This script is safe to run multiple times!"
echo ""

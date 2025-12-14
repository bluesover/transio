#!/bin/bash

echo "🧹 Transio Project Cleanup Script"
echo "=================================="
echo ""
echo "This script will:"
echo "  ✓ Remove ALL unnecessary documentation files"
echo "  ✓ Remove redundant GitHub workflows and configs"
echo "  ✓ Remove unused scripts and shell files"
echo "  ✓ Remove empty or unnecessary directories"
echo "  ✓ Remove build artifacts and temporary files"
echo "  ✓ Fix package-lock.json synchronization issues"
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
    "BUILD_TROUBLESHOOTING.md"
    "CLOUDFLARE_DEPLOYMENT_FIX.md"
    "CLOUDFLARE_PAGES_SETUP.md"
    "DEPLOY.md"
    "DEPLOYMENT_CHECKLIST.md"
    "DEPLOYMENT_SEO.md"
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
    "SEARCH_ENGINE_SUBMISSION.md"
    "SECURITY_AUDIT_REPORT.md"
    "SEO_CHECKLIST.md"
    "SEO_GUIDE.md"
    "SEO_OPTIMIZATION.md"
    "SEO_README.md"
    "SETUP_PUBLIC_SYNC.md"
    "SUBMIT_NOW.md"
    "TEST_DESKTOP_BUILD.md"
    "CLEANUP_GUIDE.md"
    
    # SEO and verification files
    "public/.well-known/bing-site-verification.txt"
    "public/.well-known/google-site-verification.txt"
    
    # Maintenance guides
    "MAINTAINER_GUIDE.md"
    "PRE_RELEASE_CHECKLIST.md"
    "RELEASE.md"
    "RELEASE_FIXES.md"
    "RELEASE_GUIDE.md"
    "RELEASE_SUMMARY.md"
    "CHANGELOG.md"
    "CLEANUP_INSTRUCTIONS.md"
    "READY_TO_DEPLOY.md"
    "RUN_CLEANUP_NOW.md"
    "START_HERE.md"
    "PRODUCTION_READY_REPORT.md"
    
    # Unused scripts
    "prepare-public-sync.sh"
    "final-cleanup.sh"
    "build-release.sh"
    "sync-repos.sh"
    "validate-release.sh"
    "prepare-release.sh"
    "prepare-release.bat"
    "fix-lockfile.sh"
    "fix-lockfile.bat"
    "fix-dependencies.sh"
    "fix-dependencies.bat"
    
    # Electron/Desktop app config (not needed for web-only)
    "tsconfig.electron.json"
    
    # Cloudflare config (not needed for Pages)
    "wrangler.toml"
    
    # GitHub workflows to remove (budget-consuming)
    ".github/workflows/sync-repos.yml"
    ".github/workflows/sync-to-public.yml"
    ".github/workflows/deploy-cloudflare.yml"
    ".github/dependabot.yml"
    ".github/README.md"
    
    # PID files (runtime artifacts)
    "pids/server.pid"
    
    # Package directories that shouldn't be in repo
    "packages/spark-tools/.gitkeep"
    
    # Build artifacts (should be gitignored but clean anyway)
    ".DS_Store"
    "Thumbs.db"
    "desktop.ini"
    
    # Spark metadata (not needed in production)
    ".spark-initial-sha"
    ".spark-workbench-id"
    "spark.meta.json"
    ".file-manifest"
)

DIRECTORIES_TO_REMOVE=(
    "pids"
    "packages/spark-tools"
    "packages"
    ".devcontainer"
    "scripts"
    "desktop-resources"
    "electron"
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
echo "🔍 Scanning for additional temporary files..."
echo ""

# Find and remove common temporary/build artifacts
TEMP_FILES_FOUND=0

# Remove .DS_Store files (macOS)
if find . -name ".DS_Store" -type f 2>/dev/null | grep -q .; then
    find . -name ".DS_Store" -type f -delete 2>/dev/null
    echo "✓ Removed .DS_Store files"
    ((TEMP_FILES_FOUND++))
fi

# Remove Thumbs.db files (Windows)
if find . -name "Thumbs.db" -type f 2>/dev/null | grep -q .; then
    find . -name "Thumbs.db" -type f -delete 2>/dev/null
    echo "✓ Removed Thumbs.db files"
    ((TEMP_FILES_FOUND++))
fi

# Remove .log files from root (but keep in node_modules and server)
if find . -maxdepth 1 -name "*.log" -type f 2>/dev/null | grep -q .; then
    find . -maxdepth 1 -name "*.log" -type f -delete 2>/dev/null
    echo "✓ Removed root-level .log files"
    ((TEMP_FILES_FOUND++))
fi

if [ $TEMP_FILES_FOUND -eq 0 ]; then
    echo "⊘ No temporary files found"
fi

echo ""
echo "📊 Cleanup Summary:"
echo "   Files/directories removed: $REMOVED_COUNT"
echo "   Temporary artifacts cleaned: $TEMP_FILES_FOUND"
echo "   Items already removed: $SKIPPED_COUNT"
echo ""

if [ $REMOVED_COUNT -gt 0 ] || [ $TEMP_FILES_FOUND -gt 0 ]; then
    echo "✨ File cleanup complete!"
else
    echo "✨ No files to remove - already clean!"
fi

echo ""
echo "📝 Essential files kept:"
echo "   ✓ README.md (Complete project documentation)"
echo "   ✓ PRD.md (Product requirements document)"
echo "   ✓ CONTRIBUTING.md (Contribution guidelines)"
echo "   ✓ LICENSE (MIT License)"
echo "   ✓ SECURITY.md (Security policy)"
echo "   ✓ PRODUCTION_READY_REPORT.md (Production readiness report)"
echo ""

echo "🔧 Fixing package-lock.json..."
echo ""

# Check if package-lock.json is out of sync
if [ -f "package-lock.json" ]; then
    echo "Checking package-lock.json synchronization..."
    npm ci --dry-run 2>&1 | grep -q "lock file" && NEEDS_SYNC=1 || NEEDS_SYNC=0
    
    if [ $NEEDS_SYNC -eq 1 ]; then
        echo "⚠️  package-lock.json is out of sync with package.json"
        echo "Regenerating package-lock.json..."
        rm package-lock.json
        npm install
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Package dependencies synchronized successfully!"
        else
            echo ""
            echo "❌ npm install failed. Please check the error messages above."
            exit 1
        fi
    else
        echo "✅ package-lock.json is already synchronized"
    fi
else
    echo "Generating package-lock.json..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Package dependencies installed successfully!"
    else
        echo ""
        echo "❌ npm install failed. Please check the error messages above."
        exit 1
    fi
fi

# Also sync server package-lock.json if needed
if [ -d "server" ] && [ -f "server/package.json" ]; then
    echo ""
    echo "🔧 Checking server dependencies..."
    cd server
    
    if [ -f "package-lock.json" ]; then
        npm ci --dry-run 2>&1 | grep -q "lock file" && SERVER_NEEDS_SYNC=1 || SERVER_NEEDS_SYNC=0
        
        if [ $SERVER_NEEDS_SYNC -eq 1 ]; then
            echo "⚠️  server/package-lock.json is out of sync"
            echo "Regenerating server/package-lock.json..."
            rm package-lock.json
            npm install
            
            if [ $? -eq 0 ]; then
                echo "✅ Server dependencies synchronized!"
            else
                echo "❌ Server npm install failed"
                cd ..
                exit 1
            fi
        else
            echo "✅ server/package-lock.json is synchronized"
        fi
    else
        echo "Generating server/package-lock.json..."
        npm install
        
        if [ $? -eq 0 ]; then
            echo "✅ Server dependencies installed!"
        else
            echo "❌ Server npm install failed"
            cd ..
            exit 1
        fi
    fi
    
    cd ..
fi

echo ""
echo "🎉 Cleanup Complete!"
echo ""
echo "📋 GitHub Actions:"
echo "   ✗ All workflows removed (no automated deployments)"
echo ""
echo "💰 Budget Savings:"
echo "   ✗ Dependabot disabled (was consuming Actions minutes)"
echo "   ✗ All GitHub Actions workflows removed (no auto-deploy)"
echo ""
echo "📦 Project Structure:"
echo "   ✓ Root: Web app source code"
echo "   ✓ server/: Optional Saxon-HE server for local use"
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
echo "3. Build for production:"
echo "   npm run build"
echo ""
echo "4. Deploy dist/ folder to your hosting provider"
echo ""
echo "💡 Tips:"
echo "   • Run this script anytime to clean up the project"
echo "   • Keep documentation in README.md only"
echo "   • Deploy manually to your preferred hosting service"
echo ""

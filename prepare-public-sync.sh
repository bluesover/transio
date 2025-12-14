#!/bin/bash

echo "🚀 Preparing Transio for Public Repository Sync"
echo "================================================"
echo ""

# Run cleanup
echo "Step 1: Running cleanup script..."
chmod +x final-cleanup.sh
./final-cleanup.sh

echo ""
echo "Step 2: Checking Git status..."
git status --short

echo ""
echo "Step 3: Essential files check..."
echo ""
echo "✅ Core Application:"
ls -1 src/*.tsx src/*.css 2>/dev/null | head -5
echo "   ... and more in src/"
echo ""
echo "✅ Documentation:"
ls -1 *.md 2>/dev/null | grep -E "(README|PRD|CONTRIBUTING|SECURITY|LICENSE)" || echo "   (checking...)"
echo ""
echo "✅ Configuration:"
ls -1 package.json vite.config.ts tsconfig.json tailwind.config.js 2>/dev/null
echo ""
echo "✅ Server:"
[ -d "server" ] && echo "   server/ directory exists" || echo "   ⚠️  server/ not found"
echo ""
echo "✅ Desktop App:"
[ -d "electron" ] && echo "   electron/ directory exists" || echo "   ⚠️  electron/ not found"
echo ""
echo "✅ GitHub Actions:"
[ -f ".github/workflows/sync-to-public.yml" ] && echo "   Sync workflow configured" || echo "   ⚠️  Workflow not found"

echo ""
echo "================================================"
echo "✨ Next Steps:"
echo ""
echo "1. Review the changes above"
echo "2. Commit the cleanup:"
echo "   git add -A"
echo "   git commit -m '🧹 Prepare for public repository sync'"
echo ""
echo "3. Set up GitHub Secret:"
echo "   - Go to: Repository Settings → Secrets → Actions"
echo "   - Add: PUBLIC_REPO_TOKEN"
echo "   - Value: Your GitHub Personal Access Token"
echo ""
echo "4. Push to trigger auto-sync:"
echo "   git push origin main"
echo ""
echo "5. Monitor sync progress:"
echo "   - Check: Repository → Actions → Sync to Public Repository"
echo ""
echo "📖 See SETUP_PUBLIC_SYNC.md for detailed instructions"
echo "================================================"

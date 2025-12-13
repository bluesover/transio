#!/bin/bash

echo "🧹 Removing unnecessary documentation files..."

# Remove unnecessary sync/git guides
rm -f GIT_REMOTE_GUIDE.md
rm -f QUICK_SYNC.md
rm -f SYNC_GUIDE.md
rm -f SYNC_TEST_RESULTS.md
rm -f TEST_SYNC.md

# Remove GitHub workflow documentation
rm -f .github/DEPLOYMENT_QUICKSTART.md
rm -f .github/WORKFLOWS_REFERENCE.md

# Remove unnecessary workflow files (keep only Cloudflare and sync)
rm -f .github/workflows/deploy-github-pages.yml
rm -f .github/workflows/deploy-netlify.yml
rm -f .github/workflows/deploy-vercel.yml
rm -f .github/workflows/preview-deploy.yml
rm -f .github/workflows/release.yml
rm -f .github/workflows/ci.yml

echo "✅ Cleanup complete!"
echo ""
echo "📄 Remaining documentation:"
ls -1 *.md 2>/dev/null | while read file; do
  echo "  ✓ $file"
done
echo ""
echo "⚙️ Remaining workflows:"
ls -1 .github/workflows/*.yml 2>/dev/null | while read file; do
  echo "  ✓ $(basename $file)"
done

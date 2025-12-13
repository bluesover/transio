#!/bin/bash

echo "🧹 Cleaning up unnecessary files for Transio..."

# Remove unnecessary GitHub workflow files (keep only Cloudflare)
rm -f .github/workflows/deploy-github-pages.yml
rm -f .github/workflows/deploy-netlify.yml
rm -f .github/workflows/deploy-vercel.yml
rm -f .github/workflows/preview-deploy.yml
rm -f .github/workflows/release.yml
rm -f .github/workflows/ci.yml

# Remove unnecessary documentation files
rm -f GIT_REMOTE_GUIDE.md
rm -f QUICK_SYNC.md
rm -f SYNC_GUIDE.md
rm -f SYNC_TEST_RESULTS.md
rm -f TEST_SYNC.md
rm -f .github/DEPLOYMENT_QUICKSTART.md
rm -f .github/WORKFLOWS_REFERENCE.md

# Keep only essential files:
# - README.md (user guide)
# - DEPLOYMENT.md (Cloudflare deployment guide)
# - PRD.md (product requirements)
# - LICENSE (open source license)

echo "✅ Cleanup complete!"
echo ""
echo "Remaining essential files:"
echo "  ✓ README.md - User documentation"
echo "  ✓ DEPLOYMENT.md - Cloudflare deployment guide"
echo "  ✓ PRD.md - Product requirements"
echo "  ✓ LICENSE - MIT License"
echo "  ✓ .github/workflows/deploy-cloudflare.yml - Auto-deployment"
echo "  ✓ .github/workflows/sync-repos.yml - Repository sync"

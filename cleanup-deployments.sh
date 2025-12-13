#!/bin/bash

echo "🧹 Removing Netlify and Vercel deployment files..."
echo ""

# Remove Netlify deployment files
if [ -f "netlify.toml" ]; then
    rm netlify.toml
    echo "✓ Removed netlify.toml"
fi

# Remove Vercel deployment files
if [ -f "vercel.json" ]; then
    rm vercel.json
    echo "✓ Removed vercel.json"
fi

# Remove generic headers file (we have Cloudflare wrangler.toml)
if [ -f "_headers" ]; then
    rm _headers
    echo "✓ Removed _headers"
fi

# Remove deployment tracking file
if [ -f ".deploymentrc" ]; then
    rm .deploymentrc
    echo "✓ Removed .deploymentrc"
fi

# Remove unnecessary cleanup and documentation files
rm -f CLEANUP_COMPLETE.md
rm -f PROJECT_STRUCTURE.md
rm -f cleanup-master.sh

echo "✓ Removed unnecessary documentation files"

echo ""
echo "✅ Cleanup Complete!"
echo ""
echo "Removed files:"
echo "  • netlify.toml (Netlify deployment config)"
echo "  • vercel.json (Vercel deployment config)"
echo "  • _headers (Generic headers file)"
echo "  • .deploymentrc (Deployment tracking)"
echo "  • Unnecessary documentation files"
echo ""
echo "Keeping:"
echo "  ✓ wrangler.toml (Cloudflare Pages deployment)"
echo "  ✓ PRD.md (Product requirements)"
echo "  ✓ README.md (User documentation)"
echo "  ✓ DEPLOYMENT.md (Cloudflare deployment guide)"
echo "  ✓ LICENSE (Open source license)"
echo ""
echo "🚀 Your project is ready for Cloudflare Pages deployment!"
echo ""

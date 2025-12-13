#!/bin/bash

echo "🧹 Cleaning up unnecessary server documentation files..."

# Remove duplicate server documentation
rm -f DEV_MODE_GUIDE.md
rm -f DEV_VS_PROD.md
rm -f INSTALLATION_README.md
rm -f QUICK_START.md

echo "✅ Server cleanup complete!"
echo ""
echo "📄 Kept essential files:"
echo "  ✓ README.md - Complete server documentation"
echo "  ✓ install.sh/bat - Installation scripts"
echo "  ✓ test-server.sh/bat - Testing scripts"
echo "  ✓ Dockerfile, docker-compose.yml - Container setup"

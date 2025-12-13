#!/bin/bash

echo "🧹 Starting Complete Project Cleanup..."
echo ""
echo "This will remove all unnecessary files while keeping essentials."
echo ""

# Step 1: Remove unnecessary documentation
echo "📚 Step 1: Removing unnecessary documentation files..."
echo ""

files_to_remove=(
  "ARCHITECTURE.md"
  "CLOUDFLARE_API_TOKEN_GUIDE.md"
  "CLOUDFLARE_DEPLOY_GUIDE.md"
  "CLOUDFLARE_SECRETS_VISUAL.md"
  "CLOUDFLARE_SETUP_COMPLETE.md"
  "COMPLETE_DEPLOYMENT_CHECKLIST.md"
  "CURRENT_STATUS.md"
  "CUSTOM_DOMAIN_QUICK_REFERENCE.md"
  "DEPLOYMENT_AUTOMATION.md"
  "DEPLOYMENT_COMPLETE_GUIDE.md"
  "DEPLOYMENT_INFO.md"
  "DEPLOYMENT_README.md"
  "DEPLOYMENT_STATUS.md"
  "DEPLOYMENT_STATUS_UPDATED.md"
  "DEPLOYMENT_STATUS_FINAL.md"
  "DEPLOYMENT_VERIFICATION.md"
  "DEPLOY_ANSWER.md"
  "DEPLOY_CHEATSHEET.md"
  "DEPLOY_CHECKLIST.md"
  "DEPLOY_NOW.md"
  "DEPLOY_QUICK_START.md"
  "DEPLOY_TO_CLOUDFLARE_NOW.md"
  "DNS_ARCHITECTURE.md"
  "DNS_SETUP_GUIDE.md"
  "DNS_SETUP_VISUAL.md"
  "DNS_VISUAL_GUIDE.md"
  "DOCUMENTATION_SUMMARY.md"
  "DOGECOIN_INTEGRATION_IDEAS.md"
  "EXAMPLE_PROJECT_STRUCTURE.md"
  "FIXES_APPLIED.md"
  "FIX_BUILD_ERROR.md"
  "GETTING_STARTED.md"
  "GITHUB_ACTIONS_SETUP.md"
  "INSTALLER_FLOW_DIAGRAM.md"
  "INSTALLER_SUMMARY.md"
  "INSTALL_SERVER_VISUAL.md"
  "LEGAL_SAFETY_GUIDE.md"
  "LICENSE_AUDIT.md"
  "LOCAL_SETUP_GUIDE.md"
  "MACBOOK_DEPLOYMENT_STEPS.md"
  "MACBOOK_DEPLOY_GUIDE.md"
  "MACBOOK_QUICK_START.md"
  "OPEN_SOURCE_INFO.md"
  "QUICK_COMMANDS.md"
  "QUICK_DEPLOY_REFERENCE.md"
  "QUICK_SERVER_FIX.md"
  "QUICK_SERVER_TEST.md"
  "QUICK_START.md"
  "README_DEPLOYMENT.md"
  "SAXON_SERVER_DECISION.md"
  "SAXON_SERVER_SETUP.md"
  "SAXON_SERVER_SUMMARY.md"
  "SECRETS_SETUP_GUIDE.md"
  "SECURITY.md"
  "SERVER_CONNECTION_VISUAL.md"
  "SERVER_DOCUMENTATION_INDEX.md"
  "SERVER_INSTALL_1_PAGE.md"
  "SERVER_INSTALL_CHECKLIST.md"
  "SERVER_LOCAL_TEST_GUIDE.md"
  "SERVER_MANAGEMENT.md"
  "SERVER_QUICK_START.md"
  "SERVER_SETUP_QUICK_GUIDE.md"
  "SERVER_TEST_STATUS.md"
  "SIMPLE_DEPLOY_GUIDE.md"
  "START_HERE.md"
  "START_HERE_DEPLOYMENT.md"
  "START_HERE_NOW.md"
  "START_HERE_SERVER.md"
  "STATUS.md"
  "TESTING_INSTALLER.md"
  "WHATS_NEW_SERVER_INSTALLER.md"
  "XSLT_STATUS.md"
  "YOUR_REPO_STATUS.md"
  "DOCS_TO_KEEP.md"
  "CLEANUP_PLAN.md"
)

doc_count=0
for file in "${files_to_remove[@]}"; do
  if [ -f "$file" ]; then
    rm -f "$file"
    echo "  ✓ Removed $file"
    ((doc_count++))
  fi
done

echo ""
echo "✅ Removed $doc_count documentation files"
echo ""

# Step 2: Remove unnecessary config files
echo "⚙️  Step 2: Removing unnecessary config files..."
echo ""

config_files=(
  "theme.json"
  "netlify.toml"
  "vercel.json"
  ".deploymentrc"
)

config_count=0
for file in "${config_files[@]}"; do
  if [ -f "$file" ]; then
    rm -f "$file"
    echo "  ✓ Removed $file"
    ((config_count++))
  fi
done

echo ""
echo "✅ Removed $config_count config files"
echo ""

# Step 3: Remove duplicate/outdated scripts
echo "📜 Step 3: Removing duplicate/outdated scripts..."
echo ""

script_files=(
  "test-server-setup.bat"
  "test-server-setup.sh"
  "start-server-dev.bat"
  "start-server-dev.sh"
  "stop-server.bat"
  "stop-server.sh"
  "cleanup-docs.sh"
)

script_count=0
for file in "${script_files[@]}"; do
  if [ -f "$file" ]; then
    rm -f "$file"
    echo "  ✓ Removed $file"
    ((script_count++))
  fi
done

echo ""
echo "✅ Removed $script_count script files"
echo ""

# Step 4: Remove unused CSS files
echo "🎨 Step 4: Removing unused CSS files..."
echo ""

css_count=0
if [ -f "src/styles/theme.css" ]; then
  rm -f "src/styles/theme.css"
  echo "  ✓ Removed src/styles/theme.css"
  ((css_count++))
fi

if [ -d "src/styles" ] && [ -z "$(ls -A src/styles)" ]; then
  rmdir "src/styles"
  echo "  ✓ Removed empty src/styles/"
fi

echo ""
echo "✅ Removed $css_count unused CSS files"
echo ""

# Step 5: Clean up PIDs directory
echo "🗂️  Step 5: Cleaning up temporary directories..."
echo ""

if [ -d "pids" ]; then
  rm -rf pids
  echo "  ✓ Removed pids/"
fi

echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Cleanup Complete!"
echo ""
echo "📊 Summary:"
echo "  • Documentation: $doc_count files removed"
echo "  • Config files: $config_count files removed"
echo "  • Scripts: $script_count files removed"
echo "  • CSS files: $css_count files removed"
echo ""
total=$((doc_count + config_count + script_count + css_count))
echo "  🎯 Total: $total files removed"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Essential Documentation Kept:"
echo ""
echo "  Main:"
echo "    ✓ README.md"
echo "    ✓ PRD.md"
echo "    ✓ LICENSE"
echo "    ✓ LICENSE_SUMMARY.md"
echo ""
echo "  Deployment:"
echo "    ✓ DEPLOYMENT_GUIDE.md"
echo ""
echo "  Server (Optional):"
echo "    ✓ SERVER_INSTALL_GUIDE.md"
echo "    ✓ SERVER_TROUBLESHOOTING_GUIDE.md"
echo ""
echo "  Technical:"
echo "    ✓ BROWSER_VS_SERVER.md"
echo "    ✓ SAXON_SERVER_ARCHITECTURE.md"
echo "    ✓ XSLT_SUPPORT_GUIDE.md"
echo ""
echo "⚙️  Essential Config Kept:"
echo "    ✓ package.json"
echo "    ✓ tsconfig.json"
echo "    ✓ vite.config.ts"
echo "    ✓ tailwind.config.js"
echo "    ✓ wrangler.toml (Cloudflare)"
echo "    ✓ _headers"
echo ""
echo "📜 Essential Scripts Kept:"
echo "    ✓ launch-windows.bat"
echo "    ✓ launch-mac-linux.sh"
echo "    ✓ start-server.bat / .sh"
echo "    ✓ server-manager.sh"
echo ""
echo "🎉 Your project is now clean and organized!"
echo ""

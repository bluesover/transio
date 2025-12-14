#!/bin/bash

# Transio v1.0.0 Release Preparation Script
# This script prepares everything needed for the v1.0.0 release

set -e

echo "🚀 Preparing Transio v1.0.0 Release..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

VERSION="1.0.0"
TAG="v${VERSION}"

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_info "Checking current version in package.json..."
CURRENT_VERSION=$(node -p "require('./package.json').version")
if [ "$CURRENT_VERSION" != "$VERSION" ]; then
    print_warning "Version in package.json is $CURRENT_VERSION, expected $VERSION"
    print_info "Updating version to $VERSION..."
    npm version $VERSION --no-git-tag-version
    print_success "Version updated to $VERSION"
else
    print_success "Version is already $VERSION"
fi

# Check if clean working directory
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Working directory is not clean. You have uncommitted changes."
    echo ""
    git status --short
    echo ""
    read -p "Do you want to commit these changes before release? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Committing changes..."
        git add -A
        git commit -m "chore: prepare for v$VERSION release"
        print_success "Changes committed"
    fi
fi

# Check critical files
print_info "Verifying release files..."
REQUIRED_FILES=(
    "README.md"
    "LICENSE"
    "CHANGELOG.md"
    "RELEASE.md"
    "package.json"
    "package-lock.json"
    ".github/workflows/release-desktop.yml"
    "electron/main.ts"
    "desktop-resources/entitlements.mac.plist"
)

MISSING_FILES=()
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "Found: $file"
    else
        print_error "Missing: $file"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    print_error "Missing required files. Please create them before releasing."
    exit 1
fi

# Check desktop resources
print_info "Checking desktop resources..."
DESKTOP_RESOURCES=(
    "desktop-resources/entitlements.mac.plist"
    "desktop-resources/ICONS_README.md"
)

for file in "${DESKTOP_RESOURCES[@]}"; do
    if [ -f "$file" ]; then
        print_success "Found: $file"
    else
        print_warning "Missing: $file (optional but recommended)"
    fi
done

# Verify dependencies
print_info "Verifying dependencies..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm ci
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed"
fi

# Verify server dependencies
print_info "Verifying server dependencies..."
if [ ! -d "server/node_modules" ]; then
    print_warning "server/node_modules not found. Installing server dependencies..."
    cd server
    npm install
    cd ..
    print_success "Server dependencies installed"
else
    print_success "Server dependencies already installed"
fi

# Test build
print_info "Testing web build..."
if npm run build; then
    print_success "Web build successful"
else
    print_error "Web build failed. Please fix errors before releasing."
    exit 1
fi

# Test TypeScript compilation for Electron
print_info "Testing Electron TypeScript compilation..."
if npx tsc -p tsconfig.electron.json --noEmit; then
    print_success "Electron TypeScript compilation successful"
else
    print_error "Electron TypeScript compilation failed. Please fix errors before releasing."
    exit 1
fi

# Check if tag exists
print_info "Checking if tag $TAG already exists..."
if git rev-parse "$TAG" >/dev/null 2>&1; then
    print_warning "Tag $TAG already exists locally"
    read -p "Do you want to delete and recreate it? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git tag -d "$TAG"
        print_success "Deleted local tag $TAG"
    else
        print_error "Aborting release preparation"
        exit 1
    fi
fi

# Check if tag exists on remote
if git ls-remote --tags origin | grep -q "refs/tags/$TAG"; then
    print_warning "Tag $TAG already exists on remote"
    read -p "Do you want to delete and recreate it on remote? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push --delete origin "$TAG" 2>/dev/null || true
        print_success "Deleted remote tag $TAG"
    else
        print_error "Aborting release preparation"
        exit 1
    fi
fi

echo ""
print_success "All checks passed! Ready to create release."
echo ""

# Display release checklist
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Release Checklist for v$VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Version updated to $VERSION"
echo "✅ All required files present"
echo "✅ Web build successful"
echo "✅ Electron TypeScript compilation successful"
echo "✅ Working directory clean (or committed)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ask to create tag
read -p "Do you want to create and push the release tag now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Creating git tag $TAG..."
    git tag -a "$TAG" -m "Release version $VERSION"
    print_success "Tag $TAG created"
    
    echo ""
    print_info "Pushing tag to GitHub..."
    git push origin "$TAG"
    print_success "Tag pushed to GitHub"
    
    echo ""
    print_success "🎉 Release tag created and pushed!"
    echo ""
    print_info "GitHub Actions will now:"
    echo "  1. Build desktop apps for Windows, macOS, and Linux"
    echo "  2. Create a GitHub Release with all binaries"
    echo "  3. Attach release notes from RELEASE.md"
    echo ""
    print_info "Monitor the build progress at:"
    echo "  https://github.com/bluesover/transio/actions"
    echo ""
    print_info "The release will be available at:"
    echo "  https://github.com/bluesover/transio/releases/tag/$TAG"
    echo ""
else
    echo ""
    print_info "Tag not created. You can create it manually later:"
    echo ""
    echo "  git tag -a $TAG -m \"Release version $VERSION\""
    echo "  git push origin $TAG"
    echo ""
fi

print_success "Release preparation complete!"

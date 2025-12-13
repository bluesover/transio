#!/bin/bash

# Transio - Git Remote Setup Script
# Configures dual repository setup (private + public)

set -e

echo "🔧 Transio Git Remote Configuration"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
PRIVATE_REPO="https://github.com/bluesover/transio.git"
PUBLIC_REPO="https://github.com/bluesover/transio.org.git"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "  Private repo: $PRIVATE_REPO"
echo "  Public repo:  $PUBLIC_REPO"
echo ""

# Check current remotes
echo -e "${BLUE}🔍 Current remotes:${NC}"
git remote -v
echo ""

# Ask user for confirmation
echo -e "${YELLOW}This will configure your git remotes. Continue? (y/n)${NC}"
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""

# Function to safely add remote
add_remote() {
    local name=$1
    local url=$2
    
    if git remote | grep -q "^${name}$"; then
        echo -e "${YELLOW}⚠️  Remote '${name}' already exists${NC}"
        echo "   Current URL: $(git remote get-url $name)"
        echo "   New URL:     $url"
        echo "   Update URL? (y/n)"
        read -r update_response
        if [[ "$update_response" =~ ^[Yy]$ ]]; then
            git remote set-url "$name" "$url"
            echo -e "${GREEN}✅ Updated remote '${name}'${NC}"
        else
            echo -e "${BLUE}ℹ️  Keeping existing remote '${name}'${NC}"
        fi
    else
        git remote add "$name" "$url"
        echo -e "${GREEN}✅ Added remote '${name}'${NC}"
    fi
}

# Setup remotes
echo -e "${BLUE}📦 Setting up remotes...${NC}"
echo ""

add_remote "private" "$PRIVATE_REPO"
add_remote "public" "$PUBLIC_REPO"

echo ""
echo -e "${BLUE}📊 Final remote configuration:${NC}"
git remote -v

echo ""
echo "===================================="
echo -e "${GREEN}✅ Remote setup complete!${NC}"
echo ""
echo -e "${BLUE}📚 Usage:${NC}"
echo "  Push to private:  ${YELLOW}git push private main${NC}"
echo "  Push to public:   ${YELLOW}git push public main${NC}"
echo "  Push to both:     ${YELLOW}./sync-repos.sh \"Your commit message\"${NC}"
echo ""
echo -e "${BLUE}💡 Tip:${NC} Make the sync script executable:"
echo "  ${YELLOW}chmod +x sync-repos.sh${NC}"

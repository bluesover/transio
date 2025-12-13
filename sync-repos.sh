#!/bin/bash

# Transio - Dual Repository Sync Script
# Pushes to both private and public repositories simultaneously

set -e

echo "🔄 Transio Dual Repository Sync"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo -e "${RED}❌ Error: Not a git repository${NC}"
    exit 1
fi

# Get commit message from argument or use default
COMMIT_MSG="${1:-Update: $(date +'%Y-%m-%d %H:%M:%S')}"

echo -e "${BLUE}📝 Commit message: ${COMMIT_MSG}${NC}"
echo ""

# Check for changes
if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
    echo ""
    echo "Would you like to push anyway? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
else
    # Stage all changes
    echo -e "${BLUE}📦 Staging changes...${NC}"
    git add .
    
    # Commit changes
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "$COMMIT_MSG"
    echo ""
fi

# Check remotes
echo -e "${BLUE}🔍 Checking remotes...${NC}"
git remote -v
echo ""

# Function to push to remote
push_to_remote() {
    local remote_name=$1
    local branch=${2:-main}
    
    if git remote | grep -q "^${remote_name}$"; then
        echo -e "${BLUE}📤 Pushing to ${remote_name}...${NC}"
        if git push "$remote_name" "$branch"; then
            echo -e "${GREEN}✅ Successfully pushed to ${remote_name}${NC}"
            return 0
        else
            echo -e "${RED}❌ Failed to push to ${remote_name}${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  Remote '${remote_name}' not found, skipping...${NC}"
        return 1
    fi
}

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}🌿 Current branch: ${CURRENT_BRANCH}${NC}"
echo ""

# Push to both remotes
PUSH_SUCCESS=0

# Try pushing to private repo
if push_to_remote "private" "$CURRENT_BRANCH"; then
    PUSH_SUCCESS=$((PUSH_SUCCESS + 1))
fi
echo ""

# Try pushing to public repo
if push_to_remote "public" "$CURRENT_BRANCH"; then
    PUSH_SUCCESS=$((PUSH_SUCCESS + 1))
fi
echo ""

# Try pushing to origin (fallback)
if push_to_remote "origin" "$CURRENT_BRANCH"; then
    PUSH_SUCCESS=$((PUSH_SUCCESS + 1))
fi
echo ""

# Try pushing to backup (fallback)
if push_to_remote "backup" "$CURRENT_BRANCH"; then
    PUSH_SUCCESS=$((PUSH_SUCCESS + 1))
fi
echo ""

# Summary
echo "================================"
if [ $PUSH_SUCCESS -gt 0 ]; then
    echo -e "${GREEN}✅ Sync completed! Pushed to ${PUSH_SUCCESS} remote(s)${NC}"
else
    echo -e "${RED}❌ No remotes were updated${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📊 Repository Status:${NC}"
git remote -v

#!/bin/bash

echo "🔍 Transio SEO Verification Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN="https://transio.org"

echo "📊 Checking SEO essentials for $DOMAIN"
echo ""

# Check if sitemap exists
echo -n "Checking sitemap.xml... "
if curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/sitemap.xml" | grep -q "200"; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
fi

# Check robots.txt
echo -n "Checking robots.txt... "
if curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/robots.txt" | grep -q "200"; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
fi

# Check if sitemap is referenced in robots.txt
echo -n "Checking sitemap in robots.txt... "
if curl -s "$DOMAIN/robots.txt" | grep -q "sitemap.xml"; then
    echo -e "${GREEN}✓ Referenced${NC}"
else
    echo -e "${RED}✗ Not referenced${NC}"
fi

# Check meta tags
echo -n "Checking meta description... "
if curl -s "$DOMAIN" | grep -q "meta name=\"description\""; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
fi

# Check Open Graph tags
echo -n "Checking Open Graph tags... "
if curl -s "$DOMAIN" | grep -q "property=\"og:title\""; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
fi

# Check structured data
echo -n "Checking Schema.org structured data... "
if curl -s "$DOMAIN" | grep -q "application/ld+json"; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
fi

# Check canonical URL
echo -n "Checking canonical URL... "
if curl -s "$DOMAIN" | grep -q "rel=\"canonical\""; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
fi

# Check SSL/HTTPS
echo -n "Checking HTTPS... "
if curl -s -o /dev/null -w "%{http_code}" "$DOMAIN" | grep -q "200"; then
    echo -e "${GREEN}✓ Enabled${NC}"
else
    echo -e "${RED}✗ Not working${NC}"
fi

echo ""
echo "📝 Validation Tools:"
echo "   • Sitemap validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html"
echo "   • Rich Results Test: https://search.google.com/test/rich-results"
echo "   • Mobile-Friendly Test: https://search.google.com/test/mobile-friendly"
echo "   • PageSpeed Insights: https://pagespeed.web.dev/"
echo ""
echo "🔗 Submission URLs:"
echo "   • Google Search Console: https://search.google.com/search-console"
echo "   • Bing Webmaster Tools: https://www.bing.com/webmasters"
echo ""
echo "✅ Verification complete!"

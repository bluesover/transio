#!/bin/bash

# Saxon-HE Server Test Script
# Tests health check and transformation endpoints

BASE_URL="${1:-http://localhost:3001/api}"

echo "🧪 Testing Saxon-HE Server"
echo "📍 Base URL: $BASE_URL"
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
echo "────────────────────────────────"
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health check passed"
    echo "Response: $BODY"
else
    echo "❌ Health check failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
    exit 1
fi
echo ""

# Test 2: XSLT 1.0 Transformation
echo "Test 2: XSLT 1.0 Transformation"
echo "────────────────────────────────"
XSLT10_PAYLOAD='{
  "xml": "<?xml version=\"1.0\"?><root><item>Test</item></root>",
  "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><output><xsl:value-of select=\"root/item\"/></output></xsl:template></xsl:stylesheet>",
  "version": "1.0"
}'

TRANSFORM_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/transform" \
  -H "Content-Type: application/json" \
  -d "$XSLT10_PAYLOAD")

HTTP_CODE=$(echo "$TRANSFORM_RESPONSE" | tail -n1)
BODY=$(echo "$TRANSFORM_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ XSLT 1.0 transformation passed"
    echo "Response: $BODY"
else
    echo "❌ XSLT 1.0 transformation failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
    exit 1
fi
echo ""

# Test 3: XSLT 2.0 Grouping
echo "Test 3: XSLT 2.0 Grouping"
echo "────────────────────────────────"
XSLT20_PAYLOAD='{
  "xml": "<?xml version=\"1.0\"?><catalog><item category=\"book\">Item 1</item><item category=\"dvd\">Item 2</item><item category=\"book\">Item 3</item></catalog>",
  "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"2.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><result><xsl:for-each-group select=\"catalog/item\" group-by=\"@category\"><group name=\"{current-grouping-key()}\"><count><xsl:value-of select=\"count(current-group())\"/></count></group></xsl:for-each-group></result></xsl:template></xsl:stylesheet>",
  "version": "2.0"
}'

TRANSFORM_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/transform" \
  -H "Content-Type: application/json" \
  -d "$XSLT20_PAYLOAD")

HTTP_CODE=$(echo "$TRANSFORM_RESPONSE" | tail -n1)
BODY=$(echo "$TRANSFORM_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ XSLT 2.0 grouping passed"
    echo "Response: $BODY"
else
    echo "❌ XSLT 2.0 grouping failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
    exit 1
fi
echo ""

# Test 4: Error Handling (Invalid XSLT)
echo "Test 4: Error Handling"
echo "────────────────────────────────"
ERROR_PAYLOAD='{
  "xml": "<?xml version=\"1.0\"?><root>Test</root>",
  "xslt": "<?xml version=\"1.0\"?><invalid>Not valid XSLT</invalid>",
  "version": "1.0"
}'

ERROR_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/transform" \
  -H "Content-Type: application/json" \
  -d "$ERROR_PAYLOAD")

HTTP_CODE=$(echo "$ERROR_RESPONSE" | tail -n1)
BODY=$(echo "$ERROR_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    if echo "$BODY" | grep -q '"success":false'; then
        echo "✅ Error handling passed (returns error correctly)"
        echo "Response: $BODY"
    else
        echo "❌ Error handling failed (should return error)"
        echo "Response: $BODY"
        exit 1
    fi
else
    echo "❌ Error handling failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
    exit 1
fi
echo ""

# Test 5: Missing Input
echo "Test 5: Input Validation"
echo "────────────────────────────────"
MISSING_PAYLOAD='{
  "xml": "<?xml version=\"1.0\"?><root>Test</root>"
}'

MISSING_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/transform" \
  -H "Content-Type: application/json" \
  -d "$MISSING_PAYLOAD")

HTTP_CODE=$(echo "$MISSING_RESPONSE" | tail -n1)
BODY=$(echo "$MISSING_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "400" ]; then
    echo "✅ Input validation passed (rejects missing XSLT)"
    echo "Response: $BODY"
else
    echo "❌ Input validation failed (HTTP $HTTP_CODE, expected 400)"
    echo "Response: $BODY"
    exit 1
fi
echo ""

echo "════════════════════════════════"
echo "✅ All tests passed!"
echo "════════════════════════════════"

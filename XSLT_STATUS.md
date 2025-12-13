# XSLT 2.0/3.0 Support Status

## Quick Summary

✅ **XSLT 1.0: Fully Working** - Use this for production
⚠️ **XSLT 2.0: Partially Working** - Good for basic features (grouping, XPath 2.0)
⚠️ **XSLT 3.0: Limited** - Basic features only

## What You Need to Know

### XSLT 1.0 ✅
**Status:** 100% functional
**Why:** Uses browser's built-in processor
**Recommendation:** Use for all production work

### XSLT 2.0 ⚠️
**Status:** 60-80% functional
**Why:** Saxon-JS browser limitations
**What Works:**
- `<xsl:for-each-group>` - Grouping elements
- `<xsl:value-of separator="">` - Multiple values with separator
- XPath 2.0 functions - `current-date()`, `format-number()`, etc.
- Regular expressions - `matches()`, `replace()`, `tokenize()`
- Basic sequences and operators

**What May Not Work:**
- Complex schema-aware features
- Some advanced XPath 2.0 functions
- `<xsl:result-document>` (browser security)

### XSLT 3.0 ⚠️
**Status:** 40-60% functional
**Why:** Saxon-JS browser limitations
**What Works:**
- Most XSLT 2.0 features (see above)
- `expand-text="yes"` - Text value templates
- Basic maps and arrays
- Some XPath 3.0 functions

**What Won't Work:**
- Streaming
- Try-catch
- Packages
- Advanced map/array operations
- Many XSLT 3.0-specific features

## Is This Open Source?

✅ **Yes, 100% Open Source!**

- **Transio:** MIT License (completely free)
- **Saxon-JS:** MPL-2.0 License (open source, free for commercial use)
- **All dependencies:** Open source (MIT, Apache-2.0, etc.)

## Why the Limitations?

Saxon-JS has two modes:

1. **SEF Mode (Full Support)**
   - Requires pre-compiled stylesheets
   - Needs Saxon-EE (commercial product) for compilation
   - Not suitable for user-provided XSLT

2. **Direct Mode (What We Use)**
   - Parses XSLT directly in browser
   - ✅ 100% open source
   - ⚠️ Reduced functionality

Transio uses Direct Mode to remain completely open source and allow users to write/modify XSLT in real-time.

## Alternatives for Full XSLT 2.0/3.0

### Option 1: Server-Side Saxon-HE
- ✅ 100% open source (MPL-2.0)
- ✅ Full XSLT 2.0 support
- ❌ Requires backend server
- Use when: You need complex XSLT 2.0 features

### Option 2: Stick to XSLT 1.0
- ✅ 100% reliable
- ✅ Works in all browsers
- ✅ No dependencies
- Use when: You want maximum reliability

## Testing Your XSLT

1. **Select Version** - Choose 1.0, 2.0, or 3.0 in the dropdown
2. **Write XSLT** - Use the editor or snippets
3. **Transform** - Click Transform or press Ctrl+Enter
4. **Check Results** - Look for errors in the output panel

If something doesn't work with XSLT 2.0/3.0, try:
- Simplifying the transformation
- Using equivalent XSLT 1.0 features
- Checking the XSLT Support Guide for details

## Documentation

- **Full Guide:** [XSLT_SUPPORT_GUIDE.md](./XSLT_SUPPORT_GUIDE.md)
- **Open Source Info:** [OPEN_SOURCE_INFO.md](./OPEN_SOURCE_INFO.md)
- **License Details:** [LICENSE](./LICENSE)
- **Deployment:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Support

Having issues? Check:
1. The XSLT Support Guide (linked above)
2. The snippets panel (Ctrl+K) for working examples
3. The About dialog in the app
4. GitHub Issues

## Bottom Line

**For Production:** Use XSLT 1.0 (100% reliable)
**For Learning:** Try all versions!
**For Complex XSLT 2.0/3.0:** Use server-side Saxon-HE

Transio is designed to be:
- ✅ 100% open source
- ✅ 100% free
- ✅ Privacy-first (no data sent to servers)
- ✅ Useful for education and production XSLT 1.0 work
- ⚠️ Best-effort for XSLT 2.0/3.0

Questions? Open an issue on GitHub or check the documentation!

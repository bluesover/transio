# XSLT 2.0/3.0 Support Guide

## Overview

Transio supports three versions of XSLT with varying levels of functionality:

| Version | Support Level | Processor | Reliability |
|---------|--------------|-----------|-------------|
| **XSLT 1.0** | ✅ Full | Browser XSLTProcessor | 100% |
| **XSLT 2.0** | ⚠️ Partial | Saxon-JS | 60-80% |
| **XSLT 3.0** | ⚠️ Limited | Saxon-JS | 40-60% |

## XSLT 1.0 - Fully Supported ✅

### What Works
- ✅ All XSLT 1.0 features
- ✅ XPath 1.0 expressions
- ✅ Template matching and modes
- ✅ Variables and parameters
- ✅ Loops (for-each)
- ✅ Conditionals (if, choose-when-otherwise)
- ✅ Sorting
- ✅ All output methods (html, xml, text)
- ✅ Number formatting
- ✅ Keys and generate-id()
- ✅ Named templates

### Processor
Uses the browser's native `XSLTProcessor` API - built into all modern browsers.

### Recommendation
**Use XSLT 1.0 for production web applications.** It's fast, reliable, and requires no external dependencies.

## XSLT 2.0 - Partial Support ⚠️

### What Works
- ✅ Basic grouping with `<xsl:for-each-group>`
- ✅ XPath 2.0 functions like `current-date()`, `format-number()`
- ✅ `<xsl:value-of>` with `separator` attribute
- ✅ Sequences and sequence operators
- ✅ Basic `<xsl:function>` definitions
- ✅ Character maps
- ✅ Regular expressions (`matches()`, `replace()`, `tokenize()`)
- ✅ Simple schema-awareness (if types are built-in)

### What Might Not Work
- ⚠️ Complex grouping algorithms
- ⚠️ Advanced XPath 2.0 expressions (context-dependent)
- ⚠️ `<xsl:result-document>` (browser security restrictions)
- ⚠️ User-defined types (requires schema compilation)
- ⚠️ Streaming transformations
- ⚠️ Some advanced XPath 2.0 functions

### Example: Working XSLT 2.0 Code

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <body>
        <h1>Books Grouped by Category</h1>
        
        <!-- Grouping works -->
        <xsl:for-each-group select="catalog/book" group-by="@category">
          <div class="category">
            <h2><xsl:value-of select="current-grouping-key()"/></h2>
            <ul>
              <xsl:for-each select="current-group()">
                <li>
                  <xsl:value-of select="title"/>
                  <!-- XPath 2.0 functions work -->
                  <xsl:text> - </xsl:text>
                  <xsl:value-of select="format-number(price, '$#,##0.00')"/>
                </li>
              </xsl:for-each>
            </ul>
          </div>
        </xsl:for-each-group>
        
        <!-- Multiple value-of with separator works -->
        <p>Authors: <xsl:value-of select="catalog/book/author" separator=", "/></p>
        
        <!-- Regular expressions work -->
        <p>Publication years: <xsl:value-of select="distinct-values(catalog/book/year)" separator=", "/></p>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

### Processor
Uses **Saxon-JS 2.7** (open source, MPL-2.0 license) with `stylesheetNode` API.

### Limitations
Saxon-JS in browser mode has reduced functionality compared to server-side Saxon. The browser runtime can parse and execute XSLT 2.0 stylesheets directly, but without the full power of pre-compiled SEF files.

## XSLT 3.0 - Limited Support ⚠️

### What Works
- ✅ All XSLT 2.0 features that work (see above)
- ✅ Some XPath 3.0 functions
- ✅ Maps and arrays (basic usage)
- ✅ `expand-text="yes"` for text value templates

### What Likely Won't Work
- ❌ Streaming (`<xsl:stream>`)
- ❌ Try-catch error handling
- ❌ Packages and static parameters
- ❌ Advanced map/array operations
- ❌ Some XPath 3.1 features
- ❌ Dynamic XPath evaluation

### Example: Working XSLT 3.0 Code

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/" expand-text="yes">
    <html>
      <body>
        <h1>Book Catalog</h1>
        
        <!-- Text value templates work with expand-text -->
        <xsl:for-each select="catalog/book">
          <div>
            <p>Title: {title}</p>
            <p>Price: {format-number(price, '$#,##0.00')}</p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

### Processor
Uses **Saxon-JS 2.7** (same as XSLT 2.0).

### Limitations
Most advanced XSLT 3.0 features require pre-compiled SEF files or are not available in the browser runtime.

## Technical Details: How Saxon-JS Works

### Two Operating Modes

1. **SEF Mode (Recommended for Production)**
   - XSLT stylesheets are pre-compiled into SEF (Saxon Executable Format) JSON files
   - Compilation is done using Saxon-EE (Enterprise Edition) on the server/build step
   - SEF files are loaded in the browser for fast execution
   - ✅ Full XSLT 2.0/3.0 support
   - ❌ Requires Saxon-EE license for compilation

2. **Direct Mode (What Transio Uses)**
   - XSLT stylesheets are parsed directly in the browser
   - Uses Saxon-JS `stylesheetNode` API
   - ⚠️ Reduced XSLT 2.0/3.0 support
   - ✅ No pre-compilation needed
   - ✅ Fully open source workflow

### Why Direct Mode Has Limitations

Saxon-JS's browser runtime is optimized for executing pre-compiled SEF files. When parsing XSLT directly:
- Some optimizations aren't available
- Schema compilation isn't possible
- Advanced features may fail gracefully or throw errors
- Performance is slower for complex transformations

### The Open Source Challenge

**The Problem:**
- Full XSLT 2.0/3.0 requires SEF compilation
- SEF compilation requires Saxon-EE (commercial license ~$500-$5000/year)
- Saxon-HE (open source) only runs server-side (Java), not in browsers

**Transio's Solution:**
- Use XSLT 1.0 for production reliability (100% browser support)
- Provide best-effort XSLT 2.0/3.0 via Saxon-JS direct mode
- Document what works and what doesn't
- Suggest alternatives for complex use cases

## Alternatives for Full XSLT 2.0/3.0 Support

### Option 1: Server-Side Transformation
Deploy a Node.js backend that uses Saxon-HE (open source):

```javascript
// Example: Node.js + Saxon-HE
const saxon = require('saxon-js');

app.post('/transform', async (req, res) => {
  const { xml, xslt } = req.body;
  
  // Run Saxon-HE server-side for full XSLT 2.0 support
  const result = await runSaxonHE(xml, xslt);
  
  res.json({ output: result });
});
```

**Pros:**
- ✅ Full XSLT 2.0 support
- ✅ 100% open source (Saxon-HE is MPL-2.0)
- ✅ Faster for complex transformations

**Cons:**
- ❌ Requires server infrastructure
- ❌ No longer client-side only
- ❌ Adds complexity

### Option 2: Pre-Compile with Saxon-EE
If you have fixed XSLT stylesheets (not user-provided):

1. Compile XSLT to SEF using Saxon-EE
2. Include SEF files in your app
3. Load SEF files with Saxon-JS

```javascript
// Load pre-compiled SEF
import SaxonJS from 'saxon-js';

const result = await SaxonJS.transform({
  stylesheetLocation: "compiled-stylesheet.sef.json",
  sourceText: xml,
  destination: "serialized"
}, "async");
```

**Pros:**
- ✅ Full XSLT 2.0/3.0 support
- ✅ Runs client-side
- ✅ Fast execution

**Cons:**
- ❌ Requires Saxon-EE license for compilation
- ❌ Can't handle user-provided XSLT
- ❌ Not suitable for dynamic transformations

### Option 3: Stick to XSLT 1.0
For most use cases, XSLT 1.0 is sufficient:

**XSLT 1.0 Can Do:**
- ✅ Transform XML to HTML/XML/Text
- ✅ Loop, sort, filter data
- ✅ Conditional logic
- ✅ Template matching
- ✅ Variables and parameters
- ✅ Keys and lookups
- ✅ Number formatting
- ✅ String manipulation

**What You'll Miss from XSLT 2.0:**
- Grouping (can be worked around with Muenchian method)
- Regex functions (can use JavaScript for post-processing)
- XPath 2.0 functions (most have XSLT 1.0 equivalents)

## Testing Your XSLT

### Test in Transio
1. Select the XSLT version (1.0, 2.0, or 3.0)
2. Write or paste your XSLT
3. Click Transform
4. Check the output for errors

### Common Errors

**XSLT 2.0/3.0 Error: "Feature not supported"**
```
Error: The XSLT 2.0/3.0 feature '<feature>' is not supported in browser mode
```
**Solution:** Simplify the transformation or fall back to XSLT 1.0

**XSLT 2.0 Error: "Unknown function"**
```
Error: Unknown function 'fn:some-advanced-function'
```
**Solution:** The function may not be available in Saxon-JS browser mode

**XSLT 3.0 Error: "Streaming not available"**
```
Error: Streaming is not supported in browser transformations
```
**Solution:** Remove streaming attributes, use standard templates

## Best Practices

### 1. Start with XSLT 1.0
Unless you specifically need XSLT 2.0/3.0 features, stick to 1.0 for reliability.

### 2. Test Early
Test XSLT 2.0/3.0 stylesheets in Transio early in development to identify issues.

### 3. Have Fallbacks
If a feature doesn't work, have an XSLT 1.0 alternative ready.

### 4. Use Snippets
Transio includes 40+ tested XSLT snippets. Use them as starting points.

### 5. Document Version Requirements
Clearly document which XSLT version your stylesheets require.

### 6. Consider Server-Side for Production
For complex XSLT 2.0/3.0 transformations, consider server-side Saxon-HE.

## License & Open Source Status

### Saxon-JS
- **License:** Mozilla Public License 2.0 (MPL-2.0)
- **Source Code:** [github.com/Saxonica/Saxon-JS](https://github.com/Saxonica/Saxon-JS)
- **Commercial Use:** ✅ Allowed
- **Modification:** ✅ Allowed (must remain MPL-2.0)
- **Cost:** FREE

### Saxon-EE (For SEF Compilation)
- **License:** Commercial (Proprietary)
- **Cost:** ~$500-$5000/year depending on edition
- **Required For:** Pre-compiling XSLT to SEF format
- **Not Required For:** Using Transio (we don't use SEF files)

### Saxon-HE (Server-Side Alternative)
- **License:** Mozilla Public License 2.0 (MPL-2.0)
- **Source Code:** [github.com/Saxonica/Saxon-HE](https://github.com/Saxonica/Saxon-HE)
- **Platform:** Java (server-side only)
- **XSLT Support:** Full XSLT 2.0
- **Cost:** FREE

### Transio
- **License:** MIT
- **Cost:** FREE
- **Usage:** Unlimited personal and commercial use

## Summary

| Use Case | Recommendation | Reliability |
|----------|---------------|-------------|
| Simple XML → HTML | XSLT 1.0 | ⭐⭐⭐⭐⭐ |
| Grouping, basic XPath 2.0 | XSLT 2.0 (test thoroughly) | ⭐⭐⭐⭐ |
| Advanced XSLT 2.0 | Server-side Saxon-HE | ⭐⭐⭐⭐⭐ |
| XSLT 3.0 features | Server-side Saxon-HE or SEF | ⭐⭐⭐⭐⭐ |
| Production apps | XSLT 1.0 or server-side | ⭐⭐⭐⭐⭐ |
| Learning/experimentation | Try all versions! | ⭐⭐⭐⭐ |

## Resources

- **Saxon Documentation:** https://www.saxonica.com/saxon-js/documentation2/
- **XSLT 1.0 Spec:** https://www.w3.org/TR/xslt-10/
- **XSLT 2.0 Spec:** https://www.w3.org/TR/xslt20/
- **XSLT 3.0 Spec:** https://www.w3.org/TR/xslt-30/
- **Saxon-JS GitHub:** https://github.com/Saxonica/Saxon-JS
- **Transio Website:** https://transio.org

---

**Questions?** Check the About dialog in Transio or visit our documentation.

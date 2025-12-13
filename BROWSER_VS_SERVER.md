# 🔄 Browser vs Server: Which Should You Use?

Quick comparison to help you decide whether you need the server.

---

## TL;DR

- **XSLT 1.0 only?** → Use browser (no server needed)
- **XSLT 2.0/3.0 with basic features?** → Try browser first
- **XSLT 2.0/3.0 with grouping/advanced regex?** → Use server
- **Large files (>1MB)?** → Use server
- **Maximum performance?** → Use server

---

## Feature Comparison

| Feature | Browser (Saxon-JS) | Server (Saxon-HE) |
|---------|-------------------|-------------------|
| **XSLT Version Support** | | |
| XSLT 1.0 | ✅ Full support | ✅ Full support |
| XSLT 2.0 | ⚠️ Limited (no grouping) | ✅ Full support |
| XSLT 3.0 | ⚠️ Limited | ✅ Full support |
| **File Processing** | | |
| Max file size | ~1 MB | 10 MB |
| Performance | Good | Excellent |
| Memory usage | Browser limited | Server optimized |
| **XSLT 2.0/3.0 Features** | | |
| `for-each-group` | ❌ Not supported | ✅ Fully supported |
| `current-grouping-key()` | ❌ Not supported | ✅ Fully supported |
| Advanced regex | ⚠️ Basic only | ✅ Full support |
| Multiple outputs | ❌ Not supported | ✅ Fully supported |
| Format-date/time | ⚠️ Limited | ✅ Full support |
| **Technical** | | |
| Setup required | None | One-time install |
| Internet required | Initial load only | No (after install) |
| Dependencies | None | Node.js + Java |
| License | MPL-2.0 | MPL-2.0 |
| Cost | Free | Free |

---

## Use Cases

### ✅ Browser is Perfect For:

- **XSLT 1.0 transformations**
- **Simple XSLT 2.0** (no grouping, basic regex)
- **Small to medium files** (<1 MB)
- **Quick prototyping**
- **No installation allowed** (work computer, shared machine)
- **Privacy-critical** (data never leaves browser)
- **Offline use** (after initial load)

### ✅ Server is Perfect For:

- **XSLT 2.0/3.0 with grouping** (`for-each-group`)
- **Advanced regex patterns**
- **Large files** (1-10 MB)
- **Production workloads**
- **Maximum performance**
- **Enterprise features**
- **Batch processing**

---

## XSLT 2.0/3.0 Feature Support Matrix

| Feature | Browser | Server | Notes |
|---------|---------|--------|-------|
| `xsl:for-each-group` | ❌ | ✅ | **Most common reason to use server** |
| `current-grouping-key()` | ❌ | ✅ | Requires grouping support |
| `group-by` | ❌ | ✅ | Requires grouping support |
| `xsl:analyze-string` | ⚠️ | ✅ | Limited in browser |
| `regex-group()` | ⚠️ | ✅ | Limited in browser |
| `format-date()` | ⚠️ | ✅ | Limited in browser |
| `format-time()` | ⚠️ | ✅ | Limited in browser |
| `xsl:result-document` | ❌ | ✅ | Multiple output files |
| Sequence types | ⚠️ | ✅ | Partial in browser |
| Schema-aware | ❌ | ❌ | Not in HE (need EE) |

---

## Performance Comparison

### Small File (10 KB)
- **Browser:** 50-100ms
- **Server:** 100-200ms (includes network)
- **Winner:** Browser (lower latency)

### Medium File (500 KB)
- **Browser:** 200-500ms
- **Server:** 150-300ms
- **Winner:** Tie

### Large File (2 MB)
- **Browser:** 1000-3000ms (may fail)
- **Server:** 300-600ms
- **Winner:** Server (much faster, more reliable)

### Complex XSLT with Grouping
- **Browser:** Not supported
- **Server:** 200-800ms depending on complexity
- **Winner:** Server (only option)

---

## Installation Effort

### Browser
```
✅ Already working!
No installation needed.
```

### Server
```
Windows:
1. Double-click server/install.bat
2. Wait 2-3 minutes
3. Double-click start-server.bat

Mac/Linux:
1. chmod +x server/install.sh
2. ./install.sh
3. ./start-server.sh

Time: ~3 minutes
Requirements: Node.js + Java
```

---

## Real-World Examples

### Example 1: Simple Value Extraction (XSLT 1.0)
```xml
<xsl:stylesheet version="1.0">
  <xsl:template match="/">
    <xsl:value-of select="//title"/>
  </xsl:template>
</xsl:stylesheet>
```
**Recommendation:** Browser ✅

---

### Example 2: Group Products by Category (XSLT 2.0)
```xml
<xsl:stylesheet version="2.0">
  <xsl:template match="/">
    <xsl:for-each-group select="//product" group-by="category">
      <category name="{current-grouping-key()}">
        <xsl:copy-of select="current-group()"/>
      </category>
    </xsl:for-each-group>
  </xsl:template>
</xsl:stylesheet>
```
**Recommendation:** Server ✅ (grouping required)

---

### Example 3: Format Dates (XSLT 2.0)
```xml
<xsl:stylesheet version="2.0">
  <xsl:template match="/">
    <xsl:value-of select="format-date(current-date(), '[D] [MNn] [Y]')"/>
  </xsl:template>
</xsl:stylesheet>
```
**Recommendation:** Server ✅ (better date formatting support)

---

### Example 4: Advanced Regex (XSLT 2.0)
```xml
<xsl:stylesheet version="2.0">
  <xsl:template match="/">
    <xsl:analyze-string select="//text" regex="(\d{3})-(\d{3})-(\d{4})">
      <xsl:matching-substring>
        <phone>
          <area><xsl:value-of select="regex-group(1)"/></area>
          <exchange><xsl:value-of select="regex-group(2)"/></exchange>
          <number><xsl:value-of select="regex-group(3)"/></number>
        </phone>
      </xsl:matching-substring>
    </xsl:analyze-string>
  </xsl:template>
</xsl:stylesheet>
```
**Recommendation:** Server ✅ (full regex support)

---

## Decision Tree

```
Start
  │
  ├─ Using XSLT 1.0?
  │   └─ Yes → Use Browser ✅
  │
  ├─ Using grouping (for-each-group)?
  │   └─ Yes → Use Server ✅
  │
  ├─ Files larger than 1 MB?
  │   └─ Yes → Use Server ✅
  │
  ├─ Using advanced regex?
  │   └─ Yes → Use Server ✅
  │
  ├─ Need multiple output files?
  │   └─ Yes → Use Server ✅
  │
  ├─ Can't install software?
  │   └─ Yes → Use Browser ✅
  │
  └─ Simple XSLT 2.0?
      └─ Try Browser first, switch to Server if issues
```

---

## Can I Use Both?

**Yes!** The app seamlessly switches between browser and server:

1. **Default:** Uses browser (Saxon-JS)
2. **Enable server:** Click ☁️ icon, enable server
3. **Automatic fallback:** If server unavailable, uses browser
4. **Toggle anytime:** Enable/disable server as needed

**Recommendation:**
- Start with browser (no setup)
- Install server when you need:
  - Grouping features
  - Better performance
  - Larger files

---

## Summary

| | Browser | Server |
|-|---------|--------|
| **Best for** | XSLT 1.0, simple XSLT 2.0 | Full XSLT 2.0/3.0 |
| **Setup** | None | 3 minutes |
| **Requirements** | Modern browser | Node.js + Java |
| **File size** | <1 MB | <10 MB |
| **Grouping** | ❌ | ✅ |
| **Performance** | Good | Excellent |
| **Privacy** | 100% local | 100% local |
| **Cost** | Free | Free |
| **License** | MPL-2.0 | MPL-2.0 |

---

## Quick Install (if you need the server)

**Full guide:** [SERVER_INSTALL_GUIDE.md](./SERVER_INSTALL_GUIDE.md)

**Windows:** Double-click `server/install.bat`  
**Mac/Linux:** Run `./server/install.sh`  
**npm:** `cd server && npm run install-server`

Takes ~3 minutes, requires Node.js + Java.

---

**Bottom line:** Try browser first. If you hit limitations (grouping, large files), install the server. Both are free and open source!

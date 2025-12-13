import type { XSLTSnippet } from './types'

export const xsltSnippets: XSLTSnippet[] = [
  {
    id: 'basic-1.0',
    title: 'Basic XSLT 1.0 Stylesheet',
    description: 'Minimal XSLT 1.0 template structure',
    category: 'boilerplate',
    xsltVersion: ['1.0'],
    code: `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>`
  },
  {
    id: 'basic-2.0',
    title: 'Basic XSLT 2.0 Stylesheet',
    description: 'Minimal XSLT 2.0 template structure',
    category: 'boilerplate',
    xsltVersion: ['2.0'],
    code: `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <html>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>`
  },
  {
    id: 'basic-3.0',
    title: 'Basic XSLT 3.0 Stylesheet',
    description: 'Minimal XSLT 3.0 template structure',
    category: 'boilerplate',
    xsltVersion: ['3.0'],
    code: `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  
  <xsl:template match="/" expand-text="yes">
    <html>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>`
  },
  {
    id: 'template-match',
    title: 'Template with Match',
    description: 'Template that matches specific elements',
    category: 'templates',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:template match="element">
  <div class="element">
    <xsl:apply-templates/>
  </div>
</xsl:template>`
  },
  {
    id: 'named-template',
    title: 'Named Template',
    description: 'Reusable named template with parameters',
    category: 'templates',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:template name="format-date">
  <xsl:param name="date"/>
  <span class="date">
    <xsl:value-of select="$date"/>
  </span>
</xsl:template>

<!-- Call it with: -->
<xsl:call-template name="format-date">
  <xsl:with-param name="date" select="@date"/>
</xsl:call-template>`
  },
  {
    id: 'for-each',
    title: 'For-Each Loop',
    description: 'Iterate over elements',
    category: 'loops',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:for-each select="items/item">
  <div class="item">
    <xsl:value-of select="name"/>
  </div>
</xsl:for-each>`
  },
  {
    id: 'for-each-sorted',
    title: 'For-Each with Sorting',
    description: 'Iterate over elements with sorting',
    category: 'loops',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:for-each select="items/item">
  <xsl:sort select="name" order="ascending"/>
  <div class="item">
    <xsl:value-of select="name"/>
  </div>
</xsl:for-each>`
  },
  {
    id: 'for-each-group',
    title: 'For-Each-Group',
    description: 'Group elements by a key (XSLT 2.0+)',
    category: 'loops',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:for-each-group select="items/item" group-by="@category">
  <div class="category">
    <h3><xsl:value-of select="current-grouping-key()"/></h3>
    <xsl:for-each select="current-group()">
      <div class="item">
        <xsl:value-of select="name"/>
      </div>
    </xsl:for-each>
  </div>
</xsl:for-each-group>`
  },
  {
    id: 'for-each-group-complete',
    title: 'XSLT 2.0 Grouping Complete Example',
    description: 'Full XSLT 2.0 stylesheet with for-each-group, format-number, and aggregation',
    category: 'boilerplate',
    xsltVersion: ['2.0', '3.0'],
    code: `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Grouped by Category</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          h1 { color: #2c3e50; text-align: center; }
          .category-section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; }
          h2 { color: #3498db; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
          .count { background: #3498db; color: white; padding: 4px 12px; border-radius: 20px; margin-left: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background: #34495e; color: white; }
          tr:hover { background: #e8f4f8; }
          .total { background: #ecf0f1; padding: 15px; margin-top: 15px; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Grouped Data</h1>
        
        <xsl:for-each-group select="catalog/book" group-by="@category">
          <xsl:sort select="current-grouping-key()"/>
          <div class="category-section">
            <h2>
              <xsl:value-of select="current-grouping-key()"/>
              <span class="count"><xsl:value-of select="count(current-group())"/> items</span>
            </h2>
            
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="current-group()">
                  <xsl:sort select="title"/>
                  <tr>
                    <td><xsl:value-of select="title"/></td>
                    <td><xsl:value-of select="author"/></td>
                    <td>$<xsl:value-of select="format-number(price, '#,##0.00')"/></td>
                    <td><xsl:value-of select="year"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            
            <div class="total">
              Category Total: $<xsl:value-of select="format-number(sum(current-group()/price), '#,##0.00')"/>
            </div>
          </div>
        </xsl:for-each-group>
        
        <div class="total" style="background: #3498db; color: white;">
          Grand Total: $<xsl:value-of select="format-number(sum(catalog/book/price), '#,##0.00')"/>
        </div>
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>`
  },
  {
    id: 'if-statement',
    title: 'If Statement',
    description: 'Simple conditional',
    category: 'conditionals',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:if test="@status = 'active'">
  <span class="active">Active</span>
</xsl:if>`
  },
  {
    id: 'choose-when',
    title: 'Choose-When-Otherwise',
    description: 'Multiple conditional branches',
    category: 'conditionals',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:choose>
  <xsl:when test="price &lt; 10">
    <span class="cheap">Budget</span>
  </xsl:when>
  <xsl:when test="price &lt; 50">
    <span class="moderate">Mid-range</span>
  </xsl:when>
  <xsl:otherwise>
    <span class="expensive">Premium</span>
  </xsl:otherwise>
</xsl:choose>`
  },
  {
    id: 'value-of',
    title: 'Value-Of',
    description: 'Output the value of an expression',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:value-of select="title"/>`
  },
  {
    id: 'value-of-separator',
    title: 'Value-Of with Separator',
    description: 'Output multiple values with separator (XSLT 2.0+)',
    category: 'instructions',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:value-of select="authors/author" separator=", "/>`
  },
  {
    id: 'apply-templates',
    title: 'Apply-Templates',
    description: 'Process child nodes',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:apply-templates select="items/item"/>`
  },
  {
    id: 'copy-of',
    title: 'Copy-Of',
    description: 'Copy nodes without processing',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:copy-of select="description"/>`
  },
  {
    id: 'variable',
    title: 'Variable',
    description: 'Define a variable',
    category: 'variables',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:variable name="total" select="sum(items/item/price)"/>`
  },
  {
    id: 'variable-rtf',
    title: 'Variable with Content',
    description: 'Variable containing nodes',
    category: 'variables',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:variable name="header">
  <h1>Title</h1>
  <p>Description</p>
</xsl:variable>

<xsl:copy-of select="$header"/>`
  },
  {
    id: 'param',
    title: 'Parameter',
    description: 'Define a parameter with default value',
    category: 'variables',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:param name="currency" select="'USD'"/>`
  },
  {
    id: 'attribute',
    title: 'Create Attribute',
    description: 'Add attribute to element',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<div>
  <xsl:attribute name="class">
    <xsl:value-of select="@type"/>
  </xsl:attribute>
  Content
</div>`
  },
  {
    id: 'attribute-avt',
    title: 'Attribute Value Template',
    description: 'Use curly braces in attributes',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<div class="{@type}" id="item-{@id}">
  Content
</div>`
  },
  {
    id: 'number',
    title: 'Number Formatting',
    description: 'Format numbers',
    category: 'patterns',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:number value="position()" format="1. "/>`
  },
  {
    id: 'key',
    title: 'Key Definition and Lookup',
    description: 'Define and use keys for efficient lookups',
    category: 'patterns',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:key name="item-by-id" match="item" use="@id"/>

<!-- Later, use the key: -->
<xsl:value-of select="key('item-by-id', $itemId)/name"/>`
  },
  {
    id: 'regex-match',
    title: 'Regular Expression Match',
    description: 'Test if text matches a pattern (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:if test="matches(email, '^[\\w.]+@[\\w.]+$')">
  <span class="valid-email">
    <xsl:value-of select="email"/>
  </span>
</xsl:if>`
  },
  {
    id: 'regex-replace',
    title: 'Regular Expression Replace',
    description: 'Replace text using regex (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:value-of select="replace(phone, '[^0-9]', '')"/>`
  },
  {
    id: 'tokenize',
    title: 'Tokenize String',
    description: 'Split string into sequence (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:for-each select="tokenize(tags, ',')">
  <span class="tag">
    <xsl:value-of select="normalize-space(.)"/>
  </span>
</xsl:for-each>`
  },
  {
    id: 'format-date',
    title: 'Format Date',
    description: 'Format date values (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:value-of select="format-date(current-date(), '[MNn] [D], [Y]')"/>`
  },
  {
    id: 'format-number',
    title: 'Format Number',
    description: 'Format numeric values (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:value-of select="format-number(price, '$#,##0.00')"/>`
  },
  {
    id: 'result-document',
    title: 'Result Document',
    description: 'Create multiple output files (XSLT 2.0+)',
    category: 'instructions',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:result-document href="output/{@id}.html">
  <html>
    <body>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:result-document>`
  },
  {
    id: 'analyze-string',
    title: 'Analyze String',
    description: 'Process string with regex (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:analyze-string select="text" regex="\\b(\\w+)@(\\w+\\.\\w+)\\b">
  <xsl:matching-substring>
    <a href="mailto:{.}"><xsl:value-of select="."/></a>
  </xsl:matching-substring>
  <xsl:non-matching-substring>
    <xsl:value-of select="."/>
  </xsl:non-matching-substring>
</xsl:analyze-string>`
  },
  {
    id: 'function',
    title: 'Custom Function',
    description: 'Define custom function (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:function name="local:calculate-tax" as="xs:decimal">
  <xsl:param name="amount" as="xs:decimal"/>
  <xsl:param name="rate" as="xs:decimal"/>
  <xsl:sequence select="$amount * $rate"/>
</xsl:function>

<!-- Use: -->
<xsl:value-of select="local:calculate-tax(price, 0.08)"/>`
  },
  {
    id: 'sequence',
    title: 'Sequence',
    description: 'Return sequence from template (XSLT 2.0+)',
    category: 'patterns',
    xsltVersion: ['2.0', '3.0'],
    code: `<xsl:template name="get-values">
  <xsl:sequence select="(1, 2, 3, 4, 5)"/>
</xsl:template>`
  },
  {
    id: 'table-html',
    title: 'HTML Table Template',
    description: 'Generate HTML table from data',
    category: 'templates',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <xsl:for-each select="items/item">
      <tr>
        <td><xsl:value-of select="name"/></td>
        <td><xsl:value-of select="value"/></td>
      </tr>
    </xsl:for-each>
  </tbody>
</table>`
  },
  {
    id: 'list-html',
    title: 'HTML List Template',
    description: 'Generate HTML list from data',
    category: 'templates',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<ul>
  <xsl:for-each select="items/item">
    <li>
      <xsl:value-of select="name"/>
    </li>
  </xsl:for-each>
</ul>`
  },
  {
    id: 'position',
    title: 'Position and Count',
    description: 'Use position() and last()',
    category: 'patterns',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:for-each select="items/item">
  <div class="item">
    <span class="number"><xsl:value-of select="position()"/></span>
    <xsl:if test="position() != last()">, </xsl:if>
  </div>
</xsl:for-each>`
  },
  {
    id: 'mode',
    title: 'Template Mode',
    description: 'Use modes for different processing',
    category: 'templates',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:template match="item" mode="summary">
  <div class="summary">
    <xsl:value-of select="name"/>
  </div>
</xsl:template>

<xsl:template match="item" mode="detail">
  <div class="detail">
    <h3><xsl:value-of select="name"/></h3>
    <p><xsl:value-of select="description"/></p>
  </div>
</xsl:template>

<!-- Use: -->
<xsl:apply-templates select="items/item" mode="summary"/>`
  },
  {
    id: 'import',
    title: 'Import Stylesheet',
    description: 'Import another stylesheet',
    category: 'boilerplate',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:import href="common-templates.xsl"/>`
  },
  {
    id: 'include',
    title: 'Include Stylesheet',
    description: 'Include another stylesheet',
    category: 'boilerplate',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:include href="utilities.xsl"/>`
  },
  {
    id: 'text',
    title: 'Text Node',
    description: 'Output literal text',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:text>Some literal text</xsl:text>`
  },
  {
    id: 'comment',
    title: 'Comment',
    description: 'Output comment in result',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:comment>This is a comment in the output</xsl:comment>`
  },
  {
    id: 'processing-instruction',
    title: 'Processing Instruction',
    description: 'Output processing instruction',
    category: 'instructions',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:processing-instruction name="xml-stylesheet">
  type="text/css" href="style.css"
</xsl:processing-instruction>`
  },
  {
    id: 'namespace',
    title: 'Namespace Alias',
    description: 'Create namespace alias',
    category: 'boilerplate',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:namespace-alias stylesheet-prefix="xsl-out" result-prefix="xsl"/>`
  },
  {
    id: 'preserve-space',
    title: 'Preserve Space',
    description: 'Control whitespace handling',
    category: 'boilerplate',
    xsltVersion: ['1.0', '2.0', '3.0'],
    code: `<xsl:preserve-space elements="pre code"/>
<xsl:strip-space elements="*"/>`
  }
]

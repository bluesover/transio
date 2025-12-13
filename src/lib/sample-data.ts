export const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1" category="Programming">
    <title>Learning XSLT</title>
    <author>John Smith</author>
    <price>39.99</price>
    <year>2023</year>
  </book>
  <book id="2" category="Web Development">
    <title>Modern Web Design</title>
    <author>Jane Doe</author>
    <price>44.50</price>
    <year>2024</year>
  </book>
  <book id="3" category="Programming">
    <title>Advanced XML</title>
    <author>Bob Johnson</author>
    <price>49.99</price>
    <year>2023</year>
  </book>
  <book id="4" category="Database">
    <title>SQL Fundamentals</title>
    <author>Alice Williams</author>
    <price>34.99</price>
    <year>2024</year>
  </book>
</catalog>`

export const sampleXSLT = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Book Catalog</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          tr:hover { background-color: #ddd; }
        </style>
      </head>
      <body>
        <h1>Book Catalog</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="catalog/book">
              <xsl:sort select="title"/>
              <tr>
                <td><xsl:value-of select="title"/></td>
                <td><xsl:value-of select="author"/></td>
                <td><xsl:value-of select="@category"/></td>
                <td>$<xsl:value-of select="price"/></td>
                <td><xsl:value-of select="year"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>`

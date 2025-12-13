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

export const sampleXSLT20Grouping = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Book Catalog - Grouped by Category</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            background-color: #f5f5f5;
          }
          h1 { 
            color: #2c3e50; 
            text-align: center;
            margin-bottom: 30px;
          }
          .category-section {
            background: white;
            margin-bottom: 30px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h2 { 
            color: #3498db; 
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 0;
          }
          .book-count {
            background-color: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-left: 10px;
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin-top: 15px; 
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
          }
          th { 
            background-color: #34495e; 
            color: white;
            font-weight: 600;
          }
          tr:nth-child(even) { 
            background-color: #f9f9f9; 
          }
          tr:hover { 
            background-color: #e8f4f8; 
          }
          .price { 
            color: #27ae60; 
            font-weight: bold; 
          }
          .year { 
            color: #7f8c8d; 
          }
          .total-section {
            background: #ecf0f1;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-weight: bold;
            color: #2c3e50;
          }
        </style>
      </head>
      <body>
        <h1>Book Catalog - Grouped by Category</h1>
        
        <xsl:for-each-group select="catalog/book" group-by="@category">
          <xsl:sort select="current-grouping-key()"/>
          <div class="category-section">
            <h2>
              <xsl:value-of select="current-grouping-key()"/>
              <span class="book-count"><xsl:value-of select="count(current-group())"/> books</span>
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
                    <td class="price">$<xsl:value-of select="format-number(price, '#,##0.00')"/></td>
                    <td class="year"><xsl:value-of select="year"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            
            <div class="total-section">
              Category Total: $<xsl:value-of select="format-number(sum(current-group()/price), '#,##0.00')"/>
            </div>
          </div>
        </xsl:for-each-group>
        
        <div class="total-section" style="background: #3498db; color: white;">
          Grand Total: $<xsl:value-of select="format-number(sum(catalog/book/price), '#,##0.00')"/> 
          (<xsl:value-of select="count(catalog/book)"/> books)
        </div>
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>`

# 📁 Example Project Structure

This document shows what a typical project folder looks like when using the XML/XSLT Transformer's File System Access feature.

## Basic Project Folder

```
MyXSLTProject/
├── current.xml                    # Your active XML document
├── current.xslt                   # Your active XSLT stylesheet  
├── versions.json                  # Version control metadata
├── project-export.csv             # Spreadsheet export
├── launch-project.bat             # Windows quick launcher
├── launch-project.sh              # Mac/Linux quick launcher
├── version_v-123_1.0.0.xml        # Version 1.0.0 XML snapshot
├── version_v-123_1.0.0.xslt       # Version 1.0.0 XSLT snapshot
├── version_v-456_1.1.0.xml        # Version 1.1.0 XML snapshot
└── version_v-456_1.1.0.xslt       # Version 1.1.0 XSLT snapshot
```

## File Details

### current.xml
Your working XML document. Auto-saved every second after changes.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalog>
    <book id="1">
        <title>Introduction to XSLT</title>
        <author>John Smith</author>
        <price>29.99</price>
    </book>
    <!-- More books... -->
</catalog>
```

### current.xslt
Your working XSLT stylesheet. Auto-saved every second after changes.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head><title>Book Catalog</title></head>
            <body>
                <h1>Books</h1>
                <xsl:apply-templates select="catalog/book"/>
            </body>
        </html>
    </xsl:template>
    <!-- More templates... -->
</xsl:stylesheet>
```

### versions.json
Metadata about all saved versions in JSON format.

```json
[
  {
    "id": "v-1234567890-abc123",
    "version": "1.0.0",
    "description": "Initial version with basic book listing",
    "xml": "<?xml version=\"1.0\"...",
    "xslt": "<?xml version=\"1.0\"...",
    "xsltVersion": "1.0",
    "createdAt": 1704067200000,
    "isReleased": false
  },
  {
    "id": "v-1234567900-def456",
    "version": "1.1.0",
    "description": "Added filtering by category\n- New template for categories\n- Price formatting",
    "xml": "<?xml version=\"1.0\"...",
    "xslt": "<?xml version=\"1.0\"...",
    "xsltVersion": "2.0",
    "createdAt": 1704153600000,
    "isReleased": true,
    "releaseNotes": "Production-ready release with category filtering"
  }
]
```

### project-export.csv
All version data in CSV format for spreadsheets.

```csv
Version,Description,Created,XSLT_Version,Released,Release_Notes,XML_Lines,XSLT_Lines
"1.0.0","Initial version with basic book listing","2024-01-15T10:30:00.000Z","1.0","No","",45,89
"1.1.0","Added filtering by category - New template for categories - Price formatting","2024-01-20T14:00:00.000Z","2.0","Yes","Production-ready release with category filtering",45,112
```

### launch-project.bat (Windows)
Quick launcher script for Windows users.

```batch
@echo off
title XML/XSLT Transformer - Project: MyXSLTProject
color 0A

echo ================================================
echo    XML/XSLT Transformer
echo    Project: MyXSLTProject
echo ================================================
echo.
echo Starting application...
echo.

REM Open your deployed app
start "" "https://your-app.netlify.app/"

echo.
echo Application opened in browser.
echo Your project data is in this folder.
echo.
echo Click the Folder button in the app to
echo select this folder and load your project.
echo.
pause
```

### launch-project.sh (Mac/Linux)
Quick launcher script for Mac and Linux users.

```bash
#!/bin/bash

clear

echo "================================================"
echo "   XML/XSLT Transformer"
echo "   Project: MyXSLTProject"
echo "================================================"
echo ""
echo "Starting application..."
echo ""

# Open your deployed app
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://your-app.netlify.app/"
else
    xdg-open "https://your-app.netlify.app/" 2>/dev/null
fi

echo ""
echo "Application opened in browser."
echo "Your project data is in this folder."
echo ""
echo "Press any key to close..."
read -n 1 -s
```

### version_*.xml & version_*.xslt
Snapshots of specific versions. Created when you click "Save Version".

Filename format: `version_{unique-id}_{version-number}.{ext}`

Examples:
- `version_v-1234567890-abc123_1.0.0.xml`
- `version_v-1234567890-abc123_1.0.0.xslt`
- `version_v-1234567900-def456_1.1.0.xml`
- `version_v-1234567900-def456_1.1.0.xslt`

## Advanced Project Structure

For larger projects, you might organize like this:

```
XSLTProjects/
├── BookCatalog/
│   ├── current.xml
│   ├── current.xslt
│   ├── versions.json
│   ├── project-export.csv
│   ├── launch-project.bat
│   ├── launch-project.sh
│   └── (version files...)
│
├── InvoiceSystem/
│   ├── current.xml
│   ├── current.xslt
│   ├── versions.json
│   ├── project-export.csv
│   ├── launch-project.bat
│   ├── launch-project.sh
│   └── (version files...)
│
├── DataReports/
│   ├── current.xml
│   ├── current.xslt
│   ├── versions.json
│   ├── project-export.csv
│   ├── launch-project.bat
│   ├── launch-project.sh
│   └── (version files...)
│
└── Shared/
    ├── common-templates.xslt
    ├── sample-data.xml
    └── README.md
```

## Workflow Example

### Starting a New Project

1. **Create Project Folder**
   ```
   C:\Users\YourName\Documents\XSLTProjects\BookCatalog\
   ```

2. **Open App**
   - Go to https://your-app.netlify.app/
   - Or run locally: `npm run dev`

3. **Connect Folder**
   - Click Folder icon 📁
   - Select your project folder
   - Grant permission

4. **Start Working**
   - Type XML in the XML editor
   - Type XSLT in the XSLT editor
   - Files auto-save to folder

5. **Save Versions**
   - Click Save button (Ctrl+S)
   - Enter version: `1.0.0`
   - Enter description
   - Version files created in folder

6. **Generate Launchers**
   - Click Rocket icon 🚀
   - Launcher files created
   - Double-click to quick-launch project

7. **Export Data**
   - Click CSV icon 📄
   - Open CSV in Excel
   - Share with team

### Switching Between Projects

**Method 1: Through App**
1. Click Folder icon
2. Select different project folder
3. Data loads automatically

**Method 2: Launcher Scripts**
1. Double-click `launch-project.bat` in project folder
2. App opens in browser
3. Click Folder icon and select that folder

### Sharing Projects

**Method 1: Whole Folder**
```
# Zip and share
MyXSLTProject.zip → Email or Cloud Storage
```

**Method 2: Just Versions**
```
# Share specific version files
version_v-456_1.1.0.xml
version_v-456_1.1.0.xslt
```

**Method 3: CSV Export**
```
# Share metadata
project-export.csv → Import to Excel/Sheets
```

## Backup Strategies

### Cloud Sync
Put your projects folder in:
- OneDrive: `C:\Users\YourName\OneDrive\XSLTProjects\`
- Dropbox: `C:\Users\YourName\Dropbox\XSLTProjects\`
- Google Drive: `C:\Users\YourName\Google Drive\XSLTProjects\`

Auto-syncs to cloud. Access from any device.

### Git Version Control
```bash
cd MyXSLTProject
git init
git add .
git commit -m "Initial project"

# Push to GitHub/GitLab
git remote add origin https://github.com/user/project.git
git push -u origin main
```

### Manual Backup
```bash
# Monthly archive
zip -r MyXSLTProject-2024-01.zip MyXSLTProject/
```

## File Size Considerations

### Typical Sizes
- `current.xml`: 10KB - 5MB
- `current.xslt`: 5KB - 100KB
- `versions.json`: 1KB per version
- `project-export.csv`: 1KB per 10 versions
- Version files: Same as current files

### Storage Requirements
- **Light project** (5 versions): < 10MB
- **Medium project** (20 versions): < 50MB
- **Heavy project** (100 versions): < 500MB

### Cleanup
If project folder gets large:
1. Delete old version files
2. Keep only recent versions in folder
3. Archive older versions elsewhere
4. CSV export preserves metadata

## Best Practices

1. **Regular Versions**
   - Save version after significant changes
   - Use semantic versioning (1.0.0, 1.1.0, 2.0.0)
   - Write descriptive notes

2. **Meaningful Names**
   - Project folders: `BookCatalog` not `Project1`
   - Versions: `1.0.0` not `v1`

3. **Backup Often**
   - Cloud sync recommended
   - Export CSV weekly
   - Git commits for important changes

4. **Clean Workspace**
   - Archive old projects
   - Delete temporary files
   - Keep folder organized

5. **Document**
   - Add README.md to project folders
   - Include sample data
   - Document transformation purpose

## Troubleshooting

### Files Not Saving
- Check folder permissions
- Verify using Chrome/Edge/Brave
- Wait 1 second (auto-save delay)
- Check Activity Log for errors

### Can't Find Project Files
- Check correct folder selected
- Look for folder name in header
- Files are named `current.xml` and `current.xslt`

### Version Files Accumulating
- This is normal
- Each version creates 2 files
- Delete old versions if needed
- Keep important versions only

### Launcher Not Working
- Edit file and update URL
- Check file permissions (executable)
- Verify app URL is correct

---

**Your project folder is your workspace. Keep it organized, back it up, and share it freely!**

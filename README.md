# XML/XSLT Transformer

A professional-grade XML to XSLT transformation tool supporting XSLT 1.0, 2.0, and 3.0 with comprehensive developer features.

## Features

### Core Transformation
- **Multi-version XSLT Support**: XSLT 1.0 (browser XSLTProcessor), 2.0/3.0 (Saxon-JS)
- **Auto-detection**: Automatically detects XSLT version from stylesheet
- **Manual Override**: Version selector dropdown to override detected version
- **Real-time Validation**: Syntax error detection with line numbers
- **Performance Metrics**: Shows transformation time and processor used

### Themes
- **3 App Themes**: Light, Dark, and Black themes with optimized colors
- **10 Editor Themes**: VS Code Dark, GitHub Dark, Tokyo Night, Dracula, Monokai, Solarized Dark, Nord, Gruvbox Dark, Material Dark, Atom One
- **Theme Persistence**: Your theme choice is saved between sessions
- **Quick Toggle**: Click the sun/moon icon to cycle between themes

### Code Editing
- **CodeMirror 6**: Professional code editor with syntax highlighting
- **Auto-formatting**: Format XML and XSLT with Ctrl+Shift+F/G
- **Line Numbers**: Easy navigation and error location
- **Import/Export**: Load and save files with proper MIME types

### Version Control
- **Semantic Versioning**: Save versions with version numbers (e.g., 1.0.0)
- **Descriptions**: Add markdown descriptions to document changes
- **Version History**: Browse and load previous versions
- **Release Management**: Mark versions as released with release notes
- **Metadata Tracking**: Tracks XSLT version, timestamps, and status

### Project Management
- **File System Integration**: Uses File System Access API (Chromium browsers)
- **Auto-save**: Automatically saves current files every second
- **Version Files**: Saves each version as separate XML/XSLT files
- **Metadata Persistence**: Stores version metadata in versions.json
- **Project Loading**: Load entire projects from local folders

### XSLT Snippets
- **40+ Templates**: Ready-to-use XSLT patterns and boilerplate
- **Categories**: Organized by boilerplate, templates, loops, conditionals, instructions, variables, patterns
- **Search & Filter**: Find snippets quickly and filter by XSLT version
- **Version Compatibility**: Shows which XSLT versions support each snippet
- **Copy or Insert**: Copy to clipboard or insert directly into editor

### Developer Tools
- **Activity Log**: Tracks all operations with timestamps
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Mobile Responsive**: Tabs on mobile, split-pane on desktop
- **Toast Notifications**: Visual feedback for all actions
- **Help Dialog**: Complete keyboard shortcut reference

## Keyboard Shortcuts

- **Ctrl+Enter**: Transform XML with XSLT
- **Ctrl+S**: Save current version
- **Ctrl+K**: Open snippets panel
- **Ctrl+Shift+F**: Format XML
- **Ctrl+Shift+G**: Format XSLT
- **Ctrl+Shift+I**: Import XML file
- **Ctrl+Shift+O**: Import XSLT file
- **Ctrl+Shift+E**: Export output
- **?**: Show keyboard shortcuts help

## Getting Started

1. **Edit XML**: Enter or paste your XML data in the left editor
2. **Write XSLT**: Create your XSLT stylesheet in the right editor
3. **Transform**: Click the Transform button or press Ctrl+Enter
4. **View Output**: See the transformed result in the output panel
5. **Save Version**: Press Ctrl+S to save your work as a version

## Example Use Cases

### Basic HTML Table Generation
Transform a book catalog XML into a styled HTML table (sample provided on first load).

### Advanced Grouping (XSLT 2.0+)
Use the for-each-group snippet to group items by category or other attributes.

### Pattern Matching
Apply different templates based on element types or attributes.

### Multiple Output Files (XSLT 2.0+)
Use result-document to generate separate files for each item.

## Browser Compatibility & File System Access

### Full Support (Chromium browsers)
- **Chrome, Edge, Opera**: All features including File System API
- File imports/exports work without issues
- Project folder management with auto-save

### Limited Support (Non-Chromium browsers)
- **Firefox, Safari**: All transformation features work, but no File System API
- File imports still work via standard file picker
- No project folder management or auto-save to disk
- All data persists in browser storage via Spark KV

### File Import/Export CORS Issues

**The Problem:**
When using the file import feature (Ctrl+Shift+I/O), browsers enforce CORS policies that can cause issues when files are accessed via `file://` protocol.

**Solutions for Production:**

1. **Recommended: Deploy via HTTPS**
   - Host the app on any static hosting service (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
   - HTTPS deployments don't have CORS issues with File System API
   - Users can still access local files through the browser's file picker

2. **Local Development: Use the Dev Server**
   - Always run `npm run dev` instead of opening `index.html` directly
   - The Vite dev server runs on `http://localhost:5173` (no CORS issues)
   - File imports work correctly through the file picker API

3. **File System Access API (Chromium only)**
   - Click the folder icon to select a project folder
   - This grants persistent access to that folder
   - Auto-save and project management work seamlessly
   - No CORS issues since you explicitly grant access

**What DOESN'T Work:**
- Opening `index.html` directly in the browser (`file://` protocol)
- This triggers CORS errors when trying to import files
- Solution: Always use `npm run dev` or deploy to production

**Production Deployment Steps:**
```bash
# Build for production
npm run build

# Deploy the 'dist' folder to any static host
# Examples:
# - Netlify: netlify deploy --dir=dist
# - Vercel: vercel --prod
# - GitHub Pages: push to gh-pages branch
```

Once deployed, all file operations work correctly through the browser's security model.

## Technical Stack

- **React 19** with TypeScript
- **Vite 7** for development and building
- **Tailwind CSS 4** for styling
- **shadcn/ui v4** component library
- **CodeMirror 6** for code editing
- **Saxon-JS 2.7** for XSLT 2.0/3.0 support
- **Phosphor Icons** (bold weight)
- **Sonner** for toast notifications

## Data Persistence

All data is stored locally using the Spark KV store:
- XML and XSLT input persist across sessions
- Version history is saved automatically
- Editor theme, app theme, and XSLT version preferences are remembered
- Activity log maintains operation history

## License

Built with Spark - a GitHub project template system.

# Transio Project Structure

**Clean, organized, and ready for production deployment.**

## 📁 Essential Files & Directories

```
transio/
├── 📄 Documentation (4 files)
│   ├── PRD.md              # Product Requirements Document
│   ├── README.md           # User documentation & quick start
│   ├── DEPLOYMENT.md       # Cloudflare Pages deployment guide
│   └── LICENSE             # MIT License
│
├── 💻 Application Code
│   └── src/
│       ├── App.tsx                    # Main application component
│       ├── ErrorFallback.tsx          # Error boundary
│       ├── index.css                  # Theme & styles
│       ├── main.tsx                   # Application entry (DO NOT EDIT)
│       ├── main.css                   # Structural CSS (DO NOT EDIT)
│       │
│       ├── components/
│       │   ├── ui/                    # shadcn components (45 files)
│       │   ├── AboutDialog.tsx
│       │   ├── ActivityLog.tsx
│       │   ├── CodeEditor.tsx
│       │   ├── DeployInfoDialog.tsx
│       │   ├── DonationDialog.tsx
│       │   ├── FooterInfo.tsx
│       │   ├── KeyboardShortcutsDialog.tsx
│       │   ├── SaveVersionDialog.tsx
│       │   ├── ServerConfigDialog.tsx
│       │   ├── SnippetsSheet.tsx
│       │   ├── VersionPanel.tsx
│       │   └── XSLTInfoDialog.tsx
│       │
│       ├── hooks/
│       │   ├── use-file-system.ts
│       │   ├── use-keyboard-shortcuts.ts
│       │   └── use-mobile.ts
│       │
│       ├── lib/
│       │   ├── editor-themes.ts
│       │   ├── output-formatter.ts
│       │   ├── sample-data.ts
│       │   ├── snippets.ts
│       │   ├── types.ts
│       │   ├── utils.ts
│       │   └── xslt-processor.ts
│       │
│       ├── styles/
│       │   └── theme.css
│       │
│       └── assets/
│           ├── images/
│           ├── video/
│           ├── audio/
│           └── documents/
│
├── ⚙️ Configuration Files
│   ├── package.json           # Dependencies & scripts
│   ├── package-lock.json      # Locked dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vite.config.ts         # Vite bundler config (DO NOT EDIT)
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── components.json        # shadcn configuration
│   ├── theme.json             # Theme metadata
│   ├── wrangler.toml          # Cloudflare Pages config
│   ├── netlify.toml           # Netlify config (alternative)
│   ├── vercel.json            # Vercel config (alternative)
│   ├── index.html             # HTML entry point
│   ├── _headers               # HTTP headers config
│   └── .gitignore             # Git ignore rules
│
├── 🖥️ Optional Server (XSLT 2.0/3.0 Enhancement)
│   └── server/
│       ├── README.md              # Complete server documentation
│       ├── index.js               # Express server
│       ├── package.json           # Server dependencies
│       ├── .env.example           # Environment template
│       │
│       ├── scripts/
│       │   ├── download-saxon.js
│       │   ├── extract-saxon.js
│       │   ├── install-java-check.js
│       │   └── start-dev.js
│       │
│       ├── Installation Scripts
│       │   ├── install.sh         # Mac/Linux installer
│       │   ├── install.bat        # Windows installer
│       │   └── install.js         # Cross-platform installer
│       │
│       ├── Launcher Scripts
│       │   ├── start-server.sh    # Mac/Linux production
│       │   ├── start-server.bat   # Windows production
│       │   ├── start-server-dev.sh    # Mac/Linux dev mode
│       │   └── start-server-dev.bat   # Windows dev mode
│       │
│       ├── Test Scripts
│       │   ├── test-server.sh     # Mac/Linux test
│       │   ├── test-server.bat    # Windows test
│       │   └── test-connection.js # Connection test
│       │
│       └── Docker Support
│           ├── Dockerfile
│           ├── docker-compose.yml
│           └── nodemon.json       # Auto-restart config
│
└── 🔧 Development Tools
    ├── node_modules/          # Installed packages (auto-generated)
    ├── dist/                  # Production build (auto-generated)
    ├── .git/                  # Git repository
    └── spark.meta.json        # Spark metadata

```

## 📊 Project Statistics

- **Total Files**: ~120 essential files
- **Documentation**: 4 markdown files (was 80+)
- **Source Code**: 25+ TypeScript/React components
- **UI Components**: 45+ shadcn components
- **Configuration**: 15 config files
- **Server Files**: 20+ files (optional)

## 🧹 What Was Removed

Cleaned up **80+ unnecessary files** including:

- ✗ Duplicate deployment guides (kept DEPLOYMENT.md)
- ✗ Multiple "getting started" docs (kept README.md)
- ✗ Status updates and changelogs
- ✗ Visual guides and diagrams
- ✗ Troubleshooting duplicates
- ✗ Old cleanup scripts
- ✗ Duplicate server launchers
- ✗ Unnecessary test scripts

## 🎯 File Purposes

### Core Documentation

| File | Purpose |
|------|---------|
| **PRD.md** | Complete product specification, features, design system |
| **README.md** | User guide, quick start, keyboard shortcuts, FAQ |
| **DEPLOYMENT.md** | Production deployment to Cloudflare Pages with custom domain |
| **LICENSE** | MIT License with third-party attribution |

### Application Entry Points

| File | Purpose | Editable? |
|------|---------|-----------|
| **index.html** | HTML shell with meta tags & fonts | ✅ Yes |
| **src/main.tsx** | React root mounting | ❌ No - Managed by runtime |
| **src/main.css** | Structural imports | ❌ No - Managed by runtime |
| **src/App.tsx** | Main application component | ✅ Yes |
| **src/index.css** | Theme colors & custom styles | ✅ Yes |

### Build Configuration

| File | Purpose | Editable? |
|------|---------|-----------|
| **package.json** | Dependencies & npm scripts | ⚠️ Edit with npm commands |
| **vite.config.ts** | Vite bundler settings | ❌ No - Optimized for runtime |
| **tsconfig.json** | TypeScript compiler options | ⚠️ Rarely needed |
| **tailwind.config.js** | Tailwind utility classes | ✅ Yes |
| **wrangler.toml** | Cloudflare deployment | ✅ Yes |

### Server Configuration

| File | Purpose |
|------|---------|
| **server/README.md** | Complete server documentation |
| **server/index.js** | Express API server |
| **server/.env** | Environment variables (create from .env.example) |
| **server/install.sh/bat** | One-click Saxon-HE installer |

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Build
npm run build            # Production build to dist/

# Preview
npm run preview          # Preview production build

# Server (Optional)
cd server
./install.sh             # Install Saxon-HE (one-time)
./start-server.sh        # Start server (production)
./start-server-dev.sh    # Start with auto-restart (development)

# Deploy
npm run build
npx wrangler pages deploy dist --project-name=transio
```

## 📚 Where to Find Information

| Need to... | Look at... |
|------------|------------|
| Understand the product | **PRD.md** |
| Get started as a user | **README.md** |
| Deploy to production | **DEPLOYMENT.md** |
| Setup Saxon server | **server/README.md** |
| Understand code structure | This file |
| Check licenses | **LICENSE** |
| Modify UI components | **src/components/** |
| Change theme colors | **src/index.css** |
| Add XSLT snippets | **src/lib/snippets.ts** |
| Modify transformation logic | **src/lib/xslt-processor.ts** |

## 🎨 Design System

Defined in **src/index.css**:

```css
:root {
  /* Primary brand color - Purple-blue */
  --primary: oklch(0.45 0.25 265);
  
  /* Accent action color - Warm orange */
  --accent: oklch(0.55 0.22 25);
  
  /* Background - Soft cream */
  --background: oklch(0.98 0.005 85);
  
  /* Text - Dark purple */
  --foreground: oklch(0.15 0.03 265);
}
```

**Fonts:**
- UI: Inter (Google Fonts)
- Code: JetBrains Mono (Google Fonts)

**App Themes:** Light, Dark, Black (toggle in header)

**Editor Themes:** 13 themes including VS Code, GitHub, Tokyo Night, Dracula

## ⚙️ Technology Stack

**Frontend:**
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- shadcn/ui v4
- CodeMirror 6

**XSLT Processing:**
- Browser: XSLTProcessor (XSLT 1.0)
- Client-side: Saxon-JS (XSLT 2.0/3.0)
- Server-side: Saxon-HE via Node.js API (optional)

**Icons:** Phosphor Icons (bold weight)
**Notifications:** Sonner
**Storage:** Spark KV (IndexedDB wrapper)
**File System:** File System Access API (Chrome/Edge)

## 🔒 Privacy & Data

**100% Local Processing**
- All transformations happen in browser or local server
- No data sent to external servers
- No tracking or analytics
- No user accounts required

**Storage Mechanisms:**
1. **Browser Storage** (Spark KV / IndexedDB)
   - Settings, versions, activity log
   - Persists between sessions
   
2. **File System** (Optional)
   - Real files on disk via File System Access API
   - Auto-save every 1 second
   - Chrome/Edge/Brave only

## 📦 Dependencies

All dependencies are **open source** with **permissive licenses**:

- React, Vite, Tailwind → MIT
- Saxon-JS → MPL-2.0
- All other packages → MIT

See **package.json** for complete list.

## 🛠️ Development Workflow

1. **Clone & Setup**
   ```bash
   git clone <repo>
   cd transio
   npm install
   ```

2. **Develop**
   ```bash
   npm run dev
   # Edit files in src/
   # Changes hot-reload automatically
   ```

3. **Build & Test**
   ```bash
   npm run build
   npm run preview
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   # Cloudflare auto-deploys on push
   ```

## ✅ Project Health Checklist

- [x] Documentation consolidated to 4 essential files
- [x] All 80+ unnecessary files removed
- [x] Clean directory structure
- [x] Clear separation: app code vs server code
- [x] All licenses documented and compatible
- [x] Build process optimized
- [x] Deployment guides complete
- [x] Server setup automated
- [x] Code organized by feature
- [x] Type safety with TypeScript
- [x] Mobile responsive
- [x] Privacy-first architecture

## 🎉 Ready for Production

Your project is now:
- ✅ **Clean** - No unnecessary files
- ✅ **Documented** - Complete guides for users and developers
- ✅ **Organized** - Clear file structure
- ✅ **Deployable** - Ready for Cloudflare Pages
- ✅ **Open Source** - MIT License, all dependencies compatible
- ✅ **Production-Ready** - Optimized build, security headers, CORS

**Next Step:** Follow **DEPLOYMENT.md** to deploy to transio.org

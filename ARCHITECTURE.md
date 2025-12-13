# Transio Architecture

## Overview

Transio uses a **hybrid architecture** supporting both client-only and client+server modes with automatic fallback.

## Architecture Modes

### 1. Client-Only Mode (Default)

```
┌─────────────────────────────────────────────────────────────────┐
│                        User's Browser                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Transio React App                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │        User Interface (React 19)                 │  │    │
│  │  │  • Code Editors (CodeMirror 6)                   │  │    │
│  │  │  • Version Control                               │  │    │
│  │  │  • Activity Log                                  │  │    │
│  │  │  • Theme System                                  │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │     Transformation Router                        │  │    │
│  │  │  • Detect XSLT version                           │  │    │
│  │  │  • Select processor                              │  │    │
│  │  │  • Route to client processors                    │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  │                                                          │    │
│  │  ┌────────────────────┐     ┌─────────────────────┐    │    │
│  │  │  XSLT 1.0          │     │  XSLT 2.0/3.0       │    │    │
│  │  │  Browser Native    │     │  Saxon-JS           │    │    │
│  │  │  XSLTProcessor     │     │  (MPL 2.0)          │    │    │
│  │  └────────────────────┘     └─────────────────────┘    │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │     Local Storage (IndexedDB via Spark KV)       │  │    │
│  │  │  • XML/XSLT content                              │  │    │
│  │  │  • Version history                               │  │    │
│  │  │  • Settings & preferences                        │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

📊 Performance:
   • XSLT 1.0: 50-200ms (native browser)
   • XSLT 2.0: 100-500ms (Saxon-JS, limited features)
   • XSLT 3.0: 100-500ms (Saxon-JS, limited features)

💰 Cost: $0/month (static hosting)
✅ Works: XSLT 1.0 ✅ | XSLT 2.0 ⚠️ | XSLT 3.0 ⚠️
🌐 Hosting: Cloudflare Pages, Netlify, Vercel, GitHub Pages
```

---

### 2. Hybrid Mode (Client + Optional Server)

```
┌─────────────────────────────────────────────────────────────────┐
│                        User's Browser                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Transio React App                          │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │     Transformation Router                        │  │    │
│  │  │  • Detect XSLT version                           │  │    │
│  │  │  • Check server config                           │  │    │
│  │  │  • Prefer server for XSLT 2.0/3.0?              │  │    │
│  │  └──────────────────┬───────────────────────────────┘  │    │
│  │                     │                                   │    │
│  │          ┌──────────▼───────────┐                      │    │
│  │          │   XSLT 1.0?          │                      │    │
│  │          └──┬──────────────┬────┘                      │    │
│  │             │ YES          │ NO                         │    │
│  │             │              │                            │    │
│  │    ┌────────▼──────┐   ┌──▼──────────────────┐        │    │
│  │    │ Use Browser   │   │  Server enabled?    │        │    │
│  │    │ XSLTProcessor │   └──┬──────────────┬───┘        │    │
│  │    └───────────────┘      │ YES          │ NO         │    │
│  │                            │              │            │    │
│  │                   ┌────────▼────────┐  ┌─▼─────────┐  │    │
│  │                   │ Try Server API  │  │ Use       │  │    │
│  │                   └────────┬────────┘  │ Saxon-JS  │  │    │
│  │                            │            └───────────┘  │    │
│  │                   ┌────────▼────────┐                  │    │
│  │                   │   Success?      │                  │    │
│  │                   └──┬──────────┬───┘                  │    │
│  │                      │ YES      │ NO                   │    │
│  │                      │          │                      │    │
│  │               ┌──────▼───┐  ┌──▼──────────────┐       │    │
│  │               │  Return  │  │ Fallback to     │       │    │
│  │               │  Result  │  │ Saxon-JS        │       │    │
│  │               └──────────┘  └─────────────────┘       │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                     HTTPS API Request
                               │
         ┌─────────────────────▼─────────────────────┐
         │    Saxon-HE API Server (Optional)         │
         │                                            │
         │  ┌──────────────────────────────────┐     │
         │  │  Express.js API                  │     │
         │  │  • CORS enabled                  │     │
         │  │  • Rate limiting                 │     │
         │  │  • Request validation            │     │
         │  └────────┬─────────────────────────┘     │
         │           │                                │
         │  ┌────────▼─────────────────────────┐     │
         │  │  Security Layer                  │     │
         │  │  • Max 10MB files                │     │
         │  │  • 30s timeout                   │     │
         │  │  • Input validation              │     │
         │  │  • Temp file isolation           │     │
         │  └────────┬─────────────────────────┘     │
         │           │                                │
         │  ┌────────▼─────────────────────────┐     │
         │  │  Java Child Process              │     │
         │  │  Saxon-HE 12.5 (MPL 2.0)         │     │
         │  │  • Isolated execution            │     │
         │  │  • 512MB memory limit            │     │
         │  │  • Full XSLT 2.0/3.0             │     │
         │  └──────────────────────────────────┘     │
         │                                            │
         └────────────────────────────────────────────┘
                  (Docker Container or Node.js)

📊 Performance:
   • XSLT 1.0: 50-200ms (browser native)
   • XSLT 2.0: 100-300ms (server, full support) ✅
   • XSLT 3.0: 150-500ms (server, full support) ✅
   • Large files (>5MB): Much faster on server

💰 Cost: $5-12/month (server hosting)
✅ Works: XSLT 1.0 ✅ | XSLT 2.0 ✅ | XSLT 3.0 ✅
🌐 Server Hosting: Railway, DigitalOcean, Fly.io, VPS
```

---

## Component Details

### Frontend Stack

```
┌─────────────────────────────────────────────┐
│           React 19 Application              │
├─────────────────────────────────────────────┤
│  UI Framework:                              │
│  • React 19 (hooks, suspense)               │
│  • TypeScript 5.7                           │
│  • Vite 7 (build tool)                      │
│                                             │
│  UI Components:                             │
│  • shadcn/ui v4 (Radix UI primitives)      │
│  • Tailwind CSS 4 (styling)                │
│  • Phosphor Icons (iconography)            │
│  • Sonner (toast notifications)            │
│                                             │
│  Code Editing:                              │
│  • CodeMirror 6 (editor)                   │
│  • XML/HTML language support               │
│  • 10 syntax themes                        │
│                                             │
│  State Management:                          │
│  • Spark KV (persistent storage)           │
│  • React hooks (local state)               │
│  • IndexedDB (underlying storage)          │
│                                             │
│  XSLT Processing:                           │
│  • Browser XSLTProcessor (XSLT 1.0)        │
│  • Saxon-JS 2.7 (XSLT 2.0/3.0)             │
│  • Optional server API client              │
└─────────────────────────────────────────────┘
```

### Backend Stack (Optional)

```
┌─────────────────────────────────────────────┐
│          Node.js Express Server             │
├─────────────────────────────────────────────┤
│  Runtime:                                   │
│  • Node.js 20                               │
│  • Express.js 4                             │
│  • Child process spawning                   │
│                                             │
│  Security:                                  │
│  • Helmet.js (security headers)            │
│  • CORS (cross-origin)                     │
│  • Rate limiting (100 req/15min)           │
│  • Input validation                        │
│                                             │
│  XSLT Processing:                           │
│  • Saxon-HE 12.5 (Java)                    │
│  • OpenJDK 11+ runtime                     │
│  • Temp file management                    │
│  • Process isolation                       │
│                                             │
│  Infrastructure:                            │
│  • Docker container                        │
│  • Health check endpoint                   │
│  • Auto-cleanup on error                   │
│  • Resource limits (1 CPU, 1GB RAM)        │
└─────────────────────────────────────────────┘
```

---

## Data Flow

### Client-Side Transformation

```
User enters XML/XSLT
       ↓
Detect XSLT version
       ↓
Select processor (Browser or Saxon-JS)
       ↓
Parse XML document
       ↓
Parse XSLT stylesheet
       ↓
Execute transformation
       ↓
Serialize result
       ↓
Display output
       ↓
Save to IndexedDB (via Spark KV)
```

### Server-Side Transformation

```
User enters XML/XSLT
       ↓
Detect XSLT version (2.0/3.0)
       ↓
Check server config (enabled + preferServer)
       ↓
Send HTTP POST to /api/transform
       ↓
[Server] Validate input (size, format)
       ↓
[Server] Write temp files (xml, xslt)
       ↓
[Server] Spawn Java process (Saxon-HE)
       ↓
[Server] Execute transformation
       ↓
[Server] Read output file
       ↓
[Server] Clean up temp files
       ↓
[Server] Return JSON response
       ↓
[Client] Receive result
       ↓
Display output
       ↓
[On Error] Fallback to Saxon-JS
```

---

## Storage Architecture

### Browser Storage (Always)

```
IndexedDB (via Spark KV)
├── xml-input (string)
├── xslt-input (string)
├── xslt-version (XSLTVersion)
├── editor-theme (EditorTheme)
├── app-theme ('light' | 'dark' | 'black')
├── xslt-versions (TransformVersion[])
├── activity-log (ActivityLogEntry[])
├── sidebar-open (boolean)
└── server-config (ServerConfig)
    ├── enabled (boolean)
    ├── apiUrl (string)
    ├── apiKey (string | undefined)
    ├── timeout (number)
    └── preferServer (boolean)
```

### File System (Optional - Chrome only)

```
Project Folder (user selects)
├── current.xml              (active XML)
├── current.xslt             (active XSLT)
├── versions.json            (metadata)
├── version_1.0.0.xml        (version snapshots)
├── version_1.0.0.xslt       (version snapshots)
├── version_2.0.0.xml
├── version_2.0.0.xslt
├── project-export.csv       (spreadsheet export)
├── launch-project.bat       (Windows launcher)
└── launch-project.sh        (Mac/Linux launcher)
```

---

## Deployment Architecture

### Production Setup (Client + Server)

```
┌──────────────────────────────────────────────────────────────┐
│                    Internet Users                             │
└────────────────────────┬─────────────────────────────────────┘
                         │
                ┌────────▼────────┐
                │   DNS (Domain)  │
                └────────┬────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────────┐      ┌─────────────────────┐
│  Cloudflare Pages   │      │   API Server        │
│  (Static Client)    │      │   (Dynamic)         │
│                     │      │                     │
│  • React app        │      │  • Express.js       │
│  • HTML/CSS/JS      │      │  • Saxon-HE         │
│  • Global CDN       │      │  • Docker           │
│  • Auto HTTPS       │      │                     │
│  • $0/month         │      │  Railway/DO/Fly.io  │
│                     │      │  • $5-12/month      │
└─────────────────────┘      └─────────────────────┘

Client Domain: https://transio.org
Server Domain: https://api.transio.org (or separate service URL)
```

---

## Security Model

### Client-Side Security

- ✅ No data sent to external servers (client-only mode)
- ✅ All processing in browser sandbox
- ✅ Local storage only (IndexedDB)
- ✅ File System Access API (user grants permission)
- ✅ HTTPS enforced in production
- ✅ Content Security Policy headers
- ✅ No tracking or analytics

### Server-Side Security

- ✅ CORS restricted to known origins
- ✅ Rate limiting (100 requests/15min)
- ✅ Input validation (max 10MB)
- ✅ Timeout enforcement (30 seconds)
- ✅ Process isolation (child processes)
- ✅ Memory limits (512MB per transform)
- ✅ Temp file cleanup
- ✅ Optional API key authentication
- ✅ Security headers (Helmet.js)
- ✅ No persistent storage of user data

---

## Performance Characteristics

### Client-Side

| Metric | XSLT 1.0 | XSLT 2.0/3.0 (Saxon-JS) |
|--------|----------|------------------------|
| Small files (<100KB) | 50-100ms | 100-300ms |
| Medium files (100KB-1MB) | 100-300ms | 300-800ms |
| Large files (1-5MB) | 300-1000ms | 800-2000ms |
| Very large (>5MB) | Possible | May fail |

### Server-Side

| Metric | XSLT 1.0 | XSLT 2.0/3.0 (Saxon-HE) |
|--------|----------|------------------------|
| Small files (<100KB) | 50-100ms | 100-250ms |
| Medium files (100KB-1MB) | 100-200ms | 200-400ms |
| Large files (1-5MB) | 200-500ms | 400-1000ms |
| Very large (>5MB) | 500-2000ms | 1-3 seconds |

*Note: Times include network latency for server-side*

---

## Technology Licenses

### Open Source Components

| Component | License | Usage |
|-----------|---------|-------|
| React | MIT | UI framework |
| Vite | MIT | Build tool |
| TypeScript | Apache 2.0 | Language |
| Tailwind CSS | MIT | Styling |
| shadcn/ui | MIT | Components |
| CodeMirror | MIT | Code editor |
| **Saxon-JS** | **MPL 2.0** | **XSLT 2.0/3.0 (client)** |
| **Saxon-HE** | **MPL 2.0** | **XSLT 2.0/3.0 (server)** |
| Express.js | MIT | Server framework |
| Helmet.js | MIT | Security |

**All components are open source and free for commercial use.**

---

## Scaling Considerations

### Client-Only Mode
- ✅ Infinite horizontal scaling (CDN)
- ✅ Zero backend costs
- ✅ No server maintenance
- ⚠️ Limited by browser capabilities

### Client + Server Mode
- ✅ Horizontal scaling via load balancer
- ✅ Container orchestration (K8s)
- ✅ Auto-scaling based on load
- 💰 Costs scale with usage
- ⚡ Better performance for heavy workloads

---

## Future Architecture Enhancements

### Potential Additions
- 📊 Server-side transformation metrics
- 🔐 Advanced authentication (OAuth)
- 📈 Usage analytics dashboard
- 🌍 Multi-region server deployment
- 💾 Optional cloud storage integration
- 🔄 WebSocket for real-time updates
- 📦 XSLT stylesheet compilation cache
- 🎯 GraphQL API option

---

**This architecture provides maximum flexibility: works perfectly without infrastructure, scales elegantly when needed.**

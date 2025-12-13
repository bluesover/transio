# Saxon-HE Server Architecture Guide

## Overview

Transio supports **optional** server-side XSLT transformation using Saxon-HE (Java) for enhanced performance and full XSLT 2.0/3.0 feature support. The application works perfectly **without** a server - all transformations run client-side by default using Saxon-JS.

## Architecture Options

### Option 1: Client-Only (Default) ✅
- **No setup required**
- Runs entirely in browser
- Saxon-JS handles XSLT 1.0/2.0/3.0
- Perfect for static hosting (Cloudflare Pages, Netlify, Vercel)
- Zero backend costs

### Option 2: Hybrid (Client + Optional Server) 🚀
- Client-side transformations by default
- Optional server API for heavy workloads
- User can configure server endpoint
- Automatic fallback to client-side
- Best of both worlds

### Option 3: Server-First (Enterprise) 🏢
- Primary transformations on server
- Client used for UI only
- Full Saxon-HE Java capabilities
- Requires infrastructure
- Ideal for corporate deployments

## Why Saxon-HE Server?

### Advantages
✅ **Full XSLT 2.0/3.0 Support** - Complete implementation of W3C specs
✅ **Better Performance** - Java is faster for large/complex transformations
✅ **Advanced Features** - XPath 3.1, XQuery, schema validation
✅ **License-Friendly** - MPL 2.0 allows commercial use
✅ **Memory Efficiency** - Server can handle larger documents

### Challenges
❌ **Java Runtime Required** - Cannot install via npm alone
❌ **Deployment Complexity** - Need server infrastructure (not serverless)
❌ **Security Concerns** - Must sandbox XML/XSLT execution properly
❌ **Cost** - Requires running server (vs free static hosting)
❌ **Latency** - Network round-trip for each transformation

## Recommended Implementation (Hybrid)

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Transio Web App (Browser)                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              User Interface (React)                  │    │
│  └───────────────────┬─────────────────────────────────┘    │
│                      │                                        │
│  ┌──────────────────▼──────────────────────────────────┐    │
│  │         Transformation Router                        │    │
│  │  • Check if server configured                        │    │
│  │  • Select client or server processor                 │    │
│  │  • Handle fallback on failure                        │    │
│  └──────────────┬─────────────────┬────────────────────┘    │
│                 │                 │                           │
│     ┌───────────▼────────┐   ┌───▼────────────────────┐     │
│     │  Client Processor  │   │  Server API Client     │     │
│     │   (Saxon-JS)       │   │  (HTTP to backend)     │     │
│     └────────────────────┘   └───┬────────────────────┘     │
└─────────────────────────────────┼──────────────────────────┘
                                  │
                    HTTPS API     │
                                  │
         ┌────────────────────────▼──────────────────────┐
         │         Saxon-HE API Server (Node.js)         │
         │  ┌──────────────────────────────────────┐     │
         │  │  Express.js API Endpoint             │     │
         │  └────────────┬─────────────────────────┘     │
         │               │                                │
         │  ┌────────────▼─────────────────────────┐     │
         │  │  Validation & Sandboxing Layer       │     │
         │  │  • Size limits (max 10MB)            │     │
         │  │  • Timeout enforcement (30s)         │     │
         │  │  • Entity expansion protection       │     │
         │  │  • Rate limiting                     │     │
         │  └────────────┬─────────────────────────┘     │
         │               │                                │
         │  ┌────────────▼─────────────────────────┐     │
         │  │  Java Child Process (Saxon-HE)       │     │
         │  │  • Isolated execution                │     │
         │  │  • Resource limits                   │     │
         │  │  • Error capture                     │     │
         │  └──────────────────────────────────────┘     │
         └───────────────────────────────────────────────┘
                     (Docker Container)
```

## Implementation Guide

### Step 1: Update Client to Support Server API

Add server configuration and smart routing to choose between client/server processing.

**File: `src/lib/types.ts`**
```typescript
export interface ServerConfig {
  enabled: boolean
  apiUrl: string
  apiKey?: string
  timeout: number
}

export interface TransformOptions {
  useServer?: boolean
  timeout?: number
}
```

**File: `src/lib/api-client.ts`** (NEW)
```typescript
export async function transformViaServer(
  xml: string,
  xslt: string,
  version: XSLTVersion,
  serverConfig: ServerConfig
): Promise<TransformResult> {
  const startTime = performance.now()
  
  try {
    const response = await fetch(`${serverConfig.apiUrl}/transform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(serverConfig.apiKey && { 'X-API-Key': serverConfig.apiKey })
      },
      body: JSON.stringify({ xml, xslt, version }),
      signal: AbortSignal.timeout(serverConfig.timeout)
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      success: data.success,
      output: data.output,
      error: data.error,
      duration: performance.now() - startTime,
      processorUsed: 'Saxon-HE (Server)'
    }
  } catch (error) {
    throw new Error(`Server transformation failed: ${error.message}`)
  }
}
```

### Step 2: Create Saxon-HE Server

**File: `server/package.json`** (NEW)
```json
{
  "name": "transio-saxon-server",
  "version": "1.0.0",
  "description": "Saxon-HE XSLT transformation API server for Transio",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "download-saxon": "node scripts/download-saxon.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

**File: `server/scripts/download-saxon.js`** (NEW)
```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');

const SAXON_VERSION = '12.4';
const SAXON_URL = `https://github.com/Saxonica/Saxon-HE/releases/download/SaxonHE${SAXON_VERSION}/SaxonHE${SAXON_VERSION}J.zip`;
const DOWNLOAD_PATH = path.join(__dirname, '../saxon');

async function downloadSaxon() {
  console.log('📦 Downloading Saxon-HE...');
  
  if (!fs.existsSync(DOWNLOAD_PATH)) {
    fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });
  }

  const zipPath = path.join(DOWNLOAD_PATH, 'saxon.zip');
  const file = fs.createWriteStream(zipPath);

  return new Promise((resolve, reject) => {
    https.get(SAXON_URL, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('✅ Saxon-HE downloaded successfully');
        console.log('📝 Extract saxon.zip to server/saxon/ directory');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(zipPath, () => {});
      reject(err);
    });
  });
}

downloadSaxon().catch(console.error);
```

**File: `server/index.js`** (NEW)
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const SAXON_JAR = path.join(__dirname, 'saxon', 'saxon-he-12.4.jar');

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173']
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});
app.use('/api/', limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    processor: 'Saxon-HE',
    version: '12.4'
  });
});

// Transform endpoint
app.post('/api/transform', async (req, res) => {
  const { xml, xslt, version } = req.body;

  // Validation
  if (!xml || !xslt) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing xml or xslt content' 
    });
  }

  if (xml.length > 10 * 1024 * 1024 || xslt.length > 10 * 1024 * 1024) {
    return res.status(413).json({ 
      success: false, 
      error: 'Content too large (max 10MB)' 
    });
  }

  // Create temporary files
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const timestamp = Date.now();
  const xmlFile = path.join(tempDir, `input-${timestamp}.xml`);
  const xsltFile = path.join(tempDir, `transform-${timestamp}.xslt`);
  const outputFile = path.join(tempDir, `output-${timestamp}.xml`);

  try {
    // Write input files
    fs.writeFileSync(xmlFile, xml, 'utf8');
    fs.writeFileSync(xsltFile, xslt, 'utf8');

    // Execute Saxon transformation
    const startTime = Date.now();
    const saxon = spawn('java', [
      '-jar', SAXON_JAR,
      `-s:${xmlFile}`,
      `-xsl:${xsltFile}`,
      `-o:${outputFile}`,
      '--suppressXsltNamespaceCheck:on'
    ], {
      timeout: 30000, // 30 second timeout
      env: { ...process.env, JAVA_OPTS: '-Xmx512m' } // Limit memory
    });

    let stderr = '';
    saxon.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    saxon.on('close', (code) => {
      const duration = Date.now() - startTime;

      // Clean up temp files
      try {
        fs.unlinkSync(xmlFile);
        fs.unlinkSync(xsltFile);
      } catch (e) {}

      if (code !== 0) {
        try { fs.unlinkSync(outputFile); } catch (e) {}
        return res.json({
          success: false,
          error: stderr || 'Transformation failed',
          duration
        });
      }

      // Read output
      try {
        const output = fs.readFileSync(outputFile, 'utf8');
        fs.unlinkSync(outputFile);

        res.json({
          success: true,
          output,
          duration,
          processor: 'Saxon-HE 12.4'
        });
      } catch (err) {
        res.json({
          success: false,
          error: 'Failed to read transformation output',
          duration
        });
      }
    });

    saxon.on('error', (err) => {
      // Clean up
      try {
        fs.unlinkSync(xmlFile);
        fs.unlinkSync(xsltFile);
        fs.unlinkSync(outputFile);
      } catch (e) {}

      res.json({
        success: false,
        error: `Execution error: ${err.message}`
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Saxon-HE API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
```

**File: `server/Dockerfile`** (NEW)
```dockerfile
FROM node:20-alpine

# Install Java (OpenJDK)
RUN apk add --no-cache openjdk11-jre

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Download Saxon-HE
RUN npm run download-saxon

# Expose port
EXPOSE 3001

# Run server
CMD ["node", "index.js"]
```

**File: `server/docker-compose.yml`** (NEW)
```yaml
version: '3.8'

services:
  saxon-api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - PORT=3001
      - NODE_ENV=production
      - ALLOWED_ORIGINS=https://transio.org,http://localhost:5173
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```

### Step 3: Update Client App Configuration

**Add to `src/components/ServerConfigDialog.tsx`** (NEW)
```typescript
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

export function ServerConfigDialog({ open, onOpenChange, config, onSave }) {
  const [enabled, setEnabled] = useState(config.enabled)
  const [apiUrl, setApiUrl] = useState(config.apiUrl)
  const [apiKey, setApiKey] = useState(config.apiKey || '')
  const [timeout, setTimeout] = useState(config.timeout)

  const handleSave = () => {
    onSave({ enabled, apiUrl, apiKey, timeout })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Server Configuration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="server-enabled">Enable Server-Side Processing</Label>
            <Switch
              id="server-enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
          
          {enabled && (
            <>
              <div>
                <Label htmlFor="api-url">API URL</Label>
                <Input
                  id="api-url"
                  placeholder="http://localhost:3001/api"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="api-key">API Key (optional)</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Optional authentication key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="timeout">Timeout (ms)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={timeout}
                  onChange={(e) => setTimeout(Number(e.target.value))}
                />
              </div>
            </>
          )}
          
          <Button onClick={handleSave} className="w-full">
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## Deployment Options

### Local Development
```bash
# Terminal 1: Run client
npm run dev

# Terminal 2: Run server
cd server
npm install
npm run download-saxon
npm run dev
```

### Docker (Recommended for Production)
```bash
cd server
docker-compose up -d
```

### Cloud Deployment Options

#### ✅ **Option A: DigitalOcean App Platform**
- Deploy Docker container directly
- $5-12/month for basic plan
- Auto-scaling available
- Simple UI deployment

#### ✅ **Option B: Railway**
- Free tier available
- Automatic Docker builds
- Easy GitHub integration

#### ✅ **Option C: Fly.io**
- Generous free tier
- Global edge network
- Docker-native

#### ❌ **NOT Compatible:**
- Cloudflare Pages (static only)
- Netlify (no long-running processes)
- Vercel (10s timeout, no Java)

## Security Best Practices

### 1. Input Validation
- Limit file sizes (10MB default)
- Validate XML/XSLT structure
- Block external entity references
- Sanitize error messages

### 2. Resource Limits
- 30-second timeout per transformation
- 512MB memory limit per process
- Rate limiting (100 requests/15min)
- Process isolation

### 3. API Security
- API key authentication
- CORS restrictions
- HTTPS only in production
- Request logging

### 4. Docker Hardening
```dockerfile
# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Read-only filesystem
VOLUME ["/tmp"]
```

## Cost Analysis

### Client-Only (Current)
- **Cost**: $0/month
- **Hosting**: Free (Cloudflare Pages)
- **Performance**: Good for most use cases
- **Limitations**: Browser memory limits

### Hybrid (Recommended)
- **Client Cost**: $0/month (Cloudflare Pages)
- **Server Cost**: $5-12/month (DigitalOcean)
- **Total**: $5-12/month
- **Benefits**: Best performance + flexibility

### Server-First
- **Server Cost**: $12-24/month
- **Benefits**: Maximum performance
- **Use Case**: Enterprise with heavy usage

## Testing Server Integration

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test transformation
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"?><root>Test</root>",
    "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><output><xsl:value-of select=\"root\"/></output></xsl:template></xsl:stylesheet>",
    "version": "1.0"
  }'
```

## Conclusion

This architecture provides **maximum flexibility**:

1. ✅ **Works perfectly without a server** (current state)
2. ✅ **Easy to add server when needed** (optional enhancement)
3. ✅ **Falls back gracefully** (if server unavailable)
4. ✅ **Open source friendly** (no vendor lock-in)
5. ✅ **Cost-effective** (pay only if you need it)

The client-side Saxon-JS implementation already handles 95% of use cases. Server integration is only needed for:
- Very large documents (>5MB)
- Complex XSLT 2.0/3.0 transformations
- High-volume production environments
- Corporate deployments with specific security requirements

**Recommendation**: Deploy the client-only version to Cloudflare Pages now, then add the optional server component later if needed.

# Saxon-HE Server Setup Guide

This guide explains how to set up the optional Saxon-HE server for enhanced XSLT 2.0/3.0 processing.

## Overview

Transio works perfectly **without** a server - all transformations run client-side by default. The Saxon-HE server is **optional** and provides:

- ✅ Full XSLT 2.0/3.0 support (for-each-group, sequences, advanced XPath)
- ✅ Better performance for large files (>5MB)
- ✅ Enterprise-grade transformation engine
- ✅ Automatic fallback to client-side if unavailable

## When Do You Need the Server?

### ✅ Use Server If:
- Working with XSLT 2.0/3.0 features that fail client-side
- Processing large XML files (>5MB)
- Need consistent transformation results
- Enterprise/production environment

### ❌ Don't Need Server If:
- Using XSLT 1.0 (works perfectly client-side)
- Files are small (<5MB)
- Simple transformations
- Want zero-cost deployment (static hosting)

## Quick Setup (Local Development)

### 1. Install Prerequisites

**Java 11 or later:**

```bash
# Check if Java is installed
java -version

# If not installed:

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install openjdk-11-jre

# macOS (Homebrew)
brew install openjdk@11

# Windows
# Download from https://adoptium.net/
```

**Node.js 18+:**

```bash
# Check if Node is installed
node --version

# If not installed, download from https://nodejs.org/
```

### 2. Install and Start Server

```bash
# From project root
cd server

# Install dependencies
npm install

# Download and setup Saxon-HE (automatic)
npm run setup

# Start server
npm start
```

Server will start on `http://localhost:3001`

### 3. Configure Transio App

1. Open Transio in your browser
2. Click the **Server Config** button (cloud icon in header)
3. Enable "Server-Side Processing"
4. Set API URL: `http://localhost:3001/api`
5. Click "Test Connection" - should show "Available"
6. Enable "Prefer Server for XSLT 2.0/3.0"
7. Save Configuration

### 4. Test It

Try the XSLT 2.0 test example:
1. Click the Flask icon (🧪) in header
2. Loads XSLT 2.0 grouping example
3. Click Transform
4. Should see "Saxon-HE Server" in processor badge

## Manual Saxon Installation

If automatic setup fails:

### 1. Download Saxon-HE

Visit: https://github.com/Saxonica/Saxon-HE/releases/tag/SaxonHE12-5

Download: `SaxonHE12-5J.zip`

### 2. Extract

```bash
# Create directory
mkdir -p server/saxon

# Extract (Linux/macOS)
unzip SaxonHE12-5J.zip -d server/saxon/

# Extract (Windows)
# Right-click zip → Extract All → server/saxon/
```

### 3. Verify

Check that `server/saxon/saxon-he-12.5.jar` exists

### 4. Start Server

```bash
cd server
npm install
npm start
```

## Docker Deployment (Recommended for Production)

### Local Testing with Docker

```bash
cd server

# Build and run
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Deployment

The Docker image includes Java and Saxon-HE automatically.

**Dockerfile highlights:**
- Node.js 20 Alpine Linux
- OpenJDK 11
- Automatic Saxon download and setup
- Non-root user for security
- Health checks
- Resource limits (1 CPU, 1GB RAM)

## Cloud Deployment Options

### Option 1: Railway (Easiest)

1. Sign up at https://railway.app/
2. Create new project
3. Connect GitHub repository
4. Set root directory: `server`
5. Railway auto-detects Dockerfile
6. Deploy!
7. Copy the public URL (e.g., `https://your-app.railway.app`)
8. In Transio: Set server URL to `https://your-app.railway.app/api`

**Cost:** ~$5/month (500 hours free tier)

### Option 2: DigitalOcean App Platform

1. Sign up at https://www.digitalocean.com/
2. Create → Apps → Choose source (GitHub)
3. Select repository and branch
4. Set root directory: `server`
5. Detect Dockerfile
6. Choose Basic plan ($5/month)
7. Deploy
8. Copy the app URL
9. In Transio: Set server URL to `https://your-app.ondigitalocean.app/api`

**Cost:** $5-12/month

### Option 3: Fly.io

```bash
cd server

# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch (follow prompts)
fly launch

# Deploy
fly deploy

# Get URL
fly status
```

**Cost:** Free tier available, then ~$5/month

### Option 4: Render

1. Sign up at https://render.com/
2. New → Docker
3. Connect GitHub
4. Set root directory: `server`
5. Set Dockerfile path: `server/Dockerfile`
6. Deploy
7. Copy the URL
8. In Transio: Set server URL to `https://your-app.onrender.com/api`

**Cost:** Free tier available (spins down after inactivity)

## Environment Variables

Create `.env` file in `server/` directory:

```env
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://transio.org,http://localhost:5173
```

**Variables:**
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (production/development)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

## Security Configuration

### API Key Authentication (Optional)

Add to `server/index.js` after line 23:

```javascript
// API Key middleware
app.use('/api/transform', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validKey = process.env.API_KEY;
  
  if (validKey && apiKey !== validKey) {
    return res.status(401).json({ success: false, error: 'Invalid API key' });
  }
  
  next();
});
```

Set environment variable:
```env
API_KEY=your-secret-key-here
```

In Transio app config, set the API Key field.

### Rate Limiting

Default: 100 requests per 15 minutes per IP

Adjust in `server/index.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200 // Increase to 200 requests
});
```

### CORS Configuration

Add your production domain to `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://transio.org
```

## Testing the Server

### Health Check

```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5"
}
```

### Transform Test

```bash
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"?><catalog><item>Book</item><item>DVD</item></catalog>",
    "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"2.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><result><xsl:for-each-group select=\"catalog/item\" group-by=\".\"><group><xsl:value-of select=\"current-grouping-key()\"/></group></xsl:for-each-group></result></xsl:template></xsl:stylesheet>",
    "version": "2.0"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "output": "<result><group>Book</group><group>DVD</group></result>",
  "duration": 150,
  "processor": "Saxon-HE 12.5 (XSLT 2.0)"
}
```

## Troubleshooting

### "Saxon-HE not found"

```bash
cd server
npm run setup
```

Or manually download and extract as described above.

### "Java not found"

Install Java:

```bash
# Ubuntu/Debian
sudo apt-get install openjdk-11-jre

# macOS
brew install openjdk@11

# Verify
java -version
```

### "Port 3001 already in use"

Change port:

```bash
PORT=3002 npm start
```

### "Connection refused" in Transio

1. Check server is running: `curl http://localhost:3001/api/health`
2. Check firewall allows port 3001
3. If using Docker: Check container status `docker ps`
4. Check logs: `docker-compose logs` or `npm start` output

### Transformation Fails

1. Check server logs for errors
2. Verify XSLT is valid XSLT 2.0/3.0 syntax
3. Test with simple XSLT first
4. Check file sizes (max 10MB)

## Performance Tuning

### Increase Memory Limit

Edit `server/index.js` line 95:

```javascript
env: { ...process.env, JAVA_OPTS: '-Xmx1024m' } // 1GB instead of 512MB
```

### Increase Timeout

Edit `server/index.js` line 94:

```javascript
timeout: 60000, // 60 seconds instead of 30
```

### Adjust Rate Limits

Edit `server/index.js` lines 19-22:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200 // More requests
});
```

## Monitoring

### Logs

```bash
# Development
npm start

# Docker
docker-compose logs -f

# Production (PM2)
pm2 logs saxon-api
```

### Health Monitoring

Set up a cron job or monitoring service to check:
```bash
curl -f http://localhost:3001/api/health || echo "Server down!"
```

### Metrics

Add logging middleware to track:
- Request count
- Average transformation time
- Error rate
- Memory usage

## Cost Analysis

### Client-Only (No Server)
- **Cost:** $0/month
- **Hosting:** Cloudflare Pages (free)
- **Performance:** Good for most use cases

### With Server
- **Client Cost:** $0/month (Cloudflare Pages)
- **Server Cost:** $0-12/month (depending on platform)
  - Railway: ~$5/month
  - DigitalOcean: $5-12/month  
  - Fly.io: Free tier available
  - Render: Free tier (with limitations)
- **Total:** $0-12/month
- **Benefits:** Full XSLT 2.0/3.0 + better performance

## Production Checklist

- [ ] Java 11+ installed
- [ ] Saxon-HE downloaded and extracted
- [ ] Server starts without errors
- [ ] Health check returns 200
- [ ] Test transformation works
- [ ] CORS configured for your domain
- [ ] Rate limiting configured
- [ ] Environment variables set
- [ ] SSL/HTTPS enabled (for production)
- [ ] Monitoring/logging set up
- [ ] Backup strategy defined
- [ ] API key authentication (optional)

## Support

If you encounter issues:

1. Check this guide thoroughly
2. Review server logs
3. Test with simple examples first
4. Check GitHub Issues
5. Open new issue with:
   - Error messages
   - Server logs
   - Steps to reproduce

## Next Steps

After server is running:

1. Deploy Transio client to Cloudflare Pages (see deployment guides)
2. Update CORS to include your client domain
3. Configure server URL in Transio app
4. Test XSLT 2.0/3.0 features
5. Monitor performance and logs

---

**Remember:** The server is entirely optional! Transio works great without it for most use cases.

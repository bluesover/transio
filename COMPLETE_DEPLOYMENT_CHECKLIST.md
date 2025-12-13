# Complete Deployment Checklist

Use this checklist to deploy both the client app and optional server.

## Phase 1: Client App Deployment (Required)

### ✅ Pre-Deployment

- [ ] Run locally: `npm run dev`
- [ ] Test all core features work
- [ ] Test XSLT 1.0 transformations
- [ ] Test version saving/loading
- [ ] Test file imports
- [ ] Test all keyboard shortcuts
- [ ] Clear browser storage and test fresh install

### ✅ Build & Deploy

**Option A: Cloudflare Pages (Recommended)**
- [ ] Create Cloudflare Pages project
- [ ] Connect GitHub repository
- [ ] Build command: `npm run build:cloudflare`
- [ ] Output directory: `dist`
- [ ] Deploy
- [ ] Verify at `*.pages.dev` URL
- [ ] (Optional) Add custom domain

**Option B: Netlify**
- [ ] Run `npm run build`
- [ ] Drag `dist` folder to netlify.com/drop
- [ ] Verify deployment
- [ ] (Optional) Add custom domain

**Option C: Vercel**
- [ ] Install: `npm i -g vercel`
- [ ] Run: `vercel --prod`
- [ ] Verify deployment

**Option D: GitHub Pages**
- [ ] Update `package.json` deploy script with your repo URL
- [ ] Run: `npm run deploy`
- [ ] Enable GitHub Pages in repo settings
- [ ] Verify at `username.github.io/repo-name`

### ✅ Post-Deployment Testing

- [ ] Open production URL
- [ ] Test transformation works
- [ ] Test version control
- [ ] Test on mobile device
- [ ] Test keyboard shortcuts
- [ ] Check browser console for errors
- [ ] Test dark/light/black themes

### ✅ Production Ready

- [ ] ✅ Client app deployed and working
- [ ] 💰 Cost: $0/month (static hosting)
- [ ] ⚡ XSLT 1.0 fully supported
- [ ] ⚡ Basic XSLT 2.0 features work

**At this point, your app is fully functional!** The server is optional.

---

## Phase 2: Server Deployment (Optional)

### When You Need the Server

✅ **Deploy Server If:**
- Working with complex XSLT 2.0/3.0 features
- Processing large XML files (>5MB)
- Need consistent transformation results
- Enterprise/production environment with heavy usage

❌ **Skip Server If:**
- Using XSLT 1.0 primarily
- Files are small (<5MB)
- Simple transformations
- Want to minimize costs

### ✅ Local Server Setup (Development)

- [ ] Install Java 11+: `java -version`
- [ ] Install Node 18+: `node --version`
- [ ] Navigate to server: `cd server`
- [ ] Run setup: `npm run setup`
- [ ] Verify Saxon JAR exists: `server/saxon/saxon-he-12.5.jar`
- [ ] Start server: `npm start`
- [ ] Test health: `curl http://localhost:3001/api/health`
- [ ] Should see: `{"status":"ok","processor":"Saxon-HE","version":"12.5"}`

### ✅ Configure Client App

- [ ] Open Transio in browser
- [ ] Click cloud icon (☁️) in header
- [ ] Enable "Server-Side Processing"
- [ ] API URL: `http://localhost:3001/api`
- [ ] Click "Test Connection"
- [ ] Should show "Available ✅"
- [ ] Enable "Prefer Server for XSLT 2.0/3.0"
- [ ] Save configuration

### ✅ Test Server Integration

- [ ] Click Flask icon (🧪) to load XSLT 2.0 example
- [ ] Click Transform
- [ ] Check processor badge shows "Saxon-HE Server"
- [ ] Verify output is correct
- [ ] Test with complex XSLT 2.0 features
- [ ] Test large file (>5MB) - optional

### ✅ Production Server Deployment

**Option A: Railway (Easiest)**
- [ ] Sign up at railway.app
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Set root directory: `server`
- [ ] Railway auto-detects Dockerfile
- [ ] Deploy
- [ ] Copy public URL (e.g., `https://your-app.railway.app`)
- [ ] Update client config with: `https://your-app.railway.app/api`
- [ ] Cost: ~$5/month

**Option B: DigitalOcean App Platform**
- [ ] Sign up at digitalocean.com
- [ ] Create new app
- [ ] Choose GitHub source
- [ ] Select repository
- [ ] Set root directory: `server`
- [ ] Dockerfile auto-detected
- [ ] Choose Basic plan ($5/month)
- [ ] Deploy
- [ ] Copy app URL
- [ ] Update client config with URL + `/api`
- [ ] Cost: $5-12/month

**Option C: Fly.io**
- [ ] Install flyctl: `curl -L https://fly.io/install.sh | sh`
- [ ] Login: `fly auth login`
- [ ] Navigate: `cd server`
- [ ] Launch: `fly launch` (follow prompts)
- [ ] Deploy: `fly deploy`
- [ ] Get URL: `fly status`
- [ ] Update client config
- [ ] Cost: Free tier available, then ~$5/month

**Option D: Docker on VPS**
- [ ] Have VPS ready (DigitalOcean, Linode, AWS EC2)
- [ ] SSH into server
- [ ] Clone repository
- [ ] Navigate: `cd server`
- [ ] Run: `docker-compose up -d`
- [ ] Verify: `curl http://localhost:3001/api/health`
- [ ] Set up reverse proxy (Nginx/Caddy)
- [ ] Point domain to server
- [ ] Enable HTTPS (Let's Encrypt)
- [ ] Update client config with `https://yourdomain.com/api`
- [ ] Cost: $5-20/month for VPS

### ✅ Server Production Configuration

- [ ] Set environment variables:
  ```
  PORT=3001
  NODE_ENV=production
  ALLOWED_ORIGINS=https://yourdomain.com,https://transio.org
  ```
- [ ] (Optional) Add API key authentication
- [ ] Configure rate limiting if needed
- [ ] Set up monitoring/logging
- [ ] Configure auto-restart (PM2 or Docker)
- [ ] Set up backup strategy

### ✅ Client-Server Integration

- [ ] Deploy client with server URL
- [ ] Update client server config:
  - [ ] Enable server
  - [ ] Set production URL
  - [ ] Test connection
  - [ ] Enable "Prefer Server"
  - [ ] Save
- [ ] Test transformation using server
- [ ] Verify fallback works (stop server, transform should still work client-side)
- [ ] Check CORS is configured correctly
- [ ] Test from multiple browsers

### ✅ Server Monitoring

- [ ] Health check endpoint works: `/api/health`
- [ ] Logs accessible (Docker logs or PM2 logs)
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Configure alerts for downtime
- [ ] Monitor resource usage (CPU, RAM)
- [ ] Set up log rotation
- [ ] Document recovery procedures

### ✅ Server Production Ready

- [ ] ✅ Server deployed and accessible via HTTPS
- [ ] ✅ Client configured with server URL
- [ ] ✅ Connection test passes
- [ ] ✅ XSLT 2.0/3.0 transformations work
- [ ] ✅ Fallback to client works
- [ ] ✅ Monitoring in place
- [ ] 💰 Cost: $0-12/month (depending on platform)
- [ ] ⚡ Full XSLT 2.0/3.0 support
- [ ] ⚡ Large file processing

---

## Final Verification

### Client + Server Integration

- [ ] Open production client URL
- [ ] Server config shows "Available ✅"
- [ ] XSLT 1.0 transform works
- [ ] XSLT 2.0 transform works (via server)
- [ ] Processor badge shows "Saxon-HE Server"
- [ ] Stop server → Transform still works (client-side fallback)
- [ ] Start server → Next transform uses server again
- [ ] Test from mobile device
- [ ] Test from different network
- [ ] All features work end-to-end

### Performance Check

- [ ] XSLT 1.0 transforms < 200ms
- [ ] XSLT 2.0 transforms < 500ms (server)
- [ ] Large files (>1MB) process successfully
- [ ] Server health check responds quickly
- [ ] No memory leaks after 10 transforms
- [ ] Concurrent users work (if applicable)

### Documentation

- [ ] README.md updated with server info
- [ ] Server URL documented for team
- [ ] API key shared securely (if using)
- [ ] Monitoring dashboard URL shared
- [ ] Deployment runbook created
- [ ] Recovery procedures documented

---

## Architecture Summary

### Client-Only (Free Tier)
```
User → Cloudflare Pages → Browser (Saxon-JS) → Output
Cost: $0/month
XSLT: 1.0 ✅, 2.0 ⚠️ (limited), 3.0 ⚠️ (limited)
```

### Client + Server (Enhanced)
```
User → Cloudflare Pages → Browser
                            ↓
                    [XSLT 2.0/3.0 needed?]
                            ↓
                    Saxon-HE Server → Output
                            ↓
                    [Fallback to Browser if server down]

Cost: $5-12/month
XSLT: 1.0 ✅, 2.0 ✅, 3.0 ✅
```

---

## Troubleshooting

### Client Issues

**Build fails:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run optimize`
- Check Node version: `node --version` (need 18+)

**Deployment fails:**
- Check build command in platform
- Verify output directory is `dist`
- Check for build errors in logs

**Features don't work:**
- Check browser console for errors
- Test in incognito mode
- Clear browser cache
- Verify HTTPS (required for some features)

### Server Issues

**Saxon JAR not found:**
```bash
cd server
npm run download-saxon
# Extract saxon.zip to server/saxon/
```

**Java not found:**
```bash
# Ubuntu/Debian
sudo apt-get install openjdk-11-jre

# macOS
brew install openjdk@11

# Verify
java -version
```

**Connection refused:**
- Check server is running: `curl http://localhost:3001/api/health`
- Check firewall allows port 3001
- Verify CORS includes client domain
- Check server logs for errors

**Transformation fails:**
- Check XSLT syntax is valid
- Verify file sizes under 10MB
- Check server logs for Java errors
- Test with simple XSLT first

---

## Success Criteria

### Minimum Viable (Client Only)
- ✅ Client deployed on HTTPS
- ✅ XSLT 1.0 works perfectly
- ✅ Version control works
- ✅ Cost: $0/month

### Enhanced (Client + Server)
- ✅ Client deployed on HTTPS
- ✅ Server deployed on HTTPS
- ✅ XSLT 1.0/2.0/3.0 all work
- ✅ Automatic fallback functional
- ✅ Monitoring in place
- ✅ Cost: $5-12/month

---

## Cost Summary

| Component | Platform | Monthly Cost |
|-----------|----------|--------------|
| Client | Cloudflare Pages | $0 |
| Client | Netlify | $0 |
| Client | Vercel | $0 |
| Client | GitHub Pages | $0 |
| Server | Railway | ~$5 |
| Server | DigitalOcean | $5-12 |
| Server | Fly.io | $0-5 |
| Server | VPS (self-hosted) | $5-20 |
| Domain | Optional | $10-15/year |
| **Total (Client only)** | | **$0** |
| **Total (Client + Server)** | | **$5-12** |

---

## Support & Documentation

### Documentation Links
- [README.md](./README.md) - Main documentation
- [SAXON_SERVER_SETUP.md](./SAXON_SERVER_SETUP.md) - Complete server guide
- [server/README.md](./server/README.md) - Server API docs
- [server/QUICK_START.md](./server/QUICK_START.md) - 3-minute setup

### Getting Help
- GitHub Issues: Report bugs or ask questions
- Documentation: Comprehensive guides available
- Server Logs: Check for error details
- Health Check: Monitor server status

---

**Congratulations!** 🎉

Your Transio deployment is complete. You now have a professional-grade XSLT transformation tool running in production.

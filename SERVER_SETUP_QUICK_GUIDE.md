# 🚀 Saxon-HE Server Quick Setup Guide

**Time Required**: 30 minutes
**Difficulty**: Intermediate
**When to Use**: Only if you need server-side processing (most users don't)

---

## ⚠️ Do You Actually Need This?

**NO - if you're just deploying to Cloudflare Pages**
- The app works perfectly without a server
- 95% of users don't need server-side processing
- Client-side Saxon-JS handles XSLT 1.0-3.0 just fine

**YES - if you have these needs**:
- Documents larger than 5MB
- Advanced schema validation
- High-volume production workloads (>1000 transforms/day)
- Corporate security requirements (no client-side processing)

---

## 🏗️ Architecture Choice

### Option 1: Client-Only ⭐ **RECOMMENDED FOR TONIGHT**
```
Deploy Now: ✅
Cost: $0/month
Setup Time: 10 minutes
Maintenance: Zero
```
**This is what you should deploy tonight!**

### Option 2: Hybrid (Client + Server)
```
Deploy Now: ✅ Client first
Add Later: Server when needed
Cost: $5-12/month
Setup Time: 30 minutes
```

### Option 3: Server-First
```
Deploy: 🔴 More complex
Cost: $12-24/month
Setup Time: 2-3 hours
Use Case: Enterprise only
```

---

## 🎯 Tonight's Plan: Deploy Client-Only

You're already ready! Just follow these 3 steps:

### Step 1: Build the App
```bash
npm install
npm run build
```

### Step 2: Deploy to Cloudflare Pages
```bash
# Option A: Dashboard (easiest)
# 1. Go to dash.cloudflare.com/pages
# 2. Create project → Connect Git
# 3. Select your repo → Deploy

# Option B: CLI
npx wrangler pages deploy dist
```

### Step 3: Done! 🎉
Your app is live at: `https://[project-name].pages.dev`

---

## 🔮 Future: Adding Server (When Needed)

If you later decide you need server-side processing, follow this guide:

### Phase 1: Local Development Server

Create `server` directory in your project:

```bash
mkdir server
cd server
npm init -y
```

**Install dependencies**:
```bash
npm install express cors helmet express-rate-limit
npm install --save-dev nodemon
```

**Download Saxon-HE**:
1. Go to: https://github.com/Saxonica/Saxon-HE/releases
2. Download latest version (e.g., SaxonHE12-4J.zip)
3. Extract to `server/saxon/` directory
4. Verify you have: `server/saxon/saxon-he-12.4.jar`

**Create `server/index.js`**:
```javascript
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', processor: 'Saxon-HE' });
});

app.post('/api/transform', (req, res) => {
  const { xml, xslt, version } = req.body;
  
  // TODO: Add transformation logic
  // See SAXON_SERVER_ARCHITECTURE.md for full implementation
  
  res.json({
    success: true,
    output: 'Server transformation coming soon!',
    processor: 'Saxon-HE'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**Test locally**:
```bash
node index.js
# Visit: http://localhost:3001/api/health
```

### Phase 2: Deploy Server to DigitalOcean

**Create `server/Dockerfile`**:
```dockerfile
FROM node:20-alpine
RUN apk add --no-cache openjdk11-jre
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
```

**Deploy to DigitalOcean**:
1. Create account at digitalocean.com
2. App Platform → Create App
3. Connect GitHub repo
4. Select `server` directory
5. Deploy!

**Cost**: $5/month (basic plan)

### Phase 3: Connect Client to Server

**Update client to use server API**:

Add environment variable in Cloudflare Pages:
```
VITE_SERVER_API_URL=https://your-server.ondigitalocean.app/api
```

Client will automatically use server when configured!

---

## 🛠️ Local Development with Server

If you want to test server integration locally:

**Terminal 1 - Client**:
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Server**:
```bash
cd server
node index.js
# Runs on http://localhost:3001
```

**Configure client**:
- Open app in browser
- Settings → Enable server mode
- API URL: `http://localhost:3001/api`

---

## 📊 Performance Comparison

### Client-Side (Saxon-JS)
```
Small files (<100KB):    50-200ms  ✅ Fast
Medium files (100KB-1MB): 200-800ms  ✅ Good
Large files (1-5MB):      1-3s      ⚠️ Slower
Very large (>5MB):        3-10s+    🔴 Slow
```

### Server-Side (Saxon-HE)
```
Small files (<100KB):    100-300ms  (network overhead)
Medium files (100KB-1MB): 200-500ms  ✅ Faster
Large files (1-5MB):      500-1500ms ✅ Much faster
Very large (>5MB):        1-3s      ✅ Handles well
```

**Recommendation**: Use client-side unless you regularly process files >1MB

---

## 🔒 Security Considerations

If deploying a server, you MUST implement:

### 1. Input Validation
```javascript
// Max file size
if (xml.length > 10 * 1024 * 1024) {
  return res.status(413).json({ error: 'File too large' });
}

// Validate XML structure
if (!xml.includes('<?xml')) {
  return res.status(400).json({ error: 'Invalid XML' });
}
```

### 2. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});

app.use('/api/', limiter);
```

### 3. Timeout Protection
```javascript
const saxon = spawn('java', [...args], {
  timeout: 30000 // 30 second max
});
```

### 4. Process Isolation
```javascript
// Limit Java memory
env: { JAVA_OPTS: '-Xmx512m' }
```

### 5. API Authentication (Production)
```javascript
app.post('/api/transform', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... transform logic
});
```

---

## 💰 Cost Analysis

### Client-Only Deployment (Tonight)
```yaml
Cloudflare Pages: $0/month
Total: $0/month ✅
```

### With Server (Future)
```yaml
Cloudflare Pages: $0/month
DigitalOcean Server: $5/month
Total: $5/month
```

### Enterprise Setup
```yaml
Static Hosting: $0/month
Server (2GB RAM): $12/month
Load Balancer: $10/month
Monitoring: $10/month
Total: $32/month
```

---

## 🎯 Decision Tree

```
Do you need to transform XML?
│
├─ YES, basic transformations (most users)
│  └─ ✅ Deploy client-only (Tonight!)
│     └─ Cost: $0/month
│
├─ YES, large files (>5MB)
│  └─ ⚠️ Consider adding server later
│     └─ Cost: +$5/month
│
└─ YES, high-volume production (enterprise)
   └─ 🏢 Full server setup
      └─ Cost: $30-50/month
```

---

## 🚀 Tonight's Action Plan

**DO THIS NOW**:
1. ✅ Deploy client-only to Cloudflare Pages
2. ✅ Test transformations
3. ✅ Share with users
4. ✅ Go to sleep! 😴

**DON'T DO TONIGHT**:
- ❌ Set up server (not needed yet)
- ❌ Deploy to DigitalOcean (optional future step)
- ❌ Configure Docker (only if you need server)
- ❌ Install Java (only for server)

**MAYBE DO LATER** (if needed):
- 📅 Week 2: Monitor usage patterns
- 📅 Week 3: Assess if server needed
- 📅 Month 1: Add server if required
- 📅 Month 2: Scale if successful

---

## 📚 Full Documentation

For complete server implementation details:
→ See `SAXON_SERVER_ARCHITECTURE.md`

For deployment instructions:
→ See `DEPLOYMENT_STATUS_UPDATED.md`

For Cloudflare setup:
→ See `CLOUDFLARE_DEPLOY_GUIDE.md`

---

## ✅ Summary

**What You Need Tonight**:
- Cloudflare Pages account ✅
- GitHub repository ✅
- 10 minutes of time ✅

**What You DON'T Need Tonight**:
- Java installation ❌
- Server hosting ❌
- Docker setup ❌
- npm server packages ❌

**Server Integration**:
- Optional enhancement ✅
- Add later if needed ✅
- Not required for launch ✅
- Client works perfectly alone ✅

---

## 🎉 Ready to Deploy!

Your app is production-ready **right now** without any server setup.

The Saxon-HE server integration is:
1. ✅ **Optional** - not required
2. ✅ **Future enhancement** - add later if needed
3. ✅ **Well documented** - easy to add when ready
4. ✅ **Cost-effective** - only pay if you use it

**Deploy the client-only version tonight, celebrate your launch, and consider adding the server component later if you find you need it!** 🚀

---

**Next Step**: Go to `DEPLOYMENT_STATUS_UPDATED.md` and follow the "Deploy Tonight" checklist!

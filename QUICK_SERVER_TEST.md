# ⚡ Quick Server Test - 5 Minute Guide

## Before You Start

**Prerequisites:**
- Node.js 18+ ✅
- Java 11+ ✅ (Download: https://adoptium.net/)
- npm 8+ ✅

**Check you have Java:**
```bash
java -version
```

## 🚀 One-Command Setup

From project root:

**Mac/Linux:**
```bash
cd server && npm run setup && npm start
```

**Windows:**
```cmd
cd server && npm run setup && npm start
```

That's it! Server should be running on http://localhost:3001

## ✅ Quick Test

Open new terminal:

```bash
curl http://localhost:3001/api/health
```

Should see:
```json
{"status":"ok","processor":"Saxon-HE","version":"12.5"}
```

## 🔗 Connect Frontend

1. In another terminal, from project root:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Click ☁️ (Cloud icon)

4. Enable server, set URL: `http://localhost:3001/api`

5. Click "Test Connection" → "Save"

6. Click 🧪 (Flask icon) to load XSLT 2.0 example

7. Click "Transform"

8. Look for "Saxon-HE 12.5" badge on output ✅

## 🐛 Troubleshooting

**Java not found?**
```bash
# Install Java first
# macOS: brew install openjdk@17
# Ubuntu: sudo apt-get install openjdk-17-jre
# Windows: https://adoptium.net/
```

**Saxon not downloading?**
```bash
cd server
npm run download-saxon
node scripts/extract-saxon.js
```

**Port in use?**
```bash
PORT=3002 npm start
```

## 📚 Full Details

See: `SERVER_TEST_STATUS.md` or `SERVER_LOCAL_TEST_GUIDE.md`

---

**That's it! You're ready to test your Saxon-HE server locally. 🎉**

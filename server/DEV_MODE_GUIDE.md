# Development Mode Guide

## What is Development Mode?

Development mode uses **nodemon** to automatically restart the server whenever you make changes to the code. This saves you from manually stopping and restarting the server after every change.

## Starting the Server in Development Mode

### Windows
```bash
# From project root
start-server-dev.bat

# Or from server directory
cd server
npm run dev
```

### Mac / Linux
```bash
# From project root
./start-server-dev.sh

# Or from server directory
cd server
npm run dev
```

## What Files Are Watched?

Nodemon watches these files and restarts when they change:

- ✅ `index.js` - Main server file
- ✅ `scripts/*.js` - Helper scripts
- ✅ `.env` - Environment variables

Nodemon **ignores** these (won't restart):

- ❌ `temp/*` - Temporary transformation files
- ❌ `saxon/*` - Saxon JAR files
- ❌ `node_modules/*` - Dependencies
- ❌ `*.log` - Log files

## Development Mode Features

### Auto-Restart
Make changes to any watched file and save - the server will automatically restart:

```bash
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
🚀 Transio Saxon-HE API Server
📍 Server running on http://localhost:3001
...
```

### Manual Restart
Type `rs` and press Enter to manually restart the server:

```bash
rs [Enter]
```

### Verbose Output
Development mode shows detailed logs:
- File change detection
- Restart events
- Crash detection with auto-restart

### Colored Output
Error messages, warnings, and success messages are color-coded for better readability.

## Configuration

Edit `server/nodemon.json` to customize nodemon behavior:

```json
{
  "watch": [
    "index.js",
    "scripts/*.js",
    ".env"
  ],
  "ext": "js,json",
  "ignore": [
    "temp/*",
    "saxon/*",
    "node_modules/*",
    "*.log"
  ],
  "exec": "node index.js",
  "env": {
    "NODE_ENV": "development"
  },
  "restartable": "rs",
  "colours": true,
  "delay": 500,
  "verbose": true
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `watch` | Files/folders to watch | `["index.js", "scripts/*.js", ".env"]` |
| `ext` | File extensions to watch | `"js,json"` |
| `ignore` | Files/folders to ignore | `["temp/*", "saxon/*", ...]` |
| `delay` | Restart delay (ms) | `500` |
| `restartable` | Manual restart command | `"rs"` |
| `colours` | Colored output | `true` |
| `verbose` | Detailed logging | `true` |

## Common Development Workflows

### 1. Adding a New API Endpoint

```bash
# Start development server
npm run dev

# Edit index.js - add new endpoint
# Server automatically restarts when you save

# Test the new endpoint
curl http://localhost:3001/api/your-new-endpoint
```

### 2. Debugging XSLT Transformations

```bash
# Start development server
npm run dev

# Edit transformation logic in index.js
# Add console.log() statements for debugging
# Server restarts automatically

# Test transformation
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

### 3. Updating Environment Variables

```bash
# Start development server
npm run dev

# Edit .env file
PORT=3002
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

# Save - server restarts with new config
```

### 4. Working on Helper Scripts

```bash
# Start development server
npm run dev

# Edit scripts/download-saxon.js or other scripts
# Server restarts when you save

# Changes take effect immediately
```

## Production vs Development Mode

| Feature | Production (`npm start`) | Development (`npm run dev`) |
|---------|-------------------------|----------------------------|
| Auto-restart on changes | ❌ No | ✅ Yes |
| Manual restart command | ❌ No | ✅ Yes (`rs`) |
| Verbose logging | ❌ No | ✅ Yes |
| Colored output | ❌ Limited | ✅ Full |
| File watching | ❌ No | ✅ Yes |
| Performance | ✅ Optimized | 🔶 Slightly slower |
| Use case | Production servers | Local development |

## Tips & Best Practices

### 1. Use Development Mode Locally
Always use development mode when coding locally:
```bash
npm run dev
```

### 2. Use Production Mode for Deployment
Use standard mode for production/staging:
```bash
npm start
```

### 3. Watch the Console
Keep an eye on the console for:
- File change notifications
- Restart events
- Error messages
- Request logs

### 4. Quick Restart
If you need to restart immediately, type `rs` instead of waiting for file detection.

### 5. Edit Multiple Files
Nodemon has a 500ms delay before restarting, so you can save multiple files without triggering multiple restarts.

### 6. Test After Each Change
After the server restarts, quickly test your changes:
```bash
# In another terminal
curl http://localhost:3001/api/health
```

## Troubleshooting

### Server Won't Start
```bash
# Check if port is in use
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Use different port
PORT=3002 npm run dev
```

### Changes Not Detected
1. Check if file is in the watch list (`nodemon.json`)
2. Make sure you're editing the correct file
3. Check file permissions
4. Try manual restart: `rs [Enter]`

### Too Many Restarts
If the server restarts too frequently:
1. Check for files that change automatically (logs, temp files)
2. Add them to the `ignore` list in `nodemon.json`
3. Increase the `delay` value

### Server Crashes on Restart
Check the error message in the console. Common issues:
- Syntax errors in code
- Missing dependencies
- Port already in use
- Saxon JAR not found

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `rs` + Enter | Manual restart |
| `Ctrl+C` | Stop server |
| `Ctrl+C` twice | Force quit |

## Environment Variables in Development

You can set environment variables when starting development mode:

### Mac/Linux
```bash
PORT=3002 NODE_ENV=development npm run dev
```

### Windows
```cmd
set PORT=3002
set NODE_ENV=development
npm run dev
```

Or create a `.env` file in the `server` directory:
```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

## Performance Considerations

Development mode has a **small performance overhead** due to:
- File watching
- Extra logging
- Change detection

This is **negligible for development** but avoid using it in production.

**Typical overhead**: ~5-10ms per request in development mode

## Next Steps

1. ✅ Start server in development mode
2. ✅ Make a small change to test auto-restart
3. ✅ Add console.log() to debug
4. ✅ Test your changes with curl or the web app
5. ✅ Switch to production mode before deployment

---

**Happy coding! 🚀**

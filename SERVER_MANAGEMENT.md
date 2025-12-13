# 🚀 Transio Server Management Guide

Quick reference for managing the Saxon-HE transformation server.

## Quick Commands

### Start Server
```bash
# Linux/Mac
chmod +x start-server.sh
./start-server.sh

# Windows
start-server.bat

# Custom port
PORT=3002 ./start-server.sh        # Linux/Mac
set PORT=3002 && start-server.bat  # Windows
```

### Stop Server
```bash
# Linux/Mac
chmod +x stop-server.sh
./stop-server.sh

# Windows
stop-server.bat

# Custom port
PORT=3002 ./stop-server.sh         # Linux/Mac
stop-server.bat 3002               # Windows
```

### Check Server Status
```bash
# Linux/Mac
curl http://localhost:3001/api/health

# Windows (PowerShell)
Invoke-WebRequest http://localhost:3001/api/health

# Or open in browser
http://localhost:3001/api/health
```

## Troubleshooting

### Port Already in Use

**Error:**
```
❌ Error: Port 3001 is already in use
```

**Solutions:**

1. **Stop the existing server** (Recommended)
   ```bash
   ./stop-server.sh        # Linux/Mac
   stop-server.bat         # Windows
   ```

2. **Use a different port**
   ```bash
   PORT=3002 ./start-server.sh        # Linux/Mac
   set PORT=3002 && start-server.bat  # Windows
   ```
   
   Then update the app's server URL to `http://localhost:3002/api`

3. **Find and kill the process manually**
   
   **Linux/Mac:**
   ```bash
   lsof -ti:3001 | xargs kill -9
   ```
   
   **Windows:**
   ```bash
   netstat -ano | findstr :3001
   taskkill /PID [PID_NUMBER] /F
   ```

### Server Won't Start

1. **Check Java installation**
   ```bash
   java -version
   ```
   Must have Java 8 or higher installed.

2. **Reinstall dependencies**
   ```bash
   cd server
   rm -rf node_modules
   npm install
   npm run setup
   ```

3. **Check Saxon JAR**
   ```bash
   ls server/saxon/saxon-he-12.5.jar
   ```
   If missing, run:
   ```bash
   cd server
   npm run setup
   ```

### Connection Failed in App

**Symptoms:**
- "Connection Failed" when testing server connection
- "Failed to fetch" error

**Solutions:**

1. **Verify server is running**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Check CORS settings**
   - Server allows `http://localhost:5173` and similar development ports
   - For production, add your domain to `ALLOWED_ORIGINS` in `server/.env`

3. **Firewall issues**
   - Ensure port 3001 is not blocked by firewall
   - Windows: Allow Node.js through Windows Defender
   - Mac: System Preferences → Security & Privacy → Firewall

4. **Use correct URL in app**
   - Default: `http://localhost:3001/api`
   - If using custom port: `http://localhost:[PORT]/api`

## Server Configuration

### Environment Variables

Create `server/.env` file:

```env
# Server port
PORT=3001

# Allowed CORS origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,https://transio.org

# Max request size (default: 10mb)
MAX_REQUEST_SIZE=10mb

# Rate limit (requests per 15 minutes)
RATE_LIMIT=100
```

### API Key Authentication (Optional)

Add to `server/.env`:
```env
API_KEY=your-secret-key-here
```

The app will send this in the `X-API-Key` header.

## Server Endpoints

### Health Check
```
GET http://localhost:3001/api/health

Response:
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5",
  "javaVersion": "11.0.12"
}
```

### Transform XML
```
POST http://localhost:3001/api/transform
Content-Type: application/json

{
  "xml": "<root>...</root>",
  "xslt": "<xsl:stylesheet>...</xsl:stylesheet>",
  "version": "2.0"
}

Response (success):
{
  "success": true,
  "output": "<result>...</result>",
  "duration": 45,
  "processor": "Saxon-HE 12.5 (XSLT 2.0)"
}

Response (error):
{
  "success": false,
  "error": "Error message here",
  "duration": 12
}
```

## Performance Tips

1. **Keep server running** - Avoid repeatedly starting/stopping
2. **Monitor memory** - Server uses up to 512MB by default
3. **Large files** - Max 10MB per request (configurable)
4. **Rate limiting** - 100 requests per 15 minutes per IP

## Development vs Production

### Development (Local)
- Run server locally with `./start-server.sh`
- Use `http://localhost:3001/api` in app
- Suitable for testing and development

### Production (Deployment)
Options:
1. **Deploy server separately** (VPS, cloud hosting)
2. **Use client-side only** (Saxon-JS in browser)
3. **Serverless function** (AWS Lambda, Cloudflare Workers)

See `DEPLOYMENT_GUIDE.md` for production deployment options.

## Logs and Monitoring

Server logs include:
- Request timestamps
- Origin domains
- Transformation durations
- Error messages

View real-time logs:
```bash
# Server logs appear in terminal where you ran start-server.sh
```

For production, consider:
- Log aggregation (e.g., Winston, Bunyan)
- Monitoring (e.g., PM2, Forever)
- Error tracking (e.g., Sentry)

## Automatic Startup

### Linux/Mac (systemd)

Create `/etc/systemd/system/transio-server.service`:
```ini
[Unit]
Description=Transio Saxon-HE Server
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/transio/server
ExecStart=/usr/bin/node index.js
Restart=on-failure
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable transio-server
sudo systemctl start transio-server
```

### Windows (Task Scheduler)

1. Open Task Scheduler
2. Create Basic Task → "Transio Server"
3. Trigger: At startup
4. Action: Start a program
   - Program: `C:\Windows\System32\cmd.exe`
   - Arguments: `/c start-server.bat`
   - Start in: `C:\path\to\transio`
5. Settings: Allow task to run on demand

### Using PM2 (Cross-platform)

```bash
npm install -g pm2

# Start server
cd server
pm2 start index.js --name transio-server

# Auto-start on reboot
pm2 startup
pm2 save

# View logs
pm2 logs transio-server

# Stop server
pm2 stop transio-server
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set API key for authentication
- [ ] Configure CORS allowed origins
- [ ] Enable rate limiting
- [ ] Run server as non-root user
- [ ] Keep dependencies updated
- [ ] Monitor server logs
- [ ] Use firewall rules
- [ ] Implement request size limits
- [ ] Sanitize file paths

## Support

For issues or questions:
1. Check server logs for error messages
2. Review this troubleshooting guide
3. Test with `curl http://localhost:3001/api/health`
4. Check GitHub issues at transio.org
5. Ensure Java 8+ is installed

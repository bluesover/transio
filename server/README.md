# Transio Saxon-HE Server

Optional server-side XSLT transformation API using Saxon-HE (Java) for enhanced XSLT 2.0/3.0 support.

## Features

- ✅ Full XSLT 2.0/3.0 support via Saxon-HE
- ✅ Large file processing (up to 10MB)
- ✅ Better performance for complex transformations
- ✅ RESTful API with CORS support
- ✅ Rate limiting and security hardening
- ✅ Docker support for easy deployment
- ✅ Open source (MPL 2.0 - Saxon-HE)

## Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Java 11+** - Required for Saxon-HE ([Installation guide below](#installing-java))

### One-Click Installation

#### Windows
1. Open the `server` folder
2. Double-click **`install.bat`**
3. Follow the prompts
4. After installation, choose how to run:
   - **Production**: Double-click **`start-server.bat`**
   - **Development** (with auto-restart): Double-click **`start-server-dev.bat`**

#### Mac / Linux
1. Open Terminal
2. Navigate to the `server` folder:
   ```bash
   cd server
   ```
3. Make the installer executable:
   ```bash
   chmod +x install.sh
   ```
4. Run the installer:
   ```bash
   ./install.sh
   ```
5. After installation, start the server:
   ```bash
   # Production mode
   ./start-server.sh
   
   # Development mode (with auto-restart)
   ./start-server-dev.sh
   ```

#### Using npm (All Platforms)
```bash
cd server
npm install
npm run install-server

# Production mode
npm start

# Development mode (auto-restart on file changes)
npm run dev
```

The server will start on `http://localhost:3001`

### Development Mode Features

When running in development mode (`npm run dev` or `start-server-dev.sh/bat`):

- 🔄 **Auto-restart** on file changes (index.js, scripts/*.js, .env)
- 📝 **Real-time updates** - edit code and see changes immediately
- ⌨️  **Manual restart** - type `rs` and press Enter
- 🎨 **Colored output** for better readability
- 🔍 **Verbose logging** for debugging

Perfect for:
- Developing new features
- Testing XSLT transformations
- Debugging issues
- API endpoint modifications

### Installing Java

If you don't have Java installed, the installer will guide you. Here are quick installation commands:

#### Windows
```powershell
# Using winget (Windows 10/11)
winget install Microsoft.OpenJDK.17

# Or using Chocolatey
choco install openjdk17

# Or download manually from:
# https://adoptium.net/
```

#### macOS
```bash
# Using Homebrew
brew install openjdk@17

# Or download manually from:
# https://adoptium.net/
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install openjdk-17-jdk

# Fedora/RHEL
sudo dnf install java-17-openjdk

# Arch Linux
sudo pacman -S jdk-openjdk
```

### Verify Installation

```bash
# Check server health
curl http://localhost:3001/api/health

# Test transformation
curl -X POST http://localhost:3001/api/transform \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"?><root>Hello</root>",
    "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><output><xsl:value-of select=\"root\"/></output></xsl:template></xsl:stylesheet>",
    "version": "1.0"
  }'
```

## Docker Deployment

### Build and Run

```bash
cd server
docker-compose up -d
```

### Check Logs

```bash
docker-compose logs -f
```

### Stop Server

```bash
docker-compose down
```

## Configuration

### Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (production/development)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)

### Client Configuration

In the Transio web app:

1. Click the **Server Config** button (cloud icon)
2. Enable server-side processing
3. Set API URL: `http://localhost:3001/api`
4. Test connection
5. Save configuration

## API Endpoints

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "processor": "Saxon-HE",
  "version": "12.5"
}
```

### POST /api/transform

Transform XML using XSLT.

**Request:**
```json
{
  "xml": "<?xml version=\"1.0\"?><root>data</root>",
  "xslt": "<?xml version=\"1.0\"?><xsl:stylesheet version=\"2.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">...</xsl:stylesheet>",
  "version": "2.0"
}
```

**Response (Success):**
```json
{
  "success": true,
  "output": "<result>transformed data</result>",
  "duration": 123,
  "processor": "Saxon-HE 12.5 (XSLT 2.0)"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message",
  "duration": 50
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable allowed origins
- **Input Validation**: Max 10MB per request
- **Timeout**: 30-second transformation timeout
- **Memory Limits**: 512MB max per transformation
- **File Cleanup**: Automatic temp file deletion
- **Helmet.js**: Security headers enabled

## Troubleshooting

### Saxon JAR Not Found

```bash
cd server
npm run download-saxon
npm run extract-saxon
```

Or manually:
1. Download from: https://github.com/Saxonica/Saxon-HE/releases
2. Extract `saxon-he-12.5.jar` to `server/saxon/`

### Java Not Found

Install Java 11 or later:

```bash
# Ubuntu/Debian
sudo apt-get install openjdk-11-jre

# macOS (Homebrew)
brew install openjdk@11

# Windows
# Download from https://adoptium.net/
```

### Port Already in Use

Change the port:

```bash
PORT=3002 npm start
```

Or edit `.env`:
```
PORT=3002
```

## Cloud Deployment

### Railway

1. Create new project
2. Connect GitHub repository
3. Set root directory to `server`
4. Deploy

### DigitalOcean App Platform

1. Create new app
2. Select "Docker Hub" or "GitHub"
3. Use `server/Dockerfile`
4. Deploy

### Fly.io

```bash
cd server
fly launch
fly deploy
```

## Performance

- **XSLT 1.0**: ~50-200ms (simple transformations)
- **XSLT 2.0/3.0**: ~100-500ms (complex transformations)
- **Large files** (>1MB): Significantly faster than client-side
- **Memory**: ~256MB idle, up to 512MB during transformation

## License

- Server code: MIT License
- Saxon-HE: Mozilla Public License 2.0

## Support

For issues or questions:
- GitHub Issues: https://github.com/YOUR_USERNAME/transio
- Documentation: https://transio.org/docs

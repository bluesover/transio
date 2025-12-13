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

- Node.js 18+ installed
- Java 11+ installed (`java -version`)
- npm or yarn

### Installation

```bash
cd server
npm install
npm run setup
npm start
```

The server will start on `http://localhost:3001`

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

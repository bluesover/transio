const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const SAXON_JAR = path.join(__dirname, 'saxon', 'saxon-he-12.5.jar');

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:5000', 'https://transio.org']
}));
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests, please try again later' }
});
app.use('/api/', limiter);

app.get('/api/health', (req, res) => {
  const saxonExists = fs.existsSync(SAXON_JAR);
  
  if (!saxonExists) {
    return res.status(503).json({
      status: 'error',
      error: 'Saxon-HE not found. Run: npm run setup',
      processor: 'Saxon-HE',
      version: '12.5'
    });
  }

  res.json({ 
    status: 'ok',
    processor: 'Saxon-HE',
    version: '12.5',
    javaVersion: process.env.JAVA_VERSION || 'Unknown'
  });
});

app.post('/api/transform', async (req, res) => {
  const { xml, xslt, version } = req.body;

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

  if (!fs.existsSync(SAXON_JAR)) {
    return res.status(503).json({
      success: false,
      error: 'Saxon-HE not installed. Run: npm run setup'
    });
  }

  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(7);
  const xmlFile = path.join(tempDir, `input-${timestamp}-${randomId}.xml`);
  const xsltFile = path.join(tempDir, `transform-${timestamp}-${randomId}.xslt`);
  const outputFile = path.join(tempDir, `output-${timestamp}-${randomId}.xml`);

  try {
    fs.writeFileSync(xmlFile, xml, 'utf8');
    fs.writeFileSync(xsltFile, xslt, 'utf8');

    const startTime = Date.now();
    const saxon = spawn('java', [
      '-jar', SAXON_JAR,
      `-s:${xmlFile}`,
      `-xsl:${xsltFile}`,
      `-o:${outputFile}`,
      '--suppressXsltNamespaceCheck:on'
    ], {
      timeout: 30000,
      env: { ...process.env, JAVA_OPTS: '-Xmx512m' }
    });

    let stderr = '';
    saxon.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    saxon.on('close', (code) => {
      const duration = Date.now() - startTime;

      try {
        fs.unlinkSync(xmlFile);
        fs.unlinkSync(xsltFile);
      } catch (e) {
        console.error('Error cleaning up input files:', e);
      }

      if (code !== 0) {
        try { fs.unlinkSync(outputFile); } catch (e) {}
        return res.json({
          success: false,
          error: stderr || 'Transformation failed',
          duration
        });
      }

      try {
        const output = fs.readFileSync(outputFile, 'utf8');
        fs.unlinkSync(outputFile);

        res.json({
          success: true,
          output,
          duration,
          processor: `Saxon-HE 12.5 (XSLT ${version || 'auto'})`
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
    try {
      if (fs.existsSync(xmlFile)) fs.unlinkSync(xmlFile);
      if (fs.existsSync(xsltFile)) fs.unlinkSync(xsltFile);
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    } catch (e) {}

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const server = app.listen(PORT, () => {
  console.log('\n🚀 Transio Saxon-HE API Server');
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`⚡ Transform endpoint: POST http://localhost:${PORT}/api/transform`);
  console.log(`\n📦 Saxon JAR: ${fs.existsSync(SAXON_JAR) ? '✅ Found' : '❌ Not found (run: npm run setup)'}\n`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

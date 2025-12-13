#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

const SAXON_VERSION = '12-5';
const SAXON_URL = `https://github.com/Saxonica/Saxon-HE/releases/download/SaxonHE12-5/SaxonHE12-5J.zip`;
const SAXON_PATH = path.join(__dirname, 'saxon');
const ZIP_FILE = path.join(SAXON_PATH, 'saxon.zip');
const JAR_FILE = path.join(SAXON_PATH, 'saxon-he-12.5.jar');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function banner() {
  console.log('');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log('  🚀 Transio Saxon-HE Server - One-Click Installer', 'bright');
  log('═══════════════════════════════════════════════════════════', 'cyan');
  console.log('');
}

function checkJava() {
  log('🔍 Checking Java installation...', 'blue');
  
  try {
    const javaVersion = execSync('java -version 2>&1', { encoding: 'utf8' });
    const versionMatch = javaVersion.match(/version "([^"]+)"/);
    
    if (versionMatch) {
      log(`✅ Java found: ${versionMatch[1]}`, 'green');
      return true;
    }
    
    log('✅ Java found', 'green');
    return true;
  } catch (error) {
    log('❌ Java not found!', 'red');
    log('', 'reset');
    log('Java is required to run Saxon-HE. Please install:', 'yellow');
    log('', 'reset');
    
    if (process.platform === 'win32') {
      log('Windows:', 'bright');
      log('  1. Download from: https://www.oracle.com/java/technologies/downloads/', 'reset');
      log('  2. Or install with chocolatey: choco install openjdk', 'reset');
      log('  3. Or install with winget: winget install Microsoft.OpenJDK.17', 'reset');
    } else if (process.platform === 'darwin') {
      log('macOS:', 'bright');
      log('  1. Install Homebrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"', 'reset');
      log('  2. Run: brew install openjdk@17', 'reset');
      log('  3. Or download from: https://www.oracle.com/java/technologies/downloads/', 'reset');
    } else {
      log('Linux:', 'bright');
      log('  Ubuntu/Debian: sudo apt-get install openjdk-17-jdk', 'reset');
      log('  Fedora/RHEL: sudo dnf install java-17-openjdk', 'reset');
      log('  Arch: sudo pacman -S jdk-openjdk', 'reset');
    }
    
    log('', 'reset');
    log('After installing Java, run this installer again.', 'yellow');
    return false;
  }
}

function checkNodeModules() {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    log('📦 Installing Node.js dependencies...', 'blue');
    try {
      execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
      log('✅ Dependencies installed', 'green');
    } catch (error) {
      log('❌ Failed to install dependencies', 'red');
      log('Please run: npm install', 'yellow');
      return false;
    }
  } else {
    log('✅ Node.js dependencies found', 'green');
  }
  
  return true;
}

async function downloadSaxon() {
  if (!fs.existsSync(SAXON_PATH)) {
    fs.mkdirSync(SAXON_PATH, { recursive: true });
  }

  if (fs.existsSync(JAR_FILE)) {
    log('✅ Saxon-HE already installed', 'green');
    return true;
  }

  if (fs.existsSync(ZIP_FILE)) {
    log('📦 Saxon-HE zip found, extracting...', 'blue');
    return extractSaxon();
  }

  log('📥 Downloading Saxon-HE 12.5...', 'blue');
  log(`   From: ${SAXON_URL}`, 'reset');
  
  const file = fs.createWriteStream(ZIP_FILE);
  let receivedBytes = 0;
  let totalBytes = 0;

  return new Promise((resolve, reject) => {
    https.get(SAXON_URL, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (redirectResponse) => {
          totalBytes = parseInt(redirectResponse.headers['content-length'] || '0', 10);
          
          redirectResponse.on('data', (chunk) => {
            receivedBytes += chunk.length;
            if (totalBytes > 0) {
              const percentage = ((receivedBytes / totalBytes) * 100).toFixed(1);
              const mb = (receivedBytes / 1024 / 1024).toFixed(2);
              const totalMb = (totalBytes / 1024 / 1024).toFixed(2);
              process.stdout.write(`\r   Progress: ${percentage}% (${mb}MB / ${totalMb}MB)`);
            }
          });

          redirectResponse.pipe(file);
          
          file.on('finish', () => {
            file.close();
            console.log('');
            log('✅ Saxon-HE downloaded', 'green');
            extractSaxon().then(resolve).catch(reject);
          });
        }).on('error', (err) => {
          fs.unlink(ZIP_FILE, () => {});
          reject(err);
        });
      } else if (response.statusCode === 200) {
        totalBytes = parseInt(response.headers['content-length'] || '0', 10);
        
        response.on('data', (chunk) => {
          receivedBytes += chunk.length;
          if (totalBytes > 0) {
            const percentage = ((receivedBytes / totalBytes) * 100).toFixed(1);
            const mb = (receivedBytes / 1024 / 1024).toFixed(2);
            const totalMb = (totalBytes / 1024 / 1024).toFixed(2);
            process.stdout.write(`\r   Progress: ${percentage}% (${mb}MB / ${totalMb}MB)`);
          }
        });

        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log('');
          log('✅ Saxon-HE downloaded', 'green');
          extractSaxon().then(resolve).catch(reject);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(ZIP_FILE, () => {});
      reject(err);
    });
  });
}

function extractSaxon() {
  return new Promise((resolve, reject) => {
    log('📦 Extracting Saxon-HE...', 'blue');
    
    try {
      if (process.platform === 'win32') {
        execSync(`powershell -command "Expand-Archive -Path '${ZIP_FILE}' -DestinationPath '${SAXON_PATH}' -Force"`, { 
          stdio: 'pipe'
        });
      } else {
        execSync(`unzip -o "${ZIP_FILE}" -d "${SAXON_PATH}"`, { 
          stdio: 'pipe'
        });
      }
      
      if (fs.existsSync(JAR_FILE)) {
        log('✅ Saxon-HE extracted successfully', 'green');
        resolve(true);
      } else {
        log('⚠️  Extraction completed but JAR not found', 'yellow');
        log('   Please extract saxon.zip manually to server/saxon/', 'reset');
        resolve(false);
      }
    } catch (error) {
      log('❌ Extraction failed', 'red');
      log('   Please extract saxon.zip manually to server/saxon/', 'yellow');
      resolve(false);
    }
  });
}

function testServer() {
  return new Promise((resolve) => {
    log('🧪 Testing server...', 'blue');
    
    const server = spawn('node', ['index.js'], {
      cwd: __dirname,
      env: { ...process.env, PORT: '3001' },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let output = '';
    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      output += data.toString();
    });

    setTimeout(() => {
      if (output.includes('Server running')) {
        log('✅ Server test passed', 'green');
        server.kill();
        resolve(true);
      } else {
        log('⚠️  Server test incomplete', 'yellow');
        server.kill();
        resolve(false);
      }
    }, 3000);

    server.on('error', (error) => {
      log('⚠️  Server test failed', 'yellow');
      log(`   ${error.message}`, 'reset');
      resolve(false);
    });
  });
}

function createLauncherScripts() {
  log('📝 Creating launcher scripts...', 'blue');
  
  const windowsLauncher = `@echo off
echo Starting Transio Saxon-HE Server...
cd /d "%~dp0"

if not exist "saxon\\saxon-he-12.5.jar" (
    echo ERROR: Saxon-HE not found!
    echo Please run: install.bat
    pause
    exit /b 1
)

echo Server starting on http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

node index.js

if errorlevel 1 (
    echo.
    echo ERROR: Server failed to start
    echo Check if Node.js is installed and port 3001 is available
    pause
)
`;

  const unixLauncher = `#!/bin/bash

echo "Starting Transio Saxon-HE Server..."
cd "$(dirname "$0")"

if [ ! -f "saxon/saxon-he-12.5.jar" ]; then
    echo "ERROR: Saxon-HE not found!"
    echo "Please run: ./install.sh"
    exit 1
fi

echo "Server starting on http://localhost:3001"
echo "Press Ctrl+C to stop the server"
echo ""

node index.js
`;

  try {
    fs.writeFileSync(path.join(__dirname, 'start-server.bat'), windowsLauncher);
    fs.writeFileSync(path.join(__dirname, 'start-server.sh'), unixLauncher);
    
    if (process.platform !== 'win32') {
      fs.chmodSync(path.join(__dirname, 'start-server.sh'), '755');
    }
    
    log('✅ Launcher scripts created', 'green');
  } catch (error) {
    log('⚠️  Could not create launcher scripts', 'yellow');
  }
}

function printSuccess() {
  console.log('');
  log('═══════════════════════════════════════════════════════════', 'green');
  log('  ✅ Installation Complete!', 'bright');
  log('═══════════════════════════════════════════════════════════', 'green');
  console.log('');
  log('🚀 To start the server:', 'bright');
  console.log('');
  
  if (process.platform === 'win32') {
    log('   Option 1: Double-click start-server.bat', 'cyan');
    log('   Option 2: Run: npm start', 'cyan');
  } else {
    log('   Option 1: Run: ./start-server.sh', 'cyan');
    log('   Option 2: Run: npm start', 'cyan');
  }
  
  console.log('');
  log('🌐 Server will be available at:', 'bright');
  log('   http://localhost:3001', 'cyan');
  console.log('');
  log('📊 Health check endpoint:', 'bright');
  log('   http://localhost:3001/api/health', 'cyan');
  console.log('');
  log('⚡ Transform endpoint:', 'bright');
  log('   POST http://localhost:3001/api/transform', 'cyan');
  console.log('');
  log('📖 For more information, see: server/README.md', 'reset');
  console.log('');
}

async function main() {
  banner();
  
  log('Starting installation process...', 'bright');
  console.log('');
  
  if (!checkJava()) {
    process.exit(1);
  }
  
  console.log('');
  
  if (!checkNodeModules()) {
    process.exit(1);
  }
  
  console.log('');
  
  try {
    await downloadSaxon();
  } catch (error) {
    log('❌ Failed to download Saxon-HE', 'red');
    log(`   Error: ${error.message}`, 'reset');
    log('', 'reset');
    log('Manual installation:', 'yellow');
    log(`   1. Download from: ${SAXON_URL}`, 'reset');
    log('   2. Extract to: server/saxon/', 'reset');
    log('   3. Ensure saxon-he-12.5.jar is present', 'reset');
    process.exit(1);
  }
  
  console.log('');
  createLauncherScripts();
  
  console.log('');
  await testServer();
  
  printSuccess();
}

main().catch((error) => {
  console.error('');
  log('❌ Installation failed:', 'red');
  log(`   ${error.message}`, 'reset');
  process.exit(1);
});

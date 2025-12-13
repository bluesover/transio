const https = require('https');
const fs = require('fs');
const path = require('path');

const SAXON_VERSION = '12-5';
const SAXON_URL = `https://github.com/Saxonica/Saxon-HE/releases/download/SaxonHE12-5/SaxonHE12-5J.zip`;
const DOWNLOAD_PATH = path.join(__dirname, '../saxon');
const ZIP_FILE = path.join(DOWNLOAD_PATH, 'saxon.zip');

async function downloadSaxon() {
  console.log('📦 Downloading Saxon-HE 12.5...');
  console.log(`📍 URL: ${SAXON_URL}`);
  
  if (!fs.existsSync(DOWNLOAD_PATH)) {
    fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });
  }

  if (fs.existsSync(ZIP_FILE)) {
    console.log('✅ Saxon-HE zip already downloaded');
    console.log('📝 Run: npm run extract-saxon (or extract manually)');
    return;
  }

  const file = fs.createWriteStream(ZIP_FILE);
  let receivedBytes = 0;

  return new Promise((resolve, reject) => {
    https.get(SAXON_URL, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (redirectResponse) => {
          const totalBytes = parseInt(redirectResponse.headers['content-length'], 10);
          
          redirectResponse.on('data', (chunk) => {
            receivedBytes += chunk.length;
            const percentage = ((receivedBytes / totalBytes) * 100).toFixed(1);
            process.stdout.write(`\r📥 Downloading: ${percentage}%`);
          });

          redirectResponse.pipe(file);
          
          file.on('finish', () => {
            file.close();
            console.log('\n✅ Saxon-HE downloaded successfully');
            console.log(`📁 Saved to: ${ZIP_FILE}`);
            console.log('\n📝 Next steps:');
            console.log('   1. Extract the zip file to server/saxon/');
            console.log('   2. Ensure saxon-he-12.5.jar is in server/saxon/');
            console.log('   3. Run: npm start\n');
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(ZIP_FILE, () => {});
          reject(err);
        });
      } else {
        const totalBytes = parseInt(response.headers['content-length'], 10);
        
        response.on('data', (chunk) => {
          receivedBytes += chunk.length;
          const percentage = ((receivedBytes / totalBytes) * 100).toFixed(1);
          process.stdout.write(`\r📥 Downloading: ${percentage}%`);
        });

        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log('\n✅ Saxon-HE downloaded successfully');
          console.log(`📁 Saved to: ${ZIP_FILE}`);
          console.log('\n📝 Next steps:');
          console.log('   1. Extract the zip file to server/saxon/');
          console.log('   2. Ensure saxon-he-12.5.jar is in server/saxon/');
          console.log('   3. Run: npm start\n');
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(ZIP_FILE, () => {});
      reject(err);
    });
  });
}

downloadSaxon().catch((error) => {
  console.error('❌ Download failed:', error.message);
  console.log('\n📝 Manual installation:');
  console.log(`   1. Download from: ${SAXON_URL}`);
  console.log('   2. Extract to: server/saxon/');
  console.log('   3. Ensure saxon-he-12.5.jar is present\n');
  process.exit(1);
});

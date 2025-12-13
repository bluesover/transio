const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SAXON_PATH = path.join(__dirname, '../saxon');
const ZIP_FILE = path.join(SAXON_PATH, 'saxon.zip');
const JAR_FILE = path.join(SAXON_PATH, 'saxon-he-12.5.jar');

console.log('📦 Extracting Saxon-HE...');

if (!fs.existsSync(ZIP_FILE)) {
  console.error('❌ saxon.zip not found. Run: npm run download-saxon');
  process.exit(1);
}

if (fs.existsSync(JAR_FILE)) {
  console.log('✅ saxon-he-12.5.jar already exists');
  console.log('🚀 Server is ready! Run: npm start\n');
  process.exit(0);
}

try {
  if (process.platform === 'win32') {
    execSync(`powershell -command "Expand-Archive -Path '${ZIP_FILE}' -DestinationPath '${SAXON_PATH}' -Force"`, { stdio: 'inherit' });
  } else {
    execSync(`unzip -o "${ZIP_FILE}" -d "${SAXON_PATH}"`, { stdio: 'inherit' });
  }
  
  if (fs.existsSync(JAR_FILE)) {
    console.log('\n✅ Saxon-HE extracted successfully');
    console.log(`📁 JAR file: ${JAR_FILE}`);
    console.log('🚀 Server is ready! Run: npm start\n');
  } else {
    console.log('\n⚠️  Extraction completed but saxon-he-12.5.jar not found');
    console.log('📝 Manual steps:');
    console.log('   1. Extract saxon.zip manually');
    console.log('   2. Copy saxon-he-12.5.jar to server/saxon/\n');
  }
} catch (error) {
  console.error('❌ Extraction failed:', error.message);
  console.log('\n📝 Manual extraction:');
  console.log(`   1. Extract ${ZIP_FILE} manually`);
  console.log('   2. Copy saxon-he-12.5.jar to server/saxon/\n');
  process.exit(1);
}

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🎨 Transio Icon Generator (Node.js)');
console.log('====================================');
console.log('');

const SOURCE_IMAGE = 'src/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png';
const ICONS_DIR = 'desktop-resources/icons';

if (!fs.existsSync(SOURCE_IMAGE)) {
  console.error(`❌ Error: Source image not found at ${SOURCE_IMAGE}`);
  console.error('');
  console.error('Please ensure your logo image exists at:');
  console.error(`   ${SOURCE_IMAGE}`);
  process.exit(1);
}

if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
  console.log(`✅ Created icons directory: ${ICONS_DIR}`);
}

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { stdio: 'inherit', shell: true });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    process.on('error', (err) => {
      reject(err);
    });
  });
}

async function checkCommand(command) {
  try {
    await runCommand(command, ['--version']);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('📦 Checking dependencies...');
  console.log('');
  
  const hasImageMagick = await checkCommand('convert');
  const hasMagick = await checkCommand('magick');
  
  if (!hasImageMagick && !hasMagick) {
    console.error('❌ ImageMagick is not installed');
    console.error('');
    console.error('Please install ImageMagick:');
    console.error('');
    console.error('macOS:');
    console.error('  brew install imagemagick');
    console.error('');
    console.error('Ubuntu/Debian:');
    console.error('  sudo apt-get install imagemagick');
    console.error('');
    console.error('Windows:');
    console.error('  Download from https://imagemagick.org/script/download.php#windows');
    console.error('  Make sure to add it to your PATH during installation');
    console.error('');
    console.error('Alternative: Use the provided batch/shell scripts instead:');
    console.error('  macOS/Linux: ./generate-icons.sh');
    console.error('  Windows: generate-icons.bat');
    console.error('');
    process.exit(1);
  }
  
  const convertCmd = hasImageMagick ? 'convert' : 'magick';
  console.log(`✅ ImageMagick found (using '${convertCmd}' command)`);
  console.log('');
  
  const pngSizes = [16, 24, 32, 48, 64, 96, 128, 256, 512, 1024];
  
  console.log('🖼️  Generating PNG icons...');
  for (const size of pngSizes) {
    try {
      const outputPath = path.join(ICONS_DIR, `${size}x${size}.png`);
      console.log(`   Creating ${size}x${size}.png...`);
      
      if (convertCmd === 'magick') {
        await runCommand('magick', [
          SOURCE_IMAGE,
          '-resize', `${size}x${size}`,
          '-background', 'none',
          '-gravity', 'center',
          '-extent', `${size}x${size}`,
          outputPath
        ]);
      } else {
        await runCommand('convert', [
          SOURCE_IMAGE,
          '-resize', `${size}x${size}`,
          '-background', 'none',
          '-gravity', 'center',
          '-extent', `${size}x${size}`,
          outputPath
        ]);
      }
    } catch (err) {
      console.error(`   ⚠️  Failed to create ${size}x${size}.png: ${err.message}`);
    }
  }
  
  console.log('');
  console.log('🪟 Generating Windows .ico file...');
  
  try {
    const icoSizes = [16, 24, 32, 48, 64, 128, 256];
    const tempDir = path.join(ICONS_DIR, 'temp_ico');
    
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    for (const size of icoSizes) {
      const outputPath = path.join(tempDir, `${size}.png`);
      
      if (convertCmd === 'magick') {
        await runCommand('magick', [
          SOURCE_IMAGE,
          '-resize', `${size}x${size}`,
          '-background', 'none',
          '-gravity', 'center',
          '-extent', `${size}x${size}`,
          outputPath
        ]);
      } else {
        await runCommand('convert', [
          SOURCE_IMAGE,
          '-resize', `${size}x${size}`,
          '-background', 'none',
          '-gravity', 'center',
          '-extent', `${size}x${size}`,
          outputPath
        ]);
      }
    }
    
    const icoFiles = icoSizes.map(size => path.join(tempDir, `${size}.png`));
    const icoPath = path.join(ICONS_DIR, 'icon.ico');
    
    if (convertCmd === 'magick') {
      await runCommand('magick', [...icoFiles, icoPath]);
    } else {
      await runCommand('convert', [...icoFiles, icoPath]);
    }
    
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('   ✅ icon.ico created');
  } catch (err) {
    console.error(`   ⚠️  Failed to create icon.ico: ${err.message}`);
  }
  
  console.log('');
  console.log('🍎 Note: macOS .icns generation requires additional tools');
  console.log('   Run ./generate-icons.sh on macOS/Linux to create icon.icns');
  console.log('');
  
  console.log('✅ Icon generation complete!');
  console.log('');
  console.log('Generated files in', ICONS_DIR + ':');
  
  const files = fs.readdirSync(ICONS_DIR).filter(f => f !== 'temp_ico');
  files.forEach(file => {
    const stats = fs.statSync(path.join(ICONS_DIR, file));
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ${file} (${sizeKB} KB)`);
  });
  
  console.log('');
  console.log('🎉 Desktop app icons are ready!');
  console.log('');
}

main().catch((err) => {
  console.error('');
  console.error('❌ Error:', err.message);
  console.error('');
  process.exit(1);
});

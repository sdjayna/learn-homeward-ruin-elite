const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if source images exist
const sourceIconPath = path.join(__dirname, 'assets', 'source-icon.png');
const sourceSplashPath = path.join(__dirname, 'assets', 'source-splash.png');

let missingFiles = [];

if (!fs.existsSync(sourceIconPath)) {
  missingFiles.push(sourceIconPath);
}

if (!fs.existsSync(sourceSplashPath)) {
  missingFiles.push(sourceSplashPath);
}

if (missingFiles.length > 0) {
  console.warn('\x1b[33m%s\x1b[0m', 'WARNING: The following source image files are missing:');
  missingFiles.forEach(file => {
    console.warn(`  - ${file}`);
  });
  console.warn('\x1b[33m%s\x1b[0m', 'Skipping icon and splash screen generation.');
  console.warn('\x1b[33m%s\x1b[0m', 'Please create these files to enable automatic asset generation.');
  process.exit(0); // Exit without error to allow build to continue
}

// Run the icon generation script
console.log('Generating PWA icons and splash screens...');
try {
  execSync('node src/generate-icons.js', { stdio: 'inherit' });
  console.log('\x1b[32m%s\x1b[0m', 'PWA assets generated successfully!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Error generating PWA assets:');
  console.error(error.message);
  // Don't exit with error to allow build to continue even if asset generation fails
}

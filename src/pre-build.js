import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for source images
const assetsDir = path.join(__dirname, 'assets');
const sourceIconPath = path.join(assetsDir, 'source-icon.png');
const sourceSplashPath = path.join(assetsDir, 'source-splash.png');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log(`Created directory: ${assetsDir}`);
}

// Generate placeholder images if they don't exist
let generatedPlaceholders = false;

async function generatePlaceholderImages() {
  // Create a simple placeholder icon if it doesn't exist
  if (!fs.existsSync(sourceIconPath)) {
    console.log(`Generating placeholder icon at ${sourceIconPath}`);
    
    try {
      // Create a 512x512 blue square with "ICON" text
      await sharp({
        create: {
          width: 512,
          height: 512,
          channels: 4,
          background: { r: 25, g: 118, b: 210, alpha: 1 } // #1976d2 (Angular blue)
        }
      })
      .composite([{
        input: Buffer.from(`<svg width="512" height="512">
          <text x="50%" y="50%" font-family="Arial" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle">ICON</text>
        </svg>`),
        top: 0,
        left: 0
      }])
      .png()
      .toFile(sourceIconPath);
      
      console.log(`Created placeholder icon at ${sourceIconPath}`);
      generatedPlaceholders = true;
    } catch (error) {
      console.error(`Error creating placeholder icon: ${error.message}`);
    }
  }

  // Create a simple placeholder splash screen if it doesn't exist
  if (!fs.existsSync(sourceSplashPath)) {
    console.log(`Generating placeholder splash screen at ${sourceSplashPath}`);
    
    try {
      // Create a 2732x2732 gradient with "SPLASH SCREEN" text
      await sharp({
        create: {
          width: 2732,
          height: 2732,
          channels: 4,
          background: { r: 25, g: 118, b: 210, alpha: 1 } // #1976d2 (Angular blue)
        }
      })
      .composite([{
        input: Buffer.from(`<svg width="2732" height="2732">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1976d2;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#0d47a1;stop-opacity:1" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="35" flood-color="black" flood-opacity="0.5" />
            </filter>
          </defs>
          <rect width="2732" height="2732" fill="url(#grad)" />
          <text x="50%" y="50%" font-family="Arial" font-size="150" fill="white" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">SPLASH SCREEN</text>
          <text x="50%" y="58%" font-family="Arial" font-size="100" fill="white" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">Learn Homeward Ruin Elite</text>
        </svg>`),
        top: 0,
        left: 0
      }])
      .png()
      .toFile(sourceSplashPath);
      
      console.log(`Created placeholder splash screen at ${sourceSplashPath}`);
      generatedPlaceholders = true;
    } catch (error) {
      console.error(`Error creating placeholder splash screen: ${error.message}`);
    }
  }
}

// Generate placeholder images if needed
await generatePlaceholderImages();

// If we just generated placeholders, inform the user
if (generatedPlaceholders) {
  console.log('\x1b[32m%s\x1b[0m', 'Generated placeholder images for testing purposes.');
  console.log('\x1b[32m%s\x1b[0m', 'Replace these with your actual designs before production deployment.');
}

// Run the icon generation script
console.log('Generating PWA icons and splash screens...');
try {
  execSync('node --no-warnings src/generate-icons.js', { stdio: 'inherit' });
  console.log('\x1b[32m%s\x1b[0m', 'PWA assets generated successfully!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Error generating PWA assets:');
  console.error(error.message);
  // Don't exit with error to allow build to continue even if asset generation fails
}

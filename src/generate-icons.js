const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure directories exist
const iconDir = path.join(__dirname, 'assets', 'icons');
const splashDir = path.join(__dirname, 'assets', 'splash');

if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// Define icon sizes
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Define splash screen sizes for different devices
const splashScreens = [
  { width: 640, height: 1136, name: 'splash-640x1136.png' }, // iPhone 5/SE
  { width: 750, height: 1334, name: 'splash-750x1334.png' }, // iPhone 6/7/8
  { width: 828, height: 1792, name: 'splash-828x1792.png' }, // iPhone XR/11
  { width: 1125, height: 2436, name: 'splash-1125x2436.png' }, // iPhone X/XS/11 Pro
  { width: 1242, height: 2688, name: 'splash-1242x2688.png' }, // iPhone XS Max/11 Pro Max
  { width: 1536, height: 2048, name: 'splash-1536x2048.png' }, // iPad Mini/Air
  { width: 1668, height: 2224, name: 'splash-1668x2224.png' }, // iPad Pro 10.5"
  { width: 1668, height: 2388, name: 'splash-1668x2388.png' }, // iPad Pro 11"
  { width: 2048, height: 2732, name: 'splash-2048x2732.png' }, // iPad Pro 12.9"
];

// Source image path - you should replace this with your actual source image
const sourceIconPath = path.join(__dirname, 'assets', 'source-icon.png');
const sourceSplashPath = path.join(__dirname, 'assets', 'source-splash.png');

// Check if source files exist
if (!fs.existsSync(sourceIconPath)) {
  console.error(`Source icon not found at ${sourceIconPath}`);
  console.log('Please create a high-resolution source icon (at least 512x512px) at this location.');
  process.exit(1);
}

if (!fs.existsSync(sourceSplashPath)) {
  console.error(`Source splash image not found at ${sourceSplashPath}`);
  console.log('Please create a high-resolution splash image (at least 2732x2732px) at this location.');
  process.exit(1);
}

// Generate icons
async function generateIcons() {
  console.log('Generating icons...');
  
  for (const size of iconSizes) {
    const outputPath = path.join(iconDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(sourceIconPath)
        .resize(size, size)
        .toFile(outputPath);
      
      console.log(`Created: ${outputPath}`);
    } catch (error) {
      console.error(`Error creating ${outputPath}:`, error);
    }
  }
}

// Generate splash screens
async function generateSplashScreens() {
  console.log('Generating splash screens...');
  
  for (const screen of splashScreens) {
    const outputPath = path.join(splashDir, screen.name);
    
    try {
      // Center the image and resize to cover the entire area
      await sharp(sourceSplashPath)
        .resize({
          width: screen.width,
          height: screen.height,
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);
      
      console.log(`Created: ${outputPath}`);
    } catch (error) {
      console.error(`Error creating ${outputPath}:`, error);
    }
  }
}

// Run the generation
async function run() {
  try {
    await generateIcons();
    await generateSplashScreens();
    console.log('All assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
  }
}

run();

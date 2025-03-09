import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m'
};

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for source images
const assetsDir = path.join(__dirname, 'assets');
const iconDir = path.join(assetsDir, 'icons');
const splashDir = path.join(assetsDir, 'splash');
const sourceIconPath = path.join(assetsDir, 'source-icon.png');
const sourceSplashPath = path.join(assetsDir, 'source-splash.png');

console.log(`${colors.cyan}PWA Asset Generator - Pre-build${colors.reset}`);
console.log(`${colors.cyan}=============================${colors.reset}`);

// Create necessary directories if they don't exist
const dirsToCheck = [assetsDir, iconDir, splashDir];
for (const dir of dirsToCheck) {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`${colors.green}✓ Created directory:${colors.reset} ${dir}`);
    } catch (error) {
      console.error(`${colors.red}✗ Failed to create directory:${colors.reset} ${dir}`);
      console.error(`  ${colors.red}Error:${colors.reset} ${error.message}`);
      console.error(`  ${colors.yellow}Troubleshooting:${colors.reset} Check file permissions or create manually`);
    }
  }
}

// Check if source files exist and provide detailed information
function checkSourceFiles() {
  console.log(`\n${colors.cyan}Checking source files...${colors.reset}`);
  
  const sourceFiles = [
    { 
      path: sourceIconPath, 
      name: 'Icon', 
      minSize: 512, 
      recommendedSize: '512x512',
      description: 'Used to generate all app icons' 
    },
    { 
      path: sourceSplashPath, 
      name: 'Splash Screen', 
      minSize: 2732, 
      recommendedSize: '2732x2732',
      description: 'Used to generate all splash screens' 
    }
  ];
  
  let allFilesExist = true;
  
  for (const file of sourceFiles) {
    if (fs.existsSync(file.path)) {
      try {
        const stats = fs.statSync(file.path);
        const fileSizeKB = (stats.size / 1024).toFixed(2);
        
        // Try to get image dimensions
        try {
          const metadata = sharp(file.path).metadata();
          metadata.then(info => {
            console.log(`${colors.green}✓ ${file.name} found:${colors.reset} ${file.path}`);
            console.log(`  Size: ${fileSizeKB} KB, Dimensions: ${info.width}x${info.height} pixels`);
            
            // Warn if image is smaller than recommended
            if (info.width < file.minSize || info.height < file.minSize) {
              console.log(`  ${colors.brightYellow}⚠ Warning:${colors.reset} Image is smaller than recommended (${file.recommendedSize}px)`);
              console.log(`  ${colors.yellow}This may result in lower quality assets${colors.reset}`);
            }
          });
        } catch (err) {
          console.log(`${colors.green}✓ ${file.name} found:${colors.reset} ${file.path} (${fileSizeKB} KB)`);
          console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} Could not read image dimensions`);
        }
      } catch (error) {
        console.log(`${colors.green}✓ ${file.name} found:${colors.reset} ${file.path}`);
        console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} Could not read file stats: ${error.message}`);
      }
    } else {
      console.log(`${colors.red}✗ ${file.name} missing:${colors.reset} ${file.path}`);
      console.log(`  ${colors.yellow}Description:${colors.reset} ${file.description}`);
      console.log(`  ${colors.yellow}Required size:${colors.reset} At least ${file.recommendedSize} pixels`);
      console.log(`  ${colors.yellow}Action:${colors.reset} Will generate a placeholder automatically`);
      allFilesExist = false;
    }
  }
  
  return allFilesExist;
}

// Generate placeholder images if they don't exist
let generatedPlaceholders = false;

async function generatePlaceholderImages() {
  console.log(`\n${colors.cyan}Checking for missing source files...${colors.reset}`);
  
  // Create a simple placeholder icon if it doesn't exist
  if (!fs.existsSync(sourceIconPath)) {
    console.log(`${colors.yellow}Generating placeholder icon at:${colors.reset} ${sourceIconPath}`);
    
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
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1976d2;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#0d47a1;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" fill="url(#grad)" />
          <text x="50%" y="50%" font-family="Arial" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle">ICON</text>
          <text x="50%" y="70%" font-family="Arial" font-size="36" fill="white" text-anchor="middle" dominant-baseline="middle">LHRE</text>
        </svg>`),
        top: 0,
        left: 0
      }])
      .png()
      .toFile(sourceIconPath);
      
      // Verify the file was created
      if (fs.existsSync(sourceIconPath)) {
        const stats = fs.statSync(sourceIconPath);
        console.log(`${colors.green}✓ Created placeholder icon:${colors.reset} ${sourceIconPath} (${(stats.size / 1024).toFixed(2)} KB)`);
        generatedPlaceholders = true;
      } else {
        console.error(`${colors.red}✗ Failed to create placeholder icon:${colors.reset} File not found after creation attempt`);
      }
    } catch (error) {
      console.error(`${colors.red}✗ Error creating placeholder icon:${colors.reset} ${error.message}`);
      console.error(`  ${colors.yellow}Troubleshooting:${colors.reset}`);
      console.error(`  1. Check if the 'sharp' package is installed correctly: npm install sharp`);
      console.error(`  2. Check file permissions in the assets directory`);
      console.error(`  3. Try creating the file manually`);
    }
  }

  // Create a simple placeholder splash screen if it doesn't exist
  if (!fs.existsSync(sourceSplashPath)) {
    console.log(`${colors.yellow}Generating placeholder splash screen at:${colors.reset} ${sourceSplashPath}`);
    
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
      
      // Verify the file was created
      if (fs.existsSync(sourceSplashPath)) {
        const stats = fs.statSync(sourceSplashPath);
        console.log(`${colors.green}✓ Created placeholder splash screen:${colors.reset} ${sourceSplashPath} (${(stats.size / 1024).toFixed(2)} KB)`);
        generatedPlaceholders = true;
      } else {
        console.error(`${colors.red}✗ Failed to create placeholder splash screen:${colors.reset} File not found after creation attempt`);
      }
    } catch (error) {
      console.error(`${colors.red}✗ Error creating placeholder splash screen:${colors.reset} ${error.message}`);
      console.error(`  ${colors.yellow}Troubleshooting:${colors.reset}`);
      console.error(`  1. Check if the 'sharp' package is installed correctly: npm install sharp`);
      console.error(`  2. Check file permissions in the assets directory`);
      console.error(`  3. Try creating the file manually`);
    }
  }
}

// Check source files first
const sourceFilesExist = checkSourceFiles();

// Generate placeholder images if needed
await generatePlaceholderImages();

// If we just generated placeholders, inform the user
if (generatedPlaceholders) {
  console.log(`\n${colors.brightYellow}⚠ Notice:${colors.reset}`);
  console.log(`${colors.yellow}Generated placeholder images for testing purposes.${colors.reset}`);
  console.log(`${colors.yellow}Replace these with your actual designs before production deployment.${colors.reset}`);
  console.log(`${colors.yellow}Locations:${colors.reset}`);
  console.log(`  - Icon: ${sourceIconPath}`);
  console.log(`  - Splash Screen: ${sourceSplashPath}`);
}

// Verify source files exist before proceeding
if (!fs.existsSync(sourceIconPath) || !fs.existsSync(sourceSplashPath)) {
  console.error(`\n${colors.brightRed}✗ Critical Error:${colors.reset} Source files still missing after attempted generation`);
  console.error(`${colors.yellow}Please manually create the following files:${colors.reset}`);
  if (!fs.existsSync(sourceIconPath)) {
    console.error(`  - ${sourceIconPath} (512x512 PNG recommended)`);
  }
  if (!fs.existsSync(sourceSplashPath)) {
    console.error(`  - ${sourceSplashPath} (2732x2732 PNG recommended)`);
  }
  console.error(`${colors.yellow}Or check permissions on the directory.${colors.reset}`);
  // Continue anyway to allow build to proceed
  console.log(`\n${colors.brightYellow}⚠ Warning:${colors.reset} Continuing build process despite missing source files`);
}

// Run the icon generation script
console.log(`\n${colors.cyan}Generating PWA icons and splash screens...${colors.reset}`);
try {
  console.log(`${colors.yellow}Executing:${colors.reset} node --no-warnings src/generate-icons.js`);
  
  // Check if generate-icons.js exists
  const generateIconsPath = path.join(__dirname, 'generate-icons.js');
  if (!fs.existsSync(generateIconsPath)) {
    console.error(`${colors.red}✗ Error:${colors.reset} generate-icons.js not found at ${generateIconsPath}`);
    throw new Error('generate-icons.js script not found');
  }
  
  // Execute the script with detailed error handling
  try {
    execSync('node --no-warnings src/generate-icons.js', { stdio: 'inherit' });
    console.log(`\n${colors.green}✓ PWA assets generated successfully!${colors.reset}`);
  } catch (execError) {
    throw new Error(`Script execution failed: ${execError.message}`);
  }
} catch (error) {
  console.error(`\n${colors.brightRed}✗ Error generating PWA assets:${colors.reset}`);
  console.error(`${colors.red}${error.message}${colors.reset}`);
  console.error(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
  console.error(`1. Check if src/generate-icons.js exists`);
  console.error(`2. Verify the 'sharp' package is installed: npm install sharp`);
  console.error(`3. Check file permissions in the assets directory`);
  console.error(`4. Try running the script manually: node --no-warnings src/generate-icons.js`);
  // Don't exit with error to allow build to continue even if asset generation fails
}

// Final summary
console.log(`\n${colors.cyan}PWA Asset Generation Summary${colors.reset}`);
console.log(`${colors.cyan}===========================${colors.reset}`);

try {
  const iconFiles = fs.existsSync(iconDir) ? fs.readdirSync(iconDir).filter(file => file.endsWith('.png')) : [];
  const splashFiles = fs.existsSync(splashDir) ? fs.readdirSync(splashDir).filter(file => file.endsWith('.png')) : [];
  
  console.log(`${colors.green}✓ Icons generated:${colors.reset} ${iconFiles.length}`);
  console.log(`${colors.green}✓ Splash screens generated:${colors.reset} ${splashFiles.length}`);
  
  if (iconFiles.length === 0 || splashFiles.length === 0) {
    console.log(`\n${colors.brightYellow}⚠ Warning:${colors.reset} Some assets may be missing`);
    if (iconFiles.length === 0) console.log(`  ${colors.yellow}No icon files found in:${colors.reset} ${iconDir}`);
    if (splashFiles.length === 0) console.log(`  ${colors.yellow}No splash screen files found in:${colors.reset} ${splashDir}`);
  }
  
  // Check manifest.webmanifest
  const manifestPath = path.join(__dirname, 'manifest.webmanifest');
  if (fs.existsSync(manifestPath)) {
    console.log(`${colors.green}✓ manifest.webmanifest found:${colors.reset} ${manifestPath}`);
    
    // Basic validation of manifest
    try {
      const manifestContent = fs.readFileSync(manifestPath, 'utf8');
      const manifest = JSON.parse(manifestContent);
      
      if (!manifest.icons || manifest.icons.length === 0) {
        console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} No icons defined in manifest`);
      }
      
      if (!manifest.screenshots || manifest.screenshots.length === 0) {
        console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} No screenshots/splash screens defined in manifest`);
      }
    } catch (error) {
      console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} Could not validate manifest: ${error.message}`);
    }
  } else {
    console.log(`${colors.yellow}⚠ Warning:${colors.reset} manifest.webmanifest not found at ${manifestPath}`);
  }
} catch (error) {
  console.error(`${colors.red}Error checking generated files:${colors.reset} ${error.message}`);
}

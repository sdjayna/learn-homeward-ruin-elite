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
const screenshotsDir = path.join(assetsDir, 'screenshots');
const sourceDir = path.join(assetsDir, 'source');
const sourceIconPath = path.join(sourceDir, 'icon.png');
const sourceNarrowSplashPath = path.join(sourceDir, 'narrow-splash.png');
const sourceWideSplashPath = path.join(sourceDir, 'wide-splash.png');
const sourceNarrowScreenshotPath = path.join(sourceDir, 'narrow-screenshot.png');
const sourceWideScreenshotPath = path.join(sourceDir, 'wide-screenshot.png');

console.log(`${colors.cyan}PWA Asset Generator - Pre-build${colors.reset}`);
console.log(`${colors.cyan}=============================${colors.reset}`);

// Create necessary directories if they don't exist
const dirsToCheck = [assetsDir, iconDir, splashDir, sourceDir, screenshotsDir];
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
      path: sourceNarrowSplashPath, 
      name: 'Narrow Splash Screen', 
      minSize: 1242, 
      recommendedSize: '1242x2688',
      description: 'Used to generate mobile splash screens' 
    },
    { 
      path: sourceWideSplashPath, 
      name: 'Wide Splash Screen', 
      minSize: 2048, 
      recommendedSize: '2048x2732',
      description: 'Used to generate tablet splash screens' 
    },
    {
      path: sourceNarrowScreenshotPath,
      name: 'Narrow Screenshot',
      minSize: 750,
      recommendedSize: '750x1334',
      description: 'Used for narrow (mobile) screenshots'
    },
    {
      path: sourceWideScreenshotPath,
      name: 'Wide Screenshot',
      minSize: 1920,
      recommendedSize: '1920x1080',
      description: 'Used for wide (desktop) screenshots'
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

// Function to check for missing source files
function checkMissingSourceFiles() {
  console.log(`\n${colors.cyan}Checking for missing source files...${colors.reset}`);
  
  const missingFiles = [];
  
  if (!fs.existsSync(sourceIconPath)) {
    missingFiles.push({
      path: sourceIconPath,
      name: 'Icon',
      recommendedSize: '512x512'
    });
  }
  
  if (!fs.existsSync(sourceNarrowSplashPath)) {
    missingFiles.push({
      path: sourceNarrowSplashPath,
      name: 'Narrow Splash Screen',
      recommendedSize: '1242x2688'
    });
  }
  
  if (!fs.existsSync(sourceWideSplashPath)) {
    missingFiles.push({
      path: sourceWideSplashPath,
      name: 'Wide Splash Screen',
      recommendedSize: '2048x2732'
    });
  }
  
  if (!fs.existsSync(sourceNarrowScreenshotPath)) {
    missingFiles.push({
      path: sourceNarrowScreenshotPath,
      name: 'Narrow Screenshot',
      recommendedSize: '750x1334'
    });
  }
  
  if (!fs.existsSync(sourceWideScreenshotPath)) {
    missingFiles.push({
      path: sourceWideScreenshotPath,
      name: 'Wide Screenshot',
      recommendedSize: '1920x1080'
    });
  }
  
  if (missingFiles.length > 0) {
    console.log(`${colors.yellow}Missing source files:${colors.reset}`);
    missingFiles.forEach(file => {
      console.log(`  - ${colors.red}✗ ${file.name}:${colors.reset} ${file.path}`);
      console.log(`    ${colors.yellow}Recommended size:${colors.reset} ${file.recommendedSize}`);
    });
  } else {
    console.log(`${colors.green}✓ All required source files are present${colors.reset}`);
  }
  
  return missingFiles.length === 0;
}

// Check source files first
const sourceFilesExist = checkSourceFiles();

// Check for missing source files
checkMissingSourceFiles();

// Verify source files exist before proceeding
if (!fs.existsSync(sourceIconPath) || (!fs.existsSync(sourceNarrowSplashPath) && !fs.existsSync(sourceWideSplashPath))) {
  console.error(`\n${colors.brightRed}✗ Critical Error:${colors.reset} Required source files are missing`);
  console.error(`${colors.yellow}Please create the following files:${colors.reset}`);
  if (!fs.existsSync(sourceIconPath)) {
    console.error(`  - ${sourceIconPath} (512x512 PNG recommended)`);
  }
  if (!fs.existsSync(sourceNarrowSplashPath)) {
    console.error(`  - ${sourceNarrowSplashPath} (1242x2688 PNG recommended for mobile)`);
  }
  if (!fs.existsSync(sourceWideSplashPath)) {
    console.error(`  - ${sourceWideSplashPath} (2048x2732 PNG recommended for tablets)`);
  }
  console.error(`${colors.yellow}The build will continue but icon and splash screen generation may fail.${colors.reset}`);
  console.log(`\n${colors.brightYellow}⚠ Warning:${colors.reset} Continuing build process despite missing source files`);
}

// Warn about missing screenshot source files but don't block the build
if (!fs.existsSync(sourceNarrowScreenshotPath) || !fs.existsSync(sourceWideScreenshotPath)) {
  console.log(`\n${colors.brightYellow}⚠ Warning:${colors.reset} Screenshot source files are missing:`);
  if (!fs.existsSync(sourceNarrowScreenshotPath)) {
    console.log(`  - ${sourceNarrowScreenshotPath} (750x1334 PNG recommended for mobile)`);
  }
  if (!fs.existsSync(sourceWideScreenshotPath)) {
    console.log(`  - ${sourceWideScreenshotPath} (1920x1080 PNG recommended for desktop)`);
  }
  console.log(`${colors.yellow}Screenshot generation will be skipped for missing source files.${colors.reset}`);
}

// Run the icon and screenshot generation script
console.log(`\n${colors.cyan}Generating PWA icons, splash screens, and screenshots...${colors.reset}`);
try {
  console.log(`${colors.yellow}Executing:${colors.reset} node --no-warnings src/generate-icons-and-screenshots.js`);
    
  // Check if generate-icons-and-screenshots.js exists
  const generateIconsPath = path.join(__dirname, 'generate-icons-and-screenshots.js');
  if (!fs.existsSync(generateIconsPath)) {
    console.error(`${colors.red}✗ Error:${colors.reset} generate-icons-and-screenshots.js not found at ${generateIconsPath}`);
    throw new Error('generate-icons-and-screenshots.js script not found');
  }
    
  // Execute the script with detailed error handling
  try {
    execSync('node --no-warnings src/generate-icons-and-screenshots.js', { stdio: 'inherit' });
    console.log(`\n${colors.green}✓ PWA assets generated successfully!${colors.reset}`);
  } catch (execError) {
    throw new Error(`Script execution failed: ${execError.message}`);
  }
} catch (error) {
  console.error(`\n${colors.brightRed}✗ Error generating PWA assets:${colors.reset}`);
  console.error(`${colors.red}${error.message}${colors.reset}`);
  console.error(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
  console.error(`1. Check if src/generate-icons-and-screenshots.js exists`);
  console.error(`2. Verify the 'sharp' package is installed: npm install sharp`);
  console.error(`3. Check file permissions in the assets directory`);
  console.error(`4. Try running the script manually: node --no-warnings src/generate-icons-and-screenshots.js`);
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

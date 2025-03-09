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
  brightYellow: '\x1b[93m'
};

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const assetsDir = path.join(__dirname, 'assets');
const iconDir = path.join(assetsDir, 'icons');
const splashDir = path.join(assetsDir, 'splash');
const screenshotsDir = path.join(assetsDir, 'screenshots');
const sourceDir = path.join(assetsDir, 'source');
const sourceIconPath = path.join(sourceDir, 'icon.png');
const sourceSplashPath = path.join(sourceDir, 'splash.png');
const sourceNarrowScreenshotPath = path.join(sourceDir, 'narrow-screenshot.png');
const sourceWideScreenshotPath = path.join(sourceDir, 'wide-screenshot.png');
const manifestPath = path.join(__dirname, 'manifest.webmanifest');

// Ensure directories exist
const dirsToCheck = [assetsDir, iconDir, splashDir, sourceDir, screenshotsDir];
for (const dir of dirsToCheck) {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`${colors.green}Created directory:${colors.reset} ${dir}`);
    } catch (error) {
      console.error(`${colors.red}Failed to create directory:${colors.reset} ${dir}`);
      console.error(`${colors.red}Error:${colors.reset} ${error.message}`);
      console.error(`${colors.yellow}Troubleshooting:${colors.reset} Check file permissions or create manually`);
    }
  }
}

// Define icon sizes
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Define splash screen sizes for different devices
const splashScreens = [
  { width: 640, height: 1136, name: 'splash-640x1136.png', device: 'iPhone 5/SE' },
  { width: 750, height: 1334, name: 'splash-750x1334.png', device: 'iPhone 6/7/8' },
  { width: 828, height: 1792, name: 'splash-828x1792.png', device: 'iPhone XR/11' },
  { width: 1125, height: 2436, name: 'splash-1125x2436.png', device: 'iPhone X/XS/11 Pro' },
  { width: 1242, height: 2688, name: 'splash-1242x2688.png', device: 'iPhone XS Max/11 Pro Max' },
  { width: 1536, height: 2048, name: 'splash-1536x2048.png', device: 'iPad Mini/Air' },
  { width: 1668, height: 2224, name: 'splash-1668x2224.png', device: 'iPad Pro 10.5"' },
  { width: 1668, height: 2388, name: 'splash-1668x2388.png', device: 'iPad Pro 11"' },
  { width: 2048, height: 2732, name: 'splash-2048x2732.png', device: 'iPad Pro 12.9"' },
];

// Check source files with detailed information
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
        // Get file stats
        const stats = fs.statSync(file.path);
        const fileSizeKB = (stats.size / 1024).toFixed(2);
        
        // Check image dimensions
        const metadata = sharp(file.path).metadata();
        metadata.then(info => {
          console.log(`${colors.green}✓ ${file.name} found:${colors.reset} ${file.path}`);
          console.log(`  Size: ${fileSizeKB} KB, Dimensions: ${info.width}x${info.height} pixels`);
          
          // Warn if image is smaller than recommended
          if (info.width < file.minSize || info.height < file.minSize) {
            console.log(`  ${colors.brightYellow}⚠ Warning:${colors.reset} Image is smaller than recommended (${file.recommendedSize}px)`);
            console.log(`  ${colors.yellow}This may result in lower quality assets${colors.reset}`);
          }
        }).catch(err => {
          console.log(`${colors.green}✓ ${file.name} found:${colors.reset} ${file.path} (${fileSizeKB} KB)`);
          console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} Could not read image dimensions: ${err.message}`);
        });
      } catch (error) {
        console.log(`${colors.green}✓ ${file.name} found:${colors.reset} ${file.path}`);
        console.log(`  ${colors.yellow}⚠ Warning:${colors.reset} Could not read file stats: ${error.message}`);
      }
    } else {
      console.log(`${colors.red}✗ ${file.name} missing:${colors.reset} ${file.path}`);
      console.log(`  ${colors.yellow}Description:${colors.reset} ${file.description}`);
      console.log(`  ${colors.yellow}Required size:${colors.reset} At least ${file.recommendedSize} pixels`);
      allFilesExist = false;
    }
  }
  
  return allFilesExist;
}

// Check if source files exist
const sourceFilesExist = checkSourceFiles();

if (!sourceFilesExist) {
  console.error(`\n${colors.brightRed}✗ Critical Error:${colors.reset} Source files missing`);
  console.error(`${colors.yellow}Required files:${colors.reset}`);
  if (!fs.existsSync(sourceIconPath)) {
    console.error(`  - ${sourceIconPath} (512x512 PNG recommended)`);
    console.error(`    ${colors.yellow}Purpose:${colors.reset} Used to generate all app icons`);
  }
  if (!fs.existsSync(sourceSplashPath)) {
    console.error(`  - ${sourceSplashPath} (2732x2732 PNG recommended)`);
    console.error(`    ${colors.yellow}Purpose:${colors.reset} Used to generate all splash screens`);
  }
  console.error(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
  console.error(`1. Create these files manually, or`);
  console.error(`2. Run the pre-build.js script which will generate placeholders:`);
  console.error(`   ${colors.cyan}node --no-warnings src/pre-build.js${colors.reset}`);
  process.exit(1);
}

// Generate icons
async function generateIcons() {
  console.log(`\n${colors.cyan}Generating icons...${colors.reset}`);
  let successCount = 0;
  let errorCount = 0;
  
  for (const size of iconSizes) {
    const outputPath = path.join(iconDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(sourceIconPath)
        .resize(size, size)
        .toFile(outputPath);
      
      console.log(`${colors.green}✓ Created:${colors.reset} ${outputPath}`);
      successCount++;
    } catch (error) {
      console.error(`${colors.red}✗ Error creating ${outputPath}:${colors.reset} ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`${colors.cyan}Icon generation complete:${colors.reset} ${successCount} succeeded, ${errorCount} failed`);
  return { successCount, errorCount };
}

// Generate splash screens
async function generateSplashScreens() {
  console.log(`\n${colors.cyan}Generating splash screens...${colors.reset}`);
  let successCount = 0;
  let errorCount = 0;
  
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
      
      console.log(`${colors.green}✓ Created:${colors.reset} ${outputPath} (${screen.device})`);
      successCount++;
    } catch (error) {
      console.error(`${colors.red}✗ Error creating ${outputPath}:${colors.reset} ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`${colors.cyan}Splash screen generation complete:${colors.reset} ${successCount} succeeded, ${errorCount} failed`);
  return { successCount, errorCount };
}

// Generate screenshots
async function generateScreenshots() {
  // Load manifest to get screenshot definitions
  let screenshots = [];
  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    if (manifest && manifest.screenshots) {
      screenshots = manifest.screenshots.filter(s => !s.src.includes('splash/splash-'));
    }
  } catch (error) {
    console.error(`${colors.red}Failed to load manifest:${colors.reset} ${error.message}`);
  }

  if (screenshots.length === 0) {
    console.log(`\n${colors.yellow}No screenshots defined in manifest${colors.reset}`);
    return { successCount: 0, errorCount: 0 };
  }
  
  console.log(`\n${colors.cyan}Generating screenshots...${colors.reset}`);
  let successCount = 0;
  let errorCount = 0;
  
  for (const screenshot of screenshots) {
    const outputPath = path.join(__dirname, screenshot.src);
    const outputDir = path.dirname(outputPath);
    
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      try {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`${colors.green}Created directory:${colors.reset} ${outputDir}`);
      } catch (error) {
        console.error(`${colors.red}Failed to create directory:${colors.reset} ${outputDir}`);
        errorCount++;
        continue;
      }
    }
    
    // Determine which source file to use based on form factor
    let sourcePath;
    if (screenshot.form_factor === 'narrow') {
      sourcePath = sourceNarrowScreenshotPath;
    } else if (screenshot.form_factor === 'wide') {
      sourcePath = sourceWideScreenshotPath;
    } else {
      // Default to narrow for unknown form factors
      sourcePath = sourceNarrowScreenshotPath;
    }
    
    // Skip if the source file doesn't exist
    if (!fs.existsSync(sourcePath)) {
      console.log(`${colors.yellow}⚠ Skipping:${colors.reset} ${outputPath} (source file ${sourcePath} not found)`);
      continue;
    }
    
    try {
      // Generate the screenshot with the correct dimensions
      await sharp(sourcePath)
        .resize({
          width: parseInt(screenshot.sizes.split('x')[0], 10),
          height: parseInt(screenshot.sizes.split('x')[1], 10),
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);
      
      console.log(`${colors.green}✓ Created:${colors.reset} ${outputPath} (${screenshot.sizes}, ${screenshot.form_factor})`);
      successCount++;
    } catch (error) {
      console.error(`${colors.red}✗ Error creating ${outputPath}:${colors.reset} ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`${colors.cyan}Screenshot generation complete:${colors.reset} ${successCount} succeeded, ${errorCount} failed`);
  return { successCount, errorCount };
}

// Run the generation
async function run() {
  try {
    console.log(`\n${colors.cyan}PWA Asset Generator${colors.reset}`);
    console.log(`${colors.cyan}===================${colors.reset}`);
    
    // Generate assets
    const iconResults = await generateIcons();
    const splashResults = await generateSplashScreens();
    const screenshotResults = await generateScreenshots();
    
    // Calculate totals
    const totalSuccess = iconResults.successCount + splashResults.successCount + screenshotResults.successCount;
    const totalError = iconResults.errorCount + splashResults.errorCount + screenshotResults.errorCount;
    const totalAssets = totalSuccess + totalError;
    
    // Print summary
    console.log(`\n${colors.cyan}Generation Summary${colors.reset}`);
    console.log(`${colors.cyan}==================${colors.reset}`);
    console.log(`${colors.green}✓ Total assets generated:${colors.reset} ${totalSuccess}/${totalAssets} (${totalAssets > 0 ? Math.round(totalSuccess/totalAssets*100) : 0}%)`);
    console.log(`${colors.green}✓ Icons generated:${colors.reset} ${iconResults.successCount}/${iconSizes.length}`);
    console.log(`${colors.green}✓ Splash screens generated:${colors.reset} ${splashResults.successCount}/${splashScreens.length}`);
    console.log(`${colors.green}✓ Screenshots generated:${colors.reset} ${screenshotResults.successCount}`);
    
    if (totalError > 0) {
      console.log(`\n${colors.brightYellow}⚠ Warning:${colors.reset} ${totalError} assets failed to generate`);
      console.log(`${colors.yellow}Check the logs above for specific errors${colors.reset}`);
    } else {
      console.log(`\n${colors.green}All assets generated successfully!${colors.reset}`);
    }
    
    // Verify manifest.webmanifest exists
    const manifestPath = path.join(__dirname, 'manifest.webmanifest');
    if (!fs.existsSync(manifestPath)) {
      console.log(`\n${colors.brightYellow}⚠ Warning:${colors.reset} manifest.webmanifest not found at ${manifestPath}`);
      console.log(`${colors.yellow}Make sure to create this file and include references to your generated assets${colors.reset}`);
    }
    
  } catch (error) {
    console.error(`\n${colors.brightRed}✗ Error generating assets:${colors.reset} ${error.message}`);
    console.error(`${colors.yellow}Troubleshooting:${colors.reset}`);
    console.error(`1. Check if source files exist and are valid images`);
    console.error(`2. Verify the 'sharp' package is installed: npm install sharp`);
    console.error(`3. Check file permissions in the assets directory`);
    process.exit(1);
  }
}

run();

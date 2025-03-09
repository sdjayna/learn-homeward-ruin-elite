# Learn Homeward Ruin Elite

A Progressive Web Application (PWA) built with Angular CLI version 19.1.6. This application is optimized for mobile and desktop use with full offline capabilities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [PWA Features](#pwa-features)
  - [Service Worker Implementation](#service-worker-implementation)
  - [Offline Support](#offline-support)
  - [Installation on Devices](#installation-on-devices)
- [PWA Assets](#pwa-assets)
  - [Icons and Splash Screens](#icons-and-splash-screens)
  - [Updating Icons and Splash Screens](#updating-icons-and-splash-screens)
- [Security Headers](#security-headers)
- [Angular CLI Commands](#angular-cli-commands)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later recommended)
- Angular CLI (`npm install -g @angular/cli`)
- Wrangler CLI for Cloudflare Pages deployment (`npm install -g wrangler`)
- Sharp image processing library (for PWA asset generation)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd learn-homeward-ruin-elite
npm install
```

## Development

Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

Build the application for production:

```bash
ng build
```

This will create a production build in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

The build process automatically runs the pre-build script which checks for the source images (`src/assets/source-icon.png` and `src/assets/source-splash.png`). If these files are missing, the build will generate placeholder images but will display a warning.

To manually generate PWA assets:

```bash
node src/generate-icons.js
```

To build with specific configurations:

```bash
# Development build
ng build --configuration=development

# Production build with source maps
ng build --source-map
```

## Deployment

Deploy the application to Cloudflare Pages:

```bash
# Make sure you're logged in to Cloudflare
wrangler login

# Build the application
ng build

# Deploy to Cloudflare Pages
wrangler pages deploy
```

After deployment, Wrangler will provide a URL where your application is accessible.

For quick deployment and log viewing, you can use the included script:

```bash
./deploy-and-tail.sh
```

This script builds the application, deploys it to Cloudflare Pages, and then shows the deployment logs.

### Custom Headers and Redirects

The application includes custom headers and redirects configuration in the `public/_headers` and `public/_redirects` files, which are automatically included in the build. These files configure:

- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Caching policies (Cache-Control, Pragma, Expires)
- URL redirects (all routes to index.html for SPA support)

## PWA Features

### Service Worker Implementation

This application uses a custom service worker implementation with the following features:

- **Inline Registration**: Service worker is registered directly in `index.html` with fallback handling
- **Status Monitoring**: Visual feedback about PWA status in the UI
- **Cache Management**: Caching of core application files for offline use
- **Update Handling**: Detection and notification of service worker updates
- **Multilingual Support**: Handles resources in English, French, and Spanish

The service worker registration process:
1. Unregisters any existing service workers to ensure a clean state
2. Registers the new service worker (`/sw.js`)
3. Monitors the registration state and reports status to the user
4. Handles any registration errors with user-friendly messages

### Offline Support

This application is configured as a Progressive Web App with full offline support:

- Service worker (`src/sw.js`) implements a cache-then-network strategy
- Core application files are cached during installation
- Network requests fall back to cached versions when offline
- Cache is updated when new versions are available

### Installation on Devices

Users can install this application on their devices:

- **Mobile devices**: Users will see an "Add to Home Screen" prompt
- **Desktop browsers**: Users will see an install button in the address bar

The Web App Manifest (`src/manifest.webmanifest`) configures how the app appears when installed, including:
- App name and short name
- Theme and background colors
- Display mode (standalone)
- Icons for different device sizes
- Screenshots for app stores
- Localized metadata for English, French, and Spanish

### Language Support

This application supports multiple languages:

- **English**: Default language
- **French**: Full translation support
- **Spanish**: Full translation support

Language selection is available through a dropdown menu in the UI. The application will:
1. Initially detect the user's browser language
2. Allow manual language selection
3. Remember the user's language preference
4. Update all UI elements when language is changed

## PWA Assets

### Icons and Splash Screens

This project uses a script (`src/generate-icons.js`) to generate icons and splash screens for the Progressive Web Application. The script uses the Sharp library to create various sizes of icons and splash screens from source images.

### Updating Icons and Splash Screens

1. **Install Sharp** (if not already installed):

```bash
npm install sharp
```

2. **Prepare Source Images**:

Create high-resolution source images:
   - `src/assets/source-icon.png` - A square icon image (at least 512x512px)
   - `src/assets/source-splash.png` - A square splash screen image (at least 2732x2732px)
     - Using a square image is recommended as it will be center-cropped to fit different device aspect ratios
     - The image should have important content centered, as edges may be cropped on some devices

3. **Generate Assets**:

Run the generation script:

```bash
node src/generate-icons.js
```

This will create:
- Icon files in various sizes in `src/assets/icons/` (72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512)
- Splash screen files in various sizes in `src/assets/splash/` for different iOS device dimensions

4. **Verify in Manifest**:

The `src/manifest.webmanifest` file already includes references to these assets. If you add new sizes or change file names, update this file accordingly.

## Security Headers

This application implements security best practices through HTTP headers defined in `public/_headers`:

- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables browser XSS filtering
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `Referrer-Policy: no-referrer-when-downgrade` - Controls referrer information
- `Permissions-Policy` - Restricts access to sensitive browser features
- Various cache control headers to prevent caching of sensitive information

## Angular CLI Commands

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

You can also generate other Angular artifacts:

```bash
# Generate a service
ng generate service service-name

# Generate a module
ng generate module module-name

# Generate a component within a specific module
ng generate component module-name/component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

To run tests with code coverage:

```bash
ng test --code-coverage
```

### Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs, such as Cypress or Playwright.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Troubleshooting

### PWA Asset Generation Issues

If you encounter issues with the PWA asset generation:

1. Make sure Sharp is installed correctly:
   ```bash
   npm install --save-dev sharp
   ```

2. Check that your source images exist and are valid PNG files:
   ```bash
   file src/assets/source-icon.png
   file src/assets/source-splash.png
   ```

3. Run the generation script manually to see detailed error messages:
   ```bash
   node src/generate-icons.js
   ```

### Service Worker Issues

If the PWA functionality isn't working as expected:

1. Check the PWA status banner in the application UI for error messages

2. Clear the application cache in your browser:
   - Chrome: DevTools > Application > Clear Storage > Clear site data
   - Firefox: DevTools > Storage > Clear Storage

3. Check the browser console for service worker registration errors

4. Verify that the service worker is registered correctly:
   ```javascript
   // In browser console
   navigator.serviceWorker.getRegistrations().then(r => console.log(r))
   ```

5. Ensure your app is served over HTTPS (required for service workers)
   ```bash
   # To test locally with HTTPS
   ng serve --ssl
   ```

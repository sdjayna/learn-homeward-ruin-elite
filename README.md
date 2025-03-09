# Learn Homeward Ruin Elite

A Progressive Web Application built with Angular CLI version 19.1.6.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [PWA Assets](#pwa-assets)
  - [Icons and Splash Screens](#icons-and-splash-screens)
  - [Updating Icons and Splash Screens](#updating-icons-and-splash-screens)
- [Angular CLI Commands](#angular-cli-commands)

## Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later recommended)
- Angular CLI (`npm install -g @angular/cli`)
- Wrangler CLI for Cloudflare Pages deployment (`npm install -g wrangler`)

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

The build process automatically runs the icon and splash screen generation script if the source images (`src/assets/source-icon.png` and `src/assets/source-splash.png`) are present. If these files are missing, the build will continue but will display a warning.

## Deployment

Deploy the application to Cloudflare Pages:

```bash
# Make sure you're logged in to Cloudflare
wrangler login

# Build the application
ng build

# Deploy to Cloudflare Pages
wrangler pages deploy dist
```

After deployment, Wrangler will provide a URL where your application is accessible.

## PWA Assets

### Icons and Splash Screens

This project uses a script to generate icons and splash screens for the Progressive Web Application. The script uses the Sharp library to create various sizes of icons and splash screens from source images.

### Updating Icons and Splash Screens

1. **Install Sharp** (if not already installed):

```bash
npm install sharp
```

2. **Prepare Source Images**:

Create high-resolution source images:
   - `src/assets/source-icon.png` - A square icon image (at least 512x512px)
   - `src/assets/source-splash.png` - A splash screen image (at least 2732x2732px)

3. **Generate Assets**:

Run the generation script:

```bash
node src/generate-icons.js
```

This will create:
- Icon files in various sizes in `src/assets/icons/`
- Splash screen files in various sizes in `src/assets/splash/`

4. **Verify in Manifest**:

The `src/manifest.webmanifest` file already includes references to these assets. If you add new sizes or change file names, update this file accordingly.

## Angular CLI Commands

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
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

### Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Spaced Repetition Learning Tool for 11+

A Progressive Web Application (PWA) built with Angular that helps students prepare for 11+ exams using spaced repetition learning techniques.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Subjects Covered](#subjects-covered)
- [Spaced Repetition Learning](#spaced-repetition-learning)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building and Deployment](#building-and-deployment)
- [Multilingual Support](#multilingual-support)
- [PWA Features](#pwa-features)
- [Troubleshooting](#troubleshooting)

## Overview

This application is designed to help students prepare for 11+ exams by using spaced repetition learning techniques. It covers key subjects tested in 11+ exams and adapts to each student's learning progress.

## Features

- **Spaced Repetition Algorithm**: Optimizes review schedules based on individual performance
- **Multiple Subjects**: Covers Mathematics, English, Verbal Reasoning, and Non-Verbal Reasoning
- **Progress Tracking**: Visual feedback on mastery levels for each topic
- **Exam Date Planning**: Set your target exam date to optimize study schedules
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Offline Support**: Study even without an internet connection
- **Multilingual Interface**: Available in English, French, and Spanish

## Subjects Covered

The application covers the four main subjects tested in most 11+ exams:

### Mathematics
- Number Operations
- Fractions, Decimals & Percentages
- Geometry
- Algebra
- Data Interpretation

### English
- Reading Comprehension
- Grammar & Punctuation
- Vocabulary
- Writing

### Verbal Reasoning
- Word Relationships
- Codes & Sequences
- Logical Deductions
- Sentence Completion

### Non-Verbal Reasoning
- Patterns & Sequences
- Transformations
- Matrices & Grids
- Odd One Out

## Spaced Repetition Learning

This application implements a spaced repetition algorithm based on the Free Spaced Repetition Scheduler (FSRS) to optimize learning efficiency:

- Questions you find difficult are shown more frequently
- Questions you master are shown less frequently but still reviewed periodically
- The system adapts to your individual learning pace
- Your study schedule is optimized based on your target exam date

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd spaced-repetition-learning-tool
npm install
```

### Running Locally

Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

## Development

### Code Structure

- `src/app/components/` - Reusable UI components
- `src/app/pages/` - Main application pages
- `src/app/models/` - Data models and interfaces
- `src/app/services/` - Business logic and data services
- `src/app/i18n/` - Internationalization resources

### Adding New Questions

Questions are currently stored in the `QuestionService`. To add new questions:

1. Edit `src/app/services/question.service.ts`
2. Add new question objects to the `questions` array
3. Ensure each question has a unique ID and is associated with a topic ID

## Building and Deployment

### Building for Production

```bash
ng build
```

This creates a production build in the `dist/` directory.

### Deployment

The application can be deployed to any static hosting service. For Cloudflare Pages:

```bash
# Make sure you're logged in to Cloudflare
wrangler login

# Build and deploy
ng build
wrangler pages deploy
```

## Multilingual Support

The application supports multiple languages:

- **English**: Default language
- **French**: Full translation support
- **Spanish**: Full translation support

All translations are managed in `src/app/i18n/translations.ts`.

To add a new language:

1. Add the language code to the `SupportedLanguages` type
2. Add translations for all strings in the `translations` object
3. Add the language option to the language selector in the settings page

## PWA Features

This application is a Progressive Web App with:

- **Offline Support**: Study without an internet connection
- **Installable**: Can be added to home screen on mobile devices
- **Responsive**: Works on all device sizes
- **Fast Loading**: Optimized for performance

## Troubleshooting

### Common Issues

- **Questions not appearing**: Check that you have set a target exam date in Settings
- **Progress not saving**: Make sure your browser allows local storage
- **PWA not working offline**: Ensure you've visited the app while online first to cache resources

### Browser Support

The application works best in modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Clear browser cache and reload
3. Ensure you're using a supported browser
4. File an issue in the project repository

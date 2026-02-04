git clone <repository-url>
# SUVIDHA - Government Citizen Services Portal

A modern, responsive web application for delivering government services to citizens with an intuitive interface and seamless user experience.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Screenshots](#screenshots)
5. [Installation](#installation)
6. [Development](#development)
7. [Building for Production](#building-for-production)
8. [Project Structure](#project-structure)
9. [Key Components](#key-components)

---

## Overview

SUVIDHA is a Government of India initiative providing citizens easy access to government services. This frontend application serves as the primary user interface for service discovery, quick access links, and service information management.

---

## Technology Stack

| Technology | Usage |
|-----------|-------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | Frontend UI framework |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build tool and dev server |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | Styling and responsive design |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=reactrouter&logoColor=white) | Client-side routing |
| ![Lucide React](https://img.shields.io/badge/Lucide%20React-F97316?style=flat&logo=lucide&logoColor=white) | SVG icons |
| ![JavaScript ES6+](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Programming language |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) | Code quality and linting |

---

## Features

- Multi-language support with Context API
- Responsive design for all devices
- Service directory with expandable details
- Animated news ticker for updates
- Authentication pages (Sign In/Sign Up)
- Quick access service cards
- Government branding with emblem and logo
- Smooth animations and transitions
- Trust indicators and verification marks

---

## Screenshots

### Home Page
![Home Page](./client//public/screenshots/home.png)

### Services Page
![Services Page](./client//public/screenshots/services.png)

### Sign In page
![Sign In Page](./client//public/screenshots/signIn.png)

### Sign Up Page
![Sign Up Page](./client//public/screenshots/signUp.png)

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Clone repository
git clone <repository-url>
cd client

# Install dependencies
npm install

# Verify installation
npm list
```

---

## Development

Start the development server with hot reload:

```bash
npm run dev
```

Access the application at `http://localhost:5173`

---

## Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (Home, Services, Auth)
├── context/            # Language context and state management
├── assets/             # Images (emblem, logo, banner)
├── App.jsx             # Main application component
└── main.jsx            # Entry point
```

---

## Key Components

- **HeroSection**: Government header with branding
- **TickerBanner**: Animated news ticker with announcements
- **ServiceCard**: Individual service display with expandable details
- **NavBar**: Navigation menu with language switcher
- **LanguageSwitcher**: Multi-language support
- **Footer**: Application footer with links
- **QuickActionCard**: Quick access service shortcuts

---

## How We Used Technologies

**React**: Built interactive UI components with hooks for state management and context for language switching.

**Vite**: Provides fast development server with hot module replacement for quick iterations.

**Tailwind CSS**: Used utility-first CSS classes for responsive design and component styling throughout the application.

**React Router**: Manages client-side routing between different pages (Home, Services, Authentication).

**Lucide React**: Provides consistent SVG icons for services and UI elements.

**JavaScript ES6+**: Utilized modern JavaScript features like arrow functions, destructuring, and async/await.

**ESLint**: Ensures code quality and consistency across the codebase.

---

## Code Quality

Run linting before committing:

```bash
npm run lint
```

---

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

---

## License

Part of the Government of India SUVIDHA initiative.

---

**Version**: 1.0.0  
**Last Updated**: January 2026
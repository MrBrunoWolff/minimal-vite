# 🚀 Minimal Vite

[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/v/minimal-vite?style=flat-square&logo=npm)](https://www.npmjs.com/package/minimal-vite)
[![Node](https://img.shields.io/node/v/minimal-vite?style=flat-square&logo=nodedotjs)](https://nodejs.org)

A lightweight and modern starter template for TypeScript projects using Vite, now with an easy-to-use CLI tool.

## ✨ Features

- ⚡️ Fast development with [Vite](https://vitejs.dev/)
- 🔵 TypeScript support out of the box
- 📦 Minimal dependencies
- 🧩 Simple and clean project structure
- 🛠️ Easy scaffolding with CLI tool
- 🔄 Support for npm and [Bun](https://bun.sh/)

## 🚦 Getting Started

### 💫 Create a New Project (Easiest)

Create a new project with a single command using npx or bunx:

```bash
# Using npm
npx minimal-vite my-project

# Using bun
bunx minimal-vite my-project
```

The interactive CLI will:
1. Ask for your project name (or use the provided one)
2. Let you choose between npm or bun as package manager
3. Set up everything for immediate development

### 🚀 Development Workflow

After creating your project:

```bash
# Navigate to your project
cd my-project

# Start the development server
npm start
# or with bun
bun start
```

Your app will be available at `http://localhost:3000` with hot module replacement enabled.

### 📦 Build for Production

```bash
npm run build
# or
bun build
```

The optimized production build will be in the `dist` directory, ready for deployment.

### 👀 Preview Production Build

```bash
npm run preview
# or
bun preview
```

## 📁 Project Structure

```
minimal-vite/
├── src/
│   ├── main.ts        # Application entry point
│   ├── style.css      # Global styles
│   └── vite-env.d.ts  # TypeScript declarations for Vite
├── index.html         # HTML template
├── tsconfig.json      # TypeScript configuration
├── package.json       # Project dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## 🔧 Customization

This template is intentionally minimal to serve as a clean starting point. You can easily extend it with:

- 🔄 Frontend frameworks like React, Vue, or Svelte
- 🎨 CSS preprocessors like SASS or LESS
- 🧪 Testing libraries
- 🔍 Linting and formatting tools

### Example: Adding React

```bash
# Install React
npm install react react-dom
npm install -D @types/react @types/react-dom

# Add JSX support to vite.config.ts
# and start building React components!
```

## 🔍 Advanced Usage

### Manual Setup (Alternative)

If you prefer to manually set up your project:

1. Clone the repository:

```bash
git clone https://github.com/MrBrunoWolff/minimal-vite.git my-project
cd my-project
```

2. Remove git history and initialize a new repository:

```bash
rm -rf .git
git init
git add .
git commit -m "Initial commit"
```

3. Install dependencies:

```bash
npm install
# or
bun install
```

4. Start building!

### Configuration

The template includes a pre-configured `vite.config.ts` with:

- Development server on port 3000 with auto-open browser
- Source maps for debugging
- Terser for optimal production builds
- Proper base path configuration

You can customize this configuration to fit your specific needs.

## 🤝 Contributing

Contributions to improve this template are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 
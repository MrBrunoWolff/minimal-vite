#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--version') || args.includes('-v')) {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    console.log(`minimal-vite v${packageJson.version}`);
    process.exit(0);
  } catch (error) {
    console.log('Could not determine version');
    process.exit(1);
  }
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  Usage: minimal-vite [project-name] [options]
  
  Options:
    -v, --version    Output the version number
    -h, --help       Display this help message
  
  Example:
    npx minimal-vite my-awesome-app
  `);
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for better terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

// Helper for colorful logging
const log = {
  info: (msg) => console.log(`${colors.blue}${colors.bright}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}${colors.bright}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}${colors.bright}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}${colors.bright}✗${colors.reset} ${msg}`)
};

const getProjectName = () => {
  return new Promise((resolve) => {
    // Check if project name was provided as a command line argument
    const projectNameArg = args.find(arg => !arg.startsWith('-'));
    if (projectNameArg) {
      resolve(projectNameArg);
      return;
    }
    
    const defaultName = 'my-vite-app';
    rl.question(`${colors.cyan}${colors.bright}?${colors.reset} Project name (${defaultName}): `, (answer) => {
      resolve(answer.trim() || defaultName);
    });
  });
};

const getPackageManager = () => {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${colors.bright}?${colors.reset} Package manager ${colors.bright}(npm/bun)${colors.reset}: [npm] `, (answer) => {
      const pm = answer.trim().toLowerCase();
      resolve(pm === 'bun' ? 'bun' : 'npm');
    });
  });
};

const createProject = async () => {
  try {
    // Get project details
    const projectName = await getProjectName();
    const packageManager = await getPackageManager();
    const targetDir = path.join(process.cwd(), projectName);
    
    // Validate project name
    if (fs.existsSync(targetDir)) {
      log.error(`Directory ${projectName} already exists.`);
      process.exit(1);
    }

    // Create project directory
    log.info('Creating project directory...');
    fs.mkdirSync(targetDir, { recursive: true });
    
    // Clone repository (without git history)
    log.info('Downloading template...');
    execSync(
      'git clone --depth 1 https://github.com/MrBrunoWolff/minimal-vite.git .',
      { cwd: targetDir, stdio: 'ignore' }
    );
    
    // Remove .git directory
    fs.rmSync(path.join(targetDir, '.git'), { recursive: true, force: true });
    
    // Update package.json
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    packageJson.version = '0.1.0';
    packageJson.private = true;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    // Initialize new git repository
    log.info('Initializing git repository...');
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
    execSync('git add .', { cwd: targetDir, stdio: 'ignore' });
    execSync('git commit -m "Initial commit from minimal-vite template"', { 
      cwd: targetDir, 
      stdio: 'ignore',
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: 'Minimal Vite',
        GIT_AUTHOR_EMAIL: 'minimal-vite@example.com',
        GIT_COMMITTER_NAME: 'Minimal Vite',
        GIT_COMMITTER_EMAIL: 'minimal-vite@example.com'
      }
    });
    
    // Install dependencies
    log.info(`Installing dependencies with ${packageManager}...`);
    if (packageManager === 'npm') {
      execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
    } else {
      execSync('bun install', { cwd: targetDir, stdio: 'inherit' });
    }
    
    // Success message
    log.success(`Project ${colors.bright}${projectName}${colors.reset} created successfully!`);
    log.info('Next steps:');
    console.log(`
  ${colors.bright}cd ${projectName}${colors.reset}
  ${colors.bright}${packageManager} start${colors.reset}
    `);
    
    rl.close();
  } catch (error) {
    log.error(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
};

createProject(); 
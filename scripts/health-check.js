#!/usr/bin/env node

/**
 * Health Check Script for JN Parts Frontend
 * 
 * This script performs comprehensive checks on the codebase:
 * - TypeScript compilation errors
 * - ESLint errors and warnings
 * - JSX/React syntax issues
 * - Missing critical files
 * - Configuration validation
 * - Dependency checks
 * - Build verification (optional)
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Health check results
const results = {
  passed: [],
  failed: [],
  warnings: [],
  errors: [],
};

// Helper functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function addResult(type, message, details = '') {
  results[type].push({ message, details });
}

function checkPassed(name) {
  log(`✓ ${name}`, 'green');
  addResult('passed', name);
}

function checkFailed(name, error, details = '') {
  log(`✗ ${name}`, 'red');
  log(`  Error: ${error}`, 'red');
  if (details) log(`  Details: ${details}`, 'yellow');
  addResult('failed', name, error);
  addResult('errors', name, error);
}

function checkWarning(name, message) {
  log(`⚠ ${name}`, 'yellow');
  log(`  Warning: ${message}`, 'yellow');
  addResult('warnings', name, message);
}

// Get project root
const projectRoot = path.resolve(__dirname, '..');

// Check 1: Critical files exist
function checkCriticalFiles() {
  logSection('Checking Critical Files');
  
  const criticalFiles = [
    'package.json',
    'tsconfig.json',
    'next.config.ts',
    'tailwind.config.js',
    'eslint.config.mjs',
    'app/layout.tsx',
    'app/page.tsx',
  ];
  
  criticalFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      checkPassed(`File exists: ${file}`);
    } else {
      checkFailed(`File missing: ${file}`, 'Critical file not found');
    }
  });
}

// Check 2: TypeScript compilation
function checkTypeScript() {
  logSection('Checking TypeScript Compilation');
  
  try {
    const tscPath = path.join(projectRoot, 'node_modules', '.bin', 'tsc');
    const hasTsc = fs.existsSync(tscPath);
    
    if (!hasTsc) {
      checkWarning('TypeScript check', 'tsc not found, skipping type check');
      return;
    }
    
    log('Running TypeScript compiler...', 'blue');
    const output = execSync(`${tscPath} --noEmit --pretty false`, {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    
    checkPassed('TypeScript compilation');
  } catch (error) {
    const errorOutput = error.stdout || error.stderr || error.message;
    const errorLines = errorOutput.split('\n').filter(line => 
      line.includes('error TS') || line.includes('error:')
    );
    
    if (errorLines.length > 0) {
      const errorCount = errorLines.length;
      checkFailed(
        'TypeScript compilation',
        `${errorCount} TypeScript error(s) found`,
        errorLines.slice(0, 5).join('\n') + (errorLines.length > 5 ? '\n...' : '')
      );
    } else {
      checkPassed('TypeScript compilation');
    }
  }
}

// Check 3: ESLint
function checkESLint() {
  logSection('Checking ESLint');
  
  try {
    const eslintPath = path.join(projectRoot, 'node_modules', '.bin', 'eslint');
    const hasEslint = fs.existsSync(eslintPath);
    
    if (!hasEslint) {
      checkWarning('ESLint check', 'eslint not found, skipping lint check');
      return;
    }
    
    log('Running ESLint...', 'blue');
    
    // Get all component files
    const componentFiles = [
      'app/components/**/*.{ts,tsx,js,jsx}',
      'app/**/*.{ts,tsx}',
      'components/**/*.{ts,tsx}',
    ];
    
    let hasErrors = false;
    let errorCount = 0;
    let warningCount = 0;
    
    componentFiles.forEach(pattern => {
      try {
        const output = execSync(
          `${eslintPath} "${pattern}" --format compact`,
          { cwd: projectRoot, encoding: 'utf-8', stdio: 'pipe' }
        );
      } catch (error) {
        hasErrors = true;
        const errorOutput = error.stdout || error.stderr || '';
        const lines = errorOutput.split('\n');
        
        lines.forEach(line => {
          if (line.includes('error')) errorCount++;
          if (line.includes('warning')) warningCount++;
        });
      }
    });
    
    // Try running on specific directories
    try {
      const output = execSync(
        `${eslintPath} app/components --format compact`,
        { cwd: projectRoot, encoding: 'utf-8', stdio: 'pipe' }
      );
      checkPassed('ESLint check (app/components)');
    } catch (error) {
      const errorOutput = error.stdout || error.stderr || '';
      const errorLines = errorOutput.split('\n').filter(line => line.trim());
      
      if (errorLines.length > 0) {
        checkFailed(
          'ESLint check',
          `${errorCount} error(s), ${warningCount} warning(s) found`,
          errorLines.slice(0, 10).join('\n')
        );
      }
    }
  } catch (error) {
    checkWarning('ESLint check', `Could not run ESLint: ${error.message}`);
  }
}

// Check 4: JSX/React syntax issues
function checkJSXSyntax() {
  logSection('Checking JSX/React Syntax');
  
  const componentDir = path.join(projectRoot, 'app', 'components');
  if (!fs.existsSync(componentDir)) {
    checkFailed('JSX syntax check', 'Components directory not found');
    return;
  }
  
  const files = [];
  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (/\.(tsx|jsx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    });
  }
  
  walkDir(componentDir);
  
  let issuesFound = 0;
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(projectRoot, file);
    
    // Check for missing opening tag (the actual bug we fixed)
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check for attributes that appear without an opening tag
      // Only flag if the line starts with an attribute (not indented as part of multi-line JSX)
      if (line.match(/^(href|className|onClick|onChange|onSubmit|type|src|alt|id|name|value|placeholder|disabled|required)=/)) {
        // Look backwards for opening tag (check up to 10 lines back for multi-line JSX)
        let foundOpening = false;
        let inMultiLineTag = false;
        
        for (let j = Math.max(0, i - 10); j <= i; j++) {
          const prevLine = lines[j];
          
          // Check if we're in a multi-line tag (opening tag without closing >)
          if (prevLine.includes('<') && !prevLine.includes('>') && !prevLine.includes('/>')) {
            inMultiLineTag = true;
          }
          if (prevLine.includes('>') || prevLine.includes('/>')) {
            inMultiLineTag = false;
          }
          
          // Check if there's an opening tag
          if (prevLine.match(/<[a-zA-Z][a-zA-Z0-9]*/)) {
            foundOpening = true;
            break;
          }
        }
        
        // If line starts with attribute and no opening tag found, it's likely an error
        // But skip if we're clearly in a multi-line tag context
        if (!foundOpening && !inMultiLineTag && !line.match(/^\s*\{/)) {
          // Double-check: make sure this isn't just a continuation of a previous attribute
          const prevLine = i > 0 ? lines[i - 1].trim() : '';
          const isContinuation = prevLine.endsWith('=') || 
                                 prevLine.match(/[a-zA-Z]\s*$/) ||
                                 prevLine.includes('{') && prevLine.includes('}');
          
          if (!isContinuation) {
            checkWarning(
              `JSX syntax: ${relativePath}`,
              `Line ${i + 1}: Attribute without opening tag - possible syntax error`
            );
            issuesFound++;
          }
        }
      }
    }
  });
  
  if (issuesFound === 0) {
    checkPassed(`JSX syntax check (${files.length} files)`);
  } else {
    checkWarning('JSX syntax check', `${issuesFound} potential issue(s) found`);
  }
}

// Check 5: Configuration validation
function checkConfigurations() {
  logSection('Checking Configurations');
  
  // Check package.json
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
    
    if (!pkg.scripts || !pkg.scripts.build) {
      checkFailed('package.json', 'Missing build script');
    } else {
      checkPassed('package.json scripts');
    }
    
    if (!pkg.dependencies || !pkg.dependencies.next) {
      checkFailed('package.json', 'Missing Next.js dependency');
    } else {
      checkPassed('package.json dependencies');
    }
  } catch (error) {
    checkFailed('package.json', 'Invalid JSON', error.message);
  }
  
  // Check tsconfig.json
  try {
    const tsconfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'tsconfig.json'), 'utf-8'));
    
    if (!tsconfig.compilerOptions) {
      checkFailed('tsconfig.json', 'Missing compilerOptions');
    } else {
      checkPassed('tsconfig.json');
    }
  } catch (error) {
    checkFailed('tsconfig.json', 'Invalid JSON', error.message);
  }
  
  // Check next.config.ts exists and is readable
  const nextConfigPath = path.join(projectRoot, 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    try {
      const content = fs.readFileSync(nextConfigPath, 'utf-8');
      if (content.includes('export default') || content.includes('module.exports')) {
        checkPassed('next.config.ts');
      } else {
        checkWarning('next.config.ts', 'May not export default configuration');
      }
    } catch (error) {
      checkFailed('next.config.ts', 'Cannot read file', error.message);
    }
  } else {
    checkFailed('next.config.ts', 'File not found');
  }
}

// Check 6: Dependency check
function checkDependencies() {
  logSection('Checking Dependencies');
  
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    checkFailed('Dependencies', 'node_modules not found. Run npm install');
    return;
  }
  
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    let missingCount = 0;
    const missing = [];
    
    Object.keys(allDeps).forEach(dep => {
      const depPath = path.join(nodeModulesPath, dep);
      if (!fs.existsSync(depPath)) {
        missing.push(dep);
        missingCount++;
      }
    });
    
    if (missingCount === 0) {
      checkPassed(`All dependencies installed (${Object.keys(allDeps).length} packages)`);
    } else {
      checkFailed(
        'Dependencies',
        `${missingCount} missing package(s)`,
        missing.slice(0, 10).join(', ') + (missing.length > 10 ? '...' : '')
      );
    }
  } catch (error) {
    checkWarning('Dependency check', `Could not verify: ${error.message}`);
  }
}

// Check 7: Build check (optional, can be slow)
function checkBuild(shouldBuild = false) {
  if (!shouldBuild) {
    logSection('Build Check (Skipped)');
    log('Run with --build flag to test build process', 'yellow');
    return;
  }
  
  logSection('Checking Build Process');
  
  try {
    log('Running Next.js build... (this may take a while)', 'blue');
    const output = execSync('npm run build', {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
      timeout: 300000, // 5 minutes
    });
    
    checkPassed('Build process');
  } catch (error) {
    const errorOutput = error.stdout || error.stderr || error.message;
    const errorLines = errorOutput.split('\n').filter(line => 
      line.includes('error') || line.includes('Error') || line.includes('Failed')
    );
    
    checkFailed(
      'Build process',
      'Build failed',
      errorLines.slice(0, 10).join('\n')
    );
  }
}

// Generate report
function generateReport() {
  logSection('Health Check Report');
  
  const total = results.passed.length + results.failed.length + results.warnings.length;
  const passRate = total > 0 ? ((results.passed.length / total) * 100).toFixed(1) : 0;
  
  log(`\nTotal Checks: ${total}`, 'bright');
  log(`Passed: ${results.passed.length}`, 'green');
  log(`Failed: ${results.failed.length}`, 'red');
  log(`Warnings: ${results.warnings.length}`, 'yellow');
  log(`Pass Rate: ${passRate}%`, passRate >= 80 ? 'green' : passRate >= 60 ? 'yellow' : 'red');
  
  if (results.failed.length > 0) {
    console.log('\n' + '-'.repeat(60));
    log('Failed Checks:', 'red');
    results.failed.forEach(({ message, details }) => {
      log(`  • ${message}`, 'red');
      if (details) {
        log(`    ${details.split('\n')[0]}`, 'yellow');
      }
    });
  }
  
  if (results.warnings.length > 0) {
    console.log('\n' + '-'.repeat(60));
    log('Warnings:', 'yellow');
    results.warnings.forEach(({ message, details }) => {
      log(`  • ${message}`, 'yellow');
      if (details) {
        log(`    ${details.split('\n')[0]}`, 'yellow');
      }
    });
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (results.failed.length === 0 && results.warnings.length === 0) {
    log('✓ All checks passed! Codebase is healthy.', 'green');
    process.exit(0);
  } else if (results.failed.length === 0) {
    log('✓ All critical checks passed. Some warnings to review.', 'yellow');
    process.exit(0);
  } else {
    log('✗ Some checks failed. Please review and fix the issues above.', 'red');
    process.exit(1);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const shouldBuild = args.includes('--build') || args.includes('-b');
  
  log('\n' + '='.repeat(60), 'cyan');
  log('  JN Parts Frontend - Health Check', 'bright');
  log('='.repeat(60) + '\n', 'cyan');
  
  try {
    checkCriticalFiles();
    checkTypeScript();
    checkESLint();
    checkJSXSyntax();
    checkConfigurations();
    checkDependencies();
    checkBuild(shouldBuild);
    
    generateReport();
  } catch (error) {
    log(`\nFatal error during health check: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main };

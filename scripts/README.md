# Health Check Script

A comprehensive health check script for the JN Parts Frontend codebase.

## Usage

### Basic Health Check
```bash
npm run health-check
```

This will run all checks except the build process (which can be slow).

### Full Health Check (including build)
```bash
npm run health-check:build
```

Or:
```bash
npm run health-check -- --build
```

## What It Checks

1. **Critical Files** - Verifies essential configuration and source files exist
2. **TypeScript Compilation** - Runs `tsc --noEmit` to check for type errors
3. **ESLint** - Runs ESLint on component files to catch linting issues
4. **JSX/React Syntax** - Checks for common JSX syntax errors (like missing opening tags)
5. **Configuration Validation** - Validates `package.json`, `tsconfig.json`, and `next.config.ts`
6. **Dependencies** - Verifies all dependencies in `package.json` are installed
7. **Build Process** (optional) - Tests the Next.js build process

## Output

The script provides:
- ✅ **Passed checks** (green)
- ❌ **Failed checks** (red) - Critical issues that need fixing
- ⚠️ **Warnings** (yellow) - Non-critical issues to review

At the end, you'll get a summary report with:
- Total checks performed
- Pass/fail/warning counts
- Pass rate percentage
- Detailed list of failures and warnings

## Exit Codes

- `0` - All checks passed (or only warnings)
- `1` - One or more checks failed

This makes it suitable for use in CI/CD pipelines.

## Integration

### Pre-commit Hook
You can add this to a pre-commit hook to catch issues before committing:

```bash
#!/bin/sh
npm run health-check
```

### CI/CD
Add to your CI pipeline:
```yaml
- name: Health Check
  run: npm run health-check
```

## Customization

Edit `scripts/health-check.js` to:
- Add custom checks
- Modify existing checks
- Change output format
- Adjust thresholds

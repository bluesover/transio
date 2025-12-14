# Build Troubleshooting Guide

## Common Build Errors and Solutions

### Error: `Cannot find module @rollup/rollup-darwin-arm64`

**Full Error:**
```
Error: Cannot find module @rollup/rollup-darwin-arm64. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
```

**Cause:** The `package-lock.json` file is out of sync with `package.json`, causing Rollup's native binaries to not be properly installed.

**Solution 1 - Quick Fix (Recommended):**
```bash
# Remove lock file and node_modules
rm -f package-lock.json
rm -rf node_modules

# Reinstall dependencies
npm install

# Now build
npm run build
```

**Solution 2 - Use Fix Script:**

Mac/Linux:
```bash
chmod +x fix-lockfile.sh
./fix-lockfile.sh
```

Windows:
```bash
fix-lockfile.bat
```

**Solution 3 - Manual Cleanup:**
```bash
# Clean everything
npm cache clean --force
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Verify it works
npm run build
```

---

### Error: `npm ci` failing in Cloudflare Pages

**Full Error:**
```
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync.
npm error Invalid: lock file's @github/spark@0.0.1 does not satisfy @github/spark@0.44.5
npm error Missing: octokit@5.0.5 from lock file
```

**Cause:** The `package-lock.json` in your repository doesn't match the `package.json`.

**Solution:**
```bash
# Local machine - fix the lock file
rm -f package-lock.json
npm install

# Commit the fixed lock file
git add package-lock.json
git commit -m "fix: synchronize package-lock.json with package.json"
git push origin main

# Cloudflare will now deploy successfully
```

---

### Error: TypeScript compilation errors in Electron

**Error:**
```
electron/main.ts:11:34 - error TS1343: The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.
```

**Cause:** TypeScript configuration for Electron is incorrect.

**Solution:** This has been fixed in `tsconfig.electron.json`. If you still see it:
```bash
# Check your tsconfig.electron.json has:
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022"
  }
}
```

---

### Error: Missing type declarations

**Error:**
```
error TS7016: Could not find a declaration file for module 'archiver'. '/workspaces/spark-template/node_modules/archiver/index.js' implicitly has an 'any' type.
```

**Cause:** Type definitions are not installed.

**Solution:**
```bash
npm install --save-dev @types/archiver
```

---

### Error: Server dependencies not syncing

**Error:**
```
npm ci` can only install packages when your package.json and package-lock.json are in sync.
Missing: nodemon@3.1.11 from lock file
```

**Cause:** Server directory has outdated `package-lock.json`.

**Solution:**
```bash
cd server
rm -f package-lock.json
npm install
cd ..
```

---

## Prevention Tips

### 1. Always Keep Lock Files in Sync

After updating `package.json`:
```bash
npm install  # Updates package-lock.json automatically
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

### 2. Use `npm install` not `npm ci` locally

- `npm install` - Updates lock file if needed (use for development)
- `npm ci` - Requires exact lock file match (use for CI/CD only)

### 3. Clean Build Before Release

```bash
# Clean everything
rm -rf node_modules dist dist-desktop dist-electron

# Fresh install
npm install

# Build
npm run build
```

### 4. Server Dependencies

Keep server dependencies in sync:
```bash
cd server
npm install
cd ..
git add server/package-lock.json
git commit -m "chore: update server dependencies"
```

---

## Build Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install/update dependencies |
| `npm run build` | Build web app for production |
| `npm run dev` | Start development server |
| `npm run preview` | Preview production build locally |
| `npm run electron:build` | Build desktop app |
| `npm run electron:build:mac` | Build macOS app only |
| `npm run electron:build:win` | Build Windows app only |
| `npm run electron:build:linux` | Build Linux app only |

---

## Verify Your Build

After fixing, verify everything works:

```bash
# 1. Clean build
npm run build

# 2. Check output
ls -la dist/

# 3. Preview locally
npm run preview

# 4. Test in browser
open http://localhost:4173
```

---

## GitHub Actions Troubleshooting

### Deployment Failing

Check the GitHub Actions logs:
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Click the failed workflow
4. Expand the failed step to see error logs

### Common Actions Fixes

**Fix 1 - Update Lock File:**
```bash
npm install
git add package-lock.json
git commit -m "fix: update package-lock.json"
git push origin main
```

**Fix 2 - Clear Actions Cache:**
- Go to Settings → Actions → Caches
- Delete all caches
- Re-run the workflow

**Fix 3 - Check Secrets:**
Verify these are set in Settings → Secrets and variables → Actions:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## Still Having Issues?

1. **Check Node version:**
   ```bash
   node --version  # Should be 18+ or 20+
   npm --version   # Should be 9+ or 10+
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Try a different Node version:**
   ```bash
   nvm install 20
   nvm use 20
   ```

4. **Check for disk space:**
   ```bash
   df -h  # Unix/Mac
   ```

5. **Open an issue:**
   - Visit: https://github.com/bluesover/transio/issues
   - Include: Error message, OS, Node version, and steps to reproduce

---

## Quick Reference Card

**Build failing? Try this sequence:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Cloudflare failing? Update lock file:**
```bash
npm install
git add package-lock.json
git commit -m "fix: sync package-lock.json"
git push
```

**Desktop build failing? Check TypeScript:**
```bash
npx tsc -p tsconfig.electron.json --noEmit
```

---

**Last Updated:** December 2024  
**Maintained by:** Transio Team

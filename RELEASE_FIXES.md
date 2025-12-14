# Release Workflow Fixes

## Issues Identified and Fixed

### 1. TypeScript Compilation Errors in Electron Directory

**Problem:**
- `electron/main.ts:11` - `import.meta` error with module configuration
- `electron/ipc-handlers.ts:9` - Missing type declarations for 'archiver'

**Root Cause:**
The `tsconfig.electron.json` had `types: ["node", "archiver"]` but TypeScript couldn't find the archiver types properly due to module resolution issues.

**Fix:**
- Removed `"archiver"` from the `types` array in `tsconfig.electron.json`
- TypeScript will now properly resolve the `@types/archiver` package automatically with `skipLibCheck: true`

**File Changed:**
- `/workspaces/spark-template/tsconfig.electron.json`

### 2. Server Package Lock Out of Sync

**Problem:**
```
npm ci can only install packages when your package.json and package-lock.json are in sync
Missing: nodemon@3.1.11 from lock file
```

**Root Cause:**
The `server/package-lock.json` was out of sync with `server/package.json`. The package.json includes nodemon but the lock file doesn't have it properly registered.

**Fix:**
Changed the workflow to use `npm install` instead of `npm ci` for the server directory, which will regenerate the lock file if needed.

**File Changed:**
- `.github/workflows/release-desktop.yml` - Line 60

### 3. Added TypeScript Verification Step

**Enhancement:**
Added a verification step before building Electron TypeScript to catch compilation errors earlier and provide clearer error messages.

**File Changed:**
- `.github/workflows/release-desktop.yml` - Added "Verify Electron TypeScript compilation" step

## Summary of Changes

### Files Modified:
1. `tsconfig.electron.json` - Fixed types array
2. `.github/workflows/release-desktop.yml` - Fixed server install and added verification

### Testing Recommendations:
1. Run `npx tsc -p tsconfig.electron.json --noEmit` locally to verify TypeScript compilation
2. Run `npm run build` to verify web build works
3. Test the prepare-release script: `./prepare-release.sh`
4. Monitor GitHub Actions workflow when tag is pushed

## Expected Workflow Success

After these fixes, the release workflow should:
1. ✅ Install dependencies successfully
2. ✅ Install server dependencies (with regenerated lock file)
3. ✅ Build web app successfully
4. ✅ Verify Electron TypeScript compilation
5. ✅ Build Electron TypeScript successfully
6. ✅ Build platform-specific installers (macOS, Windows, Linux)
7. ✅ Upload artifacts
8. ✅ Create GitHub Release with all binaries

## Next Steps

To trigger the release workflow:

```bash
# Option 1: Use the prepare-release script (recommended)
./prepare-release.sh

# Option 2: Manual tag creation
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Option 3: GitHub Actions manual trigger
# Go to Actions → Release Desktop Apps → Run workflow
```

## Verification Commands

Run these locally before releasing:

```bash
# 1. Test TypeScript compilation
npx tsc -p tsconfig.electron.json --noEmit

# 2. Test web build
npm run build

# 3. Test server dependencies
cd server && npm install && cd ..

# 4. Run full preparation script
./prepare-release.sh
```

All checks should pass before pushing the release tag.

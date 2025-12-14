# Fix: Desktop App Download 404 Error

## Problem
Clicking "Download App" → Mac download gives **404 Not Found** error because no desktop app releases exist on GitHub yet.

## Root Cause
- Web app is deployed: ✅ transio.org works
- Desktop app releases: ❌ Not built yet
- Download links point to: `https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg`
- But no releases exist at: `https://github.com/bluesover/transio.org/releases`

## Solution: Build and Release Desktop Apps

### Option 1: Automated Build (EASIEST - Recommended)

**On your MacBook, run these commands:**

```bash
# Navigate to project
cd ~/Desktop/transio  # Or wherever your project is

# Create a version tag
git tag v1.0.0

# Push the tag to GitHub
git push origin v1.0.0
```

**That's it!** GitHub Actions will automatically:
1. Build macOS .dmg file ✅
2. Build Windows .exe file ✅
3. Build Linux .AppImage file ✅
4. Create GitHub Release with all files ✅
5. Make downloads available at the URLs ✅

**Time:** ~15-20 minutes for all builds to complete

**Watch progress:**
https://github.com/bluesover/transio.org/actions

---

### Option 2: Manual Build on Mac (macOS only)

If you only want to release the Mac version quickly:

```bash
cd ~/Desktop/transio/electron
npm install
npm run build:mac
```

Then:
1. Go to https://github.com/bluesover/transio.org/releases
2. Click "Draft a new release"
3. Tag: `v1.0.0`
4. Title: `Transio v1.0.0`
5. Upload `electron/dist/Transio-1.0.0.dmg`
6. Click "Publish release"

---

## After Release is Published

✅ Download links will work:
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-Setup-1.0.0.exe
- https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.AppImage

✅ "Download App" button on transio.org will work

✅ Users can install desktop app

---

## Quick Test

After creating the release, test in browser:

```bash
curl -I https://github.com/bluesover/transio.org/releases/latest/download/Transio-1.0.0.dmg
```

Should return `HTTP/2 302` (redirect to actual file) instead of `404`.

---

## Current Status

| Component | Status |
|-----------|--------|
| Web app (transio.org) | ✅ Live and working |
| Desktop app builds | ❌ Not created yet |
| GitHub Actions workflow | ✅ Ready to use |
| Download button | ✅ Fixed (redirects to releases page if file missing) |

## Next Steps

1. **Run:** `git tag v1.0.0 && git push origin v1.0.0`
2. **Wait:** 15-20 minutes for builds
3. **Test:** Download links from transio.org
4. **Done!** ✅

---

## Alternative: Temporarily Hide Download Button

If you don't want to build desktop apps yet, hide the button:

Edit `src/App.tsx`, find line ~618 and comment out:

```tsx
{/* <DownloadAppDialog /> */}
```

Then redeploy:
```bash
npm run build
git add .
git commit -m "Temporarily hide download button"
git push origin main
```

The web app will update automatically on Cloudflare Pages (within 1-2 minutes).

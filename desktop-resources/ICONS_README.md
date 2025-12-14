# Desktop App Icons

This directory contains all icon files needed for the Transio desktop application across Windows, macOS, and Linux platforms.

## 📁 Directory Structure

After generation, this directory will contain:

```
desktop-resources/icons/
├── icon.ico              # Windows multi-resolution icon
├── icon.icns             # macOS icon bundle
├── 16x16.png            # Linux icon (smallest)
├── 24x24.png            # Linux icon
├── 32x32.png            # Linux icon
├── 48x48.png            # Linux icon
├── 64x64.png            # Linux icon
├── 96x96.png            # Linux icon
├── 128x128.png          # Linux icon
├── 256x256.png          # Linux icon
├── 512x512.png          # Linux icon (standard)
└── 1024x1024.png        # Linux icon (high-res)
```

## 🚀 Quick Start

### Generate Icons

Choose the method that works for your system:

**Method 1: Node.js (Cross-platform)**
```bash
npm run icons
```

**Method 2: Shell Script (macOS/Linux)**
```bash
npm run icons:shell
# or directly:
chmod +x ../generate-icons.sh
../generate-icons.sh
```

**Method 3: Batch Script (Windows)**
```bash
npm run icons:batch
# or directly:
..\generate-icons.bat
```

## 📋 Requirements

### All Platforms
- **ImageMagick** - For image conversion and resizing

### macOS Only (for .icns generation)
- **libicns** or **iconutil** - For creating macOS icon bundles

### Installation Commands

**macOS:**
```bash
brew install imagemagick libicns icoutils
```

**Ubuntu/Debian:**
```bash
sudo apt-get install imagemagick icnsutils icoutils
```

**Fedora/RHEL:**
```bash
sudo dnf install ImageMagick libicns-utils icoutils
```

**Windows:**
- Download and install ImageMagick from: https://imagemagick.org/script/download.php#windows
- During installation, check "Add application directory to system path"

## 🎨 Icon Specifications

### Windows (icon.ico)
- **Format:** ICO (Windows Icon)
- **Resolutions:** 16×16, 24×24, 32×32, 48×48, 64×64, 128×128, 256×256
- **Color Depth:** 32-bit with alpha channel
- **Usage:** Windows Explorer, taskbar, shortcuts, NSIS installer

### macOS (icon.icns)
- **Format:** ICNS (Apple Icon Image)
- **Resolutions:** 
  - 16×16 (@1x and @2x)
  - 32×32 (@1x and @2x)
  - 128×128 (@1x and @2x)
  - 256×256 (@1x and @2x)
  - 512×512 (@1x and @2x)
- **Color Depth:** 32-bit with alpha channel
- **Usage:** macOS Finder, Dock, Launchpad, App Store

### Linux (PNG set)
- **Format:** PNG (Portable Network Graphics)
- **Resolutions:** 16×16, 24×24, 32×32, 48×48, 64×64, 96×96, 128×128, 256×256, 512×512, 1024×1024
- **Color Depth:** 32-bit RGBA
- **Usage:** Various Linux desktop environments (GNOME, KDE, XFCE, etc.)

## 🖼️ Source Image

The icons are generated from:
```
src/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png
```

### Source Requirements
- **Format:** PNG with transparency
- **Recommended Size:** 1024×1024 pixels or larger
- **Aspect Ratio:** Square (1:1)
- **Color Mode:** RGB or RGBA
- **Background:** Transparent preferred

## 🔍 Icon Design Guidelines

For optimal appearance across all platforms and sizes:

1. **Simplicity:** Use simple, recognizable shapes that remain clear at small sizes
2. **Contrast:** Ensure the icon is visible on both light and dark backgrounds
3. **Consistency:** Maintain visual consistency with Transio's brand (purple/orange colors)
4. **No Text:** Avoid text in icons - it becomes unreadable at small sizes
5. **Padding:** Leave ~10% margin around the icon for platform-specific styling
6. **Testing:** Test the icon at 16×16 to ensure key features are visible

### Transio Brand Colors
- **Primary:** Purple (oklch(0.45 0.25 265))
- **Accent:** Orange (oklch(0.55 0.22 25))
- **Background:** Should work on both light and dark themes

## 🛠️ Manual Icon Creation

If you prefer to create icons manually or the scripts don't work:

### Online Tools
- **PNG to ICO:** https://convertio.co/png-ico/
- **PNG to ICNS:** https://cloudconvert.com/png-to-icns
- **Multi-format:** https://redketchup.io/icon-converter

### Steps
1. Prepare your source image at 1024×1024 pixels
2. Use online converters to create:
   - `.ico` file with sizes: 16, 32, 48, 64, 128, 256
   - `.icns` file with sizes: 16, 32, 64, 128, 256, 512, 1024
3. Export individual PNG files at each required size
4. Place all files in this directory

## ✅ Verification

After generating icons:

### Check Icon Quality
```bash
# View .icns on macOS
open icon.icns

# View .ico on Windows
# Right-click → Properties

# View PNGs on Linux
eog 256x256.png
# or
xdg-open 256x256.png
```

### Test in Build
```bash
# Build for your platform
npm run electron:build:mac    # macOS
npm run electron:build:win    # Windows
npm run electron:build:linux  # Linux
```

### What to Check
- ✅ Icons appear crisp at all sizes (not blurry)
- ✅ Transparency works correctly
- ✅ Icon is recognizable at 16×16
- ✅ Colors match brand identity
- ✅ Icon shows in installers and installed app

## 🚨 Troubleshooting

### Icons not appearing in build
- Ensure all icon files exist in this directory
- Verify file names match exactly: `icon.ico`, `icon.icns`
- Check `electron-builder.json` configuration
- Run clean build: `rm -rf dist-desktop && npm run electron:build`

### Blurry or pixelated icons
- Use higher resolution source image (minimum 1024×1024)
- Ensure source is PNG, not JPEG
- Re-run icon generation scripts

### Generation scripts fail
- Verify ImageMagick is installed and in PATH
- Check source image exists and is readable
- Try alternative generation method (Node.js vs Shell vs Batch)
- Use manual generation as fallback

### macOS .icns not generated on Windows
- The `.icns` format requires macOS-specific tools
- Generate it on macOS or Linux system
- Or use online converter: https://cloudconvert.com/png-to-icns

## 📚 Additional Resources

- [Electron Icons Documentation](https://www.electron.build/icons)
- [Apple HIG - App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Microsoft Windows Icon Guidelines](https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-design)
- [ImageMagick Documentation](https://imagemagick.org/index.php)

## 🤝 Contributing

If you improve the icon or generation process:

1. Update the source image if needed
2. Regenerate all icon formats
3. Test on target platforms
4. Submit pull request with updated icons

## 📄 License

Icons are part of the Transio project and follow the same MIT license.

---

**Need Help?** Open an issue at https://github.com/bluesover/transio.org/issues

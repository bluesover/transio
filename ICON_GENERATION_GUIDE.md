# App Icon Generation Guide

This guide explains how to generate all required desktop app icons for Windows (.ico), macOS (.icns), and Linux (PNG sets) from your logo image.

## 📋 Quick Start

### On macOS or Linux:
```bash
chmod +x generate-icons.sh
./generate-icons.sh
```

### On Windows:
```batch
generate-icons.bat
```

---

## 🎯 What Gets Generated

After running the icon generation script, you'll have:

### Windows (icon.ico)
- Multi-resolution icon file containing: 16×16, 24×24, 32×32, 48×48, 64×64, 128×128, 256×256
- Used by: Windows taskbar, file explorer, shortcuts, installers
- Location: `desktop-resources/icons/icon.ico`

### macOS (icon.icns)
- Apple Icon Image format containing multiple resolutions
- Sizes: 16×16, 32×32, 64×64, 128×128, 256×256, 512×512, 1024×1024 (including @2x retina versions)
- Used by: macOS Finder, Dock, App Store
- Location: `desktop-resources/icons/icon.icns`

### Linux (PNG set)
- Individual PNG files in multiple sizes
- Sizes: 16×16, 24×24, 32×32, 48×48, 64×64, 96×96, 128×128, 256×256, 512×512, 1024×1024
- Used by: Various Linux desktop environments (GNOME, KDE, XFCE, etc.)
- Location: `desktop-resources/icons/*.png`

---

## 🛠️ Requirements

### macOS
Install via Homebrew:
```bash
brew install imagemagick libicns icoutils
```

### Ubuntu/Debian Linux
```bash
sudo apt-get update
sudo apt-get install imagemagick icnsutils icoutils
```

### Fedora/RHEL Linux
```bash
sudo dnf install ImageMagick libicns-utils icoutils
```

### Windows
1. Download and install ImageMagick from: https://imagemagick.org/script/download.php#windows
2. During installation, check "Add application directory to system path"
3. Restart your terminal/command prompt after installation

**Note:** The Windows script generates `.ico` and `.png` files. For `.icns` (macOS), you'll need to run the script on macOS or Linux.

---

## 📦 Source Image Requirements

Your source logo image should be:
- **Format:** PNG (with transparency support)
- **Minimum size:** 1024×1024 pixels recommended
- **Aspect ratio:** Square (1:1)
- **Background:** Transparent or solid color
- **Quality:** High resolution, no compression artifacts

**Current source:** `src/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png`

---

## 🎨 Custom Icon Design Tips

For best results across all platforms:

1. **Use simple, recognizable shapes** - Complex details may be lost at small sizes
2. **Strong contrast** - Ensure the icon is visible on both light and dark backgrounds
3. **Consistent visual identity** - Use your brand colors (purple/orange from Transio)
4. **Test at multiple sizes** - View the icon at 16×16 to ensure it's still recognizable
5. **Avoid text** - Text becomes unreadable at small sizes; use symbols instead
6. **Consider rounded corners** - Many platforms apply automatic rounding (especially macOS)

---

## 🔍 Verification

After generating icons, verify them:

### macOS
```bash
open desktop-resources/icons/icon.icns
```

### Windows
- Right-click `icon.ico` → Properties → should show multiple resolutions
- Or use an icon editor like IcoFX

### Linux
```bash
eog desktop-resources/icons/256x256.png
# or
xdg-open desktop-resources/icons/256x256.png
```

---

## 🏗️ Building Desktop Apps with Icons

Once icons are generated, build your desktop app:

### macOS
```bash
npm run build:mac
```

### Windows
```bash
npm run build:win
```

### Linux
```bash
npm run build:linux
```

The electron-builder configuration (`electron-builder.json`) is already set up to use these icons:
- Windows: `desktop-resources/icons/icon.ico`
- macOS: `desktop-resources/icons/icon.icns`
- Linux: `desktop-resources/icons` (directory with all PNGs)

---

## 🚨 Troubleshooting

### "Command not found" errors
- Ensure all dependencies are installed
- Restart your terminal after installing tools
- Check that tools are in your system PATH

### Icons look blurry
- Use a higher resolution source image (minimum 1024×1024)
- Ensure source image is PNG format, not JPEG
- Check that source image isn't already compressed

### macOS .icns generation fails on Windows
- The `.icns` format requires macOS-specific tools
- Generate it on macOS or Linux, or use an online converter
- Alternatively, use https://cloudconvert.com/png-to-icns

### Generated .ico file is too large
- This is normal for multi-resolution icons
- electron-builder will optimize it during build
- Typical size: 100-500 KB for multi-resolution .ico

---

## 📚 Additional Resources

- [Electron Icons Documentation](https://www.electron.build/icons)
- [ImageMagick Documentation](https://imagemagick.org/index.php)
- [Apple Human Interface Guidelines - App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Microsoft Windows App Icon Guidelines](https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-design)

---

## 🎉 Next Steps

After generating icons:
1. ✅ Verify all icon files are created in `desktop-resources/icons/`
2. ✅ Test build desktop app: `npm run build:desktop`
3. ✅ Check icon appears correctly in installer and installed app
4. ✅ Commit icon files to your repository

---

## 📝 Manual Generation (Alternative)

If you prefer to generate icons manually or use online tools:

### Online Converters
- **PNG to ICO:** https://convertio.co/png-ico/
- **PNG to ICNS:** https://cloudconvert.com/png-to-icns
- **Icon Resizer:** https://redketchup.io/icon-converter

### Manual Sizes Needed

**Windows (.ico):**
Upload these sizes: 16, 32, 48, 64, 128, 256

**macOS (.icns):**
Upload these sizes: 16, 32, 64, 128, 256, 512, 1024

**Linux (.png):**
Save individual PNG files at: 16, 24, 32, 48, 64, 96, 128, 256, 512, 1024

---

**Need help?** Open an issue at https://github.com/bluesover/transio.org/issues

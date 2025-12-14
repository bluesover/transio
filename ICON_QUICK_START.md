# 🎨 Desktop App Icons - Quick Start

Generate all required desktop app icons in 2 minutes!

## ⚡ TL;DR

```bash
npm run icons
```

That's it! All icon files will be created in `desktop-resources/icons/`.

---

## 📋 What You Get

After running the command, you'll have:

```
desktop-resources/icons/
├── icon.ico              ✅ Windows (all sizes in one file)
├── icon.icns             ✅ macOS (Retina-ready)
└── [16-1024]x[16-1024].png  ✅ Linux (10 sizes)
```

---

## 🚀 Installation Methods

### Method 1: Node.js Script (Recommended)
Works on all platforms if ImageMagick is installed.

```bash
npm run icons
```

### Method 2: Shell Script (macOS/Linux)
Native shell script with full .icns support.

```bash
npm run icons:shell
```

### Method 3: Batch Script (Windows)
Native Windows batch script.

```bash
npm run icons:batch
```

---

## 📦 Prerequisites

You only need **ImageMagick** installed:

### macOS
```bash
brew install imagemagick libicns icoutils
```

### Ubuntu/Debian
```bash
sudo apt-get install imagemagick icnsutils icoutils
```

### Windows
1. Download from: https://imagemagick.org/script/download.php#windows
2. Install and **check "Add to system path"**
3. Restart your terminal

---

## ✅ Verify Installation

After running the script:

```bash
# Check files were created
ls -lh desktop-resources/icons/

# Should see:
# icon.ico (Windows)
# icon.icns (macOS)
# 16x16.png through 1024x1024.png (Linux)
```

---

## 🏗️ Build Desktop Apps

Once icons are generated:

```bash
# macOS
npm run electron:build:mac

# Windows
npm run electron:build:win

# Linux
npm run electron:build:linux

# All platforms
npm run electron:build:all
```

---

## 🚨 Troubleshooting

### "ImageMagick not found"
Install ImageMagick (see Prerequisites above).

### Icons look blurry
Your source image may be too small. Use a 1024×1024 PNG or larger.

### Script fails on step X
Try alternative methods:
- Node script failing? → Try shell/batch script
- All scripts failing? → Use manual generation (see full guide)

### Windows: Can't create .icns
This is normal - .icns requires macOS tools. The Windows .ico file is sufficient for Windows builds.

---

## 📖 Full Documentation

For detailed information, troubleshooting, and manual generation:

- **[ICON_GENERATION_GUIDE.md](./ICON_GENERATION_GUIDE.md)** - Complete guide with all options
- **[desktop-resources/ICONS_README.md](./desktop-resources/ICONS_README.md)** - Icon specifications and design guidelines

---

## 🎨 Custom Icon Design

Want to use your own logo?

1. Create a 1024×1024 PNG image
2. Replace: `src/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png`
3. Run: `npm run icons`

**Design Tips:**
- Use simple, recognizable shapes
- Ensure visibility at 16×16 size
- Keep important details centered
- Use transparent background
- Match brand colors

---

## ❓ Need Help?

- **Issues?** → https://github.com/bluesover/transio.org/issues
- **Questions?** → https://github.com/bluesover/transio.org/discussions

---

**Ready to build!** Generate icons now → `npm run icons` 🚀

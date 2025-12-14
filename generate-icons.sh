#!/bin/bash

# Icon Generation Script for Transio Desktop App
# This script generates all required icon formats from a source PNG image
# Requirements: ImageMagick, librsvg2-bin (for SVG support), icnsutils (Mac), icoutils (Windows)

set -e

echo "🎨 Transio Icon Generator"
echo "=========================="
echo ""

SOURCE_IMAGE="src/assets/images/E8CE4860-D5D3-4364-83BB-B0F6E7699240.png"
ICONS_DIR="desktop-resources/icons"

if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ Error: Source image not found at $SOURCE_IMAGE"
    exit 1
fi

mkdir -p "$ICONS_DIR"

echo "📦 Checking dependencies..."

check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "❌ $1 is not installed"
        return 1
    else
        echo "✅ $1 is installed"
        return 0
    fi
}

MISSING_DEPS=0

if ! check_command convert; then
    echo "   Install with: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)"
    MISSING_DEPS=1
fi

if ! check_command png2icns; then
    echo "   Install with: brew install libicns (Mac) or apt-get install icnsutils (Linux)"
    MISSING_DEPS=1
fi

if ! check_command icotool; then
    echo "   Install with: brew install icoutils (Mac) or apt-get install icoutils (Linux)"
    MISSING_DEPS=1
fi

if [ $MISSING_DEPS -eq 1 ]; then
    echo ""
    echo "❌ Missing dependencies. Please install the required tools and try again."
    echo ""
    echo "Quick install on macOS:"
    echo "  brew install imagemagick libicns icoutils"
    echo ""
    echo "Quick install on Ubuntu/Debian:"
    echo "  sudo apt-get update"
    echo "  sudo apt-get install imagemagick icnsutils icoutils"
    echo ""
    exit 1
fi

echo ""
echo "🖼️  Generating PNG icons for Linux..."

PNG_SIZES=(16 24 32 48 64 96 128 256 512 1024)

for size in "${PNG_SIZES[@]}"; do
    echo "   Creating ${size}x${size}.png..."
    convert "$SOURCE_IMAGE" -resize "${size}x${size}" -background none -gravity center -extent "${size}x${size}" "$ICONS_DIR/${size}x${size}.png"
done

echo ""
echo "🍎 Generating .icns for macOS..."

TEMP_ICONSET="$ICONS_DIR/icon.iconset"
mkdir -p "$TEMP_ICONSET"

convert "$SOURCE_IMAGE" -resize 16x16 "$TEMP_ICONSET/icon_16x16.png"
convert "$SOURCE_IMAGE" -resize 32x32 "$TEMP_ICONSET/icon_16x16@2x.png"
convert "$SOURCE_IMAGE" -resize 32x32 "$TEMP_ICONSET/icon_32x32.png"
convert "$SOURCE_IMAGE" -resize 64x64 "$TEMP_ICONSET/icon_32x32@2x.png"
convert "$SOURCE_IMAGE" -resize 128x128 "$TEMP_ICONSET/icon_128x128.png"
convert "$SOURCE_IMAGE" -resize 256x256 "$TEMP_ICONSET/icon_128x128@2x.png"
convert "$SOURCE_IMAGE" -resize 256x256 "$TEMP_ICONSET/icon_256x256.png"
convert "$SOURCE_IMAGE" -resize 512x512 "$TEMP_ICONSET/icon_256x256@2x.png"
convert "$SOURCE_IMAGE" -resize 512x512 "$TEMP_ICONSET/icon_512x512.png"
convert "$SOURCE_IMAGE" -resize 1024x1024 "$TEMP_ICONSET/icon_512x512@2x.png"

iconutil -c icns "$TEMP_ICONSET" -o "$ICONS_DIR/icon.icns" 2>/dev/null || \
png2icns "$ICONS_DIR/icon.icns" \
    "$TEMP_ICONSET/icon_16x16.png" \
    "$TEMP_ICONSET/icon_32x32.png" \
    "$TEMP_ICONSET/icon_128x128.png" \
    "$TEMP_ICONSET/icon_256x256.png" \
    "$TEMP_ICONSET/icon_512x512.png"

rm -rf "$TEMP_ICONSET"

echo ""
echo "🪟 Generating .ico for Windows..."

TEMP_ICO_DIR="$ICONS_DIR/temp_ico"
mkdir -p "$TEMP_ICO_DIR"

ICO_SIZES=(16 24 32 48 64 128 256)

for size in "${ICO_SIZES[@]}"; do
    convert "$SOURCE_IMAGE" -resize "${size}x${size}" -background none -gravity center -extent "${size}x${size}" "$TEMP_ICO_DIR/${size}.png"
done

icotool -c -o "$ICONS_DIR/icon.ico" $TEMP_ICO_DIR/*.png

rm -rf "$TEMP_ICO_DIR"

echo ""
echo "✅ Icon generation complete!"
echo ""
echo "Generated files:"
echo "  📁 $ICONS_DIR/"
ls -lh "$ICONS_DIR/" | tail -n +2
echo ""
echo "🎉 All desktop app icons are ready!"
echo ""
echo "Icon files created:"
echo "  • icon.icns (macOS)"
echo "  • icon.ico (Windows)"
echo "  • Multiple PNG sizes for Linux (16x16 to 1024x1024)"
echo ""

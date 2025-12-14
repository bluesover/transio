# Public Assets

This directory contains static assets for SEO and PWA functionality.

## Required Images to Generate

You need to create the following images before deployment:

### 1. Favicons
- `favicon-16x16.png` - 16x16px favicon
- `favicon-32x32.png` - 32x32px favicon
- `apple-touch-icon.png` - 180x180px iOS icon
- `android-chrome-192x192.png` - 192x192px Android icon
- `android-chrome-512x512.png` - 512x512px Android icon

### 2. Social Media Images
- `og-image.png` - 1200x630px Open Graph image (screenshot of app)
- `logo.png` - Transparent background logo (512x512px recommended)

## How to Generate Favicons

### Option 1: Online Tools
Use https://realfavicongenerator.net/
1. Upload `favicon.svg`
2. Download generated package
3. Extract PNG files to this directory

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generate from SVG
convert favicon.svg -resize 16x16 favicon-16x16.png
convert favicon.svg -resize 32x32 favicon-32x32.png
convert favicon.svg -resize 180x180 apple-touch-icon.png
convert favicon.svg -resize 192x192 android-chrome-192x192.png
convert favicon.svg -resize 512x512 android-chrome-512x512.png
```

### Option 3: Using Sharp (Node.js)
```bash
npm install -g sharp-cli
sharp -i favicon.svg -o favicon-16x16.png resize 16 16
sharp -i favicon.svg -o favicon-32x32.png resize 32 32
sharp -i favicon.svg -o apple-touch-icon.png resize 180 180
sharp -i favicon.svg -o android-chrome-192x192.png resize 192 192
sharp -i favicon.svg -o android-chrome-512x512.png resize 512 512
```

## How to Generate OG Image

Take a screenshot of the Transio app:
1. Open the app in browser at 1200x630 viewport
2. Take screenshot
3. Save as `og-image.png`
4. Optimize with https://tinypng.com/

Or use a design tool:
- Figma template: https://www.figma.com/templates/open-graph-template/
- Canva: Create custom graphic 1200x630px

## Files in This Directory

- `robots.txt` - Search engine crawler instructions
- `sitemap.xml` - Site structure for search engines
- `site.webmanifest` - PWA manifest
- `favicon.svg` - Scalable vector icon
- `.well-known/security.txt` - Security contact information

## Testing

After generating images, test them:
- Favicons: https://realfavicongenerator.net/favicon_checker
- OG Image: https://www.opengraph.xyz/
- PWA Manifest: Chrome DevTools > Application > Manifest

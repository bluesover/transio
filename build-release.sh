#!/bin/bash

echo "🚀 Transio Desktop App Builder"
echo "================================"
echo ""

VERSION="1.0.0"

echo "📦 Building web application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Web build failed"
    exit 1
fi

echo "✅ Web build complete"
echo ""

cd desktop

echo "📦 Installing desktop dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Desktop dependencies installation failed"
    exit 1
fi

echo "✅ Desktop dependencies installed"
echo ""

echo "🔨 Building desktop application..."
echo "This will take several minutes..."
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Building for macOS..."
    npm run build:mac
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Building for Linux..."
    npm run build:linux
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "Building for Windows..."
    npm run build:win
else
    echo "Unknown OS, building for current platform..."
    npm run build
fi

if [ $? -ne 0 ]; then
    echo "❌ Desktop build failed"
    exit 1
fi

echo ""
echo "✅ Desktop build complete!"
echo ""
echo "📁 Built files are in: desktop/dist/"
ls -lh desktop/dist/

echo ""
echo "🎉 Build complete!"
echo ""
echo "Next steps:"
echo "1. Test the built application"
echo "2. Create a GitHub release: git tag v${VERSION} && git push origin v${VERSION}"
echo "3. Go to https://github.com/bluesover/transio.org/releases/new"
echo "4. Upload files from desktop/dist/"
echo "5. Publish the release"
echo ""

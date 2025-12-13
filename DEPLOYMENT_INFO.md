# 🚀 Transio - Deployment Information

**Official Website:** [https://transio.org](https://transio.org)

## About Transio

Transio is a **free, open-source, privacy-first** XML/XSLT transformation tool that runs entirely in your browser. It supports XSLT 1.0, 2.0, and 3.0 with comprehensive developer features.

### Key Benefits

✅ **100% Free** - No hosting costs, no subscriptions, no hidden fees  
✅ **Open Source** - MIT License - modify and redistribute freely  
✅ **Privacy First** - All data stays on your computer - zero tracking  
✅ **No Backend** - Pure frontend application - just static files  
✅ **Deploy Anywhere** - Works on any static hosting platform  
✅ **Offline Capable** - Works without internet after initial load  

---

## 🌐 Live Demo

Visit the official hosted version at **[transio.org](https://transio.org)**

---

## 📦 Quick Deploy (5 Minutes)

### Option 1: GitHub Pages (Most Popular)
```bash
npm install
npm run build
npm run deploy
```
✅ Live at: `https://YOUR_USERNAME.github.io/transio/`

### Option 2: Netlify (Drag & Drop)
```bash
npm install
npm run build
```
✅ Drag the `dist` folder to [netlify.com/drop](https://netlify.com/drop)  
✅ Live in 30 seconds!

### Option 3: Vercel (Fastest CLI)
```bash
npm install -g vercel
npm install
vercel --prod
```
✅ Follow prompts - live in 60 seconds

### Option 4: Cloudflare Pages
```bash
npm install
npm run build
npx wrangler pages deploy dist
```
✅ Ultra-fast global CDN

### Option 5: Local Development
```bash
npm install
npm run dev
```
✅ Open http://localhost:5173

---

## 📁 Project Structure

```
transio-xslt-transformer/
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Core XSLT processing logic
│   └── assets/          # Images and static assets
├── public/              # Static assets
├── dist/                # Built files (after npm run build)
├── README.md            # Full documentation
├── PRD.md               # Product requirements
├── DEPLOYMENT_GUIDE.md  # Comprehensive deployment guide
├── SIMPLE_DEPLOY_GUIDE.md  # Step-by-step for beginners
└── package.json         # Project metadata
```

---

## 🔧 Configuration Files

### For GitHub Pages
✅ Already configured in `package.json`:
```json
"scripts": {
  "deploy": "npm run build && npx gh-pages -d dist"
}
```

### For Netlify
✅ `netlify.toml` included - auto-deploys on push

### For Vercel
✅ `vercel.json` included - auto-configures routes

---

## 💾 Data Storage

### Browser Storage (Built-in)
- All user data stored locally using IndexedDB
- Persists between sessions
- No server communication
- Can be cleared via browser settings

### File System Access (Optional)
- Chromium browsers only (Chrome, Edge, Brave)
- Direct folder access with auto-save
- Perfect for project management
- Files stay on your computer

---

## 🔒 Privacy & Security

### Zero Data Collection
- No analytics
- No tracking pixels
- No cookies
- No external API calls for user data
- No user accounts required

### Local Processing Only
- All XSLT transformations happen in your browser
- XML data never leaves your computer
- No server-side processing
- No data uploads

### Open Source Transparency
- Full source code available
- MIT License
- Audit-friendly
- Community-reviewed

---

## 🛠️ Technical Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui v4** - Beautiful components
- **CodeMirror 6** - Professional code editor
- **Saxon-JS 2.7** - XSLT 2.0/3.0 support
- **Phosphor Icons** - Comprehensive icon set

---

## 📚 Documentation

| Guide | Purpose | Link |
|-------|---------|------|
| **README** | Complete project documentation | [README.md](./README.md) |
| **PRD** | Product requirements & design | [PRD.md](./PRD.md) |
| **Simple Deploy** | Step-by-step for beginners | [SIMPLE_DEPLOY_GUIDE.md](./SIMPLE_DEPLOY_GUIDE.md) |
| **Deploy Now** | Quick 5-minute deployment | [DEPLOY_NOW.md](./DEPLOY_NOW.md) |
| **Full Guide** | Comprehensive hosting guide | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| **Local Setup** | Development environment | [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md) |

---

## 🎯 Use Cases

### XML Data Transformation
Transform XML documents into HTML, CSV, JSON, or other formats using XSLT stylesheets.

### Report Generation
Convert structured XML data into formatted reports with custom styling.

### Data Migration
Transform XML schemas from one format to another for system integration.

### Document Processing
Process and transform XML documents with complex business logic.

### Learning & Development
Learn XSLT with built-in snippets and real-time feedback.

---

## 🤝 Contributing

Transio is open source! Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📧 Support & Contact

- **Website:** [https://transio.org](https://transio.org)
- **Documentation:** See README.md and deployment guides
- **Issues:** GitHub Issues (if repository is public)

---

## 🐕 Support Development

If you find Transio useful, consider supporting its development with Dogecoin:

**DOGE Address:** `DRqbUDU1oZ3VfPNpBRj6v5eHSqnQqVJsxJ`

Your contributions help maintain and improve this tool for everyone! 🚀

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

Copyright (c) 2025 Transio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

---

**Made with ❤️ for the developer community**

Visit [transio.org](https://transio.org) to start using Transio today!

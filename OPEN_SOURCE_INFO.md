# Open Source Information

## 📜 License Summary

**Transio** is 100% open source and free to use, modify, and distribute.

- **Main License**: MIT License
- **Commercial Use**: ✅ Allowed
- **Modification**: ✅ Allowed
- **Distribution**: ✅ Allowed
- **Private Use**: ✅ Allowed
- **Liability**: ❌ No warranty provided
- **Patent Grant**: ❌ Not explicitly granted

## 🔓 What "Open Source" Means for This Project

### You Can:
- ✅ Use this app for free (personal or commercial)
- ✅ Deploy your own instance on any hosting service
- ✅ Modify the code to add features or fix bugs
- ✅ Distribute modified versions
- ✅ Use it in commercial products
- ✅ Remove branding and use as white-label solution
- ✅ Fork the project and create derivatives

### You Must:
- ✅ Include the original MIT license in any distributions
- ✅ Provide attribution to original authors (recommended but not required)

### You Cannot:
- ❌ Hold authors liable for any issues
- ❌ Use the Transio trademark without permission (code is MIT, trademark is not)

## 🧩 Third-Party Dependencies

All dependencies used in this project are open-source and compatible with commercial use:

### Core Framework
- **React** (MIT) - UI framework
- **TypeScript** (Apache-2.0) - Type safety
- **Vite** (MIT) - Build tool

### Styling
- **Tailwind CSS** (MIT) - Utility-first CSS framework
- **shadcn/ui** (MIT) - Component library
- **Radix UI** (MIT) - Headless UI primitives
- **Phosphor Icons** (MIT) - Icon library

### Code Editing
- **CodeMirror 6** (MIT) - Code editor
- **@codemirror/lang-xml** (MIT) - XML syntax highlighting
- **@codemirror/lang-html** (MIT) - HTML syntax highlighting

### XSLT Processing
- **Saxon-JS** (MPL-2.0) - XSLT 2.0/3.0 processor
  - Repository: [Saxonica/Saxon-JS](https://github.com/Saxonica/Saxon-JS)
  - License: Mozilla Public License 2.0
  - Commercial use: ✅ Allowed
  - Note: Saxon-JS is the browser runtime. For full XSLT 2.0/3.0 with SEF compilation, Saxon-EE (commercial license) is needed

### Utilities
- **sonner** (MIT) - Toast notifications
- **clsx** (MIT) - CSS class utilities
- **tailwind-merge** (MIT) - Tailwind class merging
- **framer-motion** (MIT) - Animation library
- **date-fns** (MIT) - Date formatting
- **zod** (MIT) - Schema validation
- **react-hook-form** (MIT) - Form management

## 🛡️ License Compatibility

### MIT License (Primary)
The MIT license is one of the most permissive open-source licenses:
- Very short and simple
- Allows commercial use without restrictions
- Compatible with almost all other open-source licenses
- No copyleft requirements

### MPL-2.0 (Saxon-JS)
Mozilla Public License 2.0 is a weak copyleft license:
- ✅ Compatible with MIT for combined works
- ✅ Commercial use allowed
- ✅ Can be integrated into proprietary software
- ⚠️ Modifications to MPL-licensed files must remain MPL
- ✅ New files can use any license (like MIT)

**Practical Impact:**
- This project uses Saxon-JS as-is (no modifications to Saxon-JS source code)
- Saxon-JS remains MPL-2.0
- Rest of the project is MIT
- No license conflicts
- You can use, modify, and distribute freely

## 📊 XSLT 2.0/3.0 Processing: Open Source Status

### XSLT 1.0
- ✅ **100% Open Source & Free**
- Uses browser's built-in `XSLTProcessor`
- No external dependencies
- Works offline completely
- No limitations

### XSLT 2.0/3.0
- ✅ **Open Source Runtime** (Saxon-JS - MPL-2.0)
- ⚠️ **Limited Functionality in Browser**

**What's Open Source:**
- Saxon-JS runtime is fully open source (MPL-2.0)
- Can be freely used in any application
- Source code available on GitHub

**The Limitation:**
- Saxon-JS browser runtime has reduced XSLT 2.0/3.0 functionality
- For full XSLT 2.0/3.0 support, stylesheets need pre-compilation to SEF format
- SEF compilation requires Saxon-EE (commercial product from Saxonica)
- Alternative: Use Saxon-HE (open source, server-side only)

**Open Source Alternatives for Full XSLT 2.0/3.0:**

1. **Saxon-HE (Home Edition)**
   - License: MPL-2.0 (Open Source)
   - Platform: Server-side (Java)
   - XSLT Support: Full XSLT 2.0
   - Repository: [Saxonica/Saxon-HE](https://github.com/Saxonica/Saxon-HE)
   - Use Case: Run transformations on a Node.js backend

2. **Xsltproc (libxslt)**
   - License: MIT (Open Source)
   - Platform: Command-line (C library)
   - XSLT Support: XSLT 1.0 only
   - Use Case: Server-side batch processing

3. **Browser-Based XSLT 1.0**
   - License: Built into browsers (free)
   - Platform: Client-side
   - XSLT Support: XSLT 1.0 only
   - Use Case: Simple transformations in browser

**Recommendation:**
- For production apps requiring complex XSLT 2.0/3.0, use server-side Saxon-HE
- For browser-based apps, stick to XSLT 1.0 for reliability
- Use Saxon-JS for basic XSLT 2.0 features (grouping, basic XPath 2.0)

## 🚀 Deployment: Free & Open Source Options

All recommended hosting platforms are free for open-source projects:

### Static Hosting (No Cost)
1. **GitHub Pages** - Free for public repos
2. **Netlify** - 100GB bandwidth/month free
3. **Vercel** - Unlimited bandwidth for personal projects
4. **Cloudflare Pages** - Unlimited bandwidth
5. **Render** - Free tier available
6. **Surge.sh** - Free static hosting

### Build Tools (No Cost)
- **Vite** - MIT license, free forever
- **npm** - Free package manager
- **GitHub Actions** - 2,000 minutes/month free

## 💰 Cost Breakdown

| Component | Cost | License | Notes |
|-----------|------|---------|-------|
| Source Code | FREE | MIT | Use anywhere |
| Saxon-JS | FREE | MPL-2.0 | XSLT 2.0/3.0 runtime |
| All Dependencies | FREE | MIT/Apache/MPL | No paid tiers |
| Hosting | FREE | N/A | Multiple free options |
| Domain (Optional) | $10-15/year | N/A | Only if you want custom domain |
| SSL Certificate | FREE | N/A | Auto-provided by all hosts |

**Total Cost to Deploy & Run: $0** (or $10-15/year with custom domain)

## 📖 Full License Texts

### MIT License (This Project)
See [LICENSE](./LICENSE) file in root directory.

### Saxon-JS (MPL-2.0)
Full license: https://www.mozilla.org/en-US/MPL/2.0/

### All Dependencies
See [LICENSE_AUDIT.md](./LICENSE_AUDIT.md) for complete dependency license list.

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

### Ways to Contribute:
- 🐛 Report bugs via GitHub Issues
- ✨ Suggest features via GitHub Issues
- 🔧 Submit pull requests
- 📖 Improve documentation
- 🌍 Add translations
- ⭐ Star the repository

### Contribution License
By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## ❓ Common Questions

### Q: Can I use this in my commercial product?
**A:** Yes! MIT license allows unlimited commercial use.

### Q: Do I need to pay for Saxon-JS?
**A:** No. Saxon-JS runtime is free (MPL-2.0). Only Saxon-EE (for SEF compilation) requires a license.

### Q: Can I remove the Transio branding?
**A:** Yes. The code is MIT licensed. However, we'd appreciate attribution!

### Q: Do I need to open-source my modifications?
**A:** No. MIT is permissive. You can keep modifications private. (But sharing helps everyone!)

### Q: What if I modify Saxon-JS files?
**A:** MPL-2.0 requires modified Saxon-JS files to remain MPL. New files can be any license.

### Q: Is there vendor lock-in?
**A:** No. Everything is open source. You can fork, modify, and host anywhere.

### Q: Will this cost money later?
**A:** No. All components are permanently free and open source.

### Q: Can I sell this application?
**A:** Yes, as long as you include the MIT license and comply with third-party licenses.

## 📚 Resources

- **Source Code**: [GitHub Repository](https://github.com/YOUR_USERNAME/transio)
- **Live Demo**: [https://transio.org](https://transio.org)
- **License Audit**: [LICENSE_AUDIT.md](./LICENSE_AUDIT.md)
- **Deployment Guides**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Saxon-JS Docs**: [Saxonica Documentation](https://www.saxonica.com/saxon-js/documentation2/)
- **Saxon-JS Source**: [GitHub - Saxonica/Saxon-JS](https://github.com/Saxonica/Saxon-JS)

## 🎓 Legal Disclaimer

This document provides a summary of licenses for informational purposes. It is not legal advice. Please consult the actual license texts and a qualified attorney for legal questions about licensing.

---

**Last Updated**: December 2024  
**License Version**: MIT (Transio) + MPL-2.0 (Saxon-JS)  
**Status**: ✅ 100% Open Source & Free

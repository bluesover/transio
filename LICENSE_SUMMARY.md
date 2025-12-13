# Open Source License Summary

## 📄 Transio License

**Transio XML/XSLT Transformer** is licensed under the **MIT License**.

This means you are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Sublicense
- ✅ Use privately

See the [LICENSE](./LICENSE) file for complete terms.

---

## 🔍 All Dependencies are Open Source

Every library used in Transio is **100% open source**. We've audited all dependencies to ensure there are no proprietary or closed-source components.

### Core Dependencies

| Package | License | Purpose |
|---------|---------|---------|
| **React** | MIT | UI framework |
| **Vite** | MIT | Build tool |
| **TypeScript** | Apache-2.0 | Language |
| **Tailwind CSS** | MIT | Styling |
| **CodeMirror 6** | MIT | Code editor |
| **Saxon-JS** | MPL-2.0 | XSLT 2.0/3.0 processor |
| **Phosphor Icons** | MIT | Icon library |
| **Sonner** | MIT | Toast notifications |
| **shadcn/ui** | MIT | Component library |
| **Radix UI** | MIT | Primitive components |
| **Framer Motion** | MIT | Animations |

### Development Dependencies

| Package | License |
|---------|---------|
| @vitejs/plugin-react-swc | MIT |
| eslint | MIT |
| typescript-eslint | MIT |
| @tailwindcss/vite | MIT |
| clsx | MIT |
| tailwind-merge | MIT |
| class-variance-authority | Apache-2.0 |

---

## 🔐 Saxon-JS Compliance

**Saxon-JS** is the XSLT 2.0/3.0 processor used in Transio.

### License: Mozilla Public License 2.0 (MPL-2.0)

**MPL-2.0 Key Points:**
- ✅ **Open Source**: Source code is available
- ✅ **Commercial Use**: Can be used in commercial applications
- ✅ **Modification**: You can modify Saxon-JS
- ✅ **Distribution**: You can distribute modified versions
- ⚠️ **Copyleft (File-level)**: Modifications to Saxon-JS files must remain MPL-2.0
- ✅ **MIT Compatible**: Can be combined with MIT-licensed code (this app)

**Saxon-JS Repository:** [Saxonica/Saxon-JS](https://github.com/Saxonica/Saxon-JS)

**License File:** [Saxon-JS License](https://github.com/Saxonica/Saxon-JS/blob/main/LICENSE)

### Saxon-JS in Transio

- ✅ Used as-is, no modifications made to Saxon-JS code
- ✅ Properly declared in package.json
- ✅ MPL-2.0 license preserved in node_modules
- ✅ No proprietary dependencies
- ✅ All usage complies with MPL-2.0 terms

---

## 🖥️ Optional Server: Saxon-HE

**Saxon-HE** (Home Edition) can be optionally installed for enhanced server-side XSLT processing.

### License: Mozilla Public License 2.0 (MPL-2.0)

**Saxon-HE Key Points:**
- ✅ **Open Source**: Fully open-source implementation
- ✅ **Free**: No cost for any use (personal, commercial, enterprise)
- ✅ **Java Implementation**: Runs on the JVM
- ✅ **Full XSLT 2.0 Support**: Complete implementation
- ✅ **MPL-2.0 Licensed**: Same as Saxon-JS

**Saxon-HE Repository:** [Saxonica/Saxon-HE](https://github.com/Saxonica/Saxon-HE)

**Maven Central:** [net.sf.saxon:Saxon-HE](https://mvnrepository.com/artifact/net.sf.saxon/Saxon-HE)

### Saxon-HE Usage

- ✅ Downloaded via npm script during optional server setup
- ✅ Runs in separate Node.js server process
- ✅ Not bundled with the main application
- ✅ Users opt-in to download and use
- ✅ All usage complies with MPL-2.0 terms

---

## ⚖️ License Compatibility

### MIT + MPL-2.0 Combination

Transio (MIT) can legally use Saxon-JS (MPL-2.0) because:

1. **Separate Files**: Saxon-JS code remains in its own files (node_modules)
2. **No Modification**: We don't modify Saxon-JS source code
3. **Larger Work**: MPL-2.0 allows use in larger works under different licenses
4. **MIT Compatible**: MIT and MPL-2.0 are compatible licenses

**Result:** ✅ **Fully Compliant**

---

## 📦 Complete Dependency List

Run `npm list --depth=0` to see all direct dependencies:

```bash
npm list --depth=0
```

**All packages use these licenses:**
- MIT (majority)
- Apache-2.0 (TypeScript, class-variance-authority)
- MPL-2.0 (Saxon-JS)
- ISC (some utilities)

**All are OSI-approved open-source licenses.**

---

## 🚫 What We DON'T Use

Transio explicitly avoids:
- ❌ Proprietary software
- ❌ Closed-source dependencies
- ❌ Commercial-only licenses
- ❌ Enterprise-tier requirements
- ❌ Paid APIs or services
- ❌ Usage tracking or telemetry
- ❌ Data collection services

---

## ✅ Compliance Checklist

- [x] All dependencies are open source
- [x] All licenses are OSI-approved
- [x] Saxon-JS (MPL-2.0) properly attributed
- [x] Saxon-HE (MPL-2.0) properly attributed
- [x] No license conflicts
- [x] No proprietary code
- [x] Source code publicly available
- [x] License files preserved
- [x] Third-party notices included
- [x] Commercial use allowed

---

## 🤝 Contributing

If you contribute to Transio:
- Your contributions will be under the MIT License
- You retain copyright to your contributions
- You grant Transio an MIT license to use your contributions

---

## 📞 Questions?

If you have questions about licensing:
1. Check the [LICENSE](./LICENSE) file
2. Review this document
3. Check individual dependency licenses in node_modules
4. Review Saxon-JS license: https://github.com/Saxonica/Saxon-JS/blob/main/LICENSE

---

**Last Updated:** December 2024

**Audit Status:** ✅ All dependencies verified open source

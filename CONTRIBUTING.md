# Contributing to Transio

Thank you for your interest in contributing to Transio! We welcome contributions from the community.

## 🤝 How to Contribute

### Report Bugs
- Open an issue on [GitHub](https://github.com/bluesover/transio/issues)
- Include steps to reproduce
- Describe expected vs actual behavior
- Include browser/OS version

### Suggest Features
- Open a discussion on [GitHub Discussions](https://github.com/bluesover/transio/discussions)
- Describe the use case
- Explain why it would benefit users

### Submit Code

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/transio.git
   cd transio
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your changes
   - Submit the PR

## 🏗️ Development Setup

```bash
# Clone the repository
git clone https://github.com/bluesover/transio.git
cd transio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📝 Code Style

- Use TypeScript for type safety
- Follow existing formatting (Prettier)
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep functions small and focused

## 🧪 Testing

Before submitting a PR:

- ✅ Test XSLT 1.0 transformations
- ✅ Test XSLT 2.0/3.0 features (if modified)
- ✅ Test on multiple browsers (Chrome, Firefox, Safari)
- ✅ Test responsive layout (mobile, tablet, desktop)
- ✅ Test keyboard shortcuts
- ✅ Ensure no console errors

## 📦 Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Areas for Contribution

- **Bug fixes**: Check [open issues](https://github.com/bluesover/transio/issues)
- **XSLT snippets**: Add more useful templates
- **Documentation**: Improve guides and examples
- **Accessibility**: Improve keyboard navigation and screen reader support
- **Performance**: Optimize large file handling
- **UI/UX**: Improve user experience
- **Tests**: Add test coverage

## 📄 License

By contributing, you agree that your contributions will be licensed under the MPL-2.0 License.

## 💬 Questions?

Open a discussion on [GitHub Discussions](https://github.com/bluesover/transio/discussions)

---

Thank you for contributing to Transio! 🙏

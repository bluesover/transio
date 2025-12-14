# Maintainer Guide - Transio

Quick reference for maintaining and updating Transio.

---

## 📋 Daily Tasks

### Monitor Issues
```bash
# Check GitHub Issues
https://github.com/bluesover/transio/issues

# Respond within 48 hours
# Label appropriately: bug, feature, question, help wanted
```

### Check Deployments
```bash
# Cloudflare Pages dashboard
https://dash.cloudflare.com/pages

# Verify latest deployment succeeded
# Check error logs if any
```

---

## 🔄 Regular Updates

### Weekly
- [ ] Review new GitHub issues
- [ ] Check Cloudflare analytics
- [ ] Monitor GitHub Actions success rate
- [ ] Review community discussions

### Monthly
- [ ] Update dependencies: `npm outdated`
- [ ] Run security audit: `npm audit`
- [ ] Review and merge dependabot PRs (if re-enabled)
- [ ] Check for Saxon-JS updates

### Quarterly
- [ ] Review analytics and user feedback
- [ ] Plan feature roadmap
- [ ] Update documentation
- [ ] Performance optimization review

---

## 🛠️ Common Maintenance Tasks

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update specific package
npm install package-name@latest

# Update all minor/patch versions
npm update

# Fix security vulnerabilities
npm audit fix

# After updates, test thoroughly
npm run dev
npm run build
```

### Fix Cloudflare Deployment Error

**Error**: `npm ci` fails due to package-lock.json mismatch

**Solution**:
```bash
# Remove old lock file
rm package-lock.json

# Regenerate
npm install

# Commit and push
git add package-lock.json
git commit -m "chore: update package-lock.json"
git push origin main
```

### Release New Version

```bash
# 1. Update version in package.json
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# 2. Commit version bump
git add package.json package-lock.json
git commit -m "chore: bump version to v1.0.1"

# 3. Create and push tag
git tag v1.0.1
git push origin main --tags

# 4. GitHub Actions will build desktop apps automatically

# 5. Edit release notes on GitHub
# Add changelog and highlights
```

### Add New XSLT Snippet

```typescript
// Edit: src/lib/snippets.ts

{
  id: 'new-snippet-id',
  title: 'Snippet Title',
  description: 'What it does',
  category: 'basic' | 'advanced' | 'functions' | 'formatting' | 'special',
  xsltVersion: '1.0' | '2.0' | '3.0',
  code: `<xsl:template match="/">
  <!-- Your XSLT code -->
</xsl:template>`
}
```

### Add New Editor Theme

```typescript
// Edit: src/lib/editor-themes.ts

export const themeNames: Record<EditorTheme, string> = {
  // Add new theme
  'new-theme': 'New Theme Name'
}

// Import theme in CodeEditor component
import { newTheme } from '@uiw/codemirror-theme-new-theme'
```

### Clean Up Project

```bash
# Run cleanup script
chmod +x cleanup-project.sh
./cleanup-project.sh

# Review changes
git status

# Commit if satisfied
git add .
git commit -m "chore: clean up temporary files"
git push origin main
```

---

## 🐛 Troubleshooting

### Server Won't Start

**Issue**: Port 3001 already in use

**Solution**:
```bash
# Find process using port
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=3002 npm start
```

### Desktop App Build Fails

**Issue**: Electron builder errors

**Solution**:
```bash
# Clear caches
rm -rf node_modules dist dist-electron dist-desktop
npm install

# Rebuild
npm run build
npx tsc -p tsconfig.electron.json
npm run electron:build

# If still fails, check:
# - Node version (should be 22+)
# - Disk space (needs ~2GB free)
# - Platform-specific requirements
```

### Cloudflare Build Timeout

**Issue**: Build takes >20 minutes

**Solution**:
```bash
# Optimize build in vite.config.ts
build: {
  minify: 'esbuild',  // Faster than terser
  sourcemap: false,   // Disable sourcemaps
  target: 'es2015'    // Don't transpile too much
}

# Use build cache in GitHub Actions
# Already configured in .github/workflows/deploy-cloudflare.yml
```

### High Bundle Size

**Issue**: JavaScript bundle too large

**Solution**:
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Check for:
# - Duplicate dependencies
# - Unused imports
# - Heavy libraries that can be lazy-loaded
# - Missing tree-shaking
```

---

## 📊 Analytics & Metrics

### Cloudflare Analytics
- **Location**: Cloudflare Dashboard → transio project → Analytics
- **Key Metrics**:
  - Unique visitors
  - Page views
  - Bandwidth usage
  - Top pages
  - Referring sites

### GitHub Analytics
- **Location**: Repository → Insights
- **Key Metrics**:
  - Stars and forks
  - Clones and visitors
  - Traffic sources
  - Popular content

### Download Analytics
- **Location**: Repository → Releases → Latest
- **Key Metrics**:
  - Total downloads per platform
  - Download growth over time
  - Most popular version

---

## 🔒 Security Maintenance

### Regular Audits

```bash
# Run npm audit
npm audit

# Fix automatically
npm audit fix

# Review manual fixes needed
npm audit fix --force  # Use with caution

# Check for outdated packages with vulnerabilities
npm outdated | grep security
```

### Dependency Updates

```bash
# Update patch versions (safe)
npm update

# Update minor versions (usually safe)
npm install package@^1.2.0

# Update major versions (test thoroughly)
npm install package@latest
```

### Review Security Issues

- Monitor GitHub Security tab
- Review Dependabot alerts (if re-enabled)
- Subscribe to Saxon-JS security announcements
- Check OWASP top 10 annually

---

## 📝 Documentation Updates

### When to Update Docs

- **README.md**: New features, changed deployment steps
- **PRD.md**: Major feature changes, design updates
- **CONTRIBUTING.md**: New contribution guidelines
- **SECURITY.md**: Security policy changes
- **MAINTAINER_GUIDE.md**: New maintenance procedures

### Documentation Checklist

- [ ] All links work (no 404s)
- [ ] Code examples are tested
- [ ] Screenshots are up to date
- [ ] Version numbers are current
- [ ] Contact information is correct

---

## 🚀 Feature Development Workflow

### 1. Planning
- Discuss in GitHub Discussions
- Create issue with [Feature Request] label
- Get community feedback
- Update PRD.md with requirements

### 2. Development
```bash
# Create feature branch
git checkout -b feature/feature-name

# Develop and test
npm run dev

# Commit frequently
git add .
git commit -m "feat: add feature description"

# Push to GitHub
git push origin feature/feature-name
```

### 3. Testing
- [ ] Test locally (dev and production build)
- [ ] Test all browsers (Chrome, Firefox, Safari)
- [ ] Test mobile responsiveness
- [ ] Test keyboard shortcuts
- [ ] Test with large files
- [ ] No console errors

### 4. Documentation
- [ ] Update README.md if needed
- [ ] Add JSDoc comments
- [ ] Update keyboard shortcuts
- [ ] Add to changelog

### 5. Release
```bash
# Merge to main
git checkout main
git merge feature/feature-name
git push origin main

# Tag if needed (triggers release)
git tag v1.1.0
git push origin v1.1.0
```

---

## 🆘 Emergency Procedures

### Critical Bug in Production

1. **Assess severity**
   - Data loss? → Immediate action
   - App broken? → High priority
   - Visual bug? → Normal priority

2. **Quick fix**
   ```bash
   # Create hotfix branch
   git checkout -b hotfix/critical-bug
   
   # Fix the issue
   # Test thoroughly
   
   # Merge and deploy
   git checkout main
   git merge hotfix/critical-bug
   git push origin main
   ```

3. **Communicate**
   - Post issue on GitHub
   - Update status page (if available)
   - Notify via social media if widespread

4. **Post-mortem**
   - Document what happened
   - How it was fixed
   - How to prevent in future
   - Update tests/procedures

### Service Outage

**Cloudflare Issues**:
- Check [Cloudflare Status](https://www.cloudflarestatus.com/)
- Monitor Cloudflare Dashboard
- Consider backup hosting if prolonged

**GitHub Issues**:
- Check [GitHub Status](https://www.githubstatus.com/)
- Release builds will be delayed
- Communicate to users waiting for releases

---

## 📞 Contacts & Resources

### Key Services
- **Cloudflare**: dash.cloudflare.com
- **GitHub**: github.com/bluesover/transio
- **Domain (GoDaddy)**: godaddy.com

### External Resources
- **Saxon-JS Docs**: saxonica.com/saxon-js/documentation
- **Vite Docs**: vitejs.dev
- **React Docs**: react.dev
- **Tailwind Docs**: tailwindcss.com

### Community
- **GitHub Discussions**: github.com/bluesover/transio/discussions
- **GitHub Issues**: github.com/bluesover/transio/issues

---

## 📚 Additional Resources

- **PRODUCTION_READY_REPORT.md**: Comprehensive review of production readiness
- **DEPLOYMENT_CHECKLIST.md**: Step-by-step deployment verification
- **PRD.md**: Product requirements and design decisions
- **README.md**: User-facing documentation
- **CONTRIBUTING.md**: Guidelines for contributors

---

**Last Updated**: December 2024  
**Maintainer**: See GitHub repository  
**Version**: 1.0.0

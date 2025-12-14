# Deployment Checklist - Transio v1.0.0

Use this checklist before and after deployment to ensure everything works correctly.

---

## 🔧 Pre-Deployment

### Code Quality
- [ ] All TypeScript errors resolved (`npm run lint`)
- [ ] No console errors in browser
- [ ] All features tested locally (`npm run dev`)
- [ ] Production build successful (`npm run build`)
- [ ] Build preview tested (`npm run preview`)

### Dependencies
- [ ] `package-lock.json` synchronized with `package.json`
- [ ] No critical vulnerabilities (`npm audit`)
- [ ] All dependencies up to date (or documented why not)
- [ ] No unnecessary dependencies

### Git Repository
- [ ] All changes committed
- [ ] Working directory clean (`git status`)
- [ ] Remote repository up to date (`git push`)
- [ ] Branch is `main` or intended deployment branch

### Documentation
- [ ] README.md updated with latest features
- [ ] PRD.md reflects current implementation
- [ ] All links in documentation working
- [ ] Code comments up to date

---

## ☁️ Cloudflare Pages Deployment

### Initial Setup (One-Time)
- [ ] Cloudflare account created
- [ ] GitHub repository connected to Cloudflare Pages
- [ ] Build configuration set:
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Root directory: `/` (leave empty)
  - Node version: 22
- [ ] Environment variables configured (if any)

### GitHub Secrets (One-Time)
- [ ] `CLOUDFLARE_API_TOKEN` added to repository secrets
- [ ] `CLOUDFLARE_ACCOUNT_ID` added to repository secrets
- [ ] Secrets have proper scopes (Pages:Edit, Account:Read)

### Deploy Process
- [ ] Push to `main` branch triggers auto-deploy
- [ ] Or manually trigger via GitHub Actions: "Deploy to Cloudflare Pages"
- [ ] Build logs show no errors
- [ ] Deployment completes successfully

### Verification
- [ ] Site accessible at Cloudflare Pages URL
- [ ] Custom domain (transio.org) resolves correctly
- [ ] HTTPS works (SSL certificate valid)
- [ ] All pages load without errors
- [ ] Assets load correctly (images, fonts, icons)

---

## 🌐 Custom Domain Setup

### DNS Configuration (GoDaddy)
- [ ] Domain purchased and active
- [ ] Cloudflare nameservers configured in GoDaddy:
  - `ns1.cloudflare.com`
  - `ns2.cloudflare.com`
- [ ] DNS propagation complete (24-48 hours)

### Cloudflare DNS
- [ ] CNAME record added: `transio.org` → `transio.pages.dev`
- [ ] CNAME record added: `www.transio.org` → `transio.pages.dev`
- [ ] DNS records proxied through Cloudflare (orange cloud)

### SSL/TLS
- [ ] SSL/TLS encryption mode: Full (strict)
- [ ] Universal SSL certificate issued (auto)
- [ ] HTTPS redirect enabled
- [ ] HSTS enabled (optional, recommended after testing)

### Cloudflare Pages Domain
- [ ] Custom domain added in Pages settings
- [ ] Domain verification complete
- [ ] Primary domain set to `transio.org`
- [ ] `www` redirects to apex domain

---

## 🖥️ Desktop App Deployment

### GitHub Release (One-Time Setup)
- [ ] Repository set to public or releases public
- [ ] GitHub Actions workflow `.github/workflows/release-desktop.yml` exists
- [ ] Workflow has correct permissions (contents: write)

### Creating a Release
- [ ] Version number decided (e.g., v1.0.0)
- [ ] Tag created locally: `git tag v1.0.0`
- [ ] Tag pushed: `git push origin v1.0.0`
- [ ] GitHub Actions workflow triggered automatically
- [ ] All three build jobs complete (macOS, Windows, Linux)
- [ ] Artifacts uploaded successfully

### Release Verification
- [ ] Release appears in GitHub Releases
- [ ] All download links work:
  - [ ] macOS .dmg
  - [ ] macOS .zip
  - [ ] Windows .exe
  - [ ] Linux .AppImage
  - [ ] Linux .deb
  - [ ] Linux .rpm
- [ ] Release notes auto-generated or manually added
- [ ] Files are correct size (not empty or corrupt)

### Download Testing
- [ ] macOS: Download and install .dmg
- [ ] macOS: App launches without errors
- [ ] macOS: "Unidentified developer" workaround documented
- [ ] Windows: Download and install .exe
- [ ] Windows: App launches without errors
- [ ] Windows: SmartScreen warning documented
- [ ] Linux: Download .AppImage and test
- [ ] Linux: Verify .deb and .rpm packages

---

## 🧪 Post-Deployment Testing

### Web Application (transio.org)
- [ ] Homepage loads correctly
- [ ] All buttons and links work
- [ ] XML editor loads with syntax highlighting
- [ ] XSLT editor loads with syntax highlighting
- [ ] XSLT 1.0 transformation works
- [ ] XSLT 2.0 transformation works (Saxon-JS)
- [ ] XSLT 3.0 transformation works (Saxon-JS)
- [ ] Output editor shows results correctly
- [ ] Auto-format works for XML/XSLT/Output
- [ ] Version save/load/delete works
- [ ] Snippets panel opens and inserts code
- [ ] Activity log shows operations
- [ ] Keyboard shortcuts work
- [ ] Theme switching works (Light/Dark/Black)
- [ ] Editor theme switching works
- [ ] Mobile responsive layout works
- [ ] Import/Export files work
- [ ] Project folder selection works (Chrome only)
- [ ] Server configuration dialog works (optional server)

### Desktop Application
- [ ] App launches without errors
- [ ] All web app features work offline
- [ ] Saxon-HE server auto-starts
- [ ] Server configuration works
- [ ] Large files (>5MB) work better than web
- [ ] Auto-update checks work (if configured)
- [ ] App icon displays correctly
- [ ] About dialog shows correct version

### Cross-Browser Testing
- [ ] Chrome: All features work
- [ ] Edge: All features work
- [ ] Firefox: Works (File System API graceful fallback)
- [ ] Safari: Works (File System API graceful fallback)
- [ ] Mobile Chrome: Responsive layout works
- [ ] Mobile Safari: Responsive layout works

### Performance Testing
- [ ] Initial load time <3 seconds
- [ ] Small XML (<100KB) transforms instantly
- [ ] Medium XML (100KB-1MB) transforms in <2 seconds
- [ ] Large XML (>1MB) shows warning but still works
- [ ] No memory leaks after 100 transformations
- [ ] Page responsive during transformation

---

## 📊 Monitoring

### GitHub Actions
- [ ] Workflows visible in Actions tab
- [ ] Deploy workflow runs on push to main
- [ ] Release workflow runs on version tag
- [ ] Email notifications configured for failures

### Cloudflare Analytics
- [ ] Analytics enabled in Cloudflare dashboard
- [ ] Visitor metrics visible
- [ ] Performance metrics tracked
- [ ] No 404 errors in logs

### Error Tracking (Optional)
- [ ] Sentry or error tracking set up (opt-in)
- [ ] Error alerts configured
- [ ] Source maps uploaded for debugging

---

## 🔒 Security Verification

### Web Application
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] No mixed content warnings
- [ ] CSP headers configured
- [ ] No sensitive data in client-side code
- [ ] No console.log with sensitive info
- [ ] XSS protection verified

### Desktop Application
- [ ] Code signed (if certificates available)
- [ ] No malware warnings from antivirus
- [ ] Sandbox mode enabled in Electron
- [ ] CSP configured in Electron
- [ ] No remote code execution vulnerabilities

### Server (Optional)
- [ ] Runs on localhost by default
- [ ] CORS properly configured
- [ ] API key authentication works (if enabled)
- [ ] Request timeouts enforced
- [ ] File size limits enforced
- [ ] Temp files cleaned up after use

---

## 📢 Post-Launch

### Communication
- [ ] Announce on GitHub Discussions
- [ ] Share on social media
- [ ] Post on relevant subreddits (r/opensource, r/programming)
- [ ] Submit to Product Hunt (optional)
- [ ] Add to awesome-lists (optional)

### Community Setup
- [ ] GitHub Discussions enabled
- [ ] Issues template created
- [ ] PR template created
- [ ] Contributing guidelines clear
- [ ] Code of conduct added (optional)

### Monitoring Plan
- [ ] Check GitHub Issues daily
- [ ] Respond to questions within 48 hours
- [ ] Review analytics weekly
- [ ] Plan feature updates based on feedback

---

## 🐛 Rollback Plan

If critical issues are found after deployment:

### Web Application
1. **Immediate**: Revert commit in GitHub
2. **Redeploy**: Push reverted commit (auto-deploys)
3. **Verify**: Test the previous working version
4. **Fix**: Fix issue in separate branch
5. **Test**: Thoroughly test fix
6. **Deploy**: Merge and deploy fix

### Desktop Application
1. **Immediate**: Mark release as "Pre-release" in GitHub
2. **Notify**: Add warning to release notes
3. **Fix**: Create hotfix release (v1.0.1)
4. **Release**: Create new tag and release
5. **Update**: Users with auto-update get fixed version

---

## ✅ Sign-Off

Deployment completed by: _______________  
Date: _______________  
Version deployed: _______________  
Issues encountered: _______________  
Next review date: _______________

---

## 📝 Notes

Use this space for deployment-specific notes, custom configurations, or lessons learned:

```
[Your notes here]
```

---

**Last Updated**: December 2024  
**Version**: 1.0.0

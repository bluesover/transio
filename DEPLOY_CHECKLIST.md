# 🚀 Deployment Checklist

Use this checklist before deploying your XML/XSLT Transformer to production.

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run build` - Build completes without errors
- [ ] Run `npm run preview` - Preview works locally
- [ ] Test in Chrome/Edge - All features work
- [ ] Test in Firefox/Safari - Core features work (no File System API expected)
- [ ] Check browser console - No errors logged

### Feature Testing
- [ ] **Transformation**: XSLT 1.0 transformation works
- [ ] **Transformation**: XSLT 2.0/3.0 with Saxon-JS works
- [ ] **Version Control**: Save version works
- [ ] **Version Control**: Load version works
- [ ] **Version Control**: Delete version works
- [ ] **Version Control**: Release version works
- [ ] **Project Management**: Select folder works (Chrome/Edge only)
- [ ] **Project Management**: Auto-save to folder works
- [ ] **Import/Export**: Import XML file works
- [ ] **Import/Export**: Import XSLT file works
- [ ] **Import/Export**: CSV export works (with folder selected)
- [ ] **Import/Export**: Launcher generation works (with folder selected)
- [ ] **Code Editor**: XML syntax highlighting works
- [ ] **Code Editor**: XSLT syntax highlighting works
- [ ] **Code Editor**: Line numbers display
- [ ] **Code Editor**: Format XML works (Ctrl+Shift+F)
- [ ] **Code Editor**: Format XSLT works (Ctrl+Shift+G)
- [ ] **Snippets**: Snippets panel opens (Ctrl+K)
- [ ] **Snippets**: Search functionality works
- [ ] **Snippets**: Insert snippet works
- [ ] **Themes**: App theme cycling works
- [ ] **Themes**: Editor theme selector works
- [ ] **Activity Log**: Displays operations
- [ ] **Activity Log**: Expandable/collapsible works
- [ ] **Keyboard Shortcuts**: Ctrl+Enter transforms
- [ ] **Keyboard Shortcuts**: ? opens help dialog
- [ ] **Toast Notifications**: Success messages show
- [ ] **Toast Notifications**: Error messages show

### Mobile/Responsive
- [ ] Test on mobile viewport (<768px)
- [ ] Tabs switch correctly (XML/XSLT/Output/Versions)
- [ ] Touch interactions work
- [ ] Text is readable
- [ ] Buttons are tappable (44px minimum)

### Data Persistence
- [ ] IndexedDB storage works (useKV)
- [ ] Data survives page refresh
- [ ] Version history persists
- [ ] Settings persist (theme, XSLT version)
- [ ] Activity log persists

### Performance
- [ ] Initial load time < 3 seconds
- [ ] XSLT 1.0 transformation < 100ms (simple XML)
- [ ] XSLT 2.0/3.0 first load < 2 seconds (Saxon-JS)
- [ ] Subsequent transformations fast
- [ ] No memory leaks (test with large files)

### Browser Console
- [ ] No errors in console
- [ ] No warnings (except expected ones)
- [ ] Network requests succeed (Saxon-JS load)

## 🌐 Deployment Options

Choose one or more:

### Option 1: GitHub Pages (Free)
- [ ] Create GitHub repository
- [ ] Push code to main branch
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages in repo settings
- [ ] Test at `https://YOUR_USERNAME.github.io/REPO_NAME/`
- [ ] Update launcher files with production URL

### Option 2: Netlify (Free)
- [ ] Build: `npm run build`
- [ ] Drag `dist` folder to netlify.com/drop
- [ ] Test deployed URL
- [ ] Update launcher files with production URL
- [ ] (Optional) Set up custom domain
- [ ] (Optional) Connect GitHub for auto-deploy

### Option 3: Vercel (Free)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Run `vercel --prod`
- [ ] Test deployed URL
- [ ] Update launcher files with production URL
- [ ] (Optional) Set up custom domain

### Option 4: Cloudflare Pages (Free)
- [ ] Build: `npm run build`
- [ ] Deploy: `npx wrangler pages deploy dist`
- [ ] Test deployed URL
- [ ] Update launcher files with production URL

### Option 5: Local Network (Free)
- [ ] Run `npm run dev`
- [ ] Note Network URL (e.g., http://192.168.1.100:5173)
- [ ] Test from other device on same network
- [ ] Update launcher files with local network URL

## 📝 Post-Deployment

### Verify Deployment
- [ ] Open production URL in browser
- [ ] Test basic transformation
- [ ] Test file imports
- [ ] Test folder selection (Chrome/Edge)
- [ ] Test on mobile device
- [ ] Share URL with test user

### Update Documentation
- [ ] Update README.md with production URL
- [ ] Update launcher files in project folders
- [ ] Document any deployment-specific issues
- [ ] Add production URL to package.json homepage field

### Share
- [ ] Share URL with users
- [ ] Provide launch-windows.bat and launch-mac-linux.sh
- [ ] Include LOCAL_SETUP_GUIDE.md
- [ ] Include DEPLOYMENT_GUIDE.md

### Monitor (Optional)
- [ ] Set up simple analytics (Goatcounter - privacy-friendly)
- [ ] Monitor error reports (browser console)
- [ ] Track feature usage patterns

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Deployment Succeeds but Site is Blank
- [ ] Check base path in `vite.config.ts`
- [ ] For GitHub Pages, use: `base: '/REPO_NAME/'`
- [ ] For other hosts, use: `base: './'`
- [ ] Rebuild and redeploy

### CORS Errors in Production
- [ ] Verify HTTPS is being used
- [ ] Check File System API is only called in supported browsers
- [ ] Test file imports with browser file picker

### Version Panel Not Showing
- [ ] Verify versions exist in IndexedDB
- [ ] Check Version Panel is not hidden (toggle button)
- [ ] Test creating a new version

### CSV/Launcher Export Not Working
- [ ] Verify project folder is selected
- [ ] Check browser is Chrome/Edge/Brave
- [ ] Verify folder permissions granted
- [ ] Check Activity Log for errors

## 📊 Success Metrics

Your deployment is successful when:
- ✅ URL loads in < 3 seconds
- ✅ Transformation works on first try
- ✅ No console errors
- ✅ Mobile layout works
- ✅ Data persists after refresh
- ✅ File imports work via picker
- ✅ Folder management works (Chromium browsers)

## 🎉 You're Live!

Once everything checks out:
1. Share your deployment URL
2. Provide launcher scripts to users
3. Include documentation (README, guides)
4. Enjoy your free, local-first XSLT transformer!

---

**Need Help?**
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions
- Check [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md) for local development
- Check browser console for errors
- Test in Chrome/Edge first (full feature support)

# Cloudflare Deployment Error Fix

## The Error You're Seeing

```
If are uploading a directory of assets, you can either:
- Specify the path to the directory of assets via the command line: (ex: `npx wrangler deploy --assets=./dist`)
- Or add the following to your "wrangler.toml" file:

[assets]
directory = "./dist"
```

## The Solution

You need to use `wrangler pages deploy` (not just `wrangler deploy`) for Cloudflare Pages projects.

### Correct Command

```bash
# Build the project first
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=transio
```

Or use the npm script:

```bash
npm run deploy
```

## Why This Happens

- `wrangler deploy` is for **Cloudflare Workers** (serverless functions)
- `wrangler pages deploy` is for **Cloudflare Pages** (static sites)

Transio is a static site, so you must use `wrangler pages deploy`.

## Updated wrangler.toml

Your `wrangler.toml` has been updated to:

```toml
name = "transio"
compatibility_date = "2024-12-13"
pages_build_output_dir = "dist"

[site]
bucket = "./dist"
```

## Complete Deployment Steps

1. **Install Wrangler (if not already installed)**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```
   
   Verify `dist` folder exists:
   ```bash
   ls dist/
   # Should show: index.html, assets/
   ```

4. **Deploy**
   ```bash
   npx wrangler pages deploy dist --project-name=transio
   ```

5. **Done!**
   Your site will be live at `https://transio.pages.dev`

## Setting Up in Cloudflare Dashboard (Alternative)

If command-line deployment doesn't work, you can use the dashboard:

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click "Workers & Pages" → "Create application" → "Pages"
3. Connect to GitHub
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

Every push to main will auto-deploy!

## Common Issues

### "Project not found"

**Solution:** Create the Pages project first in Cloudflare dashboard, then use wrangler.

### "Authentication error"

**Solution:** Run `wrangler login` again.

### "dist directory is empty"

**Solution:** Run `npm run build` first and verify `dist` folder has files.

---

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide with custom domain setup.**

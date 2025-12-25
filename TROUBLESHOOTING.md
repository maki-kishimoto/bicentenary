# Troubleshooting Guide

## MIME Type Error: "application/octet-stream"

### Problem
When accessing your deployed site, you see an error in the browser console:
```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/octet-stream"
```

The error references a `.tsx` file like: `https://your-domain.com/src/main.tsx`

### Root Cause
This error occurs when GitHub Pages is serving the **source files** from your repository instead of the **built files** from the GitHub Actions workflow. The browser tries to load TypeScript files (`.tsx`) which GitHub Pages serves with an incorrect MIME type (`application/octet-stream` instead of `text/javascript`).

### Solution

#### Step 1: Verify GitHub Pages Configuration
1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Click on **Pages** (left sidebar)
4. Under **Build and deployment**, check the **Source** setting:
   - ✅ **Correct**: `GitHub Actions` 
   - ❌ **Incorrect**: `Deploy from a branch` (e.g., `main`, `gh-pages`)

#### Step 2: Change to GitHub Actions (if needed)
If your source is set to "Deploy from a branch":
1. Click on the **Source** dropdown
2. Select **GitHub Actions**
3. GitHub will save this automatically

#### Step 3: Trigger a New Deployment
1. Go to the **Actions** tab in your repository
2. Click on the **Deploy to GitHub Pages** workflow
3. Click **Run workflow** (right side)
4. Select the `main` branch
5. Click **Run workflow** button
6. Wait for the workflow to complete (about 30-60 seconds)

#### Step 4: Clear Browser Cache and Test
1. **Hard refresh** your browser:
   - **Windows/Linux Chrome**: `Ctrl + Shift + R` or `Ctrl + F5`
   - **Mac Chrome**: `Cmd + Shift + R`
   - **Windows/Linux Firefox**: `Ctrl + Shift + R` or `Ctrl + F5`
   - **Mac Firefox**: `Cmd + Shift + R`
   - **Safari**: `Cmd + Option + R`
2. Or use **Incognito/Private mode** to test without cache
3. Reload your site

### Verification
If the deployment is correct, your site should:
- ✅ Load without errors in the browser console
- ✅ Display the application correctly
- ✅ NOT show a red error message about deployment configuration

If the deployment is incorrect (source files are being served), you will see:
- ❌ A large red error message explaining the configuration problem
- ❌ Console errors about MIME types
- ❌ References to `.tsx` files in the Network tab

### Technical Details

#### Why This Happens
- **Vite** (the build tool) transforms your TypeScript source files into optimized JavaScript bundles during `npm run build`
- The **source** `index.html` references `./src/main.tsx` (TypeScript)
- The **built** `dist/index.html` references `/assets/index-[hash].js` (compiled JavaScript)
- The GitHub Actions workflow runs the build and deploys the `dist` folder
- If GitHub Pages is configured to deploy from a branch, it serves the source files directly, causing the error

#### How the Fix Works
- The `index.html` now includes a verification script that runs when the page loads
- The script checks whether it's running the source version or built version
- If it detects the source version is being served in production, it displays a helpful error message
- If it detects the built version, the app loads normally

### Still Having Issues?

#### Check Workflow Status
1. Go to **Actions** tab
2. Look at the latest **Deploy to GitHub Pages** workflow
3. Make sure it has a green checkmark (✅) and says "Success"
4. If it failed (❌), click on it to see error details

#### Check Deployed Files
1. Go to **Actions** tab
2. Click on the latest successful **Deploy to GitHub Pages** workflow
3. Click on the **build** job
4. Expand the **Verify build output** step
5. It should say: "✓ Build verification passed - no TypeScript files in built output"

#### Check Custom Domain Configuration
If you're using a custom domain (like `choshu-five-spirits.jp`):
1. Verify the `CNAME` file exists in the repository root
2. Verify it contains only your domain name (one line)
3. Verify your DNS provider has the correct records:
   - For apex domain: `A` records pointing to GitHub Pages IPs
   - For www subdomain: `CNAME` record pointing to `<username>.github.io`
4. Wait 24-48 hours for DNS propagation if you just changed DNS settings

#### Force Clear Everything
1. Clear browser cache completely (not just hard refresh)
2. Clear browser site data:
   - Chrome: Settings → Privacy → Site Settings → View permissions → [your site] → Clear & reset
   - Safari: Preferences → Privacy → Manage Website Data → [your site] → Remove
3. Try a different browser
4. Try from a different device (e.g., phone)
5. Wait 5-10 minutes for CDN cache to expire

### Contact Support
If none of these steps work, please provide:
1. Screenshot of GitHub Pages settings (Settings → Pages)
2. Link to the latest workflow run (Actions tab)
3. Screenshot of browser console errors
4. Browser name and version
5. Whether you're using a custom domain or github.io domain

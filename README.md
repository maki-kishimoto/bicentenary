<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1FISI4R9EdD5WWf6cJSObKbzAySRi0aCi

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### First-time Setup

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**, select **Source**: **GitHub Actions**
4. The workflow will automatically run on the next push to `main`

Your site will be available at: `https://maki-kishimoto.github.io/bicentenary/`

### Manual Build

To build the app locally:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Troubleshooting

If you encounter errors when accessing your deployed site (especially MIME type errors or module loading issues), please see the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide for detailed solutions.

**Common issues:**
- MIME type error: "application/octet-stream" → See [Troubleshooting Guide](TROUBLESHOOTING.md)
- Site not loading after deployment → Verify GitHub Pages is set to use "GitHub Actions" as source
- Changes not appearing → Clear browser cache or use incognito mode


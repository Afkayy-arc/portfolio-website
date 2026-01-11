# Deployment Guide - Muhammad Abdullah Portfolio

## Quick Deploy to Vercel (Recommended)

### Step 1: Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Muhammad Abdullah Portfolio"

# Add your GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/Afkayyy/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Using Vercel Website (Easiest):**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `portfolio` repository
5. Settings will be auto-detected:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"
7. Wait 2-3 minutes ✅

**Your live URL**: `https://portfolio-[random].vercel.app`

**Using Vercel CLI:**
```bash
# Install Vercel globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Step 3: Add Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `muhammadabdullah.dev`)
4. Follow DNS configuration instructions

---

## Alternative: Deploy to Netlify

### Using Netlify Website:
1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Using Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize Netlify project
netlify init

# Deploy
netlify deploy --prod
```

---

## Environment Variables (If Needed)

If you add any API keys or secrets later:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add your variables
3. Redeploy

---

## Build Verification

Before deploying, always verify locally:

```bash
# Build the project
npm run build

# Test production build locally
npm start
```

Visit http://localhost:3000 to verify everything works.

---

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch = automatic deployment
- Every pull request = preview deployment
- Zero configuration needed

---

## Post-Deployment Checklist

✅ Site loads correctly
✅ All sections visible (Home, Projects, Skills, Experience, Contact)
✅ Navigation works smoothly
✅ Copy email button works
✅ External links open correctly
✅ Mobile responsive
✅ Custom domain configured (optional)

---

## Troubleshooting

**Build Failed:**
- Check `npm run build` works locally
- Verify all dependencies in package.json
- Check Vercel/Netlify logs for specific errors

**Site Not Updating:**
- Clear browser cache
- Check deployment logs
- Verify correct branch is deployed

**Custom Domain Issues:**
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check SSL certificate status

---

## Support

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/app/building-your-application/deploying

---

Built with ❤️ by Muhammad Abdullah

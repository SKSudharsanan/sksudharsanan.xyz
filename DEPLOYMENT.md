# 🚀 Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended) ⚡

**Why Vercel?**
- Optimized for Vite projects
- Automatic deployments
- Free SSL certificates
- Global CDN
- Zero configuration

**Deploy Now:**

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
vercel

# Follow the prompts:
# ? Set up and deploy? [Y/n] y
# ? Which scope? Your username
# ? Link to existing project? [y/N] n
# ? What's your project's name? sksudharsanan-portfolio
# ? In which directory is your code located? ./
```

#### Option B: Using Git (Easiest)
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite → Click "Deploy"
6. Done! 🎉

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL (automatic)

---

### 2. Netlify 🌐

**Deploy with Netlify:**

#### Option A: Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Follow prompts
```

#### Option B: Using Git
1. Push to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select repository
5. Settings auto-detected from `netlify.toml`
6. Click "Deploy"

**Configuration:**
Already set up in `netlify.toml`!

---

### 3. GitHub Pages 📄

**Setup:**

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update `package.json`:**
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/REPO_NAME",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/REPO_NAME/',
  // ... rest of config
})
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/root`

---

### 4. Cloudflare Pages ☁️

1. Push to GitHub
2. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
3. Click "Create a project"
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
6. Click "Save and Deploy"

---

### 5. Firebase Hosting 🔥

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login:**
```bash
firebase login
```

3. **Initialize:**
```bash
firebase init hosting
```

4. **Configure:**
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Automatic builds: `No`

5. **Deploy:**
```bash
npm run build
firebase deploy
```

---

### 6. AWS S3 + CloudFront ☁️

**Setup S3 Bucket:**
```bash
aws s3 mb s3://your-portfolio-bucket
aws s3 website s3://your-portfolio-bucket --index-document index.html
```

**Deploy:**
```bash
npm run build
aws s3 sync dist/ s3://your-portfolio-bucket --delete
```

**Setup CloudFront:**
1. Create CloudFront distribution
2. Origin: Your S3 bucket
3. Enable "Redirect HTTP to HTTPS"
4. Default root object: `index.html`

---

## 🔧 Environment Variables

If you add environment variables (e.g., API keys):

**Create `.env`:**
```env
VITE_API_KEY=your_key_here
VITE_YOUTUBE_API_KEY=your_youtube_key
```

**Use in code:**
```javascript
const apiKey = import.meta.env.VITE_API_KEY
```

**Add to `.gitignore`:**
```
.env
.env.local
```

**Add to Vercel/Netlify:**
- Project Settings → Environment Variables
- Add each variable

---

## 🎯 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] No console errors in browser
- [ ] All links work
- [ ] All images load
- [ ] Videos play correctly
- [ ] Music player works
- [ ] Theme toggle works
- [ ] Mobile responsive

### ✅ Content
- [ ] Update your name everywhere
- [ ] Add your work experience
- [ ] Add your projects
- [ ] Update social links
- [ ] Add your music files
- [ ] Add your video IDs
- [ ] Update meta tags in `index.html`

### ✅ SEO
- [ ] Add meta description
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Add favicon
- [ ] Update page title
- [ ] Add `robots.txt`

### ✅ Performance
- [ ] Run Lighthouse audit (score > 90)
- [ ] Optimize images (WebP format)
- [ ] Test on mobile devices
- [ ] Test on different browsers

### ✅ Security
- [ ] No API keys in code
- [ ] HTTPS enabled
- [ ] Security headers configured

---

## 📊 Post-Deployment

### Add Analytics

**Google Analytics:**
Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

In `App.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### Monitor Performance

**Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun --collect.url=https://your-site.com
```

**WebPageTest:**
Visit [webpagetest.org](https://www.webpagetest.org)

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. Go to Project → Settings → Domains
2. Add domain: `yourdomain.com`
3. Add DNS records (shown by Vercel):
   ```
   Type  Name  Value
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48hrs, usually 5-10 mins)
5. SSL auto-configured ✅

### Netlify Custom Domain

1. Site Settings → Domain management
2. Add custom domain
3. Update DNS:
   ```
   Type  Name  Value
   A     @     75.2.60.5
   CNAME www   your-site.netlify.app
   ```
4. Enable HTTPS (automatic)

### Cloudflare + Any Host

1. Add site to Cloudflare
2. Update nameservers at domain registrar
3. Add DNS records for your host
4. Enable "Proxied" for CDN + HTTPS
5. Enable "Always Use HTTPS"

---

## 🐛 Troubleshooting

### Build Fails

**Check Node version:**
```bash
node --version  # Should be >= 18
```

**Clear cache:**
```bash
rm -rf node_modules dist package-lock.json
npm install
npm run build
```

### 404 Errors

Make sure SPA redirect is configured:
- Vercel: `vercel.json` ✅ (already included)
- Netlify: `netlify.toml` ✅ (already included)
- Others: Add redirect rule

### Assets Not Loading

Check `base` path in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/',  // For root domain
  // base: '/repo-name/',  // For GitHub Pages
})
```

### Slow Performance

1. Enable CDN caching
2. Compress images
3. Use lazy loading
4. Enable Brotli compression

---

## 💰 Cost Comparison

| Platform | Free Tier | Custom Domain | SSL | CDN | Build Time |
|----------|-----------|---------------|-----|-----|------------|
| Vercel | ✅ Unlimited | ✅ Free | ✅ Auto | ✅ Yes | ~1-2 min |
| Netlify | ✅ 300 min/mo | ✅ Free | ✅ Auto | ✅ Yes | ~1-2 min |
| GitHub Pages | ✅ Unlimited | ✅ Free | ✅ Auto | ❌ No | ~3-5 min |
| Cloudflare | ✅ Unlimited | ✅ Free | ✅ Auto | ✅ Yes | ~1-2 min |
| Firebase | ✅ 10GB | ✅ Free | ✅ Auto | ✅ Yes | Manual |

**Recommendation:** Start with **Vercel** → it's free, fast, and perfect for Vite!

---

## 🎉 You're Live!

Your portfolio is now accessible worldwide! 🌍

**Next Steps:**
1. Share on social media
2. Add to LinkedIn
3. Update resume with link
4. Submit to Google Search Console
5. Monitor analytics

---

**Need help?** Check other guides:
- `QUICK_START.md` - Quick setup
- `CUSTOMIZATION.md` - Detailed customization
- `README.md` - Project overview

Happy deploying! 🚀✨


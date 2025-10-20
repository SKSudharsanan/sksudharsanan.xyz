# Customization Guide

## 🎨 Personal Branding

### Update Your Name & Title

**In `src/components/Sidebar.jsx`** (lines 52-54):
```jsx
<h1 className="text-xl lg:text-2xl font-cinematic font-bold gradient-text hidden lg:block">
  Your Name Here
</h1>
```

**In `src/sections/Hero.jsx`** (lines 49-61):
```jsx
<h1>Software Engineer</h1>  {/* Change to your title */}
<h2>turned Filmmaker</h2>    {/* Change to your subtitle */}
<p>Your tagline here...</p>
```

**In `index.html`** (line 7):
```html
<title>Your Name - Your Title</title>
```

### Update About Section

**In `src/sections/About.jsx`** (lines 40-50):
```jsx
<p>Your story paragraph 1...</p>
<p>Your story paragraph 2...</p>
<p>Your story paragraph 3...</p>
```

## 💼 Work Experience

Edit `src/data/timeline.json`:

```json
[
  {
    "id": 1,
    "years": "2024-Present",
    "company": "Your Company",
    "role": "Your Role",
    "summary": "What you accomplished and learned...",
    "techStack": ["Tech1", "Tech2", "Tech3"]
  }
]
```

**Tips:**
- Keep summaries concise (2-3 sentences)
- List 4-7 relevant tech stack items
- Order by most recent first

## 🚀 Projects

Edit `src/data/projects.json`:

```json
[
  {
    "id": 1,
    "title": "Project Name",
    "description": "Brief description (one line)",
    "url": "https://github.com/username/repo",
    "techStack": ["React", "Node.js", "MongoDB"],
    "color": "blue"
  }
]
```

**Available colors:** `blue`, `purple`, `pink`

## 🎵 Music Integration

### Step 1: Add Audio Files
Place your MP3/WAV/OGG files in `public/songs/`:
```
public/songs/
  ├── track1.mp3
  ├── track2.mp3
  └── track3.mp3
```

### Step 2: Update Music Data
Edit `src/data/music.json`:

```json
[
  {
    "id": 1,
    "title": "Song Title",
    "artist": "Artist Name",
    "duration": "3:45",
    "file": "/songs/track1.mp3"
  }
]
```

**Note:** Duration format is `M:SS` (e.g., "3:45" or "12:30")

## 🎬 YouTube Videos

### Method 1: Update Static Data

Edit `src/sections/Videos.jsx` (around line 7):

```javascript
const videos = {
  shorts: [
    {
      id: 1,
      title: "Your Video Title",
      videoId: "dQw4w9WgXcQ",  // YouTube video ID
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    }
  ],
  music: [...],
  ads: [...],
  tutorials: [...]
}
```

**How to get YouTube Video ID:**
From URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
The ID is: `dQw4w9WgXcQ`

**Thumbnail URL format:**
```
https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg
```

### Method 2: YouTube Data API (Advanced)

1. Get API key from [Google Cloud Console](https://console.cloud.google.com)
2. Install axios: `npm install axios`
3. Create `src/hooks/useYouTubeVideos.js`:

```javascript
import { useState, useEffect } from 'react'
import axios from 'axios'

export function useYouTubeVideos(channelId) {
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&channelId=${channelId}&part=snippet&order=date&maxResults=12`
      )
      setVideos(response.data.items)
    }
    fetchVideos()
  }, [channelId])
  
  return videos
}
```

4. Use in `Videos.jsx`:
```javascript
const videos = useYouTubeVideos('YOUR_CHANNEL_ID')
```

## 🔗 Social Links

Edit `src/sections/Footer.jsx` (around line 5):

```javascript
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/YOUR_USERNAME",
    color: "hover:text-pastel-blue",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@YOUR_CHANNEL",
    color: "hover:text-pastel-pink",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/YOUR_HANDLE",
    color: "hover:text-pastel-purple",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/YOUR_PROFILE",
    color: "hover:text-pastel-mint",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:YOUR_EMAIL@example.com",
    color: "hover:text-pastel-blue",
  },
]
```

## 🎨 Color Scheme

### Pastel Accent Colors

Edit `tailwind.config.js` (lines 50-55):

```javascript
pastel: {
  blue: "#a6d8ff",    // Light blue
  purple: "#bca9f4",  // Soft purple
  pink: "#ffbcd1",    // Blush pink
  mint: "#b8f3d0",    // Mint green
}
```

**Finding Colors:**
- [Coolors.co](https://coolors.co/palettes/pastel)
- [Adobe Color](https://color.adobe.com)
- Use HSL: `hsl(hue, 70-80%, 80-90%)` for pastels

### Dark/Light Mode Colors

Edit `src/index.css` (lines 4-44) for theme variables.

## 💼 Services/Hire Me Section

### Update Embedded Site

Edit `src/sections/Services.jsx` (line 40):

```jsx
<iframe
  src="https://YOUR_WEBSITE.com"
  className="w-full h-full rounded-lg"
  title="Your Services"
/>
```

### Customize Service Cards

Edit the grid section (lines 60-85):

```jsx
<div className="text-center p-6 rounded-lg glass">
  <div className="text-3xl mb-3">🎬</div>
  <h3>Your Service</h3>
  <p>Service description</p>
</div>
```

## 🔤 Fonts

### Current Fonts
- **Body:** Inter (sans-serif)
- **Headings:** Playfair Display (serif)

### Change Fonts

**Step 1:** Update `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;600;700&display=swap" rel="stylesheet">
```

**Step 2:** Update `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
  cinematic: ['Your Heading Font', 'serif'],
}
```

**Font Recommendations:**
- Modern: Inter, Poppins, Montserrat
- Elegant: Playfair Display, Cormorant, Lora
- Tech: Fira Code, JetBrains Mono, Space Mono

## 📱 Responsive Breakpoints

Tailwind breakpoints used:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Example:
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## ✨ Animations

### Framer Motion Presets

**Fade in:**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

**Slide up:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

**Scale on hover:**
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
```

**Rotate animation:**
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
```

### Custom Scroll Animations

Use `whileInView` for scroll-triggered animations:
```jsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

## 🖼️ Adding Images

### Hero Background Video/Image

Replace gradient in `src/sections/Hero.jsx`:

```jsx
{/* Replace gradient with image */}
<div className="absolute inset-0 -z-10">
  <img 
    src="/path/to/image.jpg" 
    alt="Background"
    className="w-full h-full object-cover opacity-30"
  />
</div>
```

### Project Thumbnails

Add images to projects:

1. Place images in `public/projects/`
2. Update `projects.json`:
```json
{
  "image": "/projects/project-thumbnail.jpg"
}
```

3. Display in `Projects.jsx`:
```jsx
<img src={project.image} alt={project.title} />
```

## 🎯 SEO Optimization

### Meta Tags

Update `index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Your portfolio description" />
  <meta name="keywords" content="developer, filmmaker, AI, blockchain" />
  <meta name="author" content="Your Name" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Your Name - Portfolio" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="/og-image.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Name - Portfolio" />
  <meta name="twitter:description" content="Your description" />
  <meta name="twitter:image" content="/og-image.jpg" />
  
  <title>Your Name - Your Title</title>
</head>
```

### Favicon

Replace `public/vite.svg` with your favicon:
- Create `favicon.ico` (16x16, 32x32, 64x64)
- Update `index.html`:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

## 📊 Analytics

### Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚀 Performance Tips

1. **Optimize Images:**
   - Use WebP format
   - Compress with [TinyPNG](https://tinypng.com)
   - Use responsive images

2. **Lazy Loading:**
   ```jsx
   import { lazy, Suspense } from 'react'
   const Music = lazy(() => import('./sections/Music'))
   
   <Suspense fallback={<Loading />}>
     <Music />
   </Suspense>
   ```

3. **Code Splitting:**
   Already handled by Vite automatically!

4. **Reduce Bundle Size:**
   - Import only what you need
   - Use tree-shaking
   - Check bundle with: `npm run build -- --analyze`

## 🐛 Common Issues

### 1. Imports Not Working
**Fix:** Check `jsconfig.json` exists and has `@` alias configured.

### 2. Styles Not Applying
**Fix:** Restart dev server: `npm run dev`

### 3. Videos Not Loading
**Fix:** Check video IDs and ensure videos are public on YouTube.

### 4. Music Not Playing
**Fix:** 
- Verify file path matches `music.json`
- Check browser console for CORS errors
- Ensure audio files are in `public/songs/`

### 5. Build Errors
**Fix:** 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Resources

- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [ShadCN UI](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

Need more help? Check `SETUP.md` for development tips!


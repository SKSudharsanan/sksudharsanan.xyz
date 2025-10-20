# ⚡ Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to: `http://localhost:5173`

---

## 📝 First Things to Customize

### Update Your Name (3 places)
1. **Sidebar** → `src/components/Sidebar.jsx` line 52
2. **Hero** → `src/sections/Hero.jsx` lines 49-61
3. **Title** → `index.html` line 7

### Update Your Story
**About Section** → `src/sections/About.jsx` lines 40-50

### Add Your Experience
**Timeline Data** → `src/data/timeline.json`

### Add Your Projects
**Projects Data** → `src/data/projects.json`

### Add Your Music
1. Place MP3 files in `public/songs/`
2. Update `src/data/music.json`

### Update Social Links
**Footer** → `src/sections/Footer.jsx` lines 5-30

---

## 🎨 Color Customization

**Pastel Colors** → `tailwind.config.js` lines 50-55
```javascript
pastel: {
  blue: "#a6d8ff",
  purple: "#bca9f4",
  pink: "#ffbcd1",
  mint: "#b8f3d0",
}
```

---

## 🎬 YouTube Videos

**Videos Section** → `src/sections/Videos.jsx` line 7
```javascript
const videos = {
  shorts: [
    { 
      id: 1, 
      title: "Your Video", 
      videoId: "YOUTUBE_VIDEO_ID",
      thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
    }
  ]
}
```

**Get Video ID:** From `youtube.com/watch?v=VIDEO_ID`

---

## 💼 Services Section

**Update Iframe** → `src/sections/Services.jsx` line 40
```jsx
<iframe src="https://YOUR_WEBSITE.com" />
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # UI components
│   ├── Sidebar.jsx      # Navigation
│   └── theme-provider.jsx
├── sections/
│   ├── Hero.jsx         # Landing
│   ├── About.jsx        # About + Timeline
│   ├── Videos.jsx       # YouTube
│   ├── Music.jsx        # Player
│   ├── Projects.jsx     # Projects
│   ├── Services.jsx     # Hire Me
│   └── Footer.jsx       # Contact
├── data/
│   ├── timeline.json    # ← Edit this
│   ├── projects.json    # ← Edit this
│   └── music.json       # ← Edit this
└── App.jsx
```

---

## 🛠️ Available Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. 📝 Update your name and title
4. 📝 Add your work experience
5. 📝 Add your projects
6. 🎵 Add your music
7. 🎬 Add your videos
8. 🔗 Update social links
9. 🎨 Customize colors (optional)
10. 🚀 Deploy!

---

## 📚 Detailed Guides

- **Setup:** See `SETUP.md`
- **Customization:** See `CUSTOMIZATION.md`
- **README:** See `README.md`

---

## 🚀 Deploy to Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Done! 🎉

---

## ❓ Need Help?

### Styles not loading?
```bash
# Restart dev server
Ctrl+C
npm run dev
```

### Imports broken?
Make sure `jsconfig.json` exists in root.

### Port already in use?
```bash
# Use different port
npm run dev -- --port 3000
```

### Clean install?
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🎉 You're Ready!

Your cinematic portfolio is ready to customize and deploy!

**Happy coding!** ✨

---

Made with ❤️ using React + Vite + Tailwind + ShadCN


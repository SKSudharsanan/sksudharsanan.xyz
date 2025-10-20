# SK Sudharsanan - Cinematic Portfolio

A stunning, cinematic portfolio website showcasing the journey of a Software Engineer turned Filmmaker.

## 🚀 Features

- **Cinematic Design**: Glassmorphic cards, pastel color schemes, and smooth animations
- **Dark/Light Mode**: Full theme support with seamless transitions
- **Responsive Layout**: Mobile-first design that looks great on all devices
- **Interactive Sections**:
  - Hero section with animated gradient background
  - Timeline showcasing professional journey
  - YouTube video integration
  - Custom vinyl-style music player
  - Project showcase with bento grid layout
  - Services section with embedded iframe
  - Social links and contact footer

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎵 Adding Music

To add your own music tracks:

1. Create a `/public/songs` folder if it doesn't exist
2. Add your MP3 files to this folder
3. Update `/src/data/music.json` with your track information:

```json
{
  "id": 1,
  "title": "Your Track Title",
  "artist": "Your Name",
  "duration": "3:45",
  "file": "/songs/your-track.mp3"
}
```

## 🎬 Adding Videos

Update `/src/sections/Videos.jsx` with your YouTube video IDs:

```javascript
const videos = {
  shorts: [
    { id: 1, title: "Your Video", videoId: "YOUR_YOUTUBE_VIDEO_ID", thumbnail: "..." }
  ]
}
```

## 🎨 Customization

### Colors

Pastel accent colors are defined in `tailwind.config.js`:
- Blue: `#a6d8ff`
- Purple: `#bca9f4`
- Pink: `#ffbcd1`
- Mint: `#b8f3d0`

### Fonts

- **Body**: Inter
- **Cinematic headings**: Playfair Display

Fonts are loaded from Google Fonts in `index.html`.

### Data Files

All content is stored in JSON files under `/src/data/`:
- `timeline.json` - Professional experience
- `projects.json` - Project showcase
- `music.json` - Music tracks

## 📱 Sections

1. **Home/Hero** - Cinematic introduction with animated background
2. **About** - Personal story and interactive timeline
3. **Videos** - YouTube integration with category filters
4. **Music** - Custom vinyl-style audio player
5. **Projects** - Bento grid layout for project showcase
6. **Services** - Embedded consulting page
7. **Contact/Footer** - Social links and footer

## 🎯 Deployment

This project can be deployed to:
- Vercel (recommended for Vite projects)
- Netlify
- GitHub Pages
- Any static hosting service

For Vercel:
```bash
npm install -g vercel
vercel
```

## 📝 License

© 2025 SK Sudharsanan. All rights reserved.

## 🤝 Connect

- GitHub: [@sksudharsanan](https://github.com/sksudharsanan)
- YouTube: [@sksudharsanan](https://youtube.com/@sksudharsanan)
- Website: [bearonchain.com](https://bearonchain.com)

---

Made with React, ShadCN, and a bit of cinematic soul ✨


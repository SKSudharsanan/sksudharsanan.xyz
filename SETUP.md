# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
sksudharsanan.xyz/
├── public/
│   ├── songs/              # Add your music files here
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/             # ShadCN UI components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── switch.jsx
│   │   │   └── tabs.jsx
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   └── theme-provider.jsx
│   ├── sections/
│   │   ├── Hero.jsx        # Landing section
│   │   ├── About.jsx       # About + Timeline
│   │   ├── Videos.jsx      # YouTube integration
│   │   ├── Music.jsx       # Vinyl player
│   │   ├── Projects.jsx    # Project showcase
│   │   ├── Services.jsx    # Hire me section
│   │   └── Footer.jsx      # Contact + social
│   ├── data/
│   │   ├── timeline.json   # Work experience
│   │   ├── projects.json   # Projects data
│   │   └── music.json      # Music tracks
│   ├── lib/
│   │   └── utils.js        # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Customization Guide

### 1. Update Personal Information

**Timeline** (`src/data/timeline.json`):
```json
{
  "id": 1,
  "years": "2024-Present",
  "company": "Your Company",
  "role": "Your Role",
  "summary": "What you did...",
  "techStack": ["Tech1", "Tech2"]
}
```

**Projects** (`src/data/projects.json`):
```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Description...",
  "url": "https://github.com/...",
  "techStack": ["React", "Node"],
  "color": "blue"
}
```

### 2. Add Music

1. Place MP3 files in `public/songs/`
2. Update `src/data/music.json`:
```json
{
  "id": 1,
  "title": "Track Name",
  "artist": "Artist Name",
  "duration": "3:45",
  "file": "/songs/track-name.mp3"
}
```

### 3. Add Videos

Update the `videos` object in `src/sections/Videos.jsx`:
```javascript
const videos = {
  shorts: [
    {
      id: 1,
      title: "Video Title",
      videoId: "YOUTUBE_VIDEO_ID",
      thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
    }
  ]
}
```

### 4. Update Social Links

Edit `src/sections/Footer.jsx`:
```javascript
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/YOUR_USERNAME",
    color: "hover:text-pastel-blue",
  },
  // ... add more
]
```

### 5. Change Colors

Edit `tailwind.config.js`:
```javascript
pastel: {
  blue: "#a6d8ff",    // Your color
  purple: "#bca9f4",  // Your color
  pink: "#ffbcd1",    // Your color
  mint: "#b8f3d0",    // Your color
}
```

### 6. Customize Services Section

Update the iframe URL in `src/sections/Services.jsx`:
```javascript
<iframe
  src="https://YOUR_SERVICES_SITE.com"
  // ...
/>
```

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR. Changes will reflect immediately without full page reload.

### Theme Toggle
The site supports dark/light mode. Toggle is in the sidebar (bottom).

### Responsive Design
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Animations
Built with Framer Motion. Customize in component files:
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

## Build & Deploy

### Build for Production
```bash
npm run build
```
Output in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`

## Troubleshooting

### Import Errors
Make sure `jsconfig.json` is in root for `@/` alias support.

### Style Not Loading
Clear browser cache and restart dev server.

### Music Not Playing
- Check file path in `music.json`
- Ensure files are in `public/songs/`
- Check browser console for errors

### Videos Not Loading
- Verify YouTube video IDs
- Check CORS settings
- Ensure videos are public

## Performance Optimization

### Image Optimization
- Use WebP format for images
- Compress images before upload
- Use lazy loading

### Code Splitting
Vite automatically splits code. For manual splitting:
```javascript
const Component = lazy(() => import('./Component'))
```

### Lighthouse Score
Run audit: Chrome DevTools → Lighthouse → Generate Report

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Need Help?

- Check [Vite Documentation](https://vitejs.dev)
- Check [React Documentation](https://react.dev)
- Check [Tailwind Documentation](https://tailwindcss.com)
- Check [Framer Motion Documentation](https://www.framer.com/motion)

## License

© 2025 SK Sudharsanan. All rights reserved.


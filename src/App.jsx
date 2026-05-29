import { useState, useEffect, useRef } from "react"
import { ThemeProvider } from "./components/theme-provider"
import Sidebar from "./components/Sidebar"
import BackgroundSwitcher from "./components/BackgroundSwitcher"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Videos from "./sections/Videos"
import Music from "./sections/Music"
import Projects from "./sections/Projects"
import Blogs from "./sections/Blogs"
import Services from "./sections/Services"
import Footer from "./sections/Footer"

function App() {
  const [activeSection, setActiveSection] = useState("home")
  const [currentBg, setCurrentBg] = useState("video")
  const scrollContainerRef = useRef(null)

  // Calculate section width accounting for sidebar on desktop
  const getSectionWidth = () => {
    const isDesktop = window.innerWidth >= 1024
    const sidebarWidth = 256 // 16rem = 256px
    return isDesktop ? window.innerWidth - sidebarWidth : window.innerWidth
  }

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return

      const scrollLeft = container.scrollLeft
      const sectionWidth = getSectionWidth()
      const sectionIndex = Math.round(scrollLeft / sectionWidth)

      const sections = ["home", "about", "videos", "music", "projects", "blogs", "services", "contact"]
      if (sections[sectionIndex]) {
        setActiveSection(sections[sectionIndex])
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      handleScroll() // Initial check

      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const sections = ["home", "about", "videos", "music", "projects", "blogs", "services", "contact"]
    const index = sections.indexOf(sectionId)

    if (index !== -1 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * getSectionWidth(),
        behavior: "smooth"
      })
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="h-screen overflow-hidden text-foreground relative">
        {/* Full Screen Video Background - Behind everything */}
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ 
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        </div>

        {/* Sidebar - Always on top */}
        <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Horizontal Scroll Container - With left margin for sidebar on desktop */}
        <main 
          ref={scrollContainerRef}
          className="horizontal-scroll hide-scrollbar ml-0 lg:ml-64 relative transition-all duration-300"
          style={{ zIndex: 10 }}
        >
          <Hero />
          <About />
          <Videos />
          <Music />
          <Projects />
          <Blogs />
          <Services />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App


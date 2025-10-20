import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Video, Music, Code, Briefcase, Mail, Menu, X, ChevronLeft, ChevronRight, Github, Youtube, Twitter, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

const menuItems = [
  { id: "home", icon: Home, label: "Home", color: "blue" },
  { id: "about", icon: User, label: "About", color: "purple" },
  { id: "videos", icon: Video, label: "Videos", color: "pink" },
  { id: "music", icon: Music, label: "Music", color: "mint" },
  { id: "projects", icon: Code, label: "Projects", color: "blue" },
  { id: "services", icon: Briefcase, label: "Services", color: "purple" },

]

const glowColors = {
  blue: "hover:shadow-[0_0_25px_rgba(132,143,165,0.6)]",
  purple: "hover:shadow-[0_0_25px_rgba(193,73,83,0.6)]",
  pink: "hover:shadow-[0_0_25px_rgba(194,132,122,0.5)]",
  mint: "hover:shadow-[0_0_25px_rgba(132,143,165,0.6)]",
}

const iconColors = {
  blue: "text-cinematic-darkAccent",
  purple: "text-cinematic-darkHighlight",
  pink: "text-cinematic-lightHighlight",
  mint: "text-cinematic-darkAccent",
}

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/sksudharsanan", color: "text-white/70 hover:text-primary" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@sksudharsanan", color: "text-white/70 hover:text-accent" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/sksudharsanan", color: "text-white/70 hover:text-primary" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/sksudharsanan", color: "text-white/70 hover:text-accent" },
]

export default function Sidebar({ activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false)
  const [isCollapsed, setIsCollapsed] = useState(false) // Desktop collapse state

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToSection = (sectionId) => {
    onNavigate(sectionId)
    setIsOpen(false) // Close sidebar after navigation on mobile
  }

  return (
    <>
      {/* Hamburger Toggle Button - Fixed on mobile */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[10001] lg:hidden w-12 h-12 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isMobile ? (isOpen ? 0 : -300) : 0,
          width: !isMobile && isCollapsed ? 80 : 256
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-screen z-[10002] bg-black/90 backdrop-blur-xl border-r border-white/20 flex flex-col py-8 ${isCollapsed ? 'px-2' : 'px-6'}`}
      >
        {/* Desktop Sidebar (always visible) */}
        <div className="hidden lg:flex flex-col h-full">
          {/* Logo/Name */}
          <div className="mb-12">
            {!isCollapsed ? (
              <h1 className="text-2xl font-cinematic font-bold text-white">
                SK Sudharsanan
              </h1>
            ) : (
              <h1 className="text-xl font-cinematic font-bold text-white text-center">
                SK
              </h1>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full flex items-center rounded-lg
                  transition-all duration-300 group
                  ${activeSection === item.id ? "bg-white/10" : "hover:bg-white/5"}
                  ${glowColors[item.color]}
                  ${isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3"}
                `}
                title={isCollapsed ? item.label : ""}
              >
                <item.icon className={`w-5 h-5 ${iconColors[item.color]} group-hover:scale-110 transition-transform flex-shrink-0`} />
                {!isCollapsed && (
                  <span className="text-sm font-medium text-white/90 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {!isCollapsed ? (
              <div className="flex justify-around items-center">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} transition-colors p-2 rounded-lg hover:bg-white/5`}
                    title={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} transition-colors p-1.5 rounded-lg hover:bg-white/5`}
                    title={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Collapse Toggle Button - Desktop only */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-full flex items-center justify-center rounded-lg hover:bg-white/5 transition-all ${isCollapsed ? 'px-2 py-3' : 'gap-2 px-4 py-3'}`}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-white/70 flex-shrink-0" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <span className="text-sm text-white/70 whitespace-nowrap">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar (collapsible) */}
        <div className="flex lg:hidden flex-col h-full pt-16">
          {/* Logo/Name */}
          <div className="mb-12">
            <h1 className="text-2xl font-cinematic font-bold text-white">
              SK Sudharsanan
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-300 group
                  ${activeSection === item.id ? "bg-white/10" : "hover:bg-white/5"}
                  ${glowColors[item.color]}
                `}
              >
                <item.icon className={`w-5 h-5 ${iconColors[item.color]} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-white/90">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Social Links - Mobile */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-around items-center px-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transition-colors p-2 rounded-lg hover:bg-white/5`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
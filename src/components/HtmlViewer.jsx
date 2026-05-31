import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "lucide-react"

export default function HtmlViewer({ file, title, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10003] bg-black/95 backdrop-blur-xl flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60">
            <h3 className="text-sm md:text-base font-cinematic text-white truncate min-w-0">
              {title}
            </h3>

            <div className="flex items-center gap-1 md:gap-2">
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded hover:bg-white/10 text-white/80 transition-colors hidden md:inline-flex"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded hover:bg-white/10 text-white/80 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* HTML body */}
          <div className="flex-1 overflow-hidden bg-black">
            <iframe
              src={file}
              title={title}
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

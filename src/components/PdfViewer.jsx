import { useState, useEffect, useRef, useCallback } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Loader2 } from "lucide-react"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export default function PdfViewer({ file, title, isOpen, onClose }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [containerWidth, setContainerWidth] = useState(800)
  const containerRef = useRef(null)

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      const padding = 48
      setContainerWidth(Math.min(containerRef.current.clientWidth - padding, 1100))
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [isOpen, updateWidth])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, pageNumber, numPages])

  useEffect(() => {
    if (isOpen) {
      setPageNumber(1)
      setScale(1.0)
    }
  }, [isOpen, file])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1))
  const goNext = () => setPageNumber((p) => Math.min(numPages || p, p + 1))
  const zoomIn = () => setScale((s) => Math.min(3, s + 0.2))
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.2))

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
            <div className="flex items-center gap-3 min-w-0">
              <h3 className="text-sm md:text-base font-cinematic text-white truncate">
                {title}
              </h3>
              {numPages && (
                <span className="text-xs text-white/50 whitespace-nowrap">
                  Page {pageNumber} / {numPages}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={zoomOut}
                className="p-2 rounded hover:bg-white/10 text-white/80 transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/60 w-12 text-center hidden md:inline">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-2 rounded hover:bg-white/10 text-white/80 transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
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

          {/* PDF body */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto flex items-start justify-center px-4 py-6"
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex flex-col items-center justify-center text-white/70 mt-20">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-sm">Loading PDF…</span>
                </div>
              }
              error={
                <div className="text-white/70 mt-20 text-sm text-center max-w-md">
                  Couldn't load the PDF.{" "}
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Open it in a new tab instead.
                  </a>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={containerWidth}
                scale={scale}
                renderTextLayer
                renderAnnotationLayer
                className="shadow-2xl"
              />
            </Document>
          </div>

          {/* Bottom nav */}
          {numPages && numPages > 1 && (
            <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-white/10 bg-black/60">
              <button
                onClick={goPrev}
                disabled={pageNumber <= 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <span className="text-xs text-white/60">
                {pageNumber} / {numPages}
              </span>
              <button
                onClick={goNext}
                disabled={pageNumber >= numPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

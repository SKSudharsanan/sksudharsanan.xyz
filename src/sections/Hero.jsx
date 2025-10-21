import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollToNext = () => {
    const mainContainer = document.querySelector('.horizontal-scroll')
    if (mainContainer) {
      mainContainer.scrollTo({
        left: window.innerWidth,
        behavior: "smooth"
      })
    }
  }

  return (
    <section id="home" className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden flex-shrink-0">
      {/* Content */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-cinematic font-bold mb-6 text-neutral drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Software Engineer
          </motion.h1>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-cinematic font-bold mb-8  text-neutral/90 drop-shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            and Aspiring Filmmaker
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Button
              variant="default"
              size="lg"
              onClick={scrollToNext}
              className="text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-primary/50 bg-primary text-white hover:bg-primary/90"
            >
              Enter My World
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


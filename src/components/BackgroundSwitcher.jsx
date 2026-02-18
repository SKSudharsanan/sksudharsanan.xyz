import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, X } from "lucide-react"

const backgrounds = [
  { id: "video", label: "Video" },
  { id: "gradient", label: "Animated Gradient" },
  { id: "particles", label: "Particles" },
  { id: "mesh", label: "Mesh Gradient" },
  { id: "noise", label: "Solid + Noise" },
  { id: "aurora", label: "Aurora" },
]

// Animated Gradient Background
function GradientBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-gradient-x" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-gradient-y" />
      </div>
      <style>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-50%); }
          50% { transform: translateX(50%); }
        }
        @keyframes gradient-y {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
        }
        .animate-gradient-x { animation: gradient-x 15s ease infinite; }
        .animate-gradient-y { animation: gradient-y 20s ease infinite; }
      `}</style>
    </div>
  )
}

// Particles Background
function ParticlesBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/60"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />
    </div>
  )
}

// Mesh Gradient Background
function MeshBackground() {
  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            left: "10%",
            top: "20%",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            right: "10%",
            bottom: "20%",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

// Solid + Noise Background
function NoiseBackground() {
  return (
    <div className="absolute inset-0 bg-slate-950">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/50" />
    </div>
  )
}

// Aurora Background
function AuroraBackground() {
  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)",
        }}
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)",
        }}
        animate={{
          y: ["100%", "-100%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)",
        }}
        animate={{
          y: ["-50%", "150%"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
    </div>
  )
}

// Video Background
function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
    </>
  )
}

export default function BackgroundSwitcher({ currentBg, setCurrentBg }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Background Renderer */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {currentBg === "video" && <VideoBackground />}
        {currentBg === "gradient" && <GradientBackground />}
        {currentBg === "particles" && <ParticlesBackground />}
        {currentBg === "mesh" && <MeshBackground />}
        {currentBg === "noise" && <NoiseBackground />}
        {currentBg === "aurora" && <AuroraBackground />}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[10003] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        title="Change Background"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Settings className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-6 z-[10003] p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/20"
        >
          <p className="text-xs text-white/60 mb-3">Select Background</p>
          <div className="flex flex-col gap-2">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => setCurrentBg(bg.id)}
                className={`px-4 py-2 rounded-lg text-sm text-left transition-colors ${
                  currentBg === bg.id
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

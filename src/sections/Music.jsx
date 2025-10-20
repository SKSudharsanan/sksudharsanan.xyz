import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import musicData from "@/data/music.json"

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      nextTrack()
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicData.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicData.length) % musicData.length)
    setIsPlaying(false)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <section id="music" className="min-h-screen w-screen flex items-center py-12 relative overflow-hidden flex-shrink-0">
      <div className="container mx-auto px-6 max-w-4xl h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-8 text-center"
        >
          Music
        </motion.h2>

        <div className="max-w-2xl mx-auto max-h-[75vh] flex flex-col">
          {/* Vinyl Player */}
          <div className="glass rounded-2xl p-6 md:p-8 flex-shrink-0">
            {/* Vinyl Record */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{
                  duration: 3,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "linear",
                }}
                className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl relative overflow-hidden"
              >
                {/* Vinyl grooves */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-gray-700/30"
                      style={{
                        top: `${10 + i * 10}%`,
                        left: `${10 + i * 10}%`,
                        right: `${10 + i * 10}%`,
                        bottom: `${10 + i * 10}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Center label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-background"></div>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: isPlaying
                      ? ["0 0 20px rgba(193, 73, 83, 0.6)", "0 0 40px rgba(132, 143, 165, 0.6)", "0 0 20px rgba(193, 73, 83, 0.6)"]
                      : "0 0 0px rgba(193, 73, 83, 0)",
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Track Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mb-6"
              >
                <h3 className="text-xl font-semibold mb-1 text-white">{musicData[currentTrack]?.title || "No Track"}</h3>
                <p className="text-white/70">{musicData[currentTrack]?.artist || "Unknown Artist"}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mb-6">
              <div
                className="h-2 bg-muted rounded-full cursor-pointer relative overflow-hidden group"
                onClick={handleSeek}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={prevTrack}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <SkipBack className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <SkipForward className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-white/60" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
          </div>

          {/* Track List */}
          <div className="mt-6 space-y-2 max-h-[30vh] overflow-y-auto pr-2">
            {musicData.map((track, index) => (
              <motion.button
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setCurrentTrack(index)
                  setIsPlaying(false)
                }}
                className={`
                  w-full rounded-lg p-3 flex items-center justify-between
                  hover:bg-white/10 transition-all group
                  ${currentTrack === index ? "bg-white/10 border-primary border" : "bg-black/20"}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/50 font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-white">{track.title}</p>
                    <p className="text-xs text-white/60">{track.artist}</p>
                  </div>
                </div>
                <span className="text-xs text-white/50">{track.duration}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={musicData[currentTrack]?.file}
          onEnded={() => setIsPlaying(false)}
        />

      </div>
    </section>
  )
}


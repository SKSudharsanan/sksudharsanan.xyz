import { motion } from "framer-motion"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ExternalLink, Loader2 } from "lucide-react"
import { useYouTubeRSS } from "@/hooks/useYouTubeRSS"

// Replace with your YouTube Channel ID
// Find it at: https://www.youtube.com/@sksudharsanan > View Page Source > search for "channelId"
const YOUTUBE_CHANNEL_ID = "UCJI3CThQtWbDLohsiMs1ryA"

function VideoCard({ video }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative group cursor-pointer rounded-lg overflow-hidden glass"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{video.title}</h3>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Videos() {
  const { videos, loading, error } = useYouTubeRSS(YOUTUBE_CHANNEL_ID)
  
  return (
    <section id="videos" className="min-h-screen w-screen flex items-center py-12 flex-shrink-0 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-3">
            My Videos
          </h2>
          <a
            href="https://youtube.com/@sksudharsanan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition-colors"
          >
            <span>Visit my YouTube channel</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-white/70">Loading videos...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-white/70 mb-4">Unable to load videos</p>
            <p className="text-xs text-white/50">Error: {error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70">No videos found</p>
            <p className="text-xs text-white/50 mt-2">Check your YOUTUBE_CHANNEL_ID</p>
          </div>
        ) : (
          <div className="max-h-[65vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


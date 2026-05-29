import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Services() {
  return (
    <section id="services" className="min-h-screen flex items-center py-12 flex-shrink-0 overflow-y-auto lg:overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-6 text-center"
        >
          Hire Me
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass border-2 border-white/10 overflow-hidden">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-cinematic flex items-center justify-center gap-2 text-white">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Let's Collaborate
                  <Sparkles className="w-6 h-6 text-accent" />
                </CardTitle>
                <CardDescription className="text-white/70">
                  Explore my development, consulting, writing, and content creation services
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 pb-4">
                {/* Iframe Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative w-full rounded-lg overflow-hidden bg-black/40"
                  style={{ height: "400px" }}
                >
                  <iframe
                    src="https://asgorithm.com"
                    className="w-full h-full rounded-lg"
                    title="Asgorithm"
                    frameBorder="0"
                    loading="lazy"
                  />
                </motion.div>

                {/* Services Overview */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <div className="text-center p-4 rounded-lg bg-black/40 border border-primary/20">
                    <div className="text-2xl mb-2">🎬</div>
                    <h3 className="font-semibold text-sm mb-1 text-white">AI Consulting</h3>
                    <p className="text-xs text-white/70">
                     Embed AI where it creates real leverage 
                    </p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-black/40 border border-accent/20">
                    <div className="text-2xl mb-2">⚙️</div>
                    <h3 className="font-semibold text-sm mb-1 text-white">Software Development</h3>
                    <p className="text-xs text-white/70">
                      Ship reliable software and backend systems
                    </p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-black/40 border border-primary/20">
                    <div className="text-2xl mb-2">✍️</div>
                    <h3 className="font-semibold text-sm mb-1 text-white">Content Creation and Showcase</h3>
                    <p className="text-xs text-white/70">
                     Turn technical depth into market-ready narratives
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


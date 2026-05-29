import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Calendar } from "lucide-react"
import blogsData from "@/data/blogs.json"

const glowColors = {
  blue: "hover:shadow-[0_0_30px_rgba(166,216,255,0.6)]",
  purple: "hover:shadow-[0_0_30px_rgba(188,169,244,0.6)]",
  pink: "hover:shadow-[0_0_30px_rgba(255,188,209,0.6)]",
}

const borderColors = {
  blue: "border-pastel-blue/30",
  purple: "border-pastel-purple/30",
  pink: "border-pastel-pink/30",
}

const accentColors = {
  blue: "text-pastel-blue",
  purple: "text-pastel-purple",
  pink: "text-pastel-pink",
}

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

export default function Blogs() {
  return (
    <section id="blogs" className="min-h-screen flex items-center py-12 flex-shrink-0 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-2 text-center"
        >
          Writings & Essays
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-white/60 text-center mb-8"
        >
          Slow thoughts, half-formed ideas, and the occasional rant — in PDF form.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-2">
          {blogsData.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`
                  glass h-full transition-all duration-300 border-2
                  ${borderColors[blog.color]}
                  ${glowColors[blog.color]}
                  relative overflow-hidden group
                `}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className={`w-5 h-5 ${accentColors[blog.color]}`} />
                    <span className="flex items-center gap-1 text-[10px] text-white/50">
                      <Calendar className="w-3 h-3" />
                      {formatDate(blog.date)}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-cinematic text-white">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-white/70">
                    {blog.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {blog.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded-full border border-white/20 text-white/70 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-black/60 hover:bg-black/80 text-white text-xs border-white/20"
                    asChild
                  >
                    <a
                      href={blog.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Read PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import projectsData from "@/data/projects.json"

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

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen w-screen flex items-center py-12 flex-shrink-0 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-8 text-center"
        >
          Project Spotlight
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`
                  glass h-full transition-all duration-300 border-2
                  ${borderColors[project.color]}
                  ${glowColors[project.color]}
                  relative overflow-hidden group
                `}
              >

                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg font-cinematic flex items-center gap-2 text-white`}>
                    {project.title}
                    <Github className="w-4 h-4" />
                  </CardTitle>
                  <CardDescription className="text-xs text-white/70">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-[10px] px-1.5 py-0.5 rounded-full border border-white/20 text-white/70 bg-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-black/60 hover:bg-black/80 text-white text-xs border-white/20"
                    asChild
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <a
            href="https://github.com/sksudharsanan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            <span>View more on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}


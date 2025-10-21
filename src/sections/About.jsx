import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import timelineData from "@/data/timeline.json"
import { useState } from "react"

export default function About() {
  const [expandedItem, setExpandedItem] = useState(null)

  return (
    <section id="about" className="min-h-screen w-screen flex items-center py-12 flex-shrink-0 overflow-y-auto lg:overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-8 text-center"
        >
          About Me
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[70vh]">
          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass h-full overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-cinematic text-white">My Journey</CardTitle>
                <CardDescription className="text-white/70">From engineer to storyteller</CardDescription>
              </CardHeader>
              <CardContent className="text-white/80 space-y-3 text-xs max-h-[55vh] overflow-y-auto pr-2">
                <p>
                  I have spent most of my life building things. Software, startups, systems. But somewhere along the way, I realized I was also trying to build myself.
                </p>
                <p>
                  Seven years in R&D taught me how to think like a machine—structured, precise, and fast. But I have always been more human than the systems I built. I have faced burnouts, restarts, layoffs, failed ventures, and nights where I questioned if all this work ever meant anything. There were times I had to start from zero, not once but several times, each time with less energy but more understanding of who I am.
                </p>
                <p>
                  I am not someone who gives up easily. I have seen what it feels like to lose direction, to lose people, to lose passion. And I have found my way back every time, not because I had to, but because something inside me refuses to stay down.
                </p>
                <p>
                  What drives me is not success anymore. It is meaning. It is that spark you feel when you create something real, whether it is a song that hits the right note or an idea that outlives you. I have learned that code and creativity are just languages for the same thing—expression.
                </p>
                <p>
                  Today, I am trying to merge both sides of who I am—the engineer who sees patterns and the artist who feels them. I am building not just products or music, but a version of myself that does not choose between logic and emotion.
                </p>
                <p>
                  If there is one thing that defines me, it is this: I do not want to be the smartest person in the room. I want to be the one who keeps going, who turns breakdowns into blueprints, silence into sound, and chaos into clarity.
                </p>
                <p>
                  I found this amazing superpower—AI—which helps me bring my visions to life. I now combine all the things I learned in R&D to equip my YouTube with AI-generated films, music videos, and tutorials on how to create them.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass h-full overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-cinematic text-white">Timeline</CardTitle>
                <CardDescription className="text-white/70">My professional evolution</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[55vh] overflow-y-auto pr-2 scrollbar-thin">
                <div className="space-y-4">
                  {timelineData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-5 border-l-2 border-primary/30 pb-4 last:pb-0"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary"></div>

                      {/* Content */}
                      <div
                        className="cursor-pointer"
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                      >
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-semibold text-primary">{item.years}</span>
                          <h3 className="font-semibold text-sm text-white">{item.company}</h3>
                        </div>
                        <p className="text-xs text-accent font-medium mb-1">{item.role}</p>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: expandedItem === item.id ? "auto" : 0,
                            opacity: expandedItem === item.id ? 1 : 0,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-white/70 mb-2">{item.summary}</p>
                          <div className="flex flex-wrap gap-1">
                            {item.techStack.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-white/80 border border-accent/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>

                        {expandedItem !== item.id && (
                          <p className="text-[10px] text-white/50 mt-1">Click to expand →</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Youtube, Instagram, Facebook, ExternalLink } from "lucide-react"
import timelineData from "@/data/timeline.json"
import freelanceData from "@/data/freelance.json"
import skillsData from "@/data/skills.json"
import contentData from "@/data/content.json"
import { useState } from "react"

function TimelineItem({ item, index, expandedItem, setExpandedItem }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-5 border-l-2 border-primary/30 pb-4 last:pb-0"
    >
      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary"></div>
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
          <p className="text-[10px] text-white/50 mt-1">Click to expand</p>
        )}
      </div>
    </motion.div>
  )
}

export default function About() {
  const [expandedProfessional, setExpandedProfessional] = useState(null)
  const [expandedFreelance, setExpandedFreelance] = useState(null)

  return (
    <section id="about" className="min-h-screen flex items-center py-12 flex-shrink-0 overflow-y-auto lg:overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-cinematic font-bold text-white mb-6 text-center"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-h-[75vh]">
          {/* Left Column - About & Skills */}
          <div className="flex flex-col gap-4">
            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-cinematic text-white">My Journey</CardTitle>
                  <CardDescription className="text-white/70 text-xs">Tech Creator | AI Strategist | Software Developer</CardDescription>
                </CardHeader>
                <CardContent className="text-white/80 space-y-2 text-xs max-h-[25vh] overflow-y-auto pr-2">
                  <p>
                    Software engineer, AI consultant, and tech creator with 7.7 years of experience—5.7 years in backend and blockchain development, plus 2 years of entrepreneurial work in decentralized AI systems.
                  </p>
                  <p>
                    My work sits at the intersection of engineering, storytelling, and creative technology—building systems, communicating ideas clearly, and using technology to create meaningful experiences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1"
            >
              <Card className="glass h-full overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-cinematic text-white">Skills</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[35vh] overflow-y-auto pr-2">
                  <div className="space-y-3">
                    {Object.entries(skillsData).map(([key, category]) => (
                      <div key={key}>
                        <h4 className="text-xs font-semibold text-primary mb-1">{category.title}</h4>
                        <div className="flex flex-wrap gap-1">
                          {category.items.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Middle Column - Experience Timelines */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-cinematic text-white">Experience</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="professional" className="w-full">
                  <TabsList className="w-full grid grid-cols-2 bg-white/5 mx-4 mb-2" style={{ width: 'calc(100% - 2rem)' }}>
                    <TabsTrigger value="professional" className="text-xs data-[state=active]:bg-primary/20">Professional</TabsTrigger>
                    <TabsTrigger value="freelance" className="text-xs data-[state=active]:bg-primary/20">Freelance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="professional" className="px-4 pb-4 max-h-[55vh] overflow-y-auto">
                    <div className="space-y-4">
                      {timelineData.map((item, index) => (
                        <TimelineItem
                          key={item.id}
                          item={item}
                          index={index}
                          expandedItem={expandedProfessional}
                          setExpandedItem={setExpandedProfessional}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="freelance" className="px-4 pb-4 max-h-[55vh] overflow-y-auto">
                    <div className="space-y-4">
                      {freelanceData.map((item, index) => (
                        <TimelineItem
                          key={item.id}
                          item={item}
                          index={index}
                          expandedItem={expandedFreelance}
                          setExpandedItem={setExpandedFreelance}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Content Creation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-cinematic text-white">Content Creation</CardTitle>
                <CardDescription className="text-white/70 text-xs">Tech Creator & Educator</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[60vh] overflow-y-auto pr-2">
                {/* Platform Stats */}
                <div className="space-y-4 mb-4">
                  {contentData.platforms.map((platform, idx) => (
                    <div
                      key={idx}
                      className="block p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-white">{platform.name}</h4>
                        <span className="text-[10px] text-white/50">Since {platform.since}</span>
                      </div>
                      <p className="text-[10px] text-accent mb-2">{platform.handle}</p>
                      <div className="grid grid-cols-3 gap-2 text-center mb-2">
                        <div>
                          <p className="text-sm font-bold text-primary">{platform.stats.videos}</p>
                          <p className="text-[10px] text-white/50">{platform.name.includes("Instagram") ? "Posts" : "Videos"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{platform.stats.subscribers || platform.stats.followers}</p>
                          <p className="text-[10px] text-white/50">{platform.stats.subscribers ? 'Subs' : 'Followers'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{platform.stats.views}</p>
                          <p className="text-[10px] text-white/50">Views</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/70 mb-2">{platform.content}</p>
                      <div className="flex gap-3 pt-2 border-t border-white/10">
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-white/70 hover:text-primary transition-colors"
                        >
                          {platform.name.includes("YouTube") ? (
                            <Youtube className="w-3 h-3" />
                          ) : (
                            <Instagram className="w-3 h-3" />
                          )}
                          <span>{platform.name.includes("YouTube") ? "YouTube" : "Instagram"}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        {platform.fbUrl && (
                          <a
                            href={platform.fbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-white/70 hover:text-primary transition-colors"
                          >
                            <Facebook className="w-3 h-3" />
                            <span>Facebook</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">Highlights</h4>
                  <ul className="space-y-1">
                    {contentData.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-[10px] text-white/70 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

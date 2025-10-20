import { motion } from "framer-motion"
import { Github, Youtube, Twitter, Linkedin, Mail, Heart } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/sksudharsanan",
    color: "hover:text-primary",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@sksudharsanan",
    color: "hover:text-accent",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/sksudharsanan",
    color: "hover:text-primary",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/sksudharsanan",
    color: "hover:text-accent",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:contact@sksudharsanan.com",
    color: "hover:text-primary",
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="min-h-screen w-screen flex items-center justify-center flex-shrink-0 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-8"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              className={`
                p-3 rounded-full glass transition-all duration-300
                ${link.color} text-white
              `}
              aria-label={link.name}
            >
              <link.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
        />

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-3"
        >
          <p className="text-white/70 flex items-center justify-center gap-2 flex-wrap text-sm">
            Made with React, ShadCN, and a bit of cinematic soul
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </p>

          <p className="text-sm text-white/70 flex items-center justify-center gap-2">
            Crafted with
            <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-primary fill-primary" />
              </motion.span>
            by SK Sudharsanan
          </p>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} SK Sudharsanan. All rights reserved.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 w-full h-full"
            style={{
              background: "radial-gradient(circle at center bottom, rgba(193, 73, 83, 0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </footer>
  )
}


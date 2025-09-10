import { motion } from 'framer-motion'
import { 
  Brain, 
  Code, 
  Bot, 
  FolderOpen, 
  Database,
  ChevronRight
} from 'lucide-react'

const expertiseData = [
  {
    id: 1,
    title: "Intelligence Artificielle",
    icon: Brain,
    description: "Machine Learning, Deep Learning, NLP, Computer Vision",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Computer Vision"],
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: 2,
    title: "Développement Full Stack",
    icon: Code,
    description: "Applications web complètes, frontend et backend",
    skills: ["React", "Node.js", "Python", "JavaScript", "TypeScript"],
    color: "from-yellow-300 to-yellow-500"
  },
  {
    id: 3,
    title: "Automatisation RPA & API",
    icon: Bot,
    description: "Automatisation des processus et intégration d'APIs",
    skills: ["UiPath", "Selenium", "REST APIs", "Postman", "Automation"],
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 4,
    title: "Gestion de Projets",
    icon: FolderOpen,
    description: "Gestion agile, méthodologies et outils de projet",
    skills: ["Agile", "Scrum", "Jira", "Git", "DevOps"],
    color: "from-yellow-500 to-amber-600"
  },
  {
    id: 5,
    title: "Data Science",
    icon: Database,
    description: "Analyse de données, visualisation et statistiques",
    skills: ["Pandas", "NumPy", "Matplotlib", "SQL", "Power BI"],
    color: "from-amber-300 to-yellow-400"
  }
]

const Expertise: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Expertise cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
        {expertiseData.map((expertise, index) => (
          <motion.div
            key={expertise.id}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            className="group relative bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm border-2 border-gray-600 rounded-2xl p-8 hover:border-yellow-400/70 transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] min-h-[380px] h-full flex flex-col hover:bg-gradient-to-br hover:from-gray-900/90 hover:to-black/90 hover:scale-105"
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${expertise.color} opacity-0 group-hover:opacity-5 transition-all duration-500 blur-xl`}></div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className={`absolute w-2 h-2 bg-gradient-to-r ${expertise.color} rounded-full opacity-20`}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                style={{
                  left: `${20 + index * 10}%`,
                  top: `${30 + index * 5}%`,
                }}
              />
              <motion.div
                className={`absolute w-1 h-1 bg-gradient-to-r ${expertise.color} rounded-full opacity-30`}
                animate={{
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                style={{
                  left: `${70 + index * 5}%`,
                  top: `${60 + index * 10}%`,
                }}
              />
            </div>
            
            {/* Icon with enhanced styling */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                className={`p-4 rounded-2xl bg-gradient-to-br ${expertise.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <expertise.icon className="w-7 h-7" />
              </motion.div>
              <motion.div
                initial={{ x: 0, opacity: 0.5 }}
                whileHover={{ x: 8, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-full bg-black/60 group-hover:bg-yellow-400/20 transition-colors duration-300 shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
              >
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </motion.div>
            </div>

            {/* Content with enhanced typography */}
            <div className="relative z-10 flex-1 flex flex-col">
              <motion.h3 
                className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {expertise.title}
              </motion.h3>
              <p className="text-gray-300 text-base mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                {expertise.description}
              </p>
              
              {/* Enhanced skills section */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide group-hover:text-yellow-400 transition-colors duration-300 mb-3">
                  Technologies maîtrisées
                </h4>
                <div className="flex flex-wrap gap-3">
                  {expertise.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.15 + skillIndex * 0.08,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-black/80 to-gray-800/80 text-gray-100 text-sm rounded-xl font-medium hover:from-yellow-400 hover:to-amber-500 hover:text-black transition-all duration-300 shadow-[0_2px_8px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)] border border-gray-500 hover:border-yellow-400 hover:scale-110"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced hover border effect */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-2xl"
              whileHover={{
                borderColor: "hsl(var(--primary))",
                transition: { duration: 0.3 }
              }}
            />
            
            {/* Bottom accent line */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${expertise.color} rounded-b-2xl`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Expertise

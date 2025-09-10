import { motion } from 'framer-motion';

export default function ProjectsHeader() {
  return (
    <div className="flex flex-row items-center justify-between mb-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex w-fit items-center gap-2 text-yellow-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
          <motion.p 
            className="shimmer word-spacing font-mono text-sm uppercase leading-none text-yellow-400"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mon Travail
          </motion.p>
        </motion.div>
        
        <motion.h2
          className="font-custom bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent text-4xl font-bold mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Projets
        </motion.h2>
        
        <motion.p 
          className="text-white text-md max-w-2xl mt-3 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Vous trouverez ici une sélection de mes projets réalisés autour du développement, de l'Intelligence Artificielle, de la Data Science, l'automatisation et la gestion de projets. Chaque projet illustre ma capacité à transformer une idée en solution concrète, avec un souci de performance, de clarté et d'efficacité. J'aime expérimenter, apprendre et partager mes réalisations.
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="relative w-36 h-36 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Effet de brillance animé */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Cercles flottants animés */}
          <motion.div 
            className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-8 right-6 w-2 h-2 bg-yellow-300 rounded-full"
            animate={{ 
              y: [0, -8, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-amber-300 rounded-full"
            animate={{ 
              y: [0, -12, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
                     {/* Logo moderne représentant le développement et l'innovation */}
           <motion.div 
             className="relative z-10"
             animate={{ 
               rotate: 360
             }}
             transition={{ 
               duration: 8,
               repeat: Infinity,
               ease: "linear"
             }}
           >
             <svg 
               className="w-20 h-20" 
               viewBox="0 0 24 24"
               fill="none"
             >
                               {/* Hexagone principal avec gradient bleu foncé */}
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                  <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
                  </linearGradient>
                </defs>
               
               {/* Hexagone de fond */}
               <path 
                 d="M12 2L22 8.5L22 15.5L12 22L2 15.5L2 8.5L12 2Z" 
                 fill="url(#hexGradient)"
                 stroke="rgba(255,255,255,0.3)"
                 strokeWidth="0.5"
               />
               
               {/* Éléments internes représentant le code */}
               <g fill="url(#innerGradient)">
                 {/* Lignes de code stylisées */}
                 <rect x="6" y="7" width="12" height="1" rx="0.5" />
                 <rect x="6" y="9" width="8" height="1" rx="0.5" />
                 <rect x="6" y="11" width="10" height="1" rx="0.5" />
                 <rect x="6" y="13" width="6" height="1" rx="0.5" />
                 <rect x="6" y="15" width="9" height="1" rx="0.5" />
                 
                                   {/* Points de connexion */}
                                   <circle cx="8" cy="6" r="0.8" fill="#fcd34d" />
                 <circle cx="16" cy="6" r="0.8" fill="#fbbf24" />
                 <circle cx="8" cy="18" r="0.8" fill="#f59e0b" />
                 <circle cx="16" cy="18" r="0.8" fill="#d97706" />
               </g>
               
               {/* Effet de brillance */}
               <path 
                 d="M12 2L22 8.5L22 15.5L12 22L2 15.5L2 8.5L12 2Z" 
                 fill="none"
                 stroke="rgba(255,255,255,0.6)"
                 strokeWidth="0.3"
                 strokeDasharray="2 2"
               />
             </svg>
           </motion.div>
          
          {/* Badge avec pulsation */}
          <motion.div 
            className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.span 
              className="text-sm font-bold text-white"
              animate={{ 
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              3
            </motion.span>
          </motion.div>
          
          {/* Particules flottantes */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <motion.div 
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/60 rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white/60 rounded-full"
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

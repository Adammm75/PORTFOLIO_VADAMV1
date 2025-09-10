import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  data: {
    name: string;
    description: string;
    image: {
      src: string;
      width: number;
      height: number;
      format: string;
    };
    tags: string[];
    endDate?: Date;
  };
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Obtenir tous les tags uniques
  const allTags = Array.from(new Set(projects.flatMap(project => project.data.tags || [])));

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.data.tags?.includes(filter)
      ));
    }
  }, [filter, projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="w-full">
      {/* Filtres */}
      <motion.div 
        className="flex flex-wrap gap-3 mb-8 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            filter === 'all' 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg' 
              : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] hover:border-yellow-400/30 border border-transparent'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tous
        </motion.button>
        {allTags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              filter === tag 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg' 
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] hover:border-yellow-400/30 border border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      {/* Grille de projets */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative"
            >
              <motion.a 
                href={`/projects/${project.id}`}
                className="block h-full rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] hover:border-yellow-400/30 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Image du projet */}
                <div className="relative aspect-[16/10] overflow-hidden">
                                     <motion.img
                     src={project.data.image.src}
                     alt={project.data.name}
                     className="w-full h-full object-cover"
                     variants={imageVariants}
                     loading="lazy"
                   />
                  
                  {/* Overlay au survol */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  />
                  
                  {/* Icône de lecture */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-yellow-400/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-yellow-400/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(251, 191, 36, 0.5)" }}
                  >
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>

                {/* Contenu du projet */}
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {project.data.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-white/80 line-clamp-2 mb-4 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.data.description || "Un projet innovant démontrant créativité et compétences techniques"}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.data.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        variants={tagVariants}
                        className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-400 font-medium border border-yellow-400/30"
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 + tagIndex * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {project.data.tags?.length > 3 && (
                      <motion.span
                        className="text-xs px-3 py-1 rounded-full bg-[#2a2a2a] text-muted-foreground font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        +{project.data.tags.length - 3}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Date et indicateur */}
                  <motion.div 
                    className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center text-xs text-white/80">
                      <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {project.data.endDate ? new Date(project.data.endDate).getFullYear() : 'En cours'}
                    </div>
                    
                    <motion.div
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Message si aucun projet trouvé */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center border border-yellow-400/30"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <h3 className="text-lg font-medium text-white mb-2">Aucun projet trouvé</h3>
          <p className="text-white/80">Aucun projet ne correspond au filtre sélectionné.</p>
        </motion.div>
      )}
    </div>
  );
}

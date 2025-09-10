'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Briefcase, 
  GraduationCap,
  MapPin,
  Calendar,
  ChevronDown,
  Eye,
  Download,
  Sparkles,
  FileText,
  Award,
  ExternalLink
} from 'lucide-react'

const parcoursData = {
  experience: [
    {
      id: 1,
      title: "Apprenti en Développement Informatique chez IXI GROUPE",
      company: "IXI GROUPE",
      period: "Septembre 2024 - Septembre 2025",
      location: "Paris",
      isCurrent: true,
      achievements: [
        "Business Process Automation with Low-Code/No-Code Tools - Design and deployment of automated workflows using platforms such as n8n, Make, and Power Automate to optimize internal processes and enhance operational efficiency",
        "Development of Innovative Solutions to Support Employees - Creation of automated software solutions aimed at simplifying teams' daily tasks, by integrating API services such as Avensys and OneDrive to improve productivity and collaboration",
        "Data Extraction and Analysis for Decision-Making Reporting - Use of SQL queries to extract and transform data, followed by the creation of interactive dashboards with Power BI, providing actionable insights to various teams",
        "Integration of Third-Party Services via APIs into Workflows - Integration of external services (Avensys API, OneDrive API) into automated processes, ensuring seamless communication between the different applications and systems used within the company",
        "Implementation of Machine Learning Models for Prediction and Forecasting - Development and deployment of machine learning models using libraries such as Scikit-Learn and TensorFlow, to perform predictive analytics on business data, such as demand forecasting and trend anticipation",
        "Participation in Agile IT Project Management - Collaboration with teams to plan and execute IT projects using agile methodologies, particularly Scrum, ensuring the delivery of efficient solutions tailored to user needs"
      ],
      logo: "/static/logo IXI groupe.png"
    },
    {
      id: 2,
      title: "Stagiaire en Développement Informatique AM MOBILE",
      company: "AM MOBILE",
      period: "Janvier 2024 - Février 2024",
      location: "Paris",
      isCurrent: false,
      achievements: [
        "Developed a dynamic e-commerce website using WordPress, with SEO optimization",
        "Configured and managed web hosting, including security and backup measures",
        "Created a stock and supply management application using JavaFX, backed by a database",
        "Optimized and maintained implemented solutions to ensure performance and reliability"
      ]
    }
  ],
  education: [
    {
      id: 1,
      title: "Master MIAGE Parcours Systèmes d'Information Fiables et Intelligence des données en Alternance",
      school: "Université Paris Nanterre",
      period: "Septembre 2025 - Septembre 2027",
      location: "Paris",
      isSearching: false,
      specialization: "La formation Miage (Méthodes Informatiques Appliquées à la Gestion d'Entreprises) se situe par essence au carrefour de l'informatique et de la gestion d'entreprises. Le diplôme de Master Miage « Systèmes d'information fiables et intelligence des données » de l'Université Paris Nanterre propose une double compétence et vise la formation des futurs acteurs du développement des organisations capables d'accompagner et de piloter les évolutions de la stratégie des entreprises et des évolutions technologiques numériques. Il se prépare en deux années avec deux formats possibles d'organisation des études : classique avec un stage en entreprise en fin de chacune des deux années ou apprentissage avec alternance de périodes à l'université et de périodes en entreprise tout au long de chacune des deux années.",
      link: "https://formations.parisnanterre.fr/fr/formations-2024-2025/les-formations/master-lmd-05/methodes-informatiques-appliquees-a-la-gestion-des-entreprises-miage-master-JWQG2CKZ.html",
      logo: "/static/upn.jpg"
    },
    {
      id: 2,
      title: "Licence Général STS Informatique en Alternance Parcours Développement d'Applications Logicielles en Alternance",
      school: "CNAM Paris",
      period: "Septembre 2024 - Septembre 2025",
      location: "Paris",
      isSearching: false,
      specialization: "Ce diplôme offre une formation générale couvrant les principaux domaines de l'informatique : développement, programmation, réseaux, multimédia, systèmes, architecture des machines, génie logiciel, recherche opérationnelle, systèmes d'informations, systèmes industriels. Il s'adresse plus particulièrement aux salariés du domaine informatique recherchant une valorisation de leur pratique quotidienne en vue d'une promotion ou d'un changement d'employeur, mais il peut accueillir également des salariés d'autres domaines en phase de reconversion.",
      link: "https://formation.cnam.fr/rechercher-par-discipline/licence-informatique-1085631.kjsp?RF=",
      logo: "/static/cnam.png"
    },
    {
      id: 3,
      title: "Brevet Technicien Supérieur Services Informatiques aux Organisations option SLAM",
      school: "Lycée Le Rebours",
      period: "Septembre 2022 - Juin 2024",
      location: "Paris",
      isSearching: false,
      specialization: "Participer à la production et à la fourniture de services informatiques. Réaliser ou adapter des solutions d'infrastructures, assurer le fonctionnement optimal des équipements (SISR). Maîtriser les langages et outils informatiques (SLAM). Développer, adapter, maintenir des programmes et des solutions applicatives (SLAM).",
      link: "https://www.lerebours.fr/formation/enseignement-superieur/bts-services-informatique-aux-organisations-sio/",
      logo: "/static/Le-Rebours_logo.png"
    }
  ],
  certifications: [
    {
      id: 1,
      title: "Configuration d'agents d'IA / Chat Bots, API, mémoire, modèle LLM",
      organization: "Udemy NBN",
      type: "Certification IA",
      link: "https://www.udemy.com/certificate/UC-c3864151-7969-4e4a-83d8-ebd6e17c4739/",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
    },
    {
      id: 2,
      title: "Programming essentials in Python",
      organization: "Cisco Python (5J - )",
      type: "Certification Développement Informatique",
      link: "https://www.credly.com/badges/b476a0a2-7849-40ee-a957-af59f5bbbd89",
      logo: "/static/cisco.png"
    }
  ]
}

export default function Parcours() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="parcours" className="relative py-20 bg-background overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full"
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        {/* Particules supplémentaires */}
        <motion.div
          className="absolute top-1/4 left-1/2 w-6 h-6 bg-yellow-500 rounded-full"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-amber-400 rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent font-custom">
              Mon Parcours
            </h2>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </motion.div>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Actuellement en alternance finissant ma Licence CNAM en septembre 2025, puis{" "}
            <motion.span 
              className="text-yellow-400 font-semibold"
              whileHover={{ scale: 1.05, color: "#fcd34d" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              entrée en Master MIAGE de septembre 2025 à septembre 2027
            </motion.span>{" "}
            spécialisé en Systèmes d'Information et Intelligence des données.
          </motion.p>
        </motion.div>

        <div className="space-y-16">
          
                     {/* Expériences Professionnelles */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
           >
             <motion.div 
               className="mb-8"
               whileHover={{ x: 5 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="flex items-center gap-3 mb-2">
                 <motion.div
                   whileHover={{ rotate: 360 }}
                   transition={{ duration: 0.6 }}
                 >
                   <Briefcase className="w-6 h-6 text-yellow-400" />
                 </motion.div>
                 <span className="text-yellow-400 text-sm font-medium">Mon parcours</span>
               </div>
               <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent font-custom">Expériences Professionnelles</h3>
             </motion.div>
             
             <div className="grid grid-cols-1 gap-12">
               {parcoursData.experience.map((item, index) => (
                 <motion.div
                   key={item.id}
                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   whileHover={{ 
                     y: -8, 
                     scale: 1.02,
                     boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                   }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                   className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-10 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer group max-w-4xl mx-auto w-full"
                   onMouseEnter={() => setHoveredCard(`exp-${item.id}`)}
                   onMouseLeave={() => setHoveredCard(null)}
                   onClick={() => setExpandedExperience(expandedExperience === item.id ? null : item.id)}
                 >
                   {/* Header avec logo et badges */}
                   <div className="flex items-start gap-4 mb-6">
                     {/* Logo de l'entreprise */}
                     {item.logo && (
                       <motion.div
                         className="flex-shrink-0"
                         whileHover={{ scale: 1.05 }}
                         transition={{ duration: 0.2 }}
                       >
                         <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-lg">
                           <img
                             src={item.logo}
                             alt={`Logo ${item.company}`}
                             className="w-full h-full object-contain"
                             onError={(e) => {
                               console.log(`Erreur de chargement du logo: ${item.logo}`);
                               const target = e.currentTarget;
                               target.style.display = 'none';
                               // Fallback: afficher l'icône par défaut
                               const parent = target.parentElement;
                               if (parent) {
                                 parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"></path></svg></div>';
                               }
                             }}
                             onLoad={() => console.log(`Logo chargé avec succès: ${item.logo}`)}
                           />
                         </div>
                       </motion.div>
                     )}
                     
                     {/* Contenu principal */}
                     <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between mb-2">
                         <motion.h4 
                           className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors"
                           animate={hoveredCard === `exp-${item.id}` ? { scale: 1.05 } : { scale: 1 }}
                         >
                           {item.title}
                         </motion.h4>
                         <div className="flex items-center gap-2 ml-4">
                           {item.isCurrent && (
                             <motion.span 
                               className="bg-yellow-400/20 text-yellow-400 text-xs font-medium px-3 py-1 rounded-full border border-yellow-400/30"
                               animate={{ 
                                 scale: hoveredCard === `exp-${item.id}` ? [1, 1.1, 1] : 1,
                               }}
                               transition={{ duration: 0.3 }}
                             >
                               Actuel
                             </motion.span>
                           )}
                           <motion.div
                             animate={{ rotate: expandedExperience === item.id ? 180 : 0 }}
                             transition={{ duration: 0.3 }}
                           >
                             <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                           </motion.div>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   <motion.div 
                     className="flex items-center gap-2 text-gray-400 text-base mb-6"
                     animate={hoveredCard === `exp-${item.id}` ? { x: 5 } : { x: 0 }}
                   >
                     <span className="font-medium text-yellow-300">{item.company}</span>
                     <span className="text-yellow-500">•</span>
                     <span>{item.period}</span>
                     <span className="text-yellow-500">•</span>
                     <span>{item.location}</span>
                   </motion.div>
                   
                   <AnimatePresence>
                     <motion.ul 
                       className="space-y-3"
                       initial={{ height: expandedExperience === item.id ? "auto" : "120px", overflow: "hidden" }}
                       animate={{ height: expandedExperience === item.id ? "auto" : "120px" }}
                       transition={{ duration: 0.4 }}
                     >
                       {item.achievements.map((achievement, idx) => (
                         <motion.li 
                           key={idx} 
                           className="flex items-start gap-3 text-gray-300 text-base leading-relaxed"
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ x: 5, scale: 1.02 }}
                         >
                           <motion.div 
                             className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"
                             whileHover={{ scale: 1.5, backgroundColor: "#fcd34d" }}
                             transition={{ duration: 0.2 }}
                           />
                           <motion.span 
                             className="group-hover:text-yellow-100 transition-colors duration-300"
                             whileHover={{ color: "#fef3c7" }}
                           >
                             {achievement}
                           </motion.span>
                         </motion.li>
                       ))}
                     </motion.ul>
                   </AnimatePresence>
                   
                   {item.achievements.length > 3 && expandedExperience !== item.id && (
                     <motion.div 
                       className="mt-2 text-center"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.3 }}
                     >
                       <motion.span 
                         className="text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors cursor-pointer"
                         whileHover={{ scale: 1.05 }}
                         animate={{ 
                           opacity: [0.7, 1, 0.7],
                         }}
                         transition={{ 
                           duration: 2,
                           repeat: Infinity,
                           ease: "easeInOut"
                         }}
                       >
                         Cliquez pour voir plus...
                       </motion.span>
                     </motion.div>
                   )}
                 </motion.div>
               ))}
             </div>
           </motion.div>

          {/* Formations & Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className="mb-8"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
                             <div className="flex items-center gap-3 mb-2">
                 <motion.div
                   whileHover={{ rotate: 360 }}
                   transition={{ duration: 0.6 }}
                 >
                   <GraduationCap className="w-6 h-6 text-yellow-400" />
                 </motion.div>
               </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent font-custom">Formations</h3>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-12">
              {parcoursData.education.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                     className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-10 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer group max-w-4xl mx-auto w-full"
                  onMouseEnter={() => setHoveredCard(`edu-${item.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedEducation(expandedEducation === item.id ? null : item.id)}
                >
                  {/* Header avec logo et badges */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Logo de l'établissement */}
                    {item.logo && (
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-lg">
                          <img
                            src={item.logo}
                            alt={`Logo ${item.school}`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              console.log(`Erreur de chargement du logo: ${item.logo}`);
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              // Fallback: afficher l'icône par défaut
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14v6.5"></path></svg></div>';
                              }
                            }}
                            onLoad={() => console.log(`Logo chargé avec succès: ${item.logo}`)}
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <motion.h4 
                          className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors"
                          animate={hoveredCard === `edu-${item.id}` ? { scale: 1.05 } : { scale: 1 }}
                        >
                          {item.title}
                        </motion.h4>
                        <div className="flex items-center gap-2 ml-4">
                      {item.isSearching && (
                        <motion.span 
                          className="bg-yellow-400/20 text-yellow-400 text-xs font-medium px-3 py-1 rounded-full border border-yellow-400/30"
                          animate={{ 
                            scale: hoveredCard === `edu-${item.id}` ? [1, 1.1, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          En recherche
                        </motion.span>
                      )}
                      <motion.div
                        animate={{ rotate: expandedEducation === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                      </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-2 text-gray-400 text-base mb-6"
                    animate={hoveredCard === `edu-${item.id}` ? { x: 5 } : { x: 0 }}
                  >
                    <span className="font-medium text-yellow-300">{item.school}</span>
                    <span className="text-yellow-500">•</span>
                    <span>{item.period}</span>
                    <span className="text-yellow-500">•</span>
                    <span>{item.location}</span>
                  </motion.div>
                  
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: "auto" }}
                    animate={{ height: expandedEducation === item.id ? "auto" : "60px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.p 
                      className="text-gray-300 text-base leading-relaxed group-hover:text-yellow-100 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.02, color: "#fef3c7" }}
                    >
                      {item.specialization}
                    </motion.p>
                  </motion.div>
                  
                  {/* Bouton de lien externe si disponible */}
                  {item.link && (
                    <motion.div 
                      className="mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-400/30 hover:border-yellow-400/50 rounded-lg text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-sm font-medium"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir la formation officielle
                      </motion.a>
                    </motion.div>
                  )}
                  
                  {item.specialization.length > 80 && expandedEducation !== item.id && (
                    <motion.div 
                      className="mt-2 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.span 
                        className="text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Cliquez pour voir plus...
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              className="mb-8"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent font-custom">Certifications</h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {parcoursData.certifications.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer group"
                >
                  {/* Header avec logo et badge */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Logo de l'organisation */}
                    {item.logo ? (
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-16 h-16 bg-white rounded-xl p-3 shadow-lg">
                          <img
                            src={item.logo}
                            alt={`Logo ${item.organization}`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              console.log(`Erreur de chargement du logo certification: ${item.logo}`);
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg></div>';
                              }
                            }}
                            onLoad={() => console.log(`Logo certification chargé avec succès: ${item.logo}`)}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    )}
                    
                    {/* Badge de type */}
                    <div className="flex-1 flex justify-end">
                      <motion.span 
                        className="bg-yellow-400/20 text-yellow-400 text-xs font-medium px-3 py-1 rounded-full border border-yellow-400/30"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.type}
                      </motion.span>
                    </div>
                  </div>
                  
                  <motion.h4 
                    className="text-xl font-bold text-white group-hover:text-yellow-200 transition-colors mb-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.title}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-gray-300 text-base leading-relaxed group-hover:text-yellow-100 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {item.organization}
                  </motion.p>
                  
                  {/* Bouton de lien externe si disponible */}
                  {item.link && (
                    <motion.div 
                      className="mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-400/30 hover:border-yellow-400/50 rounded-lg text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-sm font-medium"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir le certificat
                      </motion.a>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Bouton CV */}
            <motion.a
              href="/static/CV_Mekkiou_Adam_M1.pdf"
              download="CV_Mekkiou_Adam_M1.pdf"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group inline-block cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredCard('download-cv')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500"
                initial={{ x: "-100%" }}
                animate={{ x: hoveredCard === 'download-cv' ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: hoveredCard === 'download-cv' ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                <span>Télécharger mon CV</span>
              </div>
              
              {/* Sparkle effects */}
              <AnimatePresence>
                {hoveredCard === 'download-cv' && (
                  <>
                    <motion.div
                      className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="absolute bottom-2 right-6 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute top-1/2 right-4 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </motion.a>

            {/* Bouton Lettres de Recommandation */}
            <motion.a
              href="/static/Lettres_Recommandation_Mekkiou_Adam.pdf"
              download="Lettres_Recommandation_Mekkiou_Adam.pdf"
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group inline-block cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredCard('download-recommendations')}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500"
                initial={{ x: "-100%" }}
                animate={{ x: hoveredCard === 'download-recommendations' ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: hoveredCard === 'download-recommendations' ? [0, -10, 10, -10, 0] : 0,
                    scale: hoveredCard === 'download-recommendations' ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="w-5 h-5" />
                </motion.div>
                <span>Lettres de recommandation</span>
              </div>
              
              {/* Sparkle effects */}
              <AnimatePresence>
                {hoveredCard === 'download-recommendations' && (
                  <>
                    <motion.div
                      className="absolute top-3 left-6 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="absolute bottom-3 right-8 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute top-1/2 right-6 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute bottom-1/2 left-8 w-1 h-1 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

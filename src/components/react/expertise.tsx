import { EASE, useSpotlight } from '@/components/react/motion-primitives'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Bot, Brain, Code, Database, FolderOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Area = {
  id: number
  title: string
  icon: LucideIcon
  description: string
  skills: string[]
  /** Column span on the bento grid (out of 6). */
  span: string
}

const EXPERTISE: Area[] = [
  {
    id: 1,
    title: 'Intelligence Artificielle',
    icon: Brain,
    description: 'Machine Learning, Deep Learning, NLP, Computer Vision',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'OpenAI API',
      'Computer Vision',
    ],
    span: 'lg:col-span-3',
  },
  {
    id: 2,
    title: 'Développement Full Stack',
    icon: Code,
    description: 'Applications web complètes, frontend et backend',
    skills: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript'],
    span: 'lg:col-span-3',
  },
  {
    id: 3,
    title: 'Automatisation RPA & API',
    icon: Bot,
    description: "Automatisation des processus et intégration d'APIs",
    skills: ['UiPath', 'Selenium', 'REST APIs', 'Postman', 'Automation'],
    span: 'lg:col-span-2',
  },
  {
    id: 4,
    title: 'Gestion de Projets',
    icon: FolderOpen,
    description: 'Gestion agile, méthodologies et outils de projet',
    skills: ['Agile', 'Scrum', 'Jira', 'Git', 'DevOps'],
    span: 'lg:col-span-2',
  },
  {
    id: 5,
    title: 'Data Science',
    icon: Database,
    description: 'Analyse de données, visualisation et statistiques',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'SQL', 'Power BI'],
    span: 'lg:col-span-2',
  },
]

function Card({ area, index }: { area: Area; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>()
  const Icon = area.icon
  const featured = index === 0

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.07 }}
      className={cn(
        'panel panel-hover spotlight group relative flex flex-col overflow-hidden p-6 sm:p-7',
        area.span,
      )}
    >
      <span
        aria-hidden="true"
        className="text-muted-foreground absolute top-5 right-6 font-mono text-[0.65rem] tracking-widest opacity-80"
      >
        0{area.id}
      </span>

      <div className="relative z-10 flex items-start gap-4">
        <span className="border-border bg-background/60 text-primary group-hover:border-accent-line grid size-12 shrink-0 place-items-center rounded-xl border transition-colors duration-500">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3
            className={cn(
              'font-display leading-tight',
              featured ? 'text-2xl sm:text-3xl' : 'text-xl',
            )}
          >
            {area.title}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {area.description}
          </p>
        </div>
      </div>

      <div
        className={cn(
          'relative z-10 mt-auto flex flex-wrap gap-2 pt-6',
          featured && 'pt-8',
        )}
      >
        {area.skills.map((skill) => (
          <span
            key={skill}
            className="border-border bg-background/50 text-muted-foreground hover:border-accent-line hover:text-foreground rounded-full border px-3 py-1.5 font-mono text-[0.7rem] transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Accent rail that draws itself on hover */}
      <span
        aria-hidden="true"
        className="bg-primary absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
      />
    </motion.div>
  )
}

export default function Expertise() {
  return (
    <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {EXPERTISE.map((area, index) => (
        <Card key={area.id} area={area} index={index} />
      ))}
    </div>
  )
}

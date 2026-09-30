import { EASE, useSpotlight } from '@/components/react/motion-primitives'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ArrowUpRight, SearchX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type ProjectsGridProps = {
  projects: ProjectCard[]
  showFilters?: boolean
  /**
   * Heading level for the card titles: 2 on the projects index (directly
   * under the page <h1>), 3 on the homepage (under a section <h2>).
   */
  headingLevel?: 2 | 3
}

export type ProjectCard = {
  id: string
  name: string
  description: string
  tags: string[]
  image: { src: string; width: number; height: number }
  year: string
}

function Card({
  project,
  index,
  headingLevel,
}: {
  project: ProjectCard
  index: number
  headingLevel: 2 | 3
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3'
  const { ref, onMouseMove } = useSpotlight<HTMLAnchorElement>()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.45, ease: EASE, delay: Math.min(index * 0.05, 0.3) }}
      className="h-full"
    >
      <a
        ref={ref}
        onMouseMove={onMouseMove}
        href={`/projects/${project.id}`}
        data-cursor-label="ouvrir"
        className="panel panel-hover spotlight group flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
            style={{
              background:
                'linear-gradient(180deg, transparent 35%, color-mix(in oklab, var(--card) 92%, transparent) 100%)',
            }}
          />
          <span className="border-border bg-background/70 text-muted-foreground absolute top-4 left-4 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] tracking-widest backdrop-blur-md">
            {project.year}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <Heading className="font-display group-hover:text-primary text-xl leading-snug transition-colors duration-300">
            {project.name}
          </Heading>
          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border-border text-muted-foreground rounded-full border px-2.5 py-1 font-mono text-[0.65rem]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-muted-foreground px-1 py-1 font-mono text-[0.65rem]">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <span className="border-border text-primary mt-6 flex items-center justify-between border-t pt-4 text-sm font-medium">
            Voir le projet
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </a>
    </motion.article>
  )
}

function ProjectsGridContent({
  projects,
  showFilters = true,
  headingLevel = 3,
}: ProjectsGridProps) {
  const [filter, setFilter] = useState('all')

  const tags = useMemo(
    () => [...new Set(projects.flatMap((project) => project.tags))],
    [projects],
  )

  // Deep-linkable filter: /projects?tag=Data%20Science — only where the
  // filter bar is actually rendered, otherwise the homepage teaser would be
  // silently filtered with no visible way to clear it.
  useEffect(() => {
    if (!showFilters) return
    const initial = new URLSearchParams(window.location.search).get('tag')
    if (initial && tags.includes(initial)) setFilter(initial)
  }, [showFilters, tags])

  const apply = (tag: string) => {
    setFilter(tag)
    const url = new URL(window.location.href)
    if (tag === 'all') url.searchParams.delete('tag')
    else url.searchParams.set('tag', tag)
    history.replaceState(null, '', url)
  }

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.tags.includes(filter)),
    [filter, projects],
  )

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-2">
          {['all', ...tags].map((tag) => {
            const active = filter === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => apply(tag)}
                aria-pressed={active}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  'border',
                  active
                    ? 'text-primary-foreground border-transparent'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-accent-line',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="bg-primary absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {tag === 'all' ? 'Tous les projets' : tag}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <motion.div
        layout
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <Card
              key={project.id}
              project={project}
              index={index}
              headingLevel={headingLevel}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <div className="panel flex flex-col items-center gap-3 px-6 py-16 text-center">
          <SearchX className="text-muted-foreground size-8" />
          <p className="font-display text-lg">Aucun projet dans cette catégorie</p>
          <button
            type="button"
            onClick={() => apply('all')}
            className="text-primary link-underline text-sm font-medium"
          >
            Réinitialiser le filtre
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * Honours `prefers-reduced-motion` for every animation in this island:
 * framer skips transform and layout animations, opacity fades stay.
 */
export default function ProjectsGrid(props: ProjectsGridProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ProjectsGridContent {...props} />
    </MotionConfig>
  )
}

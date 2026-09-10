import { EASE } from '@/components/react/motion-primitives'
import { DOCUMENTS } from '@/consts'
import { parcours } from '@/data/parcours'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  Award,
  Briefcase,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'

type TabId = 'experience' | 'education' | 'certifications'

const TABS: { id: TabId; label: string; icon: LucideIcon; count: number }[] = [
  {
    id: 'experience',
    label: 'Expériences',
    icon: Briefcase,
    count: parcours.experience.length,
  },
  {
    id: 'education',
    label: 'Formations',
    icon: GraduationCap,
    count: parcours.education.length,
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: Award,
    count: parcours.certifications.length,
  },
]

/** Logo tile that degrades to an icon when the image is missing. */
function LogoTile({
  src,
  alt,
  fallback: Fallback,
  className,
}: {
  src?: string
  alt: string
  fallback: LucideIcon
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        className={cn(
          'border-border bg-background/60 text-primary grid shrink-0 place-items-center rounded-xl border',
          className,
        )}
      >
        <Fallback className="size-6" />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'border-border grid shrink-0 place-items-center overflow-hidden rounded-xl border bg-white p-2',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="size-full object-contain"
      />
    </span>
  )
}

function TimelineItem({
  children,
  index,
  isLast,
  period,
}: {
  children: React.ReactNode
  index: number
  isLast: boolean
  period: string
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className={cn('relative pl-8 sm:pl-12', isLast ? 'pb-0' : 'pb-8')}
    >
      <span
        aria-hidden="true"
        className="border-background bg-primary absolute top-6 left-0 z-10 size-3 -translate-x-1/2 rounded-full border-2 sm:left-0"
      />
      <p className="text-muted-foreground mb-2 font-mono text-[0.68rem] tracking-[0.16em] uppercase">
        {period}
      </p>
      {children}
    </motion.li>
  )
}

function ExpandButton({
  expanded,
  onClick,
  labels,
}: {
  expanded: boolean
  onClick: () => void
  labels: [string, string]
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className="text-primary hover:text-foreground mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
    >
      {expanded ? labels[1] : labels[0]}
      <ChevronDown
        className={cn(
          'size-4 transition-transform duration-300',
          expanded && 'rotate-180',
        )}
      />
    </button>
  )
}

function Collapsible({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Parcours() {
  const [tab, setTab] = useState<TabId>('experience')
  const [openId, setOpenId] = useState<string | null>('experience-1')
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  })
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const toggle = (key: string) => setOpenId((current) => (current === key ? null : key))

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Sections du parcours"
        className="border-border bg-card/40 mb-12 inline-flex flex-wrap gap-1 rounded-full border p-1 backdrop-blur-md"
      >
        {TABS.map((item) => {
          const active = tab === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setTab(item.id)}
              className={cn(
                'relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300',
                active
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active && (
                <motion.span
                  layoutId="parcours-tab"
                  className="bg-primary absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 size-4" />
              <span className="relative z-10">{item.label}</span>
              <span className="relative z-10 font-mono text-[0.65rem] opacity-70">
                {item.count}
              </span>
            </button>
          )
        })}
      </div>

      <div ref={trackRef} className="relative">
        {/* Timeline rail */}
        <span
          aria-hidden="true"
          className="bg-border absolute top-2 bottom-2 left-0 w-px sm:left-0"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="bg-primary absolute top-2 bottom-2 left-0 w-px origin-top"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {tab === 'experience' && (
              <ul className="list-none">
                {parcours.experience.map((item, index) => {
                  const key = `experience-${item.id}`
                  const open = openId === key
                  return (
                    <TimelineItem
                      key={key}
                      index={index}
                      period={item.period}
                      isLast={index === parcours.experience.length - 1}
                    >
                      <article className="panel panel-hover p-6 sm:p-8">
                        <div className="flex flex-wrap items-start gap-5">
                          <LogoTile
                            src={item.logo}
                            alt={`Logo ${item.company}`}
                            fallback={Briefcase}
                            className="size-16"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-display text-xl leading-snug sm:text-2xl">
                                {item.title}
                              </h3>
                              {item.isCurrent && (
                                <span className="border-accent-line bg-accent-soft text-primary animate-pulse-ring rounded-full border px-2.5 py-1 font-mono text-[0.6rem] tracking-widest uppercase">
                                  En poste
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                              <span className="text-primary font-medium">
                                {item.company}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3.5" />
                                {item.location}
                              </span>
                            </p>
                          </div>
                        </div>

                        <Collapsible open={open}>
                          <ul className="mt-6 space-y-4">
                            {item.achievements.map((achievement) => (
                              <li
                                key={achievement}
                                className="text-muted-foreground flex gap-3 text-sm leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
                                />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </Collapsible>

                        <ExpandButton
                          expanded={open}
                          onClick={() => toggle(key)}
                          labels={[
                            `Voir les ${item.achievements.length} missions`,
                            'Réduire',
                          ]}
                        />
                      </article>
                    </TimelineItem>
                  )
                })}
              </ul>
            )}

            {tab === 'education' && (
              <ul className="list-none">
                {parcours.education.map((item, index) => {
                  const key = `education-${item.id}`
                  const open = openId === key
                  return (
                    <TimelineItem
                      key={key}
                      index={index}
                      period={item.period}
                      isLast={index === parcours.education.length - 1}
                    >
                      <article className="panel panel-hover p-6 sm:p-8">
                        <div className="flex flex-wrap items-start gap-5">
                          <LogoTile
                            src={item.logo}
                            alt={`Logo ${item.school}`}
                            fallback={GraduationCap}
                            className="size-16"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-display text-xl leading-snug sm:text-2xl">
                                {item.title}
                              </h3>
                              {item.isSearching && (
                                <span className="border-accent-line bg-accent-soft text-primary rounded-full border px-2.5 py-1 font-mono text-[0.6rem] tracking-widest uppercase">
                                  En recherche
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                              <span className="text-primary font-medium">
                                {item.school}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3.5" />
                                {item.location}
                              </span>
                            </p>
                          </div>
                        </div>

                        <p
                          className={cn(
                            'text-muted-foreground mt-5 text-sm leading-relaxed',
                            !open && 'line-clamp-2',
                          )}
                        >
                          {item.specialization}
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                          <ExpandButton
                            expanded={open}
                            onClick={() => toggle(key)}
                            labels={['Lire le programme', 'Réduire']}
                          />
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary link-underline mt-5 inline-flex items-center gap-1.5 text-sm transition-colors"
                            >
                              <ExternalLink className="size-3.5" />
                              Formation officielle
                            </a>
                          )}
                        </div>
                      </article>
                    </TimelineItem>
                  )
                })}
              </ul>
            )}

            {tab === 'certifications' && (
              <ul className="grid list-none gap-4 pl-8 sm:grid-cols-2 sm:pl-12">
                {parcours.certifications.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
                    className="panel panel-hover flex flex-col p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <LogoTile
                        src={item.logo}
                        alt={`Logo ${item.organization}`}
                        fallback={Award}
                        className="size-14"
                      />
                      <span className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-right font-mono text-[0.6rem] tracking-wider uppercase">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-lg leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {item.organization}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-foreground mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        Voir le certificat
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Documents */}
      <div className="mt-14 flex flex-wrap gap-3 pl-8 sm:pl-12">
        <a
          href={DOCUMENTS.cv.href}
          download={DOCUMENTS.cv.fileName}
          data-cursor-label="PDF"
          className="bg-primary text-primary-foreground sheen relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold"
        >
          <Download className="size-4" />
          {DOCUMENTS.cv.label}
        </a>
        <a
          href={DOCUMENTS.recommendations.href}
          download={DOCUMENTS.recommendations.fileName}
          data-cursor-label="PDF"
          className="border-border hover:border-accent-line hover:bg-card/60 inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors duration-300"
        >
          <FileText className="size-4" />
          {DOCUMENTS.recommendations.label}
        </a>
      </div>
    </div>
  )
}

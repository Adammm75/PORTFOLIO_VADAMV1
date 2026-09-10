import Constellation from '@/components/react/constellation'
import { EASE, KineticText, Magnetic } from '@/components/react/motion-primitives'
import { DOCUMENTS, FACTS, ROLES, SITE, SOCIAL_LINKS } from '@/consts'
import { cn } from '@/lib/utils'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const ORBIT_CHIPS = [
  { label: 'LLM · RAG', top: '4%', left: '-14%', delay: 0 },
  { label: 'Python', top: '46%', left: '-22%', delay: 0.6 },
  { label: 'n8n · RPA', top: '84%', left: '4%', delay: 1.2 },
  { label: 'Power BI', top: '18%', left: '86%', delay: 0.9 },
  { label: 'Machine Learning', top: '70%', left: '78%', delay: 0.3 },
]

function RoleRotator() {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % ROLES.length),
      2800,
    )
    return () => window.clearInterval(timer)
  }, [reduced])

  return (
    <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROLES[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-gradient inline-block whitespace-nowrap"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Portrait() {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.25 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-[min(20rem,72vw)] lg:w-[min(24rem,32vw)]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-square"
      >
        {/* Rotating dashed orbit */}
        <motion.div
          aria-hidden="true"
          className="border-accent-line absolute -inset-6 rounded-full border border-dashed"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        />
        <div
          aria-hidden="true"
          className="absolute -inset-10 rounded-full opacity-70 blur-2xl"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, var(--accent-soft), transparent 65%)',
          }}
        />

        {/* Portrait plate — a white disc so the picture reads the same in
            both themes, whatever image sits in /static/profile.jpg. */}
        <div className="border-accent-line relative size-full overflow-hidden rounded-full border bg-white shadow-[var(--shadow-lg)]">
          <img
            src="/static/profile.jpg"
            alt={`${SITE.title}, ${SITE.role}`}
            width={520}
            height={520}
            loading="eager"
            className="size-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-105"
          />
        </div>

        <span className="border-border bg-card/90 text-muted-foreground absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] whitespace-nowrap uppercase backdrop-blur-md">
          <Sparkles className="text-primary size-3.5" />
          {SITE.location}
        </span>
      </motion.div>

      {/* Floating technology chips */}
      {ORBIT_CHIPS.map((chip) => (
        <motion.span
          key={chip.label}
          aria-hidden="true"
          style={{ top: chip.top, left: chip.left }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.8 + chip.delay * 0.3 }}
          className="border-border bg-card/80 text-muted-foreground absolute hidden rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-wider whitespace-nowrap backdrop-blur-md lg:block"
        >
          <motion.span
            className="block"
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={{
              duration: 5 + chip.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: chip.delay,
            }}
          >
            {chip.label}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <div className="relative">
      <Constellation className="pointer-events-none absolute inset-0 -z-10 size-full opacity-70" />

      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="border-border bg-card/50 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-primary relative inline-flex size-2 rounded-full" />
            </span>
            <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.16em] uppercase">
              Master MIAGE en alternance · {SITE.location}
            </span>
          </motion.div>

          <h1 className="font-display mt-7 leading-[0.86]">
            <span className="text-muted-foreground block text-[clamp(0.9rem,1.6vw,1.05rem)] font-normal tracking-[0.3em] uppercase">
              Portfolio
            </span>
            <KineticText
              text={SITE.title}
              className="mt-3 block text-[length:var(--text-display)]"
              delay={0.15}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="font-display mt-5 text-[clamp(1.5rem,3.4vw,2.6rem)] leading-tight"
          >
            <RoleRotator />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
            className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed text-pretty [&_em]:text-foreground [&_em]:not-italic [&_em]:font-semibold"
            dangerouslySetInnerHTML={{ __html: SITE.description }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.74 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="/projects"
                data-cursor-label="voir"
                className="bg-primary text-primary-foreground sheen group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Découvrir mes projets
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href={DOCUMENTS.cv.href}
                download={DOCUMENTS.cv.fileName}
                data-cursor-label="PDF"
                className="border-border text-foreground hover:border-accent-line hover:bg-card/60 inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors duration-300"
              >
                <Download className="size-4" />
                {DOCUMENTS.cv.label}
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary link-underline font-mono text-xs tracking-[0.12em] uppercase transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <Portrait />
      </div>

      {/* Key figures */}
      <motion.dl
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1 }}
        className="border-border mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4"
        style={{ backgroundColor: 'var(--border)' }}
      >
        {FACTS.map((fact) => (
          <div
            key={fact.label}
            className={cn(
              'bg-background/60 group px-5 py-6 backdrop-blur-sm transition-colors duration-500',
              'hover:bg-card/80',
            )}
          >
            <dt className="font-display group-hover:text-primary text-2xl transition-colors duration-500">
              {fact.value}
            </dt>
            <dd className="text-muted-foreground mt-1.5 text-xs leading-snug">
              {fact.label}
            </dd>
          </div>
        ))}
      </motion.dl>

      <motion.a
        href="#expertise"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-muted-foreground hover:text-primary mt-12 hidden items-center justify-center gap-2 font-mono text-[0.62rem] tracking-[0.24em] uppercase transition-colors lg:flex"
      >
        <ArrowDown className="size-3.5 animate-bounce" />
        Faire défiler
      </motion.a>
    </div>
  )
}

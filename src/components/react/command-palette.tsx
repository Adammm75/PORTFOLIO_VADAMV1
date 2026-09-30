import { DOCUMENTS, NAV_LINKS, SITE, SOCIAL_LINKS } from '@/consts'
import {
  useFocusTrap,
  useScrollLock,
} from '@/components/react/modal-behaviour'
import { applyTheme } from '@/components/react/theme-switch'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  Hash,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type CommandPaletteProps = {
  projects?: PaletteProject[]
}

export type PaletteProject = {
  id: string
  name: string
  tags: string[]
}

type Item = {
  id: string
  label: string
  hint?: string
  group: string
  keywords: string
  icon: React.ReactNode
  run: () => void
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * ⌘K launcher: jumps to sections and projects, and runs the handful of
 * actions a recruiter actually wants (CV, email, profiles, theme).
 */
function CommandPaletteContent({ projects = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const dialogRef = useFocusTrap<HTMLDivElement>(open)

  useScrollLock(open)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setCursor(0)
  }, [])

  const goTo = useCallback(
    (href: string, sectionId?: string) => {
      if (sectionId) {
        const target = document.getElementById(sectionId)
        if (target) {
          close()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          history.replaceState(null, '', `#${sectionId}`)
          return
        }
      }
      window.location.href = href
    },
    [close],
  )

  const items = useMemo<Item[]>(() => {
    const navigation: Item[] = NAV_LINKS.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label.charAt(0).toUpperCase() + link.label.slice(1),
      group: 'Navigation',
      keywords: `${link.label} ${link.href}`,
      icon: <Hash className="size-4" />,
      run: () => goTo(link.href, link.sectionId),
    }))

    const projectItems: Item[] = projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      hint: project.tags.slice(0, 2).join(' · '),
      group: 'Projets',
      keywords: `${project.name} ${project.tags.join(' ')}`,
      icon: <FolderOpen className="size-4" />,
      run: () => {
        window.location.href = `/projects/${project.id}`
      },
    }))

    const actions: Item[] = [
      {
        id: 'action-cv',
        label: DOCUMENTS.cv.label,
        hint: 'PDF',
        group: 'Actions',
        keywords: 'cv resume curriculum pdf telecharger',
        icon: <Download className="size-4" />,
        run: () => {
          window.open(DOCUMENTS.cv.href, '_blank', 'noopener')
          close()
        },
      },
      {
        id: 'action-recos',
        label: DOCUMENTS.recommendations.label,
        hint: 'PDF',
        group: 'Actions',
        keywords: 'lettres recommandation references pdf',
        icon: <Download className="size-4" />,
        run: () => {
          window.open(DOCUMENTS.recommendations.href, '_blank', 'noopener')
          close()
        },
      },
      {
        id: 'action-copy-email',
        label: "Copier l'adresse e-mail",
        hint: SITE.email,
        group: 'Actions',
        keywords: `email mail contact ${SITE.email}`,
        icon: copied ? <Check className="size-4" /> : <Copy className="size-4" />,
        run: () => {
          navigator.clipboard
            ?.writeText(SITE.email)
            .then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1800)
            })
            .catch(() => {
              window.location.href = `mailto:${SITE.email}`
            })
        },
      },
      {
        id: 'action-theme',
        label: 'Basculer le thème',
        group: 'Actions',
        keywords: 'theme sombre clair dark light mode',
        icon: (
          <>
            <Sun className="size-4 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />
          </>
        ),
        run: () => {
          applyTheme(
            document.documentElement.classList.contains('dark') ? 'light' : 'dark',
          )
        },
      },
      ...SOCIAL_LINKS.filter((social) => social.href.startsWith('http')).map(
        (social) => ({
          id: `social-${social.label}`,
          label: social.label,
          hint: social.handle,
          group: 'Liens',
          keywords: `${social.label} ${social.handle ?? ''}`,
          icon: <ExternalLink className="size-4" />,
          run: () => {
            window.open(social.href, '_blank', 'noopener,noreferrer')
            close()
          },
        }),
      ),
    ]

    return [...navigation, ...projectItems, ...actions]
  }, [close, copied, goTo, projects])

  const results = useMemo(() => {
    const needle = normalise(query.trim())
    if (!needle) return items
    return items.filter((item) =>
      normalise(`${item.label} ${item.keywords}`).includes(needle),
    )
  }, [items, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>()
    for (const item of results) {
      const bucket = map.get(item.group) ?? []
      bucket.push(item)
      map.set(item.group, bucket)
    }
    return [...map.entries()]
  }, [results])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    const handleOpen = () => setOpen(true)

    window.addEventListener('keydown', handleKey)
    window.addEventListener('command-palette:open', handleOpen)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('command-palette:open', handleOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => setCursor(0), [query])

  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [cursor, open])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((value) => (results.length ? (value + 1) % results.length : 0))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((value) =>
        results.length ? (value - 1 + results.length) % results.length : 0,
      )
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      results[cursor]?.run()
    }
  }

  let flatIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={dialogRef}
          className="fixed inset-0 z-[130] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche rapide"
          onKeyDown={handleKeyDown}
        >
          <button
            type="button"
            aria-label="Fermer la recherche"
            onClick={close}
            className="bg-background/70 absolute inset-0 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-border bg-popover/95 relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-[var(--shadow-xl)] backdrop-blur-2xl"
          >
            <div className="border-border flex items-center gap-3 border-b px-4">
              <Search className="text-muted-foreground size-4 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un projet, une section, une action…"
                aria-label="Rechercher"
                className="placeholder:text-muted-foreground w-full bg-transparent py-4 text-sm outline-none"
              />
              <kbd className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[0.65rem]">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {grouped.length === 0 && (
                <p className="text-muted-foreground px-3 py-8 text-center text-sm">
                  Aucun résultat pour « {query} ».
                </p>
              )}

              {grouped.map(([group, groupItems]) => (
                <div key={group} className="mb-1">
                  <p className="text-muted-foreground px-3 py-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    flatIndex += 1
                    const index = flatIndex
                    const active = index === cursor
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-index={index}
                        onMouseEnter={() => setCursor(index)}
                        onClick={item.run}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                          active
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground',
                        )}
                      >
                        <span
                          className={cn(
                            'grid size-8 shrink-0 place-items-center rounded-lg border',
                            active
                              ? 'border-accent-line text-primary'
                              : 'border-border',
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {item.hint && (
                          <span className="text-muted-foreground hidden shrink-0 font-mono text-[0.65rem] sm:block">
                            {item.hint}
                          </span>
                        )}
                        <ArrowRight
                          className={cn(
                            'size-3.5 shrink-0 transition-opacity',
                            active ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="border-border text-muted-foreground flex items-center justify-between border-t px-4 py-2.5 font-mono text-[0.62rem]">
              <span>↑ ↓ naviguer · ↵ ouvrir</span>
              <span>{results.length} résultat{results.length > 1 ? 's' : ''}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Honours `prefers-reduced-motion`: framer skips the transform on open,
 * the opacity fade stays.
 */
export default function CommandPalette(props: CommandPaletteProps) {
  return (
    <MotionConfig reducedMotion="user">
      <CommandPaletteContent {...props} />
    </MotionConfig>
  )
}

import { NAV_LINKS, SITE, SOCIAL_LINKS } from '@/consts'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/logo'
import ThemeSwitch from '@/components/react/theme-switch'
import {
  useFocusTrap,
  useScrollLock,
} from '@/components/react/modal-behaviour'
import { EASE } from '@/components/react/motion-primitives'
import { AnimatePresence, motion, useScroll, useSpring, MotionConfig } from 'framer-motion'
import { ArrowUpRight, Command, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const SECTION_IDS = NAV_LINKS.map((link) => link.sectionId).filter(
  (id): id is string => Boolean(id),
)

function NavbarContent() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [pathname, setPathname] = useState('/')
  const [isMac, setIsMac] = useState(false)

  const menuRef = useFocusTrap<HTMLDivElement>(menuOpen)
  useScrollLock(menuOpen)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setPathname(window.location.pathname)
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent))

    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy: highlights the section currently crossing the middle band.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  /**
   * In-page links scroll smoothly when the target exists on this page;
   * otherwise the browser follows the href and lands on the anchor.
   */
  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
      if (!sectionId) return
      const target = document.getElementById(sectionId)
      if (!target) return

      event.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${sectionId}`)
      setActiveSection(sectionId)
      setMenuOpen(false)
    },
    [],
  )

  const isActive = (href: string, sectionId?: string) => {
    if (sectionId) return activeSection === sectionId
    return href !== '/' && pathname.startsWith(href)
  }

  const openPalette = () => {
    setMenuOpen(false)
    window.dispatchEvent(new CustomEvent('command-palette:open'))
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className={cn(
          'fixed inset-x-0 top-0 z-[90] transition-colors duration-500',
          scrolled || menuOpen
            ? 'bg-background/70 border-border border-b backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="shell flex h-full items-center justify-between gap-4">
          <a
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${SITE.title} — accueil`}
          >
            <Logo />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[0.95rem] tracking-tight">
                {SITE.title}
              </span>
              <span className="text-muted-foreground font-mono text-[0.6rem] tracking-[0.18em] uppercase">
                {SITE.role}
              </span>
            </span>
          </a>

          <nav
            aria-label="Navigation principale"
            className="border-border bg-card/40 hidden items-center gap-1 rounded-full border p-1 backdrop-blur-md lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href, link.sectionId)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.sectionId)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors duration-300',
                    active
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="bg-primary absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              data-cursor-label="⌘K"
              aria-label="Ouvrir la recherche rapide"
              className="border-border text-muted-foreground hover:text-foreground hover:border-accent-line hidden items-center gap-2 rounded-full border py-2 pr-2 pl-3.5 text-xs transition-colors duration-300 md:flex"
            >
              <span className="font-mono tracking-wide">Rechercher</span>
              <kbd className="bg-muted text-muted-foreground flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[0.65rem]">
                {isMac ? <Command className="size-3" /> : <span>Ctrl</span>}
                <span>K</span>
              </kbd>
            </button>

            <ThemeSwitch />

            <a
              href="/#contact"
              onClick={(event) => handleNavClick(event, 'contact')}
              data-cursor-label="écrire"
              className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground sheen relative hidden overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:inline-flex sm:items-center sm:gap-1.5"
            >
              Me contacter
              <ArrowUpRight className="size-4" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="border-border text-foreground grid size-10 place-items-center rounded-full border lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="bg-primary absolute inset-x-0 bottom-0 h-px origin-left"
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background/95 fixed inset-0 z-[80] backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pt-[calc(var(--nav-height)+2rem)] pb-10">
              <nav aria-label="Navigation mobile" className="flex flex-col">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      handleNavClick(event, link.sectionId)
                      setMenuOpen(false)
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index, duration: 0.5, ease: EASE }}
                    className="border-border font-display flex items-center justify-between border-b py-5 text-3xl capitalize"
                  >
                    <span>{link.label}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      0{index + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-6"
              >
                <button
                  type="button"
                  onClick={openPalette}
                  className="border-border text-muted-foreground w-full rounded-full border py-3 font-mono text-xs tracking-widest uppercase"
                >
                  Recherche rapide
                </button>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary link-underline text-sm"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Honours `prefers-reduced-motion` for every animation in this island:
 * framer skips transform and layout animations, opacity fades stay.
 */
export default function Navbar() {
  return (
    <MotionConfig reducedMotion="user">
      <NavbarContent />
    </MotionConfig>
  )
}

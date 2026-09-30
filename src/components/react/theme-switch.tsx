import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function currentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Applies a theme, persists it, and lets the rest of the page react. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.add('disable-transitions')
  root.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode — the choice simply won't persist.
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
  requestAnimationFrame(() => root.classList.remove('disable-transitions'))
}

export default function ThemeSwitch({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(currentTheme())
    setMounted(true)

    const sync = (event: Event) => {
      const detail = (event as CustomEvent<Theme>).detail
      setTheme(detail ?? currentTheme())
    }
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'
      }
      title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
      data-cursor-label="thème"
      className={cn(
        'border-border text-muted-foreground hover:text-foreground hover:border-accent-line',
        'relative grid size-10 place-items-center rounded-full border transition-colors duration-300',
        className,
      )}
    >
      <Sun
        className={cn(
          'absolute size-[1.05rem] transition-all duration-500',
          mounted && theme === 'dark'
            ? 'scale-0 -rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100',
        )}
      />
      <Moon
        className={cn(
          'absolute size-[1.05rem] transition-all duration-500',
          mounted && theme === 'dark'
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 rotate-90 opacity-0',
        )}
      />
    </button>
  )
}

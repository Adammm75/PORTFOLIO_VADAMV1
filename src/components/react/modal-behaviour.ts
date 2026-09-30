import { useEffect, useRef } from 'react'

/**
 * Shared, reference-counted scroll lock.
 *
 * Two independent overlays (the mobile menu and the command palette) can be
 * open at the same time; when each one wrote `body.style.overflow` directly,
 * closing either released the lock the other still needed.
 */
let lockCount = 0

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    lockCount += 1
    document.body.style.overflow = 'hidden'

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) document.body.style.overflow = ''
    }
  }, [active])
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Keeps Tab inside an open overlay and hands focus back to whatever opened it.
 * Both overlays announce themselves as modal, so focus must not be able to
 * wander into the page behind them.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active) return

    const opener = document.activeElement as HTMLElement | null

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const container = ref.current
      if (!container) return

      const items = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetWidth > 0 || node.offsetHeight > 0)

      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement

      if (!container.contains(current)) {
        event.preventDefault()
        first.focus()
        return
      }
      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      // The opener may have been unmounted in the meantime.
      if (opener && document.contains(opener)) opener.focus()
    }
  }, [active])

  return ref
}

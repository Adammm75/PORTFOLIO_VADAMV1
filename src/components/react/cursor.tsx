import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

type CursorState = {
  active: boolean
  label: string | null
}

/**
 * Two-part pointer: an instant dot and a ring that trails behind it.
 * Interactive elements grow the ring and can announce a label through
 * `data-cursor-label`. Never renders on touch devices or under reduced motion,
 * where the native cursor stays untouched.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState<CursorState>({ active: false, label: null })

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setEnabled(finePointer.matches && !reduced.matches)
    sync()

    finePointer.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      finePointer.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute('data-cursor')
      return
    }

    document.documentElement.setAttribute('data-cursor', 'custom')

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, summary, [data-cursor]'

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        interactiveSelector,
      )
      setState({
        active: Boolean(target),
        label: target?.dataset.cursorLabel ?? null,
      })
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerleave', handleLeave)
    window.addEventListener('blur', handleLeave)

    return () => {
      document.documentElement.removeAttribute('data-cursor')
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerleave', handleLeave)
      window.removeEventListener('blur', handleLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120]">
      <motion.div
        className="bg-primary absolute top-0 left-0 size-1.5 rounded-full"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: state.active ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="border-primary/70 absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: state.active ? 46 : 26,
          height: state.active ? 46 : 26,
          backgroundColor: state.active
            ? 'color-mix(in oklab, var(--primary) 16%, transparent)'
            : 'transparent',
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {state.label ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-primary font-mono text-[9px] tracking-widest uppercase"
          >
            {state.label}
          </motion.span>
        ) : null}
      </motion.div>
    </div>
  )
}

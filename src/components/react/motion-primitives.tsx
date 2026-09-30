import { cn } from '@/lib/utils'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import React, { useCallback, useRef } from 'react'

/** House easing — a soft, decisive out-expo. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Pulls an element gently toward the pointer. Pure decoration: it is skipped
 * entirely on coarse pointers and under reduced motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    },
    [reduced, strength, x, y],
  )

  const reset = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  )
}

/**
 * Moves a radial highlight to follow the pointer inside a card. The gradient
 * itself lives in CSS (`.spotlight`); this only feeds it coordinates.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((event: React.MouseEvent<T>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])

  return { ref, onMouseMove }
}

/** Splits a string into per-character spans that rise into place. */
export function KineticText({
  text,
  className,
  charClassName,
  delay = 0,
}: {
  text: string
  className?: string
  charClassName?: string
  delay?: number
}) {
  // The markup is identical on the server and on the client — branching on
  // `prefers-reduced-motion` here caused a hydration mismatch. The motion
  // itself is neutralised by <MotionConfig reducedMotion="user"> upstream.
  //
  // Characters animate individually, but words stay whole so a line can only
  // ever break between words.
  const words = text.split(' ')
  let charIndex = -1

  return (
    <span className={cn('inline-flex flex-wrap', className)} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="inline-flex whitespace-nowrap"
        >
          {word.split('').map((char, index) => {
            charIndex += 1
            const charDelay = delay + charIndex * 0.035
            return (
              <motion.span
                key={`${char}-${index}`}
                className={cn('inline-block will-change-transform', charClassName)}
                initial={{ opacity: 0, y: '0.45em', rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: charDelay }}
              >
                {char}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}

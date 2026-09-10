import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/** Resolves a CSS custom property to an `rgb()` string the canvas understands. */
function resolveColor(variable: string, fallback: string): string {
  const probe = document.createElement('span')
  probe.style.color = `var(${variable})`
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const value = getComputedStyle(probe).color
  probe.remove()
  return value || fallback
}

function withAlpha(color: string, alpha: number): string {
  const match = color.match(/(\d+(?:\.\d+)?)/g)
  if (!match || match.length < 3) return color
  const [r, g, b] = match
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Drifting particle field behind the hero. Nodes link up when they get close
 * and lean toward the pointer, so the backdrop reacts to the visitor instead
 * of just looping. Idles completely when off-screen, hidden, or when the
 * visitor prefers reduced motion.
 */
export default function Constellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    let width = 0
    let height = 0
    let frame = 0
    let running = true
    let particles: Particle[] = []

    const pointer = { x: -9999, y: -9999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let nodeColor = withAlpha(resolveColor('--primary', 'rgb(190, 240, 90)'), 0.8)
    let linkColor = withAlpha(resolveColor('--primary', 'rgb(190, 240, 90)'), 0.16)
    let accentColor = withAlpha(resolveColor('--plasma', 'rgb(130, 110, 255)'), 0.55)

    const readColors = () => {
      const primary = resolveColor('--primary', 'rgb(190, 240, 90)')
      nodeColor = withAlpha(primary, 0.8)
      linkColor = withAlpha(primary, 0.16)
      accentColor = withAlpha(resolveColor('--plasma', 'rgb(130, 110, 255)'), 0.55)
    }

    const seed = () => {
      const density = Math.round((width * height) / 26000)
      const count = Math.max(18, Math.min(72, density))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        // Soft attraction toward the pointer, capped so nothing snaps.
        const dx = pointer.x - particle.x
        const dy = pointer.y - particle.y
        const distance = Math.hypot(dx, dy)
        if (distance < 180 && distance > 0.5) {
          const pull = (1 - distance / 180) * 0.035
          particle.vx += (dx / distance) * pull
          particle.vy += (dy / distance) * pull
        }

        // Friction keeps velocities from compounding over time.
        particle.vx *= 0.992
        particle.vy *= 0.992

        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        const nearPointer = distance < 140
        context.beginPath()
        context.fillStyle = nearPointer ? accentColor : nodeColor
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        context.fill()
      }

      context.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > 130) continue
          context.strokeStyle = linkColor
          context.globalAlpha = 1 - distance / 130
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }
      context.globalAlpha = 1

      frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const handlePointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const handleVisibility = () => (document.hidden ? stop() : start())

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )

    const themeObserver = new MutationObserver(readColors)

    resize()
    frame = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointer, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    observer.observe(canvas)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointer)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}

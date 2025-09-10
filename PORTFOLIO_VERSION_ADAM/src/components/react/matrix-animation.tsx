import { useEffect, useRef } from 'react'

const MatrixAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    // Initialiser les positions des gouttes
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    // Fonction de dessin
    const draw = () => {
      // Fond semi-transparent pour l'effet de traînée
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Couleur du texte
      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px monospace`

      // Dessiner les caractères
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Effet de brillance pour certains caractères
        if (Math.random() > 0.975) {
          ctx.fillStyle = '#ffffff'
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)
          ctx.fillStyle = '#00ff00'
        }

        // Réinitialiser la goutte quand elle atteint le bas
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Boucle d'animation
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-20"
        style={{ filter: 'blur(0.5px)' }}
      />
    </div>
  )
}

export default MatrixAnimation


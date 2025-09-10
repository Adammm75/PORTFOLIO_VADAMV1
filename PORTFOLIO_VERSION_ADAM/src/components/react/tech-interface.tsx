import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Code, Cpu, Database, Globe, Zap } from 'lucide-react'

const TechInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration Matrix
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px "Courier New", monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Effet de gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + fontSize)
        gradient.addColorStop(0, '#00ff41')
        gradient.addColorStop(1, '#003300')
        ctx.fillStyle = gradient

        ctx.fillText(text, x, y)

        // Effet de brillance
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'
          ctx.fillText(text, x, y)
          ctx.fillStyle = gradient
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const interval = setInterval(draw, 60)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const techItems = [
    { icon: Code, label: 'Full Stack', color: '#00ff41' },
    { icon: Cpu, label: 'AI/ML', color: '#00ffff' },
    { icon: Database, label: 'Data Science', color: '#ff00ff' },
    { icon: Globe, label: 'Web Dev', color: '#ffff00' },
    { icon: Zap, label: 'Automation', color: '#ff8000' }
  ]

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-green-500/30">
      {/* Canvas Matrix en arrière-plan */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Overlay avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-green-900/20" />
      
      {/* Contenu principal */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-2 font-mono">
            TECH INTERFACE
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {/* Grille de technologies */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1 items-center">
          {techItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                scale: isVisible ? 1 : 0.8 
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 hover:border-green-400/60 transition-all duration-300">
                <div className="text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-3 p-3 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-400/30 w-12 h-12 flex items-center justify-center"
                  >
                    <item.icon 
                      className="w-6 h-6" 
                      style={{ color: item.color }}
                    />
                  </motion.div>
                  <p className="text-green-300 font-mono text-sm font-medium">
                    {item.label}
                  </p>
                </div>
                
                {/* Effet de lueur au survol */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barre de statut */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-between text-green-300 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <span>LOADING...</span>
            <div className="w-8 h-1 bg-green-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TechInterface









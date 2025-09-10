'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function FooterLikes() {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Charger les likes depuis localStorage au montage
  useEffect(() => {
    const savedLikes = localStorage.getItem('footer-likes')
    const savedIsLiked = localStorage.getItem('footer-liked')
    
    if (savedLikes) {
      setLikes(parseInt(savedLikes))
    } else {
      // Valeur initiale
      setLikes(20)
    }
    
    if (savedIsLiked === 'true') {
      setIsLiked(true)
    }
  }, [])

  const handleLike = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      if (!isLiked) {
        // Ajouter un like
        const newLikes = likes + 1
        setLikes(newLikes)
        setIsLiked(true)
        
        // Sauvegarder dans localStorage
        localStorage.setItem('footer-likes', newLikes.toString())
        localStorage.setItem('footer-liked', 'true')
        
        // Animation de succès
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } else {
        // Retirer un like
        const newLikes = Math.max(0, likes - 1)
        setLikes(newLikes)
        setIsLiked(false)
        
        // Sauvegarder dans localStorage
        localStorage.setItem('footer-likes', newLikes.toString())
        localStorage.setItem('footer-liked', 'false')
        
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    } catch (error) {
      console.error('Erreur lors du like:', error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button 
        onClick={handleLike}
        disabled={isLoading}
        className={`
          flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 
          font-semibold text-lg shadow-lg hover:shadow-xl relative overflow-hidden
          ${isLiked 
            ? 'bg-yellow-500 text-black border-2 border-yellow-500' 
            : 'bg-transparent border-2 border-yellow-500 text-white hover:bg-yellow-500 hover:text-black'
          }
          ${isLoading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
        `}
      >
        {/* Animation de particules lors du clic */}
        {isLoading && (
          <div className="absolute inset-0 bg-yellow-400/20 animate-pulse rounded-xl" />
        )}
        
        <Heart 
          className={`
            w-6 h-6 transition-all duration-300
            ${isLiked 
              ? 'text-black fill-current animate-pulse' 
              : 'text-yellow-500 group-hover:text-black'
            }
            ${isLoading ? 'animate-bounce' : ''}
          `}
        />
        
        <span className="font-bold relative z-10">
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </span>
        
        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className={`w-4 h-4 border-2 ${isLiked ? 'border-black' : 'border-yellow-500'} border-t-transparent rounded-full animate-spin`} />
          </div>
        )}
      </button>
      
      {/* Message de confirmation */}
      {isLiked && !isLoading && (
        <div className="mt-2 text-center">
          <span className="text-yellow-400 text-sm font-medium animate-in slide-in-from-bottom-2">
            Merci pour votre soutien ! ⭐
          </span>
        </div>
      )}
    </div>
  )
}

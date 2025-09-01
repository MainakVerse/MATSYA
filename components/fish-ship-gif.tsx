"use client"

import { useState, useEffect } from "react"

interface FishShipGifProps {
  onComplete?: () => void
}

export default function FishShipGif({ onComplete }: FishShipGifProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in the component
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Auto-complete after 8 seconds (typical GIF duration)
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center overflow-hidden">
      {/* Ocean waves background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/80 to-transparent" />
      </div>

      {/* Main GIF container */}
      <div
        className={`relative z-10 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative">
          <img
            src="/placeholder.svg?height=600&width=800"
            alt="Narwhal pulling ship across the ocean"
            className="w-full max-w-4xl h-auto rounded-lg shadow-2xl border-4 border-white/20"
            style={{
              filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))",
              animation: "float 3s ease-in-out infinite",
            }}
          />

          {/* Animated water ripples */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-96 h-8 bg-blue-400/30 rounded-full animate-ping" />
            <div className="w-80 h-6 bg-blue-300/20 rounded-full animate-ping animation-delay-500" />
            <div className="w-64 h-4 bg-blue-200/10 rounded-full animate-ping animation-delay-1000" />
          </div>
        </div>

        {/* Epic title overlay */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg animate-pulse">
            The Legendary Voyage
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mt-2 drop-shadow-md">When nature becomes the navigator</p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface FinalExploreSectionProps {
  onComplete?: () => void
}

export default function FinalExploreSection({ onComplete }: FinalExploreSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showCurtains, setShowCurtains] = useState(false)
  const [curtainsClosing, setCurtainsClosing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Fade in the section
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleExploreClick = () => {
    // Start curtain closing animation
    setShowCurtains(true)
    setCurtainsClosing(true)

    // Navigate to home after curtains close
    setTimeout(() => {
      router.push("/")
    }, 2000) // Wait for curtain animation to complete
  }

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse">Journey Complete</h1>
        <p className="text-xl md:text-2xl text-blue-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          You have witnessed the cinematic experience. Now venture forth into new realms of possibility.
        </p>

        <button
          onClick={handleExploreClick}
          className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xl font-bold rounded-full 
                   hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition-all duration-300
                   shadow-lg hover:shadow-2xl border-2 border-blue-400/30"
        >
          <span className="relative z-10">Explore</span>
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-ping" />
        </button>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Closing curtains */}
      {showCurtains && (
        <>
          {/* Left curtain */}
          <div
            className={`fixed top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 z-50 transition-all duration-2000 ease-in-out ${
              curtainsClosing ? "w-1/2" : "w-0"
            }`}
            style={{
              background: "linear-gradient(90deg, #60a5fa 0%, #93c5fd 50%, #dbeafe 100%)",
              boxShadow: "inset -20px 0 40px rgba(0,0,0,0.3)",
            }}
          />

          {/* Right curtain */}
          <div
            className={`fixed top-0 right-0 h-full bg-gradient-to-l from-blue-400 via-blue-300 to-blue-200 z-50 transition-all duration-2000 ease-in-out ${
              curtainsClosing ? "w-1/2" : "w-0"
            }`}
            style={{
              background: "linear-gradient(270deg, #60a5fa 0%, #93c5fd 50%, #dbeafe 100%)",
              boxShadow: "inset 20px 0 40px rgba(0,0,0,0.3)",
            }}
          />
        </>
      )}
    </div>
  )
}

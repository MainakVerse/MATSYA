"use client"

import { useState, useEffect } from "react"

interface GrowingBallProps {
  onComplete: () => void
}

export default function GrowingBall({ onComplete }: GrowingBallProps) {
  const [scale, setScale] = useState(0)
  const [brightness, setBrightness] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Start the growing animation
    const growTimer = setTimeout(() => {
      setScale(1)
    }, 100)

    // Increase brightness gradually
    const brightnessTimer = setTimeout(() => {
      setBrightness(1)
    }, 500)

    // Complete the animation and trigger callback
    const completeTimer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 3000)

    return () => {
      clearTimeout(growTimer)
      clearTimeout(brightnessTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      {/* Growing blue ball */}
      <div
        className={`
          w-4 h-4 bg-blue-500 rounded-full
          transition-all duration-[2500ms] ease-out
          ${scale > 0 ? "scale-[100]" : "scale-0"}
          ${brightness > 0 ? "brightness-[300%]" : "brightness-100"}
          ${isComplete ? "opacity-0" : "opacity-100"}
        `}
        style={{
          boxShadow:
            brightness > 0
              ? `0 0 200px 100px rgba(59, 130, 246, ${brightness * 0.8}), 
               0 0 400px 200px rgba(59, 130, 246, ${brightness * 0.6}),
               0 0 800px 400px rgba(59, 130, 246, ${brightness * 0.4})`
              : "none",
        }}
      />

      {/* Blue glow overlay */}
      <div
        className={`
          fixed inset-0 bg-blue-500 transition-opacity duration-1000
          ${brightness > 0 ? "opacity-30" : "opacity-0"}
          ${isComplete ? "opacity-0" : ""}
        `}
      />
    </div>
  )
}

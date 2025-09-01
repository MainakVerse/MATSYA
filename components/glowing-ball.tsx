"use client"

import { useState, useEffect } from "react"

interface GrowingBallProps {
  onComplete: () => void
}

export default function GrowingBall({ onComplete }: GrowingBallProps) {
  const [animate, setAnimate] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    // Start animation
    const start = setTimeout(() => setAnimate(true), 50)

    // End animation after 3s
    const finish = setTimeout(() => {
      setCompleted(true)
      setTimeout(onComplete, 500)
    }, 3000)

    return () => {
      clearTimeout(start)
      clearTimeout(finish)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Growing ball */}
      <div
        className={`
          w-4 h-4 bg-blue-500 rounded-full
          transition-transform duration-[2500ms] ease-out
          ${animate ? "scale-20" : "scale-0"}
          ${completed ? "opacity-0" : "opacity-100"}
          filter transition-[filter] duration-1500
          ${animate ? "brightness-150" : "brightness-100"}
        `}
        style={{
          boxShadow: animate
            ? `0 0 60px 30px rgba(59, 130, 246, 0.6)`
            : "none",
        }}
      />

      {/* Subtle glow overlay */}
      <div
        className={`fixed inset-0 bg-blue-500 transition-opacity duration-1000
          ${animate ? "opacity-20" : "opacity-0"}
          ${completed ? "opacity-0" : ""}`}
      />
    </div>
  )
}

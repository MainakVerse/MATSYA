"use client"

import { useEffect, useState } from "react"

interface BouncingBallProps {
  isActive: boolean
}

export default function BouncingBall({ isActive }: BouncingBallProps) {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 })
  const [velocity, setVelocity] = useState({ x: 2, y: 3 })

  useEffect(() => {
    if (!isActive) return

    const animate = () => {
      setBallPosition((prev) => {
        let newX = prev.x + velocity.x
        let newY = prev.y + velocity.y
        let newVelX = velocity.x
        let newVelY = velocity.y

        // Bounce off walls (accounting for ball size)
        if (newX <= 2 || newX >= 96) {
          newVelX = -velocity.x
          newX = newX <= 2 ? 2 : 96
        }

        if (newY <= 2 || newY >= 94) {
          newVelY = -velocity.y
          newY = newY <= 2 ? 2 : 94
        }

        setVelocity({ x: newVelX, y: newVelY })

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(animate, 16) // ~60fps
    return () => clearInterval(interval)
  }, [isActive, velocity.x, velocity.y])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute w-8 h-8 bg-blue-500 rounded-full shadow-lg transition-all duration-75 ease-linear"
        style={{
          left: `${ballPosition.x}%`,
          top: `${ballPosition.y}%`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
        }}
      />
    </div>
  )
}

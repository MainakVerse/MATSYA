"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle } from "lucide-react"

interface BallData {
  id: number
  text: string
  description: string
  position: { row: number; col: number }
}

interface SciFiBallGridProps {
  onComplete?: () => void
}

const ballsData: BallData[] = [
  { id: 1, text: "Database Generation", description: "Vast relational frameworks have been constructed seamlessly. Structured repositories are capturing, indexing, and preserving raw knowledge at planetary scale.", position: { row: 0, col: 0 } },
  { id: 2, text: "Data Mining", description: "Layered datasets are being probed with precision. Hidden associations and valuable signals are extracted from massive streams using advanced quantum models.", position: { row: 0, col: 1 } },
  { id: 3, text: "Data Wrangling", description: "Complex inputs are being transformed into usable form. Cleaning, merging, and reshaping pipelines ensure harmonized structures for downstream intelligence.", position: { row: 0, col: 2 } },
  { id: 4, text: "Data Modelling", description: "Predictive structures are being simulated in real-time. Algorithms translate intricate variables into representations optimized for adaptive decision systems.", position: { row: 0, col: 3 } },
  { id: 5, text: "Machine Learning", description: "Iterative models are actively training on curated samples. Feedback-driven refinement continuously strengthens accuracy across dynamic environments.", position: { row: 1, col: 0 } },
  { id: 6, text: "Business Intelligence", description: "Processed data streams evolve into actionable insight. Analytical layers reveal patterns that guide strategies and enable enterprise-level optimization.", position: { row: 1, col: 1 } },
  { id: 7, text: "Orchestration", description: "Integrated components operate within coordinated cycles. Automated flows manage dependencies, ensuring synchronized execution across all operational layers.", position: { row: 1, col: 2 } },
  { id: 8, text: "All Set!", description: "Ready... Steady... Go!!", position: { row: 1, col: 3 } },
]

export default function SciFiBallGrid({ onComplete }: SciFiBallGridProps) {
  const [phase, setPhase] = useState<"appearing" | "describing">("appearing")
  const [activeBall, setActiveBall] = useState(0)
  const [showTextBox, setShowTextBox] = useState(false)
  const [describingBall, setDescribingBall] = useState(0)
  const [showDescription, setShowDescription] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [isZoomed, setIsZoomed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Appearing phase
  useEffect(() => {
    if (phase === "appearing" && activeBall < ballsData.length) {
      const ballTimer = setTimeout(() => setShowTextBox(true), 800)
      const nextTimer = setTimeout(() => {
        setShowTextBox(false)
        setTimeout(() => {
          if (activeBall === ballsData.length - 1) {
            setPhase("describing")
            setDescribingBall(0)
          } else {
            setActiveBall(activeBall + 1)
          }
        }, 500)
      }, 2500)
      return () => { clearTimeout(ballTimer); clearTimeout(nextTimer) }
    }
  }, [activeBall, phase])

  // Describing phase with typewriter
  useEffect(() => {
    if (phase === "describing" && describingBall < ballsData.length) {
      setIsZoomed(true)
      setShowDescription(true)
      const description = ballsData[describingBall].description
      let currentText = ""
      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex < description.length) {
          currentText += description[charIndex]
          setTypewriterText(currentText)
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setIsZoomed(false)
            setTimeout(() => {
              setShowDescription(false)
              setTypewriterText("")
              if (describingBall === ballsData.length - 1) {
                onComplete?.()
              } else {
                setDescribingBall(describingBall + 1)
              }
            }, 600)
          }, 2200)
        }
      }, 30)
      return () => clearInterval(typeInterval)
    }
  }, [describingBall, phase, onComplete])

  const getBallContent = (index: number) => {
    if (index === ballsData.length - 1 && phase === "describing" && describingBall === ballsData.length - 1) {
      return <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
    }
    return <span className="text-white text-lg sm:text-2xl font-bold">{ballsData[index]?.id || index + 1}</span>
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-slate-950 overflow-hidden">
      {/* Blur overlay when describing */}
      {phase === "describing" && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/70 z-10" />
      )}

      {/* Desktop Grid - 8 equal boxes */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 min-h-screen border border-blue-400">
        {ballsData.map((ball, index) => (
          <div
            key={ball.id}
            className={`flex flex-col items-center justify-center border border-blue-400 p-4 transition-all duration-500 
            ${phase === "describing" ? "blur-sm pointer-events-none" : ""}`}
          >
            <div
              className={`relative transition-all duration-500
              ${phase === "appearing" && index <= activeBall ? "w-28 h-28" : "w-24 h-24"}
              rounded-full flex items-center justify-center
              ${(phase === "appearing" && index <= activeBall) || phase === "describing"
                ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                : "bg-gray-600"}
            `}
            >
              {getBallContent(index)}
            </div>
            {/* Show text under balls in appearing phase */}
            {phase === "appearing" && index === activeBall && showTextBox && (
              <p className="mt-3 text-blue-300 text-sm sm:text-base font-mono text-center">{ball.text}</p>
            )}
          </div>
        ))}
      </div>

      {/* Mobile 2x4 Grid Layout */}
<div
  className={`md:hidden grid grid-cols-2 gap-4 p-4 min-h-screen mt-8 transition-all duration-500 
  ${phase === "describing" ? "blur-sm pointer-events-none" : ""}`}
>
  {ballsData.map((ball, index) => (
    <div
      key={ball.id}
      className="flex flex-col items-center justify-center border border-blue-400 rounded-lg p-4"
    >
      <div
        className={`relative transition-all duration-500
        ${phase === "appearing" && index <= activeBall ? "w-20 h-20" : "w-16 h-16"}
        rounded-full flex items-center justify-center
        ${(phase === "appearing" && index <= activeBall) || phase === "describing"
          ? "bg-blue-500 shadow-lg shadow-blue-500/50"
          : "bg-gray-600"}
      `}
      >
        {getBallContent(index)}
      </div>
      {phase === "appearing" && index === activeBall && showTextBox && (
        <p className="mt-2 text-blue-300 text-sm font-mono text-center">
          {ball.text}
        </p>
      )}
    </div>
  ))}
</div>


      {/* Focused Ball + Description Overlay */}
      {phase === "describing" && showDescription && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <div
            className={`transition-all duration-500 w-24 h-24 sm:w-32 sm:h-32 rounded-full 
            flex items-center justify-center bg-blue-500 shadow-lg shadow-blue-500/50`}
          >
            {getBallContent(describingBall)}
          </div>
          <div className="mt-6 w-full max-w-lg">
            <div className="bg-slate-800 border border-blue-400 rounded-lg p-6 shadow-lg shadow-blue-500/20">
              <div className="text-blue-300 text-sm sm:text-base font-mono leading-relaxed">
                {typewriterText}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronDown, CheckCircle } from "lucide-react"

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
  { id: 1, text: "Neural Network Initialized", description: "Advanced artificial neural networks have been successfully initialized. Deep learning algorithms are now processing complex data patterns with quantum-enhanced computational power.", position: { row: 0, col: 0 } },
  { id: 2, text: "Quantum Processing Active", description: "Quantum processors are operating at peak efficiency. Superposition states enable parallel computation across multiple dimensional matrices for exponential processing speed.", position: { row: 0, col: 1 } },
  { id: 3, text: "Data Stream Established", description: "High-bandwidth data streams have been established across all network nodes. Real-time information flow is maintained through encrypted quantum channels.", position: { row: 0, col: 2 } },
  { id: 4, text: "AI Core Online", description: "Central artificial intelligence core is fully operational. Advanced decision-making algorithms are analyzing environmental parameters and optimizing system performance.", position: { row: 0, col: 3 } },
  { id: 5, text: "Security Protocols Engaged", description: "Multi-layered security protocols have been activated. Quantum encryption shields protect all data transmissions from unauthorized access and cyber threats.", position: { row: 1, col: 0 } },
  { id: 6, text: "System Optimization Complete", description: "All system components have been optimized for maximum efficiency. Resource allocation algorithms ensure optimal performance across all operational parameters.", position: { row: 1, col: 1 } },
  { id: 7, text: "Mission Parameters Loaded", description: "Critical mission parameters have been successfully loaded into the system. All objectives, constraints, and success criteria are now integrated into the operational framework.", position: { row: 1, col: 2 } },
  { id: 8, text: "All Systems Ready", description: "All previous steps completed successfully.", position: { row: 1, col: 3 } },
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

  // Auto-scroll on mobile
  useEffect(() => {
    if (containerRef.current && window.innerWidth < 768) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [activeBall, describingBall])

  // Appearing phase logic
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

  // Describing phase with typewriter effect
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
            }, 500)
          }, 2000)
        }
      }, 30)
      return () => clearInterval(typeInterval)
    }
  }, [describingBall, phase, onComplete])

  const getBallContent = (index: number) => {
    if (index === ballsData.length - 1 && phase === "describing" && describingBall === ballsData.length - 1) {
      return <CheckCircle className="w-10 h-10 text-green-400" />
    }
    return <span className="text-white text-2xl font-bold">{ballsData[index]?.id || index + 1}</span>
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-slate-950 overflow-auto">
      {phase === "describing" && <div className="fixed inset-0 bg-black/70 z-10" />}

      {/* Desktop Grid */}
      <div className="hidden md:block min-h-screen p-8">
        <div className="grid grid-cols-4 gap-20 max-w-6xl mx-auto mt-16">
          {ballsData.map((ball, index) => (
            <div key={ball.id} className={`relative flex flex-col items-center transition-all duration-500
              ${phase === "describing" && index === describingBall ? "z-20" : "z-0"}
              ${phase === "describing" && index !== describingBall ? "opacity-30" : "opacity-100"}`}>
              <div className={`relative transition-all duration-500
                ${phase === "appearing" && index <= activeBall ? "w-32 h-32" : "w-28 h-28"}
                ${phase === "describing" && index === describingBall && isZoomed ? "w-40 h-40" : "w-32 h-32"}
                rounded-full flex items-center justify-center
                ${(phase === "appearing" && index <= activeBall) || phase === "describing"
                  ? "bg-blue-500 shadow-lg shadow-blue-500/50 scale-100"
                  : "bg-gray-600 scale-75"}
              `}>
                {getBallContent(index)}
                {(phase === "appearing" && index === activeBall) && <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />}
              </div>

              {/* Desktop Description Box */}
              {phase === "describing" && index === describingBall && showDescription && (
                <div className="absolute top-44 left-1/2 transform -translate-x-1/2 w-80 z-30">
                  <div className="bg-slate-800 border border-blue-400 rounded-lg p-6 shadow-lg shadow-blue-500/20">
                    <div className="text-blue-300 text-sm font-mono leading-relaxed">{typewriterText}</div>
                  </div>
                </div>
              )}

              {/* Appearing text box */}
              {phase === "appearing" && index === activeBall && showTextBox && (
                <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-64">
                  <div className="bg-slate-800 border border-blue-400 rounded-lg p-4 shadow-lg shadow-blue-500/20">
                    <div className="text-blue-300 text-sm font-mono text-center">{ball.text}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical */}
      <div className="md:hidden min-h-screen p-4 flex flex-col items-center space-y-12 mt-10">
        {ballsData.map((ball, index) => (
          <div key={ball.id} className="relative flex flex-col items-center w-full transition-all duration-500">
            <div className={`relative transition-all duration-500
              ${phase === "appearing" && index <= activeBall ? "w-28 h-28" : "w-24 h-24"}
              ${phase === "describing" && index === describingBall && isZoomed ? "w-32 h-32" : ""}
              rounded-full flex items-center justify-center
              ${(phase === "appearing" && index <= activeBall) || phase === "describing"
                ? "bg-blue-500 shadow-lg shadow-blue-500/50 scale-100"
                : "bg-gray-600 scale-75"}
            `}>
              {getBallContent(index)}
              {(phase === "appearing" && index === activeBall) && <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />}
            </div>

            {/* Mobile Description Box */}
            {phase === "describing" && index === describingBall && showDescription && (
              <div className="mt-6 w-full max-w-sm px-4">
                <div className="bg-slate-800 border border-blue-400 rounded-lg p-6 shadow-lg shadow-blue-500/20">
                  <div className="text-blue-300 text-sm font-mono leading-relaxed">{typewriterText}</div>
                </div>
              </div>
            )}

            {/* Appearing text box */}
            {phase === "appearing" && index === activeBall && showTextBox && (
              <div className="mt-6 w-full max-w-xs">
                <div className="bg-slate-800 border border-blue-400 rounded-lg p-4 shadow-lg shadow-blue-500/20">
                  <div className="text-blue-300 text-sm font-mono text-center">{ball.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

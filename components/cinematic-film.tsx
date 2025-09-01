"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // ✅ for navigation
import GrowingBall from "./glowing-ball"
import SciFiBallGrid from "./sci-fi-ball-grid"
import FinalExploreSection from "./final-explore-section"

export default function CinematicFilm() {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [curtainsOpen, setCurtainsOpen] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [showCountdown, setShowCountdown] = useState(true)
  const [scenes, setScenes] = useState<{ id: number; text: string; duration: number }[]>([])
  const [allScenesComplete, setAllScenesComplete] = useState(false)
  const [showGrowingBall, setShowGrowingBall] = useState(false)
  const [showSciFiGrid, setShowSciFiGrid] = useState(false)
  const [showFinalExplore, setShowFinalExplore] = useState(false)
  const [progress, setProgress] = useState(0)

  // Fetch JSON with scenes
  useEffect(() => {
    fetch("/cinematic_scenes.json")
      .then((res) => res.json())
      .then((data) => {
        setScenes(data.scenes || [])
      })
      .catch((err) => console.error("Failed to load scenes:", err))
  }, [])

  // Handle countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => {
        setShowCountdown(false)
        setCurtainsOpen(true)
        setIsVisible(true)
      }, 500)
    }
  }, [countdown])

  // Scene transitions
  useEffect(() => {
    if (scenes.length === 0 || !isVisible) return

    const current = scenes.find((s) => s.id === currentScene)
    if (!current) return

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        if (currentScene < scenes.length - 1) {
          setCurrentScene(currentScene + 1)
          setTimeout(() => {
            setIsVisible(true)
          }, 500)
        } else {
          setAllScenesComplete(true)
        }
      }, 2500)
    }, current.duration)

    const totalPhases = scenes.length + 2 // scenes + growingBall + sciFiGrid
    const progressValue = ((currentScene + 1) / totalPhases) * 100
    setProgress(progressValue)

    return () => clearTimeout(timer)
  }, [currentScene, isVisible, scenes])

  useEffect(() => {
    if (allScenesComplete) {
      const timer = setTimeout(() => {
        setShowGrowingBall(true)
        setProgress(((scenes.length + 1) / (scenes.length + 2)) * 100)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [allScenesComplete, scenes.length])

  const handleGrowingBallComplete = () => {
    setShowGrowingBall(false)
    setShowSciFiGrid(true)
    setProgress(((scenes.length + 2) / (scenes.length + 2)) * 100)
  }

  const handleSciFiGridComplete = () => {
    setShowSciFiGrid(false)
    setShowFinalExplore(true)
    setProgress(100)
    setTimeout(() => setProgress(0), 1000) // hide after short delay
  }

  const handleFinalExploreComplete = () => {
    setShowFinalExplore(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      {/* Countdown */}
      {showCountdown && countdown > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-white text-[20rem] font-bold font-mono opacity-90 animate-pulse">{countdown}</div>
        </div>
      )}

      {/* Curtains */}
      <div
        className={`absolute left-0 top-0 h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 opacity-40 transition-all duration-[2500ms] ease-in-out ${
          curtainsOpen ? "w-0" : "w-1/2"
        }`}
      ></div>

      <div
        className={`absolute right-0 top-0 h-full bg-gradient-to-l from-sky-400 via-sky-500 to-sky-400 opacity-40 transition-all duration-[2500ms] ease-in-out ${
          curtainsOpen ? "w-0" : "w-1/2"
        }`}
      ></div>

      {/* Scene text */}
      {!allScenesComplete && (
        <div className="text-center">
          {scenes.map(
            (scene) =>
              scene.id === currentScene && (
                <h1
                  key={scene.id}
                  className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white transition-opacity duration-[3000ms] ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {scene.text}
                </h1>
              ),
          )}
        </div>
      )}

      {showGrowingBall && <GrowingBall onComplete={handleGrowingBallComplete} />}
      {showSciFiGrid && <SciFiBallGrid onComplete={handleSciFiGridComplete} />}
      {showFinalExplore && <FinalExploreSection onComplete={handleFinalExploreComplete} />}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800 overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Exit Button */}
      {!showFinalExplore && (
        <button
          onClick={() => router.push("/")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-sky-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-sky-500 transition-all"
        >
          Click to exit
        </button>
      )}
    </div>
  )
}

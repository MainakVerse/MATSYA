"use client"

import { useState, useEffect } from "react"
import GrowingBall from "./glowing-ball"
import SciFiBallGrid from "./sci-fi-ball-grid"
import FishShipGif from "./fish-ship-gif"
import FinalExploreSection from "./final-explore-section"

export default function CinematicFilm() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [curtainsOpen, setCurtainsOpen] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [showCountdown, setShowCountdown] = useState(true)
  const [scenes, setScenes] = useState<{ id: number; text: string; duration: number }[]>([])
  const [allScenesComplete, setAllScenesComplete] = useState(false)
  const [showGrowingBall, setShowGrowingBall] = useState(false)
  const [showSciFiGrid, setShowSciFiGrid] = useState(false)
  const [showFishShipGif, setShowFishShipGif] = useState(false)
  const [showFinalExplore, setShowFinalExplore] = useState(false)

  // Fetch JSON with scenes
  useEffect(() => {
    fetch("/cinematic_scenes.json") // Place your file in /public folder
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

    return () => clearTimeout(timer)
  }, [currentScene, isVisible, scenes])

  useEffect(() => {
    if (allScenesComplete) {
      const timer = setTimeout(() => {
        setShowGrowingBall(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [allScenesComplete])

  const handleGrowingBallComplete = () => {
    setShowGrowingBall(false)
    setShowSciFiGrid(true)
  }

  const handleSciFiGridComplete = () => {
    setShowSciFiGrid(false)
    setShowFishShipGif(true)
  }

  const handleFishShipGifComplete = () => {
    setShowFishShipGif(false)
    setShowFinalExplore(true)
  }

  const handleFinalExploreComplete = () => {
    setShowFinalExplore(false)
    // Animation sequence complete
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
      {showFishShipGif && <FishShipGif onComplete={handleFishShipGifComplete} />}
      {showFinalExplore && <FinalExploreSection onComplete={handleFinalExploreComplete} />}
    </div>
  )
}

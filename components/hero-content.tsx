"use client"

import { useState, useEffect } from "react"

export default function HeroContent() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const texts = ["Your Data Manager", "Optimized For Flows", "Narayani Namohstute"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, 2000) // Change text every 2 seconds

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="text-center max-w-lg">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
          <span className="text-white text-xl font-light relative z-10">✨ A product of Supernova Avtarverse</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-9xl tracking-tight font-extrabold text-white">
          <span className="font-medium italic instrument">Matsya</span>
          <br />
          <div className="text-3xl relative h-16 overflow-hidden whitespace-nowrap">
            <div
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateY(-${currentTextIndex * 100}%)`,
              }}
            >
              {texts.map((text, index) => (
                <div key={index} className="h-16 flex items-center justify-center font-extrabold tracking-tight text-white">
                  {text}
                </div>
              ))}
            </div>
          </div>
        </h1>

       

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-transparent border border-white text-white font-normal text-xl transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            Learn More
          </button>
          <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xl transition-all duration-200 hover:bg-white cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}

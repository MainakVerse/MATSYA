'use client'
import React, { useState, useEffect, useRef } from 'react';
import Preloader from './Preloader';
import { Database, Brain, GitBranch, Network, Workflow, BarChart3, Smile, Bot } from "lucide-react"

interface MousePosition {
  x: number;
  y: number;
}

const doodleIcons = [Database, BarChart3, Brain, GitBranch, Network, Workflow, Smile, Bot];

const HeroSection: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const phrases: string[] = ["Your Data Guardian", "Optimized For You", "Narayani Namostute"];

  // Phrase rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [phrases.length]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      <Preloader />
      <div 
        ref={containerRef} 
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-slate-800/30 to-black/40 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-blue-900/20"></div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Doodle overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => {
            const Icon = doodleIcons[i % doodleIcons.length];
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = `${12 + Math.random() * 12}px`;
            return (
              <Icon
                key={i}
                className="absolute text-white/10"
                style={{
                  top,
                  left,
                  fontSize: size,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            );
          })}
        </div>

        {/* Title + phrases */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-wider drop-shadow-2xl leading-tight">
            MATSYA
          </h1>

          {/* Rotating subheader */}
          <div className="phrase-container mb-10 w-full">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                className={`phrase-item text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white/90 transition-opacity duration-700 ${
                  index === currentPhrase ? 'opacity-100' : 'opacity-0 absolute'
                }`}
                style={{ 
                  textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(0,255,255,0.3)',
                }}
              >
                {phrase}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <a 
              href="#"
              className="relative group px-6 py-3 sm:px-8 sm:py-4 rounded-xl backdrop-blur-md bg-white/5 
                        border border-transparent text-white font-bold min-w-[140px] sm:min-w-[160px] 
                        transition-all duration-500 hover:scale-105 hover:rotate-1 text-base sm:text-lg"
            >
              <span className="absolute inset-0 rounded-xl border-2 border-transparent animate-[neon_3s_linear_infinite]"></span>
              <span className="relative z-10">Explore</span>
            </a>

            <a 
              href="/cinematic"
              className="relative group px-6 py-3 sm:px-8 sm:py-4 rounded-xl backdrop-blur-md bg-white/5 
                        border border-transparent text-white font-bold min-w-[140px] sm:min-w-[160px] 
                        transition-all duration-500 hover:scale-105 hover:-rotate-1 text-base sm:text-lg"
            >
              <span className="absolute inset-0 rounded-xl border-2 border-transparent animate-[neon_3s_linear_infinite]"></span>
              <span className="relative z-10">Story</span>
            </a>
          </div>
        </div>

        {/* Atmosphere gradient overlays */}
        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-16 sm:h-32 bg-gradient-to-b from-black/40 to-transparent"></div>
      </div>
    </>
  );
};

export default HeroSection;

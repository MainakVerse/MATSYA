import React, { useState, useEffect } from 'react';

interface TesseractPreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Preloader: React.FC<TesseractPreloaderProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <>
     

      <div className="tesseract-container">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* 3D Cube */}
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        {/* Progress Section */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">
            {Math.round(progress)}%
          </div>
          <div className="loading-text">
            Initializing Matsya
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
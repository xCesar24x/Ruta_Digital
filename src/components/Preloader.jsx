import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PreLoader.css';

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Animate progress line
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power3.inOut"
    }, 0);

    // Pulse logo slightly
    tl.to(logoRef.current, {
      scale: 1.05,
      duration: 0.8,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, 0);

    // Fade out and move up
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
      delay: 0.2
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader-container">
      <div className="preloader-content">
        <img 
          ref={logoRef} 
          src="/Ruta.png" 
          alt="Ruta Digital" 
          className="preloader-logo"
        />
        <div className="preloader-progress-bar">
          <div ref={progressRef} className="preloader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './PreLoader.css';

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const glowRef = useRef(null);
  const progressRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [isDone, setIsDone] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      });

      gsap.set(logoRef.current, { scale: 0.88, opacity: 0, force3D: true });
      gsap.set(glowRef.current, { scale: 0.8, opacity: 0, force3D: true });
      gsap.set(progressRef.current, { scaleX: 0, force3D: true });

      // 1. Logo & Glow fade in smoothly
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power2.out"
      })
      .to(glowRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 0.65,
        ease: "power2.out"
      }, "<")
      // 2. Progress line fills
      .to(progressRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.2")
      // 3. Hide progress line
      .to(progressRef.current.parentElement, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out"
      })
      // 4. Ultra-smooth Cinematic Zoom-Through:
      // Uses GPU hardware-accelerated transform with optimized scale & curve
      .to(glowRef.current, {
        scale: 3,
        opacity: 0,
        duration: 0.75,
        ease: "power2.in"
      }, "+=0.03")
      .to(logoRef.current, {
        scale: 12,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        force3D: true
      }, "<")
      // 5. Container fades smoothly to reveal the website
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onStart: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  if (isDone) return null;

  return (
    <div ref={containerRef} className="preloader-container">
      <div className="preloader-content">
        <div className="preloader-logo-wrapper">
          <div ref={glowRef} className="preloader-glow"></div>
          <img 
            ref={logoRef} 
            src="/Ruta.png" 
            alt="Ruta Digital" 
            className="preloader-logo"
            loading="eager"
            decoding="sync"
          />
        </div>
        <div className="preloader-progress-bar">
          <div ref={progressRef} className="preloader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;

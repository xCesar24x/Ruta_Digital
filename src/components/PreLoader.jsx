import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './PreLoader.css';

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const fillWrapperRef = useRef(null);
  const glowRef = useRef(null);
  const laserRef = useRef(null);
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

      // Initial state
      gsap.set(logoWrapperRef.current, { scale: 0.94, opacity: 0, force3D: true });
      gsap.set(glowRef.current, { scale: 0.8, opacity: 0, force3D: true });
      gsap.set(fillWrapperRef.current, { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(laserRef.current, { left: '0%', opacity: 0 });

      // 1. Black & White Base Logo fades in smoothly
      tl.to(logoWrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(glowRef.current, {
        opacity: 0.4,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "<")

      // 2. Letters fill from Left to Right (B&W -> Glowing Green) with laser leading edge
      .to(laserRef.current, {
        opacity: 1,
        duration: 0.1
      })
      .to(fillWrapperRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.1,
        ease: "power1.inOut"
      }, "<")
      .to(laserRef.current, {
        left: '100%',
        duration: 1.1,
        ease: "power1.inOut"
      }, "<")
      .to(glowRef.current, {
        opacity: 0.8,
        scale: 1.15,
        duration: 1.1,
        ease: "power1.inOut"
      }, "<")

      // 3. Fade out laser line
      .to(laserRef.current, {
        opacity: 0,
        duration: 0.15
      }, "-=0.1")

      // 4. Ultra-smooth Hardware Accelerated Zoom-Through (60/120fps)
      .to(glowRef.current, {
        scale: 2.5,
        opacity: 0,
        duration: 0.55,
        ease: "power2.in"
      }, "+=0.04")
      .to(logoWrapperRef.current, {
        scale: 6.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        force3D: true
      }, "<")

      // 5. Container dissolves cleanly to reveal the website
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
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
        <div className="preloader-logo-wrapper" ref={logoWrapperRef}>
          <div ref={glowRef} className="preloader-glow"></div>
          
          {/* Layer 1: Black & White / Dimmed Base Logo */}
          <img 
            src="/Ruta.png" 
            alt="Ruta Digital" 
            className="preloader-logo preloader-logo-base"
            loading="eager"
            decoding="sync"
          />

          {/* Layer 2: Glowing Green Filled Logo (Clipped Left-to-Right) */}
          <div ref={fillWrapperRef} className="preloader-logo-fill-wrapper">
            <img 
              src="/Ruta.png" 
              alt="Ruta Digital" 
              className="preloader-logo preloader-logo-fill"
              loading="eager"
              decoding="sync"
            />
            <div ref={laserRef} className="preloader-laser-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;

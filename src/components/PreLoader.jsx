import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './PreLoader.css';

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
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

      gsap.set(logoRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(progressRef.current, { scaleX: 0 });

      // 1. Logo fades in
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      // 2. Progress line fills with green glow
      .to(progressRef.current, {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.inOut"
      }, "-=0.3")
      // 3. Hide progress line
      .to(progressRef.current.parentElement, {
        opacity: 0,
        duration: 0.2
      })
      // 4. Cinematic Zoom-Through: Logo expands massively forward passing through the camera
      .to(logoRef.current, {
        scale: 35,
        opacity: 0,
        duration: 1.2,
        ease: "power4.inOut"
      }, "+=0.05")
      // 5. Fade container out smoothly to reveal the website
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onStart: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, "-=0.7");
    });

    return () => ctx.revert();
  }, []);

  if (isDone) return null;

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

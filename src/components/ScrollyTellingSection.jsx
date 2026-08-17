import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollyTelling.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollyTellingSection = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Elements to animate
  const dashImgRef = useRef(null);
  const aiImgRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    // Pin the entire wrapper
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=3000", // Scroll for 3000px to play through the animation
        scrub: 1,
        pin: true,
      }
    });

    // Initial state setup (CSS can handle most, but just to be sure)
    gsap.set([aiImgRef.current, text2Ref.current], { autoAlpha: 0, y: 50 });
    gsap.set(dashImgRef.current, { scale: 0.9, y: 30, rotationX: 10 });

    // Scene 1: Dashboard fades in and text 1 moves out
    tl.to(dashImgRef.current, { autoAlpha: 1, scale: 1, y: 0, rotationX: 0, duration: 1 })
      .to(dashImgRef.current, { y: -50, duration: 2 }, "+=0.5") // slight drift
      .to(text1Ref.current, { autoAlpha: 0, y: -50, duration: 1 }, "-=2")
      
    // Scene 2: Dash fades out, AI fades in
      .to(dashImgRef.current, { autoAlpha: 0, y: -100, scale: 0.8, duration: 1 })
      .to(aiImgRef.current, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .to(text2Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.8")
      
    // End Scene drift
      .to([aiImgRef.current, text2Ref.current], { y: -30, duration: 1 }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="scrolly-wrapper" ref={wrapperRef}>
      <div className="scrolly-container" ref={containerRef}>
        
        {/* Texts */}
        <div className="scrolly-texts">
          <div className="scrolly-text-block" ref={text1Ref}>
            <h2>Panel de Control Total</h2>
            <p>Métricas precisas y análisis en tiempo real. Construimos dashboards que te dan el pulso de tu negocio al instante.</p>
          </div>
          
          <div className="scrolly-text-block text-hidden" ref={text2Ref}>
            <h2>Automatización con IA</h2>
            <p>Flujos de trabajo inteligentes. Deja que la inteligencia artificial se encargue de las tareas repetitivas y potencia tu equipo.</p>
          </div>
        </div>

        {/* Images */}
        <div className="scrolly-visuals">
          <img 
            ref={dashImgRef} 
            src="/dashboard.png" 
            alt="Dashboard UI" 
            className="scrolly-img img-dashboard"
          />
          <img 
            ref={aiImgRef} 
            src="/ai-automation.png" 
            alt="AI Automation Workflow" 
            className="scrolly-img img-ai"
          />
        </div>
        
      </div>
    </div>
  );
};

export default ScrollyTellingSection;

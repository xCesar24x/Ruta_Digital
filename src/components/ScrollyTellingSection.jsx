import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Bot, ArrowRight } from 'lucide-react';
import './ScrollyTelling.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollyTellingSection = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  
  const dashImgRef = useRef(null);
  const aiImgRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
      }
    });

    gsap.set([aiImgRef.current, text2Ref.current], { autoAlpha: 0, y: 50 });
    gsap.set(dashImgRef.current, { scale: 0.9, y: 30, rotationX: 10 });

    tl.to(dashImgRef.current, { autoAlpha: 1, scale: 1, y: 0, rotationX: 0, duration: 1 })
      .to(dashImgRef.current, { y: -50, duration: 2 }, "+=0.5")
      .to(text1Ref.current, { autoAlpha: 0, y: -50, duration: 1 }, "-=2")
      
      .to(dashImgRef.current, { autoAlpha: 0, y: -100, scale: 0.8, duration: 1 })
      .to(aiImgRef.current, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .to(text2Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.8")
      
      .to([aiImgRef.current, text2Ref.current], { y: -30, duration: 1 }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="scrolly-wrapper" ref={wrapperRef} id="servicios">
      <div className="scrolly-container" ref={containerRef}>
        
        <div className="scrolly-texts">
          <div className="scrolly-text-block glass-card" ref={text1Ref}>
            <div className="icon-wrapper">
              <BarChart3 size={40} className="scrolly-icon" />
            </div>
            <h2>Panel de Control Total</h2>
            <p>Métricas precisas y análisis en tiempo real. Construimos dashboards que te dan el pulso de tu negocio al instante.</p>
            <button className="btn-secondary scrolly-btn">
              Saber más <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="scrolly-text-block glass-card text-hidden" ref={text2Ref}>
            <div className="icon-wrapper">
              <Bot size={40} className="scrolly-icon" />
            </div>
            <h2>Automatización con IA</h2>
            <p>Flujos de trabajo inteligentes. Deja que la inteligencia artificial se encargue de las tareas repetitivas y potencia tu equipo.</p>
            <button className="btn-secondary scrolly-btn">
              Saber más <ArrowRight size={18} />
            </button>
          </div>
        </div>

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

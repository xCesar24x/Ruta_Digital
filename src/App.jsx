import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import PortfolioMarquee from './components/PortfolioMarquee';
import ScrollyTellingSection from './components/ScrollyTellingSection';
import FAQSection from './components/FAQSection';
import FooterCTA from './components/FooterCTA';
import './index.css'; 

function App() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCursorActive, setIsCursorActive] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
      syncTouch: true,
      infinite: false,
    });

    // Trail particles & Canvas setup
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastPos = { x: -100, y: -100 };

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Add light trail sparkle particles if cursor moved
      const dist = Math.hypot(x - lastPos.x, y - lastPos.y);
      if (dist > 3) {
        particles.push({
          x: x + 2,
          y: y + 2,
          alpha: 0.85,
          size: Math.random() * 3.5 + 2,
          decay: 0.035 + Math.random() * 0.015,
        });
        lastPos = { x, y };
      }
    };

    const renderLoop = (time) => {
      lenis.raf(time);

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.alpha -= p.decay;
          p.size *= 0.95;

          if (p.alpha <= 0 || p.size <= 0.2) {
            particles.splice(i, 1);
            i--;
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha})`;
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('glass-card')
      ) {
        setIsCursorActive(true);
      } else {
        setIsCursorActive(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <canvas ref={canvasRef} className="cursor-trail-canvas"></canvas>
      <div 
        ref={cursorRef} 
        className={`custom-cursor-arrow ${isCursorActive ? 'active' : ''}`}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M3 2L20 11L12.5 13.8L9 22L3 2Z" 
            fill="#16a34a" 
            stroke="#4ade80" 
            strokeWidth="1.8" 
            strokeLinejoin="round"
          />
          <circle cx="5.5" cy="4.5" r="1.5" fill="#86efac" />
        </svg>
      </div>
      <main>
        <Hero />
        <PortfolioMarquee />
        <ScrollyTellingSection />
        <FAQSection />
        <FooterCTA />
      </main>
    </>
  );
}

export default App;

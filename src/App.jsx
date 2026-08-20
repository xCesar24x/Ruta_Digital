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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Custom Cursor Logic
    const moveCursor = (e) => {
      if (cursorRef.current) {
        // Use GSAP if available, otherwise fallback to standard style update for performance
        // Actually, direct style update is fast enough for simple circle
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering over something clickable or important
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
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isCursorActive ? 'active' : ''}`}
      ></div>
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

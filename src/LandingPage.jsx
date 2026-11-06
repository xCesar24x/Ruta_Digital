import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PreLoader from './components/PreLoader';
import Header from './components/Header';
import Hero from './components/Hero';
import PortfolioMarquee from './components/PortfolioMarquee';
import ScrollyTellingSection from './components/ScrollyTellingSection';
import FoundersSection from './components/FoundersSection';
import FAQSection from './components/FAQSection';
import FooterCTA from './components/FooterCTA';
import { registerLenis, prefersReducedMotion, hasFinePointer } from './lib/motion';
import './index.css'; 

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    let lenis = null;
    let tickerCb = null;

    // Lenis smooth scroll (wheel only). Touch keeps native momentum scrolling:
    // emulating it with syncTouch feels laggy and "off" on phones.
    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      registerLenis(lenis);

      lenis.on('scroll', ScrollTrigger.update);
      tickerCb = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    // Cursor sparkle trail. Native cursor stays visible; the loop only runs
    // while there are particles, so an idle page costs nothing.
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    const trailEnabled = ctx && hasFinePointer() && !reduceMotion;
    let particles = [];
    let animationFrameId = null;
    let lastPos = { x: -100, y: -100 };

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.size *= 0.95;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        // Soft glow without shadowBlur (which is very expensive per particle)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha * 0.18})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = particles.length ? requestAnimationFrame(renderLoop) : null;
    };

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (Math.hypot(x - lastPos.x, y - lastPos.y) > 4) {
        particles.push({
          x: x + 6,
          y: y + 10,
          alpha: 0.7,
          size: Math.random() * 2.5 + 1.5,
          decay: 0.04 + Math.random() * 0.015,
        });
        lastPos = { x, y };
        if (!animationFrameId) animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    if (trailEnabled) {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('mousemove', moveCursor, { passive: true });
    }

    return () => {
      if (lenis) {
        registerLenis(null);
        lenis.destroy();
        gsap.ticker.remove(tickerCb);
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      <PreLoader onComplete={handlePreloaderComplete} />
      <div className="noise-overlay"></div>
      <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true"></canvas>
      <Header />
      <main>
        <Hero isLoaded={isLoaded} />
        <PortfolioMarquee />
        <ScrollyTellingSection />
        <FoundersSection />
        <FAQSection />
        <FooterCTA />
      </main>
    </>
  );
}

export default LandingPage;

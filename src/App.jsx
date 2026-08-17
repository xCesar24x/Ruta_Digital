import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import PreLoader from './components/PreLoader';
import Hero from './components/Hero';
import ScrollyTellingSection from './components/ScrollyTellingSection';
import FooterCTA from './components/FooterCTA';
import './index.css'; // Just in case, it's also in main.jsx

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && <PreLoader onComplete={() => setLoading(false)} />}
      
      {/* 
        We render the main content even while loading, 
        but maybe hidden or beneath the preloader to ensure 
        ScrollTrigger can calculate heights correctly.
      */}
      <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Hero />
        <ScrollyTellingSection />
        <FooterCTA />
      </main>
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import PreLoader from './components/PreLoader';
import Hero from './components/Hero';
import PortfolioMarquee from './components/PortfolioMarquee';
import ScrollyTellingSection from './components/ScrollyTellingSection';
import FAQSection from './components/FAQSection';
import FooterCTA from './components/FooterCTA';
import './index.css'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
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
      
      <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
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

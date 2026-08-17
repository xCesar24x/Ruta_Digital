import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import PortfolioMarquee from './components/PortfolioMarquee';
import ScrollyTellingSection from './components/ScrollyTellingSection';
import FAQSection from './components/FAQSection';
import FooterCTA from './components/FooterCTA';
import './index.css'; 

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothWheel: true,
      smoothTouch: true, // Habilita el smooth scroll en móviles
      touchMultiplier: 2,
      syncTouch: true, // Sincroniza el scroll táctil para emular la fricción
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
    <main>
      <Hero />
      <PortfolioMarquee />
      <ScrollyTellingSection />
      <FAQSection />
      <FooterCTA />
    </main>
  );
}

export default App;

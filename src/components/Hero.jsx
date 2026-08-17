import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // We wait a tiny bit to ensure preloader is mostly done if we want, 
    // or we can trigger this externally. For now, just standard load animation.
    
    // Split text for animation
    const splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
    const splitSubtitle = new SplitType(subtitleRef.current, { types: 'lines' });

    const tl = gsap.timeline({ delay: 2.2 }); // Delay to wait for preloader

    // Background scale down effect
    tl.fromTo(bgRef.current, 
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 2, ease: "power3.out" }
    );

    // Title characters stagger
    if (splitTitle.chars) {
      tl.fromTo(splitTitle.chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 1, ease: "back.out(1.7)" },
        "-=1.5"
      );
    }

    // Subtitle lines fade up
    if (splitSubtitle.lines) {
      tl.fromTo(splitSubtitle.lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
    }

    // Parallax Effect on Scroll
    gsap.to(bgRef.current, {
      yPercent: 30, // Move down slightly as we scroll down
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      splitTitle.revert();
      splitSubtitle.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div 
        ref={bgRef} 
        className="hero-bg" 
        style={{ backgroundImage: `url('/hero.png')` }}
      ></div>
      
      <div className="container hero-content">
        <h1 ref={titleRef} className="hero-title">
          Tu negocio en<br/>
          <span className="text-glow">todas partes.</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Digitalizamos tu empresa y automatizamos tu tiempo.<br/>
          Ecosistemas a medida con IA de última generación.
        </p>
      </div>
    </section>
  );
};

export default Hero;

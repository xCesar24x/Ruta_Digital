import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Globe, Bot, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = ({ isLoaded = true }) => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let splitTitle = null;
    let splitSubtitle = null;

    try {
      splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
      splitSubtitle = new SplitType(subtitleRef.current, { types: 'lines' });
      // Set initial states immediately to prevent flash and avoid reflow on load
      gsap.set(splitTitle.chars, { y: 60, opacity: 0, rotateX: -45 });
      gsap.set(splitSubtitle.lines, { y: 25, opacity: 0 });
      gsap.set(bgRef.current, { scale: 1.15, opacity: 0 });
      gsap.set(logoRef.current, { y: 35, opacity: 0, scale: 0.9 });
      gsap.set(badgeRef.current, { y: 20, opacity: 0 });
    } catch (e) {
      console.warn('SplitType error:', e);
    }

    return () => {
      splitTitle?.revert?.();
      splitSubtitle?.revert?.();
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      tl.to(bgRef.current, 
        { scale: 1, opacity: 0.85, duration: 1.4, ease: "power3.out" }
      );

      tl.to(logoRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.5)" },
        "-=1.0"
      );

      tl.to(badgeRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.7"
      );

      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars?.length) {
        tl.to(titleChars,
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.025, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.5"
        );
      } else {
        tl.to(titleRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      const subtitleLines = subtitleRef.current?.querySelectorAll('.line');
      if (subtitleLines?.length) {
        tl.to(subtitleLines,
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
      } else {
        tl.to(subtitleRef.current,
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPos = (e.clientX / window.innerWidth - 0.5) * 10;
      const yPos = (e.clientY / window.innerHeight - 0.5) * -10;
      
      gsap.to('.hero-glow', {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: "power2.out"
      });
      
      gsap.to('.hero-content', {
        rotationX: yPos,
        rotationY: xPos,
        transformPerspective: 1000,
        transformOrigin: "center center",
        duration: 0.5,
        ease: "power1.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-glow"></div>
      <div 
        ref={bgRef} 
        className="hero-bg" 
        style={{ backgroundImage: `url('/hero.png?v=2')` }}
      ></div>

      <div className="container hero-content">
        <img 
          ref={logoRef} 
          src="/Ruta.png" 
          alt="Ruta Digital Logo" 
          className="hero-logo" 
        />
        
        {/* Studio Identity & Services Badges */}
        <div ref={badgeRef} className="hero-services-badge">
          <span className="badge-item studio-highlight">
            <Sparkles size={14} className="badge-icon" /> Global Creative &amp; Technology Studio
          </span>
          <span className="badge-separator">•</span>
          <span className="badge-item">
            <Globe size={14} className="badge-icon" /> Desarrollo Web
          </span>
          <span className="badge-separator">•</span>
          <span className="badge-item">
            <Bot size={14} className="badge-icon" /> Automatizaciones
          </span>
        </div>

        <h1 ref={titleRef} className="hero-title">
          Tu negocio en<br/>
          <span className="text-glow">todas partes.</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Diseñamos plataformas web de alto impacto y automatizamos tu operación.<br/>
          Soluciones digitales a medida para escalar tu presencia y eficiencia.
        </p>
      </div>
    </section>
  );
};

export default Hero;

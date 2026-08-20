import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Globe, Bot, Sparkles, Cpu, Network, Zap } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    const splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
    const splitSubtitle = new SplitType(subtitleRef.current, { types: 'lines' });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(bgRef.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.85, duration: 2, ease: "power3.out" }
    );

    tl.fromTo(logoRef.current,
      { y: 40, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" },
      "-=1.5"
    );

    tl.fromTo(badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=1"
    );

    if (splitTitle.chars) {
      tl.fromTo(splitTitle.chars,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.9, ease: "back.out(1.7)" },
        "-=0.8"
      );
    }

    if (splitSubtitle.lines) {
      tl.fromTo(splitSubtitle.lines,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }

    // Floating icons animation
    iconsRef.current.forEach((icon, i) => {
      if (!icon) return;
      gsap.fromTo(icon, 
        { y: 0, opacity: 0, scale: 0 },
        { y: 0, opacity: 0.25, scale: 1, duration: 1, delay: 1 + (i * 0.2) }
      );
      gsap.to(icon, {
        y: Math.random() * -30 - 15,
        x: Math.random() * 20 - 10,
        rotation: Math.random() * 30 - 15,
        duration: 3 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1 + (i * 0.2)
      });
    });

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
      splitTitle.revert();
      splitSubtitle.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-glow"></div>
      <div 
        ref={bgRef} 
        className="hero-bg" 
        style={{ backgroundImage: `url('/hero.png?v=2')` }}
      ></div>
      
      {/* Floating Tech Icons */}
      <div className="floating-icons">
        <Cpu ref={el => iconsRef.current[0] = el} className="f-icon icon-1" />
        <Network ref={el => iconsRef.current[1] = el} className="f-icon icon-2" />
        <Zap ref={el => iconsRef.current[2] = el} className="f-icon icon-3" />
      </div>

      <div className="container hero-content">
        <img 
          ref={logoRef} 
          src="/logo.png" 
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

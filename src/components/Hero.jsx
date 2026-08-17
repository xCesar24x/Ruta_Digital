import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ArrowRight, PlayCircle, Cpu, Network, Zap } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnGroupRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    const splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
    const splitSubtitle = new SplitType(subtitleRef.current, { types: 'lines' });

    const tl = gsap.timeline({ delay: 2.2 });

    tl.fromTo(bgRef.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 2.5, ease: "power3.out" }
    );

    if (splitTitle.chars) {
      tl.fromTo(splitTitle.chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 1, ease: "back.out(1.7)" },
        "-=2"
      );
    }

    if (splitSubtitle.lines) {
      tl.fromTo(splitSubtitle.lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
    }

    tl.fromTo(btnGroupRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // Floating icons animation
    iconsRef.current.forEach((icon, i) => {
      gsap.fromTo(icon, 
        { y: 0, opacity: 0, scale: 0 },
        { y: 0, opacity: 0.3, scale: 1, duration: 1, delay: 3 + (i * 0.2) }
      );
      gsap.to(icon, {
        y: Math.random() * -30 - 15,
        x: Math.random() * 20 - 10,
        rotation: Math.random() * 30 - 15,
        duration: 3 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 3 + (i * 0.2)
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
      
      {/* Floating Tech Icons */}
      <div className="floating-icons">
        <Cpu ref={el => iconsRef.current[0] = el} className="f-icon icon-1" />
        <Network ref={el => iconsRef.current[1] = el} className="f-icon icon-2" />
        <Zap ref={el => iconsRef.current[2] = el} className="f-icon icon-3" />
      </div>

      <div className="container hero-content">
        <h1 ref={titleRef} className="hero-title">
          Tu negocio en<br/>
          <span className="text-glow">todas partes.</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Digitalizamos tu empresa y automatizamos tu tiempo.<br/>
          Ecosistemas a medida con IA de última generación.
        </p>
        
        <div ref={btnGroupRef} className="hero-btns">
          <a href="#proyectos" className="btn-primary">
            Ver Proyectos <ArrowRight size={20} />
          </a>
          <a href="#servicios" className="btn-secondary">
            <PlayCircle size={20} /> Descubrir más
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

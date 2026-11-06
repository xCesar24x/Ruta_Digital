import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { MapPin, ArrowDown } from 'lucide-react';
import { prefersReducedMotion, hasFinePointer, scrollToId } from '../lib/motion';
import { whatsappLinkProps } from '../lib/whatsapp';
import { MESSAGES } from '../content/site';
import WhatsAppIcon from './WhatsAppIcon';
import './Hero.css';

const Hero = ({ isLoaded = true }) => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const logoRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let splitTitle = null;

    try {
      splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });
      // Set initial states immediately to prevent flash and avoid reflow on load
      if (prefersReducedMotion()) {
        gsap.set([bgRef.current, logoRef.current, badgeRef.current, titleRef.current, subtitleRef.current, actionsRef.current], { opacity: 0 });
      } else {
        gsap.set(splitTitle.chars, { y: 60, opacity: 0, rotateX: -45 });
        gsap.set(subtitleRef.current?.querySelectorAll('.hero-sub-line'), { y: 20, opacity: 0 });
        gsap.set(bgRef.current, { scale: 1.15, opacity: 0 });
        gsap.set(logoRef.current, { y: 35, opacity: 0, scale: 0.9 });
        gsap.set(badgeRef.current, { y: 20, opacity: 0 });
        gsap.set(actionsRef.current?.children, { y: 16, opacity: 0 });
      }
    } catch (e) {
      console.warn('SplitType error:', e);
    }

    return () => {
      splitTitle?.revert?.();
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (prefersReducedMotion()) {
      gsap.to([bgRef.current], { opacity: 0.85, duration: 0.5 });
      gsap.to([logoRef.current, badgeRef.current, titleRef.current, subtitleRef.current, actionsRef.current], { opacity: 1, duration: 0.5 });
      return;
    }

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
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.015, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.5"
        );
      } else {
        tl.to(titleRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      const subtitleLines = subtitleRef.current?.querySelectorAll('.hero-sub-line');
      if (subtitleLines?.length) {
        tl.to(subtitleLines,
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: "power2.out" },
          "-=0.4"
        );
      } else {
        tl.to(subtitleRef.current,
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      tl.to(actionsRef.current?.children,
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out", clearProps: "transform" },
        "-=0.45"
      );

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

    // Decorative glow follows the mouse. The text itself stays still:
    // tilting a headline while someone reads it is tiring, not premium.
    let handleMouseMove = null;
    if (hasFinePointer() && glowRef.current) {
      const glowX = gsap.quickTo(glowRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
      const glowY = gsap.quickTo(glowRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

      handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom < 0) return; // Hero is off-screen
        glowX(e.clientX - rect.left);
        glowY(e.clientY - rect.top);
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]);

  return (
    <section ref={heroRef} className="hero-section">
      <div ref={glowRef} className="hero-glow"></div>
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
        
        {/* Who we serve */}
        <div ref={badgeRef} className="hero-services-badge">
          <span className="badge-item studio-highlight">
            <MapPin size={14} className="badge-icon" /> Costa Rica · Pymes y empresas en LATAM
          </span>
        </div>

        <h1 ref={titleRef} className="hero-title">
          Más clientes por WhatsApp.<br/>
          <span className="text-glow">Menos horas en Excel.</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          <span className="hero-sub-line">
            Hacemos webs que venden, automatizamos reportes y procesos, y ajustamos precios en turismo.
          </span>
          <span className="hero-sub-line">
            Precio claro desde el inicio y soporte cada mes.
          </span>
        </p>

        <div ref={actionsRef} className="hero-actions">
          <a className="btn-primary hero-cta" {...whatsappLinkProps(MESSAGES.general)}>
            <WhatsAppIcon size={19} />
            <span>Agendar diagnóstico gratis</span>
          </a>
          <a
            href="#servicios"
            className="btn-secondary hero-cta-secondary"
            onClick={(e) => { e.preventDefault(); scrollToId('servicios'); }}
          >
            <span>Ver servicios y precios</span>
            <ArrowDown size={17} className="hero-cta-arrow" />
          </a>
          <p className="hero-reassurance">Llamada de 30 minutos · Sin compromiso</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

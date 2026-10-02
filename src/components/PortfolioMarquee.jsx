import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { prefersReducedMotion, hasFinePointer, smokeFrom, smokeTo, fadeUpFrom, fadeUpTo } from '../lib/motion';
import './PortfolioMarquee.css';

const projects = [
  { 
    name: 'Grúas Greivin', 
    img: '/Logos Proyectos finalizados/Gruas Greivin.jpeg',
    url: 'https://xcesar24x.github.io/Gr-as-Greivin-Garc-a-Ugalde/' 
  },
  { 
    name: 'Gym Aldenaire', 
    img: '/Logos Proyectos finalizados/Gym.png',
    url: null 
  },
  { 
    name: 'Mrs Jhons Barbier', 
    img: '/Logos Proyectos finalizados/Mrs Jhons Barbier.png',
    url: 'https://www.mrjohnsbarbier.com/' 
  },
  { 
    name: 'Oropendola', 
    img: '/Logos Proyectos finalizados/Oropendola.jpeg',
    url: 'https://xcesar24x.github.io/croropendola/' 
  },
  { 
    name: 'Sr & Sra Pinto', 
    img: '/Logos Proyectos finalizados/Logo BLanco Vertical.png',
    url: 'https://www.srysrapinto.com/' 
  },
  { 
    name: 'Cabañas del Bosque', 
    img: '/Logos Proyectos finalizados/cabañas del bosque.png',
    url: 'https://www.cabanasdelbosque.lat/' 
  },
  { 
    name: 'Ferretería La Herradura', 
    img: '/Logos Proyectos finalizados/Ferreteria La Herradura.jpeg',
    url: 'https://www.ferreterialaherraduracr.com/' 
  },
];

const PortfolioMarquee = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  
  useEffect(() => {
    let ticker = null;

    const ctx = gsap.context(() => {
      // Infinite smooth ticker
      ticker = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: prefersReducedMotion() ? 80 : 25,
        repeat: -1
      });

      // Advanced Smoke Condensation / Vapor Convergence on Title
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      });

      tl.fromTo('.portfolio-header h2', smokeFrom(), smokeTo())
        .fromTo('.portfolio-header p', fadeUpFrom(), fadeUpTo(), "-=0.5");
    }, sectionRef);

    // Ease the belt to a stop under the mouse so a card can actually be clicked,
    // then ease it back up. Tweening timeScale keeps it interruptible.
    const wrapper = marqueeRef.current?.parentElement;
    const slowDown = () => gsap.to(ticker, { timeScale: 0, duration: 0.6, ease: 'power2.out', overwrite: true });
    const speedUp = () => gsap.to(ticker, { timeScale: 1, duration: 0.8, ease: 'power2.in', overwrite: true });

    if (wrapper && hasFinePointer()) {
      wrapper.addEventListener('mouseenter', slowDown);
      wrapper.addEventListener('mouseleave', speedUp);
    }

    return () => {
      wrapper?.removeEventListener('mouseenter', slowDown);
      wrapper?.removeEventListener('mouseleave', speedUp);
      ctx.revert();
    };
  }, []);

  // Double the array for seamless looping
  const items = [...projects, ...projects];

  return (
    <section className="portfolio-section" id="proyectos" ref={sectionRef}>
      {/* Botanical Background (fondo4.png) with FAQ-style blend */}
      <div className="portfolio-bg-wrapper">
        <img 
          src="/fondo4.png" 
          alt="Fondo Botánico Proyectos Destacados" 
          className="portfolio-bg-img" 
          loading="lazy"
        />
        <div className="portfolio-bg-overlay"></div>
      </div>

      <div className="container portfolio-content">
        <div className="portfolio-header">
          <h2>Proyectos Destacados</h2>
          <p>Confían en nosotros para transformar su presencia digital</p>
        </div>
      </div>
      
      <div className="marquee-wrapper">
        <div className="marquee-track" ref={marqueeRef}>
          {items.map((project, index) => {
            const CardComponent = project.url ? 'a' : 'div';
            const cardProps = project.url 
              ? { 
                  href: project.url, 
                  target: '_blank', 
                  rel: 'noopener noreferrer',
                  title: `Visitar web de ${project.name}`
                } 
              : { title: 'Sitio web en desarrollo' };

            return (
              <CardComponent 
                className={`marquee-item glass-card ${project.url ? 'is-clickable' : 'is-static'}`} 
                key={index}
                {...cardProps}
              >
                <div className="img-container">
                  <img src={project.img} alt={project.name} />
                </div>
                <div className="project-footer">
                  <span className="project-name">{project.name}</span>
                  {project.url ? (
                    <span className="project-link-icon">
                      <ArrowUpRight size={16} />
                    </span>
                  ) : (
                    <span className="project-offline-badge">En desarrollo</span>
                  )}
                </div>
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioMarquee;

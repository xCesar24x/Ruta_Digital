import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PortfolioMarquee.css';

const projects = [
  { name: 'Grúas Greivin', img: '/Logos Proyectos finalizados/Gruas Greivin.jpeg' },
  { name: 'Gym', img: '/Logos Proyectos finalizados/Gym.png' },
  { name: 'Mrs Jhons Barbier', img: '/Logos Proyectos finalizados/Mrs Jhons Barbier.png' },
  { name: 'Oropendola', img: '/Logos Proyectos finalizados/Oropendola.jpeg' },
  { name: 'Sr & Sra Pinto', img: '/Logos Proyectos finalizados/SrySraPinto.png' },
  { name: 'Cabañas del Bosque', img: '/Logos Proyectos finalizados/cabañas del bosque.png' },
];

const PortfolioMarquee = () => {
  const marqueeRef = useRef(null);
  
  useEffect(() => {
    // We clone the elements to create a seamless infinite loop
    const marqueeContent = marqueeRef.current;
    
    // We animate the track
    gsap.to(marqueeContent, {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1
    });
  }, []);

  // Double the array for seamless looping
  const items = [...projects, ...projects];

  return (
    <section className="portfolio-section" id="proyectos">
      <div className="container">
        <div className="portfolio-header">
          <h2>Proyectos Destacados</h2>
          <p>Confían en nosotros para transformar su presencia digital</p>
        </div>
      </div>
      
      <div className="marquee-wrapper">
        <div className="marquee-track" ref={marqueeRef}>
          {items.map((project, index) => (
            <div className="marquee-item glass-card" key={index}>
              <div className="img-container">
                <img src={project.img} alt={project.name} />
              </div>
              <span className="project-name">{project.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioMarquee;

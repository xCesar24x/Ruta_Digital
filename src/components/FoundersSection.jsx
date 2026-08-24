import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, RotateCw, ArrowUpRight, Code, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';
import './FoundersSection.css';

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [
  {
    id: 'cesar',
    name: 'César Madrigal',
    role: 'Founder & CTO',
    experience: '+9 Años de Experiencia',
    focus: 'Ingeniería de Software, Arquitectura IA & Revenue Management',
    photo: '/Fotos Founders/Foto.jpeg',
    linkedin: 'https://www.linkedin.com/in/c%C3%A9sar-madrigal-rodr%C3%ADguez-3a23351b2',
    icon: Code,
    badgeText: 'Tech & Revenue Lead',
    bio: 'Con más de 9 años de trayectoria en ingeniería y estrategia digital, lidera la arquitectura de software, inteligencia artificial y modelos de Revenue Management en Ruta Digital. Especializado en diseñar infraestructuras escalables, automatizaciones de alto rendimiento y optimización de monetización para escalar la rentabilidad de las empresas.',
    skills: ['+9 Años de Trayectoria', 'Arquitectura Full-Stack', 'Inteligencia Artificial', 'Revenue Management', 'Automatización RPA & APIs', 'Sistemas a Medida']
  },
  {
    id: 'bryan',
    name: 'Bryan Víquez',
    role: 'Co-Founder & CFO',
    experience: '+9 Años de Experiencia',
    focus: 'Estrategia Financiera, Project Management & Operaciones',
    photo: '/Fotos Founders/fotoBryan.jpeg',
    linkedin: 'https://www.linkedin.com/in/bryanviquez/',
    icon: TrendingUp,
    badgeText: 'Finance & Project Lead',
    bio: 'Con más de 9 años de experiencia en gestión estratégica y dirección financiera, lidera la estructura de capital, control presupuestario y la dirección ágil de proyectos (Project Management) en Ruta Digital. Especialista en asegurar entregas impecables en tiempo y calidad (Agile/Scrum) con máxima disciplina financiera y operativa.',
    skills: ['+9 Años de Trayectoria', 'Project Management / Agile', 'Estrategia Financiera', 'Gestión de Presupuestos', 'Control Operativo & QA', 'Planificación Estratégica']
  }
];

const FoundersSection = () => {
  const sectionRef = useRef(null);
  const [flippedCards, setFlippedCards] = useState({ cesar: false, bryan: false });

  const toggleCard = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smoke condensation / vapor entrance on header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      });

      tl.fromTo('.founders-header-badge',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
      )
      .fromTo('.founders-title',
        { 
          opacity: 0, 
          letterSpacing: '0.18em', 
          filter: 'blur(18px) brightness(1.6)', 
          scale: 1.06, 
          y: 25 
        },
        { 
          opacity: 1, 
          letterSpacing: '-0.02em', 
          filter: 'blur(0px) brightness(1)', 
          scale: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out' 
        },
        "-=0.3"
      )
      .fromTo('.founders-subtitle',
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo('.founder-3d-card-wrapper',
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 0.8, ease: 'back.out(1.4)' },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="founders-section" id="liderazgo" ref={sectionRef}>
      <div className="ambient-glow-founders"></div>

      <div className="container founders-container">
        {/* Header */}
        <div className="founders-header">
          <div className="founders-header-badge">
            <Sparkles size={15} className="badge-sparkle" />
            <span>Liderazgo &amp; Visión</span>
          </div>
          <h2 className="founders-title">
            La mente y la estrategia <br />
            <span className="text-glow">detrás de cada solución.</span>
          </h2>
          <p className="founders-subtitle">
            Ingeniería de software de vanguardia, inteligencia artificial y gestión financiera lideradas directamente por sus fundadores para garantizar excelencia en cada entrega.
          </p>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="founders-grid">
          {FOUNDERS.map((founder) => {
            const isFlipped = flippedCards[founder.id];
            const IconComponent = founder.icon;

            return (
              <div 
                key={founder.id}
                className={`founder-3d-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
                onClick={() => toggleCard(founder.id)}
              >
                <div className="founder-3d-card-inner">
                  
                  {/* FRONT SIDE */}
                  <div className="founder-card-face founder-card-front">
                    {/* Botanical Background Texture */}
                    <div className="founder-card-bg-layer">
                      <img 
                        src="/fondo2tarjetas.png" 
                        alt="Fondo Botánico Helechos" 
                        className="founder-card-bg-img"
                        loading="lazy"
                      />
                      <div className="founder-card-bg-overlay"></div>
                    </div>

                    {/* Top Status & Role Pill */}
                    <div className="founder-front-top">
                      <div className="founder-badge-pill">
                        <IconComponent size={14} className="pill-icon" />
                        <span>{founder.badgeText}</span>
                      </div>
                      <button 
                        className="flip-hint-btn" 
                        title="Ver trayectoria y bio"
                        aria-label="Girar tarjeta"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(founder.id);
                        }}
                      >
                        <RotateCw size={14} />
                        <span className="flip-hint-text">Girar</span>
                      </button>
                    </div>

                    {/* Executive Photo with Glow Frame */}
                    <div className="founder-photo-container">
                      <div className="photo-glow-halo"></div>
                      <div className="photo-frame">
                        <img 
                          src={founder.photo} 
                          alt={`${founder.name} - ${founder.role}`} 
                          className="founder-img"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Founder Name, Role & Experience */}
                    <div className="founder-front-info">
                      <h3 className="founder-name">{founder.name}</h3>
                      <div className="founder-role-row">
                        <span className="founder-role-tag">{founder.role}</span>
                        <span className="founder-exp-pill">{founder.experience}</span>
                      </div>
                      <p className="founder-focus-text">{founder.focus}</p>
                    </div>

                    {/* Front Bottom Action Hint */}
                    <div className="founder-front-footer">
                      <span className="founder-touch-prompt">
                        <RotateCw size={13} className="spin-icon" />
                        <span>Toca para ver trayectoria y visión</span>
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="founder-card-face founder-card-back">
                    {/* Botanical Background Texture */}
                    <div className="founder-card-bg-layer">
                      <img 
                        src="/fondo2tarjetas.png" 
                        alt="Fondo Botánico Helechos" 
                        className="founder-card-bg-img"
                        loading="lazy"
                      />
                      <div className="founder-card-bg-overlay back-overlay"></div>
                    </div>

                    {/* Back Header */}
                    <div className="founder-back-header">
                      <div>
                        <h3 className="founder-back-name">{founder.name}</h3>
                        <span className="founder-back-role">{founder.role}</span>
                      </div>
                      <button 
                        className="flip-back-btn" 
                        title="Volver al frente"
                        aria-label="Volver al frente"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(founder.id);
                        }}
                      >
                        <RotateCw size={14} />
                      </button>
                    </div>

                    {/* Bio Story */}
                    <div className="founder-back-body custom-scrollbar">
                      <p className="founder-bio">{founder.bio}</p>

                      {/* Expertise Chips */}
                      <div className="founder-skills-block">
                        <span className="skills-heading">Áreas de Especialidad:</span>
                        <div className="skills-chips-wrapper">
                          {founder.skills.map((skill, idx) => (
                            <span key={idx} className="skill-chip">
                              <CheckCircle size={12} className="chip-check" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back Footer with Official LinkedIn Action */}
                    <div className="founder-back-footer">
                      <a 
                        href={founder.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="founder-linkedin-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>Conectar en LinkedIn</span>
                        <ArrowUpRight size={16} className="btn-arrow" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;

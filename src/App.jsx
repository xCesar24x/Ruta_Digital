import React, { useState, useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import InteractiveGalaxy from './components/InteractiveGalaxy';
import Portfolio from './components/Portfolio';
import AISimulator from './components/AISimulator';
import Calculator from './components/Calculator';
import { 
  Zap, TrendingUp, Database, Bot, Layout, CheckCircle, 
  Mail, MessageCircle, ArrowRight, Menu, X
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pymes');
  const [activeSubcatIndex, setActiveSubcatIndex] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  // Stats refs and states for animation
  const statsRef = useRef(null);
  const [stats, setStats] = useState({ proyectos: 0, eficiencia: 0, roi: 0 });

  // Unlock scroll after preloader completes
  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  // Scroll effect on Header
  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);

      // Section observer for active links
      const sections = ['inicio', 'portafolio', 'simulador', 'cotizador', 'nosotros', 'contacto'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Count-up animation for stats when scrolled into view
  useEffect(() => {
    if (loading || !statsRef.current) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          
          const duration = 2000; // 2s
          const startTime = performance.now();
          const targets = { proyectos: 17, eficiencia: 95, roi: 100 };

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            
            setStats({
              proyectos: Math.floor(progress * targets.proyectos),
              eficiencia: Math.floor(progress * targets.eficiencia),
              roi: Math.floor(progress * targets.roi)
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Handle click on a service star in the Galaxy
  const handleSelectService = (tab, subcatIndex) => {
    setActiveTab(tab);
    setActiveSubcatIndex(subcatIndex);

    // Scroll to portfolio section
    const portfolioSection = document.getElementById('portafolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Clear highlight after 2.5s
    setTimeout(() => {
      setActiveSubcatIndex(null);
    }, 2500);
  };

  // Adjust tooltip positioning to stay within viewport
  const getTooltipStyle = () => {
    if (!hoveredStar) return {};
    
    let posX = hoveredStar.x + 20;
    let posY = hoveredStar.y + 15;
    const tooltipWidth = 240;
    const tooltipHeight = 135;

    if (posX + tooltipWidth > window.innerWidth) {
      posX = hoveredStar.x - tooltipWidth - 25;
    }
    if (posY + tooltipHeight > window.innerHeight) {
      posY = hoveredStar.y - tooltipHeight - 15;
    }

    return {
      position: 'fixed',
      left: `${posX}px`,
      top: `${posY}px`,
      pointerEvents: 'none',
      zIndex: 1200,
      padding: '1.2rem',
      borderRadius: '12px',
      border: '1px solid rgba(0, 255, 170, 0.3)',
      background: 'rgba(10, 10, 10, 0.9)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 10px 30px rgba(0, 255, 170, 0.2)',
      width: `${tooltipWidth}px`,
      transition: 'opacity 0.2s ease',
      opacity: 1
    };
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" />

      {/* Nav Header */}
      <header style={{
        padding: headerScrolled ? '0.8rem 0' : '1.5rem 0',
        background: headerScrolled ? 'rgba(5, 5, 5, 0.95)' : 'rgba(5, 5, 5, 0.8)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <nav className="container">
          <div className="logo-container">
            <img src="/Ruta.png" alt="Ruta Digital Logo" className="nav-logo" style={{ maxHeight: '60px' }} />
          </div>
          <ul className="nav-links">
            <li>
              <a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#portafolio" className={activeSection === 'portafolio' ? 'active' : ''}>
                Portafolio
              </a>
            </li>
            <li>
              <a href="#simulador" className={activeSection === 'simulador' ? 'active' : ''}>
                Simulador IA
              </a>
            </li>
            <li>
              <a href="#cotizador" className={activeSection === 'cotizador' ? 'active' : ''}>
                Cotizador
              </a>
            </li>
            <li>
              <a href="#nosotros" className={activeSection === 'nosotros' ? 'active' : ''}>
                Nosotros
              </a>
            </li>
            <li>
              <a href="#contacto" className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                Contacto
              </a>
            </li>
          </ul>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
          <X className="w-8 h-8" />
        </button>
        <ul className="mobile-menu-links">
          <li>
            <a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#portafolio" className={activeSection === 'portafolio' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Portafolio
            </a>
          </li>
          <li>
            <a href="#simulador" className={activeSection === 'simulador' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Simulador IA
            </a>
          </li>
          <li>
            <a href="#cotizador" className={activeSection === 'cotizador' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Cotizador
            </a>
          </li>
          <li>
            <a href="#nosotros" className={activeSection === 'nosotros' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Nosotros
            </a>
          </li>
          <li>
            <a href="#contacto" className="btn-primary" style={{ padding: '0.8rem 2rem' }} onClick={() => setMenuOpen(false)}>
              Contacto
            </a>
          </li>
        </ul>
      </div>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <InteractiveGalaxy 
            onSelectService={handleSelectService} 
            onHoverStar={setHoveredStar} 
          />
          
          <div className="hero-bg">
            <div className="glow" />
            <div className="grid-overlay" />
          </div>
          
          <div className="container hero-content">
            <div className="hero-text-area" style={{ pointerEvents: 'auto', zIndex: 10 }}>
              <span className="badge">Impulsando el Futuro Digital</span>
              <h1>Digitalizamos tu negocio con <span className="text-gradient">Inteligencia Artificial</span></h1>
              <p>Modernizamos tu operación y automatizamos tu tiempo. Tu negocio merece operar de forma eficiente y autónoma. Diseñamos ecosistemas digitales a la medida.</p>
              <div className="hero-btns">
                <a href="https://wa.me/50684349442" target="_blank" rel="noopener noreferrer" className="btn-main">
                  ¿Cómo podemos ayudarte hoy?
                  <MessageCircle className="w-5 h-5 ml-2" />
                </a>
                <a href="#portafolio" className="btn-secondary">
                  Portafolio de Servicios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <div className="social-proof text-center">
          <p>Empoderando la transformación digital de <strong>+17 empresas rentables</strong></p>
        </div>

        {/* Impact Marquee */}
        <div className="marquee-wrapper">
          <div className="marquee">
            <div className="marquee-content">
              <span><Zap className="w-4 h-4 text-[#00ffaa] inline mr-1" /> +Eficiencia Operativa</span>
              <span><TrendingUp className="w-4 h-4 text-[#00ffaa] inline mr-1" /> Optimización de Revenue</span>
              <span><Database className="w-4 h-4 text-[#00ffaa] inline mr-1" /> Modelado BigQuery</span>
              <span><Bot className="w-4 h-4 text-[#00ffaa] inline mr-1" /> Automatización End-to-End</span>
              <span><Layout className="w-4 h-4 text-[#00ffaa] inline mr-1" /> UI/UX Premium</span>
              <span><Zap className="w-4 h-4 text-[#00ffaa] inline mr-1" /> +Eficiencia Operativa</span>
              <span><TrendingUp className="w-4 h-4 text-[#00ffaa] inline mr-1" /> Optimización de Revenue</span>
              <span><Database className="w-4 h-4 text-[#00ffaa] inline mr-1" /> Modelado BigQuery</span>
              <span><Bot className="w-4 h-4 text-[#00ffaa] inline mr-1" /> Automatización End-to-End</span>
              <span><Layout className="w-4 h-4 text-[#00ffaa] inline mr-1" /> UI/UX Premium</span>
            </div>
          </div>
        </div>

        <div className="cosmic-divider">
          <div className="core" />
        </div>

        {/* Portfolio Section */}
        <Portfolio 
          activeSubcatIndex={activeSubcatIndex} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <div className="cosmic-divider">
          <div className="core" />
        </div>

        {/* AI Simulator Section */}
        <AISimulator />

        <div className="cosmic-divider">
          <div className="core" />
        </div>

        {/* Calculator Section */}
        <Calculator />

        <div className="cosmic-divider">
          <div className="core" />
        </div>

        {/* About Section */}
        <section id="nosotros" className="about">
          <div className="container about-flex">
            <div className="about-image">
              <div className="image-wrapper profile-glow">
                <img src="/hero.png" alt="Ruta Digital" id="about-img" />
              </div>
            </div>
            <div className="about-content">
              <h2>Ruta Digital: <span className="text-gradient">Tu Socio Estratégico</span></h2>
              <p>Somos una consultora de innovación tecnológica. Fusionamos el rigor del análisis de datos y la inteligencia de procesos con el poder de la Inteligencia Artificial y el desarrollo de software premium. No construimos herramientas genéricas; diseñamos ecosistemas a medida que optimizan operaciones y digitalizan de punta a punta tu empresa.</p>
              <ul className="check-list">
                <li><CheckCircle className="w-5 h-5 text-[#00ffaa] inline mr-2" /> Dominio en IA & Automatización End-to-End</li>
                <li><CheckCircle className="w-5 h-5 text-[#00ffaa] inline mr-2" /> Ecosistemas Web Premium & UX/UI</li>
                <li><CheckCircle className="w-5 h-5 text-[#00ffaa] inline mr-2" /> Business Intelligence & Revenue Management</li>
              </ul>
              
              {/* Animated statistics counters */}
              <div className="stats-grid" ref={statsRef}>
                <div className="stat-item">
                  <div className="stat-number">{stats.proyectos}+</div>
                  <div className="stat-label">Proyectos Exitosos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.eficiencia}%</div>
                  <div className="stat-label">Aumento en Eficiencia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.roi}%</div>
                  <div className="stat-label">Enfoque en ROI</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Contact Section */}
      <footer id="contacto">
        <div className="container footer-content">
          <div className="footer-info">
            <img src="/Ruta.png" alt="Ruta Digital" className="footer-logo" style={{ maxHeight: '60px' }} />
            <p>Llevando negocios al mundo digital desde 2026.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/rutadigitalcr/" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/césar-madrigal-rodríguez-3a23351b2" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <h3>¿Listo para despegar?</h3>
            <p>Escríbenos o llámanos para hacer realidad tu proyecto.</p>
            <div className="contact-details">
              <a href="mailto:rutadigitalcr@outlook.com" className="contact-link">
                <Mail className="w-4 h-4 mr-2" /> rutadigitalcr@outlook.com
              </a>
              <a href="https://wa.me/50684349442" target="_blank" rel="noopener noreferrer" className="contact-link">
                <MessageCircle className="w-4 h-4 mr-2" /> +506 84349442
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ruta Digital. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Floating Interactive Tooltip */}
      {hoveredStar && (
        <div className="galaxy-tooltip" style={getTooltipStyle()}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00ffaa', fontWeight: 700, marginBottom: '0.3rem' }}>
            Servicio Premium
          </div>
          <h4 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#ffffff', fontWeight: 700 }}>
            {hoveredStar.name}
          </h4>
          <p style={{ margin: '0.5rem 0 0.7rem 0', fontSize: '0.8rem', color: '#a0a0a0', lineHeight: 1.4 }}>
            {hoveredStar.desc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>Estimación</span>
            <span className="text-gradient" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.98rem', fontWeight: 700 }}>
              Desde {hoveredStar.price}
            </span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#00ffaa', textAlign: 'right', marginTop: '0.5rem', fontWeight: 600 }}>
            ⚡ Clic para explorar
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X, Sparkles, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Main Floating Navbar */}
      <nav className={`main-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container container">

          {/* Desktop Nav Links */}
          <div className="nav-menu desktop-menu">
            <div 
              className="nav-item dropdown-trigger"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button 
                className="nav-link dropdown-btn"
                onClick={() => setServicesDropdown(!servicesDropdown)}
                aria-expanded={servicesDropdown}
              >
                Servicios <ChevronDown size={14} className={`chevron ${servicesDropdown ? 'open' : ''}`} />
              </button>

              <div className={`nav-dropdown ${servicesDropdown ? 'show' : ''}`}>
                <a href="#servicios" onClick={() => scrollToSection('servicios')} className="dropdown-item">
                  <div className="dropdown-item-title">Panel de Control & Dashboards</div>
                  <div className="dropdown-item-desc">Métricas y analítica en tiempo real para tu negocio</div>
                </a>
                <a href="#servicios" onClick={() => scrollToSection('servicios')} className="dropdown-item">
                  <div className="dropdown-item-title">Automatización con IA</div>
                  <div className="dropdown-item-desc">Workflows inteligentes y optimización de tareas repetitivas</div>
                </a>
                <a href="#servicios" onClick={() => scrollToSection('servicios')} className="dropdown-item">
                  <div className="dropdown-item-title">Desarrollo Web de Alto Impacto</div>
                  <div className="dropdown-item-desc">Plataformas ultra rápidas, modernas y escalables</div>
                </a>
              </div>
            </div>

            <a href="#proyectos" onClick={() => scrollToSection('proyectos')} className="nav-link">
              Proyectos
            </a>
            <a href="#servicios" onClick={() => scrollToSection('servicios')} className="nav-link">
              Soluciones IA
            </a>
            <a href="#faq" onClick={() => scrollToSection('faq')} className="nav-link">
              Preguntas
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="nav-actions desktop-actions">
            <button 
              className="client-portal-btn"
              onClick={() => alert('El Panel de Clientes estará disponible muy pronto.')}
              title="Panel de Control para Clientes"
            >
              <User size={15} />
              <span>Portal Clientes</span>
            </button>

            <a href="#contacto" onClick={() => scrollToSection('contacto')} className="nav-cta-btn">
              <span>Iniciar Proyecto</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-menu glass-card">
            <a href="#servicios" onClick={() => scrollToSection('servicios')} className="mobile-nav-link">
              Servicios
            </a>
            <a href="#proyectos" onClick={() => scrollToSection('proyectos')} className="mobile-nav-link">
              Proyectos
            </a>
            <a href="#servicios" onClick={() => scrollToSection('servicios')} className="mobile-nav-link">
              Automatización IA
            </a>
            <a href="#faq" onClick={() => scrollToSection('faq')} className="mobile-nav-link">
              Preguntas Frecuentes
            </a>

            <div className="mobile-actions">
              <button 
                className="client-portal-btn mobile-portal-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  alert('El Panel de Clientes estará disponible muy pronto.');
                }}
              >
                <User size={16} />
                <span>Portal Clientes</span>
              </button>

              <a 
                href="#contacto" 
                onClick={() => scrollToSection('contacto')} 
                className="btn-primary mobile-cta-btn"
              >
                Iniciar Proyecto <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

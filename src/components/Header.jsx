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

  const selectServiceCategory = (cat) => {
    window.dispatchEvent(new CustomEvent('select-service-category', { detail: cat }));
    scrollToSection('servicios');
    setServicesDropdown(false);
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
                <a 
                  href="#servicios" 
                  onClick={(e) => { e.preventDefault(); selectServiceCategory('web'); }} 
                  className="dropdown-item"
                >
                  <div className="dropdown-item-title">Desarrollo &amp; Ecosistemas Digitales</div>
                  <div className="dropdown-item-desc">Web Apps, Software a Medida, Landing Pages, UI/UX y Branding</div>
                </a>
                <a 
                  href="#servicios" 
                  onClick={(e) => { e.preventDefault(); selectServiceCategory('ai'); }} 
                  className="dropdown-item"
                >
                  <div className="dropdown-item-title">Automatización &amp; IA</div>
                  <div className="dropdown-item-desc">RPA, Workflows Inteligentes y Capacitaciones Corporativas en IA</div>
                </a>
                <a 
                  href="#servicios" 
                  onClick={(e) => { e.preventDefault(); selectServiceCategory('data'); }} 
                  className="dropdown-item"
                >
                  <div className="dropdown-item-title">Estrategia, Datos &amp; Revenue</div>
                  <div className="dropdown-item-desc">Revenue Management, Business Intelligence y Dashboards en Vivo</div>
                </a>
              </div>
            </div>

            <a href="#proyectos" onClick={() => scrollToSection('proyectos')} className="nav-link">
              Proyectos
            </a>
            <a href="#faq" onClick={() => scrollToSection('faq')} className="nav-link">
              Preguntas Frecuentes
            </a>
            <a href="#contacto" onClick={() => scrollToSection('contacto')} className="nav-link">
              Contacto
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

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar menú de navegación móvil"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-menu container">
            <div className="mobile-nav-links">
              <a href="#servicios" onClick={() => scrollToSection('servicios')} className="mobile-nav-link">
                <span>Servicios</span>
                <ChevronDown size={14} className="mobile-link-chevron" />
              </a>
              <a href="#proyectos" onClick={() => scrollToSection('proyectos')} className="mobile-nav-link">
                <span>Proyectos</span>
                <ChevronDown size={14} className="mobile-link-chevron" />
              </a>
              <a href="#faq" onClick={() => scrollToSection('faq')} className="mobile-nav-link">
                <span>Preguntas Frecuentes</span>
                <ChevronDown size={14} className="mobile-link-chevron" />
              </a>
              <a href="#contacto" onClick={() => scrollToSection('contacto')} className="mobile-nav-link">
                <span>Contacto</span>
                <ChevronDown size={14} className="mobile-link-chevron" />
              </a>
            </div>

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
                <span>Iniciar Proyecto</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

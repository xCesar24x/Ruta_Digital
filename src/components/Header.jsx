import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X, User } from 'lucide-react';
import { openBooking, scrollToId } from '../lib/motion';
import './Header.css';

// "Coming soon" feedback inline instead of a blocking alert():
// the label crossfades (with a touch of blur) and returns on its own.
const PortalButton = ({ className = '', iconSize = 15 }) => {
  const [isSoon, setIsSoon] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleClick = () => {
    setIsSoon(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsSoon(false), 1800);
  };

  return (
    <button
      type="button"
      className={`client-portal-btn ${isSoon ? 'is-soon' : ''} ${className}`}
      onClick={handleClick}
      title="Panel de Control para Clientes"
    >
      <User size={iconSize} />
      <span className="portal-label-stack">
        <span className="portal-label portal-label-default">Portal Clientes</span>
        <span className="portal-label portal-label-soon" aria-hidden="true">Muy pronto</span>
      </span>
      <span className="sr-only" aria-live="polite">
        {isSoon ? 'El portal de clientes estará disponible muy pronto' : ''}
      </span>
    </button>
  );
};

const NAV_LINKS = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'liderazgo', label: 'Liderazgo' },
  { id: 'faq', label: 'Preguntas Frecuentes' },
  { id: 'contacto', label: 'Contacto' },
];

const SERVICE_LINKS = [
  { cat: 'web', title: 'Desarrollo & Ecosistemas Digitales', desc: 'Web Apps, Software a Medida, Landing Pages, UI/UX y Branding' },
  { cat: 'ai', title: 'Automatización & IA', desc: 'RPA, Workflows Inteligentes y Capacitaciones Corporativas en IA' },
  { cat: 'data', title: 'Estrategia, Datos & Revenue', desc: 'Revenue Management, Business Intelligence y Dashboards en Vivo' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!servicesDropdown && !mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setServicesDropdown(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [servicesDropdown, mobileMenuOpen]);

  const scrollToSection = (e, id) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    scrollToId(id);
  };

  const selectServiceCategory = (e, cat) => {
    window.dispatchEvent(new CustomEvent('select-service-category', { detail: cat }));
    scrollToSection(e, 'servicios');
  };

  const handleOpenBooking = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    openBooking();
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
                aria-haspopup="true"
              >
                Servicios <ChevronDown size={14} className={`chevron ${servicesDropdown ? 'open' : ''}`} />
              </button>

              <div className={`nav-dropdown ${servicesDropdown ? 'show' : ''}`}>
                {SERVICE_LINKS.map((service) => (
                  <a 
                    key={service.cat}
                    href="#servicios" 
                    onClick={(e) => selectServiceCategory(e, service.cat)} 
                    className="dropdown-item"
                    tabIndex={servicesDropdown ? 0 : -1}
                  >
                    <div className="dropdown-item-title">{service.title}</div>
                    <div className="dropdown-item-desc">{service.desc}</div>
                  </a>
                ))}
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="nav-actions desktop-actions">
            <PortalButton />

            <button 
              type="button" 
              onClick={handleOpenBooking} 
              className="nav-cta-btn"
            >
              <span>Iniciar Proyecto</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-menu container">
            <div className="mobile-nav-links">
              {[{ id: 'servicios', label: 'Servicios' }, ...NAV_LINKS].map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)} className="mobile-nav-link">
                  <span>{link.label}</span>
                  <ChevronDown size={14} className="mobile-link-chevron" />
                </a>
              ))}
            </div>

            <div className="mobile-actions">
              <PortalButton className="mobile-portal-btn" iconSize={16} />

              <button 
                type="button" 
                onClick={handleOpenBooking} 
                className="btn-primary mobile-cta-btn"
              >
                <span>Iniciar Proyecto</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

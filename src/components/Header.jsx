import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { scrollToId } from '../lib/motion';
import { whatsappLinkProps } from '../lib/whatsapp';
import { OFFERS, VISIBLE_CASES, MESSAGES } from '../content/site';
import WhatsAppIcon from './WhatsAppIcon';
import './Header.css';

const NAV_LINKS = [
  ...(VISIBLE_CASES.length ? [{ id: 'casos', label: 'Casos' }] : []),
  { id: 'planes', label: 'Planes' },
  { id: 'liderazgo', label: 'Equipo' },
  { id: 'faq', label: 'Preguntas' },
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
                {OFFERS.map((offer) => (
                  <a
                    key={offer.id}
                    href={`#${offer.id}`}
                    onClick={(e) => scrollToSection(e, offer.id)}
                    className="dropdown-item"
                    tabIndex={servicesDropdown ? 0 : -1}
                  >
                    <div className="dropdown-item-title">{offer.title}</div>
                    <div className="dropdown-item-desc">{offer.navHint}</div>
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

          {/* Right Action */}
          <div className="nav-actions desktop-actions">
            <a className="nav-cta-btn" {...whatsappLinkProps(MESSAGES.general)}>
              <WhatsAppIcon size={15} />
              <span>Diagnóstico gratis</span>
            </a>
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
              {[{ id: 'servicios', label: 'Servicios y precios' }, ...NAV_LINKS].map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)} className="mobile-nav-link">
                  <span>{link.label}</span>
                  <ChevronDown size={14} className="mobile-link-chevron" />
                </a>
              ))}
            </div>

            <div className="mobile-actions">
              <a
                className="btn-primary mobile-cta-btn"
                {...whatsappLinkProps(MESSAGES.general)}
                onClick={() => setMobileMenuOpen(false)}
              >
                <WhatsAppIcon size={17} />
                <span>Agendar diagnóstico gratis</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

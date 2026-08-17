import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import LegalModal from './LegalModal';
import './FooterCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FooterCTA = () => {
  const containerRef = useRef(null);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'terminos' });

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  const openModal = (e, type) => {
    e.preventDefault();
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <footer ref={containerRef} className="footer-section">
        <div className="footer-top-cta">
          <div className="container">
            <div className="cta-banner glass-card">
              <div className="cta-content">
                <h2>¿Listo para llevar tu negocio al siguiente nivel?</h2>
                <p>Agenda una asesoría gratuita y descubre cómo la IA puede transformar tu operación.</p>
              </div>
              <a href="mailto:contacto@rutadigital.lat" className="btn-primary">
                Agendar Asesoría <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="container footer-grid">
            
            <div className="footer-col brand-col">
              <img src="/logo.png" alt="Ruta Digital Logo" className="footer-logo" />
              <p className="brand-desc">
                Digitalizamos tu empresa y automatizamos tu tiempo con ecosistemas a medida e IA de última generación.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Navegación</h3>
              <ul className="footer-links">
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#proyectos">Proyectos</a></li>
                <li><a href="#faq">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><a href="#terminos" onClick={(e) => openModal(e, 'terminos')}>Términos y Condiciones</a></li>
                <li><a href="#confidencialidad" onClick={(e) => openModal(e, 'confidencialidad')}>Confidencialidad</a></li>
              </ul>
            </div>

            <div className="footer-col contact-col">
              <h3>Contacto</h3>
              <ul className="contact-info">
                <li>
                  <Mail size={18} className="c-icon" />
                  <a href="mailto:contacto@rutadigital.lat">contacto@rutadigital.lat</a>
                </li>
                <li>
                  <Phone size={18} className="c-icon" />
                  <a href="tel:+50684349442">+506 8434 9442</a>
                </li>
                <li>
                  <MapPin size={18} className="c-icon" />
                  <span>Costa Rica</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Ruta Digital. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={modalState.isOpen} 
        type={modalState.type} 
        onClose={closeModal} 
      />
    </>
  );
};

export default FooterCTA;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import LegalModal from './LegalModal';
import BookingModal from './BookingModal';
import './FooterCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FooterCTA = () => {
  const containerRef = useRef(null);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'terminos' });
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener('open-booking-modal', handleOpenBooking);
    return () => window.removeEventListener('open-booking-modal', handleOpenBooking);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA Banner & Title Smoke Condensation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          once: true
        }
      });

      tl.fromTo('.cta-banner', 
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo('.cta-content h2',
        { 
          opacity: 0, 
          letterSpacing: '0.2em', 
          filter: 'blur(18px) brightness(1.6)', 
          scale: 1.06, 
          y: 20 
        },
        { 
          opacity: 1, 
          letterSpacing: '-0.02em', 
          filter: 'blur(0px) brightness(1)', 
          scale: 1, 
          y: 0, 
          duration: 1.25, 
          ease: 'power3.out' 
        },
        "-=0.4"
      )
      .fromTo('.cta-content p',
        { opacity: 0, y: 15, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo('.cta-banner .btn-primary',
        { opacity: 0, scale: 0.92, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
        "-=0.4"
      );

      // Clean direct entrance for bottom footer columns
      gsap.fromTo('.footer-col', 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
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
      <footer ref={containerRef} className="footer-section" id="contacto">
        <div className="footer-top-cta">
          <div className="container">
            <div className="cta-banner glass-card">
              <div className="cta-content">
                <h2>¿Listo para llevar tu negocio al siguiente nivel?</h2>
                <p>Agenda una asesoría gratuita y descubre cómo la tecnología y la IA pueden transformar tu operación.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="btn-primary"
              >
                Agendar Asesoría <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="container footer-grid">
            
            <div className="footer-col brand-col">
              <img src="/logo.png" alt="Ruta Digital Logo" className="footer-logo" />
              <p className="brand-desc">
                Diseñamos plataformas web de alto impacto y automatizamos tu operación. Soluciones digitales a medida para escalar tu presencia y eficiencia.
              </p>
              <div className="social-links">
                <a 
                  href="https://www.instagram.com/rutadigitalcr/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon social-instagram" 
                  aria-label="Instagram"
                >
                  {/* Official Instagram Vector */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/ruta-digital-cr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon social-linkedin" 
                  aria-label="LinkedIn"
                >
                  {/* Official LinkedIn Vector */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/message/6TVSDVQC5DPFC1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon social-whatsapp" 
                  aria-label="WhatsApp"
                >
                  {/* Official WhatsApp Vector */}
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.658zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Navegación</h3>
              <ul className="footer-links">
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#proyectos">Proyectos</a></li>
                <li><a href="#liderazgo">Liderazgo</a></li>
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
                  <a href="mailto:rutadigitalcr@outlook.com">rutadigitalcr@outlook.com</a>
                </li>
                <li>
                  <Phone size={18} className="c-icon" />
                  <a href="https://wa.me/message/6TVSDVQC5DPFC1" target="_blank" rel="noopener noreferrer">WhatsApp Directo</a>
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

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
};

export default FooterCTA;

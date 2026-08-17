import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import './FooterCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FooterCTA = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // We can add simple fade-in for the whole footer
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

  return (
    <footer ref={containerRef} className="footer-section">
      {/* Top CTA Banner */}
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

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          <div className="footer-col brand-col">
            <img src="/logo.png" alt="Ruta Digital Logo" className="footer-logo" />
            <p className="brand-desc">
              Digitalizamos tu empresa y automatizamos tu tiempo con ecosistemas a medida e IA de última generación.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
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
              <li><a href="#terminos">Términos y Condiciones</a></li>
              <li><a href="#confidencialidad">Confidencialidad</a></li>
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
  );
};

export default FooterCTA;

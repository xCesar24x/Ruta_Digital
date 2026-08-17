import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';
import './FooterCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FooterCTA = () => {
  const containerRef = useRef(null);
  const qrRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Fade in QR and content on scroll
    gsap.fromTo(
      [contentRef.current, qrRef.current],
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
    
    // Add floating animation to QR
    gsap.to(qrRef.current, {
      y: -15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <footer ref={containerRef} className="footer-cta section">
      <div className="container footer-content-grid">
        
        <div ref={contentRef} className="footer-info">
          <h2>¿Listo para dar el siguiente paso?</h2>
          <p>Escanea el código para conectarte con nosotros o utiliza los siguientes canales de contacto.</p>
          
          <ul className="contact-list">
            <li>
              <Mail className="contact-icon" />
              <span>contacto@rutadigital.lat</span>
            </li>
            <li>
              <Phone className="contact-icon" />
              <span>+506 8434 9442</span>
            </li>
            <li>
              <MapPin className="contact-icon" />
              <span>Costa Rica</span>
            </li>
          </ul>
          
          <button className="cta-btn">Agendar Asesoría</button>
        </div>

        <div ref={qrRef} className="qr-container">
          <div className="qr-card">
            <img src="/QR/QR Ruta.png" alt="Código QR de Ruta Digital" className="qr-img" onError={(e) => {
              // Fallback if the folder structure is different
              e.target.src = "/logo.png";
            }} />
            <div className="qr-glow"></div>
          </div>
          <span className="qr-label">Escanea para conectar</span>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ruta Digital. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default FooterCTA;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import './LegalModal.css';

const LegalModal = ({ isOpen, type, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.3 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose });
  };

  const content = {
    terminos: {
      title: "Términos y Condiciones",
      body: (
        <>
          <p>Última actualización: Agosto 2026</p>
          <h4>1. Servicios</h4>
          <p>Ruta Digital se especializa en consultoría de transformación digital, desarrollo web premium y automatización con Inteligencia Artificial. Los entregables, plazos y costos de cada proyecto se definen explícitamente en una propuesta comercial única para cada cliente.</p>
          
          <h4>2. Propiedad Intelectual</h4>
          <p>Todo el código fuente, diseños, y agentes de IA desarrollados son propiedad de Ruta Digital hasta que el cliente haya liquidado el 100% de los honorarios acordados. Una vez pagado, los derechos de explotación se transfieren al cliente, manteniendo Ruta Digital el derecho de usar el proyecto en su portafolio.</p>

          <h4>3. Garantía y Soporte</h4>
          <p>Ofrecemos una garantía técnica de 30 días posteriores al lanzamiento para resolver cualquier *bug* o error imprevisto. El soporte continuo o evolución del sistema se rige bajo pólizas de mantenimiento mensuales independientes.</p>

          <h4>4. Limitación de Responsabilidad</h4>
          <p>Ruta Digital no se hace responsable por caídas de servidores de terceros (ej. AWS, Vercel), fallos en APIs externas (ej. OpenAI), ni por la pérdida de datos derivada del mal uso del software por parte del cliente o sus empleados.</p>
        </>
      )
    },
    confidencialidad: {
      title: "Política de Confidencialidad",
      body: (
        <>
          <p>Última actualización: Agosto 2026</p>
          <h4>1. Protección de tu Información Comercial</h4>
          <p>Entendemos que al digitalizar tu empresa, nos confías datos críticos. Nos comprometemos a mantener la más estricta confidencialidad sobre todas las bases de datos, flujos de ingresos, métricas y secretos comerciales a los que tengamos acceso.</p>
          
          <h4>2. Uso de Datos para Inteligencia Artificial</h4>
          <p>Cuando entrenamos modelos de Inteligencia Artificial para tu negocio, utilizamos entornos cerrados y seguros. Tus datos empresariales **no** se utilizarán para entrenar modelos públicos ni se compartirán con terceros sin tu consentimiento expreso.</p>

          <h4>3. Acuerdos de No Divulgación (NDA)</h4>
          <p>Estamos abiertos y dispuestos a firmar Acuerdos de No Divulgación (NDA) formales antes de iniciar cualquier auditoría técnica o revisión de tu infraestructura actual.</p>

          <h4>4. Seguridad Estructural</h4>
          <p>Implementamos estándares de encriptación y mejores prácticas de la industria en todos los desarrollos web y paneles de control (Dashboards) para proteger la integridad de tus plataformas contra accesos no autorizados.</p>
        </>
      )
    }
  };

  const currentContent = content[type] || content.terminos;

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="modal-container glass-card" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>{currentContent.title}</h2>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Cerrar modal">
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body custom-scrollbar">
          {currentContent.body}
        </div>
        
      </div>
    </div>
  );
};

export default LegalModal;

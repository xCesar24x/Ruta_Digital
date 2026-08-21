import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import './FAQSection.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    tag: "Conversión",
    question: "Mi sitio web actual recibe visitas, pero casi nadie compra o deja sus datos. ¿Cómo solucionan esto?",
    answer: "El problema no es tu tráfico, es cómo el cerebro de tu usuario procesa la información al llegar. Nuestro servicio de Landing Pages enfocadas en Conversión elimina las distracciones visuales y reduce la fricción cognitiva. Estructuramos la información estratégicamente para guiar al usuario de forma natural y persuasiva hacia el botón de compra o contacto, transformando clics perdidos en clientes reales y maximizando el retorno de tu inversión publicitaria."
  },
  {
    tag: "Custom Core",
    question: "¿Debería adaptar mi empresa a un software comercial o invertir en un Software a Medida?",
    answer: "Los softwares genéricos te obligan a pagar por funciones que no usas y a modificar tus procesos para encajar en ellos, lo que genera cuellos de botella. Desarrollar un Software a Medida (Custom Core) significa construir una herramienta que se adapta al ADN exacto de tu negocio. Es una inversión inteligente que escala contigo sin licencias costosas, dándote control total, mayor seguridad y una ventaja operativa injusta frente a tu competencia."
  },
  {
    tag: "User Experience",
    question: "¿Por qué el Diseño UI/UX es tan importante si mi aplicación o web ya funciona técnicamente bien?",
    answer: "Porque a las personas no les gusta pensar demasiado ni sentirse frustradas. Si un sistema es difícil de usar, el usuario abandona y se va con la competencia. Nuestro enfoque en Diseño UI/UX (User Experience) se basa en entender la psicología de tu cliente. Creamos interfaces intuitivas y atractivas que generan placer visual y facilidad de uso, lo que se traduce directamente en mayor retención, fidelización y aumento de ventas."
  },
  {
    tag: "RPA & Bots",
    question: "Siento que mi equipo pierde demasiadas horas al día en tareas manuales y repetitivas. ¿Cómo me ayuda la automatización?",
    answer: "El trabajo manual repetitivo agota la energía de tu talento, genera errores costosos y frena tu crecimiento. Con la Automatización de Procesos (RPA & Bots), delegamos esas tareas mecánicas a sistemas inteligentes que trabajan 24/7 sin margen de error. Esto no solo reduce tus costos operativos drásticamente, sino que libera a tu equipo para que se enfoque en lo que realmente importa: la estrategia, la innovación y el cierre de ventas."
  },
  {
    tag: "Identidad",
    question: "Ya tengo un logotipo diseñado, ¿por qué necesitaría un servicio de Branding Digital?",
    answer: "Un logotipo es solo una imagen, pero una marca es una emoción y una promesa. En un mercado saturado, el cerebro del consumidor elige en milisegundos en quién confiar. Nuestro servicio de Branding Digital (Identidad) construye una presencia sólida, coherente y magnética en el entorno digital. Elevamos la percepción de valor de tu negocio, permitiéndote dejar de competir por precio y empezar a competir por autoridad y confianza."
  },
  {
    tag: "Agile Delivery",
    question: "He tenido malas experiencias con proyectos tecnológicos que se retrasan o salen del presupuesto. ¿Cómo garantizan los resultados?",
    answer: "Entendemos tu frustración, el caos y la incertidumbre son los mayores enemigos de cualquier proyecto. Por eso aplicamos un estricto Project Management (Agile Delivery). Fragmentamos el trabajo en entregas cortas (sprints) para que tengas visibilidad total del avance desde el día uno. Este enfoque ágil nos permite adaptarnos a los cambios rápidamente, minimizar riesgos y garantizar que el proyecto se entregue a tiempo, dentro del presupuesto y sin sorpresas."
  },
  {
    tag: "Crecimiento",
    question: "¿Qué es exactamente el Revenue Management y cómo impactará en las ganancias de mi empresa?",
    answer: "Es la ciencia de dejar de perder dinero que no sabías que estabas perdiendo. El Revenue Management (Crecimiento) consiste en estrategias para vender el producto correcto, al cliente correcto, en el momento exacto y al precio óptimo. Analizamos el comportamiento de tu demanda para optimizar tus precios y disponibilidad, maximizando tu rentabilidad y acelerando tu crecimiento sin necesidad de aumentar tus costos fijos."
  },
  {
    tag: "Analytics",
    question: "Mi empresa genera muchos datos todos los días, pero no sabemos cómo interpretarlos para tomar decisiones. ¿Qué solución ofrecen?",
    answer: "Tomar decisiones basadas en la intuición en la era digital es un riesgo muy alto. Con nuestro servicio de Análisis de Datos & BI (Analytics), tomamos toda esa información caótica y la transformamos en respuestas claras. A través de Visual Management y Dashboards fáciles de leer, te mostramos exactamente dónde están tus oportunidades de oro y tus fugas de capital, dándote el poder y la seguridad para tomar decisiones estratégicas que disparen tus ingresos."
  }
];

const FAQSection = () => {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced Smoke Condensation / Vapor Convergence on Title
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      });

      tl.fromTo('.faq-header h2',
        { 
          opacity: 0, 
          letterSpacing: '0.22em', 
          filter: 'blur(18px) brightness(1.6)', 
          scale: 1.08, 
          y: 25 
        },
        { 
          opacity: 1, 
          letterSpacing: '-0.02em', 
          filter: 'blur(0px) brightness(1)', 
          scale: 1, 
          y: 0, 
          duration: 1.25, 
          ease: 'power3.out' 
        }
      )
      .fromTo('.faq-header p',
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      {/* Botanical Background */}
      <div className="faq-bg-wrapper">
        <img 
          src="/fondopreguntas.png" 
          alt="Fondo Botánico Preguntas Frecuentes" 
          className="faq-bg-img" 
          loading="lazy"
        />
        <div className="faq-bg-overlay"></div>
      </div>

      <div className="container">
        <div className="faq-header">
          <h2>Preguntas Frecuentes</h2>
          <p>Todo lo que necesitas saber antes de dar el siguiente paso hacia la transformación digital de tu empresa.</p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <div className="faq-question-title-group">
                    <span className="faq-tag-badge">{faq.tag}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <ChevronDown className={`faq-icon ${isOpen ? 'rotated' : ''}`} size={22} />
                </div>
                <div 
                  className="faq-answer-wrapper" 
                  style={{ 
                    maxHeight: isOpen ? '400px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

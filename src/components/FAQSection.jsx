import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQSection.css';

const faqs = [
  {
    question: "¿Cuánto tiempo toma digitalizar mi empresa?",
    answer: "Depende de la complejidad, pero gracias a nuestros ecosistemas pre-construidos y metodologías ágiles, los proyectos base se lanzan en un lapso de 2 a 4 semanas. Nos enfocamos en dar resultados rápidos y escalables."
  },
  {
    question: "¿Necesito conocimientos técnicos para usar su panel de control?",
    answer: "En absoluto. Diseñamos nuestros dashboards para que sean intuitivos y visuales. Tú tomas las decisiones viendo métricas claras, mientras nuestra tecnología se encarga de todo el trabajo técnico en segundo plano."
  },
  {
    question: "¿Cómo funciona la automatización con Inteligencia Artificial?",
    answer: "Identificamos los cuellos de botella y tareas repetitivas en tu operación diaria. Luego, entrenamos agentes de IA para que realicen esas tareas (como atención al cliente, carga de datos o generación de reportes) 24/7 sin errores."
  },
  {
    question: "¿Los sistemas se adaptan si mi negocio crece?",
    answer: "Totalmente. Nuestra arquitectura es modular y escalable (Cloud-Native). Esto significa que tu infraestructura tecnológica puede crecer desde 100 hasta 100,000 usuarios sin que tengas que rehacer el sistema desde cero."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header">
          <h2>Preguntas Frecuentes</h2>
          <p>Todo lo que necesitas saber antes de dar el siguiente paso.</p>
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
                  <h3>{faq.question}</h3>
                  <ChevronDown className={`faq-icon ${isOpen ? 'rotated' : ''}`} size={24} />
                </div>
                <div 
                  className="faq-answer-wrapper" 
                  style={{ height: isOpen ? 'auto' : '0' }}
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

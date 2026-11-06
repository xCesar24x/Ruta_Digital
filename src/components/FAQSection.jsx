import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { smokeFrom, smokeTo, fadeUpFrom, fadeUpTo } from '../lib/motion';
import { pressableProps } from '../lib/a11y';
import { FAQS } from '../content/site';
import './FAQSection.css';

gsap.registerPlugin(ScrollTrigger);

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

      tl.fromTo('.faq-header h2', smokeFrom(), smokeTo())
        .fromTo('.faq-header p', fadeUpFrom(), fadeUpTo({ duration: 0.7 }), "-=0.5");
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
          <p>Precios, pagos, tiempos y qué pasa después de la entrega.</p>
        </div>
        
        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
              >
                {/* Only the question toggles: selecting answer text shouldn't close it */}
                <div className="faq-question" {...pressableProps(() => toggleFAQ(index), isOpen)}>
                  <div className="faq-question-title-group">
                    <span className="faq-tag-badge">{faq.tag}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <ChevronDown className={`faq-icon ${isOpen ? 'rotated' : ''}`} size={22} />
                </div>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer-collapse">
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
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

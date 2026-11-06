import React, { useRef } from 'react';
import { Check, Plus, ShieldCheck, RefreshCw } from 'lucide-react';
import { PLANS, MESSAGES } from '../content/site';
import { whatsappLinkProps } from '../lib/whatsapp';
import { useSectionReveal } from '../lib/useSectionReveal';
import WhatsAppIcon from './WhatsAppIcon';
import './PlansSection.css';

const PlansSection = () => {
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef, '.plan-card');

  return (
    <section className="plans-section" id="planes" ref={sectionRef}>
      <div className="container">
        <div className="section-head">
          <span className="section-badge">
            <RefreshCw size={14} />
            Planes mensuales
          </span>
          <h2 className="section-title">
            No entregamos <span className="text-glow">y desaparecemos.</span>
          </h2>
          <p className="section-subtitle">
            Después de la entrega seguimos con vos. Los planes son opcionales y se pagan mes a mes, por adelantado.
          </p>
        </div>

        <div className="plans-grid">
          {PLANS.map((plan) => (
            <article key={plan.name} className="plan-card glass-card">
              <span className="plan-name">{plan.name}</span>
              <div className="plan-price">
                {plan.prefix && <span className="plan-price-prefix">{plan.prefix}</span>}
                <span className="plan-price-value">{plan.price}</span>
                <span className="plan-price-per">/mes</span>
              </div>
              <ul className="plan-items">
                {plan.items.map((item) => (
                  <li key={item}>
                    <Check size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {plan.extra && (
                <p className="plan-extra">
                  <Plus size={14} />
                  <span>{plan.extra}</span>
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="plans-footer">
          <p className="plans-guarantee">
            <ShieldCheck size={16} />
            Toda entrega incluye 30 días de garantía para corregir cualquier error.
          </p>
          <a className="btn-secondary plans-cta" {...whatsappLinkProps(MESSAGES.planes)}>
            <WhatsAppIcon size={17} />
            Preguntar por un plan
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;

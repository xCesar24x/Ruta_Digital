import React, { useRef } from 'react';
import { CheckCircle2, ArrowUpRight, Briefcase } from 'lucide-react';
import { VISIBLE_CASES, isPlaceholder } from '../content/site';
import { useSectionReveal } from '../lib/useSectionReveal';
import './CasesSection.css';

// Pending copy is highlighted so it can't be missed while editing locally
const Text = ({ value }) => (
  <span className={isPlaceholder(value) ? 'is-placeholder' : undefined}>{value}</span>
);

const CasesSection = () => {
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef, '.case-card');

  if (!VISIBLE_CASES.length) return null;

  return (
    <section className="cases-section" id="casos" ref={sectionRef}>
      <div className="container">
        <div className="section-head">
          <span className="section-badge">
            <Briefcase size={14} />
            Casos reales
          </span>
          <h2 className="section-title">
            Negocios de Costa Rica <span className="text-glow">que ya reciben clientes en línea.</span>
          </h2>
          <p className="section-subtitle">
            Qué problema tenían, qué hicimos y qué cambió.
          </p>
        </div>

        <div className="cases-grid">
          {VISIBLE_CASES.map((item) => (
            <article key={item.client} className="case-card glass-card">
              <header className="case-head">
                <img src={item.logo} alt="" className="case-logo" loading="lazy" />
                <div>
                  <h3 className="case-name">{item.client}</h3>
                  <span className="case-meta">{item.meta}</span>
                </div>
              </header>

              <div className="case-block">
                <span className="case-label">El problema</span>
                <p><Text value={item.problem} /></p>
              </div>

              <div className="case-block">
                <span className="case-label">Qué hicimos</span>
                <ul>
                  {item.whatWeDid.map((step) => (
                    <li key={step}>
                      <CheckCircle2 size={15} />
                      <Text value={step} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="case-result">
                <span className="case-label">El resultado</span>
                <span className="case-result-value"><Text value={item.result.value} /></span>
                <span className="case-result-label"><Text value={item.result.label} /></span>
              </div>

              <a className="case-link" href={item.url} target="_blank" rel="noopener noreferrer">
                Ver sitio <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;

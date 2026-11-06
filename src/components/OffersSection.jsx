import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Clock, RefreshCw, Plus, ArrowRight, Tag, ListChecks } from 'lucide-react';
import { OFFERS, EXTRA_SERVICES, MESSAGES, findOffer } from '../content/site';
import { whatsappLinkProps } from '../lib/whatsapp';
import { useSectionReveal } from '../lib/useSectionReveal';
import WhatsAppIcon from './WhatsAppIcon';
import PackageSheet from './PackageSheet';
import './OffersSection.css';

const OffersSection = () => {
  const sectionRef = useRef(null);
  const [openKey, setOpenKey] = useState(null);
  useSectionReveal(sectionRef, '.offer-card');

  // Shareable link: rutadigital.lat/#paquete-presencia opens that package,
  // on first load or when the hash changes later (e.g. a link inside the page).
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#paquete-([a-z]+)$/);
      if (match && findOffer(match[1])) setOpenKey(match[1]);
    };
    // Deferred a tick so the page's smooth scroll exists before the sheet locks it
    const timer = setTimeout(openFromHash, 0);
    window.addEventListener('hashchange', openFromHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', openFromHash);
    };
  }, []);

  const openOffer = openKey ? findOffer(openKey) : null;

  return (
    <section className="offers-section" id="servicios" ref={sectionRef}>
      <div className="offers-glow" aria-hidden="true"></div>

      <div className="container offers-container">
        <div className="section-head">
          <span className="section-badge">
            <Tag size={14} />
            Servicios y precios
          </span>
          <h2 className="section-title">
            Tres formas de hacer crecer tu negocio, <span className="text-glow">con precio claro desde el inicio.</span>
          </h2>
          <p className="section-subtitle">
            Escogé la que se parece a tu negocio. Todas arrancan con una llamada gratis de 30 minutos.
          </p>
        </div>

        <div className="offers-grid">
          {OFFERS.map((offer, index) => (
            <article key={offer.id} id={offer.id} className="offer-card glass-card">
              <div className="offer-strip">
                <img src="/topedeservicios.png" alt="" loading="lazy" />
                <span className="offer-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {offer.badge && <span className="offer-badge">{offer.badge}</span>}
              </div>

              <div className="offer-body">
                <span className="offer-audience">{offer.audience}</span>
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-pitch">{offer.pitch}</p>

                <div className="offer-price">
                  <span className="offer-price-label">{offer.price.label}</span>
                  <span className="offer-price-value">{offer.price.value}</span>
                </div>

                <ul className="offer-includes">
                  {offer.includes.map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="offer-footer">
                  <dl className="offer-facts">
                    <div className="offer-fact">
                      <dt><Clock size={13} /> Entrega</dt>
                      <dd>{offer.delivery}</dd>
                    </div>
                    <div className="offer-fact">
                      <dt><RefreshCw size={13} /> Mensual</dt>
                      <dd>{offer.monthly}</dd>
                    </div>
                  </dl>

                  {offer.extra && (
                    <p className="offer-extra">
                      <Plus size={14} />
                      <span>{offer.extra}</span>
                    </p>
                  )}

                  <button
                    type="button"
                    className="offer-details-btn"
                    onClick={() => setOpenKey(offer.key)}
                    aria-haspopup="dialog"
                  >
                    <ListChecks size={16} />
                    <span>Ver todo lo que incluye</span>
                  </button>

                  <a className="btn-primary offer-cta" {...whatsappLinkProps(offer.message)}>
                    <WhatsAppIcon size={18} />
                    <span>{offer.cta}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="offers-extra-line">
          {EXTRA_SERVICES}
          <a {...whatsappLinkProps(MESSAGES.otros)}>
            Contanos qué necesitás <ArrowRight size={15} />
          </a>
        </p>
      </div>

      {/* Portal: this section is an isolated stacking context, the sheet must sit above everything */}
      {openOffer && createPortal(
        <PackageSheet offer={openOffer} onClosed={() => setOpenKey(null)} />,
        document.body
      )}
    </section>
  );
};

export default OffersSection;

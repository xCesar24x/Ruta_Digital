import React, { useEffect, useRef, useState } from 'react';
import {
  X, Check, XCircle, ShieldCheck, ClipboardList, Package, Route,
  Wallet, Ban, ExternalLink, Lightbulb, Sparkles,
} from 'lucide-react';
import { lockScroll, unlockScroll } from '../lib/motion';
import { whatsappLinkProps } from '../lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import './PackageSheet.css';

const EXIT_MS = 260; // matches the closing transition in PackageSheet.css

const Block = ({ icon: Icon, title, children, className = '' }) => (
  <section className={`pkg-block ${className}`}>
    <h4 className="pkg-block-title">
      <Icon size={15} />
      {title}
    </h4>
    {children}
  </section>
);

// Full detail of one package. Owns its enter/exit: the parent only mounts it
// and unmounts it when onClosed fires, so the exit can finish animating.
const PackageSheet = ({ offer, onClosed }) => {
  const [state, setState] = useState('closed');
  const sheetRef = useRef(null);
  const closeBtnRef = useRef(null);
  const returnFocusRef = useRef(null);
  const closingRef = useRef(false);
  const { detail } = offer;

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setState('closing');
    setTimeout(onClosed, EXIT_MS);
  };
  const requestCloseRef = useRef(requestClose);
  requestCloseRef.current = requestClose;

  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    lockScroll();
    history.replaceState(null, '', `#paquete-${offer.key}`);

    // Two frames so the closed position is painted before transitioning in
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setState('open'));
    });
    closeBtnRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        requestCloseRef.current();
        return;
      }
      // Keep keyboard focus inside the sheet while it's open
      if (e.key === 'Tab' && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll('a[href], button:not([disabled])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
      history.replaceState(null, '', window.location.pathname + window.location.search);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [offer.key]);

  const { investment } = detail;

  return (
    <div className="pkg-root" data-lenis-prevent>
      <div className="pkg-overlay" data-state={state} onClick={requestClose} aria-hidden="true" />

      <aside
        ref={sheetRef}
        className="pkg-sheet"
        data-state={state}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`pkg-title-${offer.key}`}
      >
        <header className="pkg-head">
          <div className="pkg-head-text">
            <span className="pkg-audience">{offer.audience}</span>
            <h3 className="pkg-title" id={`pkg-title-${offer.key}`}>{offer.title}</h3>
          </div>
          <button ref={closeBtnRef} type="button" className="pkg-close" onClick={requestClose} aria-label="Cerrar detalle del paquete">
            <X size={20} />
          </button>
        </header>

        <div className="pkg-body">
          <p className="pkg-promise">{detail.promise}</p>

          {detail.explainer && (
            <div className="pkg-explainer">
              <Lightbulb size={16} />
              <div>
                <strong>{detail.explainer.title}</strong>
                <p>{detail.explainer.text}</p>
              </div>
            </div>
          )}

          {/* Before / after: the brain decides by contrast */}
          <div className="pkg-contrast">
            <div className="pkg-contrast-col is-before">
              <span className="pkg-contrast-label">Hoy</span>
              <ul>
                {detail.pains.map((item) => (
                  <li key={item}><XCircle size={16} /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="pkg-contrast-col is-after">
              <span className="pkg-contrast-label">Con este paquete</span>
              <ul>
                {detail.outcomes.map((item) => (
                  <li key={item}><Check size={16} /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <Block icon={Package} title="Lo que recibís">
            <div className="pkg-groups">
              {detail.groups.map((group) => (
                <div key={group.title} className="pkg-group">
                  <span className="pkg-group-title">{group.title}</span>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}><Check size={14} /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block icon={Route} title="Cómo trabajamos">
            <ol className="pkg-steps">
              {detail.steps.map((step, index) => (
                <li key={step.title} className="pkg-step">
                  <span className="pkg-step-dot">{index + 1}</span>
                  <div>
                    <span className="pkg-step-when">{step.when}</span>
                    <strong className="pkg-step-title">{step.title}</strong>
                    <p className="pkg-step-text">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block icon={ClipboardList} title="Qué necesitamos de vos">
            <ul className="pkg-list">
              {detail.needs.map((item) => (
                <li key={item}><Check size={14} /><span>{item}</span></li>
              ))}
            </ul>
          </Block>

          <Block icon={Wallet} title="Inversión">
            <div className="pkg-price">
              <span className="pkg-price-label">{investment.label}</span>
              <span className="pkg-price-value">{investment.price}</span>
              <span className="pkg-price-payment">{investment.payment}</span>
            </div>

            {investment.perspective && <p className="pkg-perspective">{investment.perspective}</p>}

            <div className="pkg-monthly">
              <div className="pkg-monthly-head">
                <span>{investment.monthly.label}</span>
                <strong>{investment.monthly.price}</strong>
              </div>
              <span className="pkg-monthly-perday">{investment.monthly.perDay}</span>
              <ul>
                {investment.monthly.items.map((item) => (
                  <li key={item}><Check size={14} /><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="pkg-factors">
              <span>El precio cambia si necesitás:</span>
              <ul>
                {investment.factors.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </Block>

          <Block icon={ShieldCheck} title="Tu tranquilidad" className="pkg-block-guarantees">
            <ul className="pkg-list">
              {detail.guarantees.map((item) => (
                <li key={item}><ShieldCheck size={14} /><span>{item}</span></li>
              ))}
            </ul>
          </Block>

          {detail.examples && (
            <Block icon={Sparkles} title="Así quedaron">
              <div className="pkg-examples">
                {detail.examples.map((example) => (
                  <a key={example.url} href={example.url} target="_blank" rel="noopener noreferrer" className="pkg-example">
                    {example.name}
                    <ExternalLink size={13} />
                  </a>
                ))}
              </div>
              {detail.examplesNote && <p className="pkg-note">{detail.examplesNote}</p>}
            </Block>
          )}

          <Block icon={Ban} title="No incluye" className="pkg-block-muted">
            <ul className="pkg-list is-muted">
              {detail.notIncluded.map((item) => (
                <li key={item}><span className="pkg-dash">–</span><span>{item}</span></li>
              ))}
            </ul>
          </Block>
        </div>

        {/* CTA always in reach while reading */}
        <footer className="pkg-foot">
          <div className="pkg-foot-price">
            <span>{investment.label}</span>
            <strong>{investment.price}</strong>
          </div>
          <a className="btn-primary pkg-foot-cta" {...whatsappLinkProps(offer.message)}>
            <WhatsAppIcon size={18} />
            <span>{offer.cta}</span>
          </a>
        </footer>
      </aside>
    </div>
  );
};

export default PackageSheet;

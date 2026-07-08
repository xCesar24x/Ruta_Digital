import React, { useState } from 'react';
import { 
  Layout, Calendar, Utensils, Activity, Building, Truck, 
  MessageCircle, Layers, ArrowRight, ArrowLeft, Check, Sparkles, ShieldCheck 
} from 'lucide-react';

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [basePlan, setBasePlan] = useState({
    id: 'landing',
    name: 'Landing Page',
    price: 200,
    description: 'Sitio web de una sola página optimizado para conversiones y captación de clientes.',
    icon: <Layout className="w-6 h-6" />
  });
  const [addons, setAddons] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');

  const basePlans = [
    {
      id: 'landing',
      name: 'Landing Page',
      price: 200,
      description: 'Sitio web de una sola página optimizado para conversiones y captación de clientes.',
      icon: <Layout className="w-6 h-6" />
    },
    {
      id: 'reservas',
      name: 'Motor de Reservas',
      price: 2500,
      description: 'Calendarios interactivos, pasarela de pago y agendamiento automatizado.',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: 'kds',
      name: 'KDS Restaurantes',
      price: 3500,
      description: 'Sistema de visualización en cocina, gestión de comandas y pedidos digitales.',
      icon: <Utensils className="w-6 h-6" />
    },
    {
      id: 'gym',
      name: 'Ecosistema Gym',
      price: 3500,
      description: 'Control de membresías, rutinas interactivas y reserva de clases.',
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: 'inmobiliaria',
      name: 'Portal Inmobiliario',
      price: 2500,
      description: 'Buscador avanzado de propiedades, filtros interactivos y gestión de agentes.',
      icon: <Building className="w-6 h-6" />
    },
    {
      id: 'logistica',
      name: 'Transporte & Logística',
      price: 2000,
      description: 'Control de despachos, asignación de rutas y gestión de flotas.',
      icon: <Truck className="w-6 h-6" />
    }
  ];

  const addonOptions = [
    {
      id: 'whatsapp',
      name: 'Integración WhatsApp',
      price: 350,
      description: 'Recordatorios automáticos, notificaciones de reservas y respuestas rápidas de IA.',
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      id: 'calendar',
      name: 'Integración Google Calendar',
      price: 250,
      description: 'Sincronización bidireccional en tiempo real con tu agenda y control de disponibilidad.',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: 'variados',
      name: 'Módulos Variados',
      price: 400,
      description: 'Funcionalidades extras a la medida: dashboards de control, pasarelas bancarias y pasarelas de pago.',
      icon: <Layers className="w-6 h-6" />
    }
  ];

  const handleAddonToggle = (addon) => {
    if (addons.some(item => item.id === addon.id)) {
      setAddons(addons.filter(item => item.id !== addon.id));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const calculateTotal = () => {
    const addonTotal = addons.reduce((sum, item) => sum + item.price, 0);
    return basePlan.price + addonTotal;
  };

  const getWhatsAppLink = () => {
    const total = calculateTotal();
    const addonNames = addons.map(item => item.name);
    
    let message = `Hola Ruta Digital. Me interesa cotizar una solución tecnológica.\n\n`;
    if (clientName) message += `Cliente: ${clientName}\n`;
    if (clientCompany) message += `Empresa: ${clientCompany}\n\n`;
    
    message += `Ecosistema Base seleccionado:\n- ${basePlan.name} ($${basePlan.price} USD)\n\n`;
    
    if (addonNames.length > 0) {
      message += `Módulos Add-ons seleccionados:\n- ${addonNames.join('\n- ')}\n\n`;
    }
    
    message += `Inversión estimada: $${total} USD.\n\n¿Podemos coordinar una reunión para detallar mi requerimiento?`;
    
    const phoneNumber = '50684349442';
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="cotizador" className="cotizador-section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-center">Calcula tu <span class="text-gradient">Inversión</span></h2>
          <p className="text-center">Transparencia total. Selecciona los módulos que tu negocio necesita y obtén un estimado al instante.</p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="wizard-progress-container">
          <div className="wizard-progress">
            <div className="progress-step-indicator" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            <div className={`step-node ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1</div>
            <div className={`step-node ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}>2</div>
            <div className={`step-node ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}>3</div>
          </div>
          <div className="progress-labels">
            <span>1. Ecosistema Base</span>
            <span>2. Add-ons Extra</span>
            <span>3. Resumen & Contacto</span>
          </div>
        </div>

        <div className="calculator-wrapper">
          {/* STEP 1: SELECT BASE PLAN */}
          {step === 1 && (
            <div className="calc-step-view">
              <h3 className="step-title"><Sparkles className="w-5 h-5 text-[#00a854] inline mr-2" /> 1. Elige la base de tu software</h3>
              <p className="step-desc">Toda solución exitosa requiere una base sólida. Selecciona el modelo que mejor se alinea con tu giro de negocio.</p>
              
              <div className="options-grid-step">
                {basePlans.map(plan => {
                  const isSelected = basePlan.id === plan.id;
                  return (
                    <div 
                      key={plan.id}
                      className={`calc-card-wizard ${isSelected ? 'selected' : ''}`}
                      onClick={() => setBasePlan(plan)}
                    >
                      <div className="card-selection-indicator">
                        {isSelected && <Check className="w-4 h-4 text-black" />}
                      </div>
                      <div className="card-icon-wrapper">
                        {plan.icon}
                      </div>
                      <h4>{plan.name}</h4>
                      <p>{plan.description}</p>
                      <div className="card-price-tag">
                        Desde <span>${plan.price} USD</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="step-actions-footer">
                <div></div>
                <button className="btn-main" onClick={() => setStep(2)}>
                  Continuar <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT ADD-ONS */}
          {step === 2 && (
            <div className="calc-step-view">
              <h3 className="step-title"><Sparkles className="w-5 h-5 text-[#00a854] inline mr-2" /> 2. Potencia tu sistema con integraciones</h3>
              <p className="step-desc">Añade módulos funcionales y APIs avanzadas para automatizar procesos clave en tu operación diaria.</p>

              <div className="options-grid-step">
                {addonOptions.map(addon => {
                  const isSelected = addons.some(item => item.id === addon.id);
                  return (
                    <div 
                      key={addon.id}
                      className={`calc-card-wizard addon-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleAddonToggle(addon)}
                    >
                      <div className="card-selection-indicator">
                        {isSelected && <Check className="w-4 h-4 text-black" />}
                      </div>
                      <div className="card-icon-wrapper">
                        {addon.icon}
                      </div>
                      <h4>{addon.name}</h4>
                      <p>{addon.description}</p>
                      <div className="card-price-tag">
                        + <span>${addon.price} USD</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="step-actions-footer">
                <button className="btn-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                </button>
                <button className="btn-main" onClick={() => setStep(3)}>
                  Ver Resumen <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUMMARY & CUSTOMIZATION */}
          {step === 3 && (
            <div className="calc-step-view">
              <h3 className="step-title"><ShieldCheck className="w-5 h-5 text-[#00a854] inline mr-2" /> 3. Genera tu presupuesto personalizado</h3>
              <p className="step-desc">Introduce tus datos de negocio para adjuntarlos a la propuesta y resérvalo directamente por WhatsApp.</p>

              <div className="summary-split-layout">
                {/* Customization Inputs */}
                <div className="client-info-form glass-panel">
                  <h4>Datos de la Propuesta</h4>
                  <div className="form-group">
                    <label htmlFor="client-name">Tu Nombre</label>
                    <input 
                      type="text" 
                      id="client-name"
                      placeholder="Ej. César Madrigal"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="client-company">Nombre de tu Empresa / Proyecto</label>
                    <input 
                      type="text" 
                      id="client-company"
                      placeholder="Ej. Consultora Alfa"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                    />
                  </div>
                  <div className="security-notice">
                    <span className="bullet"></span>
                    <p>Tus datos son procesados de forma local únicamente para estructurar el mensaje de WhatsApp. Privacidad 100% garantizada.</p>
                  </div>
                </div>

                {/* Final Invoice Summary Box */}
                <div className="invoice-summary-box glass-panel">
                  <h3>Resumen de Inversión</h3>
                  
                  <div className="invoice-line-item base-item">
                    <div className="item-label">
                      <strong>Ecosistema Base:</strong>
                      <span>{basePlan.name}</span>
                    </div>
                    <span className="item-price">${basePlan.price} USD</span>
                  </div>

                  {addons.length > 0 && (
                    <div className="addons-invoice-list">
                      <strong>Módulos Adicionales:</strong>
                      {addons.map(addon => (
                        <div key={addon.id} className="invoice-line-item addon-item">
                          <span>+ {addon.name}</span>
                          <span className="item-price">${addon.price} USD</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="invoice-divider"></div>

                  <div className="invoice-total">
                    <span>Inversión Estimada:</span>
                    <strong className="text-gradient">${calculateTotal()} USD</strong>
                  </div>

                  <a 
                    href={getWhatsAppLink()}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-main w-full justify-center text-center mt-6"
                  >
                    Reservar Precio por WhatsApp <MessageCircle className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>

              <div className="step-actions-footer">
                <button className="btn-secondary" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Modificar Módulos
                </button>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .wizard-progress-container {
          max-width: 600px;
          margin: 0 auto 3.5rem auto;
        }
        .wizard-progress {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 0.8rem;
        }
        .progress-step-indicator {
          position: absolute;
          top: 50%;
          left: 0;
          height: 3px;
          background: var(--accent-gradient);
          transform: translateY(-50%);
          z-index: 1;
          transition: width 0.4s ease;
        }
        .wizard-progress::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-50%);
          z-index: 0;
        }
        .step-node {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #121212;
          border: 2px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          z-index: 2;
          cursor: pointer;
          transition: var(--transition);
        }
        .step-node.active {
          border-color: #00a854;
          color: #00a854;
          box-shadow: 0 0 15px rgba(0, 168, 84, 0.3);
        }
        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .progress-labels span {
          width: 100px;
          text-align: center;
        }
        .progress-labels span:first-child { text-align: left; }
        .progress-labels span:last-child { text-align: right; }

        .calculator-wrapper {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
        }
        .step-title {
          font-size: 1.4rem;
          color: #fff;
          margin-bottom: 0.5rem;
          font-family: 'Outfit', sans-serif;
        }
        .step-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 2.5rem;
        }
        .options-grid-step {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .calc-card-wizard {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 1.8rem;
          cursor: pointer;
          position: relative;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .calc-card-wizard:hover {
          border-color: rgba(0, 168, 84, 0.4);
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.03);
        }
        .calc-card-wizard.selected {
          border-color: #00a854;
          background: rgba(0, 168, 84, 0.02);
          box-shadow: 0 0 25px rgba(0, 168, 84, 0.08);
        }
        .card-selection-indicator {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .calc-card-wizard.selected .card-selection-indicator {
          background: #00a854;
          border-color: #00a854;
        }
        .card-icon-wrapper {
          color: #00a854;
          background: rgba(0, 168, 84, 0.05);
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }
        .calc-card-wizard h4 {
          font-size: 1.15rem;
          font-family: 'Outfit', sans-serif;
          color: #fff;
          margin-bottom: 0.6rem;
        }
        .calc-card-wizard p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .card-price-tag {
          font-size: 0.85rem;
          color: var(--text-secondary);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 0.8rem;
          margin-top: auto;
        }
        .card-price-tag span {
          font-weight: 700;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem;
        }
        .calc-card-wizard.selected .card-price-tag span {
          color: #00a854;
        }
        .step-actions-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 2rem;
        }
        .summary-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }
        .client-info-form, .invoice-summary-box {
          padding: 2rem;
          border-radius: 14px;
        }
        .client-info-form h4 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-family: 'Outfit', sans-serif;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .form-group input {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          color: #fff;
          font-size: 0.95rem;
          transition: var(--transition);
        }
        .form-group input:focus {
          outline: none;
          border-color: #00a854;
          box-shadow: 0 0 15px rgba(0, 168, 84, 0.1);
        }
        .security-notice {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 0.8rem 1rem;
          border-radius: 8px;
        }
        .security-notice .bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00a854;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }
        .security-notice p {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .invoice-line-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .base-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1rem;
        }
        .base-item strong {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .base-item span {
          font-size: 1.15rem;
          color: #fff;
          font-family: 'Outfit', sans-serif;
        }
        .addons-invoice-list {
          margin-top: 1rem;
        }
        .addons-invoice-list strong {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 0.8rem;
        }
        .addon-item {
          color: var(--text-secondary);
        }
        .item-price {
          font-weight: 600;
          color: #fff;
        }
        .invoice-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 1.5rem 0;
        }
        .invoice-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .invoice-total span {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .invoice-total strong {
          font-size: 1.6rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .summary-split-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .calculator-wrapper {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

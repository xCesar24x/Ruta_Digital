import React, { useState, useEffect } from 'react';
import { 
  Bot, ArrowRight, Database, Mail, Terminal, 
  Play, RotateCcw, CheckCircle, Clock, Sparkles, Cpu
} from 'lucide-react';

export default function AISimulator() {
  const [activeTemplate, setActiveTemplate] = useState('quote');
  const [inputText, setInputText] = useState('Hola César, necesito una cotización para un motor de reservas de un gimnasio llamado FitLife, mi presupuesto aproximado es de $3000.');
  const [isAutomating, setIsAutomating] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState('');

  const templates = {
    quote: {
      name: 'Cotización & Email Automático',
      placeholder: 'Escribe una solicitud de cotización informal...',
      defaultText: 'Hola César, necesito una cotización para un motor de reservas de un gimnasio llamado FitLife, mi presupuesto aproximado es de $3000.',
    },
    invoice: {
      name: 'Extracción de Datos a Sheets',
      placeholder: 'Escribe detalles de una factura o recibo...',
      defaultText: 'Factura #9812 - Proveedor: Amazon AWS - Concepto: Servicios de Servidores en la Nube - Monto: $452.12 USD - Fecha: 08/07/2026.',
    },
    support: {
      name: 'Clasificación de Soporte & Alertas',
      placeholder: 'Escribe un reclamo o reporte de error...',
      defaultText: 'URGENTE: La pasarela de pago en el checkout está dando un error 500 y los clientes no pueden completar sus reservas de habitaciones.',
    }
  };

  const handleTemplateChange = (key) => {
    setActiveTemplate(key);
    setInputText(templates[key].defaultText);
    resetSimulation();
  };

  const resetSimulation = () => {
    setIsAutomating(false);
    setPipelineStep(0);
    setExtractedData(null);
    setGeneratedEmail('');
  };

  const startSimulation = () => {
    if (!inputText.trim() || isAutomating) return;
    
    setIsAutomating(true);
    setPipelineStep(1); // Starting extraction
  };

  useEffect(() => {
    if (!isAutomating) return;

    let timer;

    if (pipelineStep === 1) {
      // Simulate NLU Variable Extraction
      timer = setTimeout(() => {
        if (activeTemplate === 'quote') {
          setExtractedData({
            cliente: 'FitLife Gym',
            servicio: 'Motor de Reservas / Ecosistema Gym',
            inversion: '$3,000 USD',
            prioridad: 'Alta 🔴'
          });
        } else if (activeTemplate === 'invoice') {
          setExtractedData({
            documento: 'Factura AWS #9812',
            proveedor: 'Amazon AWS',
            categoria: 'Infraestructura TI ☁️',
            monto: '$452.12 USD'
          });
        } else {
          setExtractedData({
            modulo: 'Checkout / Pasarela de Pagos',
            categoria: 'Error Crítico ⚠️',
            afectacion: 'Bloqueo de Reservas',
            urgencia: 'Inmediata'
          });
        }
        setPipelineStep(2); // Next step: Database insert
      }, 2000);
    } else if (pipelineStep === 2) {
      // Simulate Database / CRM Entry
      timer = setTimeout(() => {
        setPipelineStep(3); // Next step: Email draft
      }, 1800);
    } else if (pipelineStep === 3) {
      // Simulate Email Draft Generation (typewriter style)
      timer = setTimeout(() => {
        let emailText = '';
        if (activeTemplate === 'quote') {
          emailText = `Estimados líderes de FitLife,\n\nGracias por ponerse en contacto con Ruta Digital. Hemos registrado su interés en un Motor de Reservas y Ecosistema de Gimnasio con un presupuesto de $3000 USD.\n\nUn consultor de nuestro equipo técnico se estará comunicando en breve para agendar la sesión de diseño.\n\nSaludos cordiales,\nAgente IA - Ruta Digital`;
        } else if (activeTemplate === 'invoice') {
          emailText = `Notificación de Registro de Gastos:\n\nSe ha extraído y conciliado exitosamente la Factura AWS #9812 por un monto de $452.12 USD. Fila agregada en base de datos contable.\n\nEstado: Aprobado automáticamente para pago.`;
        } else {
          emailText = `ALERTA DE SISTEMA - CRÍTICO:\n\nSe ha detectado una interrupción en Pasarela de Pagos (Checkout).\n\nAcción ejecutada: Ticket de soporte creado y asignado al Ingeniero de Guardia. Notificación enviada por Slack al canal de emergencia.`;
        }
        setGeneratedEmail(emailText);
        setPipelineStep(4); // Simulation complete
      }, 2200);
    }

    return () => clearTimeout(timer);
  }, [isAutomating, pipelineStep, activeTemplate]);

  return (
    <section id="simulador" className="simulator-section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-center">Simulador de <span className="text-gradient">Automatización IA</span></h2>
          <p className="text-center">Prueba en vivo el poder de los agentes cognitivos. Elige una plantilla, escribe un texto libre y mira el procesamiento en tiempo real.</p>
        </div>

        {/* Template Selectors */}
        <div className="simulator-tabs-container">
          <div className="simulator-tabs">
            {Object.keys(templates).map(key => (
              <button
                key={key}
                className={`tab-btn ${activeTemplate === key ? 'active' : ''}`}
                onClick={() => handleTemplateChange(key)}
                disabled={isAutomating}
              >
                {templates[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="simulator-grid">
          {/* Input Area */}
          <div className="simulator-input-area glass-panel">
            <div className="panel-header-sim">
              <Terminal className="w-4 h-4 text-[#00ffaa]" />
              <span>Entrada de Datos Crudos (Texto Libre)</span>
            </div>
            <textarea
              className="simulator-textarea"
              placeholder={templates[activeTemplate].placeholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isAutomating}
            />
            <div className="input-controls">
              {isAutomating ? (
                <button className="btn-secondary" onClick={resetSimulation}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar
                </button>
              ) : (
                <button className="btn-main" onClick={startSimulation}>
                  Iniciar Automatización <Play className="w-4 h-4 ml-2 fill-current" />
                </button>
              )}
            </div>
          </div>

          {/* Pipeline Visualizer Area */}
          <div className="simulator-pipeline-area glass-panel">
            <div className="panel-header-sim">
              <Cpu className="w-4 h-4 text-[#00ffaa]" />
              <span>Procesamiento de Agente Autónomo</span>
            </div>

            <div className="pipeline-nodes">
              {/* Node 1: NLU Parsing */}
              <div className={`pipeline-node ${pipelineStep >= 1 ? 'active' : ''} ${pipelineStep === 1 ? 'processing' : ''}`}>
                <div className="node-icon"><Bot className="w-5 h-5" /></div>
                <div className="node-info">
                  <h4>1. Análisis Cognitivo (NLU)</h4>
                  <p>{pipelineStep === 1 ? 'Identificando entidades y parámetros...' : pipelineStep > 1 ? 'Variables extraídas correctamente' : 'Esperando inicio...'}</p>
                  {extractedData && (
                    <div className="extracted-data-box">
                      {Object.keys(extractedData).map(key => (
                        <div key={key} className="data-row">
                          <span className="data-key">{key}:</span>
                          <span className="data-val">{extractedData[key]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Node 2: Database Sync */}
              <div className={`pipeline-node ${pipelineStep >= 2 ? 'active' : ''} ${pipelineStep === 2 ? 'processing' : ''}`}>
                <div className="node-icon"><Database className="w-5 h-5" /></div>
                <div className="node-info">
                  <h4>2. Sincronización de Base de Datos</h4>
                  <p>{pipelineStep === 2 ? 'Conectando con BigQuery / CRM y escribiendo registro...' : pipelineStep > 2 ? 'Registro de base de datos confirmado ✔' : 'Esperando...'}</p>
                </div>
              </div>

              {/* Node 3: Actions Execution */}
              <div className={`pipeline-node ${pipelineStep >= 3 ? 'active' : ''} ${pipelineStep === 3 ? 'processing' : ''}`}>
                <div className="node-icon"><Mail className="w-5 h-5" /></div>
                <div className="node-info">
                  <h4>3. Generación de Respuesta & Acciones</h4>
                  <p>{pipelineStep === 3 ? 'Borrador estructurado por Inteligencia Artificial...' : pipelineStep > 3 ? 'Notificaciones y correos redactados ✔' : 'Esperando...'}</p>
                  {generatedEmail && (
                    <pre className="generated-email-box">
                      {generatedEmail}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Pipeline Final Stats */}
            {pipelineStep === 4 && (
              <div className="pipeline-success-card">
                <CheckCircle className="w-8 h-8 text-[#00ffaa] mb-2" />
                <h3>¡Simulación Completada!</h3>
                <div className="success-stats">
                  <div className="stat-pill">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    <span>Tiempo Ahorrado: ~25 mins</span>
                  </div>
                  <div className="stat-pill">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    <span>Margen de Error: 0.0%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .simulator-tabs-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .simulator-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.35rem;
          border-radius: 100px;
          gap: 0.25rem;
        }
        .simulator-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2.5rem;
        }
        .panel-header-sim {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .simulator-textarea {
          width: 100%;
          min-height: 250px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.2rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          resize: none;
          transition: var(--transition);
        }
        .simulator-textarea:focus {
          outline: none;
          border-color: #00ffaa;
          background: rgba(255, 255, 255, 0.02);
          box-shadow: 0 0 25px rgba(0, 255, 170, 0.05);
        }
        .input-controls {
          display: flex;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }
        .pipeline-nodes {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          position: relative;
        }
        .pipeline-nodes::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 20px;
          width: 2px;
          height: calc(100% - 20px);
          background: rgba(255, 255, 255, 0.05);
          z-index: 0;
        }
        .pipeline-node {
          display: flex;
          gap: 1.2rem;
          z-index: 1;
          opacity: 0.35;
          transition: all 0.4s ease;
        }
        .pipeline-node.active {
          opacity: 1;
        }
        .node-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition);
          flex-shrink: 0;
        }
        .pipeline-node.active .node-icon {
          border-color: #00ffaa;
          color: #00ffaa;
          box-shadow: 0 0 15px rgba(0, 255, 170, 0.25);
        }
        .pipeline-node.processing .node-icon {
          animation: pulseGlow 1.5s infinite alternate;
        }
        .node-info {
          flex-grow: 1;
        }
        .node-info h4 {
          font-size: 1.05rem;
          font-family: 'Outfit', sans-serif;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .node-info p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin: 0;
        }
        .extracted-data-box {
          background: rgba(0, 255, 170, 0.03);
          border: 1px solid rgba(0, 255, 170, 0.15);
          border-radius: 8px;
          padding: 0.8rem;
          margin-top: 0.8rem;
          font-family: monospace;
          font-size: 0.8rem;
          animation: slideDown 0.3s ease;
        }
        .data-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .data-row:last-child {
          margin-bottom: 0;
        }
        .data-key {
          color: var(--accent);
          text-transform: capitalize;
        }
        .data-val {
          color: #fff;
        }
        .generated-email-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1rem;
          margin-top: 0.8rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          line-height: 1.5;
          color: #d0d0d0;
          white-space: pre-wrap;
          max-height: 150px;
          overflow-y: auto;
          animation: slideDown 0.3s ease;
        }
        .pipeline-success-card {
          margin-top: 2rem;
          background: rgba(0, 255, 170, 0.02);
          border: 1px solid rgba(0, 255, 170, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pipeline-success-card h3 {
          font-size: 1.2rem;
          font-family: 'Outfit', sans-serif;
          color: #fff;
          margin-bottom: 0.8rem;
        }
        .success-stats {
          display: flex;
          gap: 1rem;
        }
        .stat-pill {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 5px rgba(0, 255, 170, 0.2); border-color: rgba(0, 255, 170, 0.4); }
          100% { box-shadow: 0 0 20px rgba(0, 255, 170, 0.6); border-color: #00ffaa; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 900px) {
          .simulator-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

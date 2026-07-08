import React, { useState } from 'react';
import { proyectosData } from '../data/proyectos';
import { 
  Brain, PieChart, Bot, TrendingUp, Cpu, Briefcase, 
  ExternalLink, X, Eye, Code, Filter 
} from 'lucide-react';

export default function Portfolio({ activeSubcatIndex, activeTab, setActiveTab }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Map category codes to labels
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'web', name: 'Web Apps' },
    { id: 'ai', name: 'IA & Automatización' },
    { id: 'data', name: 'Data & Analytics' }
  ];

  // Map corporate services
  const corporateServices = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Empowerment Program',
      description: 'Talleres de adopción tecnológica y capacitación en Prompt Engineering para integrar Inteligencia Artificial generativa en tu operativa diaria.',
      highlight: true
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: 'Visual Management',
      description: 'Dashboards interactivos avanzados (Power BI, React). Transformamos silos de datos complejos en reportes ejecutivos claros y en tiempo real.',
      highlight: false
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI Engineering',
      description: 'Diseño e integración de agentes cognitivos y asistentes autónomos usando APIs de IA (OpenAI) para resolver procesos a velocidad sobrehumana.',
      highlight: false
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Revenue & Pricing Strategy',
      description: 'Modelado y simulación de escenarios financieros con Python. Implementamos estrategias dinámicas para optimización de precios y maximización de márgenes.',
      highlight: false
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Data & Automatización',
      description: 'Desarrollo de pipelines ETL y automatización End-to-End (VBA, Power Automate, BigQuery) para eliminar cuellos de botella y tareas manuales repetitivas.',
      highlight: false
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Gestión Financiera',
      description: 'Optimización de flujos de caja, auditoría de ingresos, facturación compleja y metodologías Lean adaptadas para asegurar cumplimiento y precisión.',
      highlight: false
    }
  ];

  // Filter projects list
  const filteredProjects = proyectosData.filter(proj => {
    if (filter === 'all') return true;
    return proj.categoria === filter;
  });

  const getSubcategoryName = (index) => {
    const names = [
      'Landing Pages', 
      'Motores de Reservas', 
      'KDS Restaurantes', 
      'Ecosistemas Gym', 
      'Portal Inmobiliario', 
      'Transporte y Logística'
    ];
    return names[index] || 'Proyecto Especial';
  };

  return (
    <section id="portafolio" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-center">Portafolio de <span className="text-gradient">Servicios</span></h2>
          <p className="text-center">Soluciones reales. Resultados medibles. Explora lo que podemos hacer por tu negocio.</p>
        </div>

        {/* Portfolio Tabs */}
        <div className="portfolio-tabs-container">
          <div className="portfolio-tabs">
            <button 
              className={`tab-btn ${activeTab === 'pymes' ? 'active' : ''}`} 
              onClick={() => setActiveTab('pymes')}
            >
              PYMES
            </button>
            <button 
              className={`tab-btn ${activeTab === 'corporativo' ? 'active' : ''}`} 
              onClick={() => setActiveTab('corporativo')}
            >
              CORPORATIVO
            </button>
          </div>
        </div>

        {/* PYMES TAB CONTENT */}
        {activeTab === 'pymes' && (
          <div className="tab-content active" id="tab-pymes">
            <div className="category-header text-center">
              <h3 className="category-title">Software & Ecosistemas Web</h3>
              <p>Plataformas diseñadas para digitalizar, optimizar y modernizar tus operaciones.</p>
            </div>

            {/* Filter Buttons */}
            <div className="filter-wrapper">
              <div className="filter-buttons">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.id === 'all' ? <Filter className="w-3.5 h-3.5 mr-1 inline-block" /> : null}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="projects-grid">
              {filteredProjects.map((proj, i) => {
                // Determine if this card is currently highlighted by the Galaxy click
                const isGalaxyHighlighted = activeSubcatIndex !== null && i === activeSubcatIndex;

                return (
                  <div 
                    key={proj.id} 
                    className={`portfolio-card ${isGalaxyHighlighted ? 'galaxy-highlighted' : ''}`}
                    style={{
                      border: isGalaxyHighlighted ? '1px solid #00ffaa' : '',
                      boxShadow: isGalaxyHighlighted ? '0 0 30px rgba(0, 255, 170, 0.3)' : '',
                      transform: isGalaxyHighlighted ? 'scale(1.04)' : '',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onClick={() => setSelectedProject(proj)}
                  >
                    <div className="portfolio-img-wrapper">
                      <img 
                        src={proj.imagen.startsWith('..') ? '/logo.png' : `/${proj.imagen}`} 
                        alt={proj.titulo} 
                        className="portfolio-img" 
                        loading="lazy" 
                        onError={(e) => { e.target.src = '/Ruta.png'; }}
                      />
                      <div className="card-overlay-hover">
                        <Eye className="w-8 h-8 text-[#00ffaa]" />
                        <span>Detalles</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="card-subcategory">{getSubcategoryName(proj.id % 6)}</span>
                        {proj.titulo.includes('[En desarrollo]') && <span className="badge-dev">En desarrollo</span>}
                      </div>
                      <h5>{proj.titulo.replace(' [En desarrollo]', '')}</h5>
                      <p className="line-clamp-2">{proj.descripcion}</p>
                      <div className="card-tech-tags">
                        {proj.tecnologias.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                        {proj.tecnologias.length > 3 && (
                          <span className="tech-tag">+{proj.tecnologias.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CORPORATIVO TAB CONTENT */}
        {activeTab === 'corporativo' && (
          <div className="tab-content active" id="tab-corporativo">
            <div className="category-header text-center">
              <h3 className="category-title">Soluciones Especializadas</h3>
              <p>Optimizando operaciones complejas y automatizando resultados.</p>
            </div>
            <div className="services-grid">
              {corporateServices.map((service, i) => (
                <div key={i} className={`service-card ${service.highlight ? 'highlight' : ''}`}>
                  <div className="card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECT DETAILS MODAL */}
        {selectedProject && (
          <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="project-modal glass-panel" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>
                <X className="w-5 h-5" />
              </button>
              
              <div className="modal-grid">
                <div className="modal-image-area">
                  <img 
                    src={selectedProject.imagen.startsWith('..') ? '/logo.png' : `/${selectedProject.imagen}`} 
                    alt={selectedProject.titulo} 
                    onError={(e) => { e.target.src = '/Ruta.png'; }}
                  />
                </div>
                <div className="modal-info-area">
                  <h2>{selectedProject.titulo.replace(' [En desarrollo]', '')}</h2>
                  <span className="modal-category-badge">
                    {categories.find(c => c.id === selectedProject.categoria)?.name || 'Ecosistema'}
                  </span>
                  
                  <p className="modal-desc">{selectedProject.descripcion}</p>
                  
                  <h4>Tecnologías Utilizadas:</h4>
                  <div className="modal-tech-tags">
                    {selectedProject.tecnologias.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="modal-actions">
                    {selectedProject.demoUrl && (
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-main">
                        Ver Proyecto <ExternalLink className="w-4 h-4 ml-1.5" />
                      </a>
                    )}
                    {selectedProject.repoUrl && (
                      <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        Ver Código{" "}
                        <svg className="w-4 h-4 ml-1.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .filter-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .filter-buttons {
          display: flex;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.35rem;
          border-radius: 100px;
          gap: 0.25rem;
          backdrop-filter: blur(10px);
        }
        .filter-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1.2rem;
          border-radius: 100px;
          font-weight: 500;
          font-size: 0.88rem;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
        }
        .filter-btn:hover {
          color: var(--text-primary);
        }
        .filter-btn.active {
          background: var(--accent-gradient);
          color: #000;
          font-weight: 700;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .portfolio-card {
          cursor: pointer;
        }
        .portfolio-card:hover .card-overlay-hover {
          opacity: 1;
        }
        .portfolio-card:hover .portfolio-img {
          transform: scale(1.06);
        }
        .portfolio-img-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 16/10;
        }
        .portfolio-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        .card-overlay-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 5, 5, 0.75);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          opacity: 0;
          transition: var(--transition);
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          backdrop-filter: blur(4px);
        }
        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
        }
        .card-subcategory {
          font-size: 0.75rem;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
        }
        .card-tech-tags, .modal-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 1rem;
        }
        .tech-tag {
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-weight: 500;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        
        /* Modal Styles */
        .project-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(2, 2, 2, 0.85);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 2rem;
          animation: modalFadeIn 0.3s ease;
        }
        .project-modal {
          width: 100%;
          max-width: 900px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 10, 0.9);
          padding: 2.5rem;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 255, 170, 0.1);
        }
        .close-btn {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 0.4rem;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
        }
        .close-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
        }
        .modal-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .modal-image-area {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
          aspect-ratio: 16/10;
        }
        .modal-image-area img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-info-area h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          font-family: 'Outfit', sans-serif;
        }
        .modal-category-badge {
          display: inline-block;
          font-size: 0.75rem;
          background: rgba(0, 255, 170, 0.1);
          border: 1px solid rgba(0, 255, 170, 0.2);
          color: var(--accent);
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.2rem;
        }
        .modal-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        .modal-info-area h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        .modal-actions a {
          text-decoration: none;
        }
        
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .project-modal {
            padding: 1.5rem;
            max-height: 90vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  );
}

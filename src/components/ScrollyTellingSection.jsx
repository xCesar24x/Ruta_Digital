import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Cpu, 
  BarChart3, 
  Layers, 
  Sparkles, 
  Database, 
  Workflow, 
  TrendingUp, 
  Monitor, 
  Palette, 
  GraduationCap, 
  Kanban, 
  Globe2, 
  Layout,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';
import './ScrollyTelling.css';

gsap.registerPlugin(ScrollTrigger);

const ALL_SERVICES = [
  // Pillar 1: Desarrollo & Ecosistemas Digitales
  {
    id: 'desarrollo-web',
    category: 'web',
    title: 'Desarrollo Web',
    shortDesc: 'Plataformas web de alto rendimiento, ultra rápidas y con arquitectura moderna.',
    image: '/services/leaf-1.svg',
    tag: 'Full-Stack',
    bullets: [
      'Next.js / React / Vite con tiempos de carga sub-segundo',
      'Optimización técnica SEO & Core Web Vitals 100/100',
      'Diseño 100% responsivo y adaptado a tu identidad de marca'
    ]
  },
  {
    id: 'software',
    category: 'web',
    title: 'Software a Medida',
    shortDesc: 'Sistemas a medida diseñados para resolver la lógica operativa exacta de tu negocio.',
    image: '/services/leaf-2.svg',
    tag: 'Custom Core',
    bullets: [
      'Paneles de administración y portales empresariales privados',
      'Bases de datos PostgreSQL / MySQL estructuradas y seguras',
      'Arquitectura modular para escalar conforme crece la empresa'
    ]
  },
  {
    id: 'aplicaciones-web',
    category: 'web',
    title: 'Aplicaciones Web',
    shortDesc: 'Web apps interactivas, escalables y seguras con experiencia de usuario fluida.',
    image: '/services/leaf-3.svg',
    tag: 'SaaS / PWA',
    bullets: [
      'SaaS y plataformas interactivas con autenticación robusta',
      'Pasarelas de pagos integradas (Stripe, PayPal, BAC, etc.)',
      'Experiencia progresiva (PWA) instalable en móviles y PC'
    ]
  },
  {
    id: 'ecosistemas-web',
    category: 'web',
    title: 'Ecosistemas Web',
    shortDesc: 'Infraestructuras digitales completas conectadas con CRM, ERP y pasarelas.',
    image: '/services/leaf-4.svg',
    tag: 'Enterprise',
    bullets: [
      'Sincronización bidireccional entre CRM, ERP y base de datos',
      'Webhooks y APIs RESTful / GraphQL de alta velocidad',
      'Automatización de altas de clientes y facturación electrónica'
    ]
  },
  {
    id: 'landing-pages',
    category: 'web',
    title: 'Landing Pages',
    shortDesc: 'Páginas de aterrizaje de ultra alta conversión diseñadas para maximizar ventas.',
    image: '/services/leaf-5.svg',
    tag: 'Conversión',
    bullets: [
      'Estructura persuasiva orientada a captación y ventas directas',
      'Formularios de captura conectados a WhatsApp o CRM al instante',
      'A/B Testing y analítica de comportamiento de usuario'
    ]
  },
  {
    id: 'diseno-web',
    category: 'web',
    title: 'Diseño Web',
    shortDesc: 'Estética de vanguardia con acabados premium que diferencian tu marca al instante.',
    image: '/services/leaf-6.svg',
    tag: 'Creative UI',
    bullets: [
      'Micro-interacciones y efectos visuales de última generación',
      'Sistemas de diseño escalables en Figma listos para desarrollo',
      'Jerarquía visual limpia que transmite confianza y autoridad'
    ]
  },
  {
    id: 'ui-ux',
    category: 'web',
    title: 'Diseño UI/UX',
    shortDesc: 'Investigación de usuarios, wireframing interactivo y arquitecturas de información intuitivas.',
    image: '/services/leaf-7.svg',
    tag: 'User Experience',
    bullets: [
      'Pruebas de usabilidad y mapeo de flujos de usuario (User Journeys)',
      'Prototipado interactivo de alta fidelidad',
      'Optimización de tasas de conversión y reducción de fricción'
    ]
  },
  {
    id: 'branding',
    category: 'web',
    title: 'Branding Digital',
    shortDesc: 'Construcción de identidad de marca sólida, manual de estilo y presencia corporativa.',
    image: '/services/leaf-8.svg',
    tag: 'Identidad',
    bullets: [
      'Identidad visual, tipografía, paleta de colores y kits de marca',
      'Manual de uso y lineamientos digitales para redes y web',
      'Diseño de assets corporativos y presentaciones ejecutivas'
    ]
  },

  // Pillar 2: Automatización & IA
  {
    id: 'automatizacion',
    category: 'ai',
    title: 'Automatización de Procesos',
    shortDesc: 'Eliminación de cuellos de botella mediante flujos inteligentes y bots autónomos (RPA).',
    image: '/services/leaf-9.svg',
    tag: 'RPA & Bots',
    bullets: [
      'Conexión de herramientas y flujos automáticos (Make, Zapier, n8n, Python)',
      'Bots para clasificación de correos, facturación y recordatorios',
      'Reducción de hasta un 80% en tiempo de tareas manuales repetitivas'
    ]
  },
  {
    id: 'capacitaciones-ia',
    category: 'ai',
    title: 'Capacitaciones Corporativas IA',
    shortDesc: 'Formación estratégica para equipos en adopción de IA generativa y productividad extrema.',
    image: '/services/leaf-10.svg',
    tag: 'Workshops IA',
    bullets: [
      'Talleres prácticos de ChatGPT, Claude, Copilot y agentes de IA',
      'Creación de asistentes virtuales personalizados para tu empresa',
      'Seguridad de la información y buenas prácticas éticas en el uso de IA'
    ]
  },
  {
    id: 'project-management',
    category: 'ai',
    title: 'Project Management',
    shortDesc: 'Dirección ágil de proyectos tecnológicos garantizando cumplimiento en tiempo y calidad.',
    image: '/services/leaf-11.svg',
    tag: 'Agile Delivery',
    bullets: [
      'Metodologías Scrum / Agile adaptadas a tus objetivos',
      'Seguimiento de hitos con entregables claros y transparentes',
      'Gestión de riesgos técnicos y aseguramiento de calidad (QA)'
    ]
  },

  // Pillar 3: Estrategia, Datos & Revenue
  {
    id: 'revenue-management',
    category: 'data',
    title: 'Revenue Management',
    shortDesc: 'Optimización de precios dinámicos, estructuras de monetización y maximización de margen.',
    image: '/services/leaf-12.svg',
    tag: 'Crecimiento',
    bullets: [
      'Modelos de precios dinámicos y estrategias de empaquetado de servicios',
      'Análisis de elasticidad y comportamiento de compra del cliente',
      'Estrategias para aumentar el Ticket Promedio y el Lifetime Value'
    ]
  },
  {
    id: 'analisis-datos',
    category: 'data',
    title: 'Análisis de Datos & BI',
    shortDesc: 'Transformación de datos brutos en inteligencia de negocio accionable para tomar decisiones.',
    image: '/services/leaf-13.svg',
    tag: 'Analytics',
    bullets: [
      'Limpieza y centralización de datos de múltiples fuentes',
      'Reportes automáticos semanales / mensuales enviados a tu correo',
      'Identificación de oportunidades de venta y fugas de rentabilidad'
    ]
  },
  {
    id: 'visual-management',
    category: 'data',
    title: 'Visual Management',
    shortDesc: 'Dashboards ejecutivos interactivos con métricas y KPIs clave en tiempo real.',
    image: '/services/leaf-14.svg',
    tag: 'Dashboards',
    bullets: [
      'Paneles en PowerBI, Grafana o soluciones web customizadas',
      'Visualización en vivo de ventas, inventario y rendimiento de equipo',
      'Alertas tempranas ante caídas en KPIs críticos'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Todos los Servicios', count: '14' },
  { id: 'web', label: 'Desarrollo & Ecosistemas', count: '8' },
  { id: 'ai', label: 'Automatización & IA', count: '3' },
  { id: 'data', label: 'Data & Revenue', count: '3' }
];

const ScrollyTellingSection = () => {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredServices = activeCategory === 'all' 
    ? ALL_SERVICES 
    : ALL_SERVICES.filter(s => s.category === activeCategory);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for header
      gsap.from('.services-header-badge, .services-main-title, .services-main-subtitle', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      // Subtle float animation on visual command center
      gsap.to('.command-visual-container', {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, sectionRef);

    // 3D tilt interaction on the visual graphic
    const visual = visualRef.current;
    const handleMouseMove = (e) => {
      if (!visual) return;
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(visual.querySelector('.command-center-img'), {
        rotationY: x * 12,
        rotationX: -y * 12,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      if (!visual) return;
      gsap.to(visual.querySelector('.command-center-img'), {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.7
      });
    };

    if (visual) {
      visual.addEventListener('mousemove', handleMouseMove);
      visual.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (visual) {
        visual.removeEventListener('mousemove', handleMouseMove);
        visual.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="services-ecosystem-section" ref={sectionRef} id="servicios">
      <div className="ambient-glow-services"></div>
      
      <div className="container services-container">
        {/* Section Header */}
        <div className="services-header">
          <div className="services-header-badge">
            <Sparkles size={15} className="badge-sparkle" />
            <span>Ecosistema de Soluciones Integrales</span>
          </div>
          <h2 className="services-main-title">
            Tecnología, IA y Estrategia <br />
            <span className="text-glow">para escalar tu negocio.</span>
          </h2>
          <p className="services-main-subtitle">
            Unificamos ingeniería de software de alto impacto, automatizaciones inteligentes y analítica avanzada para transformar la operación de tu empresa.
          </p>
        </div>

        {/* Category Tabs Switcher */}
        <div className="services-tabs-wrapper">
          <div className="services-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`service-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedId(null);
                }}
              >
                <span>{cat.label}</span>
                <span className="tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Interactive Expandable List + Command Center */}
        <div className="services-body-grid">
          
          {/* Left Column: Interactive Accordion Services List */}
          <div className="services-left-col">
            <div className="services-accordion-list">
              {filteredServices.map((service, index) => {
                const isExpanded = expandedId === service.id;
                const formattedIndex = String(index + 1).padStart(2, '0');

                return (
                  <div
                    key={service.id}
                    className={`service-accordion-item glass-card ${isExpanded ? 'is-expanded' : ''}`}
                  >
                    {/* Horizontal Botanical Header Strip (topedeservicios.png) */}
                    <div 
                      className="service-card-top-strip"
                      onClick={() => toggleExpand(service.id)}
                    >
                      <img 
                        src="/topedeservicios.png" 
                        alt="Ruta Digital" 
                        className="service-top-strip-img" 
                        loading="lazy"
                      />
                      <div className="service-top-strip-overlay"></div>
                      <div className="service-number-pill">
                        <span>{formattedIndex}</span>
                      </div>
                    </div>

                    {/* Header Row (Clickable) */}
                    <div 
                      className="accordion-header"
                      onClick={() => toggleExpand(service.id)}
                    >
                      <div className="accordion-header-left">
                        <div className="accordion-title-group">
                          <h3 className="service-title">{service.title}</h3>
                          <span className="service-tag">{service.tag}</span>
                        </div>
                      </div>

                      <div className="accordion-toggle-btn">
                        <span className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}>+</span>
                      </div>
                    </div>

                    {/* Expandable Body (Pure textual details without internal images) */}
                    <div 
                      className="accordion-content-wrapper"
                      style={{ 
                        maxHeight: isExpanded ? '500px' : '0px',
                        opacity: isExpanded ? 1 : 0
                      }}
                    >
                      <div className="accordion-content">
                        <p className="service-desc">{service.shortDesc}</p>
                        
                        {/* Key Deliverables / Features List */}
                        <div className="service-deliverables">
                          <span className="deliverables-heading">Alcance y Capacidades:</span>
                          <ul className="deliverables-list">
                            {service.bullets.map((bullet, idx) => (
                              <li key={idx} className="deliverable-item">
                                <CheckCircle2 size={15} className="deliverable-check" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Quick Quote Action */}
                        <div className="accordion-action-footer">
                          <a href="#contacto" className="service-cta-link">
                            <span>Cotizar {service.title}</span>
                            <ArrowRight size={15} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Card */}
            <div className="services-cta-bar glass-card">
              <div className="cta-bar-info">
                <Zap size={22} className="cta-bar-icon" />
                <div>
                  <h4>¿Requieres una integración personalizada?</h4>
                  <p>Diseñamos la arquitectura exacta que tu operación requiere.</p>
                </div>
              </div>
              <a href="#contacto" className="btn-primary cta-bar-btn">
                Iniciar Proyecto <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: 4K Command Center Showcase & Telemetry */}
          <div className="services-right-col" ref={visualRef}>
            <div className="command-visual-container">
              
              {/* Top Telemetry Header Badge */}
              <div className="telemetry-badge telemetry-top">
                <CheckCircle2 size={16} className="telemetry-icon" />
                <span>Ecosistema Conectado 24/7</span>
              </div>

              {/* 4K Botanical Ecosystem Showcase Graphic */}
              <div className="image-frame-glow">
                <img 
                  src="/fondofoto.png" 
                  alt="Ruta Digital - Naturaleza y Tecnología" 
                  className="command-center-img botanical-showcase-img" 
                  loading="lazy"
                />
                <div className="botanical-showcase-overlay"></div>
              </div>

              {/* Live Architecture & Tech Specs Card */}
              <div className="command-telemetry-card glass-card">
                <div className="telemetry-card-header">
                  <div className="telemetry-indicator">
                    <span className="status-dot"></span>
                    <span className="telemetry-title">Infraestructura de Alto Desempeño</span>
                  </div>
                  <span className="telemetry-status-pill">Producción Activa</span>
                </div>

                <p className="telemetry-card-desc">
                  Todas las soluciones se despliegan bajo estándares de seguridad corporativa, alta disponibilidad y arquitectura cloud-native escalable.
                </p>

                <div className="telemetry-chips-grid">
                  <div className="telemetry-chip">
                    <span className="chip-label">Disponibilidad</span>
                    <span className="chip-val">99.9% Uptime</span>
                  </div>
                  <div className="telemetry-chip">
                    <span className="chip-label">Seguridad</span>
                    <span className="chip-val">SSL / TLS &amp; Auth</span>
                  </div>
                  <div className="telemetry-chip">
                    <span className="chip-label">Velocidad</span>
                    <span className="chip-val">Edge CDN Ultra Fast</span>
                  </div>
                  <div className="telemetry-chip">
                    <span className="chip-label">Soporte</span>
                    <span className="chip-val">Directo &amp; Continuo</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScrollyTellingSection;

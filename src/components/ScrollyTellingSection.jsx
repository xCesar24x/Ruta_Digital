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
    icon: Code2,
    tag: 'Full-Stack'
  },
  {
    id: 'software',
    category: 'web',
    title: 'Software a Medida',
    shortDesc: 'Sistemas a medida diseñados para resolver la lógica operativa exacta de tu negocio.',
    icon: Monitor,
    tag: 'Custom Core'
  },
  {
    id: 'aplicaciones-web',
    category: 'web',
    title: 'Aplicaciones Web',
    shortDesc: 'Web apps interactivas, escalables y seguras con experiencia de usuario fluida.',
    icon: Layers,
    tag: 'SaaS / PWA'
  },
  {
    id: 'ecosistemas-web',
    category: 'web',
    title: 'Ecosistemas Web',
    shortDesc: 'Infraestructuras digitales completas conectadas con CRM, ERP y pasarelas.',
    icon: Globe2,
    tag: 'Enterprise'
  },
  {
    id: 'landing-pages',
    category: 'web',
    title: 'Landing Pages',
    shortDesc: 'Páginas de aterrizaje de ultra alta conversión diseñadas para maximizar ventas.',
    icon: Layout,
    tag: 'Conversión'
  },
  {
    id: 'diseno-web',
    category: 'web',
    title: 'Diseño Web',
    shortDesc: 'Estética de vanguardia con acabados premium que diferencian tu marca al instante.',
    icon: Palette,
    tag: 'Creative UI'
  },
  {
    id: 'ui-ux',
    category: 'web',
    title: 'Diseño UI/UX',
    shortDesc: 'Investigación de usuarios, wireframing interactivo y arquitecturas de información intuitivas.',
    icon: Sparkles,
    tag: 'User Experience'
  },
  {
    id: 'branding',
    category: 'web',
    title: 'Branding Digital',
    shortDesc: 'Construcción de identidad de marca sólida, manual de estilo y presencia corporativa.',
    icon: Palette,
    tag: 'Identidad'
  },

  // Pillar 2: Automatización & IA
  {
    id: 'automatizacion',
    category: 'ai',
    title: 'Automatización de Procesos',
    shortDesc: 'Eliminación de cuellos de botella mediante flujos inteligentes y bots autónomos (RPA).',
    icon: Workflow,
    tag: 'RPA & Bots'
  },
  {
    id: 'capacitaciones-ia',
    category: 'ai',
    title: 'Capacitaciones Corporativas IA',
    shortDesc: 'Formación estratégica para equipos en adopción de IA generativa y productividad extrema.',
    icon: GraduationCap,
    tag: 'Workshops IA'
  },
  {
    id: 'project-management',
    category: 'ai',
    title: 'Project Management',
    shortDesc: 'Dirección ágil de proyectos tecnológicos garantizando cumplimiento en tiempo y calidad.',
    icon: Kanban,
    tag: 'Agile Delivery'
  },

  // Pillar 3: Estrategia, Datos & Revenue
  {
    id: 'revenue-management',
    category: 'data',
    title: 'Revenue Management',
    shortDesc: 'Optimización de precios dinámicos, estructuras de monetización y maximización de margen.',
    icon: TrendingUp,
    tag: 'Crecimiento'
  },
  {
    id: 'analisis-datos',
    category: 'data',
    title: 'Análisis de Datos & BI',
    shortDesc: 'Transformación de datos brutos en inteligencia de negocio accionable para tomar decisiones.',
    icon: Database,
    tag: 'Analytics'
  },
  {
    id: 'visual-management',
    category: 'data',
    title: 'Visual Management',
    shortDesc: 'Dashboards ejecutivos interactivos con métricas y KPIs clave en tiempo real.',
    icon: BarChart3,
    tag: 'Dashboards'
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
  const [activeService, setActiveService] = useState(ALL_SERVICES[0]);

  const filteredServices = activeCategory === 'all' 
    ? ALL_SERVICES 
    : ALL_SERVICES.filter(s => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for header and cards
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

      gsap.from('.service-pill-card', {
        y: 25,
        opacity: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%'
        }
      });

      // Subtle float animation on visual command center
      gsap.to('.command-visual-container', {
        y: -12,
        duration: 3,
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
        rotationY: x * 14,
        rotationX: -y * 14,
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
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Services Grid + 4K Visual Command Center */}
        <div className="services-body-grid">
          
          {/* Left Column: Interactive Services Grid */}
          <div className="services-left-col">
            <div className="services-grid">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                const isSelected = activeService.id === service.id;
                return (
                  <div
                    key={service.id}
                    className={`service-pill-card glass-card ${isSelected ? 'active-card' : ''}`}
                    onClick={() => setActiveService(service)}
                  >
                    <div className="service-card-top">
                      <div className="service-icon-box">
                        <IconComponent size={20} className="service-icon" />
                      </div>
                      <span className="service-tag">{service.tag}</span>
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.shortDesc}</p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Card */}
            <div className="services-cta-bar glass-card">
              <div className="cta-bar-info">
                <Zap size={22} className="cta-bar-icon" />
                <div>
                  <h4>¿Necesitas una solución personalizada?</h4>
                  <p>Diseñamos la arquitectura exacta que tu operación requiere.</p>
                </div>
              </div>
              <a href="#contacto" className="btn-primary cta-bar-btn">
                Iniciar Proyecto <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: 4K Command Center Showcase */}
          <div className="services-right-col" ref={visualRef}>
            <div className="command-visual-container">
              
              {/* Floating Holographic Telemetry Badges */}
              <div className="telemetry-badge telemetry-top">
                <CheckCircle2 size={16} className="telemetry-icon" />
                <span>Ecosistema Conectado 24/7</span>
              </div>

              <div className="telemetry-badge telemetry-bottom">
                <Cpu size={16} className="telemetry-icon" />
                <span>IA &amp; Automatización Activa</span>
              </div>

              {/* 4K Command Center Visual Graphic */}
              <div className="image-frame-glow">
                <img 
                  src="/services-ecosystem.png" 
                  alt="Ruta Digital - Ecosistema y Centro de Comando Digital" 
                  className="command-center-img"
                  loading="lazy"
                />
              </div>

              {/* Detail preview of currently selected service */}
              <div className="active-service-spotlight glass-card">
                <div className="spotlight-header">
                  <span className="spotlight-badge">Detalle del Servicio</span>
                  <span className="spotlight-tag">{activeService.tag}</span>
                </div>
                <h4 className="spotlight-title">{activeService.title}</h4>
                <p className="spotlight-desc">{activeService.shortDesc}</p>
                <div className="spotlight-footer">
                  <span className="spotlight-status">
                    <span className="status-dot"></span> Disponible para integración inmediata
                  </span>
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

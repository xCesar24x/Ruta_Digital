// Todo el texto comercial de la landing vive aquí: ofertas, planes, casos y
// preguntas. Para cambiar un precio o una frase, se edita este archivo.

// Mensajes prellenados de WhatsApp (uno por botón)
export const MESSAGES = {
  general: '¡Hola Ruta Digital! Quiero agendar el diagnóstico gratis de 30 minutos. Mi negocio es: ',
  presencia: '¡Hola Ruta Digital! Me interesa *Presencia que vende* (web + WhatsApp + Google) para mi negocio. Mi negocio es: ',
  automatizacion: '¡Hola Ruta Digital! Quiero agendar el diagnóstico gratis de 30 minutos para *Automatizá tu operación*. Lo que más tiempo nos quita hoy es: ',
  revenue: '¡Hola Ruta Digital! Me interesa la *Auditoría de precios y ocupación* para mi negocio de turismo. Tengo: ',
  planes: '¡Hola Ruta Digital! Quiero información de los planes mensuales. Me interesa el plan de: ',
  otros: '¡Hola Ruta Digital! Quiero consultar por otro servicio: ',
};

// Cada paquete tiene un resumen (la tarjeta) y un detalle (el panel "Ver todo
// lo que incluye"). Las líneas marcadas con PROPUESTA son compromisos de
// alcance que hay que confirmar antes de publicar.
export const OFFERS = [
  {
    key: 'presencia',
    id: 'oferta-presencia',
    audience: 'Para pymes locales',
    badge: 'El más pedido', // los 8 proyectos del portafolio son de este tipo
    title: 'Presencia que vende',
    navHint: 'Web + WhatsApp + Google · desde ₡350.000',
    pitch: 'Que te encuentren en Google y te escriban por WhatsApp. Para barberías, gyms, ferreterías, grúas y restaurantes.',
    price: { label: 'Desde', value: '₡350.000' },
    includes: [
      'Web propia, rápida y lista para celular',
      'Botón directo a tu WhatsApp',
      'Perfil de Google Business optimizado',
      'Formulario de contacto',
    ],
    delivery: '7 a 10 días',
    monthly: '₡35.000/mes (opcional)',
    extra: 'Citas y recordatorios automáticos por WhatsApp: +₡20.000/mes',
    cta: 'Quiero mi web',
    message: MESSAGES.presencia,
    detail: {
      promise: 'Que te encuentren en Google, confíen al ver tu web y te escriban por WhatsApp.',
      pains: [
        'Te buscan en Google y aparece tu competencia, o nada.',
        'Contestás las mismas preguntas todo el día: precio, horario y ubicación.',
        'Tu negocio vive solo en Instagram y depende del algoritmo.',
      ],
      outcomes: [
        'Aparecés en Google y Maps con fotos, horario y ubicación.',
        'Tu web responde esas preguntas antes de que te escriban.',
        'Cada visita está a un toque de tu WhatsApp.',
      ],
      groups: [
        {
          title: 'Tu web',
          items: [
            'Diseño a la medida de tu marca, no una plantilla',
            'Hasta 5 secciones: inicio, servicios, galería, ubicación y contacto', // PROPUESTA
            'Lista para celular y rápida de cargar',
            'Publicada en tu propio dominio',
          ],
        },
        {
          title: 'WhatsApp',
          items: [
            'Botón de WhatsApp visible en toda la web',
            'Mensajes prellenados según lo que la persona estaba viendo',
            'Formulario de contacto que te llega directo',
          ],
        },
        {
          title: 'Google',
          items: [
            'Perfil de Google Business optimizado: categorías, horario, fotos y ubicación',
            'SEO básico para que Google entienda qué vendés y dónde',
            'Cómo llegar con Google Maps y Waze',
          ],
        },
        {
          title: 'Si lo necesitás (se suma aparte)',
          items: [
            'Citas y recordatorios automáticos por WhatsApp: +₡20.000/mes',
            'Reservas en línea, catálogo o tienda: se cotiza',
          ],
        },
      ],
      steps: [
        { when: 'Día 1', title: 'Llamada de 30 minutos', text: 'Nos contás de tu negocio, tus clientes y qué querés lograr.' },
        { when: 'Días 1–2', title: 'Nos mandás tu material', text: 'Logo, fotos, horarios y precios. Te pasamos una lista para que no se te olvide nada.' },
        { when: 'Días 3–7', title: 'Diseñamos y construimos', text: 'Te mandamos avances por WhatsApp para que veás cómo va quedando.' },
        { when: 'Día 8', title: 'Revisás y pedís cambios', text: 'Incluye 2 rondas de ajustes en textos, fotos y detalles.' }, // PROPUESTA
        { when: 'Días 9–10', title: 'Publicamos', text: 'Tu web sale en línea y dejamos listo tu perfil de Google.' },
      ],
      needs: [
        'Tu logo',
        'Fotos de tu negocio, productos o trabajos',
        'Horarios, precios y servicios',
        'Acceso a tu perfil de Google Business (o lo creamos juntos)',
      ],
      investment: {
        label: 'Desde',
        price: '₡350.000',
        payment: '50% para arrancar y 50% cuando tu web está lista.',
        monthly: {
          label: 'Plan mensual opcional',
          price: '₡35.000/mes',
          perDay: 'Menos de ₡1.200 al día',
          items: ['Hosting y dominio', 'Cambios menores', 'Soporte por WhatsApp', 'Reporte mensual de visitas'],
        },
        factors: ['Más de 5 secciones', 'Tienda o pagos en línea', 'Reservas o catálogo con inventario'],
      },
      guarantees: [
        'Pagás la mitad hasta ver tu web terminada.',
        '30 días de garantía para corregir cualquier error.',
        'La web es tuya cuando completás el pago.',
        'El plan mensual es opcional y lo podés dejar cuando querás.', // PROPUESTA
      ],
      examples: [
        { name: "Mr. John's Barbería", url: 'https://www.mrjohnsbarbier.com/' },
        { name: 'Ferretería La Herradura', url: 'https://www.ferreterialaherraduracr.com/' },
        { name: 'Cabañas del Bosque', url: 'https://www.cabanasdelbosque.lat/' },
      ],
      examplesNote: 'Algunos incluyen extras como reservas o catálogo.',
      notIncluded: ['Tienda con pagos en línea (se cotiza aparte)', 'Manejo de redes sociales', 'Publicidad pagada en Google o Meta'],
    },
  },
  {
    key: 'automatizacion',
    id: 'oferta-automatizacion',
    audience: 'Para empresas medianas',
    title: 'Automatizá tu operación',
    navHint: 'Power BI, Power Automate y reportes · desde $1.500',
    pitch: 'Menos horas armando reportes a mano en finanzas, RRHH, ventas y operaciones.',
    price: { label: 'Proyecto desde', value: '$1.500' },
    includes: [
      'Dashboards en Power BI',
      'Flujos en Power Automate',
      'Reportes que llegan solos a tu correo',
      'Procesos en Excel y VBA',
    ],
    delivery: 'Según el alcance',
    monthly: 'Soporte desde $300/mes',
    cta: 'Agendar diagnóstico gratis',
    message: MESSAGES.automatizacion,
    detail: {
      promise: 'Que los reportes se hagan solos y tu equipo use ese tiempo en lo que sí importa.',
      pains: [
        'Alguien pasa horas cada semana copiando datos de un Excel a otro.',
        'El reporte del mes llega tarde y nadie está seguro de los números.',
        'Si la persona que arma el Excel se va, nadie sabe cómo funciona.',
      ],
      outcomes: [
        'Los indicadores se actualizan solos y todos ven los mismos números.',
        'Las tareas repetitivas corren sin que nadie las toque.',
        'Todo queda documentado: no depende de una sola persona.',
      ],
      groups: [
        {
          title: 'Diagnóstico',
          items: [
            'Mapeo de los procesos que hoy se hacen a mano',
            'Cuántas horas consume cada uno',
            'Qué conviene automatizar primero: lo que más ahorra con menos esfuerzo',
          ],
        },
        {
          title: 'Dashboards',
          items: [
            'Dashboards en Power BI con los indicadores de tu gerencia',
            'Datos de varias fuentes, limpios y en un solo lugar',
            'Alertas cuando un indicador se sale de rango',
          ],
        },
        {
          title: 'Automatización',
          items: [
            'Flujos en Power Automate: aprobaciones, avisos y tareas repetitivas',
            'Reportes semanales o mensuales que llegan solos a tu correo',
            'Excel y VBA cuando conviene quedarse en Excel',
          ],
        },
        {
          title: 'Para que no dependás de nadie',
          items: [
            'Documentación clara de cada proceso',
            'Capacitación para tu equipo',
          ],
        },
      ],
      steps: [
        { when: 'Inicio', title: 'Llamada gratis de 30 minutos', text: 'Nos contás dónde se le va el tiempo a tu equipo.' },
        { when: 'Diagnóstico', title: 'Propuesta con precio final', text: 'Revisamos tus procesos y te mandamos alcance, precio y fecha de entrega.' },
        { when: 'Construcción', title: 'Entregas cortas por etapas', text: 'Ves avances funcionando con tus datos desde las primeras semanas.' },
        { when: 'Pruebas', title: 'Validamos con datos reales', text: 'Revisamos los números con tu equipo antes de soltar nada.' },
        { when: 'Entrega', title: 'Capacitación y documentación', text: 'Tu equipo aprende a usarlo y queda todo por escrito.' },
      ],
      needs: [
        'Una persona de contacto en el área',
        'Acceso a los archivos o sistemas que usan hoy',
        'Licencias de Microsoft de tu empresa (Power BI, Power Automate)', // PROPUESTA
        'Un rato por semana para revisar avances',
      ],
      investment: {
        label: 'Proyecto desde',
        price: '$1.500',
        payment: '50% para arrancar y 50% contra entrega.',
        perspective: 'Para ponerlo en perspectiva: 5 horas por semana armando reportes son unas 20 horas al mes de tu equipo.',
        monthly: {
          label: 'Soporte mensual opcional',
          price: 'Desde $300/mes',
          perDay: 'Unos $10 al día',
          items: ['Soporte de tus dashboards, flujos y reportes', 'Alcance definido en el diagnóstico'],
        },
        factors: ['Cuántos procesos automatizamos', 'Cuántas fuentes de datos hay que conectar', 'Si hay que limpiar datos históricos'],
      },
      guarantees: [
        'Pagás la mitad hasta recibir la solución funcionando.',
        '30 días de garantía para corregir cualquier error.',
        'Firmamos acuerdo de confidencialidad (NDA) si lo necesitás.',
        'Tus datos no se usan para entrenar modelos públicos ni se comparten.',
      ],
      notIncluded: ['Licencias de Microsoft (las paga tu empresa)', 'Software a medida fuera de Excel y Power Platform (se cotiza aparte)'],
    },
  },
  {
    key: 'revenue',
    id: 'oferta-revenue',
    audience: 'Para turismo',
    title: 'Revenue para turismo',
    navHint: 'Precios y ocupación para turismo · auditoría $400',
    pitch: 'Precios que siguen la demanda, para cabañas, hoteles pequeños y rent-a-car.',
    price: { label: 'Auditoría de precios y ocupación', value: '$400' },
    includes: [
      'Auditoría de tus precios y ocupación',
      'Tarifas recomendadas por temporada',
      'Acompañamiento mensual de precios',
      'Dashboard de ocupación y tarifas',
    ],
    delivery: 'Según el alcance',
    monthly: 'Acompañamiento desde $250/mes',
    cta: 'Pedir auditoría de revenue',
    message: MESSAGES.revenue,
    detail: {
      promise: 'Precios que suben cuando hay demanda y te ayudan a llenar cuando no la hay.',
      explainer: {
        title: '¿Qué es revenue management?',
        text: 'Vender la misma noche, o el mismo carro, al precio correcto según la demanda. Lo hacen las cadenas grandes; nosotros lo adaptamos al tamaño de tu negocio.',
      },
      pains: [
        'Cobrás lo mismo en Semana Santa que un martes de setiembre.',
        'Bajás precios a ojo cuando ves el calendario vacío.',
        'No sabés cuánto te queda por noche, o por carro, después de comisiones.',
      ],
      outcomes: [
        'Sabés qué precio poner en cada temporada y por qué.',
        'Ves ocupación, tarifa promedio e ingresos en un solo lugar.',
        'Decidís con datos, no a ojo.',
      ],
      groups: [
        {
          title: 'Auditoría de precios y ocupación · $400',
          items: [
            'Análisis de tus precios y ocupación de los últimos meses',
            'Calendario de temporadas y fechas que mueven la demanda',
            'Comparación con opciones parecidas en tu zona', // PROPUESTA
            'Tarifas recomendadas para cada temporada',
          ],
        },
        {
          title: 'Acompañamiento mensual · desde $250/mes',
          items: [
            'Revisión y ajuste de precios cada mes',
            'Dashboard de ocupación, tarifa promedio e ingresos',
            'Reunión mensual para revisar resultados', // PROPUESTA
          ],
        },
      ],
      steps: [
        { when: 'Inicio', title: 'Llamada gratis de 30 minutos', text: 'Nos contás cómo ponés precios hoy y en qué plataformas vendés.' },
        { when: 'Datos', title: 'Nos compartís tu historial', text: 'Reservas y precios. Te decimos exactamente qué exportar.' },
        { when: 'Auditoría', title: 'Analizamos tu negocio', text: 'Precios, ocupación, temporadas y lo que te cuestan las comisiones.' },
        { when: 'Entrega', title: 'Te explicamos qué cambiar', text: 'Una sesión con recomendaciones concretas, no un informe genérico.' },
        { when: 'Cada mes', title: 'Acompañamiento (opcional)', text: 'Ajustamos precios según lo que va pasando y lo ves en tu dashboard.' },
      ],
      needs: [
        'Historial de reservas y precios, idealmente de 12 meses',
        'Exportes o acceso a tus plataformas (Airbnb, Booking o sistema propio)',
        'Tus costos por noche o por vehículo',
      ],
      investment: {
        label: 'Auditoría de precios y ocupación',
        price: '$400',
        payment: '50% para arrancar y 50% al entregar la auditoría.',
        perspective: 'Para ponerlo en perspectiva: cobrar ₡5.000 más por noche en 40 noches de temporada alta son ₡200.000 más en el año.',
        monthly: {
          label: 'Acompañamiento mensual opcional',
          price: 'Desde $250/mes',
          perDay: 'Menos de $9 al día',
          items: ['Ajuste de precios cada mes', 'Dashboard de ocupación y tarifas'],
        },
        factors: ['Cuántas unidades manejás (cabañas, habitaciones o carros)', 'En cuántas plataformas vendés'],
      },
      guarantees: [
        'Pagás la mitad hasta recibir la auditoría.',
        'Recomendaciones concretas que podés aplicar desde el día siguiente.',
        'El acompañamiento mensual es opcional.',
        'Tus datos de reservas e ingresos son confidenciales.',
      ],
      notIncluded: ['Manejo diario de tus reservas o plataformas', 'Publicidad pagada'],
    },
  },
];

export const findOffer = (key) => OFFERS.find((offer) => offer.key === key);

export const EXTRA_SERVICES = 'También hacemos software a medida, SaaS, branding y capacitaciones de IA.';

export const PLANS = [
  {
    name: 'Presencia',
    prefix: '',
    price: '₡35.000',
    items: ['Hosting y dominio', 'Cambios menores', 'Soporte por WhatsApp', 'Reporte mensual de visitas'],
    extra: 'Citas y recordatorios por WhatsApp: +₡20.000/mes',
  },
  {
    name: 'Automatización',
    prefix: 'Desde',
    price: '$300',
    items: ['Soporte de tus dashboards, flujos y reportes', 'Alcance definido en el diagnóstico'],
  },
  {
    name: 'Revenue',
    prefix: 'Desde',
    price: '$250',
    items: ['Acompañamiento mensual de precios', 'Dashboard de ocupación y tarifas'],
  },
];

// Casos de clientes. Lo que empieza con "[COMPLETAR" se ve resaltado en local
// y NO se publica: en producción solo salen los casos completos.
export const CASES = [
  {
    client: "Mr. John's Barbería",
    meta: 'Barbería · San Ramón',
    logo: '/Logos Proyectos finalizados/Mrs Jhons Barbier.png',
    url: 'https://www.mrjohnsbarbier.com/',
    problem: '[COMPLETAR: cómo recibían citas antes y qué se les complicaba]',
    whatWeDid: [
      'Web con servicios y precios visibles',
      'Reservas en línea: el cliente escoge día, hora y servicio',
      'Galería conectada a su Instagram',
    ],
    result: { value: '[COMPLETAR]', label: '[COMPLETAR: ej. citas al mes desde la web]' },
  },
  {
    client: 'Ferretería La Herradura',
    meta: 'Ferretería · Heredia, desde 1960',
    logo: '/Logos Proyectos finalizados/Ferreteria La Herradura.jpeg',
    url: 'https://www.ferreterialaherraduracr.com/',
    problem: '[COMPLETAR: qué problema tenían con pedidos o cotizaciones]',
    whatWeDid: [
      'Catálogo en línea por categoría, con precios y existencias',
      'La lista de WhatsApp del maestro de obras se convierte en carrito',
      'Proforma en PDF al instante',
    ],
    result: { value: '[COMPLETAR]', label: '[COMPLETAR: ej. pedidos o proformas al mes]' },
  },
  {
    client: 'Cabañas del Bosque',
    meta: 'Turismo · Ángeles Norte, San Ramón',
    logo: '/Logos Proyectos finalizados/cabañas del bosque.png',
    url: 'https://www.cabanasdelbosque.lat/',
    problem: '[COMPLETAR: de dónde venían sus reservas antes]',
    whatWeDid: [
      'Sitio propio con galería y comodidades',
      'Reservas directas con calendario de fechas',
      'Ubicación con Waze para llegar sin perderse',
    ],
    result: { value: '[COMPLETAR]', label: '[COMPLETAR: ej. reservas directas al mes, sin comisión]' },
  },
];

export const isPlaceholder = (value) => typeof value === 'string' && value.startsWith('[COMPLETAR');

const caseHasPlaceholders = (item) =>
  [item.problem, item.result.value, item.result.label, ...item.whatWeDid].some(isPlaceholder);

export const VISIBLE_CASES = import.meta.env.DEV ? CASES : CASES.filter((item) => !caseHasPlaceholders(item));

export const FAQS = [
  {
    tag: 'Servicios',
    question: '¿Cuál de las 3 opciones me sirve?',
    answer: 'Si tenés un negocio local y querés que te encuentren y te escriban, es Presencia que vende. Si tu equipo pierde horas en reportes, Excel o tareas repetitivas, es Automatizá tu operación. Si tenés cabañas, un hotel pequeño o un rent-a-car y querés cobrar mejor según la temporada, es Revenue para turismo. ¿No estás seguro? Escribinos y en la llamada gratis de 30 minutos te decimos.',
  },
  {
    tag: 'Precios',
    question: '¿Por qué los precios dicen "desde"?',
    answer: 'Es el punto de partida de un proyecto estándar. El precio final depende de cuántas páginas, integraciones o procesos necesités. Antes de arrancar te mandamos una propuesta con el precio final, el alcance y la fecha de entrega.',
  },
  {
    tag: 'Pagos',
    question: '¿Cómo es la forma de pago?',
    answer: '50% de adelanto para arrancar y 50% contra entrega. Los planes mensuales se pagan por adelantado, al inicio de cada mes.',
  },
  {
    tag: 'Tiempos',
    question: '¿Cuánto tarda cada servicio?',
    answer: 'Una web de Presencia que vende está lista en 7 a 10 días, siempre que nos mandés tu material (logo, fotos y textos) en los primeros dos días. En automatización y revenue depende del alcance: en el diagnóstico te damos una fecha concreta. El paso a paso de cada paquete está en "Ver todo lo que incluye".',
  },
  {
    tag: 'Soporte',
    question: '¿Qué pasa después de la entrega?',
    answer: 'Toda entrega tiene 30 días de garantía para corregir cualquier error. Después podés seguir con un plan mensual para que nos encarguemos de cambios, soporte y, en el caso de las webs, del hosting y el dominio.',
  },
  {
    tag: 'Planes',
    question: '¿El plan mensual es obligatorio?',
    answer: 'No, es opcional. Si preferís no tomarlo, te entregamos los accesos de tu web y tu dominio para que los administrés vos o quien vos escojás.',
  },
  {
    tag: 'Propiedad',
    question: '¿La web queda a mi nombre?',
    answer: 'Sí. Cuando se completa el pago, el proyecto es tuyo. Solo nos reservamos el derecho de mostrarlo en nuestro portafolio.',
  },
  {
    tag: 'Diagnóstico',
    question: '¿Qué incluye el diagnóstico gratis?',
    answer: 'Una llamada de 30 minutos, sin compromiso. Nos contás cómo funciona tu negocio, te decimos qué haríamos y cuánto costaría. La Auditoría de precios y ocupación para turismo es otro servicio ($400), con análisis de tus datos.',
  },
  {
    tag: 'Cobertura',
    question: '¿Trabajan fuera de Costa Rica?',
    answer: 'Sí. Trabajamos en remoto con negocios en Costa Rica y el resto de LATAM. Los proyectos de automatización y revenue se cotizan en dólares.',
  },
];

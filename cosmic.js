/**
 * cosmic.js - Motor de Partículas y Efectos Cósmicos para Ruta Digital
 * Diseñado con Canvas 2D de alta fidelidad, física de partículas y animaciones orquestadas con GSAP.
 */

// -----------------------------------------------------------------------------
// 2. CLASE PRELOADER VORTEX (Espiral de 0% a 100% que colapsa en el centro)
// -----------------------------------------------------------------------------
class PreloaderVortex {
    constructor(canvas, counterEl, container, onComplete) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.counterEl = counterEl;
        this.container = container;
        this.onComplete = onComplete;
        this.width = 0;
        this.height = 0;
        
        // Estado del preloader
        this.progressObj = { value: 0 };
        this.particles = [];
        this.maxParticles = 850; // Aumentado sustancialmente para mayor densidad estelar (polvo fino)
        this.isRunning = true;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.cx = this.width / 2;
        this.cy = this.height / 2;
    }

    initParticles() {
        // Crear partículas del espiral en posiciones iniciales aleatorias en la periferia
        for (let i = 0; i < this.maxParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.max(this.width, this.height) * 0.85 + Math.random() * 250;
            const speed = 0.012 + Math.random() * 0.022;
            // Partículas mucho más pequeñas y finas para un look premium de polvo cósmico
            const size = 0.18 + Math.random() * 0.52;
            
            // Variaciones elegantes de verde neón, esmeralda y menta
            const hue = Math.random() > 0.8 ? 165 : (135 + Math.random() * 20);
            const saturation = 95 + Math.random() * 5;
            const lightness = 45 + Math.random() * 15;
            
            this.particles.push({
                angle: angle,
                dist: dist,
                speed: speed,
                size: size,
                color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.4 + Math.random() * 0.5})`,
                glow: 4 + Math.random() * 8,
                opacity: 0.1
            });
        }
    }

    start() {
        // Animación matemática del contador 0-100 con GSAP (Curva Power1.inOut)
        gsap.to(this.progressObj, {
            value: 100,
            duration: 2.6, // Ajustado para un balance entre velocidad y majestuosidad
            ease: 'power2.out',
            onUpdate: () => {
                const currentVal = Math.floor(this.progressObj.value);
                this.counterEl.innerText = currentVal;
            },
            onComplete: () => {
                this.triggerSupernova();
            }
        });

        this.animate();
    }

    animate() {
        if (!this.isRunning) return;
        requestAnimationFrame(() => this.animate());

        // Efecto de barrido con transparencia para dejar estela suave
        this.ctx.fillStyle = 'rgba(5, 5, 5, 0.16)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const progress = this.progressObj.value; // 0 a 100
        const progressFraction = progress / 100;

        // El radio inicial es enorme (fuera de pantalla) y se reduce progresivamente
        const maxAllowedDist = Math.max(this.width, this.height) * 0.85 * (1 - progressFraction * 0.98);

        this.particles.forEach((p, index) => {
            // El espiral se acelera en órbita a medida que colapsa hacia el centro
            const rotationSpeed = p.speed * (1 + progressFraction * 4.2);
            p.angle += rotationSpeed;

            // Suavizado en la reducción de distancia
            const targetDist = maxAllowedDist + (index % 15) * 8;
            p.dist += (targetDist - p.dist) * 0.07;

            // Opacidad aumenta conforme el espiral se consolida
            p.opacity = 0.25 + (progressFraction * 0.75);

            // Calcular coordenadas usando espiral de brazos ordenados
            const spiralFactor = index * 0.035;
            const x = this.cx + p.dist * Math.cos(p.angle + spiralFactor);
            const y = this.cy + p.dist * Math.sin(p.angle + spiralFactor);

            // Renderizar partícula muy fina
            this.ctx.beginPath();
            this.ctx.arc(x, y, p.size * (1 + progressFraction * 0.3), 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            
            // Sombra brillante sutil solo para partículas de tamaño superior para optimizar rendimiento
            if (p.size > 0.45 && progressFraction > 0.4) {
                this.ctx.shadowBlur = p.glow * (0.3 + progressFraction * 1.2);
                this.ctx.shadowColor = '#00ffaa';
            }

            this.ctx.fill();
            this.ctx.shadowBlur = 0; // Reset
        });

        // Dibujar aros de compresión de energía
        if (progress > 40) {
            const energyRadius = Math.max(2, 140 * (1 - (progress - 40) / 60));
            const energyAlpha = (progress - 40) / 60 * 0.5;
            this.ctx.beginPath();
            this.ctx.arc(this.cx, this.cy, energyRadius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(0, 255, 170, ${energyAlpha})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
        }
    }

    triggerSupernova() {
        this.isRunning = false;
        
        // Transformar el contador en el logo flotante antes de la explosión
        const content = document.getElementById('preloader-content');
        content.innerHTML = '<img src="Ruta.png" alt="Ruta Digital" style="height: 130px; filter: drop-shadow(0 0 25px rgba(0,255,170,0.9)); transform: scale(0.3); opacity: 0;" id="preloader-logo-final">';
        
        const logo = document.getElementById('preloader-logo-final');
        gsap.to(logo, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)'
        });

        // Lanzar motor de partículas de la Supernova Premium simultáneamente
        const supernova = new SupernovaExplosion(this.canvas, this.cx, this.cy, () => {
            // Cuando la supernova colapsa y termina, desvanecer preloader container
            gsap.to(this.container, {
                opacity: 0,
                duration: 0.8, // Tiempo para apreciar el logo disipándose
                ease: 'power2.out',
                onComplete: () => {
                    this.container.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Habilitar scroll
                    if (this.onComplete) this.onComplete();
                }
            });
        });
        supernova.explode();
    }
}

// -----------------------------------------------------------------------------
// 3. CLASE SUPERNOVA EXPLOSION (Estallido radial expansivo con estelas y física avanzada)
// -----------------------------------------------------------------------------
class SupernovaExplosion {
    constructor(canvas, cx, cy, onFinish) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cx = cx;
        this.cy = cy;
        this.onFinish = onFinish;
        this.particles = [];
        this.maxParticles = 1300; // Densidad estelar incrementada masivamente a 1300 para un estallido denso y texturizado
        this.width = canvas.width;
        this.height = canvas.height;
        this.flashAlpha = 1.0; // Destello blanco-caliente inicial
        
        // Definir tres ondas de choque concéntricas con física de retraso
        this.shockwaves = [
            { radius: 0, speed: 22, alpha: 0.95, color: 'rgba(255, 255, 255, 0.5)', width: 1.0 },
            { radius: -25, speed: 16, alpha: 0.8, color: 'rgba(0, 255, 170, 0.4)', width: 2.5 },
            { radius: -50, speed: 12, alpha: 0.6, color: 'rgba(0, 190, 255, 0.3)', width: 4.0 }
        ];

        this.initExplosion();
    }

    initExplosion() {
        for (let i = 0; i < this.maxParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const rand = Math.random();
            
            let speed = 0;
            let decay = 0;
            let size = 0;
            let maxTrailLength = 0;
            let type = ''; // Categorías de física: 'ring', 'jet', 'nebula'

            if (rand < 0.35) {
                // 35% Plasma Shockwave Ring - frente esférico de expansión
                type = 'ring';
                speed = 10.0 + Math.random() * 8.0;
                decay = 0.012 + Math.random() * 0.016;
                size = 0.2 + Math.random() * 0.55;
                maxTrailLength = 7 + Math.floor(Math.random() * 6);
            } else if (rand < 0.65) {
                // 30% Turbulent Jet Filaments - filamentos veloces y retorcidos
                type = 'jet';
                speed = 15.0 + Math.random() * 20.0;
                decay = 0.024 + Math.random() * 0.030;
                size = 0.25 + Math.random() * 0.5;
                maxTrailLength = 12 + Math.floor(Math.random() * 8); // Estelas largas
            } else {
                // 35% Nebular Dust Cloud - gas residual de enfriamiento lento
                type = 'nebula';
                speed = 0.5 + Math.random() * 8.0;
                decay = 0.008 + Math.random() * 0.018;
                size = 0.15 + Math.random() * 0.45;
                maxTrailLength = 3 + Math.floor(Math.random() * 4);
            }

            const drag = type === 'nebula' ? (0.90 + Math.random() * 0.04) : (0.93 + Math.random() * 0.04);
            const swirlDir = Math.random() > 0.5 ? 1 : -1;

            this.particles.push({
                x: this.cx,
                y: this.cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                angle: angle,
                speed: speed,
                size: size,
                drag: drag,
                alpha: 1.0,
                decay: decay,
                swirlDir: swirlDir,
                colorRand: rand,
                type: type,
                // Historial de posiciones para estelas vectoriales cónicas perfectas
                trail: [],
                maxTrailLength: maxTrailLength
            });
        }
    }

    // Retorna un color dinámico según la fase térmica/temperatura de la partícula (Enfriamiento estelar)
    getThermalColor(alpha, rand) {
        if (alpha > 0.82) {
            return `rgba(255, 255, 255, ${alpha})`; // Núcleo incandescente blanco caliente
        } else if (alpha > 0.45) {
            // Fase de plasma verde neón o cian brillante
            return rand > 0.5 
                ? `rgba(0, 255, 170, ${alpha})` 
                : `rgba(0, 210, 255, ${alpha})`;
        } else if (alpha > 0.2) {
            // Fase gaseosa: verde esmeralda o azul espacial profundo
            return rand > 0.5 
                ? `rgba(0, 170, 110, ${alpha})` 
                : `rgba(0, 80, 180, ${alpha})`;
        } else {
            // Brasas finales de enfriamiento antes de disolverse en el vacío
            return `rgba(0, 35, 22, ${alpha})`;
        }
    }

    explode() {
        const run = () => {
            // Detener el loop una vez que todas las partículas e interferencias terminen
            if (this.particles.length === 0 && this.flashAlpha <= 0.01) {
                if (this.onFinish) this.onFinish();
                return;
            }
            requestAnimationFrame(run);

            // Redibujado con arrastre de fotogramas
            this.ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // 1. Renderizar destello radiativo masivo en el centro que decae
            if (this.flashAlpha > 0) {
                const flashGrad = this.ctx.createRadialGradient(
                    this.cx, this.cy, 0, 
                    this.cx, this.cy, Math.max(this.width, this.height) * 0.4
                );
                flashGrad.addColorStop(0, `rgba(255, 255, 255, ${this.flashAlpha * 0.95})`);
                flashGrad.addColorStop(0.15, `rgba(0, 255, 170, ${this.flashAlpha * 0.6})`);
                flashGrad.addColorStop(0.5, `rgba(0, 120, 255, ${this.flashAlpha * 0.15})`);
                flashGrad.addColorStop(1, 'rgba(5, 5, 5, 0)');
                
                this.ctx.fillStyle = flashGrad;
                this.ctx.fillRect(0, 0, this.width, this.height);
                this.flashAlpha -= 0.085;
            }

            // 2. Renderizar Ondas de Choque Físicas Expansivas
            this.shockwaves.forEach(w => {
                if (w.radius >= 0) {
                    w.radius += w.speed;
                    w.alpha -= 0.025;
                    
                    if (w.alpha > 0) {
                        this.ctx.beginPath();
                        this.ctx.arc(this.cx, this.cy, w.radius, 0, Math.PI * 2);
                        this.ctx.strokeStyle = w.color.replace(/[\d\.]+\)$/, `${w.alpha})`);
                        
                        // Si es la onda central interna, pintar cian/blanca
                        if (w.width < 2) {
                            this.ctx.strokeStyle = `rgba(255, 255, 255, ${w.alpha * 0.7})`;
                        }
                        
                        this.ctx.lineWidth = w.width;
                        this.ctx.stroke();
                    }
                } else {
                    w.radius += w.speed; // Esperar activación
                }
            });

            // 3. Renderizar y actualizar partículas expansivas con Estelas Vectoriales Cónicas
            this.particles.forEach((p, index) => {
                // Registrar posición previa antes de desplazar para trazar la estela
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > p.maxTrailLength) {
                    p.trail.shift();
                }

                // Cálculo físico de coordenadas cartesianas
                p.x += p.vx;
                p.y += p.vy;

                // Fricción física
                p.vx *= p.drag;
                p.vy *= p.drag;

                // Añadir torsión orbital decaída e impulsos turbulentos
                const distToCenter = Math.sqrt((p.x - this.cx) * (p.x - this.cx) + (p.y - this.cy) * (p.y - this.cy));
                if (distToCenter > 15) {
                    const tangentialAngle = Math.atan2(p.y - this.cy, p.x - this.cx) + Math.PI / 2;
                    // La torsión orbital disminuye con la distancia espacial
                    const twistMagnitude = 0.08 * p.swirlDir * (1 / (distToCenter * 0.007 + 1)) * p.alpha;
                    p.vx += Math.cos(tangentialAngle) * twistMagnitude;
                    p.vy += Math.sin(tangentialAngle) * twistMagnitude;

                    // Turbulencia orgánica de plasma para las partículas tipo 'jet'
                    if (p.type === 'jet') {
                        // Fuerza sinusoidal oscilante para imitar filamentos arqueados
                        const waveFreq = 0.12;
                        const waveAmp = 0.42 * p.alpha;
                        const waveForce = Math.sin(distToCenter * waveFreq) * waveAmp;
                        
                        const radialAngle = Math.atan2(p.y - this.cy, p.x - this.cx);
                        p.vx += Math.cos(radialAngle + Math.PI / 2) * waveForce;
                        p.vy += Math.sin(radialAngle + Math.PI / 2) * waveForce;
                    }
                }

                // Enfriamiento térmico (Decaimiento de la estrella)
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    this.particles.splice(index, 1);
                    return;
                }

                // Dibujar la estela de luz continua con enfriamiento y afinamiento (Efecto Cometa Premium)
                if (p.trail.length > 1) {
                    for (let j = 1; j < p.trail.length; j++) {
                        const prevPoint = p.trail[j - 1];
                        const currPoint = p.trail[j];
                        const ratio = j / p.trail.length; // 0 (fin) a 1 (cabeza)
                        
                        // Enfriamiento térmico progresivo a lo largo de la cola
                        const segmentAlpha = p.alpha * ratio;
                        const segmentColor = this.getThermalColor(segmentAlpha, p.colorRand);
                        const segmentWidth = p.size * (0.35 + ratio * 0.65); // Conicidad
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(prevPoint.x, prevPoint.y);
                        this.ctx.lineTo(currPoint.x, currPoint.y);
                        this.ctx.strokeStyle = segmentColor;
                        this.ctx.lineWidth = segmentWidth;
                        this.ctx.lineCap = 'round';
                        this.ctx.lineJoin = 'round';
                        
                        // Sutil resplandor para las secciones más incandescentes
                        if (p.type === 'jet' && ratio > 0.7 && p.alpha > 0.45) {
                            this.ctx.shadowBlur = 6 * p.alpha * ratio;
                            this.ctx.shadowColor = '#00ffaa';
                        }
                        
                        this.ctx.stroke();
                        this.ctx.shadowBlur = 0; // Reset
                    }
                }

                // Dibujar núcleo sólido de la cabeza de la partícula
                const headColor = this.getThermalColor(p.alpha, p.colorRand);
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
                this.ctx.fillStyle = headColor;
                this.ctx.fill();
            });
        };
        run();
    }
}

// -----------------------------------------------------------------------------
// 4. CLASE INTERACTIVE GALAXY (Ecosistema estelar rotatorio e interactivo)
// -----------------------------------------------------------------------------
class InteractiveGalaxy {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        
        // Estrellas de fondo de la galaxia (polvo estelar)
        this.dustParticles = [];
        this.maxDust = 1500;
        this.angleOffset = 0;
        
        // Interacción mouse
        this.mouse = { x: -1000, y: -1000, active: false, radius: 120 };
        
        // Configuración de estrellas de servicios principales (Estrellas Notorias)
        this.serviceStars = [
            {
                id: 'landing',
                name: 'Landing Pages',
                price: '$200',
                desc: 'Conversión máxima y diseño premium ultra veloz.',
                targetSelector: '#portafolio', // Selector en la web
                tab: 'pymes',
                subcatIndex: 0, // Primera subcategoría en Pymes
                distance: 220, // Distancia de órbita al núcleo
                angle: 0,
                speed: 0.0018,
                size: 8,
                pulse: 0,
                hovered: false,
                color: '#00ffaa'
            },
            {
                id: 'booking',
                name: 'Motores de Reservas',
                price: '$2500',
                desc: 'Agendamientos interactivos, pasarelas de pago y calendarios.',
                targetSelector: '#portafolio',
                tab: 'pymes',
                subcatIndex: 1, // Segunda subcategoría en Pymes
                distance: 300,
                angle: 1.0,
                speed: 0.0013,
                size: 9,
                pulse: 0,
                hovered: false,
                color: '#00ffaa'
            },
            {
                id: 'kds',
                name: 'KDS Restaurantes',
                price: '$3500',
                desc: 'Comandas digitales, pantallas en cocina y flujos automatizados.',
                targetSelector: '#portafolio',
                tab: 'pymes',
                subcatIndex: 2,
                distance: 380,
                angle: 2.1,
                speed: 0.0010,
                size: 9,
                pulse: 0,
                hovered: false,
                color: '#00ffaa'
            },
            {
                id: 'gym',
                name: 'Ecosistemas Gym',
                price: '$3500',
                desc: 'Control total de membresías, reserva de clases y simulador IoT.',
                targetSelector: '#portafolio',
                tab: 'pymes',
                subcatIndex: 3,
                distance: 460,
                angle: 3.2,
                speed: 0.0008,
                size: 9,
                pulse: 0,
                hovered: false,
                color: '#00ffaa'
            },
            {
                id: 'realestate',
                name: 'Portal Inmobiliario',
                price: '$2500',
                desc: 'Catálogos 360°, filtros avanzados y gestión de agentes premium.',
                targetSelector: '#portafolio',
                tab: 'pymes',
                subcatIndex: 4,
                distance: 530,
                angle: 4.3,
                speed: 0.0006,
                size: 10,
                pulse: 0,
                hovered: false,
                color: '#00ffaa'
            },
            {
                id: 'logistics',
                name: 'Transporte & Logística',
                price: '$2000',
                desc: 'Control de despachos, optimización de rutas y flotas móviles.',
                targetSelector: '#portafolio',
                tab: 'pymes',
                subcatIndex: 5,
                distance: 600,
                angle: 5.4,
                speed: 0.0005,
                size: 9,
                pulse: 0,
                hovered: false,
                color: '#00ffaa'
            }
        ];

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initDust();
        this.setupInteractions();
        this.animate();
    }

    resize() {
        this.width = this.canvas.parentElement.clientWidth;
        this.height = this.canvas.parentElement.clientHeight || window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // El núcleo de la galaxia se ubicará en la mitad derecha en PC, centro en móvil para armonizar con texto
        if (this.width > 968) {
            this.cx = this.width * 0.72; // Lado derecho
            this.cy = this.height * 0.5;
            // Distancias de órbita optimizadas para escritorio
            this.serviceStars.forEach((star, i) => {
                star.distance = 180 + i * 55;
            });
        } else {
            this.cx = this.width * 0.5; // Centro absoluto en móvil
            this.cy = this.height * 0.45;
            // Órbitas más compactas en celular
            this.serviceStars.forEach((star, i) => {
                star.distance = 90 + i * 32;
                star.size = 6.5; // Más pequeños en celular
            });
        }
    }

    initDust() {
        this.dustParticles = [];
        const arms = 2; // Dos brazos principales para la galaxia espiral
        
        for (let i = 0; i < this.maxDust; i++) {
            // Distancia exponencial para concentrar polvo cerca del núcleo central
            const dist = Math.pow(Math.random(), 2.5) * (Math.max(this.width, this.height) * 0.6);
            const armIndex = i % arms;
            
            // Ángulo polar con torsión espiral en función de la distancia
            const twist = 3.2; 
            const angle = (armIndex * (Math.PI * 2 / arms)) + (dist * (twist / Math.max(this.width, this.height))) + (Math.random() * 0.4 - 0.2);
            
            // Polvo estelar mucho más fino y sutil para una estética refinada y profesional
            const size = 0.35 + Math.random() * 0.65;
            const opacity = 0.12 + (1 - dist / (Math.max(this.width, this.height) * 0.6)) * 0.48;
            
            // Colores espaciales: verdes esmeraldas y sutiles tonos cianes para profundidad
            const hue = Math.random() > 0.85 ? 175 : (135 + Math.random() * 25);
            
            this.dustParticles.push({
                baseDist: dist,
                dist: dist,
                angle: angle,
                baseAngle: angle,
                size: size,
                opacity: opacity,
                speed: 0.0003 + (1 / (dist + 50)) * 0.15, // Más rápidas cerca del centro (kepleriano)
                color: `hsla(${hue}, 85%, 60%, ${opacity})`
            });
        }
    }

    setupInteractions() {
        // Seguimiento de cursor en el lienzo de la galaxia
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.active = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
            this.mouse.active = false;
            
            // Apagar hovers de estrellas principales
            this.serviceStars.forEach(star => star.hovered = false);
            this.hideTooltip();
        });

        this.canvas.addEventListener('click', (e) => {
            // Buscar si se clickeó una estrella de servicio
            this.serviceStars.forEach(star => {
                if (star.hovered) {
                    this.triggerServiceNavigation(star);
                }
            });
        });
    }

    triggerServiceNavigation(star) {
        // Encontrar elemento destino
        const targetElement = document.querySelector(star.targetSelector);
        if (targetElement) {
            // Cambiar pestaña del portafolio al correspondiente si aplica
            const tabBtn = document.querySelector(`.tab-btn[data-tab="${star.tab}"]`);
            if (tabBtn) {
                tabBtn.click();
            }

            // Scroll suave
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Efecto visual temporal de resaltado en el card específico en el HTML
            setTimeout(() => {
                const categories = document.querySelectorAll('.portfolio-category');
                if (categories && categories[star.subcatIndex]) {
                    const card = categories[star.subcatIndex];
                    card.style.transform = 'scale(1.04)';
                    card.style.borderColor = '#00ffaa';
                    card.style.boxShadow = '0 0 30px rgba(0, 255, 170, 0.3)';
                    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    
                    setTimeout(() => {
                        card.style.transform = '';
                        card.style.borderColor = '';
                        card.style.boxShadow = '';
                    }, 2000);
                }
            }, 800);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Limpiar lienzo transparente para permitir ver el fondo original
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Rotación orbital global sutil de fondo
        this.angleOffset += 0.0003;

        // ---------------------------------------------------------------------
        // 4.1 Dibujar Polvo Estelar (Polvo Galáctico)
        // ---------------------------------------------------------------------
        this.dustParticles.forEach(p => {
            // Actualizar rotación básica
            p.angle += p.speed;

            // Distorsión gravitatoria por el mouse (Atracción sutil)
            let drawX = this.cx + p.dist * Math.cos(p.angle + this.angleOffset);
            let drawY = this.cy + p.dist * Math.sin(p.angle + this.angleOffset);

            if (this.mouse.active) {
                const dx = this.mouse.x - drawX;
                const dy = this.mouse.y - drawY;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);

                if (distToMouse < this.mouse.radius) {
                    // Fuerza gravitacional inversa proporcional
                    const force = (this.mouse.radius - distToMouse) / this.mouse.radius;
                    // Jalar ligeramente las partículas de polvo hacia el cursor
                    drawX += dx * force * 0.18;
                    drawY += dy * force * 0.18;
                }
            }

            // Dibujar punto estelar
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(drawX, drawY, p.size, p.size);
        });

        // ---------------------------------------------------------------------
        // 4.2 Núcleo Galáctico Brillante (Core de la Galaxia)
        // ---------------------------------------------------------------------
        const coreGradient = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.width > 968 ? 60 : 35);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGradient.addColorStop(0.2, 'rgba(0, 255, 170, 0.65)');
        coreGradient.addColorStop(0.6, 'rgba(0, 180, 255, 0.15)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.cx, this.cy, this.width > 968 ? 60 : 35, 0, Math.PI * 2);
        this.ctx.fillStyle = coreGradient;
        this.ctx.fill();

        // ---------------------------------------------------------------------
        // 4.3 Estrellas de Servicios Principales (Estrellas Notorias)
        // ---------------------------------------------------------------------
        let activeHoveredStar = null;

        this.serviceStars.forEach(star => {
            // Rotación órbita de los servicios
            // Si el puntero está encima, detiene o ralentiza su rotación para facilitar click
            if (!star.hovered) {
                star.angle += star.speed;
            } else {
                star.angle += star.speed * 0.1; // Súper lento en hover
            }

            // Calcular coordenadas espaciales
            const starX = this.cx + star.distance * Math.cos(star.angle);
            const starY = this.cy + star.distance * Math.sin(star.angle);

            // Guardar coordenadas de render real para detección de colisión
            star.x = starX;
            star.y = starY;

            // Detección de Hover exacto con el puntero
            if (this.mouse.active) {
                const dx = this.mouse.x - starX;
                const dy = this.mouse.y - starY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Sensibilidad al hover de 35 píxeles de radio
                if (distance < 32) {
                    star.hovered = true;
                    activeHoveredStar = star;
                } else {
                    star.hovered = false;
                }
            } else {
                star.hovered = false;
            }

            // Oscilación/Pulso sinusoidal para el resplandor
            star.pulse += 0.05;
            const pulseFactor = Math.sin(star.pulse) * 4;

            // Renderizar Aura de Resplandor Cósmico de la Estrella
            const auraRadius = (star.hovered ? star.size * 3.8 : star.size * 2.2) + pulseFactor;
            const glowGradient = this.ctx.createRadialGradient(starX, starY, 0, starX, starY, auraRadius);
            glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            glowGradient.addColorStop(0.3, `rgba(0, 255, 170, ${star.hovered ? 0.8 : 0.45})`);
            glowGradient.addColorStop(1, 'rgba(0, 255, 170, 0)');

            this.ctx.beginPath();
            this.ctx.arc(starX, starY, auraRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = glowGradient;
            this.ctx.fill();

            // Dibujar Núcleo Sólido de la Estrella
            this.ctx.beginPath();
            this.ctx.arc(starX, starY, star.hovered ? star.size * 1.3 : star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowBlur = star.hovered ? 25 : 12;
            this.ctx.shadowColor = '#00ffaa';
            this.ctx.fill();
            this.ctx.shadowBlur = 0; // Reset

            // Dibujar Etiqueta Flotante sobre la estrella (Nombre del servicio)
            this.ctx.font = `600 ${this.width > 968 ? '13px' : '10px'} 'Outfit', sans-serif`;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            this.ctx.textAlign = 'center';
            this.ctx.shadowBlur = 3;
            this.ctx.shadowColor = '#000000';
            
            // Posicionar etiqueta un poco arriba de la estrella
            this.ctx.fillText(star.name, starX, starY - (star.hovered ? star.size * 2.4 : star.size * 1.8) - 5);
            this.ctx.shadowBlur = 0; // Reset
        });

        // ---------------------------------------------------------------------
        // 4.4 Mostrar Tooltip Premium Glassmorphic si hay estrella con Hover
        // ---------------------------------------------------------------------
        if (activeHoveredStar) {
            this.canvas.style.cursor = 'pointer';
            this.showTooltip(activeHoveredStar);
        } else {
            this.canvas.style.cursor = 'default';
            // Ocultar sutilmente
            this.hideTooltip();
        }
    }

    showTooltip(star) {
        let tooltip = document.getElementById('galaxy-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'galaxy-tooltip';
            tooltip.className = 'glass-panel';
            tooltip.style.position = 'fixed';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '999';
            tooltip.style.padding = '1.2rem';
            tooltip.style.borderRadius = '12px';
            tooltip.style.border = '1px solid rgba(0, 255, 170, 0.3)';
            tooltip.style.background = 'rgba(10, 10, 10, 0.85)';
            tooltip.style.backdropFilter = 'blur(12px)';
            tooltip.style.boxShadow = '0 10px 30px rgba(0, 255, 170, 0.15)';
            tooltip.style.width = '240px';
            tooltip.style.transition = 'opacity 0.25s ease';
            tooltip.style.opacity = '0';
            document.body.appendChild(tooltip);
        }

        // Estructura de contenido premium
        tooltip.innerHTML = `
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #00ffaa; font-weight: 700; margin-bottom: 0.3rem;">Servicio Premium</div>
            <h4 style="margin: 0; font-family: 'Outfit', sans-serif; font-size: 1.15rem; color: #ffffff; font-weight: 700;">${star.name}</h4>
            <p style="margin: 0.6rem 0 0.8rem 0; font-size: 0.82rem; color: #a0a0a0; line-height: 1.4;">${star.desc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem; margin-top: 0.2rem;">
                <span style="font-size: 0.8rem; color: #888;">Estimación</span>
                <span style="font-family: 'Outfit', sans-serif; font-size: 1.05rem; font-weight: 700; color: #ffffff; background: linear-gradient(135deg, #00ffaa 0%, #00b8ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Desde ${star.price}</span>
            </div>
            <div style="font-size: 0.7rem; color: #00ffaa; text-align: right; margin-top: 0.5rem; font-weight: 600;">⚡ Clic para explorar</div>
        `;

        // Posicionar el tooltip flotante cerca del cursor pero con holgura para no taparlo
        const tooltipWidth = tooltip.offsetWidth || 240;
        const tooltipHeight = tooltip.offsetHeight || 130;
        
        // Evitar que el tooltip se salga de la pantalla
        let posX = this.mouse.x + this.canvas.getBoundingClientRect().left + 20;
        let posY = this.mouse.y + this.canvas.getBoundingClientRect().top + 15;
        
        if (posX + tooltipWidth > window.innerWidth) {
            posX = posX - tooltipWidth - 35;
        }
        if (posY + tooltipHeight > window.innerHeight) {
            posY = posY - tooltipHeight - 15;
        }

        tooltip.style.left = `${posX}px`;
        tooltip.style.top = `${posY}px`;
        tooltip.style.opacity = '1';
    }

    hideTooltip() {
        const tooltip = document.getElementById('galaxy-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }
}

// -------------------------------------------------------------------------
// 1. CONFIGURACIÓN E INICIALIZACIÓN
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Cargar GSAP desde CDN de forma dinámica si no está presente en el HTML
    if (typeof gsap === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = initCosmicEngine;
        document.head.appendChild(script);
    } else {
        initCosmicEngine();
    }

    function initCosmicEngine() {
        const preloader = document.getElementById('preloader');
        const counterEl = document.getElementById('preloader-number');
        const preloaderCanvas = document.getElementById('preloader-canvas');
        const galaxyCanvas = document.getElementById('galaxy-canvas');

        if (!preloaderCanvas || !galaxyCanvas) return;

        // Iniciar Preloader
        const preloaderEngine = new PreloaderVortex(preloaderCanvas, counterEl, preloader, () => {
            // Callback al terminar: Iniciar Galaxia Interactiva en el Hero
            new InteractiveGalaxy(galaxyCanvas);
        });
        preloaderEngine.start();
    }
});

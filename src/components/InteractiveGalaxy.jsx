import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function InteractiveGalaxy({ onSelectService, onHoverStar }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    let dustParticles = [];
    const maxDust = 1500;
    let angleOffset = 0;

    const mouse = { x: -1000, y: -1000, active: false, radius: 120 };

    const serviceStars = [
      {
        id: 'landing',
        name: 'Landing Pages',
        price: '$200',
        desc: 'Conversión máxima y diseño premium ultra veloz.',
        tab: 'pymes',
        subcatIndex: 0,
        distance: 220,
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
        tab: 'pymes',
        subcatIndex: 1,
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

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      if (width > 968) {
        cx = width * 0.72;
        cy = height * 0.5;
        serviceStars.forEach((star, i) => {
          star.distance = 180 + i * 55;
        });
      } else {
        cx = width * 0.5;
        cy = height * 0.45;
        serviceStars.forEach((star, i) => {
          star.distance = 90 + i * 32;
          star.size = 6.5;
        });
      }
    };

    const initDust = () => {
      dustParticles = [];
      const arms = 2;
      for (let i = 0; i < maxDust; i++) {
        const dist = Math.pow(Math.random(), 2.5) * (Math.max(width, height) * 0.6);
        const armIndex = i % arms;
        const twist = 3.2;
        const angle = (armIndex * (Math.PI * 2 / arms)) + (dist * (twist / Math.max(width, height))) + (Math.random() * 0.4 - 0.2);
        const size = 0.35 + Math.random() * 0.65;
        const opacity = 0.12 + (1 - dist / (Math.max(width, height) * 0.6)) * 0.48;
        const hue = Math.random() > 0.85 ? 175 : 135 + Math.random() * 25;

        dustParticles.push({
          dist,
          angle,
          size,
          speed: 0.0003 + (1 / (dist + 50)) * 0.15,
          color: `hsla(${hue}, 85%, 60%, ${opacity})`
        });
      }
    };

    resize();
    initDust();

    const handleResize = () => {
      resize();
      initDust();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
      serviceStars.forEach(star => {
        star.hovered = false;
      });
      onHoverStar(null);
    };

    const handleClick = () => {
      serviceStars.forEach(star => {
        if (star.hovered && onSelectService) {
          onSelectService(star.tab, star.subcatIndex);
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Initial Fade In of Galaxy
    canvas.style.opacity = '0';
    gsap.to(canvas, {
      opacity: 1,
      duration: 3.5,
      ease: 'power2.inOut'
    });

    let animationFrameId = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      // Rotate whole galaxy
      angleOffset += 0.00081;

      // Draw dust
      dustParticles.forEach(p => {
        p.angle += p.speed * 2.7;

        let drawX = cx + p.dist * Math.cos(p.angle + angleOffset);
        let drawY = cy + p.dist * Math.sin(p.angle + angleOffset);

        if (mouse.active) {
          const dx = mouse.x - drawX;
          const dy = mouse.y - drawY;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distToMouse < mouse.radius) {
            const force = (mouse.radius - distToMouse) / mouse.radius;
            drawX += dx * force * 0.18;
            drawY += dy * force * 0.18;
          }
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(drawX, drawY, p.size, p.size);
      });

      // Galactic core
      const coreRadius = width > 968 ? 60 : 35;
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      coreGradient.addColorStop(0.2, 'rgba(0, 255, 170, 0.65)');
      coreGradient.addColorStop(0.6, 'rgba(0, 180, 255, 0.15)');
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Service stars
      let activeHoveredStar = null;

      serviceStars.forEach(star => {
        if (!star.hovered) {
          star.angle += star.speed * 2.7;
        } else {
          star.angle += star.speed * 0.15;
        }

        const starX = cx + star.distance * Math.cos(star.angle);
        const starY = cy + star.distance * Math.sin(star.angle);

        star.x = starX;
        star.y = starY;

        if (mouse.active) {
          const dx = mouse.x - starX;
          const dy = mouse.y - starY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 32) {
            star.hovered = true;
            activeHoveredStar = star;
          } else {
            star.hovered = false;
          }
        } else {
          star.hovered = false;
        }

        star.pulse += 0.05;
        const pulseFactor = Math.sin(star.pulse) * 4;

        // Glow aura
        const auraRadius = (star.hovered ? star.size * 3.8 : star.size * 2.2) + pulseFactor;
        const glowGradient = ctx.createRadialGradient(starX, starY, 0, starX, starY, auraRadius);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        glowGradient.addColorStop(0.3, `rgba(0, 255, 170, ${star.hovered ? 0.8 : 0.45})`);
        glowGradient.addColorStop(1, 'rgba(0, 255, 170, 0)');

        ctx.beginPath();
        ctx.arc(starX, starY, auraRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(starX, starY, star.hovered ? star.size * 1.3 : star.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = star.hovered ? 25 : 12;
        ctx.shadowColor = '#00ffaa';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Labels
        ctx.font = `600 ${width > 968 ? '13px' : '10px'} 'Outfit', sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#000000';
        ctx.fillText(star.name, starX, starY - (star.hovered ? star.size * 2.4 : star.size * 1.8) - 5);
        ctx.shadowBlur = 0;
      });

      if (activeHoveredStar) {
        canvas.style.cursor = 'pointer';
        if (onHoverStar) {
          const rect = canvas.getBoundingClientRect();
          onHoverStar({
            name: activeHoveredStar.name,
            desc: activeHoveredStar.desc,
            price: activeHoveredStar.price,
            x: activeHoveredStar.x + rect.left,
            y: activeHoveredStar.y + rect.top
          });
        }
      } else {
        canvas.style.cursor = 'default';
        if (onHoverStar) {
          onHoverStar(null);
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onSelectService, onHoverStar]);

  return <canvas ref={canvasRef} id="galaxy-canvas" style={{ width: '100%', height: '100%' }} />;
}

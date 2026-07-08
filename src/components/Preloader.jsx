import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let cx = width / 2;
    let cy = height / 2;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener('resize', handleResize);

    // ----------------------------------------------------
    // VORTEX LOADER CONFIG & PHYSICS
    // ----------------------------------------------------
    const progressObj = { value: 0 };
    const maxVortexParticles = 850;
    const vortexParticles = [];

    for (let i = 0; i < maxVortexParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.max(width, height) * 0.85 + Math.random() * 250;
      const speed = 0.012 + Math.random() * 0.022;
      const size = 0.18 + Math.random() * 0.52;

      // Color hues: emerald and mint greens
      const hue = Math.random() > 0.8 ? 165 : 135 + Math.random() * 20;
      const saturation = 95 + Math.random() * 5;
      const lightness = 45 + Math.random() * 15;

      vortexParticles.push({
        angle,
        dist,
        speed,
        size,
        color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.4 + Math.random() * 0.5})`,
        glow: 4 + Math.random() * 8,
        opacity: 0.1
      });
    }

    let isRunning = true;
    let requestRef = null;

    const animateVortex = () => {
      if (!isRunning) return;
      requestRef = requestAnimationFrame(animateVortex);

      ctx.fillStyle = 'rgba(5, 5, 5, 0.16)';
      ctx.fillRect(0, 0, width, height);

      const currentProgress = progressObj.value;
      const progressFraction = currentProgress / 100;
      const maxAllowedDist = Math.max(width, height) * 0.85 * (1 - progressFraction * 0.98);

      vortexParticles.forEach((p, index) => {
        const rotationSpeed = p.speed * (1 + progressFraction * 4.2);
        p.angle += rotationSpeed;

        const targetDist = maxAllowedDist + (index % 15) * 8;
        p.dist += (targetDist - p.dist) * 0.07;
        p.opacity = 0.25 + progressFraction * 0.75;

        const spiralFactor = index * 0.035;
        const x = cx + p.dist * Math.cos(p.angle + spiralFactor);
        const y = cy + p.dist * Math.sin(p.angle + spiralFactor);

        ctx.beginPath();
        ctx.arc(x, y, p.size * (1 + progressFraction * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        if (p.size > 0.45 && progressFraction > 0.4) {
          ctx.shadowBlur = p.glow * (0.3 + progressFraction * 1.2);
          ctx.shadowColor = '#00ffaa';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (currentProgress > 40) {
        const energyRadius = Math.max(2, 140 * (1 - (currentProgress - 40) / 60));
        const energyAlpha = ((currentProgress - 40) / 60) * 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, energyRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 170, ${energyAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    // ----------------------------------------------------
    // SUPERNOVA EXPLOSION PHYSICS
    // ----------------------------------------------------
    let supernovaParticles = [];
    const maxSupernovaParticles = 1300;
    let flashAlpha = 1.0;
    const shockwaves = [
      { radius: 0, speed: 22, alpha: 0.95, color: 'rgba(255, 255, 255, 0.5)', width: 1.0 },
      { radius: -25, speed: 16, alpha: 0.8, color: 'rgba(0, 255, 170, 0.4)', width: 2.5 },
      { radius: -50, speed: 12, alpha: 0.6, color: 'rgba(0, 190, 255, 0.3)', width: 4.0 }
    ];

    const getThermalColor = (alpha, rand) => {
      if (alpha > 0.82) return `rgba(255, 255, 255, ${alpha})`;
      if (alpha > 0.45) return rand > 0.5 ? `rgba(0, 255, 170, ${alpha})` : `rgba(0, 210, 255, ${alpha})`;
      if (alpha > 0.2) return rand > 0.5 ? `rgba(0, 170, 110, ${alpha})` : `rgba(0, 80, 180, ${alpha})`;
      return `rgba(0, 35, 22, ${alpha})`;
    };

    const initExplosion = () => {
      for (let i = 0; i < maxSupernovaParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rand = Math.random();

        let speed = 0;
        let decay = 0;
        let size = 0;
        let maxTrailLength = 0;
        let type = '';

        if (rand < 0.35) {
          type = 'ring';
          speed = 10.0 + Math.random() * 8.0;
          decay = 0.012 + Math.random() * 0.016;
          size = 0.2 + Math.random() * 0.55;
          maxTrailLength = 7 + Math.floor(Math.random() * 6);
        } else if (rand < 0.65) {
          type = 'jet';
          speed = 15.0 + Math.random() * 20.0;
          decay = 0.024 + Math.random() * 0.030;
          size = 0.25 + Math.random() * 0.5;
          maxTrailLength = 12 + Math.floor(Math.random() * 8);
        } else {
          type = 'nebula';
          speed = 0.5 + Math.random() * 8.0;
          decay = 0.008 + Math.random() * 0.018;
          size = 0.15 + Math.random() * 0.45;
          maxTrailLength = 3 + Math.floor(Math.random() * 4);
        }

        const drag = type === 'nebula' ? 0.90 + Math.random() * 0.04 : 0.93 + Math.random() * 0.04;
        const swirlDir = Math.random() > 0.5 ? 1 : -1;

        supernovaParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle,
          speed,
          size,
          drag,
          alpha: 1.0,
          decay,
          swirlDir,
          colorRand: rand,
          type,
          trail: [],
          maxTrailLength
        });
      }
    };

    const animateSupernova = () => {
      if (supernovaParticles.length === 0 && flashAlpha <= 0.01) {
        // Complete visual preloader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
        return;
      }
      requestRef = requestAnimationFrame(animateSupernova);

      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (flashAlpha > 0) {
        const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.4);
        flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.95})`);
        flashGrad.addColorStop(0.15, `rgba(0, 255, 170, ${flashAlpha * 0.6})`);
        flashGrad.addColorStop(0.5, `rgba(0, 120, 255, ${flashAlpha * 0.15})`);
        flashGrad.addColorStop(1, 'rgba(5, 5, 5, 0)');

        ctx.fillStyle = flashGrad;
        ctx.fillRect(0, 0, width, height);
        flashAlpha -= 0.085;
      }

      shockwaves.forEach(w => {
        if (w.radius >= 0) {
          w.radius += w.speed;
          w.alpha -= 0.025;

          if (w.alpha > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, w.radius, 0, Math.PI * 2);
            ctx.strokeStyle = w.color.replace(/[\d\.]+\)$/, `${w.alpha})`);
            if (w.width < 2) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${w.alpha * 0.7})`;
            }
            ctx.lineWidth = w.width;
            ctx.stroke();
          }
        } else {
          w.radius += w.speed;
        }
      });

      supernovaParticles.forEach((p, index) => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrailLength) {
          p.trail.shift();
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;

        const distToCenter = Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy));
        if (distToCenter > 15) {
          const tangentialAngle = Math.atan2(p.y - cy, p.x - cx) + Math.PI / 2;
          const twistMagnitude = 0.08 * p.swirlDir * (1 / (distToCenter * 0.007 + 1)) * p.alpha;
          p.vx += Math.cos(tangentialAngle) * twistMagnitude;
          p.vy += Math.sin(tangentialAngle) * twistMagnitude;

          if (p.type === 'jet') {
            const waveFreq = 0.12;
            const waveAmp = 0.42 * p.alpha;
            const waveForce = Math.sin(distToCenter * waveFreq) * waveAmp;
            const radialAngle = Math.atan2(p.y - cy, p.x - cx);
            p.vx += Math.cos(radialAngle + Math.PI / 2) * waveForce;
            p.vy += Math.sin(radialAngle + Math.PI / 2) * waveForce;
          }
        }

        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          supernovaParticles.splice(index, 1);
          return;
        }

        if (p.trail.length > 1) {
          for (let j = 1; j < p.trail.length; j++) {
            const prevPoint = p.trail[j - 1];
            const currPoint = p.trail[j];
            const ratio = j / p.trail.length;

            const segmentAlpha = p.alpha * ratio;
            const segmentColor = getThermalColor(segmentAlpha, p.colorRand);
            const segmentWidth = p.size * (0.35 + ratio * 0.65);

            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(currPoint.x, currPoint.y);
            ctx.strokeStyle = segmentColor;
            ctx.lineWidth = segmentWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (p.type === 'jet' && ratio > 0.7 && p.alpha > 0.45) {
              ctx.shadowBlur = 6 * p.alpha * ratio;
              ctx.shadowColor = '#00ffaa';
            }

            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        const headColor = getThermalColor(p.alpha, p.colorRand);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = headColor;
        ctx.fill();
      });
    };

    // ----------------------------------------------------
    // RUN LOADER ANIMATION
    // ----------------------------------------------------
    const triggerSupernova = () => {
      isRunning = false;
      setShowLogo(true);
      initExplosion();
      animateSupernova();
    };

    gsap.to(progressObj, {
      value: 100,
      duration: 2.6,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value));
      },
      onComplete: () => {
        triggerSupernova();
      }
    });

    animateVortex();

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, [onComplete]);

  return (
    <div id="preloader" ref={containerRef}>
      <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0 }} />
      <div id="preloader-content">
        {!showLogo ? (
          <>
            <span id="preloader-number">{progress}</span>
            <span className="pct">%</span>
          </>
        ) : (
          <img
            src="/Ruta.png"
            alt="Ruta Digital"
            style={{
              height: '130px',
              filter: 'drop-shadow(0 0 25px rgba(0,255,170,0.9))',
              animation: 'logoEntrance 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes logoEntrance {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

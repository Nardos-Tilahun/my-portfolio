// components/ParticlesBackground.tsx
'use client';

import React, { useRef, useEffect, useCallback } from 'react';

// Define the structure for each particle
interface Particle {
  x: number; // current x position
  y: number; // current y position
  vx: number; // x velocity
  vy: number; // y velocity
  radius: number; // size of the particle
  color: string; // color of the particle
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mouse = useRef({ x: -1, y: -1, radius: 200 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // Store context in a ref

  // --- Configuration for subtle, slow, and visible particles ---
  const numParticles = 70;
  const connectionThreshold = 180;
  const particleRadius = 2;
  const particleColor = 'rgba(0, 255, 255, 0.9)';
  const lineColor = 'rgba(0, 255, 255, 0.15)';
  const lineWidth = 0.8;
  const mouseAttractionStrength = 0.005;
  // --- End Configuration ---

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  // Initializes or re-initializes particles based on canvas dimensions
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        vx: random(-0.05, 0.05), // CORRECTED: Proper range for slow, random movement
        vy: random(-0.05, 0.05), // Already correct
        radius: particleRadius,
        color: particleColor,
      });
    }
    particlesRef.current = newParticles;
  }, [numParticles, particleRadius, particleColor]);

  // Draws particles and connecting lines on the canvas
  const draw = useCallback(() => { // Removed ctx parameter
    const ctx = ctxRef.current; // Get context from ref
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];

        const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

        if (dist < connectionThreshold) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          const opacity = 1 - (dist / connectionThreshold);
          ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`);
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }
    }

    if (mouse.current.x !== -1 && mouse.current.y !== -1) {
      particlesRef.current.forEach(p => {
        const distToMouse = Math.sqrt(Math.pow(p.x - mouse.current.x, 2) + Math.pow(p.y - mouse.current.y, 2));
        if (distToMouse < mouse.current.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          const opacity = 1 - (distToMouse / mouse.current.radius);
          ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    }
  }, [connectionThreshold, lineColor, lineWidth, mouse]);

  // Updates particle positions and applies interactions
  const update = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updatedParticles = particlesRef.current.map(p => {
      let { x, y, vx, vy } = p;

      if (mouse.current.x !== -1 && mouse.current.y !== -1) {
        const distToMouse = Math.sqrt(Math.pow(x - mouse.current.x, 2) + Math.pow(y - mouse.current.y, 2));
        if (distToMouse < mouse.current.radius) {
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const forceDirectionX = dx / distToMouse;
          const forceDirectionY = dy / distToMouse;
          const force = mouse.current.radius / distToMouse;
          vx += forceDirectionX * force * mouseAttractionStrength;
          vy += forceDirectionY * force * mouseAttractionStrength;
        }
      }

      x += vx;
      y += vy;

      if (x < 0) x = canvas.width;
      if (x > canvas.width) x = 0;
      if (y < 0) y = canvas.height;
      if (y > canvas.height) y = 0;

      return { ...p, x, y, vx, vy };
    });

    particlesRef.current = updatedParticles;
  }, [mouseAttractionStrength]);

  // The main animation loop
  const animate = useCallback(() => {
    update();
    draw(); // Call draw without ctx parameter

    animationFrameId.current = requestAnimationFrame(animate);
  }, [update, draw]);

  // Effect hook for setting up canvas, particles, and animation loop on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx; // Store context in ref

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      initParticles();
    };

    // Debounce function to limit how often setCanvasDimensions is called on resize
    const debounce = (func: Function, delay: number) => {
      let timeout: NodeJS.Timeout;
      return function(this: any, ...args: any[]) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
      };
    };

    const debouncedSetCanvasDimensions = debounce(setCanvasDimensions, 100); // Debounce by 100ms

    setCanvasDimensions(); // Set dimensions initially
    window.addEventListener('resize', debouncedSetCanvasDimensions); // Use debounced function

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + window.scrollY;
    };
    const handleMouseLeave = () => {
      mouse.current.x = -1;
      mouse.current.y = -1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', debouncedSetCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-gray-900"
    />
  );
};

export default ParticlesBackground;
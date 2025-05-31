// components/ParticlesBackground.tsx
'use client';

import React, { useRef, useEffect,  useCallback } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref to the canvas DOM element
  // CHANGED: Use useRef for particles data instead of useState
  const particlesRef = useRef<Particle[]>([]); // Ref to hold all particles, avoids re-renders on update
  const animationFrameId = useRef<number | null>(null); // Ref to store the animation frame ID for cleanup
  const mouse = useRef({ x: -1, y: -1, radius: 200 }); // Mouse position and interaction radius

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
        vx: random(-0.5, -0.5), // Drastically reduced velocity for slow motion
        vy: random(-0.5, 0.5), // Drastically reduced velocity for slow motion
        radius: particleRadius,
        color: particleColor,
      });
    }
    // CHANGED: Update the ref's current value directly
    particlesRef.current = newParticles; 
  }, [numParticles, particleRadius, particleColor]); 

  // Draws particles and connecting lines on the canvas
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas for the new frame

    // Draw each particle
    // CHANGED: Iterate over particlesRef.current
    particlesRef.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    // Draw connections between particles
    // CHANGED: Iterate over particlesRef.current
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

    // Draw lines from particles to the mouse
    if (mouse.current.x !== -1 && mouse.current.y !== -1) {
      // CHANGED: Iterate over particlesRef.current
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
  }, [connectionThreshold, lineColor, lineWidth, mouse]); // CHANGED: Removed `particles` from dependencies, as it's now a ref

  // Updates particle positions and applies interactions
  const update = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // CHANGED: Map over a copy of particlesRef.current and then update the ref
    const updatedParticles = particlesRef.current.map(p => {
      let { x, y, vx, vy } = p;

      // Apply mouse interaction (very subtle repulsion)
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

      // Update position
      x += vx;
      y += vy;

      // Boundary conditions: particles wrap around the canvas
      if (x < 0) x = canvas.width;
      if (x > canvas.width) x = 0;
      if (y < 0) y = canvas.height;
      if (y > canvas.height) y = 0;
      
      return { ...p, x, y, vx, vy };
    });

    // CHANGED: Update the ref's current value directly
    particlesRef.current = updatedParticles;
  }, [mouseAttractionStrength]);

  // The main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    update();
    draw(ctx);

    animationFrameId.current = requestAnimationFrame(animate);
  }, [update, draw]); // These dependencies are now stable because their own dependencies are stable/refs.

  // Effect hook for setting up canvas, particles, and animation loop on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // No need for ctx here, it's acquired in animate

    // Function to set canvas dimensions to cover the full document scroll height
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight; 
      initParticles(); // Re-initialize particles when dimensions change
    };

    setCanvasDimensions(); // Set dimensions initially
    window.addEventListener('resize', setCanvasDimensions); // Update dimensions on window resize

    // Mouse interaction event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + window.scrollY; // Adjust for scroll position
    };
    const handleMouseLeave = () => {
      mouse.current.x = -1; // Reset mouse position when it leaves the window
      mouse.current.y = -1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Start the animation loop
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function: runs when the component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current); // Stop the animation loop
      }
      window.removeEventListener('resize', setCanvasDimensions); // Remove resize listener
      window.removeEventListener('mousemove', handleMouseMove); // Remove mousemove listener
      window.removeEventListener('mouseleave', handleMouseLeave); // Remove mouseleave listener
    };
  }, [animate, initParticles]); // These useCallback functions are now stable, so putting them here is fine.

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-gray-900" 
    />
  );
};

export default ParticlesBackground;
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
  onStartAudio: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete, onStartAudio }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; baseAlpha: number }[] = [];
    const particleCount = width < 768 ? 40 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5,
        baseAlpha: Math.random() * 0.5
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Base movement
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          // Gentle repulsion + brightening
          p.x -= (dx / distance) * force * 2;
          p.y -= (dy / distance) * force * 2;
          p.alpha = Math.min(1, p.baseAlpha + force * 0.5); 
        } else {
            p.alpha = p.baseAlpha;
        }

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`; // Gold color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Text Animation Sequence
  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 1000);
    const t2 = setTimeout(() => setShowButton(true), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    onStartAudio();
    onComplete();
  };

  return (
    <motion.div 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]"
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      <div className="z-10 px-6 text-center max-w-3xl mix-blend-screen">
        {textVisible && (
          <>
            <motion.h1 
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="font-cinematic text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-white leading-relaxed tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] mb-4"
            >
              "This world exists because you were born."
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="font-body text-white/60 text-lg md:text-xl tracking-widest italic font-light"
            >
              Every moment with you is a gift
            </motion.p>
          </>
        )}
      </div>

      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          className="absolute bottom-24 z-20 px-10 py-4 border border-gold/40 text-gold font-cinematic text-lg tracking-[0.2em] uppercase bg-black/30 backdrop-blur-sm rounded-sm hover:bg-gold/10 transition-all duration-700"
        >
          Begin Journey
        </motion.button>
      )}
    </motion.div>
  );
};
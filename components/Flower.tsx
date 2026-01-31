import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface FlowerProps {
  onRestart: () => void;
}

const Fireflies = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gold blur-[1px]"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        x: [
                            null,
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%"
                        ],
                        y: [
                            null,
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%"
                        ],
                        opacity: [0, 0.4, 0.2, 0.5, 0],
                        scale: [0, Math.random() * 1.5 + 0.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                    style={{
                        width: Math.random() * 3 + 1 + "px",
                        height: Math.random() * 3 + 1 + "px",
                    }}
                />
            ))}
        </div>
    );
};

export const Flower: React.FC<FlowerProps> = ({ onRestart }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 3, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#111] to-[#0a0a0f]"
    >
      <Fireflies />
      
      <div className="relative w-64 h-64 md:w-96 md:h-96 z-10">
        {/* Abstract Flower SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
           <motion.path
             d="M100 180 Q100 100 100 100"
             stroke="#d4af37"
             strokeWidth="2"
             fill="none"
             variants={pathVariants}
             initial="hidden"
             animate="visible"
           />
           <motion.path
             d="M100 100 Q60 60 100 20 Q140 60 100 100"
             stroke="#d4af37"
             strokeWidth="1"
             fill="rgba(212,175,55,0.1)"
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 1, duration: 2 }}
           />
           <motion.path
             d="M100 100 Q40 100 20 60 Q80 80 100 100"
             stroke="#d4af37"
             strokeWidth="1"
             fill="rgba(212,175,55,0.1)"
             initial={{ scale: 0, rotate: -45, opacity: 0 }}
             animate={{ scale: 1, rotate: 0, opacity: 1 }}
             transition={{ delay: 1.5, duration: 2 }}
           />
           <motion.path
             d="M100 100 Q160 100 180 60 Q120 80 100 100"
             stroke="#d4af37"
             strokeWidth="1"
             fill="rgba(212,175,55,0.1)"
             initial={{ scale: 0, rotate: 45, opacity: 0 }}
             animate={{ scale: 1, rotate: 0, opacity: 1 }}
             transition={{ delay: 1.5, duration: 2 }}
           />
        </svg>
      </div>

      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center z-20 mt-8 relative"
          >
            <h1 className="font-cinematic text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-white mb-4 drop-shadow-lg">
              "This was never just a website."
            </h1>
            <p className="font-body text-white/60 text-sm max-w-md mx-auto px-6 mb-8 font-light tracking-wide">
              It's a digital reflection of my world, which revolves around you.
            </p>
            
            <button 
                onClick={onRestart}
                className="text-xs uppercase tracking-[0.3em] text-gold/80 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
            >
                Read Emotional Letters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
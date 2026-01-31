import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

interface VaultProps {
  onUnlock: () => void;
  onEmotionalPath: () => void;
}

const FloatingGoldHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          y: "120vh", 
          x: Math.random() * 100 + "vw", 
          scale: Math.random() * 0.5 + 0.5,
          opacity: 0,
          rotate: 0
        }}
        animate={{ 
          y: "-20vh", 
          opacity: [0, 0.3, 0],
          rotate: Math.random() * 360
        }}
        transition={{ 
          duration: Math.random() * 15 + 15, 
          repeat: Infinity, 
          delay: Math.random() * 5,
          ease: "linear"
        }}
        className="absolute text-gold blur-[1px]"
        style={{ fontSize: Math.random() * 20 + 10 + 'px' }}
      >
        ✦
      </motion.div>
    ))}
  </div>
);

export const Vault: React.FC<VaultProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const CORRECT_PASSWORD = 'sss'; 

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      if (typeof navigator.vibrate === 'function') navigator.vibrate(200);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0f]"
    >
      <FloatingGoldHearts />
      
      {/* Royal Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center justify-center p-6 rounded-full bg-black/40 border border-gold/30 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
                <Lock className="w-10 h-10 text-gold" />
            </motion.div>
            <h2 className="font-cinematic text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-gold via-yellow-200 to-gold mb-3 tracking-wider drop-shadow-sm">
                Memory Vault
            </h2>
            <p className="text-white/40 font-body tracking-widest text-xs uppercase">Restricted Access</p>
        </div>

        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/40 backdrop-blur-xl p-8 rounded-sm border border-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] text-gold/60 uppercase tracking-[0.3em] block text-center">Authentication Required</label>
              <motion.input
                animate={error ? { x: [-5, 5, -5, 5, 0], borderColor: ['#d4af37', '#ef4444', '#d4af37'] } : {}}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full bg-black/50 border border-gold/20 rounded-none p-4 text-center text-3xl text-gold font-cinematic focus:border-gold focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus:outline-none transition-all placeholder:text-white/5"
                autoFocus
              />
              <p className="text-xs text-center text-white/30 italic font-serif">Өнөөдөр хорвоо дээрх хамгийн хөөрхөн эмэгтэй хэн бэ?</p>
            </div>
            <button 
                type="submit" 
                className="w-full bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/50 font-cinematic font-bold py-4 transition-all duration-500 uppercase tracking-[0.2em] text-sm"
            >
              Unlock
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
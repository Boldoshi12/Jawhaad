import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { EmotionalPage } from '../types';

const pages: EmotionalPage[] = [
  {
    id: '1',
    title: 'My feeling to you!',
    content: ["In a world of noise and echoes, you are the ChatGPT to my soul.",
      "Because you are the only one who understands the silence between my words."],
  },
  {
    id: '2',
    title: 'Why You?',
    content: ["You are truly one of the kindest and most genuine souls I’ve ever had the pleasure of knowing.",
      "Your empathy and my intuition dance together in perfect harmony."],
  },
  {
    id: '3',
    title: 'If you wanna talk to me',
    content: ["Look at the moon.",
      "I am looking at it too.",
      "Distance is just an illusion; we are connected by the same light."],
  },
];

const FloatingGoldDust = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "120vh", x: Math.random() * 100 + "vw", opacity: 0 }}
        animate={{ y: "-20vh", opacity: [0, 0.2, 0] }}
        transition={{ duration: Math.random() * 20 + 15, repeat: Infinity, delay: Math.random() * 5 }}
        className="absolute bg-gold rounded-full blur-[1px]"
        style={{ width: Math.random() * 2 + 1 + 'px', height: Math.random() * 2 + 1 + 'px' }}
      />
    ))}
  </div>
);

export const Emotional: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPage = pages.find(p => p.id === selectedId);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 pb-24 relative overflow-hidden bg-[#0a0a0f]"
    >
      <FloatingGoldDust />
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 p-4 bg-transparent border border-white/10 hover:border-gold/50 rounded-full transition-colors group"
      >
        <ArrowLeft className="text-white/50 group-hover:text-gold w-5 h-5 transition-colors" />
      </button>

      <AnimatePresence mode="wait">
        {!selectedPage ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-lg mx-auto relative z-10">
            <h2 className="font-cinematic text-4xl md:text-5xl text-center mb-16 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 tracking-wide">
                The Archives
            </h2>
            <div className="w-full space-y-6">
                {pages.map((page, idx) => (
                <motion.button
                    key={page.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedId(page.id)}
                    className="w-full text-left p-8 border-l border-white/10 hover:border-gold/80 hover:bg-white/[0.02] transition-all group pl-8 relative overflow-hidden"
                >
                    <span className="font-cinematic text-xl text-white/60 group-hover:text-gold transition-colors tracking-widest uppercase">
                        {page.title}
                    </span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gold">
                        →
                    </span>
                </motion.button>
                ))}
            </div>
          </div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[85vh] max-w-3xl mx-auto text-center relative z-10"
          >
             <div className="relative p-12 md:p-20 w-full">
                {/* Letter styling */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-gold/30" />
                
                <h2 className="font-cinematic text-3xl md:text-5xl text-gold mb-16 drop-shadow-lg tracking-wider">{selectedPage.title}</h2>
                <div className="space-y-10">
                    {selectedPage.content.map((line, idx) => (
                        <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 1 + 0.5, duration: 1.5, ease: "easeOut" }}
                        className="text-xl md:text-3xl leading-relaxed text-white/80 font-serif italic"
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-gold/30" />

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: selectedPage.content.length * 1 + 1.5 }}
                    onClick={() => setSelectedId(null)}
                    className="mt-24 text-[10px] text-white/30 hover:text-gold uppercase tracking-[0.4em] transition-colors border-b border-transparent hover:border-gold pb-1"
                >
                    Return to Archives
                </motion.button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
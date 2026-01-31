import React from 'react';
import { motion } from 'framer-motion';

interface BirthdayLetterProps {
  onRestart: () => void;
}

const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          y: "110vh", 
          x: Math.random() * 100 + "vw", 
          opacity: 0,
          scale: 0.5
        }}
        animate={{ 
          y: "-10vh", 
          opacity: [0, 0.6, 0],
          rotate: Math.random() * 360
        }}
        transition={{ 
          duration: Math.random() * 20 + 15, 
          repeat: Infinity, 
          delay: Math.random() * 5,
          ease: "linear"
        }}
        className="absolute text-gold/20"
        style={{ fontSize: Math.random() * 30 + 10 + 'px' }}
      >
        ♥
      </motion.div>
    ))}
  </div>
);

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ onRestart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0f]"
    >
      <FloatingHearts />
      
      {/* Royal Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-black/60 backdrop-blur-xl p-8 md:p-12 border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative text-center"
        >
            {/* Elegant Border Decoration */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/40" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/40" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/40" />

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-cinematic text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold mb-8 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
            >
                Happy Birthday
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="space-y-6 text-white/80 font-serif italic text-lg leading-relaxed tracking-wide"
            >
                <p>
                    Төрсөн өдрийн мэнд хүргэе! Эрхэмсэг бүсгүй минь
                </p>
                <p>
                    Төрсөн өдрийн мэнд хүргэе.
Чамтай танилцаад 2 жил болжээ яг л өчигдөрхөн мэт.
Миний амьдралд орж ирж, өнгө нэмсэнд баярлалаа.
аз жаргал, эрүүл энх, сайн сайхныг  хүсье төрсөн өдрөө мартагдашгүй сайхан тэмдэглээрэй жаахан оройтоод мэнд хүргчихлээ sorry🙏
 цаашдаа илүү их дурсамж бүтээцгээе ✨
                </p>
                <p className="border-t border-gold/20 pt-6 mt-8 text-gold/60 text-base">
                    Хорьж болдоггүй 20 насны баярын мэнд хүргэе! 🎉
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                onClick={onRestart}
                className="mt-12 px-8 py-3 text-xs md:text-sm text-gold/50 hover:text-gold border border-gold/20 hover:border-gold/60 rounded-sm uppercase tracking-[0.2em] transition-all duration-500"
            >
                One Last Surprise
            </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

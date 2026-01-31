import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  category?: string;
}

interface Timeline3DProps {
  events: TimelineEvent[];
  className?: string;
}

// --- specialized components ---

const StarryBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden opacity-40 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full"
        initial={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: Math.random(),
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: Math.random() * 3 + "px",
          height: Math.random() * 3 + "px",
        }}
      />
    ))}
  </div>
);

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]);

  const tX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const tY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: tX,
        rotateY: tY,
        filter: useMotionTemplate`brightness(${brightness})`,
      }}
    >
      {children}
    </motion.div>
  );
};

const TimelineSection = ({ event, index, total }: { event: TimelineEvent; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax for image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);

  const isEven = index % 2 === 0;

  // Specific Atmospheric Effects based on ID
  const isOrigin = event.id === '1'; // 1998
  const isConvergence = event.id === '2'; // 2018
  const isAscension = event.id === '3'; // 2023

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden snap-center">
      {/* Background Atmosphere */}
      {isOrigin && <StarryBackground />}
      
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
      >
        {/* Left Side (Desktop) - Text for Even, Image for Odd */}
        <div className={`order-2 lg:order-1 flex flex-col ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
          {isEven ? (
            <TextContent event={event} />
          ) : (
            <ImageContent event={event} y={yImage} isConvergence={isConvergence} isAscension={isAscension} />
          )}
        </div>

        {/* Center Axis (Desktop) - handled by parent absolute, but we need a placeholder to push grid */}
        {/* We actually render the node here to keep it relative to content */}
        <div className="absolute left-4 lg:left-1/2 top-1/2 -translate-y-1/2 lg:-translate-x-1/2 z-20 flex flex-col items-center justify-center">
            <TimelineNode icon={event.icon} index={index + 1} />
        </div>

        {/* Right Side (Desktop) - Image for Even, Text for Odd */}
        <div className={`order-3 lg:order-2 flex flex-col ${isEven ? 'lg:items-start lg:text-left pl-12 lg:pl-0' : 'lg:items-end lg:text-right pl-12 lg:pl-0'}`}>
          {isEven ? (
            <ImageContent event={event} y={yImage} isConvergence={isConvergence} isAscension={isAscension} />
          ) : (
            <TextContent event={event} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

const TextContent = ({ event }: { event: TimelineEvent }) => (
  <div className="space-y-6 max-w-lg pl-12 lg:pl-0">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span className="font-cinematic text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20 opacity-40 font-bold block mb-2">
        {event.date}
      </span>
      <h2 className="font-cinematic text-3xl md:text-5xl text-white font-bold leading-tight drop-shadow-lg">
        {event.title}
      </h2>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold/30 -ml-6 lg:hidden" /> {/* Mobile decorative line */}
      <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed">
        {event.description}
      </p>
      {event.category && (
        <span className="inline-block mt-4 px-4 py-1 border border-gold/30 rounded-full text-gold text-xs tracking-[0.2em] uppercase">
          {event.category}
        </span>
      )}
    </motion.div>
  </div>
);

const ImageContent = ({ event, y, isConvergence, isAscension }: { event: TimelineEvent; y: any; isConvergence: boolean; isAscension: boolean }) => (
  <TiltCard className="w-full pl-12 lg:pl-0">
    <motion.div 
      style={{ y }}
      className={`relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl group border border-white/5 
        ${isConvergence ? 'shadow-[0_0_50px_rgba(212,175,55,0.2)]' : ''}
        ${isAscension ? 'ring-1 ring-white/20' : ''}
      `}
    >
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110
            ${isConvergence ? 'brightness-110 contrast-110 sepia-[0.2]' : 'brightness-90'}
          `} 
        />
      )}
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      
      {isAscension && (
        <div className="absolute inset-0 border-[1px] border-white/10 mix-blend-overlay pointer-events-none" />
      )}
    </motion.div>
  </TiltCard>
);

const TimelineNode = ({ icon, index }: { icon: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ margin: "-40%" }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#0a0a0f] border-2 border-gold z-30"
  >
    <div className="absolute inset-0 rounded-full bg-gold/20 animate-pulse-slow" />
    <div className="text-gold">
      {icon}
    </div>
    <div className="absolute -inset-4 border border-gold/20 rounded-full scale-0 animate-[ping_3s_ease-in-out_infinite] opacity-50" />
  </motion.div>
);

export const Timeline3D: React.FC<Timeline3DProps> = ({ events, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={`relative bg-[#0a0a0f] ${className}`}>
      
      {/* The Central Line - Track */}
      <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-white/10 transform lg:-translate-x-1/2 z-0" />
      
      {/* The Central Line - Progress (Gold Drawing Effect) */}
      <motion.div 
        style={{ height }}
        className="fixed top-0 left-4 lg:left-1/2 w-[2px] bg-gradient-to-b from-gold via-yellow-200 to-gold transform lg:-translate-x-1/2 z-0 origin-top shadow-[0_0_15px_rgba(212,175,55,0.6)]" 
      />

      {/* Events */}
      <div className="relative z-10">
        {events.map((event, index) => (
          <TimelineSection 
            key={event.id} 
            event={event} 
            index={index} 
            total={events.length} 
          />
        ))}
      </div>

    </div>
  );
};
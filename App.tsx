import React, { useState, useEffect, useRef } from 'react';
import { AppView } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Intro } from './components/Intro';
import { Timeline } from './components/Timeline';
import { Vault } from './components/Vault';
import { Flower } from './components/Flower';
import { BirthdayLetter } from './components/BirthdayLetter';
import { Emotional } from './components/Emotional';
import { Volume2, VolumeX } from 'lucide-react';

const AudioController: React.FC<{ isPlaying: boolean; toggle: () => void }> = ({ isPlaying, toggle }) => (
  <button 
    onClick={toggle}
    className="fixed top-4 right-4 z-50 p-3 rounded-full bg-surface/50 backdrop-blur border border-white/10 text-gold hover:bg-white/10 transition-colors"
  >
    {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
  </button>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.INTRO);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // In a real app, this would point to the actual asset
    // Using a reliable placeholder for demo purposes if needed, 
    // or just the structure for the user to fill.
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"); 
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isAudioPlaying) {
      // Fade out logic would go here
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
      // Fade in logic
      let vol = 0;
      audioRef.current.volume = 0;
      const interval = setInterval(() => {
        if (!audioRef.current) return clearInterval(interval);
        if (vol < 0.5) {
          vol += 0.05;
          audioRef.current.volume = Math.min(vol, 0.5);
        } else {
          clearInterval(interval);
        }
      }, 200);
      setIsAudioPlaying(true);
    }
  };

  const handleViewChange = (view: AppView) => {
    // Cinematic transition delay or logic could go here
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-background text-text font-body selection:bg-gold selection:text-background overflow-x-hidden">
      <AudioController isPlaying={isAudioPlaying} toggle={toggleAudio} />

      <AnimatePresence mode="wait">
        {currentView === AppView.INTRO && (
          <Intro 
            key="intro" 
            onComplete={() => handleViewChange(AppView.TIMELINE)}
            onStartAudio={() => {
              if (!isAudioPlaying) toggleAudio();
            }}
          />
        )}

        {currentView === AppView.TIMELINE && (
          <Timeline 
            key="timeline" 
            onComplete={() => handleViewChange(AppView.VAULT)} 
          />
        )}

        {currentView === AppView.VAULT && (
          <Vault 
            key="vault" 
            onUnlock={() => handleViewChange(AppView.BIRTHDAY_LETTER)}
            onEmotionalPath={() => handleViewChange(AppView.EMOTIONAL)}
          />
        )}

        {currentView === AppView.BIRTHDAY_LETTER && (
          <BirthdayLetter 
            key="birthday-letter"
            onRestart={() => handleViewChange(AppView.FLOWER)}
          />
        )}

        {currentView === AppView.FLOWER && (
          <Flower 
            key="flower" 
            onRestart={() => handleViewChange(AppView.EMOTIONAL)} 
          />
        )}

        {currentView === AppView.EMOTIONAL && (
          <Emotional 
            key="emotional" 
            onBack={() => handleViewChange(AppView.INTRO)}
          />
        )}
      </AnimatePresence>
      
      {/* Global Grain/Noise Overlay for cinematic effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;
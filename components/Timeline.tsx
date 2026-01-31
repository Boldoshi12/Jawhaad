import React from 'react';
import { Timeline3D, TimelineEvent } from './ui/3d-interactive-timeline';
import { Star, Heart, Crown, Gem, ArrowDown } from 'lucide-react';

interface TimelineProps {
  onComplete: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onComplete }) => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: 'LOVE',
      title: 'SHINING MAN',
      description:'Өнөөдөр бол чиний өдөр! 20 насны мянган инээмсэглэл, аз жаргалтай мөчөөр дүүрэн байх болтугай✨',
      icon: <Star className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/photo11.jpeg', // Local image from public folder
      category: 'Guileless',
    },
    {
      id: '2',
      date: 'SMART',
      title: 'SHINING MAN',
      description: 'Өдөр бүрийг аз жаргал, шинэ адал явдал, инээдээр дүүрэн өнгөрөөгөрөй.😉',
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/photo22.jpeg', // Local image from public folder
      category: 'Friendly',
    },
    {
      id: '3',
      date: 'COURAGE',
      title: 'SHINING MAN',
      description: 'Чиний 20 насны чин амьдрал  аз жаргал, хайр, амжилтаар дүүрэн байг. Төрсөн өдрийн мэнд хүргье♥️',
      icon: <Crown className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/photo33.jpeg', // Local image from public folder
      category: 'Wonderful',
    },
    {
      id: '4',
      date: 'LIMITLESS',
      title: 'SHINING MAN',
      description: 'Шинэ нас  шинэ боломжууд. Бүх мөрөөдөл чинь биелэх болтугай',
      icon: <Gem className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/photo44.jpeg', // Local image from public folder
      category: 'Powerful',
    },
  ];

  return (
    <div className="bg-[#0a0a0f] relative">
      <Timeline3D 
        events={timelineEvents}
      />
      
      {/* Final Call to Action - Placed after the last scroll section */}
      <div className="h-[50vh] flex items-center justify-center bg-[#0a0a0f] relative z-20">
         <button 
            onClick={onComplete}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-sm"
        >
            <div className="absolute inset-0 w-0 bg-gold/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <div className="relative flex flex-col items-center gap-3">
                <span className="text-gold font-cinematic text-sm tracking-[0.3em] uppercase">Enter The Vault</span>
                <ArrowDown className="text-gold animate-bounce w-5 h-5" />
            </div>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gold/30"></div>
        </button>
      </div>
    </div>
  );
};
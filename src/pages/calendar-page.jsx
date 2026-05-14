import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RACES } from '../data/races';
import RaceCard from '../components/race-card';

export default function CalendarPage() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-32 relative z-10 min-h-screen">
      <div ref={headerRef} className="mb-16">
        <h1 className="text-5xl md:text-7xl font-hero font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          2026 Season <span className="text-[#39FF88]">Calendar</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          The ultimate 24-race championship. Follow the action across the globe and save your favorite weekends to your personal garage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RACES.map((race, index) => (
          <RaceCard key={race.id} race={race} index={index} />
        ))}
      </div>
    </div>
  );
}

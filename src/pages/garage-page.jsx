import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RACES } from '../data/races';
import RaceCard from '../components/race-card';
import { usePitlaneStore } from '../stores/pitlane-store';
import { Link } from 'react-router';

export default function GaragePage() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const { favorites } = usePitlaneStore();
  
  const favoriteRaces = RACES.filter(race => favorites.includes(race.id));

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
          My <span className="text-[#39FF88]">Garage</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Your saved races and personalized telemetry. Keep track of the weekends you don't want to miss.
        </p>
      </div>

      {favoriteRaces.length === 0 ? (
        <div className="glass-card rounded-3xl p-16 text-center border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <span className="text-4xl">🏎️</span>
          </div>
          <h2 className="text-2xl font-bold font-hero mb-4">Your garage is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md">Browse the calendar and tap the heart icon to add races to your personal garage.</p>
          <Link to="/calendar" className="btn-primary">Browse Calendar</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteRaces.map((race, index) => (
            <RaceCard key={race.id} race={race} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RACES } from '../data/races';
import { usePitlaneStore } from '../stores/pitlane-store';
import { Link } from 'react-router';
import { PlayCircle, CheckCircle, Trophy } from 'lucide-react';

export default function SeasonPage() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const { watchedRaces } = usePitlaneStore();
  
  const watchedRaceData = RACES.filter(race => watchedRaces.includes(race.id));

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
    
    gsap.from(".journal-item", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-32 relative z-10 min-h-screen">
      <div ref={headerRef} className="mb-16">
        <h1 className="text-5xl md:text-7xl font-hero font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Season <span className="text-[#FFD60A]">Journal</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Your personal log of completed race weekends. Track your championship journey across the globe.
        </p>
      </div>

      <div className="flex items-center gap-6 mb-12">
        <div className="glass-card px-6 py-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-[#FFD60A]/20 rounded-lg text-[#FFD60A]">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Races Watched</div>
            <div className="text-2xl font-bold font-hero">{watchedRaces.length} / {RACES.length}</div>
          </div>
        </div>
      </div>

      {watchedRaceData.length === 0 ? (
        <div className="glass-card rounded-3xl p-16 text-center border-dashed border-2 border-[#FFD60A]/10 flex flex-col items-center justify-center">
          <CheckCircle size={48} className="text-[#FFD60A]/30 mb-6" />
          <h2 className="text-2xl font-bold font-hero mb-4">No races tracked yet</h2>
          <p className="text-gray-400 mb-8 max-w-md">Go to a race detail page and mark it as watched to build your personal season journal.</p>
          <Link to="/calendar" className="btn-primary">View Calendar</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
          
          {watchedRaceData.map((race, index) => (
            <div key={race.id} className="journal-item flex flex-col md:flex-row gap-6 relative">
              <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FFD60A] border-4 border-[#050505] z-10" />
              
              <div className="md:w-32 md:pl-16 flex items-center shrink-0">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{new Date(race.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
              
              <Link to={`/calendar/${race.id}`} className="flex-1 glass-card p-6 rounded-2xl group hover-glow transition-all flex flex-col sm:flex-row gap-6 items-center border-l-4 border-l-[#FFD60A]">
                <img src={race.image} alt={race.name} className="w-full sm:w-32 h-24 object-cover rounded-xl" />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold font-hero mb-1 group-hover:text-[#FFD60A] transition-colors">{race.name}</h3>
                  <p className="text-gray-400 text-sm">{race.circuit}</p>
                </div>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#FFD60A]/20 group-hover:text-[#FFD60A] transition-colors">
                  <PlayCircle size={24} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

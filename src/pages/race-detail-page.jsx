import { useParams, Link } from 'react-router';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RACES } from '../data/races';
import { ArrowLeft, Map, Flag, CheckCircle } from 'lucide-react';
import { usePitlaneStore } from '../stores/pitlane-store';

export default function RaceDetailPage() {
  const { raceId } = useParams();
  const race = RACES.find(r => r.id === raceId);
  const containerRef = useRef(null);
  
  const { watchedRaces, toggleWatched } = usePitlaneStore();
  const isWatched = watchedRaces.includes(race?.id);

  useGSAP(() => {
    if (!race) return;
    
    gsap.from(".anim-item", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });
  }, { scope: containerRef, dependencies: [raceId] });

  if (!race) {
    return (
      <div className="container mx-auto px-6 py-40 text-center relative z-10">
        <h1 className="text-4xl font-hero font-bold mb-6">Race Not Found</h1>
        <Link to="/calendar" className="btn-primary">Back to Calendar</Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-32 relative z-10 min-h-screen">
      <Link to="/calendar" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 anim-item">
        <ArrowLeft size={20} /> Back to Calendar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <div className="flex items-center gap-3 text-[#FFD60A] font-bold uppercase tracking-widest mb-4 anim-item text-sm">
            <Map size={16} /> {race.country}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-hero font-black mb-6 leading-tight uppercase anim-item">
            {race.name}
          </h1>
          
          <p className="text-2xl text-gray-300 font-medium mb-10 anim-item">
            {new Date(race.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="flex gap-6 mb-12 anim-item">
            <div className="glass-card p-6 rounded-2xl flex-1 border-[#39FF88]/20">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Circuit Length</div>
              <div className="text-3xl font-hero font-bold text-white">{race.length}</div>
            </div>
            <div className="glass-card p-6 rounded-2xl flex-1 border-[#FFD60A]/20">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Laps</div>
              <div className="text-3xl font-hero font-bold text-white">{race.laps}</div>
            </div>
          </div>

          <div className="anim-item">
            <button 
              onClick={() => toggleWatched(race.id)}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all duration-300 ${
                isWatched 
                ? 'bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/50' 
                : 'glass-card text-white hover:bg-white/10'
              }`}
            >
              <CheckCircle size={20} />
              {isWatched ? 'Watched' : 'Mark as Watched'}
            </button>
          </div>
        </div>

        <div className="anim-item relative rounded-3xl overflow-hidden glass-card aspect-square max-h-[600px] border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
          <img src={race.image} alt={race.circuit} className="w-full h-full object-cover" />
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="flex items-center gap-3 text-white/80 font-medium mb-2">
              <Flag size={18} /> Circuit Overview
            </div>
            <h3 className="text-2xl font-hero font-bold text-white">{race.circuit}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

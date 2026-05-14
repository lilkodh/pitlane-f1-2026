import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router';
import { usePitlaneStore } from '../stores/pitlane-store';
import { Heart, PlayCircle, MapPin } from 'lucide-react';

export default function RaceCard({ race, index = 0 }) {
  const cardRef = useRef(null);
  const { favorites, toggleFavorite } = usePitlaneStore();
  const isFavorite = favorites.includes(race.id);

  useGSAP(() => {
    gsap.fromTo(cardRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
        delay: index * 0.1 
      }
    );
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="glass-card rounded-2xl overflow-hidden group hover-glow relative flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 z-10" />
        <img 
          src={race.image} 
          alt={race.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(race.id);
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur hover:bg-[#39FF88]/20 transition-colors"
          >
            <Heart size={18} className={isFavorite ? "fill-[#39FF88] text-[#39FF88]" : "text-white"} />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFD60A] mb-2 uppercase tracking-widest">
          <MapPin size={14} />
          {race.country}
        </div>
        
        <h3 className="text-xl font-bold font-hero mb-1 leading-tight group-hover:text-[#39FF88] transition-colors">{race.name}</h3>
        <p className="text-sm text-gray-400 mb-6">{new Date(race.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <Link to={`/calendar/${race.id}`} className="btn-primary text-xs w-full justify-center">
            View Details <PlayCircle size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

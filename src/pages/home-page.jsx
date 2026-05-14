import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowRight, Trophy } from "lucide-react"
import { useCountdown } from "../hooks/use-countdown"
import { RACES } from "../data/races"
import RaceCard from "../components/race-card"
import HeroSection from "../components/hero-section"
import { Link } from "react-router"

export default function HomePage() {
  const nextRace = RACES[0];
  const { days, hours, minutes, seconds } = useCountdown(nextRace.date);
  
  const timerRef = useRef();

  useGSAP(() => {
    gsap.from(timerRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: timerRef.current,
        start: "top 80%"
      }
    });
  }, { scope: timerRef });

  return (
    <div className="w-full">
      <HeroSection />
      
      {/* Next Race Banner / Countdown */}
      <section ref={timerRef} className="container mx-auto px-6 py-20 relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-12 border-[#39FF88]/20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-[#39FF88] text-sm font-bold uppercase tracking-widest mb-2">Next Grand Prix</h2>
            <h3 className="text-4xl md:text-5xl font-hero font-bold mb-4">{nextRace.name}</h3>
            <p className="text-gray-400">{nextRace.circuit}</p>
          </div>
          
          <div className="flex gap-4 md:gap-6 text-center">
            <div className="glass-card p-4 rounded-xl min-w-[80px]">
              <div className="text-3xl md:text-5xl font-hero font-bold text-white">{days}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Days</div>
            </div>
            <div className="glass-card p-4 rounded-xl min-w-[80px]">
              <div className="text-3xl md:text-5xl font-hero font-bold text-white">{hours}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Hrs</div>
            </div>
            <div className="glass-card p-4 rounded-xl min-w-[80px]">
              <div className="text-3xl md:text-5xl font-hero font-bold text-white">{minutes}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Min</div>
            </div>
            <div className="glass-card p-4 rounded-xl min-w-[80px]">
              <div className="text-3xl md:text-5xl font-hero font-bold text-[#FFD60A]">{seconds}</div>
              <div className="text-xs uppercase tracking-wider text-[#FFD60A]/70 mt-1">Sec</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Races Grid */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-hero font-bold">Featured Races</h2>
            <p className="text-gray-400 mt-4 max-w-xl">Explore the most anticipated circuits of the 2026 season. Add them to your garage to keep track.</p>
          </div>
          <Link to="/calendar" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#39FF88] hover:text-white transition-colors">
            Full Calendar <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RACES.slice(0, 3).map((race, index) => (
            <RaceCard key={race.id} race={race} index={index} />
          ))}
        </div>
        <div className="mt-8 md:hidden">
            <Link to="/calendar" className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-[#39FF88] hover:text-white transition-colors glass-card py-4 rounded-full">
                Full Calendar <ArrowRight size={16} />
            </Link>
        </div>
      </section>
    </div>
  )
}

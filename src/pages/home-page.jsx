import { ArrowRight } from "lucide-react"
import { RACES } from "../data/races"
import RaceCard from "../components/race-card"
import HeroSection from "../components/hero-section"
import { Link } from "react-router"

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />

      {/* Featured Races Grid */}
      <section className="container mx-auto px-6 py-32 relative z-10 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-hero font-black uppercase tracking-tighter">
              Featured <span className="text-[#39FF88]">Circuits</span>
            </h2>
            <p className="text-xl text-gray-400 mt-4 max-w-2xl font-medium">
              Explore the most anticipated circuits of the 2026 season. Collect telemetry and add them to your secure garage.
            </p>
          </div>
          <Link to="/calendar" className="mt-8 md:mt-0 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-[#FFD60A] transition-colors group bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 border border-white/5">
            Access Full Calendar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RACES.slice(0, 3).map((race, index) => (
            <RaceCard key={race.id} race={race} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

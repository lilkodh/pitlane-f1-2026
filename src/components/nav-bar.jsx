import { Link } from "react-router"
import { Menu, User, Gauge } from "lucide-react"

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black font-hero tracking-tighter hover:text-[#39FF88] transition-colors duration-300">
          PITLANE<span className="text-[#39FF88]">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-gray-300">
          <Link to="/calendar" className="hover:text-white transition-all duration-300">Calendar</Link>
          <Link to="/mygarage" className="hover:text-white transition-all duration-300">My Garage</Link>
          <Link to="/myseason" className="hover:text-white transition-all duration-300">My Season</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex btn-primary text-xs">
            <Gauge size={16} /> Connect Telemetry
          </button>
          <button className="text-gray-300 hover:text-white hover-glow p-2 rounded-full glass-card transition-all duration-300">
            <User size={20} />
          </button>
          <button className="md:hidden text-gray-300 hover:text-white transition-all duration-300">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  )
}

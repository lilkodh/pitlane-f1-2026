import { Activity } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center glass-nav px-6 md:px-12">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="font-hero text-2xl font-black tracking-tighter text-white">
          PITLANE<span className="text-[#39FF88]">.</span>
        </div>

        {/* Telemetry Status */}
        <div className="hidden md:flex items-center gap-3 border border-white/10 rounded-full px-5 py-2.5 bg-black/20">
          <Activity size={14} className="text-[#39FF88]" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
            Telemetry Systems Online
          </span>
        </div>
      </div>
    </nav>
  )
}

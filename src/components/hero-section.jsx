import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Activity, Zap } from "lucide-react"
import { useCountdown } from "../hooks/use-countdown"
import { RACES } from "../data/races"
import heroCar from "../assets/hero_f1_car.png"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef()
  const carRef = useRef()
  const bgTextRef = useRef()
  const fgTextRef = useRef()
  const telemetryRef = useRef()
  const uiPanelsRef = useRef()

  const nextRace = RACES[0]
  const { days, hours, minutes, seconds } = useCountdown(nextRace.date)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    // Entrance Choreography
    gsap.set(carRef.current, { x: 800, scale: 0.8, skewX: 15, opacity: 0 })
    gsap.set([bgTextRef.current, fgTextRef.current], { y: 150, opacity: 0, scale: 0.9 })
    gsap.set(telemetryRef.current, { scaleX: 0, opacity: 0 })
    
    // Safety check for uiPanelsRef children
    if (uiPanelsRef.current && uiPanelsRef.current.children) {
      gsap.set(uiPanelsRef.current.children, { y: 50, opacity: 0 })
    }

    tl.to([bgTextRef.current, fgTextRef.current], {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 2,
      stagger: 0.1,
    })
    .to(carRef.current, {
      x: 0,
      scale: 1.05,
      skewX: 0,
      opacity: 1,
      duration: 1.8,
      ease: "power4.out"
    }, "-=1.5")
    .to(telemetryRef.current, {
      scaleX: 1,
      opacity: 1,
      duration: 1.2,
      transformOrigin: "left center"
    }, "-=1.2")
    
    if (uiPanelsRef.current && uiPanelsRef.current.children) {
      tl.to(uiPanelsRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1
      }, "-=1.0")
    }

    // 8D Parallax Scroll Experience
    gsap.to(bgTextRef.current, {
      y: -200,
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 0.5 }
    })
    
    gsap.to(carRef.current, {
      y: -100,
      scale: 1.1,
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 }
    })

    gsap.to(fgTextRef.current, {
      y: -50,
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 0.2 }
    })

    gsap.to(uiPanelsRef.current, {
      y: -300,
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Layer 4 (Background Spatial Typography) */}
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center z-10 opacity-20 pointer-events-none translate-y-[-10%]">
        <h1 className="text-[18vw] font-hero font-black uppercase text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
          WORLD CHAMPIONSHIP
        </h1>
      </div>

      {/* Layer 2 (The Car Render) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none translate-y-[5%] mix-blend-screen opacity-90">
        <img ref={carRef} src={heroCar} alt="F1 2026 Car" className="w-[150vw] md:w-[120vw] lg:w-[90vw] max-w-none object-cover transform-gpu drop-shadow-[0_0_50px_rgba(57,255,136,0.2)]" />
      </div>

      {/* Layer 3 (Motion & Energy Effects) */}
      <div ref={telemetryRef} className="absolute top-[45%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#39FF88] to-transparent opacity-50 z-25 pointer-events-none shadow-[0_0_20px_#39FF88]"></div>

      {/* Layer 4 (Foreground Spatial Typography overlapping the car) */}
      <div ref={fgTextRef} className="absolute z-30 pointer-events-none flex flex-col items-center justify-center translate-y-[15%]">
        <h1 className="text-[clamp(5rem,12vw,12rem)] leading-[0.85] font-hero font-extrabold uppercase tracking-tighter text-white drop-shadow-2xl mix-blend-difference">
          Formula <span className="text-[#FFD60A] mix-blend-normal">2026</span>
        </h1>
      </div>

      {/* Layer 5 (Glass UI Panels) */}
      <div ref={uiPanelsRef} className="absolute bottom-32 left-6 right-6 lg:left-12 lg:right-12 z-40 flex flex-col lg:flex-row justify-between items-end gap-6 pointer-events-auto">
        
        {/* Left Telemetry Panel */}
        <div className="glass-card p-6 rounded-2xl border-[#39FF88]/30 w-full lg:w-auto hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3 text-[#39FF88] text-xs font-bold uppercase tracking-widest mb-4">
            <Activity size={16} className="animate-pulse" /> Live Telemetry
          </div>
          <div className="flex gap-8">
            <div>
              <div className="text-gray-400 text-xs mb-1 uppercase">Top Speed Target</div>
              <div className="text-3xl font-hero font-bold text-white">352 <span className="text-sm text-gray-500">KM/H</span></div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1 uppercase">Aero Load</div>
              <div className="text-3xl font-hero font-bold text-white">4.2 <span className="text-sm text-gray-500">G</span></div>
            </div>
          </div>
        </div>

        {/* Center Countdown Panel */}
        <div className="glass-card p-6 rounded-2xl border-white/10 flex-1 w-full flex flex-col items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#39FF88]/0 via-[#39FF88]/5 to-[#39FF88]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          <div className="text-[#FFD60A] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Zap size={14} /> Ignition Sequence: {nextRace.name}
          </div>
          <div className="flex gap-4 md:gap-8">
            {Object.entries({ days, hours, minutes, seconds }).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-6xl font-hero font-black text-white tracking-tighter w-16 md:w-20 font-mono">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action Panel */}
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <button className="btn-primary py-4 px-8 w-full justify-center group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2 text-sm">Enter Control Center <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
          </button>
          <div className="glass-card px-6 py-4 rounded-xl text-center text-xs text-gray-400 uppercase tracking-widest border-white/5">
            Status: <span className="text-[#39FF88] font-bold">Systems Nominal</span>
          </div>
        </div>

      </div>

    </section>
  )
}

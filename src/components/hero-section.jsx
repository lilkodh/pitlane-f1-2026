import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowRight, Trophy } from "lucide-react"

export default function HeroSection() {
  const containerRef = useRef()
  const title1Ref = useRef()
  const title2Ref = useRef()
  const subtextRef = useRef()
  const ctaRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

    // Initial state setup
    gsap.set([title1Ref.current, title2Ref.current], { y: 100, opacity: 0, scale: 0.9 })
    gsap.set(subtextRef.current, { y: 20, opacity: 0 })
    gsap.set(ctaRef.current, { y: 20, opacity: 0 })

    tl.to([title1Ref.current, title2Ref.current], {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.6,
      stagger: 0.15,
      delay: 0.2
    })
    .to(subtextRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2
    }, "-=1.2")
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2
    }, "-=1.0")

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Subtle top badge */}
        <div className="glass-card px-4 py-2 rounded-full mb-8 flex items-center gap-2 border border-[#39FF88]/20 hover-glow cursor-default">
          <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse"></span>
          <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">2026 Season Inaugural</span>
        </div>

        {/* Massive Typography */}
        <div className="flex flex-col items-center overflow-hidden leading-[0.85] mb-6">
          <h1 ref={title1Ref} className="text-[clamp(4rem,12vw,12rem)] font-hero font-extrabold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            Push The
          </h1>
          <h1 ref={title2Ref} className="text-[clamp(4rem,12vw,12rem)] font-hero font-extrabold uppercase tracking-tighter text-[#39FF88]">
            Limit.
          </h1>
        </div>

        {/* Subtext */}
        <p ref={subtextRef} className="max-w-2xl text-lg md:text-xl text-gray-400 font-medium mb-10 tracking-wide">
          Experience the ultimate Formula 1 2026 digital telemetry hub. Cinematic dashboards, immersive analytics, and live championship tracking.
        </p>

        {/* Call to Actions */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6">
          <button className="btn-primary hover-glow">
            Start Engine <ArrowRight size={20} />
          </button>
          <button className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white hover:text-[#FFD60A] transition-colors duration-300 glass-card px-6 py-3 rounded-full hover-glow">
            <Trophy size={18} /> View Standings
          </button>
        </div>

      </div>
    </section>
  )
}
